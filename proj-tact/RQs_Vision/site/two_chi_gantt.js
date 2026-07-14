const timelineStart = new Date("2026-06-08T00:00:00");
const timelineEnd = new Date("2026-09-10T00:00:00");
const weekMs = 7 * 24 * 60 * 60 * 1000;

const sources = {
  tactPlan: "file:///Users/vaporfish/dev/proj-tact/active_task_plan.md",
  tactSite: "file:///Users/vaporfish/dev/proj-tact/project_web/index.html#rq",
  oozePlan: "file:///Users/vaporfish/dev/Ooze/plan/4971_ooze_chi2027_summer_revision_plan.md",
  oozeChecklist: "file:///Users/vaporfish/dev/Ooze/plan/4971_ooze_added_study_protocol_checklist.md",
  pqePlan: "file:///Users/vaporfish/dev/PhDResearchJourney/plans/pqe_aug15_timeline_control_plan_20260608.md",
  pqeTracker: "file:///Users/vaporfish/dev/PhDResearchJourney/plans/pqe_strict_prisma_chapter_writing_progress_20260607.md"
};

const tasks = [
  {
    id: "tact-video-analysis",
    track: "tact",
    row: "Touch-to-Meaning",
    title: "June workshop analysis",
    dates: "Jun 8 to Jun 15",
    start: "2026-06-08",
    end: "2026-06-15",
    summary: "Finish first-pass video analysis, RQ mapping, evidence-gap list, and next-visit preparation from the active project plan.",
    actions: ["Filter existing logs", "Map themes to RQ1-RQ4", "Write evidence gaps", "Prepare next visit"],
    sourceKey: "tactPlan"
  },
  {
    id: "tact-repeat-sessions",
    track: "tact",
    row: "Touch-to-Meaning",
    title: "Repeat and evidence-gap visits",
    dates: "Jun 16 to Jun 30",
    start: "2026-06-16",
    end: "2026-06-30",
    summary: "Collect repeated or focused evidence for RQ1-RQ4 while keeping raw identifiable data outside the repo.",
    actions: ["Run repeat session", "Capture field notes", "Collect artifact photos", "Update consent boundaries"],
    sourceKey: "tactPlan"
  },
  {
    id: "tact-validation",
    track: "tact",
    row: "Touch-to-Meaning",
    title: "Teacher validation and protocol update",
    dates: "Jul 1 to Jul 15",
    start: "2026-07-01",
    end: "2026-07-15",
    summary: "Use teacher interpretation and RQ-data mapping updates to stabilize the framework evidence boundaries.",
    actions: ["Review clips with teachers", "Update RQ-data mapping", "Mark unsupported claims", "Refine framework categories"],
    sourceKey: "tactSite"
  },
  {
    id: "tact-framework-draft",
    track: "tact",
    row: "Touch-to-Meaning",
    title: "Framework draft",
    dates: "Jul 16 to Jul 31",
    start: "2026-07-16",
    end: "2026-07-31",
    summary: "Draft the Touch-to-Meaning methods, results, framework, and evidence-linked vignettes.",
    actions: ["Draft methods", "Write evidence vignettes", "Build framework figure", "Check claim boundaries"],
    sourceKey: "tactPlan"
  },
  {
    id: "tact-august-revision",
    track: "tact",
    row: "Touch-to-Meaning",
    title: "CHI revision and audit",
    dates: "Aug 1 to Aug 31",
    start: "2026-08-01",
    end: "2026-08-31",
    summary: "Revise figures, anonymization, advisor feedback, and claim boundaries before CHI readiness decisions.",
    actions: ["Revise with feedback", "Check anonymization", "Polish figures", "Prepare readiness decision"],
    sourceKey: "tactPlan"
  },
  {
    id: "ooze-task-design",
    track: "ooze",
    row: "Ooze",
    title: "Task design and confirmation",
    dates: "Jun 8 to Jun 14",
    start: "2026-06-08",
    end: "2026-06-14",
    summary: "Confirm number/time task scope, school conditions, consent, baseline materials, scoring, and data-capture needs before implementation.",
    actions: ["Confirm task scope", "Confirm school and consent conditions", "Confirm baseline/Ooze materials", "Confirm logging and scoring"],
    sourceKey: "oozePlan"
  },
  {
    id: "ooze-prototype-implementation",
    track: "ooze",
    row: "Ooze",
    title: "Prototype update and implementation",
    dates: "Jun 15 to Jun 22",
    start: "2026-06-15",
    end: "2026-06-22",
    summary: "Update the number/time prototype content, implement task flows, and verify interaction, projection, scoring, and logging behavior.",
    actions: ["Update number/time content", "Implement task flows", "Test Move/Press/Rotate mappings", "Verify projection, logging, and scoring"],
    sourceKey: "oozePlan"
  },
  {
    id: "ooze-add-on-study",
    track: "ooze",
    row: "Ooze",
    title: "Add-on study",
    dates: "Jun 23 to Jul 2",
    start: "2026-06-23",
    end: "2026-07-02",
    summary: "Run baseline/Ooze number and time sessions when school access allows, then classify data quality and close classroom-facing work by July 2.",
    actions: ["Run baseline/Ooze sessions", "Collect score/log/video IDs", "Record teacher notes", "Classify missing or unusable data"],
    sourceKey: "oozeChecklist"
  },
  {
    id: "ooze-revision-writing",
    track: "ooze",
    row: "Ooze",
    title: "Revision writing and new-study integration",
    dates: "Jul 3 to Jul 14",
    start: "2026-07-03",
    end: "2026-07-14",
    summary: "Turn new-study evidence into conservative revision-writing material while preparing method, results, limitation, and table text.",
    actions: ["Clean new-study evidence", "Write exploratory results", "Update study-method wording", "Connect findings to conservative claims"],
    sourceKey: "oozePlan"
  },
  {
    id: "ooze-rewrite",
    track: "ooze",
    row: "Ooze",
    title: "CHI manuscript rewrite",
    dates: "Jul 15 to Jul 31",
    start: "2026-07-15",
    end: "2026-07-31",
    summary: "Reframe Ooze as a conservative CHI system paper with geometry as core evidence and number/time as bounded extension.",
    actions: ["Revise contribution framing", "Integrate new-study subsection/table", "Add limitations", "Align with reviewer repair"],
    sourceKey: "oozePlan"
  },
  {
    id: "ooze-august-revision",
    track: "ooze",
    row: "Ooze",
    title: "Advisor revision and readiness",
    dates: "Aug 1 to Aug 31",
    start: "2026-08-01",
    end: "2026-08-31",
    summary: "Complete advisor/coauthor review, anonymization, accessibility checks, and final CHI readiness checks.",
    actions: ["Process advisor feedback", "Run anonymization check", "Check accessibility", "Finalize CHI package"],
    sourceKey: "oozePlan"
  },
  {
    id: "pqe-ch5-insertion",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Ch5 insertion and control setup",
    dates: "Jun 8 to Jun 15",
    start: "2026-06-08",
    end: "2026-06-15",
    summary: "Lock the Aug 15 control plan, resolve Ch5 citation keys, insert Ch5 expansion, and rebuild the PDF.",
    actions: ["Resolve Ch5 keys", "Insert Ch5 prose", "Rebuild ACM PDF", "Update tracker"],
    sourceKey: "pqePlan"
  },
  {
    id: "pqe-ch3-ch5",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Ch3-Ch5 expansion",
    dates: "Jun 16 to Jun 30",
    start: "2026-06-16",
    end: "2026-06-30",
    summary: "Expand Tangible Computing, Neurodivergent Learning, and Sensory/Haptics chapters into field-survey prose.",
    actions: ["Expand Ch3", "Expand Ch4", "Expand Ch5", "Check citation distribution"],
    sourceKey: "pqePlan"
  },
  {
    id: "pqe-ch6-ch9",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Ch6-Ch9 expansion",
    dates: "Jul 1 to Jul 15",
    start: "2026-07-01",
    end: "2026-07-15",
    summary: "Complete learning ecology, participatory methods, adaptive systems, and final synthesis chapters.",
    actions: ["Expand Ch6", "Expand Ch7", "Expand Ch8", "Rebuild Ch9 synthesis"],
    sourceKey: "pqePlan"
  },
  {
    id: "pqe-report-integration",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Full report integration",
    dates: "Jul 16 to Jul 31",
    start: "2026-07-16",
    end: "2026-07-31",
    summary: "Run report integration, citation audit, terminology scan, appendix links, figure polish, and page-count checks.",
    actions: ["Integrate full report", "Audit citations", "Scan terminology", "Polish appendix links"],
    sourceKey: "pqeTracker"
  },
  {
    id: "pqe-distribution",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Written package",
    dates: "Aug 1 to Aug 6",
    start: "2026-08-01",
    end: "2026-08-06",
    summary: "Prepare written-material package, source archive, evidence links, and supervisor handoff manifest.",
    actions: ["Export report", "Package source", "List evidence links", "Write handoff manifest"],
    sourceKey: "pqePlan"
  },
  {
    id: "pqe-final-control",
    track: "pqe",
    row: "PQE / Systematic Review",
    title: "Slides, Q&A, final control",
    dates: "Aug 7 to Aug 15",
    start: "2026-08-07",
    end: "2026-08-15",
    summary: "Build oral slides, speaker notes, Q&A bank, final checks, and Aug 15 ready package.",
    actions: ["Build slide deck", "Write speaker notes", "Draft Q&A bank", "Run final checklist"],
    sourceKey: "pqePlan"
  },
  {
    id: "pqe-aug15-deadline",
    track: "pqe",
    kind: "deadline",
    row: "PQE / Systematic Review",
    title: "PQE control deadline",
    dates: "Aug 15",
    start: "2026-08-15",
    end: "2026-08-15",
    summary: "Final control deadline for the PQE/systematic-review report, slides, Q&A, and share package.",
    actions: ["Confirm report package", "Confirm oral package", "Record unresolved risks", "Freeze share package"],
    sourceKey: "pqePlan"
  },
  {
    id: "chi-submission-deadline",
    track: "deadline",
    kind: "deadline",
    row: "CHI tracks",
    title: "CHI 2027 full paper deadline",
    dates: "Sep 10",
    start: "2026-09-10",
    end: "2026-09-10",
    summary: "Full-paper submission deadline for Touch-to-Meaning and Ooze if each paper reaches evidence-bounded readiness.",
    actions: ["Submit only ready papers", "Check anonymized files", "Attach supplements", "Archive submission package"],
    sourceKey: "oozePlan"
  }
];

const milestones = [
  {
    gate: "Touch-to-Meaning evidence gate",
    date: "Jul 15",
    condition: "RQ-linked evidence, teacher validation path, and unsupported-claim boundaries are clear before framework drafting."
  },
  {
    gate: "Ooze study-complete gate",
    date: "Jul 2",
    condition: "Added number/time study work is closed or downgraded to pilot/future-work evidence before July writing starts."
  },
  {
    gate: "PQE full-chapter gate",
    date: "Jul 15",
    condition: "Ch3-Ch9 have complete prose drafts and map back to supervisor revision comments."
  },
  {
    gate: "PQE final control deadline",
    date: "Aug 15",
    condition: "Report package, slides, Q&A bank, evidence links, and unresolved-risk list are complete."
  },
  {
    gate: "CHI submission deadline",
    date: "Sep 10",
    condition: "Touch-to-Meaning and Ooze are submitted only if each is stand-alone and evidence-bounded."
  }
];

let activeFilter = "all";
let expandedTaskId = null;

const calendarEl = document.querySelector("#calendar");
const ganttGridEl = document.querySelector("#ganttGrid");
const milestoneRowsEl = document.querySelector("#milestoneRows");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function daysBetween(start, end) {
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getOffsetPercent(task) {
  const start = parseDate(task.start);
  const totalDays = daysBetween(timelineStart, timelineEnd);
  const offset = clamp(daysBetween(timelineStart, start), 0, totalDays);
  return (offset / totalDays) * 100;
}

function getWidthPercent(task) {
  const start = parseDate(task.start);
  const end = parseDate(task.end);
  const totalDays = daysBetween(timelineStart, timelineEnd);
  const duration = task.start === task.end ? 2 : daysBetween(start, end) + 1;
  return clamp((duration / totalDays) * 100, 1.8, 100);
}

function getVisibleTasks() {
  if (activeFilter === "all") return tasks;
  if (activeFilter === "deadline") return tasks.filter((task) => task.kind === "deadline");
  return tasks.filter((task) => task.track === activeFilter);
}

function renderCalendar() {
  const weeks = [];
  let date = new Date(timelineStart);

  while (date <= timelineEnd) {
    weeks.push(new Date(date));
    date = new Date(date.getTime() + weekMs);
  }

  calendarEl.innerHTML = `
    <div class="label-cell">Process</div>
    ${weeks
      .map((week) => {
        const month = week.toLocaleString("en-US", { month: "short" });
        const day = week.getDate();
        return `<div class="week-cell">${month} ${day}</div>`;
      })
      .join("")}
  `;
}

function renderGantt() {
  const visibleTasks = getVisibleTasks();
  ganttGridEl.innerHTML = visibleTasks
    .map((task) => {
      const left = getOffsetPercent(task);
      const width = getWidthPercent(task);
      const href = sources[task.sourceKey] || sources.tactPlan;
      const expanded = task.id === expandedTaskId;
      const edgeAligned = left > 82;
      return `
        <div class="gantt-row${expanded ? " is-expanded" : ""}">
          <div class="row-label">
            <strong>${task.title}</strong>
            <span>${task.row}</span>
          </div>
          <div class="bar-cell">
            <article
              class="gantt-bar${expanded ? " is-expanded" : ""}${edgeAligned ? " is-edge" : ""}"
              data-track="${task.track}"
              data-kind="${task.kind || "task"}"
              style="left: ${left}%; width: ${width}%;"
            >
              <button
                type="button"
                class="gantt-toggle"
                data-task-id="${task.id}"
                aria-expanded="${expanded}"
                aria-label="${task.title}, ${task.dates}. ${expanded ? "Collapse actions" : "Expand actions"}"
              >
                <span class="bar-title">${task.title}</span>
                <small>${task.dates}</small>
                <span class="bar-summary">${task.summary}</span>
              </button>
              ${
                expanded
                  ? `
                    <div class="bar-details">
                      <span class="bar-detail-label">Sub actions</span>
                      <ul>
                        ${task.actions.map((action) => `<li>${action}</li>`).join("")}
                      </ul>
                      <a class="bar-source" href="${href}">Open source</a>
                    </div>
                  `
                  : ""
              }
            </article>
          </div>
        </div>
      `;
    })
    .join("");

  ganttGridEl.querySelectorAll("[data-task-id]").forEach((button) => {
    button.addEventListener("click", () => {
      expandedTaskId = expandedTaskId === button.dataset.taskId ? null : button.dataset.taskId;
      render();
    });
  });
}

function renderMilestones() {
  milestoneRowsEl.innerHTML = milestones
    .map(
      (milestone) => `
        <tr>
          <td><strong>${milestone.gate}</strong></td>
          <td>${milestone.date}</td>
          <td>${milestone.condition}</td>
        </tr>
      `
    )
    .join("");
}

function renderFilters() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter);
  });
}

function render() {
  renderFilters();
  renderCalendar();
  renderGantt();
  renderMilestones();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    if (!getVisibleTasks().some((task) => task.id === expandedTaskId)) {
      expandedTaskId = null;
    }
    render();
  });
});

render();
