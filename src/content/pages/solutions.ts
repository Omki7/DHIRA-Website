import type { Cta, PageSection, Seo } from "../types";
import { solutionModules } from "./akashic";

/* ------------------------------------------------------------------ */
/*  /solutions hub (added 14 Oct 2026)                                 */
/* ------------------------------------------------------------------ */
/* Ported from the founder's Solutions section (DHIRA_ai_Website_v2,
   12 Oct 2026) as an editorial register (user-approved over his card
   gallery). The nav links into this page: "All solutions", #intelligent-procurement and
   #function-<slug>, so keep those ids.
   Copy is DRAFT: the founder's words, with the site's claims rules applied.
   - No week figures. "Working solution in weeks" and the four-week proof of
     concept are unconfirmed (user, 14 Oct 2026); restore once confirmed.
   - Agent work carries the Preview mark (agents ship in preview) and is
     framed as explanation with people deciding, never autonomy.
   - "Golden record" and "Knowledge Graph" are out (legacy term; the site
     says knowledge layer).
   - Enterprise Intelligence IS /solutions/enterprise-intelligence (user, 14 Oct 2026), so the
     founder's separate "Enterprise Intelligence System" card is dropped.
   The industry and function mappings are drafted from his copy and need
   his review. Composer: app/solutions/page.tsx. */

const sections: PageSection[] = [
  { id: "hero", label: "Solutions" },
  { id: "built-on-akashic", label: "Built on Akashic" },
  { id: "more-solutions", label: "More solutions" },
  { id: "industries", label: "By industry" },
  { id: "functions", label: "By function" },
  { id: "talk-to-our-team", label: "Talk to our team" },
];

const hero = {
  label: "Solutions",
  setup: "Built on Akashic.",
  payoff: "From business problem to working solution.",
  lede: "Each solution is Akashic, configured around one business process on the same modules, data and governance. We assemble rather than build from scratch.",
};

/** A short name read as part of a set (ui/Tag); `preview` marks agent work. */
export interface SolutionInclude {
  label: string;
  preview?: boolean;
}

/** [01]'s Enterprise Intelligence moment: the rolling forecast, in the
    Enterprise Intelligence page's sample world. */
export interface ForecastMoment {
  kind: "forecast";
  figure: string;
  figureNote: string;
  marker: string;
  today: string;
  horizon: string;
  legend: { actual: string; forecast: string; plan: string };
}

/** [01]'s procurement moment: the twelve stages, one lit, its evidence. */
export interface LifecycleMoment {
  kind: "lifecycle";
  stages: string[];
  lit: string;
  evidence: { criterion: string; result: string; source: string };
}

/** [01]'s Akashic Life moment: the health worker's week. No numbers on any
    Akashic Life screen (docs/LIFE_PAGE_SCRIPT.md §2). */
export interface VisitsMoment {
  kind: "visits";
  title: string;
  signal: string;
  rows: { name: string; detail: string; status: string; urgent?: boolean }[];
}

export interface FeaturedSolution {
  /** Anchor id on this page. */
  id: string;
  /** Who it is for, in the reader's words. */
  audience: string;
  name: string;
  /** The question its reader already asks; the moment answers it. */
  question: string;
  headline: string;
  description: string;
  includes: SolutionInclude[];
  moment: ForecastMoment | LifecycleMoment | VisitsMoment;
  href: string;
  cta: string;
}

/* Rebuilt 5 Nov 2026 (docs/SOLUTIONS_PAGE_SCRIPT.md): each flagship is a
   chapter around the question its reader asks, answered by one moment at
   native size. Sample figures come from each solution's own sample world. */
const featured: FeaturedSolution[] = [
  {
    id: "enterprise-intelligence",
    audience: "For chief executives and finance leaders",
    name: "Enterprise Intelligence",
    question: "Where will we land this year?",
    headline: "Know where the business will land, long before the month-end pack arrives.",
    description:
      "Enterprise Intelligence does the work of financial planning and management reporting. It reads your ERP as the system of record and gives every leader one window into the business.",
    includes: [
      { label: "Customer 360" },
      { label: "Project 360" },
      { label: "Employee 360" },
      { label: "Finance" },
      { label: "Rolling forecast" },
      { label: "Agents", preview: true },
    ],
    moment: {
      kind: "forecast",
      figure: "$11.4 million",
      figureNote: "Next 12 months · $600,000 ahead of plan",
      marker: "Northwind renewal at risk · $180,000",
      today: "Today",
      horizon: "12 months ahead",
      legend: { actual: "Actual", forecast: "Forecast", plan: "Plan" },
    },
    href: "/solutions/enterprise-intelligence",
    cta: "Explore Enterprise Intelligence",
  },
  {
    id: "intelligent-procurement",
    audience: "For public procurement teams",
    name: "Intelligent Procurement Management System",
    question: "Can we defend this award?",
    headline: "From indent to secured contract, with evidence at every step.",
    description:
      "The Intelligent Procurement Management System runs public procurement end to end. AI drafts and reads, the rules engine decides, people approve, and every step lands in the audit trail.",
    includes: [
      { label: "Versioned rules" },
      { label: "Sealed bids" },
      { label: "Audit trail" },
      { label: "Models in your boundary" },
      { label: "Tender drafting", preview: true },
    ],
    moment: {
      kind: "lifecycle",
      stages: [
        "Indent",
        "Estimate",
        "Qualification",
        "Tender",
        "Pre-bid",
        "Corrigendum",
        "Bid opening",
        "Evaluation",
        "Comparative",
        "Award",
        "Contract",
        "Bank guarantee",
      ],
      lit: "Evaluation",
      evidence: { criterion: "Prior delivery", result: "Met", source: "Completion certificate, linked" },
    },
    href: "#talk-to-our-team",
    cta: "Request a walkthrough",
  },
  {
    id: "akashic-life",
    audience: "For health programmes and districts",
    name: "Akashic Life",
    question: "Which mother needs care first?",
    headline: "Read the risk at the visit. Carry the record into care.",
    description:
      "Designed for maternal care at the remote edge: offline risk screening, a continuous patient record and visibility for district teams.",
    includes: [{ label: "Works offline" }, { label: "One record per mother" }, { label: "District view" }],
    moment: {
      kind: "visits",
      title: "Visits this week",
      signal: "No signal",
      rows: [
        { name: "Meena", detail: "Third trimester", status: "High risk · refer now", urgent: true },
        { name: "Lata", detail: "Second trimester", status: "Routine" },
        { name: "Rekha", detail: "First trimester", status: "Routine" },
      ],
    },
    href: "/solutions/life",
    cta: "Explore Akashic Life",
  },
];

export interface MoreSolution {
  id: string;
  area: string;
  name: string;
  text: string;
  preview?: boolean;
};

const more: MoreSolution[] = [
  {
    id: "churn-pricing",
    area: "Commercial excellence",
    name: "Churn and pricing intelligence",
    text: "One resolved customer record, an account health score, ranked root causes, a play per account and pocket-price analytics.",
  },
  {
    id: "demand-sensing",
    area: "Supply chain",
    name: "Demand sensing",
    text: "An AI baseline forecast enriched with internal and external signals, with confidence scores. Planners approve before release.",
  },
  {
    id: "direct-materials",
    area: "Procurement",
    name: "Direct materials buying",
    text: "Raw-material price forecasts with buy-or-wait and spot-versus-contract recommendations, approved before the purchase order.",
  },
  {
    id: "claims-fraud",
    area: "Insurance",
    name: "Claims and fraud",
    text: "AI-assisted claims processing, machine-learning risk scoring for prioritisation, fraud detection and medical sufficiency reporting.",
  },
  {
    id: "cancer-care",
    area: "Healthcare",
    name: "Cancer care and high-risk pregnancy",
    text: "Patient journeys, clinical decision support, high-risk pregnancy prediction and triage, and AI-assisted monitoring.",
  },
  {
    id: "learning-outcomes",
    area: "Education",
    name: "Learning outcomes and dropout prediction",
    text: "Outcome analytics for students, schools and boards, with early dropout prediction and intervention planning.",
  },
  {
    id: "citizen-services",
    area: "Public sector",
    name: "Citizen services",
    text: "Multi-agent assistants with consent management, grievance routing, KPI dashboards and compliance insights.",
    preview: true,
  },
];

export interface IndexRow {
  id?: string;
  label: string;
  href?: string;
  /** Solution ids (featured or more) that fit this row. */
  solutions: string[];
}

/* Labels and order match the nav's "By industry" links (content/navigation.ts). */
const industries: IndexRow[] = [
  { label: "Public sector", href: "/sectors/public-sector", solutions: ["intelligent-procurement", "citizen-services"] },
  { label: "Financial services", href: "/sectors/finance", solutions: ["claims-fraud"] },
  { label: "Healthcare", href: "/sectors/healthcare", solutions: ["akashic-life", "cancer-care"] },
  { label: "Retail and consumer goods", href: "/sectors/retail", solutions: ["demand-sensing", "churn-pricing"] },
  { label: "Manufacturing", href: "/sectors/manufacturing", solutions: ["direct-materials", "demand-sensing", "churn-pricing"] },
  { label: "Education", href: "/sectors/education", solutions: ["learning-outcomes"] },
  { label: "Energy and utilities", href: "/sectors/energy", solutions: ["enterprise-intelligence"] },
];

/* Ids and labels match the nav's "By function" links (content/navigation.ts). */
const functions: IndexRow[] = [
  { id: "function-finance", label: "Finance, planning and analysis", solutions: ["enterprise-intelligence"] },
  { id: "function-procurement", label: "Procurement", solutions: ["intelligent-procurement", "direct-materials"] },
  { id: "function-supply-chain", label: "Supply chain", solutions: ["demand-sensing", "direct-materials"] },
  { id: "function-operations", label: "Operations", solutions: ["enterprise-intelligence", "demand-sensing"] },
  { id: "function-sales-marketing", label: "Sales and marketing", solutions: ["churn-pricing"] },
  { id: "function-hr", label: "Human resources and corporate", solutions: ["enterprise-intelligence"] },
  { id: "function-customer-service", label: "Customer service", solutions: ["citizen-services", "claims-fraud"] },
];

/** A drawing-page section header (ui/SectionHeader). */
export interface SolutionsHeader {
  num: string;
  label: string;
  setup: string;
  payoff: string;
  lede: string;
}

export interface SolutionsPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: { label: string; setup: string; payoff: string; lede: string };
  featured: SolutionsHeader & {
    items: FeaturedSolution[];
    foundation: { name: string; caption: string; description: string; modules: string[] };
  };
  more: SolutionsHeader & { items: MoreSolution[] };
  index: SolutionsHeader & { industryTitle: string; functionTitle: string; industries: IndexRow[]; functions: IndexRow[] };
  close: { kicker: string; title: [string, string]; prompt: string; primary: Cta; secondary: Cta };
}

export const solutions: SolutionsPage = {
  seo: {
    title: "Solutions",
    description: `${hero.payoff} ${hero.lede}`,
    path: "/solutions",
  },
  sections,
  sectionsLabel: "Solutions page sections",
  hero,
  featured: {
    num: "01",
    label: "Built on Akashic",
    setup: "Start from a solution",
    payoff: "that already does the whole job.",
    lede: "Enterprise Intelligence for business planning, the Intelligent Procurement Management System for public tenders and Akashic Life for maternal care. Each one runs on all seven Akashic modules.",
    items: featured,
    foundation: {
      name: "Akashic",
      caption: "Every solution. All seven modules.",
      description: "Shared data, intelligence and governance, from the first record to the final decision.",
      modules: solutionModules,
    },
  },
  more: {
    num: "02",
    label: "More solutions",
    setup: "More on the same foundation.",
    payoff: "Start with one. Add the next.",
    lede: "Each solution reuses the same data, governance and models, so the next one never starts from scratch.",
    items: more,
  },
  index: {
    num: "03",
    label: "By industry and function",
    setup: "Find your starting point.",
    payoff: "By the sector you serve, or the team you lead.",
    lede: "Each line names the solutions that fit, so the first conversation starts from your problem.",
    industryTitle: "By industry",
    functionTitle: "By function",
    industries,
    functions,
  },
  close: {
    kicker: "Thirty minutes with our team",
    title: ["Bring one priority use case.", "See what your data can decide."],
    prompt: "A walkthrough of Akashic or any of its solutions, built around a problem you already have.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
  },
};
