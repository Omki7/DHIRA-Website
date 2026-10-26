"use client";

/*
 * [03] What we build: the six disciplines on the layers of one stack, in the
 * /akashic [04] layer frame, made to work like [02].
 *
 *   layers    Applications, Intelligence, Data, Infrastructure; a blue bar
 *             where Akashic covers the layer, ink where the work is custom
 *   wires     each discipline (left) is wired to what covers it (right):
 *             Akashic modules by their one name, where Akashic runs, or the
 *             one custom node. Grey at rest, blue for the chosen discipline,
 *             whose covering nodes light up
 *   tour      the figure walks the six on its own (hooks/useTour): the
 *             chosen discipline's wires fill blue with a disc at each head
 *             and its tile's top line fills in step, then the next takes
 *             over. Picking a tile stops the tour on it; the pause icon in
 *             the head row stops or resumes it. Hovering or focusing a tile
 *             holds the clock and previews its wires dashed
 *   detail    the band under the layers cross-fades: scope, then typical
 *             delivery and where Akashic fits as tags (ui/Tag, never
 *             bullets)
 *
 * Wires are measured, not scaled: each layer row measures its tiles and
 * nodes with a ResizeObserver and draws in pixels. Motion is transform and
 * opacity only and lands on its final state under reduced motion. Wires
 * show from xl; below it each layer lists its tiles, then its nodes as
 * chips, and the detail opens under the chosen tile's row.
 */

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";
import MotionToggle from "@/components/ui/MotionToggle";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import useMinWidth from "@/hooks/useMinWidth";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useTour from "@/hooks/useTour";
import type { ServicesPage } from "@/content/pages/services";

type Capabilities = ServicesPage["capabilities"];
type Layer = Capabilities["layers"][number];
type Item = Layer["items"][number];

const EASE = [0.2, 0.8, 0.2, 1] as const;
const SPRING = { type: "spring", stiffness: 380, damping: 36 } as const;
const GRID = "xl:grid-cols-[150px_minmax(0,0.85fr)_minmax(120px,0.55fr)_230px]";
const MONO = "font-mono text-[11px] uppercase tracking-[0.08em]";

const wire = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  const dx = (x2 - x1) / 2;
  return `M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
};

/* The chosen discipline's wire: fills with the tour, a disc at its head. */
function LiveWire({ d, progress, cycling }: { d: string; progress: MotionValue<number>; cycling: boolean }) {
  const ref = useRef<SVGPathElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useMotionValueEvent(progress, "change", (p) => {
    const path = ref.current;
    if (!path) return;
    const point = path.getPointAtLength(p * path.getTotalLength());
    x.set(point.x);
    y.set(point.y);
  });
  return (
    <>
      <motion.path ref={ref} d={d} className="stroke-blue" strokeWidth={1.5} style={{ pathLength: progress }} />
      {cycling && <motion.circle r={3.5} className="fill-blue" style={{ x, y }} />}
    </>
  );
}

type Geometry = { w: number; h: number; tiles: [number, number][]; nodes: Record<string, [number, number]> };

function LayerRow({
  layer,
  first,
  activeId,
  hoverId,
  progress,
  cycling,
  wide,
  detail,
  fitLabel,
  onPick,
  onHover,
}: {
  layer: Layer;
  first: number;
  activeId: string;
  hoverId: string | null;
  progress: MotionValue<number>;
  cycling: boolean;
  wide: boolean;
  detail: ReactNode;
  fitLabel: string;
  onPick: (index: number) => void;
  onHover: (id: string | null) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const nodes = useRef<Record<string, HTMLLIElement | null>>({});
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(() => {
      const box = row.getBoundingClientRect();
      if (!box.width) return;
      const at = (el: Element | null | undefined, side: "left" | "right"): [number, number] => {
        const r = el?.getBoundingClientRect();
        return r ? [r[side] - box.left, r.top + r.height / 2 - box.top] : [0, 0];
      };
      setGeo({
        w: box.width,
        h: box.height,
        tiles: layer.items.map((_, i) => at(tiles.current[i], "right")),
        nodes: Object.fromEntries(layer.nodes.map((n) => [n.id, at(nodes.current[n.id], "left")])),
      });
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, [layer]);

  const custom = layer.nodes.every((n) => n.custom);
  const activeItem = layer.items.find((item) => item.id === activeId);
  const lit = new Set(activeItem?.fit ?? []);

  return (
    <div ref={rowRef} className={`relative grid gap-4 border-b border-lineSoft px-5 py-5 xl:items-center xl:gap-0 xl:px-8 xl:py-4 ${GRID}`}>
      <span aria-hidden className={`absolute inset-y-0 left-0 w-[3px] ${custom ? "bg-ink" : "bg-blue"}`} />

      {wide && geo && (
        <svg aria-hidden width={geo.w} height={geo.h} fill="none" strokeLinecap="round" className="pointer-events-none absolute inset-0 overflow-visible">
          {layer.items.map((item, i) =>
            item.fit.map((id) => {
              const d = wire(geo.tiles[i], geo.nodes[id]);
              if (item.id === activeId) return <LiveWire key={`${item.id}-${id}`} d={d} progress={progress} cycling={cycling} />;
              const preview = item.id === hoverId;
              return <path key={`${item.id}-${id}`} d={d} className={preview ? "stroke-blue" : "stroke-line"} strokeWidth={preview ? 1.25 : 1} strokeDasharray={preview ? "3 5" : undefined} />;
            }),
          )}
        </svg>
      )}

      <h3 className={`${MONO} font-medium xl:self-start xl:pt-3 ${custom ? "text-ink" : "text-blue"}`}>{layer.label}</h3>

      <ul role="list" className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {layer.items.map((item, i) => {
          const on = item.id === activeId;
          return (
            <Fragment key={item.id}>
              <motion.li layout="position" className="relative">
                <button
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={on}
                  aria-controls="engineering-detail"
                  onClick={() => onPick(first + i)}
                  onPointerEnter={() => onHover(item.id)}
                  onPointerLeave={() => onHover(null)}
                  onFocus={() => onHover(item.id)}
                  onBlur={() => onHover(null)}
                  className={`relative block w-full overflow-hidden rounded-inner border bg-background px-4 py-2.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${on ? "border-blue" : "border-card-line hover:border-default-stroke"}`}
                >
                  {on && (
                    <motion.span layoutId="engineering-selected" transition={SPRING} className="absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-blue-border">
                      <motion.span className="block h-full origin-left bg-blue" style={{ scaleX: progress }} />
                    </motion.span>
                  )}
                  <span className="block text-[15.5px] font-semibold tracking-tight text-ink">{item.title}</span>
                  <span className="mt-0.5 block text-pretty text-[13px] leading-snug text-secondary-text">{item.scope}</span>
                </button>
              </motion.li>
              {on && !wide && <motion.li layout="position" className="col-span-full">{detail}</motion.li>}
            </Fragment>
          );
        })}
      </ul>

      <span aria-hidden className="hidden xl:block" />

      <div>
        <p className={`${MONO} mb-2 text-secondary-text xl:sr-only`}>{fitLabel}</p>
        <ul role="list" className="flex flex-wrap gap-1.5 xl:flex-col xl:items-start xl:gap-1">
          {layer.nodes.map((n) => (
            <li
              key={n.id}
              ref={(el) => {
                nodes.current[n.id] = el;
              }}
              className="relative flex"
            >
              <Tag tone={lit.has(n.id) ? (n.custom ? "custom" : "akashic") : "muted"} preview={n.preview} className="transition-colors duration-200 xl:h-[26px]">
                {n.name}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesCapabilities({ content: c }: { content: Capabilities }) {
  const items = useMemo(
    () => c.layers.flatMap((layer) => layer.items.map((item) => ({ item, layer }))),
    [c.layers],
  );
  const firsts = useMemo(() => c.layers.map((_, li) => c.layers.slice(0, li).reduce((n, l) => n + l.items.length, 0)), [c.layers]);
  const { ref: tourRef, active, paused, cycling, progress, pick, toggle, hold } = useTour<HTMLDivElement>(items.length);
  const [hover, setHover] = useState<string | null>(null);
  const wide = useMinWidth(1280);
  const reduced = usePrefersReducedMotion();
  const current: { item: Item; layer: Layer } = items[active];
  const covering = current.layer.nodes.filter((n) => current.item.fit.includes(n.id));

  const detail = (
    <div id="engineering-detail" className="overflow-hidden rounded-frame border border-line bg-background xl:rounded-none xl:border-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
          className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] xl:gap-10 xl:px-8 xl:py-6"
        >
          <div>
            <p className={`${MONO} ${covering.some((n) => n.custom) ? "text-ink" : "text-blue"}`}>{current.layer.label}</p>
            <h4 className="mt-2 text-[22px] font-medium tracking-tight text-ink">{current.item.title}</h4>
            <p className="mt-2 max-w-[34em] text-pretty text-[15px] leading-relaxed text-secondary-text">{current.item.scope}</p>
          </div>
          <div className="border-t border-lineSoft pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
            <p className={`${MONO} text-secondary-text`}>{c.detail.delivery}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {current.item.deliverables.map((text) => (
                <li key={text}>
                  <Tag>{text}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-lineSoft pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
            <p className={`${MONO} text-secondary-text`}>{c.detail.fit}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {covering.map((n) => (
                <li key={n.id}>
                  <Tag tone={n.custom ? "custom" : "akashic"} preview={n.preview}>{n.name}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <section id="capabilities" className="scroll-mt-28 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede}>
          <SectionLink href={c.link.href}>{c.link.label}</SectionLink>
        </SectionHeader>

        <ScrollReveal className="mt-12 lg:mt-14">
          <MotionConfig reducedMotion="user">
            <LayoutGroup>
              <div ref={tourRef} className="overflow-hidden rounded-frame border border-line bg-background">
                {/* Column heads; the pause icon ends the row, beside the
                    figure it stops. */}
                <div className={`flex items-center justify-between gap-4 border-b border-line bg-panel px-5 py-2.5 ${MONO} font-medium text-secondary-text xl:grid xl:px-8 ${GRID}`}>
                  <span className="hidden xl:block">{c.columns.layer}</span>
                  <span>{c.columns.work}</span>
                  <span aria-hidden className="hidden xl:block" />
                  <span className="flex items-center justify-between gap-3">
                    <span className="hidden xl:inline">{c.columns.fit}</span>
                    <MotionToggle paused={paused} onToggle={toggle} controls={c.tour} />
                  </span>
                </div>

                <div {...hold}>
                  {c.layers.map((layer, li) => (
                    <LayerRow
                      key={layer.id}
                      layer={layer}
                      first={firsts[li]}
                      activeId={current.item.id}
                      hoverId={hover}
                      progress={progress}
                      cycling={cycling}
                      wide={wide}
                      detail={detail}
                      fitLabel={c.columns.fit}
                      onPick={pick}
                      onHover={setHover}
                    />
                  ))}
                  {wide && <motion.div layout="position">{detail}</motion.div>}
                </div>

                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line bg-panel px-5 py-3 text-xs text-secondary-text xl:px-8" aria-hidden="true">
                  <li className="flex items-center gap-2"><span className="h-3 w-5 rounded-[2px] border border-blue-border bg-blue-subtle" />{c.legend.module}</li>
                  <li className="flex items-center gap-2"><span className="h-3 w-5 rounded-[2px] border border-ink" />{c.legend.custom}</li>
                </ul>
              </div>
            </LayoutGroup>
          </MotionConfig>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
