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

/** [01] The decision gap, drawn as swimlanes over one month
    (features/solutions/EisGap). One client's lifecycle crosses three
    department systems; each holds one piece. Department reporting brings
    the pieces together at month-end; Enterprise Intelligence on day 0.
    Days run from 0 to `horizon`; every `day` below is on that scale. The
    sample client continues the story from [01]'s cockpit. */
export interface EisGapBoard {
  /** The whole drawing in one sentence, for assistive technology. */
  label: string;
  client: string;
  clientNote: string;
  scenario: string;
  legend: { department: string; intelligence: string };
  horizon: number;
  /** Day ticks; `note` names what happens that day. */
  ruler: { day: number; label: string; note?: string; tone?: "deadline" | "muted" }[];
  columns: { department: string; piece: string };
  lanes: { department: string; system: string; signal: string; seenBy: string }[];
  leadership: { name: string; note: string };
  /** What Enterprise Intelligence puts in front of leadership on day 0. */
  risk: { stamp: string; title: string; body: string };
  deadline: number;
  /** The monthly pack: where department reporting first shows all three. */
  pack: { day: number; title: string; note: string };
  runway: { label: string; act: string; late: string };
}

/** [02] One picture (features/solutions/EisOnePicture): one client at the
    centre, the records that touch it around it, one family per department.
    The sample client continues [01]'s story; every record is from the
    sample business in the teaser videos and the role cockpits. */
export interface EisOnePictureFigure {
  question: string;
  centre: { name: string; note: string };
  answer: string;
  /** The one chain drawn across departments, and the key to the two kinds of line. */
  chain: string;
  legend: { chain: string; client: string };
  families: {
    key: "sales" | "work" | "people" | "money";
    name: string;
    source: string;
    /** The first record sits nearest the client; the second, one link further out. */
    records: [{ title: string; detail: string }, { title: string; detail: string }];
  }[];
}

/** [04] Your Monday (features/solutions/EisMonday): every change since
    Friday as a field of dots, three of them flowing into the three
    decisions that need a leader, ranked by money at stake. Agentic, so the
    section carries PreviewTag. Figures are the sample business's, as in the
    "Monday, 8 a.m." teaser video. */
export interface EisMonday {
  /** The field: one dot per change since Friday, in one band per live
      system. `rows` of 62 dots each; the rows add up to 39 (2,418 dots). */
  field: { legend: string; bands: { system: string; rows: number }[] };
  inboxLabel: string;
  columns: { rank: string; due: string };
  decisions: {
    /** The systems this decision's facts come from, as band indexes. */
    bands: [number, number, number];
    path: string[];
    title: string;
    stake: string;
    /** Money at stake in dollars, for the bar beside it. */
    amount: number;
    due: string;
  }[];
  /** The first decision, opened. */
  open: {
    factsLabel: string;
    found: string;
    facts: string[];
    actionLabel: string;
    action: string;
    impact: string;
    actions: { primary: string; others: string[] };
  };
  coda: { lead: string; payoff: string };
}

/** [05] Every leader (features/solutions/EisLeaders): five seats, one per
    role, in the homepage's outcome-card form: the role, the plain question
    it brings, one legible answer with its outcome in blue, a hairline
    drawing and a mono source line. All five hang from one spine: the same
    records. Figures are the sample business's (the role cockpits and the
    Monday story). */
export interface EisLeaderSeat {
  role: string;
  question: string;
  answer: string;
  outcome: string;
  source: string;
  drawing: "forecast" | "ageing" | "renewals" | "projects" | "seats";
}

/** [06] Trust (features/solutions/EisTrust): the headline's two halves as
    two drawings. Left, one figure from [02] opened like a receipt: its
    definition, its source records, how fresh it is, the checks it passed.
    Right, the route a proposal takes before anything changes. Then three
    promises. Every claim is one the FAQ already makes. */
export interface EisTrust {
  receipt: {
    label: string;
    value: string;
    subject: string;
    rows: { key: string; value: string }[];
    /** Where the figure's value comes from, and the signals that made it a risk. */
    valueLabel: string;
    valueFrom: { system: string; record: string };
    signalsLabel: string;
    signals: { system: string; record: string }[];
    footnote: string;
  };
  /** Agentic end to end, so the label carries PreviewTag. */
  route: { label: string; steps: { title: string; detail: string }[] };
  link: Cta;
}

export interface EisTeaserItem {
  id: string;
  number: string;
  meta: string;
  duration: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  label: string;
}

export interface EisPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  domains: Domain[];
  hero: {
    /** The product's name over the headline, as the Solutions menu names it: "Enterprise Intelligence", nothing more. */
    badge: string;
    title: [string, string];
    /** Typed one after another into the ask bar, each under its topic tag.
        `story` is the id of its story in [03]; the bar links there.
        `answer` lands under the bar once the question is typed: one sample
        figure from that story's footage. `preview` marks agentic work. */
    prompts: { tag: string; question: string; story: string; answer: { outcome: string; source: string }; preview?: boolean }[];
    /** What the ask bar's pause control stops, for its accessible name ("Pause the example questions"). */
    motionLabel: string;
    /** The ask bar's accessible name, before the question: it opens that story in [03]. */
    askLabel: string;
    /** Under the ask bar: what every answer rests on, and which connector is live. */
    connectorsNote: string;
    /** Under the hero: one outcome each, a mono label over one sentence. */
    outcomes: { label: string; body: string }[];
    lede: string;
    primary: Cta;
    secondary: Cta;
    screenUrl: string;
  };
  gap: EisHeading & {
    board: EisGapBoard;
    /** The industry figures under the drawing: real and sourced (Rule 4). */
    research: {
      title: string;
      stats: { value: string; label: string; citation: string }[];
    };
    coda: { lead: string; payoff: string };
  };
  teasers?: EisHeading & {
    /** The play button over each story, and its label once a story has ended. */
    playLabel: string;
    replayLabel: string;
    items: EisTeaserItem[];
  };
  onePicture: EisHeading & { figure: EisOnePictureFigure; views: { label: string; items: string[] }; note: string };
  monday: EisHeading & EisMonday;
  leaders: EisHeading & { seats: EisLeaderSeat[]; spine: string };
  trust: EisHeading & EisTrust;
  faq: {
    title: string;
    /** The two-tone headline of the shared FAQ section. */
    setup: string;
    payoff: string;
    lede: string;
    /** The section's one onward link. */
    link: Cta;
    /** The question that starts open. */
    openByDefault: string;
    items?: Faq[];
    bands: { label: string; note: string; items: Faq[] }[];
  };
  close: {
    title: [string, string];
    sessionLabel: string;
    prompt: string;
    primary: Cta;
    timeline?: {
      duration: string;
      label: string;
    }[];
    footnote?: string;
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
    { id: "the-gap", label: "The gap" },
    { id: "one-picture", label: "One picture" },
    { id: "use-cases", label: "Four stories" },
    { id: "your-monday", label: "Your Monday" },
    { id: "every-leader", label: "Every leader" },
    { id: "trust", label: "Trust" },
    { id: "questions", label: "Questions" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "Enterprise Intelligence page sections",
  domains,

  hero: {
    badge: "Enterprise Intelligence",
    /* 5 Nov 2026 critique: "Every hour." contradicted the lede ("as it
       changes") and the receipt ("two minutes ago"). One sentence across
       the two tones; the payoff is the decision runway of [01]. */
    title: ["See where your business will land", "in time to act."],
    /* The four questions are the four stories in [03], in the same order,
       short enough to sit whole in the ask bar (5 Nov 2026: the old ones
       were cut off). Tags are the stories' own topics. */
    prompts: [
      {
        tag: "People and projects",
        question: "Someone asks for five days off. What breaks?",
        story: "leave",
        answer: { outcome: "A client milestone slips. $84,000 of October revenue at risk.", source: "Project tool and accounting" },
      },
      {
        tag: "Cloud costs",
        question: "A GPU node, requested on Friday. What will it cost?",
        story: "cloud",
        answer: { outcome: "$734 over 30 days, absorbed by a fixed-price project.", source: "Cloud billing and the project tool" },
      },
      {
        tag: "What-if",
        question: "What if our biggest deal slips a quarter?",
        story: "whatif",
        answer: { outcome: "Next 12 months: revenue down $98,300, EBITDA down $96,600.", source: "Rolling 12-month forecast" },
      },
      {
        tag: "Monday morning",
        question: "Monday, 8 a.m. What needs me?",
        story: "actions",
        answer: { outcome: "Three decisions this week, ranked by money at stake.", source: "Agents, reading every change" },
        preview: true,
      },
    ],
    motionLabel: "the example questions",
    askLabel: "Watch the story",
    /* 5 Nov 2026 (user): no vendor names on this page. Systems are named by
       role (CRM, project tool, accounting, HR system, cloud billing), so the
       page reads as connecting to the organisation's own systems. Never
       name a specific vendor as connected live (Salesforce, SAP, Oracle). */
    connectorsNote: "Every answer traces to its record · Works with the systems you already run",
    lede: "Each decision touches customers, projects, people and cash. Enterprise Intelligence reads your business systems as they change, so every leader works from the same live figures.",
    /* The first step is a 30-minute demo; your own data comes with the
       3-week diagnostic (see close.timeline), so the button names the demo. */
    primary: { label: "Book a 30-minute demo", href: "#talk-to-our-team" },
    secondary: { label: "Watch four 30-second stories", href: "#use-cases" },
    screenUrl: "akashic.dhira.ai/enterprise-intelligence",
    /* Plain promises the page itself goes on to show: [01], [05], [03], [06]. */
    outcomes: [
      { label: "Today's picture", body: "The picture moves with your systems, not the monthly pack." },
      { label: "One set of figures", body: "Each leader reads the same figures, traced to the record." },
      { label: "See impact first", body: "Know what a leave, a deal or a cloud request will change." },
      { label: "Records stay put", body: "No system changes without your approval." },
    ],
  },

  gap: {
    setup: "Your company runs as lifecycles.",
    payoff: "Your tools run as departments.",
    /* Redesigned 4 Nov 2026 (user: the old timeline felt rudimentary). The
       idea in one drawing: the three pieces of one client's trouble exist on
       day 0, but each sits in a different department's system. Reporting
       joins them at month-end, after the renewal notice has closed;
       Enterprise Intelligence joins them that morning. */
    lede: "Each department's system holds one piece of a client. Enterprise Intelligence joins the pieces the morning a risk starts, not at month-end.",
    board: {
      label:
        "One client, Northwind Insurance, across one month. Sales sees the renewal's sponsor resign, Delivery sees the Claims Engine project three weeks late, and Finance sees an invoice 74 days overdue. Department reporting puts the three together in the monthly pack on day 26, seventeen days after the renewal notice closed on day 9. Enterprise Intelligence puts them together on day 0, leaving nine days to act.",
      client: "Northwind Insurance",
      clientNote: "One client, seen by three departments",
      scenario: "Illustrative scenario",
      legend: { department: "Department reporting", intelligence: "Enterprise Intelligence" },
      horizon: 30,
      ruler: [
        { day: 0, label: "Day 0" },
        { day: 9, label: "Day 9", note: "Renewal notice closes", tone: "deadline" },
        { day: 26, label: "Day 26", note: "Month-end" },
        { day: 30, label: "Day 30", tone: "muted" },
      ],
      columns: { department: "Department", piece: "What its system shows" },
      lanes: [
        { department: "Sales", system: "CRM", signal: "The renewal's sponsor resigns", seenBy: "Seen by the account manager" },
        { department: "Delivery", system: "Project tool", signal: "Claims Engine three weeks late", seenBy: "Seen by the project lead" },
        { department: "Finance", system: "Accounting", signal: "An invoice 74 days overdue", seenBy: "Seen by collections" },
      ],
      leadership: { name: "Leadership", note: "When they find out" },
      risk: {
        stamp: "Day 0 · Enterprise Intelligence",
        title: "Northwind renewal at risk",
        body: "$180,000 a year, and three systems agree.",
      },
      deadline: 9,
      pack: { day: 26, title: "The monthly pack", note: "All three on one page" },
      runway: { label: "Decision runway", act: "9 days to act", late: "Seen 17 days too late" },
    },
    research: {
      /* Not "Most": the figures below are 45 to 46 per cent, not a majority. */
      title: "Finance teams still close this gap by hand.",
      stats: [
        {
          value: "46%",
          label: "of financial planning time goes to collecting and validating data.",
          citation: "FP&A Trends Survey 2025",
        },
        {
          value: "45%",
          label: "of organisations still do most of their planning in spreadsheets.",
          citation: "FP&A Trends Survey 2025",
        },
        {
          value: "29%",
          label: "of teams take more than 10 days to produce a forecast.",
          citation: "FP&A Trends Survey 2025",
        },
        {
          value: "~15%",
          label: "of chargeable consulting work is never billed to clients.",
          citation: "TIQ and London Business School, 2016",
        },
      ],
    },
    coda: { lead: "The risk was visible on day 0.", payoff: "The pack showed it on day 26." },
  },

  teasers: {
    setup: "See the impact",
    payoff: "before anyone commits.",
    lede: "Four everyday decisions, and what each one moves elsewhere in the business.",
    playLabel: "Play",
    replayLabel: "Watch again",
    items: [
      {
        id: "leave",
        number: "01",
        meta: "People, projects and revenue",
        duration: "0:29 · voice-over",
        title: "One leave. Four lifecycles.",
        description:
          "Someone asks for five days off. What does it put at risk, and who finds out before it is approved?",
        videoSrc: "/solutions/enterprise-intelligence/aei-teaser-leave-720.mp4",
        posterSrc: "/solutions/enterprise-intelligence/poster-leave.webp",
        label: "Teaser video: one leave touching four lifecycles",
      },
      {
        id: "cloud",
        number: "02",
        meta: "Cloud operations and FinOps",
        duration: "0:30 · voice-over",
        title: "Know the cost before anyone creates it.",
        description:
          "A GPU node, requested on a Friday. What will it cost, which budget does it hit, and can the client be billed?",
        videoSrc: "/solutions/enterprise-intelligence/aei-teaser-cloud-720.mp4",
        posterSrc: "/solutions/enterprise-intelligence/poster-cloud.webp",
        label: "Teaser video: Cloud Ops and FinOps idle resource detection",
      },
      {
        id: "whatif",
        number: "03",
        meta: "What-if",
        duration: "0:29 · voice-over",
        title: "What if your biggest deal slips a quarter?",
        description:
          "And a key client does not renew? See the year move before it happens, not in a spreadsheet over the weekend.",
        videoSrc: "/solutions/enterprise-intelligence/aei-teaser-whatif-720.mp4",
        posterSrc: "/solutions/enterprise-intelligence/poster-whatif.webp",
        label: "Teaser video: interactive what-if modelling on rolling 12-month forecast",
      },
      {
        id: "actions",
        number: "04",
        meta: "Today and this week",
        duration: "0:29 · voice-over",
        title: "Monday, 8 a.m. What needs you?",
        description:
          "Thousands of changes since Friday. A handful need a decision from you. Enterprise Intelligence knows which ones, and why.",
        videoSrc: "/solutions/enterprise-intelligence/aei-teaser-actions-720.mp4",
        posterSrc: "/solutions/enterprise-intelligence/poster-actions.webp",
        label: "Teaser video: prioritised morning action list ranked by exposure",
      },
    ],
  },

  /* [02] Written 5 Nov 2026 (docs/EIS_PAGE_SCRIPT.md): the page never said
     what Enterprise Intelligence is. This section does, in the hub's own
     words, and shows the one client from [01] whole. */
  onePicture: {
    setup: "Ask about one client",
    payoff: "and see everything it touches.",
    lede: "Enterprise Intelligence does the work of financial planning and management reporting. It reads your systems as records change and follows every link across people, work and money.",
    figure: {
      question: "How exposed are we to Northwind Insurance?",
      centre: { name: "Northwind Insurance", note: "Client · claims programme" },
      answer: "$180,000 renewal · $118,000 overdue · $84,000 of forecast",
      chain: "One leave delays a milestone, the milestone moves the forecast, and the forecast puts a renewal at risk: four departments, one chain.",
      legend: { chain: "One chain across departments", client: "Linked to the client" },
      /* Families in the order of the chain (people, delivery, finance,
         sales); each family's first record is a link in it. Sources are
         named by role, never by vendor (5 Nov 2026, user). */
      families: [
        {
          key: "people",
          name: "People",
          source: "HR system",
          records: [
            { title: "Karthik Iyer on leave", detail: "Lead engineer, 26 to 30 October" },
            { title: "Five engineers free", detail: "On the bench from 20 October" },
          ],
        },
        {
          key: "work",
          name: "Delivery",
          source: "Project tool",
          records: [
            { title: "Claims Engine slips", detail: "Project P-104, three weeks late" },
            { title: "Change request 07", detail: "Scope in dispute" },
          ],
        },
        {
          key: "money",
          name: "Finance",
          source: "Accounting",
          records: [
            { title: "Forecast down $84,000", detail: "October milestone not invoiced" },
            { title: "Invoice 74 days overdue", detail: "$118,000, invoice 8942" },
          ],
        },
        {
          key: "sales",
          name: "Sales",
          source: "CRM",
          records: [
            { title: "Renewal notice in 9 days", detail: "$180,000 a year" },
            { title: "Sponsor resigned", detail: "Head of claims, on Monday" },
          ],
        },
      ],
    },
    views: {
      label: "Five ready-made views",
      items: ["Customer 360", "Project 360", "Employee 360", "Finance", "Rolling 12-month forecast"],
    },
    note: "Read-only: asking a question never changes a record.",
  },

  /* [04] Written 5 Nov 2026 (docs/EIS_PAGE_SCRIPT.md). Replaces the loop:
     the same idea told as the leader's week, with the teaser video's own
     sample figures. Agents are in preview (PreviewTag on the eyebrow). */
  monday: {
    setup: "2,418 changes since Friday.",
    payoff: "Three need you first.",
    lede: "Agents read each change and bring you only what needs a decision: the facts, what it is worth and a proposed action for you to approve.",
    field: {
      legend: "One dot per change since Friday",
      bands: [
        { system: "Project tool", rows: 13 },
        { system: "HR system", rows: 7 },
        { system: "CRM", rows: 9 },
        { system: "Accounting", rows: 10 },
      ],
    },
    inboxLabel: "Sample decisions inbox, ranked by money at stake",
    columns: { rank: "Ranked by money at stake", due: "Decide in" },
    decisions: [
      {
        bands: [1, 0, 2],
        path: ["People", "Project", "Customer"],
        title: "Civic Digital kickoff needs 8 engineers in 9 days",
        stake: "$660,000 contract",
        amount: 660000,
        due: "7 days",
      },
      {
        bands: [2, 0, 3],
        path: ["Customer", "Project", "Revenue"],
        title: "Northwind Insurance renewal at risk",
        stake: "$180,000 renewal",
        amount: 180000,
        due: "7 days",
      },
      {
        bands: [1, 0, 3],
        path: ["People", "Project", "Revenue"],
        title: "Leave overlaps the Claims Engine critical path",
        stake: "$84,000 invoice",
        amount: 84000,
        due: "6 days",
      },
    ],
    open: {
      factsLabel: "What the agents found",
      found: "2 minutes ago",
      facts: [
        "Project P-109 starts in 9 days",
        "5 engineers on the bench match the skills",
        "3 new joiners start before the kickoff",
      ],
      actionLabel: "Proposed action",
      action: "Allocate the 5 bench engineers and the 3 joiners to P-109.",
      impact: "Bench cost falls by about $19,000 a month, and the $660,000 contract starts on time.",
      actions: { primary: "Approve", others: ["Approve with changes", "Dismiss"] },
    },
    coda: { lead: "Ranked by the money at stake,", payoff: "so the weekly review starts with the largest." },
  },

  /* [05] Written 5 Nov 2026 (docs/EIS_PAGE_SCRIPT.md). Replaces the role
     cockpit: the same five roles, each reduced to the one question it
     brings to the weekly review and the one answer it gets. */
  leaders: {
    setup: "Five leaders ask five questions",
    payoff: "and read one set of numbers.",
    lede: "The chief executive, finance, sales, delivery and people leaders each open their own view, and every view reads the same records underneath. One client shows up in three of them.",
    seats: [
      {
        role: "Chief executive",
        question: "Where are we heading?",
        answer: "$11.4 million",
        /* Outcomes are parallel items: one line each at 1440 (DESIGN_SYSTEM
           §2), and Northwind is named in the three seats it touches. */
        outcome: "$600,000 ahead of plan",
        source: "Rolling 12-month forecast",
        drawing: "forecast",
      },
      {
        role: "Finance",
        question: "What cash is stuck?",
        answer: "$392,000",
        outcome: "Overdue, oldest is Northwind",
        source: "Accounting",
        drawing: "ageing",
      },
      {
        role: "Sales",
        question: "Which renewals are at risk?",
        answer: "$240,000",
        outcome: "2 accounts, Northwind first",
        source: "CRM",
        drawing: "renewals",
      },
      {
        role: "Delivery",
        question: "Which projects are slipping?",
        answer: "2 of 14",
        outcome: "Northwind's Claims Engine first",
        source: "Project tool",
        drawing: "projects",
      },
      {
        role: "People",
        question: "Who covers the next kickoff?",
        answer: "8 of 8 seats",
        outcome: "5 from the bench, 3 joiners",
        source: "HR system",
        drawing: "seats",
      },
    ],
    spine: "Read live from your own systems",
  },

  /* [06] Written 5 Nov 2026 (docs/EIS_PAGE_SCRIPT.md). Replaces the
     capabilities section's engineering terms ("deterministic", "dual-key",
     "cryptographic") with what a leader can check for themselves. */
  trust: {
    setup: "Every figure shows its working.",
    payoff: "Every action waits for you.",
    lede: "Click any number to see how it was defined, which records it came from and how fresh it is. Nothing changes in your systems until a named person approves it.",
    receipt: {
      label: "Renewal at risk",
      value: "$180,000",
      subject: "Northwind Insurance",
      rows: [
        { key: "Defined as", value: "Annual value of a renewal showing two or more risk signals" },
        { key: "Owned by", value: "The finance team, who signed off the definition" },
        { key: "As at", value: "Read from the CRM at 09:30, two minutes ago" },
        { key: "Checks", value: "Passed the checks finance set" },
      ],
      valueLabel: "Value from",
      valueFrom: { system: "CRM", record: "Opportunity 4012 · $180,000 a year" },
      signalsLabel: "Risk signals",
      signals: [
        { system: "Accounting", record: "Invoice 8942 · 74 days overdue" },
        { system: "Project tool", record: "Project P-104 · three weeks late" },
      ],
      footnote: "If a figure has no definition, Enterprise Intelligence says so instead of guessing.",
    },
    route: {
      label: "Before anything changes",
      steps: [
        { title: "Proposed", detail: "An agent drafts the action, with the facts and the money at stake." },
        { title: "Checked", detail: "Your rules decide who must approve." },
        { title: "Approved", detail: "A named person with authority signs off. Proposing and approving are held apart." },
        { title: "Carried out and recorded", detail: "One field on one record, by a narrowly scoped account." },
      ],
    },
    link: { label: "How Akashic governs every figure", href: "/akashic#governance" },
  },

  /* [07] Rewritten 5 Nov 2026 (docs/EIS_PAGE_SCRIPT.md): eight questions
     in plain words, two groups. "How do I know a figure is right?" moved
     to its own section ([06] Trust), so it is not answered twice. */
  faq: {
    title: "Questions, plainly answered.",
    setup: "Questions,",
    payoff: "plainly answered.",
    link: { label: "Talk to our team", href: "#talk-to-our-team" },
    lede: "What chief executives, finance and IT leaders ask before the first demo.",
    openByDefault: "Does Enterprise Intelligence replace my ERP?",
    bands: [
      {
        label: "What it is",
        note: "Where it sits, and what it needs from you.",
        items: [
          {
            question: "Does Enterprise Intelligence replace my ERP?",
            answer: "No. Enterprise Intelligence sits on top of the systems you already run. It reads them, joins what each one holds about the same client, project or person, and shows what matters. Nothing is migrated and nothing is switched off.",
          },
          {
            question: "Which systems does it read today?",
            answer: "The systems that run your business: your ERP, CRM, project tool, HR system and cloud billing. Bring the list of what you run to the first conversation and we will tell you plainly what connects on day one.",
          },
          {
            question: "What do you need from us?",
            answer: "Two things. Someone has to own the definitions of your figures, because what counts as revenue is your organisation's decision. And for each action you want Enterprise Intelligence to carry out, someone with authority over that system has to agree to it. Read-only reporting can start well before either is settled.",
          },
          {
            question: "How is it different from asking an AI chatbot?",
            answer: "A chatbot writes a query against your raw tables and returns something plausible. Enterprise Intelligence answers only in terms your organisation has defined and given access to, and each answer shows where it came from.",
          },
          {
            /* 5 Nov 2026 (user): no published price on this page; pricing
               goes through the contact form. */
            question: "How much does it cost?",
            answer: "Ask us. Use Talk to our team, tell us which systems you run and what you want to see first, and we will come back with pricing for your organisation.",
          },
        ],
      },
      {
        label: "What it does to your systems",
        note: "The part your IT leaders will want in writing.",
        items: [
          {
            question: "You say read-only, then you say it acts. Which is it?",
            answer: "Both, on two separate paths. Reading is read-only across every connected system and never changes a source record. Acting is a short list of named actions you agree during set-up: one field on one record, carried out by a narrowly scoped account, only after a named person approves, and safe to approve twice. A system with no actions agreed stays read-only.",
          },
          {
            question: "Who can see what, and who can approve what?",
            answer: "Akashic Governance decides. Access rules, lineage, the audit trail and data residency sit under every screen. The right to approve is held apart from the right to propose, so the person who proposes an action cannot be the person who approves it.",
          },
          {
            question: "What happens if an action fails?",
            answer: "It is recorded as a failure with the reason and the system that refused it. The decision is held rather than retried in the background, and the owner of that system is told.",
          },
          {
            question: "Where does my data live?",
            answer: "Your records stay in the systems that own them. Where you already run a warehouse, the work runs there rather than copying data out. Deploy on cloud, on premises or both, inside the data residency boundaries you have to honour by law.",
          },
        ],
      },
    ],
  },

  close: {
    title: ["See it with", "your own numbers."],
    /* The title's "your own numbers" arrives with the 3-week diagnostic;
       the kicker says the order, so it no longer contradicts the title. */
    sessionLabel: "Demo first, then your own data",
    prompt: "Bring one decision your team cannot close by Friday.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    timeline: [
      {
        duration: "30 minutes",
        label: "A live demo, built around your weekly decisions",
      },
      {
        duration: "3 weeks",
        label: "If it fits, a read-only diagnostic on your own data",
      },
    ],
    footnote:
      "Product screens, drawings and footage use illustrative data for a sample business; its names and figures are fictional. Industry figures: FP&A Trends Survey 2025; TIQ and London Business School study, 2016.",
  },
};
