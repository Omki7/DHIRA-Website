/*
 * [02] Who We Are — Shipped at Scale.
 * Full-width header (one-line headline), then the three environments as
 * one bordered band in the site-wide StatBand chrome (§4a): blue gradient
 * top bar, dashed dividers, pulsing-dot eyebrows, icon tiles, ghost scale
 * watermarks (10⁹ / 99.9 / 10×), dashed footer caption. Closed by the
 * advise-and-leave vs build-and-stay contrast bar. Copy unchanged.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const contexts = [
  {
    watermark: "10⁹",
    icon: "Public Sector",
    tag: "Public sector",
    name: "Government ministries",
    note: "Systems that process billions of transactions, at national reach.",
  },
  {
    watermark: "99.9",
    icon: "Enterprise",
    tag: "Regulated industry",
    name: "Regulated enterprises",
    note: "Environments where downtime is not an option and audits are constant.",
  },
  {
    watermark: "10×",
    icon: "Custom Accelerators",
    tag: "High growth",
    name: "High-growth startups",
    note: "Teams that grew faster than the infrastructure underneath them.",
  },
];

export default function AboutWho() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Who we are</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Three environments</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Engineers who have shipped at scale.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-inkSoft">
            We have built systems that process billions of transactions, serve
            millions of users, and operate where downtime is not an option. We
            bring that experience to every engagement.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-3">
              {contexts.map((context, idx) => (
                <div
                  key={context.name}
                  className={`relative flex flex-col p-6 md:p-7 ${
                    idx > 0 ? "border-t border-dashed border-lineSoft md:border-t-0 md:border-l" : ""
                  }`}
                >
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none text-[64px] font-semibold leading-none tracking-tighter text-blue/[0.07]"
                    aria-hidden
                  >
                    {context.watermark}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
                    <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                    {context.tag}
                  </span>
                  <span className="mt-5 flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <DynamicSketchIcon text={context.icon} className="h-[16px] w-[16px] text-blue" />
                  </span>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-ink md:text-[22px]">
                    {context.name}
                  </h3>
                  <p className="mt-2 max-w-[26em] text-[14.5px] leading-relaxed text-inkSoft">
                    {context.note}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-lineSoft px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
              Where this team has shipped before &middot; three environments, one standard
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke md:grid-cols-[1fr_auto_1fr] lg:mt-12">
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
