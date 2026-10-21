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
     [04]      who answers for the work: one head for each part
     [05]      what working here is like: three kolam rules
     [06]      the next step: talk to us, or join us
   NO SHORT FORMS: "Business Intelligence", "machine learning", figures in
   words ("187 million+"). "AI" is the one exception. */

import type { PageSection, Seo } from "../types";

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
    /** Public functions drawn as silos, left to right. */
    systems: string[];
    deployments: { name: string; figure: string }[];
    legend: { title: string; caption: string }[];
    key: { solid: string; dashed: string; dashedShort: string; layer: string };
  };
  people: AboutHeadingContent;
  culture: AboutHeadingContent & {
    ruleLabel: string;
    rules: { rule: string; title: string; body: string }[];
    welcome: { label: string; title: string; body: string; link: { label: string; href: string } };
    teams: { group: string; items: string[] }[];
    redraw: string;
    redrawNote: string;
  };
  close: AboutHeadingContent & {
    primary: { label: string; href: string };
    careers: { title: string; body: string; link: { label: string; href: string } };
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
    { id: "people", label: "People" },
    { id: "culture", label: "Culture" },
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
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Meet the leaders", href: "#people" },
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
    setup: "Building since 2018.",
    title: "Live since 2020.",
    intro: "Above the line, each release, still running today. Below the line, the national programmes we deliver.",
    timeline: {
      today,
      todayLabel: "Today",
      built: [
        { id: "founding", kind: "foundation", year: "2018", from: 2018.06, to: 2018.7, title: "DHIRA founded", detail: "Data engineering", description: "Founded on data engineering, with dependable data as the starting point." },
        { id: "akashic", kind: "platform", year: "2019", from: 2019.14, to: 2019.86, title: "Akashic research", detail: "Data to insight", description: "Research and engineering begin on a platform connecting data to insight." },
        { id: "machine-learning", kind: "platform", year: "2023", from: 2023.14, to: 2023.86, title: "Machine learning", detail: "Akashic Machine Learning", description: "The Akashic Machine Learning module launches, taking the platform from analysis to prediction." },
        { id: "artificial-intelligence", kind: "platform", year: "2024", from: 2024.14, to: 2024.86, title: "Artificial intelligence", detail: "Akashic AI", description: "The Akashic AI module launches, building on the platform's data foundation." },
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
        scroll: "Scroll to add each year. Every layer stays.",
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
        { year: "2024", title: "Build AI on the data foundation.", description: "The AI module launches. Akashic serves a national employment programme." },
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
    setup: "Public systems, working as one.",
    title: "Citizens tell their story once.",
    intro: "Our ambition: one governed foundation beneath every public system, in any country. Three national programmes in India are the proof.",
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
    label: "Leadership",
    setup: "One accountable head",
    title: "for every part of the work.",
    intro: "From platform engineering to partnerships, each part of DHIRA has one named leader. The founder sets the direction and the architecture.",
  },

  /* DRAFT for review (7 Oct 2026). Rules are the three real sikku kolam
     rules; each pairs with how the team works. No location or work mode
     claims, no national systems (owned by journey and vision), and no count
     of open roles: the invitation names teams people join. */
  culture: {
    number: "05",
    label: "Our culture",
    setup: "A kolam has three rules.",
    title: "So do we.",
    intro: "Every morning, South Indian homes draw a kolam at the doorstep: one line around every dot.",
    ruleLabel: "Kolam rule",
    rules: [
      { rule: "Loop every dot.", title: "Everyone is looped in.", body: "Plans and numbers reach everyone. Credit does too, fresher to founder." },
      { rule: "Never lift the hand.", title: "Learning never stops.", body: "AI changes faster than any syllabus. Seniors and freshers learn together." },
      { rule: "End where you began.", title: "We close the loop.", body: "First look to last fix, one owner. Then teach the next person." },
    ],
    /* The invitation, not a fourth rule. The link text differs from the
       close's "Explore careers". */
    welcome: {
      label: "At the doorstep",
      title: "Find your seat.",
      body: "Every team here is a way in, from internships to applied research.",
      link: { label: "See where you fit", href: "/careers" },
    },
    teams: [
      { group: "Build", items: ["Product engineering", "AI and machine learning"] },
      { group: "Discover", items: ["Data science", "Applied research"] },
      { group: "Foundations", items: ["Data engineering", "Distributed systems"] },
      { group: "Ways in", items: ["Freshers", "Internships"] },
    ],
    redraw: "Draw another",
    redrawNote: "Same rules, any shape.",
  },

  close: {
    number: "06",
    label: "What comes next",
    setup: "Build something",
    title: "people rely on.",
    intro: "Tell us what needs to work better. We will start with the data, the people and the decision.",
    primary: { label: "Talk to our team", href: "#get-started" },
    careers: {
      title: "Make your next chapter count.",
      body: "Explore opportunities to build data and AI systems with DHIRA.",
      link: { label: "Explore careers", href: "/careers" },
    },
    offices: ["New York", "Hyderabad", "Bangalore"],
  },
};
