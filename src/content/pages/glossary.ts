/* ------------------------------------------------------------------ */
/*  Glossary page (added 15 Oct 2026)                                  */
/* ------------------------------------------------------------------ */
/* Every word on /glossary around the terms. The terms are the glossary
   collection (content/collections/glossary.ts). Composer:
   app/glossary/page.tsx. */

import type { PageCloseBlock } from "../blocks";
import type { PageSection, Seo } from "../types";

export interface GlossaryPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel?: string;
  hero: {
    label: string;
    setup: string;
    payoff: string;
    lede: string;
    /** Follows the term count: "24 terms". */
    countSuffix: string;
    /** Accessible name of the A to Z letter index. */
    lettersLabel: string;
  };
  terms: { inAkashicLabel: string; seeWhere: string };
  /** DefinedTermSet structured-data name. */
  termSetName: string;
  close: PageCloseBlock;
}

export const glossaryPage: GlossaryPage = {
  seo: {
    title: "Glossary",
    description:
      "The terms we use, defined once. Data and AI vocabulary moves fast. These are the terms used across this site, what each one means, and where Akashic puts it to work.",
    path: "/glossary",
  },
  sections: [
    { id: "hero", label: "Glossary" },
    { id: "terms", label: "The terms", eyebrow: "[01]" },
    { id: "talk-to-our-team", label: "Talk to our team", eyebrow: "[02]" },
  ],
  sectionsLabel: "Glossary page sections",
  hero: {
    label: "Glossary",
    setup: "Glossary.",
    payoff: "The terms we use, defined once.",
    lede: "Data and AI vocabulary moves fast. These are the terms used across this site, what each one means, and where Akashic puts it to work.",
    countSuffix: "terms",
    lettersLabel: "Letters",
  },
  terms: { inAkashicLabel: "In Akashic", seeWhere: "See where" },
  termSetName: "DHIRA glossary",
  close: {
    label: "Talk to our team",
    setup: "Missing a term?",
    payoff: "Ask the people who use it.",
    body: "If a word on this site needs more than a definition, a solutions architect will walk you through it on your own data.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "Read Insights", href: "/insights" },
  },
};
