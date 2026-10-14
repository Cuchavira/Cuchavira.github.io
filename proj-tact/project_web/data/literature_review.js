window.PROJECT_WEB_DATA = window.PROJECT_WEB_DATA || {};

// Structured Related Work library for the Touch-to-Meaning study.
// Subsections mirror the CHI 2027 blueprint Related Work section
// (ND learning & classroom context; materials & tangibles; qualitative
// microanalysis). Each reading carries expandable metadata so the library
// can grow in future iterations without changing the renderer.
window.PROJECT_WEB_DATA.literatureReview = {
  eyebrow: "Related work knowledge base",
  title: "Literature review library",
  intro:
    "A curated related-work library organized around the three pillars of the Touch-to-Meaning argument. Each subsection summarizes what prior work foregrounds, the gap this study addresses, and a structured reading list traced to the Zotero project library.",
  sections: [
    {
      id: "nd-learning",
      label: "ND Learning & Classroom Practice",
      short: "ND Learning",
      title: "ND Learning & Classroom Practice",
      filterTags: ["classroom practice", "learning design"],
      tagline: "ND participation is situated within classroom relationships, resources, and access.",
      priorWork: [
        "Participation includes speech, gesture, touch, embodied play, stimming, withdrawal, and re-entry.",
        "Behaviour is co-constructed with peers, educators, routines, task demands, and sensory context.",
        "Educator scaffolding is both planned and improvised, and real-time attention remains finite.",
        "Neuroaffirmative inquiry cautions against deficit-only readings of situated action."
      ],
      gap: [
        "Prior classroom work rarely treats naturalistic tactile-material action as the analytic unit.",
        "This study observes four repeated sessions with seven focal learners and three rotating educators."
      ],
      anchors: "Sobel et al., 2024; Das et al., 2025; Stefanidi et al., 2023; Ochs & Solomon, 2010",
      readings: [
        {
          title: "Incloodle-Classroom: Technology for Inclusive Joint Media Engagement in a Neurodiverse Kindergarten Classroom",
          authors: "Kiley Sobel, Maitraye Das, Sara Behbakht, Julie A. Kientz",
          year: 2024,
          venue: "ACM Transactions on Computer-Human Interaction",
          keywords: ["inclusive classroom", "joint media engagement", "kindergarten"],
          tags: ["classroom practice", "learning design"],
          relevance: "Anchor for joint engagement and inclusion in a neurodiverse classroom.",
          status: "Under review",
          zoteroKey: "CER8XID3",
          doi: "10.1145/3674506"
        },
        {
          title: "Cultivating Computational Thinking and Social Play among Neurodiverse Preschoolers in Inclusive Classrooms",
          authors: "Maitraye Das, Megan Tran, Amanda Chih-han Ong, Julie A. Kientz, Heather Feldner",
          year: 2025,
          venue: "ACM (CHI/ASSETS)",
          keywords: ["neurodiverse", "inclusive classroom", "tangible (KIBO)", "social play"],
          tags: ["classroom practice", "learning design", "tangible interaction"],
          relevance: "Neurodiverse preschool play and tangible-supported classroom practice.",
          status: "Under review",
          zoteroKey: "FRIARSPX",
          doi: "10.1145/3706598.3713851"
        },
        {
          title: "Children with ADHD and their Care Ecosystem: Designing Beyond Symptom Management",
          authors: "Evropi Stefanidi, Johannes Schöning, Yvonne Rogers, Jasmin Niess",
          year: 2023,
          venue: "CHI '23",
          keywords: ["ADHD", "care ecosystem", "neurodivergent design"],
          tags: ["learning design"],
          relevance: "Situating ND behaviour within a wider relational and care ecosystem.",
          status: "To read"
        },
        {
          title: "Touch in learning interactions with autistic children: Socialising attention and engagement",
          authors: "Vivien Heller",
          year: 2023,
          venue: "Learning, Culture and Social Interaction",
          keywords: ["interpersonal touch", "attention", "engagement", "autism"],
          tags: ["classroom practice"],
          relevance: "Touch as a resource for organizing attention and engagement in ND learning.",
          status: "Under review",
          zoteroKey: "LW6P3ZGD"
        },
        {
          title: "Autistic Sociality",
          authors: "Elinor Ochs, Olga Solomon",
          year: 2010,
          venue: "Ethos",
          keywords: ["autistic sociality", "situated interaction", "ethnography"],
          tags: ["classroom practice", "qualitative methods"],
          relevance: "Foundational argument against deficit-only readings of autistic social action.",
          status: "To read"
        }
      ]
    },
    {
      id: "materials-tangibles",
      label: "Materials & Tangibles",
      short: "Materials",
      title: "Materials & Tangibles",
      filterTags: ["tangible interaction", "learning design"],
      tagline: "Materials can mediate attention, expression, collaboration, and task access.",
      priorWork: [
        "Tangibles and manipulatives externalize concepts through touch, placement, and recombination.",
        "Object placement and adjustment can organize attention, access, and task transitions.",
        "Material properties such as texture, compliance, form, and resistance shape possible actions.",
        "Meaning may emerge through embodied, minimally verbal interaction with materials."
      ],
      gap: [
        "Materials are often treated as task props rather than the analytic unit of mediation.",
        "Naturalistic material-action episodes before intervention remain under-described.",
        "The same material may support regulation, representation, collaboration, or refusal.",
        "Learner action and educator orchestration must be analysed together."
      ],
      anchors: "Korkiakangas & Rae, 2013; Wilson et al., 2019; Scheepmaker et al., 2021; Morris et al., 2025",
      readings: [
        {
          title: "Touch with Meaning: A Contextual Analysis of Social Touch",
          authors: "Ayush Bhardwaj, Ashish Pratap, Abbas Khawaja, Yapeng Tian, Uison Ju, Dajin Lee, Seungmoon Choi, Jin Ryong Kim",
          year: 2026,
          venue: "ACM",
          keywords: ["social touch", "context", "tactile meaning"],
          tags: ["tangible interaction"],
          relevance: "Contextual reading of social touch as a carrier of meaning.",
          status: "Extensive read",
          zoteroKey: "HHI9TKVD",
          doi: "10.1145/3772318.3791605"
        },
        {
          title: "Gearing up to a new activity: How teachers and children use material resources to organize transitions",
          authors: "Terhi Korkiakangas, John Rae",
          year: 2013,
          venue: "Interactional research (classroom transitions)",
          keywords: ["material resources", "transitions", "classroom interaction"],
          tags: ["classroom practice", "tangible interaction"],
          relevance: "Object handling and placement as resources that organize classroom transitions.",
          status: "To read"
        },
        {
          title: "Sensory-being and material engagement for neurodivergent learners",
          authors: "Scheepmaker, Frauenberger, Spiel, Posch (project lineage)",
          year: 2021,
          venue: "ACM (DIS/IDC lineage)",
          keywords: ["sensory-being", "material engagement", "neurodivergent"],
          tags: ["learning design", "tangible interaction"],
          relevance: "Material and sensory engagement designed around neurodivergent learners.",
          status: "To read"
        },
        {
          title: "Tangible manipulatives and embodied task access (Wilson et al.)",
          authors: "Wilson et al.",
          year: 2019,
          venue: "CHI blueprint anchor",
          keywords: ["tangibles", "manipulatives", "embodiment"],
          tags: ["learning design", "tangible interaction"],
          relevance: "Manipulatives externalize and scaffold concepts through touch and placement.",
          status: "To read"
        },
        {
          title: "Material properties as interactional resources (Morris et al.)",
          authors: "Morris et al.",
          year: 2025,
          venue: "CHI blueprint anchor",
          keywords: ["material properties", "affordances", "interaction"],
          tags: ["tangible interaction"],
          relevance: "Texture, compliance, form, and resistance shape possible learner actions.",
          status: "To read"
        }
      ]
    },
    {
      id: "qualitative-methods",
      label: "Qualitative Methods — Microanalysis",
      short: "Microanalysis",
      title: "Qualitative Methods — Microanalysis",
      filterTags: ["microanalysis", "qualitative methods"],
      tagline: "Microanalysis links embodied action to sequence, context, and multiple evidence sources.",
      priorWork: [
        "Episode-level microanalysis preserves timing, sequence, and participant response.",
        "Multimodal transcripts can include speech, gaze, gesture, touch, posture, and object action.",
        "Video ethnography connects selected hot spots to broader classroom routines and field context.",
        "Conversation and discourse analysis ask what an action accomplishes in the local sequence.",
        "Observable action remains distinct from researcher or educator interpretation."
      ],
      gap: [
        "Define the episode before coding, retaining start/end, actors, material, and task phase.",
        "Triangulate video with field notes, artifacts, and interviews while preserving each source role."
      ],
      anchors: "Jordan & Henderson, 1995; Sobel et al., 2024; Das et al., 2025; Heller, 2023",
      readings: [
        {
          title: "Interaction Analysis: Foundations and Practice",
          authors: "Brigitte Jordan, Austin Henderson",
          year: 1995,
          venue: "Journal of the Learning Sciences",
          keywords: ["interaction analysis", "video", "foundational method"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Foundational method for episode-level analysis of video interaction.",
          status: "To read",
          doi: "10.1207/s15327809jls0401_2"
        },
        {
          title: "Conducting Video Research in the Learning Sciences: Guidance on Selection, Analysis, Technology, and Ethics",
          authors: "Sharon J. Derry, Roy D. Pea, Brigid Barron, Randi A. Engle, Frederick Erickson, et al.",
          year: 2010,
          venue: "Journal of the Learning Sciences",
          keywords: ["video research", "selection", "ethics", "learning sciences"],
          tags: ["qualitative methods"],
          relevance: "Guidance on selecting, sampling, and ethically handling classroom video.",
          status: "To read",
          doi: "10.1080/10508400903452884"
        },
        {
          title: "Analyzing Multimodal Interaction: A Methodological Framework",
          authors: "Sigrid Norris",
          year: 2004,
          venue: "Routledge",
          keywords: ["multimodal interaction", "methodology", "transcription"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Framework for multimodal transcription of speech, gaze, gesture, and action.",
          status: "To read"
        },
        {
          title: "Through the Viewfinder: Reflecting on the Collection and Analysis of Classroom Video Data",
          authors: "Angela Fitzgerald",
          year: null,
          venue: "Education (video methods)",
          keywords: ["classroom video", "ethnography", "video research"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Reflexive account of collecting and analysing classroom video.",
          status: "Intensive read",
          zoteroKey: "962AW52A"
        },
        {
          title: "A Hunch without a Sound: Co-Constructing Meanings of Nonverbal and Verbal Interactions in Video Data",
          authors: "Author not listed in the Zotero record",
          year: null,
          venue: "Video data analysis",
          keywords: ["nonverbal interaction", "video data analysis", "co-construction"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Worked example of co-constructing meaning from nonverbal video data.",
          status: "Extensive read",
          zoteroKey: "2GX92V5H"
        },
        {
          title: "Closing in on the Picture: Analyzing Interactions in Video Recordings",
          authors: "Author not listed in the Zotero record",
          year: null,
          venue: "Discourse analysis",
          keywords: ["discourse analysis", "video recordings", "interaction"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Analytic strategy for zooming into interaction within video recordings.",
          status: "Intensive read",
          zoteroKey: "CXEJ5X36"
        },
        {
          title: "\"Speech is Silver, Silence is Golden\": Analyzing Micro-communication Strategies between Visually Impaired Runners and their Guides",
          authors: "Giulia Barbareschi, Tarika Kumar, Christopher Changmok Kim, George Chernyshov, Kai Kunze",
          year: 2024,
          venue: "ACM",
          keywords: ["micro-communication", "multimodal", "video analysis example"],
          tags: ["microanalysis", "qualitative methods"],
          relevance: "Example of fine-grained micro-communication analysis from video.",
          status: "Extensive read",
          zoteroKey: "EABVZB8I"
        }
      ]
    }
  ]
};
