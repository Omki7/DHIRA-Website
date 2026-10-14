"use client";

/*
 * /about [05] "A kolam has three rules. So do we."
 *
 * Read order: heading beside a kolam emblem, the three rules in one row, then
 * the invitation as its own band. The emblem is sized as a figure, never a
 * mural: the 7 x 7 field it replaces filled the screen, pushed every line of
 * text to the edges and never formed a shape (user, 7 Oct 2026).
 *
 * Every draw forms a figure from DHIRA's world: People first, then AI,
 * Governance, Security and Data. Real kolams make figures the same way: the dots are laid out
 * in the shape, so one line looped around them traces its outline. The
 * figure's name appears as the line closes; "Draw another" moves to the next.
 *
 * Geometry is a mirror curve on each figure's dots. Edges of the figure turn
 * the line like a frame; inside it runs as a calm diagonal weave, with a
 * mirror only where two separate loops had to be joined into ONE line (found
 * by a greedy merge and checked: every figure walks as a single closed line).
 * Every mirror separates the two dots beside it, so every loop holds a dot.
 *
 * Hovering a rule replays it on the figure: 01 rings every dot, 02 sets the
 * line moving, 03 sends a pen once round and home.
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ABOUT_STORY } from "@/lib/aboutContent";

type Pt = readonly [number, number];

const FIGURES: readonly { name: string; rows: readonly string[]; mirrors: readonly string[] }[] = [
  { name: "People", rows: [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."], mirrors: ["10,3", "4,3"] },
  { name: "AI", rows: ["..#..###", ".###..#.", ".#.#..#.", "##.##.#.", "#####.#.", "#...#.#.", "#...####"], mirrors: ["8,7"] },
  { name: "Governance", rows: ["...#...", "..###..", ".#####.", "#######", "#.#.#.#", "#.#.#.#", "#######"], mirrors: ["7,6", "8,7", "9,4"] },
  { name: "Security", rows: [".#####.", ".#...#.", ".#...#.", "#######", "#######", "###.###", "#######"], mirrors: ["9,8", "11,6"] },
  { name: "Data", rows: [".#####.", "#######", "#.....#", "#######", "#.....#", "#######", ".#####."], mirrors: ["8,7", "10,3"] },
];

const COLS = 8; // canvas, in dots; figures are centred on it
const ROWS = 7;
const U = 40; // px per grid unit; a dot sits every 2 units
const OFF = 26;
const W = OFF * 2 + COLS * 2 * U;
const H = OFF * 2 + ROWS * 2 * U;
const K = 0.5523; // cubic handle for a quarter circle
const TRAIL = 0.04; // blue "fresh flour" behind the pen, share of the line
const FIRST_DRAW = 5200;
const REDRAW = 4200;

const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

function build(index: number) {
  const { rows, mirrors } = FIGURES[index];
  const R = rows.length;
  const C = Math.max(...rows.map((r) => r.length));
  const ox = OFF + (COLS - C) * U;
  const oy = OFF + (ROWS - R) * U;
  const at = ([x, y]: Pt): Pt => [ox + x * U, oy + y * U];
  const f = (p: Pt) => `${at(p)[0].toFixed(1)} ${at(p)[1].toFixed(1)}`;
  const inside = (i: number, j: number) => j >= 0 && j < R && i >= 0 && i < rows[j].length && rows[j][i] === "#";
  const mirror = new Set(mirrors);

  /* The pen starts on the bottom edge of the lowest row, at its left. */
  const start: Pt = [2 * rows[R - 1].indexOf("#") + 1, 2 * R];
  let [x, y] = start;
  let dx = 1;
  let dy = -1;
  const pts: Pt[] = [start];
  for (let guard = 0; guard < 4000; guard++) {
    x += dx;
    y += dy;
    if (x % 2 === 0) {
      if (!(inside(x / 2 - 1, (y - 1) / 2) && inside(x / 2, (y - 1) / 2) && !mirror.has(`${x},${y}`))) dx = -dx;
    } else if (!(inside((x - 1) / 2, y / 2 - 1) && inside((x - 1) / 2, y / 2) && !mirror.has(`${x},${y}`))) {
      dy = -dy;
    }
    if (x === start[0] && y === start[1]) break;
    pts.push([x, y]);
  }

  /* Straight through every crossing, a quarter circle at every turn; the
     first turn is split at its apex so the line begins and ends there. */
  const n = pts.length;
  const turn = (i: number) => {
    const a = pts[(i - 1 + n) % n];
    const b = pts[i];
    const c = pts[(i + 1) % n];
    const m1 = mid(a, b);
    const m2 = mid(b, c);
    const straight = b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1];
    return { m1, m2, c1: lerp(m1, b, K), c2: lerp(m2, b, K), straight };
  };
  const t0 = turn(0);
  const A = lerp(t0.m1, t0.c1, 0.5);
  const B = lerp(t0.c1, t0.c2, 0.5);
  const Cc = lerp(t0.c2, t0.m2, 0.5);
  const D = lerp(A, B, 0.5);
  const E = lerp(B, Cc, 0.5);
  const F = lerp(D, E, 0.5);
  let d = `M${f(F)}C${f(E)} ${f(Cc)} ${f(t0.m2)}`;
  for (let i = 1; i < n; i++) {
    const t = turn(i);
    d += t.straight ? `L${f(t.m2)}` : `C${f(t.c1)} ${f(t.c2)} ${f(t.m2)}`;
  }
  d += `C${f(A)} ${f(D)} ${f(F)}`;

  const dots: Pt[] = [];
  rows.forEach((row, j) => [...row].forEach((c, i) => c === "#" && dots.push(at([2 * i + 1, 2 * j + 1]))));
  return { d, dots, start: at(F) };
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SeatGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`h-3.5 w-3.5 shrink-0 ${className}`} aria-hidden>
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="rgb(var(--blue))" strokeWidth="1.3" strokeDasharray="2.2 2" />
    </svg>
  );
}

export default function KolamCulture({ heading }: { heading: ReactNode }) {
  const content = ABOUT_STORY.culture;
  const welcome = content.welcome;
  const [figure, setFigure] = useState(0);
  const geo = useMemo(() => build(figure), [figure]);
  const [done, setDone] = useState(true); // the line is closed; SSR and no-JS show the finished figure
  const [dotsOn, setDotsOn] = useState(true);
  const [focus, setFocus] = useState(0);
  const [lap, setLap] = useState(0);

  const figRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const penRef = useRef<SVGCircleElement>(null);
  const frame = useRef(0);
  const pending = useRef<number | null>(null);

  const finish = useCallback(() => {
    const line = lineRef.current;
    if (line) {
      line.style.strokeDasharray = "";
      line.style.strokeDashoffset = "";
      line.style.opacity = "1";
    }
    if (trailRef.current) trailRef.current.style.opacity = "0";
    if (penRef.current) penRef.current.style.opacity = "0";
    setDone(true);
  }, []);

  const draw = useCallback(
    (duration: number) => {
      const line = lineRef.current;
      const trail = trailRef.current;
      const pen = penRef.current;
      if (!line || !trail || !pen) return;
      cancelAnimationFrame(frame.current);
      if (reducedMotion()) {
        finish();
        return;
      }
      const length = line.getTotalLength();
      line.style.transition = "none";
      line.style.opacity = "1";
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      trail.style.strokeDasharray = `${TRAIL * length} ${length}`;
      trail.style.opacity = "1";
      setDone(false);
      const begin = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - begin) / duration);
        const p = ease(t);
        line.style.strokeDashoffset = `${length * (1 - p)}`;
        trail.style.strokeDashoffset = `${length * (TRAIL - p)}`;
        const point = line.getPointAtLength(p * length);
        pen.setAttribute("cx", point.x.toFixed(2));
        pen.setAttribute("cy", point.y.toFixed(2));
        pen.style.opacity = "1";
        if (t < 1) frame.current = requestAnimationFrame(step);
        else finish();
      };
      frame.current = requestAnimationFrame(step);
    },
    [finish]
  );

  /* Hide the line once mounted, then draw it the first time it is seen.
     Without script, or with reduced motion, the finished figure stays. */
  useEffect(() => {
    const fig = figRef.current;
    const line = lineRef.current;
    if (!fig || !line || reducedMotion()) return;
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;
    setDone(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        draw(FIRST_DRAW);
      },
      { threshold: 0.8 }
    );
    observer.observe(fig);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [draw]);

  /* A new figure has rendered: lay its dots, then draw it. */
  useEffect(() => {
    if (pending.current === null) return;
    const duration = pending.current;
    pending.current = null;
    setDotsOn(true);
    const id = window.setTimeout(() => draw(duration), 260);
    return () => window.clearTimeout(id);
  }, [figure, draw]);

  const redraw = () => {
    const line = lineRef.current;
    const next = (figure + 1) % FIGURES.length;
    cancelAnimationFrame(frame.current);
    if (!line || reducedMotion()) {
      setFigure(next);
      return;
    }
    setDone(false);
    setDotsOn(false);
    line.style.transition = "opacity 260ms ease";
    line.style.opacity = "0";
    window.setTimeout(() => {
      pending.current = REDRAW;
      setFigure(next);
    }, 300);
  };

  const enter = (k: number) => () => {
    setFocus(k);
    if (k === 3) setLap((v) => v + 1);
  };
  const leave = () => setFocus(0);
  const name = FIGURES[figure].name;

  return (
    <>
      <div className="grid items-start gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
        <div>{heading}</div>

        <figure data-about-reveal="80" className="mx-auto w-full max-w-[380px] lg:mt-2 lg:max-w-none">
          <div ref={figRef} className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {/* 01 replay: every dot gets its ring */}
              {geo.dots.map(([cx, cy], k) => (
                <circle
                  key={`ring-${figure}-${k}`}
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="none"
                  stroke="rgb(var(--ink))"
                  strokeWidth="2"
                  className="transition-opacity duration-300"
                  style={{ opacity: focus === 1 ? 0.6 : 0, transitionDelay: focus === 1 ? `${k * 12}ms` : "0ms" }}
                />
              ))}

              {/* The line: one stroke, never lifted, home where it began. Drawn
                  as the page's blue thread, the same line as [01]'s threads. */}
              <path
                ref={lineRef}
                d={geo.d}
                fill="none"
                stroke="rgb(var(--blue))"
                strokeOpacity={focus === 1 || focus === 3 ? 0.35 : 0.85}
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-[stroke-opacity] duration-300"
              />
              <path ref={trailRef} d={geo.d} fill="none" stroke="rgb(var(--blue))" strokeWidth="4.4" strokeLinecap="round" style={{ opacity: 0 }} />

              {/* 02 replay: the line keeps moving */}
              {focus === 2 && (
                <path d={geo.d} fill="none" stroke="rgb(var(--background))" strokeWidth="3.4" strokeDasharray="6 22" className="kolam-march" />
              )}
              {/* 03 replay: once round, back to the start */}
              {focus === 3 && (
                <path key={lap} d={geo.d} pathLength={1} fill="none" stroke="rgb(var(--ink))" strokeWidth="4.4" strokeLinecap="round" className="kolam-lap" />
              )}

              {/* Dots first, as on any doorstep */}
              <g className="transition-opacity duration-300" style={{ opacity: dotsOn ? 1 : 0 }}>
                {geo.dots.map(([cx, cy], k) => (
                  <circle key={`dot-${figure}-${k}`} cx={cx} cy={cy} r="4.2" className="fill-ink" />
                ))}
              </g>

              {/* Where the hand starts, and returns */}
              <circle cx={geo.start[0]} cy={geo.start[1]} r="7" fill="rgb(var(--ink))" stroke="rgb(var(--background))" strokeWidth="2.6" style={{ opacity: dotsOn ? 1 : 0 }} />
              <circle ref={penRef} r="8.5" fill="rgb(var(--ink))" stroke="rgb(var(--background))" strokeWidth="2.6" style={{ opacity: 0 }} />
            </svg>
          </div>

          <figcaption className="mt-6 flex flex-col items-center gap-3">
            <span
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-blue transition-opacity duration-500"
              style={{ opacity: done ? 1 : 0 }}
            >
              {name}
            </span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <button
                type="button"
                onClick={redraw}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft transition-colors hover:border-ink hover:text-ink"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5V5h-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {content.redraw}
              </button>
              <span className="text-[13px] text-secondary-text">{content.redrawNote}</span>
            </span>
            <span className="sr-only" aria-live="polite">{`Kolam drawn as ${name}`}</span>
          </figcaption>
        </figure>
      </div>

      {/* The three rules, one row */}
      <ol className="mt-12 grid gap-10 border-t border-lineSoft pt-10 lg:grid-cols-3 lg:gap-12">
        {content.rules.map((rule, k) => (
          <li key={rule.title} data-about-reveal={120 + k * 60} onMouseEnter={enter(k + 1)} onMouseLeave={leave}>
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-secondary-text">
              <span className="text-blue">{`0${k + 1}`}</span>&nbsp;&nbsp;Kolam rule
            </p>
            <h3 className="mt-3 font-heading text-[24px] font-medium leading-[1.2] tracking-tight xl:text-[26px]">
              <span className="block text-inkSoft">{rule.rule}</span>
              <span className="block text-ink">{rule.title}</span>
            </h3>
            <p className="mt-3 max-w-[24rem] text-[17px] leading-[1.65] text-secondary-text">{rule.body}</p>
          </li>
        ))}
      </ol>

      {/* The invitation: its own band, never a fourth rule */}
      <div
        data-about-reveal="200"
        className="mt-12 grid gap-8 border-t border-lineSoft pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16"
      >
        <div>
          <p className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-secondary-text">
            <SeatGlyph />
            {welcome.label}
          </p>
          <h3 className="mt-3 font-heading text-[24px] font-medium leading-[1.2] tracking-tight text-ink xl:text-[26px]">{welcome.title}</h3>
          <p className="mt-3 max-w-[24rem] text-[17px] leading-[1.65] text-secondary-text">{welcome.body}</p>
          <Link href="/careers" className="btn-primary mt-5">
            {welcome.link} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 lg:pt-1">
          {content.teams.map((group) => (
            <div key={group.group}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">{group.group}</dt>
              {group.items.map((item) => (
                <dd key={item} className="mt-3 flex items-start gap-2 text-[15px] leading-snug text-ink sm:gap-2.5 sm:text-[16px]">
                  <SeatGlyph className="mt-[3px] sm:mt-1" />
                  {item}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
