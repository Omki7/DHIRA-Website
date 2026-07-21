/*
 * [04] Model 3 — Advisory & Co-Engineering.
 * Two engagement forms as stacked editorial ledger rows (no card chrome):
 * Strategic Advisory with headline week figure + deliverables ledger, and
 * the co-engineering squad as a 1 + 4 figure with readable role rows.
 * Closing mono line carries the no-dependency promise.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const deliverables = [
  { num: "D-01", label: "Sovereign Data Readiness Audit" },
  { num: "D-02", label: "Vendor Evaluation" },
  { num: "D-03", label: "Sovereign Blueprint with a prioritised roadmap" },
];

const squad = [
  {
    count: "1×",
    role: "Principal Architect",
    note: "The accountable DHIRA lead",
    lead: true,
  },
  { count: "1×", role: "Senior Data Engineer", lead: false },
  { count: "1×", role: "ML Researcher", lead: false },
  { count: "1×", role: "Platform Architect", lead: false },
  { count: "1×", role: "Senior Engineer", lead: false },
];

export default function DeliveryAdvisory() {
  return (
    <section id="advisory-co-engineering" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 03 &middot; Advisory &amp; Co-Engineering</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Advisory or squad</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Expertise, not dependency.
          </h2>
          <p className="mt-5 max-w-[47em] text-lg leading-relaxed text-secondary-text">
            Sometimes you do not need a vendor; you need a senior partner who has
            shipped at national scale.
            <br />
            We&nbsp;provide the architectural clarity and execution bandwidth to get you
            across the line.
          </p>
        </ScrollReveal>

        <div className="mt-12 border-t border-lineSoft lg:mt-16">
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 gap-10 border-b border-lineSoft py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-14">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  Engagement 01 &middot; Strategic Advisory
                </p>
                <h3 className="mt-3 text-[21px] font-semibold tracking-tight text-ink md:text-[23px]">
                  Diagnose before you build.
                </h3>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-[34px] font-semibold leading-none tracking-tighter text-blue md:text-[38px]">
                    2–4
                  </span>
                  <span className="text-[15px] font-medium text-inkSoft">weeks</span>
                </div>
                <p className="mt-6 max-w-[28em] text-[15px] leading-relaxed text-inkSoft">
                  A focused engagement to audit your architecture and identify the
                  highest-leverage interventions.
                </p>
              </div>
              <div>
                <p className="border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                  Deliverables &middot; yours to keep
                </p>
                <ul>
                  {deliverables.map((item) => (
                    <li
                      key={item.num}
                      className="flex items-baseline gap-5 border-b border-dashed border-lineSoft py-5"
                    >
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blue">
                        {item.num}
                      </span>
                      <span className="text-[16px] font-medium leading-snug tracking-tight text-ink md:text-[17px]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="grid grid-cols-1 gap-10 border-b border-lineSoft py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-14">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  Engagement 02 &middot; Co-Engineering Squad
                </p>
                <h3 className="mt-3 text-[21px] font-semibold tracking-tight text-ink md:text-[23px]">
                  Our squad, inside your sprints.
                </h3>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-[34px] font-semibold leading-none tracking-tighter text-blue md:text-[38px]">
                    1&#8202;+&#8202;4
                  </span>
                  <span className="text-[15px] font-medium text-inkSoft">architect-led squad</span>
                </div>
                <p className="mt-6 max-w-[28em] text-[15px] leading-relaxed text-inkSoft">
                  Answerable for shipped code and outcomes, not logged hours. Our
                  talent, your stand-ups.
                </p>
              </div>
              <div>
                <p className="border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                  Squad composition
                </p>
                <ul>
                  {squad.map((member) => (
                    <li
                      key={member.role}
                      className="flex items-baseline gap-5 border-b border-dashed border-lineSoft py-4"
                    >
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          member.lead ? "text-blue" : "text-overcast"
                        }`}
                      >
                        {member.count}
                      </span>
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="text-[16px] font-medium leading-snug tracking-tight text-ink md:text-[17px]">
                          {member.role}
                        </span>
                        {member.lead && (
                          <>
                            <span className="rounded-[5px] border border-blue-border bg-blue-subtle px-1.5 py-[2px] font-mono text-[8.5px] font-bold tracking-[0.06em] text-blue">
                              LEAD
                            </span>
                            <span className="text-[13.5px] text-inkSoft">{member.note}</span>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-12">
            When the engagement ends &middot; the knowledge and lineage stay with you
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
