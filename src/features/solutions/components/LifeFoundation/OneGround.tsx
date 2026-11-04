import type { CSSProperties } from "react";
import type { LifePage } from "@/content/pages/solutions-life";
import { AkashicWordmark } from "@/shared/components/icons";
import { cx } from "@/shared/utils/cx";
import { measurePath, mulberry32, PEN_PACE, type Point } from "../../utils/land";
import styles from "./LifeFoundation.module.scss";

/*
 * [06] One ground (5 Nov 2026, docs/LIFE_PAGE_SCRIPT.md; reworked after
 * the section's critique the same day). The ground line is the Akashic
 * foundation. Above it, the two national programmes have grown tall, with
 * twigs on their branches and their figures at the crown; Akashic Life is
 * the young growth, in blue. Below it, one root system: Master Data and
 * Governance run under all three (the customer stories list both for each
 * programme), and Machine Learning is Akashic Life's own new root. The
 * drawing says the headline: proven roots, one new one.
 *
 * The same pen as the rest of the page: the ground, then the proven
 * growths, then the new one and its roots; the figures are there from the
 * start, because they are the proof. An SVG in a fixed 1200 by 500 box
 * with HTML labels placed in the same proportions; the parent shows it
 * from xl.
 */

const W = 1200;
const H = 500;
const GROUND = 300;
const ROOT_TIP_Y = 420;

/* Each growth's trunk, and how tall it stands. */
const GROWTHS = [
  { x: 300, height: 196 },
  { x: 620, height: 196 },
  { x: 940, height: 124 },
];
const LIFE = 2;

/* The modules, as root tips, in content order: Master Data, Governance,
   Machine Learning. */
const TIPS: Point[] = [
  [520, ROOT_TIP_Y],
  [780, ROOT_TIP_Y],
  [1060, ROOT_TIP_Y],
];

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

interface Growth {
  trunk: string;
  branches: string[];
  twigs: string[];
  buds: Point[];
  crown: Point;
}

/* A growth: a trunk that leans a little, branches off it in turn and, on
   the older growths, a twig off each branch. Seeded, so server and
   browser agree. */
function grow(x: number, height: number, seed: number, mature: boolean): Growth {
  const rand = mulberry32(seed);
  const top = GROUND - height;
  const lean = (rand() - 0.5) * 18;
  const trunk = `M${x} ${GROUND} C${r1(x + lean)} ${r1(GROUND - height * 0.4)}, ${r1(x - lean)} ${r1(top + height * 0.4)}, ${r1(x + lean * 0.4)} ${top}`;
  const count = mature ? 7 : 5;
  const branches: string[] = [];
  const twigs: string[] = [];
  const buds: Point[] = [];
  for (let i = 0; i < count; i++) {
    const y = GROUND - 26 - ((height - 44) * i) / (count - 1);
    const side = i % 2 === 0 ? 1 : -1;
    const reach = (mature ? 40 : 28) + rand() * 36 - i * 2;
    const lift = 14 + rand() * 24;
    const sx = x + lean * ((GROUND - y) / height) * 0.5;
    const ex = sx + side * reach;
    const ey = y - lift;
    branches.push(
      `M${r1(sx)} ${r1(y)} C${r1(sx + side * reach * 0.4)} ${r1(y)}, ${r1(ex)} ${r1(ey + lift * 0.6)}, ${r1(ex)} ${r1(ey)}`,
    );
    buds.push([r1(ex), r1(ey)]);
    if (mature) {
      const mx = sx + side * reach * 0.6;
      const my = y - lift * 0.45;
      const tx = mx + side * (10 + rand() * 12);
      const ty = my - (14 + rand() * 12);
      twigs.push(`M${r1(mx)} ${r1(my)} C${r1(mx)} ${r1(my - 6)}, ${r1(tx)} ${r1(ty + 6)}, ${r1(tx)} ${r1(ty)}`);
      buds.push([r1(tx), r1(ty)]);
    }
  }
  return { trunk, branches, twigs, buds, crown: [r1(x + lean * 0.4), top] };
}

const TREES = GROWTHS.map((g, i) => grow(g.x, g.height, 61 + i * 17, i !== LIFE));

/* A root from a trunk's foot down to a module, curling as it goes. */
const root = (fx: number, [tx, ty]: Point) => `M${fx} ${GROUND} C${fx} ${GROUND + 60}, ${tx} ${ty - 70}, ${tx} ${ty}`;

/* The programmes reach the two shared modules; Akashic Life reaches all three. */
const QUIET_ROOTS = GROWTHS.slice(0, LIFE).flatMap((g) => [root(g.x, TIPS[0]), root(g.x, TIPS[1])]);
const LIFE_ROOTS = TIPS.map((tip) => root(GROWTHS[LIFE].x, tip));

/* --- The pen -------------------------------------------------------------- */
const timeOf = (d: string) => r2(measurePath(d) / PEN_PACE);
const pen = (start: number, time: number) => ({ "--d": `${r2(start)}s`, "--t": `${time}s` }) as CSSProperties;
const lands = (seconds: number) => ({ "--d": `${r2(seconds)}s` }) as CSSProperties;

const GROUND_TIME = 1;
const PROVEN_START = 0.3;
const LIFE_START = PROVEN_START + 0.3;

/* When each tree starts, when its branches start and when it is finished. */
const SCHEDULE = TREES.map((tree, i) => {
  const start = i === LIFE ? LIFE_START : PROVEN_START;
  const trunkTime = timeOf(tree.trunk);
  const branchStart = start + trunkTime;
  const branchTime = Math.max(...tree.branches.map(timeOf));
  const twigStart = branchStart + branchTime;
  const twigTime = tree.twigs.length ? Math.max(...tree.twigs.map(timeOf)) : 0;
  return { start, trunkTime, branchStart, twigStart, done: twigStart + twigTime };
});
const LIFE_ROOT_START = LIFE_START + SCHEDULE[LIFE].trunkTime + 0.1;
const LIFE_ROOT_TIME = Math.max(...LIFE_ROOTS.map(timeOf));
const ROOTS_DONE = LIFE_ROOT_START + LIFE_ROOT_TIME + 0.08;

const at = ([x, y]: Point, extra?: CSSProperties) =>
  ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%`, ...extra }) as CSSProperties;

export interface OneGroundProps {
  content: LifePage["foundation"];
}

export function OneGround({ content }: OneGroundProps) {
  return (
    <div className={styles.ground}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        {QUIET_ROOTS.map((d, i) => (
          <path key={`q${i}`} d={d} className={cx(styles.rootQuiet, styles.lands)} style={lands(PROVEN_START)} />
        ))}
        {LIFE_ROOTS.map((d, i) => (
          <path
            key={`l${i}`}
            d={d}
            pathLength={1}
            className={cx(styles.rootLife, styles.pen)}
            style={pen(LIFE_ROOT_START, timeOf(d))}
          />
        ))}
        {TIPS.map(([x, y], i) => (
          <circle
            key={`tip${i}`}
            cx={x}
            cy={y}
            r={4.5}
            className={cx(styles.rootTip, styles.lands)}
            style={lands(ROOTS_DONE)}
          />
        ))}

        {TREES.map((tree, i) => {
          const s = SCHEDULE[i];
          return (
            <g key={i} className={cx(styles.tree, i === LIFE && styles.treeLife)}>
              <path
                d={tree.trunk}
                pathLength={1}
                className={cx(styles.trunk, styles.pen)}
                style={pen(s.start, s.trunkTime)}
              />
              {tree.branches.map((d, j) => (
                <path
                  key={j}
                  d={d}
                  pathLength={1}
                  className={cx(styles.branch, styles.pen)}
                  style={pen(s.branchStart, timeOf(d))}
                />
              ))}
              {tree.twigs.map((d, j) => (
                <path
                  key={`t${j}`}
                  d={d}
                  pathLength={1}
                  className={cx(styles.branch, styles.pen)}
                  style={pen(s.twigStart, timeOf(d))}
                />
              ))}
              {tree.buds.map(([x, y], j) => (
                <circle key={`b${j}`} cx={x} cy={y} r={2.6} className={cx(styles.bud, styles.lands)} style={lands(s.done)} />
              ))}
              <circle
                cx={tree.crown[0]}
                cy={tree.crown[1]}
                r={i === LIFE ? 6 : 4.5}
                className={cx(styles.crown, styles.lands)}
                style={lands(s.start + s.trunkTime)}
              />
            </g>
          );
        })}

        <path
          d={`M0 ${GROUND}H${W}`}
          pathLength={1}
          className={cx(styles.groundLine, styles.pen)}
          style={pen(0, GROUND_TIME)}
        />
      </svg>

      {content.programmes.map((programme, i) => (
        <div
          key={programme.name}
          className={cx(styles.crownLabel, styles.lands)}
          style={at([GROWTHS[i].x, GROUND - GROWTHS[i].height - 22], lands(0.2))}
        >
          <p className={styles.figure}>{programme.figure}</p>
          <p className={styles.figureLabel}>{programme.label}</p>
          <p className={styles.programme}>{programme.name}</p>
        </div>
      ))}
      <div
        className={cx(styles.crownLabel, styles.lands)}
        style={at([GROWTHS[LIFE].x, GROUND - GROWTHS[LIFE].height - 22], lands(LIFE_START + SCHEDULE[LIFE].trunkTime))}
      >
        <p className={styles.lifeName}>{content.life.name}</p>
        <p className={styles.lifeLabel}>{content.life.label}</p>
      </div>

      <p className={cx(styles.groundLabel, styles.lands)} style={at([0, GROUND + 12], lands(0.4))}>
        <AkashicWordmark />
        <span className={styles.groundNote}>{content.ground}</span>
      </p>

      {content.roots.map((r, i) => (
        <div
          key={r.module}
          className={cx(styles.rootLabel, styles.lands)}
          style={at([TIPS[i][0], TIPS[i][1] + 14], lands(ROOTS_DONE))}
        >
          <p className={styles.module}>{r.module}</p>
          <p className={styles.moduleName}>{r.name}</p>
        </div>
      ))}
    </div>
  );
}
