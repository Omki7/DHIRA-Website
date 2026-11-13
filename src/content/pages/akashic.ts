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
   Enterprise Intelligence IS /solutions/enterprise-intelligence (user, 14 Oct 2026). */
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
      href: "/solutions/enterprise-intelligence",
      cta: "Explore Enterprise Intelligence",
    },
    {
      id: "ipms",
      name: "Intelligent Procurement Management System",
      category: "Intelligent procurement",
      audience: "For public procurement teams",
      headline: "From indent to secured contract, with evidence.",
      description: "The Intelligent Procurement Management System runs public procurement end to end. AI drafts and reads, the rules engine decides, people approve, and every step lands in the audit trail.",
      stages: [
        { title: "Read every bid", detail: "Cited to the page" },
        { title: "Check the rules", detail: "Versioned, linked to evidence" },
        { title: "Approve the award", detail: "Bids sealed until approval" },
      ],
      note: "Rules decide, people approve, and each step is recorded.",
      modules: solutionModules,
      href: "/solutions#intelligent-procurement",
      cta: "See the procurement system",
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

/* [07] Privacy and control. Merged 5 Nov 2026 from the old [06] Trust and
   [07] Open (platform audit: both told "you stay in control", and the badges
   repeated the cards). Two groups of three rows; the second keeps the old
   #open anchor that other pages link to. Residency left this section: [04]
   Where it runs owns it. Certifications and the laws followed are separate,
   labelled groups, in the homepage [09] wording (DESIGN_SYSTEM §2). */
export type ControlIcon = "no-training" | "permissions" | "definitions" | "inspect" | "extend" | "keep";

export interface AkashicControl {
  setup: string;
  title: string;
  intro: string;
  groups: { id: string; title: string; items: { icon: ControlIcon; title: string; text: string }[] }[];
  frameworks: { label: string; items: string[] }[];
}

const akashicControl: AkashicControl = {
  setup: "Put AI to work",
  title: "without losing control of your data.",
  intro: "Akashic applies access rules and privacy controls from ingestion to the final answer, and keeps the platform open to inspect, extend and leave.",
  groups: [
    {
      id: "private",
      title: "Private by default",
      items: [
        { icon: "no-training", title: "No training on your data", text: "Your data and the questions people ask are never used to train models." },
        { icon: "permissions", title: "Permissions follow the person", text: "Row and column permissions apply from the underlying records to the final answer." },
        { icon: "definitions", title: "One set of definitions", text: "Dashboards and AI read the same governed metric definitions, so a figure means the same thing in both." },
      ],
    },
    {
      id: "open",
      title: "Open, with no lock-in",
      items: [
        { icon: "inspect", title: "Open to inspect", text: "Read the tables, transforms and metric definitions with the tools your team already uses." },
        { icon: "extend", title: "Open to extend", text: "Connect existing systems and build your own applications through open interfaces." },
        { icon: "keep", title: "Yours to keep", text: "Data and work stay in open formats, so you can move both whenever you choose." },
      ],
    },
  ],
  frameworks: [
    { label: "Certified", items: ["ISO 27001", "SOC 2 Type II"] },
    { label: "Complies with", items: ["Digital Personal Data Protection Act", "General Data Protection Regulation", "Indian Computer Emergency Response Team directions"] },
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

/** [08] Distinct business initiatives, with isolated or shared foundations. */
export interface AkashicAdvantage extends StoryHeading {
  intro: string;
  figureCaption: string;
  rows: {
    project: { name: string; note: string };
    akashic: { name: string; note: string };
  };
  projects: { id: string; owner: string; name: string; work: string; icon: ArchitectureIconKey }[];
  assets: {
    id: string;
    name: string;
    repeated: string;
    shared: string;
    component: string;
    icon: ArchitectureIconKey;
    tone: "data" | "know" | "gov";
  }[];
  rebuildLabel: string;
  projectWorkLabel: string;
  foundation: { title: string; note: string };
  /** The leadership panel under the drawing: what the shared foundation
      changes for each executive, in that executive's own terms. */
  leaders: {
    key: string;
    verb: string;
    roles: { id: string; icon: ArchitectureIconKey; role: string; gain: string; detail: string }[];
  };
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

export interface LicensingTierItem {
  name: string;
  href: string;
}

export interface AkashicLicensing extends StoryHeading {
  intro?: string;
  link: Cta;
  tiers: LicensingTierItem[];
}

/* ---------------- The page document ---------------- */

export interface AkashicPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  /** The sticky quote under the hero. Optional: with no quote the page opens
      on the hero alone. Only a real, attributed quote goes here (Rule 4). */
  quote?: {
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
    /** Names what the play control runs ("Play the …"). */
    replayLabel: string;
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
    /** The section's one onward link, under the figure (user, 4 Nov 2026). */
    link: Cta;
    /** Accessible summary of the whole figure. */
    figureLabel: string;
    /** The platform's own header inside its frame. */
    platform: { tagline: string; count: string };
    /** The top row: every team, ordered from the boardroom to the front line. */
    users: ArchitectureLayer & { teams: ArchitectureFacet[] };
    /** The four layers Akashic runs, top to bottom. */
    /** Governance: its module, then the six controls every request passes. */
    governance: ArchitectureLayer & { module: ArchitectureModule; controls: ArchitectureFacet[] };
    intelligence: ArchitectureLayer & {
      modules: ArchitectureModule[];
      /** The preview strip under the three modules; links to [05]. */
      agents: { name: string; line: string; href: string };
    };
    /** Not a module: the shared layer Master Data builds. */
    knowledge: ArchitectureLayer & { note: string; parts: ArchitectureFacet[] };
    data: ArchitectureLayer & { modules: ArchitectureModule[] };
    /** The bottom row: the systems Akashic reads from, by kind. */
    systems: ArchitectureLayer & { groups: { name: string; items: ArchitectureSource[] }[] };
    /** One question, down through every layer and back up: one step per
        row (users, governance, intelligence, knowledge, data, systems),
        then `back` on the return leg. `motion` names what the pause
        control stops. */
    flow: { label: string; motion: string; steps: ArchitectureStep[]; back: ArchitectureStep };
  };
  agents: AkashicAgents;
  trust: StoryHeading & AkashicControl;
  advantage: AkashicAdvantage;
  licensing: AkashicLicensing;
  scale: ProvenAtScaleBlock;
  reference: AkashicReference;
  solutions: StoryHeading & AkashicSolutions & {
    modules: string[];
    axis: { solution: string; workflow: string; underneath: string };
    /** The line over the shared module band under the three solutions. */
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

/** [04] Glyph keys of the architecture figure's own icon set
    (features/akashic/…/AkashicModules/ArchitectureIcon). Keys, not copy. */
export type ArchitectureIconKey =
  | "executives" | "finance" | "sales" | "marketing" | "operations" | "supply-chain"
  | "people" | "risk" | "service" | "analysts" | "data-teams" | "front-line"
  | "governance" | "access" | "masking" | "lineage" | "audit" | "quality" | "residency"
  | "business-intelligence" | "ask-akashic" | "machine-learning" | "agents"
  | "entities" | "relationships" | "definitions" | "history"
  | "data-pipelines" | "master-data" | "data-warehouse"
  | "documents";

/** [04] One module in the architecture overview: its name, one plain
    outcome, existing anchors and the link to its detailed [10] sheet. */
export interface ArchitectureModule {
  /** The module's anchor: its one name in kebab case (`/akashic#master-data`). */
  anchor: string;
  /** Older anchors that still land on this module. */
  aliases: string[];
  icon: ArchitectureIconKey;
  /** Its [10] sheet: `#reference-<reference>`. */
  reference: string;
  name: string;
  line: string;
}

/** [04] A layer's key (its one-word name) and what it does for you. */
export interface ArchitectureLayer {
  key: string;
  verb: string;
}

/** [04] A named part inside a row: a team, a governance control, a part of
    the knowledge layer. `detail` is the plain line under the name. */
export interface ArchitectureFacet {
  icon: ArchitectureIconKey;
  name: string;
  detail?: string;
}

/** [04] A system feeding the platform: its name and its grey mark (a real
    connector logo, or one of the figure's own glyphs). */
export interface ArchitectureSource {
  name: string;
  logo: ConnectorLogoId | "documents";
}

/** [04] One step of the question's path; `key` is its one-word verb. */
export interface ArchitectureStep {
  key: string;
  text: string;
}

/* Module entries for /akashic/1-0: high-level summaries of [10]'s datasheet, terse
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
    id: "modules-data-warehouse",
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
    id: "modules-ask-akashic",
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
  | { label: string; kind: "charts" };


/* [10] Capabilities & connections: the technical reference, one sheet per module. */
export interface ModuleDef {
  id: string;
  icon: string;
  /** Its [05] layer and glyph, so the sheet wears the same colour as its tile. */
  layer: ReferenceLayer;
  glyph: ArchitectureIconKey;
  name: string;
  tagline: string;
  desc: string;
  groups: Group[];
}

/** The [05] layers a module sheet can belong to (theme.css arch-*). */
export type ReferenceLayer = "data" | "intel" | "gov";

export const akashicModules: ModuleDef[] = [
  {
    id: "pipelines",
    icon: "Akashic Data Pipelines",
    layer: "data",
    glyph: "data-pipelines",
    name: "Data Pipelines",
    tagline: "Ingestion",
    desc: "Every source, ingested and validated the moment it arrives. Structured, unstructured or streaming: one entry point into the platform, or a standalone ingestion layer.",
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
          { icon: "refresh", term: "Change data capture" },
        ],
      },
      {
        label: "Validation and preparation",
        kind: "cap",
        items: [
          { icon: "code", term: "25 built-in transforms", sub: "prepare without code" },
          { icon: "funnel", term: "Schema validation", sub: "on arrival" },
          { icon: "clipboard", term: "Data contracts", sub: "versioned" },
          { icon: "alert", term: "Error quarantine", sub: "retry and backfill" },
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
    layer: "data",
    glyph: "master-data",
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
          { icon: "link", term: "Entity relationships", sub: "typed and versioned" },
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
    layer: "data",
    glyph: "data-warehouse",
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
        label: "Storage and serving",
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
    id: "bi",
    icon: "Akashic BI",
    layer: "intel",
    glyph: "business-intelligence",
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
        label: "Delivery and control",
        kind: "cap",
        items: [
          { icon: "bell", term: "Alerts and thresholds", sub: "metric-based" },
          { icon: "mail", term: "Scheduled reports", sub: "email delivery" },
          { icon: "shield", term: "Row-level security", sub: "per viewer" },
          { icon: "link", term: "Embedded analytics", sub: "iframe · SDK" },
        ],
      },
    ],
  },
  {
    id: "ask",
    icon: "Akashic Insights",
    layer: "intel",
    glyph: "ask-akashic",
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
          { icon: "mask", term: "Personal data masking", sub: "before inference" },
          { icon: "history", term: "Prompt audit log", sub: "append-only" },
          { icon: "globe", term: "In-region inference", sub: "no training on your data" },
        ],
      },
    ],
  },
  {
    id: "ml",
    icon: "Akashic Machine Learning",
    layer: "intel",
    glyph: "machine-learning",
    name: "Machine Learning",
    tagline: "Prediction",
    desc: "Build, train, deploy and monitor models directly on governed data. No exports, no separate environment.",
    groups: [
      {
        label: "Development",
        kind: "cap",
        items: [
          { icon: "notebook", term: "JupyterHub notebooks", sub: "Python" },
          { icon: "flask", term: "Experiment tracking", sub: "MLflow" },
          { icon: "grid", term: "Feature store", sub: "online and offline" },
          { icon: "chip", term: "GPU compute", sub: "on demand" },
        ],
      },
      {
        label: "Deployment",
        kind: "cap",
        items: [
          { icon: "archive", term: "Model registry", sub: "dev · staging · prod" },
          { icon: "rocket", term: "CI/CD promotion", sub: "staged rollout" },
          { icon: "link", term: "Serving endpoints", sub: "batch and real-time" },
        ],
      },
      {
        label: "Monitoring",
        kind: "cap",
        items: [
          { icon: "gauge", term: "Drift detection", sub: "population stability index" },
          { icon: "alert", term: "Bias monitoring", sub: "per segment" },
          { icon: "history", term: "Feature freshness", sub: "SLA-tracked" },
          { icon: "refresh", term: "Scheduled retraining" },
        ],
      },
    ],
  },
  {
    id: "governance",
    icon: "Akashic Data Governance",
    layer: "gov",
    glyph: "governance",
    name: "Governance",
    tagline: "Always on",
    desc: "Access control, lineage and audit under every module, from the first byte to the final answer.",
    groups: [
      {
        label: "Catalogue and lineage",
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
          { icon: "funnel", term: "Null and uniqueness tests", sub: "per column" },
          { icon: "alert", term: "Schema-drift detection" },
          { icon: "gauge", term: "Volume monitoring", sub: "row-count baselines" },
        ],
      },
      {
        label: "Access and audit",
        kind: "cap",
        items: [
          { icon: "users", term: "Role-based access", sub: "row and column level" },
          { icon: "key", term: "SSO / SCIM", sub: "identity sync" },
          { icon: "queue", term: "Audit log", sub: "append-only" },
          { icon: "mask", term: "Personal data classification", sub: "auto-tagged · masked" },
        ],
      },
      {
        label: "Residency and keys",
        kind: "cap",
        items: [
          { icon: "pin", term: "In-region deployment", sub: "cloud · on-premises · hybrid" },
          { icon: "globe", term: "Zero data egress", sub: "policy-enforced" },
          { icon: "lock", term: "AES-256 encryption", sub: "at rest · in transit" },
          { icon: "shield", term: "Customer-held keys", sub: "self-hosted · no DHIRA key custody" },
        ],
      },
    ],
  },
];

/** [09] Capabilities and connections: the technical reference sheets. */
export type AkashicReference = StoryHeading & {
  intro: string;
  note: string;
  chartTypes: string;
  /** Accessible name of the module index. */
  indexLabel: string;
  /** Group names in the index, [05]'s layer keys. */
  layers: Record<ReferenceLayer, string>;
  modules: ModuleDef[];
};

/* ---------------- Content ---------------- */

export const akashic: AkashicPage = {
  seo: {
    title: "Akashic",
    description:
      "Akashic is the governed data and AI platform. Data Pipelines, Master Data, Data Warehouse, Machine Learning, Ask Akashic and Business Intelligence on one foundation, ready for agents, with lineage, access control and audit under every layer.",
    path: "/akashic",
  },
  /* Order since 5 Nov 2026 (platform audit): the national proof moved up
     to [03], straight after the [01] to [02] opening the user fixed on
     14 Oct; [06] Trust and [07] Open merged into [07]. The capability
     reference went to /akashic/1-0 and came back the same day (user): it is
     [09] again, between Why Akashic and Built on Akashic. Labels match each
     section's eyebrow. */
  sections: [
    { id: "hero", label: "Introduction" },
    { id: "akashic-in-action", label: "Ask Akashic", eyebrow: "[01]" },
    { id: "how-it-works", label: "How it works", eyebrow: "[02]" },
    { id: "scale", label: "In production", eyebrow: "[03]" },
    { id: "architecture", label: "Where it runs", eyebrow: "[04]" },
    { id: "modules", label: "The architecture", eyebrow: "[05]" },
    { id: "agents", label: "AI agents", eyebrow: "[06]" },
    { id: "trust", label: "Privacy and control", eyebrow: "[07]" },
    { id: "build-vs-buy", label: "Why Akashic", eyebrow: "[08]" },
    { id: "licensing", label: "Licensing and IP", eyebrow: "[09]" },
    { id: "stack", label: "Capabilities and connections", eyebrow: "[10]" },
    { id: "solutions", label: "Built on Akashic", eyebrow: "[11]" },
    { id: "faq", label: "Questions", eyebrow: "[12]" },
    { id: "talk-to-our-team", label: "Your next decision", eyebrow: "[13]" },
  ],
  sectionsLabel: "Akashic page sections",

  /* DRAFT: placeholder attribution. Executives supply the final quote.
     Taken off on 5 Nov 2026 (platform audit: an invented name breaks Rule 4)
     and restored the same day at the user's request. Replace the name and
     role with a real, attributed quote before launch. */
  quote: {
    text: "“I didn’t realise how much I’d stopped trusting our own numbers until the day I finally could again.”",
    /* "numbers", not "trusting": at md and up "trusting" sat alone on its
       own line (platform audit, 5 Nov 2026). Three lines from md up. */
    breakAfter: "numbers",
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
    lede: "The figure sits in one system and the reason in a contract, an email or a field report. Akashic reads both and returns one answer, with each line cited.",
    examplesLabel: "Choose an example",
    replayLabel: "the question and its answer",
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
          { icon: "graph", label: "Each line traced to its source" },
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
          { icon: "graph", label: "Each line traced to its source" },
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
        lede: "Sources ingested and validated.",
        points: [
          { icon: "database", text: "CRMs, ERPs, PDFs, live feeds: streaming, batch, CDC" },
          { icon: "funnel", text: "Validated on arrival, so nothing downstream inherits a problem" },
          { icon: "cpu", text: "AI agents help build and monitor data pipelines", preview: true },
        ],
      },
      {
        kicker: "Entity resolution",
        name: "Master Data",
        lede: "Duplicates resolved into one golden record.",
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
          { icon: "eye", text: "Drift, bias and freshness monitored automatically" },
          { icon: "trace", text: "Predictions traceable to governed features" },
        ],
      },
      {
        kicker: "Conversational AI",
        name: "Ask Akashic",
        lede: "Plain-language answers, grounded.",
        points: [
          { icon: "database", text: "Questions become SQL on the governed metric layer" },
          { icon: "quote", text: "A citation on each line of the answer" },
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
          { icon: "shield", text: "Access, lineage and audit under every module" },
          { icon: "key", text: "Deployed in-region, with your own keys when self-hosted" },
          { icon: "badge", text: "Certified to ISO 27001 and SOC 2 Type II" },
        ],
      },
    ],
    askQuestion: "Why did this number change?",
    combos: ["Run Data Pipelines on its own", "Or Master Data + Ask Akashic", "Or the whole platform"],
    close: {
      kicker: ["Start anywhere", "Scale everywhere"],
      title: "Each module works on its own. Together, they’re the whole platform.",
      body: "Pick the modules that solve today’s problem: they run alongside whatever you already have. Add the rest when you’re ready. The foundation never changes.",
      tagline: "Seven modules · one platform",
    },
    frameLabel: "[02] Introducing Akashic · seven modules",
    hud: { module: "Module", sealed: "Sealed", modular: "Modular", depth: "Depth", goTo: "Go to module" },
  },

  deployment: {
    eyebrow: { number: "04", label: "Where it runs" },
    title: "Deploy where your data has to live.",
    intro: "Cloud, on-premises or hybrid: Akashic is identical in all three. Same modules, same governance, same answers.",
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
      desc: "Keep regulated data in your racks and run everything else in your cloud, governed as one estate.",
      chip: "CONNECTED",
      footer: "One governed foundation, racks and cloud",
      racks: "Your racks",
      cloud: "Your cloud",
      you: "You",
      us: "DH",
    },
    summary: { setup: "Your data stays where you need it.", payoff: "The platform on top of it never changes." },
  },

  /* [04] Redrawn 4 Nov 2026 (user: the per-team traces left the figure
     "hollow and timid"; show the layers the way leading platforms show
     theirs: Databricks, Microsoft Fabric, Salesforce). Read top to bottom:
     every team, then the four layers Akashic runs (Governance,
     Intelligence, Knowledge, Data), then your systems. ONE question runs
     down through every layer and comes back up answered: no team gets its
     own path. Each layer has a named tab and connected components; the
     layers share one blue ramp, strongest at the top (theme.css arch-*). Modules keep one outcome; capability lists
     remain in [10]. The systems row includes all named [10] connectors
     and document-ingestion types. */
  architecture: {
    number: "05",
    label: "The architecture",
    setup: "You get seven modules",
    title: "and nothing to stitch together.",
    intro: "Bring data, analytics and AI together on one governed foundation. Seven connected modules give teams one consistent view of the business.",
    link: { label: "See every module in detail", href: "#stack" },
    figureLabel:
      "The Akashic architecture, read top to bottom. Every team, from executives to front-line staff, asks at the top. Akashic runs four layers. Governance checks every request. Intelligence answers with Business Intelligence, Ask Akashic and Machine Learning, with AI agents in preview. The knowledge layer gives every record its meaning. Data brings the records together with Data Pipelines, Master Data and Data Warehouse. Your systems, such as SAP, Salesforce, PostgreSQL and Apache Kafka, feed in at the bottom. One question travels down through every layer, and the answer comes back up, traceable to its source.",
    platform: { tagline: "The governed data and AI platform", count: "Seven modules · four layers" },
    /* Ordered from the boardroom to the front line (user, 4 Nov 2026:
       "wide spread teams of organization from executive to everyone else"). */
    users: {
      key: "Every team",
      verb: "From leaders to front-line teams.",
      teams: [
        { icon: "executives", name: "Executives" },
        { icon: "finance", name: "Finance" },
        { icon: "sales", name: "Sales" },
        { icon: "marketing", name: "Marketing" },
        { icon: "operations", name: "Operations" },
        { icon: "supply-chain", name: "Supply chain" },
        { icon: "people", name: "Human resources" },
        { icon: "risk", name: "Risk and compliance" },
        { icon: "service", name: "Customer service" },
        { icon: "analysts", name: "Analysts" },
        { icon: "data-teams", name: "Data teams" },
        { icon: "front-line", name: "Front-line staff" },
      ],
    },
    /* The six controls, each from the Governance [10] sheet: role-based
       access, PII masking, column-level lineage, the audit log, freshness
       and drift tests, in-region deployment. */
    governance: {
      key: "Governance",
      verb: "Protect and trace your data.",
      module: {
        anchor: "governance", aliases: ["modules-governance"], icon: "governance", reference: "governance",
        name: "Governance",
        line: "Access, quality and lineage across all seven modules.",
      },
      controls: [
        { icon: "access", name: "Access rules" },
        { icon: "masking", name: "Data masking" },
        { icon: "lineage", name: "Lineage" },
        { icon: "audit", name: "Audit log" },
        { icon: "quality", name: "Data quality" },
        { icon: "residency", name: "Data residency" },
      ],
    },
    intelligence: {
      key: "Intelligence",
      verb: "Analyse, ask and predict.",
      modules: [
        { anchor: "business-intelligence", aliases: ["modules-business-intelligence"], icon: "business-intelligence", reference: "bi", name: "Business Intelligence", line: "Shared metrics, dashboards and alerts." },
        { anchor: "ask-akashic", aliases: ["modules-ask-akashic", "ask-ai"], icon: "ask-akashic", reference: "ask", name: "Ask Akashic", line: "Ask in plain language. Get cited answers." },
        { anchor: "machine-learning", aliases: ["modules-machine-learning"], icon: "machine-learning", reference: "ml", name: "Machine Learning", line: "Build, track and monitor predictive models." },
      ],
      /* [04]'s one agent line: explicitly preview, and a person decides
         (DESIGN_SYSTEM §1). [05] tells the rest. */
      agents: { name: "AI agents", line: "Shared foundation. Human approval.", href: "#agents" },
    },
    knowledge: {
      key: "Knowledge",
      verb: "Share the same meaning.",
      note: "Shared context, built by Master Data",
      parts: [
        { icon: "entities", name: "Entities", detail: "People, products, places" },
        { icon: "relationships", name: "Relationships", detail: "How records connect" },
        { icon: "definitions", name: "Definitions", detail: "Agreed business terms" },
        { icon: "history", name: "History", detail: "Changes over time" },
      ],
    },
    data: {
      key: "Data",
      verb: "Connect and unify records.",
      modules: [
        { anchor: "data-pipelines", aliases: ["modules-data-pipelines"], icon: "data-pipelines", reference: "pipelines", name: "Data Pipelines", line: "Bring in data from systems, documents and streams." },
        { anchor: "master-data", aliases: ["modules-master-data"], icon: "master-data", reference: "master-data", name: "Master Data", line: "One trusted record for each customer, citizen or asset." },
        { anchor: "data-warehouse", aliases: ["modules-data-warehouse", "data-warehousing"], icon: "data-warehouse", reference: "warehouse", name: "Data Warehouse", line: "Store governed data and define metrics once." },
      ],
    },
    /* All named source and warehouse connectors from [10], plus its four
       unstructured ingestion types. No inferred vendor integrations. */
    systems: {
      key: "Your systems",
      verb: "Connect the stack you already run.",
      groups: [
        { name: "Applications", items: [
          { name: "Salesforce", logo: "salesforce" },
          { name: "SAP", logo: "sap" },
          { name: "Oracle NetSuite", logo: "oracle" },
          { name: "HubSpot", logo: "hubspot" },
          { name: "Workday", logo: "generic" },
          { name: "Zendesk", logo: "zendesk" },
        ] },
        { name: "Databases", items: [
          { name: "PostgreSQL", logo: "postgresql" },
          { name: "MySQL", logo: "mysql" },
          { name: "MongoDB", logo: "mongodb" },
        ] },
        { name: "Warehouses", items: [
          { name: "Snowflake", logo: "snowflake" },
          { name: "BigQuery", logo: "bigquery" },
          { name: "Databricks", logo: "databricks" },
          { name: "Amazon Redshift", logo: "redshift" },
          { name: "Azure Synapse", logo: "azure" },
        ] },
        { name: "Files and documents", items: [
          { name: "Amazon S3", logo: "s3" },
          { name: "Google Sheets", logo: "sheets" },
          { name: "PDF documents", logo: "documents" },
          { name: "Office documents", logo: "documents" },
          { name: "Email", logo: "documents" },
          { name: "Scanned documents", logo: "documents" },
        ] },
        { name: "Streams and events", items: [
          { name: "Apache Kafka", logo: "kafka" },
          { name: "REST and webhooks", logo: "generic" },
        ] },
      ],
    },
    flow: {
      label: "Question to answer",
      motion: "the question's path",
      steps: [
        { key: "Ask", text: "Ask a business question." },
        { key: "Check", text: "Apply access rules." },
        { key: "Answer", text: "Choose the right analysis." },
        { key: "Understand", text: "Use shared definitions." },
        { key: "Match", text: "Resolve the records." },
        { key: "Source", text: "Read from your systems." },
      ],
      back: { key: "Return", text: "Return a traceable answer." },
    },
  },

  agents: {
    preview: true,
    number: "06",
    label: "AI agents",
    setup: "Agents do the legwork.",
    title: "People make the call.",
    intro: "Agents read the documents, pull the figures and check the rules. Your teams review the evidence instead of assembling it. Nothing consequential moves without a person’s approval.",
    figureCaption:
      "One agent run in six steps. Agents handle ask, plan, retrieve and verify: a Business Intelligence concierge, an orchestrator, SQL, document and hybrid agents, and a metadata agent. A person approves, with maker-checker sign-off, and no agent signs off. The run is recorded on an append-only audit trail with the model and prompt version. A golden-record steward and a pipeline monitor run beneath every agent run.",
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
      { kind: "record", name: "Record", detail: "Append-only audit trail", note: "Model and prompt version on each step" },
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

  trust: { number: "07", label: "Privacy and control", ...akashicControl },

  /* [08] Why Akashic. Rebuilt 4 Nov 2026 after an executive review found the
     grid of hatched layers hard to read (jargon rows, a four-swatch legend
     and numbered pins to decode). Now two timelines of the same four use
     cases: project by project, each starts by rebuilding its groundwork; on
     Akashic, the groundwork is laid once and each use case adds only its
     own work. The difference is drawn, not claimed: exactly three rounds of
     groundwork. No savings figure (Design Rule 4) and the axis says the
     bars are schematic. AI agents are dashed and tagged: in preview. */
  advantage: {
    number: "08",
    label: "Why Akashic",
    setup: "Build a foundation that lasts",
    title: "beyond the first project.",
    intro: "Akashic turns data connections, trusted records and business rules into shared assets. New initiatives extend that foundation instead of recreating it.",
    figureCaption: "Three distinct business initiatives: revenue assurance for finance, customer retention for customer success, and service performance for operations. In isolated project delivery, each team rebuilds source connections, customer matching, business definitions and access controls. On Akashic, those assets form one governed foundation that all three initiatives can reuse and extend. Each initiative still needs its own data and business logic. This is an architectural comparison, not a delivery-time or cost estimate.",
    rows: {
      project: {
        name: "Project by project",
        note: "When the foundation stays inside each project, the next team repeats the setup.",
      },
      akashic: {
        name: "One foundation across projects",
        note: "Keep the common groundwork. Add the data and logic each initiative needs.",
      },
    },
    projects: [
      { id: "revenue", owner: "Finance", name: "Revenue assurance", work: "Billing rules and leakage checks", icon: "finance" },
      { id: "retention", owner: "Customer success", name: "Customer retention", work: "Churn signals and interventions", icon: "people" },
      { id: "service", owner: "Service operations", name: "Service performance", work: "Case priorities and response targets", icon: "service" },
    ],
    assets: [
      { id: "connections", name: "Source connections", repeated: "Connect the sources", shared: "Sales, billing and service data.", component: "Data Pipelines", icon: "data-pipelines", tone: "data" },
      { id: "records", name: "Trusted records", repeated: "Match the customers", shared: "One customer and account identity.", component: "Master Data", icon: "master-data", tone: "data" },
      { id: "meaning", name: "Business definitions", repeated: "Define the business terms", shared: "Shared terms, metrics and relationships.", component: "Knowledge layer", icon: "definitions", tone: "know" },
      { id: "controls", name: "Access and lineage", repeated: "Set access and traceability", shared: "Policies and evidence across projects.", component: "Governance", icon: "governance", tone: "gov" },
    ],
    rebuildLabel: "Foundation rebuilt for this project",
    projectWorkLabel: "Project-specific work",
    foundation: {
      title: "Build once. Reuse and extend.",
      note: "New sources, definitions and controls can be added as the work grows.",
    },
    /* Added 5 Nov 2026 (user: "add benefits direct to CTO, COO and other
       executives so it's more relatable"). Each gain restates this
       section's one claim, reuse across initiatives, in one executive's
       terms. None repeats the page's other claims ("the same numbers",
       "one trusted record", the access, lineage and audit trio), none
       promises speed or savings, and the first initiative is not claimed
       to start ready-made. No figures (Rule 4). */
    leaders: {
      key: "Your leadership",
      verb: "What one foundation changes for each executive.",
      roles: [
        { id: "ceo", icon: "executives", role: "Chief Executive Officer", gain: "Start each new initiative on ground already laid.", detail: "After the first, every initiative opens on the connections, records and rules already in place. Its team starts on the business problem." },
        { id: "coo", icon: "operations", role: "Chief Operating Officer", gain: "Roll a proven process out to the next team or region.", detail: "The next business unit reuses the same customer records, definitions and controls instead of commissioning its own build." },
        { id: "cfo", icon: "finance", role: "Chief Financial Officer", gain: "Fund the new work, not the same setup again.", detail: "The groundwork is built once and reused, so each new budget goes to the data and business logic that initiative adds." },
        { id: "cto", icon: "data-teams", role: "Chief Technology Officer", gain: "Run one set of integrations, not one per project.", detail: "Connectors and pipelines are built and maintained once. Each new initiative extends them, whichever warehouse you run." },
        { id: "cdo", icon: "definitions", role: "Chief Data Officer", gain: "Fix a data problem once, and every project gets the fix.", detail: "A corrected match rule or business definition reaches every initiative that reads from the foundation." },
        { id: "cro", icon: "risk", role: "Chief Risk Officer", gain: "Review controls in one place, not project by project.", detail: "Policies and their evidence live in the foundation, so an audit reads one record across every initiative." },
      ],
    },
  },

  licensing: {
    number: "09",
    label: "Licensing and IP",
    setup: "Transparent licensing by capacity.",
    title: "Your intellectual property stays yours.",
    intro: "Every plan includes all core modules. Pay only for the capacity you need, with zero vendor lock-in.",
    link: { label: "Explore plans and pricing", href: "/pricing" },
    tiers: [
      { name: "Launch", href: "/pricing#plans" },
      { name: "Growth", href: "/pricing#plans" },
      { name: "Scale", href: "/pricing#plans" },
      { name: "Enterprise", href: "/pricing#plans" },
    ],
  },

  scale: {
    number: "03",
    eyebrow: "In production",
    title: { setup: "The platform behind national programmes", payoff: "is ready for your organisation." },
    description: "National systems in production, at population scale.",
    storiesLabel: "Akashic deployments in production",
    storyNoun: "deployment",
  },

  /* The founder's platform figures, real per Rule 4, live in these module
     sheets beside the claim each one proves: Data Pipelines 25 built-in
     transforms, Business Intelligence 61 data sources and 50+ chart types,
     Governance 80+ metadata connectors. Not used: his "10 modules" and
     "13 agents" (held). */
  reference: {
    number: "10",
    label: "Capabilities and connections",
    setup: "Look beneath the promise",
    title: "and inspect every capability.",
    intro: "An open reference for your technical team. Explore each module, its connections and its controls.",
    note: "Discuss connector compatibility, model hosting and deployment requirements with our team.",
    chartTypes: "Bars · Lines · Areas · Metrics · Tables · Heatmaps · Scatter · Pie",
    indexLabel: "Akashic modules",
    layers: { data: "Data", intel: "Intelligence", gov: "Governance" },
    modules: akashicModules,
  },

  solutions: {
    number: "11",
    label: "Built on Akashic",
    ...akashicSolutions,
    modules: solutionModules,
    axis: { solution: "Solution", workflow: "Workflow", underneath: "Akashic underneath" },
    legend: { on: "All seven modules, under all three solutions" },
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
        question: "How do Enterprise Intelligence, the Intelligent Procurement Management System and Akashic Life relate to Akashic?",
        answer: "They are Akashic, configured around one process. Each solution runs on all seven modules, so the next one starts on data, definitions and governance already in place.",
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
    secondary: { label: "Explore delivery", href: "/services" },
    footer: "Akashic, the platform. DHIRA, your delivery partner.",
    flow: "Source → Context → Answer",
  },
};
