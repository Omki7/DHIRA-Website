/*
 * [07] Partnership Fit — And Who It Isn't.
 * One split panel, dashed centre divider: right-fit statements marked with
 * filled blue squares, wrong-fit with hollow ones. No checkmarks (Rule 2).
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
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke md:grid-cols-2 lg:mt-14">
            <div className="relative overflow-hidden p-6 md:p-8">
              <span
                className="pointer-events-none absolute -bottom-6 right-4 select-none text-[110px] font-semibold leading-none tracking-tighter text-blue/[0.05]"
                aria-hidden
              >
                Yes
              </span>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  <span className="h-2 w-2 rounded-[2px] bg-blue" aria-hidden />
                  We are the right fit if
                </p>
                <span className="inline-flex items-center rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[9px] font-bold tracking-[0.03em] text-blue">
                  PROCEED
                </span>
              </div>
              <ul className="mt-6">
                {rightFit.map((item, idx) => (
                  <li
                    key={item}
                    className="flex gap-4 border-t border-dashed border-lineSoft py-4 transition-colors duration-200 ease-settle first:border-t-0 hover:bg-blue-subtle/40"
                  >
                    <span className="whitespace-nowrap pt-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                      R-0{idx + 1}
                    </span>
                    <span className="text-[16px] font-medium leading-relaxed text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden border-t border-dashed border-line bg-primary-bg p-6 md:border-l md:border-t-0 md:p-8">
              <span
                className="pointer-events-none absolute -bottom-6 right-4 select-none text-[110px] font-semibold leading-none tracking-tighter text-ink/[0.04]"
                aria-hidden
              >
                No
              </span>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                  <span className="h-2 w-2 rounded-[2px] border border-line" aria-hidden />
                  We are the wrong fit if
                </p>
                <span className="inline-flex items-center rounded-[7px] border border-default-stroke bg-tertiary-bg px-2 py-1 font-mono text-[9px] font-bold tracking-[0.03em] text-secondary-text">
                  PASS
                </span>
              </div>
              <ul className="mt-6">
                {wrongFit.map((item, idx) => (
                  <li
                    key={item}
                    className="flex gap-4 border-t border-dashed border-lineSoft py-4 first:border-t-0"
                  >
                    <span className="whitespace-nowrap pt-[5px] font-mono text-[10px] uppercase tracking-[0.08em] text-overcast">
                      W-0{idx + 1}
                    </span>
                    <span className="text-[16px] leading-relaxed text-inkSoft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
