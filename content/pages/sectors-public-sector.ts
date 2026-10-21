/* ------------------------------------------------------------------ */
/*  Public sector page                                                 */
/* ------------------------------------------------------------------ */
/* Every word on /sectors/public-sector, in section order. Composer:
   app/sectors/public-sector/page.tsx. Unlike the six industry pages it
   runs its own eight sections.

   DRAFT, founder to confirm: this page names programmes (CoWIN, DIKSHA,
   eMigrate, Poshan Tracker...) while the customer stories collection
   describes the same deployments by sector only ("we cannot claim publicly
   by name"). The two must agree before launch. Figures are as published on
   the programmes' public record (Rule 4). */

import type { Cta, PageSection, Seo } from "../types";

export interface PsEyebrow {
  number: string;
  label: string;
  aside: string;
}

export interface PublicSectorPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: {
    badge: { name: string; kicker: string };
    eyebrow: { lead: string; tail: string };
    title: { plain: string; marked: string };
    lede: string;
    primary: Cta;
    secondary: Cta;
    board: { title: string; footerLeft: string; footerRight: string; missions: { name: string; figure: string; label: string }[] };
    footer: string;
  };
  gap: {
    eyebrow: PsEyebrow;
    title: string;
    lede: string;
    /** `visual` picks the drawing beside each gap. */
    items: { figure: string; title: string; desc: string; visual: "india" | "duplicates" | "lag" }[];
    visuals: {
      india: { title: string; status: string; body: string };
      duplicates: { records: { name: string; scheme: string }[]; caption: string };
      lag: { stops: string[]; caption: string };
    };
    closing: { lead: string; marked: string };
  };
  proven: {
    eyebrow: PsEyebrow;
    title: string;
    lede: string;
    board: { title: string; live: string; footerLeft: string; footerRight: string };
    flagships: { mission: string; ministry: string; figure: string; label: string }[];
    alsoLabel: string;
    registry: { platform: string; figure: string; label: string; desc: string }[];
  };
  moments: {
    eyebrow: PsEyebrow;
    title: string;
    live: string;
    didLabel: string;
    items: { ministry: string; platform: string; icon: string; figures: string[]; need: string; story: string; did: string }[];
  };
  why: {
    eyebrow: PsEyebrow;
    title: string;
    columns: { ref: string; requirement: string; how: string; status: string };
    requirements: { num: string; title: string; desc: string; chip: string }[];
  };
  chain: {
    eyebrow: PsEyebrow;
    title: string;
    start: string;
    end: string;
    steps: { num: string; name: string; module: string; desc: string }[];
  };
  deploy: {
    eyebrow: PsEyebrow;
    title: string;
    lede: string;
    environments: { icon: string; name: string; desc: string; chip: string | null }[];
    footerLeft: string;
    footerRight: string;
  };
  close: {
    title: string;
    body: string;
    missions: string[];
    yours: string;
    primary: Cta;
    secondary: Cta;
  };
}

export const sectorsPublicSector: PublicSectorPage = {
  seo: {
    title: "Public Sector",
    description: "Akashic powers national-scale public digital infrastructure with real citizens, real scale, and audited public records.",
    path: "/sectors/public-sector",
  },
  sections: [
    { id: "hero", label: "Overview" },
    { id: "the-gap", label: "Governance Gap" },
    { id: "proven", label: "Proven at Scale" },
    { id: "in-practice", label: "In Practice" },
    { id: "why-akashic", label: "Why Akashic" },
    { id: "how-it-works", label: "How It Works" },
    { id: "deployment", label: "Deployment" },
    { id: "talk-to-our-team", label: "Get Started" },
  ],
  sectionsLabel: "Public Sector page sections",

  hero: {
    badge: { name: "Public Sector", kicker: "Akashic by sector" },
    eyebrow: { lead: "Akashic for public sector", tail: "Government" },
    title: { plain: "We don’t pitch government.", marked: "We’ve already built for it." },
    lede: "From vaccination drives to national education platforms, Akashic already powers some of India’s largest public digital infrastructure. Real citizens. Real scale. Real outcomes, not a sandbox demo.",
    primary: { label: "See the platforms we’ve built", href: "#proven" },
    secondary: { label: "Talk to our team", href: "#talk-to-our-team" },
    board: {
      title: "National missions · in production",
      footerLeft: "Public-record numbers",
      footerRight: "No testimonials needed",
      missions: [
        { name: "CoWIN / U-WIN", figure: "2B+", label: "vaccinations" },
        { name: "DIKSHA", figure: "564 Cr", label: "learning sessions" },
        { name: "eMigrate", figure: "3.87 L", label: "emigrations tracked" },
        { name: "Poshan Tracker", figure: "10 Cr+", label: "children & mothers" },
      ],
    },
    footer: "Built for ministries, state governments, and national missions · at population scale",
  },

  gap: {
    eyebrow: { number: "01", label: "The governance gap", aside: "/ Three problems, one pattern" },
    title: "Public programmes move at population scale.",
    lede: "Most data systems don’t. The gap shows up the same way in every ministry review.",
    items: [
      { figure: "28 states", title: "One fragmented view", desc: "Most national schemes run on state-wise systems that don't talk to each other, so the centre sees a delayed, incomplete picture.", visual: "india" },
      { figure: "Crores", title: "Manual reconciliation", desc: "Beneficiary and citizen data duplicated across departments: the same person counted differently in five different schemes.", visual: "duplicates" },
      { figure: "Months", title: "Reporting lag", desc: "Field-level data takes months to reach ministry dashboards. By the time a gap is visible, the budget cycle has already moved on.", visual: "lag" },
    ],
    visuals: {
      india: { title: "The centre’s view", status: "DELAYED", body: "Arrives quarterly. Incomplete. Reconciled by hand." },
      duplicates: {
        records: [
          { name: "Rekha Devi", scheme: "Health" },
          { name: "R. Devi", scheme: "Food" },
          { name: "REKHA D", scheme: "Housing" },
          { name: "Rekha Devi (W/O)", scheme: "Pension" },
          { name: "R Devi", scheme: "Education" },
        ],
        caption: "One person · five schemes · five different records",
      },
      lag: { stops: ["Field", "District", "State", "Ministry"], caption: "One report’s journey · month 1 to month 3" },
    },
    closing: { lead: "Not a hypothetical problem for DHIRA. We have solved it", marked: "more than once." },
  },

  proven: {
    eyebrow: { number: "02", label: "Proven at national scale", aside: "/ Public record" },
    title: "Not a pilot. Running infrastructure, today.",
    lede: "Akashic already powers six national and state digital platforms. These are not testimonials: they are public-record numbers from systems serving real citizens, right now.",
    board: {
      title: "The national record · systems in production",
      live: "Live",
      footerLeft: "Public-record numbers · no testimonials needed",
      footerRight: "Source systems: real citizens, right now",
    },
    flagships: [
      { mission: "CoWIN / U-WIN", ministry: "National vaccination platform", figure: "2 Billion+", label: "vaccinations" },
      { mission: "DIKSHA", ministry: "Ministry of Education · 1.89 crore registered learners", figure: "564 Crore", label: "learning sessions" },
      { mission: "eMigrate", ministry: "Ministry of External Affairs · real-time oversight", figure: "3.87 Lakh", label: "emigrations tracked" },
      { mission: "Poshan Tracker", ministry: "National nutrition monitoring", figure: "10 Crore+", label: "children & mothers" },
    ],
    alsoLabel: "Also in production",
    registry: [
      { platform: "LokOS", figure: "10M+", label: "SHGs managed", desc: "Livelihood mission platform, self-help group governance." },
      { platform: "Yuva / My Bharat", figure: "18M+", label: "youth beneficiaries", desc: "National youth engagement platform." },
      { platform: "Bihar Caste Survey", figure: "64.53%", label: "literacy tracked", desc: "Statewide demographic analytics, AI-generated narratives." },
      { platform: "DIKSHA content", figure: "7,476", label: "energised textbooks", desc: "Linked to live content performance data." },
    ],
  },

  moments: {
    eyebrow: { number: "03", label: "What this looks like in practice", aside: "/ Live in ministries" },
    title: "Three real moments. Three government platforms.",
    live: "In production",
    didLabel: "What Akashic did",
    items: [
      {
        ministry: "Ministry of Education",
        platform: "DIKSHA",
        icon: "Education",
        figures: ["1.89 Cr learners", "564 Cr sessions", "Updated daily"],
        need: "Which districts are falling behind on course completion?",
        story: "A state education secretary needs to know, right now, which districts are falling behind. Instead of waiting for a quarterly report, the Akashic BI dashboard shows live numbers: by state, by district, down to the school. Updated daily, not quarterly.",
        did: "Unified content, enrolment, and completion data from every state into one real-time national dashboard.",
      },
      {
        ministry: "Ministry of External Affairs",
        platform: "eMigrate",
        icon: "Workforce",
        figures: ["3.87 L emigrations", "Real-time oversight"],
        need: "Which countries, job categories, and states are driving emigration?",
        story: "A ministry official needs to understand emigration patterns to plan worker protection policy. Akashic surfaces this instantly, broken down by destination country, demand type, and gender, updated in real time.",
        did: "Connected emigration clearance data nationally and built a live oversight dashboard for ministry review.",
      },
      {
        ministry: "Bihar Government",
        platform: "Statewide Caste Survey",
        icon: "Public Sector",
        figures: ["Population scale", "AI narratives"],
        need: "One defensible view of population-level demographics.",
        story: "A state government needs a single view of education, employment, income, and migration to design policy and allocate resources fairly. Akashic powers a statewide analytics dashboard with AI-generated narrative summaries, so officials get not just numbers, but plain-language explanations of what the data means.",
        did: "Structured population-scale survey data and layered Akashic AI on top to generate human-readable insights.",
      },
    ],
  },

  /* DRAFT: "POC in 1.5 months" is a weeks-style delivery claim; confirm
     with the founder alongside the other delivery-time claims. */
  why: {
    eyebrow: { number: "04", label: "Why government teams choose Akashic", aside: "/ The tender schedule" },
    title: "Built for the realities of public sector delivery.",
    columns: { ref: "Ref", requirement: "Requirement", how: "How Akashic meets it", status: "Status" },
    requirements: [
      { num: "REQ-01", title: "Data sovereignty", desc: "Full on-premises deployment available. Your citizen data stays within your infrastructure: never a forced cloud dependency.", chip: "ON-PREM AVAILABLE" },
      { num: "REQ-02", title: "Audit-ready governance", desc: "End-to-end lineage, metadata catalogues, and role-based access control: built for the scrutiny that public spending demands.", chip: "LINEAGE + RBAC" },
      { num: "REQ-03", title: "Fast delivery", desc: "A complete proof-of-concept for CBSE was delivered in 1.5 months. Government timelines don't wait for long engineering cycles. Neither do we.", chip: "POC IN 1.5 MONTHS" },
      { num: "REQ-04", title: "Multi-language ready", desc: "Akashic AI's multilingual NLP layer means dashboards and insights are accessible in regional languages, not just English.", chip: "REGIONAL LANGUAGES" },
      { num: "REQ-05", title: "Works with what you have", desc: "23+ source connectors mean Akashic plugs into existing ministry databases, citizen registries, and legacy systems. No forced migration.", chip: "23+ CONNECTORS" },
      { num: "REQ-06", title: "No testimonials needed", desc: "Government clients cannot give testimonials. We don't ask. We show the platforms, the scale, and the numbers instead.", chip: "PUBLIC RECORD" },
    ],
  },

  chain: {
    eyebrow: { number: "05", label: "How Akashic works for government", aside: "/ The paper trail, automated" },
    title: "From citizen record to policy decision.",
    start: "Citizen record",
    end: "Policy decision",
    steps: [
      { num: "01", name: "Connect", module: "23+ CONNECTORS", desc: "Ingest from citizen registries, ministry databases, state portals, and field applications: real-time or batch, no migration required." },
      { num: "02", name: "Unify", module: "AKASHIC MDM", desc: "One Golden Record per citizen or beneficiary, deduplicating records across schemes, departments, and states." },
      { num: "03", name: "Structure", module: "DATA WAREHOUSE", desc: "Governed, analytics-ready models, built for both ministry-level and district-level queries." },
      { num: "04", name: "Analyse", module: "AKASHIC BI", desc: "Live dashboards by state, district, and scheme. Role-based, so a district officer and a secretary see what's relevant to them." },
      { num: "05", name: "Predict", module: "AKASHIC ML", desc: "Flags coverage gaps, predicts scheme drop-off, and scores eligibility, surfacing risk before it becomes a crisis." },
      { num: "06", name: "Ask", module: "ASK AKASHIC", desc: "Plain language, including regional languages. “Which districts have the lowest scheme coverage?” Answered in seconds." },
    ],
  },

  deploy: {
    eyebrow: { number: "06", label: "Deployment, your way", aside: "/ Your infrastructure, our engineering" },
    title: "Cloud. On-premises. Hybrid.",
    lede: "Akashic does not require you to abandon your existing systems. It connects to them, in read-only mode, and builds the intelligence layer on top: deployed exactly where your data governance policy requires.",
    environments: [
      { icon: "Cloud Deployment", name: "Cloud", desc: "AWS, Azure, or GCP: deploy on infrastructure your department already has clearance for.", chip: null },
      { icon: "On-Premises", name: "On-premises", desc: "Full data sovereignty. The standard choice for citizen registries and sensitive beneficiary data.", chip: "SOVEREIGN DEFAULT" },
      { icon: "Hybrid Deployment", name: "Hybrid", desc: "Sensitive data stays on-premises. Less sensitive workloads scale on the cloud. Best of both.", chip: null },
    ],
    footerLeft: "Read-only connection · no migration · no downtime",
    footerRight: "Where your governance policy requires",
  },

  close: {
    title: "Let’s talk about your mission.",
    body: "Whether it’s a ministry briefing, an RFP, or an early conversation about a new scheme’s data architecture: we are already doing this work at national scale. We’d like to show you what that looks like for your department.",
    missions: ["CoWIN", "DIKSHA", "eMigrate", "Poshan Tracker"],
    yours: "Your mission",
    primary: { label: "Talk to our team", href: "/#get-started" },
    secondary: { label: "Share your requirements", href: "/#get-started" },
  },
};
