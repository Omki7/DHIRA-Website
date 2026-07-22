import React from "react";

/*
 * The five [02] feature glyphs, drawn for this section.
 *
 * Replaces `ucIcons.ts` — five fill-based marks lifted wholesale from
 * attio.com's feature grid (a bar chart, a globe, a book, a chat bubble, a
 * headset). They were generic SaaS iconography that described nothing we
 * actually claim: the globe sat over "one record of truth", the headset over
 * "governed by default".
 *
 * Each glyph here draws its own sentence, in the site's existing sketch-icon
 * language (see components/icons/DynamicSketchIcon.tsx): 24x24 box, 1.5px
 * round strokes, and exactly ONE filled dot marking the thing the caption is
 * about. That dot is the section accent (`blue`), so the strip carries the
 * same live-point cue as the tab dots below it.
 *
 * Stroke colour is inherited (`currentColor`), so the caller sets the resting
 * and hover tint; only the accent dot is coloured here.
 */

const ACCENT = "#3E63DD";

const GLYPHS: React.ReactNode[][] = [
  // 01 — Every source, connected: three feeds converging on one node.
  [
    <path key="a" d="M3 5h5.5l5.5 7" />,
    <path key="b" d="M3 12h11" />,
    <path key="c" d="M3 19h5.5l5.5-7" />,
    <circle key="d" cx="18.5" cy="12" r="2.4" fill={ACCENT} stroke="none" />,
  ],
  // 02 — One record of truth: one record, carrying its seal. Deliberately
  // NOT a second many-into-one mark — [01] already owns that shape, and two
  // convergence glyphs side by side read as the same idea told twice.
  [
    <rect key="a" x="4" y="5.5" width="16" height="13" rx="2" />,
    <path key="b" d="M7.5 10h7M7.5 14h4.5" />,
    <circle key="c" cx="16.5" cy="14.5" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 03 — Forecasts you can trust: measured history, then a projection.
  [
    <path key="a" d="M3.5 19.5V4.5" />,
    <path key="b" d="M3.5 16l4-4 3 3 3-6" />,
    <path key="c" d="M13.5 9l2.5 2.5" strokeDasharray="2.5 2.5" />,
    <path key="d" d="M16 11.5l3.5-4.5" strokeDasharray="2.5 2.5" />,
    <circle key="e" cx="20" cy="6" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 04 — Ask in plain language: a question, and the source it came back with.
  [
    <path key="a" d="M4 5h16v9.5a2 2 0 0 1-2 2H9.5L4 21V5z" />,
    <path key="b" d="M8 9.5h8M8 13h4" />,
    <circle key="c" cx="16" cy="13" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 05 — Governed by default: a record inside a standing guard.
  [
    <path key="a" d="M12 3l7.5 3v6.5c0 4.2-3.2 7.2-7.5 9.5-4.3-2.3-7.5-5.3-7.5-9.5V6l7.5-3z" />,
    <path key="b" d="M8.5 11.5h7M8.5 15h7" />,
    <circle key="c" cx="12" cy="7.5" r="1.8" fill={ACCENT} stroke="none" />,
  ],
];

export default function UCFeatureIcon({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {GLYPHS[index] ?? GLYPHS[0]}
    </svg>
  );
}
