/* ------------------------------------------------------------------ */
/*  Akashic Life page                                                  */
/* ------------------------------------------------------------------ */
/* Every word on /solutions/life, in section order. Composer:
   app/solutions/life/page.tsx. Ground rhythm is deliberate (dark, white,
   dark, dark, light, light, dark, light, white, dark).
   A quote band sat at [07] and was removed 23 Jul 2026: its only
   attribution was "from a customer platform review". Do not reinstate it
   without a named, printable source. Minimap labels are sentence case, like
   every other page. */

import type { Cta, PageSection, Seo } from "../types";

export interface LifeEyebrow {
  num: string;
  label: string;
}

/** Which line icon heads a benefit (sections/life/LifeBenefits). */
export type LifeBenefitIcon = "heart" | "handset" | "record" | "map";

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
    skipLabel: string;
  };
  gap: {
    eyebrow: LifeEyebrow;
    title: string;
    blocks: { ghost: string; head: string; body: string }[];
    closer: { ghost: string; lead: string; tail: string };
  };
  solution: {
    eyebrow: LifeEyebrow;
    lede: string;
    moves: { label: [string, string]; body: string }[];
  };
  benefits: {
    eyebrow: LifeEyebrow;
    title: string;
    items: { icon: LifeBenefitIcon; head: string; body: string }[];
  };
  record: { eyebrow: LifeEyebrow; title: string };
  altitude: { lead: string; tail: string };
  recordOfWork: {
    eyebrow: LifeEyebrow;
    lede: string;
    chain: { figure: string; name: string; body: string; live?: boolean }[];
  };
  built: {
    eyebrow: LifeEyebrow;
    title: string;
    layers: { module: string; name: string; body: string }[];
  };
  stake: { lead: string; tail: string; footer: string };
  close: { title: string; body: string; primary: Cta; secondary: Cta };
}

export const solutionsLife: LifePage = {
  seo: {
    title: "Akashic Life Solution",
    description:
      "The intelligence layer for care that cannot wait: specialist-grade risk detection on a frontline worker's handset, offline, carried all the way to a national dashboard.",
    path: "/solutions/life",
  },
  sections: [
    { id: "hero", label: "Overview" },
    { id: "the-gap", label: "The problem" },
    { id: "the-solution", label: "How it works" },
    { id: "what-changes", label: "What changes" },
    { id: "the-record", label: "The record" },
    { id: "altitude", label: "Village to policy" },
    { id: "record-of-work", label: "Proof" },
    { id: "how-its-built", label: "Built on Akashic" },
    { id: "the-stake", label: "The stake" },
    { id: "talk-to-our-team", label: "Get started" },
  ],
  sectionsLabel: "Life page sections",

  hero: {
    badge: { product: "Akashic Life", platform: "Built on Akashic" },
    title: "The intelligence layer for care that cannot wait.",
    lede: "Akashic Life puts specialist-grade risk detection in the hands of a frontline health worker, on a basic phone, with no signal. A mother is screened where she is, and the district hospital knows before the ambulance starts its engine.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See how it works", href: "#the-solution" },
    skipLabel: "Skip to the problem",
  },

  gap: {
    eyebrow: { num: "01", label: "The problem" },
    title: "The signal arrives. The response does not.",
    blocks: [
      {
        ghost: "4 DAYS",
        head: "Time, not pathology, is what takes her",
        body: "A mother in a remote village can wait four days between the first sign of danger and a diagnosis. Travel to a clinic. Manual checks. A sample sent away. A lab queue. The journey back.",
      },
      {
        ghost: "0 BARS",
        head: "The need is worst exactly where the network is not",
        body: "Cloud diagnostics assume a connection. The places that most need specialist judgement are the ones with no broadband, no specialist, and often no signal at all.",
      },
      {
        ghost: "7 STEPS",
        head: "Every handoff is somewhere to lose her",
        body: "Symptom, clinic, checks, sample, lab, return, diagnosis. Seven places for a record to be re-keyed, misfiled or quietly dropped, and nobody holding the whole thread.",
      },
    ],
    closer: {
      ghost: "ZERO",
      lead: "Not one of those four days is clinical.",
      tail: "They are travel, transcription and waiting. Every one of them is a systems problem, and systems problems can be rebuilt.",
    },
  },

  solution: {
    eyebrow: { num: "02", label: "The solution" },
    lede: "Akashic Life is an edge intelligence layer for frontline healthcare. A health worker enters what they can see and measure at the visit. The model on the phone reads it and answers one question: how likely is this pregnancy to turn dangerous, and how soon. That reading travels up to the district and the ministry, and the response comes back down the same path.",
    moves: [
      {
        label: ["Read the risk", "at the edge"],
        body: "Akashic Life runs the model on the phone itself. A full antenatal screen, read on the spot by a frontline worker with no network, no lab and no specialist within reach.",
      },
      {
        label: ["Carry the signal", "upward"],
        body: "The moment a bar appears the reading is compressed and burst-sent over SMS or GPRS. It lands as one governed record, and that same record is what the district and the ministry read.",
      },
      {
        label: ["Close the loop", "back to her"],
        body: "The response returns down the same path. The emergency response network is triggered, the district hospital is alerted, and the village knows help is already moving.",
      },
    ],
  },

  benefits: {
    eyebrow: { num: "03", label: "What it changes" },
    title: "Edge AI collapses the referral chain into a single visit.",
    items: [
      { icon: "heart", head: "She is caught before the emergency", body: "Severe risk is flagged at the visit, not on the fourth day. The window that decides the outcome is the one the system now sits inside." },
      { icon: "handset", head: "It works where nothing else does", body: "No broadband, no lab, no specialist within reach. The whole screen is read on the handset a frontline worker is already carrying." },
      { icon: "record", head: "One mother, one record", body: "The health worker, the primary health centre and the district hospital read the same golden record. Not three versions of her that somebody has to reconcile later." },
      { icon: "map", head: "The district view is finally live", body: "Every reading aggregates upward, anonymised, so administrators watch risk building in a block while there is still time to move people and supplies to it." },
    ],
  },

  record: {
    eyebrow: { num: "04", label: "The record" },
    title: "A frontline worker holds the whole record, and so does everyone above her.",
  },

  altitude: {
    lead: "One mother, found in time.",
    tail: "The same reading, anonymised and aggregated, is the national picture tomorrow.",
  },

  /* Figures as on the public record (Rule 4), as in the customer stories. */
  recordOfWork: {
    eyebrow: { num: "06", label: "Already done. Already running." },
    lede: "Reading risk at the edge is the new part. Carrying a country’s health data without dropping a record is not, and it is the part that is hard.",
    chain: [
      { figure: "2 Billion+", name: "National immunisation registry", body: "The same data backbone reconciled more than 2 billion dose records through a country-scale programme, under load, in public." },
      { figure: "187M+", name: "National learning platform", body: "Enrolments resolved into one governed model for a national education deployment, on the identical Master Data and Business Intelligence architecture this page has been describing." },
      { figure: "Built on it", name: "Akashic Life", body: "The same foundation, taken to the point of care. The reading happens on a handset, and the record it produces travels the governed path everything above it travels.", live: true },
    ],
  },

  built: {
    eyebrow: { num: "07", label: "What is underneath" },
    title: "Nothing here is bespoke. It is Akashic, pointed at a village.",
    layers: [
      { module: "Machine Learning", name: "On-device risk reading", body: "Models tuned small enough to run on the basic Android handsets frontline workers already carry, and to read a full antenatal screen locally with nothing leaving the device." },
      { module: "Master Data", name: "One golden record", body: "The same mother is recognised as the same mother whether she is seen by a health worker, a primary health centre or a district hospital. One record, not three." },
      { module: "Business Intelligence and Governance", name: "Audited by design", body: "Aggregated, anonymised risk flows into district and national dashboards with full lineage, audit trails and role-based access, exactly as in every other Akashic deployment." },
    ],
  },

  stake: {
    lead: "Every day of delay puts a mother at risk.",
    tail: "That gap is not a clinical problem. It is an infrastructure problem, and DHIRA has closed one before at the scale of a country.",
    footer: "Akashic Life reads risk at the edge today. The question left is whose district it runs in next.",
  },

  close: {
    title: "Care that cannot wait should not have to.",
    body: "Bring specialist-grade risk detection to the visits your health workers are already making, on the handsets they already carry, and read the result at district and national level the moment there is signal.",
    primary: { label: "Talk to our team", href: "/#get-started" },
    secondary: { label: "See the record", href: "#record-of-work" },
  },
};
