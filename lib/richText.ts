import type { Block } from "@/content/types";

/* Helpers for long-form rich text (the Block type is content: content/types.ts). */

/** The h2 headings of a document, in order, for its table of contents. */
export const outline = (blocks: Block[]) =>
  blocks.flatMap((block) => (block.type === "h2" ? [{ id: block.id, text: block.text }] : []));

/** Rough reading time at 230 words a minute, never under one minute. */
export function readingMinutes(blocks: Block[]) {
  const words = blocks
    .map((block) => (block.type === "ul" || block.type === "ol" ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/* Three-letter months: en-GB's Intl short month writes "Sept". */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const utc = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

/** Format an ISO date (2026-11-01) the British way: 1 November 2026. */
export const formatDate = (iso: string) => dateFormat.format(utc(iso));

/** The compact form for cards and archive rows: 1 Nov 2026. */
export function formatShortDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
