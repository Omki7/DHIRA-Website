/*
 * [06] Open Foundations — No Black Box.
 * The manifest card is SIMULATED PRODUCT UI (AGENTS.md §8a).
 * TODO: confirm the final technology list with engineering before ship —
 * flagged as "representative" in the content script.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const stack = [
  { label: "orchestration & streaming", items: ["Apache Airflow", "Kafka", "Change data capture"] },
  { label: "bi & analytics", items: ["Apache Superset"] },
  { label: "ml & ai", items: ["MLflow", "JupyterHub", "LLM integrations"] },
  { label: "infrastructure", items: ["Kubernetes", "Docker"] },
  { label: "runs on", items: ["AWS", "Azure", "GCP", "Your own racks"] },
];

export default function AkashicOpenFoundations() {
  return (
    <section id="open" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow">
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Open foundations</span>
            </p>
            <h2 className="mt-5 max-w-[13em] text-heading-sm font-semibold text-ink md:text-heading-md">
              Built in the open. Yours to inspect.
            </h2>
            <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
              Akashic isn&rsquo;t a proprietary black box. It&rsquo;s engineered on
              technologies your team already knows and trusts: transparency now,
              extensibility later, and no lock-in ever.
            </p>
            <p className="mt-8 max-w-[24em] text-xl font-semibold tracking-tight text-ink">
              Your team can see how it works. Your auditors can too.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-frame">
              <div className="flex items-center gap-2 border-b border-subtle-stroke bg-primary-bg px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                </span>
                <span className="font-mono text-[10.5px] text-inkSoft">akashic.stack</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.07em] text-overcast">open to inspection</span>
              </div>
              <div className="divide-y divide-subtle-stroke">
                {stack.map((group) => (
                  <div key={group.label} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <span className="w-[168px] shrink-0 font-mono text-[10px] uppercase tracking-[0.07em] text-overcast">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-[7px] border border-[#EEEEF3] bg-[#FBFBFE] px-2 py-1 text-[11px] font-medium text-ink">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-subtle-stroke bg-primary-bg px-4 py-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" />
                <span className="text-[11px] font-semibold text-blue">Swap any layer. Nothing locks you in.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
