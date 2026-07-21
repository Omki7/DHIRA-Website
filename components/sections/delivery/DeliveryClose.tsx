/*
 * [09] Close — Ready When You Are.
 * Dark closure card per the Closure / AkashicClose precedent (Rule 5).
 * Carries the #talk-to-our-team id that the nav CTA and hero CTA target.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const models = ["01 Platform", "02 Product", "03 Advisory"];

export default function DeliveryClose() {
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
                <span className="text-white/30">[09]</span>&nbsp;&nbsp;Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-[18em] text-heading-sm font-semibold text-white md:text-heading-md">
                Three models.
                <br />
                One standard of accountability.
              </h2>
              <p className="mx-auto mt-6 max-w-[46em] text-lg leading-relaxed text-white/65">
                Whichever door you enter through, the governance, documentation, and
                accountability are the same.
              </p>
              <p className="mx-auto mt-8 max-w-[30em] text-lg font-semibold tracking-tight text-white md:text-xl">
                A 30-minute technical discovery. No pitch deck.
              </p>
              <div className="mx-auto mt-5 w-full max-w-[420px]">
                <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                  <span>Your problem</span>
                  <span>The right tier</span>
                </div>
                <div className="mt-2 flex gap-1.5" aria-hidden>
                  {models.map((model, idx) => (
                    <span
                      key={model}
                      className={`flex flex-1 items-center justify-center rounded-full border py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] ${
                        idx === 0
                          ? "border-blue-border/50 text-blue-border animate-[ps-pulse_2s_infinite]"
                          : "border-white/20 text-white/60"
                      }`}
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mx-auto mt-5 max-w-[35em] text-base leading-relaxed text-white/65">
                We map your problem to the right tier and start with the Sovereign
                Blueprint.
                <br />
                No wrong doors.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-secondary">
                  Talk to our team
                </Link>
                <Link
                  href="/#get-started"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-250 ease-settle hover:bg-white/10"
                >
                  Share your requirements
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
