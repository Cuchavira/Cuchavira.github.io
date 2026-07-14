const rqs = [
  {
    id: "RQ1",
    shortName: "Tactile response patterns",
    question: "What tactile response patterns emerge when neurodivergent learners engage with tactile materials in a structured learning activity?"
  },
  {
    id: "RQ2",
    shortName: "Traceable semantic descriptions",
    question: "How can learners' multimodal expressions around tactile episodes be translated into traceable semantic descriptions of tactile experience?"
  },
  {
    id: "RQ3",
    shortName: "Educator interpretation",
    question: "What educator knowledge is needed to interpret and respond to learners' tactile expressions?"
  },
  {
    id: "RQ4",
    shortName: "Salience of semantic descriptions",
    question: "How salient and stable are the semantic descriptions of tactile experience across multiple sessions?"
  }
];

const contractRows = [
  {
    id: "RQ1",
    label: "RQ1: Tactile response patterns",
    elements: "Material selection and change, touch/manipulation type, task execution pattern, and pair or individual variation.",
    directEvidence: "Tabletop/front/top-down group video views, photos, and student-work traces showing material choice, action, repeat, avoid, switch, persist, or repair.",
    fieldNotes: "Record episode time range, task segment, material, visible hand/material action, repetition or avoidance, group/student code, and source link.",
    teacherContext: "Teacher labels for typicality, preference-like action, avoidance, help-seeking, task-driven action, and support context."
  },
  {
    id: "RQ2",
    label: "RQ2: Traceable semantic descriptions",
    elements: "Multimodal expression before interpretation, candidate semantic description, evidence link, uncertainty, and alternative meanings.",
    directEvidence: "Video/audio segment, photo, or student work reference tied to the observed expression or artifact trace.",
    fieldNotes: "Separate visible/heard expression, candidate semantic description, evidence link, confidence or limit, and teacher follow-up question.",
    teacherContext: "Teacher explanation only when it helps interpret meaning; teacher interpretation remains separate from direct observation."
  },
  {
    id: "RQ3",
    label: "RQ3: Educator interpretation",
    elements: "Teacher interpretation, classroom label, educator contextual knowledge, support decision, and misread boundary.",
    directEvidence: "Selected video clips, student work, and field notes used as prompts for teacher labeling and interview interpretation.",
    fieldNotes: "Mark the teacher follow-up question, classroom routine, support before/after the episode, and what researchers might misread.",
    teacherContext: "Teacher labels, classroom routine, learner history known to educators, support decisions, and interpretation boundaries."
  },
  {
    id: "RQ4",
    label: "RQ4: Salience of semantic descriptions",
    elements: "Cross-source recurrence, cross-session salience/stability, contradiction, and framework implication.",
    directEvidence: "Repeated links across video, field notes, work/photos, audio, and teacher interpretation over multiple sessions.",
    fieldNotes: "Mark whether a candidate description appears once, across multiple evidence sources, or across multiple sessions.",
    teacherContext: "Teacher confirmation, disagreement, or refinement across sessions; mark when evidence is too thin for salience claims."
  }
];

const columns = [
  { key: "elements", label: "Elements that need evidence" },
  { key: "directEvidence", label: "Direct evidence to collect" },
  { key: "fieldNotes", label: "Field notes focus" },
  { key: "teacherContext", label: "Teacher/context evidence needed" }
];

const mappingRows = [
  {
    source: "Group 360 video",
    rq1: "Primary",
    rq2: "Primary",
    rq3: "Support",
    rq4: "Primary across sessions",
    use: "Group-level front/tabletop/top-down views of material actions, expression, artifact-making process, orientation when visible, and peer/teacher interaction"
  },
  {
    source: "Field notes",
    rq1: "Primary",
    rq2: "Primary",
    rq3: "Primary",
    rq4: "Primary across sessions",
    use: "Episode traceability, observer notes, candidate descriptions, interpretation limits, and salience/stability flags"
  },
  {
    source: "Teacher labels",
    rq1: "Support",
    rq2: "Support",
    rq3: "Primary",
    rq4: "Primary across sessions",
    use: "Teacher naming of behaviors, classroom meaning, confirmation, disagreement, and later refinement"
  },
  {
    source: "Teacher interview",
    rq1: "Context",
    rq2: "Support",
    rq3: "Primary",
    rq4: "Support",
    use: "Educator knowledge, support decisions, interpretation limits, and follow-up checks"
  },
  {
    source: "Student work",
    rq1: "Support",
    rq2: "Support",
    rq3: "Context",
    rq4: "Support",
    use: "Artifact state, material trace, repair/change history, and evidence linked to candidate descriptions"
  },
  {
    source: "Photos/audio",
    rq1: "Support",
    rq2: "Support",
    rq3: "Support",
    rq4: "Support",
    use: "Supplementary source links for expression, work state, audio markers, and recurrence checks"
  },
  {
    source: "Cross-session memo",
    rq1: "Context",
    rq2: "Support",
    rq3: "Support",
    rq4: "Primary across sessions",
    use: "Session-by-session recurrence, contradiction, session-specific descriptions, and framework-candidate decisions"
  }
];

const dataAnalysis = window.DATA_ANALYSIS || {
  workbookHref: "../../WorkshopJune2/outputs/video_analysis_workbook.xlsx",
  keyEvents: [],
  actionMatrix: []
};

const state = {
  activePage: "matrix",
  selectedRq: "all",
  activeRq: "RQ1",
  query: "",
  visibleColumns: new Set(columns.map((column) => column.key)),
  relationAttribute: "all"
};

const pageTabs = Array.from(document.querySelectorAll("[data-page-tab]"));
const pagePanels = Array.from(document.querySelectorAll("[data-page-panel]"));
const tabsEl = document.querySelector("#rqTabs");
const matrixGridEl = document.querySelector("#matrixGrid");
const searchInput = document.querySelector("#searchInput");
const statusEl = document.querySelector("#matrixStatus");
const detailPanel = document.querySelector("#detailPanel");
const mappingGridEl = document.querySelector("#mappingGrid");
const attributeControls = document.querySelector("#attributeControls");
const resetButton = document.querySelector("#resetButton");
const columnInputs = Array.from(document.querySelectorAll("[data-column]"));
const workbookOpenButton = document.querySelector("#workbookOpenButton");
const keyEventsTableEl = document.querySelector("#keyEventsTable");
const keyEventsStatusEl = document.querySelector("#keyEventsStatus");
const actionMatrixTableEl = document.querySelector("#actionMatrixTable");
const actionMatrixStatusEl = document.querySelector("#actionMatrixStatus");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlight(value) {
  const safe = escapeHtml(value);
  const query = state.query.trim();
  if (!query) return safe;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(`(${escapedQuery})`, "gi"), "<mark>$1</mark>");
}

function getQuestion(id) {
  return rqs.find((rq) => rq.id === id);
}

function renderPageTabs() {
  pageTabs.forEach((button) => {
    const isActive = button.dataset.pageTab === state.activePage;
    button.setAttribute("aria-selected", String(isActive));
    button.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  pagePanels.forEach((panel) => {
    panel.hidden = panel.dataset.pagePanel !== state.activePage;
  });
}

function getFilteredRows() {
  const query = state.query.trim().toLowerCase();
  return contractRows.filter((row) => {
    const rqMatches = state.selectedRq === "all" || row.id === state.selectedRq;
    if (!rqMatches) return false;
    if (!query) return true;

    const question = getQuestion(row.id);
    const searchable = [
      row.label,
      question.shortName,
      question.question,
      row.elements,
      row.directEvidence,
      row.fieldNotes,
      row.teacherContext
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}

function renderTabs() {
  if (!tabsEl) return;

  const allCount = contractRows.length;
  const tabItems = [
    { id: "all", label: "All", shortName: `${allCount} RQs` },
    ...rqs
  ];

  tabsEl.innerHTML = tabItems
    .map((item) => {
      const isSelected = state.selectedRq === item.id;
      const title = item.id === "all" ? "Show all evidence contracts" : item.question;
      return `
        <button
          class="rq-tab"
          type="button"
          role="tab"
          data-rq="${item.id}"
          aria-selected="${isSelected}"
          title="${escapeHtml(title)}"
        >
          <span class="tab-id">${item.id}</span>
          <strong>${escapeHtml(item.id === "all" ? "All research questions" : item.shortName)}</strong>
          <span class="tab-title">${escapeHtml(item.id === "all" ? "Compare every evidence contract row" : item.question)}</span>
        </button>
      `;
    })
    .join("");

  tabsEl.querySelectorAll(".rq-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedRq = button.dataset.rq;
      const rows = getFilteredRows();
      if (rows.length) state.activeRq = rows[0].id;
      render();
    });
  });
}

function renderMatrix() {
  const visibleColumns = columns.filter((column) => state.visibleColumns.has(column.key));
  const rows = getFilteredRows();
  matrixGridEl.className = `matrix-grid columns-${visibleColumns.length + 1}`;

  const header = `
    <div class="matrix-head" role="row">
      <div class="matrix-cell" role="columnheader">RQ</div>
      ${visibleColumns.map((column) => `<div class="matrix-cell" role="columnheader">${escapeHtml(column.label)}</div>`).join("")}
    </div>
  `;

  if (!rows.length) {
    matrixGridEl.innerHTML = header + `
      <div class="matrix-cell empty-state" role="cell" style="grid-column: 1 / -1;">
        No rows match the current filter.
      </div>
    `;
    statusEl.textContent = "0 rows visible.";
    renderDetail(null);
    return;
  }

  const body = rows
    .map((row) => {
      const rq = getQuestion(row.id);
      const isActive = row.id === state.activeRq;
      return `
        <div
          class="matrix-row ${row.id.toLowerCase()} ${isActive ? "is-active" : ""}"
          role="row"
          tabindex="0"
          data-row="${row.id}"
          aria-label="${escapeHtml(row.label)}"
        >
          <div class="matrix-cell rq-cell" role="cell">
            <span class="rq-badge">${row.id}</span>
            <span class="rq-name">${escapeHtml(rq.shortName)}</span>
            <span class="rq-question">${highlight(rq.question)}</span>
          </div>
          ${visibleColumns
            .map((column) => `
              <div class="matrix-cell" role="cell">
                <span class="cell-label">${escapeHtml(column.label)}</span>
                ${highlight(row[column.key])}
              </div>
            `)
            .join("")}
        </div>
      `;
    })
    .join("");

  matrixGridEl.innerHTML = header + body;
  statusEl.textContent = `${rows.length} row${rows.length === 1 ? "" : "s"} visible. ${visibleColumns.length} contract column${visibleColumns.length === 1 ? "" : "s"} shown.`;

  matrixGridEl.querySelectorAll(".matrix-row").forEach((rowEl) => {
    const activate = () => {
      state.activeRq = rowEl.dataset.row;
      render();
    };
    rowEl.addEventListener("click", activate);
    rowEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  renderDetail(contractRows.find((row) => row.id === state.activeRq) || rows[0]);
}

function renderDetail(row) {
  if (!row) {
    detailPanel.innerHTML = `
      <div class="empty-state">Select another filter or clear search to inspect an RQ.</div>
    `;
    return;
  }

  const rq = getQuestion(row.id);
  detailPanel.className = `detail-panel ${row.id.toLowerCase()}`;
  detailPanel.innerHTML = `
    <div>
      <h3>${escapeHtml(row.label)}</h3>
      <p class="detail-question">${highlight(rq.question)}</p>
    </div>
    <div class="detail-grid">
      ${columns
        .map((column) => `
          <article class="detail-item">
            <h4>${escapeHtml(column.label)}</h4>
            <p>${highlight(row[column.key])}</p>
          </article>
        `)
        .join("")}
    </div>
  `;
}

function getRelationAttribute(value) {
  return value === "Primary" ? "primary" : "support";
}

function renderRelationPill(value) {
  const attribute = getRelationAttribute(value);
  return `
    <span class="relation-pill ${attribute}" data-label="${escapeHtml(value)}">
      ${escapeHtml(value)}
    </span>
  `;
}

function renderMappingMatrix() {
  const rqKeys = rqs.map((rq) => rq.id.toLowerCase());
  const header = `
    <div class="mapping-head" role="row">
      <div class="mapping-cell" role="columnheader">Data Source</div>
      ${rqs.map((rq) => `<div class="mapping-cell" role="columnheader">${escapeHtml(rq.id)}</div>`).join("")}
      <div class="mapping-cell" role="columnheader">Use</div>
    </div>
  `;

  const body = mappingRows
    .map((row) => `
      <div class="mapping-row" role="row">
        <div class="mapping-cell source-cell" role="cell">${escapeHtml(row.source)}</div>
        ${rqKeys
          .map((key, index) => {
            const attribute = getRelationAttribute(row[key]);
            const isDimmed = state.relationAttribute !== "all" && state.relationAttribute !== attribute;
            return `
              <div class="mapping-cell relation-cell ${isDimmed ? "is-dimmed" : ""}" role="cell" data-rq="RQ${index + 1}" data-attribute="${attribute}">
                ${renderRelationPill(row[key])}
              </div>
            `;
          })
          .join("")}
        <div class="mapping-cell use-cell" role="cell">${escapeHtml(row.use)}</div>
      </div>
    `)
    .join("");

  mappingGridEl.innerHTML = header + body;

  attributeControls.querySelectorAll(".attribute-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.attribute === state.relationAttribute));
  });
}

function getRqLinkClass(token) {
  const upperToken = String(token).toUpperCase();
  if (upperToken.startsWith("RQ1")) return "rq1";
  if (upperToken.startsWith("RQ2")) return "rq2";
  if (upperToken.startsWith("RQ3")) return "rq3";
  if (upperToken.startsWith("RQ4")) return "rq4";
  if (upperToken.includes("TBD")) return "tbd";
  return "other";
}

function renderRqLinks(value) {
  const links = String(value || "")
    .split(/[;,]/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!links.length) {
    return `<span class="rq-link-pill tbd">TBD</span>`;
  }

  return `
    <span class="rq-link-list">
      ${links
        .map((link) => `
          <span class="rq-link-pill ${getRqLinkClass(link)}">${escapeHtml(link)}</span>
        `)
        .join("")}
    </span>
  `;
}

function renderKeyEventsTable() {
  if (!keyEventsTableEl || !keyEventsStatusEl) return;

  const rows = dataAnalysis.keyEvents || [];
  keyEventsStatusEl.textContent = `${rows.length} event${rows.length === 1 ? "" : "s"}`;

  const body = rows.length
    ? rows
        .map((row) => `
          <tr>
            <td data-label="Inlined student code"><span class="student-code">${escapeHtml(row.inlinedStudentCode)}</span></td>
            <td data-label="Task segment">${escapeHtml(row.taskSegment)}</td>
            <td data-label="Event type"><code class="code-token">${escapeHtml(row.eventType)}</code></td>
            <td data-label="RQ links">${renderRqLinks(row.rqLinks)}</td>
          </tr>
        `)
        .join("")
    : `
      <tr>
        <td class="empty-state" colspan="4">No key events are available from the workbook export.</td>
      </tr>
    `;

  keyEventsTableEl.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Inlined student code</th>
        <th scope="col">Task segment</th>
        <th scope="col">Event type</th>
        <th scope="col">RQ links</th>
      </tr>
    </thead>
    <tbody>${body}</tbody>
  `;
}

function renderActionMatrixTable() {
  if (!actionMatrixTableEl || !actionMatrixStatusEl) return;

  const rows = dataAnalysis.actionMatrix || [];
  actionMatrixStatusEl.textContent = `${rows.length} code${rows.length === 1 ? "" : "s"}`;
  let lastStep = "";

  const body = rows.length
    ? rows
        .map((row) => {
          const startsStep = row.codingStep !== lastStep;
          lastStep = row.codingStep;
          return `
            <tr class="${startsStep ? "is-step-start" : ""}">
              <td data-label="Coding step">${escapeHtml(row.codingStep)}</td>
              <td data-label="Workbook column"><code class="code-token">${escapeHtml(row.workbookColumn)}</code></td>
              <td data-label="Code value"><code class="code-token">${escapeHtml(row.codeValue)}</code></td>
            </tr>
          `;
        })
        .join("")
    : `
      <tr>
        <td class="empty-state" colspan="3">No action matrix codes are available from the workbook export.</td>
      </tr>
    `;

  actionMatrixTableEl.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Coding step</th>
        <th scope="col">Workbook column</th>
        <th scope="col">Code value</th>
      </tr>
    </thead>
    <tbody>${body}</tbody>
  `;
}

function renderDataAnalysisPage() {
  if (workbookOpenButton && dataAnalysis.workbookHref) {
    workbookOpenButton.href = dataAnalysis.workbookHref;
  }
  renderKeyEventsTable();
  renderActionMatrixTable();
}

function render() {
  renderPageTabs();
  renderTabs();
  renderMatrix();
  renderMappingMatrix();
  renderDataAnalysisPage();
}

pageTabs.forEach((button, index) => {
  button.addEventListener("click", () => {
    state.activePage = button.dataset.pageTab;
    renderPageTabs();
  });

  button.addEventListener("keydown", (event) => {
    const lastIndex = pageTabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (nextIndex === index) return;

    event.preventDefault();
    pageTabs[nextIndex].focus();
    state.activePage = pageTabs[nextIndex].dataset.pageTab;
    renderPageTabs();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  const rows = getFilteredRows();
  if (rows.length && !rows.some((row) => row.id === state.activeRq)) {
    state.activeRq = rows[0].id;
  }
  render();
});

columnInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      state.visibleColumns.add(input.dataset.column);
    } else if (state.visibleColumns.size > 1) {
      state.visibleColumns.delete(input.dataset.column);
    } else {
      input.checked = true;
    }
    renderMatrix();
  });
});

resetButton.addEventListener("click", () => {
  state.activePage = "matrix";
  state.selectedRq = "all";
  state.activeRq = "RQ1";
  state.query = "";
  state.visibleColumns = new Set(columns.map((column) => column.key));
  state.relationAttribute = "all";
  searchInput.value = "";
  columnInputs.forEach((input) => {
    input.checked = true;
  });
  render();
});

attributeControls.querySelectorAll(".attribute-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.relationAttribute = button.dataset.attribute;
    renderMappingMatrix();
  });
});

render();
