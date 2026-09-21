/*
 * [07] Close — Your requirement. Our responsibility.
 * Dark closure card per Rule 5 with locked supporting copy, dual CTAs,
 * and the closing accountability statement.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const guarantees = [
  "100% Sovereign Code Ownership",
  "Direct Senior Engineer Access",
  "Zero Vendor Lock-In",
];

export default function DeliveryClose() {
  return (
    <section
      id="talk-to-our-team"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail dark isLast>
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1060px] overflow-hidden rounded-[24px] bg-ink px-6 py-14 text-center text-white shadow-[0_20px_50px_rgba(10,14,36,0.3)] md:px-12 md:py-20">
            {/* Top blue accent hairline */}
            <div
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/90 via-blue/50 to-transparent"
              aria-hidden
            />
            {/* Ambient radial glow backdrop */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-blue/10 blur-3xl"
              aria-hidden
            />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-white/70">
                  [07]&nbsp;&nbsp;Talk to our team
                </span>
              </div>

              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md lg:text-heading-lg">
                Your requirement.
                <br />
                Our responsibility.
              </h2>

              <p className="mx-auto mt-5 max-w-[38em] text-base leading-relaxed text-white/75 md:text-lg">
                Whether you need a platform, a custom solution, a product engineering partner, or additional engineering capacity, start with the problem you&rsquo;re trying to solve. We&rsquo;ll help determine the right way to get there.
              </p>

              {/* Guarantees row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {guarantees.map((g) => (
                  <span
                    key={g}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/80"
                  >
                    <span className="h-1 w-1 rounded-full bg-positive" />
                    {g}
                  </span>
                ))}
              </div>

              {/* Dual CTAs */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-primary-invert">
                  Start a conversation
                </Link>
                <Link href="/akashic" className="btn-secondary-invert">
                  Explore Akashic
                </Link>
              </div>

              {/* Closing Accountability Statement */}
              <div className="mx-auto mt-14 max-w-[34em] border-t border-white/10 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/50">
                  One standard of accountability
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">
                  Different engagements &middot; Different teams &middot; Different technologies
                </p>
                <p className="mt-1 text-[15.5px] font-semibold text-white">
                  One expectation: deliver what matters.
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-blue-border">
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
