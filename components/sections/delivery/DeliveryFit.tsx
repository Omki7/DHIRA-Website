/*
 * [07] Partnership Fit: And Who It Isn't.
 * Mirror-symmetry split expressing the "/ both directions" tag: right-fit rows
 * lean into the partnership, wrong-fit rows lean away, divided by one clear axis.
 * Directional markers only: no checkmarks (Rule 2).
 */

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
    <section id="partnership-fit" className="scroll-mt-24 border-t border-lineSoft bg-white">
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

        <ScrollReveal delay={120}>
          <div className="relative mt-12 grid grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke md:grid-cols-2 lg:mt-14">
            <div className="relative p-6 md:p-8 md:pr-12">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  <span className="h-2 w-2 rounded-full bg-blue" aria-hidden />
                  A fit
                </p>
                <span className="inline-flex items-center gap-1 rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[9px] font-bold tracking-[0.06em] text-blue">
                  PROCEED <Arrow dir="right" className="h-3 w-3" />
                </span>
              </div>
              <ul className="mt-6">
                {rightFit.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3.5 border-t border-dashed border-lineSoft py-4 transition-colors duration-200 ease-settle first:border-t-0 hover:bg-blue-subtle/40"
                  >
                    <span className="mt-[3px] shrink-0 text-blue transition-transform duration-200 ease-settle group-hover:translate-x-1">
                      <Arrow dir="right" />
                    </span>
                    <span className="text-[16px] font-medium leading-relaxed text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-subtle-stroke pt-4 font-mono text-[9.5px] uppercase tracking-eyebrow text-blue">
                Then we should talk
              </p>
            </div>

            <div className="relative border-t border-dashed border-line bg-primary-bg p-6 md:border-l md:border-t-0 md:p-8 md:pl-12">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-[7px] border border-default-stroke bg-tertiary-bg px-2 py-1 font-mono text-[9px] font-bold tracking-[0.06em] text-secondary-text">
                  <Arrow dir="left" className="h-3 w-3" /> PASS
                </span>
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                  Not a fit
                  <span className="h-2 w-2 rounded-full border border-line" aria-hidden />
                </p>
              </div>
              <ul className="mt-6">
                {wrongFit.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3.5 border-t border-dashed border-lineSoft py-4 first:border-t-0 md:flex-row-reverse md:text-right"
                  >
                    <span className="mt-[3px] shrink-0 text-overcast transition-transform duration-200 ease-settle group-hover:-translate-x-1">
                      <Arrow dir="left" />
                    </span>
                    <span className="text-[16px] leading-relaxed text-inkSoft">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-subtle-stroke pt-4 text-right font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                Then we&rsquo;re not your team
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
