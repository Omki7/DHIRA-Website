/*
 * The shared sub-page closing card on `bg-ink` (Rule 5b), generalised from
 * SolutionsClose: label, two-tone title, one paragraph, a CTA pair in the
 * -invert buttons. Carries #talk-to-our-team, so the global ContactModal can
 * be reached from the page's section rail. A primary href of
 * "#talk-to-our-team" opens that modal.
 */

import RegionLink from "@/components/ui/RegionLink";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";

export type CloseAction = { label: string; href: string };

export default function PageClose({
  label,
  setup,
  payoff,
  body,
  primary,
  secondary,
}: {
  label: string;
  setup: string;
  payoff: string;
  body: string;
  primary: CloseAction;
  secondary?: CloseAction;
}) {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-10 lg:pb-24 lg:pt-14">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/55">{label}</p>
              <TwoToneTitle tone="ink" setup={setup} payoff={payoff} className="mx-auto mt-5 max-w-[18em]" />
              <p className="mx-auto mt-6 max-w-[36em] text-pretty text-lg leading-relaxed text-white/65">{body}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <RegionLink href={primary.href} className="btn-primary-invert btn-lg">
                  {primary.label}
                </RegionLink>
                {secondary && (
                  <RegionLink href={secondary.href} className="btn-secondary-invert btn-lg">
                    {secondary.label}
                  </RegionLink>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
