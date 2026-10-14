import type { PageSection } from "./pageSection";

interface ProblemFact {
  figure: string;
  claim: string;
  source: string;
  sourceUrl: string;
}

interface HomeService {
  number: string;
  title: string;
  description: string;
  scope: string;
  href: string;
}

interface ProofNode {
  id: string;
  icon: string;
  beforeLabel: string;
  beforeDetail: string;
  afterLabel: string;
}

export const HOME_PROOF = {
  title: ["Two realities.", "One organisation."],
  description: "The same team. The same data. A different way to work.",
  before: "Before DHIRA",
  after: "After DHIRA",
  instruction: "Drag the divider. See what changes.",
  keyboardInstruction: "Use the arrow keys to move the divider. Home shows after; End shows before.",
  summary: "From disconnected tools to a shared, governed foundation.",
  illustrationLabel: "Illustrative comparison",
  cta: "See how we deliver it",
  nodes: [
    { id: "systems", icon: "Enterprise", beforeLabel: "Core systems", beforeDetail: "Disconnected records", afterLabel: "Connected sources" },
    { id: "customers", icon: "Customer Stories", beforeLabel: "Customer data", beforeDetail: "Conflicting records", afterLabel: "Governed customer records" },
    { id: "reporting", icon: "Akashic BI", beforeLabel: "Reporting", beforeDetail: "Manual exports", afterLabel: "Traceable answers" },
    { id: "ownership", icon: "Access Control", beforeLabel: "Delivery", beforeDetail: "Fragmented ownership", afterLabel: "One accountable team" },
    { id: "workflows", icon: "Akashic Workflow", beforeLabel: "Spreadsheets", beforeDetail: "Manual reconciliation", afterLabel: "Automated workflows" },
    { id: "foundation", icon: "Akashic Data Warehouse", beforeLabel: "Legacy systems", beforeDetail: "Isolated data stores", afterLabel: "Shared data foundation" },
  ] satisfies readonly ProofNode[],
} as const;

interface HomeSector {
  id: string;
  name: string;
  image: string;
  alt: string;
  headline: string;
  description: string;
  topics: readonly string[];
}

export const HOME_INDUSTRIES = {
  title: ["A foundation for", "every field."],
  introduction: ["Data, AI and engineering.", "Applied to the work you do."],
  selectorLabel: "Find your industry",
  publicSector: {
    label: "Built for public service, too.",
    link: "Explore public sector",
    href: "/sectors/public-sector",
  },
  sectors: [
    {
      id: "manufacturing", name: "Manufacturing", image: "/sectors/manufacturing-hq.jpg",
      alt: "A large factory hall with overhead cranes and production equipment",
      headline: "Production in context.",
      description: "Connect production, quality and supply-chain data. See what needs attention across the factory floor.",
      topics: ["Production", "Quality", "Supply chain"],
    },
    {
      id: "healthcare", name: "Healthcare", image: "/sectors/healthcare-hq.jpg",
      alt: "An operating theatre with surgical lights, imaging equipment and monitors",
      headline: "A fuller view of care.",
      description: "Bring patient records and clinical signals together, with access governed around the people delivering care.",
      topics: ["Patient records", "Clinical signals", "Privacy"],
    },
    {
      id: "finance", name: "Finance", image: "/sectors/finance-hq.jpg",
      alt: "Glass office towers viewed from street level in a financial district",
      headline: "Follow the risk. Keep the evidence.",
      description: "Connect transactions, customer records and risk signals. Trace each alert back to its source.",
      topics: ["Risk", "Entity resolution", "Audit trails"],
    },
    {
      id: "retail", name: "Retail", image: "/sectors/retail-hq.jpg",
      alt: "Clothing, bags and accessories displayed in a retail shop",
      headline: "Every shelf. One picture.",
      description: "Bring demand, stock and store activity into one view. Plan replenishment with the full picture.",
      topics: ["Demand", "Inventory", "Store operations"],
    },
    {
      id: "education", name: "Education", image: "/sectors/education-hq.jpg",
      alt: "Graduates throwing their caps into the air beside a waterfront",
      headline: "See the whole learner journey.",
      description: "Connect enrolment, attendance and learning outcomes. Identify where learners need support.",
      topics: ["Enrolment", "Student support", "Learning outcomes"],
    },
    {
      id: "energy", name: "Energy", image: "/sectors/energy-hq.jpg",
      alt: "Wind turbines across an open field at sunset",
      headline: "From asset signals to action.",
      description: "Connect asset telemetry, maintenance history and grid operations. Plan the next intervention with context.",
      topics: ["Asset health", "Maintenance", "Grid operations"],
    },
  ] satisfies readonly HomeSector[],
} as const;

export const HOME_DELIVERY = {
  eyebrow: "How we deliver",
  bridge: {
    lead: "Akashic is the platform.",
    /* "delivery partner" matches /akashic's close ("Akashic, the
       platform. DHIRA, your delivery partner."), 14 Oct 2026. */
    payoff: "DHIRA is your delivery partner.",
    targetId: "delivery",
    number: "04",
    label: "HOW WE DELIVER",
  },
  title: ["One team.", "More ways to build."],
  description: [
    "Deploy Akashic, build a product, or extend your team.",
    "Our services work with the platform or independently.",
  ],
  cta: "Explore our services",
  services: [
    {
      number: "01",
      title: "Deploy Akashic",
      description: "Connect your data. Configure the platform. Get your team ready.",
      scope: "Integration · Configuration · Handover",
      href: "/delivery#akashic-deployment",
    },
    {
      number: "02",
      title: "Build your product",
      description: "Custom software, data pipelines and AI, built on the stack you choose.",
      scope: "Applications · Data · AI",
      href: "/delivery#product-engineering",
    },
    {
      number: "03",
      title: "Extend your team",
      description: "Bring in senior engineers and architects for delivery, advice or both.",
      scope: "Engineering · Architecture · Advisory",
      href: "/delivery#advisory-co-engineering",
    },
  ] satisfies readonly HomeService[],
} as const;

export const HOME_PROBLEM = {
  title: ["You asked for one number.", "You got three."],
  description: ["Conflicting data. Delayed decisions.", "Your teams pay the price."],
  evidenceHeading: "It isn’t just you.",
  facts: [
    { figure: "$581B", claim: "invested in AI in 2025.", source: "Stanford HAI, 2026", sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy" },
    { figure: "46%", claim: "of AI pilots never reach production.", source: "S&P Global, 2025", sourceUrl: "https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/" },
  ] satisfies readonly ProblemFact[],
  question: "How many people did we serve?",
  period: "Last quarter",
  scenarioLabel: "Illustrative scenario",
  // Existing illustrative scenario, not customer results or product telemetry.
  answers: [
    { source: "Documents", figure: "1.19", unit: "M", caveat: "Unparsed forms", kind: "documents" },
    { source: "Warehouse", figure: "1.24", unit: "M", caveat: "Stale records", kind: "warehouse" },
    { source: "Live stream", figure: "1.31", unit: "M", caveat: "Lagging feeds", kind: "stream" },
  ],
  spreadLabel: "people. The largest gap between answers.",
  conclusion: "Which number do you act on?",
} as const;

const problemAnswerTotals = HOME_PROBLEM.answers.map((answer) =>
  Math.round(Number(answer.figure) * 1_000_000)
);
export const HOME_PROBLEM_SPREAD = new Intl.NumberFormat("en-GB").format(
  Math.max(...problemAnswerTotals) - Math.min(...problemAnswerTotals)
);

/* Ten stops, down from eleven (23 Jul 2026, homepage pacing pass).
   "Join the team" is gone because careers is a strip now, not a stop — the
   rail lists the page's argument, and a hiring band is not part of it.
   "The difference" was briefly gone too and is back by direction; it is the
   one section where the reader proves the thesis to themselves.
   Order and ids must stay in sync with the [NN] eyebrows in each section. */
export const HOME_SECTIONS: PageSection[] = [
  { id: "hero", label: "Introduction" },
  { id: "problem", label: "The problem" },
  { id: "platform", label: "The platform" },
  { id: "scale", label: "Proven at scale" },
  { id: "delivery", label: "How we deliver" },
  { id: "sectors", label: "Every sector" },
  { id: "proof", label: "The difference" },
  { id: "voices", label: "Voices" },
  { id: "governance", label: "Enterprise trust" },
  { id: "get-started", label: "Get started" },
];

type Dispatch = {
  quote: string;
  name: string;
  role: string;
  org: string;
  index: string;
  avatarPath: string;
};

export const HOME_VOICES: readonly Dispatch[] = [
  {
    quote: "Before Akashic, student performance data lived in isolated state repositories while enrollment records were maintained separately. By deploying Akashic, we unified the academic registers and performance logs of over 1.89 crore students. Every piece brought new depth and undeniable clarity to our national lifecycle tracking.",
    name: "Dr. Amara Collins",
    role: "Programme Lead, National Education",
    org: "EduPlatform",
    index: "01",
    avatarPath: "/avatars/amara.png",
  },
  {
    quote: "Managing emigration approvals and benefit payouts across millions of citizens created a massive reconciliation gap. Akashic consolidated 387,000 active employment records, legacy logs, and biometric cards into a single ledger. What used to take a desk full of physical files is now resolved instantly.",
    name: "Kai Sterling",
    role: "Director of Immigration",
    org: "GovWorkforce",
    index: "02",
    avatarPath: "/avatars/kai.png",
  },
  {
    quote: "Executing a statewide socioeconomic census usually meant collecting spreadsheets from 40 different districts. With Akashic, we ingested, unified, and validated survey responses from millions of households in less than three weeks. We now run policy simulations on a single source of truth that our cabinet trusts implicitly.",
    name: "Lena Harper",
    role: "Senior Policy Official",
    org: "StateGov",
    index: "03",
    avatarPath: "/avatars/lena.png",
  },
];
