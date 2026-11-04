import type { ForecastMoment as ForecastMomentContent } from "@/content/pages/solutions";
import styles from "./SolutionsFeatured.module.scss";

/*
 * Enterprise Intelligence's moment (5 Nov 2026): "Where will we land this
 * year?" answered on a rolling twelve-month line. Actuals in ink up to
 * today, the plan dashed, the forecast in blue landing above plan, and the
 * one place it bends: Northwind's renewal. Figures are the Enterprise
 * Intelligence page's sample world. The chart is drawing only; every word
 * sits in HTML around it, so it scales without shrinking text.
 */

const ACTUAL = "M16 176 C40 170, 58 182, 82 168 C106 154, 124 166, 148 152 C172 140, 196 150, 224 136";
const PLAN = "M224 136 C320 124, 440 110, 600 96";
const FORECAST = "M224 136 C270 124, 318 112, 352 116 C378 120, 392 132, 420 120 C470 98, 540 82, 600 70";

export interface ForecastMomentProps {
  moment: ForecastMomentContent;
}

export function ForecastMoment({ moment }: ForecastMomentProps) {
  return (
    <div className={styles.forecast}>
      <div className={styles.answer}>
        <p className={styles.figure}>{moment.figure}</p>
        <p className={styles.figureNote}>{moment.figureNote}</p>
      </div>

      <svg viewBox="0 0 616 200" className={styles.chart} aria-hidden="true" focusable="false">
        <line x1="16" y1="190" x2="600" y2="190" className={styles.axis} />
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1={16 + i * 48.7} y1="186" x2={16 + i * 48.7} y2="190" className={styles.tick} />
        ))}
        <line x1="224" y1="40" x2="224" y2="190" className={styles.today} />
        <path d={PLAN} className={styles.plan} />
        <path d={ACTUAL} pathLength={1} className={styles.actual} />
        <path d={FORECAST} pathLength={1} className={styles.forecastLine} />
        <circle cx="420" cy="120" r="6.5" className={styles.marker} />
        <circle cx="600" cy="70" r="6" className={styles.landing} />
      </svg>

      <div className={styles.axisLabels} aria-hidden="true">
        <span style={{ left: `${(224 / 616) * 100}%` }} className={styles.axisToday}>
          {moment.today}
        </span>
        <span className={styles.axisEnd}>{moment.horizon}</span>
      </div>

      <p className={styles.legend}>
        <span className={styles.key}>
          <span className={styles.swatchActual} aria-hidden="true" />
          {moment.legend.actual}
        </span>
        <span className={styles.key}>
          <span className={styles.swatchForecast} aria-hidden="true" />
          {moment.legend.forecast}
        </span>
        <span className={styles.key}>
          <span className={styles.swatchPlan} aria-hidden="true" />
          {moment.legend.plan}
        </span>
        <span className={styles.key}>
          <span className={styles.swatchMarker} aria-hidden="true" />
          {moment.marker}
        </span>
      </p>
    </div>
  );
}
