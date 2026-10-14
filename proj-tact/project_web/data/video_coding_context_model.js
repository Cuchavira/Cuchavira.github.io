window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

// Canonical context model for production video-coding units.
// Confirmed by the researcher on 2026-08-19 and aligned with the project
// records describing four group-camera exports per workshop.
window.PROJECT_WEB_DATA.videoCodingContextModel = {
  version: "2026-08-19",
  sourceVideoUnit: "One workshop-by-group 360-degree video export",
  codingUnit: "One student within one workshop session",
  workshopCodes: [
    { code: "S1", date: "2026-06-02", label: "June 2 workshop" },
    { code: "S2", date: "2026-06-09", label: "June 9 workshop" },
    { code: "S3", date: "2026-06-16", label: "June 16 workshop" },
    { code: "S4", date: "2026-06-23", label: "June 23 workshop" }
  ],
  participantCodes: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
  groups: [
    { code: "G1", participants: ["P1", "P2"], videoLabel: "P1+P2" },
    { code: "G2", participants: ["P3", "P4"], videoLabel: "P3+P4" },
    { code: "G3", participants: ["P5", "P6"], videoLabel: "P5+P6" },
    { code: "G4", participants: ["P7"], videoLabel: "P7" }
  ],
  sourceVideoIdPattern: "S{workshop}-P{participant}[+P{participant}]",
  codingUnitIdPattern: "S{workshop}-P{participant}",
  sourceVideosPerWorkshop: 4,
  sourceVideoCount: 16,
  codingUnitsPerWorkshop: 7,
  codingUnitCount: 28,
  assignmentRule: {
    researchers: ["R1", "R2", "R3", "R4"],
    codersPerCodingUnit: 2,
    assignmentsPerResearcher: 14,
    sharedVideoPairing: "Students sharing one source video use the same researcher pair",
    independentBeforeReconciliation: true
  }
};
