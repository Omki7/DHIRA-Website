"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";
import UCButton from "./UCButton";

// Blueprint trace of the Akashic mark (icons/AkashicLogo.tsx) scaled onto the
// 1600-unit drafting plane: apex (800,480), crossbar y=800, feet y=1120.
const CONSTRUCTION_LINES: [number, number, number, number][] = [
  [992, 0, 352, 1600],
  [608, 0, 1248, 1600],
  [800, 0, 800, 1600],
  [544, 0, 544, 1600],
  [1056, 0, 1056, 1600],
  [0, 480, 1600, 480],
  [0, 800, 1600, 800],
  [0, 1120, 1600, 1120],
];

// Hatched shapes are the mark's accent elements (crossbar + apex node);
// circle verts are single centre marks, bar verts are the quad corners.
const SHAPES = [
  {
    d: "M 783.3 473.3 L 816.7 486.7 L 560.7 1126.7 L 527.3 1113.3 Z",
    hatch: false,
    verts: [[783.3, 473.3], [816.7, 486.7], [560.7, 1126.7], [527.3, 1113.3]],
  },
  {
    d: "M 783.3 486.7 L 816.7 473.3 L 1072.7 1113.3 L 1039.3 1126.7 Z",
    hatch: false,
    verts: [[783.3, 486.7], [816.7, 473.3], [1072.7, 1113.3], [1039.3, 1126.7]],
  },
  {
    d: "M 672 782 L 928 782 L 928 818 L 672 818 Z",
    hatch: true,
    verts: [[672, 782], [928, 782], [928, 818], [672, 818]],
  },
  {
    d: "M 722 480 a 78 78 0 1 0 156 0 a 78 78 0 1 0 -156 0 Z",
    hatch: true,
    verts: [[800, 480]],
  },
  {
    d: "M 624 800 a 48 48 0 1 0 96 0 a 48 48 0 1 0 -96 0 Z",
    hatch: false,
    verts: [[672, 800]],
  },
  {
    d: "M 880 800 a 48 48 0 1 0 96 0 a 48 48 0 1 0 -96 0 Z",
    hatch: false,
    verts: [[928, 800]],
  },
  {
    d: "M 484 1120 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0 Z",
    hatch: false,
    verts: [[544, 1120]],
  },
  {
    d: "M 996 1120 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0 Z",
    hatch: false,
    verts: [[1056, 1120]],
  },
];

function DashLineV() {
  return (
    <svg width="1" height="100%" className="text-uc-line" aria-hidden="true">
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  );
}

function DashLineH() {
  return (
    <svg width="100%" height="1" className="text-uc-line" aria-hidden="true">
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  );
}

export default function UCSdk() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <div className="relative overflow-hidden border-y border-uc-line">
        {/* 24 x 8 dashed drafting grid (desktop) */}
        <div aria-hidden="true" className="hidden xl:block">
          <div className="relative grid aspect-[24/8] w-full">
            <div className="absolute inset-x-[0.5px] inset-y-0 flex justify-evenly">
              {Array.from({ length: 24 }, (_, i) => <DashLineV key={i} />)}
            </div>
            <div className="absolute inset-x-0 inset-y-[0.5px] flex flex-col justify-evenly">
              {Array.from({ length: 7 }, (_, i) => <DashLineH key={i} />)}
            </div>
          </div>
        </div>
        {/* clean plate zone behind the artwork (desktop) */}
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-1/2 bg-uc-bg xl:block" />

        {/* text plate */}
        <ScrollReveal className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center md:px-8 lg:py-24 xl:absolute xl:bottom-[12.5%] xl:left-[4.1667%] xl:top-[12.5%] xl:w-[45.8333%] xl:items-start xl:bg-uc-bg xl:px-8 xl:py-0 xl:text-left xl:outline xl:outline-1 xl:outline-uc-stroke">
          <div className="flex flex-col items-center gap-6 xl:items-start">
            <p className="inline-flex h-6 items-center rounded-lg bg-uc-pill px-1.5 text-[14px] font-medium leading-5 tracking-[-0.14px] text-uc-pilltext">
              Modules
            </p>
            <h2 className="text-[32px] font-medium leading-[36px] tracking-[-0.01em] lg:text-[40px] lg:leading-[44px]">
              <span className="block text-uc-text">BI. AI. ML. Agents.</span>
              <span className="block text-uc-dim">All on one governed foundation.</span>
            </h2>
            <UCButton href="/akashic#modules">Explore the modules</UCButton>
          </div>
        </ScrollReveal>

        {/* prism artwork */}
        <div className="relative aspect-[16/9] border-t border-uc-stroke xl:absolute xl:inset-y-0 xl:left-1/2 xl:right-0 xl:aspect-auto xl:border-t-0">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 xl:hidden">
            <DashLineH />
            <div className="absolute inset-x-0 top-[12.5%]"><DashLineH /></div>
            <div className="absolute inset-x-0 top-[87.5%]"><DashLineH /></div>
          </div>
          <svg
            viewBox="110 285 1380 920"
            className="absolute inset-0 size-full select-none"
            aria-hidden="true"
          >
            <g strokeDasharray="4 6" strokeWidth="1" stroke="#1E2547">
              {CONSTRUCTION_LINES.map(([x1, y1, x2, y2]) => (
                <line key={`${x1}-${y1}`} vectorEffect="non-scaling-stroke" x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
            </g>
            <defs>
              <pattern id="uc-hatch" width="1" height="16" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#2A3157" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </pattern>
            </defs>
            {SHAPES.map((poly, i) => (
              <motion.g
                key={poly.d}
                initial={reduced ? false : { opacity: 0, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <path fill="#0A0E24" d={poly.d} />
                {poly.hatch && <path fill="url(#uc-hatch)" d={poly.d} />}
                <motion.path
                  d={poly.d}
                  fill="none"
                  stroke="#2A3157"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.g
                  stroke="#545E82"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
                >
                  {poly.verts.map(([x, y]) => (
                    <line
                      key={`${x}-${y}`}
                      x1={x}
                      y1={y}
                      x2={x + 0.01}
                      y2={y}
                      strokeWidth="5"
                      strokeLinecap="square"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </motion.g>
              </motion.g>
            ))}
            {/* The mark's two floating accent dots, as dashed ghost circles.
                Positions are icons/AkashicLogo.tsx's (124,30) r4 and (80,26)
                r3.4 carried across at 256/42 — they had drifted low enough to
                collide with the apex node, where the real mark floats them
                clear above it. */}
            <motion.g
              fill="none"
              stroke="#2A3157"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <circle cx="946" cy="358" r="24" vectorEffect="non-scaling-stroke" />
              <circle cx="678" cy="334" r="21" vectorEffect="non-scaling-stroke" />
            </motion.g>
          </svg>
        </div>
      </div>
      <div aria-hidden="true" className="h-16 md:h-32" />
    </>
  );
}
