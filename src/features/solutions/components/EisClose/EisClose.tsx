import Link from "next/link";
import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail } from "@/shared/components/ui";
import styles from "./EisClose.module.scss";

export interface EisCloseProps {
  content: EisPage["close"];
}

/* [talk-to-our-team] The closing card.
 * The homepage's closing card (4 Nov 2026, user: the page read as a
 * different design system): one pale vault card in the rail, an unnumbered
 * kicker, a two-tone headline (soft setup, ink payoff), the prompt, one
 * button. The demo timeline follows as hairline spec rows, then the
 * footnote that cites the page's figures (Rule 4).
 * Walkthrough cards and secondary Akashic platform button removed per direction.
 */
export function EisClose({ content }: EisCloseProps) {
  return (
    <section id="talk-to-our-team" className={styles.section}>
      <ScrollRevealRail>
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.content}>
              <span className={styles.kicker}>{content.sessionLabel}</span>

              <h2 className={styles.title}>
                <span className={styles.titleSetup}>{content.title[0]}</span>{" "}
                <span className={styles.titlePayoff}>{content.title[1]}</span>
              </h2>

              <span aria-hidden className={styles.rule} />

              <p className={styles.prompt}>{content.prompt}</p>

              <div className={styles.actions}>
                <Link href={content.primary.href} className="btn-primary btn-lg">
                  {content.primary.label}
                </Link>
              </div>

              {/* What happens after the click, one row each. */}
              {content.timeline && (
                <div className={styles.timeline}>
                  {content.timeline.map((item) => (
                    <div key={item.duration} className={styles.step}>
                      <span className={styles.stepKey}>{item.duration}</span>
                      <span className={styles.stepLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {content.footnote && <p className={styles.footnote}>{content.footnote}</p>}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
