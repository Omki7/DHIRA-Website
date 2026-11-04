import type { CSSProperties } from "react";
import { cx } from "@/shared/utils/cx";
import { measurePath, mulberry32, PEN_PACE, type Point } from "../../utils/land";
import styles from "./LifeLevels.module.scss";

/*
 * [05] The watershed (5 Nov 2026, docs/LIFE_PAGE_SCRIPT.md; reworked after
 * the section's critique the same day). Read left to right: fine brooks
 * (one per visit) rise from a field of homes, join at the health centres,
 * merge into the district and run on into the state, where other
 * districts' rivers join. The one blue channel is Meena's reading from
 * [04]. A hairline marks where names stop: left of it her reading is named
 * (solid), right of it it is anonymised (dashed), and the district and
 * state nodes are rings. That is the coda, drawn.
 *
 * The same pen as [01] and [04]: one pace by distance, linear, revealed
 * through a mask; each node lights as the pen reaches it. The tiers sit
 * over the four seat columns below. An SVG in a fixed 1200 by 300 box,
 * aria-hidden: each seat carries its tier in text. Seeded, so the server
 * and the browser draw the same field.
 */

const W = 1200;
const H = 300;
const BOUNDARY = 600;

/* One node per tier, centred over its seat column (12.5%, 37.5%...). */
const MEENA: Point = [150, 132];
const CENTRES: Point[] = [
  [450, 66],
  [450, 162],
  [450, 238],
];
const DISTRICT: Point = [750, 144];
const OTHER_DISTRICTS: Point[] = [
  [750, 36],
  [750, 264],
];
const STATE: Point = [1050, 150];

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

/* The curve from a to b: leaves level, arrives level, so brooks join their
   river smoothly. `wander` bows the first half, so brooks meander. */
const segment = ([ax, ay]: Point, [bx, by]: Point, wander = 0) => {
  const k = (bx - ax) * 0.55;
  return `C${r1(ax + k)} ${r1(ay + wander)}, ${r1(bx - k)} ${r1(by)}, ${bx} ${by}`;
};
const stream = (a: Point, b: Point, wander = 0) => `M${r1(a[0])} ${r1(a[1])} ${segment(a, b, wander)}`;

/* The homes: a scattered field, each draining to its nearest centre. */
function buildHomes() {
  const rand = mulberry32(31);
  const homes: { at: Point; centre: Point; wander: number }[] = [];
  while (homes.length < 38) {
    const x = 28 + rand() * 250;
    const y = 18 + rand() * 264;
    if (Math.hypot(x - MEENA[0], y - MEENA[1]) < 26) continue;
    const centre = CENTRES.reduce((best, c) => (Math.abs(c[1] - y) < Math.abs(best[1] - y) ? c : best));
    homes.push({ at: [r1(x), r1(y)], centre, wander: r1((rand() - 0.5) * 70) });
  }
  return homes;
}

/* The other districts' own catchments: a few rivers arriving from upstream. */
function buildFeeders() {
  const rand = mulberry32(77);
  return OTHER_DISTRICTS.flatMap((district) =>
    Array.from({ length: 6 }, () => {
      const from: Point = [r1(548 + rand() * 60), r1(district[1] + (rand() - 0.5) * 56)];
      return stream(from, district, r1((rand() - 0.5) * 24));
    }),
  );
}

const HOMES = buildHomes();
const FEEDERS = buildFeeders();

/* Meena's reading: one path, three legs, so the pen can pace it. */
const LEGS = [
  [MEENA, CENTRES[1]],
  [CENTRES[1], DISTRICT],
  [DISTRICT, STATE],
] as const;
const CHANNEL = `M${MEENA[0]} ${MEENA[1]} ${LEGS.map(([a, b]) => segment(a, b)).join(" ")}`;

const START = 0.4;
const LEG_TIMES = LEGS.map(([a, b]) => measurePath(stream(a, b)) / PEN_PACE);
const REACHES = LEG_TIMES.reduce<number[]>((acc, t) => [...acc, r2((acc[acc.length - 1] ?? START) + t)], []);
const PEN = { "--d": `${START}s`, "--t": `${r2(REACHES[2] - START)}s` } as CSSProperties;
const lights = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

const TIER_X = [MEENA[0], CENTRES[0][0], DISTRICT[0], STATE[0]];

const at = ([x, y]: Point) => ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%` }) as CSSProperties;

export interface WatershedProps {
  tiers: string[];
  boundary: { named: string; anonymised: string };
}

export function Watershed({ tiers, boundary }: WatershedProps) {
  return (
    <div className={styles.watershed} aria-hidden="true">
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} focusable="false">
        <defs>
          <mask id="life-levels-pen" maskUnits="userSpaceOnUse">
            {/* Functional mask: white reveals her reading as the pen passes. */}
            <path
              d={CHANNEL}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={8}
              strokeLinecap="round"
              className={styles.pen}
              style={PEN}
            />
          </mask>
          <clipPath id="life-levels-named">
            <rect x={-20} y={-20} width={BOUNDARY + 20} height={H + 40} />
          </clipPath>
          <clipPath id="life-levels-anonymised">
            <rect x={BOUNDARY} y={-20} width={W - BOUNDARY + 40} height={H + 40} />
          </clipPath>
        </defs>

        <g className={styles.streams}>
          {HOMES.map((home, i) => (
            <path key={i} d={stream(home.at, home.centre, home.wander)} className={styles.brook} />
          ))}
          {FEEDERS.map((d, i) => (
            <path key={`f${i}`} d={d} className={styles.brook} />
          ))}
          {CENTRES.map((centre, i) => (
            <path key={`c${i}`} d={stream(centre, DISTRICT)} className={styles.river} />
          ))}
          {OTHER_DISTRICTS.map((district, i) => (
            <path key={`d${i}`} d={stream(district, STATE)} className={styles.riverWide} />
          ))}
          <path d={stream(DISTRICT, STATE)} className={styles.riverWide} />
          {HOMES.map((home, i) => (
            <circle key={`h${i}`} cx={home.at[0]} cy={home.at[1]} r={2.4} className={styles.home} />
          ))}
          {CENTRES.map(([x, y], i) =>
            i === 1 ? null : <circle key={`cn${i}`} cx={x} cy={y} r={5.5} className={styles.node} />,
          )}
          {OTHER_DISTRICTS.map(([x, y], i) => (
            <circle key={`dn${i}`} cx={x} cy={y} r={6} className={styles.node} />
          ))}
        </g>

        {/* Where names stop. */}
        <line x1={BOUNDARY} y1={24} x2={BOUNDARY} y2={H - 8} className={styles.boundary} />

        {/* Meena's reading: named, then anonymised. */}
        <g mask="url(#life-levels-pen)">
          <path d={CHANNEL} clipPath="url(#life-levels-named)" className={styles.channel} />
          <path d={CHANNEL} clipPath="url(#life-levels-anonymised)" className={styles.channelAnonymised} />
        </g>

        <circle cx={MEENA[0]} cy={MEENA[1]} r={6} className={cx(styles.nodeLit, styles.lights)} style={lights(START)} />
        <circle
          cx={CENTRES[1][0]}
          cy={CENTRES[1][1]}
          r={7}
          className={cx(styles.nodeLit, styles.lights)}
          style={lights(REACHES[0])}
        />
        <circle
          cx={DISTRICT[0]}
          cy={DISTRICT[1]}
          r={8}
          className={cx(styles.nodeRing, styles.lights)}
          style={lights(REACHES[1])}
        />
        <circle cx={STATE[0]} cy={STATE[1]} r={9.5} className={cx(styles.nodeRing, styles.lights)} style={lights(REACHES[2])} />
      </svg>

      <p className={cx(styles.boundaryLabel, styles.boundaryNamed)} style={at([BOUNDARY, 6])}>
        {boundary.named}
      </p>
      <p className={cx(styles.boundaryLabel, styles.boundaryAnonymised)} style={at([BOUNDARY, 6])}>
        {boundary.anonymised}
      </p>

      {tiers.map((tier, i) => (
        <p key={tier} className={styles.tier} style={at([TIER_X[i], H])}>
          {tier}
        </p>
      ))}
    </div>
  );
}
