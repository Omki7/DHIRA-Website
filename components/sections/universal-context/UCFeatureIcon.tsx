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

// Index-matched to UCFeatureGrid's FEATURES. Redrawn 22 Sep 2026 when the
// tiles moved from outcomes to the five things an AI needs to know; the
// convergence, forecast and chat glyphs went with the old captions.
const GLYPHS: React.ReactNode[][] = [
  // 0 Entity resolution: one record, carrying its seal.
  [
    <rect key="a" x="4" y="5.5" width="16" height="13" rx="2" />,
    <path key="b" d="M7.5 10h7M7.5 14h4.5" />,
    <circle key="c" cx="16.5" cy="14.5" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 1 Semantic layer: a business term's label, its definition pinned. Was a
  // sigma, the metric glyph, which went with the word "metrics".
  [
    <path key="a" d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11l9 9-7 7-9-9V5.5z" />,
    <path key="b" d="M11.5 12.5l3 3" />,
    <circle key="c" cx="8" cy="8" r="2" fill={ACCENT} stroke="none" />,
  ],
  // 2 Document intelligence: a page, tied off to the record it explains.
  [
    <path key="a" d="M4.5 3.5h7l4 4v13h-11z" />,
    <path key="b" d="M11.5 3.5v4h4" />,
    <path key="c" d="M7.5 12h5M7.5 15.5h5" />,
    <path key="d" d="M15.5 14h2.5" />,
    <circle key="e" cx="20" cy="14" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 3 Knowledge layer: one record and what it belongs to. Drawn as a
  // hierarchy, not a network, because the site never claims a graph.
  [
    <circle key="a" cx="12" cy="5.5" r="2.2" />,
    <path key="b" d="M12 7.7V11M6 17.5V13.5h12v4" />,
    <circle key="c" cx="6" cy="19.5" r="2" />,
    <circle key="d" cx="18" cy="19.5" r="2.2" fill={ACCENT} stroke="none" />,
  ],
  // 4 Data lineage: a figure walked back, step by step, to source.
  [
    <circle key="a" cx="5" cy="18.5" r="2" />,
    <path key="b" d="M7 18.5h4.5V12H16V6.5" />,
    <circle key="c" cx="17.5" cy="5.5" r="2.2" fill={ACCENT} stroke="none" />,
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
