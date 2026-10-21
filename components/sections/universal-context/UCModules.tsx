"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ModuleMomentStage } from "@/components/demos/mockups/AkashicModuleMomentsMockup";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomePlatform } from "@/content/pages/home";

/*
 * Homepage [02], second half: the seven modules beside their drawings
 * (21 Oct 2026, user: "on the left show the modules, on the right those
 * small illustrations... a precursor for the next solution section"). It
 * replaced the particle "Ask why a number moved" demo, whose claim /akashic
 * [01] owns.
 *
 * Left, the rail: each module on a line and, while active, what it
 * does in plain words. Right, that module's moment drawing
 * (ModuleMomentStage), replayed each time the rail moves. The module names
 * are the ones the [03] slab draws, so the next section reads as these
 * modules switched on. The rotation runs only on screen and not at all
 * under reduced motion (Rule 6a); choosing a module takes over.
 *
 * Desktop (user, 21 Oct 2026): the block sits on the same centred column
 * as the five capabilities above it, its text on their left line, with the
 * heading on top and the rail and drawing below. A hairline leaves the end
 * of every module's line and converges on the drawing's frame, which holds
 * the middle. The active module's progress is one blue fill along that
 * whole route, from under its name to the frame, timed so it arrives as
 * the next module takes over (user, same day: one seamless line, and show
 * when the module will shift). The connectors are measured from the rail,
 * so they follow it as a module's text opens and closes.
 */

const ROTATE_MS = 8500;

type Item = HomePlatform["modules"]["items"][number];
type Point = { x: number; y: number };

// The module's line, a hairline track that turns light blue while its module
// plays. On desktop the blue progress is drawn over it by RailConnectors, one
// fill from here to the drawing; phones and tablets have no connectors, so
// the line fills itself (`fill`).
function ModuleLine({
  on,
  fill,
  run,
  reduced,
  lineRef,
}: {
  on: boolean;
  fill: boolean;
  run: number;
  reduced: boolean;
  lineRef?: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <span
      ref={lineRef}
      className={`mt-2.5 block h-[2px] w-full max-w-[320px] overflow-hidden transition-colors duration-500 ease-settle ${on ? "bg-blue-border" : "bg-uc-line"}`}
    >
      {fill && on && (
        <span
          key={run}
          className="block size-full origin-left bg-blue"
          style={reduced ? undefined : { animation: `progressFill ${ROTATE_MS}ms linear both` }}
        />
      )}
    </span>
  );
}

function ModuleRail({
  items,
  active,
  choose,
  run,
  reduced,
  bars,
}: {
  items: Item[];
  active: number;
  choose: (i: number) => void;
  run: number;
  reduced: boolean;
  /** Desktop: the lines' elements, for RailConnectors, which then draws the progress. */
  bars?: RefObject<(HTMLSpanElement | null)[]>;
}) {
  return (
    <ol className="flex w-full flex-col">
      {items.map((item, i) => {
        const on = i === active;
        return (
          <li key={item.name} className="flex gap-4 pb-5 last:pb-0">
            <span aria-hidden="true" className={`w-6 shrink-0 pt-[3px] font-mono text-[11px] transition-colors duration-500 ease-settle ${on ? "text-blue" : "text-uc-mute"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <button type="button" onClick={() => choose(i)} aria-pressed={on} className="w-fit cursor-pointer text-left">
                <span className={`text-[17px] leading-snug transition-colors duration-500 ease-settle ${on ? "font-semibold text-uc-text" : "font-medium text-uc-mute hover:text-uc-text"}`}>
                  {item.name}
                </span>
              </button>
              <ModuleLine
                on={on}
                fill={!bars}
                run={run}
                reduced={reduced}
                lineRef={
                  bars &&
                  ((el) => {
                    bars.current[i] = el;
                  })
                }
              />
              <div className={`grid transition-all duration-500 ease-settle ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="mt-2 max-w-[380px] text-pretty text-[15px] leading-relaxed text-uc-mute">{item.text}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// A module line's two ends.
type Line = { x0: number; x1: number; y: number };

// Leaves the line's end level and arrives level at the drawing.
const connector = (a: Line, b: Point) => {
  const k = (b.x - a.x1) * 0.55;
  return `M ${a.x1} ${a.y} C ${a.x1 + k} ${a.y}, ${b.x - k} ${b.y}, ${b.x} ${b.y}`;
};

// The whole route, from under the module's name to the drawing.
const route = (a: Line, b: Point) => `M ${a.x0} ${a.y} L ${connector(a, b).slice(2)}`;

/* The hairlines from each module line's end to the frame's left edge, and
   the active module's progress: one blue fill along the whole route that
   reaches the drawing as the module hands over (user, 21 Oct 2026: show
   when the module will shift). Linear over ROTATE_MS, so its speed is the
   same along the line and the curve. Measured from the DOM and re-measured
   whenever a rail row changes height (a module's text opening or closing),
   so the lines travel with the rail. */
function RailConnectors({
  rowRef,
  bars,
  stageHostRef,
  active,
  run,
  reduced,
}: {
  rowRef: RefObject<HTMLDivElement | null>;
  bars: RefObject<(HTMLSpanElement | null)[]>;
  stageHostRef: RefObject<HTMLDivElement | null>;
  active: number;
  run: number;
  reduced: boolean;
}) {
  const [geo, setGeo] = useState<{ starts: Line[]; end: Point } | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    const host = stageHostRef.current;
    if (!row || !host) return;
    const measure = () => {
      const o = row.getBoundingClientRect();
      // The frame's left edge, level with the drawing itself (not its
      // caption): ModuleMomentStage's figure > stage.
      const f = host.getBoundingClientRect();
      const s = (host.querySelector("figure > div") ?? host).getBoundingClientRect();
      const starts = bars.current.map((bar) => {
        const r = bar?.getBoundingClientRect();
        return r ? { x0: r.left - o.left, x1: r.right - o.left, y: r.top + r.height / 2 - o.top } : { x0: 0, x1: 0, y: 0 };
      });
      setGeo({ starts, end: { x: f.left - o.left, y: s.top + s.height / 2 - o.top } });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    observer.observe(host);
    for (const bar of bars.current) {
      const li = bar?.closest("li");
      if (li) observer.observe(li);
    }
    return () => observer.disconnect();
  }, [rowRef, bars, stageHostRef]);

  if (!geo || !geo.starts[active]) return null;
  const { end } = geo;
  const d = route(geo.starts[active], end);
  // One clock for the fill and its head: both CSS, linear, same duration.
  const timed = (name: string) => (reduced ? undefined : `${name} ${ROTATE_MS}ms linear both`);

  return (
    <>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {geo.starts.map((a, i) => (
          <path key={i} d={connector(a, end)} fill="none" stroke="rgb(var(--uc-line))" strokeWidth={1} />
        ))}
        {/* The active route in full, light blue, so the time left reads as
            the distance left; the blue fill runs along it. */}
        <path d={d} fill="none" stroke="rgb(var(--blue-border))" strokeWidth={2} />
        <path
          key={`${active}-${run}`}
          d={d}
          pathLength={1}
          strokeDasharray={reduced ? undefined : "1 1"}
          fill="none"
          stroke="rgb(var(--blue))"
          strokeWidth={2}
          style={{ animation: timed("uc-route-fill") }}
        />
        {/* where the seven meet the drawing */}
        <circle cx={end.x} cy={end.y} r={7} fill="rgb(var(--blue-border))" />
        <circle cx={end.x} cy={end.y} r={3.5} fill="rgb(var(--blue))" />
      </svg>
      {/* The fill's head, a flat disc riding the same route. Pinned to the
          row's origin so the path's coordinates are the row's. */}
      {!reduced && (
        <span
          key={`head-${active}-${run}`}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 size-[11px] rounded-full border-[3px] border-blue-border bg-blue"
          style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg", animation: timed("uc-route-head") }}
        />
      )}
    </>
  );
}

function Heading({ content, center = false }: { content: HomePlatform["modules"]; center?: boolean }) {
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start"}`}>
      <h3 className="max-w-[20em] text-balance text-[28px] font-semibold leading-[1.15] tracking-tight lg:text-[32px]">
        <span className="block text-uc-mute">{content.title.setup}</span>
        <span className="block text-uc-text">{content.title.payoff}</span>
      </h3>
      <p className="mt-4 max-w-[30em] text-pretty text-[15px] leading-relaxed text-uc-mute lg:text-[16px]">{content.lede}</p>
    </div>
  );
}

export default function UCModules({ content }: { content: HomePlatform["modules"] }) {
  const items = content.items;
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const stageHostRef = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const inView = useOnScreen(rootRef);
  const reduced = usePrefersReducedMotion();
  // Bumped when the section returns to view or a module is chosen, so the
  // blue connector and the drawing restart together.
  const [run, setRun] = useState(0);
  const [wasInView, setWasInView] = useState(inView);
  if (inView !== wasInView) {
    setWasInView(inView);
    if (inView) setRun((r) => r + 1);
  }

  const choose = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % items.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active, reduced, inView, run, items.length]);

  return (
    <div ref={rootRef} className="relative w-full border-y border-uc-line">
      {/* Desktop. The hairlines above and below stay full bleed; the content
          sits on the five capabilities' column (1000px, 1100px from xl) with
          their inset, so the heading starts on the first capability's line. */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1000px] px-5 py-[clamp(64px,10svh,112px)] lg:block xl:max-w-[1100px] xl:px-6">
        <Heading content={content} />
        <div ref={rowRef} className="relative mt-12 flex items-center justify-between">
          <div className="w-[256px] shrink-0">
            <ModuleRail items={items} active={active} choose={choose} run={run} reduced={reduced} bars={bars} />
          </div>
          {/* The frame gives every line the same landing, the frame's left
              edge, whichever moment is playing and wherever it starts. */}
          <div ref={stageHostRef} className="w-[600px] min-w-0 rounded-frame border border-uc-stroke bg-uc-surface pb-5 pt-6 xl:w-[640px]">
            <ModuleMomentStage index={active} playKey={run} caption />
          </div>
          <RailConnectors rowRef={rowRef} bars={bars} stageHostRef={stageHostRef} active={active} run={run} reduced={reduced} />
        </div>
      </div>

      {/* phones and tablets */}
      <div className="relative z-10 flex w-full flex-col px-6 pb-20 pt-16 md:px-10 lg:hidden">
        <Heading content={content} center />
        <div className="mt-8 w-full">
          <ModuleMomentStage index={active} playKey={run} caption />
        </div>
        <div className="mx-auto mt-8 w-full max-w-[440px]">
          <ModuleRail items={items} active={active} choose={choose} run={run} reduced={reduced} />
        </div>
      </div>
    </div>
  );
}
