/*
 * [03] What Changes — before/after ledger. Carries the page's one soft blue
 * band (Rule 5a): the narrative "breather" section of every sector page.
 * Qualitative shifts only, no invented figures (Rule 4).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent } from "./sectorContent";

export default function SectorOutcomes({ content }: { content: SectorContent }) {
  const { outcomes } = content;

  return (
    <section
      id="outcomes"
      className="scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-10 pb-16 lg:pt-14 lg:pb-20"
    >
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[04]</span>
              &nbsp;&nbsp;WHAT CHANGES
            </span>
            <span className="text-overcast">/ BEFORE &amp; AFTER</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {outcomes.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="mt-6 max-w-[36em] text-lg leading-relaxed text-inkSoft">
            {outcomes.intro}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <div className="mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-card">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />

            <div className="hidden grid-cols-[1fr_56px_1fr] border-b border-dashed border-lineSoft px-6 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow md:grid md:px-10">
              <span className="text-overcast">Before Akashic</span>
              <span aria-hidden />
              <span className="text-blue">On Akashic</span>
            </div>

            {outcomes.rows.map((row, idx) => (
              <div
                key={row.before}
                className={`grid grid-cols-1 gap-2 px-6 py-6 md:grid-cols-[1fr_56px_1fr] md:items-center md:gap-0 md:px-10 ${
                  idx > 0 ? "border-t border-dashed border-lineSoft" : ""
                }`}
              >
                <p className="text-[15px] leading-relaxed text-overcast md:pr-6">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.08em] text-overcast/70 md:hidden">
                    Before
                  </span>
                  {row.before}
                </p>
                <span
                  className="hidden justify-center font-mono text-[15px] text-blue md:flex"
                  aria-hidden
                >
                  &rarr;
                </span>
                <p className="text-[15px] font-medium leading-relaxed text-ink md:pl-6">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.08em] text-blue md:hidden">
                    After
                  </span>
                  {row.after}
                </p>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-6 py-3 font-mono text-[9px] uppercase tracking-[0.08em] md:px-10">
              <span className="text-inkSoft">Same team &middot; same systems of record</span>
              <span className="flex items-center gap-1.5 text-inkSoft">
                <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                One governed foundation
              </span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
