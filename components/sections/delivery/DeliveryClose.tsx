/*
 * [07] Close — Your requirement. Our responsibility.
 * Dark closure card per Rule 5 with locked supporting copy, dual CTAs,
 * and the closing accountability statement.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function DeliveryClose() {
  return (
    <section
      id="talk-to-our-team"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail dark isLast>
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1060px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-18">
            <div
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/80 via-blue/40 to-transparent"
              aria-hidden
            />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />

            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[07]</span>&nbsp;&nbsp;Talk to our team
              </p>

              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                Your requirement.
                <br />
                Our responsibility.
              </h2>

              <p className="mx-auto mt-5 max-w-[38em] text-base leading-relaxed text-white/70 md:text-lg">
                Whether you need a platform, a custom solution, a product engineering partner, or additional engineering capacity, start with the problem you&rsquo;re trying to solve. We&rsquo;ll help determine the right way to get there.
              </p>

              {/* Dual CTAs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-primary-invert">
                  Start a conversation
                </Link>
                <Link href="/akashic" className="btn-secondary-invert">
                  Explore Akashic
                </Link>
              </div>

              {/* Closing Accountability Statement */}
              <div className="mx-auto mt-12 max-w-[34em] border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/50">
                  One standard of accountability
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">
                  Different engagements &middot; Different teams &middot; Different technologies
                </p>
                <p className="mt-1 text-[15px] font-semibold text-white">
                  One expectation: deliver what matters.
                </p>
                <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-blue-border">
                  DHIRA
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
