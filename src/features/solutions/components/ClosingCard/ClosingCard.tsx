import Link from "next/link";
import type { Cta } from "@/content/types";
import { ScrollReveal, ScrollRevealRail } from "@/shared/components/ui";
import styles from "./ClosingCard.module.scss";

export interface ClosingCardProps {
  /** The unnumbered kicker over the headline. */
  kicker: string;
  /** Two tones: soft setup, ink payoff. */
  title: [string, string];
  prompt: string;
  primary: Cta;
  secondary?: Cta;
  /** What happens after the click, one hairline row each. */
  timeline?: { key: string; label: string }[];
  /** Cites the page's figures (Rule 4). */
  footnote?: string;
}

/* [talk-to-our-team] The homepage closing card, shared by /solutions/life
 * and the /solutions hub (5 Nov 2026): one pale vault card in the rail, an
 * unnumbered kicker, a two-tone headline, a blue rule, the prompt, the
 * button pair, then hairline spec rows and a footnote. The same geometry
 * as the Enterprise Intelligence close (EisClose). Its CTA opens the global
 * contact form (#talk-to-our-team). */
export function ClosingCard({ kicker, title, prompt, primary, secondary, timeline, footnote }: ClosingCardProps) {
  return (
    <section id="talk-to-our-team" className={styles.section}>
      <ScrollRevealRail>
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.content}>
              <span className={styles.kicker}>{kicker}</span>

              <h2 className={styles.title}>
                <span className={styles.titleSetup}>{title[0]}</span>{" "}
                <span className={styles.titlePayoff}>{title[1]}</span>
              </h2>

              <span aria-hidden className={styles.rule} />

              <p className={styles.prompt}>{prompt}</p>

              <div className={styles.actions}>
                <Link href={primary.href} className="btn-primary btn-lg">
                  {primary.label}
                </Link>
                {secondary && (
                  <Link href={secondary.href} className="btn-secondary btn-lg">
                    {secondary.label}
                  </Link>
                )}
              </div>

              {timeline && (
                <div className={styles.timeline}>
                  {timeline.map((item) => (
                    <div key={item.key} className={styles.step}>
                      <span className={styles.stepKey}>{item.key}</span>
                      <span className={styles.stepLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {footnote && <p className={styles.footnote}>{footnote}</p>}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
