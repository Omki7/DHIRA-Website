"use client";

import DivergentAnswers from "@/components/demos/DivergentAnswers";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useUi } from "@/components/providers/UiProvider";
import type { HomeProblem } from "@/content/pages/home";
import useCountUp from "@/hooks/useCountUp";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function EvidenceFigure({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1800, startAtZero: true });
  return (
    <div ref={ref} data-problem-counter className="font-sans text-[46px] font-semibold leading-none tracking-tightest text-red-deep tabular-nums sm:text-[56px] xl:text-[64px]">
      <span className="sr-only">{figure}</span>
      <span aria-hidden="true">{display}</span>
    </div>
  );
}

export default function ProblemSection({ content }: { content: HomeProblem }) {
  const reduced = usePrefersReducedMotion();
  const ui = useUi();
  const HOME_PROBLEM = content;
  return (
    <motion.section
      id="problem"
      initial={{ opacity: 0, y: 24 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      

      <ScrollRevealRail className="z-10">
        <SectionHeader
          num={content.eyebrow.number}
          label={content.eyebrow.label}
          setup={content.title.setup}
          payoff={content.title.payoff}
          lede={HOME_PROBLEM.description.join(" ")}
        />

        {/* Evidence below the header: the industry record on the left, the
            three answers on the right. On mobile the answers come first. */}
        <div className="mt-12 grid grid-cols-1 lg:mt-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal delay={180} className="lg:col-start-2 lg:row-start-1">
            <DivergentAnswers content={content} />
          </ScrollReveal>

          <ScrollReveal delay={220} className="lg:col-start-1 lg:row-start-1 lg:self-center">
            <div className="mt-12 border-t border-lineSoft pt-6 lg:mt-0">
              <h3 className="text-[23px] font-semibold tracking-tight text-ink sm:text-[26px]">
                {HOME_PROBLEM.evidenceHeading}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-x-5 sm:gap-x-8">
                {HOME_PROBLEM.facts.map((fact) => (
                  <div key={fact.figure} className="min-w-0 border-l border-dashed border-lineSoft pl-5 first:border-0 first:pl-0 sm:pl-8">
                    {/* Deep red marks the cost, with contrast for large figures. */}
                    <EvidenceFigure figure={fact.figure} />
                    <div className="mt-3 min-w-0">
                      <p className="text-[14px] font-medium leading-snug text-ink sm:text-[15px]">
                        {fact.claim}
                      </p>
                      <a
                        href={fact.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.04em] sm:text-[10px] text-blue underline decoration-blue/40 underline-offset-4 transition-colors duration-250 ease-settle hover:text-blue-hover hover:decoration-blue-hover"
                      >
                        {fact.source}
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="shrink-0"
                        >
                          <path d="M3.5 8.5 8.5 3.5M8.5 3.5H4.75M8.5 3.5v3.75" />
                        </svg>
                        <span className="sr-only">{ui.opensInNewTab}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* The verdict: the section's thesis, which [02] answers. No bridge
            button into [02]: sections end on their content (founder, 20 Oct
            2026). */}
        <ScrollReveal delay={160}>
          <p className="mt-14 border-t border-dashed border-lineSoft pt-8 text-balance text-[22px] font-semibold leading-snug tracking-tight md:text-[26px] lg:mt-16">
            <span className="block text-inkSoft">{content.verdict.setup}</span>
            <span className="mt-1 block text-ink">{content.verdict.payoff}</span>
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </motion.section>
  );
}
