import { site } from "../site";
import type { Block } from "../types";

/* ------------------------------------------------------------------ */
/*  Press releases (added 15 Oct 2026)                                 */
/* ------------------------------------------------------------------ */
/* Announcements, recognition and the media kit. The founder's GA date is
   the first announcement. The founder quote is his own line from his
   wireframe ("About DHIRA"), not a new one. Recognition is the site's
   existing proof points (DESIGN_SYSTEM brand identity, /about journey).

   DRAFT: the press release text and the boilerplate need review before
   distribution. The release is dated the day it was drafted. The
   newsroom's own copy is content/pages/newsroom.ts. */

export interface PressRelease {
  slug: string;
  title: string;
  dek: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  dateline: string;
  blocks: Block[];
}

export const pressReleases: PressRelease[] = [
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
        text: "Akashic brings data pipelines, master data, warehousing, machine learning, conversational AI, business intelligence and governance onto one foundation. Every module shares the same access control, lineage and audit, so dashboards, models and AI answers work from the same definitions and every figure traces to its source.",
      },
      {
        type: "p",
        text: "Akashic is already the intelligence layer inside country-scale public programmes, where it has reconciled more than two billion dose records for a national immunisation registry and unified more than 5.75 billion learning interactions for a national learning platform.",
      },
      {
        type: "quote",
        text: "I founded DHIRA to tightly couple digitalisation, AI and data governance, so that intelligence reaches every decision, at scale.",
        cite: `${site.founder.name}, ${site.founder.role}, ${site.name}`,
      },
      { type: "h2", id: "availability", text: "Availability" },
      {
        type: "p",
        text: "Akashic 1.0 is available from 1 November 2026 as multi-tenant SaaS operated by DHIRA, in a customer's own AWS, Azure or GCP account, or on-premise on Docker and Kubernetes. AI agents remain in preview with design partners. Plans are described at [dhira.ai/pricing](/pricing).",
      },
      { type: "h2", id: "about-dhira", text: "About DHIRA" },
      { type: "p", text: site.boilerplate },
      { type: "h2", id: "media-contact", text: "Media contact" },
      {
        type: "p",
        text: `Press enquiries: [${site.email}](mailto:${site.email}?subject=Press%20enquiry).`,
      },
    ],
  },
];
