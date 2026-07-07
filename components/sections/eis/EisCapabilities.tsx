/*
 * [04] Key Capabilities — Everything a Leadership Team Needs.
 * Six capability cards on the shared AkashicCardChrome header, each closed by
 * a SIMULATED-UI micro-visual (§8a: canned tiles, bands, alerts, and trace
 * chains) so the grid reads as product, not brochure.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

function VisDashboard() {
  const tiles = [
    { label: "REVENUE", value: "98%", tone: "#1B7A47" },
    { label: "MARGIN", value: "18.2%", tone: "#C0883A" },
    { label: "OPS", value: "LIVE", tone: "#3E63DD" },
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {tiles.map((tile) => (
        <div key={tile.label} className="rounded-[8px] border border-[#EEEEF3] bg-[#FBFBFE] px-2 py-1.5">
          <div className="font-mono text-[7px] font-bold tracking-[0.07em] text-[#7C828C]">{tile.label}</div>
          <div className="text-[11px] font-bold" style={{ color: tile.tone }}>{tile.value}</div>
        </div>
      ))}
    </div>
  );
}

function VisForecast() {
  return (
    <div>
      <svg viewBox="0 0 220 40" fill="none" aria-hidden className="h-10 w-full">
        <polygon
          points="0,26 40,22 80,24 120,16 160,20 220,10 220,26 160,32 120,30 80,34 40,32 0,34"
          fill="#3E63DD"
          opacity="0.08"
        />
        <polyline points="0,30 40,27 80,29 120,23 160,26" stroke="#3E63DD" strokeWidth="1.5" strokeLinecap="round" fill="none" className="fl-sparkline" />
        <polyline points="160,26 190,21 220,17" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.7" />
        <circle cx="160" cy="26" r="2.5" fill="#3E63DD" />
      </svg>
      <div className="mt-1 flex justify-between font-mono text-[7.5px] uppercase tracking-[0.08em] text-overcast">
        <span>Actual</span>
        <span>Forecast &middot; 90-day band</span>
      </div>
    </div>
  );
}

function VisAlert() {
  return (
    <div className="flex items-center gap-2 rounded-[8px] border border-[#EEDFC4] bg-[#FDF9F1] px-2.5 py-2">
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
      <span className="min-w-0 flex-1 truncate font-mono text-[9px] font-bold text-ink">
        COLLECTIONS SLOWDOWN &middot; UNIT 3
      </span>
      <span className="shrink-0 rounded-[5px] border border-[#E3D5BC] bg-white px-1.5 py-[2px] font-mono text-[7.5px] font-bold text-[#8A6A33]">
        &minus;2.1&sigma;
      </span>
    </div>
  );
}

function VisAsk() {
  return (
    <div className="rounded-[8px] border border-blue-border bg-blue-subtle/60 px-2.5 py-2">
      <span className="text-[11px] leading-relaxed text-ink">
        &ldquo;Why did margin dip in APAC?&rdquo;
        <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1.1s_step-end_infinite]">|</span>
      </span>
    </div>
  );
}

function VisRoles() {
  const roles = [
    { name: "CEO", width: "100%" },
    { name: "CFO", width: "62%" },
    { name: "REGIONAL", width: "34%" },
  ];
  return (
    <div className="space-y-1.5">
      {roles.map((role) => (
        <div key={role.name} className="flex items-center gap-2">
          <span className="w-14 shrink-0 font-mono text-[7.5px] font-bold tracking-[0.07em] text-overcast">
            {role.name}
          </span>
          <span className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-tertiary-bg">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#5B7BE8] to-blue"
              style={{ width: role.width }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function VisAudit() {
  const hops = ["18.2%", "ledger_q1", "SAP · row 4,112"];
  return (
    <div className="flex flex-wrap items-center gap-y-1.5">
      {hops.map((hop, idx) => (
        <span key={hop} className="flex items-center">
          <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
            {hop}
          </span>
          {idx < hops.length - 1 && (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className="mx-0.5 shrink-0">
              <path d="M1 4h10M8.5 1.5L11 4 8.5 6.5" stroke="#3E63DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

const capabilities = [
  {
    icon: "Akashic EIS",
    name: "Live executive dashboard",
    sub: "Finance, ops, sales, HR",
    desc: "Real-time KPIs across the business on one screen. No refresh button. No waiting. Colour-coded by threshold: green, amber, red.",
    visual: <VisDashboard />,
  },
  {
    icon: "Akashic Machine Learning",
    name: "Predictive forecasting",
    sub: "90-day rolling models",
    desc: "Revenue forecasting with scenario planning and confidence bands. Know next quarter before your competitors know last quarter.",
    visual: <VisForecast />,
  },
  {
    icon: "Akashic Workflow",
    name: "Anomaly alerts",
    sub: "Watching 24/7",
    desc: "The moment a metric deviates from normal: margin drop, collections slowdown, stock-out risk, you get an alert. Not your team. You.",
    visual: <VisAlert />,
  },
  {
    icon: "Akashic Insights",
    name: "Ask Akashic",
    sub: "Conversational AI",
    desc: "Type your question in plain English. Get your answer as a chart, a table, or a summary, in seconds. No analyst needed for the first cut.",
    visual: <VisAsk />,
  },
  {
    icon: "Access Control",
    name: "Role-based views",
    sub: "Governed by design",
    desc: "The CEO sees the full picture. The CFO sees finance in depth. The regional head sees their geography. Every stakeholder gets exactly what they need.",
    visual: <VisRoles />,
  },
  {
    icon: "Audit Trails",
    name: "Audit trail and governance",
    sub: "Every number traceable",
    desc: "Every change is logged. Every dashboard has a source. Your board can ask “where did this come from?” and the answer is one click away.",
    visual: <VisAudit />,
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
                <div className="mt-4 border-t border-dashed border-lineSoft px-4 pb-4 pt-3.5">
                  {cap.visual}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
