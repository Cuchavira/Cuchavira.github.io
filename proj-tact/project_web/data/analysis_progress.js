window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

// Project progress dashboard for the video-coding workflow.
// Sourced from the current readiness gates, the RC4 calibration package, the
// first R1-R2-R3 pilot IRR bundle, and the R1-R3-R4 S1-S2 bundles that exclude
// R2 after the wrong-video issue was confirmed (2026-08-18/19).
window.PROJECT_WEB_DATA.analysisProgress = {
  statusDate: "2026-08-19",
  phase: "Goal 3 — calibration pilot in progress",
  headline:
    "All prerequisite gates are complete. Round 1 remains as the historical baseline; the current calibration round reports R1, R3, and R4 after excluding R2's wrong-video coding, including a reduced-tier projection for targeted rule refinement.",
  // Task cards drive the completion percentage and the status chips.
  tasks: [
    { title: "Workflow infrastructure (G0)", detail: "Canonical folders and initial templates verified across all nine areas.", status: "completed" },
    { title: "Coder assignment matrix", detail: "Sixteen shared source videos yield 28 student-level Sx-Px coding units; every unit has two independent researchers and all workload checks pass.", status: "completed" },
    { title: "Codebook v1.1-RC4 package", detail: "Codebook, eight controlled vocabularies, and 14-tier ELAN template synchronized and validated.", status: "completed" },
    { title: "Assignment visualizations", detail: "Coverage heatmap and coder-overlap network generated from the matrix.", status: "completed" },
    { title: "Governance clarification (G1)", detail: "Governance and data-readiness prerequisites for calibration are recorded as complete.", status: "completed" },
    { title: "Method & codebook freeze (G2)", detail: "Episode unitization, tier architecture, and the RC4 calibration package are fixed for this pilot round.", status: "completed" },
    { title: "Calibration pilot (G3)", detail: "The historical Round 1 baseline and the R2-excluded R1/R3/R4 S1-S2 agreement round are complete; consensus review and fresh independent recoding remain in progress.", status: "in-progress" },
    { title: "Production coding (G4)", detail: "Pending completion of consensus review and the next calibration threshold check.", status: "pending" },
    { title: "Production-corpus reliability (G5)", detail: "The reported coefficients are a pilot baseline; production reliability has not started.", status: "pending" },
    { title: "Analysis & reporting (G6)", detail: "Audit closed, analysis plan executed, claims traced to evidence.", status: "pending" }
  ],
  // Readiness gates rendered as a milestone timeline.
  milestones: [
    { id: "G0", label: "Infrastructure", status: "completed" },
    { id: "G1", label: "Governance", status: "completed" },
    { id: "G2", label: "Method & codebook", status: "completed" },
    { id: "G3", label: "Calibration pilot", status: "in-progress" },
    { id: "G4", label: "Production coding", status: "pending" },
    { id: "G5", label: "Production reliability", status: "pending" },
    { id: "G6", label: "Analysis / reporting", status: "pending" }
  ],
  pilotIrr: {
    eyebrow: "Calibration pilot · Round 1",
    title: "First three-rater inter-rater reliability baseline",
    sourceLabel: "IRR v2 · 25 Jul 2026",
    summary:
      "R1, R2, and R3 independently applied eight nominal coding dimensions to the same five pilot videos. Agreement varied substantially by dimension, identifying concrete targets for consensus review; these pilot estimates do not establish production-ready reliability.",
    coverage: [
      { value: "5", label: "videos triple-coded" },
      { value: "61", label: "shared episodes" },
      { value: "110", label: "participant-episodes" },
      { value: "684 / 684", label: "decisions complete" },
      { value: "38.0%", label: "unanimous decisions" },
      { value: "424", label: "non-unanimous decisions" }
    ],
    videos: [
      { id: "S1-G1", episodes: 19 },
      { id: "S2-G2", episodes: 10 },
      { id: "S3-G2", episodes: 12 },
      { id: "S3-G3", episodes: 8 },
      { id: "S3-G4", episodes: 12 }
    ],
    pairwise: [
      { pair: "R1-R2", agreement: "47.4%" },
      { pair: "R1-R3", agreement: "65.4%" },
      { pair: "R2-R3", agreement: "50.0%" }
    ],
    metricMethod: {
      title: "IRR coefficient selection",
      summary:
        "The coefficient follows the number of independent coders and the nominal category structure at each coding dimension.",
      rules: [
        { label: "Two-coder comparison", value: "Nominal Cohen κ", detail: "Use for pairwise R1–R2, R1–R3, or R2–R3 comparisons." },
        { label: "Three-coder subset", value: "Fleiss κ", detail: "Use for the complete R1–R2–R3 pilot units shown below." },
        { label: "Additional diagnostic", value: "Nominal Krippendorff α", detail: "Report alongside κ for the dimension-level reliability bundle." },
        { label: "Pooled coefficient", value: "Not used", detail: "The eight dimensions have different category spaces, so no single pooled κ is treated as primary." }
      ]
    },
    dimensions: [
      { name: "Group interaction", n: 61, unanimous: "55.7%", fleiss: "0.454", alpha: "0.457" },
      { name: "Facilitation", n: 61, unanimous: "42.6%", fleiss: "0.428", alpha: "0.431" },
      { name: "Artifact trace", n: 61, unanimous: "42.6%", fleiss: "0.030", alpha: "0.036" },
      { name: "Task meaning trace", n: 61, unanimous: "52.5%", fleiss: "0.035", alpha: "0.041" },
      { name: "Material focus", n: 110, unanimous: "30.0%", fleiss: "0.307", alpha: "0.309" },
      { name: "Material engagement", n: 110, unanimous: "24.5%", fleiss: "0.025", alpha: "0.028" },
      { name: "Participation mode", n: 110, unanimous: "55.5%", fleiss: "0.134", alpha: "0.136" },
      { name: "Expression form", n: 110, unanimous: "19.1%", fleiss: "0.111", alpha: "0.114" }
    ],
    notes: [
      "The five video exports share the same 61 episode spans, so these coefficients assess categorical coding agreement rather than independent episode-unitization reliability.",
      "Group interaction had the highest Fleiss’ kappa (0.454); Material engagement had the lowest (0.025). The values are calibration signals, not pass/fail judgments.",
      "Coder identity in the R2 and R3 EAF metadata still requires audit confirmation; filenames are the provisional identity source for this calculation."
    ]
  },
  calibrationRound2: {
    eyebrow: "Calibration pilot · R2-excluded round",
    title: "Final R1 / R3 / R4 agreement on coded S1-S2 episodes",
    sourceLabel: "Corrected 19 Aug 2026",
    summary:
      "R2 is fully excluded because the wrong video was loaded. The final result uses R1, R3, and R4 across four shared S1-S2 cases and the six single-code tiers retained in ControlledVocabulary_new.xlsx; consensus labels are not used.",
    coverage: [
      { value: "3", label: "included coders" },
      { value: "4", label: "shared cases" },
      { value: "12", label: "locked EAF files" },
      { value: "205", label: "valid episode-tier decisions" },
      { value: "47.8%", label: "three-coder exact agreement" },
      { value: "0.599", label: "overall Fleiss κ" }
    ],
    cases: [
      { id: "S1-P1", episodes: 20 },
      { id: "S1-P2", episodes: 9 },
      { id: "S2-P3", episodes: 13 },
      { id: "S2-P4", episodes: 35 }
    ],
    overall: {
      n: 205,
      exact: "47.8% (98/205)",
      pairwiseAgreement: "62.4%",
      fleiss: "0.599",
      r13: "0.635",
      r14: "0.590",
      r34: "0.574"
    },
    dimensions: [
      { name: "Group interaction", n: 35, exact: "45.7%", fleiss: "0.237", r13: "0.216", r14: "0.299", r34: "0.251" },
      { name: "Facilitation", n: 36, exact: "36.1%", fleiss: "0.369", r13: "0.322", r14: "0.565", r34: "0.274" },
      { name: "Material focus", n: 33, exact: "75.8%", fleiss: "0.731", r13: "0.818", r14: "0.751", r34: "0.627" },
      { name: "Material engagement", n: 34, exact: "52.9%", fleiss: "0.352", r13: "0.308", r14: "0.298", r34: "0.499" },
      { name: "Expression form — Vocal", n: 36, exact: "36.1%", fleiss: "0.331", r13: "0.447", r14: "0.196", r34: "0.374" },
      { name: "Expression form — Nonvocal", n: 31, exact: "41.9%", fleiss: "0.320", r13: "0.514", r14: "0.292", r34: "0.184" }
    ],
    notes: [
      "R2 is fully excluded because the wrong video was loaded; no R2 columns enter the aligned data or calculations.",
      "The final vocabulary retains six single-code tiers and 43 values. Source inspection found zero multi-code R1/R3/R4 records in either Expression Form tier.",
      "Participation Mode, Artifact Trace, and Task Meaning Trace are excluded; removed historical values are not remapped.",
      "This is a projected diagnostic from historical RC7 annotations, not fresh reliability evidence collected with the revised six-tier instrument."
    ]
  },
  codebook: {
    eyebrow: "Pilot coding instrument",
    title: "Codebook used for Round 1: v1.1-RC4",
    sourceLabel: "Validated 21 Jul 2026",
    summary:
      "RC4 is the synchronized release candidate used for coder training, calibration, and pilot reliability testing. It contains 14 ELAN tiers, eight controlled vocabularies, and 62 values; it has not yet been promoted for full production coding.",
    tierGroups: [
      {
        label: "Structural tiers",
        tiers: [
          { id: "EPISODE", detail: "time-alignable parent" },
          { id: "CODER_NOTE", detail: "episode-level note" }
        ]
      },
      {
        label: "Shared episode tiers",
        tiers: [
          { id: "GROUP_INTERACTION", detail: "peer interaction" },
          { id: "FACILITATION", detail: "educator facilitation" },
          { id: "ARTIFACT_TRACE", detail: "artifact-state trace" },
          { id: "TASK_MEANING_TRACE", detail: "observable task relation" }
        ]
      },
      {
        label: "P01 participant tiers",
        tiers: [
          { id: "P01_MATERIAL_FOCUS", detail: "material focus" },
          { id: "P01_MATERIAL_ENGAGEMENT", detail: "material relation" },
          { id: "P01_PARTICIPATION_MODE", detail: "participation form" },
          { id: "P01_EXPRESSION_FORM", detail: "multi-value expression" }
        ]
      },
      {
        label: "P02 participant tiers",
        tiers: [
          { id: "P02_MATERIAL_FOCUS", detail: "material focus" },
          { id: "P02_MATERIAL_ENGAGEMENT", detail: "material relation" },
          { id: "P02_PARTICIPATION_MODE", detail: "participation form" },
          { id: "P02_EXPRESSION_FORM", detail: "multi-value expression" }
        ]
      }
    ],
    dimensions: [
      {
        name: "Material focus",
        tier: "P01/P02_MATERIAL_FOCUS",
        values: [
          ["MF01", "Malleable Material"],
          ["MF02", "Paper, Card, or Base"],
          ["MF03", "Paper Plate"],
          ["MF04", "Flexible Linear Material"],
          ["MF05", "Foam"],
          ["MF06", "Fabric or Felt"],
          ["MF07", "Tactile or Decorative Element"],
          ["MF08", "Marking Tool"],
          ["MF09", "Adhesive or Fastener"],
          ["MF10", "Instructional Model or Timeline"],
          ["MF11", "Prompt, Activity, or Photo Card"],
          ["MF12", "Loose Task Component"],
          ["MF13", "Evolving Work Artifact"],
          ["MF14", "Mixed Material Set"],
          ["UNOBSERVABLE", "In scope, but focal resource evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope resource family not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Material engagement",
        tier: "P01/P02_MATERIAL_ENGAGEMENT",
        values: [
          ["ME00", "No Observable Material Relation"],
          ["ME01", "Observe or Inspect"],
          ["ME02", "Select, Change, or Relinquish"],
          ["ME03", "Manipulate or Transform"],
          ["ME04", "Establish Boundary or Refuse"],
          ["UNOBSERVABLE", "In scope, but material-engagement evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope material relation not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Participation mode",
        tier: "P01/P02_PARTICIPATION_MODE",
        values: [
          ["PM00", "No Overt Participation"],
          ["PM01", "Observe or Receive"],
          ["PM02", "Act or Reproduce"],
          ["PM03", "Generate or Externalize"],
          ["PM04", "Pause or Withdraw"],
          ["UNOBSERVABLE", "In scope, but participation evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope participation form not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Expression form",
        tier: "P01/P02_EXPRESSION_FORM",
        values: [
          ["EF00", "No Observable Expression"],
          ["EF01", "Spoken Language"],
          ["EF02", "Other Vocalization"],
          ["EF03", "AAC or Visual-Symbol Expression"],
          ["EF04", "Manual Sign"],
          ["EF05", "Gesture or Pointing"],
          ["EF06", "Body Orientation or Movement"],
          ["EF07", "Object-Mediated Expression"],
          ["AUDIO_UNOBSERVABLE", "Audio-dependent evidence is inadequate; CODER_NOTE required."],
          ["VISUAL_UNOBSERVABLE", "Visually dependent evidence is inadequate; CODER_NOTE required."],
          ["OTHER", "Expression form is observable but not represented by the listed values; CODER_NOTE required."]
        ]
      },
      {
        name: "Group interaction",
        tier: "GROUP_INTERACTION",
        values: [
          ["GI00", "No Peer Interaction"],
          ["GI01", "Parallel Participation"],
          ["GI02", "Coordinated Shared Action"],
          ["GI03", "Reciprocal Co-construction"],
          ["GI04", "Negotiate or Repair"],
          ["UNOBSERVABLE", "In scope, but group-interaction evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope group interaction not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Facilitation",
        tier: "FACILITATION",
        values: [
          ["FA00", "No Educator Facilitation"],
          ["FA01", "Present, Prompt, Question, or Model"],
          ["FA02", "Adapt Material, Access, Pace, or Task"],
          ["FA03", "Take Over, Withhold, or Constrain Opportunity"],
          ["UNOBSERVABLE", "In scope, but facilitation evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope facilitation form not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Artifact trace",
        tier: "ARTIFACT_TRACE",
        values: [
          ["AT00", "No Attributable Change"],
          ["AT01", "Attributable Change"],
          ["UNOBSERVABLE", "In scope, but artifact-trace evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope artifact trace not represented; CODER_NOTE required."]
        ]
      },
      {
        name: "Task meaning trace",
        tier: "TASK_MEANING_TRACE",
        values: [
          ["TM00", "No Observable Task Relation"],
          ["TM01", "Observable Task Relation"],
          ["UNOBSERVABLE", "In scope, but task-relation evidence is insufficient; CODER_NOTE required."],
          ["OTHER", "Observable in-scope task relation not represented; CODER_NOTE required."]
        ]
      }
    ]
  },
  coderAssignment: {
    eyebrow: "Production coding plan",
    title: "Planned coder assignment (R1 · R2 · R3 · R4)",
    summary:
      "The production corpus has sixteen shared group-camera videos and twenty-eight student-level coding units (S1-P1 through S4-P7). Every unit is independently double-coded. Students sharing one source video use the same researcher pair, and R1-R4 each receive fourteen units.",
    corpus: { sourceVideos: 16, codingUnits: 28, doubleCoded: 28, tripleCoded: 0, minCodersPerVideo: 2, unitLabel: "coding units", tripleCodedIds: "None" },
    coders: [
      {
        code: "R1",
        name: "Researcher 1",
        role: "Independent coder",
        responsibilities: [
          "Independently codes fourteen student-level units.",
          "Uses source-video links to identify shared recordings."
        ],
        assignedVideos: 14,
        sessions: "S1-S4",
        pairs: "R2: 5 · R3: 6 · R4: 3 units"
      },
      {
        code: "R2",
        name: "Researcher 2",
        role: "Independent coder",
        responsibilities: [
          "Independently codes fourteen student-level units.",
          "Uses source-video links to identify shared recordings."
        ],
        assignedVideos: 14,
        sessions: "S1-S4",
        pairs: "R1: 5 · R3: 3 · R4: 6 units"
      },
      {
        code: "R3",
        name: "Researcher 3",
        role: "Independent coder",
        responsibilities: [
          "Independently codes fourteen student-level units.",
          "Uses source-video links to identify shared recordings."
        ],
        assignedVideos: 14,
        sessions: "S1-S4",
        pairs: "R1: 6 · R2: 3 · R4: 5 units"
      },
      {
        code: "R4",
        name: "Researcher 4",
        role: "Independent coder",
        responsibilities: [
          "Independently codes fourteen student-level units.",
          "Uses source-video links to identify shared recordings."
        ],
        assignedVideos: 14,
        sessions: "S1-S4",
        pairs: "R1: 3 · R2: 6 · R3: 5 units"
      }
    ],
    heatmap: {
      src: "./assets/coder_video_heatmap.png",
      alt: "Wide heatmap with R1 through R4 as rows and 28 student-level coding units as columns, showing two assigned researchers per unit.",
      caption:
        "Columns are the 28 Sx-Px student-level coding units, grouped from S1 through S4; rows are R1-R4. P1-P7 denote students. Units from students sharing one source video use the same researcher pair."
    }
  }
};
