"use client";

import DivergentAnswers from "@/components/demos/DivergentAnswers";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* The industry record. Deliberately the heaviest type in the section: the
   three answers above are the anecdote, these two figures are the verdict, so
   they outrank them in size. Each claim is written to sit on one line. */
const FACTS = [
  {
    figure: "$581B",
    claim: "went into AI last year, up 130%.",
    source: "Stanford HAI, AI Index Report 2026",
    sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    figure: "46%",
    claim: "of AI pilots never reach production.",
    source: "S&P Global Market Intelligence 2025",
    sourceUrl: "https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/",
  },
] as const;

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative w-full overflow-clip bg-white pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.035]" />

      <ScrollRevealRail className="z-10">
        <ScrollReveal>
          <div className="mb-10 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mx-auto max-w-[900px] text-center">
            {/* One sentence per line. The block spans guarantee the two-line
                break; sizes follow the shared section-title scale. No
                whitespace-nowrap on purpose — the section is overflow-clip, so
                an over-long line must wrap rather than get silently cut off. */}
            <h2 className="text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink sm:text-[48px] lg:text-[56px]">
              <span className="block">You asked for one number.</span>
              <span className="block">You got three.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[32em] text-[17px] leading-relaxed text-inkSoft md:text-[18px]">
              All three are defensible. That is what makes this expensive.
            </p>
          </div>
        </ScrollReveal>

        {/* The three answers */}
        <ScrollReveal delay={160}>
          <div className="mt-14 lg:mt-16">
            <DivergentAnswers />
          </div>
        </ScrollReveal>

        {/* The industry record — the section's weight sits here */}
        <ScrollReveal delay={80}>
          <div className="mx-auto mt-16 max-w-[1000px] border-t border-dashed border-lineSoft pt-14 lg:mt-20">
            <p className="text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              The industry record
            </p>
            <h3 className="mt-4 text-center text-[26px] font-semibold leading-tight tracking-tight text-ink md:text-[32px]">
              It isn&apos;t just you.
            </h3>

            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-0">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.figure}
                  className={`flex flex-col items-center text-center sm:px-10 ${
                    i === 1 ? "sm:border-l sm:border-dashed sm:border-lineSoft" : ""
                  }`}
                >
                  {/* Red is scoped to this section (see §4) and marks the two
                      AI figures as the alarm, not the answers above them. */}
                  <div className="whitespace-nowrap font-sans text-[58px] font-semibold leading-[0.9] tracking-tightest text-red md:text-[72px] lg:text-[80px]">
                    {fact.figure}
                  </div>
                  <p className="mt-5 text-[15px] font-medium leading-snug text-ink md:text-[16.5px]">
                    {fact.claim}
                  </p>
                  <a
                    href={fact.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-eyebrow text-blue underline decoration-blue/40 underline-offset-4 transition-colors duration-settle ease-settle hover:text-blue-hover hover:decoration-blue-hover"
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
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Footer — names the real gap and sets up Meet Akashic */}
        <ScrollReveal>
          <div className="relative mx-auto mt-16 max-w-[900px] border-t border-dashed border-lineSoft pt-14 text-center lg:mt-20">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-subtle/50 opacity-60 blur-3xl" />
            {/* Setup in the softer tone, verdict in full ink: the second line
                is the section's thesis and should land on its own. */}
            <p className="text-[20px] font-semibold leading-snug tracking-tight md:text-[26px]">
              <span className="block text-inkSoft">
                The infrastructure got the investment.
              </span>
              <span className="mt-1.5 block text-ink">
                The data underneath was never made ready for AI to answer from.
              </span>
            </p>
            <span
              className="mx-auto mt-10 block h-20 w-px bg-gradient-to-b from-blue-border to-transparent"
              aria-hidden
            />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
