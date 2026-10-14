"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ABOUT_MILESTONES } from "@/lib/aboutContent";
import { ABOUT_GROWTH_ERAS } from "@/lib/aboutSections";

const START = 0.25;
const END = Math.PI * 2 - 0.68;
const PHASES = [
  { radius: 67, spread: 27, strands: 8, colour: "#354258", position: "left-[2%] top-[17%]", label: [24, 111], anchor: 3.45 },
  { radius: 141, spread: 37, strands: 8, colour: "#8494AB", position: "left-[2%] bottom-[1%]", label: [24, 429], anchor: 2.1 },
  { radius: 239, spread: 48, strands: 16, colour: "#3E63DD", position: "right-[1%] top-[1%]", label: [513, 44], anchor: 4.95 },
] as const;
type Point = readonly [number, number];

// Geometry illustrates accumulated capability, not quantities or elapsed time.
function point(phase: number, lane: number, angle: number): Point {
  const spec = PHASES[phase];
  const r = spec.radius + (lane - 0.5) * spec.spread + Math.sin(angle * 2 + 0.5) * phase * 5;
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle) * 0.65;
  const z = Math.sin(angle * 2 + lane * 1.4) * phase * 5;
  return [330 + x * Math.cos(-0.37) - y * Math.sin(-0.37), 245 + x * Math.sin(-0.37) + y * Math.cos(-0.37) + z];
}
function coordinates(p: Point) { return `${p[0].toFixed(2)} ${p[1].toFixed(2)}`; }
function strand(phase: number, lane: number, start = START, end = END) {
  return Array.from({ length: 181 }, (_, i) => `${i ? "L" : "M"}${coordinates(point(phase, lane, start + (end - start) * i / 180))}`).join(" ");
}
function join(phase: number, lane: number) {
  const a = point(phase, lane, END);
  const b = point(phase + 1, lane, START);
  const before = point(phase, lane, END - 0.01);
  const after = point(phase + 1, lane, START + 0.01);
  const firstLength = Math.hypot(a[0] - before[0], a[1] - before[1]);
  const lastLength = Math.hypot(after[0] - b[0], after[1] - b[1]);
  const first: Point = [a[0] + (a[0] - before[0]) / firstLength * 58, a[1] + (a[1] - before[1]) / firstLength * 58];
  const last: Point = [b[0] - (after[0] - b[0]) / lastLength * 48, b[1] - (after[1] - b[1]) / lastLength * 48];
  return `C${coordinates(first)} ${coordinates(last)} ${coordinates(b)}`;
}
const CONTINUITY = strand(0, 0.45) + join(0, 0.45) + strand(1, 0.45).replace(/^M[^L]+/, "") + join(1, 0.45) + strand(2, 0.45).replace(/^M[^L]+/, "");

export default function GrowthRings() {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const trace = useRef<SVGPathElement>(null);
  const mobileTrace = useRef<SVGPathElement>(null);
  const played = useRef(-1);
  const inView = useInView(root, { amount: 0.3 });
  const [reduced, setReduced] = useState(true);
  const [selected, setSelected] = useState(2);
  const [preview, setPreview] = useState<number | null>(null);
  const [replay, setReplay] = useState(0);
  const active = preview ?? selected;
  const milestone = ABOUT_MILESTONES.find(item => item.title === ABOUT_GROWTH_ERAS[active].milestone);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || !inView || played.current === replay) return;
    played.current = replay;
    const animations = [trace.current, mobileTrace.current].flatMap(path => {
      if (!path) return [];
      const length = path.getTotalLength();
      return [path.animate([
      { strokeDasharray: `0 ${length}`, opacity: 0, offset: 0 },
      { strokeDasharray: `0 ${length}`, opacity: 1, offset: 0.03 },
      { strokeDasharray: `${length} ${length}`, opacity: 1, offset: 0.82 },
      { strokeDasharray: `${length} ${length}`, opacity: 0, offset: 1 },
      ], { duration: 4600, easing: "cubic-bezier(.3,0,.2,1)", fill: "none" })];
    });
    return () => animations.forEach(animation => animation.cancel());
  }, [inView, reduced, replay]);

  function phaseButton(index: number, mobile: boolean) {
    const era = ABOUT_GROWTH_ERAS[index];
    return <button key={era.title} type="button" aria-pressed={selected === index} aria-controls={`${uid}-caption`}
      onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(index); }} onPointerLeave={() => setPreview(null)}
      onFocus={() => setPreview(index)} onBlur={() => setPreview(null)} onKeyDown={event => { if (event.key === "Escape") setPreview(null); }}
      onClick={() => { setSelected(index); setPreview(null); }}
      className={mobile ? `min-h-20 flex-1 px-2 py-3 text-left ${index ? "border-l border-lineSoft" : ""}` : `absolute z-10 hidden min-h-16 bg-background/95 px-2 py-2 text-left xl:block ${PHASES[index].position}`}>
      <span className="mb-1.5 flex items-center gap-2.5 font-mono text-[10px] tracking-[.04em] text-overcast"><span style={{ color: PHASES[index].colour }}>0{index + 1}</span><span>{era.period}</span></span>
      <span className={`block text-[12px] font-medium sm:text-[14px] ${active === index ? "text-ink" : "text-secondary-text"}`}>{era.title}</span>
      <span className="mt-2 block h-px transition-[width] duration-400 motion-reduce:transition-none" style={{ width: active === index ? 32 : 12, background: PHASES[index].colour }} />
    </button>;
  }

  return <figure ref={root} className="mx-auto w-full max-w-[700px]" aria-label="DHIRA: one foundation, three phases of growth">
    <div className="relative">
      <svg viewBox="0 0 660 470" className="hidden w-full xl:block" role="img" aria-labelledby={`${uid}-title ${uid}-description`}>
        <title id={`${uid}-title`}>One foundation, widening reach.</title>
        <desc id={`${uid}-description`}>An open elliptical field of connected strands. Graphite data foundations extend into linked national systems and a branching blue field for Akashic and AI. The phases connect through a shared opening. The geometry is illustrative.</desc>
        <Drawing active={preview} traceRef={trace} />
      </svg>
      <svg viewBox="54 47 557 360" className="w-full xl:hidden" role="img" aria-label="Data foundations connect to country scale systems, then expand into Akashic and AI"><Drawing active={preview} traceRef={mobileTrace} /></svg>
      {ABOUT_GROWTH_ERAS.map((_, index) => phaseButton(index, false))}
    </div>
    <div className="mt-5 flex border-y border-lineSoft xl:hidden" role="group" aria-label="Explore the three phases">{ABOUT_GROWTH_ERAS.map((_, index) => phaseButton(index, true))}</div>
    <figcaption className="mt-5 border-t border-lineSoft pt-4 sm:mt-6">
      <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">One foundation, widening reach</span>
        <button type="button" onClick={() => setReplay(value => value + 1)} disabled={reduced} aria-label="Replay the connection between phases" className="inline-flex min-h-11 items-center gap-2 text-[11px] text-secondary-text disabled:invisible"><span className="hidden sm:inline">Trace the journey</span><span aria-hidden="true">↻</span></button>
      </div>
      <div className="flex min-h-[76px] items-start justify-between gap-5 pt-2">
        <div id={`${uid}-caption`} aria-live={preview === null ? "polite" : "off"} aria-atomic="true"><p className="text-[14px] font-medium text-ink"><span className="sr-only">Phase 0{active + 1}: </span>{milestone?.title}</p><p className="mt-1 max-w-[27rem] text-[13px] leading-relaxed text-secondary-text">{milestone?.body}</p></div>
        <Link href="#journey" aria-label="Explore our journey" className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-ink">↗</Link>
      </div>
    </figcaption>
  </figure>;
}

function Drawing({ active, traceRef }: { active: number | null; traceRef?: React.RefObject<SVGPathElement | null> }) {
  return <>
    {PHASES.map((phase, index) => <g key={phase.colour} opacity={active === null || active === index ? 1 : 0.4} className="transition-opacity duration-400 motion-reduce:transition-none">
      {Array.from({ length: phase.strands }, (_, lane) => <path key={lane} d={strand(index, lane / (phase.strands - 1))} fill="none" stroke={phase.colour} strokeWidth={lane === 0 || lane === phase.strands - 1 ? 1.15 : 0.65} opacity={index === 1 ? 0.8 : 0.9} />)}
      {index < 2 && Array.from({ length: 8 }, (_, lane) => <path key={`join-${lane}`} d={`M${coordinates(point(index, lane / 7, END))}${join(index, lane / 7)}`} fill="none" stroke={phase.colour} strokeWidth=".65" opacity=".65" />)}
      {index === 0 && [2.4, 3.55, 4.55].map(angle => <g key={angle}>{[0, 0.43, 1].map(lane => { const [cx, cy] = point(0, lane, angle); return <rect key={lane} x={cx - 2} y={cy - 2} width="4" height="4" fill="#FFFFFF" stroke={phase.colour} strokeWidth=".8" />; })}</g>)}
      {index === 1 && [1.3, 2.55, 4.25].map(angle => <g key={angle}>
        <path d={`M${coordinates(point(1, 0, angle))}L${coordinates(point(1, 1, angle))}`} stroke="#FFFFFF" strokeWidth="4" />
        <path d={`M${coordinates(point(1, 0, angle))}L${coordinates(point(1, 1, angle))}`} stroke={phase.colour} strokeWidth="1.15" />
        {[0, 1].map(lane => { const [cx, cy] = point(1, lane, angle); return <circle key={lane} cx={cx} cy={cy} r="2.3" fill="#FFFFFF" stroke={phase.colour} strokeWidth="1" />; })}
      </g>)}
      {index === 2 && [1.2, 2.7, 4.1].map(angle => <g key={angle}>{[0.2, 0.5, 0.8].map(lane => {
        const a = point(2, lane, angle - 0.14), b = point(2, 1 - lane, angle + 0.14);
        return <path key={lane} d={`M${coordinates(a)}Q${coordinates(point(2, 0.5, angle))} ${coordinates(b)}`} fill="none" stroke="#3E63DD" strokeOpacity=".6" strokeWidth=".7" />;
      })}</g>)}
    </g>)}
    <circle cx="330" cy="245" r="2.5" fill="#354258" />
    <text x="330" y="265" textAnchor="middle" className="fill-overcast font-mono text-[10px]">2018</text>
    {traceRef && <path ref={traceRef} d={CONTINUITY} fill="none" stroke="#3E63DD" strokeWidth="2" strokeLinecap="round" opacity="0" />}
    <g className="hidden sm:block">{PHASES.map((phase, index) => {
      const a = point(index, 0.5, phase.anchor), [tx, ty] = phase.label;
      return <g key={phase.colour}><path d={`M${coordinates(a)}L${tx + (index === 2 ? -12 : 128)} ${ty}H${tx}`} fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d={`M${coordinates(a)}L${tx + (index === 2 ? -12 : 128)} ${ty}H${tx}`} fill="none" stroke={phase.colour} strokeWidth=".7" strokeOpacity=".65" /><circle cx={a[0]} cy={a[1]} r="2.2" fill={phase.colour} /></g>;
    })}</g>
  </>;
}
