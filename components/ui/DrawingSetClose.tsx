"use client";

/*
 * The closing card for the drawing pages (/about, /careers). The site's
 * sub-page closure recipe (`bg-ink`, Rule 5b): an invitation on the left, and
 * on the right the title block every engineering drawing set ends with
 * (who drew the set, where, which sheet), stamped with a miniature of the
 * page's hero figure so the page closes on the image it opened with.
 *
 * Always carries #talk-to-our-team. `anchors` adds extra in-page targets
 * (the Company menu's #careers / #join-us on /about).
 */

import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import TwoToneTitle from "@/components/ui/TwoToneTitle";

export type TitleCell = { label: string; value: ReactNode };

export default function DrawingSetClose({
  num,
  label,
  setup,
  payoff,
  body,
  actions,
  cells,
  wide,
  drawnBy,
  stamp,
  anchors = [],
}: {
  num: string;
  label: string;
  setup: ReactNode;
  payoff: ReactNode;
  body: ReactNode;
  actions: ReactNode;
  /* Four half width cells, read in pairs */
  cells: TitleCell[];
  /* One full width cell under the pairs (offices, locations) */
  wide: TitleCell;
  drawnBy: ReactNode;
  stamp: ReactNode;
  anchors?: string[];
}) {
  return (
    <section
      id="talk-to-our-team"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      {anchors.map((id) => (
        <span key={id} id={id} className="absolute -top-24" aria-hidden />
      ))}
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-frame bg-anchor text-white">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />

            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              <div className="px-6 py-12 sm:px-10 lg:col-span-7 lg:px-14 lg:py-16">
                <FigureEyebrow num={num} label={label} dark bare />
                <TwoToneTitle setup={setup} payoff={payoff} tone="ink" className="mt-8" />
                <p className="mt-6 max-w-[32em] text-lg leading-relaxed text-white/65">{body}</p>
                <div className="mt-10 flex flex-wrap items-center gap-3">{actions}</div>
              </div>

              {/* Title block */}
              <div className="relative border-t border-white/[0.12] lg:col-span-5 lg:border-l lg:border-t-0">
                <dl className="grid h-full grid-cols-2 font-mono text-[11px] uppercase tracking-[0.08em]">
                  {cells.map((cell, k) => (
                    <div
                      key={cell.label}
                      className={`border-b border-white/[0.12] px-6 py-5 sm:px-8 ${k % 2 === 0 ? "border-r" : ""}`}
                    >
                      <dt className="text-white/45">{cell.label}</dt>
                      <dd className="mt-2 text-[15px] tracking-[0.04em] text-white">{cell.value}</dd>
                    </div>
                  ))}
                  <div className="col-span-2 border-b border-white/[0.12] px-6 py-5 sm:px-8">
                    <dt className="text-white/45">{wide.label}</dt>
                    <dd className="mt-2 text-[15px] tracking-[0.04em] text-white">{wide.value}</dd>
                  </div>
                  <div className="col-span-2 px-6 py-6 pr-28 sm:px-8 sm:pr-32">
                    <dt className="text-white/45">Drawn by</dt>
                    <dd className="mt-2 max-w-[18em] text-pretty font-sans text-[13px] normal-case leading-relaxed tracking-normal text-white/75">
                      {drawnBy}
                    </dd>
                  </div>
                </dl>
                <div className="absolute bottom-5 right-6 sm:right-8">{stamp}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
