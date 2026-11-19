window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

const june9G1VideoTrace = {
  section: "archive",
  workshop: "june9",
  tab: "archive-videos",
  videoId: "june9-g1",
  label: "Open G1 Video"
};

const june9G1VideoAt1700Trace = {
  ...june9G1VideoTrace,
  time: 1020,
  label: "Open G1 Video: 17:00"
};

const june9G1VideoAt0245Trace = {
  ...june9G1VideoTrace,
  time: 165,
  label: "Open G1 Video: 2:45"
};

const june9G1VideoAt0910Trace = {
  ...june9G1VideoTrace,
  time: 550,
  label: "Open G1 Video: 9:10"
};

const june9InterviewTrace = {
  section: "archive",
  workshop: "june9",
  tab: "archive-interview",
  sourceTitle: "Teacher interview transcript (English)",
  label: "Open Teacher Interview"
};

const june9InterviewSensoryRegulationTraces = [
  {
    section: "archive",
    workshop: "june9",
    tab: "archive-interview",
    sourceTitle: "Teacher interview transcript (Chinese)",
    sourceAnchor: "interview-sensory-regulation-zh",
    label: "Open Chinese Interview: 00:08:16-00:10:18"
  },
  {
    section: "archive",
    workshop: "june9",
    tab: "archive-interview",
    sourceTitle: "Teacher interview transcript (English)",
    sourceAnchor: "interview-sensory-regulation-en",
    label: "Open English Interview: 00:08:16-00:10:18"
  }
];

const june9InterviewMaterialSafetyTraces = [
  {
    section: "archive",
    workshop: "june9",
    tab: "archive-interview",
    sourceTitle: "Teacher interview transcript (Chinese)",
    sourceAnchor: "interview-material-safety-zh",
    label: "Open Chinese Interview: 00:35:34-00:36:41"
  },
  {
    section: "archive",
    workshop: "june9",
    tab: "archive-interview",
    sourceTitle: "Teacher interview transcript (English)",
    sourceAnchor: "interview-material-safety-en",
    label: "Open English Interview: 00:35:34-00:36:41"
  }
];

window.PROJECT_WEB_DATA.interviewCodebook = {
  eyebrow: "Interview thematic analysis",
  title: "RQ-aligned interview codebook v0.2",
  sourceLabel: "Pilot-ready · 13 Aug 2026",
  summary:
    "The Chinese working codebook organizes four post-class teacher interviews and one life-teacher interview. It contains 49 provisional substantive codes across five domains, plus six evidence-quality flags and five evidence-link states. The architecture is ready for a 20% dual-coding pilot and is not yet frozen as v1.0.",
  facts: [
    { value: "5", label: "interviews" },
    { value: "49", label: "substantive codes" },
    { value: "92 / 460", label: "pilot units" },
    { value: "20%", label: "dual-coding sample" },
    { value: "6", label: "quality flags" },
    { value: "5", label: "evidence states" }
  ],
  domains: [
    {
      id: "A01–A10",
      title: "Reported learner–material patterns",
      rq: "RQ1 · contextual interview evidence",
      detail:
        "Teacher-reported material approach, selection, repeated tactile action, multisensory exploration, task participation or departure, learner-led sequence changes, and peer observation. Learner-behavior claims require linked observational evidence for promotion beyond teacher report."
    },
    {
      id: "B01–B08",
      title: "Teacher-proposed semantic interpretations",
      rq: "RQ2 contextual evidence · RQ3",
      detail:
        "Preference, comfort or regulation, task engagement, accessibility difficulty, communication, agency, bounded learning inference, and participant-expressed uncertainty or competing meanings. Actions are kept separate from interpretations."
    },
    {
      id: "C01–C11",
      title: "Educator interpretive knowledge",
      rq: "RQ3 · primary interview evidence",
      detail:
        "Prior learner history, prerequisite knowledge, action and communication capabilities, current context, material affordances, safety, classroom routines, resources, life-care knowledge, and role or interprofessional boundaries."
    },
    {
      id: "D01–D14",
      title: "Educator response and orchestration",
      rq: "RQ3 · primary interview evidence",
      detail:
        "Waiting and observation, prompts, demonstration, physical assistance, task and material adaptation, interest integration, reinforcement, differentiation, safety substitution, learner choice, grouping, adult attention, and real-time protective monitoring."
    },
    {
      id: "E01–E06",
      title: "Recurrence, change, and framework value",
      rq: "RQ4 · contextual interview evidence",
      detail:
        "Repeated learner–material relations, changes in learner action or educator practice, contextual contradiction, participant-cited cross-source evidence, and bounded framework or design implications. Recurrence and stability remain provisional until cross-session and cross-source checks."
    }
  ],
  guardrails: [
    "Interviews are primary evidence for educator interpretation, knowledge, decisions, and reported responses under RQ3.",
    "RQ1, RQ2, and RQ4 claims remain teacher-reported or contextual until linked to eligible video, field-note, photo, artifact, or assessment evidence.",
    "Researcher prompts do not count as teacher findings without explicit confirmation, qualification, rejection, or elaboration.",
    "The date-unknown life-teacher interview has mixed speaker labels; named attribution and key quotation require audio verification.",
    "The five domains are code families for pilot calibration, not finalized themes or evidence of thematic saturation."
  ]
};

function june9FieldNoteTrace(sourceTitle) {
  return {
    section: "archive",
    workshop: "june9",
    tab: "archive-fieldnotes",
    sourceTitle,
    label: `Open ${sourceTitle} Field Note`
  };
}

window.PROJECT_WEB_DATA.insights = [
  {
    id: "key-episode-sensory-regulation",
    number: "1",
    title: "Sensory Regulation (Seeking)",
    text: "S1 and S2 use material properties such as sound, touch, smell, and color to seek sensory input during the watch-making activity. These episodes are treated as sensory-regulation moments rather than simply off-task behavior.",
    subEpisodes: [
      {
        title: "Auditory seeking with laminated cardstock",
        text: "S2 repeatedly bends or crinkles laminated cardstock and holds it near the ear to listen to the snapping sound.",
        traceTargets: [
          june9FieldNoteTrace("O1-1"),
          june9FieldNoteTrace("O1-2"),
          june9G1VideoAt1700Trace,
          ...june9InterviewSensoryRegulationTraces
        ]
      },
      {
        title: "Tactile-face contact with laminated cardstock",
        text: "S2 places the laminated cardstock near the nose and cheek, pauses, and appears to feel the material against the face.",
        traceTargets: [
          june9FieldNoteTrace("O1-1"),
          june9FieldNoteTrace("O1-2"),
          june9G1VideoAt0245Trace
        ]
      },
      {
        title: "Color-seeking and color fidelity",
        text: "S1 leaves the immediate task space to find or explore more colored acrylic paint markers. O1's notes and the teacher interview suggest that this is not only color seeking: S1 also appears to care about reproducing the template colors and returning misplaced markers to their place.",
        traceTargets: [
          june9FieldNoteTrace("O1-2"),
          june9G1VideoTrace,
          june9InterviewTrace
        ]
      },
      {
        title: "Olfactory and visual inquiry with markers",
        text: "S2 smells a strong-smelling marker, opens marker caps, colors on a cap, and observes the cap color as part of material exploration.",
        traceTargets: [
          june9FieldNoteTrace("O1-2"),
          june9G1VideoAt0910Trace,
          june9InterviewTrace
        ]
      }
    ]
  },
  {
    id: "key-episode-teacher-assistance",
    number: "2",
    title: "Teacher Assistance",
    text: "Teacher support helps repair task access when sensory or material engagement makes the watch information harder to use.",
    subEpisodes: [
      {
        title: "Replacing the obscured watch artifact",
        text: "S2 focuses on filling and coloring, uses dark color over the watch information and outline, and the teacher prompts that the color is too dark before providing a replacement watch.",
        traceTargets: [
          june9FieldNoteTrace("O1-2"),
          june9G1VideoTrace,
          june9InterviewTrace
        ]
      }
    ]
  },
  {
    id: "key-episode-oral-exploration-material-safety",
    number: "3",
    title: "Oral Exploration and Material Safety",
    text: "Teachers described a learner putting non-edible workshop materials into the mouth, including glue, clay, and plastic or paper-like materials. This episode should be reported as material-safety evidence and possible oral sensory-seeking or pica-related behavior, not as misbehavior or a neurological diagnosis.",
    points: [
      "Observed behavior: mouthing or eating non-edible craft materials changes how safe material access, supervision, and task participation need to be designed.",
      "Interpretive bridge: pica and oral sensory seeking provide the most direct research language for this episode; Klüver-Bucy syndrome and hyperorality are only background terminology for oral exploration, not evidence of causation here.",
      "Next step: code the episode with video, field notes, and teacher interpretation, then compare whether similar oral-material risks recur across later workshops before making a stable framework claim."
    ],
    traceTargets: june9InterviewMaterialSafetyTraces
  }
];

// Current manuscript structure; the earlier codebook and episode memos above
// remain available only in the explicitly labeled historical section.
window.PROJECT_WEB_DATA.findings = [
  {
    id: "finding-materials",
    number: "1",
    rq: "RQ1",
    title: "Materials as Situated Resources",
    text: "Materials take on different functions depending on the learner, activity, and situation. Educators' accounts of material choices and interpretations also contribute to RQ2.",
    subsections: [
      {
        title: "1.1 Multiple Functions of Materials",
        points: [
          "Task mediator: Materials organize concrete operations such as cutting, folding, drawing, gluing, and shaping.",
          "Sensory exploration: Accounts describe pressing, touching, listening, and mouth contact. Comfort or regulation remains an educator interpretation.",
          "Communication: Showing, sharing, and drawing attention to material work provide occasions for interaction. Recipient attention and response still require video review.",
          "Interest-linked resources: Educators incorporate reported interests in clay, coloring, or pens into activities. Reported interest does not establish motivation or reinforcement effectiveness."
        ]
      },
      {
        title: "1.2 Matching Materials to Learning Activities",
        points: [
          "Educators describe adapting tasks around learners' abilities, available support, and reported interests—for example, adding coloring elements or incorporating clay into moon-making.",
          "These accounts specify proposed or reported adaptations; their effects on participation remain to be established."
        ]
      },
      {
        title: "1.3 Representing Time Concepts",
        points: [
          "Clocks and daily-schedule posters make numerals, spatial arrangements, and activity–time relationships visible.",
          "The artifacts document representations. They do not independently establish who completed each step or what a learner understood."
        ]
      }
    ]
  },
  {
    id: "finding-responses",
    number: "2",
    rq: "RQ2",
    title: "Interpreted Response & Participation",
    text: "Educators describe interpreting material actions and adjusting their responses. Linked video is needed to establish the response and what became possible next.",
    subsections: [
      {
        title: "2.1 Task Support Adaptation",
        points: [
          "Reported adjustments address specific obstacles while leaving work for the learner—for example, marking key clock positions or lifting a tape corner.",
          "A contrasting pilot record describes an educator completing the task. The subsequent participation opportunities require further examination."
        ]
      },
      {
        title: "2.2 Attention & Presence",
        points: [
          "Accounts include allowing repeated clay pressing, responding to requests for attention, and providing individual attention.",
          "Whether presence or assistance changes subsequent participation opportunities still requires linked video analysis. Proximity alone does not establish facilitation."
        ]
      }
    ]
  },
  {
    id: "finding-conditions",
    number: "3",
    rq: "RQ3",
    title: "Material Participation Across ND Classroom Conditions",
    text: "Educators' accounts situate participation within changing tasks, material access, and educator or peer availability in the studied neurodivergent classroom.",
    subsections: [
      {
        title: "3.1 Material Engagement Across Tasks",
        points: [
          "Educators describe similar material actions being organized differently across activities. Reported interests and reward value can vary over time.",
          "Safety decisions can change which materials and operations remain available. Recurring engagement trajectories and causal effects have not been established."
        ]
      },
      {
        title: "3.2 Educator & Peer Availability",
        points: [
          "Educators describe staffing and shared attention as constraints on which activities they can support. Peer work provides examples for looking and imitation.",
          "The current evidence does not establish that peer support replaces educator support or improves social skills. Exact interaction sequences remain to be verified."
        ]
      }
    ]
  }
];

window.PROJECT_WEB_DATA.memoLines = [
  "Verify interview audio, speaker attribution, and flagged passages before publication-level quotation.",
  "Link reported adjustments, attention, peer responses, and material traces to exact video episodes and subsequent participation opportunities.",
  "Complete production video analysis and systematic cross-session comparison, including contradictions and negative cases, before promoting whole-study findings."
];
