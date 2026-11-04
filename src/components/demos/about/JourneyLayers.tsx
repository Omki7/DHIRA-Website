"use client";

/* Calendar-scaled terraces accumulate on native scroll. Equal thickness is not a metric. */

import { createContext, useContext, useEffect, useId, useMemo, useRef, useState, type PointerEvent } from "react";
import type { JourneyLayer, JourneyTimeline } from "@/content/pages/about";
import { PreviewTag } from "@/shared/components/ui";

/* The chronology is content (content/pages/about.ts journey.timeline). Pure
   geometry helpers take it as `tl`; the drawing's parts read it from context. */
const TimelineContext = createContext<JourneyTimeline | null>(null);
function useTimeline(): JourneyTimeline {
  const tl = useContext(TimelineContext);
  if (!tl) throw new Error("JourneyLayers parts need the timeline context.");
  return tl;
}
/* The data's sentinel for the undated horizon (steps, eras and the ahead layer). */
const AHEAD = "Ahead";

const T1 = 2028.4;
/* Room kept left of the 2018 step for the founding label. */
const LABEL_ROOM = 208;
const horizonWidth = (width: number) => Math.max(48, width * 0.065);

/* The time origin: 2016 on wide screens, earlier on narrow ones, so the
   founding label always has its room. The emblem carries no labels. */
function origin(tl: JourneyTimeline, width: number, compact: boolean) {
  if (compact) return 2017.3;
  const founding = tl.built[0].from;
  const historyWidth = width - horizonWidth(width);
  const lead = (LABEL_ROOM * (tl.today - founding)) / Math.max(1, historyWidth - LABEL_ROOM);
  return Math.min(2016, founding - lead);
}
const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const SCROLL_STEP = 180;
const PIN_TOP = 104;
/* Room kept under the pinned stage. */
const PIN_BOTTOM = 24;
/* Terrace thickness on the pinned stage. Short windows (a laptop at 150%
   scaling is about 780px tall) get thinner terraces, down to the label
   height, so the stage still fits and the year-by-year reading still runs. */
const LAYER_MAX = 34;
const LAYER_MIN = 26;
const FIGURE_TOP = 42;

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

function buildScene(tl: JourneyTimeline, width: number, compact: boolean, L: number, top: number) {
  const T0 = origin(tl, width, compact);
  // The horizon is an undated direction, with its own reading space.
  const todayWidth = compact ? width * 0.83 : width - horizonWidth(width);
  const x = (t: number) => t <= tl.today
    ? ((t - T0) / (tl.today - T0)) * todayWidth
    : todayWidth + ((t - tl.today) / (T1 - tl.today)) * (width - todayWidth);
  const baseline = top + (tl.built.length + 1) * L;
  const builtTop = (k: number, t: number) => {
    let y = baseline;
    for (let i = 0; i <= k; i++) y -= L * rise(tl.built[i], t);
    return y;
  };
  const provenBottom = (j: number, t: number) => {
    let y = baseline;
    for (let i = 0; i <= j; i++) y += L * rise(tl.proven[i], t);
    return y;
  };

  const built = tl.built.map((layer, k) => {
    const ts = times(tl.built.slice(0, k + 1), layer.from, tl.today);
    const upper = ts.map((t) => [x(t), builtTop(k, t)] as const);
    const lower = ts.map((t) => [x(t), builtTop(k - 1, t)] as const).reverse();
    return { layer, area: close(upper, lower), edge: line(upper), mid: baseline - (k + 0.5) * L, anchor: x(layer.from) };
  });

  const proven = tl.proven.map((layer, j) => {
    const ts = times(tl.proven.slice(0, j + 1), layer.from, tl.today);
    const lower = ts.map((t) => [x(t), provenBottom(j, t)] as const);
    const upper = ts.map((t) => [x(t), provenBottom(j - 1, t)] as const).reverse();
    return { layer, area: close(lower, upper), edge: line(lower), mid: baseline + (j + 0.5) * L, anchor: x(layer.from) };
  });

  const summit = builtTop(tl.built.length - 1, tl.today);
  const aheadUpper = times([tl.ahead], tl.today, T1).map((t) => [x(t), summit - L * rise(tl.ahead, t)] as const);
  const ahead = {
    area: close(aheadUpper, [[x(T1), summit], [x(tl.today), summit]]),
    edge: line(aheadUpper),
    mid: summit - L / 2,
  };

  const floor = baseline + tl.proven.length * L;
  const ruler = floor + (compact ? 12 : 24);
  const height = compact ? ruler + 18 : ruler + 30;
  return { width, height, compact, L, top, baseline, floor, ruler, summit, x, built, proven, ahead, today: x(tl.today) };
}

type Scene = ReturnType<typeof buildScene>;

/* The pinned figure's height for a terrace thickness (independent of width). */
const figureHeight = (tl: JourneyTimeline, L: number) => buildScene(tl, 1, false, L, FIGURE_TOP).height;

/* The thickest terraces whose figure fits the given height. */
function layerThickness(tl: JourneyTimeline, room: number) {
  for (let L = LAYER_MAX; L > LAYER_MIN; L--) if (figureHeight(tl, L) <= room) return L;
  return LAYER_MIN;
}

/* Which layers stay lit while one is hovered: everything it stands on. */
function lit(tl: JourneyTimeline, focus: string | null, id: string) {
  if (!focus || focus === tl.ahead.id) return true;
  const builtIndex = tl.built.findIndex((layer) => layer.id === focus);
  if (builtIndex >= 0) {
    const index = tl.built.findIndex((layer) => layer.id === id);
    return index >= 0 && index <= builtIndex;
  }
  if (focus === "launch") return id === "founding" || id === "akashic";
  // A programme stands on the foundation, and from 2023 on Akashic as well.
  if (id === focus || id === "founding") return true;
  return focus !== "national-scale" && id === "akashic";
}

type Focus = { focus: string | null; setFocus: (id: string | null) => void };
const reached = (year: string, currentYear: string) => currentYear === AHEAD || (year !== AHEAD && Number(year) <= Number(currentYear));

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
  const tl = useTimeline();
  return (
    <div
      className="jl-label pointer-events-auto absolute flex items-baseline justify-end gap-3 whitespace-nowrap"
      data-dim={!lit(tl, focus, layerId)}
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
function Layers({ scene, focus, setFocus, currentYear = AHEAD, overview = true }: Focus & { scene: Scene; currentYear?: string; overview?: boolean }) {
  const tl = useTimeline();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { width, height, L, compact } = scene;
  const launch = scene.x(tl.launch.at);
  const akashic = scene.built[1];
  const band = (id: string) => (compact ? {} : hover(id, setFocus));
  const showLabel = (layer: JourneyLayer) => overview || layer.year === currentYear || focus === layer.id;

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

        {/* The quiet contour keeps the whole landscape legible before its history fills in. */}
        {!compact && [...scene.built, ...scene.proven].map(({ layer, edge }) => (
          <path key={`contour-${layer.id}`} d={edge} fill="none" className="stroke-lineSoft" strokeWidth="1" />
        ))}

        {scene.proven.map(({ layer, area, edge }, j) => (
          <g key={layer.id} className="jl-layer" data-revealed={reached(layer.year, currentYear)} data-dim={!lit(tl, focus, layer.id)} {...band(layer.id)}>
            <path d={area} fill={PROGRAMME_FILLS[j]} />
            <path d={edge} fill="none" className={layer.year === currentYear ? "stroke-secondary-text" : "stroke-line"} strokeWidth="1" strokeLinejoin="round" />
          </g>
        ))}

        {scene.built.map(({ layer, area, edge }, k) => (
          <g key={layer.id} className="jl-layer" data-revealed={reached(layer.year, currentYear)} data-dim={!lit(tl, focus, layer.id)} {...band(layer.id)}>
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
                className={layer.year === currentYear ? "stroke-blue" : "stroke-blue-border"}
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
              visible={reached(layer.year, currentYear) && showLabel(layer)}
              right={width - anchor + 14}
              top={mid - 12}
              focus={focus}
              setFocus={setFocus}
            />
          ))}
          <div
            className="jl-label pointer-events-auto absolute flex items-baseline gap-3 whitespace-nowrap"
            data-dim={!lit(tl, focus, "akashic")}
            data-revealed={reached("2022", currentYear) && (overview || currentYear === "2022" || focus === "launch")}
            style={{ left: launch + 12, top: akashic.mid - 12 }}
            {...hover("launch", setFocus)}
          >
            <span className="jl-date">{tl.launch.year}</span>
            <p className="jl-title">{tl.launch.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* The open horizon is deliberately undated. */
function Ahead({ scene, currentYear = AHEAD }: { scene: Scene; currentYear?: string }) {
  const { width, height } = scene;
  const visible = currentYear === "Ahead";
  return (
    <div className="jl-ahead pointer-events-none absolute inset-0" data-revealed={visible}>
      <svg className="absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
        <path d={scene.ahead.area} className="fill-blue-subtle" />
        <path d={scene.ahead.edge} fill="none" className="stroke-blue" strokeWidth="1.25" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Today({ scene, currentYear }: { scene: Scene; currentYear: string }) {
  const tl = useTimeline();
  return <div className="pointer-events-none absolute inset-0" aria-hidden>
    <svg className="absolute inset-0 overflow-visible" width={scene.width} height={scene.height}>
      <line x1={scene.today} x2={scene.today} y1={scene.top - 8} y2={scene.floor + 6} className="stroke-overcast/80" />
      {scene.proven.filter(({ layer }) => reached(layer.year, currentYear)).map(({ layer, mid }) => (
        <circle key={layer.id} cx={scene.today} cy={mid} r="3" className="fill-positive-text stroke-background" strokeWidth="1.5" />
      ))}
      {reached("2026", currentYear) && <circle cx={scene.today} cy={scene.summit} r="3.5" className="fill-blue" />}
    </svg>
    <p className="absolute -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink" style={{ left: scene.today, top: scene.top - 28 }}>{tl.todayLabel}</p>
  </div>;
}

function Ruler({ scene, currentYear = AHEAD }: { scene: Scene; currentYear?: string }) {
  const { x, ruler, width, height, compact, today } = scene;
  const shown = YEARS.filter((year) => compact ? year % 2 === 0 : year % 4 === 2);
  return (
    <div className="jl-ruler pointer-events-none absolute inset-0" aria-hidden>
      <svg className="absolute inset-0 overflow-visible" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={x(2018)} x2={today} y1={ruler} y2={ruler} className="stroke-line" strokeWidth="1" />
        <line x1={today} x2={x(T1)} y1={ruler} y2={ruler} className="stroke-line" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
        {YEARS.map((year) => (
          <line key={year} x1={x(year)} x2={x(year)} y1={ruler} y2={ruler + (compact ? 4 : 6)} className="stroke-line" strokeWidth="1" />
        ))}
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
export default function JourneyLayers({ timeline: tl }: { timeline: JourneyTimeline }) {
  const lastStep = tl.steps.length - 1;
  const scrollTravel = SCROLL_STEP * (lastStep + 1);
  const [frame, width] = useWidth<HTMLDivElement>();
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const composition = useRef<HTMLDivElement>(null);
  const reading = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [fits, setFits] = useState(false);
  const [layer, setLayer] = useState(LAYER_MAX);
  const [overview, setOverview] = useState(false);
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const panelId = useId();
  const enhanced = canScroll && fits && !overview;
  const complete = overview || (!enhanced && !manual);
  const currentYear = complete ? AHEAD : tl.steps[active].year;
  const readingIndex = complete ? lastStep : active;
  // Geometry is independent of the scroll position and pointer focus.
  const scene = useMemo(() => width > 0 ? buildScene(tl, width, false, layer, FIGURE_TOP) : null, [tl, width, layer]);

  useEffect(() => {
    const node = stage.current;
    const grid = composition.current;
    const column = reading.current;
    if (!node || !grid || !column) return;
    const measure = () => {
      // Fit from the predicted height, so a resize never unpins for a frame
      // before the terraces adjust.
      const room = window.innerHeight - PIN_TOP - PIN_BOTTOM;
      const chrome = node.offsetHeight - grid.offsetHeight;
      const nextLayer = layerThickness(tl, room - chrome);
      const nextFits = chrome + Math.max(column.offsetHeight, figureHeight(tl, nextLayer)) <= room;
      const scrollTrack = track.current;
      if (!nextFits && scrollTrack?.dataset.enhanced === "true") {
        const bounds = scrollTrack.getBoundingClientRect();
        if (bounds.top <= PIN_TOP && bounds.bottom + scrollTravel > PIN_TOP) {
          window.scrollTo({ top: Math.max(0, bounds.top + window.scrollY - PIN_TOP), behavior: "instant" });
        }
      }
      setLayer(nextLayer);
      setFits(nextFits);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [scrollTravel, tl]);

  useEffect(() => {
    // Height is settled by the fit above; this only rules out tiny windows.
    const viewport = matchMedia("(min-width: 1200px) and (min-height: 640px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const enable = viewport.matches && !reduced.matches;
      const node = track.current;
      if (!enable && node?.dataset.enhanced === "true") {
        const bounds = node.getBoundingClientRect();
        // The reduced-motion CSS may already have collapsed the travel spacer.
        if (bounds.top <= PIN_TOP && bounds.bottom + scrollTravel > PIN_TOP) {
          window.scrollTo({ top: Math.max(0, bounds.top + window.scrollY - PIN_TOP), behavior: "instant" });
        }
      }
      setCanScroll(enable);
    };
    update();
    viewport.addEventListener("change", update);
    reduced.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => { viewport.removeEventListener("change", update); reduced.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, [scrollTravel]);

  useEffect(() => {
    if (!enhanced) return;
    const node = track.current;
    const pinned = stage.current;
    if (!node || !pinned) return;
    let frameId = 0;
    let previous = -1;
    const update = () => {
      frameId = 0;
      const progress = Math.max(0, PIN_TOP - node.getBoundingClientRect().top);
      const next = Math.min(lastStep, Math.floor(progress / SCROLL_STEP));
      if (next !== previous) {
        previous = next;
        setActive(next);
        setFocus(null);
      }
    };
    const schedule = () => { if (!frameId) frameId = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [enhanced, lastStep]);

  const toggleOverview = (fromKeyboard: boolean) => {
    const node = track.current;
    if (!node) return;
    const start = node.getBoundingClientRect().top + window.scrollY - PIN_TOP;
    setKeyboard(fromKeyboard);
    setOverview(!complete);
    setFocus(null);
    setManual(complete);
    // Preserve this section when removing its extra scroll distance.
    window.scrollTo({ top: Math.max(0, start), behavior: "instant" });
  };

  const selectYear = (index: number, fromKeyboard: boolean) => {
    setKeyboard(fromKeyboard);
    setManual(true);
    setOverview(false);
    setFocus(null);
    setActive(index);
    if (canScroll && fits && track.current) {
      const start = track.current.getBoundingClientRect().top + window.scrollY - PIN_TOP;
      // Wait for the scroll track to return when leaving the complete view.
      requestAnimationFrame(() => window.scrollTo({ top: start + index * SCROLL_STEP + 1, behavior: "instant" }));
    }
  };

  return (
    <TimelineContext.Provider value={tl}>
    <div ref={track} className="jl-track" data-enhanced={enhanced} data-keyboard={keyboard}>
      <div ref={stage} className="jl-stage" data-year={currentYear}>
        <div ref={composition} className="jl-composition">
          <div ref={reading} id={panelId} className="jl-reading" aria-live={manual ? "polite" : "off"}>
            <div className="grid">
              {tl.steps.map((step, index) => <div key={step.year} className="jl-reading-step col-start-1 row-start-1" data-current={readingIndex === index} aria-hidden={readingIndex !== index}>
                <p className="jl-chapter-year">{step.year === AHEAD ? tl.aheadEra.label : step.year}</p>
                <h3 className="jl-chapter-title">{step.year === AHEAD ? tl.horizon.title : step.title}</h3>
                <p className="jl-chapter-description">{step.description}</p>
                {step.year === AHEAD && <>
                  <div className="jl-horizon-status"><PreviewTag /><span>{tl.horizon.status}</span></div>
                  <dl className="jl-principles">
                    {tl.direction.map((item) => <div key={item.title}>
                      <dt>{item.title}</dt>
                      <dd>{item.description}</dd>
                    </div>)}
                  </dl>
                </>}
                </div>)}
            </div>
          </div>
          <div ref={frame} className="jl-figure relative" style={{ height: scene ? scene.height : 510 }} aria-hidden="true">
            {scene && <>
              <Ruler scene={scene} currentYear={currentYear} />
              <div className="pointer-events-none absolute inset-0">
                <Layers scene={scene} currentYear={currentYear} overview={complete} focus={focus} setFocus={setFocus} />
              </div>
              <Today scene={scene} currentYear={currentYear} />
              <Ahead scene={scene} currentYear={currentYear} />
            </>}
          </div>
        </div>
        <div className="jl-controls">
          <div className="jl-years" role="group" aria-label={tl.reading.overview}>
            {tl.steps.map((step, index) => <button
              key={step.year}
              type="button"
              className="jl-year"
              aria-label={`${step.year}: ${step.title}`}
              aria-pressed={!complete && active === index}
              aria-controls={panelId}
              onClick={(event) => selectYear(index, event.detail === 0)}
            >{step.year}</button>)}
          </div>
          <button type="button" onClick={(event) => toggleOverview(event.detail === 0)} aria-pressed={complete} className="jl-overview">{complete ? tl.reading.explore : tl.reading.showAll}</button>
        </div>
      </div>
      {enhanced && <div className="jl-travel" style={{ height: scrollTravel }} aria-hidden="true" />}
    </div>
    </TimelineContext.Provider>
  );
}

/* The complete silhouette stays above the normal reading flow on phones. */
export function JourneyEmblem({ timeline: tl }: { timeline: JourneyTimeline }) {
  const [wrap, width] = useWidth<HTMLDivElement>();
  const scene = width ? buildScene(tl, width, true, 11, 30) : null;
  const none = () => {};
  return (
    <TimelineContext.Provider value={tl}>
      <div ref={wrap} className="jl-figure relative" style={{ height: scene ? scene.height : 190 }} aria-hidden>
        {scene && <>
          <Ruler scene={scene} />
          <Layers scene={scene} focus={null} setFocus={none} />
          <Today scene={scene} currentYear={AHEAD} />
          <Ahead scene={scene} />
        </>}
      </div>
    </TimelineContext.Provider>
  );
}
