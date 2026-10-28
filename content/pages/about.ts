/* ------------------------------------------------------------------ */
/*  About page                                                         */
/* ------------------------------------------------------------------ */
/* Every word on /about, in section order. Composer: app/about/page.tsx.
   The leaders are a collection (content/collections/leaders.ts), shared
   with the newsroom media kit. Positioning: DHIRA was a data company from
   day one that saw AI coming; engineering is the foundation.

   THE STORY (cold reader pass, 21 Oct 2026, same rules as the homepage):
   each section answers the question the one before it raises, and every
   headline states what the reader gains.
     hero      who DHIRA is and the mission: trusted data, defensible decisions
     [01]      why data comes first: AI is only as good as the records beneath
     [02]      the record: building since 2018, in production since 2020
     [03]      the ambition: public systems working as one
     [04]      one team accountable for the platform and its implementation
     [05]      the disciplines and people behind a distributed company
     [06]      the next step: talk to us, or join us
   NO SHORT FORMS: "Business Intelligence", "machine learning", figures in
   words ("187 million+"). "AI" is the one exception. */

import type { ImageAsset, PageSection, Seo } from "../types";

/* ---------------- Types ---------------- */

/** A section heading on the drawing pages (sections/about/AboutSection). */
export interface AboutHeadingContent {
  number: string;
  label: string;
  setup: string;
  title: string;
  intro: string;
}

export interface AboutHeroContent {
  label: string;
  setup: string;
  headline: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  peoplePreview: ImageAsset[];
  proof: { value: string; label: string }[];
}

export type JourneyLayerKind = "foundation" | "platform" | "programme" | "ahead";

export interface JourneyLayer {
  id: string;
  kind: JourneyLayerKind;
  /** Calendar year shown beside the layer, or "Ahead" for the horizon. */
  year: string;
  /** The ramp in fractional years: where the layer begins to rise and where it is complete. */
  from: number;
  to: number;
  title: string;
  /** One terse mono line. */
  detail: string;
  /** One sentence for the ledger and assistive technology. */
  description: string;
}

/** The [02] layer drawing: the company chronology as data. */
export interface JourneyTimeline {
  /** Where every built layer currently ends, in fractional years. */
  today: number;
  todayLabel: string;
  /** Bottom to top: each release sits on everything before it. */
  built: JourneyLayer[];
  /** The 2022 launch turns the research layer solid. */
  launch: { year: string; at: number; title: string; detail: string; description: string };
  /** Top to bottom: each programme goes live beneath the ones before it. */
  proven: JourneyLayer[];
  ahead: JourneyLayer;
  direction: { title: string; description: string }[];
  horizon: { label: string; title: string; status: string };
  reading: { horizon: string; scroll: string; end: string; overview: string; showAll: string; explore: string };
  steps: { year: string; title: string; description: string }[];
  recognition: { year: string; lead: string; payoff: string };
  /** `short` stands in when the span is too narrow for the full name. */
  eras: { label: string; short: string; from: number; to: number }[];
  aheadEra: { label: string; short: string };
  /** The accessible chronology: editorial order of layer ids within each year ("launch" is the 2022 launch). */
  ledger: { year: string; ids: string[] }[];
}

export interface AboutPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: AboutHeroContent;
  conviction: AboutHeadingContent & {
    beliefs: { title: string; body: string }[];
    /** The two thread labels in the convergence drawing. */
    threads: { data: string; ai: string };
  };
  journey: AboutHeadingContent & { timeline: JourneyTimeline };
  vision: AboutHeadingContent & {
    link: { label: string; href: string };
    /** Public functions drawn as silos, left to right. */
    systems: string[];
    deployments: { name: string; figure: string }[];
    legend: { title: string; caption: string }[];
    key: { solid: string; dashed: string; dashedShort: string; layer: string };
  };
  people: AboutHeadingContent & {
    link: { label: string; href: string };
    perspective: { label: string; title: string; paragraphs: string[] };
    leadersLabel: string;
  };
  culture: AboutHeadingContent & {
    link: { label: string; href: string };
    workspace: ImageAsset;
    imageNote: string;
    working: { label: string; title: string; body: string; principles: { title: string; body: string }[] };
    team: {
      label: string;
      title: string;
      members: { name: string; role: string; interest: string; image: ImageAsset; position: string }[];
    };
  };
  close: AboutHeadingContent & {
    primary: { label: string; href: string };
    careers: { title: string; body: string; link: { label: string; href: string } };
    locationLabel: string;
    offices: string[];
  };
}

/* ---------------- Content ---------------- */

const today = 2026.76;

export const about: AboutPage = {
  seo: {
    title: "About Us",
    description:
      "Data you can trust. Decisions you can stand behind. DHIRA is a data and AI company for governments and enterprises, and builds Akashic, the platform that makes all your data agree.",
    path: "/about",
  },
  sections: [
    { id: "hero", label: "About" },
    { id: "why-we-exist", label: "Why we exist" },
    { id: "journey", label: "Journey" },
    { id: "vision", label: "Vision" },
    { id: "leadership", label: "Leadership" },
    { id: "culture", label: "Life at DHIRA" },
    { id: "talk-to-our-team", label: "Join us" },
  ],
  sectionsLabel: "About page sections",

  hero: {
    label: "About DHIRA",
    setup: "Data you can trust.",
    headline: "Decisions you can stand behind.",
    /* One sentence per line on desktop: what DHIRA is, then what it builds. */
    description:
      "DHIRA is a data and AI company for governments and enterprises. We build Akashic, the platform that makes all your data agree.",
    primary: { label: "Talk to our team", href: "#get-started" },
    secondary: { label: "Meet the team", href: "#leadership" },
    peoplePreview: [
      { src: "/about/team/monica-kishor.webp", alt: "" },
      { src: "/avatars/sirish-executive-v1.webp", alt: "" },
      { src: "/about/team/yash-kanvinde.webp", alt: "" },
    ],
    proof: [
      { value: "2018", label: "Founded as a data company" },
      { value: "3", label: "National programmes live" },
      { value: "In-country", label: "Your cloud or data centre" },
    ],
  },

  conviction: {
    number: "01",
    label: "Why we exist",
    setup: "Fix the data first.",
    title: "Then AI you can trust.",
    intro: "Every AI answer is only as good as the records beneath. Since 2018, DHIRA has started with the records.",
    /* Parallel bodies: one line each at desktop, matched lengths. */
    beliefs: [
      { title: "Bring the records together.", body: "Connect records, documents and streams from every system." },
      { title: "Build a foundation people trust.", body: "Resolve, govern and trace every record before AI reads one." },
      { title: "Put intelligence to work.", body: "Build AI on the governed data, for people making decisions." },
    ],
    threads: { data: "Data", ai: "AI" },
  },

  /* [02] Layers (6 Oct 2026). The journey as one drawing: every release is
     a layer that starts in its year and is still there today. Built layers
     stack above the line, proven layers (national programmes) hang below
     it. A ramp spans the calendar year because no month is known, except
     2020, supplied as "the end of the year". Nothing new is claimed. */
  journey: {
    number: "02",
    label: "Our journey",
    setup: "Building since 2018,",
    title: "and live at national scale since 2020.",
    intro: "Above the line, each release, still running today. Below the line, the national programmes we deliver.",
    timeline: {
      today,
      todayLabel: "Today",
      built: [
        { id: "founding", kind: "foundation", year: "2018", from: 2018.06, to: 2018.7, title: "DHIRA founded", detail: "Data engineering", description: "Founded on data engineering, with dependable data as the starting point." },
        { id: "akashic", kind: "platform", year: "2019", from: 2019.14, to: 2019.86, title: "Akashic research", detail: "Data to insight", description: "Research and engineering begin on a platform connecting data to insight." },
        { id: "machine-learning", kind: "platform", year: "2023", from: 2023.14, to: 2023.86, title: "Machine learning", detail: "Machine Learning", description: "The Machine Learning module launches, taking the platform from analysis to prediction." },
        { id: "artificial-intelligence", kind: "platform", year: "2024", from: 2024.14, to: 2024.86, title: "Artificial intelligence", detail: "AI on the platform", description: "AI arrives on Akashic, building on the platform's data foundation." },
        { id: "master-data", kind: "platform", year: "2025", from: 2025.14, to: 2025.86, title: "Master data", detail: "Records and identities", description: "Akashic launches the module for consistent records and identities." },
        { id: "governance", kind: "platform", year: "2025", from: 2025.14, to: 2025.86, title: "Governance and meaning", detail: "Knowledge · semantic layers", description: "Data governance launches alongside knowledge and semantic layers." },
        { id: "documents", kind: "platform", year: "2026", from: 2026.08, to: 2026.62, title: "Documents", detail: "Unstructured data", description: "Akashic adds unstructured data processing, bringing documents into the data journey." },
        { id: "hybrid-answers", kind: "platform", year: "2026", from: 2026.08, to: 2026.62, title: "Hybrid answers", detail: "Records with documents", description: "Hybrid answers combine structured records with unstructured information." },
      ],
      launch: {
        year: "2022",
        at: 2022.18,
        title: "Akashic launches",
        detail: "Data Pipelines · warehousing · Business Intelligence",
        description: "Data pipelines, warehousing and Business Intelligence come together in a cloud agnostic platform.",
      },
      proven: [
        { id: "national-scale", kind: "programme", year: "2020", from: 2020.56, to: 2020.98, title: "First national-scale system", detail: "Live at year end", description: "Our first national scale project goes live at the end of the year." },
        { id: "national-learning", kind: "programme", year: "2023", from: 2023.14, to: 2023.86, title: "National learning programme", detail: "First on Akashic", description: "The first Akashic project serves a national digital learning programme." },
        { id: "national-employment", kind: "programme", year: "2024", from: 2024.14, to: 2024.86, title: "Overseas employment programme", detail: "Second on Akashic", description: "The second major Akashic project serves a national overseas employment programme." },
      ],
      ahead: {
        id: "agents", kind: "ahead", year: "Ahead", from: today, to: 2027.3,
        title: "From answers to accountable action", detail: "Our direction",
        description: "Our ambition is AI that works across systems, grounded in trusted context, with clear limits and people in control.",
      },
      direction: [
        { title: "Trusted context", description: "Ground agents in governed data, shared meaning and source evidence." },
        { title: "Scoped action", description: "Define each task, limit permissions and test the outcome." },
        { title: "Human authority", description: "Keep consequential actions reviewable, traceable and owned by a person." },
      ],
      horizon: { label: "Our direction", title: "AI with accountability.", status: "Ambition · No release date" },
      reading: {
        horizon: "The horizon",
        scroll: "Each year adds a layer. Every layer stays.",
        end: "The foundation carries forward. Keep scrolling to continue.",
        overview: "The complete journey, from foundation to ambition.",
        showAll: "Show all years",
        explore: "Explore on scroll",
      },
      steps: [
        { year: "2018", title: "Start with dependable data.", description: "DHIRA begins with data engineering as the foundation." },
        { year: "2019", title: "Build the common foundation.", description: "Research begins on Akashic, connecting data to insight." },
        { year: "2020", title: "Put it to work at national scale.", description: "Our first national scale system goes live at year end." },
        { year: "2022", title: "Bring the platform together.", description: "Akashic launches with data pipelines, warehousing and Business Intelligence." },
        { year: "2023", title: "Add prediction. Extend the reach.", description: "Machine learning launches. Akashic serves a national learning programme." },
        { year: "2024", title: "Build AI on the data foundation.", description: "AI arrives on the platform. Akashic serves a national employment programme." },
        { year: "2025", title: "Give intelligence shared meaning.", description: "Master data, governance, knowledge and semantic layers join the platform." },
        { year: "2026", title: "Bring the full context into view.", description: "Documents join structured records. Hybrid answers bring them together." },
        { year: "Ahead", title: "From answers to accountable action.", description: "Connected agents, built on this foundation. Our ambition, with people in control." },
      ],
      recognition: { year: "2025", lead: "2025: two hackathon wins.", payoff: "Maha Hackathon. Telangana AI Rising." },
      eras: [
        { label: "Foundations", short: "Foundations", from: 2018, to: 2022 },
        { label: "Platform", short: "Platform", from: 2022, to: 2025 },
        { label: "Governed intelligence", short: "Intelligence", from: 2025, to: today },
      ],
      aheadEra: { label: "Ahead", short: "Ahead" },
      ledger: [
        { year: "2018", ids: ["founding"] },
        { year: "2019", ids: ["akashic"] },
        { year: "2020", ids: ["national-scale"] },
        { year: "2022", ids: ["launch"] },
        { year: "2023", ids: ["national-learning", "machine-learning"] },
        { year: "2024", ids: ["national-employment", "artificial-intelligence"] },
        { year: "2025", ids: ["master-data", "governance"] },
        { year: "2026", ids: ["documents", "hybrid-answers"] },
        { year: "Ahead", ids: ["agents"] },
      ],
    },
  },

  /* [03] The ambition, drawn for any government: public systems anywhere,
     with India as the proof (three live national programmes), not the
     destination. Figures as on the public record (Rule 4). */
  vision: {
    number: "03",
    label: "Our ambition",
    setup: "When public systems work as one,",
    title: "citizens tell their story once.",
    /* The bridge to the homepage's business story (UX review, 23 Oct 2026). */
    intro: "Our ambition is one governed foundation beneath public systems, in any country. The same engineering connects an enterprise’s customer records, operations and decisions.",
    link: { label: "Explore the national programmes", href: "/customers" },
    systems: ["Tax", "Treasury", "Education", "Benefits", "Licensing", "Land", "Justice", "Health", "Census", "Transport", "Energy", "Labour", "Water", "Housing"],
    deployments: [
      { name: "National Learning Platform", figure: "187 million+ enrolments resolved" },
      { name: "National Immunisation Registry", figure: "2 billion+ dose records reconciled" },
      { name: "Overseas Employment Registry", figure: "4 million+ worker clearances reconciled" },
    ],
    legend: [
      { title: "Sovereign by design", caption: "Runs in-country, in your cloud or your data centre." },
      { title: "Proven, then extended", caption: "Every connection starts inside a live programme." },
      { title: "Better with every join", caption: "Each system joined serves citizens better." },
    ],
    key: {
      solid: "Solid: live today, India.",
      dashed: "Dashed: any public system, any jurisdiction.",
      dashedShort: "Dashed: any jurisdiction.",
      layer: "The intelligence layer",
    },
  },

  people: {
    number: "04",
    label: "The people behind DHIRA",
    setup: "Build with the people",
    title: "behind the platform.",
    intro: "One team develops Akashic, implements your systems and takes responsibility for the result.",
    link: { label: "How we take a system into production", href: "/services" },
    perspective: {
      label: "Our point of view",
      title: "Build for the person on the other side.",
      paragraphs: [
        "A learner finding a course. A citizen accessing a service. A team making a difficult decision. These are the people our work needs to serve.",
        "The technology underneath can be complex. The experience should be clear.",
      ],
    },
    leadersLabel: "The leadership team",
  },

  /* Work mode confirmed by the user, 28 Oct 2026. Team names, photographs
     and interests are from https://dhira.io/aboutus/ (accessed the same day).
     Workspace images are explicitly illustrative, user-authorised AI
     placeholders. Replacement instructions and prompts: docs/ASSETS.md. */
  culture: {
    number: "05",
    label: "Life at DHIRA",
    setup: "Different places to work.",
    title: "A shared body of work.",
    intro: "Cloud developers, data engineers and software builders. We work mainly from home, bringing different disciplines to the same systems.",
    link: { label: "Explore working at DHIRA", href: "/careers" },
    workspace: {
      src: "/about/remote-review-illustrative.webp",
      alt: "Illustrative remote engineering review: an engineer discussing system sketches with two colleagues on a video call. AI-generated placeholder, not DHIRA employees.",
      width: 1536,
      height: 1024,
    },
    imageNote: "Remote review study · AI-generated placeholder",
    working: {
      label: "Working across distance",
      title: "Make the reasoning travel with the work.",
      body: "Remote work needs shared context. These are the habits we want to build around it.",
      principles: [
        { title: "Leave a clear trail.", body: "Write down the decision, the reason and the next step." },
        { title: "Bring another discipline in.", body: "A data model, an application and a deployment need to work together." },
      ],
    },
    team: {
      label: "Meet some of our colleagues",
      title: "The work has many authors.",
      members: [
        { name: "Monica Kishor", role: "Senior Cloud Developer", interest: "Gardening and painting", image: { src: "/about/team/monica-kishor.webp", alt: "Monica Kishor" }, position: "50% 30%" },
        { name: "Bhaskar Sarkar", role: "Senior Data Engineer", interest: "Games and films", image: { src: "/about/team/bhaskar-sarkar.webp", alt: "Bhaskar Sarkar" }, position: "50% 35%" },
        { name: "Yash Kanvinde", role: "Senior Full Stack Business Intelligence Developer", interest: "Guitar and exploring", image: { src: "/about/team/yash-kanvinde.webp", alt: "Yash Kanvinde" }, position: "50% 30%" },
        { name: "Vinay Kulkarni", role: "Data Engineer", interest: "Table tennis and music", image: { src: "/about/team/vinay-kulkarni.webp", alt: "Vinay Kulkarni" }, position: "50% 35%" },
        { name: "Jitendra Billava", role: "Cloud Developer", interest: "Cricket and travel", image: { src: "/about/team/jitendra-billava.webp", alt: "Jitendra Billava" }, position: "50% 20%" },
        { name: "Vishwanandan K A", role: "Data Engineer", interest: "Films and travelling", image: { src: "/about/team/vishwanandan-ka.webp", alt: "Vishwanandan K A" }, position: "45% 35%" },
        { name: "Vipul Gabhane", role: "Data Engineer", interest: "Family, music and cricket", image: { src: "/about/team/vipul-gabhane.webp", alt: "Vipul Gabhane" }, position: "50% 25%" },
        { name: "Vipul Madan", role: "Business Intelligence Developer", interest: "Badminton and cricket", image: { src: "/about/team/vipul-madan.webp", alt: "Vipul Madan" }, position: "50% 30%" },
        { name: "Naved Ansari", role: "Software Engineer", interest: "Cycling and trekking", image: { src: "/about/team/naved-ansari.webp", alt: "Naved Ansari" }, position: "50% 25%" },
      ],
    },
  },

  close: {
    number: "06",
    label: "What comes next",
    setup: "Bring the problem.",
    title: "Build with us.",
    intro: "Tell us where your systems stop connecting. We can work through the data, the architecture and the next step together.",
    primary: { label: "Talk to our team", href: "#get-started" },
    careers: {
      title: "Join the team behind the work.",
      body: "Explore roles in engineering, data and delivery.",
      link: { label: "Explore careers", href: "/careers" },
    },
    locationLabel: "Connected across",
    offices: ["Hyderabad", "Bangalore", "New York"],
  },
};
