import type { Block } from "../types";

/* ------------------------------------------------------------------ */
/*  Customer stories: one source for the ProvenStories carousel and    */
/*  the /customers library and story pages (moved here 15 Oct 2026)    */
/* ------------------------------------------------------------------ */
/* Real deployment data, not simulated UI. The rules that governed the
   carousel govern every surface that reads this file:

   NAMING: these are government deployments we cannot claim publicly by
   name, so neither the system nor the commissioning ministry is identified.
   Each story is carried by its sector and its public-record figures.

   METRIC TEST (user direction, Jul 2026): every figure must be something
   DHIRA can defend as its OWN result, not a property of the domain it
   landed in ("135 languages connected" and "18 destination corridors" were
   removed on that test).

   ANALYTICAL CLAIMS ONLY (user direction, 22 Jul 2026): DHIRA built the
   intelligence layer, not the transaction system. Copy may claim what was
   unified, resolved, reconciled and read, never what was run, cleared,
   delivered or enforced.

   SOURCES for the second KPI on each card (22 Jul 2026, Rule 4):
     187M+ enrolments: same figure DeliveryProven already carries.
     282K+ employer profiles: same figure FieldLedger already carries.
     26M+ vaccination sessions: public record. At the 200 crore dose
       milestone (17 Jul 2022) the programme reported 2,00,00,15,631 doses
       across 2,63,26,111 sessions, i.e. 2.63 crore. Same milestone as the
       "2 Billion+" figure, so the two numbers stay consistent.

   DRAFT: the `body` of each story page (situation, what was unified, what
   changed) is drafted from the card copy above and needs review. The
   module lists are inferred from what each description says was done. */

export interface Metric {
  value: string;
  label: string;
}

export interface Story {
  id: string;
  platform: string;
  authority: string;
  sector: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  metrics: Metric[];
  /** Akashic modules the story's work implies. DRAFT. */
  modules: string[];
  body: Block[];
}

export const customerStories: Story[] = [
  {
    id: "learning",
    platform: "National Learning Platform",
    authority: "Education · Country-scale deployment",
    sector: "Education",
    title: "Every state's learning data, read as one picture",
    description:
      "Akashic runs inside a national education platform. Transaction logs from every state resolve into one governed model, so programme owners can read curriculum efficacy, learner retention, and where resources are going.",
    image: "/proof/learning.jpg",
    alt: "Students at their desks in a school classroom",
    metrics: [
      { value: "5.75 billion+", label: "Learning interactions unified" },
      { value: "187 million+", label: "Enrolments resolved" },
    ],
    modules: ["Akashic Data Pipelines", "Akashic Master Data", "Akashic Warehouse", "Akashic BI", "Akashic Governance"],
    body: [
      { type: "h2", id: "situation", text: "The situation" },
      {
        type: "p",
        text: "A national education platform serves learners, teachers and administrators in every state. Each state reports through its own systems, in its own formats and on its own schedule. Programme owners needed to read the whole country as one picture: which material works, who keeps learning, and where resources go.",
      },
      { type: "h2", id: "what-was-unified", text: "What Akashic unified" },
      {
        type: "p",
        text: "Transaction logs from every state flow into one governed model. Learners and enrolments resolve across sources, so one learner is one record however many systems saw them. Every figure keeps its lineage back to the state system it came from.",
      },
      {
        type: "ul",
        items: [
          "5.75 billion+ learning interactions unified into one model.",
          "187 million+ enrolments resolved across state systems.",
        ],
      },
      { type: "h2", id: "what-changed", text: "What programme owners can read" },
      {
        type: "p",
        text: "Curriculum efficacy, learner retention and resource allocation, read from one set of figures instead of state-by-state reports reconciled by hand. When a figure is questioned, its trail answers the question.",
      },
    ],
  },
  {
    id: "mobility",
    platform: "Overseas Employment Registry",
    authority: "Labour mobility · Country-scale deployment",
    sector: "Labour mobility",
    title: "Every clearance and recruiter in one auditable view",
    description:
      "Visa clearances, immigration logs, and overseas employer records resolve into one governed view. Analysts can see how a corridor is moving, which recruiters are active in it, and what the figures were on any given day.",
    image: "/proof/mobility.jpg",
    alt: "Travellers queuing with luggage at airport check-in counters",
    metrics: [
      { value: "4 million+", label: "Worker clearances reconciled" },
      { value: "282,000+", label: "Employer profiles resolved" },
    ],
    modules: ["Akashic Data Pipelines", "Akashic Master Data", "Akashic Warehouse", "Akashic Governance"],
    body: [
      { type: "h2", id: "situation", text: "The situation" },
      {
        type: "p",
        text: "Overseas employment runs through several systems: clearances, immigration logs and records of overseas employers and recruiters. Each holds part of the picture. Analysts needed one auditable view of how workers move, and through whom.",
      },
      { type: "h2", id: "what-was-unified", text: "What Akashic unified" },
      {
        type: "p",
        text: "Clearances, immigration logs and employer records resolve into one governed view. Employers and recruiters that appear under different names across systems resolve to single profiles, with the history of every merge kept.",
      },
      {
        type: "ul",
        items: ["4 million+ worker clearances reconciled.", "282,000+ employer profiles resolved."],
      },
      { type: "h2", id: "what-changed", text: "What analysts can read" },
      {
        type: "p",
        text: "How a corridor is moving, which recruiters are active in it, and what the figures were on any given day. Point-in-time history means a question about last March is answered with last March's records.",
      },
    ],
  },
  {
    id: "immunisation",
    platform: "National Immunisation Registry",
    authority: "Public health · Country-scale deployment",
    sector: "Public health",
    title: "Every dose reconciled into one public figure",
    description:
      "Akashic sits behind a country's immunisation record. Doses, sessions, and coverage reconcile into the figures health authorities publish, each one traceable back to the system it came from.",
    image: "/proof/vaccination.jpg",
    alt: "A mass vaccination hall with registration desks and rows of seating",
    metrics: [
      { value: "2 billion+", label: "Dose records reconciled" },
      { value: "26 million+", label: "Vaccination sessions reconciled" },
    ],
    modules: ["Akashic Data Pipelines", "Akashic Master Data", "Akashic Warehouse", "Akashic BI", "Akashic Governance"],
    body: [
      { type: "h2", id: "situation", text: "The situation" },
      {
        type: "p",
        text: "A country's immunisation record is read by health authorities, published to the public and questioned by everyone. Doses, sessions and coverage arrive from facilities across the country. The published figures had to reconcile, and each had to be traceable.",
      },
      { type: "h2", id: "what-was-unified", text: "What Akashic reconciled" },
      {
        type: "p",
        text: "Doses, sessions and coverage reconcile into the figures health authorities publish. Each published figure traces back to the system it came from, through the rules that produced it.",
      },
      {
        type: "ul",
        items: ["2 billion+ dose records reconciled.", "26 million+ vaccination sessions reconciled."],
      },
      { type: "h2", id: "what-changed", text: "What authorities can stand behind" },
      {
        type: "p",
        text: "One public figure, with its trail. When a journalist, an auditor or another department asks where a number came from, the answer is the records, the rules and the date.",
      },
    ],
  },
];
