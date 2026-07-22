/*
 * [07] Close — A Small Team That Ships.
 * Dark closure card per the Closure / AkashicClose precedent (Rule 5).
 * Carries the #talk-to-our-team id that the nav CTA and hero CTA target.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutClose() {
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
                We are a small team that ships.
              </h2>
              <p className="mx-auto mt-6 max-w-[30em] text-lg leading-relaxed text-white/65">
                If that matters to you, we should talk.
              </p>
              <div className="mx-auto mt-8 flex w-fit items-center gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                <span>New York</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>Hyderabad</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>Bangalore</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span className="flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                  Remote
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-primary-invert">
                  Talk to our team
                </Link>
                <Link
                  href="/careers"
                  className="btn-secondary-invert"
                >
                  Explore open roles
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
