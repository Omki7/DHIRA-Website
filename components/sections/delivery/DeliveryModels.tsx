/*
 * [01] Engagement Models — Start With the Problem.
 * A triage rail, not a card grid (Rule 1): three field-note reality cards
 * (ghost quote watermark + signal tags) route across an animated connector
 * into model cards built on the shared AkashicCardChrome. Hovering one
 * route dims the others (CSS group hover only — stays a server component).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

function RouteFlow() {
  return (
    <svg width="96" height="24" viewBox="0 0 96 24" fill="none" aria-hidden className="shrink-0" style={{ overflow: "visible" }}>
      <path d="M 0 12 H 88" stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      <path d="M 0 12 H 88" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="14 82" fill="none" opacity="0.8">
        <animate attributeName="stroke-dashoffset" values="96;0" dur="2.2s" repeatCount="indefinite" />
      </path>
      <circle cx="0" cy="12" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx="0" cy="12" r="1.8" fill="#3E63DD" />
      <path d="M 88 8 L 94 12 L 88 16" stroke="#3E63DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    </svg>
  );
}

const routes = [
  {
    num: "01",
    reality: "Our data is fragmented and nobody trusts the final numbers.",
    signals: ["Fragmented sources", "Low trust"],
    model: "Akashic Deployment",
    line: "Full platform or targeted module rollout.",
    meta: "Six weeks to live",
    href: "#akashic-deployment",
    icon: "Platform Deployment",
  },
  {
    num: "02",
    reality: "We need to ship a custom product, and we need a team to build it.",
    signals: ["Bespoke product", "Build team"],
    model: "Product Engineering",
    line: "Native builds on Akashic or your existing stack.",
    meta: "10–20 wks to MVP",
    href: "#product-engineering",
    icon: "Custom Accelerators",
  },
  {
    num: "03",
    reality: "We need elite engineering bandwidth to audit, design, or accelerate our roadmap.",
    signals: ["Audit", "Roadmap", "Bandwidth"],
    model: "Advisory & Co-Engineering",
    line: "Strategic audits or dedicated squads.",
    meta: "From 2 wks",
    href: "#advisory-co-engineering",
    icon: "AI Readiness Audit",
  },
];

export default function DeliveryModels() {
  return (
    <section id="engagement-models" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Engagement models</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Three doors, one blueprint</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Start with the problem, not the product.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            All engagements begin with a Sovereign Blueprint. You never pick the
            wrong door. We find the right starting point.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          <ScrollReveal>
            <div className="hidden border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:grid lg:grid-cols-[1fr_128px_1fr] lg:gap-6">
              <span>If your reality looks like this&hellip;</span>
              <span className="text-center">Routes to</span>
              <span>Your engagement model is&hellip;</span>
            </div>
          </ScrollReveal>

          <div className="group/routes">
            {routes.map((route, idx) => (
              <ScrollReveal key={route.num} delay={100 + idx * 100}>
                <div className="grid grid-cols-1 items-center gap-4 border-b border-subtle-stroke py-7 transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/routes:opacity-45 lg:grid-cols-[1fr_128px_1fr] lg:gap-6 lg:py-8">
                  <div className="relative h-full overflow-hidden rounded-card border border-subtle-stroke bg-primary-bg p-5">
                    <span
                      className="pointer-events-none absolute -top-5 right-2 select-none font-heading text-[110px] font-semibold leading-none text-ink/[0.045]"
                      aria-hidden
                    >
                      &rdquo;
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      Reality {route.num}
                    </p>
                    <p className="relative mt-2.5 max-w-[26em] text-[17px] font-medium leading-snug tracking-tight text-ink">
                      &ldquo;{route.reality}&rdquo;
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {route.signals.map((signal) => (
                        <span
                          key={signal}
                          className="inline-flex items-center gap-1.5 rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.06em] text-inkSoft"
                        >
                          <span className="h-[4px] w-[4px] rounded-full bg-blue/60" aria-hidden />
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden justify-center lg:flex">
                    <RouteFlow />
                  </div>

                  <Link href={route.href} className={`${CARD} group h-full`}>
                    <CardHeader
                      icon={route.icon}
                      name={route.model}
                      sub={route.line}
                      chip={<BlueChip label={`MODEL ${route.num}`} />}
                    />
                    <div className="mt-auto flex items-center justify-between px-4 py-3.5">
                      <span className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                        {route.meta}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-eyebrow text-blue transition-transform duration-250 ease-settle group-hover:translate-y-0.5">
                        View model &darr;
                      </span>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
