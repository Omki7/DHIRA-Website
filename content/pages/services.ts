/* Services (/services). Rebuilt 26 Oct 2026 so the page reads as the same
   site as home and /akashic: the shared hero cadence (rotating phrase, blue
   underline), drawings that carry real words (named systems, the sample
   business, cited answers), figure frames with a legend foot, and the
   service lines named exactly as the nav and homepage [04] name them.

   Story spine (a newcomer reads only eyebrows and headlines):
     hero   What is this? Data and AI systems your teams can run on.
     [01]   What do you do? Plan, build, bring AI in (home [04]'s words).
     [02]   How would we work together? Five models, on Akashic or your stack.
     [03]   Can you build what we need? Six disciplines, layer by layer.
     [04]   How do we stay in control? Four stages, a sign-off at each gate.
     [05]   Have you done this at scale? The national programmes.
     [06]   What do we own afterwards? The operating pack and the terms.
     [07]   Questions.  [08] Start with your problem.

   Claim owners: hero = production, [01] = the three service lines, [02] =
   which way to work (who builds, who runs), [03] = where Akashic fits,
   [04] = sign-off, [05] = evidence, [06] = ownership, [07] = clarification.
   Unsourced
   availability, latency, sprint and universal ownership guarantees stay out;
   commercial terms are agreed per engagement. Drawing figures are lifted
   from the sample business on home and /akashic, never new. */

import type { ProvenAtScaleBlock } from "../blocks";
import type { Cta, Eyebrow, Faq, PageSection, Seo, TwoTone } from "../types";

interface DeliverySection {
  eyebrow: Eyebrow;
  title: TwoTone;
  lede: string;
}

/** Source systems keep the colours they carry on the homepage cards. */
export type ServiceSource = "salesforce" | "netsuite" | "plan" | "documents";

/** Who does a part of the work: DHIRA, your team, or both together. */
export type ServiceParty = "dhira" | "you" | "together";

export interface ServiceModel {
  id: string;
  title: string;
  /** What the reader gets, as a noun phrase. */
  need: string;
  builds: ServiceParty;
  runs: ServiceParty;
  /** The detail panel: how the engagement works, then who does what. */
  description: string;
  delivery: string[];
  customer: string[];
  /** An older anchor that still lands on this model. */
  legacyAnchor?: string;
}

export interface ServicesPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: {
    badge: { product: string; claim: string; href: string };
    /** "{lead} / {tail} {phrase}", the phrase rotating under the blue rule. */
    title: { lead: string; tail: string; phrases: string[] };
    lede: string;
    primary: Cta;
    secondary: Cta;
    route: {
      caption: string;
      lanes: { systems: string; team: string; production: string };
      sources: { name: string; what: string; source: ServiceSource }[];
      stages: string[];
      outcomes: { kind: string; title: string; who: string }[];
      live: string;
      handover: string;
      note: string;
    };
  };
  services: DeliverySection & {
    outputLabel: string;
    lines: {
      id: string;
      /** The nav's name for the line. */
      scope: string;
      /** Homepage [04]'s card title, so the click lands on the same words. */
      title: string;
      description: string;
      /** Scope as tags: three words or fewer each. */
      items: { label: string; preview?: boolean }[];
      output: string;
      drawing: "advisory" | "engineering" | "ai";
      drawingLabel: string;
    }[];
  };
  models: DeliverySection & {
    question: string;
    /** What the pause control stops, for its accessible name. */
    tour: string;
    /** The two branches, in tree order; their models are the leaves. */
    groups: { id: "akashic" | "stack"; label: string; title: string; items: ServiceModel[] }[];
    keys: { builds: string; runs: string };
    parties: Record<ServiceParty, string>;
    detail: { delivery: string; customer: string };
    spectrum: { dhira: string; you: string };
    coda: string;
  };
  capabilities: DeliverySection & {
    link: Cta;
    /** What the pause control stops, for its accessible name. */
    tour: string;
    columns: { layer: string; work: string; fit: string };
    detail: { delivery: string; fit: string };
    layers: {
      id: string;
      label: string;
      /** The right-hand column for this layer: Akashic modules, where it
          runs, or the one custom node. */
      nodes: { id: string; name: string; preview?: boolean; custom?: boolean }[];
      items: {
        id: string;
        title: string;
        scope: string;
        deliverables: string[];
        /** Ids of the nodes in this layer that cover the discipline. */
        fit: string[];
      }[];
    }[];
    legend: { module: string; custom: string };
  };
  methodology: DeliverySection & {
    lanes: { stages: string; run: string };
    outputLabel: string;
    reviewLabel: string;
    stages: { id: string; name: string; description: string; deliverable: string; review: string }[];
    run: string;
    legend: { stage: string; signoff: string; team: string };
    coda: string;
  };
  proven: ProvenAtScaleBlock & { link: Cta };
  fit: DeliverySection & {
    packLabel: string;
    documents: { title: string; detail: string }[];
    handover: { build: string; run: string };
    items: { title: string; description: string }[];
    note: string;
  };
  faq: DeliverySection & { groups: { heading: string; items: Faq[] }[] };
  close: DeliverySection & {
    primary: Cta;
    secondary: Cta;
    agenda: { label: string; text: string }[];
    footer: string;
    flow: string;
  };
}

export const services: ServicesPage = {
  seo: {
    title: "Services | Data, AI and Product Engineering",
    description: "From data and AI strategy to production delivery. DHIRA brings advisory, platform implementation, custom engineering and embedded teams to your business.",
    path: "/services",
  },
  sections: [
    { id: "hero", label: "Introduction" },
    { id: "services", label: "Our services" },
    { id: "engagement-models", label: "Ways to work" },
    { id: "capabilities", label: "What we build" },
    { id: "methodology", label: "How a delivery runs" },
    { id: "proven-at-scale", label: "In production" },
    { id: "partnership-fit", label: "What you own" },
    { id: "faq", label: "Questions" },
    { id: "talk-to-our-team", label: "Get started" },
  ],
  sectionsLabel: "Services page sections",

  /* The homepage hero's cadence ("Answers you can stand on"), turned to the
     services gain: systems a team can run on. Production is the hero's word;
     homepage [01] cites the pilots that never reach it. */
  hero: {
    badge: { product: "Services", claim: "With Akashic or on your stack", href: "#engagement-models" },
    title: { lead: "Data and AI systems", tail: "your teams can", phrases: ["run on.", "build on.", "rely on."] },
    lede: "Strategy, engineering and AI from one accountable team, on Akashic or on the stack you already run. We stay until the system works in production.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See what we deliver", href: "#services" },
    route: {
      caption: "Your systems feed one DHIRA team, which defines, designs, builds and launches the work. The results run in production and the line hands over to your team.",
      lanes: { systems: "Your systems", team: "One DHIRA team", production: "In production" },
      sources: [
        { name: "Salesforce", what: "Orders", source: "salesforce" },
        { name: "NetSuite", what: "Invoices", source: "netsuite" },
        { name: "Sales plan", what: "Targets", source: "plan" },
        { name: "Contracts", what: "PDF and email", source: "documents" },
      ],
      stages: ["Define", "Design", "Build", "Launch"],
      outcomes: [
        { kind: "Dashboard", title: "Revenue against plan", who: "Regional heads" },
        { kind: "Forecast", title: "Demand, next 12 weeks", who: "Planners" },
        { kind: "Assistant", title: "Answers from contracts", who: "Legal" },
      ],
      live: "Live",
      handover: "Handed over · your team runs it",
      note: "Illustrative engagement",
    },
  },

  /* [01] The three service lines in the homepage's own words: the nav name
     rides above as the label, homepage [04]'s card title is the heading. */
  services: {
    eyebrow: { number: "01", label: "Our services" },
    title: { setup: "Know what to build,", payoff: "then see it built and in use." },
    lede: "Three service lines, one accountable team. Bring DHIRA in for one of them or for the whole route from first idea to daily use.",
    outputLabel: "You leave with",
    lines: [
      {
        id: "advisory",
        scope: "Strategic Advisory",
        title: "Plan what to build",
        description: "Find where data and AI will pay off, and map the route there.",
        items: [{ label: "Readiness review" }, { label: "Use case priorities" }, { label: "Architecture and roadmap" }],
        output: "A prioritised roadmap with scope, dependencies and success measures.",
        drawing: "advisory",
        drawingLabel: "Candidate use cases plotted by value to the business against readiness of the data. Demand forecast scores high on both and is marked as the place to start.",
      },
      {
        id: "engineering",
        scope: "Engineering at Scale",
        title: "Build what you need",
        description: "Software, data platforms and data pipelines, on the stack you choose.",
        items: [{ label: "Data platforms" }, { label: "Data pipelines" }, { label: "Business applications" }, { label: "Embedded teams" }],
        output: "Tested software, connected data and documented technical decisions.",
        drawing: "engineering",
        drawingLabel: "Salesforce, NetSuite and the sales plan feed one data pipeline with schema tests, quality rules and lineage, which runs in production.",
      },
      {
        id: "ai-solutions",
        scope: "AI Solutions and Accelerators",
        title: "Bring AI into your work",
        description: "Assistants and governed workflows, taken from pilot to production.",
        items: [{ label: "Knowledge assistants" }, { label: "Machine Learning" }, { label: "AI agent workflows", preview: true }],
        output: "An evaluated AI use case in daily work, with human review built in.",
        drawing: "ai",
        drawingLabel: "A plain question about contract renewals is answered with two cited sources, and a person on your team reviews the answer.",
      },
    ],
  },

  /* [02] A decision, drawn as a tree (homepage [01]'s branching question):
     what do you need, a platform or something built? The five models are
     the leaves, ordered from DHIRA doing the most to your team doing the
     most, and each leaf carries only what differs: who builds, who runs.
     Picking a leaf traces its route and opens its detail (description, who
     delivers, who leads). Rewritten 26 Oct 2026 (user: the responsibility
     table was "odd and hard to interpret"; then "elevate the same idea"). */
  models: {
    eyebrow: { number: "02", label: "Ways to work together" },
    title: { setup: "Work with us the way", payoff: "your organisation already works." },
    lede: "Start with what you need: a platform ready to run, or something built for you. Then choose how much of the work your own team takes on.",
    question: "What do you need?",
    tour: "the engagement tour",
    groups: [
      {
        id: "akashic",
        label: "On Akashic",
        title: "A platform, ready to run",
        items: [
          { id: "saas", title: "Managed Akashic", need: "Akashic set up, run and supported for you.", builds: "dhira", runs: "dhira", legacyAnchor: "akashic-deployment",
            description: "Bring your sources and priority use cases onto Akashic, with implementation and support scoped to your environment.",
            delivery: ["Platform configuration and source integration", "Use case delivery and team onboarding"],
            customer: ["Data access and business definitions", "Acceptance and adoption across teams"],
          },
          { id: "whitelabel", title: "White label", need: "Akashic under your brand, run by your team.", builds: "dhira", runs: "you",
            description: "Shape a branded Akashic implementation for your organisation or your customers. Hosting, access and support are agreed before delivery.",
            delivery: ["Brand configuration and platform integration", "Deployment design and operational handover"],
            customer: ["Brand experience and customer relationships", "Hosting requirements and service ownership"],
          },
        ],
      },
      {
        id: "stack",
        label: "On your stack",
        title: "Something built for you",
        items: [
          { id: "customai", title: "Custom technology and AI", need: "A solution for a problem only you have.", builds: "dhira", runs: "you",
            description: "Build a focused application, model or integration around your requirements, with technology chosen against your data, controls and operations.",
            delivery: ["Solution architecture and implementation", "Evaluation, integration and documentation"],
            customer: ["Domain expertise and acceptance criteria", "Business review and operational decisions"],
          },
          { id: "engineering", title: "Product engineering", need: "Your software product, built or modernised.", builds: "dhira", runs: "you", legacyAnchor: "product-engineering",
            description: "Take a product from discovery to release, or improve an existing system without losing sight of the people who use the product.",
            delivery: ["Product architecture, development and testing", "Release preparation and technical handover"],
            customer: ["Product direction and backlog priorities", "User feedback and release acceptance"],
          },
          { id: "augmentation", title: "Embedded engineers", need: "Our engineers inside your team and backlog.", builds: "together", runs: "you", legacyAnchor: "advisory-co-engineering",
            description: "Bring engineering capacity into your own delivery process, with the skills, responsibilities and ways of working agreed around your team.",
            delivery: ["Engineers matched to the scope", "Implementation and knowledge sharing"],
            customer: ["Technical direction and delivery priorities", "Team practices and daily coordination"],
          },
        ],
      },
    ],
    keys: { builds: "Builds", runs: "Runs" },
    parties: { dhira: "DHIRA", you: "Your team", together: "Together" },
    detail: { delivery: "DHIRA delivers", customer: "Your team leads" },
    spectrum: { dhira: "DHIRA does more", you: "Your team does more" },
    coda: "Whichever way you work with us, the decisions stay with your team.",
  },

  /* [03] Six disciplines on the layers of one stack, top to bottom. Each
     draws connectors to what covers it: Akashic modules (one name each),
     where Akashic runs, or custom engineering on your stack. The figure
     tours the six like [02] (user, 26 Oct 2026: "the same way"). */
  capabilities: {
    eyebrow: { number: "03", label: "What we build" },
    title: { setup: "Keep the systems you run,", payoff: "and build what they cannot do." },
    lede: "Six disciplines, from the cloud underneath to the applications on top. Akashic covers the layers it fits; custom engineering covers the rest.",
    link: { label: "Explore the Akashic platform", href: "/akashic" },
    tour: "the engineering tour",
    columns: { layer: "Layer", work: "What we build", fit: "Where Akashic fits" },
    detail: { delivery: "Typical delivery", fit: "Where Akashic fits" },
    layers: [
      {
        id: "applications", label: "Applications",
        nodes: [{ id: "custom", name: "Custom, on your stack", custom: true }],
        items: [
          { id: "custom-software", title: "Custom software", scope: "Business applications and the services they connect to.", deliverables: ["Business applications", "Integrations with your services", "Automated tests"], fit: ["custom"] },
          { id: "product-engineering", title: "Product modernisation", scope: "Existing products, moved off their constraints in stages.", deliverables: ["Architecture changes", "Staged migration plans", "Release tooling"], fit: ["custom"] },
        ],
      },
      {
        id: "intelligence", label: "Intelligence",
        nodes: [{ id: "bi", name: "Business Intelligence" }, { id: "ask", name: "Ask Akashic" }, { id: "ml", name: "Machine Learning" }, { id: "agents", name: "AI agents", preview: true }],
        items: [
          { id: "bi-analytics", title: "Business Intelligence", scope: "Business definitions turned into consistent measures and reports.", deliverables: ["Semantic models", "Dashboards and alerts", "Reporting workflows"], fit: ["bi"] },
          { id: "ai-ml", title: "Applied AI", scope: "Knowledge assistants, document intelligence and predictive models.", deliverables: ["Model integration", "Evaluation", "Human review flows"], fit: ["ask", "ml", "agents"] },
        ],
      },
      {
        id: "data", label: "Data",
        nodes: [{ id: "pipelines", name: "Data Pipelines" }, { id: "master", name: "Master Data" }, { id: "warehouse", name: "Data Warehouse" }, { id: "governance", name: "Governance" }],
        items: [
          { id: "data-pipelines", title: "Data engineering", scope: "Sources connected, records resolved and one governed data foundation built.", deliverables: ["Data pipelines", "Quality rules", "Source lineage"], fit: ["pipelines", "master", "warehouse", "governance"] },
        ],
      },
      {
        id: "infrastructure", label: "Infrastructure",
        nodes: [{ id: "cloud", name: "Cloud" }, { id: "onprem", name: "On premises" }, { id: "hybrid", name: "Hybrid" }],
        items: [
          { id: "cloud-sovereign", title: "Cloud and infrastructure", scope: "Environments designed around your security and residency rules.", deliverables: ["Infrastructure configuration", "Monitoring", "Runbooks"], fit: ["cloud", "onprem", "hybrid"] },
        ],
      },
    ],
    legend: { module: "Akashic covers it", custom: "Custom engineering" },
  },

  /* [04] Four stages on one rail. The rule (no stage without sign-off) is
     the coda; the rail hands over to your team after Launch, as in the hero. */
  methodology: {
    eyebrow: { number: "04", label: "How a delivery runs" },
    title: { setup: "See the evidence", payoff: "before the next commitment." },
    lede: "Every stage ends in something working that your business and engineering teams can review: a brief, a design, a release, a running system.",
    lanes: { stages: "One DHIRA team, with yours", run: "Your team" },
    outputLabel: "Working output",
    reviewLabel: "Your sign-off",
    stages: [
      { id: "understand", name: "Define the outcome",
            description: "The business problem, data access, constraints and people involved.", deliverable: "Delivery brief and success measures", review: "The problem and the scope" },
      { id: "align", name: "Design the approach",
            description: "Architecture choices, integration boundaries and the order of delivery.", deliverable: "Architecture and milestone plan", review: "The design and who owns what" },
      { id: "deliver", name: "Build and validate",
            description: "Working increments, tested against the agreed acceptance criteria.", deliverable: "Working software and test evidence", review: "The release, against the brief" },
      { id: "evolve", name: "Launch and hand over",
            description: "Operations prepared, knowledge transferred and the next cycle agreed.", deliverable: "Running system and operating pack", review: "Readiness and ongoing ownership" },
    ],
    run: "Runs the system in production, with the operating pack.",
    legend: { stage: "Stage, worked together", signoff: "Your sign-off", team: "Your team" },
    coda: "The next stage waits for your sign-off.",
  },

  /* [05] The shared deployment carousel (home [07], /akashic [09]) with the
     services claim: the team behind the platform's national programmes. */
  proven: {
    number: "05",
    eyebrow: "In production",
    title: { setup: "The team behind national programmes", payoff: "can deliver yours." },
    description: "DHIRA's engineers delivered these programmes on Akashic. Population-scale data, live in production, not pilots.",
    storiesLabel: "National-scale data and intelligence deployments",
    storyNoun: "deployment",
    link: { label: "Explore the customer stories", href: "/customers" },
  },

  /* [06] The page's one soft blue band. The pack is drawn flat: documents on
     a sheet, the line handing over from DHIRA (blue) to your team (ink). */
  fit: {
    eyebrow: { number: "06", label: "What you own" },
    title: { setup: "Keep control of the systems", payoff: "your business depends on." },
    lede: "Ownership, access and support are agreed before work begins. At handover your team receives what it needs to run and change the system.",
    packLabel: "Operating pack · handed to your team",
    documents: [
      { title: "Architecture and decision record", detail: "Why the system is built the way it is" },
      { title: "Configuration and release notes", detail: "What runs where, and what changed" },
      { title: "Operating and recovery runbooks", detail: "How to run, monitor and restore it" },
      { title: "Knowledge transfer and support plan", detail: "Who supports what, after launch" },
    ],
    handover: { build: "DHIRA builds", run: "Your team runs" },
    items: [
      { title: "Clear ownership",
            description: "Source access, intellectual property and platform licensing are defined in the engagement. Custom work and platform rights are scoped separately." },
      { title: "Agreed security boundaries",
            description: "Hosting, data access and review requirements are set around your environment. Key custody depends on the deployment model." },
      { title: "A supported transition",
            description: "Service levels, escalation routes and support responsibilities are agreed, and readiness is reviewed with the people taking over." },
    ],
    note: "The statement of work records the agreed scope, deliverables and commercial terms.",
  },

  faq: {
    eyebrow: { number: "07", label: "Before we begin" },
    title: { setup: "Know where", payoff: "you stand." },
    lede: "Practical answers for the teams evaluating a delivery partner.",
    groups: [
      { heading: "Platform and scope", items: [
        { question: "Do we need Akashic to work with DHIRA?", answer: "No. DHIRA also delivers custom software, data and AI engineering on your existing stack. Platform selection follows the requirements." },
        { question: "Can we use our own brand and infrastructure?", answer: "White label engagements cover branded Akashic implementations. Hosting, data residency, access and support are agreed around the selected deployment model." },
        { question: "Can we start with a focused piece of work?", answer: "Yes. Advisory, a specific integration, an AI use case or a product milestone can each form an engagement. Discovery establishes the scope and success measures." },
      ] },
      { heading: "Team and commercial terms", items: [
        { question: "Can your engineers join our existing team?", answer: "Yes. Embedded engineers work within your delivery process, with skills, technical responsibilities and coordination agreed in advance." },
        { question: "Who owns the work and supports the system?", answer: "Source access, intellectual property, platform licences and support responsibilities are defined in the engagement. Handover includes the agreed documentation and knowledge transfer." },
        { question: "How are cost and timing agreed?", answer: "The business outcome, technical constraints and delivery scope inform the proposal. Milestones, acceptance criteria and commercial terms are agreed before implementation." },
      ] },
    ],
  },

  /* [08] The /akashic closing card, with the services agenda. Homepage [04]
     promised help with "the problems only you have"; the close asks for one
     in the same words. */
  close: {
    eyebrow: { number: "08", label: "Start a conversation" },
    title: { setup: "Bring us the problem", payoff: "only you have." },
    lede: "Tell us the outcome, the systems in play and the constraints. We come back with a starting point and the team for it.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
    agenda: [
      { label: "The outcome", text: "What needs to change?" },
      { label: "The systems", text: "What already exists?" },
      { label: "The first step", text: "Where should we begin?" },
    ],
    footer: "DHIRA, your delivery partner. Akashic, the platform.",
    flow: "Define → Design → Build → Launch",
  },
};
