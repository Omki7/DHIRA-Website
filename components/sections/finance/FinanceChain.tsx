/*
 * [01] The Chain — the finance problem as a creative split: four systems each
 * watching one hop (dark plate, every one "clear") against the chain they
 * never assembled (paper-light plate, surfaced weeks late), then the fracture
 * ledger beneath. Red appears only as the problem indicator (token table).
 * Fracture copy comes from the shared sector config so the two stay in sync.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const finance = SECTOR_PAGES.finance;

const graphSignals = [
  {
    tag: "RESOLVE",
    title: "One entity, three accounts",
    body: "Near-identical names across cards, UPI, and savings resolve to a single beneficiary.",
  },
  {
    tag: "PATTERN",
    title: "Structuring recognised",
    body: "Transfers parked just under the reporting limit match a known laundering shape.",
  },
  {
    tag: "EVIDENCE",
    title: "Alert carries its lineage",
    body: "The chain, the entities, and every source record arrive with the escalation.",
  },
];

const siloViews = [
  { system: "CARD", hop: "₹49,200 → A. K. Enterprises", verdict: "No flag" },
  { system: "UPI", hop: "₹48,700 → AK Enterprise", verdict: "No flag" },
  { system: "SAV", hop: "₹47,900 → A.K. Entprs", verdict: "No flag" },
];

function GraphEvidenceBand() {
  return (
    <div className="mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-ink shadow-frame">
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/sectors/finance-hq.jpg"
            alt="Financial-district towers at dusk, glass facades and lit trading floors"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.12)_0%,rgba(10,10,12,0.68)_100%)]" aria-hidden />
          <div className="absolute left-5 top-5 rounded-full border border-white/[0.18] bg-white/[0.12] px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/[0.82] backdrop-blur-md">
            Risk desk · 14:09
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
            {["Card", "UPI", "Savings"].map((stage) => (
              <div key={stage} className="rounded-card border border-white/[0.16] bg-black/[0.34] px-3 py-2 backdrop-blur-md">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/[0.52]">
                  Hop
                </p>
                <p className={`mt-1 text-[12px] font-semibold ${stage === "Savings" ? "text-blue-subtle" : "text-white"}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-6 py-7 text-white md:px-8">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent lg:inset-x-auto lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-[3px]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
            What the graph is already saying
          </p>
          <div className="mt-6 space-y-5">
            {graphSignals.map((signal, idx) => (
              <div key={signal.title} className={idx > 0 ? "border-t border-dashed border-white/[0.14] pt-5" : ""}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-blue-subtle">
                  {signal.tag}
                </p>
                <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-white">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/[0.62]">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinanceChain() {
  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ THE CHAIN</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Four systems watched. None saw the chain.
          </h2>
        </ScrollReveal>

        {/* The two views */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-frame bg-ink px-7 py-9 text-white md:px-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
                  What each system saw
                </p>
                <p className="mt-5 font-mono text-[34px] font-bold leading-none tracking-tight text-white md:text-[40px]">
                  Three hops<span className="text-blue">.</span>
                </p>
                <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/50">
                  Card, UPI, savings &middot; six minutes apart
                </p>
                <div className="mt-6 space-y-2.5">
                  {siloViews.map((row) => (
                    <div key={row.system} className="flex items-center gap-3 border-t border-dashed border-white/[0.14] pt-2.5 first:border-t-0 first:pt-0">
                      <span className="w-[46px] shrink-0 rounded-[4px] border border-white/[0.18] bg-white/[0.08] px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-white/70">
                        {row.system}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-white/85">
                        {row.hop}
                      </span>
                      <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.06em] text-white/45">
                        {row.verdict}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[26em] text-[15px] leading-relaxed text-white/[0.65]">
                  Each transfer sat just under the reporting limit. Each system
                  logged its own hop and saw nothing wrong.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden flex-col items-center justify-center px-8 lg:flex" aria-hidden>
            <span className="h-full w-px border-l border-dashed border-line" />
            <span className="whitespace-nowrap py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-overcast">
              The blind spot
            </span>
            <span className="h-full w-px border-l border-dashed border-line" />
          </div>

          <ScrollReveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-7 py-9 md:px-9">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                When the alert finally fired
              </p>
              <p className="mt-5 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
                Weeks later
              </p>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-overcast">
                Quarterly review &middot; buried in false positives
              </p>
              <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">
                The chain surfaces in a review long after the money moves. The
                pattern that spanned three products was invisible to all of them,
                and the evidence is reconstructed by hand from logs that disagree.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-9 max-w-[38em] text-center text-lg leading-relaxed text-inkSoft md:text-xl">
            The gap between the hops is where the money leaves, and where the
            audit questions begin.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <GraphEvidenceBand />
        </ScrollReveal>

        {/* Fractures */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {finance.problem.fractures.map((fracture, idx) => (
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
