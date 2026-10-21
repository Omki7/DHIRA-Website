import type { Region } from "@/lib/region";
import type { Cta, Faq, PageSection, Seo } from "../types";

/* ------------------------------------------------------------------ */
/*  /pricing (added 15 Oct 2026)                                       */
/* ------------------------------------------------------------------ */
/* The four plans (Launch, Growth, Scale, Enterprise) are the founder's
   (DHIRA_ai_Website_v2). What each plan carries comes from the pricing
   workbook Akashic_Pricing_Sep7_2026-WIP.xlsx (repo root), sheet "Plan
   Comparison", top block "What each customer gets (per tenant)": the
   limits below are its per-tenant figures, i.e. per customer organisation.
   Also from the workbook: every plan carries the same five priced modules
   (Pipelines with the data lake, Master Data, Warehouse, BI, Governance),
   so plans differ in capacity, not in modules; Enterprise/Custom is quoted
   ("Contact Us") on a dedicated instance; pay as you go, 1 year and 3 year
   terms; 12 months of warehouse history with paid extra months ("ADW
   Sizing & Retention"); Spark ETL as a separate add-on ("Spark ETL"); cold
   standby DR in standard plans, hot standby for Enterprise; hosted in AWS
   ap-south-1 (Mumbai).

   NOT published, on purpose: every dollar figure in the workbook. They are
   DHIRA's AWS infrastructure cost per tenant (EC2, EKS, Redshift, S3 plus a
   10% contingency), not list prices, and "tenants per instance" is marked
   internal only. The prices printed are PLACEHOLDERS (see LIST_USD).

   Open items for the founder, from the workbook's own notes: Ask Akashic,
   Machine Learning, agents ("Costing for Agents/Functions") and metering
   are not priced yet, so the page says they are quoted with the plan; the
   "Shared Warehouse Capacity" row is noted as shared per instance while the
   sizing sheet derives it per tenant (printed here as per organisation);
   "Data Ingested Storage" repeats the ingestion figure and is not printed.

   The deployment options, the eight controls "in every edition, not as
   add-ons" and models hosted inside your boundary keep the founder's
   wireframe wording. Services, buying routes and the FAQ remain DRAFT.

   Composers: app/pricing and app/in/pricing, through the shared body
   components/pages/PricingPage. Prices are formatted by lib/pricing.ts. */

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
   the hero was unnecessary, the page should be crisp). Also the route
   metadata's description. */
const intro = {
  label: "Plans",
  setup: "Plans and pricing.",
  payoff: "Sized to your workload.",
  lede: "Every plan carries Pipelines, Master Data, Warehouse, BI and Governance, with the same controls. Plans differ in capacity.",
};

export type PlanId = "launch" | "growth" | "scale" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  /** Who the plan is for, one line. */
  audience: string;
  summary: string;
  /** The plan's headline limits, from the workbook. */
  includes: string[];
  /** Capacity drawn in the plan's figure: 1 Launch to 3 Scale, 4 Enterprise. */
  tier: 1 | 2 | 3 | 4;
}

const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    audience: "One team, a first use case",
    summary: "The full data foundation at starter capacity, on multi-tenant SaaS.",
    includes: ["100 GB ingested a month", "100 pipeline hours a month", "25 BI users", "100K master records"],
    tier: 1,
  },
  {
    id: "growth",
    name: "Growth",
    audience: "Several teams, shared data",
    summary: "More data, pipelines and users as use cases spread across teams.",
    includes: ["500 GB ingested a month", "400 pipeline hours a month", "100 BI users", "1M master records"],
    tier: 2,
  },
  {
    id: "scale",
    name: "Scale",
    audience: "Every team, one estate",
    summary: "Capacity for an organisation running its reporting and data on Akashic.",
    includes: ["2 TB ingested a month", "1,000 pipeline hours a month", "300 BI users", "5M master records"],
    tier: 3,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Your boundary, your terms",
    summary: "A dedicated instance sized to your estate, in our cloud, yours or your data centre.",
    includes: ["A dedicated instance", "Limits sized to your estate", "Hot standby disaster recovery", "Private cloud or on-premise"],
    tier: 4,
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
  { id: "annual", label: "1 year", save: "15%", billing: "per month, 1 year term" },
  { id: "triennial", label: "3 years", save: "25%", billing: "per month, 3 year term" },
];

/* PLACEHOLDER list prices (15 Oct 2026). The user asked for representative
   amounts until the founder sets real ones (lib/pricing.ts planPrice formats them). A value ladder over the
   workbook's per-tenant pay-as-you-go cost ($882 / $1,120 / $1,944 a month,
   so gross margin of about 65% / 81% / 87%). Enterprise starts above a
   dedicated Scale-size instance with hot standby (about $26.6K a month in
   cost) and is quoted, so it shows a "from" price and no term saving. The
   savings follow the shape of the workbook's reserved-instance savings
   (about 24% and 41% on cost) at a smaller size. India converts at
   INR_PER_USD and rounds to the nearest 5,000 rupees; GST is extra.
   Replace these numbers when real prices exist, and only then add price and
   priceCurrency to the JSON-LD Offers (placeholders stay out of search). */
export interface PlaceholderPrices {
  /** LIST_USD: monthly list price per plan, in US dollars. */
  listUsd: Record<PlanId, number>;
  /** TERM_SAVING: discount for each commitment term. */
  termSaving: Record<TermId, number>;
  /** INR_PER_USD: conversion for the India version. */
  inrPerUsd: number;
}

const placeholderPrices: PlaceholderPrices = {
  listUsd: { launch: 2500, growth: 6000, scale: 15000, enterprise: 40000 },
  termSaving: { monthly: 0, annual: 0.15, triennial: 0.25 },
  inrPerUsd: 85,
};


/* The compare grid. `yes` = included (blue node), `option` = available on
   request (hollow ring), `no` = not in the plan, or a short text value. The
   node and ring are the /akashic [11] language: blue is switched on, hollow
   is available. */
export type Cell = "yes" | "option" | "no" | { text: string };

export interface CompareRow {
  label: string;
  preview?: boolean;
  cells: [Cell, Cell, Cell, Cell];
}

export interface CompareGroup {
  heading: string;
  rows: CompareRow[];
}

const compare: CompareGroup[] = [
  {
    heading: "Pipelines, with the data lake",
    rows: [
      { label: "Data ingested per month", cells: [{ text: "100 GB" }, { text: "500 GB" }, { text: "2 TB" }, { text: "Custom" }] },
      { label: "Pipeline runtime per month", cells: [{ text: "100 hours" }, { text: "400 hours" }, { text: "1,000 hours" }, { text: "Custom" }] },
      { label: "Active pipelines", cells: [{ text: "20" }, { text: "100" }, { text: "300" }, { text: "Custom" }] },
      { label: "Connected sources", cells: [{ text: "10" }, { text: "20" }, { text: "40" }, { text: "Custom" }] },
      { label: "Pipeline users", cells: [{ text: "10" }, { text: "30" }, { text: "75" }, { text: "Custom" }] },
    ],
  },
  {
    heading: "Master Data",
    rows: [{ label: "Master records", cells: [{ text: "100K" }, { text: "1M" }, { text: "5M" }, { text: "Custom" }] }],
  },
  {
    heading: "Warehouse",
    rows: [{ label: "Storage, 12 months of history", cells: [{ text: "0.5 TB" }, { text: "2 TB" }, { text: "8 TB" }, { text: "Custom" }] }],
  },
  {
    heading: "Business Intelligence",
    rows: [
      { label: "BI users", cells: [{ text: "25" }, { text: "100" }, { text: "300" }, { text: "Custom" }] },
      { label: "Concurrent BI users", cells: [{ text: "5" }, { text: "25" }, { text: "75" }, { text: "Custom" }] },
      { label: "Reports", cells: [{ text: "100" }, { text: "500" }, { text: "1,500" }, { text: "Custom" }] },
      { label: "Dashboards", cells: [{ text: "20" }, { text: "100" }, { text: "300" }, { text: "Custom" }] },
      { label: "Embedded dashboard views per month", cells: [{ text: "10K" }, { text: "75K" }, { text: "250K" }, { text: "Custom" }] },
      { label: "Embedded report views per month", cells: [{ text: "75K" }, { text: "500K" }, { text: "1.5M" }, { text: "Custom" }] },
    ],
  },
  {
    heading: "Governance",
    rows: [
      { label: "Governance users", cells: [{ text: "10" }, { text: "20" }, { text: "40" }, { text: "Custom" }] },
      { label: "Data assets catalogued", cells: [{ text: "60" }, { text: "300" }, { text: "900" }, { text: "Custom" }] },
      { label: "Glossary entries", cells: [{ text: "60" }, { text: "300" }, { text: "900" }, { text: "Custom" }] },
      { label: "Active lineage", cells: [{ text: "20" }, { text: "100" }, { text: "300" }, { text: "Custom" }] },
      { label: "Quality, profiling and incident pipelines", cells: [{ text: "80" }, { text: "400" }, { text: "1,000" }, { text: "Custom" }] },
    ],
  },
  {
    heading: "Deployment and resilience",
    rows: [
      { label: "Multi-tenant SaaS on AWS", cells: ["yes", "yes", "yes", "option"] },
      { label: "Dedicated instance", cells: ["no", "no", "no", "yes"] },
      { label: "Private cloud or on-premise", cells: ["no", "no", "no", "option"] },
      { label: "Disaster recovery", cells: [{ text: "Cold standby" }, { text: "Cold standby" }, { text: "Cold standby" }, { text: "Hot standby" }] },
    ],
  },
  {
    heading: "Add-ons",
    rows: [
      { label: "Warehouse history beyond 12 months", cells: ["option", "option", "option", "option"] },
      { label: "Spark-scale processing", cells: ["option", "option", "option", "option"] },
    ],
  },
];

/* Printed under the grid: what the workbook does not price yet. */
const compareNote =
  "Limits are per organisation. Ask Akashic, Machine Learning and AI agents, in preview, are quoted with your plan.";

/* The founder's eight controls, verbatim titles ("Trust & deployment"
   section of his wireframe). Captions are terse noun phrases, balanced. */
const everyPlan = {
  label: "In every plan",
  setup: "Security is not a tier.",
  payoff: "Every control, in every plan.",
  lede: "The controls an auditor asks about come with Launch as they do with Enterprise. Nothing to unlock, nothing to add.",
  controls: [
    { title: "Single sign-on and MFA", caption: "SAML sign-in, enforced MFA" },
    { title: "Fine-grained, role-based access", caption: "Row and column rules at query time" },
    { title: "Tenant isolation at every level", caption: "Data, storage, identity and network" },
    { title: "Encryption in transit and at rest", caption: "Every store, every hop" },
    { title: "PII detection and masking", caption: "Found on arrival, masked in answers" },
    { title: "Column-level lineage", caption: "Every figure traced to its source" },
    { title: "Maker-checker approvals", caption: "A second person signs off" },
    { title: "Model and prompt version on every agent action", caption: "Every agent step on the record" },
  ],
};

const deployment = {
  label: "Deployment",
  setup: "Same platform, your footprint.",
  payoff: "Priced by where Akashic runs.",
  lede: "The modules, governance and answers are the same in all three. The difference is who operates the infrastructure, and so how it is billed.",
  options: [
    {
      name: "Multi-tenant SaaS",
      line: {
        intl: "Operated by DHIRA on AWS, isolated at the data, storage, identity and network levels.",
        in: "Operated by DHIRA on AWS in Mumbai, isolated at the data, storage, identity and network levels.",
      },
      billing: "Launch, Growth or Scale, monthly or on a term",
    },
    {
      name: "Your private cloud",
      line: "Deployed in your own AWS, Azure or GCP account, for data residency and control.",
      billing: "Enterprise, infrastructure in your account",
    },
    {
      name: "On-premise",
      line: "Installed in your data centre on Docker and Kubernetes, with no plan quotas.",
      billing: "Enterprise, annual licence and support",
    },
  ],
};

const services = {
  label: "Services",
  setup: "One accountable partner.",
  payoff: "Services priced to the outcome.",
  lede: "Advise, engineer, deploy. Every engagement has a defined scope and a named team, from a first assessment to engineers inside your squads.",
  items: [
    { name: "Readiness assessment", line: "Data and AI readiness, prioritised use cases and a phased roadmap.", billing: "Fixed fee" },
    { name: "Proof on your data", line: "One use case on your systems, with your people approving the result.", billing: "Fixed scope and fee" },
    { name: "Engineering @Scale", line: "Data and AI systems designed, built, integrated and run.", billing: "Fixed scope, or time and materials" },
    { name: "Staff augmentation", line: "Senior data, AI and cloud engineers inside your teams.", billing: "Monthly, per engineer" },
  ],
};

/* /pricing has an India version at /in/pricing (lib/region.ts, 15 Oct 2026).
   The two differ only in how a buyer buys: the currency of the quote, GST,
   and GeM as a public sector route. Both lines come from the founder's
   original "invoiced in INR or USD. GST applies in India", split by region.
   The hero's meta line names the region and links to the other version. */
const regionCopy: Record<Region, { line: string; other: string; tax: string }> = {
  intl: { line: "Prices in USD", other: "See India pricing", tax: "" },
  in: { line: "Prices in INR, plus GST", other: "See international pricing", tax: ", plus GST" },
};

export interface BuyRoute {
  name: string;
  line: string;
  href?: string;
  cta?: string;
}

const PARTNER_ROUTE: BuyRoute = { name: "Through a partner", line: "Systems integrators carry Akashic under their own agreements, or white label it." };
const PACK_ROUTE: BuyRoute = { name: "Procurement pack", line: "Security answers, company profile and standard terms, ready for your review.", href: "/trust", cta: "Visit the Trust Center" };

const howToBuy: { label: string; setup: string; payoff: string; routes: Record<Region, BuyRoute[]> } = {
  label: "How to buy",
  setup: "Buy the way your organisation buys.",
  payoff: "Direct, by tender, or through a partner.",
  routes: {
    intl: [
      { name: "Direct", line: "Annual agreements quoted and invoiced in USD." },
      { name: "Public sector", line: "Open tenders, with the qualification documents a procurement file asks for." },
      PARTNER_ROUTE,
      PACK_ROUTE,
    ],
    in: [
      { name: "Direct", line: "Annual agreements quoted and invoiced in INR. GST applies." },
      { name: "Public sector", line: "Open tenders and GeM, with the qualification documents a procurement file asks for." },
      PARTNER_ROUTE,
      PACK_ROUTE,
    ],
  },
};

const faq: { label: string; setup: string; payoff: string; items: Faq[] } = {
  label: "Questions",
  setup: "Pricing, plainly.",
  payoff: "The questions buyers ask first.",
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
      question: "How long is our data kept?",
      answer: "The warehouse keeps 12 months of history in every plan. Longer history is available as an add-on, billed per extra month.",
    },
    {
      question: "Is Spark processing included?",
      answer: "Plans run pipelines on the platform's own engine. Spark-scale processing is a separate add-on, billed on the compute your jobs use.",
    },
    {
      question: "Is security an add-on?",
      answer: "No. Access control, lineage, audit, encryption and PII masking come with every plan, Launch included.",
    },
    {
      question: "How is AI model usage handled?",
      answer: "Ask Akashic runs on the model you choose. Bring your own provider key, or run models hosted inside your boundary. Your quote states how model usage is billed.",
    },
    {
      question: "Are AI agents included?",
      answer: "Agents are in preview with design partners and are quoted with your plan. The access control, lineage and audit around them come with every plan today.",
    },
    {
      question: "What happens to our data if we leave?",
      answer: "Your data stays yours, in open formats. Tables, transforms and metric definitions export with tools your team already uses.",
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
};

const close = {
  label: "Get a quote",
  setup: "Tell us where you want to start.",
  payoff: "We will price the first step.",
  body: "Share the modules, deployment and teams you have in mind. A solutions architect replies with a quote and a plan for the first use case.",
};

/* ---------------- The page document ---------------- */

export interface PricingPage {
  seo: Record<Region, Seo>;
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
    pricesShown: string;
    from: string;
    enterpriseBilling: string;
    enterpriseCta: string;
    /** "Start with" + the plan name. */
    startWith: string;
    ctaHref: string;
  };
  region: Record<Region, { line: string; other: string; tax: string }>;
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
    groups: CompareGroup[];
    note: string;
  };
  everyPlan: typeof everyPlan;
  deployment: typeof deployment & { billedAs: string };
  services: typeof services & { cta: Cta };
  howToBuy: typeof howToBuy;
  faq: typeof faq;
  close: typeof close & { primary: Cta; secondary: Cta };
  /** The SoftwareApplication JSON-LD's deployment summary. */
  operatingSystem: string;
}

export const pricing: PricingPage = {
  seo: {
    intl: { title: "Plans and pricing", description: `${intro.payoff} ${intro.lede} Prices in USD.`, path: "/pricing" },
    in: { title: "Plans and pricing in India", description: `${intro.payoff} ${intro.lede} Prices in INR, with GST and GeM buying routes.`, path: "/pricing" },
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
    from: "From",
    enterpriseBilling: "per month, annual agreement",
    enterpriseCta: "Talk to our team",
    startWith: "Start with",
    ctaHref: "#talk-to-our-team",
  },
  region: regionCopy,
  compare: {
    num: "02",
    label: "Compare plans",
    setup: "Side by side.",
    payoff: "What each plan carries.",
    lede: "Every module is in every plan. The rows that change are how much each one carries, where Akashic runs and how it recovers.",
    legend: { yes: "Included", option: "Available on request", no: "Not in the plan" },
    absentLabel: "Not in this plan",
    caption: "Akashic plans compared",
    planHeader: "Plan",
    groups: compare,
    note: compareNote,
  },
  everyPlan,
  deployment: { ...deployment, billedAs: "Billed as" },
  services: { ...services, cta: { label: "See how we work", href: "/delivery" } },
  howToBuy,
  faq,
  close: {
    ...close,
    primary: { label: "Get a quote", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
  },
  operatingSystem: "Multi-tenant SaaS; private cloud on AWS, Azure or GCP; on-premise on Docker and Kubernetes",
};
