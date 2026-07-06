/*
 * [04] Key Capabilities — Everything a Leadership Team Needs.
 * Six capability cards on the shared AkashicCardChrome header, each with a
 * one-line telemetry footer chip so the grid reads as product, not brochure.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

const capabilities = [
  {
    icon: "Akashic EIS",
    name: "Live executive dashboard",
    sub: "Finance, ops, sales, HR",
    desc: "Real-time KPIs across the business on one screen. No refresh button. No waiting. Colour-coded by threshold: green, amber, red.",
    foot: "One screen · always current",
  },
  {
    icon: "Akashic Machine Learning",
    name: "Predictive forecasting",
    sub: "90-day rolling models",
    desc: "Revenue forecasting with scenario planning and confidence bands. Know next quarter before your competitors know last quarter.",
    foot: "Confidence bands included",
  },
  {
    icon: "Akashic Workflow",
    name: "Anomaly alerts",
    sub: "Watching 24/7",
    desc: "The moment a metric deviates from normal: margin drop, collections slowdown, stock-out risk, you get an alert. Not your team. You.",
    foot: "Alerts go to the top",
  },
  {
    icon: "Akashic Insights",
    name: "Ask Akashic",
    sub: "Conversational AI",
    desc: "Type your question in plain English. Get your answer as a chart, a table, or a summary, in seconds. No analyst needed for the first cut.",
    foot: "No SQL needed",
  },
  {
    icon: "Access Control",
    name: "Role-based views",
    sub: "Governed by design",
    desc: "The CEO sees the full picture. The CFO sees finance in depth. The regional head sees their geography. Every stakeholder gets exactly what they need.",
    foot: "Secured · governed · current",
  },
  {
    icon: "Audit Trails",
    name: "Audit trail and governance",
    sub: "Every number traceable",
    desc: "Every change is logged. Every dashboard has a source. Your board can ask “where did this come from?” and the answer is one click away.",
    foot: "Answer in one click",
  },
];

export default function EisCapabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Key capabilities</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Six modules, one board</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Everything a leadership team needs. Nothing they don&rsquo;t.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3">
          {capabilities.map((cap, idx) => (
            <ScrollReveal key={cap.name} delay={100 + (idx % 3) * 90}>
              <div className={`${CARD} h-full`}>
                <CardHeader
                  icon={cap.icon}
                  name={cap.name}
                  sub={cap.sub}
                  chip={
                    <span className="font-mono text-[10px] text-overcast">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  }
                />
                <p className="flex-1 px-4 pt-3 text-[13.5px] leading-relaxed text-inkSoft">
                  {cap.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 border-t border-dashed border-lineSoft px-4 py-3">
                  <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
                  <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">
                    {cap.foot}
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
