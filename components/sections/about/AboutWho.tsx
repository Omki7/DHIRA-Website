/*
 * [02] Who We Are — Shipped at Scale.
 * A contexts ledger (the three environments the copy names) beside the
 * narrative, closed by the advise-and-leave versus build-and-stay contrast
 * strip: the old model dimmed, our model highlighted.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const contexts = [
  {
    icon: "Public Sector",
    name: "Government ministries",
    note: "Billions of transactions, national reach",
  },
  {
    icon: "Enterprise",
    name: "Regulated enterprises",
    note: "Where downtime is not an option",
  },
  {
    icon: "Custom Accelerators",
    name: "High-growth startups",
    note: "Scaling faster than their infrastructure",
  },
];

export default function AboutWho() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Who we are</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Builders, not advisers</span>
          </div>
          <h2 className="mt-5 max-w-[16em] text-heading-sm font-semibold text-ink md:text-heading-md">
            Engineers who have shipped at scale.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            We have built systems that process billions of transactions, serve
            millions of users, and operate where downtime is not an option. We
            bring that experience to every engagement.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          <ScrollReveal delay={100}>
            <p className="border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              Where that experience comes from
            </p>
          </ScrollReveal>
          {contexts.map((context, idx) => (
            <ScrollReveal key={context.name} delay={140 + idx * 90}>
              <div className="flex items-center gap-4 border-b border-subtle-stroke py-5 transition-colors duration-250 ease-settle hover:bg-primary-bg/50 md:gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-overcast">
                  0{idx + 1}
                </span>
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <DynamicSketchIcon text={context.icon} className="h-[16px] w-[16px] text-blue" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[18px] font-semibold tracking-tight text-ink md:text-[20px]">
                    {context.name}
                  </span>
                  <span className="block text-[13px] text-inkSoft">{context.note}</span>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke md:grid-cols-[1fr_auto_1fr] lg:mt-14">
            <div className="bg-primary-bg p-6 opacity-60 md:p-7">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                <span className="h-2 w-2 rounded-[2px] border border-line" aria-hidden />
                The usual model
              </p>
              <p className="mt-3 text-[17px] font-medium leading-snug tracking-tight text-inkSoft">
                Consultants who advise and leave.
              </p>
            </div>
            <div className="hidden items-center justify-center border-x border-dashed border-line px-4 md:flex" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13M13 7l5 5-5 5" stroke="#3E63DD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="border-t border-dashed border-line bg-white p-6 md:border-t-0 md:p-7">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                <span className="h-2 w-2 rounded-[2px] bg-blue" aria-hidden />
                How we engage
              </p>
              <p className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-ink">
                Partners who build and stay accountable.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
