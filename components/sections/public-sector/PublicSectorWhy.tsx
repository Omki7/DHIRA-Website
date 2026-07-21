/*
 * [04] Why Government Teams Choose Akashic — The Tender Schedule.
 * Six procurement realities as a compliance-schedule ledger: mono requirement
 * indices, the requirement, how Akashic meets it, and a status chip. A
 * deliberately governmental shape, not a card grid (Rule 1).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const requirements = [
  {
    num: "REQ-01",
    title: "Data sovereignty",
    desc: "Full on-premises deployment available. Your citizen data stays within your infrastructure: never a forced cloud dependency.",
    chip: "ON-PREM AVAILABLE",
  },
  {
    num: "REQ-02",
    title: "Audit-ready governance",
    desc: "End-to-end lineage, metadata catalogues, and role-based access control: built for the scrutiny that public spending demands.",
    chip: "LINEAGE + RBAC",
  },
  {
    num: "REQ-03",
    title: "Fast delivery",
    desc: "A complete proof-of-concept for CBSE was delivered in 1.5 months. Government timelines don't wait for long engineering cycles. Neither do we.",
    chip: "POC IN 1.5 MONTHS",
  },
  {
    num: "REQ-04",
    title: "Multi-language ready",
    desc: "Akashic AI's multilingual NLP layer means dashboards and insights are accessible in regional languages, not just English.",
    chip: "REGIONAL LANGUAGES",
  },
  {
    num: "REQ-05",
    title: "Works with what you have",
    desc: "23+ source connectors mean Akashic plugs into existing ministry databases, citizen registries, and legacy systems. No forced migration.",
    chip: "23+ CONNECTORS",
  },
  {
    num: "REQ-06",
    title: "No testimonials needed",
    desc: "Government clients cannot give testimonials. We don't ask. We show the platforms, the scale, and the numbers instead.",
    chip: "PUBLIC RECORD",
  },
];

export default function PublicSectorWhy() {
  return (
    <section id="why-akashic" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Why government teams choose Akashic</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The tender schedule</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Built for the realities of public sector delivery.
          </h2>
        </ScrollReveal>

        <div className="group/reqs mt-12 lg:mt-14">
          <ScrollReveal>
            <div className="hidden gap-6 border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:grid lg:grid-cols-[90px_260px_1fr_180px]">
              <span>Ref</span>
              <span>Requirement</span>
              <span>How Akashic meets it</span>
              <span className="text-right">Status</span>
            </div>
          </ScrollReveal>
          {requirements.map((req, idx) => (
            <ScrollReveal key={req.num} delay={100 + idx * 70}>
              <div className="grid grid-cols-1 gap-2 border-b border-subtle-stroke py-5 transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/reqs:opacity-50 lg:grid-cols-[90px_260px_1fr_180px] lg:items-baseline lg:gap-6 lg:py-6">
                <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                  {req.num}
                </span>
                <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                  {req.title}
                </h3>
                <p className="max-w-[38em] text-[14.5px] leading-relaxed text-inkSoft">{req.desc}</p>
                <span className="lg:text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[8.5px] font-bold tracking-[0.04em] text-blue">
                    <span className="h-[4px] w-[4px] rounded-full bg-blue" aria-hidden />
                    {req.chip}
                  </span>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
