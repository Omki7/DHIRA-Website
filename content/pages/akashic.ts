/* ------------------------------------------------------------------ */
/*  Akashic page                                                       */
/* ------------------------------------------------------------------ */
/* Every word on /akashic, in section order. Composer: app/akashic/page.tsx.
   Shared with other documents: `akashicSolutions` (the /solutions hub),
   `dataLayerModules` and `intelligenceLayerModules` (/akashic/1-0).

   Claims rules for this page: agents ship in PREVIEW; no module count other
   than seven; no "weeks" delivery claims; every figure real (Rule 4). */

import type { ProvenAtScaleBlock } from "../blocks";
import type { Cta, Faq, PageSection, Seo, TwoTone } from "../types";

/* ---------------- Shared building blocks ---------------- */

/** A [NN] story label and its two-tone heading (sections/akashic/AkashicStory). */
export interface StoryHeading {
  number: string;
  label: string;
  setup: string;
  title: string;
  intro?: string;
}

/* [11] Built on Akashic (rebuilt 14 Oct 2026). The section owns ONE claim,
   distinct from [08]'s "lay the groundwork once": the solutions are not
   separate products but Akashic, configured. Its evidence is the module
   matrix: the same seven modules under every solution.
   Every solution uses all seven modules (user correction, 21 Oct 2026).
   Keep one shared list so the homepage and platform matrix agree.
   Enterprise Intelligence IS /solutions/eis (user, 14 Oct 2026). */
export const solutionModules = ["Data Pipelines", "Master Data", "Data Warehouse", "Machine Learning", "Ask Akashic", "Business Intelligence", "Governance"];

export type AkashicModuleName = string;

export interface AkashicSolution {
  id: "ei" | "ipms" | "life";
  name: string;
  category: string;
  audience: string;
  headline: string;
  /** Read by the /solutions hub; [11] carries the headline only. */
  description: string;
  stages: { title: string; detail: string }[];
  note: string;
  modules: AkashicModuleName[];
  href: string;
  cta: string;
}

export interface AkashicSolutions {
  setup: string;
  title: string;
  intro: string;
  items: AkashicSolution[];
  all: Cta;
}

export const akashicSolutions: AkashicSolutions = {
  setup: "Each solution is ready-made for one process",
  title: "and runs on the foundation you already have.",
  intro: "Enterprise Intelligence, Intelligent Procurement Management System and Akashic Life each use all seven Akashic modules, with shared data, intelligence and governance.",
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
      modules: solutionModules,
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
      modules: solutionModules,
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
      modules: solutionModules,
      href: "/solutions/life",
      cta: "Explore Akashic Life",
    },
  ],
  all: { label: "All solutions", href: "/solutions" },
};

export interface AkashicSecurity {
  setup: string;
  title: string;
  intro: string;
  badges: string[];
  cards: { title: string; text: string; caption: string }[];
}

const akashicSecurity: AkashicSecurity = {
  setup: "Put AI to work",
  title: "without losing control of your data.",
  intro: "Use your data with confidence. Akashic applies permissions, policy and privacy controls from ingestion to the final answer.",
  badges: ["Role-based access", "Private deployment", "Auditable answers"],
  cards: [
    { title: "No AI training", text: "Your data and queries are not used to train models. Your information stays yours.", caption: "Your data stays private" },
    { title: "Permissions that follow", text: "Row and column permissions follow the person, from the underlying records to the answer.", caption: "Access enforced at query time" },
    { title: "Governed definitions", text: "Shared metric definitions and central policy keep dashboards and AI working from the same meaning.", caption: "One definition across surfaces" },
    { title: "Residency you control", text: "Choose the deployment boundary. Align storage, processing and inference with your residency requirements.", caption: "Cloud · On premises · Hybrid" },
  ],
};

/* [05] Akashic Agents (added 14 Oct 2026 from the founder's wireframe).
   His six-step run and his eight named agents, re-drawn as ONE run where
   position is role: each agent hangs under the step it works in, the
   Approve column holds no agent at all, and the two agents that keep the
   foundation healthy run beneath every step.
   Claims rules applied to his copy:
   - Agents show as PREVIEW, as everywhere else on the site. His copy has
     13 agents shipping in 1.0; held until he confirms. Flip `preview`.
   - No agent count is printed.
   - His "Act: the workflow executes" becomes "Record": no agent writes
     back into a source system; a person decides.
   - His ALMA adapter is described, not named: the seven module names stay
     the only product names. */
export type AgentStepKind = "agent" | "person" | "record";

export interface AkashicAgent {
  code: string;
  name: string;
  line: string;
}

export interface AkashicAgents extends StoryHeading {
  preview: boolean;
  intro: string;
  /** Accessible description of the run drawing; "Agents are in preview." follows when `preview`. */
  figureCaption: string;
  previewNote: string;
  lanes: Record<AgentStepKind, string>;
  steps: { kind: AgentStepKind; name: string; detail: string; agents?: AkashicAgent[]; note?: string }[];
  foundation: { label: string; agents: AkashicAgent[] };
  legend: Record<AgentStepKind, string>;
  coda: string;
}

/* `pin` names the part of the [08] drawing a seat's line is about. */
export type SeatPin = "rebuilt" | "band" | "define" | "work";

export interface AkashicAdvantage extends StoryHeading {
  intro: string;
  figureCaption: string;
  cornerLabel: string;
  useCases: { name: string; preview: boolean }[];
  /** Top to bottom, as drawn: the groundwork builds up from Connect. */
  layers: string[];
  rows: { project: { name: string; note: string }; akashic: { name: string; note: string } };
  bandNote: string;
  governance: string;
  controls: string;
  legend: { work: string; rebuilt: string; shared: string; preview: string };
  seats: { role: string; pin: SeatPin; line: string }[];
  measure: string;
}

/** The outcome-card stage (demos/mockups/AkashicOutcomeCardsMockup), shown
    in homepage [02] since 23 Oct 2026. Lives here with the cards' figures. */
export interface OutcomeShowcase {
  /** Accessible name of the stage. */
  label: string;
  link: Cta;
  /** In platform order. `adds` labels the context tentacle; `caption` is
      the one legible line under the stage. */
  modules: { module: string; adds: string; caption: string }[];
}

/* ---------------- The page document ---------------- */

export interface AkashicPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  quote: {
    /** Spoken word by word as the reader scrolls. */
    text: string;
    /** The line breaks after this word from md up. */
    breakAfter: string;
    name: string;
    role: string;
  };
  hero: {
    badge: { product: string; claim: string };
    kicker: string[];
    title: { lead: string; tail: string; phrases: string[] };
    lede: string;
    primary: Cta;
    secondary: Cta;
  };
  inAction: {
    eyebrow: { number: string; label: string };
    title: TwoTone;
    lede: string;
    examplesLabel: string;
    statusLabels: string[];
    chrome: { ask: string; answer: string; for: string; time: string; systems: string; documents: string; targetLine: string };
    worlds: AskWorld[];
  };
  howItWorks: {
    eyebrow: { number: string; label: string };
    title: TwoTone;
    lede: string;
    /** One chapter per module, in walkthrough order. `icon` picks the point's glyph. */
    modules: { kicker: string; name: string; lede: string; points: { icon: string; text: string; preview?: boolean }[] }[];
    /** The question typed on the Ask plate. */
    askQuestion: string;
    /** Captions for the three "start anywhere" drawer combinations, in order. */
    combos: string[];
    close: { kicker: [string, string]; title: string; body: string; tagline: string };
    frameLabel: string;
    hud: { module: string; sealed: string; modular: string; depth: string; goTo: string };
  };
  deployment: {
    eyebrow: { number: string; label: string };
    title: string;
    intro: string;
    cloud: { name: string; desc: string; chip: string; footer: string; providers: string[] };
    onPrem: { name: string; desc: string; chip: string; footer: string; rack: string; chips: string[] };
    hybrid: { name: string; desc: string; chip: string; footer: string; racks: string; cloud: string; you: string; us: string };
    summary: TwoTone;
  };
  architecture: StoryHeading & {
    intro: string;
    sourcesLabel: string;
    sources: string[];
    layers: { number: string; name: string; verb: string; desc: string }[];
    context: string[];
    explore: string;
    governanceLabel: string;
    governance: string;
    controls: string;
    exploreGovernance: string;
    coda: string;
    /** The module cards in the data and intelligence rows. */
    modules: { data: LayerModule[]; intelligence: LayerModule[] };
  };
  agents: AkashicAgents;
  trust: StoryHeading & AkashicSecurity;
  open: StoryHeading & {
    principles: { title: string; desc: string; detail: string }[];
    productName: string;
    close: string;
  };
  advantage: AkashicAdvantage;
  scale: ProvenAtScaleBlock;
  reference: StoryHeading & { intro: string; note: string; chartTypes: string; modules: ModuleDef[] };
  solutions: StoryHeading & AkashicSolutions & {
    modules: string[];
    axis: { solution: string; workflow: string; underneath: string };
    used: string;
    unused: string;
    legend: { on: string };
  };
  faq: StoryHeading & { items: Faq[] };
  close: StoryHeading & {
    intro: string;
    agenda: { label: string; text: string }[];
    primary: Cta;
    secondary: Cta;
    footer: string;
    flow: string;
  };
}

type IconKey = "source" | "graph" | "bolt" | "doc" | "mail" | "report";

/** One worked example in [01]: a question, the four moves, the answer. */
export interface AskWorld {
  label: string;
  question: string;
  asker: string;
  context: string;
  steps: { name: string; line: string }[];
  answer: string;
  answerDetail: string;
  chart: {
    title: string;
    rows: { label: string; pct: number; lag?: boolean }[];
    lagTag: string;
    footnote: string;
  };
  docs: {
    counted: string;
    excerpt: { icon: IconKey; source: string; date: string; pre: string; mark: string; post: string };
    record: { icon: IconKey; name: string; sub: string; status: string };
  };
  chips: { icon: IconKey; label: string }[];
}

/* [04] module entries: high-level summaries of [10]'s datasheet, terse
   noun phrases only (user direction, Jul 2026), and no vendor or
   technology names ([10] is the only place technology is named). */
export interface LayerModule {
  id: string;
  icon: string;
  name: string;
  sub: string;
  caps: string[];
  /** Agents that work in this module (in preview). */
  agent?: string;
}

export const dataLayerModules: LayerModule[] = [
  {
    id: "modules-data-pipelines",
    icon: "Akashic Data Pipelines",
    name: "Data Pipelines",
    sub: "Ingest and validate every source",
    caps: ["Ready-made connectors", "Streaming · batch · CDC", "PDF, email & OCR intake", "Schema validation"],
    agent: "Pipeline agents",
  },
  {
    id: "modules-master-data",
    icon: "Akashic Master Data",
    name: "Master Data",
    sub: "Resolve every entity to one golden record",
    caps: ["Exact + fuzzy matching", "Survivorship rules", "Steward review queue", "Hierarchy management"],
    agent: "Matching agents",
  },
  {
    id: "modules-data-warehousing",
    icon: "Akashic Data Warehouse",
    name: "Data Warehouse",
    sub: "Model data and define metrics once",
    caps: ["Dimensional models", "Governed metric layer", "Your warehouse or ours", "Sub-second queries"],
  },
];

export const intelligenceLayerModules: LayerModule[] = [
  {
    id: "modules-machine-learning",
    icon: "Akashic Machine Learning",
    name: "Machine Learning",
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
    name: "Business Intelligence",
    sub: "Serve metrics to every surface",
    caps: ["AI-built charts", "Dashboards & alerts", "Row-level security", "Embedded analytics"],
  },
];

/** The marks icons/ConnectorLogo can draw, a fixed list an editor picks from.
    "generic" is the neutral glyph for systems with no licensed mark. */
export type ConnectorLogoId =
  | "salesforce" | "sap" | "oracle" | "hubspot" | "zendesk" | "postgresql" | "mysql"
  | "mongodb" | "snowflake" | "kafka" | "s3" | "sheets" | "bigquery" | "databricks"
  | "redshift" | "anthropic" | "openai" | "meta" | "mistral" | "azure" | "akashic" | "generic";
/** A connector: its name and its grey mark. */
export type Conn = { name: string; logo: ConnectorLogoId };
export type Cap = { icon: string; term: string; sub?: string };
export type Group =
  | { label: string; kind: "conn"; items: Conn[] }
  | { label: string; kind: "cap"; items: Cap[]; preview?: boolean }
  | { label: string; kind: "charts" }
  | { label: string; kind: "badges"; items: string[] };


/* [10] Capabilities & connections: the technical reference, one sheet per module. */
export interface ModuleDef {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  desc: string;
  groups: Group[];
}

export const akashicModules: ModuleDef[] = [
  {
    id: "pipelines",
    icon: "Akashic Data Pipelines",
    name: "Data Pipelines",
    tagline: "Ingestion",
    desc: "Every source, ingested and validated the moment it arrives. Structured, unstructured, or streaming: one entry point into the platform, or a standalone ingestion layer.",
    groups: [
      {
        label: "Source connectors",
        kind: "conn",
        items: [
          { name: "Salesforce", logo: "salesforce" },
          { name: "SAP", logo: "sap" },
          { name: "Oracle NetSuite", logo: "oracle" },
          { name: "HubSpot", logo: "hubspot" },
          { name: "Workday", logo: "generic" },
          { name: "Zendesk", logo: "zendesk" },
          { name: "PostgreSQL", logo: "postgresql" },
          { name: "MySQL", logo: "mysql" },
          { name: "MongoDB", logo: "mongodb" },
          { name: "Snowflake", logo: "snowflake" },
          { name: "Apache Kafka", logo: "kafka" },
          { name: "Amazon S3", logo: "s3" },
          { name: "Google Sheets", logo: "sheets" },
          { name: "REST and webhooks", logo: "generic" },
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
          { icon: "bolt", term: "Pipeline agents", sub: "help build and monitor data pipelines" },
        ],
      },
    ],
  },
  {
    id: "master-data",
    icon: "Akashic Master Data",
    name: "Master Data",
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
    name: "Data Warehouse",
    tagline: "Modelled storage",
    desc: "Mastered records become models built for fast, reliable queries. Bring your own warehouse or run Akashic-managed storage.",
    groups: [
      {
        label: "Warehouse connectors",
        kind: "conn",
        items: [
          { name: "Snowflake", logo: "snowflake" },
          { name: "BigQuery", logo: "bigquery" },
          { name: "Databricks", logo: "databricks" },
          { name: "Amazon Redshift", logo: "redshift" },
          { name: "Azure Synapse", logo: "azure" },
          { name: "PostgreSQL", logo: "postgresql" },
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
    name: "Machine Learning",
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
          { name: "Anthropic Claude", logo: "anthropic" },
          { name: "OpenAI", logo: "openai" },
          { name: "Azure OpenAI", logo: "azure" },
          { name: "Llama", logo: "meta" },
          { name: "Mistral", logo: "mistral" },
          { name: "Akashic-hosted", logo: "akashic" },
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
    name: "Business Intelligence",
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
    name: "Governance",
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
      { label: "Compliance", kind: "badges", items: ["ISO 27001", "SOC 2 Type II", "DPDP Act", "GDPR", "CERT-In"] },
    ],
  },
];

/* ---------------- Content ---------------- */

export const akashic: AkashicPage = {
  seo: {
    title: "Akashic: Data and AI Platform",
    description:
      "Akashic is the governed data and AI platform. Data Pipelines, Master Data, Data Warehouse, Machine Learning, Ask Akashic and Business Intelligence on one foundation, ready for agents, with lineage, access control and audit under every layer.",
    path: "/akashic",
  },
  sections: [
    { id: "hero", label: "Introduction" },
    { id: "akashic-in-action", label: "Ask Akashic", eyebrow: "[01]" },
    { id: "how-it-works", label: "How it works", eyebrow: "[02]" },
    { id: "architecture", label: "Where it runs", eyebrow: "[03]" },
    { id: "modules", label: "The architecture", eyebrow: "[04]" },
    { id: "agents", label: "AI agents", eyebrow: "[05]" },
    { id: "trust", label: "Enterprise trust", eyebrow: "[06]" },
    { id: "open", label: "Open architecture", eyebrow: "[07]" },
    { id: "build-vs-buy", label: "The Akashic advantage", eyebrow: "[08]" },
    { id: "scale", label: "Proven at scale", eyebrow: "[09]" },
    { id: "stack", label: "Capabilities & connections", eyebrow: "[10]" },
    { id: "solutions", label: "Built on Akashic", eyebrow: "[11]" },
    { id: "faq", label: "Questions", eyebrow: "[12]" },
    { id: "talk-to-our-team", label: "Ready when you are", eyebrow: "[13]" },
  ],
  sectionsLabel: "Akashic page sections",

  /* DRAFT: placeholder attribution. Executives supply the final quote. */
  quote: {
    text: "“I didn’t realise how much I’d stopped trusting our own numbers until the day I finally could again.”",
    breakAfter: "trusting",
    name: "Ananya Rao",
    role: "Chief Operating Officer · Nexora",
  },

  /* The founder's hero category (14 Oct 2026). No numbers in the hero. */
  hero: {
    badge: { product: "Akashic", claim: "The governed data and AI platform" },
    kicker: ["Ask", "Predict", "Decide"],
    title: { lead: "The intelligence layer", tail: "behind every", phrases: ["decision.", "answer.", "insight."] },
    lede: "Akashic brings your data, analytics and AI onto one governed platform, ready for agents. Every team works from the same figures, each one traced to its source.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See it answer a question", href: "#akashic-in-action" },
    /* 23 Oct 2026 (user): the hero lands straight on the quote. The outcome
       cards that stood under it went to homepage [02]; the dome and module
       rail tried here the same day were removed. */
  },

  /* [01] Everything on the right is SIMULATED PRODUCT UI: canned copy and
     demo data for storytelling only. The question types itself first; the
     four moves cascade after it; the answer is a two-panel evidence dossier
     (systems beside documents). */
  inAction: {
    eyebrow: { number: "01", label: "Ask Akashic" },
    title: { setup: "Why the number moved,", payoff: "answered in seconds." },
    lede: "The figure sits in a system. The reason sits in a contract, an email or a field report. Akashic reads both and returns one answer, every line cited. No week of reconciling. No decision made on a hunch.",
    examplesLabel: "Choose an example",
    /* What the status line says while the run is underway, per phase 0 to 4. */
    statusLabels: ["Thinking", "Connecting", "Understanding", "Reasoning", "Answering"],
    chrome: {
      ask: "Ask",
      answer: "Answer",
      for: "for",
      time: "09:41",
      systems: "From your systems",
      documents: "From your documents",
      targetLine: "100% of target",
    },
    worlds: [
      {
        label: "Enterprise",
        question: "Why is the South region behind on target, and what’s driving it?",
        asker: "Regional head",
        context: "vs revenue target",
        steps: [
          { name: "Connected", line: "Pulls in your sales numbers, and the contracts and emails behind them." },
          { name: "Understood", line: "Knows how “revenue” is defined, so it means the same thing in every region." },
          { name: "Reasoned", line: "Follows the shortfall to its cause: two renewal deals, still unsigned." },
          { name: "Answered", line: "One plain answer, with the numbers and the paperwork attached." },
        ],
        answer: "South is 8% behind target because two distributor renewals stalled in July.",
        answerDetail: "Your largest South distributor is waiting on a board review of the revised pricing. A second distributor’s counter-signature is still outstanding.",
        chart: {
          title: "Revenue vs target · South region",
          rows: [
            { label: "APR", pct: 102 },
            { label: "MAY", pct: 99 },
            { label: "JUN", pct: 97 },
            { label: "JUL", pct: 92, lag: true },
          ],
          lagTag: "−8% vs target",
          footnote: "The gap is $80,500. The two stalled renewals account for all of it.",
        },
        docs: {
          counted: "3 read · 2 cited",
          excerpt: { icon: "mail", source: "Largest distributor · renewal email", date: "2 JUL", pre: "“We ", mark: "can’t commit at the revised pricing", post: " until our board reviews it in August.”" },
          record: { icon: "doc", name: "Second distributor · renewal contract", sub: "$38,000 · counter-signature pending since 14 June", status: "Unsigned" },
        },
        chips: [
          { icon: "source", label: "2 systems · 3 documents read" },
          { icon: "graph", label: "Every line traced to its source" },
          { icon: "bolt", label: "Ready in seconds" },
        ],
      },
      {
        label: "Public programmes",
        question: "Why are enrolments lagging in District 7, and what changed on the ground?",
        asker: "District lead",
        context: "vs enrolment target",
        steps: [
          { name: "Connected", line: "Pulls in enrolment counts, and the camp schedules and field reports behind them." },
          { name: "Understood", line: "Knows how “enrolment” is counted, so it means the same thing in every district." },
          { name: "Reasoned", line: "Follows the gap to its cause: two outreach camps, both rescheduled." },
          { name: "Answered", line: "One plain answer, with the counts and the field notes attached." },
        ],
        answer: "District 7 is 9% behind target because two outreach camps were rescheduled after the July floods.",
        answerDetail: "Both camps are now set for early August. The gap closes once they run.",
        chart: {
          title: "Enrolments vs target · District 7",
          rows: [
            { label: "APR", pct: 102 },
            { label: "MAY", pct: 100 },
            { label: "JUN", pct: 98 },
            { label: "JUL", pct: 91, lag: true },
          ],
          lagTag: "−9% vs target",
          footnote: "The gap is 550 enrolments. The two rescheduled camps account for all of it.",
        },
        docs: {
          counted: "4 read · 2 cited",
          excerpt: { icon: "report", source: "Camp 04 · field report", date: "6 JUL", pre: "“Venue roads are still waterlogged. ", mark: "Camp moved to 3 August", post: ".”" },
          record: { icon: "doc", name: "Camp 07 · reschedule notice", sub: "300 expected enrolments · new date 8 August", status: "Rescheduled" },
        },
        chips: [
          { icon: "source", label: "2 systems · 4 field notes read" },
          { icon: "graph", label: "Every line traced to its source" },
          { icon: "bolt", label: "Ready in seconds" },
        ],
      },
    ],
  },

  /* [02] The machined-unit walkthrough. The plate engravings and face
     labels are artwork and stay in demos/mockups/AkashicTeardownMockup; the
     claims below are content. */
  howItWorks: {
    eyebrow: { number: "02", label: "How it works · the walkthrough" },
    /* Gain-led headline (14 Oct 2026): adopt one module, grow into the platform. */
    title: { setup: "Start with one module.", payoff: "Grow into the platform." },
    lede: "Each module does one job and hands its output to the next, on one governed foundation.",
    modules: [
      {
        kicker: "Ingestion",
        name: "Data Pipelines",
        lede: "Every source, ingested and validated.",
        points: [
          { icon: "database", text: "CRMs, ERPs, PDFs, live feeds: streaming, batch, CDC" },
          { icon: "funnel", text: "Validated on arrival, so nothing downstream inherits a problem" },
          { icon: "cpu", text: "AI agents help build and monitor data pipelines", preview: true },
        ],
      },
      {
        kicker: "Entity resolution",
        name: "Master Data",
        lede: "One golden record. No duplicates.",
        points: [
          { icon: "merge", text: "One golden record, settled by survivorship rules" },
          { icon: "graph", text: "Records link into the knowledge layer as they merge" },
          { icon: "cpu", text: "AI agents suggest matches; stewards approve", preview: true },
        ],
      },
      {
        kicker: "Modelled storage",
        name: "Data Warehouse",
        lede: "Structured, modelled, ready to query.",
        points: [
          { icon: "cube", text: "Dimensional models, built for sub-second queries" },
          { icon: "target", text: "The governed metric layer: “revenue” defined once, used everywhere" },
          { icon: "cloud", text: "Bring your own warehouse, or run Akashic’s" },
        ],
      },
      {
        kicker: "Prediction",
        name: "Machine Learning",
        lede: "Forecasts, trained on governed data.",
        points: [
          { icon: "cpu", text: "Train and deploy where the data lives: no exports" },
          { icon: "eye", text: "Drift, bias, and freshness monitored automatically" },
          { icon: "trace", text: "Every prediction traceable to governed features" },
        ],
      },
      {
        kicker: "Conversational AI",
        name: "Ask Akashic",
        lede: "Plain-language answers, grounded.",
        points: [
          { icon: "database", text: "Questions become SQL on the governed metric layer" },
          { icon: "quote", text: "A citation on every line, never a guess" },
          { icon: "lock", text: "Row-level security enforced at answer time" },
        ],
      },
      {
        kicker: "Decision surface",
        name: "Business Intelligence",
        lede: "The same number, on every surface.",
        points: [
          { icon: "sparkle", text: "Describe a chart in plain language: AI builds it on governed data" },
          { icon: "bell", text: "Alerts the moment a metric crosses its threshold" },
          { icon: "share", text: "Shared dashboards, one live source of truth" },
        ],
      },
      {
        kicker: "Always on",
        name: "Governance",
        lede: "It’s been running the whole time.",
        points: [
          { icon: "shield", text: "Access, lineage, and audit under every module" },
          { icon: "key", text: "Deployed in-region, with your own keys when self-hosted" },
          { icon: "badge", text: "ISO 27001 and SOC 2 certified · DPDP, GDPR, CERT-In compliant" },
        ],
      },
    ],
    askQuestion: "Why did this number change?",
    combos: ["Run Data Pipelines on its own", "Or Master Data + Ask Akashic", "Or the whole platform"],
    close: {
      kicker: ["Start anywhere", "Scale everywhere"],
      title: "Every module works on its own. Together, they’re the whole platform.",
      body: "Pick the modules that solve today’s problem: they run alongside whatever you already have. Add the rest when you’re ready. The foundation never changes.",
      tagline: "Seven modules · one platform",
    },
    frameLabel: "[02] Introducing Akashic · seven modules",
    hud: { module: "Module", sealed: "Sealed", modular: "Modular", depth: "Depth", goTo: "Go to module" },
  },

  deployment: {
    eyebrow: { number: "03", label: "Where it runs" },
    title: "Deploy where your data has to live.",
    intro: "Cloud, on-premises, or hybrid: Akashic is identical in all three. Same modules, same governance, same answers.",
    cloud: {
      name: "Cloud",
      desc: "Run in the region your regulator names. All three providers, if you need them.",
      chip: "LIVE",
      footer: "Your provider, your region",
      providers: ["AWS", "Azure", "Google Cloud"],
    },
    onPrem: {
      name: "On-Premises",
      desc: "Full data sovereignty, for governments and regulated enterprises.",
      chip: "SOVEREIGN",
      footer: "Your perimeter, unchanged",
      rack: "Rack 01 · Your perimeter",
      chips: ["Your hardware", "Your network", "Your keys"],
    },
    hybrid: {
      name: "Hybrid",
      desc: "Keep regulated data in your racks and run everything else in your cloud. One estate, not two.",
      chip: "CONNECTED",
      footer: "One governed foundation, racks and cloud",
      racks: "Your racks",
      cloud: "Your cloud",
      you: "You",
      us: "DH",
    },
    summary: { setup: "Your data stays where you need it.", payoff: "The platform on top of it never changes." },
  },

  architecture: {
    number: "04",
    label: "The architecture",
    setup: "You get seven modules",
    title: "and nothing to stitch together.",
    intro: "Data, context and AI share one foundation, so the seven modules arrive already joined. Governance carries through every layer.",
    sourcesLabel: "Your sources",
    sources: ["Business systems", "Databases", "Documents", "Event streams"],
    layers: [
      { number: "01", name: "Data", verb: "Bring the records together.", desc: "Ingest, resolve and model the data your organisation runs on." },
      { number: "02", name: "Knowledge", verb: "Give every record context.", desc: "Connect entities, definitions and history in a governed knowledge layer." },
      { number: "03", name: "Intelligence", verb: "Put AI to work.", desc: "Models, AI answers and dashboards draw from the same foundation." },
    ],
    context: ["Entities", "Relationships", "Definitions", "History"],
    explore: "Explore capabilities",
    governanceLabel: "Every layer / Governance",
    governance: "Governance runs through every layer.",
    controls: "Access control · Lineage · Audit · Residency",
    exploreGovernance: "Explore governance",
    /* The page's one explicit agent line: agents ship in preview, the
       groundwork they depend on is live. */
    coda: "Agents, in preview. The groundwork they need, already live.",
    modules: { data: dataLayerModules, intelligence: intelligenceLayerModules },
  },

  agents: {
    preview: true,
    number: "05",
    label: "AI agents",
    setup: "Agents do the legwork.",
    title: "People make the call.",
    intro: "Agents read the documents, pull the figures and check the rules. Your teams review the evidence instead of assembling it. Nothing consequential moves without a person’s approval.",
    figureCaption:
      "One agent run in six steps. Agents handle ask, plan, retrieve and verify: a Business Intelligence concierge, an orchestrator, SQL, document and hybrid agents, and a metadata agent. A person approves, with maker-checker sign-off, and no agent signs off. The run is recorded on an append-only audit trail with the model and prompt version. A golden-record steward and a pipeline monitor run under every run.",
    previewNote: "Agents are in preview.",
    lanes: { agent: "Agents do the legwork", person: "A person decides", record: "Kept on record" },
    steps: [
      { kind: "agent", name: "Ask", detail: "Question · alert · schedule", agents: [{ code: "BI", name: "Business Intelligence concierge", line: "Finds or builds the right view" }] },
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
  },

  trust: { number: "06", label: "Data privacy and security", ...akashicSecurity },

  open: {
    number: "07",
    label: "Open architecture",
    setup: "No lock-in, by design:",
    title: "your data, your formats, your call.",
    principles: [
      { title: "Modular by design", desc: "Start with the modules you need. Expand on the same foundation as your priorities grow.", detail: "Adopt at your pace" },
      { title: "Open to inspect", desc: "Read the tables, transforms and metric definitions with tools your team already uses.", detail: "See how the answer was made" },
      { title: "Yours to extend", desc: "Use open interfaces to connect existing systems and build for your organisation.", detail: "Keep your engineering freedom" },
      { title: "Yours to keep", desc: "Keep your data and your work in open formats. Carry both forward as your needs change.", detail: "Stay by choice" },
    ],
    productName: "Akashic",
    close: "Own your data. Own your standards. Keep your freedom to choose.",
  },

  /* [08] Why Akashic. One drawing carries the whole argument (30 Sep 2026):
     the same four use cases, built project by project and on Akashic. The
     fourth use case is AI agents, drawn dashed because agents are in
     preview. No savings figure: the reader is told what to measure instead
     (Design Rule 4). */
  advantage: {
    number: "08",
    label: "Why Akashic",
    setup: "Lay the groundwork once,",
    title: "then build every use case on top.",
    intro: "Connections, records and definitions carry forward. Each new dashboard, model or AI use case starts where the last one finished.",
    figureCaption:
      "Four use cases, dashboards, forecasts, AI answers and AI agents, built two ways. Project by project, each use case rebuilds its own connect, unify and define groundwork. With Akashic, the groundwork is laid once and every use case builds only its own work on top. AI agents are in preview.",
    cornerLabel: "Use case",
    useCases: [
      { name: "Dashboards", preview: false },
      { name: "Forecasts", preview: false },
      { name: "AI answers", preview: false },
      { name: "AI agents", preview: true },
    ],
    layers: ["Define", "Unify", "Connect"],
    rows: {
      project: { name: "Project by project", note: "Groundwork rebuilt every time" },
      akashic: { name: "With Akashic", note: "Groundwork laid once, reused" },
    },
    bandNote: "Reused by the next use case",
    governance: "Governance throughout",
    controls: "Permissions · Lineage · Audit",
    legend: { work: "New work", rebuilt: "Groundwork, rebuilt", shared: "Groundwork, laid once", preview: "In preview" },
    seats: [
      { role: "CFO", pin: "rebuilt", line: "Pay for the groundwork once, not per project." },
      { role: "CIO / CTO", pin: "band", line: "Keep your systems. One partner delivers the platform." },
      { role: "CDO / AI lead", pin: "define", line: "Models, AI answers and agents read one set of definitions." },
      { role: "CEO / COO", pin: "work", line: "One figure in every meeting, traced to its source." },
    ],
    measure: "Measure the difference on your own work: cost per use case, time to the next.",
  },

  scale: {
    number: "09",
    eyebrow: "In production",
    title: { setup: "The platform behind national programmes", payoff: "is ready for your organisation." },
    description: "Not pilots. National systems in production, at population scale.",
    storiesLabel: "Akashic deployments in production",
    storyNoun: "deployment",
  },

  /* The founder's platform figures, real per Rule 4, live in [10]'s module
     sheets beside the claim each one proves: Data Pipelines 25 built-in
     transforms, BI 61 data sources and 50+ chart types, Governance 80+
     metadata connectors. Not used: his "10 modules" and "13 agents" (held). */
  reference: {
    number: "10",
    label: "Capabilities & connections",
    setup: "Look beneath the promise",
    title: "and inspect every capability.",
    intro: "An open reference for your technical team. Explore each module, its connections and its controls.",
    note: "Discuss connector compatibility, model hosting and deployment requirements with our team.",
    chartTypes: "Bars · Lines · Areas · Metrics · Tables · Heatmaps · Scatter · Pie",
    modules: akashicModules,
  },

  solutions: {
    number: "11",
    label: "Built on Akashic",
    ...akashicSolutions,
    modules: solutionModules,
    axis: { solution: "Solution", workflow: "Workflow", underneath: "Akashic underneath" },
    used: ", in use",
    unused: ", not used",
    legend: { on: "All seven modules in every solution" },
  },

  /* [12] Questions (14 Oct 2026). The founder's FAQ, re-cut for this page.
     Every answer restates a claim the page already makes; none introduces
     a new one. If agents go GA, rewrite the agents answer with `agents.preview`. */
  faq: {
    number: "12",
    label: "Questions",
    setup: "The questions leaders ask,",
    title: "answered plainly.",
    items: [
      {
        question: "What is Akashic?",
        answer: "The governed data and AI platform. Seven modules cover Data Pipelines, Master Data, Data Warehouse, Machine Learning, Ask Akashic, Business Intelligence and Governance on one foundation. Akashic 1.0 is generally available on 1 November 2026.",
      },
      {
        question: "Do we have to replace the systems we run today?",
        answer: "No. Akashic reads from your ERP, CRM, HR systems, databases and documents and leaves them in place. Start with one module and add the next on the same foundation.",
      },
      {
        question: "Which AI models does Akashic use?",
        answer: "The ones you choose. Each task runs on a named model, from a commercial provider or an open model hosted inside your boundary. Your data and queries are never used to train them.",
      },
      {
        question: "Are AI agents available today?",
        answer: "Agents are in preview. Each one works on governed data, cites its sources and stops for a person’s approval before anything consequential moves. The access control, lineage and audit around them are live today.",
      },
      {
        question: "How is Akashic deployed?",
        answer: "In the cloud, on-premises or hybrid. On-premises installs run on Docker and Kubernetes in your data centre. The modules, governance and answers are the same in all three.",
      },
      {
        question: "How do Enterprise Intelligence and IPMS relate to Akashic?",
        answer: "They are Akashic, configured around one process. Each solution switches on the modules its process needs, so the next one starts on data, definitions and governance already in place.",
      },
    ],
  },

  close: {
    number: "13",
    label: "Your next decision",
    setup: "See what your data",
    title: "can decide.",
    intro: "A decision held up by disconnected data. A report nobody agrees on. An AI use case waiting for context. Start there.",
    agenda: [
      { label: "The decision", text: "What does your team need to know?" },
      { label: "The data", text: "Where does the evidence live?" },
      { label: "The first step", text: "Where should we begin?" },
    ],
    primary: { label: "Talk through your use case", href: "#get-started" },
    secondary: { label: "Explore delivery", href: "/delivery" },
    footer: "Akashic, the platform. DHIRA, your delivery partner.",
    flow: "Source → Context → Answer",
  },
};
