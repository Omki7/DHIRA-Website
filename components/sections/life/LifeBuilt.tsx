/*
 * [05] How It's Built — Edge AI on the National Backbone.
 * Three build-layer cards on the shared AkashicCardChrome header: on-device
 * scoring, Akashic MDM golden records, and the BI + governance layer.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

const layers = [
  {
    icon: "Akashic Machine Learning",
    name: "On-device scoring",
    sub: "Edge ML",
    desc: "Lightweight ML models, tuned to run on basic Android devices used by frontline health workers, score risk locally. No data leaves the phone until there is signal.",
    foot: "Runs on basic Android",
  },
  {
    icon: "Akashic Master Data",
    name: "Akashic MDM",
    sub: "One golden record",
    desc: "Every mother, every village, every clinical record is unified into a single Golden Record: the same patient is recognised correctly whether she's seen by an ASHA worker, a PHC, or a district hospital.",
    foot: "One record per patient",
  },
  {
    icon: "Akashic Data Governance",
    name: "Akashic BI + Governance",
    sub: "Audited by design",
    desc: "Aggregated, anonymised risk data flows into real-time dashboards for district and national health administrators, with full audit trails and RBAC: the same governance layer used in every Akashic deployment.",
    foot: "Full audit trails · RBAC",
  },
];

export default function LifeBuilt() {
  return (
    <section id="how-its-built" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How Akashic Life is built</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Edge to ministry</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Edge AI, backed by the platform that runs India&rsquo;s health data.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {layers.map((layer, idx) => (
            <ScrollReveal key={layer.name} delay={100 + idx * 90}>
              <div className={`${CARD} h-full`}>
                <CardHeader
                  icon={layer.icon}
                  name={layer.name}
                  sub={layer.sub}
                  chip={
                    <span className="font-mono text-[10px] text-overcast">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  }
                />
                <p className="flex-1 px-4 pt-3 text-[13.5px] leading-relaxed text-inkSoft">
                  {layer.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 border-t border-dashed border-lineSoft px-4 py-3">
                  <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
                  <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">
                    {layer.foot}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
