/*
 * [02] How DHIRA Tackles It — four moves (Unify → Govern → Predict → Act) on
 * one dashed rail, each mapped to the Akashic modules that do the work.
 * Module chips link to /akashic anchors (same targets the nav uses).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent } from "./sectorContent";

export default function SectorSolution({ content }: { content: SectorContent }) {
  const { solution } = content;

  return (
    <section id="solution" className="scroll-mt-24 overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[03]</span>
              &nbsp;&nbsp;HOW AKASHIC TACKLES IT
            </span>
            <span className="text-overcast">/ FOUR MOVES, ONE FOUNDATION</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {solution.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="mt-6 max-w-[44em] text-lg leading-relaxed text-inkSoft">
            {solution.intro}
          </p>
        </ScrollReveal>

        {/* Desktop: four columns on one dashed rail */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute left-[6px] right-[6px] top-[6px] border-t border-dashed border-line" aria-hidden />
          <div className="grid grid-cols-4 gap-10">
            {solution.steps.map((step, idx) => (
              <ScrollReveal key={step.phase} delay={idx * 100}>
                <div>
                  <span
                    className={`relative z-10 block h-[13px] w-[13px] rounded-full border-2 border-blue ${
                      idx === solution.steps.length - 1 ? "bg-blue" : "bg-white"
                    }`}
                    aria-hidden
                  />
                  <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    0{idx + 1} / {step.phase}
                  </p>
                  <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                    {step.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {step.modules.map((module) => (
                      <Link
                        key={module.label}
                        href={module.href}
                        className="rounded-full border border-subtle-stroke px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-inkSoft transition-colors duration-250 ease-settle hover:border-blue-border hover:bg-blue-subtle hover:text-blue"
                      >
                        {module.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical rail */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-2 left-[6px] top-[6px] border-l border-dashed border-line" aria-hidden />
          <div className="flex flex-col gap-12">
            {solution.steps.map((step, idx) => (
              <ScrollReveal key={step.phase} delay={idx * 80}>
                <div className="relative pl-9">
                  <span
                    className={`absolute left-0 top-[5px] block h-[13px] w-[13px] rounded-full border-2 border-blue ${
                      idx === solution.steps.length - 1 ? "bg-blue" : "bg-white"
                    }`}
                    aria-hidden
                  />
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    0{idx + 1} / {step.phase}
                  </p>
                  <h3 className="mt-2.5 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-inkSoft">
                    {step.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.modules.map((module) => (
                      <Link
                        key={module.label}
                        href={module.href}
                        className="rounded-full border border-subtle-stroke px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-inkSoft transition-colors duration-250 ease-settle hover:border-blue-border hover:bg-blue-subtle hover:text-blue"
                      >
                        {module.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={160}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            Every module runs on the same governed foundation &middot; every answer arrives with its lineage
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
