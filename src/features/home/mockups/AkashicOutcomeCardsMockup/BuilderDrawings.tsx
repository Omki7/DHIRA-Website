/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import { enter, Frame, Mono, SRC, T, W, Wipe, type Play } from "./drawingKit";
import styles from "./AkashicOutcomeCardsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* 01 Data Pipelines: three systems arrive as one view               */
/* ---------------------------------------------------------------- */
const JOIN = { x: 292, y: 75 };
const LANES = [
  { y: 24, colour: SRC.salesforce, name: "SALESFORCE", what: "82,401 orders" },
  { y: 75, colour: SRC.netsuite, name: "NETSUITE", what: "81,072 invoices" },
  { y: 126, colour: SRC.plan, name: "SALES PLAN", what: "60 targets" },
];
const lanePath = (y: number) => (y === JOIN.y ? `M -24 ${y} H ${JOIN.x}` : `M -24 ${y} H 164 C 236 ${y}, 228 ${JOIN.y}, ${JOIN.x} ${JOIN.y}`);

export function PipelinesDrawing({ play, flow }: { play: Play; flow: boolean }) {
  return (
    <Frame>
      {LANES.map((lane) => (
        <g key={lane.name}>
          <path d={lanePath(lane.y)} stroke={lane.colour} strokeWidth={1.4} strokeOpacity={0.8} />
          <circle cx={4} cy={lane.y - 13} r={2.5} fill={lane.colour} />
          <text x={12} y={lane.y - 10} fontSize={11} fill={T.body}>
            <tspan className={styles.mono} fontSize={9} letterSpacing="0.08em" fill={T.mute}>
              {lane.name}
            </tspan>
            <tspan dx={8}>{lane.what}</tspan>
          </text>
        </g>
      ))}
      <path d={`M ${JOIN.x} ${JOIN.y} H 338`} stroke={T.blue} strokeWidth={1.6} />
      <circle cx={JOIN.x} cy={JOIN.y} r={10} stroke={T.blueLine} />
      <circle cx={JOIN.x} cy={JOIN.y} r={4.5} fill={T.blue} />
      {flow &&
        LANES.map((lane, i) => (
          <circle key={lane.name} r={2.6} fill={lane.colour}>
            <animateMotion dur="2.8s" begin={`-${i * 0.9}s`} repeatCount="indefinite" path={lanePath(lane.y)} />
          </circle>
        ))}
      {flow && (
        <circle r={3} fill={T.blue}>
          <animateMotion dur="1.4s" repeatCount="indefinite" path={`M ${JOIN.x} ${JOIN.y} H 338`} />
        </circle>
      )}
      <Wipe play={play} w={338 + 24} />
      <g style={enter(play, "ps-rise", 700)}>
        <rect x={338} y={45} width={134} height={60} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <text x={352} y={71} fontSize={13} fontWeight={500} fill={T.ink}>
          Sales Performance
        </text>
        <Mono x={352} y={90} fill={T.blue}>
          ONE VIEW
        </Mono>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 02 Master Data: a customer's family tree, rolled up               */
/* ---------------------------------------------------------------- */
/* The demo world's top account ($4.2 million on the retired dashboard),
   split across the group's three companies, each held in a different
   system; the parent's bar is built from theirs. Parties are named by what
   they are, never by an invented brand (user, 22 Oct 2026). */
const FAMILY_TOTAL = 4.2;
const FAMILY = [
  { cx: 78, name: "US retail arm", value: 2.1, source: "SALESFORCE", colour: SRC.salesforce, sites: 6, label: "18 STORES" },
  { cx: 236, name: "India subsidiary", value: 1.4, source: "NETSUITE", colour: SRC.netsuite, sites: 4, label: "9 STORES" },
  { cx: 394, name: "Online business", value: 0.7, source: "SHOPIFY", colour: SRC.shopify, sites: 1, label: "1 WEBSITE" },
];
/* The parent's bar: each company's segment, in order (computed geometry). */
const FAMILY_BAR = { x: 120, w: 232 };
const FAMILY_SEGMENTS = FAMILY.map((k, i) => ({
  ...k,
  x: FAMILY_BAR.x + FAMILY.slice(0, i).reduce((sum, p) => sum + (p.value / FAMILY_TOTAL) * FAMILY_BAR.w, 0),
  w: (k.value / FAMILY_TOTAL) * FAMILY_BAR.w,
}));
const PARENT = { x: 106, w: 260, bottom: 44 };
const KID = { w: 148, top: 64, bottom: 110 };
const RAIL = 54;
const rollUp = (cx: number) => (cx === 236 ? `M 236 ${KID.top} V ${PARENT.bottom}` : `M ${cx} ${KID.top} V ${RAIL} H 236 V ${PARENT.bottom}`);

export function MasterDataDrawing({ play, flow }: { play: Play; flow: boolean }) {
  const barX = FAMILY_BAR.x;
  const barW = FAMILY_BAR.w;
  return (
    <Frame>
      <path d={FAMILY.map((k) => rollUp(k.cx)).join(" ")} stroke={T.line} strokeWidth={1.2} style={enter(play, "mm-fade", 520, 500)} />
      <circle cx={236} cy={RAIL} r={2.5} fill={T.blue} style={enter(play, "mm-fade", 520, 500)} />
      {/* Each company's revenue climbs to the group. */}
      {flow &&
        FAMILY.map((k, i) => (
          <circle key={k.name} r={2.6} fill={k.colour}>
            <animateMotion dur="2.4s" begin={`-${i * 0.8}s`} repeatCount="indefinite" path={rollUp(k.cx)} />
          </circle>
        ))}
      {FAMILY.map((k, i) => {
        const x = k.cx - KID.w / 2;
        return (
          <g key={k.name}>
            <g style={enter(play, "ps-rise", i * 120)}>
              <rect x={x} y={KID.top} width={KID.w} height={KID.bottom - KID.top} rx={9} fill={T.card} stroke={T.line} />
              <circle cx={x + 13} cy={KID.top + 16} r={3} fill={k.colour} />
              <text x={x + 22} y={KID.top + 20} fontSize={12} fontWeight={500} fill={T.ink}>
                {k.name}
              </text>
              <text x={x + 13} y={KID.top + 38} fontSize={12} fill={T.body}>
                ${k.value} million
              </text>
              <Mono x={x + KID.w - 12} y={KID.top + 37} anchor="end" size={8}>
                {k.source}
              </Mono>
            </g>
            {/* The level below: the company's stores, a dot each. */}
            <g style={enter(play, "mm-fade", 380 + i * 120, 500)}>
              <path d={`M ${k.cx} ${KID.bottom} V 122`} stroke={T.line} />
              {Array.from({ length: k.sites }, (_, s) => (
                <circle key={s} cx={k.cx + (s - (k.sites - 1) / 2) * 10} cy={126} r={2.2} fill={k.colour} fillOpacity={0.7} />
              ))}
              <Mono x={k.cx} y={145} anchor="middle" size={8}>
                {k.label}
              </Mono>
            </g>
          </g>
        );
      })}
      <g style={enter(play, "ps-rise", 760)}>
        <rect x={PARENT.x} y={0} width={PARENT.w} height={PARENT.bottom} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <text x={barX} y={18} fontSize={13} fontWeight={500} fill={T.ink}>
          Largest customer group
        </text>
        <text x={barX + barW} y={18} textAnchor="end" fontSize={13} fontWeight={600} fill={T.blue}>
          ${FAMILY_TOTAL} million
        </text>
        {FAMILY_SEGMENTS.map((k, i) => (
          <rect
            key={k.name}
            x={k.x}
            y={27}
            width={Math.max(0, k.w - 2)}
            height={6}
            rx={2}
            fill={k.colour}
            style={enter(play, "akx-fillx", 980 + i * 160, 520, "left center")}
          />
        ))}
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 03 Warehouse: the metric tree behind one number                   */
/* ---------------------------------------------------------------- */
/* Net revenue = orders × average order value, each defined once. All
   figures derive from the demo world: $25.4 million up 6.4%; 82,401
   orders up 2,113 (2.6%); so $308 per order, up 3.7%. */
const DRIVERS = [
  { y: 28, name: "Orders", value: "82,401", change: 2.6, lead: false },
  { y: 122, name: "Average order value", value: "$308", change: 3.7, lead: true },
];
const SPINE_X = 190;

export function WarehouseDrawing({ play }: { play: Play }) {
  const barX = 318;
  const barMax = 100;
  return (
    <Frame>
      <g style={enter(play, "ps-rise", 0)}>
        <rect x={0} y={40} width={160} height={70} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <Mono x={14} y={60} fill={T.blue} size={8.5}>
          NET REVENUE
        </Mono>
        <text x={14} y={84} fontSize={17} fontWeight={500} letterSpacing="-0.01em" fill={T.ink}>
          $25.4 million
        </text>
        <text x={14} y={100} fontSize={11} fill={T.body}>
          <tspan fill={T.blue} fontWeight={600}>
            +6.4%
          </tspan>{" "}
          on last quarter
        </text>
      </g>
      <path d={`M 160 75 H ${SPINE_X - 10} M ${SPINE_X} 28 V 65 M ${SPINE_X} 85 V 122 M ${SPINE_X} 28 H 210 M ${SPINE_X} 122 H 210`} stroke={T.blue} strokeWidth={1.3} />
      {/* The definition, drawn: revenue is orders times order value. */}
      <circle cx={SPINE_X} cy={75} r={10} fill={T.card} stroke={T.blueLine} />
      <text x={SPINE_X} y={79.5} textAnchor="middle" fontSize={14} fill={T.blue}>
        ×
      </text>
      <Wipe play={play} x={160} w={60} delay={250} dur={700} />
      <Mono x={barX} y={8} size={8}>
        CHANGE ON LAST QUARTER
      </Mono>
      {DRIVERS.map((d, i) => (
        <g key={d.name} style={enter(play, "ps-rise", 450 + i * 160)}>
          <text x={218} y={d.y - 8} fontSize={12} fill={T.body}>
            {d.name}
          </text>
          <text x={218} y={d.y + 14} fontSize={17} fontWeight={500} letterSpacing="-0.01em" fill={T.ink}>
            {d.value}
          </text>
          <rect x={barX} y={d.y + 4} width={barMax} height={6} rx={3} fill={T.track} />
          <rect
            x={barX}
            y={d.y + 4}
            width={(d.change / 3.7) * barMax}
            height={6}
            rx={3}
            fill={d.lead ? T.blue : T.blueLine}
            style={enter(play, "akx-fillx", 700 + i * 160, 700, "left center")}
          />
          <text x={W} y={d.y + 11} textAnchor="end" fontSize={12.5} fontWeight={d.lead ? 600 : 500} fill={d.lead ? T.blue : T.ink}>
            +{d.change}%
          </text>
        </g>
      ))}
    </Frame>
  );
}
