/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
/* Every word on / , in section order. The composer is app/page.tsx; each
   key below is one section component's `content` prop.

   Rules that bind this page (docs/DESIGN_SYSTEM.md): no invented figures
   (Rule 4), no roadmap feature presented as live, setup-soft / payoff-ink
   headlines, no em dashes.

   THE STORY (messaging pass, 21 Oct 2026: written for a reader with no
   context; the user found the old page disconnected). Each section answers
   the question the one before it raises:
     hero      what DHIRA is: we build Akashic, which makes your data agree
     [01]      why it matters: your systems disagree, so AI built on them fails
     [02]      what fixes it: Akashic, its five capabilities, its seven modules
     [03]      problems we already solve: three ready-made solutions
     [04]      problems only you have: we plan and build them, with or
               without Akashic
     [05]      where: your sector
     [06]      what changes day to day: before and after
     [07]      proof: national programmes in production
     [08]      who says so
     [09]      is it safe: your data stays yours
     [10]      the next step
   Plain words over jargon; an industry term appears only beside its plain
   meaning. NO SHORT FORMS on this page (user, 21 Oct 2026): full product
   names (never "IPMS"), "Business Intelligence" not "BI", figures in words
   ("1.19 million", not "1.19M"). "AI" is the one exception. */

import type { ProvenAtScaleBlock } from "../blocks";
import type { Cta, Eyebrow, PageSection, TwoTone } from "../types";
import { solutionModules, type AkashicSolution } from "./akashic";

/* ---------------- Types: the CMS contract for this page ---------------- */

export interface HomeHero {
  badge: { lead: string; product: string; claim: string; href: string };
  title: {
    first: string;
    secondLead: string;
    /** Rotating phrases between "Answers you can" and "are not."; "act on" is
        deliberately absent because the subhead owns it. */
    phrases: string[];
    tail: string;
  };
  lede: [string, string];
  primary: Cta;
  secondary: Cta;
}

export interface ProblemFact {
  figure: string;
  claim: string;
  source: string;
  sourceUrl: string;
}

export interface ProblemAnswer {
  source: string;
  figure: string;
  unit: string;
  caveat: string;
  kind: "documents" | "warehouse" | "stream";
}

export interface HomeProblem {
  eyebrow: Eyebrow;
  title: TwoTone;
  description: string[];
  evidenceHeading: string;
  facts: ProblemFact[];
  question: string;
  period: string;
  scenarioLabel: string;
  /** Accessible summary of the divergent-answers figure. */
  figureLabel: string;
  answers: ProblemAnswer[];
  spreadLabel: string;
  conclusion: string;
  verdict: TwoTone;
}

/** [02] Meet Akashic: the intro with the five capabilities inside the dome,
    then the seven modules beside their drawings. The logo strip was cut on
    20 Oct 2026 (founder); the particle "signals" demo gave way to the
    modules on 21 Oct 2026 (user), as the lead-in to [03] Solutions. */
export interface HomePlatform {
  eyebrow: Eyebrow;
  hero: { kicker: string; title: string; lede: string; cta: Cta };
  /** `term` is the industry name, set small above a plain-language title,
      so a newcomer and a data team both read the line. */
  features: { term: string; title: string; text: string }[];
  /** In the platform's module order: index-matched to MOMENTS in
      demos/mockups/AkashicModuleMomentsMockup and to `solutionModules`. */
  modules: { title: TwoTone; lede: string; items: { name: string; text: string }[] };
}

export interface HomeSolution {
  id: AkashicSolution["id"];
  /** The process the illustration represents. */
  audience: string;
  /** In full: the homepage spells out what the nav spells out. */
  name: string;
  /** What the reader gains, in one line. */
  benefit: string;
  /** Accessible description of the solution's process drawing. */
  illustrationLabel: string;
  href: string;
  linkLabel: string;
}

export interface HomeSolutions {
  eyebrow: Eyebrow;
  title: TwoTone;
  description: string;
  /** All seven modules, in the order every figure draws them. */
  modules: string[];
  items: HomeSolution[];
  foundation: { name: string; caption: string; description: string };
  cta: Cta;
}

export interface HomeService {
  number: string;
  title: string;
  description: string;
  scope: string;
  href: string;
}

export interface HomeDelivery {
  eyebrow: Eyebrow;
  title: TwoTone;
  description: string;
  cta: Cta;
  services: HomeService[];
}

export interface HomeSector {
  id: string;
  name: string;
  image: string;
  alt: string;
  headline: string;
  description: string;
  topics: string[];
  href: string;
}

export interface HomeSectors {
  eyebrow: Eyebrow;
  title: TwoTone;
  introduction: string;
  selectorLabel: string;
  tablistLabel: string;
  /** Prefix of each sector's link; the sector name follows in lower case. */
  explore: string;
  sectors: HomeSector[];
  publicSector: { label: string; link: Cta };
}

export interface ProofNode {
  id: string;
  /** Picks the node's glyph in the comparison drawing. */
  icon: string;
  beforeLabel: string;
  beforeDetail: string;
  afterLabel: string;
}

export interface HomeProof {
  eyebrow: Eyebrow;
  title: TwoTone;
  description: string;
  before: string;
  after: string;
  /** The wordmark printed on the comparison seam. */
  seamLabel: string;
  instruction: string;
  keyboardInstruction: string;
  viewLabel: string;
  views: { before: string; compare: string; after: string };
  sliderLabel: string;
  /** The slider's spoken value: "<n>% before DHIRA, <n>% after DHIRA". */
  sliderValue: { before: string; after: string };
  dragHint: string;
  summary: string;
  illustrationLabel: string;
  nodes: ProofNode[];
}

export interface Dispatch {
  quote: string;
  name: string;
  role: string;
  org: string;
  index: string;
  avatarPath: string;
}

export interface HomeVoices {
  eyebrow: Eyebrow;
  title: TwoTone;
  /** The word highlighted in blue wherever it appears in a quote. */
  highlight: string;
  previous: string;
  next: string;
  chooser: string;
  dispatches: Dispatch[];
}

export interface HomeGovernance {
  eyebrow: Eyebrow;
  title: TwoTone;
  kpis: { figure: string; label: string }[];
  frameworksLabel: string;
  /** `id` picks the framework's mark (dpdp, iso, soc2, gdpr, certin). */
  frameworks: { id: string; label: string; sub: string }[];
}

export interface HomeCareers {
  /** Unnumbered: the strip follows the close and stays out of the index. */
  eyebrow: string;
  title: TwoTone;
  cta: Cta;
  rolesHref: string;
}

export interface HomeClose {
  badge: string;
  title: string;
  body: string[];
  primary: Cta;
  secondary: Cta;
}

export interface HomePage {
  sections: PageSection[];
  sectionsLabel: string;
  hero: HomeHero;
  problem: HomeProblem;
  platform: HomePlatform;
  solutions: HomeSolutions;
  scale: ProvenAtScaleBlock;
  delivery: HomeDelivery;
  sectors: HomeSectors;
  proof: HomeProof;
  voices: HomeVoices;
  governance: HomeGovernance;
  careers: HomeCareers;
  close: HomeClose;
}

/* ---------------- Content ---------------- */

export const home: HomePage = {
  /* Previous copy and visuals restored; retain the revised section order.
     Keep this order, the eyebrows and app/page.tsx in sync. */
  sections: [
    { id: "hero", label: "Introduction" },
    { id: "problem", label: "The problem" },
    { id: "platform", label: "The platform" },
    { id: "solutions", label: "Solutions" },
    { id: "delivery", label: "Our services" },
    { id: "sectors", label: "Every sector" },
    { id: "proof", label: "The difference" },
    { id: "scale", label: "In production" },
    { id: "voices", label: "Partner voices" },
    { id: "governance", label: "Governance" },
    { id: "get-started", label: "Get started" },
  ],
  sectionsLabel: "Homepage sections",

  hero: {
    badge: { lead: "Our platform", product: "Akashic", claim: "In production at national scale", href: "/akashic" },
    title: {
      first: "Answers are easy.",
      secondLead: "Answers you can",
      phrases: ["stand on", "build on", "decide on", "commit to"],
      tail: "are not.",
    },
    /* Says what DHIRA is in the first sentence a visitor reads: the company
       builds Akashic, and Akashic makes an organisation's data agree. */
    lede: [
      "DHIRA builds Akashic, the platform that makes all your data agree.",
      "Your teams and your AI answer from it, and every answer shows its source.",
    ],
    primary: { label: "See Akashic in action", href: "#platform" },
    secondary: { label: "Talk to our team", href: "#talk-to-our-team" },
  },

  problem: {
    eyebrow: { number: "01", label: "The problem" },
    title: { setup: "You asked for one number.", payoff: "You got three." },
    description: ["Every system holds its own version of the truth.", "Decisions wait while teams argue over which one is right."],
    evidenceHeading: "It isn’t just you.",
    facts: [
      { figure: "$581", claim: "billion invested in AI in 2025.", source: "Stanford AI Index, 2026", sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy" },
      { figure: "46%", claim: "of AI pilots never reach production.", source: "S&P Global, 2025", sourceUrl: "https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/" },
    ],
    question: "How many people did we serve?",
    period: "Last quarter",
    scenarioLabel: "Illustrative scenario",
    figureLabel: "One question produces three different totals across documents, a warehouse and live streams.",
    // An illustrative scenario, not customer results or product telemetry.
    /* Plain names for the three sources and a plain reason each disagrees. */
    answers: [
      { source: "Forms", figure: "1.19", unit: "million", caveat: "Some forms not yet read", kind: "documents" },
      { source: "Reports", figure: "1.24", unit: "million", caveat: "Last refreshed weeks ago", kind: "warehouse" },
      { source: "Live system", figure: "1.31", unit: "million", caveat: "Duplicates still counted", kind: "stream" },
    ],
    spreadLabel: "people between the highest and the lowest answer.",
    conclusion: "Which number do you act on?",
    /* The bridge into [02]: names the cause Akashic fixes. */
    verdict: {
      setup: "AI is only as good as the data under it.",
      payoff: "Most organisations never made that data agree.",
    },
  },

  /* [02] answers [01] in the platform's own vocabulary, neither simplified
     nor spec sheet. Each part has one job: the intro names it, the features
     are what your AI knows, the signals what it does. No claim is made twice.
     "Nothing to rip out" (the logo strip) and "Seven modules" (the close)
     were removed on 20 Oct 2026 at the founder's request: /akashic owns the
     systems it connects to and the module list. */
  platform: {
    eyebrow: { number: "02", label: "The platform" },
    hero: {
      kicker: "Our data and AI platform",
      title: "Meet Akashic",
      lede: "Akashic connects the systems you already run, makes their data agree, and puts AI to work on it.",
      cta: { label: "Explore Akashic", href: "/akashic" },
    },
    /* Shown inside the dome, in the first fold, so the reader learns what
       Akashic does before anything else (user, 21 Oct 2026). The industry
       term (22 Sep 2026 direction) rides above a plain title. Captions stay
       around 60 characters so the five set to two lines each. */
    features: [
      { term: "Entity resolution", title: "One record each", text: "Customers, citizens and assets matched across all your systems." },
      { term: "Semantic layer", title: "Terms defined once", text: "Revenue means the same thing in every report and every answer." },
      { term: "Document intelligence", title: "Every document read", text: "Contracts, forms and emails linked to the records they describe." },
      { term: "Knowledge layer", title: "Context your AI can use", text: "The relationships and rules that explain how your organisation works." },
      { term: "Data lineage", title: "Every figure traced", text: "Any number followed back to its source, as it stood on any date." },
    ],
    /* The seven modules, named as the [03] slab names them, each with what it
       does in plain words; the drawing beside each shows it at work. DO NOT
       OVERSELL: nothing here may promise that AI decides or acts on its own,
       and nothing may claim write-back. */
    modules: {
      title: { setup: "Seven modules, one platform.", payoff: "Start with the one you need." },
      lede: "Each module does one job and shares the same data, definitions and access rules with the others. Use one, or switch on several together.",
      items: [
        { name: "Data Pipelines", text: "Brings in data from every system you run, checked as it arrives." },
        { name: "Master Data", text: "Matches customers, citizens and assets into one record each." },
        { name: "Warehouse", text: "Stores the data and defines every figure once." },
        { name: "Machine Learning", text: "Builds forecasts from the same governed data." },
        { name: "Ask Akashic", text: "Answers plain questions, with every figure cited." },
        { name: "Business Intelligence", text: "Dashboards and alerts built on the same definitions." },
        { name: "Governance", text: "Access rules, lineage and audit across every module." },
      ],
    },
  },

  /* [03] The solutions are the point (user, 21 Oct 2026: "the MVP is the
     solution itself... people care about actual solutions", not that Akashic
     builds them faster). The header names what is solved; "runs on Akashic"
     is the lede's second beat and the drawing's job. Each block names who it
     serves and what they gain. All three use every Akashic module (user,
     21 Oct 2026). [04] answers the problems these do not cover. */
  solutions: {
    eyebrow: { number: "03", label: "Solutions" },
    /* Headline: two lines, each on one line from 1024px. Lede: two lines. */
    title: { setup: "Problems we already solve.", payoff: "Off the shelf, on your data." },
    description: "Purpose-built for business planning, public procurement and maternal care. Every solution runs on the complete Akashic platform.",
    modules: solutionModules,
    items: [
      {
        id: "ei",
        audience: "Business planning",
        name: "Enterprise Intelligence",
        benefit: "See where the business is heading. Trace every forecast to the source.",
        illustrationLabel: "Invoices, timesheets and opportunities feed a rolling twelve-month forecast. The illustration connects incoming records to a revised forecast.",
        href: "/solutions/eis",
        linkLabel: "See the solution",
      },
      {
        id: "ipms",
        audience: "Public procurement",
        name: "Intelligent Procurement Management System",
        benefit: "Award contracts you can defend, with evidence at every step.",
        illustrationLabel: "An illustrative tender requirement for prior delivery is linked to a completion certificate in the bid. The evidence trail supports committee review.",
        href: "/solutions#ipms",
        linkLabel: "See the solution",
      },
      {
        id: "life",
        audience: "Maternal care",
        name: "Akashic Life",
        benefit: "Read the risk at the visit. Carry the record into care.",
        illustrationLabel: "An antenatal visit is screened offline and saved on the health worker's phone. The same mother's care record reaches the health centre when connected.",
        href: "/solutions/life",
        linkLabel: "See the solution",
      },
    ],
    foundation: {
      name: "Akashic",
      caption: "Every solution. All seven modules.",
      description: "Shared data, intelligence and governance, from the first record to the final decision.",
    },
    cta: { label: "All solutions", href: "/solutions" },
  },

  delivery: {
    /* The reader's own problems, and DHIRA as more than Akashic (user, 21 Oct
       2026: the earlier headers "sound obsessed with Akashic"). It answers
       [03]: those are problems we already solve; this is for the problems
       only you have. The three cards are the three service lines the nav
       names, in its order. */
    eyebrow: { number: "04", label: "Our services" },
    title: { setup: "Need it built for you?", payoff: "Our engineers plan and build it." },
    description: "Strategy, software and AI for the problems only you have, with or without Akashic. We stay until it works.",
    cta: { label: "Explore our services", href: "/delivery" },
    services: [
      {
        number: "01",
        title: "Plan what to build",
        description: "Find where data and AI will pay off, and map the route there.",
        scope: "Strategic Advisory",
        href: "/delivery#advisory",
      },
      {
        number: "02",
        title: "Build what you need",
        description: "Software, data platforms and data pipelines, on the stack you choose.",
        scope: "Engineering at Scale",
        href: "/delivery#engineering",
      },
      {
        number: "03",
        title: "Bring AI into your work",
        description: "Assistants and governed workflows, taken from pilot to production.",
        scope: "AI Solutions and Accelerators",
        href: "/delivery#ai-solutions",
      },
    ],
  },

  sectors: {
    eyebrow: { number: "05", label: "Every sector" },
    title: { setup: "Whatever your sector,", payoff: "we know the work." },
    introduction: "Six industries we serve, each with its own systems, records and questions.",
    selectorLabel: "Find your industry",
    tablistLabel: "Industries",
    explore: "Explore",
    /* Each headline sits on its photograph on ONE line at every width, so it
       stays at 22 characters or fewer (user, 21 Oct 2026). */
    sectors: [
      {
        id: "manufacturing", name: "Manufacturing", image: "/sectors/manufacturing-hq.jpg", href: "/sectors/manufacturing",
        alt: "A large factory hall with overhead cranes and production equipment",
        headline: "The plant in one view.",
        description: "Connect production, quality and supply-chain data. See what needs attention across the factory floor.",
        topics: ["Production", "Quality", "Supply chain"],
      },
      {
        id: "healthcare", name: "Healthcare", image: "/sectors/healthcare-hq.jpg", href: "/sectors/healthcare",
        alt: "An operating theatre with surgical lights, imaging equipment and monitors",
        headline: "Every patient in view.",
        description: "Bring patient records and clinical signals together, with access governed around the people delivering care.",
        topics: ["Patient records", "Clinical signals", "Privacy"],
      },
      {
        id: "finance", name: "Finance", image: "/sectors/finance-hq.jpg", href: "/sectors/finance",
        alt: "Glass office towers viewed from street level in a financial district",
        headline: "Every alert, traced.",
        description: "Connect transactions, customer records and risk signals. Trace each alert back to its source.",
        topics: ["Risk", "Customer records", "Audit trails"],
      },
      {
        id: "retail", name: "Retail", image: "/sectors/retail-hq.jpg", href: "/sectors/retail",
        alt: "Clothing, bags and accessories displayed in a retail shop",
        headline: "Stock where it sells.",
        description: "Bring demand, stock and store activity into one view. Plan replenishment with the full picture.",
        topics: ["Demand", "Inventory", "Store operations"],
      },
      {
        id: "education", name: "Education", image: "/sectors/education-hq.jpg", href: "/sectors/education",
        alt: "Graduates throwing their caps into the air beside a waterfront",
        headline: "See who needs support.",
        description: "Connect enrolment, attendance and learning outcomes. Identify where learners need support.",
        topics: ["Enrolment", "Student support", "Learning outcomes"],
      },
      {
        id: "energy", name: "Energy", image: "/sectors/energy-hq.jpg", href: "/sectors/energy",
        alt: "Wind turbines across an open field at sunset",
        headline: "Repairs planned ahead.",
        description: "Connect sensor readings, maintenance history and grid operations. Plan each repair with the full context.",
        topics: ["Asset health", "Maintenance", "Grid operations"],
      },
    ],
    publicSector: {
      label: "Built for public service, too.",
      link: { label: "Explore public sector", href: "/sectors/public-sector" },
    },
  },

  /* TheProof stays, by direction (23 Jul 2026): it is the one place on the
     page where the reader proves the thesis to themselves by moving the
     seam. Do not cut it without asking. */
  proof: {
    eyebrow: { number: "06", label: "The difference" },
    title: { setup: "Same team. Same data.", payoff: "Less reconciling, more deciding." },
    description: "One organisation, before DHIRA and after. The hours spent reconciling figures go back into decisions.",
    before: "Before DHIRA",
    after: "After DHIRA",
    seamLabel: "DHIRA",
    instruction: "Drag the divider. See what changes.",
    keyboardInstruction: "Use the arrow keys to move the divider. Home shows after; End shows before.",
    viewLabel: "Comparison view",
    views: { before: "Before", compare: "Compare", after: "After" },
    sliderLabel: "Before and after comparison",
    sliderValue: { before: "before DHIRA", after: "after DHIRA" },
    dragHint: "Drag",
    summary: "From disconnected tools to a shared, governed foundation.",
    illustrationLabel: "Illustrative comparison",
    nodes: [
      { id: "systems", icon: "Enterprise", beforeLabel: "Core systems", beforeDetail: "Disconnected records", afterLabel: "Connected sources" },
      { id: "customers", icon: "Customer Stories", beforeLabel: "Customer data", beforeDetail: "Conflicting records", afterLabel: "Governed customer records" },
      { id: "reporting", icon: "Akashic BI", beforeLabel: "Reporting", beforeDetail: "Manual exports", afterLabel: "Traceable answers" },
      { id: "ownership", icon: "Access Control", beforeLabel: "Delivery", beforeDetail: "Fragmented ownership", afterLabel: "One accountable team" },
      { id: "workflows", icon: "Akashic Workflow", beforeLabel: "Spreadsheets", beforeDetail: "Manual reconciliation", afterLabel: "Automated workflows" },
      { id: "foundation", icon: "Akashic Data Warehouse", beforeLabel: "Legacy systems", beforeDetail: "Isolated data stores", afterLabel: "Shared data foundation" },
    ],
  },

  /* Deployment evidence follows the offer and the change in daily work. */
  scale: {
    number: "07",
    eyebrow: "In production",
    title: { setup: "Proven at national scale.", payoff: "Ready for your organisation." },
    description: "Not pilots. National systems in production, on the public record.",
    storiesLabel: "Akashic deployments in production",
    storyNoun: "deployment",
  },

  /* DRAFT: the three dispatches are placeholder voices. Executives supply
     the final testimonials at hand-off. */
  voices: {
    eyebrow: { number: "08", label: "Partner voices" },
    title: { setup: "Ask the people who run it.", payoff: "In their own words." },
    highlight: "Akashic",
    previous: "Previous partner voice",
    next: "Next partner voice",
    chooser: "Choose a partner voice",
    dispatches: [
      {
        quote: "Before Akashic, student performance data lived in isolated state repositories while enrolment records were maintained separately. By deploying Akashic, we unified the academic registers and performance logs of over 18.9 million students. Every piece brought new depth and undeniable clarity to our national lifecycle tracking.",
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
    ],
  },

  /* Company trust, not product features: the policy engine lives on
     /akashic. DRAFT: the certification bar awaits the final list from the
     executives at hand-off. */
  governance: {
    eyebrow: { number: "09", label: "Governance" },
    title: { setup: "Your data stays yours.", payoff: "Governed inside your walls." },
    kpis: [
      { figure: "Zero", label: "keys or data we hold" },
      { figure: "100%", label: "in your own infrastructure" },
      { figure: "In-region", label: "storage and processing" },
      { figure: "Never", label: "used to train models" },
    ],
    frameworksLabel: "Independently certified",
    /* Full names, no acronyms (user, 21 Oct 2026). ISO 27001 and SOC 2 are
       the standards' own names. */
    frameworks: [
      { id: "dpdp", label: "Digital Personal Data Protection Act", sub: "India" },
      { id: "iso", label: "ISO 27001", sub: "Information security management" },
      { id: "soc2", label: "SOC 2 Type II", sub: "Security and availability controls" },
      { id: "gdpr", label: "General Data Protection Regulation", sub: "European Union" },
      { id: "certin", label: "Indian Computer Emergency Response Team", sub: "Cyber security directions" },
    ],
  },

  careers: {
    eyebrow: "Careers",
    title: { setup: "Join the team behind Akashic.", payoff: "Build what national programmes run on." },
    cta: { label: "Explore open roles", href: "/careers" },
    rolesHref: "/careers#open-roles",
  },

  close: {
    badge: "Deployed at national scale",
    title: "Ground every decision in fact.",
    /* The whole page in three lines: connect, agree, answer. */
    body: [
      "Connect every system and document you run.",
      "Make the data agree, one record for every customer, citizen and asset.",
      "Answer from it, every figure traced to its source.",
    ],
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    /* A close only offers forward moves: the platform page, not #platform. */
    secondary: { label: "Explore the platform", href: "/akashic" },
  },
};
