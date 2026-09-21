import type { PageSection } from "./pageSection";

/* Sentence case, matching HOME_SECTIONS, AKASHIC_SECTIONS and EIS_SECTIONS.
   These labels used to be Title Case ("The Problem", "How It Works", "Built On
   Akashic"), which made the shared <PageMinimap> render a different
   capitalisation convention on this route than on every other one — the same
   widget, in the same corner of the screen, changing its own house style as
   you moved between pages. */
export const LIFE_SECTIONS: PageSection[] = [
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
];
