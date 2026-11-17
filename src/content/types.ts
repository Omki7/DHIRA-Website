/* ------------------------------------------------------------------ */
/*  Shared content primitives                                          */
/* ------------------------------------------------------------------ */
/* The building blocks every content document is made of: the contract
   every component is typed against. Content lives in these files; there
   is no CMS (17 Nov 2026). Plain data only: strings, numbers, booleans,
   arrays and objects, so a document can cross the server/client boundary
   as a prop unchanged. */

/** A link a person reads: visible label plus target. */
export interface Link {
  label: string;
  href: string;
}

/** A call to action. Same shape as Link; named for intent. */
export type Cta = Link;

/** An image from /public. `alt` is required: an empty string marks a
    purely decorative image. */
export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** A page's search and social metadata (lib/metadata.ts renders it). */
export interface Seo {
  title: string;
  description: string;
  /** The page's own path, used for the canonical URL. */
  path: string;
  /** Social card image; defaults to /og-image.png. */
  image?: string;
  type?: "website" | "article";
}

/** One section of a page, in page order. `id` must match the rendered
    section's DOM id.

    The section index (navigation/PageMinimap) shows chapters, not sections
    (17 Nov 2026, user: an index of eleven or fourteen rows put readers
    off). Consecutive sections that share a `chapter` collapse into one
    index row named by it, share one eyebrow number, and read
    "Chapter / Label" in their eyebrows. A section without `chapter` is a
    row of its own, named by `label`. Rows are numbered from 00 when the
    page opens on its `hero`, from 01 otherwise; keep the eyebrows on those
    numbers. Every page keeps to six rows or fewer
    (docs/DESIGN_SYSTEM.md §9, "Section index"). */
export interface PageSection {
  id: string;
  /** The section's own name: the index row when it has no chapter, the
      part after the slash in its eyebrow when it has one. */
  label: string;
  /** The index row this section sits under, in the shared vocabulary:
      The problem, What we offer, How it works, What changes, Why trust us,
      Get started. */
  chapter?: string;
}

/** A section's `[NN]  LABEL` eyebrow. `number` is the two-digit position. */
export interface Eyebrow {
  number: string;
  label: string;
}

/** The site's two-tone headline: a soft setup, then the payoff in full ink
    (ui/TwoToneTitle and every section that hand-sets the same grammar). */
export interface TwoTone {
  setup: string;
  payoff: string;
}

/** A question and its answer (ui/FaqSection, FAQPage JSON-LD). */
export interface Faq {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/*  Long-form rich text                                                */
/* ------------------------------------------------------------------ */
/* Articles, press releases, story pages and policies are a list of typed
   blocks rendered by ui/RichText. Inline links are written [label](href)
   inside any text. `h2` blocks carry an id so a table of contents can link
   to them. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "note"; label: string; text: string };
