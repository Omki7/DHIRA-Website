import type { CSSProperties } from "react";
import type { EisOnePictureFigure } from "@/content/pages/solutions-eis";
import { DrawnFigure } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./EisOnePicture.module.scss";

/*
 * [02] The constellation (5 Nov 2026; reworked after the critique the same
 * day). One client at the centre and, around it, the records that touch it,
 * one family per department. What only Enterprise Intelligence can draw is
 * the solid blue chain: the links ACROSS departments, in causal order (a
 * leave delays a milestone, the milestone moves the forecast, the forecast
 * puts the renewal at risk), looping round the client without crossing it.
 * Spokes to the client are lighter; each family's second record hangs off
 * its first on a dashed line. Behind it, a thin field of the rest of the
 * business, kept clear of every label. Lines draw once, in view; final
 * state under reduced motion and without JS.
 *
 * From lg: an SVG in a fixed 1000 by 540 box with HTML labels placed in the
 * same proportions, so text stays at native size. Below lg: the chain as a
 * numbered sequence (the order is real), then the other linked records.
 */

const W = 1000;
const H = 540;
const CENTRE: [number, number] = [500, 270];

type FamilyKey = EisOnePictureFigure["families"][number]["key"];
type Side = "left" | "right";
type Point = [number, number];

/* Each family's place: its link in the chain (near), its second record
   (far), the side its labels open towards, and the bow that keeps the
   dashed near-to-far line clear of the near record's label. */
const PLACES: Record<FamilyKey, { near: Point; far: Point; side: Side; bow: number }> = {
  people: { near: [690, 410], far: [792, 324], side: "right", bow: -0.18 },
  work: { near: [690, 130], far: [792, 216], side: "right", bow: 0.18 },
  money: { near: [310, 130], far: [208, 216], side: "left", bow: -0.18 },
  sales: { near: [310, 410], far: [208, 324], side: "left", bow: 0.18 },
};

const r1 = (n: number) => Math.round(n * 10) / 10;

/* A deterministic field of the rest of the business, the same on the
   server and in the browser, kept clear of the client and every record. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField() {
  const rand = mulberry32(258);
  const keepClear: Point[] = Object.values(PLACES).flatMap((p) => [p.near, p.far]);
  const hubs: Point[] = [
    [250, 160],
    [752, 160],
    [752, 420],
    [250, 420],
  ];
  const dots: { x: number; y: number; r: number }[] = [];
  for (const [hx, hy] of hubs) {
    for (let i = 0; i < 26; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = Math.sqrt(rand());
      const x = hx + Math.cos(angle) * dist * 230;
      const y = hy + Math.sin(angle) * dist * 130;
      if (y < 8 || y > H - 8) continue;
      if (Math.hypot(x - CENTRE[0], y - CENTRE[1]) < 170) continue;
      if (keepClear.some(([kx, ky]) => Math.abs(x - kx) < 175 && Math.abs(y - ky) < 46)) continue;
      dots.push({ x: r1(x), y: r1(y), r: r1(1.3 + rand() * 1.1) });
    }
  }
  const links: [number, number, number, number][] = [];
  dots.forEach((a, i) => {
    let best = -1;
    let bestD = Infinity;
    dots.forEach((b, j) => {
      if (j <= i) return;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    });
    if (best >= 0 && bestD < 60) links.push([a.x, a.y, dots[best].x, dots[best].y]);
  });
  return { dots, links };
}

const FIELD = buildField();

/* A curve from a to b, bowed by `bow` of its length to the left of travel. */
function curve([ax, ay]: Point, [bx, by]: Point, bow: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  return `M${ax} ${ay} Q${r1(mx - (by - ay) * bow)} ${r1(my + (bx - ax) * bow)} ${bx} ${by}`;
}

const at = (x: number, y: number, extra?: Record<string, string>) =>
  ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%`, ...extra }) as CSSProperties;
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/* The chain's three legs, outside the client: up the right, across the
   top, down the left. Bows push each leg away from the centre. */
const CHAIN_BOW = 0.15;

/* The answer in money: each figure stays whole on its line. */
function Answer({ text }: { text: string }) {
  const parts = text.split(" · ");
  return (
    <p className={styles.answer}>
      {parts.map((part, i) => (
        <span key={part} className={styles.answerPart}>
          {part}
          {i < parts.length - 1 && " · "}
        </span>
      ))}
    </p>
  );
}

export interface OnePictureFieldProps {
  figure: EisOnePictureFigure;
}

export function OnePictureField({ figure }: OnePictureFieldProps) {
  const chain = figure.families.map((f) => PLACES[f.key].near);
  return (
    <div className={styles.figure}>
      <div className={styles.ask}>
        <svg viewBox="0 0 16 16" className={styles.askIcon} aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" />
        </svg>
        {figure.question}
      </div>

      {/* From lg: the constellation. */}
      <DrawnFigure className={styles.stage} threshold={0.35}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <g className={styles.field}>
            {FIELD.links.map(([x1, y1, x2, y2], i) => (
              <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} className={styles.fieldLink} />
            ))}
            {FIELD.dots.map((dot, i) => (
              <circle key={`d${i}`} cx={dot.x} cy={dot.y} r={dot.r} className={styles.fieldDot} />
            ))}
          </g>

          {figure.families.map((family, i) => {
            const place = PLACES[family.key];
            return (
              <g key={family.key}>
                <path d={curve(CENTRE, place.near, 0)} pathLength={1} className={styles.spoke} style={delay(0.3 + i * 0.08)} />
                <path
                  d={curve(place.near, place.far, place.bow)}
                  className={styles.farLink}
                  style={delay(1.6 + i * 0.08)}
                />
              </g>
            );
          })}

          {chain.slice(1).map((point, i) => (
            <path
              key={`chain-${i}`}
              d={curve(chain[i], point, CHAIN_BOW)}
              pathLength={1}
              className={styles.chainLink}
              style={delay(0.8 + i * 0.35)}
            />
          ))}

          {figure.families.map((family, i) => {
            const place = PLACES[family.key];
            return (
              <g key={`n-${family.key}`}>
                <circle cx={place.near[0]} cy={place.near[1]} r={7} className={styles.nodeNear} style={delay(0.7 + i * 0.35)} />
                <circle cx={place.far[0]} cy={place.far[1]} r={4.5} className={styles.nodeFar} style={delay(1.7 + i * 0.08)} />
              </g>
            );
          })}

          <circle cx={CENTRE[0]} cy={CENTRE[1]} r={28} className={styles.centreHalo} />
          <circle cx={CENTRE[0]} cy={CENTRE[1]} r={10} className={styles.centreNode} />
        </svg>

        <div className={styles.centre} style={at(CENTRE[0], CENTRE[1] + 38)}>
          <p className={styles.centreName}>{figure.centre.name}</p>
          <p className={styles.centreNote}>{figure.centre.note}</p>
          <Answer text={figure.answer} />
        </div>

        {figure.families.flatMap((family, i) => {
          const place = PLACES[family.key];
          return family.records.map((record, j) => {
            const [x, y] = j === 0 ? place.near : place.far;
            return (
              <div
                key={`${family.key}-${j}`}
                className={cx(styles.record, place.side === "left" ? styles.recordLeft : styles.recordRight, j === 1 && styles.recordFar)}
                style={at(x, y, { "--d": `${j === 0 ? 0.75 + i * 0.35 : 1.75 + i * 0.08}s` })}
              >
                {j === 0 && (
                  <p className={styles.family}>
                    <span className={styles.step}>{i + 1}</span>
                    {family.name} · {family.source}
                  </p>
                )}
                <p className={styles.recordTitle}>{record.title}</p>
                <p className={styles.recordDetail}>{record.detail}</p>
              </div>
            );
          });
        })}
      </DrawnFigure>

      {/* Below lg: the chain in order, then the other linked records. */}
      <div className={styles.list}>
        <div className={styles.listCentre}>
          <p className={styles.centreName}>{figure.centre.name}</p>
          <Answer text={figure.answer} />
        </div>
        <ol className={styles.listChain}>
          {figure.families.map((family, i) => (
            <li key={family.key} className={styles.listLink}>
              <p className={styles.family}>
                <span className={styles.step}>{i + 1}</span>
                {family.name} · {family.source}
              </p>
              <p className={styles.recordTitle}>{family.records[0].title}</p>
              <p className={styles.recordDetail}>{family.records[0].detail}</p>
            </li>
          ))}
        </ol>
        <p className={styles.listOthersLabel}>{figure.legend.client}</p>
        <ul className={styles.listOthers}>
          {figure.families.map((family) => (
            <li key={family.key}>
              <p className={styles.recordTitle}>{family.records[1].title}</p>
              <p className={styles.recordDetail}>{family.records[1].detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.caption}>
        <p className={styles.legend} aria-hidden="true">
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchChain)} />
            {figure.legend.chain}
          </span>
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchClient)} />
            {figure.legend.client}
          </span>
        </p>
        <p className={styles.chainNote}>{figure.chain}</p>
      </div>
    </div>
  );
}
