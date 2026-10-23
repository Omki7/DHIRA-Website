/*
 * [05] Close — dark closure card per the Closure precedent (Rule 5).
 * Carries the #talk-to-our-team id the nav CTA targets.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent, SectorTemplate } from "@/content/pages/sectors";

export default function SectorClose({ content, template }: { content: SectorContent; template: SectorTemplate["close"] }) {
  const { close } = content;

  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-10 pb-20 lg:pt-14 lg:pb-24">
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail>
        <ScrollReveal>
          <div className=" relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-anchor px-6 py-14 text-center text-ink md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-blue" aria-hidden />
            
            <div className="relative">
              <h2 className="mx-auto mt-2 max-w-[16em] text-heading-sm font-medium text-ink md:text-heading-md">
                {close.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                {close.body}
              </p>
              <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-inkSoft">
                {close.chips.map((chip) => (
                  <span key={chip} className="flex items-center gap-3">
                    <span>{chip}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-tertiary-bg" aria-hidden />
                  </span>
                ))}
                <span className="flex items-center gap-1.5 text-secondary-text">
                  <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                  {close.yourThing}
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={template.primary.href} className="btn-primary">
                  {template.primary.label}
                </Link>
                <Link
                  href={template.secondary.href}
                  className="btn-secondary"
                >
                  {template.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
