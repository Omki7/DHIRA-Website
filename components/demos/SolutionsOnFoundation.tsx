"use client";

/*
 * Homepage [03]: the solutions, standing on Akashic (rebuilt 20 Oct 2026; the
 * founder: "it does not feel like solutions are built on top of Akashic").
 *
 * An elevation, read bottom up. Akashic is the slab along the bottom, its
 * seven modules side by side. The solutions stand on it, each on a stem.
 * One solution at a time fans its stem out into the modules its process
 * switches on (blue, solid); the dashed fourth block is the reader's next
 * process, and its fan reaches every module, dashed: all seven are already
 * there. That is the section's claim, drawn.
 *
 * Which modules each solution uses comes from the shared mapping in
 * content/pages/akashic.ts, never from this file. The active solution
 * cycles on screen (held off screen and under reduced motion, Rule 6a);
 * hovering or focusing a block takes over and stops the cycle.
 *
 * lg and up draw the fans from measured positions. Below lg the blocks stack
 * and each lists its modules in words above the same slab.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

export type FoundationBlock = {
  id: string;
  audience: string;
  name: string;
  benefit: string;
  href: string;
  linkLabel: string;
  /** The modules it switches on. Empty for the next process: every module is available. */
  modules: string[];
  next?: boolean;
};

type Props = {
  blocks: FoundationBlock[];
  modules: string[];
  foundation: { name: string; caption: string };
  usedLabel: string;
  legend: { on: string; available: string };
};

const CYCLE_MS = 4200;

type Geometry = { width: number; height: number; starts: { x: number; y: number }[]; ends: { x: number; y: number }[] };

export default function SolutionsOnFoundation({ blocks, modules, foundation, usedLabel, legend }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cellRefs = useRef<(HTMLLIElement | null)[]>([]);
  const onScreen = useOnScreen(rootRef);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const starts = blockRefs.current.map((el) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2 - box.left, y: r.bottom - box.top } : { x: 0, y: 0 };
    });
    const ends = cellRefs.current.map((el) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2 - box.left, y: r.top - box.top } : { x: 0, y: 0 };
    });
    setGeo({ width: box.width, height: box.height, starts, ends });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (reduced || held || !onScreen) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % blocks.length), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [active, held, reduced, onScreen, blocks.length]);

  const take = (i: number) => {
    setActive(i);
    setHeld(true);
  };

  const current = blocks[active];
  const lit = (name: string) => (current.next ? false : current.modules.includes(name));

  return (
    <div ref={rootRef} className="relative" onPointerLeave={() => setHeld(false)}>
      {/* The fans. Decorative: every block also lists its modules in words. */}
      {geo && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" width={geo.width} height={geo.height}>
          {blocks.map((block, i) => {
            const s = geo.starts[i];
            const on = i === active;
            const targets = block.next ? modules.map((_, k) => k) : block.modules.map((m) => modules.indexOf(m)).filter((k) => k >= 0);
            return (
              <g key={block.id}>
                {/* The stem every block stands on. */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={s.x}
                  y2={geo.ends[0]?.y ?? s.y}
                  stroke="rgb(var(--ink))"
                  strokeOpacity={on ? 0 : 0.18}
                  strokeDasharray={block.next ? "3 4" : undefined}
                  style={{ transition: "stroke-opacity 300ms cubic-bezier(0.2,0.8,0.2,1)" }}
                />
                {targets.map((k) => {
                  const e = geo.ends[k];
                  const mid = s.y + (e.y - s.y) * 0.55;
                  return (
                    <g key={k} style={{ opacity: on ? 1 : 0, transition: "opacity 360ms cubic-bezier(0.2,0.8,0.2,1)" }}>
                      <path
                        d={`M ${s.x} ${s.y} C ${s.x} ${mid}, ${e.x} ${mid}, ${e.x} ${e.y}`}
                        fill="none"
                        stroke="rgb(var(--blue))"
                        strokeOpacity={block.next ? 0.55 : 0.8}
                        strokeWidth={1.1}
                        strokeDasharray={block.next ? "3 4" : undefined}
                      />
                      <circle cx={e.x} cy={e.y} r={2.5} fill={block.next ? "rgb(var(--background))" : "rgb(var(--blue))"} stroke="rgb(var(--blue))" strokeWidth={1} />
                    </g>
                  );
                })}
                <circle cx={s.x} cy={s.y} r={2.5} fill={on ? "rgb(var(--blue))" : "rgb(var(--ink) / 0.3)"} />
              </g>
            );
          })}
        </svg>
      )}

      {/* The blocks. */}
      <ul className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {blocks.map((block, i) => {
          const on = i === active;
          return (
            <li key={block.id} className="min-w-0">
              <Link
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                href={block.href}
                onPointerEnter={() => take(i)}
                onFocus={() => take(i)}
                onBlur={() => setHeld(false)}
                className={`group flex h-full flex-col rounded-frame border p-5 transition-colors duration-300 ease-settle lg:p-6 ${
                  block.next
                    ? `border-dashed bg-transparent ${on ? "border-blue" : "border-line"}`
                    : `bg-background ${on ? "border-blue " : "border-subtle-stroke"}`
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{block.audience}</span>
                <span className="mt-3 text-balance text-[20px] font-semibold leading-tight tracking-tight text-ink lg:text-[21px]">{block.name}</span>
                <span className="mt-3 text-[15px] leading-relaxed text-inkSoft">{block.benefit}</span>
                {/* Below lg there are no fans, so the modules are said in words. */}
                <span className="mt-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.06em] text-blue lg:hidden">
                  {block.next ? modules.join(" · ") : block.modules.join(" · ")}
                </span>
                <span className="sr-only">
                  {usedLabel}: {(block.next ? modules : block.modules).join(", ")}.
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-medium text-ink transition-colors duration-250 group-hover:text-blue">
                  {block.linkLabel}
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden>
                    <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* The slab. */}
      <div className="relative mt-6 rounded-frame border border-blue-border bg-band p-3 lg:mt-24 lg:p-4">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {modules.map((name, k) => {
            const on = lit(name);
            const all = current.next;
            return (
              <li
                key={name}
                ref={(el) => {
                  cellRefs.current[k] = el;
                }}
                className={`flex h-12 items-center justify-center rounded-tile border px-2 text-center text-[13px] font-medium leading-tight transition-colors duration-300 ease-settle ${
                  on
                    ? "border-blue bg-background text-ink"
                    : all
                      ? "border-dashed border-blue/60 bg-background text-ink"
                      : "border-subtle-stroke bg-background text-tertiary-text"
                }`}
              >
                {name}
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center text-[15px] font-semibold tracking-tight text-ink">{nameOrWordmark(foundation.name)}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-secondary-text">{foundation.caption}</span>
        </div>
      </div>

      <ul className="mt-5 hidden flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.08em] text-inkSoft lg:flex" aria-hidden>
        <li className="flex items-center gap-2">
          <span className="block h-px w-6 bg-blue" />
          {legend.on}
        </li>
        <li className="flex items-center gap-2">
          <span className="block w-6 border-t border-dashed border-blue" />
          {legend.available}
        </li>
      </ul>
    </div>
  );
}
