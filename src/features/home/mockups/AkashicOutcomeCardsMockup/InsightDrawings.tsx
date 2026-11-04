/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import { enter, Frame, H, Mono, T, W, Wipe, type Play } from "./drawingKit";
import styles from "./AkashicOutcomeCardsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* 04 Machine Learning: next quarter's units, with the likely range  */
/* ---------------------------------------------------------------- */
/* Weekly units: 14 weeks of history, then 12 forecast weeks, about 12,400
   for the quarter (the ML screen's "≈12,400 units next qtr"). The shape is
   illustrative; the quarter total and error are the screen's. */
const HISTORY = [812, 840, 826, 868, 851, 889, 874, 902, 893, 921, 905, 934, 918, 940];
const FORECAST = [942, 946, 940, 951, 955, 948, 958, 962, 955, 966, 970, 964];
const TODAY_X = 300;
const BASE_Y = 132;
const uy = (v: number) => BASE_Y - (v - 700) * 0.3;
const hx = (i: number) => (i * TODAY_X) / (HISTORY.length - 1);
const fx = (j: number) => TODAY_X + ((j + 1) * (W - TODAY_X)) / FORECAST.length;
const spread = (j: number) => 4 + 1.7 * (j + 1);

const HISTORY_PATH = HISTORY.map((v, i) => `${i ? "L" : "M"} ${hx(i).toFixed(1)} ${uy(v).toFixed(1)}`).join(" ");
const LAST = { x: TODAY_X, y: uy(HISTORY[HISTORY.length - 1]) };
const FORECAST_PATH = `M ${LAST.x} ${LAST.y.toFixed(1)} ` + FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${uy(v).toFixed(1)}`).join(" ");
const BAND_PATH =
  `M ${LAST.x} ${LAST.y.toFixed(1)} ` +
  FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${(uy(v) - spread(j)).toFixed(1)}`).join(" ") +
  " " +
  [...FORECAST.keys()]
    .reverse()
    .map((j) => `L ${fx(j).toFixed(1)} ${(uy(FORECAST[j]) + spread(j)).toFixed(1)}`)
    .join(" ") +
  " Z";

export function ForecastDrawing({ play }: { play: Play }) {
  const end = { x: fx(FORECAST.length - 1), y: uy(FORECAST[FORECAST.length - 1]) };
  return (
    <Frame>
      <Mono x={0} y={8}>WEEKLY UNITS</Mono>
      <Mono x={TODAY_X} y={8} anchor="middle" fill={T.ink}>
        TODAY
      </Mono>
      <Mono x={W} y={8} anchor="end" fill={T.blue}>
        NEXT 12 WEEKS
      </Mono>
      <path d={`M 0 ${uy(900)} H ${W} M 0 ${uy(800)} H ${W}`} stroke={T.hair} strokeDasharray="2 4" />
      <path d={`M 0 ${BASE_Y} H ${W}`} stroke={T.line} />
      <path d={BAND_PATH} fill={T.blueSoft} />
      <path d={HISTORY_PATH} stroke={T.ink} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <path d={FORECAST_PATH} stroke={T.blue} strokeWidth={1.8} strokeDasharray="4 4" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M ${TODAY_X} 16 V ${BASE_Y}`} stroke={T.ink} strokeOpacity={0.5} strokeDasharray="2 3" />
      <circle cx={LAST.x} cy={LAST.y} r={3.5} fill={T.ink} />
      <circle cx={end.x} cy={end.y} r={3.5} fill={T.blue} />
      <Wipe play={play} y={14} h={BASE_Y - 13} x={-4} w={W + 12} dur={1400} />
      <g style={enter(play, "mm-fade", 900)}>
        <path d={`M 0 ${H - 5} H 16`} stroke={T.ink} strokeWidth={1.8} />
        <Mono x={22} y={H - 2} size={8.5}>
          ACTUAL
        </Mono>
        <path d={`M 84 ${H - 5} H 100`} stroke={T.blue} strokeWidth={1.8} strokeDasharray="4 3" />
        <Mono x={106} y={H - 2} size={8.5}>
          FORECAST
        </Mono>
        <rect x={180} y={H - 10} width={16} height={10} rx={2} fill={T.blueSoft} />
        <Mono x={202} y={H - 2} size={8.5}>
          LIKELY RANGE
        </Mono>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 05 Ask Akashic: the answer, with its evidence                     */
/* ---------------------------------------------------------------- */
const CHANNELS = [
  { y: 20, name: "Direct", share: 46, growth: "+6%" },
  { y: 60, name: "Partner", share: 32, growth: "FLAT" },
  { y: 100, name: "Online", share: 22, growth: "+18%", lead: true },
];

export function AskDrawing({ play }: { play: Play }) {
  return (
    <Frame>
      {CHANNELS.map((c, i) => (
        <g key={c.name}>
          <text x={0} y={c.y + 4.5} fontSize={12.5} fill={c.lead ? T.ink : T.body} fontWeight={c.lead ? 500 : 400}>
            {c.name}
          </text>
          <rect x={74} y={c.y - 5} width={270} height={10} rx={5} fill={T.track} />
          <rect x={74} y={c.y - 5} width={(c.share / 50) * 270} height={10} rx={5} fill={c.lead ? T.blue : T.blueLine} style={enter(play, "akx-fillx", i * 140, 800, "left center")} />
          <text x={358} y={c.y + 4.5} fontSize={13} fontWeight={500} fill={T.ink}>
            {c.share}%
          </text>
          <Mono x={W} y={c.y + 3.5} anchor="end" fill={c.lead ? T.blue : T.mute} size={9.5}>
            {c.growth}
          </Mono>
        </g>
      ))}
      <path d={`M 0 124 H ${W}`} stroke={T.hair} />
      <g style={enter(play, "ps-rise", 650)}>
        <text x={0} y={144} fontSize={11.5} fill={T.body}>
          Share of $25.4 million net revenue. Direct grew 6%; Partner held flat.
          <tspan dx={5} className={styles.mono} fontSize={9} fill={T.blue}>
            [1]
          </tspan>
        </text>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 06 Business Intelligence: the quarter against plan, with an alert */
/* ---------------------------------------------------------------- */
/* Thirteen weeks summing to the demo world's $25.4 million against a
   flat weekly plan, so the quarter lands at its 98% plan attainment. Bars
   show each week's gap to plan: under hangs below the line, over rises. */
const WEEKS = [1.78, 1.86, 1.92, 1.84, 1.95, 2.03, 1.93, 1.97, 1.99, 1.9, 2.05, 2.1, 2.08];
const PLAN = 25.4 / 0.98 / WEEKS.length;
const ALERT_WEEK = 9; // week 10: 5% under plan
const BAR_W = 15;
const BAR_STEP = 23;
const ZERO_Y = 58;
const PX_PER_MILLION = 270;

export function DashboardDrawing({ play }: { play: Play }) {
  const chartW = BAR_STEP * (WEEKS.length - 1) + BAR_W;
  const alertX = ALERT_WEEK * BAR_STEP + BAR_W / 2;
  const alertY = ZERO_Y + (PLAN - WEEKS[ALERT_WEEK]) * PX_PER_MILLION + 9;
  return (
    <Frame>
      <Mono x={0} y={8}>WEEKLY REVENUE AGAINST PLAN</Mono>
      {WEEKS.map((v, i) => {
        const gap = (v - PLAN) * PX_PER_MILLION;
        const over = gap >= 0;
        return (
          <rect
            key={i}
            x={i * BAR_STEP}
            y={over ? ZERO_Y - gap : ZERO_Y}
            width={BAR_W}
            height={Math.max(1.5, Math.abs(gap))}
            rx={2}
            fill={over ? T.blue : T.blueLine}
            style={enter(play, "mm-growy", i * 45, 520, over ? "center bottom" : "center top")}
          />
        );
      })}
      <path d={`M -4 ${ZERO_Y} H ${chartW + 4}`} stroke={T.ink} strokeOpacity={0.75} />
      <Mono x={chartW + 9} y={ZERO_Y + 3} size={8.5} fill={T.ink}>
        PLAN
      </Mono>
      <Mono x={0} y={H - 4} size={8.5}>
        WEEK 1
      </Mono>
      <Mono x={chartW} y={H - 4} size={8.5} anchor="end">
        WEEK 13
      </Mono>
      <g style={enter(play, "mm-fade", 760, 500)}>
        <rect x={330} y={18} width={10} height={8} rx={2} fill={T.blue} />
        <Mono x={346} y={25} size={8.5}>
          AHEAD OF PLAN
        </Mono>
        <rect x={330} y={34} width={10} height={8} rx={2} fill={T.blueLine} />
        <Mono x={346} y={41} size={8.5}>
          BEHIND PLAN
        </Mono>
      </g>
      {/* The alert lifts out of the week that slipped. */}
      <g style={enter(play, "ps-rise", 980)}>
        <path d={`M ${alertX + 5} ${alertY} H 330`} stroke={T.red} strokeOpacity={0.6} strokeDasharray="2 3" />
        <circle cx={alertX} cy={alertY} r={3.5} fill={T.red} />
        <rect x={330} y={alertY - 30} width={142} height={62} rx={10} fill={T.card} stroke={T.line} />
        <circle cx={345} cy={alertY - 15} r={2.5} fill={T.red} />
        <Mono x={353} y={alertY - 12} size={8.5} fill={T.ink}>
          ALERT · WEEK 10
        </Mono>
        <text x={344} y={alertY + 7} fontSize={12} fontWeight={500} fill={T.ink}>
          5% under plan
        </text>
        <text x={344} y={alertY + 23} fontSize={10.5} fill={T.body}>
          Sent to sales leadership
        </text>
      </g>
    </Frame>
  );
}
