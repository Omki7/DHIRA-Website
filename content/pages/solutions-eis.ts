import type { Cta, Faq, PageSection, Seo } from "../types";

/*
 * The industry model behind every wireframe on /solutions/enterprise-intelligence (the hero's
 * and the estate's industry switchers, and the schema matrix).
 *
 * WHY THIS FILE EXISTS. The page used to run a single hard-coded demo: an IT
 * services firm with Clients / Projects / Employees / Financials. Read by a
 * plant director or a retail COO, that says "this product is for somebody
 * else". EIS is an executive layer for any domain, and the shape of an
 * executive's world changes with the domain.
 *
 * THE STRUCTURE THAT MATTERS. Every organisation has the same two pillars —
 * the people and the money. What changes is the operating unit (a plant, a
 * store, a branch, a client) and the thing it produces (a machine's output, a
 * SKU, a portfolio, an engagement). So each domain here declares four
 * pillars: two `shared: true` and two `shared: false`. The wireframes render
 * that distinction visibly, because it IS the product's argument — one
 * governed spine, industry-shaped surfaces on top.
 *
 * DEMONSTRATION DATA. Everything below is simulated, for fictional
 * organisations, and is consistent within a domain: the pillar counts, the
 * converged signal, the source systems, and the action all describe one
 * plausible morning in that industry. Currency is ₹ across this page (the
 * EIS demo world); the /akashic and home screens run a separate $ world and
 * the two never share a screen.
 */

export type PillarKey = "unit" | "output" | "people" | "money";

export type Pillar = {
  key: PillarKey;
  label: string;
  value: string;
  note: string;
  /* True where every industry has this pillar under a different name only in
     the trivial sense. False where the pillar IS the industry. */
  shared: boolean;
  source: string;
};

export type Signal = {
  /* The three feeds that independently point at the same object. */
  system: string;
  finding: string;
  /* The named system the finding came out of, and how stale that read is.
     `system` above is a category ("Maintenance"); this is the software an
     executive's team actually runs ("Maximo"). The convergence diagram
     attributes to this one, because "Maximo, SAP and Workday all say so"
     is an argument and "maintenance, supply and people" is a taxonomy.
     Always one of the names in `sources` below. */
  source: string;
  age: string;
};

export type DomainRow = {
  unit: string;
  output: string;
  people: string;
  money: string;
  /* How many independent systems flagged this row. 0 reads as "clear". */
  signals: number;
  severity: "high" | "watch" | "clear";
  note: string;
  /* Days until this row stops being reversible: the maintenance window
     shuts, peak starts, the covenant is tested, the contract renews. This
     is the axis of the decision runway, and it is deliberately NOT a
     re-sort of `money` — in two of the four domains the soonest thing is
     not the biggest thing, which is the entire reason an executive needs
     the runway and not another ranked bar chart. 0 means no clock. */
  dueDays: number;
};

export type Domain = {
  key: string;
  tab: string;
  /* What this kind of organisation calls the thing EIS watches. */
  org: string;
  role: string;
  pillars: Pillar[];
  sources: { name: string; kind: string; age: string; writes: number }[];
  /* The converged risk: one object, several systems, a clock. */
  subject: string;
  subjectKind: string;
  clock: string;
  exposure: string;
  exposureNote: string;
  signals: Signal[];
  headline: string;
  /* The action EIS composes, and where it lands. */
  action: string;
  actionField: string;
  actionTarget: string;
  approver: string;
  /* The estate card on the brief, named explicitly. Deriving it from the
     first pillar label produced "Exposure by branche" and called retail's
     regions stores. */
  estateTitle: string;
  estateNote: string;
  rows: DomainRow[];
  /* The question this domain's chief executive opens with. */
  question: string;
};

const domains: Domain[] = [
  {
    key: "professional-services",
    tab: "Professional services",
    org: "Nexora",
    role: "Chief executive",
    pillars: [
      { key: "unit", label: "Clients", value: "48", note: "Top 3 are 32.4%", shared: false, source: "Salesforce" },
      { key: "output", label: "Engagements", value: "31", note: "4 gone red", shared: false, source: "Jira" },
      { key: "people", label: "Workforce", value: "1,840", note: "7 single points of failure", shared: true, source: "Workday" },
      { key: "money", label: "Financials", value: "₹142 Cr", note: "Group revenue, FY26", shared: true, source: "SAP" },
    ],
    sources: [
      { name: "SAP S/4HANA", kind: "ERP", age: "2 min", writes: 2 },
      { name: "Salesforce", kind: "CRM", age: "2 min", writes: 3 },
      { name: "Jira", kind: "Delivery", age: "1 min", writes: 0 },
      { name: "Workday", kind: "HR", age: "6 min", writes: 0 },
    ],
    subject: "Meridian Retail",
    subjectKind: "Orion rollout",
    clock: "Renewal in 18 days",
    exposure: "₹14.2 Cr",
    exposureNote: "10% of group ARR",
    signals: [
      { system: "Contracts", finding: "MSA renewal due 22 Jun", source: "Salesforce", age: "2 min" },
      { system: "Delivery", finding: "Orion rollout 11 days over plan", source: "Jira", age: "1 min" },
      { system: "People", finding: "Lead architect at high attrition risk", source: "Workday", age: "6 min" },
    ],
    headline: "Meridian Retail is your single largest exposure, and three systems say so.",
    action: "Escalate renewal to steering",
    actionField: "Opportunity.StageName",
    actionTarget: "Salesforce",
    approver: "Chief financial officer",
    estateTitle: "Exposure by client",
    estateNote: "48 clients",
    rows: [
      { unit: "Meridian Retail", output: "Orion rollout", people: "V. Rao", money: "₹14.2 Cr", signals: 3, severity: "high", note: "Renewal, slip, exit risk", dueDays: 18 },
      { unit: "Hanseatic", output: "Ledger upgrade", people: "A. Fernandes", money: "₹6.1 Cr", signals: 2, severity: "watch", note: "Milestone M7 unsigned", dueDays: 25 },
      { unit: "Kestrel Logistics", output: "Fleet telemetry", people: "R. Nambiar", money: "₹4.3 Cr", signals: 2, severity: "watch", note: "Invoice overdue 94 days", dueDays: 12 },
      { unit: "Nexora Bank", output: "Atlas migration", people: "S. Iyer", money: "₹8.4 Cr", signals: 0, severity: "clear", note: "Renewed to Mar 2027", dueDays: 0 },
      { unit: "Aurelia Health", output: "Claims platform", people: "P. Deshmukh", money: "₹5.2 Cr", signals: 0, severity: "clear", note: "Ahead of plan", dueDays: 0 },
    ],
    question: "What could take the firm down, and is the model shifting fast enough?",
  },
  {
    key: "manufacturing",
    tab: "Manufacturing",
    org: "Kalyani Industries",
    role: "Chief operating officer",
    pillars: [
      { key: "unit", label: "Plants", value: "12", note: "3 shifts, 4 regions", shared: false, source: "SAP PM" },
      { key: "output", label: "Machines", value: "486", note: "62 critical path", shared: false, source: "MES" },
      { key: "people", label: "Workforce", value: "9,240", note: "1,180 certified operators", shared: true, source: "Workday" },
      { key: "money", label: "Financials", value: "₹4,180 Cr", note: "Group revenue, FY26", shared: true, source: "SAP" },
    ],
    sources: [
      { name: "SAP S/4HANA", kind: "ERP", age: "2 min", writes: 2 },
      { name: "MES", kind: "Shop floor", age: "40 sec", writes: 1 },
      { name: "Maximo", kind: "Maintenance", age: "4 min", writes: 0 },
      { name: "Workday", kind: "HR", age: "6 min", writes: 0 },
    ],
    subject: "Pune Plant 4",
    subjectKind: "Press line 2",
    clock: "Stops in 9 days",
    exposure: "₹38 Cr",
    exposureNote: "Order book exposed to this line",
    signals: [
      { system: "Maintenance", finding: "Press 2 bearing wear past threshold", source: "Maximo", age: "4 min" },
      { system: "Supply", finding: "Spare shipment slipped 6 days", source: "SAP S/4HANA", age: "2 min" },
      { system: "People", finding: "Only certified operator on leave from 14th", source: "Workday", age: "6 min" },
    ],
    headline: "Pune Plant 4 will stop press line 2 inside nine days.",
    action: "Pull forward the maintenance window",
    actionField: "MaintenanceOrder.PlannedStart",
    actionTarget: "SAP PM",
    approver: "Plant director",
    estateTitle: "Exposure by plant",
    estateNote: "12 plants",
    rows: [
      { unit: "Pune Plant 4", output: "Press line 2", people: "S. Bhosale", money: "₹38 Cr", signals: 3, severity: "high", note: "Bearing wear, spare delayed", dueDays: 9 },
      { unit: "Hosur Plant 2", output: "Paint shop", people: "R. Ganesan", money: "₹21 Cr", signals: 2, severity: "watch", note: "Yield down 4 pts", dueDays: 16 },
      { unit: "Jamshedpur 1", output: "Forge line 3", people: "A. Mahato", money: "₹17 Cr", signals: 1, severity: "watch", note: "Scrap rate rising", dueDays: 24 },
      { unit: "Rajkot Plant 6", output: "Assembly A", people: "D. Trivedi", money: "₹12 Cr", signals: 0, severity: "clear", note: "On plan", dueDays: 0 },
      { unit: "Aurangabad 3", output: "Machining", people: "P. Kale", money: "₹9 Cr", signals: 0, severity: "clear", note: "On plan", dueDays: 0 },
    ],
    question: "What stops production, and can we still ship the quarter?",
  },
  {
    key: "retail",
    tab: "Retail",
    org: "Vasant Retail Group",
    role: "Chief operating officer",
    pillars: [
      { key: "unit", label: "Stores", value: "614", note: "9 formats, 21 states", shared: false, source: "POS" },
      { key: "output", label: "SKUs", value: "48,200", note: "1,940 fast movers", shared: false, source: "Blue Yonder" },
      { key: "people", label: "Workforce", value: "18,600", note: "Peak roster from 12 Nov", shared: true, source: "Workday" },
      { key: "money", label: "Financials", value: "₹9,640 Cr", note: "Group revenue, FY26", shared: true, source: "SAP" },
    ],
    sources: [
      { name: "SAP S/4HANA", kind: "ERP", age: "2 min", writes: 2 },
      { name: "Blue Yonder", kind: "Supply", age: "8 min", writes: 1 },
      { name: "POS estate", kind: "Sales", age: "90 sec", writes: 0 },
      { name: "Workday", kind: "HR", age: "6 min", writes: 0 },
    ],
    subject: "West region",
    subjectKind: "62 stores",
    clock: "Peak in 11 days",
    exposure: "₹54 Cr",
    exposureNote: "Peak-week sales at risk",
    signals: [
      { system: "Supply", finding: "Top-20 SKU cover down to 6 days", source: "Blue Yonder", age: "8 min" },
      { system: "Sales", finding: "Stockouts up 3.1 pts week on week", source: "POS estate", age: "90 sec" },
      { system: "People", finding: "Peak roster 214 short in 62 stores", source: "Workday", age: "6 min" },
    ],
    headline: "The West region enters peak 11 days short of stock and staff.",
    action: "Release the buffer allocation to West",
    actionField: "AllocationPlan.Release",
    actionTarget: "Blue Yonder",
    approver: "Supply chain director",
    estateTitle: "Exposure across the estate",
    estateNote: "614 stores",
    rows: [
      { unit: "West region", output: "Top-20 SKUs", people: "214 short", money: "₹54 Cr", signals: 3, severity: "high", note: "Cover 6 days, roster short", dueDays: 11 },
      { unit: "South region", output: "Fresh", people: "48 short", money: "₹31 Cr", signals: 2, severity: "watch", note: "Wastage above plan", dueDays: 18 },
      { unit: "North region", output: "Apparel", people: "Full", money: "₹26 Cr", signals: 1, severity: "watch", note: "Returns rising", dueDays: 26 },
      { unit: "East region", output: "General merch", people: "Full", money: "₹18 Cr", signals: 0, severity: "clear", note: "On plan", dueDays: 0 },
      { unit: "Metro format", output: "Electronics", people: "Full", money: "₹14 Cr", signals: 0, severity: "clear", note: "On plan", dueDays: 0 },
    ],
    question: "Can every store trade through peak, and where will we run out?",
  },
  {
    key: "financial-services",
    tab: "Financial services",
    org: "Sundara Finance",
    role: "Chief risk officer",
    pillars: [
      { key: "unit", label: "Branches", value: "340", note: "18 circles", shared: false, source: "Core banking" },
      { key: "output", label: "Portfolios", value: "26", note: "6 under watch", shared: false, source: "LOS" },
      { key: "people", label: "Workforce", value: "11,400", note: "820 relationship managers", shared: true, source: "Workday" },
      { key: "money", label: "Financials", value: "₹62,000 Cr", note: "Assets under management", shared: true, source: "Oracle" },
    ],
    sources: [
      { name: "Core banking", kind: "Ledger", age: "3 min", writes: 0 },
      { name: "LOS", kind: "Lending", age: "5 min", writes: 2 },
      { name: "Oracle GL", kind: "Finance", age: "2 min", writes: 1 },
      { name: "Workday", kind: "HR", age: "6 min", writes: 0 },
    ],
    subject: "Commercial vehicles book",
    subjectKind: "Portfolio 07",
    clock: "Covenant test in 14 days",
    exposure: "₹1,240 Cr",
    exposureNote: "Exposure in one sector",
    signals: [
      { system: "Lending", finding: "Sector concentration 21%, limit 18%", source: "LOS", age: "5 min" },
      { system: "Ledger", finding: "30-day delinquency up 90 bps", source: "Core banking", age: "3 min" },
      { system: "People", finding: "Circle head resigned, 3 circles uncovered", source: "Workday", age: "6 min" },
    ],
    headline: "The commercial vehicles book breaches its concentration limit before the covenant test.",
    action: "Freeze new sanctions above ₹5 Cr in sector",
    actionField: "CreditPolicy.SectorCap",
    actionTarget: "LOS",
    approver: "Chief risk officer",
    estateTitle: "Exposure by portfolio",
    estateNote: "26 portfolios",
    rows: [
      { unit: "Commercial vehicles", output: "Portfolio 07", people: "Vacant", money: "₹1,240 Cr", signals: 3, severity: "high", note: "Over limit, delinquency up", dueDays: 14 },
      { unit: "Affordable housing", output: "Portfolio 03", people: "K. Menon", money: "₹980 Cr", signals: 2, severity: "watch", note: "Collections slowing", dueDays: 21 },
      { unit: "SME working capital", output: "Portfolio 11", people: "N. Reddy", money: "₹640 Cr", signals: 1, severity: "watch", note: "Utilisation spike", dueDays: 8 },
      { unit: "Gold loans", output: "Portfolio 02", people: "S. Pillai", money: "₹410 Cr", signals: 0, severity: "clear", note: "Within limits", dueDays: 0 },
      { unit: "Personal loans", output: "Portfolio 09", people: "V. Sharma", money: "₹300 Cr", signals: 0, severity: "clear", note: "Within limits", dueDays: 0 },
    ],
    question: "Where is risk concentrating, and will we clear the covenant test?",
  },
];

/* ------------------------------------------------------------------ */
/*  The page document                                                  */
/* ------------------------------------------------------------------ */
/* Every word on /solutions/enterprise-intelligence, in section order. Composer:
   app/solutions/enterprise-intelligence/page.tsx. Two-tone headlines throughout (soft setup,
   ink payoff). Every wireframe is the EVIDENCE for the caption beside it:
   change a claim here and its wireframe must change too. */

export interface EisHeading {
  setup: string;
  payoff: string;
  lede: string;
}

/** Which evidence panel illustrates a capability (demos/mockups/eis/EisCapabilityEvidence). */
export type EisEvidence = "definition" | "entity" | "permissions" | "action" | "planes" | "record";

export interface EisPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  domains: Domain[];
  hero: {
    /** The product's name over the headline, as the Solutions menu names it: "Enterprise Intelligence", nothing more. */
    badge: string;
    title: [string, string];
    /** Typed one after another into the ask bar; one per industry. */
    prompts: string[];
    lede: { lead: string; tail: string };
    /** "Reads" + the source names, for assistive technology. */
    readsLabel: string;
    sources: { label: string; src: string }[];
    primary: Cta;
    secondary: Cta;
    screenUrl: string;
  };
  gap: EisHeading & { conclusion: string; note: string };
  capabilities: EisHeading & {
    bands: { label: string; note: string; items: { lead: string; body: string; evidence: EisEvidence }[] }[];
    pillars?: { tag: string; title: string; body: string; metrics: string[]; evidence: EisEvidence }[];
  };
  onePicture: EisHeading & { estateLede: string; screenUrl: string };
  loop: EisHeading & { cta: Cta };
  pipeline: EisHeading & {
    steps: { number: string; title: string; body: string; modules: string[] }[];
  };
  lenses: EisHeading & { cta: Cta };
  proof: EisHeading & {
    deployments: { key: string; name: string; image: string; line: string; body: string; figures: { value: string; unit: string; label: string }[] }[];
    closing: string;
  };
  faq: {
    title: string;
    lede: string;
    /** The question that starts open. */
    openByDefault: string;
    items?: Faq[];
    bands: { label: string; note: string; items: Faq[] }[];
  };
  close: {
    title: [string, string];
    sessionLabel: string;
    session: string[];
    prompt: string;
    primary: Cta;
    secondary: Cta;
  };
}

export const solutionsEis: EisPage = {
  seo: {
    title: "Enterprise Intelligence",
    description:
      "The executive layer of the Akashic platform. It reads the systems you already run, shows the working behind every figure, and turns an approved decision into an action your systems receive.",
    path: "/solutions/enterprise-intelligence",
  },
  sections: [
    { id: "hero", label: "Enterprise Intelligence" },
    { id: "your-lens", label: "Your lens" },
    { id: "the-gap", label: "The gap" },
    { id: "capabilities", label: "Capabilities" },
    { id: "the-loop", label: "The loop" },
    { id: "proof", label: "Proof" },
    { id: "questions", label: "Questions" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "EIS page sections",
  domains,

  hero: {
    badge: "Enterprise Intelligence",
    title: ["Your whole business.", "Answering for itself."],
    /* Grounded in the four core questions from the executive wireframe */
    prompts: [
      "Will we hit the FY revenue plan, and where is the gap?",
      "Which fixed-price project is slipping into margin compression?",
      "Which customer has overdue receivables and a sponsor change?",
      "How many engineers are on the bench before next month's kickoff?",
    ],
    lede: { lead: "Real-time operating truth and verified leadership decisions,", tail: "connected directly to" },
    readsLabel: "Reads",
    sources: [
      { label: "ERPNext", src: "/universal-context/postgresql.svg" },
      { label: "Salesforce", src: "/universal-context/salesforce.svg" },
      { label: "SAP", src: "/universal-context/sap.svg" },
      { label: "Oracle", src: "/universal-context/oracle.svg" },
    ],
    primary: { label: "See it with your own data", href: "#talk-to-our-team" },
    secondary: { label: "How the loop closes", href: "#the-loop" },
    screenUrl: "akashic.dhira.ai/enterprise-intelligence",
  },

  gap: {
    setup: "Monthly packs arrive weeks late.",
    payoff: "Operational risks compound in silence.",
    lede: "Disconnected departmental tools hide margin slip until month-end. Akashic EIS correlates delivery, pipeline, and cash flow into a continuous runway before deadlines expire.",
    conclusion: "The true cost to an enterprise is the latency between an operational shift and leadership having the verified context to intervene.",
    note: "Enterprise decision latency benchmark.",
  },

  capabilities: {
    setup: "A figure you can defend.",
    payoff: "An action you can reverse.",
    lede: "Deterministic metric definitions, continuous risk correlation, and dual-key human sign-off ensure every figure is verified and every operational action is audited.",
    pillars: [
      {
        tag: "Foundation",
        title: "One Governed Golden Record",
        body: "Master data continuously reconciles customers, workforce, and multi-entity projects across ERPNext, Salesforce, and Workday with strict row-level security before computation.",
        metrics: ["Single Golden Record", "Row-Level Governance", "Full Data Lineage"],
        evidence: "entity",
      },
      {
        tag: "Intelligence",
        title: "Continuous Predictive Signals",
        body: "Autonomous background agents monitor delivery milestones, payment ageing, and bench allocation, surfacing margin compression risks 30 days before month-end.",
        metrics: ["Rolling 12M Forecast", "Early Margin Detection", "Cross-Silo Alerts"],
        evidence: "definition",
      },
      {
        tag: "Execution",
        title: "Governed Human-in-the-Loop Action",
        body: "Decisions are structured, policy-checked interventions with segregated duties. Once approved by the designated executive, verified updates commit directly to systems of record with a complete audit trail.",
        metrics: ["Human Authorisation", "Zero Hallucinated SQL", "Defensible Audit Trail"],
        evidence: "record",
      },
    ],
    bands: [
      {
        label: "Before you believe the figure",
        note: "Everything that has to hold before a figure is worth acting on.",
        items: [
          { lead: "Arguments end at the definition.", body: "When two teams produce two revenue numbers, the dispute is never the query. It is whether deferred revenue is recognized, and which entities were consolidated.", evidence: "definition" },
          { lead: "One golden record across ERPNext.", body: "Master data resolves customers, people, and projects across Selling, Projects, HRMS, and Accounts into one verified entity with zero manual crosswalking.", evidence: "entity" },
          { lead: "Permissions enforced before computation.", body: "Row-level security ensures leaders see only what they are accountable for. The CEO sees the full company; Delivery leads see their projects; HR sees people; Finance sees P&L.", evidence: "permissions" },
        ],
      },
      {
        label: "After you decide",
        note: "Everything that has to hold once a decision leaves the screen.",
        items: [
          { lead: "A decision is a typed, scoped action.", body: "Not an email. A concrete action with a named owner and quantified impact, written by a scoped service principal into ERPNext.", evidence: "action" },
          { lead: "Autonomous signals, human sign-off.", body: "Agents watch the knowledge graph for margin compression, overdue AR, and bench build-up, proposing interventions for human approval before execution.", evidence: "planes" },
          { lead: "Immutable four-stage audit trail.", body: "Every action follows consent check, live ERPNext re-read, human approval, and an immutable log written back through the ERPNext REST API.", evidence: "record" },
        ],
      },
    ],
  },

  onePicture: {
    setup: "The columns rebuild.",
    payoff: "Not just the numbers.",
    lede: "Every organisation runs on people and money. What changes is the unit you operate and the thing it produces. Two pillars are the same in every industry, and two of them are the industry.",
    estateLede: "Your whole estate, ranked by what needs you. Pick a row and it resolves across all four pillars at once.",
    screenUrl: "akashic.dhira.ai/enterprise-intelligence/estate",
  },

  loop: {
    setup: "Observation alone",
    payoff: "solves nothing.",
    lede: "Passive dashboards leave teams chasing updates over email. Akashic EIS closes the loop by detecting risks, staging verified interventions, and updating systems upon approval.",
    cta: { label: "Bring us a decision you cannot close", href: "#talk-to-our-team" },
  },

  pipeline: {
    setup: "One save in your ERP.",
    payoff: "A decision in minutes.",
    lede: "Most intelligence platforms snap a photo of your data and let it age. Akashic EIS reads every committed change as it happens, resolves it against one governed record, and keeps the executive picture current without a refresh.",
    steps: [
      {
        number: "System of record",
        title: "ERPNext",
        body: "Selling, Projects, HRMS and Accounts stay the system of record. Nothing is ripped or replaced.",
        modules: ["ERPNext"],
      },
      {
        number: "Step 01",
        title: "Capture",
        body: "Debezium reads every committed change the moment it is written. Nothing is keyed in twice.",
        modules: ["Data Pipelines"],
      },
      {
        number: "Step 02",
        title: "Resolve",
        body: "One golden record per customer, person and project, with a crosswalk to every source system ID.",
        modules: ["Master Data"],
      },
      {
        number: "Step 03",
        title: "Connect",
        body: "The knowledge layer links people, tasks, milestones, invoices and contracts into one navigable graph.",
        modules: ["Knowledge layer"],
      },
      {
        number: "Step 04",
        title: "Forecast",
        body: "Warehouse facts feed the rolling 12-month model and every 360 view. Assumptions are adjustable.",
        modules: ["Data Warehouse", "Business Intelligence"],
      },
      {
        number: "Step 05",
        title: "Act",
        body: "Agents explain what changed and propose scoped actions. People approve them. The record never goes dark.",
        modules: ["AI agents", "Workflow management"],
      },
    ],
  },

  lenses: {
    setup: "Five executive roles.",
    payoff: "One ground truth.",
    lede: "Role-tailored cockpits give the CEO, Finance, Delivery, Sales, and People leaders the same live, governed numbers. Decisions move in minutes instead of quarterly reviews.",
    cta: { label: "Talk to our team", href: "#talk-to-our-team" },
  },

  /* Figures as on the public record (Rule 4); see the customer stories collection. */
  proof: {
    setup: "Proven at sovereign scale.",
    payoff: "Ready for enterprise complexity.",
    lede: "The underlying Akashic architecture powers live national registries handling billions of transactions across millions of verified records.",
    deployments: [
      {
        key: "education",
        name: "National Learning Platform",
        image: "/proof/learning.jpg",
        line: "Every state's learning data, read as one picture.",
        body: "Transaction logs from every state resolve into one governed model, so programme owners can read curriculum efficacy and where resources are going.",
        figures: [
          { value: "5.75", unit: "B+", label: "Learning interactions unified" },
          { value: "187", unit: "M+", label: "Enrolments resolved" },
        ],
      },
      {
        key: "mobility",
        name: "Overseas Employment Registry",
        image: "/proof/mobility.jpg",
        line: "Every clearance and recruiter in one auditable view.",
        body: "Visa clearances, immigration logs and overseas employer records resolve into one governed view, with the figures as they stood on any given day.",
        figures: [
          { value: "4", unit: "M+", label: "Worker clearances reconciled" },
          { value: "282", unit: "K+", label: "Employer profiles resolved" },
        ],
      },
      {
        key: "health",
        name: "National Immunisation Registry",
        image: "/proof/vaccination.jpg",
        line: "Every dose reconciled into one public figure.",
        body: "Doses, sessions and coverage reconcile into the figures health authorities publish, each one traceable back to the system it came from.",
        figures: [
          { value: "2", unit: "B+", label: "Dose records reconciled" },
          { value: "26", unit: "M+", label: "Vaccination sessions reconciled" },
        ],
      },
    ],
    closing: "Reconciling billions of national records and managing multi-entity global enterprises require the same standard: deterministic, zero-defect governance.",
  },

  faq: {
    title: "Frequently asked questions.",
    lede: "Direct answers to the architectural, security, and operational questions executive leadership asks before deployment.",
    /* Opened by default: the page makes both claims and they sound
       contradictory until the two planes are separated. */
    openByDefault: "Does EIS replace my ERP?",
    items: [
      {
        question: "Does EIS replace my ERP?",
        answer: "No. Akashic EIS sits on top of the systems you already run. It reads ERPNext, Salesforce, SAP, and Workday, connects what they each hold about the same account, and surfaces what matters. No rip and replace, no migration, no downtime.",
      },
      {
        question: "You say read-only, then you say it writes to my ERP. Which is it?",
        answer: "Both, on two separate paths. Ingestion is strictly read-only across every connected system and never mutates a source record. Write-back is a deliberately short list of named actions you define during implementation: a specific field executed by a scoped service principal behind explicit human approval with an idempotency key. Without that approval, the system stays 100% read-only.",
      },
      {
        question: "How is your answer engine different from asking an AI chatbot?",
        answer: "It does not write SQL against your raw tables. Questions resolve against the governed metric layer, so a question can only be answered in terms that have already been defined, tested, and permissioned. If a metric does not exist, EIS says so rather than inventing a plausible number. Every answer shows its working.",
      },
      {
        question: "Who can see what, and who can approve what?",
        answer: "Akashic Governance decides. Access control, lineage, audit trail, and data residency sit under every screen. Approval rights are held separately from composition rights, so the person who composes an action cannot be the person who approves it. That segregation of duties is what makes the audit trail defensible.",
      },
      {
        question: "What do you need from us to get started?",
        answer: "Two things, and it is fair to know them upfront. Someone has to own the metric definitions, because a governed number is an organisational decision, not an engineering assumption. And for each write-back action you want, someone with authority over that system has to approve the scope.",
      },
    ],
    bands: [
      {
        label: "What it is",
        note: "Where EIS sits, and what it needs from you.",
        items: [
          {
            question: "Does EIS replace my ERP?",
            answer: "No. Akashic EIS sits on top of the systems you already run. It reads them, connects what they each hold about the same account, and surfaces what matters. No rip and replace, no migration, no downtime.",
          },
          {
            question: "What is EIS built on?",
            answer: "Akashic. The connectors that read your systems, the master data that resolves them into one record, the metric layer that makes revenue mean one thing in every region, the answer engine that cites its sources, and the governance layer that keeps the record of what was done. If Akashic is already in place, EIS is the layer above it, not a second platform.",
          },
          {
            /* Executives ask this before anything else, and every vendor dodges. */
            question: "What do you need from us?",
            answer: "Two things, and it is fair to know them upfront. Someone has to own the metric definitions, because a governed number is a decision your organisation makes, not one we can make for you. And for each write-back action you want, someone with authority over that system has to agree to the scope. Read-only reporting can start well before either is finished. Write-back should not.",
          },
        ],
      },
      {
        label: "Whether you can trust a figure",
        note: "What is under the number when somebody disputes it.",
        items: [
          {
            question: "How do I know a figure is right?",
            answer: "Click it. What opens is not a query string, because the query is never what people argue about. It is the metric definition, which entities are consolidated, whether intercompany is eliminated, the FX rate date, the as-at timestamp, which data quality tests passed, and the underlying records. When three teams produce three different revenue numbers, one of those lines is the reason, and this is where you find it.",
          },
          {
            /* The distinction that stops us being the villain from [the-gap]. */
            question: "How is your answer engine different from asking an AI chatbot?",
            answer: "It does not write SQL against your raw tables. Questions resolve against the governed metric layer, so a question can only be answered in terms that have already been defined, tested, and permissioned. If a metric does not exist, EIS says so rather than inventing a plausible number. And because every answer is assembled from defined metrics, every answer can show its working. An ungoverned chatbot cannot do that, which is why it is fast and untrustworthy at the same time.",
          },
          {
            question: "Who can see what, and who can approve what?",
            answer: "Akashic Governance decides. Access control, lineage, audit trail, and data residency sit under every screen. Approval rights are held separately from composition rights, so the person who composes an action cannot be the person who approves it. That segregation of duties is what makes the audit trail worth having.",
          },
        ],
      },
      {
        label: "What it does to your systems",
        note: "The part your CIO will want in writing.",
        items: [
          {
            /* Opened by default: the page makes both claims and they sound
               contradictory until the two planes are separated. */
            question: "You say read-only, then you say it writes to my ERP. Which is it?",
            answer: "Both, on two separate paths. Ingestion is read-only across every connected system and never mutates a source record, which is the part that carries risk at scale. Write-back is a deliberately short list of named actions you define during implementation: a specific field on a specific object, executed by a scoped service principal with least privilege, behind an approval, with an idempotency key so approving twice cannot write twice. A system with no write actions configured stays read-only in every sense. You choose which systems leave that state.",
          },
          {
            question: "What happens when a write-back fails?",
            answer: "It is recorded as a failure with the reason and the target system, the decision is held rather than silently retried, and the owner of the blocking system is notified. Nothing disappears. An action that was rejected is a finding about your permissions model, and you want to see it, not have it quietly repeated until it succeeds.",
          },
          {
            question: "Where does my data live, and where does it compute?",
            answer: "Your records stay in the systems that own them. Where you already run a warehouse, we push computation down to it rather than copying data out. Deploy on cloud, on premises, or hybrid, wherever your architecture already lives, including data residency boundaries you have to honour by law.",
          },
        ],
      },
    ],
  },

  close: {
    title: ["See it with", "your own numbers."],
    sessionLabel: "Thirty minutes, on a dataset shaped like yours",
    session: [
      "Your enterprise systems mapped. What Akashic EIS connects to on day one, without migration or downtime.",
      "One high-stakes operational decision your team cannot currently close, traced from signal to verified action.",
      "Security, access boundaries, and human sign-off policies required by your leadership.",
    ],
    prompt: "Bring the question you currently cannot get answered by Friday.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See the Akashic platform", href: "/akashic" },
  },
};
