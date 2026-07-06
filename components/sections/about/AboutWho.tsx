/*
 * [02] Who We Are — Shipped at Scale.
 * Sticky narrative on the left; on the right, three "environment" proof rows
 * in the ProblemSection idiom — giant scale watermark, growing blue rail,
 * sketch icon. Closed by the advise-and-leave vs build-and-stay contrast bar.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const contexts = [
  {
    watermark: "10⁹",
    icon: "Public Sector",
    name: "Government ministries",
    note: "Systems that process billions of transactions, at national reach.",
  },
  {
    watermark: "99.9",
    icon: "Enterprise",
    name: "Regulated enterprises",
    note: "Environments where downtime is not an option and audits are constant.",
  },
  {
    watermark: "10×",
    icon: "Custom Accelerators",
    name: "High-growth startups",
    note: "Teams that grew faster than the infrastructure underneath them.",
  },
];

export default function AboutWho() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[02]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;Who we are</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md lg:text-heading-lg">
                Engineers who have shipped at scale.
              </h2>
              <p className="mt-6 max-w-[30em] text-lg leading-relaxed text-inkSoft">
                We have built systems that process billions of transactions, serve
                millions of users, and operate where downtime is not an option.
              </p>
              <p className="mt-5 max-w-[30em] text-lg leading-relaxed text-inkSoft">
                We bring that experience to every engagement.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:pl-4">
            {contexts.map((context, idx) => (
              <ScrollReveal key={context.name} delay={120 + idx * 100}>
                <div className={`group relative pl-8 lg:pl-12 ${idx > 0 ? "mt-12 lg:mt-16" : ""}`}>
                  <span
                    className="absolute bottom-1 left-0 top-1 w-[2.5px] origin-top rounded-full bg-blue/70 transition-transform duration-700 ease-settle"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 select-none font-sans text-[5rem] font-semibold leading-none tracking-tighter text-blue/[0.05] sm:text-[6rem] lg:-left-6 lg:text-[7rem]"
                    aria-hidden
                  >
                    {context.watermark}
                  </span>
                  <div className="relative z-10">
                    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <DynamicSketchIcon text={context.icon} className="h-[16px] w-[16px] text-blue" />
                    </span>
                    <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-ink md:text-[26px]">
                      {context.name}
                    </h3>
                    <p className="mt-2 max-w-[32em] text-[15.5px] leading-relaxed text-inkSoft">
                      {context.note}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke md:grid-cols-[1fr_auto_1fr] lg:mt-16">
            <div className="bg-primary-bg p-6 opacity-60 md:p-8">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                <span className="h-2 w-2 rounded-[2px] border border-line" aria-hidden />
                The usual model
              </p>
              <p className="mt-3 text-[19px] font-medium leading-snug tracking-tight text-inkSoft md:text-[22px]">
                Consultants who advise and leave.
              </p>
            </div>
            <div className="hidden items-center justify-center border-x border-dashed border-line px-5 md:flex" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13M13 7l5 5-5 5" stroke="#3E63DD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="border-t border-dashed border-line bg-white p-6 md:border-t-0 md:p-8">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                <span className="h-2 w-2 rounded-[2px] bg-blue" aria-hidden />
                How we engage
              </p>
              <p className="mt-3 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[22px]">
                Partners who build and stay accountable.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
