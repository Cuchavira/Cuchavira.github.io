window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

window.PROJECT_WEB_DATA.analysisWorkflow = {
  title: "Video Data Analysis Stage",
  eyebrow: "McNaughton-adapted workflow",
  summary:
    "A project-specific five-stage workflow for moving from June 2 classroom video logs to consent-safe close episodes, interpretive coding, and RQ-linked themes.",
  sourceLabel: "5 stages",
  workbookHref: "../WorkshopJune2/outputs/video_analysis_workbook.xlsx",
  stages: [
    {
      number: "01",
      title: "Log Check",
      description:
        "Verify existing June 2 video logs, source ownership, task segment, consent status, and field-note links instead of rebuilding the archive."
    },
    {
      number: "02",
      title: "Episode Selection",
      description:
        "Filter candidate moments where tactile or material action, teacher or peer interaction, artifact change, ambiguity, or RQ relevance is visible."
    },
    {
      number: "03",
      title: "Close Transcription",
      description:
        "Select 6-8 consent-safe episodes and write compact multimodal notes for speech, gesture, gaze, touch, teacher support, peer response, and artifact change."
    },
    {
      number: "04",
      title: "Interpretive Coding",
      description:
        "Code verbal and non-verbal disclosure while keeping observation, teacher context, peer interaction, artifact state, and interpretation limits separate."
    },
    {
      number: "05",
      title: "Theme-RQ Linking",
      description:
        "Cluster early themes and map them to RQ1-RQ4, treating RQ4 as salience candidates rather than stable claims from one session."
    }
  ],
  guardrails: [
    "Raw identifiable video, full transcripts, and restricted student identity mapping stay outside the repo.",
    "Teacher interpretation is contextual evidence, not direct learner voice.",
    "G4 evidence is restricted unless a consent-safe S07-only segment is confirmed."
  ],
  narrativeSummaries: {
    title: "Narrative summaries",
    eyebrow: "Pair-level writing structure",
    sourceLabel: "Writing template",
    description:
      "Use this template for each pair-level narrative. Keep the writing descriptive before interpretation, then link the moment back to the relevant research questions.",
    writingPrompt: {
      title: "Narrative summary structure",
      intro: "Write 5-10 sentences describing:",
      rqIntro: "Connect the narrative to the relevant RQs:",
      fields: [
        "Activity goal or task stage (pre-defined)",
        "Who is present",
        "What materials are used",
        "What the child does",
        "What the teacher does",
        "Key dialogue or gesture",
        "Visible change in artifact/work",
        "Moments that seem analytically important",
        "Uncertainty or things needing teacher clarification"
      ]
    },
    entries: []
  }
};
