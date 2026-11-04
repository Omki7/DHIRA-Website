/**
 * SIMULATED PRODUCT UI: the figure-led homepage teasers (Business
 * Intelligence, Machine Learning, Warehouse). Grammar and demo figures in
 * the header of HomeModuleIllustrationsMockup.
 */
import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./HomeModuleIllustrationsMockup.module.scss";

function Figure({ value, unit, aside }: { value: string; unit?: string; aside?: ReactNode }) {
  return (
    <div className={styles.figureRow}>
      <p className={styles.figure}>
        {value}
        {unit && <span className={styles.figureUnit}>{unit}</span>}
      </p>
      {aside}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Business Intelligence: the quarter, week by week, against plan    */
/* ---------------------------------------------------------------- */
/* Thirteen weeks summing to $25.4 million at 98% of a flat plan (the same
   series as the /akashic outcome card). */
const WEEKS = [1.78, 1.86, 1.92, 1.84, 1.95, 2.03, 1.93, 1.97, 1.99, 1.9, 2.05, 2.1, 2.08];
const PLAN = 25.4 / 0.98 / WEEKS.length;
const SPARK = { w: 208, h: 44, lo: 1.7, hi: 2.14 };
const sy = (v: number) => SPARK.h - ((v - SPARK.lo) / (SPARK.hi - SPARK.lo)) * SPARK.h;
const sx = (i: number) => (i * SPARK.w) / (WEEKS.length - 1);
const SPARK_LINE = WEEKS.map((v, i) => `${i ? "L" : "M"} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
const SPARK_AREA = `${SPARK_LINE} L ${SPARK.w} ${SPARK.h} L 0 ${SPARK.h} Z`;

export function BusinessIntelligenceTeaser() {
  const last = WEEKS.length - 1;
  return (
    <div>
      <p className={styles.label}>Net revenue</p>
      <div className={styles.figureSlot}>
        <Figure value="$25.4" unit="million" aside={<span className={styles.change}>+6.4%</span>} />
      </div>
      <svg viewBox={`0 0 ${SPARK.w} ${SPARK.h}`} className={cx(styles.spark, styles.chart)} fill="none" aria-hidden>
        <path d={SPARK_AREA} className={styles.fillBlueSubtle} />
        <path d={`M 0 ${sy(PLAN)} H ${SPARK.w}`} className={styles.strokeInkSoft} strokeOpacity={0.5} strokeDasharray="2 3" />
        <path d={SPARK_LINE} className={styles.strokeBlue} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={sx(last)} cy={sy(WEEKS[last])} r={2.5} className={styles.fillBlue} />
      </svg>
      <div className={cx(styles.sparkFoot, styles.tertiary, styles.mono)}>
        <span>98% of plan</span>
        <span>Up 2 points</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Machine Learning: next quarter, with its likely range             */
/* ---------------------------------------------------------------- */
const HISTORY = [812, 840, 826, 868, 851, 889, 874, 902, 893, 921, 905, 934, 918, 940];
const FORECAST = [942, 946, 940, 951, 955, 948, 958, 962, 955, 966, 970, 964];
const CHART = { w: 240, h: 56, today: 150 };
const fy = (v: number) => CHART.h - ((v - 790) / 200) * CHART.h;
const hx = (i: number) => (i * CHART.today) / (HISTORY.length - 1);
const fx = (j: number) => CHART.today + ((j + 1) * (CHART.w - CHART.today)) / FORECAST.length;
const HIST_LINE = HISTORY.map((v, i) => `${i ? "L" : "M"} ${hx(i).toFixed(1)} ${fy(v).toFixed(1)}`).join(" ");
const START = `M ${CHART.today} ${fy(HISTORY[HISTORY.length - 1]).toFixed(1)}`;
const FC_LINE = `${START} ` + FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${fy(v).toFixed(1)}`).join(" ");
const band = (j: number) => 2 + 1.1 * (j + 1);
const FC_BAND =
  `${START} ` +
  FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${(fy(v) - band(j)).toFixed(1)}`).join(" ") +
  " " +
  [...FORECAST.keys()]
    .reverse()
    .map((j) => `L ${fx(j).toFixed(1)} ${(fy(FORECAST[j]) + band(j)).toFixed(1)}`)
    .join(" ") +
  " Z";

export function ForecastTeaser() {
  return (
    <div>
      <Figure value="12,400" unit="units next quarter" />
      <svg viewBox={`0 0 ${CHART.w} ${CHART.h + 12}`} className={cx(styles.forecast, styles.chart)} fill="none" aria-hidden>
        <path d={FC_BAND} className={styles.fillBlueSubtle} />
        <path d={HIST_LINE} className={styles.strokeInk} strokeOpacity={0.7} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
        <path d={FC_LINE} className={styles.strokeBlue} strokeWidth={1.5} strokeDasharray="3 3" strokeLinecap="round" />
        <path d={`M ${CHART.today} 0 V ${CHART.h}`} className={styles.strokeLine} strokeDasharray="2 2" />
        <circle cx={CHART.today} cy={fy(HISTORY[HISTORY.length - 1])} r={2.5} className={styles.fillInk} />
        <text x={CHART.today} y={CHART.h + 11} textAnchor="middle" className={styles.today}>
          Today
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Warehouse: one number, defined once, with its drivers             */
/* ---------------------------------------------------------------- */
export function WarehouseTeaser() {
  return (
    <div>
      <p className={styles.label}>Net revenue</p>
      <div className={styles.figureSlot}>
        <Figure value="$25.4" unit="million" />
      </div>
      <div className={styles.drivers}>
        <div className={styles.driver}>
          <p className={cx(styles.tertiary, styles.mono)}>Orders</p>
          <p className={styles.driverValue}>82,401</p>
        </div>
        <span className={styles.times} aria-hidden>
          ×
        </span>
        <div className={cx(styles.driver, styles.driverEnd)}>
          <p className={cx(styles.nowrap, styles.tertiary, styles.mono)}>Order value</p>
          <p className={styles.driverValue}>$308</p>
        </div>
      </div>
    </div>
  );
}
