import type { Cta, Faq, PageSection, Seo } from "../types";

/*
 * The industry model behind every wireframe on /solutions/eis (the hero's
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
];

/* ------------------------------------------------------------------ */
/*  The page document                                                  */
/* ------------------------------------------------------------------ */
/* Every word on /solutions/eis, in section order. Composer:
   app/solutions/eis/page.tsx. Two-tone headlines throughout (soft setup,
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
  };
  onePicture: EisHeading & { estateLede: string; screenUrl: string };
  loop: EisHeading & { cta: Cta };
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
    title: "Akashic EIS Solution",
    description:
      "The executive layer of the Akashic platform. It reads the systems you already run, shows the working behind every figure, and turns an approved decision into an action your systems receive.",
    path: "/solutions/eis",
  },
  sections: [
    { id: "hero", label: "Akashic EIS" },
    { id: "the-gap", label: "The gap" },
    { id: "capabilities", label: "Capabilities" },
    { id: "one-picture", label: "One picture" },
    { id: "the-loop", label: "The loop" },
    { id: "your-lens", label: "Your lens" },
    { id: "proof", label: "Proof" },
    { id: "questions", label: "Questions" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "EIS page sections",
  domains,

  hero: {
    title: ["Your whole business.", "Answering for itself."],
    /* Four different industries, so a plant director and a retail COO both
       see themselves in the first thing that types itself on this page. */
    prompts: [
      "Which plant stops production first, and why?",
      "Where will we run out of stock before peak?",
      "Which portfolio is closest to breaching its limit?",
      "What could take the firm down this quarter?",
    ],
    lede: { lead: "Intelligence and action for whatever you run,", tail: "read live from" },
    readsLabel: "Reads",
    sources: [
      { label: "SAP", src: "/universal-context/sap.svg" },
      { label: "Salesforce", src: "/universal-context/salesforce.svg" },
      { label: "Oracle", src: "/universal-context/oracle.svg" },
      { label: "PostgreSQL", src: "/universal-context/postgresql.svg" },
    ],
    primary: { label: "See it with your own data", href: "#talk-to-our-team" },
    secondary: { label: "How the loop closes", href: "#the-loop" },
    screenUrl: "akashic.dhira.ai/eis",
  },

  gap: {
    setup: "The number was ready at 06:00.",
    payoff: "The decision took twenty-six days.",
    lede: "Nobody is short of reporting. What is short is the distance between a figure moving and someone acting on it. Here is one morning at one plant, run three ways.",
    conclusion: "The gap is not a reporting problem. It is the distance from the figure to the decision, and it is measured in days.",
    note: "An illustration, using the demonstration plant shown above.",
  },

  capabilities: {
    setup: "A figure you can defend.",
    payoff: "An action you can reverse.",
    lede: "Six capabilities, in the order an executive meets them. Each one is shown with the evidence it produces, not described.",
    bands: [
      {
        label: "Before you believe it",
        note: "Everything that has to hold before a figure is worth acting on.",
        items: [
          { lead: "Arguments end at the definition.", body: "When two teams produce two numbers, the dispute is never the query. It is what counts as like-for-like, and which stores were excluded.", evidence: "definition" },
          { lead: "Three spellings, one obligor.", body: "Master data decides that three limits in three systems are the same borrower, and shows how sure it is. Concentration you could not see becomes ₹86 Cr you can.", evidence: "entity" },
          { lead: "Your permissions come with the answer.", body: "Entitlements are applied before the figure is computed, not hidden after. Two people ask the same question and get two correct answers.", evidence: "permissions" },
        ],
      },
      {
        label: "After you decide",
        note: "Everything that has to hold once a decision leaves the screen.",
        items: [
          { lead: "A decision is a typed action.", body: "Not an email. A named field on a named object, written by a scoped service principal, with a key so approving twice cannot write twice.", evidence: "action" },
          { lead: "Read everything. Write almost nothing.", body: "Ingestion is read-only across every system. Write-back is a short, per-system list of named actions, each one approved and reversible.", evidence: "planes" },
          { lead: "Failures are logged too.", body: "A rejected write is a finding, not a silence. It stays in the record with what blocked it and who was told, and it is never quietly retried.", evidence: "record" },
        ],
      },
    ],
  },

  onePicture: {
    setup: "The columns rebuild.",
    payoff: "Not just the numbers.",
    lede: "Every organisation runs on people and money. What changes is the unit you operate and the thing it produces. Two pillars are the same in every industry, and two of them are the industry.",
    estateLede: "Your whole estate, ranked by what needs you. Pick a row and it resolves across all four pillars at once.",
    screenUrl: "akashic.dhira.ai/eis/estate",
  },

  loop: {
    setup: "Reading the business",
    payoff: "is half the job.",
    lede: "Executive information systems got the ambition right in the 1980s and the technology wrong. The screens could not read the systems, so someone rekeyed the numbers by hand, and nothing on the screen could act. Both of those are now solved problems.",
    cta: { label: "Bring us a decision you cannot close", href: "#talk-to-our-team" },
  },

  lenses: {
    setup: "Same record.",
    payoff: "Different first screen.",
    lede: "EIS is one system running three operating loops, not one dashboard that everybody filters down to the fifth of it that concerns them. Same governed record underneath all three. What changes is which question the screen opens with.",
    cta: { label: "Talk to our team", href: "#talk-to-our-team" },
  },

  /* Figures as on the public record (Rule 4); see the customer stories collection. */
  proof: {
    setup: "If it reconciles a country,",
    payoff: "it will reconcile your business units.",
    lede: "Not pilots. Three systems in production at country scale, on the public record. The team that built Akashic runs them.",
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
    closing: "Akashic EIS is the executive layer on that same governed foundation. Reconciling every dose in a country into one published figure and reconciling twelve plants into one morning brief are the same problem at different sizes.",
  },

  faq: {
    title: "Questions.",
    lede: "The nine an executive actually asks, grouped the way a buyer works through them. Answered in full, including the two things we need from you.",
    /* Opened by default: the page makes both claims and they sound
       contradictory until the two planes are separated. */
    openByDefault: "You say read-only, then you say it writes to my ERP. Which is it?",
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
      "Your systems, named. What EIS would read on day one, and what it would not.",
      "One decision you cannot currently close, walked from signal to write-back.",
      "What write-back would need from the people who own those systems.",
    ],
    prompt: "Bring the question you currently cannot get answered by Friday.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See the Akashic platform", href: "/akashic" },
  },
};
