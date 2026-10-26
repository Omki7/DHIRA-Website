import type { ReactNode } from "react";
import type { InsightCover as Cover } from "@/content/collections/insights";

/*
 * DESIGN INTENT:
 * The Insights cover plates (26 Oct 2026, user: "make it class leading and
 * feel like gallery"; reference: Linear Now's generative line covers). Each
 * essay gets one abstract line drawing of its argument, drawn the same way so
 * the library reads as a series: hairlines in the theme's line colours on an
 * opaque panel, one blue accent that carries the point. No icons, no charts,
 * no figures: these are illustrations, never data (Rule 4).
 *
 * Geometry is computed, never random, so server and client agree. Strokes do
 * not scale with the plate, so a thumbnail and the article's wide cover keep
 * the same hairline. Every drawing keeps its subject inside the middle band
 * of the 640 x 400 field, which `slice` crops to 4:3, 8:5 or 21:9.
 */

type Point = [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const path = (points: Point[]) => points.map(([x, y], i) => `${i ? "L" : "M"}${round(x)} ${round(y)}`).join("");
const range = (count: number) => Array.from({ length: count }, (_, i) => i);

/** 45 degree hatching clipped to a rectangle. */
function hatch(x: number, y: number, w: number, h: number, step: number) {
  let d = "";
  for (let k = step; k < w + h; k += step) {
    d += `M${round(x + Math.min(k, w))} ${round(y + Math.max(0, k - w))}L${round(x + Math.max(0, k - h))} ${round(y + Math.min(k, h))}`;
  }
  return d;
}

const HAIR = "stroke-line";
const MID = "stroke-inkSoft";
const ACCENT = "stroke-blue";

/* Who owns Monday morning: the pilot loops on itself, hands over at one
   point and runs on as a weekly service. */
function Handoff() {
  const coil = range(451).map((i): Point => {
    const t = 0.5 + i / 100;
    return [120 + 40 * t + 24 * Math.cos(2 * Math.PI * t), 200 - 70 * Math.sin(2 * Math.PI * t)];
  });
  return <>
    <path d={path(coil)} className={MID} />
    <path d="M344 200H580" className={ACCENT} strokeWidth={1.5} />
    {range(7).map(i => <path key={i} d={i ? `M${384 + i * 30} 191V209` : "M384 180V220"} className={i ? MID : ACCENT} strokeWidth={i ? 1 : 1.5} />)}
    <circle cx="344" cy="200" r="4.5" className="fill-blue" stroke="none" />
  </>;
}

/* Three revenue numbers: three ring fields that overlap, and the bridge
   drawn between their centres. */
function Definitions() {
  const centres: Point[] = [[262, 156], [378, 156], [320, 252]];
  return <>
    {centres.map(([cx, cy]) => range(9).map(k => <circle key={`${cx}-${cy}-${k}`} cx={cx} cy={cy} r={84 - k * 9} className={k ? HAIR : MID} />))}
    <path d={`${path(centres)}Z`} className={ACCENT} strokeWidth={1.5} />
    {centres.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-blue" stroke="none" />)}
  </>;
}

/* An agent's authority: the agent works its field, stops at the line and
   waits at the gate for a person to decide. */
function Authority() {
  return <>
    {range(13).map(c => range(12).map(r => <path key={`${c}-${r}`} d={`M${90 + c * 20} ${95 + r * 20}L${100 + c * 20} ${85 + r * 20}`} className={HAIR} />))}
    <path d="M384 70V184M384 216V330M376 184H392M376 216H392" className={MID} strokeWidth={1.25} />
    <circle cx="358" cy="200" r="4.5" className="fill-blue" stroke="none" />
    <path d="M368 200H468" className={ACCENT} strokeWidth={1.5} strokeDasharray="3 5" />
    <circle cx="486" cy="200" r="14" className={MID} />
    <circle cx="486" cy="200" r="3" className="fill-inkSoft" stroke="none" />
  </>;
}

/* A knowledge layer: three names resolve to one entity, which connects to
   everything else the question needs. */
function Connections() {
  const names: Point[] = [[160, 120], [160, 200], [160, 280]];
  const entity: Point = [280, 200];
  const nodes: Point[] = [[400, 120], [400, 280], [480, 200], [560, 160], [520, 320], [480, 80]];
  const edges: [Point, Point][] = [[entity, nodes[0]], [entity, nodes[1]], [nodes[0], nodes[2]], [nodes[1], nodes[2]], [nodes[2], nodes[3]], [nodes[1], nodes[4]], [nodes[0], nodes[5]]];
  return <>
    {range(13).map(i => range(7).map(j => <circle key={`${i}-${j}`} cx={80 + i * 40} cy={80 + j * 40} r="1.5" className="fill-line" stroke="none" />))}
    {edges.map(([a, b]) => <path key={`${a}-${b}`} d={path([a, b])} className={MID} />)}
    {names.map(n => <path key={`l-${n}`} d={path([n, entity])} className={ACCENT} strokeWidth={1.25} />)}
    {nodes.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className={`fill-primary-bg ${MID}`} />)}
    {names.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" className={`fill-primary-bg ${ACCENT}`} strokeWidth={1.5} />)}
    <circle cx={entity[0]} cy={entity[1]} r="7" className="fill-blue" stroke="none" />
  </>;
}

/* The cost of an answer: the token price is the tip above the waterline;
   the review, the retries and the exceptions sit below it. */
function Economics() {
  const lines: string[] = [];
  for (let y = 160; y <= 336; y += 8) {
    const w = 36 + 190 * Math.sin((Math.PI * (y - 150)) / 196);
    lines.push(`M${round(320 - w)} ${y}H${round(320 + w)}`);
  }
  return <>
    <path d={lines.join("")} className={HAIR} />
    <path d="M60 150H580" className={MID} />
    <path d="M286 150L320 108L354 150" className={ACCENT} strokeWidth={1.5} />
  </>;
}

/* Inherited permissions: a library of documents, a few restricted, and the
   assistant's lens landing on one of them. */
function Permissions() {
  const restricted = new Set(["1-0", "3-1", "2-2", "7-0", "8-3", "0-3", "5-2"]);
  const cell = (c: number, r: number) => [82 + c * 54, 81 + r * 62] as const;
  return <>
    {range(9).map(c => range(4).map(r => {
      const [x, y] = cell(c, r);
      const locked = restricted.has(`${c}-${r}`);
      return <g key={`${c}-${r}`}>
        <rect x={x} y={y} width="44" height="52" rx="3" className={locked ? MID : HAIR} />
        {locked ? <path d={hatch(x, y, 44, 52, 7)} className={HAIR} /> : <path d={`M${x + 9} ${y + 14}H${x + 30}M${x + 9} ${y + 22}H${x + 35}`} className={HAIR} />}
      </g>;
    }))}
    <rect x="352" y="205" width="44" height="52" rx="3" className={ACCENT} strokeWidth={1.5} />
    <circle cx="374" cy="231" r="92" className={ACCENT} strokeWidth={1.5} />
  </>;
}

/* Build or buy: two sets of responsibilities that interlock, and the seam
   where they meet. */
function Ownership() {
  return <>
    {range(21).map(i => {
      const d = 46 * (1 - ((i - 10) / 10) ** 2);
      return <g key={i}>
        <path d={`M${140 + i * 18} 78V${round(200 + d)}`} className={MID} />
        <path d={`M${149 + i * 18} ${round(200 - d)}V322`} className={HAIR} />
      </g>;
    })}
    <path d="M120 200H530" className={ACCENT} strokeWidth={1.5} />
    <circle cx="120" cy="200" r="3.5" className="fill-blue" stroke="none" />
    <circle cx="530" cy="200" r="3.5" className="fill-blue" stroke="none" />
  </>;
}

/* A missing record: a population of records, one place left empty, and a
   total that cannot see it. */
function Inclusion() {
  return <>
    {range(15).map(i => range(7).map(j => i === 10 && j === 3 ? null : <circle key={`${i}-${j}`} cx={110 + i * 30} cy={110 + j * 30} r="2.4" className="fill-inkSoft" stroke="none" />))}
    <circle cx="410" cy="200" r="8" className={ACCENT} strokeWidth={1.5} strokeDasharray="2 3" />
    <path d="M110 318H530M110 312V324M530 312V324" className={MID} />
  </>;
}

/* Groundwork laid once: shared strata, and three use cases standing on
   them, the second one built on what the first left behind. */
function Foundation() {
  const towers: [number, number][] = [[200, 140], [320, 96], [440, 160]];
  return <>
    {range(11).map(k => <path key={k} d={`M90 ${250 + k * 8}H550`} className={k ? HAIR : MID} />)}
    {towers.map(([c, top], t) => <g key={c}>
      {range(5).map(m => <path key={m} d={`M${c - 12 + m * 6} ${top}V250`} className={t === 1 ? ACCENT : MID} strokeWidth={t === 1 ? 1.25 : 1} />)}
      <path d={`M${c - 18} ${top}H${c + 18}`} className={t === 1 ? ACCENT : MID} strokeWidth={1.5} />
    </g>)}
  </>;
}

/* What goes live: nested boundaries, from the organisation's edge in to the
   one configured service the evaluation accepts. */
function Deployment() {
  const frames: [number, number, string, string?][] = [[440, 250, HAIR, "4 6"], [352, 194, HAIR], [264, 138, MID], [176, 82, ACCENT]];
  return <>
    <path d="M48 200H592" className={HAIR} />
    {frames.map(([w, h, tone, dash], i) => <rect key={w} x={320 - w / 2} y={200 - h / 2} width={w} height={h} rx={10 - i * 2} className={`fill-primary-bg ${tone}`} strokeDasharray={dash} strokeWidth={tone === ACCENT ? 1.5 : 1} />)}
    <path d="M232 200H408" className={HAIR} />
    <circle cx="320" cy="200" r="4.5" className="fill-blue" stroke="none" />
  </>;
}

/* A better forecast: one history, a fan of possible futures, and the order
   deadline that cuts across them. */
function Forecast() {
  const history: Point[] = [262, 248, 256, 240, 250, 232, 238, 224, 232, 216, 222, 210].map((y, i): Point => [80 + i * 20, y]);
  return <>
    {range(15).map(k => <path key={k} d={`M300 210L560 ${round(110 + (k * 200) / 14)}`} className={k === 7 ? MID : HAIR} />)}
    <path d={path(history)} className={MID} strokeWidth={1.25} />
    <path d="M430 84V324M424 84H436" className={ACCENT} strokeWidth={1.5} />
    <circle cx="300" cy="210" r="3.5" className="fill-inkSoft" stroke="none" />
  </>;
}

/* What changed in the business: many lines of activity pass through one
   aperture and leave as a single outcome. */
function Evidence() {
  return <>
    {range(17).map(k => <path key={k} d={`M70 ${80 + k * 15}L360 200`} className={HAIR} />)}
    <path d="M360 96V186M360 214V304" className={MID} strokeWidth={1.25} />
    <path d="M360 200H556" className={ACCENT} strokeWidth={1.5} />
    <path d="M420 194V206M470 194V206M520 194V206" className={MID} />
    <rect x="556" y="196" width="8" height="8" className="fill-blue" stroke="none" />
  </>;
}

const PLATES: Record<Cover, () => ReactNode> = {
  handoff: Handoff,
  definitions: Definitions,
  authority: Authority,
  connections: Connections,
  economics: Economics,
  permissions: Permissions,
  ownership: Ownership,
  inclusion: Inclusion,
  foundation: Foundation,
  deployment: Deployment,
  forecast: Forecast,
  evidence: Evidence,
};

export default function InsightCover({ kind, className = "" }: { kind: Cover; className?: string }) {
  const Plate = PLATES[kind];
  return (
    <div aria-hidden="true" className={`overflow-hidden bg-primary-bg ${className}`}>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] [&_*]:[vector-effect:non-scaling-stroke]"
      >
        <Plate />
      </svg>
    </div>
  );
}
