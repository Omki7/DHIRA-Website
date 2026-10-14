"use client";

/* Calendar-scaled terraces accumulate on native scroll. Equal thickness is not a metric. */

import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  JOURNEY_AHEAD,
  JOURNEY_BUILT,
  JOURNEY_DIRECTION,
  JOURNEY_HORIZON,
  JOURNEY_ERAS,
  JOURNEY_LAUNCH,
  JOURNEY_PROVEN,
  JOURNEY_READING,
  JOURNEY_STEPS,
  JOURNEY_TODAY,
  type JourneyLayer,
} from "@/lib/aboutJourney";

const T1 = 2028.4;
/* Room kept left of the 2018 step for the founding label. */
const LABEL_ROOM = 208;
const horizonWidth = (width: number) => Math.max(228, width * 0.19);

/* The time origin: 2016 on wide screens, earlier on narrow ones, so the
   founding label always has its room. The emblem carries no labels. */
function origin(width: number, compact: boolean) {
  if (compact) return 2017.3;
  const founding = JOURNEY_BUILT[0].from;
  const historyWidth = width - horizonWidth(width);
  const lead = (LABEL_ROOM * (JOURNEY_TODAY - founding)) / Math.max(1, historyWidth - LABEL_ROOM);
  return Math.min(2016, founding - lead);
}
const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const SCROLL_STEP = 150;
const LAST_STEP = JOURNEY_STEPS.length - 1;
const SCROLL_TRAVEL = SCROLL_STEP * (LAST_STEP + 1);
const ERAS = [...JOURNEY_ERAS, { label: "Ahead", short: "Ahead", from: JOURNEY_TODAY, to: T1 - 0.15 }];
/* Mono label widths, estimated from the face: 0.6em advance plus tracking. */
const monoWidth = (text: string, size: number, tracking: number) => text.length * size * (0.6 + tracking);

/* Lighter as the stack rises: the foundation is the darkest ground. */
const PLATFORM_FILLS = Array.from({ length: 7 }, (_, i) => `var(--journey-platform-${i})`);
const PROGRAMME_FILLS = Array.from({ length: 3 }, (_, i) => `var(--journey-programme-${i})`);

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const u = clamp01(value);
  return u * u * u * (u * (u * 6 - 15) + 10);
};
const rise = (layer: JourneyLayer, t: number) => ease((t - layer.from) / (layer.to - layer.from));
const f = (value: number) => Math.round(value * 10) / 10;

/* Sample times: the ends plus dense points inside every ramp that shapes the edge. */
function times(layers: readonly JourneyLayer[], a: number, b: number) {
  const set = new Set<number>([a, b]);
  for (const layer of layers) {
    if (layer.to < a || layer.from > b) continue;
    for (let i = 0; i <= 24; i++) {
      const t = layer.from + ((layer.to - layer.from) * i) / 24;
      if (t > a && t < b) set.add(t);
    }
  }
  return [...set].sort((p, q) => p - q);
}

type Point = readonly [number, number];
const line = (points: readonly Point[]) => points.map(([px, py], i) => `${i ? "L" : "M"}${f(px)} ${f(py)}`).join("");
const close = (forward: readonly Point[], back: readonly Point[]) => `${line(forward)}${line(back).replace("M", "L")}Z`;

function buildScene(width: number, compact: boolean, L: number, top: number) {
  const T0 = origin(width, compact);
  // The horizon is an undated direction, with its own reading space.
  const todayWidth = compact ? width * 0.83 : width - horizonWidth(width);
  const x = (t: number) => t <= JOURNEY_TODAY
    ? ((t - T0) / (JOURNEY_TODAY - T0)) * todayWidth
    : todayWidth + ((t - JOURNEY_TODAY) / (T1 - JOURNEY_TODAY)) * (width - todayWidth);
  const baseline = top + (JOURNEY_BUILT.length + 1) * L;
  const builtTop = (k: number, t: number) => {
    let y = baseline;
    for (let i = 0; i <= k; i++) y -= L * rise(JOURNEY_BUILT[i], t);
    return y;
  };
  const provenBottom = (j: number, t: number) => {
    let y = baseline;
    for (let i = 0; i <= j; i++) y += L * rise(JOURNEY_PROVEN[i], t);
    return y;
  };

  const built = JOURNEY_BUILT.map((layer, k) => {
    const ts = times(JOURNEY_BUILT.slice(0, k + 1), layer.from, JOURNEY_TODAY);
    const upper = ts.map((t) => [x(t), builtTop(k, t)] as const);
    const lower = ts.map((t) => [x(t), builtTop(k - 1, t)] as const).reverse();
    return { layer, area: close(upper, lower), edge: line(upper), mid: baseline - (k + 0.5) * L, anchor: x(layer.from) };
  });

  const proven = JOURNEY_PROVEN.map((layer, j) => {
    const ts = times(JOURNEY_PROVEN.slice(0, j + 1), layer.from, JOURNEY_TODAY);
    const lower = ts.map((t) => [x(t), provenBottom(j, t)] as const);
    const upper = ts.map((t) => [x(t), provenBottom(j - 1, t)] as const).reverse();
    return { layer, area: close(lower, upper), edge: line(lower), mid: baseline + (j + 0.5) * L, anchor: x(layer.from) };
  });

  const summit = builtTop(JOURNEY_BUILT.length - 1, JOURNEY_TODAY);
  const aheadUpper = times([JOURNEY_AHEAD], JOURNEY_TODAY, T1).map((t) => [x(t), summit - L * rise(JOURNEY_AHEAD, t)] as const);
  const ahead = {
    area: close(aheadUpper, [[x(T1), summit], [x(JOURNEY_TODAY), summit]]),
    edge: line(aheadUpper),
    mid: summit - L / 2,
  };

  const floor = baseline + JOURNEY_PROVEN.length * L;
  const ruler = floor + (compact ? 12 : 24);
  const eras = ruler + 36;
  const height = compact ? ruler + 18 : eras + 14;
  return { width, height, compact, L, top, baseline, floor, ruler, eras, summit, x, built, proven, ahead, today: x(JOURNEY_TODAY) };
}

type Scene = ReturnType<typeof buildScene>;

/* Which layers stay lit while one is hovered: everything it stands on. */
function lit(focus: string | null, id: string) {
  if (!focus || focus === JOURNEY_AHEAD.id) return true;
  const builtIndex = JOURNEY_BUILT.findIndex((layer) => layer.id === focus);
  if (builtIndex >= 0) {
    const index = JOURNEY_BUILT.findIndex((layer) => layer.id === id);
    return index >= 0 && index <= builtIndex;
  }
  if (focus === "launch") return id === "founding" || id === "akashic";
  // A programme stands on the foundation, and from 2023 on Akashic as well.
  if (id === focus || id === "founding") return true;
  return focus !== "national-scale" && id === "akashic";
}

type Focus = { focus: string | null; setFocus: (id: string | null) => void };
const reached = (year: string, currentYear: string) => currentYear === "Ahead" || (year !== "Ahead" && Number(year) <= Number(currentYear));

/* Mouse and pen only: a tap would flash the lineage and clear it on release. */
function hover(id: string, setFocus: Focus["setFocus"]) {
  return {
    onPointerEnter: (event: PointerEvent<Element>) => { if (event.pointerType !== "touch") setFocus(id); },
    onPointerLeave: (event: PointerEvent<Element>) => { if (event.pointerType !== "touch") setFocus(null); },
  };
}

function Label({ layerId, title, year, right, top, visible = true, focus, setFocus }: Focus & {
  layerId: string;
  title: string;
  year: string;
  right: number;
  top: number;
  visible?: boolean;
}) {
  return (
    <div
      className="jl-label pointer-events-auto absolute flex items-baseline justify-end gap-3 whitespace-nowrap"
      data-dim={!lit(focus, layerId)}
      data-revealed={visible}
      style={{ right, top }}
      {...hover(layerId, setFocus)}
    >
      <span className="jl-date">{year}</span>
      <p className="jl-title">{title}</p>
    </div>
  );
}

/* Dates and titles share one baseline, centred on their terrace. */
function Layers({ scene, focus, setFocus, currentYear = "Ahead" }: Focus & { scene: Scene; currentYear?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { width, height, L, compact } = scene;
  const launch = scene.x(JOURNEY_LAUNCH.at);
  const akashic = scene.built[1];
  const band = (id: string) => (compact ? {} : hover(id, setFocus));

  return (
    <>
      <svg className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
        <defs>
          <pattern id={`${uid}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className="stroke-blue/30" strokeWidth="1" />
          </pattern>
          <clipPath id={`${uid}-research`}>
            <rect x="0" y="0" width={launch} height={height} />
          </clipPath>
          <clipPath id={`${uid}-launched`}>
            <rect x={launch} y="0" width={width - launch} height={height} />
          </clipPath>
        </defs>

        {scene.proven.map(({ layer, area, edge }, j) => (
          <g key={layer.id} className="jl-layer" data-revealed={reached(layer.year, currentYear)} data-dim={!lit(focus, layer.id)} {...band(layer.id)}>
            <path d={area} fill={PROGRAMME_FILLS[j]} />
            <path d={edge} fill="none" className="stroke-overcast/60" strokeWidth="1" strokeLinejoin="round" />
          </g>
        ))}

        {scene.built.map(({ layer, area, edge }, k) => (
          <g key={layer.id} className="jl-layer" data-revealed={reached(layer.year, currentYear)} data-dim={!lit(focus, layer.id)} {...band(layer.id)}>
            {k === 0 && <path d={area} fill="var(--journey-foundation)" />}
            {k === 1 && (
              <>
                <path d={area} className="fill-background" />
                <path d={area} fill={`url(#${uid}-hatch)`} clipPath={reached("2022", currentYear) ? `url(#${uid}-research)` : undefined} />
                {reached("2022", currentYear) && <path d={area} fill={PLATFORM_FILLS[0]} clipPath={`url(#${uid}-launched)`} />}
              </>
            )}
            {k > 1 && <path d={area} fill={PLATFORM_FILLS[k - 1]} />}
            {k > 0 && (
              <path
                d={edge}
                fill="none"
                className={k === JOURNEY_BUILT.length - 1 ? "stroke-blue-hover/90" : "stroke-blue/60"}
                strokeWidth="1"
                strokeLinejoin="round"
              />
            )}
          </g>
        ))}

        {/* 2022: the research layer turns solid. */}
        {!compact && reached("2022", currentYear) && (
          <line x1={launch} x2={launch} y1={akashic.mid - L / 2 + 1} y2={akashic.mid + L / 2 - 1} className="stroke-blue/60" strokeWidth="1" />
        )}
      </svg>

      {!compact && (
        <div className="pointer-events-none absolute inset-0">
          {[...scene.built, ...scene.proven].map(({ layer, mid, anchor }) => (
            <Label
              key={layer.id}
              layerId={layer.id}
              title={layer.title}
              year={layer.year}
              visible={reached(layer.year, currentYear)}
              right={width - anchor + 14}
              top={mid - 12}
              focus={focus}
              setFocus={setFocus}
            />
          ))}
          <div
            className="jl-label pointer-events-auto absolute flex items-baseline gap-3 whitespace-nowrap"
            data-dim={!lit(focus, "akashic")}
            data-revealed={reached("2022", currentYear)}
            style={{ left: launch + 12, top: akashic.mid - 12 }}
            {...hover("launch", setFocus)}
          >
            <span className="jl-date">{JOURNEY_LAUNCH.year}</span>
            <p className="jl-title">{JOURNEY_LAUNCH.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* The open horizon is deliberately undated. */
function Ahead({ scene, currentYear = "Ahead" }: { scene: Scene; currentYear?: string }) {
  const { width, height, compact, today, summit } = scene;
  const visible = currentYear === "Ahead";
  return (
    <div className="jl-ahead pointer-events-none absolute inset-0" data-revealed={visible}>
      <svg className="absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
        <path d={scene.ahead.area} className="fill-blue-subtle/60" />
        <path d={scene.ahead.edge} fill="none" className="stroke-blue" strokeWidth="1.25" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
      {!compact && (
        <div className="absolute" style={{ left: today + 34, right: 0, top: summit + 26 }}>
          <p className="font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-blue-hover">{JOURNEY_HORIZON.label}</p>
          <h3 className="mt-2 max-w-[220px] font-heading text-[22px] font-medium leading-[1.2] tracking-[-0.025em] text-ink">{JOURNEY_HORIZON.title}</h3>
          <ol className="jl-principles mt-5 space-y-4">
            {JOURNEY_DIRECTION.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[18px] top-[7px] h-[7px] w-[7px] rounded-full border border-blue/70 bg-background" />
                <p className="font-heading text-[16px] font-medium leading-[22px] tracking-[-0.01em] text-ink">{item.title}</p>
                <p className="mt-1 text-[14px] leading-5 text-secondary-text">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      {!compact && <p className="absolute bg-background px-2 font-mono text-[11px] leading-[14px] tracking-normal text-secondary-text" style={{ left: today + 20, top: scene.ruler - 7 }}>{JOURNEY_HORIZON.status}</p>}
    </div>
  );
}

function Today({ scene, currentYear }: { scene: Scene; currentYear: string }) {
  return <div className="pointer-events-none absolute inset-0" aria-hidden>
    <svg className="absolute inset-0 overflow-visible" width={scene.width} height={scene.height}>
      <line x1={scene.today} x2={scene.today} y1={scene.top - 8} y2={scene.floor + 6} className="stroke-overcast/80" />
      {scene.proven.filter(({ layer }) => reached(layer.year, currentYear)).map(({ layer, mid }) => (
        <circle key={layer.id} cx={scene.today} cy={mid} r="3" className="fill-positive-text stroke-background" strokeWidth="1.5" />
      ))}
      {reached("2026", currentYear) && <circle cx={scene.today} cy={scene.summit} r="3.5" className="fill-blue" />}
    </svg>
    <p className="absolute -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink" style={{ left: scene.today, top: scene.top - 28 }}>Today</p>
  </div>;
}

function Ruler({ scene, currentYear = "Ahead" }: { scene: Scene; currentYear?: string }) {
  const { x, ruler, eras, width, height, compact, today } = scene;
  const shown = compact ? YEARS.filter((year) => year % 2 === 0) : YEARS;
  return (
    <div className="jl-ruler pointer-events-none absolute inset-0" aria-hidden>
      <svg className="absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={x(2018)} x2={today} y1={ruler} y2={ruler} className="stroke-line" strokeWidth="1" />
        <line x1={today} x2={x(T1)} y1={ruler} y2={ruler} className="stroke-line" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
        {YEARS.map((year) => (
          <line key={year} x1={x(year)} x2={x(year)} y1={ruler} y2={ruler + (compact ? 4 : 6)} className="stroke-line" strokeWidth="1" />
        ))}
        {!compact &&
          ERAS.map((era) => {
            const a = x(era.from);
            const b = x(era.to);
            const open = era.label === "Ahead";
            return (
              <g key={era.label} className="stroke-line" strokeWidth="1">
                <line x1={a} x2={b} y1={eras} y2={eras} strokeDasharray={open ? "1 5" : undefined} strokeLinecap={open ? "round" : undefined} />
                {/* One slash per boundary, drawn by the era that starts there; Ahead stays open. */}
                <line x1={a - 3} x2={a + 3} y1={eras + 3} y2={eras - 3} />
              </g>
            );
          })}
      </svg>
      {shown.map((year) => (
        <span
          key={year}
          className={`absolute -translate-x-1/2 font-mono leading-none tabular-nums ${compact ? "text-[10px]" : "text-[12px]"} ${
            String(year) === currentYear ? "font-semibold text-blue-hover" : "text-secondary-text"
          }`}
          style={{ left: x(year + 0.5), top: ruler + (compact ? 9 : 13) }}
        >
          {year}
        </span>
      ))}
      {!compact &&
        ERAS.map((era) => {
          // Full name, then the short one, then none: a label never crosses its neighbour.
          const span = x(era.to) - x(era.from) - 8;
          const text = [era.label, era.short].find((name) => monoWidth(name, 11, 0.08) + 16 <= span);
          return text ? (
            <span
              key={era.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-background px-2 font-mono text-[11px] uppercase leading-none tracking-[0.08em] text-secondary-text"
              style={{ left: (x(era.from) + x(era.to)) / 2, top: eras }}
            >
              {text}
            </span>
          ) : null;
        })}
    </div>
  );
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(node.clientWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/* The drawing accumulates with native page scroll. No wheel or touch interception. */
export default function JourneyLayers({ heading }: { heading: ReactNode }) {
  const [frame, width] = useWidth<HTMLDivElement>();
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const [headHeight, setHeadHeight] = useState(0);
  const [layerHeight, setLayerHeight] = useState(42);
  const [canScroll, setCanScroll] = useState(false);
  const [fits, setFits] = useState(false);
  const [overview, setOverview] = useState(false);
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const enhanced = canScroll && fits && !overview;
  const currentYear = enhanced ? JOURNEY_STEPS[active].year : "Ahead";
  const wide = width >= 1080;
  const L = layerHeight;
  const top = wide ? Math.max(44, headHeight + 34 - (JOURNEY_BUILT.length - 1) * L) : 44;
  const scene = width > 0 ? buildScene(width, false, L, top) : null;
  const headRoom = scene && wide ? scene.x(JOURNEY_BUILT[2].from) - 184 : 0;

  useEffect(() => {
    const node = head.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setHeadHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const measure = () => setFits(node.offsetHeight <= window.innerHeight - 96);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const viewport = matchMedia("(min-width: 1200px) and (min-height: 820px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const enable = viewport.matches && !reduced.matches;
      const node = track.current;
      if (!enable && node?.dataset.enhanced === "true") {
        const bounds = node.getBoundingClientRect();
        if (bounds.top <= 88 && bounds.bottom > 88) {
          window.scrollTo({ top: Math.max(0, bounds.top + window.scrollY - 88), behavior: "instant" });
        }
      }
      setCanScroll(enable);
      setLayerHeight(window.innerHeight < 880 ? 38 : 42);
    };
    update();
    viewport.addEventListener("change", update);
    reduced.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => { viewport.removeEventListener("change", update); reduced.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const node = track.current;
    const pinned = stage.current;
    if (!node || !pinned) return;
    let frameId = 0;
    const update = () => {
      frameId = 0;
      const offset = parseFloat(getComputedStyle(pinned).top) || 88;
      const progress = Math.max(0, offset - node.getBoundingClientRect().top);
      setActive(Math.min(LAST_STEP, Math.floor(progress / SCROLL_STEP)));
      setFocus(null);
    };
    const schedule = () => { if (!frameId) frameId = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [enhanced]);

  const toggleOverview = () => {
    const node = track.current;
    if (!node) return;
    const start = node.getBoundingClientRect().top + window.scrollY - 88;
    setOverview(!overview);
    setFocus(null);
    // Preserve this section when removing its extra scroll distance.
    window.scrollTo({ top: Math.max(0, start), behavior: "instant" });
  };

  return (
    <div ref={track} className="jl-track" data-enhanced={enhanced} data-interactive={canScroll}>
      <div ref={stage} className="jl-stage" data-year={currentYear}>
        <div className="relative">
          <div ref={head} className={wide ? "absolute left-0 top-0 z-10" : "relative"} style={wide ? { width: Math.min(570, headRoom) } : undefined}>
            {heading}
            {canScroll && <div className="jl-reading mt-6 border-l-2 border-blue pl-4" aria-hidden="true">
              <div className="grid">
                {JOURNEY_STEPS.map((step, index) => <div key={step.year} className="jl-reading-step col-start-1 row-start-1" data-current={enhanced ? active === index : index === LAST_STEP}>
                  <p className="mb-2 font-mono text-[13px] uppercase tracking-[0.04em] text-blue-hover">{step.year === "Ahead" ? JOURNEY_READING.horizon : step.year}</p>
                  <p className="font-heading text-[19px] font-medium leading-[1.3] tracking-[-0.015em] text-ink">{step.title}</p>
                  <p className="mt-2 max-w-[390px] text-[15px] leading-[1.6] text-secondary-text">{step.description}</p>
                </div>)}
              </div>
            </div>}
          </div>
          <div ref={frame} className={`jl-figure relative hidden lg:block ${wide ? "" : "mt-12"}`} style={{ height: scene ? scene.height : 650 }} aria-hidden="true">
            {scene && <>
              <Ruler scene={scene} currentYear={currentYear} />
              <div className="pointer-events-none absolute inset-0">
                <Layers scene={scene} currentYear={currentYear} focus={focus} setFocus={setFocus} />
              </div>
              <Today scene={scene} currentYear={currentYear} />
              <Ahead scene={scene} currentYear={currentYear} />
            </>}
          </div>
        </div>
        {canScroll && <div className="jl-controls mt-5 flex min-h-[53px] items-center justify-between gap-6 border-t border-lineSoft pt-2">
          <p className="flex items-center gap-3 text-[13px] text-secondary-text"><span aria-hidden="true">↓</span>{enhanced ? active === LAST_STEP ? JOURNEY_READING.end : JOURNEY_READING.scroll : JOURNEY_READING.overview}</p>
          {fits && <button type="button" onClick={toggleOverview} aria-pressed={overview} className="min-h-11 shrink-0 rounded-sm px-1 text-[13px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-blue-hover hover:decoration-blue-hover focus-visible:text-blue-hover motion-reduce:transition-none">{overview ? JOURNEY_READING.explore : JOURNEY_READING.showAll}</button>}
        </div>}
      </div>
      {enhanced && <div className="jl-travel" style={{ height: SCROLL_TRAVEL }} aria-hidden="true" />}
    </div>
  );
}

/* The complete silhouette stays above the normal reading flow on phones. */
export function JourneyEmblem() {
  const [wrap, width] = useWidth<HTMLDivElement>();
  const scene = width ? buildScene(width, true, 11, 30) : null;
  const none = () => {};
  return (
    <div ref={wrap} className="jl-figure relative" style={{ height: scene ? scene.height : 190 }} aria-hidden>
      {scene && <>
        <Ruler scene={scene} />
        <Layers scene={scene} focus={null} setFocus={none} />
        <Today scene={scene} currentYear="Ahead" />
        <Ahead scene={scene} />
      </>}
    </div>
  );
}
