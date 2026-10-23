"use client";

import type { ReactNode } from "react";

/*
 * THE section eyebrow, on every page (DESIGN_SYSTEM, "Section grammar";
 * founder, 20 Oct 2026: one format across the site). A dashed hairline above
 * and below, `[NN]  LABEL` in 11px mono on the left: number `overcast`, label
 * `inkSoft`. Always left-aligned, never centred, never coloured, no dots.
 * Sections render it through `ui/SectionHeader`; use it directly only where
 * a section cannot.
 *
 * `tag` sets a required status mark after the label (PreviewTag on agents).
 * `live` puts the pulsing NOW HIRING marker in the right slot (careers only).
 * `bare` drops the rail inside a card (the closing `DrawingSetClose`).
 */

export default function FigureEyebrow({
  num,
  label,
  tag,
  live,
  dark = false,
  bare = false,
}: {
  num?: string;
  label: string;
  /** A status mark set after the label, e.g. `PreviewTag` on a section
      about agents. The claims rules require it; it is not decoration. */
  tag?: ReactNode;
  live?: string;
  dark?: boolean;
  bare?: boolean;
}) {
  const rail = bare
    ? ""
    : `border-y border-dashed px-[2px] py-[17px] ${dark ? "border-line" : "border-lineSoft"}`;
  return (
    <div className={`flex items-center justify-between gap-6 font-mono text-[12px] uppercase tracking-eyebrow ${rail}`}>
      <p className="flex items-center gap-3">
        <span>
          {num && <span className={dark ? "text-uc-dim" : "text-overcast"}>[{num}]&nbsp;&nbsp;</span>}
          <span className={dark ? "text-uc-mute" : "text-inkSoft"}>{label}</span>
        </span>
        {tag}
      </p>
      {live && (
        <span className="flex items-center gap-2 text-blue">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite] motion-reduce:animate-none" aria-hidden />
          {live}
        </span>
      )}
    </div>
  );
}
