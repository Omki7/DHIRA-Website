/*
 * The shared sub-page closing card on `bg-ink` (Rule 5b), generalised from
 * SolutionsClose: label, two-tone title, one paragraph, a CTA pair in the
 * -invert buttons. Carries #talk-to-our-team, so the global ContactModal can
 * be reached from the page's section rail. A primary href of
 * "#talk-to-our-team" opens that modal.
 */

import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";
import { ScrollRevealRail } from "@/shared/components/ui/ScrollRevealRail";
import { TwoToneTitle } from "@/shared/components/ui/TwoToneTitle";
import styles from "./PageClose.module.scss";

export type CloseAction = { label: string; href: string };

export interface PageCloseProps {
  label: string;
  setup: string;
  payoff: string;
  body: string;
  primary: CloseAction;
  secondary?: CloseAction;
}

export function PageClose({
  label,
  setup,
  payoff,
  body,
  primary,
  secondary,
}: PageCloseProps) {
  return (
    <section id="talk-to-our-team" className={styles.close}>
      <ScrollRevealRail>
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.bar} aria-hidden />

            <div className={styles.inner}>
              <p className={styles.label}>{label}</p>
              <TwoToneTitle tone="ink" setup={setup} payoff={payoff} className={styles.title} />
              <p className={styles.body}>{body}</p>
              <div className={styles.actions}>
                <RegionLink href={primary.href} className="btn-primary btn-lg">
                  {primary.label}
                </RegionLink>
                {secondary && (
                  <RegionLink href={secondary.href} className="btn-secondary btn-lg">
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
