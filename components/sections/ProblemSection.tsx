"use client";

import ProblemBlock from "@/components/demos/ProblemBlock";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const BLOCKS = [
  {
    eyebrow: "01 / scale",
    finding: "Global AI investment hit $581 billion in 2025. Most of it never reached operations.",
    detail:
      "Enterprises poured capital into models and infrastructure. The missing layer was clean, connected, governed data: the foundation every outcome depends on.",
    watermark: "$581B",
    source: "Stanford HAI, AI Index Report 2026",
    sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    eyebrow: "02 / growth",
    finding: "AI investment grew 130% in a single year. Enterprise data architecture didn't.",
    detail:
      "Teams run analytics, automation, and experiments on parallel copies of the truth. Speed compounds the problem.",
    watermark: "+130%",
    source: "Stanford HAI, AI Index Report 2026",
    sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    eyebrow: "03 / reality",
    finding: "Every organisation runs three separate worlds: the warehouse, the documents, and the live stream.",
    detail:
      "They rarely connect. Governance becomes triage. Decisions are made from the most recent view, not the most complete.",
    watermark: "3",
    source: "IDC & Box, Unstructured Data Report – via CIO Dive",
    sourceUrl: "https://www.ciodive.com/news/unstructured-data-box-IDC-report/692531/",
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
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ THE ARCHITECTURE GAP</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.58fr_1fr] lg:gap-20 lg:pl-16">
          <div className="lg:sticky lg:top-32 self-start">

            <ScrollReveal delay={80}>
              <h2 className="max-w-[16em] text-balance text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
                The gap between investment and&nbsp;outcome.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="mt-6 max-w-[28em] text-base leading-relaxed text-inkSoft">
                The capital is there. The infrastructure isn&apos;t.
                <br className="hidden sm:block" />
                Most enterprise data was built for a slower world.
              </p>
            </ScrollReveal>

            {/* Source */}
            <ScrollReveal delay={240}>
              <p className="mt-6 max-w-xs text-[11px] leading-relaxed text-overcast">
                Stanford HAI AI Index Report 2026: global AI investment reached
                $581.7B in 2025, up 130% year on year.
              </p>
            </ScrollReveal>
          </div>

          {/* Scrolling proof blocks */}
          <div className="relative">
            <div className="relative">
              {BLOCKS.map((block, i) => (
                <ProblemBlock
                  key={block.eyebrow}
                  index={i}
                  eyebrow={block.eyebrow}
                  finding={block.finding}
                  detail={block.detail}
                  watermark={block.watermark}
                  source={block.source}
                  sourceUrl={block.sourceUrl}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bridge Section */}
        <div className="relative mt-20 border-t border-lineSoft pt-16 pb-8 lg:mt-28 lg:pt-20">
          <ScrollReveal>
            <div className="relative mx-auto max-w-[720px] text-center px-4">
              <div className="absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-subtle/50 opacity-60 blur-3xl pointer-events-none" />
              <p className="font-sans text-[18px] md:text-[22px] font-normal leading-relaxed text-inkSoft">
                The gap is not ambition. It is execution. Every one of these numbers traces back to the same root cause:{" "}
                <span className="font-semibold text-ink">
                  a data foundation never built to trust, trace, or act on.
                </span>
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <span className="h-6 w-px bg-blue-border" aria-hidden />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue">
                  Akashic is the data and AI platform built to close it
                </span>
                <span className="h-12 w-px bg-gradient-to-b from-blue-border to-transparent" aria-hidden />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
