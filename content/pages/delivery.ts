/* ------------------------------------------------------------------ */
/*  Delivery & services page                                           */
/* ------------------------------------------------------------------ */
/* Every word on /delivery, in section order. Composer:
   app/delivery/page.tsx. The nav's Services menu links into this page's
   anchors (#advisory, #engineering, #ai-solutions, #model-*,
   #methodology), so section and item ids are part of the contract.

   DRAFT, founder to confirm before launch (Design Rule 4, no invented
   figures): the SLA, latency, throughput and sprint figures on this page
   ("99.99%", "< 35ms", "100k+ events / sec", ">90% QA") are carried over
   from the earlier build and are not yet sourced. */

import type { ProvenAtScaleBlock } from "../blocks";
import type { Cta, Faq, PageSection, Seo } from "../types";

/** A section eyebrow with the mono aside on the right ("/ Three service lines"). */
export interface DeliveryEyebrow {
  number: string;
  label: string;
  aside?: string;
}

export interface DeliveryServiceLine {
  id: string;
  verb: string;
  number: string;
  title: string;
  description: string;
  items: { label: string; preview?: boolean }[];
}

export interface DeliveryModel {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  bullets: string[];
  href: string;
}

export interface DeliveryCapability {
  id: string;
  num: string;
  category: "ai" | "data" | "cloud" | "software";
  title: string;
  scope: string;
  stack: string[];
  deliverables: string;
  telemetry: string;
  image: string;
}

export interface DeliveryStage {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  deliverable: string;
  /** Picks the stage card's illustration. */
  type: "code" | "icons" | "apps" | "telemetry";
}

export interface DeliveryProfile {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  cta: Cta;
  badge: string;
  /** Words in a visitor's description that point to this profile. */
  keywords: string[];
  /** Picks the profile card's illustration. */
  mockupKind: "ai-custom" | "cloud-dashboard" | "squad-board";
}

export interface DeliveryPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: {
    badge: { label: string; aside: string };
    title: { lead: string; accent: string };
    lede: string;
    primary: Cta;
    secondary: Cta;
    metrics: { label: string; value: string }[];
  };
  services: { eyebrow: DeliveryEyebrow; title: string; lede: string; lines: DeliveryServiceLine[] };
  models: {
    eyebrow: DeliveryEyebrow;
    title: string;
    lede: string;
    /** "Learn more about" + the model's title. */
    learnMore: string;
    items: DeliveryModel[];
  };
  capabilities: {
    eyebrow: DeliveryEyebrow;
    title: string;
    lede: string;
    categories: { id: "all" | DeliveryCapability["category"]; label: string }[];
    scrollLeft: string;
    scrollRight: string;
    domain: string;
    viewDetails: string;
    stackLabel: string;
    deliverablesLabel: string;
    close: string;
    closeLabel: string;
    items: DeliveryCapability[];
  };
  methodology: { eyebrow: DeliveryEyebrow; title: string; lede: string; cta: Cta; stages: DeliveryStage[] };
  proven: ProvenAtScaleBlock;
  fit: {
    eyebrow: DeliveryEyebrow;
    title: string;
    lede: string;
    searchPlaceholder: string;
    clearLabel: string;
    scenariosLabel: string;
    scenarios: { label: string; query: string }[];
    profileLabel: string;
    matched: string;
    /** Shown when a description matches no keyword. */
    fallbackProfile: string;
    profiles: DeliveryProfile[];
  };
  faq: {
    eyebrow: DeliveryEyebrow;
    title: string;
    lede: string;
    answerLabel: string;
    moreLabel: string;
    moreCta: Cta;
    items: Faq[];
  };
  close: {
    eyebrow: DeliveryEyebrow;
    title: [string, string];
    body: string;
    guarantees: string[];
    primary: Cta;
    secondary: Cta;
    standard: { label: string; line: string; promise: string; signature: string };
  };
}

export const delivery: DeliveryPage = {
  seo: {
    title: "Delivery & Services",
    description:
      "Delivered on your terms: Akashic SaaS, White Label, custom technology services, product engineering, or staff augmentation. One standard of accountability.",
    path: "/delivery",
  },
  sections: [
    { id: "hero", label: "Delivery" },
    { id: "services", label: "What we do" },
    { id: "engagement-models", label: "Ways to work" },
    { id: "capabilities", label: "Beyond the platform" },
    { id: "methodology", label: "Process" },
    { id: "proven-at-scale", label: "Proof" },
    { id: "partnership-fit", label: "Who this is for" },
    { id: "faq", label: "FAQ" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "Delivery page sections",

  hero: {
    badge: { label: "Delivery & Services", aside: "How Dhira Ships" },
    title: { lead: "Platform & Custom Engineering", accent: "for Data and AI Products." },
    lede: "Choose a ready platform, build custom AI and data systems, or add senior engineers to your team.",
    primary: { label: "Explore ways to work ↓", href: "#engagement-models" },
    secondary: { label: "Talk to our team", href: "#talk-to-our-team" },
    metrics: [
      { label: "Flexible Engagement", value: "5 Delivery Paths" },
      { label: "Full Code Transfer", value: "100% IP Ownership" },
      { label: "Enterprise Guarantees", value: "99.99% Production SLA" },
    ],
  },

  /* The three service lines from the founder's wireframe (14 Oct 2026). */
  services: {
    eyebrow: { number: "01", label: "What we do", aside: "/ Three service lines" },
    title: "Advise. Engineer. Deploy.",
    lede: "One partner, accountable for outcomes. We take you from strategy to measurable results on Akashic, owning delivery end to end and augmenting the systems you already run.",
    lines: [
      {
        id: "advisory",
        verb: "Advise",
        number: "01",
        title: "Strategic Advisory",
        description: "Assess your data and AI readiness, prioritise high-value use cases and build a phased roadmap with ROI attached.",
        items: [{ label: "AI readiness" }, { label: "Use-case prioritisation" }, { label: "Roadmaps" }, { label: "Adoption and change" }],
      },
      {
        id: "engineering",
        verb: "Engineer",
        number: "02",
        title: "Engineering at Scale",
        description: "Architect, build, integrate, deploy and operate secure, modular data and AI systems at enterprise scale.",
        items: [
          { label: "Data pipelines" },
          { label: "Real-time analytics" },
          { label: "Cloud and data migration" },
          { label: "Product engineering" },
          { label: "Strategic resourcing" },
        ],
      },
      {
        id: "ai-solutions",
        verb: "Deploy",
        number: "03",
        title: "AI Solutions and Accelerators",
        description: "Semantic layers, knowledge assistants and governed workflows on Akashic, taken from pilot to production.",
        items: [
          { label: "Knowledge assistants" },
          { label: "Agentic workflows", preview: true },
          { label: "Governance and audit" },
          { label: "Ready-to-use solutions" },
        ],
      },
    ],
  },

  models: {
    eyebrow: { number: "02", label: "Ways to work with Dhira" },
    title: "One partner. Five ways to ship.",
    lede: "Choose the engagement model that fits your timeline, team, and architecture. Every path delivers with sovereign engineering accountability.",
    learnMore: "Learn more about",
    items: [
      {
        id: "saas",
        number: "01",
        title: "Akashic SaaS",
        tagline: "Instant Managed Cloud",
        description: "Turnkey managed sovereign cloud instance. Zero setup friction, continuous automated data pipelines, and 99.99% SLA.",
        image: "/delivery/saas.jpg",
        badge: "Managed Platform",
        bullets: ["99.99% Availability SLA", "Automated streaming data pipelines", "Zero-drift data sync"],
        href: "/akashic",
      },
      {
        id: "whitelabel",
        number: "02",
        title: "White Label",
        tagline: "Sovereign Private Cloud",
        description: "Deploy Akashic inside your private ecosystem under your brand. Dedicated isolated VPC with customer-managed keys.",
        image: "/delivery/whitelabel.jpg",
        badge: "100% Whitelabeled",
        bullets: ["Isolated VPC perimeter", "Customer-Managed Keys (CMEK)", "SAML 2.0 & SSO integration"],
        href: "#talk-to-our-team",
      },
      {
        id: "customai",
        number: "03",
        title: "Custom Tech & AI",
        tagline: "Bespoke Architectures",
        description: "Custom AI applications, specialised machine learning pipelines, and microservices built for your stack with 100% IP ownership.",
        image: "/delivery/customai.jpg",
        badge: "100% Sovereign IP",
        bullets: ["Custom PyTorch / LLM pipelines", "Distributed microservices", "Full code IP transfer"],
        href: "#capabilities",
      },
      {
        id: "engineering",
        number: "04",
        title: "Product Engineering",
        tagline: "Full Lifecycle Delivery",
        description: "Build new software products from scratch or modernise legacy systems with 2-week sprint cadences and production CI/CD.",
        image: "/delivery/engineering.jpg",
        badge: "Agile 2-Wk Sprints",
        bullets: ["Automated QA & testing", "2-week sprint iterations", "Production CI/CD pipelines"],
        href: "#methodology",
      },
      {
        id: "augmentation",
        number: "05",
        title: "Staff Augmentation",
        tagline: "Embedded Senior Engineers",
        description: "Embed principal AI, cloud, and distributed systems engineers directly into your squads to accelerate release velocity.",
        image: "/delivery/augmentation.jpg",
        badge: "Direct Squad Sync",
        bullets: ["Principal AI & Cloud leads", "Zero management overhead", "Direct GitHub & Jira sync"],
        href: "#talk-to-our-team",
      },
    ],
  },

  capabilities: {
    eyebrow: { number: "03", label: "Beyond the platform", aside: "/ Clarifying Akashic’s role" },
    title: "Engineering capabilities beyond the platform.",
    lede: "When your technical needs fall outside Akashic SaaS, our engineering teams design, build, and maintain bespoke solutions around your existing stack.",
    categories: [
      { id: "all", label: "All Capabilities" },
      { id: "ai", label: "AI and Machine Learning" },
      { id: "data", label: "Data and Business Intelligence" },
      { id: "cloud", label: "Cloud & Infra" },
      { id: "software", label: "Software Systems" },
    ],
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
    domain: "Domain",
    viewDetails: "View details →",
    stackLabel: "Core Technologies & Stack",
    deliverablesLabel: "Standard Engineering Deliverables",
    close: "Close Capability Summary",
    closeLabel: "Close",
    items: [
      {
        id: "ai-ml",
        num: "01",
        category: "ai",
        title: "AI & Machine Learning",
        scope: "Domain-specific AI applications, automated document processing, classification models, and predictive workflows.",
        stack: ["PyTorch", "LLM Fine-Tuning", "Inference Pipelines", "Eval Harnesses"],
        deliverables: "Model integration, automated evaluation harnesses, custom embeddings, and sovereign inference runtimes.",
        telemetry: "< 35ms Inference Latency",
        image: "/delivery/capabilities/ai.jpg",
      },
      {
        id: "data-pipelines",
        num: "02",
        category: "data",
        title: "Data Platforms and Data Pipelines",
        scope: "High-throughput streaming, batch ETL/ELT data pipelines, master data management, and lakehouse storage.",
        stack: ["Apache Kafka", "ClickHouse", "Apache Iceberg", "dbt"],
        deliverables: "Data ingestion frameworks, schema registries, validation layers, and governance data pipelines.",
        telemetry: "100k+ Events / Sec",
        image: "/delivery/capabilities/data.jpg",
      },
      {
        id: "bi-analytics",
        num: "03",
        category: "data",
        title: "Business Intelligence & Analytics",
        scope: "Enterprise dashboards, automated operational reports, self-service analytics, and embedded intelligence.",
        stack: ["Semantic Layers", "SQL Optimisation", "Cube.js", "Grafana"],
        deliverables: "Semantic data models, query optimisation, report automation, and executive dashboards.",
        telemetry: "Real-Time Telemetry",
        image: "/delivery/capabilities/bi.jpg",
      },
      {
        id: "cloud-sovereign",
        num: "04",
        category: "cloud",
        title: "Cloud & Sovereign Infrastructure",
        scope: "Multi-cloud architecture, sovereign on-premise deployments, Kubernetes container orchestration, and IaC.",
        stack: ["Kubernetes", "Terraform", "Zero-Trust", "Air-Gapped VPC"],
        deliverables: "Terraform automation, CI/CD pipelines, zero-trust network policies, and observability stacks.",
        telemetry: "100% In-Region Sovereign",
        image: "/delivery/capabilities/cloud.jpg",
      },
      {
        id: "custom-software",
        num: "05",
        category: "software",
        title: "Custom Software Systems",
        scope: "Bespoke backend APIs, mission-critical workflow systems, and secure integrations with legacy software.",
        stack: ["Go", "Rust", "Node.js", "PostgreSQL", "gRPC"],
        deliverables: "Microservice architectures, database optimization, transactional consistency, and public/private APIs.",
        telemetry: "Sub-10ms DB p95",
        image: "/delivery/capabilities/software.jpg",
      },
      {
        id: "product-engineering",
        num: "06",
        category: "software",
        title: "Product Engineering & Modernisation",
        scope: "Full-lifecycle software product development, technical refactoring, performance scaling, and cloud migration.",
        stack: ["React / Next.js", "TypeScript", "E2E Testing", "Distributed Arch"],
        deliverables: "Product architecture, sprint execution, automated testing, and continuous deployment.",
        telemetry: "2-Week Sprint Cadence",
        image: "/delivery/capabilities/product.jpg",
      },
    ],
  },

  methodology: {
    eyebrow: { number: "04", label: "Delivery process", aside: "/ Outcome-first engineering" },
    title: "Start with the outcome, not the technology.",
    lede: "Four clear stages designed to eliminate risk, maintain accountability, and ship production-ready systems on schedule.",
    cta: { label: "Talk to our team →", href: "#talk-to-our-team" },
    stages: [
      { id: "understand", num: "01", name: "Understand", tagline: "Discovery & Boundaries", description: "Evaluate constraints, security boundaries, and legacy systems to define exact technical outcomes.", deliverable: "Baseline SOW & Compliance Map", type: "code" },
      { id: "align", num: "02", name: "Align", tagline: "Architecture & Sprint Roadmap", description: "Select technology topology, agree on milestone roadmaps, and deploy senior engineering capacity.", deliverable: "Architecture Blueprint", type: "icons" },
      { id: "deliver", num: "03", name: "Build & Deliver", tagline: "Iterative Sprint Execution", description: "Ship production code in 2-week sprints with automated QA, performance stress testing, and live demos.", deliverable: "Production Codebase (>90% QA)", type: "apps" },
      { id: "evolve", num: "04", name: "Evolve", tagline: "Sovereign IP & Telemetry", description: "Transfer 100% sovereign code ownership, set up enterprise SLA monitoring, and provide continuous support.", deliverable: "Sovereign IP Handover", type: "telemetry" },
    ],
  },

  proven: {
    number: "05",
    eyebrow: "Proof",
    title: { payoff: "Built for real-world delivery." },
    description: "We measure our work by outcomes, engineering quality, and the ability to deliver reliably at national scale.",
    storiesLabel: "Akashic deployments in production",
    storyNoun: "deployment",
  },

  fit: {
    eyebrow: { number: "06", label: "Audience & Fit" },
    title: "Designed for your engineering reality.",
    lede: "Now that you have seen how we deliver at scale, select the profile that matches your organization’s goals.",
    searchPlaceholder: "Describe your need: we will suggest the best fit for you...",
    clearLabel: "Clear requirement filter",
    scenariosLabel: "Scenarios:",
    scenarios: [
      { label: "Build custom AI platform", query: "Build a custom software and AI platform" },
      { label: "Private cloud rollout", query: "Deploy private cloud platform under our brand" },
      { label: "Extend engineering team", query: "Extend our team with specialized senior engineers" },
    ],
    profileLabel: "Profile",
    matched: "Matched",
    fallbackProfile: "partners",
    profiles: [
      {
        id: "partners",
        num: "01",
        title: "Technology Partners",
        tagline: "Custom Software & AI Development",
        description: "You have a technical initiative and need an accountable partner to architect, build, and deploy custom software, AI applications, or microservices.",
        deliverables: ["Full Source Code Ownership", "Custom PyTorch & LLM Runtimes", "2-Week Sprint Cadence"],
        cta: { label: "Start custom engineering", href: "#talk-to-our-team" },
        badge: "Custom Engineering",
        keywords: ["build", "custom", "product", "from scratch", "ai", "modernise", "software", "solution", "partner", "bespoke"],
        mockupKind: "ai-custom",
      },
      {
        id: "akashic",
        num: "02",
        title: "Platform Customers",
        tagline: "Private Cloud & Platform Deployment",
        description: "You want to adopt a turnkey cloud platform or deploy Akashic white-labeled inside your private VPC ecosystem under your brand.",
        deliverables: ["99.99% Availability SLA", "Isolated Private VPC Perimeter", "Customer-Managed Keys"],
        cta: { label: "Explore platform rollout", href: "/akashic" },
        badge: "Managed Private Cloud",
        keywords: ["akashic", "platform", "saas", "white label", "whitelabel", "brand", "adopt", "ready", "tenant", "cloud", "private"],
        mockupKind: "cloud-dashboard",
      },
      {
        id: "teams",
        num: "03",
        title: "Engineering Squads",
        tagline: "Senior Engineering Capacity",
        description: "You have an active engineering organization and need principal AI, cloud, and distributed leads to accelerate release velocity.",
        deliverables: ["Principal AI & Cloud Leads", "GitHub & Jira Direct Sync", "Zero Management Overhead"],
        cta: { label: "Discuss team capacity", href: "#talk-to-our-team" },
        badge: "Team Augmentation",
        keywords: ["team", "staff", "engineers", "capacity", "squad", "augment", "augmentation", "extend", "senior", "scale"],
        mockupKind: "squad-board",
      },
    ],
  },

  faq: {
    eyebrow: { number: "07", label: "FAQ", aside: "/ Straight answers" },
    title: "The questions we get before we start.",
    lede: "Straightforward answers to the most common questions regarding platform adoption, custom engineering, and team models.",
    answerLabel: "Straight answer",
    moreLabel: "Need more details on your scenario?",
    moreCta: { label: "Ask our engineering team →", href: "#talk-to-our-team" },
    items: [
      { question: "Do we have to use Akashic to work with Dhira?", answer: "No. Akashic is one of our offerings, not a requirement. We can work with your existing technology environment or build a solution around your specific requirements." },
      { question: "Can Akashic be white-labeled?", answer: "Yes. We can provide a branded implementation of Akashic for organisations that need the platform within their own ecosystem." },
      { question: "Can you work with our existing technology stack?", answer: "Yes. Our engineering services are not limited to Akashic. We can work with the technologies and platforms that best fit your requirements." },
      { question: "Can you take on projects outside Akashic?", answer: "Yes. We provide custom technology services for requirements that fall outside the Akashic platform." },
      { question: "Can you build a product from scratch?", answer: "Yes. Our product engineering teams can support new product development as well as the enhancement, modernisation, and scaling of existing products." },
      { question: "Can your engineers work with our existing team?", answer: "Yes. Our engineers can integrate with your existing teams and processes through staff augmentation or broader engineering engagements." },
      { question: "How do you determine the right engagement?", answer: "We start with your requirement and desired outcome, then recommend the approach that best fits your business, technology, and team." },
    ],
  },

  close: {
    eyebrow: { number: "08", label: "Talk to our team" },
    title: ["Your requirement.", "Our responsibility."],
    body: "Whether you need a platform, a custom solution, a product engineering partner, or additional engineering capacity, start with the problem you’re trying to solve. We’ll help determine the right way to get there.",
    guarantees: ["100% Sovereign Code Ownership", "Direct Senior Engineer Access", "Zero Vendor Lock-In"],
    primary: { label: "Start a conversation", href: "/#get-started" },
    secondary: { label: "Explore Akashic", href: "/akashic" },
    standard: {
      label: "One standard of accountability",
      line: "Different engagements · Different teams · Different technologies",
      promise: "One expectation: deliver what matters.",
      signature: "DHIRA",
    },
  },
};
