/*
 * ============================ SIMULATED PRODUCT UI ============================
 * Not a screenshot and not a live product surface: a drawn stand-in for the
 * Akashic Life screen a health worker sees at the end of one antenatal
 * check-up, with no signal. One focal result (high risk, refer now), the
 * only red on the screen, with its reason in plain words, so the screen
 * shows its working. No drawn controls: nothing here looks clickable.
 *
 * NO NUMBERS ON THIS SCREEN (user direction, 23 Jul 2026): Akashic Life is
 * not sold, so a value, a score, a count or a time would each read as a
 * claim. Readings are named in words. The visit is the page's sample
 * (docs/LIFE_PAGE_SCRIPT.md §2).
 * ==============================================================================
 */

import type { LifePage } from "@/content/pages/solutions-life";
import styles from "./LifeVisitMockup.module.scss";

export interface LifeVisitMockupProps {
  handset: LifePage["visit"]["handset"];
}

export function LifeVisitMockup({ handset }: LifeVisitMockupProps) {
  return (
    <figure className={styles.phone}>
      <figcaption className={styles.srOnly}>{handset.caption}</figcaption>
      <div className={styles.status}>
        <span className={styles.signal}>
          <svg viewBox="0 0 14 10" className={styles.bars} aria-hidden="true">
            <rect x="0" y="7" width="2.2" height="3" rx="0.5" />
            <rect x="3.9" y="5" width="2.2" height="5" rx="0.5" />
            <rect x="7.8" y="3" width="2.2" height="7" rx="0.5" />
            <rect x="11.7" y="0" width="2.2" height="10" rx="0.5" />
          </svg>
          {handset.signal}
        </span>
        <span aria-hidden="true" className={styles.battery} />
      </div>

      <div className={styles.body}>
        <p className={styles.kicker}>{handset.title}</p>
        <p className={styles.name}>{handset.mother}</p>
        <p className={styles.detail}>{handset.detail}</p>

        <dl className={styles.readings}>
          {handset.readings.map((reading) => (
            <div key={reading.label} className={styles.reading}>
              <dt className={styles.readingLabel}>{reading.label}</dt>
              <dd className={styles.readingValue}>{reading.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.result}>
          <p className={styles.resultLabel}>{handset.result.label}</p>
          <p className={styles.resultAction}>{handset.result.action}</p>
          <p className={styles.resultReason}>{handset.result.reason}</p>
        </div>

        <p className={styles.saved}>
          {handset.saved[0]}
          <br />
          {handset.saved[1]}
        </p>
      </div>
    </figure>
  );
}
