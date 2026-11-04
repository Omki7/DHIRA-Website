/* ------------------------------------------------------------------ */
/*  Shared content primitives                                          */
/* ------------------------------------------------------------------ */
/* The building blocks every content document is made of. They are the
   CMS contract: when a CMS replaces the local files in content/, its
   schema must produce these shapes (or its generated types replace them).
   Plain data only: strings, numbers, booleans, arrays and objects, so a
   document can cross the server/client boundary as a prop unchanged. */

/** A link a person reads: visible label plus target. */
export interface Link {
  label: string;
  href: string;
}

/** A call to action. Same shape as Link; named for intent. */
export type Cta = Link;

/** An image from /public (or, later, the CMS asset store). `alt` is
    required: an empty string marks a purely decorative image. */
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

/** One entry in a page's section index (layout/PageMinimap). `id` must
    match the rendered section's DOM id. */
export interface PageSection {
  id: string;
  label: string;
  eyebrow?: string;
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
   to them. A CMS rich-text field (Portable Text, Lexical, Slate) maps onto
   these block types one to one. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "note"; label: string; text: string };
