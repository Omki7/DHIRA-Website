/*
 * [00] Delivery Hero — Platform & Custom Engineering for Data and AI Products
 * Clean, bold, and focused hero with Ashoka Chakra background motif and perfect alignment.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const metrics = [
  { label: "Flexible Engagement", val: "5 Delivery Paths" },
  { label: "Full Code Transfer", val: "100% IP Ownership" },
  { label: "Enterprise Guarantees", val: "99.99% Production SLA" },
];

export default function DeliveryHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      {/* Subtle ambient light wash */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-blue/10 via-blue/[0.02] to-transparent blur-3xl"
        aria-hidden
      />
      <div className="dot-grid absolute inset-0 opacity-30" aria-hidden />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white"
        aria-hidden
      />

      <ScrollRevealRail>
        <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-16 text-center lg:pt-28 lg:pb-20">
          
          {/* Top Pill Badge */}
          <ScrollReveal>
            <figure className="mb-4 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              <span className="font-semibold text-ink font-mono text-[11px] uppercase tracking-eyebrow">
                Delivery &amp; Services
              </span>
              <span className="h-3 w-px bg-default-stroke" aria-hidden />
              <span className="font-medium text-secondary-text text-xs">How Dhira Ships</span>
            </figure>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal delay={100}>
            <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              Platform &amp; Custom Engineering{" "}
              <span className="relative inline-block text-blue">
                for Data and AI Products.
                <span
                  className="absolute -bottom-[0.04em] left-0 h-[0.08em] w-full rounded-full bg-blue/30"
                  aria-hidden
                />
              </span>
            </h1>
          </ScrollReveal>

          {/* Subheadline Paragraph */}
          <ScrollReveal delay={180}>
            <p className="mt-5 max-w-2xl text-base text-secondary-text leading-relaxed sm:text-lg">
              Choose a ready platform, build custom AI and data systems, or add senior engineers to your team.
            </p>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link href="#engagement-models" className="btn-primary rounded-full px-6 py-2.5 text-xs">
                Explore ways to work &darr;
              </Link>
              <Link href="#talk-to-our-team" className="btn-secondary rounded-full px-6 py-2.5 text-xs">
                Talk to our team
              </Link>
            </div>
          </ScrollReveal>

          {/* Enterprise Metrics Bar */}
          <ScrollReveal delay={300}>
            <div className="mt-10 inline-grid grid-cols-3 divide-x divide-subtle-stroke rounded-2xl border border-subtle-stroke bg-primary-bg/90 p-2.5 shadow-sm backdrop-blur-sm">
              {metrics.map((m) => (
                <div key={m.label} className="px-5 py-1.5 text-center sm:px-8">
                  <p className="font-mono text-[14px] font-bold text-ink sm:text-[16px]">{m.val}</p>
                  <p className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft mt-0.5 sm:text-[9.5px]">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}



