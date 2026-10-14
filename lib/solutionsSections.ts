import type { PageSection } from "./pageSection";
import { AKASHIC_SOLUTIONS } from "./akashicSections";

/* ------------------------------------------------------------------ */
/*  /solutions hub (added 14 Oct 2026)                                 */
/* ------------------------------------------------------------------ */
/* Ported from the founder's Solutions section (DHIRA_ai_Website_v2,
   12 Oct 2026) as an editorial register (user-approved over his card
   gallery). The nav links into this page: "All solutions", #ipms and
   #function-<slug>, so keep those ids.
   Copy is DRAFT: the founder's words, with the site's claims rules applied.
   - No week figures. "Working solution in weeks" and the four-week proof of
     concept are unconfirmed (user, 14 Oct 2026); restore once confirmed.
   - Agent work carries the Preview mark (agents ship in preview) and is
     framed as explanation with people deciding, never autonomy.
   - "Golden record" and "Knowledge Graph" are out (legacy term; the site
     says knowledge layer).
   - Enterprise Intelligence IS /solutions/eis (user, 14 Oct 2026), so the
     founder's separate "Enterprise Intelligence System" card is dropped.
   The industry and function mappings are drafted from his copy and need
   his review. */

export const SOLUTIONS_SECTIONS: PageSection[] = [
  { id: "hero", label: "Solutions" },
  { id: "built-on-akashic", label: "Built on Akashic" },
  { id: "more-solutions", label: "More solutions" },
  { id: "industries", label: "By industry" },
  { id: "functions", label: "By function" },
  { id: "talk-to-our-team", label: "Talk to our team" },
];

export const SOLUTIONS_HERO = {
  label: "Solutions",
  setup: "Built on Akashic.",
  payoff: "From business problem to working solution.",
  lede: "Each solution is Akashic, configured around one business process on the same modules, data and governance. We assemble rather than build from scratch.",
};

export type SolutionPoint = { text: string; preview?: boolean };

export type FeaturedSolution = {
  /** Anchor id on this page. */
  id: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  points: SolutionPoint[];
  href: string;
  cta: string;
};

const life = AKASHIC_SOLUTIONS.items.find((item) => item.id === "life");

export const FEATURED_SOLUTIONS: FeaturedSolution[] = [
  {
    id: "enterprise-intelligence",
    name: "Enterprise Intelligence",
    tagline: "Agentic FP&A and MIS",
    headline: "Know where the business will land, long before the month-end pack arrives.",
    description:
      "Enterprise Intelligence does the work of FP&A and MIS. It reads your ERP as the system of record and gives every leader one window into the business.",
    points: [
      { text: "Five views on one data foundation: Customer 360, Project 360, Employee 360, Finance and a rolling 12-month forecast." },
      { text: "The forecast recomputes as invoices, timesheets and opportunities land in the ERP." },
      { text: "Agents explain what changed, with sources. People decide what happens next.", preview: true },
      { text: "Role-based views for the CEO, finance, sales, delivery, HR, legal and IT. Every number traces to its ERP record." },
    ],
    href: "/solutions/eis",
    cta: "Explore Enterprise Intelligence",
  },
  {
    id: "ipms",
    name: "IPMS",
    tagline: "Intelligent Procurement Management System",
    headline: "From indent to secured contract, with evidence at every step.",
    description:
      "IPMS runs public procurement end to end. AI drafts and reads, the rules engine decides, people approve, and every step lands in the audit trail.",
    points: [
      { text: "A 12-stage lifecycle: indent, estimate, qualification criteria, tender, pre-bid, corrigendum, bid opening, evaluation, comparative, award, contract and bank guarantee." },
      { text: "Agents draft tenders from clause and specification libraries, cluster pre-bid queries with cited replies, and read every bid document.", preview: true },
      { text: "Qualification and bank-guarantee checks run as versioned rules, each result linked to the document, page and model version behind it." },
      { text: "Sealed bids stay sealed until approval. Role-based workspaces cover 12 user types. Sovereign AI runs on models hosted inside your boundary." },
    ],
    href: "#talk-to-our-team",
    cta: "Request a walkthrough",
  },
  {
    id: "akashic-life",
    name: "Akashic Life",
    tagline: "Frontline maternal care",
    headline: life?.headline ?? "",
    description: life?.description ?? "",
    points: (life?.stages ?? []).map((stage) => ({ text: `${stage.title}: ${stage.detail.toLowerCase()}.` })),
    href: "/solutions/life",
    cta: "Explore Akashic Life",
  },
];

export type MoreSolution = {
  id: string;
  area: string;
  name: string;
  text: string;
  preview?: boolean;
};

export const MORE_SOLUTIONS: MoreSolution[] = [
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
    text: "AI-assisted claims processing, ML risk scoring for prioritisation, fraud detection and medical sufficiency reporting.",
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

/** Every solution by id, for the industry and function lists. */
export const SOLUTION_LINKS: Record<string, { name: string; href: string }> = Object.fromEntries([
  ...FEATURED_SOLUTIONS.map((s) => [s.id, { name: s.name, href: s.href.startsWith("/") ? s.href : `#${s.id}` }]),
  ...MORE_SOLUTIONS.map((s) => [s.id, { name: s.name, href: `#${s.id}` }]),
]);

export type IndexRow = { id?: string; label: string; href?: string; solutions: string[] };

export const INDUSTRY_INDEX: IndexRow[] = [
  { label: "BFSI", href: "/sectors/finance", solutions: ["claims-fraud"] },
  { label: "Healthcare", href: "/sectors/healthcare", solutions: ["akashic-life", "cancer-care"] },
  { label: "Retail and CPG", href: "/sectors/retail", solutions: ["demand-sensing", "churn-pricing"] },
  { label: "Manufacturing", href: "/sectors/manufacturing", solutions: ["direct-materials", "demand-sensing", "churn-pricing"] },
  { label: "Public sector", href: "/sectors/public-sector", solutions: ["ipms", "citizen-services"] },
  { label: "Education", href: "/sectors/education", solutions: ["learning-outcomes"] },
  { label: "Energy and utilities", href: "/sectors/energy", solutions: ["enterprise-intelligence"] },
];

/* Ids match the nav's "By function" links (lib/navigation.ts). */
export const FUNCTION_INDEX: IndexRow[] = [
  { id: "function-finance", label: "Finance and FP&A", solutions: ["enterprise-intelligence"] },
  { id: "function-procurement", label: "Procurement", solutions: ["ipms", "direct-materials"] },
  { id: "function-supply-chain", label: "Supply chain", solutions: ["demand-sensing", "direct-materials"] },
  { id: "function-operations", label: "Operations", solutions: ["enterprise-intelligence", "demand-sensing"] },
  { id: "function-sales-marketing", label: "Sales and marketing", solutions: ["churn-pricing"] },
  { id: "function-hr", label: "HR and corporate", solutions: ["enterprise-intelligence"] },
  { id: "function-customer-service", label: "Customer service", solutions: ["citizen-services", "claims-fraud"] },
];

export const SOLUTIONS_CLOSE = {
  label: "Talk to our team",
  setup: "Bring one priority use case.",
  payoff: "See what your data can decide.",
  body: "A 30-minute walkthrough of Akashic, Enterprise Intelligence or IPMS, built around a problem you already have.",
};
