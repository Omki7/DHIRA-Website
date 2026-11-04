/* ------------------------------------------------------------------ */
/*  Akashic Life page                                                  */
/* ------------------------------------------------------------------ */
/* Every word on /solutions/life, in section order. Composer:
   features/solutions/pages/LifePage.tsx. Rewritten 5 Nov 2026 from the
   script in docs/LIFE_PAGE_SCRIPT.md (user: keep the hero, [02] and [03];
   rebuild the rest, cohesive with home, /akashic and Enterprise
   Intelligence).

   Claims rules (docs/ARCHITECTURE.md, "/solutions/life"):
   - Akashic Life carries NO figures of its own: no accuracy, parameter
     count, risk score, case volume or time saved. No screen on this page
     shows a number (user direction, 23 Jul 2026): readings are named in
     words.
   - Figures appear only in [01], about the problem, each with its source.
   - National programmes are never named beyond "National Immunisation
     Registry" and "National Learning Platform", as on home and /about.
   - A trained clinician makes every clinical decision; the product never
     "diagnoses". "Golden record" is retired: "one record".
   - A quote band was removed 23 Jul 2026 (unnamed source). Do not
     reinstate it without a named, printable source. */

import type { Cta, Faq, PageSection, Seo } from "../types";

/** Which line icon heads a benefit in [03]. */
export type LifeBenefitIcon = "heart" | "handset" | "record" | "map";

export interface LifeStat {
  value: string;
  label: string;
  citation: string;
}

/** A named stop or stretch on [01]'s road. */
export interface LifePlace {
  name: string;
  note: string;
}

/** A reading on the sample visit's handset: named in words, never a value. */
export interface LifeReading {
  label: string;
  value: string;
}

/** One level of the health system in [05], in the outcome-card grammar. */
export interface LifeSeat {
  key: "worker" | "centre" | "district" | "state";
  /** The level, in text: the drawing is aria-hidden and hides below xl. */
  tier: string;
  role: string;
  question: string;
  answer: string;
  outcome: string;
  source: string;
}

export interface LifePage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: {
    badge: { product: string; platform: string };
    title: string;
    lede: string;
    primary: Cta;
    secondary: Cta;
    photoAlt: string;
    skipLabel: string;
  };
  /** [01] The three delays. */
  delays: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    road: {
      /** Home, health centre, district hospital: in travel order. */
      places: [LifePlace, LifePlace, LifePlace];
      /** Deciding, reaching, receiving: in the model's order. */
      delays: [LifePlace, LifePlace, LifePlace];
      /** Where the road ends: care begins. */
      end: string;
      legend: { road: string; delay: string };
      caption: string;
    };
    research: { title: string; stats: LifeStat[] };
    coda: { lead: string; payoff: string };
  };
  /** [02] How it works: the three moves, pinned. */
  howItWorks: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    moves: { label: [string, string]; body: string }[];
  };
  /** [03] What changes: the zig-zag. */
  changes: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    items: { icon: LifeBenefitIcon; head: string; body: string }[];
  };
  /** [04] At the visit: one sample visit, end to end. */
  visit: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    handset: {
      title: string;
      signal: string;
      mother: string;
      detail: string;
      readings: LifeReading[];
      result: { label: string; action: string; reason: string };
      /** Two lines, set as two lines. */
      saved: [string, string];
      /** Visually hidden: tells a screen reader the screen is a sample. */
      caption: string;
    };
    road: { offline: string; online: string };
    beats: { title: string; detail: string }[];
    arrival: { label: string; name: string; detail: string };
    coda: { lead: string; payoff: string };
  };
  /** [05] Every level: the watershed. */
  levels: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    tiers: string[];
    boundary: { named: string; anonymised: string };
    seats: LifeSeat[];
    coda: { lead: string; payoff: string };
  };
  /** [06] Built on Akashic: one ground. */
  foundation: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    link: Cta;
    programmes: { name: string; figure: string; label: string }[];
    life: { name: string; label: string };
    ground: string;
    roots: { module: string; name: string; shared?: boolean }[];
  };
  /** [07] Questions. */
  faq: {
    setup: string;
    payoff: string;
    lede: string;
    link: Cta;
    bands: { label: string; items: Faq[] }[];
  };
  close: {
    sessionLabel: string;
    title: [string, string];
    prompt: string;
    primary: Cta;
    timeline: { key: string; label: string }[];
    footnote: string;
  };
}

export const solutionsLife: LifePage = {
  seo: {
    title: "Akashic Life",
    description:
      "Akashic Life reads pregnancy risk on a health worker's basic phone at the antenatal visit, offline, and carries one record for each mother to the health centre, the district and the state.",
    path: "/solutions/life",
  },
  /* Ids match the section elements. Old anchors land through aliases:
     #the-record → at-the-visit, #altitude → every-level, #record-of-work,
     #how-its-built and #the-stake → built-on-akashic. */
  sections: [
    { id: "hero", label: "Overview" },
    { id: "the-gap", label: "The three delays" },
    { id: "the-solution", label: "How it works" },
    { id: "what-changes", label: "What changes" },
    { id: "at-the-visit", label: "At the visit" },
    { id: "every-level", label: "Every level" },
    { id: "built-on-akashic", label: "Built on Akashic" },
    { id: "questions", label: "Questions" },
    { id: "talk-to-our-team", label: "Talk to our team" },
  ],
  sectionsLabel: "Akashic Life page sections",

  hero: {
    badge: { product: "Akashic Life", platform: "Built on Akashic" },
    title: "The intelligence layer for care that cannot wait.",
    lede: "Akashic Life reads pregnancy risk on a health worker's basic phone, at the visit, with no signal. The mother's record reaches the health centre the moment a bar appears.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See how it works", href: "#the-solution" },
    photoAlt: "A health worker's gloved hand fits a blood pressure cuff to a patient's arm.",
    skipLabel: "Skip to the three delays",
  },

  /* [01] The problem in the reader's own framework: the three delays
     (Thaddeus and Maine, 1994), known to every public health reader.
     Figures are real and sourced (Rule 4); the drawing carries no figures. */
  delays: {
    label: "The three delays",
    setup: "The care that saves a mother exists,",
    payoff: "but it reaches her too late.",
    lede: "Most maternal deaths are preventable. They happen in the time lost between a danger sign and the right hands: deciding to seek care, reaching it and receiving it.",
    road: {
      places: [
        { name: "Home", note: "Where the danger starts" },
        { name: "Health centre", note: "The nearest clinic" },
        { name: "District hospital", note: "Where she can be treated" },
      ],
      delays: [
        { name: "Deciding to seek care", note: "Swelling and headaches pass for normal. Nobody has measured her blood pressure." },
        { name: "Reaching care", note: "The hospital that can treat her is hours away, and there is no signal to call ahead." },
        { name: "Receiving care", note: "She arrives with no record, and the hospital starts from nothing." },
      ],
      end: "Treatment begins",
      legend: { road: "The journey to care", delay: "Time lost to a delay" },
      caption: "The three delays model: Thaddeus and Maine, Social Science and Medicine, 1994",
    },
    research: {
      title: "What is at stake.",
      stats: [
        {
          value: "260,000",
          label: "women are estimated to have died during and after pregnancy and childbirth in 2023, almost one every two minutes.",
          citation: "World Health Organization, 2025",
        },
        {
          value: "~75%",
          label: "of maternal deaths come from five well-known complications, among them severe bleeding and high blood pressure.",
          citation: "World Health Organization, 2025",
        },
        {
          value: "88",
          label: "maternal deaths for every 100,000 live births in India. The global goal for 2030 is under 70.",
          citation: "Sample Registration System, 2020 to 2022",
        },
      ],
    },
    coda: { lead: "The delays are not medical.", payoff: "They are systems, and systems can be rebuilt." },
  },

  /* [02] Kept (user's pick): the three circles, pinned while the reader
     scrolls. Bodies tightened; the old emergency-network claim is gone. */
  howItWorks: {
    label: "How it works",
    setup: "Read the risk at the visit,",
    payoff: "then carry one record all the way to care.",
    lede: "A health worker records what she sees and measures. Akashic Life reads the risk on the phone, sends the record up when there is signal and brings the answer back.",
    moves: [
      {
        label: ["Read the risk", "at the visit"],
        body: "The model runs on the phone itself. It reads a full antenatal screen on the spot, with no network, no lab and no specialist within reach, and says how likely the pregnancy is to turn dangerous.",
      },
      {
        label: ["Carry the record", "upward"],
        body: "The moment a bar appears, the record is sent in a compact form over text message or mobile data. It lands as one record, and the health centre and the district read that same record.",
      },
      {
        label: ["Close the loop", "back to her"],
        body: "The answer travels back down the same path. The referral facility is expecting her, and the health worker sees that her referral was received.",
      },
    ],
  },

  /* [03] Kept (user's pick): four claims on a centre rule. */
  changes: {
    label: "What changes",
    setup: "The referral chain collapses",
    payoff: "into a single visit.",
    lede: "The screen that once needed a clinic, a lab and a journey back now happens at the doorstep, inside the visit she was already having.",
    items: [
      {
        icon: "heart",
        head: "She is caught before the emergency",
        body: "Severe risk is flagged at the visit, not on the day of the emergency. The window that decides the outcome is the one the system now sits inside.",
      },
      {
        icon: "handset",
        head: "It works where nothing else does",
        body: "No broadband, no lab, no specialist within reach. The whole screen is read on the handset a frontline worker already carries.",
      },
      {
        icon: "record",
        head: "One mother, one record",
        body: "The health worker, the primary health centre and the district hospital read the same record, not three versions of her that someone reconciles later.",
      },
      {
        icon: "map",
        head: "The district view is finally live",
        body: "Every reading rolls up, anonymised, as it arrives, so administrators watch risk build in a block instead of reading about it a month later.",
      },
    ],
  },

  /* [04] One sample visit (docs/LIFE_PAGE_SCRIPT.md §2). No numbers on the
     handset: readings are named in words. */
  visit: {
    label: "At the visit",
    setup: "No signal at the doorstep,",
    payoff: "and the risk is still read before the visit ends.",
    lede: "Take one antenatal check-up in a village with no bars. The health worker records what she measures, the phone reads the risk and the record waits for signal.",
    handset: {
      title: "Antenatal check-up",
      signal: "No signal",
      mother: "Meena",
      detail: "Third trimester · second pregnancy",
      readings: [
        { label: "Blood pressure", value: "High" },
        { label: "Haemoglobin", value: "Low" },
        { label: "Swelling of face and hands", value: "Yes" },
        { label: "Headache and blurred vision", value: "Yes" },
      ],
      result: { label: "High risk", action: "Refer now", reason: "High blood pressure with headache and blurred vision." },
      saved: ["Saved on this phone.", "Sends when there is signal."],
      caption: "Sample screen on the health worker's phone after the visit",
    },
    road: { offline: "No signal", online: "Signal" },
    beats: [
      { title: "At the doorstep", detail: "Read in the visit, saved offline." },
      { title: "When a bar appears", detail: "Sent by text or mobile data." },
      { title: "At the referral unit", detail: "Her record is there before she is." },
    ],
    arrival: { label: "Expected today", name: "Meena", detail: "High risk · referred at her visit" },
    coda: { lead: "The phone flags the risk.", payoff: "A clinician makes the call." },
  },

  /* [05] Every level that acts on one reading, in the homepage outcome-card
     grammar. No counts: answers are names and states. */
  levels: {
    label: "Every level",
    setup: "One mother's reading",
    payoff: "reaches every level that can act on it.",
    lede: "Her record rises as each visit syncs, so the district and state see risk building while there is still time to send people and supplies.",
    tiers: ["Homes", "Health centres", "District", "State"],
    boundary: { named: "Named", anonymised: "Anonymised" },
    seats: [
      {
        key: "worker",
        tier: "Home",
        role: "Health worker",
        question: "Who needs care first?",
        answer: "Meena, third trimester",
        outcome: "Referred at her visit",
        source: "Her visits, on her phone",
      },
      {
        key: "centre",
        tier: "Health centre",
        role: "Medical officer",
        question: "Who was referred and has not arrived?",
        answer: "Meena, referred today",
        outcome: "Not yet at the referral unit",
        source: "The centre's referrals",
      },
      {
        key: "district",
        tier: "District",
        role: "District health officer",
        question: "Which block is building risk?",
        answer: "The eastern block",
        outcome: "High-risk readings rising",
        source: "Every centre, anonymised",
      },
      {
        key: "state",
        tier: "State",
        role: "State programme officer",
        question: "Where should supplies go next?",
        answer: "The western districts",
        outcome: "Low haemoglobin readings rising",
        source: "Every district, anonymised",
      },
    ],
    coda: { lead: "Named only to those who care for her.", payoff: "Anonymised for everyone above." },
  },

  /* [06] The proof is what it is built on (claims rules above). Figures
     match home, /about and the customer stories. */
  foundation: {
    label: "Built on Akashic",
    setup: "The reading on the phone is new,",
    payoff: "but the foundation under it runs at national scale.",
    lede: "Akashic already reconciles records for two national programmes. Akashic Life runs on the same Master Data and Governance, and adds Machine Learning on the phone.",
    link: { label: "How Akashic governs every record", href: "/akashic" },
    programmes: [
      { name: "National Immunisation Registry", figure: "2 billion+", label: "dose records reconciled" },
      { name: "National Learning Platform", figure: "187 million+", label: "enrolments resolved" },
    ],
    life: { name: "Akashic Life", label: "Taken to the point of care" },
    ground: "One governed foundation",
    /* In drawing order, left to right. Master Data and Governance run under
       both national programmes too (customer stories); Machine Learning is
       Akashic Life's own root. */
    roots: [
      { module: "Master Data", name: "Her visits, one record", shared: true },
      { module: "Governance", name: "Access, lineage and audit", shared: true },
      { module: "Machine Learning", name: "Risk read on the device" },
    ],
  },

  /* [07] Every answer restates a claim the page already makes. */
  faq: {
    setup: "Questions health leaders ask",
    payoff: "before the first district.",
    lede: "What programme officers, medical advisers and technical teams ask before Akashic Life reaches their health workers.",
    link: { label: "Talk to our team", href: "#talk-to-our-team" },
    bands: [
      {
        label: "At the visit",
        items: [
          {
            question: "Does Akashic Life diagnose?",
            answer:
              "No. It reads the risk from what the health worker records and shows who needs to be seen first, with the reason in plain words. A trained clinician makes every clinical decision.",
          },
          {
            question: "What does a health worker need?",
            answer:
              "A basic Android phone of the kind frontline workers already carry. The screen is read on the phone itself, so the visit never waits for a network.",
          },
          {
            question: "What happens when there is no signal?",
            answer:
              "The reading and the record stay on the phone. When a bar appears, the record is sent in a compact form over text message or mobile data and lands as one record at the health centre and the district.",
          },
        ],
      },
      {
        label: "Above the visit",
        items: [
          {
            question: "Who can see a mother's record?",
            answer:
              "The people responsible for her care, by role. Districts and the state see anonymised, aggregated figures, and every view keeps its lineage and an audit trail, as in every Akashic deployment.",
          },
          {
            question: "How is it different from a reporting app?",
            answer:
              "A reporting app collects data for later. Akashic Life reads the risk at the visit and sends the record onward, so the data serves the mother first and the report second.",
          },
        ],
      },
    ],
  },

  close: {
    sessionLabel: "A first conversation, around your district",
    title: ["Care that cannot wait", "should not have to."],
    prompt: "Bring one block where high-risk pregnancies are found too late.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    timeline: [
      { key: "First call", label: "Your district, your registers and where mothers are found late" },
      { key: "Walkthrough", label: "One antenatal visit, offline, on a basic phone" },
    ],
    footnote:
      "Figures in [01]: World Health Organization, maternal mortality fact sheet, April 2025; Sample Registration System special bulletin, Office of the Registrar General, India, 2020 to 2022. Figures in [06]: Akashic customer stories. The visit and the screens on this page are a sample.",
  },
};
