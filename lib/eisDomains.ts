/*
 * The industry model behind every wireframe on /solutions/eis.
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

export const DOMAINS: Domain[] = [
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

export const DEFAULT_DOMAIN = DOMAINS[0];

export function getDomain(key: string): Domain {
  return DOMAINS.find((d) => d.key === key) ?? DEFAULT_DOMAIN;
}

/* Severity drives colour in every EIS wireframe. Kept here so a row, a tile
   and a chart bar cannot drift apart. */
export const SEVERITY = {
  high: { dot: "#C13059", text: "#C13059", bg: "#FDF0F3", border: "#F5D4DC", label: "Act now" },
  watch: { dot: "#E0A93B", text: "#9A6F14", bg: "#FDF7EC", border: "#F0E0C0", label: "Watch" },
  clear: { dot: "#1F9D6B", text: "#1B8A5F", bg: "#EAF7F0", border: "#CBE8D9", label: "Clear" },
} as const;
