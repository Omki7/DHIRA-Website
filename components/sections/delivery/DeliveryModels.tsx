/*
 * [01] Engagement Models — Start With the Problem.
 * Three plain rows, one reading order (simplified per design direction,
 * Jul 2026): the thing you'd say on a call → routes to → the model that
 * answers it. Each row is one link to its model section. No card chrome.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

function RouteArrow() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none" aria-hidden className="shrink-0" style={{ overflow: "visible" }}>
      <path d="M 0 12 H 64" stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      <path d="M 0 12 H 64" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="12 60" fill="none" opacity="0.8">
        <animate attributeName="stroke-dashoffset" values="72;0" dur="2.2s" repeatCount="indefinite" />
      </path>
      <circle cx="0" cy="12" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx="0" cy="12" r="1.8" fill="#3E63DD" />
      <path d="M 64 8 L 70 12 L 64 16" stroke="#3E63DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    </svg>
  );
}

const routes = [
  {
    num: "01",
    quote: "Our data is fragmented and nobody trusts the final numbers.",
    model: "Akashic Deployment",
    line: "We bring the platform to you. Live in six weeks.",
    href: "#akashic-deployment",
  },
  {
    num: "02",
    quote: "We need to ship a custom product, and a team to build it.",
    model: "Product Engineering",
    line: "We build it, on Akashic or on your stack.",
    href: "#product-engineering",
  },
  {
    num: "03",
    quote: "We need senior engineering bandwidth to move faster.",
    model: "Advisory & Co-Engineering",
    line: "Strategic audits, or our squad inside your sprints.",
    href: "#advisory-co-engineering",
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
            <div className="hidden border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:grid lg:grid-cols-[1.1fr_104px_1fr] lg:gap-8">
              <span>The thing you&rsquo;d say on a call</span>
              <span className="text-center">Routes to</span>
              <span>The model that answers it</span>
            </div>
          </ScrollReveal>

          {routes.map((route, idx) => (
            <ScrollReveal key={route.num} delay={100 + idx * 100}>
              <Link
                href={route.href}
                className="group grid grid-cols-1 items-center gap-4 border-b border-subtle-stroke py-8 transition-colors duration-250 ease-settle hover:bg-primary-bg/60 lg:grid-cols-[1.1fr_104px_1fr] lg:gap-8 lg:py-10"
              >
                <p className="max-w-[24em] text-[20px] font-medium leading-snug tracking-tight text-ink md:text-[23px]">
                  &ldquo;{route.quote}&rdquo;
                </p>

                <span className="hidden justify-center lg:flex">
                  <RouteArrow />
                </span>

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    Model {route.num}
                  </p>
                  <h3 className="mt-1.5 text-[22px] font-semibold leading-snug tracking-tight text-ink md:text-[24px]">
                    {route.model}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-inkSoft">{route.line}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-blue transition-transform duration-250 ease-settle group-hover:translate-y-0.5">
                    View model &darr;
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
