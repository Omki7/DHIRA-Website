/*
 * [05] How It's Built — Edge AI on the National Backbone.
 * Three build-layer cards on the shared AkashicCardChrome header, each closed
 * by a SIMULATED-UI micro-visual (§8a: canned score, record merge, and
 * governance tags): on-device scoring, MDM golden records, BI + governance.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

function VisScore() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
        45+ PARAMETERS
      </span>
      <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
        OFFLINE
      </span>
      <span className="ml-auto flex items-center gap-1.5 rounded-[6px] border border-[#EEDFC4] bg-[#FDF9F1] px-2 py-[3px] font-mono text-[8.5px] font-bold text-[#8A6A33]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
        RISK 0.98
      </span>
    </div>
  );
}

function VisGolden() {
  const sources = ["ASHA", "PHC", "DISTRICT"];
  return (
    <div className="flex flex-wrap items-center gap-y-1.5">
      {sources.map((source, idx) => (
        <span key={source} className="flex items-center">
          <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
            {source}
          </span>
          {idx < sources.length - 1 && <span className="mx-1 font-mono text-[8.5px] text-overcast">&middot;</span>}
        </span>
      ))}
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden className="mx-1 shrink-0">
        <path d="M1 4h12M10.5 1.5L13 4l-2.5 2.5" stroke="#3E63DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="rounded-[6px] border-[1.5px] border-blue bg-blue-subtle px-2 py-[3px] font-mono text-[8.5px] font-bold text-blue">
        ONE GOLDEN RECORD
      </span>
    </div>
  );
}

function VisGoverned() {
  return (
    <div className="flex items-end justify-between gap-3">
      <svg viewBox="0 0 96 28" fill="none" aria-hidden className="h-7 w-24 shrink-0">
        {[
          { x: 2, h: 12 },
          { x: 18, h: 18 },
          { x: 34, h: 9 },
          { x: 50, h: 22 },
          { x: 66, h: 15 },
          { x: 82, h: 24 },
        ].map((bar) => (
          <rect key={bar.x} x={bar.x} y={28 - bar.h} width="10" height={bar.h} rx="2" fill="#3E63DD" opacity="0.55" />
        ))}
      </svg>
      <span className="flex flex-wrap justify-end gap-1.5">
        <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
          AUDIT TRAIL
        </span>
        <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
          RBAC
        </span>
      </span>
    </div>
  );
}

const layers = [
  {
    icon: "Akashic Machine Learning",
    name: "On-device scoring",
    sub: "Edge ML",
    desc: "Lightweight ML models, tuned to run on basic Android devices used by frontline health workers, score risk locally. No data leaves the phone until there is signal.",
    visual: <VisScore />,
  },
  {
    icon: "Akashic Master Data",
    name: "Akashic MDM",
    sub: "One golden record",
    desc: "Every mother, every village, every clinical record is unified into a single Golden Record: the same patient is recognised correctly whether she's seen by an ASHA worker, a PHC, or a district hospital.",
    visual: <VisGolden />,
  },
  {
    icon: "Akashic Data Governance",
    name: "Akashic BI + Governance",
    sub: "Audited by design",
    desc: "Aggregated, anonymised risk data flows into real-time dashboards for district and national health administrators, with full audit trails and RBAC: the same governance layer used in every Akashic deployment.",
    visual: <VisGoverned />,
  },
];

export default function LifeBuilt() {
  return (
    <section id="how-its-built" className="scroll-mt-24 border-t border-lineSoft bg-background">
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
            Edge AI, on the platform that runs India&rsquo;s health data.
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
                <div className="mt-4 border-t border-dashed border-lineSoft px-4 pb-4 pt-3.5">
                  {layer.visual}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
