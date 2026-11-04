import type { CSSProperties } from "react";
import type { LifePage } from "@/content/pages/solutions-life";
import { DrawnFigure } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { contours, measurePath, PEN_PACE, type Point } from "../../utils/land";
import styles from "./LifeDelays.module.scss";

/*
 * [01] The long road (5 Nov 2026, docs/LIFE_PAGE_SCRIPT.md; reworked after
 * the section's critique the same day). One road from a home to a district
 * hospital over open land, laid out as the three delays model has it:
 * deciding coils at home (time passing in one place), the road runs on to
 * the health centre, the referral leg to the hospital that can treat her
 * bends round the hill and is the second delay, and the third coils inside
 * the hospital grounds before treatment begins. Solid ink where the journey
 * moves forward, red and dashed where time is lost (red is a cost, in a
 * problem section: DESIGN_SYSTEM §4).
 *
 * The pen draws once in view at one even pace, slower in the coils, and
 * the red is revealed under it through a mask; each label lands as the pen
 * arrives. Final state under reduced motion and without JS.
 *
 * From xl: an SVG in a fixed 1200 by 360 box with HTML labels placed in the
 * same proportions, so text stays at native size. Below xl: the journey as
 * a sequence (delays numbered: the order is real).
 */

const W = 1200;
const H = 360;


const HOME: Point = [60, 230];
const CENTRE: Point = [520, 168];
const HOSPITAL: Point = [962, 210];
const END: Point = [1144, 190];

/* The hospital grounds: the third delay happens inside them. */
const GROUNDS = { x: 940, y: 118, w: 228, h: 112 };

/* The road in six pieces, in travel order. `delay` marks a delay stretch;
   `slow` pieces draw at half pace. */
const PIECES: { d: string; delay?: 0 | 1 | 2; slow?: boolean }[] = [
  { d: `M${HOME[0]} ${HOME[1]} C82 230, 102 230, 120 230` },
  {
    delay: 0,
    slow: true,
    d: "M120 230 C150 230, 175 228, 190 216 C205 202, 205 180, 188 176 C171 172, 160 190, 172 206 C184 222, 214 228, 236 216 C258 204, 260 182, 243 178 C226 174, 216 192, 228 208 C240 224, 280 224, 320 216",
  },
  { d: `M320 216 C380 208, 440 176, ${CENTRE[0]} ${CENTRE[1]}` },
  {
    delay: 1,
    d: `M${CENTRE[0]} ${CENTRE[1]} C580 164, 610 196, 660 222 C720 254, 820 262, 880 242 C916 230, 940 214, ${HOSPITAL[0]} ${HOSPITAL[1]}`,
  },
  {
    delay: 2,
    slow: true,
    d: `M${HOSPITAL[0]} ${HOSPITAL[1]} C987 206, 1004 196, 1012 182 C1020 166, 1008 154, 994 160 C980 166, 982 188, 1000 196 C1022 206, 1042 200, 1054 188 C1066 174, 1058 160, 1044 164 C1030 168, 1032 190, 1052 198 C1070 204, 1086 198, 1102 194`,
  },
  { d: `M1102 194 C1116 192, 1130 190, ${END[0]} ${END[1]}` },
];

/* --- Pace: length of each piece, measured once at build time --------------- */

const PACE = PEN_PACE; // on open road; coils at half pace
const START = 0.15;

const TIMING = PIECES.reduce<{ start: number; duration: number }[]>((acc, piece) => {
  const prev = acc[acc.length - 1];
  const start = prev ? prev.start + prev.duration : START;
  const duration = measurePath(piece.d) / (piece.slow ? PACE / 2 : PACE);
  return [...acc, { start, duration }];
}, []);

const r2 = (n: number) => Math.round(n * 100) / 100;
const ends = (piece: number) => r2(TIMING[piece].start + TIMING[piece].duration + 0.08);
const pieceOfDelay = (delay: number) => PIECES.findIndex((p) => p.delay === delay);

const timing = (piece: number) =>
  ({ "--d": `${r2(TIMING[piece].start)}s`, "--t": `${r2(TIMING[piece].duration)}s` }) as CSSProperties;
const arrives = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/* --- Labels ----------------------------------------------------------------- */

/* Each delay's number sits clear above or on its stretch, and its caption
   in open ground beside it. */
const DELAY_LABELS: { at: Point; side: "above" | "below"; mark: Point }[] = [
  { at: [214, 140], side: "above", mark: [214, 158] },
  { at: [770, 278], side: "below", mark: [770, 258] },
  { at: [1046, 106], side: "above", mark: [1028, 140] },
];

const PLACE_LABELS: { at: Point; align: "start" | "centre" | "end"; side: "above" | "below"; piece: number }[] = [
  { at: [HOME[0] - 4, HOME[1] + 18], align: "start", side: "below", piece: -1 },
  { at: [CENTRE[0], CENTRE[1] - 18], align: "centre", side: "above", piece: 2 },
  { at: [GROUNDS.x + GROUNDS.w, GROUNDS.y + GROUNDS.h + 12], align: "end", side: "below", piece: 3 },
];

/* --- The land: one hill, the reason the referral leg bends. Labels stay in
   open ground. ------------------------------------------------------------- */
const LAND = contours([{ c: [760, 106], r: [140, 60], rings: 4 }]);

const at = ([x, y]: Point, extra?: CSSProperties) =>
  ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%`, ...extra }) as CSSProperties;

/* The journey in reading order for the narrow layout. */
const SEQUENCE = [
  { kind: "place", i: 0 },
  { kind: "delay", i: 0 },
  { kind: "place", i: 1 },
  { kind: "delay", i: 1 },
  { kind: "place", i: 2 },
  { kind: "delay", i: 2 },
] as const;

export interface LongRoadProps {
  road: LifePage["delays"]["road"];
}

export function LongRoad({ road }: LongRoadProps) {
  return (
    <div className={styles.figure}>
      {/* From xl: the road across the land. */}
      <DrawnFigure className={styles.stage} threshold={0.35}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <defs>
            {PIECES.map((piece, i) =>
              piece.delay === undefined ? null : (
                <mask key={i} id={`life-road-delay-${piece.delay}`} maskUnits="userSpaceOnUse">
                  {/* Functional mask: white reveals the red stretch as the pen passes. */}
                  <path
                    d={piece.d}
                    pathLength={1}
                    fill="none"
                    stroke="white"
                    strokeWidth={8}
                    strokeLinecap="round"
                    className={styles.pen}
                    style={timing(i)}
                  />
                </mask>
              ),
            )}
          </defs>

          <g className={styles.land}>
            {LAND.map((d, i) => (
              <path key={i} d={d} className={styles.contour} />
            ))}
          </g>

          <rect x={GROUNDS.x} y={GROUNDS.y} width={GROUNDS.w} height={GROUNDS.h} rx={20} className={styles.grounds} />

          {PIECES.map((piece, i) =>
            piece.delay === undefined ? (
              <path key={i} d={piece.d} pathLength={1} className={cx(styles.road, styles.pen)} style={timing(i)} />
            ) : (
              <path key={i} d={piece.d} className={styles.delay} mask={`url(#life-road-delay-${piece.delay})`} />
            ),
          )}

          <circle cx={HOME[0]} cy={HOME[1]} r={6} className={styles.place} />
          <circle cx={CENTRE[0]} cy={CENTRE[1]} r={6} className={cx(styles.place, styles.arrive)} style={arrives(ends(2))} />
          <circle cx={HOSPITAL[0]} cy={HOSPITAL[1]} r={6} className={cx(styles.place, styles.arrive)} style={arrives(ends(3))} />
          <circle cx={END[0]} cy={END[1]} r={7} className={cx(styles.placeEnd, styles.arrive)} style={arrives(ends(5))} />

          {DELAY_LABELS.map(({ mark: [x, y] }, i) => (
            <g key={`mark-${i}`} className={styles.arrive} style={arrives(ends(pieceOfDelay(i)))}>
              <circle cx={x} cy={y} r={10} className={styles.mark} />
              <text x={x} y={y + 3.6} className={styles.markText} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        {road.places.map((place, i) => {
          const label = PLACE_LABELS[i];
          return (
            <div
              key={place.name}
              className={cx(
                styles.placeLabel,
                styles.arrive,
                label.align === "start" && styles.alignStart,
                label.align === "centre" && styles.alignCentre,
                label.align === "end" && styles.alignEnd,
                label.side === "above" && styles.sideAbove,
              )}
              style={at(label.at, arrives(label.piece < 0 ? 0 : ends(label.piece)))}
            >
              <p className={styles.placeName}>{place.name}</p>
              <p className={styles.placeNote}>{place.note}</p>
            </div>
          );
        })}

        {road.delays.map((delay, i) => {
          const label = DELAY_LABELS[i];
          return (
            <div
              key={delay.name}
              className={cx(styles.delayLabel, styles.arrive, label.side === "above" ? styles.sideAbove : styles.sideBelow)}
              style={at(label.at, arrives(ends(pieceOfDelay(i))))}
            >
              <p className={styles.delayName}>{delay.name}</p>
              <p className={styles.delayDetail}>{delay.note}</p>
            </div>
          );
        })}
      </DrawnFigure>

      {/* Below xl: the journey in order. */}
      <ol className={styles.list}>
        {SEQUENCE.map((step) =>
          step.kind === "place" ? (
            <li key={`p${step.i}`} className={styles.listPlace}>
              <p className={styles.placeName}>{road.places[step.i].name}</p>
              <p className={styles.placeNote}>{road.places[step.i].note}</p>
            </li>
          ) : (
            <li key={`d${step.i}`} className={styles.listDelay}>
              <span className={styles.listMark} aria-hidden="true">
                {step.i + 1}
              </span>
              <p className={styles.delayName}>{road.delays[step.i].name}</p>
              <p className={styles.delayDetail}>{road.delays[step.i].note}</p>
            </li>
          ),
        )}
        <li className={cx(styles.listPlace, styles.listEnd)}>
          <p className={styles.placeName}>{road.end}</p>
        </li>
      </ol>

      <div className={styles.caption}>
        <p className={styles.legend} aria-hidden="true">
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchRoad)} />
            {road.legend.road}
          </span>
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchDelay)} />
            {road.legend.delay}
          </span>
          <span className={styles.key}>
            <span className={styles.swatchEnd} />
            {road.end}
          </span>
        </p>
        <p className={styles.source}>{road.caption}</p>
      </div>
    </div>
  );
}
