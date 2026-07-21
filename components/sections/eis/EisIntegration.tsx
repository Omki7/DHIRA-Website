/*
 * [05] The Integration Story — Your ERP Stays.
 * Narrative plus a connector rack: source chips flowing into an intelligence
 * layer bar, and three guarantee tiles (connectors / read-only / deploy
 * anywhere) with sketch icons. Sits on the page's one soft blue band
 * (site-wide consistency pass, 17 Jul) — EIS had zero background variation
 * across all nine sections.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const connectors = ["Oracle", "SAP", "Salesforce", "Snowflake", "SQL", "Flat files", "APIs"];

const guarantees = [
  {
    icon: "Akashic Data Pipelines",
    title: "23+ source connectors",
    desc: "SAP, Salesforce, Oracle, Snowflake, SQL, flat files, and more.",
  },
  {
    icon: "Access Control",
    title: "Read-only access",
    desc: "Your data never moves. No migration. No disruption. No downtime.",
  },
  {
    icon: "Hybrid Deployment",
    title: "Cloud · On-premises · Hybrid",
    desc: "Deploy where your architecture already lives.",
  },
];

export default function EisIntegration() {
  return (
    <section
      id="integration"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The integration story</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ No rip and replace</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Your ERP is not going anywhere. Neither are we.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
            Akashic EIS does not replace your systems. It sits on top of them, like
            an intelligence layer that reads everything, connects the dots, and
            surfaces what matters. In read-only mode. No disruption. No migration.
            No downtime.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {connectors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-subtle-stroke bg-white px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-inkSoft shadow-card"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C]" aria-hidden />
                    {c}
                  </span>
                ))}
              </div>
              <div className="mx-auto mt-4 flex max-w-[260px] justify-center" aria-hidden>
                <svg viewBox="0 0 260 30" fill="none" className="h-7 w-full">
                  {[20, 85, 130, 175, 240].map((x) => (
                    <path key={x} d={`M ${x} 0 C ${x} 16, 130 14, 130 30`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
                  ))}
                  <path d="M 20 0 C 20 16, 130 14, 130 30" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="10 44" fill="none" opacity="0.85">
                    <animate attributeName="stroke-dashoffset" values="54;0" dur="2.4s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
              <div className="mx-auto mt-1 flex max-w-[420px] items-center justify-center gap-2 rounded-[10px] border border-blue-border bg-white px-4 py-2.5 shadow-card">
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                <span className="text-[12.5px] font-semibold text-ink">The Akashic intelligence layer</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-overcast">read-only</span>
              </div>
            </div>
            <div className="grid grid-cols-1 border-t border-dashed border-lineSoft md:grid-cols-3">
              {guarantees.map((g, idx) => (
                <div
                  key={g.title}
                  className={`flex items-start gap-3.5 p-6 ${idx > 0 ? "border-t border-dashed border-lineSoft md:border-l md:border-t-0" : ""}`}
                >
                  <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <DynamicSketchIcon text={g.icon} className="h-[15px] w-[15px] text-blue" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold tracking-tight text-ink">{g.title}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-inkSoft">{g.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
