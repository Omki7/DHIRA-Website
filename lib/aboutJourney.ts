export type JourneyThread = "time" | "platform-research" | "national-delivery" | "machine-learning" | "artificial-intelligence" | "knowledge" | "recognition" | "documents" | "agents";

export interface JourneyEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  colour: string;
  at: number;
  thread: JourneyThread;
}

export interface JourneyChapter {
  year: string;
  colour: string;
  events: readonly JourneyEvent[];
  future?: boolean;
}

export const JOURNEY_INTRO = {
  title: "The work behind the platform.",
  description: "From data engineering to governed intelligence.",
};

// Dates and achievements supplied by DHIRA. Same-year events are an editorial
// sequence, with no invented months. Public programmes remain unnamed.
export const JOURNEY_CHAPTERS: readonly JourneyChapter[] = [
  {
    year: "2018", colour: "#94682D",
    events: [{
      id: "founding", category: "The beginning", title: "DHIRA begins.",
      description: "Founded on data engineering, with dependable data as the starting point.",
      colour: "#94682D", at: 0, thread: "time",
    }],
  },
  {
    year: "2019", colour: "#3E63B5",
    events: [{
      id: "research", category: "Platform research", title: "Akashic takes shape.",
      description: "Research and engineering begin on a platform connecting data to insight.",
      colour: "#3E63B5", at: 1, thread: "platform-research",
    }],
  },
  {
    year: "2020", colour: "#247F75",
    events: [{
      id: "national-deployment", category: "National delivery", title: "Built for national scale.",
      description: "Our first national scale project goes live at the end of the year.",
      colour: "#247F75", at: 2, thread: "national-delivery",
    }],
  },
  {
    year: "2022", colour: "#3E63B5",
    events: [{
      id: "platform-launch", category: "Platform launch", title: "Akashic launches.",
      description: "Data pipelines, warehousing and BI come together in a cloud agnostic platform.",
      colour: "#3E63B5", at: 3, thread: "time",
    }],
  },
  {
    year: "2023", colour: "#7654A6",
    events: [
      {
        id: "national-learning", category: "National delivery", title: "Learning at national scale.",
        description: "The first Akashic project serves a national digital learning programme.",
        colour: "#247F75", at: 4, thread: "national-delivery",
      },
      {
        id: "ml-launch", category: "Machine learning", title: "From analysis to prediction.",
        description: "The Akashic ML module launches.",
        colour: "#7654A6", at: 4, thread: "machine-learning",
      },
    ],
  },
  {
    year: "2024", colour: "#287C89",
    events: [
      {
        id: "national-employment", category: "National delivery", title: "National delivery grows.",
        description: "The second major Akashic project serves a national overseas employment programme.",
        colour: "#247F75", at: 5, thread: "national-delivery",
      },
      {
        id: "ai-launch", category: "Artificial intelligence", title: "AI enters the platform.",
        description: "The Akashic AI module launches, building on the platform's data foundation.",
        colour: "#7654A6", at: 5, thread: "artificial-intelligence",
      },
    ],
  },
  {
    year: "2025", colour: "#7654A6",
    events: [
      {
        id: "master-data", category: "Platform release", title: "Master data management.",
        description: "Akashic launches the module for consistent records and identities.",
        colour: "#3E63B5", at: 6, thread: "time",
      },
      {
        id: "governance", category: "Data governance", title: "Governance meets meaning.",
        description: "Data governance launches alongside knowledge and semantic layers.",
        colour: "#7654A6", at: 6.16, thread: "knowledge",
      },
      {
        id: "maha-award", category: "Hackathon winner", title: "Maha Hackathon.",
        description: "One of two hackathon wins for DHIRA in 2025.",
        colour: "#94682D", at: 6.28, thread: "recognition",
      },
      {
        id: "telangana-award", category: "Hackathon winner", title: "Telangana AI Rising.",
        description: "One of two hackathon wins for DHIRA in 2025.",
        colour: "#94682D", at: 6.46, thread: "recognition",
      },
    ],
  },
  {
    year: "2026", colour: "#286E9A",
    events: [
      {
        id: "unstructured-data", category: "Unstructured data", title: "Beyond rows and columns.",
        description: "Akashic adds unstructured data processing, bringing documents into the data journey.",
        colour: "#247F75", at: 6.7, thread: "documents",
      },
      {
        id: "hybrid-answers", category: "Hybrid intelligence", title: "The complete context.",
        description: "Hybrid answers combine structured records with unstructured information.",
        colour: "#286E9A", at: 7, thread: "time",
      },
    ],
  },
  {
    year: "Ahead", colour: "#945B76", future: true,
    events: [{
      id: "ambition", category: "Our ambition", title: "From answers to action.",
      description: "Connected agents, grounded in trusted data, with human oversight, traceable decisions and clear ownership.",
      colour: "#945B76", at: 8, thread: "agents",
    }],
  },
];

export const JOURNEY_MOMENTS = JOURNEY_CHAPTERS.flatMap((chapter, yearIndex) =>
  chapter.events.map((event, eventIndex) => ({
    ...event,
    year: chapter.year,
    yearIndex,
    eventIndex,
    eventCount: chapter.events.length,
    future: chapter.future === true,
  })),
);
export type JourneyMoment = (typeof JOURNEY_MOMENTS)[number];

/*
 * [02] Layers (6 Oct 2026). The journey as one drawing: every release is a
 * layer that starts in its year and is still there today. Built layers
 * stack above the line, proven layers (national programmes) hang below it.
 * The facts are the supplied chronology above, regrouped by layer; nothing
 * new is claimed. A ramp spans the calendar year because no month is known,
 * except 2020, which was supplied as "the end of the year". The exports
 * above serve the retired JourneyExplorer and stay for reference.
 */
export type JourneyLayerKind = "foundation" | "platform" | "programme" | "ahead";

export interface JourneyLayer {
  id: string;
  kind: JourneyLayerKind;
  /** Calendar year shown beside the layer. */
  year: string;
  /** The ramp in fractional years: where the layer begins to rise and where it is complete. */
  from: number;
  to: number;
  title: string;
  /** One terse mono line. */
  detail: string;
  /** One sentence for the ledger and assistive technology. */
  description: string;
}

/** Early October 2026, where every built layer currently ends. */
export const JOURNEY_TODAY = 2026.76;

/** Bottom to top: each release sits on everything before it. */
export const JOURNEY_BUILT: readonly JourneyLayer[] = [
  {
    id: "founding", kind: "foundation", year: "2018", from: 2018.06, to: 2018.7,
    title: "DHIRA founded", detail: "Data engineering",
    description: "Founded on data engineering, with dependable data as the starting point.",
  },
  {
    id: "akashic", kind: "platform", year: "2019", from: 2019.14, to: 2019.86,
    title: "Akashic research", detail: "Data to insight",
    description: "Research and engineering begin on a platform connecting data to insight.",
  },
  {
    id: "machine-learning", kind: "platform", year: "2023", from: 2023.14, to: 2023.86,
    title: "Machine learning", detail: "Akashic ML",
    description: "The Akashic ML module launches, taking the platform from analysis to prediction.",
  },
  {
    id: "artificial-intelligence", kind: "platform", year: "2024", from: 2024.14, to: 2024.86,
    title: "Artificial intelligence", detail: "Akashic AI",
    description: "The Akashic AI module launches, building on the platform's data foundation.",
  },
  {
    id: "master-data", kind: "platform", year: "2025", from: 2025.14, to: 2025.86,
    title: "Master data", detail: "Records and identities",
    description: "Akashic launches the module for consistent records and identities.",
  },
  {
    id: "governance", kind: "platform", year: "2025", from: 2025.14, to: 2025.86,
    title: "Governance and meaning", detail: "Knowledge · semantic layers",
    description: "Data governance launches alongside knowledge and semantic layers.",
  },
  {
    id: "documents", kind: "platform", year: "2026", from: 2026.08, to: 2026.62,
    title: "Documents", detail: "Unstructured data",
    description: "Akashic adds unstructured data processing, bringing documents into the data journey.",
  },
  {
    id: "hybrid-answers", kind: "platform", year: "2026", from: 2026.08, to: 2026.62,
    title: "Hybrid answers", detail: "Records with documents",
    description: "Hybrid answers combine structured records with unstructured information.",
  },
];

/** The 2022 launch turns the research layer solid. */
export const JOURNEY_LAUNCH = {
  year: "2022", at: 2022.18,
  title: "Akashic launches",
  detail: "Pipelines · warehousing · BI",
  description: "Data pipelines, warehousing and BI come together in a cloud agnostic platform.",
};

/** Top to bottom: each programme goes live beneath the ones before it. */
export const JOURNEY_PROVEN: readonly JourneyLayer[] = [
  {
    id: "national-scale", kind: "programme", year: "2020", from: 2020.56, to: 2020.98,
    title: "First national-scale system", detail: "Live at year end",
    description: "Our first national scale project goes live at the end of the year.",
  },
  {
    id: "national-learning", kind: "programme", year: "2023", from: 2023.14, to: 2023.86,
    title: "National learning programme", detail: "First on Akashic",
    description: "The first Akashic project serves a national digital learning programme.",
  },
  {
    id: "national-employment", kind: "programme", year: "2024", from: 2024.14, to: 2024.86,
    title: "Overseas employment programme", detail: "Second on Akashic",
    description: "The second major Akashic project serves a national overseas employment programme.",
  },
];

export const JOURNEY_AHEAD: JourneyLayer = {
  id: "agents", kind: "ahead", year: "Ahead", from: JOURNEY_TODAY, to: 2027.3,
  title: "From answers to accountable action", detail: "Our direction",
  description: "Our ambition is AI that works across systems, grounded in trusted context, with clear limits and people in control.",
};

export const JOURNEY_DIRECTION = [
  { title: "Trusted context", description: "Ground agents in governed data, shared meaning and source evidence." },
  { title: "Scoped action", description: "Define each task, limit permissions and test the outcome." },
  { title: "Human authority", description: "Keep consequential actions reviewable, traceable and owned by a person." },
] as const;

export const JOURNEY_HORIZON = {
  label: "Our direction",
  title: "AI with accountability.",
  status: "Ambition · No release date",
};

export const JOURNEY_READING = {
  horizon: "The horizon",
  scroll: "Scroll to add each year. Every layer stays.",
  end: "The foundation carries forward. Keep scrolling to continue.",
  overview: "The complete journey, from foundation to ambition.",
  showAll: "Show all years",
  explore: "Explore on scroll",
};

export const JOURNEY_STEPS = [
  { year: "2018", title: "Start with dependable data.", description: "DHIRA begins with data engineering as the foundation." },
  { year: "2019", title: "Build the common foundation.", description: "Research begins on Akashic, connecting data to insight." },
  { year: "2020", title: "Put it to work at national scale.", description: "Our first national scale system goes live at year end." },
  { year: "2022", title: "Bring the platform together.", description: "Akashic launches with pipelines, warehousing and BI." },
  { year: "2023", title: "Add prediction. Extend the reach.", description: "Machine learning launches. Akashic serves a national learning programme." },
  { year: "2024", title: "Build AI on the data foundation.", description: "The AI module launches. Akashic serves a national employment programme." },
  { year: "2025", title: "Give intelligence shared meaning.", description: "Master data, governance, knowledge and semantic layers join the platform." },
  { year: "2026", title: "Bring the full context into view.", description: "Documents join structured records. Hybrid answers bring them together." },
  { year: "Ahead", title: "From answers to accountable action.", description: "Connected agents, built on this foundation. Our ambition, with people in control." },
] as const;

export const JOURNEY_RECOGNITION = {
  year: "2025",
  lead: "2025: two hackathon wins.",
  payoff: "Maha Hackathon. Telangana AI Rising.",
};

/** `short` stands in when the span is too narrow for the full name. */
export const JOURNEY_ERAS = [
  { label: "Foundations", short: "Foundations", from: 2018, to: 2022 },
  { label: "Platform", short: "Platform", from: 2022, to: 2025 },
  { label: "Governed intelligence", short: "Intelligence", from: 2025, to: JOURNEY_TODAY },
] as const;
