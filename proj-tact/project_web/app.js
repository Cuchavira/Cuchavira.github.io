const DATA = window.PROJECT_WEB_DATA || {};

const sections = [
  { id: "frame", label: "Frame", panels: ["rq"] },
  { id: "workshop", label: "Workshop", panels: ["study"] },
  { id: "evidence", label: "Evidence", panels: ["archive"] },
  { id: "method", label: "Method", panels: ["methods"] },
  { id: "analysis", label: "Analysis", panels: ["analysis", "insights"] },
  { id: "log", label: "Log", panels: ["meetings", "journal"] }
];

const defaultSection = sections[0];

const personaCards = [
  { file: "PersonaCard.png", title: "Persona 1" },
  { file: "Persona2Card.png", title: "Persona 2" },
  { file: "Persona3Card.png", title: "Persona 3" }
];

const archiveSectionAliases = {
  "archive-artifacts": "artifact-photos",
  "archive-videos": "360-videos",
  "archive-fieldnotes": "fieldnotes",
  "archive-interview": "interview"
};

const externalArchiveRoots = [
  { key: "june2", root: "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June2" },
  { key: "june9", root: "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June9" },
  { key: "june16", root: "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June16" },
  { key: "june23", root: "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June23" },
  { key: "june22", root: "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June23" },
  { key: "legacy-june2", root: "/Volumes/T7/Data Backup/TtM/June2" }
].sort((left, right) => right.root.length - left.root.length);

const workshopIdAliases = {
  june23: "june22"
};
const requestedWorkshopIdRaw = new URLSearchParams(window.location.search).get("workshop");
const requestedWorkshopId = workshopIdAliases[requestedWorkshopIdRaw] || requestedWorkshopIdRaw;
const initialWorkshopId = (DATA.workshops || []).some((workshop) => workshop.id === requestedWorkshopId)
  ? requestedWorkshopId
  : DATA.workshops?.[0]?.id || "";

const state = {
  activeSection: defaultSection.id,
  matrixQuery: "",
  frameworkQuery: "",
  activeWorkshopId: initialWorkshopId,
  activeArchiveSectionId: "",
  activeArchiveGroups: {},
  activeReadingFilter: DATA.readingFilters?.[0]?.id || "methodology",
  journalEntries: [],
  activeJournalId: "",
  journalServerAvailable: false
};

const navButtons = Array.from(document.querySelectorAll("[data-section]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
const viewTitle = document.querySelector("#viewTitle");
const matrixSearch = document.querySelector("#matrixSearch");
const frameworkSearch = document.querySelector("#frameworkSearch");
const workshopSelect = document.querySelector("#workshopSelect");
const activeWorkshopEyebrow = document.querySelector("#activeWorkshopEyebrow");
const journalForm = document.querySelector("#journalForm");
const journalNewButton = document.querySelector("#journalNewButton");
const journalDeleteButton = document.querySelector("#journalDeleteButton");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isHttpPage() {
  return ["http:", "https:"].includes(window.location.protocol);
}

function normalizeArchivePath(pathValue) {
  return String(pathValue || "")
    .replaceAll("\\", "/")
    .replace(/\/+$/g, "");
}

function externalServerUrl(pathValue) {
  const normalizedPath = normalizeArchivePath(pathValue);
  const match = externalArchiveRoots.find(
    ({ root }) => normalizedPath === root || normalizedPath.startsWith(`${root}/`)
  );

  if (!match) return "";

  const relativePath = normalizedPath.slice(match.root.length).replace(/^\/+/g, "");
  if (!relativePath) return "";

  const encodedPath = relativePath.split("/").map(encodeURIComponent).join("/");
  return `/external/${encodeURIComponent(match.key)}/${encodedPath}`;
}

function toFileUrl(pathValue) {
  if (!pathValue) return "#";
  if (/^https?:\/\//i.test(pathValue)) return pathValue;
  if (pathValue.startsWith("file://") || pathValue.startsWith("./") || pathValue.startsWith("../") || pathValue.startsWith("#")) return pathValue;

  if (isHttpPage()) {
    const serverUrl = externalServerUrl(pathValue);
    if (serverUrl) return serverUrl;
  }

  return `file://${encodeURI(pathValue)}`;
}

function sourceUrl(item) {
  if (!item) return "#";
  const rawUrl = item.href || item.path || "#";
  if (["image", "video", "audio", "file"].includes(item.type)) return toFileUrl(rawUrl);
  return rawUrl;
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function localDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function activeWorkshop() {
  return (DATA.workshops || []).find((item) => item.id === state.activeWorkshopId) || DATA.workshops?.[0] || null;
}

function activeArchiveSections() {
  return activeWorkshop()?.archiveSections || [];
}

function resolveArchiveSectionId(sectionId) {
  return archiveSectionAliases[sectionId] || sectionId;
}

function activeArchiveSection() {
  const sections = activeArchiveSections();
  const sectionId = resolveArchiveSectionId(state.activeArchiveSectionId);
  return sections.find((section) => section.id === sectionId) || sections[0] || null;
}

function updateWorkshopUrl() {
  const url = new URL(window.location.href);
  if (state.activeWorkshopId) url.searchParams.set("workshop", state.activeWorkshopId);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  history.replaceState(null, "", nextUrl);
}

function setWorkshop(workshopId, updateUrl = true) {
  if (!(DATA.workshops || []).some((workshop) => workshop.id === workshopId)) return;
  state.activeWorkshopId = workshopId;
  state.activeArchiveSectionId = "";
  state.activeArchiveGroups = {};
  if (workshopSelect) workshopSelect.value = workshopId;
  renderWorkshopScopedContent();
  if (updateUrl) updateWorkshopUrl();
}

function itemCount(section) {
  if (!section) return 0;
  if (section.groups) {
    return section.groups.reduce((sum, group) => sum + (group.items?.length || 0) + (group.extraItems?.length || 0), 0);
  }
  return section.items?.length || 0;
}

function groupItemCount(group) {
  return (group.items?.length || 0) + (group.extraItems?.length || 0);
}

function countLabel(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function ensureArchiveDefaults() {
  const sections = activeArchiveSections();
  if (!sections.length) {
    state.activeArchiveSectionId = "";
    return;
  }

  const sectionId = resolveArchiveSectionId(state.activeArchiveSectionId);
  if (!sections.some((section) => section.id === sectionId)) {
    state.activeArchiveSectionId = sections[0].id;
  } else {
    state.activeArchiveSectionId = sectionId;
  }

  sections.forEach((section) => {
    if (!section.groups?.length) return;
    const activeGroupId = state.activeArchiveGroups[section.id];
    if (!section.groups.some((group) => group.id === activeGroupId)) {
      state.activeArchiveGroups[section.id] = section.groups[0].id;
    }
  });
}

function renderTraceButton(trace) {
  if (!trace) return "";
  return `
    <button
      class="trace-button"
      type="button"
      data-trace-section="${escapeHtml(trace.section || "")}"
      data-trace-tab="${escapeHtml(trace.tab || "")}"
      data-trace-workshop="${escapeHtml(trace.workshop || "")}"
      data-trace-group="${escapeHtml(trace.group || "")}"
      data-trace-anchor="${escapeHtml(trace.anchor || "")}"
      data-trace-video-id="${escapeHtml(trace.videoId || "")}"
      data-trace-time="${escapeHtml(trace.time ?? "")}"
      data-trace-source-title="${escapeHtml(trace.sourceTitle || "")}"
      data-trace-source-index="${escapeHtml(trace.sourceIndex ?? "")}"
      data-trace-source-anchor="${escapeHtml(trace.sourceAnchor || "")}"
    >${escapeHtml(trace.label || "Trace evidence")}</button>
  `;
}

function renderTraceButtons(traces) {
  const targetList = Array.isArray(traces) ? traces : traces ? [traces] : [];
  if (!targetList.length) return "";
  return targetList.map(renderTraceButton).join("");
}

function activateSubtab(sectionId, tabId) {
  if (!tabId) return;
  const section = document.querySelector(`[data-panel="${sectionId}"]`);
  if (!section) return;
  const button = section.querySelector(`[data-tab-target="${tabId}"]`);
  if (!button) return;
  Array.from(section.querySelectorAll("[data-tab-target]")).forEach((item) => {
    item.setAttribute("aria-selected", item === button ? "true" : "false");
  });
  Array.from(section.querySelectorAll("[data-tab-panel]")).forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tabId;
  });
}

function scrollToAnchor(anchorId) {
  if (!anchorId) return;
  requestAnimationFrame(() => {
    const target = document.getElementById(anchorId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.classList.add("trace-highlight");
    window.setTimeout(() => target.classList.remove("trace-highlight"), 1200);
  });
}

function urlWithAnchor(url, anchorId) {
  if (!anchorId || !url || url === "#") return url;
  const [baseUrl] = String(url).split("#");
  return `${baseUrl}#${encodeURIComponent(anchorId)}`;
}

function cueVideo(videoId, time) {
  if (!videoId) return;
  requestAnimationFrame(() => {
    const card = document.getElementById(`video-${videoId}`);
    if (!card) return;
    const video = card.querySelector("video");
    const seconds = Number(time);

    function seek() {
      if (Number.isFinite(seconds)) video.currentTime = seconds;
      video.pause();
    }

    if (video.readyState >= 1) {
      seek();
    } else {
      video.addEventListener("loadedmetadata", seek, { once: true });
    }
    card.classList.add("trace-highlight");
    window.setTimeout(() => card.classList.remove("trace-highlight"), 1200);
  });
}

function selectArchiveSource(archiveSectionId, trace) {
  const hasSourceIndex = trace.sourceIndex !== undefined && trace.sourceIndex !== "";
  if (!archiveSectionId || (!trace.sourceTitle && !hasSourceIndex)) return;
  requestAnimationFrame(() => {
    const sourceId = slug(archiveSectionId);
    const list = document.querySelector(`#${sourceId}SourceList`);
    if (!list) return;
    const buttons = Array.from(list.querySelectorAll("button"));
    const sourceIndex = String(trace.sourceIndex ?? "");
    let button = sourceIndex ? buttons.find((item) => item.dataset.sourceIndex === sourceIndex) : null;
    if (!button && trace.sourceTitle) {
      button = buttons.find((item) => item.dataset.sourceTitle === trace.sourceTitle);
    }
    if (!button) return;
    button.click();
    if (trace.sourceAnchor) {
      const viewer = document.querySelector(`#${sourceId}Viewer`);
      const open = document.querySelector(`#${sourceId}Open`);
      const iframe = viewer?.querySelector("iframe");
      const anchoredUrl = urlWithAnchor(open?.getAttribute("href") || iframe?.getAttribute("src"), trace.sourceAnchor);
      if (iframe) iframe.src = anchoredUrl;
      if (open) open.href = anchoredUrl;
    }
    button.scrollIntoView({ behavior: "smooth", block: "nearest" });
    button.classList.add("trace-highlight");
    window.setTimeout(() => button.classList.remove("trace-highlight"), 1200);
  });
}

function navigateTrace(trace) {
  if (!trace.section) return;

  if (trace.workshop && (DATA.workshops || []).some((workshop) => workshop.id === trace.workshop)) {
    setWorkshop(trace.workshop, false);
  }

  setSection(trace.section);
  activateSubtab(trace.section, trace.tab);

  if (trace.section === "archive") {
    const archiveSectionId = resolveArchiveSectionId(trace.tab);
    if (archiveSectionId) state.activeArchiveSectionId = archiveSectionId;
    if (trace.group) state.activeArchiveGroups[archiveSectionId] = trace.group;
    renderWorkshopScopedContent();
    selectArchiveSource(archiveSectionId, trace);
  }

  scrollToAnchor(trace.anchor);
  cueVideo(trace.videoId, trace.time);
}

function highlightMatch(value, queryValue) {
  const safe = escapeHtml(value);
  const query = queryValue.trim();
  if (!query) return safe;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function highlight(value) {
  return highlightMatch(value, state.matrixQuery);
}

function sectionForId(sectionId) {
  return sections.find((section) => section.id === sectionId || section.panels.includes(sectionId)) || defaultSection;
}

function setSection(sectionId, updateHash = true) {
  const section = sectionForId(sectionId);
  state.activeSection = section.id;
  navButtons.forEach((button) => {
    const isActive = button.dataset.section === state.activeSection;
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
  panels.forEach((panel) => {
    panel.hidden = !section.panels.includes(panel.dataset.panel);
  });
  viewTitle.textContent = section.label;
  if (updateHash) history.replaceState(null, "", `#${state.activeSection}`);
}

function renderRqs() {
  const rqList = document.querySelector("#rqList");
  rqList.innerHTML = (DATA.rqs || [])
    .map((rq) => `
      <article class="rq-row">
        <div class="rq-label">
          <span class="rq-index">${escapeHtml(rq.id)}</span>
          <h4>${escapeHtml(rq.label)}</h4>
        </div>
        <p class="rq-sentence">${escapeHtml(rq.sentence)}</p>
      </article>
    `)
    .join("");
}

function getVisibleMatrixRows() {
  const rows = DATA.evidenceMatrixRows || [];
  const query = state.matrixQuery.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((row) =>
    [row.source, row.rq1, row.rq2, row.rq3, row.followUp]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
}

function renderMappingTable() {
  const table = document.querySelector("#mappingTable");
  const status = document.querySelector("#matrixStatus");
  const rows = getVisibleMatrixRows();
  status.textContent = `${rows.length} source${rows.length === 1 ? "" : "s"} visible`;
  table.innerHTML = `
    <thead>
      <tr>
        <th>Data source</th>
        <th>RQ1</th>
        <th>RQ2</th>
        <th>RQ3</th>
        <th>Follow-up</th>
      </tr>
    </thead>
    <tbody>
      ${rows
        .map((row) => `
          <tr>
            <td>${highlight(row.source)}</td>
            <td>${highlight(row.rq1)}</td>
            <td>${highlight(row.rq2)}</td>
            <td>${highlight(row.rq3)}</td>
            <td>${highlight(row.followUp)}</td>
          </tr>
        `)
        .join("")}
    </tbody>
  `;
}

function renderPersonaPanel() {
  const panel = document.querySelector("#personaPanel");
  if (!panel) return;

  const basePath = "../RQs_Vision/persona";
  panel.innerHTML = personaCards
    .map((card) => {
      const src = `${basePath}/${card.file}`;
      return `
        <figure class="persona-card persona-image-card">
          <a href="${escapeHtml(src)}" target="_blank" rel="noreferrer">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(`${card.title} uploaded visual card.`)}" loading="lazy" />
          </a>
          <figcaption>
            <strong>${escapeHtml(card.title)}</strong>
            <span>Uploaded visual persona card</span>
          </figcaption>
        </figure>
      `;
    })
    .join("");
}

function renderWorkshopSelect() {
  if (!workshopSelect) return;
  workshopSelect.innerHTML = (DATA.workshops || [])
    .map((workshop) => `
      <option value="${escapeHtml(workshop.id)}"${workshop.id === state.activeWorkshopId ? " selected" : ""}>
        ${escapeHtml(workshop.label)}
      </option>
    `)
    .join("");
}

function renderWorkshopMeta() {
  const workshop = activeWorkshop();
  if (!workshop) return;

  activeWorkshopEyebrow.textContent = `${workshop.shortLabel || workshop.label} evidence base`;
  document.querySelector("#studyEyebrow").textContent = workshop.date || "Selected workshop";
  document.querySelector("#studyHeading").textContent = workshop.label;
  document.querySelector("#studySummaryHeading").textContent = workshop.activity || "Workshop summary";
  document.querySelector("#studySummaryText").textContent = workshop.summary || "";
  document.querySelector("#archiveRootLine").textContent = workshop.archiveRoot ? `Archive root: ${workshop.archiveRoot}` : "";
}

function renderWorkshopFigures() {
  const workshop = activeWorkshop();
  const target = document.querySelector("#workshopFigures");
  target.innerHTML = (workshop?.figures || [])
    .map((figure) => `
      <article class="figure-card">
        <img src="${escapeHtml(figure.image)}" alt="${escapeHtml(figure.title)}" loading="lazy" />
        <div>
          <h4>${escapeHtml(figure.title)}</h4>
          <p>${escapeHtml(figure.caption)}</p>
        </div>
      </article>
    `)
    .join("");
}

function renderStudyFacts() {
  const workshop = activeWorkshop();
  const target = document.querySelector("#studyFacts");
  target.innerHTML = (workshop?.facts || [])
    .map(([label, value]) => `
      <div>
        <dt>${escapeHtml(label)}</dt>
        <dd>${escapeHtml(value)}</dd>
      </div>
    `)
    .join("");
}

function renderDocumentButtons(items, listSelector, statusSelector, frameSelector, openSelector) {
  const list = document.querySelector(listSelector);
  const status = document.querySelector(statusSelector);
  const frame = document.querySelector(frameSelector);
  const open = document.querySelector(openSelector);
  if (!list || !status || !frame || !open) return;

  function selectDoc(item, button) {
    Array.from(list.querySelectorAll("button")).forEach((itemButton) => {
      itemButton.setAttribute("aria-pressed", itemButton === button ? "true" : "false");
    });
    frame.src = item.href || "about:blank";
    status.textContent = item.title;
    open.href = item.href || "#";
  }

  if (!items.length) {
    list.innerHTML = `<p class="empty-note">No source documents registered for this workshop.</p>`;
    frame.src = "about:blank";
    status.textContent = "No document";
    open.href = "#";
    return;
  }

  list.innerHTML = items
    .map((item, index) => `
      <button class="doc-button" type="button" data-doc-index="${index}" aria-pressed="false">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.caption)}</span>
      </button>
    `)
    .join("");

  Array.from(list.querySelectorAll("button")).forEach((button) => {
    button.addEventListener("click", () => selectDoc(items[Number(button.dataset.docIndex)], button));
  });

  const firstButton = list.querySelector("button");
  if (firstButton) selectDoc(items[0], firstButton);
}

function renderStudySourceDocs() {
  renderDocumentButtons(activeWorkshop()?.sourceDocs || [], "#studySourceList", "#studyDocStatus", "#studyDocFrame", "#studyDocOpen");
}

function renderArchiveTabs() {
  ensureArchiveDefaults();
  const target = document.querySelector("#archiveTabs");
  const sections = activeArchiveSections();
  target.innerHTML = sections
    .map((section) => `
      <button class="subtab" type="button" data-archive-section="${escapeHtml(section.id)}" aria-selected="${section.id === state.activeArchiveSectionId ? "true" : "false"}">
        ${escapeHtml(section.label)} <span>${itemCount(section)}</span>
      </button>
    `)
    .join("");

  Array.from(target.querySelectorAll("button")).forEach((button) => {
    button.addEventListener("click", () => {
      state.activeArchiveSectionId = button.dataset.archiveSection;
      renderArchiveTabs();
      renderArchiveContent();
    });
  });
}

function renderFileCard(item) {
  const url = sourceUrl(item);
  return `
    <article class="file-card">
      <div>
        <span class="source-type">${escapeHtml(item.fileType || item.type || "file")}</span>
        <h5>${escapeHtml(item.title)}</h5>
        <p>${escapeHtml(item.caption || item.path || "")}</p>
      </div>
      <a class="ghost-link compact" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Open file</a>
    </article>
  `;
}

function renderPhotoAsset(item) {
  if (item.type === "file") return renderFileCard(item);
  const cardClass = item.rotation === "none" ? "photo-card photo-card-landscape" : "photo-card photo-card-portrait";
  return `
    <figure class="${cardClass}">
      <div class="photo-frame">
        <img class="photo-image" src="${escapeHtml(sourceUrl(item))}" alt="${escapeHtml(item.caption || item.title)}" loading="lazy" />
      </div>
      <figcaption>
        <strong>${escapeHtml(item.student || item.title)}</strong>
        <span>${escapeHtml(item.caption || item.title)}</span>
      </figcaption>
    </figure>
  `;
}

function renderAssetGrid(items) {
  if (!items?.length) return `<p class="empty-note">No archive items registered in this section.</p>`;
  return `<div class="artifact-main-grid">${items.map(renderPhotoAsset).join("")}</div>`;
}

function renderGallerySection(section) {
  const target = document.querySelector("#archiveContent");
  const groups = section.groups || [];
  const activeGroupId = state.activeArchiveGroups[section.id] || groups[0]?.id || "";
  const group = groups.find((item) => item.id === activeGroupId) || groups[0];

  target.innerHTML = `
    <section class="asset-panel" aria-labelledby="${escapeHtml(section.id)}-heading">
      <div class="table-heading">
        <div>
          <p class="eyebrow">Grouped archive</p>
          <h4 id="${escapeHtml(section.id)}-heading">${escapeHtml(section.label)}</h4>
        </div>
        <div class="status-pill">${escapeHtml(section.status || countLabel(itemCount(section), "item"))}</div>
      </div>
      <div class="photo-tabs" role="tablist" aria-label="${escapeHtml(section.label)} groups">
        ${groups
          .map((item) => `
            <button class="photo-tab" type="button" data-archive-group="${escapeHtml(item.id)}" aria-selected="${item.id === group?.id ? "true" : "false"}">
              ${escapeHtml(item.label)} <span>${groupItemCount(item)}</span>
            </button>
          `)
          .join("")}
      </div>
      <div class="artifact-gallery">
        ${group
          ? `
            <article class="artifact-group" id="artifact-${escapeHtml(group.id)}">
              <h4>${escapeHtml(group.label)}</h4>
              ${renderAssetGrid(group.items || [])}
              ${(group.extraItems || []).length
                ? `
                  <div class="artifact-extra" ${group.evidenceAnchor ? `id="${escapeHtml(group.evidenceAnchor)}"` : ""}>
                    <div class="artifact-extra-heading">
                      <div>
                        <p class="eyebrow">Supporting files</p>
                        <h5>${escapeHtml(group.extraTitle || "Additional archive items")}</h5>
                      </div>
                      ${renderTraceButton(group.traceTarget)}
                    </div>
                    <div class="artifact-extra-grid">${group.extraItems.map(renderPhotoAsset).join("")}</div>
                  </div>
                `
                : ""}
            </article>
          `
          : `<p class="empty-note">No archive groups registered in this section.</p>`}
      </div>
    </section>
  `;

  Array.from(target.querySelectorAll("[data-archive-group]")).forEach((button) => {
    button.addEventListener("click", () => {
      state.activeArchiveGroups[section.id] = button.dataset.archiveGroup;
      renderArchiveContent();
    });
  });
}

function renderVideosSection(section) {
  const target = document.querySelector("#archiveContent");
  target.innerHTML = `
    <section class="asset-panel" aria-labelledby="${escapeHtml(section.id)}-heading">
      <div class="table-heading">
        <div>
          <p class="eyebrow">Click to play</p>
          <h4 id="${escapeHtml(section.id)}-heading">${escapeHtml(section.label)}</h4>
        </div>
        <div class="status-pill">${escapeHtml(section.status || countLabel(section.items?.length || 0, "video"))}</div>
      </div>
      <div class="video-grid">
        ${(section.items || [])
          .map((video) => `
            <article class="video-card" id="video-${escapeHtml(video.id || slug(video.title))}">
              <video controls preload="metadata" data-video-id="${escapeHtml(video.id || "")}" src="${escapeHtml(sourceUrl(video))}"></video>
              <div>
                <h4>${escapeHtml(video.title)}</h4>
                <p>${escapeHtml(video.caption)}</p>
                ${(video.markers || []).length
                  ? `<div class="video-markers">
                      ${video.markers.map((marker) => `<span>${escapeHtml(marker.time)} demonstrates ${escapeHtml(marker.label)}</span>`).join("")}
                    </div>`
                  : ""}
              </div>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderAudioViewer(item) {
  const url = sourceUrl(item);
  return `
    <div class="audio-viewer">
      <p>${escapeHtml(item.caption || item.title)}</p>
      <audio controls src="${escapeHtml(url)}"></audio>
    </div>
  `;
}

function renderFileViewer(item) {
  return `
    <div class="file-viewer">
      ${renderFileCard(item)}
    </div>
  `;
}

function renderMixedSources(items, listSelector, statusSelector, viewerSelector, openSelector) {
  const list = document.querySelector(listSelector);
  const status = document.querySelector(statusSelector);
  const viewer = document.querySelector(viewerSelector);
  const open = document.querySelector(openSelector);
  if (!list || !status || !viewer || !open) return;

  function selectSource(item, button) {
    Array.from(list.querySelectorAll("button")).forEach((itemButton) => {
      itemButton.setAttribute("aria-pressed", itemButton === button ? "true" : "false");
    });
    const url = sourceUrl(item);
    status.textContent = item.title;
    open.href = url;
    if (item.type === "image") {
      viewer.innerHTML = `
        <figure class="viewer-figure">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(item.caption)}" />
          <figcaption>${escapeHtml(item.caption)}</figcaption>
        </figure>
      `;
    } else if (item.type === "audio") {
      viewer.innerHTML = renderAudioViewer(item);
    } else if (item.type === "file") {
      viewer.innerHTML = renderFileViewer(item);
    } else {
      viewer.innerHTML = `<iframe class="doc-frame" src="${escapeHtml(url)}" title="${escapeHtml(item.title)}"></iframe>`;
    }
  }

  if (!items.length) {
    list.innerHTML = `<p class="empty-note">No sources registered in this section.</p>`;
    status.textContent = "No source";
    open.href = "#";
    viewer.innerHTML = "";
    return;
  }

  list.innerHTML = items
    .map((item, index) => `
      <button class="doc-button" type="button" data-source-index="${index}" data-source-title="${escapeHtml(item.title)}" aria-pressed="false">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.caption)}</span>
      </button>
    `)
    .join("");

  Array.from(list.querySelectorAll("button")).forEach((button) => {
    button.addEventListener("click", () => selectSource(items[Number(button.dataset.sourceIndex)], button));
  });

  const firstButton = list.querySelector("button");
  if (firstButton) selectSource(items[0], firstButton);
}

function renderSourcesSection(section) {
  const target = document.querySelector("#archiveContent");
  const sourceId = slug(section.id);
  target.innerHTML = `
    <section class="doc-workspace" aria-labelledby="${escapeHtml(sourceId)}-heading">
      <div class="doc-list-panel">
        <p class="eyebrow">Archive sources</p>
        <h4 id="${escapeHtml(sourceId)}-heading">${escapeHtml(section.label)}</h4>
        <div class="doc-button-list" id="${escapeHtml(sourceId)}SourceList"></div>
      </div>
      <div class="doc-viewer-panel">
        <div class="doc-viewer-header">
          <span class="status-pill" id="${escapeHtml(sourceId)}Status">${escapeHtml(section.status || "Select a source")}</span>
          <a class="ghost-link" id="${escapeHtml(sourceId)}Open" href="#" target="_blank" rel="noreferrer">Open full view</a>
        </div>
        <div class="mixed-viewer" id="${escapeHtml(sourceId)}Viewer"></div>
      </div>
    </section>
  `;
  renderMixedSources(
    section.items || [],
    `#${sourceId}SourceList`,
    `#${sourceId}Status`,
    `#${sourceId}Viewer`,
    `#${sourceId}Open`
  );
}

function renderArchiveContent() {
  ensureArchiveDefaults();
  const section = activeArchiveSection();
  const target = document.querySelector("#archiveContent");
  if (!section) {
    target.innerHTML = `
      <section class="asset-panel">
        <p class="empty-note">No archive sections registered for this workshop.</p>
      </section>
    `;
    return;
  }

  if (section.kind === "videos") {
    renderVideosSection(section);
  } else if (section.kind === "sources") {
    renderSourcesSection(section);
  } else {
    renderGallerySection(section);
  }
}

function renderWorkshopScopedContent() {
  renderWorkshopMeta();
  renderWorkshopFigures();
  renderStudyFacts();
  renderStudySourceDocs();
  renderArchiveTabs();
  renderArchiveContent();
}

function frameworkData() {
  return DATA.frameworkPlacement || { rows: [], sourceNotes: [] };
}

function visibleFrameworkRows() {
  const rows = frameworkData().rows || [];
  const query = state.frameworkQuery.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((row) =>
    [row.family, row.useFor, row.citation, row.sourceText, row.verificationNote]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
}

function renderFrameworkLinks(row) {
  const links = Array.isArray(row.sourceLinks) ? row.sourceLinks : [];
  if (!links.length) {
    return row.sourceText
      ? `<span class="framework-source-text">${highlightMatch(row.sourceText, state.frameworkQuery)}</span>`
      : `<span class="framework-source-text">No link listed</span>`;
  }
  return `
    <div class="source-chip-list">
      ${links
        .map((link) => `
          <a class="source-chip" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
            ${escapeHtml(link.label || "Source")}
          </a>
        `)
        .join("")}
    </div>
  `;
}

function renderFrameworkTable() {
  const data = frameworkData();
  const table = document.querySelector("#frameworkTable");
  const status = document.querySelector("#frameworkStatus");
  if (!table || !status) return;

  const rows = visibleFrameworkRows();
  status.textContent = `${rows.length} framework${rows.length === 1 ? "" : "s"} visible`;
  table.innerHTML = `
    <thead>
      <tr>
        <th>Framework family</th>
        <th>Use for</th>
        <th>Reference citation</th>
        <th>DOI / website</th>
        <th>Verification note</th>
      </tr>
    </thead>
    <tbody>
      ${rows.length
        ? rows
          .map((row) => `
            <tr id="${escapeHtml(row.id)}">
              <td data-label="Framework family">${highlightMatch(row.family, state.frameworkQuery)}</td>
              <td data-label="Use for">${highlightMatch(row.useFor, state.frameworkQuery)}</td>
              <td data-label="Reference citation">${highlightMatch(row.citation, state.frameworkQuery)}</td>
              <td data-label="DOI / website">${renderFrameworkLinks(row)}</td>
              <td data-label="Verification note">${highlightMatch(row.verificationNote || "No note", state.frameworkQuery)}</td>
            </tr>
          `)
          .join("")
        : `<tr><td colspan="5">No framework rows match this search.</td></tr>`}
    </tbody>
  `;

  const workbookOpen = document.querySelector("#frameworkWorkbookOpen");
  const docOpen = document.querySelector("#methodDocSourceOpen");
  if (workbookOpen && data.sourceWorkbook) workbookOpen.href = data.sourceWorkbook;
  if (docOpen && data.sourceNote) docOpen.href = data.sourceNote;
}

function renderFrameworkSourceNotes() {
  const target = document.querySelector("#frameworkSourceNotes");
  const data = frameworkData();
  if (!target) return;

  target.innerHTML = `
    <div>
      <p class="eyebrow">Workbook source notes</p>
      <h5>${escapeHtml(data.title || "Framework Placement Table")}</h5>
    </div>
    <dl>
      ${(data.sourceNotes || [])
        .map((note) => `
          <div>
            <dt>${escapeHtml(note.item)}</dt>
            <dd>${escapeHtml(note.value)}</dd>
          </div>
        `)
        .join("")}
    </dl>
  `;
}

function itemMatchesFilter(item, filterId) {
  if (filterId === "methodology") return true;
  if (filterId === "behavior-psych") return Boolean(item.statuses?.["behavior-psych"]);
  return item.collections.includes(filterId);
}

function statusForItem(item) {
  return item.statuses?.[state.activeReadingFilter] || item.statuses?.methodology || "Under review";
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function visibleReadingItems() {
  return (DATA.readingTracker || []).filter((item) => itemMatchesFilter(item, state.activeReadingFilter));
}

function renderReadingFilters() {
  const target = document.querySelector("#readingFilters");
  target.innerHTML = (DATA.readingFilters || [])
    .map((filter) => {
      const count = (DATA.readingTracker || []).filter((item) => itemMatchesFilter(item, filter.id)).length;
      return `
        <button class="reading-filter" type="button" data-reading-filter="${escapeHtml(filter.id)}" aria-selected="${filter.id === state.activeReadingFilter ? "true" : "false"}">
          ${escapeHtml(filter.label)} <span>${count}</span>
        </button>
      `;
    })
    .join("");

  Array.from(target.querySelectorAll("button")).forEach((button) => {
    button.addEventListener("click", () => {
      state.activeReadingFilter = button.dataset.readingFilter;
      renderReadingFilters();
      renderReadingTracker();
    });
  });
}

function renderReadingTracker() {
  const target = document.querySelector("#readingTracker");
  const status = document.querySelector("#readingStatus");
  const items = visibleReadingItems();
  status.textContent = `${items.length} source${items.length === 1 ? "" : "s"} visible`;
  target.innerHTML = items
    .map((item) => {
      const readingStatus = statusForItem(item);
      return `
        <article class="reading-card">
          <div class="reading-card-header">
            <div>
              <h4>${escapeHtml(item.title)}</h4>
              <p class="authors">${escapeHtml(item.authors)}</p>
            </div>
            <span class="read-status ${escapeHtml(statusClass(readingStatus))}">${escapeHtml(readingStatus)}</span>
          </div>
          <div class="reading-meta">
            ${item.collectionLabels.map((label) => `<span class="label-token">${escapeHtml(label)}</span>`).join("")}
            ${item.tags.map((tag) => `<span class="tag-token">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <a class="ghost-link compact" href="zotero://select/library/items/${escapeHtml(item.zoteroKey)}">Open in Zotero</a>
        </article>
      `;
    })
    .join("");
}

function renderMethodNotes() {
  renderDocumentButtons(DATA.methodNotes || [], "#methodNoteList", "#methodNoteStatus", "#methodNoteFrame", "#methodNoteOpen");
}

function renderNarrativeWritingPrompt(prompt) {
  if (!prompt) return "";
  const fields = prompt.fields || [];
  const rqs = DATA.rqs || [];

  return `
    <article class="narrative-template-card">
      <div class="narrative-template-copy">
        <p class="eyebrow">${escapeHtml(prompt.intro || "Write 5-10 sentences describing:")}</p>
        <h5>${escapeHtml(prompt.title || "Narrative summary structure")}</h5>
      </div>
      <ol class="narrative-template-list">
        ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join("")}
      </ol>
      ${rqs.length ? `
        <section class="narrative-rq-section" aria-label="Research questions for narrative summaries">
          <h6>${escapeHtml(prompt.rqIntro || "Connect the narrative to the relevant RQs:")}</h6>
          <div class="narrative-rq-list">
            ${rqs.map((rq) => `
              <article class="narrative-rq-card">
                <strong>${escapeHtml(rq.id)}: ${escapeHtml(rq.label)}</strong>
                <p>${escapeHtml(rq.sentence)}</p>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
    </article>
  `;
}

function renderNarrativeEntry(entry) {
  return `
    <article class="narrative-summary-card" id="${escapeHtml(entry.id)}">
      <div class="narrative-summary-header">
        <div>
          <p class="eyebrow">${escapeHtml(entry.timeRange || "")}</p>
          <h5>${escapeHtml(entry.title)}</h5>
        </div>
        <div class="narrative-meta">
          <span>${escapeHtml(entry.activityStage || "Activity stage TBD")}</span>
          <span>${escapeHtml((entry.participants || []).join(", "))}</span>
        </div>
      </div>
      <p class="narrative-overview">${escapeHtml(entry.overview || "")}</p>
      <div class="narrative-section">
        <h6>Event Sequence</h6>
        <ol class="narrative-event-list">
          ${(entry.eventSequence || [])
            .map((event) => `
              <li>
                <strong>${escapeHtml(event.title)}</strong>
                <p>${escapeHtml(event.text)}</p>
              </li>
            `)
            .join("")}
        </ol>
      </div>
      <div class="narrative-grid">
        <section class="narrative-section">
          <h6>Why This Episode Matters</h6>
          ${renderTextList(entry.whyThisMatters)}
        </section>
        <section class="narrative-section">
          <h6>Evidence</h6>
          ${renderTextList(entry.evidence)}
        </section>
      </div>
    </article>
  `;
}

function renderAnalysisWorkflow() {
  const workflow = DATA.analysisWorkflow || { stages: [], guardrails: [] };
  const narrativeSummaries = workflow.narrativeSummaries || { entries: [] };
  const heading = document.querySelector("#analysisHeading");
  const eyebrow = document.querySelector("#analysisEyebrow");
  const summary = document.querySelector("#analysisSummary");
  const workbookOpen = document.querySelector("#analysisWorkbookOpen");
  const sourceLabel = document.querySelector("#analysisSourceLabel");
  const flow = document.querySelector("#analysisFlow");
  const guardrails = document.querySelector("#analysisGuardrails");
  const narrativeEyebrow = document.querySelector("#analysisNarrativeEyebrow");
  const narrativeHeading = document.querySelector("#analysisNarrativeHeading");
  const narrativeDescription = document.querySelector("#analysisNarrativeDescription");
  const narrativeStatus = document.querySelector("#analysisNarrativeStatus");
  const narrativeList = document.querySelector("#analysisNarratives");

  if (!flow || !guardrails) return;

  if (heading) heading.textContent = workflow.title || "Video Data Analysis Stage";
  if (eyebrow) eyebrow.textContent = workflow.eyebrow || "McNaughton-adapted workflow";
  if (summary) summary.textContent = workflow.summary || "";
  if (workbookOpen && workflow.workbookHref) workbookOpen.href = workflow.workbookHref;
  if (sourceLabel) sourceLabel.textContent = workflow.sourceLabel || `${workflow.stages.length} stages`;

  flow.innerHTML = (workflow.stages || [])
    .map((stage, index, stages) => `
      <article class="analysis-stage-card${index === stages.length - 1 ? " is-final" : ""}">
        <span class="analysis-stage-index">${escapeHtml(stage.number || String(index + 1).padStart(2, "0"))}</span>
        <div>
          <h4>${escapeHtml(stage.title)}</h4>
          <p>${escapeHtml(stage.description)}</p>
        </div>
      </article>
    `)
    .join("");

  guardrails.innerHTML = (workflow.guardrails || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  if (narrativeEyebrow) narrativeEyebrow.textContent = narrativeSummaries.eyebrow || "Pair-level event description";
  if (narrativeHeading) narrativeHeading.textContent = narrativeSummaries.title || "Narrative summaries";
  if (narrativeDescription) narrativeDescription.textContent = narrativeSummaries.description || "";
  if (narrativeStatus) {
    narrativeStatus.textContent = narrativeSummaries.sourceLabel || countLabel(narrativeSummaries.entries?.length || 0, "summary", "summaries");
  }
  if (narrativeList) {
    const promptMarkup = renderNarrativeWritingPrompt(narrativeSummaries.writingPrompt);
    const entryMarkup = (narrativeSummaries.entries || []).map(renderNarrativeEntry).join("");
    narrativeList.innerHTML = `${promptMarkup}${entryMarkup}`;
  }
}

function renderSubEpisode(item) {
  return `
    <li class="sub-episode">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${(item.traceTargets || item.traceTarget) ? `<div class="insight-actions">${renderTraceButtons(item.traceTargets || item.traceTarget)}</div>` : ""}
    </li>
  `;
}

function renderInsights() {
  document.querySelector("#insightGrid").innerHTML = (DATA.insights || [])
    .map((item) => `
      <article class="insight-card large" id="${escapeHtml(item.id || `insight-${item.number}`)}">
        <div class="insight-number">${escapeHtml(item.number)}</div>
        <div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.text)}</p>
          ${
            item.subEpisodes
              ? `<ol class="sub-episode-list">${item.subEpisodes.map(renderSubEpisode).join("")}</ol>`
              : `<ol>${(item.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol>`
          }
          ${(item.traceTargets || item.traceTarget) ? `<div class="insight-actions">${renderTraceButtons(item.traceTargets || item.traceTarget)}</div>` : ""}
        </div>
      </article>
    `)
    .join("");

  document.querySelector("#memoLines").innerHTML = (DATA.memoLines || [])
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function renderLinkList(links, className = "meeting-link-list") {
  return (links || []).length
    ? `
      <div class="${className}">
        ${links
          .map((link) => `
            <a class="ghost-link compact" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
              ${escapeHtml(link.label)}
            </a>
          `)
          .join("")}
      </div>
    `
    : "";
}

function renderTextList(items) {
  return `<ul>${(items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderMeetingNotes() {
  const notes = DATA.meetingNotes || [];
  const status = document.querySelector("#meetingStatus");
  const list = document.querySelector("#meetingNoteList");
  if (!list) return;

  if (status) status.textContent = countLabel(notes.length, "note");

  list.innerHTML = notes
    .map((note) => `
      <article class="meeting-card" id="${escapeHtml(note.id)}">
        <div class="meeting-card-header">
          <div>
            <p class="eyebrow">${escapeHtml(note.eyebrow || "Meeting note")}</p>
            <h4>${escapeHtml(note.title)}</h4>
          </div>
          <time class="status-pill" datetime="${escapeHtml(note.date)}">${escapeHtml(note.date)}</time>
        </div>
        <p class="meeting-summary">${escapeHtml(note.summary)}</p>
        <dl class="meeting-meta">
          <div>
            <dt>Participants</dt>
            <dd>${escapeHtml((note.participants || []).join(", "))}</dd>
          </div>
        </dl>
        ${renderLinkList(note.sourceLinks)}

        <section class="meeting-section" aria-label="Key decisions">
          <h5>Key Decisions</h5>
          ${renderTextList(note.decisions)}
        </section>

        <section class="meeting-section" aria-label="Discussion summary">
          <h5>Discussion Summary</h5>
          <div class="meeting-discussion-grid">
            ${(note.discussion || [])
              .map((item) => `
                <article>
                  <strong>${escapeHtml(item.title)}</strong>
                  <p>${escapeHtml(item.text)}</p>
                </article>
              `)
              .join("")}
          </div>
        </section>

        <section class="meeting-section" aria-label="Action items">
          <h5>Action Items</h5>
          <div class="meeting-action-grid">
            ${(note.actionGroups || [])
              .map((group) => `
                <article>
                  <strong>${escapeHtml(group.title)}</strong>
                  ${renderTextList(group.items)}
                </article>
              `)
              .join("")}
          </div>
        </section>
      </article>
    `)
    .join("");
}

function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitTags(value) {
  return String(value || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseEvidenceLinks(value) {
  return splitLines(value).map((line) => {
    const separatorIndex = line.indexOf("|");
    if (separatorIndex === -1) {
      return { label: line, href: line };
    }
    return {
      label: line.slice(0, separatorIndex).trim(),
      href: line.slice(separatorIndex + 1).trim()
    };
  });
}

function formatEvidenceLinks(links) {
  return (links || [])
    .map((link) => {
      const label = link.label || link.href || "";
      const href = link.href || "";
      return href && href !== label ? `${label} | ${href}` : label;
    })
    .join("\n");
}

function formatJournalList(items) {
  return (items || []).join("\n");
}

function sortJournalEntries(entries) {
  return [...entries].sort((a, b) => {
    const left = `${a.date || ""} ${a.updatedAt || a.createdAt || ""}`;
    const right = `${b.date || ""} ${b.updatedAt || b.createdAt || ""}`;
    return right.localeCompare(left);
  });
}

function journalRqLabel(rqId) {
  if (!rqId) return "Unassigned RQ";
  const rq = (DATA.rqs || []).find((item) => item.id === rqId);
  return rq ? `${rq.id}: ${rq.label}` : rqId;
}

function journalWorkshopLabel(workshopId) {
  if (!workshopId) return "No workshop linked";
  const workshop = (DATA.workshops || []).find((item) => item.id === workshopId);
  return workshop?.shortLabel || workshop?.label || workshopId;
}

function journalSnippet(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "No memo text yet.";
  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function renderJournalChips(items, className = "journal-preview-chips") {
  return (items || []).length
    ? `<div class="${className}">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`
    : "";
}

function renderJournalParagraphs(value) {
  const text = String(value || "").trim();
  if (!text) return `<p class="empty-note">No memo text yet.</p>`;

  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

function renderJournalItemList(items) {
  return (items || []).length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p class="empty-note">No entries yet.</p>`;
}

function renderJournalEvidenceLinks(links) {
  return (links || []).length
    ? `
      <div class="journal-evidence-list">
        ${links
          .map((link) => {
            const label = link.label || link.href || "Evidence";
            const href = link.href || "";
            return href
              ? `<a class="ghost-link compact" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
              : `<span>${escapeHtml(label)}</span>`;
          })
          .join("")}
      </div>
    `
    : `<p class="empty-note">No evidence links yet.</p>`;
}

function renderJournalPreview(entry) {
  const preview = document.querySelector("#journalPreview");
  if (!preview) return;

  if (!entry) {
    preview.innerHTML = `
      <div class="journal-preview-empty">
        <p class="eyebrow">Selected memo</p>
        <h4 id="journalPreviewHeading">No memo selected</h4>
        <p>Select a saved memo or create a new one to review the full entry here.</p>
      </div>
    `;
    return;
  }

  const metaItems = [
    entry.date || "No date",
    journalRqLabel(entry.rq),
    journalWorkshopLabel(entry.workshop)
  ];

  preview.innerHTML = `
    <article class="journal-preview-entry">
      <header class="journal-preview-head">
        <div>
          <p class="eyebrow">Selected memo</p>
          <h4 id="journalPreviewHeading">${escapeHtml(entry.title || "Untitled memo")}</h4>
        </div>
        ${entry.updatedAt ? `<time class="status-pill" datetime="${escapeHtml(entry.updatedAt)}">Updated ${escapeHtml(entry.updatedAt.slice(0, 10))}</time>` : ""}
      </header>

      ${renderJournalChips(metaItems)}
      ${renderJournalChips(entry.tags || [], "journal-preview-chips muted")}

      <section class="journal-preview-section journal-preview-memo" aria-label="Memo text">
        ${renderJournalParagraphs(entry.memo)}
      </section>

      <div class="journal-preview-grid">
        <section class="journal-preview-section" aria-label="Evidence links">
          <h5>Evidence Links</h5>
          ${renderJournalEvidenceLinks(entry.evidenceLinks || [])}
        </section>
        <section class="journal-preview-section" aria-label="Decisions">
          <h5>Decisions</h5>
          ${renderJournalItemList(entry.decisions || [])}
        </section>
        <section class="journal-preview-section" aria-label="Next actions">
          <h5>Next Actions</h5>
          ${renderJournalItemList(entry.nextActions || [])}
        </section>
      </div>
    </article>
  `;
}

function setJournalSaveState(message) {
  const target = document.querySelector("#journalSaveState");
  if (target) target.textContent = message;
}

function setJournalServerNote(visible) {
  const note = document.querySelector("#journalServerNote");
  if (note) note.hidden = !visible;
}

function updateJournalControls() {
  const disabled = !state.journalServerAvailable;
  if (journalForm) {
    Array.from(journalForm.elements).forEach((field) => {
      field.disabled = disabled;
    });
  }
  if (journalNewButton) journalNewButton.disabled = disabled;
  if (journalDeleteButton) journalDeleteButton.disabled = disabled || !state.activeJournalId;
}

function populateJournalSelects() {
  const rqSelect = document.querySelector("#journalRq");
  const workshopSelectInput = document.querySelector("#journalWorkshop");

  if (rqSelect) {
    rqSelect.innerHTML = `
      <option value="">Unassigned RQ</option>
      ${(DATA.rqs || [])
        .map((rq) => `<option value="${escapeHtml(rq.id)}">${escapeHtml(rq.id)} - ${escapeHtml(rq.label)}</option>`)
        .join("")}
    `;
  }

  if (workshopSelectInput) {
    workshopSelectInput.innerHTML = `
      <option value="">No workshop linked</option>
      ${(DATA.workshops || [])
        .map((workshop) => `<option value="${escapeHtml(workshop.id)}">${escapeHtml(workshop.label)}</option>`)
        .join("")}
    `;
  }
}

function updateJournalActiveCard() {
  Array.from(document.querySelectorAll("[data-journal-entry]")).forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.journalEntry === state.activeJournalId ? "true" : "false");
  });
}

function resetJournalForm() {
  if (!journalForm) return;
  journalForm.reset();
  document.querySelector("#journalEntryId").value = "";
  document.querySelector("#journalDate").value = localDateString();
  document.querySelector("#journalRq").value = "";
  document.querySelector("#journalWorkshop").value = state.activeWorkshopId || "";
  state.activeJournalId = "";
  setJournalSaveState("Draft");
  renderJournalPreview(null);
  updateJournalActiveCard();
  updateJournalControls();
}

function fillJournalForm(entry) {
  if (!journalForm || !entry) return;
  document.querySelector("#journalEntryId").value = entry.id || "";
  document.querySelector("#journalTitle").value = entry.title || "";
  document.querySelector("#journalDate").value = entry.date || localDateString();
  document.querySelector("#journalRq").value = entry.rq || "";
  document.querySelector("#journalWorkshop").value = entry.workshop || "";
  document.querySelector("#journalTags").value = (entry.tags || []).join(", ");
  document.querySelector("#journalMemo").value = entry.memo || "";
  document.querySelector("#journalEvidence").value = formatEvidenceLinks(entry.evidenceLinks || []);
  document.querySelector("#journalDecisions").value = formatJournalList(entry.decisions || []);
  document.querySelector("#journalNextActions").value = formatJournalList(entry.nextActions || []);
  state.activeJournalId = entry.id || "";
  setJournalSaveState(entry.updatedAt ? `Saved ${entry.updatedAt.slice(0, 10)}` : "Saved");
  renderJournalPreview(entry);
  updateJournalActiveCard();
  updateJournalControls();
}

function renderJournalList() {
  const list = document.querySelector("#journalList");
  const count = document.querySelector("#journalCount");
  if (!list) return;

  const entries = sortJournalEntries(state.journalEntries);
  if (count) count.textContent = countLabel(entries.length, "entry", "entries");

  if (!entries.length) {
    list.innerHTML = `<p class="empty-note">No research memos saved yet.</p>`;
    return;
  }

  list.innerHTML = entries
    .map((entry) => `
      <button class="journal-entry-card" type="button" data-journal-entry="${escapeHtml(entry.id)}" aria-pressed="${entry.id === state.activeJournalId ? "true" : "false"}">
        <span class="journal-entry-date">${escapeHtml(entry.date || "No date")}</span>
        <strong>${escapeHtml(entry.title || "Untitled memo")}</strong>
        <span>${escapeHtml(journalSnippet(entry.memo))}</span>
        <span class="journal-entry-meta">
          <em>${escapeHtml(journalRqLabel(entry.rq))}</em>
          <em>${escapeHtml(journalWorkshopLabel(entry.workshop))}</em>
        </span>
        ${(entry.tags || []).length
          ? `<span class="journal-entry-tags">${entry.tags.map((tag) => `<i>${escapeHtml(tag)}</i>`).join("")}</span>`
          : ""}
      </button>
    `)
    .join("");

  Array.from(list.querySelectorAll("[data-journal-entry]")).forEach((button) => {
    button.addEventListener("click", () => {
      const entry = state.journalEntries.find((item) => item.id === button.dataset.journalEntry);
      fillJournalForm(entry);
    });
  });
}

function journalPayloadFromForm() {
  return {
    id: document.querySelector("#journalEntryId").value.trim(),
    title: document.querySelector("#journalTitle").value.trim(),
    date: document.querySelector("#journalDate").value,
    rq: document.querySelector("#journalRq").value,
    workshop: document.querySelector("#journalWorkshop").value,
    tags: splitTags(document.querySelector("#journalTags").value),
    memo: document.querySelector("#journalMemo").value.trim(),
    evidenceLinks: parseEvidenceLinks(document.querySelector("#journalEvidence").value),
    decisions: splitLines(document.querySelector("#journalDecisions").value),
    nextActions: splitLines(document.querySelector("#journalNextActions").value)
  };
}

async function loadJournalEntries() {
  const status = document.querySelector("#journalStatus");
  if (!journalForm) return;

  populateJournalSelects();
  resetJournalForm();

  if (window.location.protocol === "file:") {
    state.journalServerAvailable = false;
    if (status) status.textContent = "Server required";
    setJournalServerNote(true);
    updateJournalControls();
    renderJournalList();
    return;
  }

  try {
    const response = await fetch("/api/research-journal", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Journal API returned ${response.status}`);
    const data = await response.json();
    state.journalServerAvailable = true;
    state.journalEntries = Array.isArray(data.entries) ? data.entries : [];
    if (status) status.textContent = countLabel(state.journalEntries.length, "memo");
    setJournalServerNote(false);
    updateJournalControls();
    renderJournalList();
    if (state.journalEntries.length) {
      fillJournalForm(sortJournalEntries(state.journalEntries)[0]);
    }
  } catch {
    state.journalServerAvailable = false;
    if (status) status.textContent = "Server unavailable";
    setJournalServerNote(true);
    updateJournalControls();
    renderJournalList();
  }
}

async function saveJournalEntry(event) {
  event.preventDefault();
  if (!state.journalServerAvailable || !journalForm?.reportValidity()) return;

  const payload = journalPayloadFromForm();
  setJournalSaveState("Saving...");

  try {
    const response = await fetch("/api/research-journal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Save failed with ${response.status}`);
    state.journalEntries = Array.isArray(data.entries) ? data.entries : state.journalEntries;
    renderJournalList();
    fillJournalForm(data.entry);
    const status = document.querySelector("#journalStatus");
    if (status) status.textContent = countLabel(state.journalEntries.length, "memo");
    setJournalSaveState("Saved");
  } catch (error) {
    setJournalSaveState(error.message || "Save failed");
  }
}

async function deleteJournalEntry() {
  if (!state.journalServerAvailable || !state.activeJournalId) return;
  const entry = state.journalEntries.find((item) => item.id === state.activeJournalId);
  const label = entry?.title || "this memo";
  if (!window.confirm(`Delete "${label}" from the local journal file?`)) return;

  setJournalSaveState("Deleting...");
  try {
    const response = await fetch(`/api/research-journal/${encodeURIComponent(state.activeJournalId)}`, {
      method: "DELETE",
      headers: { Accept: "application/json" }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Delete failed with ${response.status}`);
    state.journalEntries = Array.isArray(data.entries) ? data.entries : [];
    resetJournalForm();
    renderJournalList();
    const status = document.querySelector("#journalStatus");
    if (status) status.textContent = countLabel(state.journalEntries.length, "memo");
    setJournalSaveState("Draft");
  } catch (error) {
    setJournalSaveState(error.message || "Delete failed");
  }
}

function attachTabs() {
  Array.from(document.querySelectorAll("[data-tab-target]")).forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".section-panel");
      const targetId = button.dataset.tabTarget;
      Array.from(section.querySelectorAll("[data-tab-target]")).forEach((item) => {
        item.setAttribute("aria-selected", item === button ? "true" : "false");
      });
      Array.from(section.querySelectorAll("[data-tab-panel]")).forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== targetId;
      });
    });
  });
}

function attachEvents() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => setSection(button.dataset.section));
  });

  matrixSearch.addEventListener("input", (event) => {
    state.matrixQuery = event.target.value;
    renderMappingTable();
  });

  frameworkSearch?.addEventListener("input", (event) => {
    state.frameworkQuery = event.target.value;
    renderFrameworkTable();
  });

  workshopSelect?.addEventListener("change", (event) => {
    setWorkshop(event.target.value);
  });

  journalForm?.addEventListener("submit", saveJournalEntry);
  journalNewButton?.addEventListener("click", resetJournalForm);
  journalDeleteButton?.addEventListener("click", deleteJournalEntry);

  window.addEventListener("hashchange", () => {
    setSection(window.location.hash.replace("#", ""), false);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".trace-button");
    if (!button) return;
    event.preventDefault();
    navigateTrace({
      section: button.dataset.traceSection,
      tab: button.dataset.traceTab,
      workshop: button.dataset.traceWorkshop,
      group: button.dataset.traceGroup,
      anchor: button.dataset.traceAnchor,
      videoId: button.dataset.traceVideoId,
      time: button.dataset.traceTime,
      sourceTitle: button.dataset.traceSourceTitle,
      sourceIndex: button.dataset.traceSourceIndex,
      sourceAnchor: button.dataset.traceSourceAnchor
    });
  });
}

function init() {
  renderRqs();
  renderMappingTable();
  renderPersonaPanel();
  renderWorkshopSelect();
  renderWorkshopScopedContent();
  renderFrameworkTable();
  renderFrameworkSourceNotes();
  renderReadingFilters();
  renderReadingTracker();
  renderMethodNotes();
  renderAnalysisWorkflow();
  renderInsights();
  renderMeetingNotes();
  loadJournalEntries();
  attachTabs();
  attachEvents();
  setSection(window.location.hash.replace("#", "") || defaultSection.id, false);
}

init();
