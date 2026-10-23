import type { PageCloseBlock } from "../blocks";
import { mailto } from "../site";
import type { Cta, Faq, PageSection, Seo } from "../types";

/* ------------------------------------------------------------------ */
/*  /pricing (added 15 Oct 2026, redesigned 21 Oct 2026)              */
/* ------------------------------------------------------------------ */
/* The four plans (Launch, Growth, Scale, Enterprise) are the founder's
   (DHIRA_ai_Website_v2). What each plan carries comes from the pricing
   workbook Akashic_Pricing_Sep7_2026-WIP.xlsx (repo root), sheet "Plan
   Comparison", top block "What each customer gets (per tenant)": the
   limits below are its per-tenant figures, i.e. per customer organisation.
   Also from the workbook: every plan carries the same five priced modules
   (Data Pipelines with the data lake, Master Data, Warehouse, Business
   Intelligence, Governance), so plans differ in capacity, not in modules;
   Enterprise is quoted on a dedicated instance; pay as you go, 1 year and
   3 year terms; 12 months of warehouse history with paid extra months;
   Spark processing as a separate add-on; cold standby disaster recovery in
   standard plans, hot standby for Enterprise.

   NOT published, on purpose: every dollar figure in the workbook. They are
   DHIRA's AWS infrastructure cost per tenant (EC2, EKS, Redshift, S3 plus a
   10% contingency), not list prices, and "tenants per instance" is marked
   internal only. The prices printed are PLACEHOLDERS (see placeholderPrices).

   One currency (user, 21 Oct 2026): every price is in US dollars. The India
   version (/in/pricing, INR, GST and GeM routes) was removed the same day.

   Open items for the founder, from the workbook's own notes: Ask Akashic,
   Machine Learning, agents and metering are not priced yet, so the page
   says they are quoted with the plan; "Shared Warehouse Capacity" is noted
   as shared per instance while the sizing sheet derives it per tenant.

   The deployment footprints, the eight controls "in every edition, not as
   add-ons" and models hosted inside your boundary keep the founder's
   wireframe meaning. Services, buying routes and the FAQ remain DRAFT.

   Copy follows DESIGN_SYSTEM §2: no short forms ("Business Intelligence",
   "multi-factor", "1 million"), headers state the reader's gain.

   Composer: app/pricing, through components/pages/PricingPage. Prices are
   formatted by lib/pricing.ts. */

const sections: PageSection[] = [
  { id: "plans", label: "Plans" },
  { id: "compare", label: "Compare plans" },
  { id: "included", label: "In every plan" },
  { id: "deployment", label: "Deployment" },
  { id: "services", label: "Services" },
  { id: "how-to-buy", label: "How to buy" },
  { id: "faq", label: "Questions" },
  { id: "talk-to-our-team", label: "Get a quote" },
];

/* The page opens on [01] Plans, which carries the h1 (user, 15 Oct 2026:
   no hero, the page should be crisp). */
const intro = {
  label: "Plans and pricing",
  setup: "Every module in every plan.",
  payoff: "Pay for the capacity you need.",
  lede: "Data Pipelines, Master Data, Warehouse, Business Intelligence and Governance come with every plan, under the same controls. Plans differ only in how much each module carries.",
};

export type PlanId = "launch" | "growth" | "scale" | "enterprise";

/** One headline limit: the figure, then what it measures. */
export interface Capacity {
  value: string;
  label: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  /** Who the plan is for, one line. */
  audience: string;
  /** The JSON-LD Offer description. */
  summary: string;
  /** Four headline limits from the workbook, in the same order on every
      plan so the rows line up across the columns. */
  capacity: Capacity[];
}

const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    audience: "One team, a first use case",
    summary: "The full data foundation at starter capacity, in the DHIRA cloud.",
    capacity: [
      { value: "100 GB", label: "data ingested a month" },
      { value: "100", label: "pipeline hours a month" },
      { value: "25", label: "Business Intelligence users" },
      { value: "100,000", label: "master records" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    audience: "Several teams, shared data",
    summary: "More capacity for data pipelines, storage and users as use cases spread across teams.",
    capacity: [
      { value: "500 GB", label: "data ingested a month" },
      { value: "400", label: "pipeline hours a month" },
      { value: "100", label: "Business Intelligence users" },
      { value: "1 million", label: "master records" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    audience: "Every team, one estate",
    summary: "Capacity for an organisation running its reporting and data on Akashic.",
    capacity: [
      { value: "2 TB", label: "data ingested a month" },
      { value: "1,000", label: "pipeline hours a month" },
      { value: "300", label: "Business Intelligence users" },
      { value: "5 million", label: "master records" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Your boundary, your terms",
    summary: "A dedicated instance sized to your estate, in our cloud, yours or your data centre.",
    capacity: [
      { value: "Custom", label: "limits on every module" },
      { value: "Dedicated", label: "instance, yours alone" },
      { value: "Hot standby", label: "disaster recovery" },
      { value: "Your cloud", label: "or your data centre" },
    ],
  },
];

/* The workbook's three commitment terms, as the plans' term switch. */
export type TermId = "monthly" | "annual" | "triennial";

export interface Term {
  id: TermId;
  label: string;
  save?: string;
  billing: string;
}

const terms: Term[] = [
  { id: "monthly", label: "Monthly", billing: "per month, no term" },
  { id: "annual", label: "1 year", save: "15%", billing: "per month on a 1 year term" },
  { id: "triennial", label: "3 years", save: "25%", billing: "per month on a 3 year term" },
];

/* PLACEHOLDER list prices (15 Oct 2026). The user asked for representative
   amounts until the founder sets real ones (lib/pricing.ts formats them). A
   value ladder over the workbook's per-tenant pay-as-you-go cost ($882 /
   $1,120 / $1,944 a month, so gross margin of about 65% / 81% / 87%).
   Enterprise starts above a dedicated Scale-size instance with hot standby
   (about $26.6K a month in cost) and is quoted, so it shows a "from" price
   and no term saving. The savings follow the shape of the workbook's
   reserved-instance savings (about 24% and 41% on cost) at a smaller size.
   Replace these numbers when real prices exist, and only then add price and
   priceCurrency to the JSON-LD Offers (placeholders stay out of search). */
export interface PlaceholderPrices {
  /** Monthly list price per plan, in US dollars. */
  listUsd: Record<PlanId, number>;
  /** Discount for each commitment term. */
  termSaving: Record<TermId, number>;
}

const placeholderPrices: PlaceholderPrices = {
  listUsd: { launch: 2500, growth: 6000, scale: 15000, enterprise: 40000 },
  termSaving: { monthly: 0, annual: 0.15, triennial: 0.25 },
};

/* The compare grid. `yes` = included (blue node), `option` = available on
   request (hollow ring), `no` = not in the plan, or a short text value. The
   node and ring are the /akashic [11] language: blue is switched on, hollow
   is available. The three cells are Launch, Growth and Scale. Where every
   limit in a group is sized on a quote, `enterprise` says so once and the
   Enterprise column draws one cell down the whole group, instead of
   "Custom" on every row. */
export type Cell = "yes" | "option" | "no" | { text: string };

export interface CompareRow {
  label: string;
  preview?: boolean;
  cells: [Cell, Cell, Cell];
  /** The Enterprise cell, when the group has no `enterprise` line. */
  enterprise?: Cell;
}

export interface CompareGroup {
  heading: string;
  rows: CompareRow[];
  /** One Enterprise cell spanning every row of the group. */
  enterprise?: string;
}

const SIZED = "Sized to your estate";

const compare: CompareGroup[] = [
  {
    heading: "Data Pipelines and data lake",
    enterprise: SIZED,
    rows: [
      { label: "Data ingested a month", cells: [{ text: "100 GB" }, { text: "500 GB" }, { text: "2 TB" }] },
      { label: "Pipeline runtime a month", cells: [{ text: "100 hours" }, { text: "400 hours" }, { text: "1,000 hours" }] },
      { label: "Active data pipelines", cells: [{ text: "20" }, { text: "100" }, { text: "300" }] },
      { label: "Connected sources", cells: [{ text: "10" }, { text: "20" }, { text: "40" }] },
      { label: "Pipeline users", cells: [{ text: "10" }, { text: "30" }, { text: "75" }] },
    ],
  },
  {
    heading: "Master Data",
    enterprise: SIZED,
    rows: [{ label: "Master records", cells: [{ text: "100,000" }, { text: "1 million" }, { text: "5 million" }] }],
  },
  {
    heading: "Data Warehouse",
    enterprise: SIZED,
    rows: [{ label: "Storage, with 12 months of history", cells: [{ text: "0.5 TB" }, { text: "2 TB" }, { text: "8 TB" }] }],
  },
  {
    heading: "Business Intelligence",
    enterprise: SIZED,
    rows: [
      { label: "Users", cells: [{ text: "25" }, { text: "100" }, { text: "300" }] },
      { label: "Concurrent users", cells: [{ text: "5" }, { text: "25" }, { text: "75" }] },
      { label: "Reports", cells: [{ text: "100" }, { text: "500" }, { text: "1,500" }] },
      { label: "Dashboards", cells: [{ text: "20" }, { text: "100" }, { text: "300" }] },
      { label: "Embedded dashboard views a month", cells: [{ text: "10,000" }, { text: "75,000" }, { text: "250,000" }] },
      { label: "Embedded report views a month", cells: [{ text: "75,000" }, { text: "500,000" }, { text: "1.5 million" }] },
    ],
  },
  {
    heading: "Governance",
    enterprise: SIZED,
    rows: [
      { label: "Governance users", cells: [{ text: "10" }, { text: "20" }, { text: "40" }] },
      { label: "Data assets catalogued", cells: [{ text: "60" }, { text: "300" }, { text: "900" }] },
      { label: "Glossary entries", cells: [{ text: "60" }, { text: "300" }, { text: "900" }] },
      { label: "Active lineage", cells: [{ text: "20" }, { text: "100" }, { text: "300" }] },
      { label: "Quality, profiling and incident data pipelines", cells: [{ text: "80" }, { text: "400" }, { text: "1,000" }] },
    ],
  },
  {
    heading: "Deployment and resilience",
    rows: [
      { label: "Multi-tenant, in the DHIRA cloud on AWS", cells: ["yes", "yes", "yes"], enterprise: "option" },
      { label: "Dedicated instance", cells: ["no", "no", "no"], enterprise: "yes" },
      { label: "Your cloud or your data centre", cells: ["no", "no", "no"], enterprise: "option" },
      { label: "Disaster recovery", cells: [{ text: "Cold standby" }, { text: "Cold standby" }, { text: "Cold standby" }], enterprise: { text: "Hot standby" } },
    ],
  },
  {
    heading: "Add-ons",
    rows: [
      { label: "Warehouse history beyond 12 months", cells: ["option", "option", "option"], enterprise: "option" },
      { label: "Spark-scale processing", cells: ["option", "option", "option"], enterprise: "option" },
    ],
  },
];

/* Printed under the grid: what the workbook does not price yet. */
const compareNote =
  "Limits are per organisation. Ask Akashic, Machine Learning and AI agents, in preview, are quoted with your plan.";

/* The founder's eight controls ("Trust & deployment" in his wireframe),
   written out in full. Captions are terse noun phrases, balanced. */
const everyPlan = {
  label: "In every plan",
  setup: "Security is not a tier.",
  payoff: "Every control, in every plan.",
  lede: "The controls an auditor asks about come with Launch as they do with Enterprise. Nothing to unlock, nothing to add.",
  rail: "The same eight controls, Launch to Enterprise",
  controls: [
    { title: "Single sign-on", caption: "One identity, a second factor enforced" },
    { title: "Role-based access", caption: "Row and column rules at query time" },
    { title: "Tenant isolation at every level", caption: "Data, storage, identity and network" },
    { title: "Encryption in transit and at rest", caption: "Every store, every hop" },
    { title: "Personal data detection and masking", caption: "Found on arrival, masked in answers" },
    { title: "Column-level lineage", caption: "Every figure traced to its source" },
    { title: "Maker-checker approvals", caption: "A second person signs off" },
    { title: "Model and prompt version on every agent action", caption: "Every agent step on the record" },
  ],
};

/* The three footprints. `operator` sets how the boundary is drawn: DHIRA
   operates the first (solid blue), your team the other two (dashed ink). */
export type Operator = "dhira" | "customer";

export interface Footprint {
  name: string;
  boundary: string;
  operator: Operator;
  line: string;
  billing: string;
}

const deployment: {
  label: string;
  setup: string;
  payoff: string;
  lede: string;
  billedAs: string;
  modules: string;
  legend: Record<Operator, string>;
  options: Footprint[];
} = {
  label: "Deployment",
  setup: "Same platform, three footprints.",
  payoff: "Your data stays where it must.",
  lede: "Modules, governance and answers are identical in all three footprints. What changes is who operates the infrastructure, and so how each footprint is billed.",
  billedAs: "Billed as",
  modules: "Every module, every control",
  legend: { dhira: "Operated by DHIRA", customer: "Operated by your team" },
  options: [
    {
      name: "DHIRA cloud",
      boundary: "DHIRA on AWS",
      operator: "dhira",
      line: "Multi-tenant, operated by DHIRA on AWS, isolated at the data, storage, identity and network levels.",
      billing: "Launch, Growth or Scale, monthly or on a term",
    },
    {
      name: "Your cloud",
      boundary: "Your AWS, Azure or Google Cloud",
      operator: "customer",
      line: "A dedicated deployment inside your own cloud account, for data residency and control.",
      billing: "Enterprise, infrastructure in your account",
    },
    {
      name: "Your data centre",
      boundary: "Your servers",
      operator: "customer",
      line: "Installed in your own data centre with Docker and Kubernetes, with no plan quotas.",
      billing: "Enterprise, annual licence and support",
    },
  ],
};

const services = {
  label: "Services",
  setup: "One accountable team.",
  payoff: "Services priced to the outcome.",
  lede: "Advise, engineer, deploy. Every engagement has a defined scope and named people, from a first assessment to engineers inside your squads.",
  columns: { name: "Engagement", line: "What you get", billing: "How it is billed" },
  items: [
    { name: "Readiness assessment", line: "Data and AI readiness, prioritised use cases and a phased roadmap.", billing: "Fixed fee" },
    { name: "Proof on your data", line: "One use case on your systems, with your people approving the result.", billing: "Fixed scope and fee" },
    { name: "Engineering at Scale", line: "Data and AI systems designed, built, integrated and run.", billing: "Fixed scope, or time and materials" },
    { name: "Staff augmentation", line: "Senior data, AI and cloud engineers inside your teams.", billing: "Monthly, per engineer" },
  ],
};

export interface BuyRoute {
  name: string;
  line: string;
  href?: string;
  cta?: string;
}

const howToBuy: { label: string; setup: string; payoff: string; routes: BuyRoute[] } = {
  label: "How to buy",
  setup: "Buy the way you already buy.",
  payoff: "Direct, by tender or through a partner.",
  routes: [
    { name: "Direct", line: "Annual agreements, quoted and invoiced in US dollars." },
    { name: "Public sector", line: "Open tenders, with the qualification documents a procurement file asks for." },
    { name: "Through a partner", line: "Systems integrators carry Akashic under their own agreements, or white label it." },
    {
      name: "Procurement pack",
      line: "Security answers, company profile and standard terms, ready for your review.",
      href: mailto("Procurement pack request"),
      cta: "Request the pack",
    },
  ],
};

export interface FaqGroup {
  heading: string;
  items: Faq[];
}

const faq: { label: string; setup: string; payoff: string; lede: string; link: Cta; groups: FaqGroup[] } = {
  label: "Questions",
  setup: "Pricing, plainly.",
  payoff: "The questions buyers ask first.",
  lede: "Short answers on plans, data, AI and security. Anything else goes to a solutions architect.",
  link: { label: "Ask our team", href: "#talk-to-our-team" },
  groups: [
    {
      heading: "Plans and terms",
      items: [
        {
          question: "How is Akashic priced?",
          answer: "By plan and term. Each plan sets the capacity of every module: data ingested, pipeline hours, users and records. Pay monthly, or commit to a 1 or 3 year term for a lower rate. Enterprise is quoted for a dedicated instance.",
        },
        {
          question: "Can we start small?",
          answer: "Yes. Launch carries every module at starter capacity for a first use case. Move up a plan as use grows, on the same foundation, with no data migration and no metrics to redefine.",
        },
        {
          question: "Which currency do you invoice in?",
          answer: "US dollars, for every plan, term and service.",
        },
        {
          question: "Do you offer public sector and education pricing?",
          answer: "Yes. Government, education and non-profit programmes are priced for their budgets and procurement rules.",
        },
        {
          question: "Is there a trial?",
          answer: "Start with a proof on your data: one use case, a fixed scope, and your people approving the result before anything scales.",
        },
      ],
    },
    {
      heading: "Data and AI",
      items: [
        {
          question: "How long is our data kept?",
          answer: "The warehouse keeps 12 months of history in every plan. Longer history is available as an add-on, billed per extra month.",
        },
        {
          question: "Is Spark processing included?",
          answer: "Plans run data pipelines on the platform's own engine. Spark-scale processing is a separate add-on, billed on the compute your jobs use.",
        },
        {
          question: "How is AI model usage handled?",
          answer: "Ask Akashic runs on the model you choose. Bring your own provider key, or run models hosted inside your boundary. Your quote states how model usage is billed.",
        },
        {
          question: "Are AI agents included?",
          answer: "Agents are in preview with design partners and are quoted with your plan. The access control, lineage and audit around them come with every plan today.",
        },
      ],
    },
    {
      heading: "Security and exit",
      items: [
        {
          question: "Is security an add-on?",
          answer: "No. Access control, lineage, audit, encryption and personal data masking come with every plan, Launch included.",
        },
        {
          question: "What happens to our data if we leave?",
          answer: "Your data stays yours, in open formats. Tables, transforms and metric definitions export with tools your team already uses.",
        },
      ],
    },
  ],
};

const close = {
  label: "Get a quote",
  setup: "Tell us where you want to start.",
  payoff: "We will price the first step.",
  body: "Share the modules, deployment and teams you have in mind. A solutions architect replies with a quote and a plan for the first use case.",
};

/* ---------------- The page document ---------------- */

export interface PricingPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  intro: typeof intro;
  plans: Plan[];
  terms: Term[];
  /** PLACEHOLDER prices (see placeholderPrices above). */
  prices: PlaceholderPrices;
  planCopy: {
    termLabel: string;
    save: string;
    /** Announced when the term changes: "Prices shown per month, no term". */
    pricesShown: string;
    /** The note beside the term switch. */
    currency: string;
    from: string;
    /** "Save $4,500 a year": the words around the amount. */
    savesPrefix: string;
    savesSuffix: string;
    /** Read before a struck-through list price. */
    listPrice: string;
    enterpriseBilling: string;
    enterpriseCta: string;
    /** "Start with" + the plan name. */
    startWith: string;
    ctaHref: string;
    /** The foundation the four plans stand on. */
    foundation: { label: string; modules: string[]; controls: string; controlsHref: string };
    /** The capacity line: its two labels and its accessible description. */
    capacity: { label: string; open: string; caption: string };
  };
  compare: {
    num: string;
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    legend: { yes: string; option: string; no: string };
    absentLabel: string;
    caption: string;
    planHeader: string;
    /** Under the legend below lg, where the grid scrolls sideways. */
    scrollHint: string;
    groups: CompareGroup[];
    note: string;
  };
  everyPlan: typeof everyPlan;
  deployment: typeof deployment;
  services: typeof services & { cta: Cta };
  howToBuy: typeof howToBuy;
  faq: typeof faq;
  close: PageCloseBlock;
  /** The SoftwareApplication JSON-LD's deployment summary. */
  operatingSystem: string;
}

export const pricing: PricingPage = {
  seo: {
    title: "Plans and pricing",
    description: `${intro.setup} ${intro.payoff} ${intro.lede} Prices in US dollars.`,
    path: "/pricing",
  },
  sections,
  sectionsLabel: "Pricing page sections",
  intro,
  plans,
  terms,
  prices: placeholderPrices,
  planCopy: {
    termLabel: "Billing term",
    save: "Save",
    pricesShown: "Prices shown",
    currency: "US dollars, per organisation",
    from: "From",
    savesPrefix: "Save",
    savesSuffix: "a year",
    listPrice: "List price",
    enterpriseBilling: "per month, annual agreement",
    enterpriseCta: "Talk to our team",
    startWith: "Start with",
    ctaHref: "#talk-to-our-team",
    foundation: {
      label: "In every plan",
      modules: ["Data Pipelines and data lake", "Master Data", "Data Warehouse", "Business Intelligence", "Governance"],
      controls: "Every security control",
      controlsHref: "#included",
    },
    capacity: {
      label: "Capacity",
      open: "Sized to your estate",
      caption: "Capacity rises with each plan. Enterprise is sized to your estate.",
    },
  },
  compare: {
    num: "02",
    label: "Compare plans",
    setup: "Every limit, side by side.",
    payoff: "Size your plan before you call.",
    lede: "Every module is in every plan. The rows that change are how much each module carries, where Akashic runs and how it recovers.",
    legend: { yes: "Included", option: "Available on request", no: "Not in the plan" },
    absentLabel: "Not in this plan",
    caption: "Akashic plans compared",
    planHeader: "Plan",
    scrollHint: "Scroll for every plan",
    groups: compare,
    note: compareNote,
  },
  everyPlan,
  deployment,
  services: { ...services, cta: { label: "See how we work", href: "/delivery" } },
  howToBuy,
  faq,
  close: {
    ...close,
    primary: { label: "Get a quote", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
  },
  operatingSystem: "Multi-tenant cloud; your cloud on AWS, Azure or Google Cloud; your data centre on Docker and Kubernetes",
};
