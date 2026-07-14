window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

const PROJECT_WEB_EXTERNAL_ROOT = "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June2";

window.PROJECT_WEB_DATA.archiveGroups = [
  {
    id: "g1",
    label: "G1: S1 + S2",
    evidenceAnchor: "artifact-g1-evidence",
    traceTarget: {
      section: "insights",
      anchor: "insight-1",
      label: "Trace to Insight 1"
    },
    mainPhotos: [
      { student: "S1", caption: "S1 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S1.jpg` },
      { student: "S1", caption: "S1 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S1背面.jpg` },
      { student: "S2", caption: "S2 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S2.jpg` },
      { student: "S2", caption: "S2 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S2背面.jpg` }
    ],
    extraPhotos: [
      { student: "S1", caption: "Clock drawing evidence, S1", rotation: "none", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/otherArtefacts/clocks-drawings-S1.JPG` },
      { student: "S2", caption: "Clock drawing evidence, S2", rotation: "none", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/otherArtefacts/clocks-drawings-S2.JPG` }
    ]
  },
  {
    id: "g2",
    label: "G2: S3 + S4",
    mainPhotos: [
      { student: "S3", caption: "S3 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S3.jpg` },
      { student: "S3", caption: "S3 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S3背面.jpg` },
      { student: "S4", caption: "S4 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S4.jpg` },
      { student: "S4", caption: "S4 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S4背面.jpg` }
    ],
    extraPhotos: []
  },
  {
    id: "g3",
    label: "G3: S5 + S6",
    mainPhotos: [
      { student: "S5", caption: "S5 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S5.jpg` },
      { student: "S5", caption: "S5 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S5背面.jpg` },
      { student: "S6", caption: "S6 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S6.jpg` },
      { student: "S6", caption: "S6 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S6背面.jpg` }
    ],
    extraPhotos: []
  },
  {
    id: "g4",
    label: "G4: S7 + S8",
    mainPhotos: [
      { student: "S7", caption: "S7 artifact", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S7.jpg` },
      { student: "S8", caption: "S8 front", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S8.jpg` },
      { student: "S8", caption: "S8 back", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S8背面.jpg` }
    ],
    extraPhotos: [
      { student: "S8", caption: "S8 teacher-supported drawing trace", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/S8：老师握着S8的手画点，老师走后，S8在纸上涂画、撕纸.jpg` }
    ]
  },
  {
    id: "other",
    label: "Other",
    mainPhotos: [
      { student: "Other", caption: "Clock drawing evidence 1", rotation: "none", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/otherArtefacts/clocks-drawings1.JPG` },
      { student: "Other", caption: "Clock drawing evidence 2", rotation: "none", path: `${PROJECT_WEB_EXTERNAL_ROOT}/artifactsPhotos/otherArtefacts/clocks-drawings2.JPG` }
    ],
    extraPhotos: []
  }
];

window.PROJECT_WEB_DATA.videos = [
  { id: "g1", title: "Group 1 export", caption: "G1 workshop activity export.", path: `${PROJECT_WEB_EXTERNAL_ROOT}/360videos/exp/G1-exp.mp4` },
  {
    id: "g2",
    title: "Group 2 export",
    caption: "G2 workshop activity export.",
    path: `${PROJECT_WEB_EXTERNAL_ROOT}/360videos/exp/G2-exp.mp4`,
    markers: [
      { time: "15:21", seconds: 921, label: "S3 making process" }
    ]
  },
  { id: "g3", title: "Group 3 export", caption: "G3 workshop activity export.", path: `${PROJECT_WEB_EXTERNAL_ROOT}/360videos/exp/G3-exp.mp4` },
  { id: "g4", title: "Group 4 export", caption: "G4 workshop activity export.", path: `${PROJECT_WEB_EXTERNAL_ROOT}/360videos/exp/G4-exp.mp4` }
];

window.PROJECT_WEB_DATA.fieldnoteSources = [
  { title: "Field-note transcription", caption: "Converted field-note transcription.", type: "doc", href: "./doc_views/fieldnotes_transcription_zh_2026-06-04.html" },
  { title: "Tutorial notes", caption: "Tutorial field-note scan.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/tutorial_notes_R1.JPG` },
  { title: "R1, G2, S3-S4, page 1", caption: "Field-note scan for G2, page 1.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R1-G2-S3-S4-1.jpg` },
  { title: "R1, G2, S3-S4, page 2", caption: "Field-note scan for G2, page 2.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R1-G2-S3-S4-2.JPG` },
  { title: "R2, G4, S7, page 1", caption: "Field-note scan for G4, page 1.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R2-G4-S7-1.JPG` },
  { title: "R2, G4, S7, page 2", caption: "Field-note scan for G4, page 2.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R2-G4-S7-2.JPG` },
  { title: "R3, G3, S5-S6, page 1", caption: "Field-note scan for G3, page 1.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R3-G3-S5-S6-1.JPG` },
  { title: "R3, G3, S5-S6, page 2", caption: "Field-note scan for G3, page 2.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/R3-G3-S5-S6-2.JPG` },
  { title: "T2, G1, S1-S2, page 1", caption: "Teacher field-note scan for G1, page 1.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-1.JPG` },
  { title: "T2, G1, S1-S2, page 2", caption: "Teacher field-note scan for G1, page 2.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-2.JPG` },
  { title: "T2, G1, S1-S2, page 3", caption: "Teacher field-note scan for G1, page 3.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-3.JPG` },
  { title: "T3, G3, S5-S6, page 1", caption: "Teacher field-note scan for G3, page 1.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/T3-G3-S5-S6-1.JPG` },
  { title: "T3, G3, S5-S6, page 2", caption: "Teacher field-note scan for G3, page 2.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Fieldnotes/scanned_fieldnotes/T3-G3-S5-S6-2.JPG` }
];

window.PROJECT_WEB_DATA.interviewSources = [
  { title: "Teacher interview transcript", caption: "Converted teacher interview transcript.", type: "doc", href: "./doc_views/interview_transcript_20260602.html" },
  { title: "Interview notes", caption: "Teacher interview note image.", type: "image", href: `${PROJECT_WEB_EXTERNAL_ROOT}/Interview/interview_notes_R1.JPG` }
];
