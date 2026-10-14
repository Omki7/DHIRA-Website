"use client";

import DivergentAnswers from "@/components/demos/DivergentAnswers";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { HOME_PROBLEM } from "@/lib/homeSections";
import { motion } from "framer-motion";
import useCountUp, { usePrefersReducedMotion } from "@/hooks/useCountUp";

function EvidenceFigure({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1800, startAtZero: true });
  return (
    <div ref={ref} data-problem-counter className="font-sans text-[46px] font-semibold leading-none tracking-tightest text-red-deep tabular-nums sm:text-[56px] xl:text-[64px]">
      <span className="sr-only">{figure}</span>
      <span aria-hidden="true">{display}</span>
    </div>
  );
}

export default function ProblemSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.section
      id="problem"
      initial={{ opacity: 0, y: 24 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full overflow-clip bg-background pt-10 pb-10 lg:pt-14 lg:pb-14"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.035]" />

      <ScrollRevealRail className="z-10">
        <ScrollReveal>
          <div className="mb-8 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:mb-10">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
          </div>
        </ScrollReveal>

        {/* On mobile, show the conflicting answers before the industry evidence. */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal delay={80} className="lg:col-start-1 lg:row-start-1">
            <div>
              {/* Setup soft, payoff in full ink: the same grammar the closing
                  thesis uses, so the section reads as one voice. */}
              <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tighter min-[375px]:text-[30px] sm:text-[44px] lg:text-[34px] xl:text-[42px]">
                <span className="block whitespace-nowrap text-inkSoft">{HOME_PROBLEM.title[0]}</span>
                <span className="mt-1 block text-ink">{HOME_PROBLEM.title[1]}</span>
              </h2>

              <p data-problem-description className="mt-6 text-[16px] leading-[1.6] text-inkSoft sm:text-[18px]">
                {HOME_PROBLEM.description.map((line) => <span key={line} className="block">{line}</span>)}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={180}
            className="mt-11 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0"
          >
            <DivergentAnswers />
          </ScrollReveal>

          <ScrollReveal delay={220} className="lg:col-start-1 lg:row-start-2">
            <div className="mt-10 border-t border-lineSoft pt-6 lg:mt-9">
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
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* The verdict, and the bridge into Meet Akashic */}
        <ScrollReveal delay={160}>
          <div className="relative mx-auto mt-14 max-w-[900px] border-t border-dashed border-lineSoft pt-10 text-center lg:mt-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-subtle/50 opacity-60 blur-3xl" />
            <p className="text-[20px] font-semibold leading-snug tracking-tight md:text-[26px]">
              <span className="block text-inkSoft">
                The infrastructure got the investment.
              </span>
              <span className="mt-1.5 block text-ink">
                The data underneath was never made ready for AI to answer from.
              </span>
            </p>
            {/* Bridge into [02]. This used to be a blue pill with a pinging
                blue dot: it is an EYEBROW — the same `[NN] SECTION NAME` label
                every section opens with — and dressing one of them in the
                accent colour made [02] look like a different kind of thing
                from [01] and [03] a screen apart. It now carries the eyebrow's
                own palette (number `overcast`, label `inkSoft`, mono
                uppercase) and earns its emphasis from being a control:
                hovering fills it to ink. */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <span
                className="h-10 w-px bg-gradient-to-b from-lineSoft to-line"
                aria-hidden
              />
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("platform");
                  if (el) {
                    el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
                  }
                }}
                className="group relative inline-flex items-center gap-2 rounded-full border border-default-stroke bg-background px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft shadow-card transition-all duration-300 ease-settle hover:border-ink hover:bg-ink hover:text-on-action hover:shadow-frame active:scale-95"
              >
                <span>
                  <span className="text-overcast transition-colors duration-300 ease-settle group-hover:text-on-action/60">
                    [02]
                  </span>
                  &nbsp;&nbsp;THE PLATFORM
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 ease-settle group-hover:translate-y-0.5"
                >
                  <path d="M6 2.5v7M2.5 6l3.5 3.5 3.5-3.5" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </motion.section>
  );
}
