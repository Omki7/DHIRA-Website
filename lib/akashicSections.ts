import type { PageSection } from "./pageSection";

/* [10] Built on Akashic (rebuilt 14 Oct 2026). The section owns ONE claim,
   distinct from [07]'s "lay the groundwork once": the solutions are not
   separate products but Akashic, configured. Its evidence is the module
   matrix: the same seven modules under every solution, each solution
   switching on the ones its process needs.
   Module use, by source (Rule 4, no invented data):
   - Enterprise Intelligence: the EIS list approved here 23 Sep 2026, plus
     Warehouse from the founder's chips (his forecast runs on ADW).
   - IPMS: the founder's "Akashic modules used" chips (DHIRA_ai_Website_v2)
     mapped to the seven names: ADP and AUD intake to Pipelines, AMD to
     Master Data, ALMA to Ask Akashic, Akashic BI to BI, ADG and AIAM to
     Governance. His rules engine and workflow are platform services, not
     modules, so they appear in the copy only.
   - Akashic Life: the list approved here 23 Sep 2026.
   Enterprise Intelligence IS /solutions/eis (user, 14 Oct 2026). */
export const AKASHIC_SOLUTION_MODULES = [
  "Pipelines",
  "Master Data",
  "Warehouse",
  "Machine Learning",
  "Ask Akashic",
  "BI",
  "Governance",
] as const;

export type AkashicModuleName = (typeof AKASHIC_SOLUTION_MODULES)[number];

export type AkashicSolution = {
  id: "ei" | "ipms" | "life";
  name: string;
  category: string;
  audience: string;
  headline: string;
  /** Read by the /solutions hub; [10] carries the headline only. */
  description: string;
  stages: { title: string; detail: string }[];
  note: string;
  modules: AkashicModuleName[];
  href: string;
  cta: string;
};

export const AKASHIC_SOLUTIONS: {
  setup: string;
  title: string;
  intro: string;
  items: AkashicSolution[];
  all: { label: string; href: string };
} = {
  setup: "Not separate products.",
  title: "Akashic, configured around one process.",
  intro: "Enterprise Intelligence, IPMS and Akashic Life run on one set of modules. Each solution switches on the ones its process needs.",
  items: [
    {
      id: "ei",
      name: "Enterprise Intelligence",
      category: "Agentic FP&A and MIS",
      audience: "For business and operations leaders",
      headline: "See what matters. Decide with evidence.",
      description: "Connect performance, risk and open decisions across the systems you run. Trace the answer, then approve a defined action.",
      stages: [
        { title: "Read the business", detail: "Your existing systems" },
        { title: "Explain the signal", detail: "Definitions and sources" },
        { title: "Approve the action", detail: "Scoped and auditable" },
      ],
      note: "Read-only ingestion. Write-back only through approved, scoped actions.",
      modules: ["Pipelines", "Master Data", "Warehouse", "Ask Akashic", "BI", "Governance"],
      href: "/solutions/eis",
      cta: "Explore Enterprise Intelligence",
    },
    {
      id: "ipms",
      name: "IPMS",
      category: "Intelligent procurement",
      audience: "For public procurement teams",
      headline: "From indent to secured contract, with evidence.",
      description: "IPMS runs public procurement end to end. AI drafts and reads, the rules engine decides, people approve, and every step lands in the audit trail.",
      stages: [
        { title: "Read every bid", detail: "Cited to the page" },
        { title: "Check the rules", detail: "Versioned, linked to evidence" },
        { title: "Approve the award", detail: "Bids sealed until approval" },
      ],
      note: "Rules decide, people approve, and every step lands in the audit trail.",
      modules: ["Pipelines", "Master Data", "Ask Akashic", "BI", "Governance"],
      href: "/solutions#ipms",
      cta: "See IPMS",
    },
    {
      id: "life",
      name: "Akashic Life",
      category: "Frontline maternal care",
      audience: "For health programmes and care teams",
      headline: "Read the risk. Carry the record into care.",
      description: "Designed for maternal care at the remote edge: offline risk screening, a continuous patient record and visibility for district teams.",
      stages: [
        { title: "Screen at the visit", detail: "On the phone, offline" },
        { title: "Carry the record", detail: "Sync when connected" },
        { title: "Coordinate care", detail: "From frontline to district" },
      ],
      note: "Designed to connect the frontline visit with the wider care pathway.",
      modules: ["Machine Learning", "Master Data", "BI", "Governance"],
      href: "/solutions/life",
      cta: "Explore Akashic Life",
    },
  ],
  all: { label: "All solutions", href: "/solutions" },
};


export const AKASHIC_SECURITY = {
  setup: "Put AI to work.",
  title: "Keep control of your data.",
  intro: "Use your data with confidence. Akashic applies permissions, policy and privacy controls from ingestion to the final answer.",
  badges: ["Role-based access", "Private deployment", "Auditable answers"],
  cards: [
    { title: "No AI training", text: "Your data and queries are not used to train models. Your information stays yours.", caption: "Your data stays private" },
    { title: "Permissions that follow", text: "Row and column permissions follow the person, from the underlying records to the answer.", caption: "Access enforced at query time" },
    { title: "Governed definitions", text: "Shared metric definitions and central policy keep dashboards and AI working from the same meaning.", caption: "One definition across surfaces" },
    { title: "Residency you control", text: "Choose the deployment boundary. Align storage, processing and inference with your residency requirements.", caption: "Cloud · On premises · Hybrid" },
  ],
} as const;

export const AKASHIC_OPEN_PRINCIPLES = [
  { eyebrow: "Principle 01", title: "Modular by design", desc: "Start with the modules you need. Expand on the same foundation as your priorities grow.", detail: "Adopt at your pace" },
  { eyebrow: "Principle 02", title: "Open to inspect", desc: "Read the tables, transforms and metric definitions with tools your team already uses.", detail: "See how the answer was made" },
  { eyebrow: "Principle 03", title: "Yours to extend", desc: "Use open interfaces to connect existing systems and build for your organisation.", detail: "Keep your engineering freedom" },
  { eyebrow: "Principle 04", title: "Yours to keep", desc: "Keep your data and your work in open formats. Carry both forward as your needs change.", detail: "Stay by choice" },
] as const;

/* [05] Akashic Agents (added 14 Oct 2026 from the founder's wireframe,
   DHIRA_ai_Website_v2.html #agents). His six-step run and his eight named
   agents, re-drawn as ONE run where position is role: each agent hangs
   under the step it works in, the Approve column holds no agent at all,
   and the two agents that keep the foundation healthy run beneath every
   step. The empty column is the argument ("people make the call"),
   visible without interaction. Sits after [04] Architecture, whose coda
   ("Agents, in preview. The groundwork they need, already live.") hands
   off to it, and before [06] Trust (user, 14 Oct 2026: [01] Ask into [02]
   the modules is the better opening sequence).
   Claims rules applied to his copy:
   - Agents show as PREVIEW, as everywhere else on the site. His copy has
     13 agents shipping in 1.0; held until he confirms. Flip `preview`.
   - No agent count is printed. He names eight; "13 agents and functions"
     is held.
   - His "Act: the workflow executes" becomes "Record". No agent writes
     back into a source system (no reverse ETL today); a person decides.
   - The steward and pipeline lines match the teardown's existing preview
     claims ("suggest matches; stewards approve", "help build and monitor
     pipelines"), not his "auto-recovers jobs".
   - His ALMA adapter is described, not named: the site's seven module
     names stay the only product names. */
export type AgentStepKind = "agent" | "person" | "record";

export type AkashicAgent = { code: string; name: string; line: string };

export const AKASHIC_AGENTS: {
  preview: boolean;
  label: string;
  setup: string;
  title: string;
  intro: string;
  lanes: Record<AgentStepKind, string>;
  steps: { kind: AgentStepKind; name: string; detail: string; agents?: AkashicAgent[]; note?: string }[];
  foundation: { label: string; agents: AkashicAgent[] };
  legend: Record<AgentStepKind, string>;
  coda: string;
} = {
  preview: true,
  label: "Akashic Agents",
  setup: "Agents do the legwork.",
  title: "People make the call.",
  intro: "Agents read the documents, pull the figures and check the rules. Your teams review the evidence instead of assembling it. Nothing consequential moves without a person’s approval.",
  lanes: { agent: "Agents do the legwork", person: "A person decides", record: "Kept on record" },
  steps: [
    { kind: "agent", name: "Ask", detail: "Question · alert · schedule", agents: [{ code: "BI", name: "BI concierge", line: "Finds or builds the right view" }] },
    { kind: "agent", name: "Plan", detail: "Steps planned, work routed", agents: [{ code: "A1", name: "Orchestrator", line: "Plans work across agents" }] },
    {
      kind: "agent",
      name: "Retrieve",
      detail: "Tables · documents · metadata",
      agents: [
        { code: "SQL", name: "SQL agent", line: "Answers from the governed warehouse" },
        { code: "DOC", name: "Document agent", line: "Reads PDFs, cites the page" },
        { code: "HY", name: "Hybrid agent", line: "Joins tables and documents" },
      ],
    },
    { kind: "agent", name: "Verify", detail: "Citations · lineage · rules", agents: [{ code: "MD", name: "Metadata agent", line: "Explains definitions and lineage" }] },
    { kind: "person", name: "Approve", detail: "Maker-checker sign-off", note: "No agent signs off." },
    { kind: "record", name: "Record", detail: "Append-only audit trail", note: "Model and prompt version on every step" },
  ],
  foundation: {
    label: "Under every run",
    agents: [
      { code: "GR", name: "Golden-record steward", line: "Suggests matches, stewards approve" },
      { code: "PR", name: "Pipeline monitor", line: "Watches runs, diagnoses failures" },
    ],
  },
  legend: { agent: "Agent, in preview", person: "A person", record: "Live controls" },
  coda: "Model-neutral by design. Each task runs on a named model, including models hosted inside your boundary.",
};

/* The founder's platform figures (DHIRA_ai_Website_v2.html), real per
   Rule 4, live in [10]'s module sheets beside the claim each one proves:
   Pipelines 25 built-in transforms, BI 61 data sources and 50+ chart types,
   Governance 80+ metadata connectors. A hero strip of them was removed
   (user, 14 Oct 2026): numbers stay out of the hero. Not used: his "10
   modules" and "13 agents" (held) and "13 source connectors" ([10] names
   14 source connectors, so the two would disagree). */

/* [12] Questions (14 Oct 2026). The founder's FAQ ("Questions leaders ask
   us"), re-cut for this page: his EI and IPMS product questions become one
   question on how solutions relate to Akashic; his "built so quickly /
   four weeks" question is dropped (the weeks claim is held); two questions
   leaders ask of any platform are added. Every answer restates a claim the
   page already makes; none introduces a new one. If agents go GA, rewrite
   the agents answer with AKASHIC_AGENTS.preview. Rendered as an open list
   (no accordion: answers stay visible) plus FAQPage JSON-LD. */
export const AKASHIC_FAQ = {
  label: "Questions",
  setup: "Questions leaders ask.",
  title: "Answered plainly.",
  items: [
    {
      q: "What is Akashic?",
      a: "The governed data and AI platform. Seven modules cover pipelines, master data, warehouse, machine learning, AI answers, BI and governance on one foundation. Akashic 1.0 is generally available on 1 November 2026.",
    },
    {
      q: "Do we have to replace the systems we run today?",
      a: "No. Akashic reads from your ERP, CRM, HR systems, databases and documents and leaves them in place. Start with one module and add the next on the same foundation.",
    },
    {
      q: "Which AI models does Akashic use?",
      a: "The ones you choose. Each task runs on a named model, from a commercial provider or an open model hosted inside your boundary. Your data and queries are never used to train them.",
    },
    {
      q: "Are AI agents available today?",
      a: "Agents are in preview. Each one works on governed data, cites its sources and stops for a person’s approval before anything consequential moves. The access control, lineage and audit around them are live today.",
    },
    {
      q: "How is Akashic deployed?",
      a: "In the cloud, on-premises or hybrid. On-premises installs run on Docker and Kubernetes in your data centre. The modules, governance and answers are the same in all three.",
    },
    {
      q: "How do Enterprise Intelligence and IPMS relate to Akashic?",
      a: "They are Akashic, configured around one process. Each solution switches on the modules its process needs, so the next one starts on data, definitions and governance already in place.",
    },
  ],
} as const;

/* [08] Why Akashic. One drawing carries the whole argument (30 Sep 2026):
   the same four use cases, built project by project (groundwork rebuilt in
   every column) and on Akashic (groundwork laid once as a band, each use
   case only adds its own work). The fourth use case is AI agents, drawn
   dashed because agents are in preview; the band under them is solid
   because the groundwork is live. Replaced a lifecycle strip, a five-row
   table and four executive cards that made the same reuse point three
   times (~500 words, 2,341px). The executive seats are now four pinned
   callouts, one line each. No savings figure: the reader is told what to
   measure instead (Design Rule 4). */
export const AKASHIC_ADVANTAGE = {
  setup: "Lay the groundwork once.",
  title: "Build every use case on top.",
  intro: "Connections, records and definitions carry forward. Each new dashboard, model or AI use case starts where the last one finished.",
  useCases: [
    { name: "Dashboards", preview: false },
    { name: "Forecasts", preview: false },
    { name: "AI answers", preview: false },
    { name: "AI agents", preview: true },
  ],
  /* Top to bottom, as drawn: the groundwork builds up from Connect. */
  layers: ["Define", "Unify", "Connect"],
  rows: {
    project: { name: "Project by project", note: "Groundwork rebuilt every time" },
    akashic: { name: "With Akashic", note: "Groundwork laid once, reused" },
  },
  bandNote: "Reused by the next use case",
  governance: "Governance throughout",
  controls: "Permissions · Lineage · Audit",
  legend: {
    work: "New work",
    rebuilt: "Groundwork, rebuilt",
    shared: "Groundwork, laid once",
    preview: "In preview",
  },
  /* `pin` names the part of the drawing each seat's line is about. */
  seats: [
    { role: "CFO", pin: "rebuilt", line: "Pay for the groundwork once, not per project." },
    { role: "CIO / CTO", pin: "band", line: "Keep your systems. One partner delivers the platform." },
    { role: "CDO / AI lead", pin: "define", line: "Models, AI answers and agents read one set of definitions." },
    { role: "CEO / COO", pin: "work", line: "One figure in every meeting, traced to its source." },
  ],
  measure: "Measure the difference on your own work: cost per use case, time to the next.",
  cta: "Map your first use case",
} as const;

export type SeatPin = (typeof AKASHIC_ADVANTAGE.seats)[number]["pin"];


export const AKASHIC_STORY = {
  architecture: {
    setup: "Seven modules.",
    title: "One foundation.",
    intro: "Data, context and AI on one foundation. Governance carries through every layer.",
    sources: ["Business systems", "Databases", "Documents", "Event streams"],
    layers: [
      { number: "01", name: "Data", verb: "Bring the records together.", desc: "Ingest, resolve and model the data your organisation runs on." },
      { number: "02", name: "Knowledge", verb: "Give every record context.", desc: "Connect entities, definitions and history in a governed knowledge layer." },
      { number: "03", name: "Intelligence", verb: "Put AI to work.", desc: "Models, AI answers and dashboards draw from the same foundation." },
    ],
    context: ["Entities", "Relationships", "Definitions", "History"],
    governance: "Governance runs through every layer.",
    controls: "Access control · Lineage · Audit · Residency",
    /* The page's one explicit agent line: agents ship in preview, the
       groundwork they depend on is live. Keyed by the dashed Preview tags
       on the Pipelines and Master Data entries above it. */
    coda: "Agents, in preview. The groundwork they need, already live.",
  },
  reference: {
    setup: "Look beneath the promise.",
    title: "Inspect the capabilities.",
    intro: "An open reference for your technical team. Explore each module, its connections and its controls.",
    note: "Discuss connector compatibility, model hosting and deployment requirements with our team.",
  },
  close: {
    label: "Your next decision",
    setup: "See what your data",
    title: "can decide.",
    intro: "A decision held up by disconnected data. A report nobody agrees on. An AI use case waiting for context. Start there.",
    agenda: [
      { label: "The decision", text: "What does your team need to know?" },
      { label: "The data", text: "Where does the evidence live?" },
      { label: "The first step", text: "Where should we begin?" },
    ],
    primary: "Talk through your use case",
    secondary: "Explore delivery",
    footer: "Akashic, the platform. DHIRA, your delivery partner.",
  },
} as const;


export const AKASHIC_SECTIONS: PageSection[] = [
  { id: "hero", label: "Introduction" },
  { id: "akashic-in-action", label: "Ask Akashic", eyebrow: "[01]" },
  { id: "how-it-works", label: "How it works", eyebrow: "[02]" },
  { id: "architecture", label: "Where it runs", eyebrow: "[03]" },
  { id: "modules", label: "The architecture", eyebrow: "[04]" },
  { id: "agents", label: "Akashic Agents", eyebrow: "[05]" },
  { id: "trust", label: "Enterprise trust", eyebrow: "[06]" },
  { id: "open", label: "Open architecture", eyebrow: "[07]" },
  { id: "build-vs-buy", label: "The Akashic advantage", eyebrow: "[08]" },
  { id: "scale", label: "Proven at scale", eyebrow: "[09]" },
  { id: "stack", label: "Capabilities & connections", eyebrow: "[10]" },
  { id: "solutions", label: "Built on Akashic", eyebrow: "[11]" },
  { id: "faq", label: "Questions", eyebrow: "[12]" },
  { id: "talk-to-our-team", label: "Ready when you are", eyebrow: "[13]" },
];

export const sourceGroups = [
  {
    heading: "Business systems",
    items: [
      { name: "CRM", dot: "#00A1E0" },
      { name: "ERP", dot: "#1F2A44" },
    ],
  },
  {
    heading: "Databases",
    items: [
      { name: "SQL", dot: "#3E63DD" },
      { name: "NoSQL", dot: "#7C5CFC" },
    ],
  },
  {
    heading: "Files",
    items: [
      { name: "PDFs", dot: "#E8491D" },
      { name: "Spreadsheets", dot: "#30A46C" },
    ],
  },
  {
    heading: "Streaming & IoT",
    items: [
      { name: "Events", dot: "#D97706" },
      { name: "Sensors", dot: "#0891B2" },
    ],
  },
];

/* High-level summaries of [08]'s datasheet — terse noun phrases only
   (user direction, Jul 2026: full sentences read wordy here), and no
   vendor or technology names ([08] is the only place technology is
   named). */
export const dataLayerModules = [
  {
    id: "modules-data-pipelines",
    icon: "Akashic Data Pipelines",
    name: "Akashic Pipelines",
    sub: "Ingest and validate every source",
    caps: ["Ready-made connectors", "Streaming · batch · CDC", "PDF, email & OCR intake", "Schema validation"],
    agent: "Pipeline agents",
  },
  {
    id: "modules-master-data",
    icon: "Akashic Master Data",
    name: "Akashic Master Data",
    sub: "Resolve every entity to one golden record",
    caps: ["Exact + fuzzy matching", "Survivorship rules", "Steward review queue", "Hierarchy management"],
    agent: "Matching agents",
  },
  {
    id: "modules-data-warehousing",
    icon: "Akashic Data Warehouse",
    name: "Akashic Warehouse",
    sub: "Model data and define metrics once",
    caps: ["Dimensional models", "Governed metric layer", "Your warehouse or ours", "Sub-second queries"],
  },
];

export const intelligenceLayerModules = [
  {
    id: "modules-machine-learning",
    icon: "Akashic Machine Learning",
    name: "Akashic ML",
    sub: "Train, deploy and monitor models",
    caps: ["Notebooks & experiments", "Feature store", "Staged deployment", "Drift & bias monitoring"],
  },
  {
    id: "modules-ask-ai",
    icon: "Akashic Insights",
    name: "Ask Akashic",
    sub: "Answer questions in plain language",
    caps: ["Text to SQL · cited", "Bring your own model", "PII masking", "Prompt audit log"],
  },
  {
    id: "modules-business-intelligence",
    icon: "Akashic BI",
    name: "Akashic BI",
    sub: "Serve metrics to every surface",
    caps: ["AI-built charts", "Dashboards & alerts", "Row-level security", "Embedded analytics"],
  },
];

export const knowledgeCaps = [
  "Entities, hierarchies & relationships",
  "Category · history · policy",
  "Context under every answer",
];

export const govTiles = [
  { label: "Access control", detail: "row + column · query time" },
  { label: "Lineage", detail: "column-level, across sources" },
  { label: "Audit trail", detail: "append-only, every action" },
  { label: "Data residency", detail: "in-region, zero egress" },
];


interface ComparisonRow {
  label: string;
  build: string;
  akashic: string;
  akashicHighlight?: boolean;
}

interface ComparisonGroup {
  name: string;
  rows: ComparisonRow[];
}

export const AKASHIC_COMPARISON: ComparisonGroup[] = [
  {
    name: "Speed and complexity",
    rows: [
      {
        label: "Time to production-ready system",
        build: "Quarters",
        akashic: "Weeks, typically",
        akashicHighlight: true,
      },
      {
        label: "Engineers held on the platform",
        build: "A standing team",
        akashic: "One solutions architect",
        akashicHighlight: true,
      },
      {
        label: "Integration setup effort",
        build: "Custom APIs, per source",
        akashic: "Pre-built connectors, day one",
        akashicHighlight: true,
      },
      {
        label: "Deployment complexity",
        build: "Seven systems, wired by hand",
        akashic: "One deployment, cloud or on-premises",
        akashicHighlight: true,
      },
    ],
  },
  {
    name: "Who carries it",
    rows: [
      {
        label: "Unified knowledge layer",
        build: "Design it, then maintain it",
        akashic: "Included, maintained",
        akashicHighlight: true,
      },
      {
        label: "Column-level lineage",
        build: "Instrument every transform yourself",
        akashic: "Automatic, every layer",
        akashicHighlight: true,
      },
      {
        label: "Real-time streaming and change capture",
        build: "Per-source, per-schema, ongoing",
        akashic: "Configured once",
        akashicHighlight: true,
      },
      {
        label: "Grounded answers, with citations",
        build: "Build the grounding layer first",
        akashic: "Included",
        akashicHighlight: true,
      },
      {
        label: "Append-only audit log",
        build: "Yours to build and prove",
        akashic: "Append-only, always on",
        akashicHighlight: true,
      },
    ],
  },
  {
    name: "Cost and governance",
    rows: [
      {
        label: "Upfront licensing cost",
        build: "$0 (open-source base)",
        akashic: "Predictable subscription",
      },
      {
        label: "Annual maintenance overhead",
        build: "Yours to carry",
        akashic: "Included in your licence",
        akashicHighlight: true,
      },
      {
        label: "Built-in compliance and security",
        build: "Yours to certify",
        akashic: "Certified",
        akashicHighlight: true,
      },
      {
        label: "Open standards, no lock-in",
        build: "Achievable, by discipline",
        akashic: "Structural",
        akashicHighlight: true,
      },
    ],
  },
];


export type Conn = { mono: string; name: string; color: string };
export type Cap = { icon: string; term: string; sub?: string };
export type Group =
  | { label: string; kind: "conn"; items: Conn[] }
  | { label: string; kind: "cap"; items: Cap[]; preview?: boolean }
  | { label: string; kind: "charts" }
  | { label: string; kind: "badges"; items: string[] };


type ModuleDef = {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  desc: string;
  groups: Group[];
};

export const AKASHIC_MODULES: ModuleDef[] = [
  {
    id: "pipelines",
    icon: "Akashic Data Pipelines",
    name: "Akashic Pipelines",
    tagline: "Ingestion",
    desc: "Every source, ingested and validated the moment it arrives. Structured, unstructured, or streaming: one entry point into the platform, or a standalone ingestion layer.",
    groups: [
      {
        label: "Source connectors",
        kind: "conn",
        items: [
          { mono: "SF", name: "Salesforce", color: "#2E9BD6" },
          { mono: "SAP", name: "SAP", color: "#1170B5" },
          { mono: "NS", name: "NetSuite", color: "#1F2A44" },
          { mono: "HS", name: "HubSpot", color: "#EA5A2E" },
          { mono: "WD", name: "Workday", color: "#0875E1" },
          { mono: "ZD", name: "Zendesk", color: "#03363D" },
          { mono: "PG", name: "Postgres", color: "#336791" },
          { mono: "My", name: "MySQL", color: "#00758F" },
          { mono: "Mo", name: "MongoDB", color: "#00894F" },
          { mono: "❄", name: "Snowflake", color: "#1D9BD1" },
          { mono: "Ka", name: "Kafka", color: "#231F20" },
          { mono: "S3", name: "Amazon S3", color: "#C9412C" },
          { mono: "GS", name: "Sheets", color: "#0F9D58" },
          { mono: "{}", name: "REST / Webhook", color: "#3E63DD" },
        ],
      },
      {
        label: "Unstructured ingestion",
        kind: "cap",
        items: [
          { icon: "file-lines", term: "PDF extraction", sub: "layout-aware parsing" },
          { icon: "doc", term: "Office documents", sub: "DOCX · XLSX" },
          { icon: "mail", term: "Email ingestion", sub: ".eml · attachments" },
          { icon: "image", term: "OCR", sub: "scanned documents" },
        ],
      },
      {
        label: "Ingestion modes",
        kind: "cap",
        items: [
          { icon: "bolt", term: "Streaming", sub: "real-time" },
          { icon: "layers", term: "Batch", sub: "scheduled" },
          { icon: "refresh", term: "Change data capture", sub: "CDC" },
        ],
      },
      {
        label: "Validation & preparation",
        kind: "cap",
        items: [
          { icon: "code", term: "25 built-in transforms", sub: "prepare without code" },
          { icon: "funnel", term: "Schema validation", sub: "on arrival" },
          { icon: "clipboard", term: "Data contracts", sub: "versioned" },
          { icon: "alert", term: "Error quarantine", sub: "retry & backfill" },
        ],
      },
      {
        label: "AI agents",
        kind: "cap",
        preview: true,
        items: [
          { icon: "bolt", term: "Pipeline agents", sub: "help build and monitor pipelines" },
        ],
      },
    ],
  },
  {
    id: "master-data",
    icon: "Akashic Master Data",
    name: "Akashic Master Data",
    tagline: "Entity resolution",
    desc: "Every version of an entity resolves into one golden record, with the lineage of everything merged kept intact. Those records and the links between them are what the governed knowledge layer is built from.",
    groups: [
      {
        label: "Matching",
        kind: "cap",
        items: [
          { icon: "key", term: "Deterministic match keys", sub: "exact-key rules" },
          { icon: "sparkle", term: "Fuzzy matching", sub: "probabilistic scoring" },
          { icon: "filter", term: "Configurable match rules", sub: "per entity type" },
          { icon: "gauge", term: "Auto-merge thresholds", sub: "confidence-based" },
        ],
      },
      {
        label: "Golden record",
        kind: "cap",
        items: [
          { icon: "shield", term: "Survivorship rules", sub: "field-level precedence" },
          { icon: "queue", term: "Source precedence", sub: "per attribute" },
          { icon: "chart", term: "Confidence scoring", sub: "per merge" },
          { icon: "lineage", term: "Merge lineage", sub: "superseded records kept" },
        ],
      },
      {
        label: "Stewardship",
        kind: "cap",
        items: [
          { icon: "users", term: "Review queue", sub: "steward approvals" },
          { icon: "hierarchy", term: "Hierarchy management", sub: "parent-child rollups" },
          { icon: "refresh", term: "Standardisation", sub: "cleansing rules" },
          { icon: "merge", term: "Deduplication", sub: "cross-source" },
        ],
      },
      {
        /* The knowledge layer named where it is actually built ([04]'s
           Layer 02 is the same thing). Without this the phrase only
           appeared under Ask Akashic, and the home page's "governed
           knowledge layer" promise had nowhere to land. Never "graph" —
           see the terminology note in AkashicModules. */
        label: "Knowledge layer",
        kind: "cap",
        items: [
          { icon: "link", term: "Entity relationships", sub: "typed & versioned" },
          { icon: "tag", term: "Classification", sub: "taxonomies · policy tags" },
          { icon: "history", term: "Change history", sub: "point-in-time queries" },
        ],
      },
      {
        label: "AI agents",
        kind: "cap",
        preview: true,
        items: [
          { icon: "merge", term: "Matching agents", sub: "suggest matches for steward approval" },
        ],
      },
    ],
  },
  {
    id: "warehouse",
    icon: "Akashic Data Warehouse",
    name: "Akashic Warehouse",
    tagline: "Modelled storage",
    desc: "Mastered records become models built for fast, reliable queries. Bring your own warehouse or run Akashic-managed storage.",
    groups: [
      {
        label: "Warehouse connectors",
        kind: "conn",
        items: [
          { mono: "❄", name: "Snowflake", color: "#1D9BD1" },
          { mono: "BQ", name: "BigQuery", color: "#3B78E7" },
          { mono: "DB", name: "Databricks", color: "#E8432A" },
          { mono: "RS", name: "Redshift", color: "#205B99" },
          { mono: "Sy", name: "Synapse", color: "#0F6CBD" },
          { mono: "PG", name: "Postgres", color: "#336791" },
        ],
      },
      {
        label: "Modelling",
        kind: "cap",
        items: [
          { icon: "layers", term: "Medallion layering", sub: "bronze · silver · gold" },
          { icon: "grid", term: "Dimensional models", sub: "facts · dimensions" },
          { icon: "code", term: "dbt transforms", sub: "version-controlled" },
          { icon: "chart-bar", term: "Semantic metric layer", sub: "defined once" },
        ],
      },
      {
        label: "Storage & serving",
        kind: "cap",
        items: [
          { icon: "lock", term: "ACID transactions" },
          { icon: "archive", term: "Open table formats", sub: "Iceberg · Delta" },
          { icon: "bolt", term: "Sub-second queries" },
          { icon: "history", term: "Versioned schemas", sub: "change-tracked" },
        ],
      },
    ],
  },
  {
    id: "ml",
    icon: "Akashic Machine Learning",
    name: "Akashic ML",
    tagline: "Prediction",
    desc: "Build, train, deploy, and monitor models directly on governed data. No exports, no separate environment.",
    groups: [
      {
        label: "Development",
        kind: "cap",
        items: [
          { icon: "notebook", term: "JupyterHub notebooks", sub: "Python" },
          { icon: "flask", term: "Experiment tracking", sub: "MLflow" },
          { icon: "grid", term: "Feature store", sub: "online + offline" },
          { icon: "chip", term: "GPU compute", sub: "on demand" },
        ],
      },
      {
        label: "Deployment",
        kind: "cap",
        items: [
          { icon: "archive", term: "Model registry", sub: "dev · staging · prod" },
          { icon: "rocket", term: "CI/CD promotion", sub: "staged rollout" },
          { icon: "link", term: "Serving endpoints", sub: "batch + real-time" },
        ],
      },
      {
        label: "Monitoring",
        kind: "cap",
        items: [
          { icon: "gauge", term: "Drift detection", sub: "PSI" },
          { icon: "alert", term: "Bias monitoring", sub: "per segment" },
          { icon: "history", term: "Feature freshness", sub: "SLA-tracked" },
          { icon: "refresh", term: "Scheduled retraining" },
        ],
      },
    ],
  },
  {
    id: "ask",
    icon: "Akashic Insights",
    name: "Ask Akashic",
    tagline: "Conversational AI",
    desc: "Plain-language questions become governed SQL, answered from the metric layer and the knowledge layer, with lineage attached to every answer.",
    groups: [
      {
        label: "Model providers · bring your own key",
        kind: "conn",
        items: [
          { mono: "A", name: "Anthropic Claude", color: "#C9633B" },
          { mono: "O", name: "OpenAI", color: "#0A8A6F" },
          { mono: "Az", name: "Azure OpenAI", color: "#0089D6" },
          { mono: "Ll", name: "Llama / Mistral", color: "#3E63DD" },
          { mono: "ak", name: "Akashic-hosted", color: "#1A1C1D" },
        ],
      },
      {
        label: "Grounding",
        kind: "cap",
        items: [
          { icon: "code", term: "Text to SQL", sub: "on the governed metric layer" },
          { icon: "database", term: "Metric-layer grounding", sub: "governed definitions" },
          { icon: "lineage", term: "Knowledge-layer reasoning", sub: "entity relationships" },
          { icon: "file-lines", term: "Source citations", sub: "on every answer" },
          { icon: "funnel", term: "Scoped contexts", sub: "per domain" },
        ],
      },
      {
        label: "Controls",
        kind: "cap",
        items: [
          { icon: "shield", term: "Row-level enforcement", sub: "at answer time" },
          { icon: "mask", term: "PII masking", sub: "before inference" },
          { icon: "history", term: "Prompt audit log", sub: "append-only" },
          { icon: "globe", term: "In-region inference", sub: "no training on your data" },
        ],
      },
    ],
  },
  {
    id: "bi",
    icon: "Akashic BI",
    name: "Akashic BI",
    tagline: "Decision surface",
    desc: "Dashboards and metrics defined once, consistent on every surface they appear.",
    groups: [
      { label: "50+ chart types", kind: "charts" },
      {
        label: "Analytics",
        kind: "cap",
        items: [
          { icon: "database", term: "61 data sources", sub: "connected natively" },
          { icon: "sparkle", term: "AI chart builder", sub: "describe the chart in plain language" },
          { icon: "chart-bar", term: "Semantic metric layer", sub: "defined once" },
          { icon: "code", term: "SQL Lab", sub: "ad-hoc queries" },
          { icon: "filter", term: "Cross-filtering", sub: "dashboard-wide" },
          { icon: "funnel", term: "Drill-down", sub: "to row level" },
        ],
      },
      {
        label: "Delivery & control",
        kind: "cap",
        items: [
          { icon: "bell", term: "Alerts & thresholds", sub: "metric-based" },
          { icon: "mail", term: "Scheduled reports", sub: "email delivery" },
          { icon: "shield", term: "Row-level security", sub: "per viewer" },
          { icon: "link", term: "Embedded analytics", sub: "iframe · SDK" },
        ],
      },
    ],
  },
  {
    id: "governance",
    icon: "Akashic Data Governance",
    name: "Akashic Governance",
    tagline: "Always on",
    desc: "Access control, lineage, and audit under every module, from the first byte to the final answer.",
    groups: [
      {
        label: "Catalogue & lineage",
        kind: "cap",
        items: [
          { icon: "database", term: "Asset catalogue", sub: "80+ metadata connectors" },
          { icon: "lineage", term: "Column-level lineage", sub: "cross-source" },
          { icon: "chart", term: "Data profiling", sub: "per column" },
          { icon: "tag", term: "Business glossary", sub: "terms · synonyms" },
        ],
      },
      {
        label: "Data quality",
        kind: "cap",
        items: [
          { icon: "history", term: "Freshness tests", sub: "SLA-tracked" },
          { icon: "funnel", term: "Null & uniqueness tests", sub: "per column" },
          { icon: "alert", term: "Schema-drift detection" },
          { icon: "gauge", term: "Volume monitoring", sub: "row-count baselines" },
        ],
      },
      {
        label: "Access & audit",
        kind: "cap",
        items: [
          { icon: "users", term: "Role-based access", sub: "row + column level" },
          { icon: "key", term: "SSO / SCIM", sub: "identity sync" },
          { icon: "queue", term: "Audit log", sub: "append-only" },
          { icon: "mask", term: "PII classification", sub: "auto-tagged · masked" },
        ],
      },
      {
        label: "Residency & keys",
        kind: "cap",
        items: [
          { icon: "pin", term: "In-region deployment", sub: "cloud · on-prem · hybrid" },
          { icon: "globe", term: "Zero data egress", sub: "policy-enforced" },
          { icon: "lock", term: "AES-256 encryption", sub: "at rest · in transit" },
          { icon: "shield", term: "Customer-held keys", sub: "no DHIRA key custody" },
        ],
      },
      { label: "Compliance", kind: "badges", items: ["DPDP Act", "ISO 27001", "SOC 2 Type II", "GDPR", "CERT-In"] },
    ],
  },
];
