/*
 * [07] Partnership Fit: And Who It Isn't.
 * Editorial verdict split (Jul 2026 redesign): two indexed statement ledgers
 * on one dashed axis, large reading sizes, each side closing on its verdict
 * line. Directional markers only: no checkmarks (Rule 2). Sits on the page's
 * one soft blue band (site-wide consistency pass, 17 Jul) — Delivery had
 * zero background variation across all ten sections.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const rightFit = [
  "You are an enterprise with a data problem actively hindering decisions.",
  "You value governance, traceability, and architecture over speed at any cost.",
  "You can commit to a minimum 4-week engagement.",
];

const wrongFit = [
  "You need a dashboard hacked together in 48 hours.",
  "You are shopping for the cheapest hourly rate.",
  "You want a vendor who takes orders without asking why.",
];

function Arrow({ dir, className = "" }: { dir: "right" | "left"; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d={dir === "right" ? "M2.5 8h9M8 4l4 4-4 4" : "M13.5 8h-9M8 4l-4 4 4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DeliveryFit() {
  return (
    <section
      id="partnership-fit"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]"
    >
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[07]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Partnership fit</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Both directions</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Who this is for. (And who it isn&rsquo;t.)
          </h2>
        </ScrollReveal>

        <div className="relative mt-12 lg:mt-16">
          <span
            className="absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#e4e7ec_0_8px,transparent_8px_16px)] lg:block"
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-0">
            <ScrollReveal delay={100}>
              <div className="flex h-full flex-col lg:pr-16">
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
                  <h3 className="text-[21px] font-semibold tracking-tight text-ink md:text-[23px]">
                    This is for you if
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-blue">
                    Proceed <Arrow dir="right" className="h-3.5 w-3.5" />
                  </span>
                </div>
                <ul className="flex-1">
                  {rightFit.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-start gap-5 border-b border-dashed border-lineSoft py-6"
                    >
                      <span className="pt-[4px] font-mono text-[11px] font-semibold text-blue">
                        0{idx + 1}
                      </span>
                      <span className="text-[16px] font-medium leading-relaxed text-ink md:text-[17px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-[18px] font-semibold tracking-tight text-ink md:text-[20px]">
                    Then we should talk.
                  </p>
                  <Link
                    href="#talk-to-our-team"
                    className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue transition-colors duration-200 ease-settle hover:text-blue-hover"
                  >
                    Talk to our team &darr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="flex h-full flex-col lg:pl-16">
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-line pb-4">
                  <h3 className="text-[21px] font-semibold tracking-tight text-overcast md:text-[23px]">
                    It isn&rsquo;t if
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-overcast">
                    <Arrow dir="left" className="h-3.5 w-3.5" /> Pass
                  </span>
                </div>
                <ul className="flex-1">
                  {wrongFit.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-start gap-5 border-b border-dashed border-lineSoft py-6"
                    >
                      <span className="pt-[4px] font-mono text-[11px] text-overcast">
                        0{idx + 1}
                      </span>
                      <span className="text-[16px] leading-relaxed text-inkSoft md:text-[17px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-[18px] font-semibold tracking-tight text-overcast md:text-[20px]">
                  Then we&rsquo;re not your team.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
