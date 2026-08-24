/*
 * [00] Delivery Hero — Delivered on your terms. One standard.
 * Focused hero with explicit value proposition and compact metrics bar.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const metrics = [
  { label: "Engagement paths", val: "5 Models" },
  { label: "Engineering standard", val: "1 Standard" },
  { label: "Delivery ownership", val: "100% Sovereign" },
];

export default function DeliveryHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white"
        aria-hidden
      />

      <ScrollRevealRail>
        <div className="flex min-h-[50vh] flex-col items-center justify-center pt-24 pb-16 text-center lg:pt-32 lg:pb-20">
          <ScrollReveal>
            <figure className="mb-6 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              <span className="font-semibold text-primary-text">Delivery</span>
              <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
              <span className="font-medium text-secondary-text">How DHIRA ships</span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Platform adoption <span className="text-overcast">&middot;</span> Custom engineering{" "}
              <span className="text-overcast">&middot;</span> Dedicated capacity
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
            <p className="mt-6 max-w-[36em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Whether you need a ready-to-use platform, a custom technology solution, a product engineering partner, or additional engineering capacity, Dhira gives you the flexibility to choose how you work with us: with one standard of delivery and accountability.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="#engagement-models" className="btn-primary">
                Explore ways to work &darr;
              </Link>
              <Link href="#talk-to-our-team" className="btn-secondary">
                Talk to our team
              </Link>
            </div>
          </ScrollReveal>

          {/* Enterprise Metrics Bar */}
          <ScrollReveal delay={360}>
            <div className="mt-12 inline-grid grid-cols-3 divide-x divide-subtle-stroke rounded-xl border border-subtle-stroke bg-primary-bg/90 p-2 shadow-sm backdrop-blur-sm">
              {metrics.map((m) => (
                <div key={m.label} className="px-4 py-1.5 text-left sm:px-6">
                  <p className="font-mono text-[13px] font-bold text-ink sm:text-[14.5px]">{m.val}</p>
                  <p className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft sm:text-[9.5px]">{m.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
