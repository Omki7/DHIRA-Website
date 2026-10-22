"use client";

/*
 * The context tentacles under the /akashic hero stage (restored 20 Oct 2026
 * from HexConnectionsMockup, git 3b9d8c4, on the founder's request).
 *
 * One node per module screen above it, in the SAME order: the module's name,
 * then what it adds to the organisation's context. Four hairlines leave each
 * node and converge on the context box below, so the drawing says what the
 * seven modules are for. The nodes are also the stage's index: pressing one
 * brings its screen to the front, and the front screen's lines turn blue and
 * run (`dashmove`, held off screen by OffscreenAnimationGate).
 *
 * lg and up only. Below lg the seven nodes would sit under 120px apart, so phones
 * and tablets get the same index as one scrolling row of module names.
 */

import { useEffect, useRef, useState } from "react";
import AkashicWordmark from "@/components/icons/AkashicWordmark";

type Node = { module: string; adds: string };

const ROW_Y = 54; // where the lines leave the nodes
const CONVERGE_Y = 196; // top edge of the context box: every line ends here
const LINES_PER_NODE = 4;
const SPREAD = 132; // endpoint fan across the box's top edge

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const cy = y1 + (y2 - y1) * 0.78;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
};

export default function ContextTentacles({
  nodes,
  active,
  resetKey,
  durationMs,
  onSelect,
}: {
  nodes: Node[];
  active: number;
  resetKey: number;
  /** 0 under reduced motion: no progress fill. */
  durationMs: number;
  onSelect: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spacing = width / (nodes.length + 1);
  const cx = width / 2;

  const progress = (isActive: boolean) =>
    isActive &&
    durationMs > 0 && (
      <span
        key={resetKey}
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-blue"
        style={{ animation: `progressFill ${durationMs}ms linear forwards` }}
      />
    );

  return (
    <>
      {/* lg and up: the drawing, with the nodes as its controls. */}
      <div ref={ref} className="relative mx-auto mt-6 hidden h-[262px] w-full select-none lg:block">
        <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
          {nodes.map((node, i) => {
            const x = spacing * (i + 1);
            const on = i === active;
            return (
              <g key={node.module}>
                {Array.from({ length: LINES_PER_NODE }, (_, k) => {
                  const offset = (k - (LINES_PER_NODE - 1) / 2) * (SPREAD / LINES_PER_NODE);
                  return (
                    <path
                      key={k}
                      d={curve(x, ROW_Y, cx + offset, CONVERGE_Y)}
                      fill="none"
                      stroke={on ? "rgb(var(--blue))" : "rgb(var(--line))"}
                      strokeWidth={on ? 1.1 : 0.8}
                      strokeDasharray={on ? "3 5" : undefined}
                      className={on ? "animate-[dashmove_1.2s_linear_infinite]" : undefined}
                      style={{ transition: "stroke-opacity 400ms cubic-bezier(0.2,0.8,0.2,1)" }}
                    />
                  );
                })}
                <circle cx={x} cy={ROW_Y} r={on ? 3 : 2} fill={on ? "rgb(var(--blue))" : "rgb(var(--overcast))"} />
              </g>
            );
          })}
        </svg>

        {nodes.map((node, i) => {
          const on = i === active;
          return (
            <button
              key={node.module}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={on}
              className="group absolute top-0 flex w-[160px] -translate-x-1/2 flex-col items-center pb-2 text-center"
              style={{ left: spacing * (i + 1) }}
            >
              {/* Full module names ("Business Intelligence") hold one line. */}
              <span className={`font-mono text-[10px] uppercase tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${on ? "text-blue" : "text-tertiary-text group-hover:text-secondary-text"}`}>
                {node.module}
              </span>
              <span className={`mt-1 whitespace-nowrap text-[12px] leading-snug transition-colors duration-200 xl:text-[13px] ${on ? "font-semibold text-primary-text" : "text-secondary-text group-hover:text-primary-text"}`}>
                {node.adds}
              </span>
              <span aria-hidden className="absolute bottom-0 left-1/2 h-px w-10 -translate-x-1/2 overflow-hidden">
                {progress(on)}
              </span>
            </button>
          );
        })}

        {/* Where the lines unite: what the seven modules add up to. */}
        <div
          className="absolute -translate-x-1/2 border border-line bg-background px-7 py-3.5 text-center"
          style={{ left: cx, top: CONVERGE_Y }}
        >
          <AkashicWordmark className="justify-center font-mono text-[10px] uppercase tracking-[0.08em] text-tertiary-text" />
          <span className="mt-1 block text-[14px] font-medium tracking-tight text-primary-text">Organisational context</span>
        </div>
      </div>

      {/* Phones and tablets: the same index, one scrolling row. */}
      <div className="mx-auto mt-5 flex w-fit max-w-full items-center gap-5 overflow-x-auto px-4 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {nodes.map((node, i) => {
          const on = i === active;
          return (
            <button
              key={node.module}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={on}
              className={`relative shrink-0 whitespace-nowrap pb-2.5 text-[14.5px] tracking-tight transition-colors duration-200 ${
                on ? "font-semibold text-primary-text" : "text-tertiary-text"
              }`}
            >
              {node.module}
              <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-tertiary-text/15" />
              {progress(on)}
            </button>
          );
        })}
      </div>
    </>
  );
}
