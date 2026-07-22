"use client";

import DivergentAnswers from "@/components/demos/DivergentAnswers";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* The industry record. Demoted from the section's largest type to a cited
   footnote under the argument (Jul 2026): the reader lives the three-answers
   anecdote, so that is the verdict; these two figures are what tells them it
   is not their fault. Each claim is written to sit on one line. */
const RECORD = [
  {
    figure: "$581B",
    claim: "went into AI last year, up 130%.",
    source: "Stanford HAI, 2026",
    sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    figure: "46%",
    claim: "of AI pilots never reach production.",
    source: "S&P Global, 2025",
    sourceUrl: "https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/",
  },
] as const;

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative w-full overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.035]" />

      <ScrollRevealRail className="z-10">
        <ScrollReveal>
          <div className="mb-10 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:mb-12">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
          </div>
        </ScrollReveal>

        {/* Argument left, evidence right. The section used to stack headline,
            plot, industry record and thesis as four centred blocks separated by
            dashed rules, which read as four sections and ran past two screens.
            One composition, one argument, one payoff.

            Explicit row/column placement rather than source order: stacked, the
            ledger has to come before the citations, or the reader meets "it
            isn't just you" before they have seen the thing it refers to. */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className="lg:col-start-1 lg:row-start-1">
            <div>
              {/* Setup soft, payoff in full ink: the same grammar the closing
                  thesis uses, so the section reads as one voice. */}
              <h2 className="text-[38px] font-semibold leading-[1.04] tracking-tighter sm:text-[44px] xl:text-[52px]">
                <span className="block text-inkSoft">You asked for</span>
                <span className="block text-inkSoft">one number.</span>
                <span className="mt-1 block text-ink">You got three.</span>
              </h2>

              <p className="mt-6 max-w-[30em] text-[17px] leading-relaxed text-inkSoft md:text-[18px]">
                Every answer is defensible. Every system is doing its job. That is
                what makes this expensive: nobody can tell you which one to act on,
                and the decision is due anyway.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="mt-11 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0"
          >
            <DivergentAnswers />
          </ScrollReveal>

          <ScrollReveal className="lg:col-start-1 lg:row-start-2">
            <div className="mt-11 border-t border-dashed border-lineSoft pt-7 lg:mt-10">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                It isn&apos;t just you
              </p>

              <div className="mt-5 space-y-5">
                {RECORD.map((fact) => (
                  <div key={fact.figure} className="flex items-baseline gap-4 sm:gap-5">
                    {/* Red is scoped to this section (see §4) and marks the
                        cost: these two figures and the ledger's variance.
                        `red-deep`, not `red` — see the token's note. */}
                    <div className="w-[86px] shrink-0 text-right font-sans text-[30px] font-semibold leading-none tracking-tightest text-red-deep sm:w-[96px] sm:text-[34px]">
                      {fact.figure}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-medium leading-snug text-ink sm:text-[15px]">
                        {fact.claim}
                      </p>
                      <a
                        href={fact.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-eyebrow text-blue underline decoration-blue/40 underline-offset-4 transition-colors duration-settle ease-settle hover:text-blue-hover hover:decoration-blue-hover"
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
        <ScrollReveal>
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
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group relative inline-flex items-center gap-2 rounded-full border border-default-stroke bg-background px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft shadow-card transition-all duration-300 ease-settle hover:border-ink hover:bg-ink hover:text-white hover:shadow-frame active:scale-95"
              >
                <span>
                  <span className="text-overcast transition-colors duration-300 ease-settle group-hover:text-white/60">
                    [02]
                  </span>
                  &nbsp;&nbsp;MEET AKASHIC
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
    </section>
  );
}
