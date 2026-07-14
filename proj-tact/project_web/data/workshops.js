window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

const PROJECT_WEB_JUNE2_ROOT = "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June2";
const PROJECT_WEB_JUNE9_ROOT = "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June9";
const PROJECT_WEB_JUNE16_ROOT = "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June16";
const PROJECT_WEB_JUNE23_ROOT = "/Volumes/SSDT7Hongni/ResearchProject/Tactile/Workshop/June23";

function externalPath(root, relativePath) {
  return `${root}/${relativePath}`;
}

function imageAsset(root, title, caption, relativePath, meta = {}) {
  return {
    type: "image",
    title,
    caption,
    path: externalPath(root, relativePath),
    ...meta
  };
}

function fileAsset(root, title, caption, relativePath, meta = {}) {
  return {
    type: "file",
    title,
    caption,
    path: externalPath(root, relativePath),
    ...meta
  };
}

function videoAsset(root, id, title, caption, relativePath, meta = {}) {
  return {
    type: "video",
    id,
    title,
    caption,
    path: externalPath(root, relativePath),
    ...meta
  };
}

window.PROJECT_WEB_DATA.workshops = [
  {
    id: "june2",
    label: "June 2 Time Workshop",
    shortLabel: "June 2",
    date: "2026-06-02",
    activity: "Tactile clock classroom activity",
    archiveRoot: PROJECT_WEB_JUNE2_ROOT,
    summary: "Original tactile-clock workshop evidence base with student artifacts, 360 exports, field notes, interview material, and DV overview files. Current setup records use seven students; Group 4 has current S7 only.",
    figures: [
      {
        title: "Classroom spatial setup",
        image: "../figures/classroom_spatial_setup_bilingual.png",
        caption: "Classroom layout and camera position reference."
      },
      {
        title: "Thirty-minute task flow",
        image: "../figures/task_flow_30min_bilingual.png",
        caption: "Workshop task-flow plan."
      }
    ],
    facts: [
      ["Workshop date", "2026-06-02"],
      ["Session", "Tactile clock classroom activity"],
      ["Researchers", "R1: Hongni; R2: Xingyu; R3: qiyuan"],
      ["Role setup correction", "Three research observers were present. T2 temporarily recorded Group 1 field notes while also holding an assistant-teacher role; later sessions separated observer field notes from assistant-teacher support."],
      ["Attended teachers", "3"],
      ["Current student setup", "7 students total; Group 4 has current S7 only"],
      ["Final usable learner data", "7 students after consent and attendance boundaries"],
      ["Archive root", PROJECT_WEB_JUNE2_ROOT]
    ],
    sourceDocs: [
      {
        title: "Researcher Workshop Plan",
        caption: "Researcher-facing workshop plan.",
        href: "./doc_views/researcher_workshop_plan_zh.html"
      },
      {
        title: "Teacher Workshop Plan",
        caption: "Teacher-facing workshop plan.",
        href: "./doc_views/teacher_workshop_plan_zh.html"
      },
      {
        title: "Teacher Group Interview Outline",
        caption: "Teacher group interview outline.",
        href: "./doc_views/teacher_group_interview_outline_bilingual.html"
      },
      {
        title: "Field Note Template",
        caption: "Field-note template.",
        href: "./doc_views/field_note_template_zh_ta.html"
      }
    ],
    archiveSections: [
      {
        id: "artifact-photos",
        label: "Artifact Photos",
        kind: "gallery",
        status: "Student and supporting artifact photos",
        groups: [
          {
            id: "g1",
            label: "G1: S1 + S2",
            evidenceAnchor: "artifact-g1-evidence",
            traceTarget: {
              section: "insights",
              anchor: "insight-1",
              label: "Trace to Insight 1"
            },
            items: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S1 front", "S1 front", "artifactsPhotos/S1.jpg", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S1 back", "S1 back", "artifactsPhotos/S1背面.jpg", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S2 front", "S2 front", "artifactsPhotos/S2.jpg", { student: "S2" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S2 back", "S2 back", "artifactsPhotos/S2背面.jpg", { student: "S2" })
            ],
            extraTitle: "S1/S2 supporting evidence",
            extraItems: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "Clock drawing evidence, S1", "Clock drawing evidence, S1", "artifactsPhotos/otherArtefacts/clocks-drawings-S1.JPG", { student: "S1", rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "Clock drawing evidence, S2", "Clock drawing evidence, S2", "artifactsPhotos/otherArtefacts/clocks-drawings-S2.JPG", { student: "S2", rotation: "none" })
            ]
          },
          {
            id: "g2",
            label: "G2: S3 + S4",
            items: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S3 front", "S3 front", "artifactsPhotos/S3.jpg", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S3 back", "S3 back", "artifactsPhotos/S3背面.jpg", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S4 front", "S4 front", "artifactsPhotos/S4.jpg", { student: "S4" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S4 back", "S4 back", "artifactsPhotos/S4背面.jpg", { student: "S4" })
            ]
          },
          {
            id: "g3",
            label: "G3: S5 + S6",
            items: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S5 front", "S5 front", "artifactsPhotos/S5.jpg", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S5 back", "S5 back", "artifactsPhotos/S5背面.jpg", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S6 front", "S6 front", "artifactsPhotos/S6.jpg", { student: "S6" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S6 back", "S6 back", "artifactsPhotos/S6背面.jpg", { student: "S6" })
            ]
          },
          {
            id: "g4",
            label: "G4: S7",
            items: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S7 front", "Current S7 artifact; raw archive path still uses the former S8 label.", "artifactsPhotos/S8.jpg", { student: "S7", originalCode: "S8" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S7 back", "Current S7 artifact; raw archive path still uses the former S8 label.", "artifactsPhotos/S8背面.jpg", { student: "S7", originalCode: "S8" })
            ],
            extraTitle: "S7 teacher-supported drawing trace",
            extraItems: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "S7 teacher-supported drawing trace", "Current S7 trace; raw archive path still uses the former S8 label.", "artifactsPhotos/S8：老师握着S8的手画点，老师走后，S8在纸上涂画、撕纸.jpg", { student: "S7", originalCode: "S8" })
            ]
          },
          {
            id: "other",
            label: "Other",
            items: [
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "Clock drawing evidence 1", "Clock drawing evidence 1", "artifactsPhotos/otherArtefacts/clocks-drawings1.JPG", { student: "Other", rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE2_ROOT, "Clock drawing evidence 2", "Clock drawing evidence 2", "artifactsPhotos/otherArtefacts/clocks-drawings2.JPG", { student: "Other", rotation: "none" })
            ]
          }
        ]
      },
      {
        id: "360-videos",
        label: "360 Videos",
        kind: "videos",
        status: "G1 to G4 exports",
        items: [
          videoAsset(PROJECT_WEB_JUNE2_ROOT, "g1", "Group 1 export", "G1 workshop activity export.", "360videos/exp/G1-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE2_ROOT, "g2", "Group 2 export", "G2 workshop activity export.", "360videos/exp/G2-exp.mp4", {
            markers: [
              { time: "15:21", seconds: 921, label: "S3 making process" }
            ]
          }),
          videoAsset(PROJECT_WEB_JUNE2_ROOT, "g3", "Group 3 export", "G3 workshop activity export.", "360videos/exp/G3-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE2_ROOT, "g4", "Group 4 export", "G4 workshop activity export.", "360videos/exp/G4-exp.mp4")
        ]
      },
      {
        id: "fieldnotes",
        label: "Field Notes",
        kind: "sources",
        status: "Scans and transcript",
        items: [
          { title: "Field-note transcription", caption: "Converted field-note transcription.", type: "doc", href: "./doc_views/fieldnotes_transcription_zh_2026-06-04.html" },
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "Tutorial notes", "Tutorial field-note scan.", "Fieldnotes/tutorial_notes_R1.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R1, G2, S3-S4, page 1", "Field-note scan for G2, page 1.", "Fieldnotes/scanned_fieldnotes/R1-G2-S3-S4-1.jpg"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R1, G2, S3-S4, page 2", "Field-note scan for G2, page 2.", "Fieldnotes/scanned_fieldnotes/R1-G2-S3-S4-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R2, G4, S7, page 1", "Field-note scan for G4, page 1.", "Fieldnotes/scanned_fieldnotes/R2-G4-S7-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R2, G4, S7, page 2", "Field-note scan for G4, page 2.", "Fieldnotes/scanned_fieldnotes/R2-G4-S7-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R3, G3, S5-S6, page 1", "Field-note scan for G3, page 1.", "Fieldnotes/scanned_fieldnotes/R3-G3-S5-S6-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "R3, G3, S5-S6, page 2", "Field-note scan for G3, page 2.", "Fieldnotes/scanned_fieldnotes/R3-G3-S5-S6-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "T2, G1, S1-S2, page 1", "Teacher field-note scan for G1, page 1.", "Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "T2, G1, S1-S2, page 2", "Teacher field-note scan for G1, page 2.", "Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "T2, G1, S1-S2, page 3", "Teacher field-note scan for G1, page 3.", "Fieldnotes/scanned_fieldnotes/T2-G1-S1-S2-3.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "T3, G3, S5-S6, page 1", "Teacher field-note scan for G3, page 1.", "Fieldnotes/scanned_fieldnotes/T3-G3-S5-S6-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "T3, G3, S5-S6, page 2", "Teacher field-note scan for G3, page 2.", "Fieldnotes/scanned_fieldnotes/T3-G3-S5-S6-2.JPG")
        ]
      },
      {
        id: "interview",
        label: "Interview",
        kind: "sources",
        status: "Transcript and notes",
        items: [
          { title: "Teacher interview transcript", caption: "Converted teacher interview transcript.", type: "doc", href: "./doc_views/interview_transcript_20260602.html" },
          imageAsset(PROJECT_WEB_JUNE2_ROOT, "Interview notes", "Teacher interview note image.", "Interview/interview_notes_R1.JPG")
        ]
      },
      {
        id: "dv-overview",
        label: "DV Overview",
        kind: "gallery",
        status: "External MTS file links",
        groups: [
          {
            id: "dv001",
            label: "DV001",
            items: [
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00007.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00007.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00008.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00008.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00009.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00009.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00010.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00010.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00011.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00011.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00012.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00012.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00013.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00013.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00014.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00014.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00015.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV001/00015.MTS", { fileType: "MTS" })
            ]
          },
          {
            id: "dv002",
            label: "DV002",
            items: [
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00003.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00003.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00004.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00004.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00005.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00005.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00006.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00006.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00011.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00011.MTS", { fileType: "MTS" }),
              fileAsset(PROJECT_WEB_JUNE2_ROOT, "00012.MTS", "DV overview file.", "DV_vid/20260602冯慧璇DV002/00012.MTS", { fileType: "MTS" })
            ]
          }
        ]
      }
    ]
  },
  {
    id: "june9",
    label: "June 9 Watch / Alarm Workshop",
    shortLabel: "June 9",
    date: "2026-06-09",
    activity: "Flexible watch or alarm making activity",
    archiveRoot: PROJECT_WEB_JUNE9_ROOT,
    summary: "Second workshop evidence base with flexible watch/alarm making, group-level observation, material photos, student works, field notes, 360 video exports, and interview audio. June 9 used four observers, but T2 was absent, so Group 2 had no assistant teacher.",
    figures: [
      {
        title: "June 9 classroom spatial setup",
        image: "../figures/classroom_spatial_setup_june9_bilingual.png",
        caption: "Group tables, observer positions, active assistant-teacher positions, T2 absence, and camera setup for the second workshop."
      },
      {
        title: "June 9 flexible task flow",
        image: "../figures/task_flow_june9_bilingual.png",
        caption: "Opening, material exploration, making and decoration, time setting, and show/expression flow."
      }
    ],
    facts: [
      ["Workshop date", "2026-06-09"],
      ["Session", "Making a watch or alarm"],
      ["Format", "Flexible classroom making activity with teacher support and group-level observation"],
      ["Core stages", "Opening; material exploration; making and decoration; set time; show and express"],
      ["Role setup", "Lead Teacher, observers O1-O4, assistant teachers T1/T3/T4; T2 absent, so Group 2 had no assistant teacher"],
      ["Current student setup", "7 students total; Group 4 has current S7 only"],
      ["Group cameras", "One 360 camera per group table"],
      ["Archive root", PROJECT_WEB_JUNE9_ROOT]
    ],
    sourceDocs: [
      {
        title: "Researcher Workshop Plan",
        caption: "Researcher-facing June 9 plan.",
        href: "./doc_views/june9_researcher_workshop_plan_en.html"
      },
      {
        title: "Teacher Workshop Plan",
        caption: "Teacher-facing June 9 plan.",
        href: "./doc_views/june9_teacher_workshop_plan_zh.html"
      },
      {
        title: "Teacher Interview Outline (Chinese)",
        caption: "June 9 teacher interview outline in Chinese.",
        href: "./doc_views/june9_teacher_interview_outline_zh_2026-06-09.html"
      },
      {
        title: "Teacher Interview Outline (English)",
        caption: "English translation of the June 9 teacher interview outline.",
        href: "./doc_views/june9_teacher_interview_outline_en_2026-06-09.html"
      },
      {
        title: "Field Notes",
        caption: "June 9 field notes.",
        href: "./doc_views/june9_fieldnotes_2026-06-09.html"
      },
      {
        title: "Field Note Template",
        caption: "English field-note template.",
        href: "./doc_views/june9_field_note_template_en.html"
      }
    ],
    archiveSections: [
      {
        id: "student-work",
        label: "Student Work",
        kind: "gallery",
        status: "External-drive path metadata only; raw student-work images are not copied into Git",
        groups: [
          {
            id: "s1",
            label: "S1",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "S1-1f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S1/S1-1f.HEIC", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s1-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S1/s1-1b.HEIC", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "S1-2b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S1/S1-2b.HEIC", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s1-2f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S1/s1-2f.HEIC", { student: "S1" })
            ]
          },
          {
            id: "s2",
            label: "S2",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s2-1f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S2/s2-1f.HEIC", { student: "S2" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s2-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S2/s2-1b.HEIC", { student: "S2" })
            ]
          },
          {
            id: "s3",
            label: "S3",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s3-1f", "Student work artifact; external JPG source only.", "studentwork_artefacts/S3/s3-1f.jpg", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s3-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S3/s3-1b.HEIC", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s3-2f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S3/s3-2f.HEIC", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s3-2b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S3/s3-2b.HEIC", { student: "S3" })
            ]
          },
          {
            id: "s4",
            label: "S4",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s4-1f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S4/s4-1f.HEIC", { student: "S4" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s4-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S4/s4-1b.HEIC", { student: "S4" })
            ]
          },
          {
            id: "s5",
            label: "S5",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s5-1f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S5/s5-1f.HEIC", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s5-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S5/s5-1b.HEIC", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s5-2f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S5/s5-2f.HEIC", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s5-2b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S5/s5-2b.HEIC", { student: "S5" })
            ]
          },
          {
            id: "s6",
            label: "S6",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s6-1f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S6/s6-1f.HEIC", { student: "S6" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s6-1b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S6/s6-1b.HEIC", { student: "S6" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s6-2f", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S6/s6-2f.HEIC", { student: "S6" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "s6-2b", "Student work artifact; external HEIC source only.", "studentwork_artefacts/S6/s6-2b.HEIC", { student: "S6" })
            ]
          },
          {
            id: "s7",
            label: "S7",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "S7 front", "Student work artifact; raw external path still uses former S8 label.", "studentwork_artefacts/S8/s8-1f.HEIC", { student: "S7", originalCode: "S8" }),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "S7 back", "Student work artifact; raw external path still uses former S8 label.", "studentwork_artefacts/S8/s-1b.HEIC", { student: "S7", originalCode: "S8" })
            ]
          }
        ]
      },
      {
        id: "materials",
        label: "Materials",
        kind: "gallery",
        status: "Material collection photos",
        groups: [
          {
            id: "material-photos",
            label: "Material Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Overview", "Material collection overview.", "materials_collection_photo/overview.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Overview 1", "Material collection overview.", "materials_collection_photo/overview1.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Watch kit", "Watch-making kit.", "materials_collection_photo/watch_kit.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Alarm kit", "Alarm-making kit.", "materials_collection_photo/alarm_kit.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Alarm template", "Alarm template.", "materials_collection_photo/alarm_template.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Alarm color filling", "Alarm color-filling material.", "materials_collection_photo/alarm_color_filling.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Clock rotating", "Rotating clock material.", "materials_collection_photo/clock_rotating.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Clock velcro", "Clock velcro material.", "materials_collection_photo/clock_velcro.jpg"),
              imageAsset(PROJECT_WEB_JUNE9_ROOT, "Ice cream clock velcro", "Ice cream clock velcro material.", "materials_collection_photo/icecream_clock_velcro.jpg")
            ]
          }
        ]
      },
      {
        id: "360-videos",
        label: "360 Videos",
        kind: "videos",
        status: "Exported MP4 previews",
        items: [
          videoAsset(PROJECT_WEB_JUNE9_ROOT, "june9-g1", "Group 1 export", "June 9 G1 workshop activity export.", "360-vid/eport-vid/G1-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE9_ROOT, "june9-g2", "Group 2 export", "June 9 G2 workshop activity export.", "360-vid/eport-vid/G2-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE9_ROOT, "june9-g3", "Group 3 export", "June 9 G3 workshop activity export.", "360-vid/eport-vid/G3-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE9_ROOT, "june9-g4", "Group 4 export", "June 9 G4 workshop activity export.", "360-vid/eport-vid/G4-exp.mp4")
        ]
      },
      {
        id: "fieldnotes",
        label: "Field Notes",
        kind: "sources",
        status: "Scans and local fieldnote document",
        items: [
          { title: "Fieldnotes document", caption: "Converted June 9 fieldnotes document.", type: "doc", href: "./doc_views/june9_fieldnotes_2026-06-09.html" },
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "Setup notes", "Setup field-note scan.", "fieldnotes/scan_photos/setup_notes.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O1-G1", "Observer field-note scan.", "fieldnotes/scan_photos/O1-G1.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O1-1", "Observer field-note scan.", "fieldnotes/scan_photos/O1-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O1-2", "Observer field-note scan.", "fieldnotes/scan_photos/O1-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O2-1", "Observer field-note scan.", "fieldnotes/scan_photos/O2-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O2-2", "Observer field-note scan.", "fieldnotes/scan_photos/O2-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O3-1", "Observer field-note scan.", "fieldnotes/scan_photos/O3-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O3-2", "Observer field-note scan.", "fieldnotes/scan_photos/O3-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O4-2", "Observer field-note scan.", "fieldnotes/scan_photos/O4-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O4-3", "Observer field-note scan.", "fieldnotes/scan_photos/O4-3.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O4-4", "Observer field-note scan.", "fieldnotes/scan_photos/O4-4.JPG"),
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "O4-5", "Observer field-note scan.", "fieldnotes/scan_photos/O4-5.JPG")
        ]
      },
      {
        id: "interview",
        label: "Interview",
        kind: "sources",
        status: "Transcript, audio, and notes",
        items: [
          {
            title: "Teacher interview transcript (Chinese)",
            caption: "Updated June 9 interview transcript, intelligent optimized version.",
            type: "doc",
            href: "./doc_views/june9_interview_transcript_20260610.html"
          },
          {
            title: "Teacher interview transcript (English)",
            caption: "Faithful English translation of the June 9 interview transcript.",
            type: "doc",
            href: "./doc_views/june9_interview_transcript_en_20260610.html"
          },
          {
            title: "Teacher interview audio",
            caption: "June 9 teacher interview audio recording.",
            type: "audio",
            path: externalPath(PROJECT_WEB_JUNE9_ROOT, "Interview/audio_recording.m4a")
          },
          imageAsset(PROJECT_WEB_JUNE9_ROOT, "Interview notes", "Interview note scan.", "fieldnotes/scan_photos/interview_notes.jpg")
        ]
      }
    ]
  },
  {
    id: "june16",
    label: "June 16 One-Day Timeline Workshop",
    shortLabel: "June 16",
    date: "2026-06-16",
    activity: "Concept introduction with day/night, morning/noon/afternoon, and sun/moon making options",
    archiveRoot: PROJECT_WEB_JUNE16_ROOT,
    summary: "Collected third workshop archive for one-day timeline concepts, sun/moon making options, student artifacts, material and quiz photos, field-note scans, exported 360 video previews, and a same-day teacher interview transcript.",
    figures: [
      {
        title: "June 16 classroom spatial setup",
        image: "../figures/classroom_spatial_setup_june16_bilingual.png",
        caption: "Group tables, observer positions, active assistant-teacher positions, T2 absence, camera setup, and observer-name list for the June 16 workshop."
      },
      {
        title: "June 16 one-day timeline task flow",
        image: "../figures/task_flow_june16_bilingual.png",
        caption: "Stages 0-2 as concept introduction, Stage 3 split into sun-making and moon-making options, and show/expression closing."
      }
    ],
    facts: [
      ["Workshop date", "2026-06-16"],
      ["Session", "One-day timeline: day/night and morning/noon/afternoon"],
      ["Handcraft session", "Option A: paste cardstock, draw, and roll cardstock strips for the sun; Option B: paste round pieces onto the moon shape"],
      ["Format", "Classroom concept-introduction and handcraft activity with teacher support and group-level observation"],
      ["Observer names", "Qiyuan, Xingyu, Mengxu, Hongni; O1-O4 mapping confirmed onsite"],
      ["Role setup", "Lead Teacher, observers O1-O4, assistant teachers T1/T3/T4; T2 absent, so Group 2 had no assistant teacher"],
      ["Current student setup", "7 students total; Group 4 has current S7 only"],
      ["Group cameras", "One 360 camera per observation table where feasible; exported previews available for G1-G4"],
      ["Collected source groups", "Student artifacts, material library, quiz photos, field-note scans, interview transcript, and exported 360 videos"],
      ["Archive root", PROJECT_WEB_JUNE16_ROOT]
    ],
    sourceDocs: [
      {
        title: "Researcher Workshop Plan",
        caption: "Researcher-facing June 16 plan.",
        href: "./doc_views/june16_researcher_workshop_plan_en.html"
      },
      {
        title: "Teacher Workshop Plan",
        caption: "Teacher-facing June 16 plan.",
        href: "./doc_views/june16_teacher_workshop_plan_zh.html"
      },
      {
        title: "Teacher Interview Outline",
        caption: "Post-class semi-structured interview outline with same-day observed-behavior slots.",
        href: "./doc_views/june16_teacher_interview_outline_zh_2026-06-16.html"
      },
      {
        title: "Field Notes Shell",
        caption: "Blank June 16 field-notes consolidation shell.",
        href: "./doc_views/june16_fieldnotes_2026-06-16.html"
      },
      {
        title: "Field Note Template",
        caption: "English researcher field-note template.",
        href: "./doc_views/june16_field_note_template_en.html"
      },
      {
        title: "Teacher-Review Field Note Template",
        caption: "Chinese teacher-review field-note version.",
        href: "./doc_views/june16_field_note_template_zh_review.html"
      },
      {
        title: "Teacher Interview Transcript",
        caption: "June 16 same-day teacher interview transcript.",
        href: "./doc_views/june16_interview_transcript_20260616.html"
      }
    ],
    archiveSections: [
      {
        id: "planned-documents",
        label: "Planning Docs",
        kind: "sources",
        status: "Prepared source documents",
        items: [
          { title: "Researcher Workshop Plan", caption: "Researcher-facing June 16 plan.", type: "doc", href: "./doc_views/june16_researcher_workshop_plan_en.html" },
          { title: "Teacher Workshop Plan", caption: "Teacher-facing June 16 plan.", type: "doc", href: "./doc_views/june16_teacher_workshop_plan_zh.html" },
          { title: "Teacher Interview Outline", caption: "Semi-structured debrief guide with fillable same-day behavior prompts.", type: "doc", href: "./doc_views/june16_teacher_interview_outline_zh_2026-06-16.html" }
        ]
      },
      {
        id: "student-work",
        label: "Student Artifacts",
        kind: "gallery",
        status: "7 collected artifact photos",
        groups: [
          {
            id: "june16-artifacts",
            label: "Artifact Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S1", "June 16 student artifact.", "Artefacts/S1.jpg", { student: "S1" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S2", "June 16 student artifact.", "Artefacts/S2.jpg", { student: "S2" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S3", "June 16 student artifact.", "Artefacts/S3.jpg", { student: "S3" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S4", "June 16 student artifact.", "Artefacts/S4.jpg", { student: "S4" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S5", "June 16 student artifact.", "Artefacts/S5.jpg", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S6", "June 16 student artifact.", "Artefacts/S6.jpg", { student: "S6" }),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "S7", "June 16 student artifact.", "Artefacts/S7.jpg", { student: "S7" })
            ]
          }
        ]
      },
      {
        id: "materials",
        label: "Materials",
        kind: "gallery",
        status: "Material and example photos",
        groups: [
          {
            id: "material-library",
            label: "Material Library",
            items: [
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Material overview", "June 16 material library photo.", "materialLIB/材料.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Sun materials", "Sun-making material photo.", "materialLIB/材料2-sun.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Moon materials", "Moon-making material photo.", "materialLIB/材料3-moon.jpg")
            ]
          },
          {
            id: "examples",
            label: "Examples",
            items: [
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Example 1", "June 16 example artifact photo.", "materialLIB/示例1.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Example 2", "June 16 example artifact photo.", "materialLIB/示例2.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Example 3", "June 16 example artifact photo.", "materialLIB/示例3.jpg")
            ]
          }
        ]
      },
      {
        id: "quiz",
        label: "Quiz Photos",
        kind: "gallery",
        status: "14 collected quiz photos",
        groups: [
          {
            id: "quiz-photos",
            label: "Quiz Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 01", "June 16 quiz photo.", "quiz/微信图片_20260616173728_1977_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 02", "June 16 quiz photo.", "quiz/微信图片_20260616173730_1978_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 03", "June 16 quiz photo.", "quiz/微信图片_20260616173731_1979_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 04", "June 16 quiz photo.", "quiz/微信图片_20260616173732_1980_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 05", "June 16 quiz photo.", "quiz/微信图片_20260616173733_1981_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 06", "June 16 quiz photo.", "quiz/微信图片_20260616173734_1982_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 07", "June 16 quiz photo.", "quiz/微信图片_20260616173735_1983_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 08", "June 16 quiz photo.", "quiz/微信图片_20260616173736_1984_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 09", "June 16 quiz photo.", "quiz/微信图片_20260616173737_1985_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 10", "June 16 quiz photo.", "quiz/微信图片_20260616173738_1986_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 11", "June 16 quiz photo.", "quiz/微信图片_20260616173739_1987_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 12", "June 16 quiz photo.", "quiz/微信图片_20260616173740_1988_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 13", "June 16 quiz photo.", "quiz/微信图片_20260616173741_1989_7.jpg"),
              imageAsset(PROJECT_WEB_JUNE16_ROOT, "Quiz photo 14", "June 16 quiz photo.", "quiz/微信图片_20260616173742_1990_7.jpg")
            ]
          }
        ]
      },
      {
        id: "360-videos",
        label: "360 Videos",
        kind: "videos",
        status: "Exported MP4 previews",
        items: [
          videoAsset(PROJECT_WEB_JUNE16_ROOT, "june16-g1", "Group 1 export", "June 16 G1 workshop activity export.", "360vid/exp-vid/G1-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE16_ROOT, "june16-g2", "Group 2 export", "June 16 G2 workshop activity export.", "360vid/exp-vid/G2-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE16_ROOT, "june16-g3", "Group 3 export", "June 16 G3 workshop activity export.", "360vid/exp-vid/exp-G3.mp4"),
          videoAsset(PROJECT_WEB_JUNE16_ROOT, "june16-g4", "Group 4 export", "June 16 G4 workshop activity export.", "360vid/exp-vid/exp-G4.mp4")
        ]
      },
      {
        id: "fieldnotes",
        label: "Field Notes",
        kind: "sources",
        status: "Templates and collected scan photos",
        items: [
          { title: "Fieldnotes document", caption: "June 16 fieldnotes consolidation document.", type: "doc", href: "./doc_views/june16_fieldnotes_2026-06-16.html" },
          { title: "English field-note template", caption: "Observer field-note template for June 16.", type: "doc", href: "./doc_views/june16_field_note_template_en.html" },
          { title: "Chinese teacher-review field-note template", caption: "Teacher-review version; teachers do not fill field notes.", type: "doc", href: "./doc_views/june16_field_note_template_zh_review.html" },
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "Tutorial", "Tutorial field-note scan.", "fieldnotes/scan_photos/tutorial.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O1-G1 page 1", "Observer field-note scan for G1.", "fieldnotes/scan_photos/o1-g1-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O1-G1 page 2", "Observer field-note scan for G1.", "fieldnotes/scan_photos/o1-g1-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O1-G1 page 3", "Observer field-note scan for G1.", "fieldnotes/scan_photos/o1-g1-3.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O2-G2 page 1", "Observer field-note scan for G2.", "fieldnotes/scan_photos/o2-g2-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O2-G2 page 3", "Observer field-note scan for G2.", "fieldnotes/scan_photos/o2-g2-3.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O3-G3 page 1", "Observer field-note scan for G3.", "fieldnotes/scan_photos/o3-g3-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O3-G3 page 2", "Observer field-note scan for G3.", "fieldnotes/scan_photos/o3-g3-2.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O3-G3 page 3", "Observer field-note scan for G3.", "fieldnotes/scan_photos/o3-g3-3.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O4-G4 page 1", "Observer field-note scan for G4.", "fieldnotes/scan_photos/o4-g4-1.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "O4-G4 page 2", "Observer field-note scan for G4.", "fieldnotes/scan_photos/o4-g4-2.JPG")
        ]
      },
      {
        id: "interview",
        label: "Interview",
        kind: "sources",
        status: "Transcript and interview note scans",
        items: [
          {
            title: "Teacher interview transcript",
            caption: "June 16 same-day teacher interview transcript.",
            type: "doc",
            href: "./doc_views/june16_interview_transcript_20260616.html"
          },
          {
            title: "Teacher interview outline",
            caption: "Semi-structured debrief guide with same-day behavior prompts.",
            type: "doc",
            href: "./doc_views/june16_teacher_interview_outline_zh_2026-06-16.html"
          },
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "Interview notes 1", "June 16 interview note scan.", "fieldnotes/scan_photos/interview1.JPG"),
          imageAsset(PROJECT_WEB_JUNE16_ROOT, "Interview notes 2", "June 16 interview note scan.", "fieldnotes/scan_photos/interview2.JPG")
        ]
      }
    ]
  },
  {
    id: "june22",
    label: "June 23 My Day Schedule Workshop",
    shortLabel: "June 23",
    date: "2026-06-23",
    activity: "Plan a day by matching time periods to clock prompts and making a schedule poster",
    archiveRoot: PROJECT_WEB_JUNE23_ROOT,
    summary: "Collected fourth workshop archive for one-day schedule planning, clock matching, student schedule-poster artifacts, material and classroom photos, field-note scans, exported 360 video previews, teacher interview transcript and interview notes, plus ELAN/PFSX video-analysis files. Current setup records use seven students; Group 4 has current S7 only.",
    figures: [
      {
        title: "June 23 classroom spatial setup",
        image: "../figures/classroom_spatial_setup_june22_bilingual.png",
        caption: "Group tables, observer positions, assistant-teacher positions, and camera setup for the June 23 workshop."
      },
      {
        title: "June 23 schedule-poster task flow",
        image: "../figures/task_flow_june22_bilingual.png",
        caption: "Opening, day planning, clock matching, schedule-poster making, and show/expression flow."
      }
    ],
    facts: [
      ["Workshop date", "2026-06-23"],
      ["Session", "Plan my day: time periods and clock matching"],
      ["Handcraft session", "Making a schedule poster of my day"],
      ["Format", "Classroom concept-matching and handcraft activity with teacher support and group-level observation"],
      ["Core stages", "Opening; plan a day; match time periods to clock; make schedule poster; show and express"],
      ["Role setup", "Lead Teacher, assistant teachers T1-T4, observers O1-O4"],
      ["Current student setup", "7 students total; Group 4 has current S7 only"],
      ["Group cameras", "One 360 camera per group table where feasible; exported previews available for G1-G4"],
      ["Collected source groups", "Student artifacts, materials and classroom photos, field-note scans, exported 360 videos, teacher interview transcript and notes, and ELAN/PFSX video-analysis files"],
      ["Quiz status", "Quiz archive folder is present but currently empty"],
      ["Archive root", PROJECT_WEB_JUNE23_ROOT]
    ],
    sourceDocs: [
      {
        title: "Researcher Workshop Plan",
        caption: "Researcher-facing June 23 plan.",
        href: "./doc_views/june23_researcher_workshop_plan_en.html"
      },
      {
        title: "Teacher Workshop Plan",
        caption: "Teacher-facing June 23 plan.",
        href: "./doc_views/june23_teacher_workshop_plan_zh.html"
      },
      {
        title: "Teacher Interview Outline",
        caption: "Post-class semi-structured interview outline for June 23.",
        href: "./doc_views/june23_teacher_interview_outline_zh_2026-06-23.html"
      },
      {
        title: "Field Notes Shell",
        caption: "June 23 field-notes consolidation document.",
        href: "./doc_views/june23_fieldnotes_2026-06-23.html"
      },
      {
        title: "Field Note Template",
        caption: "English researcher field-note template.",
        href: "./doc_views/june23_field_note_template_en.html"
      },
      {
        title: "Teacher-Review Field Note Template",
        caption: "Chinese teacher-review field-note version.",
        href: "./doc_views/june23_field_note_template_zh_review.html"
      },
      {
        title: "Teacher Interview Transcript",
        caption: "June 23 same-day teacher interview transcript.",
        href: "./doc_views/june23_interview_transcript_20260623.html"
      }
    ],
    archiveSections: [
      {
        id: "planned-documents",
        label: "Planning Docs",
        kind: "sources",
        status: "Prepared source documents",
        items: [
          { title: "Researcher Workshop Plan", caption: "Researcher-facing June 23 plan.", type: "doc", href: "./doc_views/june23_researcher_workshop_plan_en.html" },
          { title: "Teacher Workshop Plan", caption: "Teacher-facing June 23 plan.", type: "doc", href: "./doc_views/june23_teacher_workshop_plan_zh.html" },
          { title: "Teacher Interview Outline", caption: "Semi-structured debrief guide for June 23.", type: "doc", href: "./doc_views/june23_teacher_interview_outline_zh_2026-06-23.html" }
        ]
      },
      {
        id: "student-work",
        label: "Student Artifacts",
        kind: "gallery",
        status: "5 collected artifact photos",
        groups: [
          {
            id: "june23-artifacts",
            label: "Artifact Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "S1 + S2", "June 23 combined student artifact photo.", "artefacts/s1+s2.jpg", { student: "S1 + S2", rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "S3 + S4", "June 23 combined student artifact photo.", "artefacts/s3+s4.jpg", { student: "S3 + S4", rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "S5", "June 23 student artifact.", "artefacts/s5.jpg", { student: "S5" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "S6", "June 23 student artifact.", "artefacts/s6.jpg", { student: "S6", rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "S7", "June 23 student artifact.", "artefacts/s7.jpg", { student: "S7", rotation: "none" })
            ]
          }
        ]
      },
      {
        id: "materials",
        label: "Materials",
        kind: "gallery",
        status: "7 material and classroom photos",
        groups: [
          {
            id: "material-photos",
            label: "Material Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Material photo 1", "June 23 material photo.", "materials/mat1.jpg"),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Material photo 2", "June 23 material photo.", "materials/mat2.jpg", { rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Material photo 3", "June 23 material photo.", "materials/mat3.jpg", { rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Template photo", "June 23 template/material photo.", "materials/temp1.jpg")
            ]
          },
          {
            id: "classroom-photos",
            label: "Classroom Photos",
            items: [
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Classroom photo 1", "June 23 classroom setup photo.", "materials/623photoclass1.jpg", { rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Classroom photo 2", "June 23 classroom setup photo.", "materials/623photoclass2.jpg", { rotation: "none" }),
              imageAsset(PROJECT_WEB_JUNE23_ROOT, "Classroom photo 4", "June 23 classroom setup photo.", "materials/623photoclass4.jpg", { rotation: "none" })
            ]
          }
        ]
      },
      {
        id: "fieldnotes",
        label: "Field Notes",
        kind: "sources",
        status: "Templates and 10 collected field-note scans",
        items: [
          { title: "Fieldnotes document", caption: "June 23 fieldnotes consolidation document.", type: "doc", href: "./doc_views/june23_fieldnotes_2026-06-23.html" },
          { title: "English field-note template", caption: "Observer field-note template for June 23.", type: "doc", href: "./doc_views/june23_field_note_template_en.html" },
          { title: "Chinese teacher-review field-note template", caption: "Teacher-review version; teachers do not fill field notes.", type: "doc", href: "./doc_views/june23_field_note_template_zh_review.html" },
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O1-G1 page 1", "Observer field-note scan for G1.", "fieldnotes/o1-g1-1.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O1-G1 page 2", "Observer field-note scan for G1.", "fieldnotes/o1-g1-2.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O2-G2 page 1", "Observer field-note scan for G2.", "fieldnotes/o2-g2-1.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O2-G2 page 2", "Observer field-note scan for G2.", "fieldnotes/o2-g2-2.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O3-G3 page 1", "Observer field-note scan for G3.", "fieldnotes/o3-g3-1.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O3-G3 page 2", "Observer field-note scan for G3.", "fieldnotes/o3-g3-2.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O3-G3 page 3", "Observer field-note scan for G3.", "fieldnotes/o3-g3-3.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O4-G4 page 1", "Observer field-note scan for G4.", "fieldnotes/o4-g4-1.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O4-G4 page 2", "Observer field-note scan for G4.", "fieldnotes/o4-g4-2.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "O4-G4 page 3", "Observer field-note scan for G4.", "fieldnotes/o4-g4-3.JPG", { rotation: "none" })
        ]
      },
      {
        id: "360-videos",
        label: "360 Videos",
        kind: "videos",
        status: "Exported MP4 previews",
        items: [
          videoAsset(PROJECT_WEB_JUNE23_ROOT, "june23-g1", "Group 1 export", "June 23 G1 workshop activity export.", "360vid/exp-vid/g1-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE23_ROOT, "june23-g2", "Group 2 export", "June 23 G2 workshop activity export.", "360vid/exp-vid/g2-exp(g1).mp4"),
          videoAsset(PROJECT_WEB_JUNE23_ROOT, "june23-g3", "Group 3 export", "June 23 G3 workshop activity export.", "360vid/exp-vid/g3-exp.mp4"),
          videoAsset(PROJECT_WEB_JUNE23_ROOT, "june23-g4", "Group 4 export", "June 23 G4 workshop activity export.", "360vid/exp-vid/g4-exp(time).mp4")
        ]
      },
      {
        id: "interview",
        label: "Interview",
        kind: "sources",
        status: "Transcript and interview note scans",
        items: [
          {
            title: "Teacher interview transcript",
            caption: "June 23 same-day teacher interview transcript.",
            type: "doc",
            href: "./doc_views/june23_interview_transcript_20260623.html"
          },
          {
            title: "Teacher interview outline",
            caption: "Semi-structured debrief guide for June 23.",
            type: "doc",
            href: "./doc_views/june23_teacher_interview_outline_zh_2026-06-23.html"
          },
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "Interview notes 1", "June 23 interview note scan.", "interview/notes/in1.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "Interview notes 2", "June 23 interview note scan.", "interview/notes/in2.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "Interview notes 3", "June 23 interview note scan.", "interview/notes/in3.JPG", { rotation: "none" }),
          imageAsset(PROJECT_WEB_JUNE23_ROOT, "Interview notes overview", "June 23 full interview note scan.", "interview/notes/interview-all.JPG", { rotation: "none" })
        ]
      },
      {
        id: "video-analysis",
        label: "Video Analysis Files",
        kind: "sources",
        status: "ELAN and PFSX analysis files",
        items: [
          fileAsset(PROJECT_WEB_JUNE23_ROOT, "jun2.eaf", "June 23 ELAN annotation file in the archive.", "Vid-ana/jun2.eaf", { fileType: "EAF" }),
          fileAsset(PROJECT_WEB_JUNE23_ROOT, "jun2.pfsx", "June 23 ELAN preference/settings file in the archive.", "Vid-ana/jun2.pfsx", { fileType: "PFSX" })
        ]
      }
    ]
  }
];
