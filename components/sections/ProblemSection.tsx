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
    <div ref={ref} data-problem-counter className="font-sans text-[40px] font-semibold leading-none tracking-tightest text-red-deep tabular-nums sm:text-[46px] xl:text-[52px]">
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

        {/* One composition under one hairline (tightened 21 Oct 2026, user:
            "the bottom line feels out of proportion, the things are not
            placed right"). Right, the three answers, the column exactly the
            drawing's width from xl. Left, framing them: the industry record
            at the top, level with the question, and the verdict at the foot,
            level with "Which number do you act on?". The verdict stays the
            section's last line and its bridge into [02]; no bridge button
            (founder, 20 Oct 2026). On phones the answers come first. */}
        <div className="mt-12 grid grid-cols-1 border-t border-lineSoft pt-4 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-16 lg:pt-6 xl:grid-cols-[minmax(0,1fr)_600px] xl:gap-x-24">
          <ScrollReveal delay={180} className="lg:col-start-2 lg:row-start-1">
            <DivergentAnswers content={content} />
          </ScrollReveal>

          <div className="flex flex-col lg:col-start-1 lg:row-start-1 lg:justify-between lg:pb-10 lg:pt-4">
            <ScrollReveal delay={220}>
              <div className="mt-10 border-t border-lineSoft pt-6 lg:mt-0 lg:border-0 lg:pt-0">
                <h3 className="text-[22px] font-semibold tracking-tight text-ink sm:text-[24px]">
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

            {/* The verdict: the section's thesis, which [02] answers. */}
            <ScrollReveal delay={160}>
              <p className="mt-10 border-t border-dashed border-lineSoft pt-6 text-balance text-[20px] font-semibold leading-snug tracking-tight sm:text-[22px] lg:mt-12">
                <span className="block text-inkSoft">{content.verdict.setup}</span>
                <span className="mt-1 block text-ink">{content.verdict.payoff}</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </ScrollRevealRail>
    </motion.section>
  );
}
