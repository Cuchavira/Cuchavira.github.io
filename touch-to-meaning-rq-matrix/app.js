const rqs = [
  {
    id: "RQ1",
    shortName: "Tactile patterns",
    question: "What tactile/material interaction patterns emerge across sessions?"
  },
  {
    id: "RQ2",
    shortName: "Evidence-linked interpretation",
    question: "How can observed actions/expressions be coded into traceable descriptions, and what teacher knowledge is needed?"
  },
  {
    id: "RQ3",
    shortName: "Engagement and learning link",
    question: "How do tactile/material actions appear to support engagement and number/time sense-making?"
  }
];

const contractRows = [
  {
    id: "RQ1",
    label: "RQ1: Tactile patterns",
    elements: "Material choice, touch/manipulation type, repetition or avoidance, task-stage context, pair or individual variation.",
    directEvidence: "Front/tabletop/top-down views from group 360 video, photos, and student work process traces.",
    fieldNotes: "Record time range, task segment, material involved, visible hand/material action, repetition or avoidance, group/student code, and evidence source to check later.",
    teacherContext: "Teacher labels for whether an action is typical, unusual, preference-like, avoidance-like, help-seeking, or task-driven."
  },
  {
    id: "RQ2",
    label: "RQ2: Evidence-linked interpretation",
    elements: "Observable action or expression, source link, teacher interpretation, uncertainty, possible alternative meanings.",
    directEvidence: "Video/audio segment, photo, or student work reference tied to the observed action.",
    fieldNotes: "Separate observed action, possible interpretation, question for teacher follow-up, confidence level, and evidence link.",
    teacherContext: "Teacher explanation of classroom meaning, support needs, behavior label, or why a researcher might misread the moment."
  },
  {
    id: "RQ3",
    label: "RQ3: Engagement and learning link",
    elements: "Attention to task, persistence or return to task, material-supported participation, clock/number/time representation, teacher support, artifact outcome.",
    directEvidence: "360 video, student work, photos, and teacher-rated knowledge score when scale is confirmed.",
    fieldNotes: "Note task engagement signs, clock/time link, teacher support, artifact state, difficulty or success moment, and whether the material seemed to help, distract, or require adaptation.",
    teacherContext: "Teacher judgment of clock/time understanding, support level, task fit, and whether the material action helped or distracted."
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
    rq3: "Primary",
    use: "June 2 group-level front/tabletop/top-down views of material actions, artifact-making process, orientation when visible, peer/teacher interaction"
  },
  {
    source: "Field notes",
    rq1: "Primary",
    rq2: "Support",
    rq3: "Support",
    use: "Context and researcher observations"
  },
  {
    source: "Teacher labels",
    rq1: "Support",
    rq2: "Primary",
    rq3: "Primary",
    use: "Teacher naming and interpretation of behaviors"
  },
  {
    source: "Teacher interview",
    rq1: "Context",
    rq2: "Primary",
    rq3: "Support",
    use: "Educator knowledge and interpretation limits"
  },
  {
    source: "Student work",
    rq1: "Support",
    rq2: "Context",
    rq3: "Primary",
    use: "Clock artifact and number/time representation"
  },
  {
    source: "Photos/audio",
    rq1: "Support",
    rq2: "Support",
    rq3: "Support",
    use: "Evidence backup"
  },
  {
    source: "Knowledge score",
    rq1: "Context",
    rq2: "Context",
    rq3: "Support",
    use: "Pre/post teacher rating, scale pending"
  }
];

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

function escapeHtml(value) {
  return value
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
  const rqKeys = ["rq1", "rq2", "rq3"];
  const header = `
    <div class="mapping-head" role="row">
      <div class="mapping-cell" role="columnheader">Data Source</div>
      <div class="mapping-cell" role="columnheader">RQ1</div>
      <div class="mapping-cell" role="columnheader">RQ2</div>
      <div class="mapping-cell" role="columnheader">RQ3</div>
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

function render() {
  renderPageTabs();
  renderTabs();
  renderMatrix();
  renderMappingMatrix();
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
