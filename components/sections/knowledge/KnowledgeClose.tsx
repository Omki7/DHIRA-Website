/*
 * [07] Close — Stop Guessing. Start Steering.
 * Dark closure card per the Closure precedent (Rule 5). Carries the
 * #talk-to-our-team id the nav CTA targets.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function KnowledgeClose() {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail dark isLast>
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[07]</span>&nbsp;&nbsp;Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                Stop guessing. Start steering.
              </h2>
              <p className="mx-auto mt-6 max-w-[32em] text-lg leading-relaxed text-white/65">
                The dashboard is ready. The engineering is proven at national scale.
              </p>
              <p className="mx-auto mt-7 max-w-[26em] text-xl font-semibold tracking-tight text-white md:text-2xl">
                The pilot takes 6 weeks.
              </p>
              <div className="mx-auto mt-5 w-full max-w-[380px]">
                <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                  <span>Pilot</span>
                  <span>Week 6 &middot; live on the grid</span>
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
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-primary-invert">
                  Book your 6-week pilot
                </Link>
                <Link
                  href="/#get-started"
                  className="btn-secondary-invert"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
