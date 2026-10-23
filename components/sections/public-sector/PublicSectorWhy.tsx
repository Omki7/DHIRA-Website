/*
 * [04] Why Government Teams Choose Akashic — The Tender Schedule.
 * Six procurement realities as a compliance-schedule ledger: mono requirement
 * indices, the requirement, how Akashic meets it, and a status chip. A
 * deliberately governmental shape, not a card grid (Rule 1).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";


export default function PublicSectorWhy({ content }: { content: PublicSectorPage["why"] }) {
  const { requirements, columns } = content;
  return (
    <section id="why-akashic" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-medium text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
        </ScrollReveal>

        <div className="group/reqs mt-12 lg:mt-14">
          <ScrollReveal>
            <div className="hidden gap-6 border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:grid lg:grid-cols-[90px_260px_1fr_180px]">
              <span>{columns.ref}</span>
              <span>{columns.requirement}</span>
              <span>{columns.how}</span>
              <span className="text-right">{columns.status}</span>
            </div>
          </ScrollReveal>
          {requirements.map((req, idx) => (
            <ScrollReveal key={req.num} delay={100 + idx * 70}>
              <div className="grid grid-cols-1 gap-2 border-b border-subtle-stroke py-5 transition-opacity duration-200 ease-settle hover:!opacity-100 group-hover/reqs:opacity-50 lg:grid-cols-[90px_260px_1fr_180px] lg:items-baseline lg:gap-6 lg:py-6">
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
      </ScrollRevealRail>
    </section>
  );
}
