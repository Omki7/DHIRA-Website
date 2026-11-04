import type { VisitsMoment as VisitsMomentContent } from "@/content/pages/solutions";
import { cx } from "@/shared/utils/cx";
import styles from "./SolutionsFeatured.module.scss";

/*
 * ============================ SIMULATED PRODUCT UI ============================
 * Akashic Life's moment (5 Nov 2026): "Which mother needs care first?"
 * answered by the health worker's week on her phone, with no signal. The
 * one high-risk visit leads, in the cost red; the rest are routine. No
 * numbers on any Akashic Life screen (docs/LIFE_PAGE_SCRIPT.md §2). Meena
 * is the Akashic Life page's sample visit.
 * ==============================================================================
 */

export interface VisitsMomentProps {
  moment: VisitsMomentContent;
}

export function VisitsMoment({ moment }: VisitsMomentProps) {
  return (
    <div className={styles.visits}>
      <div className={styles.visitsBar}>
        <span className={styles.visitsTitle}>{moment.title}</span>
        <span className={styles.visitsSignal}>
          <svg viewBox="0 0 14 10" className={styles.bars} aria-hidden="true">
            <rect x="0" y="7" width="2.2" height="3" rx="0.5" />
            <rect x="3.9" y="5" width="2.2" height="5" rx="0.5" />
            <rect x="7.8" y="3" width="2.2" height="7" rx="0.5" />
            <rect x="11.7" y="0" width="2.2" height="10" rx="0.5" />
          </svg>
          {moment.signal}
        </span>
      </div>
      <ul className={styles.visitsList}>
        {moment.rows.map((row) => (
          <li key={row.name} className={cx(styles.visit, row.urgent && styles.visitUrgent)}>
            <span className={styles.visitWho}>
              <span className={styles.visitName}>{row.name}</span>
              <span className={styles.visitDetail}>{row.detail}</span>
            </span>
            <span className={styles.visitStatus}>{row.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
