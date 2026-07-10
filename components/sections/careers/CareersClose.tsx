/*
 * [05] Close — We Should Talk.
 * Dark closure card per the Closure precedent (Rule 5). Carries the
 * #talk-to-our-team id that the nav CTA and every Apply link target.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CareersClose() {
  return (
    <section id="talk-to-our-team" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[05]</span>&nbsp;&nbsp;Apply
              </p>
              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                If that matters to you, we should talk.
              </h2>
              <p className="mx-auto mt-6 max-w-[32em] text-lg leading-relaxed text-white/65">
                Send a note about what you have shipped and which role fits.
                Proof of work beats a perfect CV.
              </p>
              <div className="mx-auto mt-8 flex w-fit items-center gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                <span>New York</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>Hyderabad</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>Bangalore</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span className="flex items-center gap-1.5 text-white/80">
                  <span className="h-[5px] w-[5px] rounded-full bg-blue-border animate-[ps-pulse_2s_infinite]" aria-hidden />
                  Remote
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-secondary">
                  Talk to our team
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-250 ease-settle hover:bg-white/10"
                >
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
