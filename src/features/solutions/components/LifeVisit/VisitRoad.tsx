import type { CSSProperties } from "react";
import type { LifePage } from "@/content/pages/solutions-life";
import { cx } from "@/shared/utils/cx";
import { contours, measurePath, PEN_PACE, type Point } from "../../utils/land";
import styles from "./LifeVisit.module.scss";

/*
 * [04] The road from [01], now whole (5 Nov 2026, docs/LIFE_PAGE_SCRIPT.md;
 * reworked after the section's critique the same day). It leaves the
 * handset dashed and grey behind a hill (no signal), a bar appears as the
 * road clears the hill's shoulder, and it runs on solid blue to the first
 * referral unit, where her record is waiting before she is. Three numbered
 * beats (the order is real) and the arrival card hung off the end node.
 *
 * The same pen as [01]: one pace by distance, linear, the dashed stretch
 * revealed through a mask; each beat lands as the pen reaches it. Final
 * state under reduced motion and without JS. An SVG in a fixed 860 by 440
 * box with HTML labels placed in the same proportions; the parent decides
 * when it shows.
 */

const W = 860;
const H = 440;

const SIGNAL: Point = [372, 262];
const UNIT: Point = [796, 150];

const OFFLINE = `M-20 318 C60 318, 130 344, 204 326 C272 309, 306 270, ${SIGNAL[0]} ${SIGNAL[1]}`;
const ONLINE = `M${SIGNAL[0]} ${SIGNAL[1]} C456 252, 520 214, 600 200 C680 186, 730 156, ${UNIT[0]} ${UNIT[1]}`;

/* The hill the road comes round: the reason there is no signal. */
const LAND = contours([{ c: [236, 150], r: [150, 56], rings: 4 }], 104);

/* The pen: the offline stretch, a breath at the bar, then the blue run. */
const r2 = (n: number) => Math.round(n * 100) / 100;
const OFFLINE_START = 0.15;
const OFFLINE_TIME = r2(measurePath(OFFLINE) / PEN_PACE);
const ONLINE_START = r2(OFFLINE_START + OFFLINE_TIME + 0.2);
const ONLINE_TIME = r2(measurePath(ONLINE) / PEN_PACE);
const ARRIVED = r2(ONLINE_START + ONLINE_TIME + 0.08);

const pen = (start: number, time: number) => ({ "--d": `${start}s`, "--t": `${time}s` }) as CSSProperties;
const lands = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/* Each beat lands as the pen reaches it. */
const BEATS: { at: Point; side: "above" | "below"; align: "centre" | "end"; lands: number }[] = [
  { at: [128, 296], side: "above", align: "centre", lands: r2(OFFLINE_START + OFFLINE_TIME * 0.4) },
  { at: [SIGNAL[0], SIGNAL[1] + 40], side: "below", align: "centre", lands: r2(OFFLINE_START + OFFLINE_TIME) },
  { at: [UNIT[0] + 30, UNIT[1] - 24], side: "above", align: "end", lands: ARRIVED },
];

const at = ([x, y]: Point, extra?: CSSProperties) =>
  ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%`, ...extra }) as CSSProperties;

export interface VisitRoadProps {
  visit: LifePage["visit"];
}

export function VisitRoad({ visit }: VisitRoadProps) {
  return (
    <div className={styles.road}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <defs>
          <mask id="life-visit-offline" maskUnits="userSpaceOnUse">
            {/* Functional mask: white reveals the dashed stretch as the pen passes. */}
            <path
              d={OFFLINE}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={8}
              strokeLinecap="round"
              className={styles.pen}
              style={pen(OFFLINE_START, OFFLINE_TIME)}
            />
          </mask>
        </defs>

        <g className={styles.land}>
          {LAND.map((d, i) => (
            <path key={i} d={d} className={styles.contour} />
          ))}
        </g>

        <path d={OFFLINE} className={styles.offline} mask="url(#life-visit-offline)" />
        <path d={ONLINE} pathLength={1} className={cx(styles.online, styles.pen)} style={pen(ONLINE_START, ONLINE_TIME)} />

        {/* A bar appears: the first of four, lit. */}
        <g
          className={cx(styles.signalNode, styles.lands)}
          transform={`translate(${SIGNAL[0] - 13} ${SIGNAL[1] - 13})`}
          style={lands(r2(OFFLINE_START + OFFLINE_TIME))}
        >
          <rect width="26" height="26" rx="13" className={styles.signalRing} />
          <rect x="6.5" y="15" width="2.6" height="4" rx="0.6" className={styles.barLit} />
          <rect x="10.6" y="12.5" width="2.6" height="6.5" rx="0.6" className={styles.barDim} />
          <rect x="14.7" y="10" width="2.6" height="9" rx="0.6" className={styles.barDim} />
          <rect x="18.8" y="7.5" width="2.6" height="11.5" rx="0.6" className={styles.barDim} />
        </g>

        {/* The referral unit, and the card hung off it. */}
        <line
          x1={UNIT[0]}
          y1={UNIT[1]}
          x2={UNIT[0]}
          y2={UNIT[1] + 80}
          className={cx(styles.hanger, styles.lands)}
          style={lands(ARRIVED)}
        />
        <circle cx={UNIT[0]} cy={UNIT[1]} r={8} className={cx(styles.unitNode, styles.lands)} style={lands(ARRIVED)} />
      </svg>

      <p aria-hidden="true" className={cx(styles.roadTag, styles.lands)} style={at([206, 360], lands(OFFLINE_START))}>
        {visit.road.offline}
      </p>
      <p
        aria-hidden="true"
        className={cx(styles.roadTag, styles.roadTagOnline, styles.lands)}
        style={at([488, 204], lands(r2(ONLINE_START + 0.3)))}
      >
        {visit.road.online}
      </p>

      <ol className={styles.beats}>
        {visit.beats.map((beat, i) => {
          const place = BEATS[i];
          return (
            <li
              key={beat.title}
              className={cx(
                styles.beat,
                styles.lands,
                place.side === "above" ? styles.beatAbove : styles.beatBelow,
                place.align === "end" && styles.beatEnd,
              )}
              style={at(place.at, lands(place.lands))}
            >
              <p className={styles.beatTitle}>
                <span className={styles.step} aria-hidden="true">
                  {i + 1}
                </span>
                {beat.title}
              </p>
              <p className={styles.beatDetail}>{beat.detail}</p>
            </li>
          );
        })}
      </ol>

      <div
        className={cx(styles.arrival, styles.lands)}
        style={at([UNIT[0] + 30, UNIT[1] + 80], lands(r2(ARRIVED + 0.15)))}
      >
        <p className={styles.arrivalLabel}>{visit.arrival.label}</p>
        <p className={styles.arrivalName}>{visit.arrival.name}</p>
        <p className={styles.arrivalDetail}>{visit.arrival.detail}</p>
      </div>
    </div>
  );
}
