/*
 * [00] Delivery Hero — Delivered on Your Terms.
 * Centred hero on the dot-grid backdrop, mirroring AkashicHero's structure:
 * pill, mono eyebrow, tight H1, CTAs, closed by the DeliveryDiscoveryMockup
 * console (the delivery cousin of AkashicHero's sources-to-answer band).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DeliveryDiscoveryMockup from "@/components/demos/mockups/DeliveryDiscoveryMockup";

export default function DeliveryHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="flex min-h-[56vh] flex-col items-center justify-center pt-24 pb-20 text-center lg:pt-32 lg:pb-24">
          <ScrollReveal>
            <figure className="mb-8 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
              <span className="font-semibold text-primary-text">Delivery</span>
              <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
              <span className="font-medium text-primary-text">How DHIRA ships</span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Platform delivery <span className="text-overcast">&middot;</span> Product engineering{" "}
              <span className="text-overcast">&middot;</span> Advisory &amp; co-engineering
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h1 className="mt-6 max-w-[13em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              Delivered on your terms.{" "}
              <span className="relative inline-block whitespace-nowrap">
                One standard.
                <span
                  className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                  aria-hidden
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[38em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Not every problem needs a new platform. Not every platform needs a
              product built on top of it. We deploy our flagship platform, engineer
              custom software, or provide the strategic bandwidth to scale your own
              team. Three models. One standard of accountability.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="#engagement-models" className="btn-secondary">
                See the three models
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={340}>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              What to expect from the first call
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400} className="w-full">
            <div className="mt-4 flex justify-center px-2">
              <DeliveryDiscoveryMockup />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
