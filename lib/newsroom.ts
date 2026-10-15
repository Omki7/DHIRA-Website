import type { PageSection } from "./pageSection";
import type { Block } from "./richText";
import { SITE } from "./site";

/* ------------------------------------------------------------------ */
/*  /newsroom (added 15 Oct 2026)                                      */
/* ------------------------------------------------------------------ */
/* Announcements, recognition and the media kit. The founder's GA date is
   the first announcement. The founder quote is his own line from his
   wireframe ("About DHIRA"), not a new one. Recognition is the site's
   existing proof points (DESIGN_SYSTEM brand identity, /about journey).

   DRAFT: the press release text and the boilerplate need review before
   distribution. The release is dated the day it was drafted. */

export const NEWSROOM_SECTIONS: PageSection[] = [
  { id: "hero", label: "Newsroom" },
  { id: "announcements", label: "Announcements" },
  { id: "recognition", label: "Recognition" },
  { id: "media-kit", label: "Media kit" },
  { id: "talk-to-our-team", label: "Media contact" },
];

export const NEWSROOM_HERO = {
  label: "Newsroom",
  setup: "Newsroom.",
  payoff: "News, recognition and the media kit.",
  lede: "Announcements from DHIRA and Akashic, the recognition the team has earned, and what a journalist needs to write about either.",
};

export type PressRelease = {
  slug: string;
  title: string;
  dek: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  dateline: string;
  blocks: Block[];
};

export const BOILERPLATE = `DHIRA is a data and AI company founded in ${SITE.founded}, with offices in New York, Hyderabad and Bangalore. It builds Akashic, the governed data and AI platform, and delivers it as one accountable partner, from advisory to engineering and deployment. Akashic is the intelligence layer inside country-scale public programmes in education, public health and labour mobility.`;

export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "akashic-1-0-general-availability",
    title: "DHIRA announces Akashic 1.0, generally available on 1 November 2026",
    dek: "Every Akashic module on one governed foundation, with the same access control, lineage and audit under each one.",
    date: "2026-10-15",
    dateline: "Hyderabad and New York",
    blocks: [
      {
        type: "p",
        text: "DHIRA today announced that Akashic 1.0, its governed data and AI platform, will be generally available on 1 November 2026.",
      },
      {
        type: "p",
        text: "Akashic brings pipelines, master data, warehousing, machine learning, conversational AI, business intelligence and governance onto one foundation. Every module shares the same access control, lineage and audit, so dashboards, models and AI answers work from the same definitions and every figure traces to its source.",
      },
      {
        type: "p",
        text: "Akashic is already the intelligence layer inside country-scale public programmes, where it has reconciled more than two billion dose records for a national immunisation registry and unified more than 5.75 billion learning interactions for a national learning platform.",
      },
      {
        type: "quote",
        text: "I founded DHIRA to tightly couple digitalisation, AI and data governance, so that intelligence reaches every decision, at scale.",
        cite: `${SITE.founder.name}, ${SITE.founder.role}, DHIRA`,
      },
      { type: "h2", id: "availability", text: "Availability" },
      {
        type: "p",
        text: "Akashic 1.0 is available from 1 November 2026 as multi-tenant SaaS operated by DHIRA, in a customer's own AWS, Azure or GCP account, or on-premise on Docker and Kubernetes. AI agents remain in preview with design partners. Plans are described at [dhira.ai/pricing](/pricing).",
      },
      { type: "h2", id: "about-dhira", text: "About DHIRA" },
      { type: "p", text: BOILERPLATE },
      { type: "h2", id: "media-contact", text: "Media contact" },
      {
        type: "p",
        text: `Press enquiries: [${SITE.email}](mailto:${SITE.email}?subject=Press%20enquiry).`,
      },
    ],
  },
];

export const findRelease = (slug: string) => PRESS_RELEASES.find((release) => release.slug === slug);

export const RECOGNITION = {
  label: "Recognition",
  setup: "Recognised by the people",
  payoff: "who run public technology.",
  items: [
    { year: "2025", name: "Maha Hackathon", detail: "Winner" },
    { year: "2025", name: "Telangana AI Rising", detail: "Winner" },
    { year: "", name: "Startup India", detail: "DPIIT-recognised startup" },
  ],
};

export const MEDIA_KIT = {
  label: "Media kit",
  setup: "Logos, people and words.",
  payoff: "Everything to write the story.",
  lede: "Use the marks as supplied, on a clear ground. Please keep DHIRA (the company) and Akashic (the platform) distinct in copy.",
  logos: [
    { name: "DHIRA mark", note: "For light grounds", file: "/brand/dhira-mark.svg", dark: false },
    { name: "DHIRA mark, reversed", note: "For dark grounds", file: "/brand/dhira-mark-white.svg", dark: true },
    { name: "Akashic mark", note: "For light grounds", file: "/brand/akashic-mark.svg", dark: false },
  ],
  colours: [
    { name: "Ink", value: "#1A1C1D" },
    { name: "DHIRA blue", value: "#3E63DD" },
    { name: "Depth", value: "#0A0E24" },
    { name: "Paper", value: "#FFFFFF" },
  ],
  typeface: "Google Sans and Google Sans Mono",
};
