/*
 * [02] The Moment — One Click, the Business Speaks.
 * The Monday-morning narrative beside a sources-to-screen fan (decorative
 * SVG), then three peer moments as field dossiers, each closed by a
 * "WHAT AKASHIC DID" telemetry strip. Micro-visual data is canned (§8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const sources = [
  { name: "SAP", dot: "#0FAAFF" },
  { name: "Salesforce", dot: "#00A1E0" },
  { name: "Oracle", dot: "#C74634" },
  { name: "ERP", dot: "#3E63DD" },
  { name: "Flat files", dot: "#8E8F91" },
];

const moments = [
  {
    tag: "Manufacturing conglomerate",
    icon: "Enterprise",
    story:
      "A CEO with 6 business units opens the EIS board at 9 AM. Factory throughput, inventory ageing, sales pipeline, and distributor collections: all on one screen. She spots that Unit 3’s distributor payments are 18 days overdue, and flags it before the weekly review even starts.",
    did: "Pulled data from 6 ERP instances, unified it, and surfaced the anomaly automatically.",
  },
  {
    tag: "NBFC / financial services",
    icon: "Akashic EIS",
    story:
      "A CFO runs a ₹4,000 crore loan book across 14 branches. Every morning, EIS surfaces the top 5 accounts showing early stress signals, before they become NPA. The credit risk team acts. The CFO doesn’t find out at month-end. She acts at week-start.",
    did: "Ran predictive ML scoring on repayment patterns and surfaced alerts by 8 AM.",
  },
  {
    tag: "Healthcare / hospital network",
    icon: "Healthcare",
    story:
      "A hospital group CEO oversees 8 facilities. EIS shows bed occupancy, OT utilisation, revenue per bed, and discharge rates: all live, all by location. When one facility drops below 65% occupancy on a Tuesday, the ops team rebalances staffing the same day.",
    did: "Connected facility-level HMS data, ran occupancy forecasting, and sent an automated alert.",
  },
];

function SourceFan() {
  return (
    <svg viewBox="0 0 96 150" fill="none" aria-hidden className="hidden h-[150px] w-24 shrink-0 sm:block">
      {[15, 45, 75, 105, 135].map((y) => (
        <path key={y} d={`M 0 ${y} C 48 ${y}, 48 75, 96 75`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      ))}
      <path d="M 0 45 C 48 45, 48 75, 96 75" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="12 130" fill="none" opacity="0.8">
        <animate attributeName="stroke-dashoffset" values="142;0" dur="2.6s" repeatCount="indefinite" />
      </path>
      <circle cx="96" cy="75" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx="96" cy="75" r="1.8" fill="#3E63DD" />
    </svg>
  );
}

export default function EisMoments() {
  return (
    <section id="the-moment" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;What EIS actually does</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The Monday morning test</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One click. Your whole business speaks.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ScrollReveal delay={100}>
            <p className="max-w-[38em] text-lg leading-relaxed text-secondary-text">
              Imagine a CEO walking into a Monday morning review. Instead of waiting
              for four department heads to share four different spreadsheets, she
              opens one screen. Revenue by region is live. Inventory position is
              flagged automatically. The APAC margin dip from last week has already
              been traced to a logistics delay. An alternate vendor has been
              suggested. The team is already acting.
            </p>
            <p className="mt-6 text-[22px] font-semibold tracking-tight text-ink md:text-[26px]">
              That is Akashic EIS. Not a report.{" "}
              <span className="relative inline-block whitespace-nowrap">
                A command centre.
                <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
              </span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col gap-1.5">
                {sources.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-subtle-stroke bg-white px-2.5 py-1 text-[10.5px] font-medium text-ink shadow-card"
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: s.dot }} />
                    {s.name}
                  </span>
                ))}
              </div>
              <SourceFan />
              <div className="rounded-[12px] border border-subtle-stroke bg-white px-4 py-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" />
                  <span className="text-[12px] font-semibold text-ink">One live board</span>
                </div>
                <div className="mt-1 max-w-[13em] text-[11px] text-inkSoft">
                  Finance, ops, sales, strategy. Converging in real time.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mt-16 border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-20">
            What your peers are seeing in real time
          </p>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {moments.map((moment, idx) => (
            <ScrollReveal key={moment.tag} delay={160 + idx * 100}>
              <div className="flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg transition-all duration-250 ease-settle hover:-translate-y-1 hover:border-blue/25 hover:shadow-frame">
                <div className="h-[3px] bg-gradient-to-r from-blue/55 via-blue/25 to-transparent" aria-hidden />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <DynamicSketchIcon text={moment.icon} className="h-[15px] w-[15px] text-blue" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                      {moment.tag}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink">{moment.story}</p>
                  <div className="mt-5 border-t border-dashed border-lineSoft pt-4">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                      What Akashic did
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-inkSoft">{moment.did}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
