/* ------------------------------------------------------------------ */
/*  Careers page                                                       */
/* ------------------------------------------------------------------ */
/* Every word on /careers, in section order. Composer: app/careers/page.tsx.
   The open roles are a collection (content/collections/roles.ts) shared
   with the home careers strip. Company-page voice: no hyphens; no
   work-mode, national-systems or open-role-count lines beyond the figures
   on the public record (Rule 4). */

import type { Cta, PageSection, Seo } from "../types";

/** A drawing-page section header (ui/SectionHeader). */
export interface CareersHeader {
  num: string;
  label: string;
  setup: string;
  payoff: string;
  lede: string;
}

export type Audience = "fresher" | "experienced";

export interface CareersQA {
  num: string;
  principle: string;
  question: string;
  answer: string;
}

export interface CareersPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: {
    label: string;
    live: string;
    title: { setup: string; payoff: string };
    lede: string;
    primary: Cta;
    secondary: Cta;
    seating: { open: string; tail: string; taken: string; openLabel: string };
  };
  work: CareersHeader & {
    /** Wavefront rings, innermost first. */
    rings: string[];
    origin: string;
    reach: string;
    deployments: { name: string; figure: string; label: string }[];
    coda: { lead: string; payoff: string };
  };
  culture: CareersHeader & {
    audienceLabel: string;
    audiences: { id: Audience; label: string }[];
    qa: Record<Audience, CareersQA[]>;
    coda: { lead: string; payoff: string };
  };
  roles: CareersHeader & {
    /** Follows the open seat count: "4 seats open". */
    liveSuffix: string;
    apply: string;
    applyFor: string;
    applyHref: string;
    coda: { lead: string; payoff: string };
  };
  hiring: CareersHeader & {
    steps: { num: string; name: string; tag: string; description: string }[];
    youLearn: string;
    weLearn: string;
    yes: string;
    no: string;
    coda: { lead: string; link: Cta };
  };
  close: {
    num: string;
    label: string;
    setup: string;
    payoff: string;
    body: string;
    primary: Cta;
    secondary: Cta;
    cells: { company: { label: string; value: string }; seats: string; answer: { label: string; value: string }; sheet: { label: string; value: string } };
    where: { label: string; value: string };
    drawnBy: string;
  };
}

export const careers: CareersPage = {
  seo: {
    title: "Careers",
    description: "Help build intelligence for public systems. A small team shipping inside national platforms, on systems built to outlast budget cycles.",
    path: "/careers",
  },
  sections: [
    { id: "hero", label: "Careers" },
    { id: "the-work", label: "The work" },
    { id: "how-we-work", label: "How we work" },
    { id: "open-roles", label: "Open roles" },
    { id: "how-we-hire", label: "How we hire" },
    { id: "talk-to-our-team", label: "Talk to us" },
  ],
  sectionsLabel: "Careers page sections",

  hero: {
    label: "Careers",
    live: "Now hiring",
    title: { setup: "Help build intelligence", payoff: "for public systems." },
    lede: "A small team shipping inside national platforms. Systems built to outlast budget cycles.",
    primary: { label: "See open roles", href: "#open-roles" },
    secondary: { label: "How we hire", href: "#how-we-hire" },
    seating: { open: "seats open.", tail: "The table keeps going.", taken: "Taken", openLabel: "Open" },
  },

  work: {
    num: "01",
    label: "The work",
    setup: "Ship to production.",
    payoff: "Production is a country.",
    lede: "Most engineering ships to a dashboard nobody opens. Here, code runs inside national platforms, and every number is public record.",
    rings: ["Your branch", "Review", "Release", "The platform", "A country"],
    origin: "Your work",
    reach: "A country",
    deployments: [
      { name: "National Learning Platform", figure: "187M+", label: "enrolments resolved" },
      { name: "National Immunisation Registry", figure: "2 Billion+", label: "dose records reconciled" },
      { name: "Overseas Employment Registry", figure: "4M+", label: "worker clearances reconciled" },
    ],
    coda: { lead: "No sandbox. No staging theatre.", payoff: "Real systems from week one." },
  },

  culture: {
    num: "02",
    label: "Working here",
    setup: "Candid questions,",
    payoff: "straight answers.",
    lede: "Six questions candidates hold back, each pinned to a working principle.",
    audienceLabel: "Answering as",
    audiences: [
      { id: "fresher", label: "Fresher" },
      { id: "experienced", label: "Experienced" },
    ],
    qa: {
      fresher: [
        {
          num: "W01",
          principle: "Ship real work, early.",
          question: "What will I do in my first month?",
          answer: "Ship. No bench of observers. Your work reaches production systems within weeks.",
        },
        {
          num: "W02",
          principle: "Outcomes over hours.",
          question: "What are the hours really like?",
          answer: "Trusted outcomes count, not hours logged. A written rule, applied inside the team too.",
        },
        {
          num: "W03",
          principle: "An open stack, portable skills.",
          question: "Will I grow here, or get locked in?",
          answer: "Open technologies, inspectable and swappable. Every skill you sharpen travels with you.",
        },
        {
          num: "W04",
          principle: "Straight answers, both directions.",
          question: "How does feedback work?",
          answer: "A clear yes or no, with reasons. In hiring, in reviews, in daily work.",
        },
        {
          num: "W05",
          principle: "Work where you work best.",
          question: "Can I work from where I live?",
          answer: "New York, Hyderabad, Bangalore or remote. One team, three time zones.",
        },
        {
          num: "W06",
          principle: "No throwaway projects, no throwaway teams.",
          question: "Can I build a long career here?",
          answer: "Systems built to outlive budget cycles, staffed the same way. Lasting work is the point.",
        },
      ],
      experienced: [
        {
          num: "W01",
          principle: "Ship real work, early.",
          question: "Will I own real scope, or inherit a roadmap?",
          answer: "Senior hires own a system, not a ticket queue. The outcome and the decisions, from week one.",
        },
        {
          num: "W02",
          principle: "Outcomes over hours.",
          question: "Is there an on call or crunch culture?",
          answer: "Trusted outcomes count, not hours or heroics. The rule holds under deadline too.",
        },
        {
          num: "W03",
          principle: "An open stack, portable skills.",
          question: "Legacy maintenance, or modern tooling?",
          answer: "Open, modern technologies. Inspectable, swappable, and no black box to inherit.",
        },
        {
          num: "W04",
          principle: "Straight answers, both directions.",
          question: "Who makes the final technical call?",
          answer: "Senior engineers own their calls. A clear yes or no, with reasons. Disagreement gets written down.",
        },
        {
          num: "W05",
          principle: "Work where you work best.",
          question: "Is distributed work real here?",
          answer: "New York, Hyderabad, Bangalore and remote. Distributed is the default, not an exception.",
        },
        {
          num: "W06",
          principle: "No throwaway projects, no throwaway teams.",
          question: "Will the platform survive the next rewrite?",
          answer: "Systems built to outlive budget cycles. If a newcomer cannot maintain the code, the work failed.",
        },
      ],
    },
    coda: { lead: "No perks theatre.", payoff: "Ask the rest on the intro call." },
  },

  roles: {
    num: "03",
    label: "Open roles",
    setup: "Small team.",
    payoff: "Specific seats.",
    lede: "Hiring follows the mission, never the org chart. Each seat owns real scope.",
    liveSuffix: "seats open",
    apply: "Apply",
    applyFor: "Apply for",
    applyHref: "#talk-to-our-team",
    coda: { lead: "No perfect fit? Write anyway.", payoff: "Proof of work beats a perfect CV." },
  },

  hiring: {
    num: "04",
    label: "How we hire",
    setup: "No puzzles. No theatre.",
    payoff: "No ghosting.",
    lede: "Four steps. Real problems, real colleagues, a straight answer. Both sides interview.",
    steps: [
      { num: "01", name: "Intro call", tag: "Both ways", description: "Thirty minutes with your future team. You interview us too." },
      { num: "02", name: "Technical deep dive", tag: "No puzzles", description: "Real problems we have shipped. No whiteboard puzzles." },
      { num: "03", name: "Working session", tag: "Real work", description: "Solve a real problem with your future colleagues." },
      { num: "04", name: "Decision", tag: "Yes or no", description: "A clear yes or no, with reasons." },
    ],
    weLearn: "We learn about you",
    youLearn: "You learn about us",
    yes: "Yes",
    no: "No",
    coda: { lead: "Every candidate gets an answer.", link: { label: "Start with the intro call.", href: "#talk-to-our-team" } },
  },

  close: {
    num: "05",
    label: "Talk to us",
    setup: "Built something real?",
    payoff: "Let’s talk.",
    body: "Share shipped work and the role you want. Every note gets an answer.",
    primary: { label: "Talk to our team", href: "/#get-started" },
    secondary: { label: "Meet the team", href: "/about#leadership" },
    cells: {
      company: { label: "Company", value: "DHIRA" },
      seats: "Seats open",
      answer: { label: "Answer", value: "Yes or no" },
      sheet: { label: "Sheet", value: "05 of 05" },
    },
    where: { label: "Where", value: "New York · Hyderabad · Bangalore · Remote" },
    drawnBy: "A small team shipping across three time zones.",
  },
};
