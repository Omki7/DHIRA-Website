/*
 * [01] Sector Problem — the use case: one concrete scenario dossier, then the
 * three fractures beneath it as a dense three-column rail with watermark
 * numerals. Red appears only as the problem indicator (token table).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent } from "./sectorContent";

export default function SectorProblem({ content }: { content: SectorContent }) {
  const { problem } = content;

  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-background pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ {problem.label.toUpperCase()}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {problem.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="relative mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-6 py-7 md:px-10 md:py-8">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
              How it plays out today
            </p>
            <p className="mt-3.5 max-w-[52em] text-[17px] leading-relaxed text-inkSoft md:text-lg">
              {problem.scenario}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {problem.fractures.map((fracture, idx) => (
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
