/* ------------------------------------------------------------------ */
/*  Typed long-form content: articles, press releases, legal pages     */
/* ------------------------------------------------------------------ */
/* Long-form copy stays config, like every other page (STATE_AND_DATA):
   a list of typed blocks rendered by ui/RichText. Inline links are written
   as [label](href) inside any text and become real links when rendered.
   `h2` blocks carry an id so a table of contents can link to them. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "note"; label: string; text: string };

/** The h2 headings of a document, in order, for its table of contents. */
export const outline = (blocks: Block[]) =>
  blocks.flatMap((block) => (block.type === "h2" ? [{ id: block.id, text: block.text }] : []));

/** Rough reading time at 230 words a minute, never under one minute. */
export function readingMinutes(blocks: Block[]) {
  const words = blocks
    .map((block) => {
      if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
      return block.text;
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Format an ISO date (2026-11-01) the British way: 1 November 2026. */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${day} ${months[month - 1]} ${year}`;
}
