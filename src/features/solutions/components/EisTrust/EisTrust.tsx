import type { CSSProperties } from "react";
import type { EisPage } from "@/content/pages/solutions-eis";
import { DrawnFigure, PreviewTag, ScrollRevealRail, SectionHeader, SectionLink } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./EisTrust.module.scss";

export interface EisTrustProps {
  content: EisPage["trust"];
  /** The section's place in the page's order. */
  num: string;
}

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/*
 * [trust] Section [06] (5 Nov 2026, docs/EIS_PAGE_SCRIPT.md). Replaces the
 * capabilities section. The headline's two halves are the two drawings:
 *
 *   Every figure shows its working   [02]'s $180,000 opened like a receipt:
 *                                    definition, owner, as-at time, checks,
 *                                    and the three records it was built
 *                                    from, each on its own hairline
 *   Every action waits for you       the route a proposal takes, in order
 *                                    (a real sequence, so numbered); the
 *                                    agent's step carries PreviewTag
 *
 * The receipt separates where the value comes from and the signals that
 * made it a risk, so the lines reconcile. The whole route is agentic, so
 * its label carries PreviewTag (critique, 5 Nov 2026). The old
 * `#capabilities` anchor stays as an alias.
 */
export function EisTrust({ content, num }: EisTrustProps) {
  const { receipt, route } = content;
  return (
    <section id="trust" className={styles.section}>
      <span id="capabilities" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader num={num} label="TRUST" setup={content.setup} payoff={content.payoff} lede={content.lede}>
          <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
        </SectionHeader>

        <DrawnFigure className={styles.board} threshold={0.25}>
          {/* Every figure shows its working. */}
          <div className={styles.receipt}>
            <div className={styles.figure}>
              <p className={styles.figureLabel}>
                {receipt.label} · {receipt.subject}
              </p>
              <p className={styles.figureValue}>{receipt.value}</p>
            </div>
            <dl className={styles.rows}>
              {receipt.rows.map((row, i) => (
                <div key={row.key} className={styles.row} style={delay(0.2 + i * 0.08)}>
                  <dt>{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.sourcesLabel}>{receipt.valueLabel}</p>
            <ul className={styles.sources}>
              <li className={cx(styles.source, styles.sourceValue)} style={delay(0.55)}>
                <span className={styles.sourceSystem}>{receipt.valueFrom.system}</span>
                <span className={styles.sourceRecord}>{receipt.valueFrom.record}</span>
              </li>
            </ul>
            <p className={styles.sourcesLabel}>{receipt.signalsLabel}</p>
            <ul className={styles.sources}>
              {receipt.signals.map((signal, i) => (
                <li key={signal.system} className={styles.source} style={delay(0.7 + i * 0.1)}>
                  <span className={styles.sourceSystem}>{signal.system}</span>
                  <span className={styles.sourceRecord}>{signal.record}</span>
                </li>
              ))}
            </ul>
            <p className={styles.footnote}>{receipt.footnote}</p>
          </div>

          {/* Every action waits for you. */}
          <div className={styles.route}>
            <p className={styles.routeLabel}>
              {route.label}
              <PreviewTag />
            </p>
            <ol className={styles.steps}>
              {route.steps.map((step, i) => (
                <li
                  key={step.title}
                  className={cx(styles.step, i === 2 && styles.stepYou)}
                  style={delay(0.35 + i * 0.16)}
                >
                  <span className={styles.stepNode} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </DrawnFigure>

      </ScrollRevealRail>
    </section>
  );
}
