/*
 * [07] Close — Let's Talk About Your Mission.
 * Dark closure card per the Closure precedent (Rule 5). Carries the
 * #talk-to-our-team id the nav CTA targets.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";

export default function PublicSectorClose({ content }: { content: PublicSectorPage["close"] }) {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail>
        <ScrollReveal>
          <div className=" relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-anchor px-6 py-14 text-center text-ink md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-blue" aria-hidden />
            
            <div className="relative">
              <h2 className="mx-auto mt-2 max-w-[16em] text-heading-sm font-medium text-ink md:text-heading-md">
                {content.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                {content.body}
              </p>
              <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-inkSoft">
                {content.missions.map((mission) => (
                  <span key={mission} className="flex items-center gap-x-3">
                    <span>{mission}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-tertiary-bg" aria-hidden />
                  </span>
                ))}
                <span className="flex items-center gap-1.5 text-secondary-text">
                  <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                  {content.yours}
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={content.primary.href} className="btn-primary">
                  {content.primary.label}
                </Link>
                <Link href={content.secondary.href} className="btn-secondary">
                  {content.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
