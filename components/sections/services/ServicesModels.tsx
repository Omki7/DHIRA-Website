"use client";

/*
 * [02] Ways to work together: one decision the reader works through.
 *
 *   question  "What do you need?" is the root of a tree (homepage [01]'s
 *             branching question), splitting into two branch pills
 *   leaves    the five models, left to right from DHIRA doing the most to
 *             your team doing the most; each shows only what differs:
 *             who builds and who runs (blue = DHIRA, ink = your team)
 *   tour      like the homepage's module tour, the figure walks the five
 *             models on its own (hooks/useTour): the chosen model's route
 *             fills blue from the question with a disc at its head, and its
 *             card's top line fills in step; when both land, the next model
 *             takes over. The branch pill lights, the axis marker glides and
 *             the detail cross-fades (how it works, then a ledger of who
 *             delivers and who leads, never bullets). Picking a card stops the tour on it; the pause icon
 *             beside the question stops or resumes it. Hovering or focusing
 *             a card holds the clock and previews that route dashed (the
 *             site's "not yet" line)
 *
 * The routes are measured, not scaled: a ResizeObserver gives the tree's
 * width and every path is drawn in pixels onto exact fifths, so corners stay
 * round at any width. Motion is transform and opacity only (framer-motion
 * springs for the selection bar and the axis marker, pathLength for the
 * trace) and lands on its final state under reduced motion. The tree shows
 * from xl; below it each branch is a labelled list on a rail and the detail
 * opens under the row of the chosen card. A link to #model-<id> (or an older
 * anchor) picks that model.
 */

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import MotionToggle from "@/components/ui/MotionToggle";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import useDrawn from "@/hooks/useDrawn";
import useHashTarget from "@/hooks/useHashTarget";
import useMinWidth from "@/hooks/useMinWidth";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useTour from "@/hooks/useTour";
import type { ServicesPage, ServiceParty } from "@/content/pages/services";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const SPRING = { type: "spring", stiffness: 380, damping: 36 } as const;
/* Tree geometry in px: root node, the branch pills' band, the leaf tops. */
const ROOT_Y = 6;
const SPLIT_Y = 28;
const PILL_TOP = 48;
const FAN_Y = 112;
const TREE_H = 136;

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/* An orthogonal polyline with rounded corners. */
function rounded(points: [number, number][], radius = 10) {
  const p = points.filter((pt, i) => i === 0 || pt[0] !== points[i - 1][0] || pt[1] !== points[i - 1][1]);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const a = Math.hypot(x1 - x0, y1 - y0);
    const b = Math.hypot(x2 - x1, y2 - y1);
    const r = Math.min(radius, a / 2, b / 2);
    d += `L${x1 - ((x1 - x0) / a) * r} ${y1 - ((y1 - y0) / a) * r}Q${x1} ${y1} ${x1 + ((x2 - x1) / b) * r} ${y1 + ((y2 - y1) / b) * r}`;
  }
  const last = p[p.length - 1];
  return `${d}L${last[0]} ${last[1]}`;
}

/* The route from the question to leaf column `col`. One continuous path that
   runs behind its branch pill, so a fill (and the disc at its head) moves
   along it as one line: dashes restart on every sub-path. */
function route(width: number, branch: number, col: number) {
  const root = width / 2;
  const x = width * branch;
  const leaf = (width * (2 * col + 1)) / 10;
  return rounded([[root, ROOT_Y], [root, SPLIT_Y], [x, SPLIT_Y], [x, FAN_Y], [leaf, FAN_Y], [leaf, TREE_H]]);
}

/* Who does what, as a ledger rather than two bullet lists: one column per
   party under its key, hairline rows read across in pairs (DHIRA integrates
   the sources, your team gives the data access). Below sm the parties
   stack, each with its own rows. */
type Side = { label: string; party: ServiceParty; rows: string[] };
function PartyHead({ side }: { side: Side }) {
  return (
    <p className={`flex items-center gap-2 pb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${side.party === "dhira" ? "text-blue" : "text-ink"}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${side.party === "dhira" ? "bg-blue" : "bg-ink"}`} />
      {side.label}
    </p>
  );
}
function Ledger({ sides, className = "" }: { sides: Side[]; className?: string }) {
  const rows = Math.max(...sides.map((s) => s.rows.length));
  const cell = "border-t border-lineSoft py-3 text-pretty text-[14.5px] leading-snug text-ink";
  return (
    <div className={className}>
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-8">
        {sides.map((side) => <PartyHead key={side.label} side={side} />)}
        {Array.from({ length: rows }, (_, r) => sides.map((side) => <p key={`${side.label}-${r}`} className={cell}>{side.rows[r]}</p>))}
      </div>
      <div className="space-y-5 sm:hidden">
        {sides.map((side) => (
          <div key={side.label}>
            <PartyHead side={side} />
            {side.rows.map((text) => <p key={text} className={cell}>{text}</p>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Party({ party, label }: { party: ServiceParty; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium ${party === "dhira" ? "text-blue" : "text-ink"}`}>
      <span aria-hidden className="flex gap-0.5">
        {party !== "you" && <span className="h-2 w-2 rounded-full bg-blue" />}
        {party !== "dhira" && <span className="h-2 w-2 rounded-full bg-ink" />}
      </span>
      {label}
    </span>
  );
}

export default function ServicesModels({ content: c }: { content: ServicesPage["models"] }) {
  const leaves = useMemo(
    () => c.groups.flatMap((group, gi) => group.items.map((m) => ({ m, group, gi }))).map((leaf, col) => ({ ...leaf, col })),
    [c.groups],
  );
  /* Each branch sits over the middle of its own leaves. */
  const branchX = useMemo(
    () =>
      c.groups.map((g, gi) => {
        const start = c.groups.slice(0, gi).reduce((n, prev) => n + prev.items.length, 0);
        return (2 * start + g.items.length) / 10;
      }),
    [c.groups],
  );
  const ids = useMemo(() => leaves.map((l) => `model-${l.m.id}`), [leaves]);
  const aliases = useMemo(
    () => Object.fromEntries(leaves.flatMap((l) => (l.m.legacyAnchor ? [[l.m.legacyAnchor, `model-${l.m.id}`]] : []))),
    [leaves],
  );

  /* A link to a model picks it, as a reader's click does. */
  const target = useHashTarget(ids, aliases);
  const { ref: tourRef, active: selected, paused, cycling, progress, pick, toggle, hold } = useTour<HTMLDivElement>(leaves.length, { target });
  const [hover, setHover] = useState<number | null>(null);
  const active = leaves[selected];

  const wide = useMinWidth(1280);
  const reduced = usePrefersReducedMotion();
  const [treeRef, width] = useWidth<HTMLDivElement>();
  const [figureRef, drawn] = useDrawn<HTMLDivElement>(0.3);

  /* The disc rides the head of the filling route. */
  const traceRef = useRef<SVGPathElement>(null);
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  useMotionValueEvent(progress, "change", (p) => {
    const path = traceRef.current;
    if (!path) return;
    const point = path.getPointAtLength(p * path.getTotalLength());
    headX.set(point.x);
    headY.set(point.y);
  });

  const detail = (
    <div id="engagement-detail" className="overflow-hidden rounded-frame border border-line bg-background">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.m.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
          className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] xl:gap-10 xl:px-8"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-secondary-text">{active.group.label}</p>
            <h3 className="mt-2 text-[22px] font-medium tracking-tight text-ink">{active.m.title}</h3>
            <p className="mt-2 max-w-[34em] text-pretty text-[15px] leading-relaxed text-secondary-text">{active.m.description}</p>
          </div>
          <Ledger
            className="xl:border-l xl:border-lineSoft xl:pl-8"
            sides={[
              { label: c.detail.delivery, party: "dhira", rows: active.m.delivery },
              { label: c.detail.customer, party: "you", rows: active.m.customer },
            ]}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <section id="engagement-models" className="scroll-mt-28 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} />

        <MotionConfig reducedMotion="user">
          <LayoutGroup>
            <div ref={figureRef} data-drawn={drawn} className="mt-12 lg:mt-16">
              {/* The pause icon sits just past the question, out of the
                  flow, so the centred line does not shift. */}
              <p className="text-[22px] font-medium tracking-tight text-ink xl:text-center xl:text-[26px]">
                <span className="relative inline-block">
                  {c.question}
                  <span className="absolute left-full top-1/2 ml-3 flex -translate-y-1/2">
                    <MotionToggle paused={paused} onToggle={toggle} controls={c.tour} />
                  </span>
                </span>
              </p>

              <div {...hold}>

              {/* The tree (xl): routes in px, branch pills over them. */}
              <div ref={treeRef} aria-hidden className="relative mt-4 hidden xl:block" style={{ height: TREE_H }}>
                {width > 0 && (
                  <svg width={width} height={TREE_H} fill="none" strokeLinecap="round" className="absolute inset-0 overflow-visible">
                    {leaves.map((l) => (
                      <path key={l.m.id} d={route(width, branchX[l.gi], l.col)} pathLength={1} className="ad-draw stroke-line" strokeWidth={1} />
                    ))}
                    {hover !== null && hover !== selected && (
                      <path d={route(width, branchX[leaves[hover].gi], hover)} className="stroke-blue" strokeWidth={1.25} strokeDasharray="3 5" />
                    )}
                    {drawn && (
                      <motion.path ref={traceRef} d={route(width, branchX[active.gi], selected)} className="stroke-blue" strokeWidth={1.75} style={{ pathLength: progress }} />
                    )}
                    {drawn && cycling && <motion.circle r={4} className="fill-blue" style={{ x: headX, y: headY }} />}
                    <circle cx={width / 2} cy={ROOT_Y} r={4} className="fill-blue" />
                    {leaves.map((l) => (
                      <circle key={l.m.id} cx={(width * (2 * l.col + 1)) / 10} cy={TREE_H - 3} r={3} className={`transition-colors duration-200 ${l.col === selected ? "fill-blue" : "fill-line"}`} />
                    ))}
                  </svg>
                )}
                {c.groups.map((g, gi) => (
                  <span
                    key={g.id}
                    className={`absolute flex h-10 -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border bg-background px-4 transition-colors duration-200 ${active.gi === gi ? "border-blue" : "border-line"}`}
                    style={{ left: `${branchX[gi] * 100}%`, top: PILL_TOP }}
                  >
                    <span className={`font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors duration-200 ${active.gi === gi ? "text-blue" : "text-secondary-text"}`}>{g.label}</span>
                    <span className="text-[15px] font-medium text-ink">{g.title}</span>
                  </span>
                ))}
              </div>

              {/* The leaves render once: a five-column row under the tree
                  from xl, a labelled list per branch below it. */}
              <div ref={tourRef} className="xl:grid xl:grid-cols-5">
                {c.groups.map((g, gi) => (
                  <div key={g.id} className="mt-8 first:mt-6 xl:contents">
                    <p className="xl:sr-only">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-secondary-text">{g.label}</span>
                      <span className="mt-1 block text-[18px] font-medium tracking-tight text-ink">{g.title}</span>
                    </p>
                    <ul role="list" className="mt-4 grid grid-flow-row-dense gap-3 border-l border-line pl-5 sm:grid-cols-2 lg:grid-cols-3 xl:contents">
                      {leaves.filter((l) => l.gi === gi).map((l) => {
                        const on = l.col === selected;
                        return (
                          <Fragment key={l.m.id}>
                            <motion.li layout="position" id={`model-${l.m.id}`} className="relative scroll-mt-28 xl:px-2">
                              {l.m.legacyAnchor && <span id={l.m.legacyAnchor} className="absolute top-0 scroll-mt-28" />}
                              <span aria-hidden className="absolute -left-5 top-9 w-5 border-t border-line sm:hidden" />
                              <button
                                type="button"
                                aria-expanded={on}
                                aria-controls="engagement-detail"
                                onClick={() => pick(l.col)}
                                onPointerEnter={() => setHover(l.col)}
                                onPointerLeave={() => setHover(null)}
                                onFocus={() => setHover(l.col)}
                                onBlur={() => setHover(null)}
                                className={`relative flex h-full w-full flex-col overflow-hidden rounded-inner border bg-background p-5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${on ? "border-blue" : "border-card-line hover:border-default-stroke"}`}
                              >
                                {on && (
                                  <motion.span layoutId="engagement-selected" transition={SPRING} className="absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-blue-border">
                                    <motion.span className="block h-full origin-left bg-blue" style={{ scaleX: progress }} />
                                  </motion.span>
                                )}
                                <span className="block text-balance text-[17px] font-semibold leading-snug tracking-tight text-ink">{l.m.title}</span>
                                <span className="mt-1.5 block text-pretty text-[14px] leading-snug text-secondary-text">{l.m.need}</span>
                                <span className="mt-auto block pt-5">
                                  {(["builds", "runs"] as const).map((key) => (
                                    <span key={key} className="flex items-center justify-between gap-3 border-t border-dashed border-lineSoft py-2.5 last:pb-0">
                                      <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-secondary-text">{c.keys[key]}</span>
                                      <Party party={l.m[key]} label={c.parties[l.m[key]]} />
                                    </span>
                                  ))}
                                </span>
                              </button>
                            </motion.li>
                            {on && !wide && (
                              <motion.li layout="position" className="col-span-full">{detail}</motion.li>
                            )}
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* The order of the leaves (xl): a marker rides to the pick. */}
              <div aria-hidden className="mt-6 hidden xl:block">
                <div className="relative h-4 overflow-hidden">
                  <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2">
                    <span className="h-px flex-1 bg-blue" />
                    <span className="h-px flex-1 bg-ink" />
                  </span>
                  <motion.span className="absolute inset-0" initial={false} animate={{ x: `${(2 * selected + 1) * 10}%` }} transition={SPRING}>
                    <span className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background bg-blue" />
                  </motion.span>
                </div>
                <p className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em]">
                  <span className="text-blue">← {c.spectrum.dhira}</span>
                  <span className="text-ink">{c.spectrum.you} →</span>
                </p>
              </div>

              {wide && <motion.div layout="position" className="mt-8">{detail}</motion.div>}
              </div>
            </div>
          </LayoutGroup>
        </MotionConfig>

        <p className="mt-8 text-base font-medium tracking-tight text-ink">{c.coda}</p>
      </ScrollRevealRail>
    </section>
  );
}
