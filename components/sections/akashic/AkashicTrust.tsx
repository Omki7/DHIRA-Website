/*
 * [05] Enterprise Trust — one answer, four checks.
 * The payoff of [01]: the same South-region answer sits at the top as an
 * artifact, and four live product screens show it being verified. Each
 * check leads with a plain-language question anyone can follow; the screen
 * below it is a full app window (AkashicTrustScreensMockup, §8a) in the
 * same chrome and demo world as the hero screens, so the checks read as
 * the product, not as marketing boxes.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Capillary } from "@/components/sections/akashic/AkashicCardChrome";
import {
  ROLES_SCREEN_HTML,
  LINEAGE_SCREEN_HTML,
  AUDIT_SCREEN_HTML,
  RESIDENCY_SCREEN_HTML,
} from "@/components/demos/mockups/AkashicTrustScreensMockup";

const checks = [
  {
    term: "Access control",
    question: "Who can see it?",
    line: "Permissions follow the person at every layer, not just the login screen.",
    html: ROLES_SCREEN_HTML,
  },
  {
    term: "Lineage",
    question: "Where did each number come from?",
    line: "Pull on any figure and the full trail comes with it, down to the document.",
    html: LINEAGE_SCREEN_HTML,
  },
  {
    term: "Audit trail",
    question: "Who has touched it?",
    line: "A timestamped record of every view, change, and export. Always on.",
    html: AUDIT_SCREEN_HTML,
  },
  {
    term: "Data residency",
    question: "Where did the data stay?",
    line: "Stored, processed, and answered inside your boundary. Nothing crosses it.",
    html: RESIDENCY_SCREEN_HTML,
  },
];

export default function AkashicTrust() {
  return (
    <section id="trust" className="ak-depth relative scroll-mt-24 overflow-hidden">
      {/* The anchor is a precisely-cut dark slab, not a faded merge. Each
          seam is crisp: a fine light-catch hairline where the two planes
          meet, a blue horizon glow rising off it, and a machined texture on
          the surface. The transition is carried by light, never gray fog. */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />
      {/* top seam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(62,99,221,0.22),transparent_72%)]" aria-hidden />
      {/* bottom seam */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(62,99,221,0.16),transparent_72%)]" aria-hidden />
      <div className="relative rail-container border-x-0 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-white/40">[05]</span>
            <span className="text-white/70">&nbsp;&nbsp;Trust, built in</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-white md:text-heading-md">
            An answer you can&rsquo;t trace is just an opinion.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-white/70">
            Every answer proves itself &mdash; the same four ways, every time.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          {/* The artifact under inspection */}
          <ScrollReveal>
            <div className="mx-auto max-w-[640px] overflow-hidden rounded-outer bg-white shadow-deep ring-1 ring-white/10">
              <Capillary bright />
              <div className="flex items-center gap-1.5 border-b border-card-divide bg-panel px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden />
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-secondary-text">
                  The answer someone acts on
                </span>
                <span className="ml-auto font-mono text-[9px] text-secondary-text">09:41</span>
              </div>
              <p className="px-4 py-3.5 text-[14.5px] font-semibold leading-snug text-ink sm:text-[15px]">
                South is 8% behind target because two distributor renewals stalled in July.
              </p>
            </div>
            <span className="mx-auto block h-4 w-px bg-white/25" aria-hidden />
            <p className="text-center font-mono text-[10px] uppercase tracking-eyebrow text-white/50">
              Four checks, built in
            </p>
            <span className="mx-auto block h-4 w-px bg-white/25" aria-hidden />
          </ScrollReveal>

          {/* The four checks, each a numbered strip: text left, live screen right.
              A vertical spine runs down the number column (desktop) so the four
              read as one sequence and the left text has something to sit against. */}
          <div className="relative mt-12 lg:mt-14">
            <div
              className="pointer-events-none absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block"
              aria-hidden
            />
            <div className="flex flex-col gap-10 lg:gap-14">
            {checks.map((check, i) => (
              <ScrollReveal key={check.term} delay={60 + i * 60}>
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.4fr)] lg:gap-12">
                  {/* left: number node + text */}
                  <div className="flex gap-4 lg:gap-5">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0A0E24] font-mono text-[12px] font-semibold tabular-nums text-white/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-blue-border/80">
                        {check.term}
                      </p>
                      <h3 className="mt-2 text-balance text-[22px] font-semibold leading-[1.15] tracking-tight text-white md:text-[26px]">
                        {check.question}
                      </h3>
                      <p className="mt-2.5 max-w-[26em] text-[14px] leading-relaxed text-white/60">{check.line}</p>
                    </div>
                  </div>
                  {/* right: the live screen */}
                  <div className="overflow-hidden rounded-outer bg-white shadow-deep ring-1 ring-white/10">
                    <Capillary bright />
                    <div className="overflow-x-auto">
                      <div
                        className="h-[340px] min-w-[460px]"
                        dangerouslySetInnerHTML={{ __html: check.html }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            </div>
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
            <p className="max-w-[22em] text-2xl font-semibold leading-snug tracking-tight text-white md:text-[28px]">
              This is what makes an answer defensible, not just delivered.
            </p>
            <Link href="#open" className="btn-secondary mt-8">
              See what you&rsquo;d take with you
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
