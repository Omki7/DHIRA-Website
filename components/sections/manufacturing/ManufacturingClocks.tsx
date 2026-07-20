/*
 * [01] Two Clocks — the manufacturing problem as a creative split: the
 * machine clock (milliseconds, dark plate) against the meeting clock
 * (month end, paper-light plate), then the fracture ledger beneath.
 * Red appears only as the problem indicator (token table). Fracture copy
 * comes from the shared sector config so the two stay in sync.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const manufacturing = SECTOR_PAGES.manufacturing;

export default function ManufacturingClocks() {
  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ TWO CLOCKS</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Two clocks run your plant. They never meet.
          </h2>
        </ScrollReveal>

        {/* The two clocks */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-frame bg-ink px-7 py-9 text-white md:px-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
                  The machine clock
                </p>
                <p className="mt-5 font-mono text-[34px] font-bold leading-none tracking-tight text-white md:text-[40px]">
                  08:14:02<span className="text-blue">.318</span>
                </p>
                <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/50">
                  Torque sample &middot; every 40 ms
                </p>
                <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-white/65">
                  Station three starts drifting on a Tuesday morning. The
                  machine records it instantly, in a table nobody joins.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden flex-col items-center justify-center px-8 lg:flex" aria-hidden>
            <span className="h-full w-px border-l border-dashed border-line" />
            <span className="whitespace-nowrap py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-overcast">
              The gap
            </span>
            <span className="h-full w-px border-l border-dashed border-line" />
          </div>

          <ScrollReveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-7 py-9 md:px-9">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                The meeting clock
              </p>
              <p className="mt-5 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
                Month end
              </p>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-overcast">
                Variance review &middot; three weeks after the drift
              </p>
              <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">
                The scrap surfaces in Thursday&rsquo;s quality report. The cost
                lands in month-end variance. The root cause is reconstructed
                from four systems that disagree about what happened.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-9 max-w-[38em] text-center text-lg leading-relaxed text-inkSoft md:text-xl">
            The gap between the two clocks is where downtime, scrap, and
            recalls live.
          </p>
        </ScrollReveal>

        {/* Fractures */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {manufacturing.problem.fractures.map((fracture, idx) => (
            <ScrollReveal key={fracture.title} delay={idx * 90}>
              <div className={idx > 0 ? "md:border-l md:border-dashed md:border-lineSoft md:pl-10" : ""}>
                <p className="text-[44px] font-semibold leading-none tracking-tighter text-lineSoft">
                  {idx + 1}
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                  {fracture.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                  {fracture.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            None of these are people problems. All of them are architecture problems.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
