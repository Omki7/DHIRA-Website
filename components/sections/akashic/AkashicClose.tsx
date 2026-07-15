/*
 * [11] Close — Ready When You Are.
 * Dark closure card, per the home page's Closure precedent (Rule 5).
 * NOTE: the content script flags the six-week commitment as "confirm" —
 * verify before ship.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AkashicClose() {
  return (
    <section id="talk-to-our-team" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/40">[11]</span>&nbsp;&nbsp;Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-[18em] text-heading-sm font-semibold text-white md:text-heading-md">
                Grounded data. Trusted AI. Decisions you can defend.
              </h2>
              <p className="mx-auto mt-6 max-w-[34em] text-lg leading-relaxed text-white/65">
                Every layer on this page can be walked through live, against a
                sample of your own data.
              </p>
              <p className="mx-auto mt-8 max-w-[30em] text-xl font-semibold tracking-tight text-white md:text-2xl">
                Six weeks. Pilot to production-ready system.
              </p>
              <div className="mx-auto mt-5 w-full max-w-[380px]">
                <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                  <span>Pilot</span>
                  <span>Week 6 &middot; production-ready</span>
                </div>
                <div className="mt-2 flex gap-1" aria-hidden>
                  {Array.from({ length: 6 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-[5px] flex-1 rounded-full ${
                        i === 5 ? "bg-blue-border animate-[ps-pulse_2s_infinite]" : "bg-blue-border/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mx-auto mt-5 max-w-[34em] text-base leading-relaxed text-white/65">
                No multi-year implementation. No stack of disconnected vendors.
                Prove it against your own numbers in six weeks, and keep the
                complete record you build doing it.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-secondary">
                  Talk to our team
                </Link>
                <Link
                  href="/delivery#akashic-deployment"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-250 ease-settle hover:bg-white/10"
                >
                  See the six-week rollout
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
