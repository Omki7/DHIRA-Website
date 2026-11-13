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
     [04]      who carries it: one unbroken line through the leadership
     [05]      the people behind a distributed company, one body of work
     [06]      the next step widens to the reader: your system, or a role
   NO SHORT FORMS: "Business Intelligence", "machine learning", figures in
   words ("187 million+"). "AI" is the one exception. */

import type { Region } from "@/shared/utils/region";
import { aboutTeam, type AboutTeamMember } from "../collections/about-team";
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

export interface OrganizationCredential {
  id: string;
  name: string;
  issuer: string;
  detail: string;
  tag: string;
  authority: string;
  badge: string;
  symbol: "hackathons" | "dpiit" | "udyam" | "iit-madras";
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
  credentials?: OrganizationCredential[];
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
    /** The usual route, drawn as separate dashed parties with breaks between them. */
    usual: { label: string; parties: string[] };
    /** One unbroken line through the leaders: where it starts, the stop after them, and who it serves. */
    line: {
      label: string;
      start: string;
      production: string;
      destination: { label: string; title: string; lines: string[] };
    };
    coda: { lead: string; payoff: string };
  };
  culture: Omit<AboutHeadingContent, "setup"> & {
    /** `audience`: shown only to visitors in that region (shared/utils/region.ts). */
    link: { label: string; href: string; audience?: Region };
    team: {
      label: string;
      hint: string;
      motionLabel: string;
      members: AboutTeamMember[];
    };
  };
  close: AboutHeadingContent & {
    primary: { label: string; href: string };
    /** The [03] reprise: its three live systems joined, the reader's apart. */
    drawing: { joined: string[]; yours: string };
    locationLabel: string;
    offices: string[];
  };
}

/* ---------------- Content ---------------- */

const today = 2026.76;

export const about: AboutPage = {
  seo: {
    title: "About DHIRA",
    description:
      "DHIRA is a data and AI company for governments and enterprises. We build Akashic, the platform that makes all your data agree, so you can make decisions with confidence.",
    path: "/about",
  },
  sections: [
    { id: "hero", label: "About" },
    { id: "why-we-exist", label: "Why we exist" },
    { id: "journey", label: "Journey" },
    { id: "vision", label: "Vision" },
    { id: "leadership", label: "Leadership" },
    { id: "culture", label: "Life at DHIRA" },
    { id: "talk-to-our-team", label: "Next step" },
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
    secondary: { label: "Meet leadership", href: "#leadership" },
    /* The button leads to [04], so it previews the leaders (5 Nov 2026, user). */
    peoplePreview: [
      { src: "/avatars/dilip-executive-v1.webp", alt: "" },
      { src: "/avatars/sirish-executive-v1.webp", alt: "" },
      { src: "/avatars/rupa-executive-v1.webp", alt: "" },
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
    title: "Then build AI you can trust.",
    intro: "AI is only as reliable as the data behind it. Dependable data has been our starting point since 2018.",
    /* Parallel bodies: one line each at desktop, matched lengths. */
    beliefs: [
      { title: "Bring the records together.", body: "Connect records, documents and streams from every system." },
      { title: "Build a foundation people trust.", body: "Reconcile records, govern access and trace each record to its source." },
      { title: "Put intelligence to work.", body: "Build AI on governed data to support the people making decisions." },
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
    title: "Live at national scale since 2020.",
    intro: "Each new capability builds on the foundation before it. The national programmes below the line show that work in production.",
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
        description: "Data Pipelines, Data Warehouse and Business Intelligence come together in a cloud-agnostic platform.",
      },
      proven: [
        { id: "national-scale", kind: "programme", year: "2020", from: 2020.56, to: 2020.98, title: "First national-scale system", detail: "Live at year end", description: "Our first national-scale system goes live at the end of the year." },
        { id: "national-learning", kind: "programme", year: "2023", from: 2023.14, to: 2023.86, title: "National learning programme", detail: "First on Akashic", description: "The first Akashic project serves a national digital learning programme." },
        { id: "national-employment", kind: "programme", year: "2024", from: 2024.14, to: 2024.86, title: "Overseas employment programme", detail: "Second on Akashic", description: "The second major Akashic project serves a national overseas employment programme." },
      ],
      ahead: {
        id: "agents", kind: "ahead", year: "Ahead", from: today, to: 2027.3,
        title: "From answers to accountable action", detail: "Our direction",
        description: "Our ambition is AI that works across systems, grounded in trusted context, with clear limits and people in control.",
      },
      direction: [
        { title: "Trusted context", description: "Ground agents in governed data, shared meaning and traceable sources." },
        { title: "Scoped action", description: "Define each task, limit permissions and test the outcome." },
        { title: "Human authority", description: "Keep consequential actions reviewable and traceable, with a person accountable for each one." },
      ],
      horizon: { label: "Our direction", title: "AI with accountability.", status: "Ambition · No release date" },
      reading: {
        horizon: "The horizon",
        scroll: "Each year adds a layer. Every layer stays.",
        end: "The foundation carries forward. Keep scrolling to continue.",
        overview: "The complete journey, from foundation to ambition.",
        showAll: "Show all years",
        explore: "Explore by year",
      },
      steps: [
        { year: "2018", title: "Start with dependable data.", description: "DHIRA begins with data engineering as the foundation." },
        { year: "2019", title: "Build the common foundation.", description: "Research begins on Akashic, connecting data to insight." },
        { year: "2020", title: "Put it to work at national scale.", description: "Our first national-scale system goes live at the end of the year." },
        { year: "2022", title: "Bring the platform together.", description: "Akashic launches with Data Pipelines, Data Warehouse and Business Intelligence." },
        { year: "2023", title: "Add prediction. Extend the reach.", description: "Machine learning launches. Akashic serves a national learning programme." },
        { year: "2024", title: "Build AI on the data foundation.", description: "AI arrives on the platform. Akashic serves a national employment programme." },
        { year: "2025", title: "Give intelligence shared meaning.", description: "Master data, governance, knowledge and semantic layers join the platform." },
        { year: "2026", title: "Bring the full context into view.", description: "Documents join structured records. Hybrid answers bring them together." },
        { year: "Ahead", title: "From answers to accountable action.", description: "Our ambition is to build connected agents on this foundation, with people in control." },
      ],
      recognition: { year: "2025", lead: "2025: two hackathon wins.", payoff: "Maha Hackathon and Telangana AI Rising." },
      credentials: [
        {
          id: "hackathons",
          name: "Two hackathon wins",
          issuer: "Maha Hackathon & Telangana AI Rising",
          detail: "Winner in state government deep-tech and artificial intelligence competitions.",
          tag: "2025 · Winner",
          authority: "State Competitions",
          badge: "Winner",
          symbol: "hackathons",
        },
        {
          id: "dpiit",
          name: "DPIIT recognised startup",
          issuer: "Ministry of Commerce & Industry",
          detail: "Certified under the Startup India initiative for sovereign data systems architecture.",
          tag: "Startup India",
          authority: "Govt of India",
          badge: "Certified",
          symbol: "dpiit",
        },
        {
          id: "udyam",
          name: "Udyam registered enterprise",
          issuer: "Ministry of MSME · Govt of India",
          detail: "Classified enterprise registration under the Government of India MSME framework.",
          tag: "Ministry of MSME",
          authority: "Govt of India",
          badge: "Registered",
          symbol: "udyam",
        },
        {
          id: "iit-madras",
          name: "Centre of Excellence",
          issuer: "IIT Madras association",
          detail: "Academic and research association for high-assurance data systems and governed AI.",
          tag: "IIT Madras CoE",
          authority: "Academic & R&D",
          badge: "Associated",
          symbol: "iit-madras",
        },
      ],
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
    intro: "Our ambition is a shared, governed foundation for public systems in any country. The same engineering connects an enterprise’s customer records, operations and decisions.",
    link: { label: "Explore the national programmes", href: "/customers" },
    systems: ["Tax", "Treasury", "Education", "Benefits", "Licensing", "Land", "Justice", "Health", "Census", "Transport", "Energy", "Labour", "Water", "Housing"],
    deployments: [
      { name: "National Learning Platform", figure: "187 million+ enrolments resolved" },
      { name: "National Immunisation Registry", figure: "2 billion+ dose records reconciled" },
      { name: "Overseas Employment Registry", figure: "4 million+ worker clearances reconciled" },
    ],
    legend: [
      { title: "Sovereign by design", caption: "Runs in your country, in your cloud or your data centre." },
      { title: "Proven, then extended", caption: "Every connection starts inside a live programme." },
      { title: "Better with every join", caption: "Each system joined serves citizens better." },
    ],
    key: {
      solid: "Solid: live programmes in India.",
      dashed: "Dashed: public systems in any jurisdiction.",
      dashedShort: "Dashed: any jurisdiction.",
      layer: "The intelligence layer",
    },
  },

  /* [04] The answer to [03]'s ambition: who carries it. The usual route
     breaks between a platform vendor, an integrator and a support desk; at
     DHIRA one line runs through the leadership, from the first architecture
     decision to production, and ends at the person the work serves (the
     company's point of view, not a quote). Leaders: collections/leaders.ts. */
  people: {
    number: "04",
    label: "Leadership",
    setup: "One team builds Akashic",
    title: "and answers for your system.",
    intro: "Data programmes often pass from a platform vendor to an integrator to a support desk. At DHIRA, the same people carry the work from the first architecture decision to production.",
    link: { label: "How we take a system into production", href: "/services" },
    usual: { label: "The usual route", parties: ["Platform vendor", "Integrator", "Support desk"] },
    line: {
      label: "At DHIRA",
      start: "First architecture decision",
      production: "In production",
      destination: {
        label: "Built for",
        title: "The person on the other side.",
        /* The first two stand behind live national programmes ([03]); the
           third turns to the reader, handing on to [06]'s "Your system". */
        lines: ["A learner finding a course.", "A worker cleared for a job abroad.", "Your team making a difficult decision."],
      },
    },
    coda: { lead: "The technology can be complex.", payoff: "The experience should be clear." },
  },

  /* [05] Attio-style field requested 4 Nov 2026. Public-source portraits
     and user-requested editorial draft bios live in collections/about-team.
     This is a concept roster, not a statement of total company headcount. */
  culture: {
    number: "05",
    label: "Life at DHIRA",
    title: "A team of curious builders.",
    intro: "Different minds, shared ambition. We make complex technology useful, and help each other get better along the way.",
    /* Careers is for India only (4 Nov 2026, user). */
    link: { label: "Explore working at DHIRA", href: "/careers", audience: "in" },
    team: {
      label: "Meet the people at DHIRA",
      hint: "Select a person to meet the team.",
      motionLabel: "team profiles",
      members: aboutTeam,
    },
  },

  /* [06] The page's last step widens to the reader and answers the hero
     ("makes all your data agree"): [03]'s joined systems return, with one
     standing apart, which is theirs. One action; careers lives in [05]. A
     centred closing card (DESIGN_SYSTEM §3.6), so its kicker has no number. */
  close: {
    number: "06",
    label: "What comes next",
    setup: "Show us where your data disagrees.",
    title: "Leave with a clear next step.",
    intro: "Bring a data problem from your systems. We will work through the records and architecture with you.",
    primary: { label: "Talk to our team", href: "#get-started" },
    /* The same three systems [03] draws solid (its DROPS), nothing added. */
    drawing: { joined: ["Education", "Health", "Labour"], yours: "Your system" },
    locationLabel: "Our locations",
    offices: ["Hyderabad", "Bangalore", "New York"],
  },
};
