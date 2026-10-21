/* ------------------------------------------------------------------ */
/*  Reusable section blocks                                            */
/* ------------------------------------------------------------------ */
/* Content shapes for sections that appear on more than one page. Each is
   one CMS "block" type: a page document holds an instance, and the shared
   component renders it. Page-specific section shapes live in that page's
   document under content/pages/. */

import type { Cta } from "./types";

/** "Proven at national scale": the deployment carousel band
    (sections/ProvenAtScale). Home, /akashic and /delivery each hold one. */
export interface ProvenAtScaleBlock {
  number: string;
  eyebrow: string;
  /** `setup` renders in the soft tone; omit it for a one-line title. */
  title: { setup?: string; payoff: string };
  description: string;
  /** Accessible name of the stories carousel. */
  storiesLabel: string;
  /** What one story is called in the carousel controls ("Previous deployment"). */
  storyNoun: string;
}

/** The shared `bg-ink` closing card (ui/PageClose). */
export interface PageCloseBlock {
  label: string;
  setup: string;
  payoff: string;
  body: string;
  primary: Cta;
  secondary?: Cta;
}
