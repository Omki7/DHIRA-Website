"use client";

/*
 * [00] Delivery Hero — We deploy / build / advise. One standard.
 * The site's hero grammar (spinning conic pill, kinetic rotating verb, fixed
 * payoff line) anchored by the ENGAGEMENT CLOCK: the page's whole offer drawn
 * to scale on one 20-week axis. Three lanes — one per model, each a link to
 * its section — carry the real figures with nothing behind a hover: live at
 * week 6, MVP inside weeks 10–20, audit inside weeks 2–4, the squad
 * open-ended. Colour encodes category, not decoration: blue = the platform
 * model, ink = the service models, light fills = time windows, dashes =
 * open-ended. Bar entrances reuse the rolloutBarIn keyframe (globals.css,
 * `.engagement-clock`); reduced motion rests the clock fully drawn.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* The three engagement models, as verbs. Same frame, different act. */
const modelVerbs = ["deploy", "build", "advise"];
const VERB_INTERVAL = 2600;

/* Week positions on the 0–20 axis, as percentages. */
const WEEKS = 20;
const wk = (n: number) => `${(n / WEEKS) * 100}%`;

const TICKS = [0, 5, 10, 15, 20];

/* One shared track chrome: dashed verticals every 5 weeks behind the bars. */
function Gridlines() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-0" aria-hidden>
      {TICKS.slice(1, -1).map((t) => (
        <span
          key={t}
          className="absolute inset-y-0 w-px border-l border-dashed border-lineSoft"
          style={{ left: wk(t) }}
        />
      ))}
    </div>
  );
}

function LaneLabel({
  num,
  name,
  phrase,
}: {
  num: string;
  name: string;
  phrase: string;
}) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[12px] font-semibold tracking-tight text-ink transition-colors duration-200 group-hover/lane:text-blue sm:text-[13.5px]">
        <span className="mr-1.5 font-mono text-[10px] font-semibold text-overcast">{num}</span>
        {name}
      </p>
      <p className="mt-0.5 hidden truncate font-mono text-[9.5px] uppercase tracking-[0.08em] text-overcast sm:block">
        {phrase}
      </p>
    </div>
  );
}

/* The Engagement Clock — every model drawn to scale on one axis. */
function EngagementClock() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const laneGrid =
    "group/lane relative grid grid-cols-1 gap-1.5 text-left sm:grid-cols-[196px_minmax(0,1fr)] sm:items-center sm:gap-5";

  return (
    <div ref={ref} data-visible={visible ? "true" : "false"} className="engagement-clock">
      {/* Instrument header */}
      <div className="flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-eyebrow">
        <span className="text-inkSoft">Three models, one clock</span>
        <span className="hidden text-overcast sm:inline">Timeline in weeks</span>
      </div>

      {/* Week axis. Offset matches the lane label column on sm+ so the ticks
          always sit over the bar tracks; below sm the lanes stack, so the
          track is full width. */}
      <div className="mt-3 sm:ml-[216px]">
        <div className="relative h-3">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] text-overcast"
              style={{
                left: wk(t),
                transform: t === WEEKS ? "translateX(-100%)" : t === 0 ? "none" : "translateX(-50%)",
              }}
            >
              {t === 0 ? (
                <>
                  0<span className="hidden sm:inline">{" "}· first call</span>
                </>
              ) : (
                t
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-4 border-t border-lineSoft pt-3.5 sm:space-y-2.5">
        {/* Lane 01 — Akashic Deployment: live at week 6 */}
        <Link
          href="#akashic-deployment"
          aria-label="Model 01, Akashic Deployment: live at week six. Jump to section."
          className={laneGrid}
        >
          <LaneLabel num="01" name="Akashic Deployment" phrase="Fragmented data" />
          <div className="relative h-9">
            <Gridlines />
            <span
              className={`ec-bar ec-lane-1 fl-sheen absolute left-0 top-1/2 h-7 -translate-y-1/2 overflow-hidden rounded-[7px] bg-gradient-to-b from-[#4A6CE0] to-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_-1px_rgba(62,99,221,0.4)] transition-shadow duration-300 group-hover/lane:shadow-frame`}
              style={{ width: wk(6) }}
            />
            <span
              className="absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 translate-x-1/2 rotate-45 border border-blue bg-white"
              style={{ right: wk(WEEKS - 6) }}
              aria-hidden
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-ink"
              style={{ left: `calc(${wk(6)} + 14px)` }}
            >
              Live · WK 6
            </span>
          </div>
        </Link>

        {/* Lane 02 — Product Engineering: MVP inside weeks 10–20 */}
        <Link
          href="#product-engineering"
          aria-label="Model 02, Product Engineering: MVP inside weeks ten to twenty. Jump to section."
          className={laneGrid}
        >
          <LaneLabel num="02" name="Product Engineering" phrase="A product to ship" />
          <div className="relative h-9">
            <Gridlines />
            <span
              className="ec-bar ec-lane-2 absolute left-0 top-1/2 h-7 -translate-y-1/2 rounded-l-[7px] bg-gradient-to-b from-[#2A2D2F] to-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-shadow duration-300 group-hover/lane:shadow-frame"
              style={{ width: wk(10) }}
            />
            <span
              className="ec-bar ec-lane-2w absolute top-1/2 flex h-7 -translate-y-1/2 items-center justify-center rounded-r-[7px] border border-dashed border-ink/30 bg-ink/[0.05]"
              style={{ left: wk(10), width: wk(10) }}
            >
              <span className="whitespace-nowrap font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-inkSoft sm:text-[9.5px]">
                MVP · WK 10–20
              </span>
            </span>
          </div>
        </Link>

        {/* Lane 03 — Advisory: audit inside weeks 2–4, squad open-ended */}
        <Link
          href="#advisory-co-engineering"
          aria-label="Model 03, Advisory and Co-Engineering: audit inside weeks two to four, squad open-ended. Jump to section."
          className={laneGrid}
        >
          <LaneLabel num="03" name="Advisory & Co-Engineering" phrase="Senior bandwidth" />
          <div className="relative h-9">
            <Gridlines />
            <span
              className="ec-bar ec-lane-3 absolute left-0 top-1/2 h-7 -translate-y-1/2 rounded-l-[7px] bg-gradient-to-b from-[#2A2D2F] to-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-shadow duration-300 group-hover/lane:shadow-frame"
              style={{ width: wk(2) }}
            />
            <span
              className="ec-bar ec-lane-3w absolute top-1/2 h-7 -translate-y-1/2 rounded-r-[7px] border border-dashed border-ink/30 bg-ink/[0.05]"
              style={{ left: wk(2), width: wk(2) }}
            />
            {/* The squad: open-ended continuation. Labels sit on white chips
                so the dashed line passes beneath them, map-style. */}
            <span
              className="ec-bar ec-lane-3c absolute top-1/2 h-px -translate-y-1/2 bg-[length:10px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#8E8F91_0_5px,transparent_5px_10px)]"
              style={{ left: `calc(${wk(4)} + 8px)`, right: "22px" }}
              aria-hidden
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-[4px] bg-white px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-ink"
              style={{ left: `calc(${wk(4)} + 12px)` }}
            >
              Audit · WK 2–4
            </span>
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 text-tertiary-text"
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              aria-hidden
            >
              <path d="M1 5h9M7 1.5 10.5 5 7 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-[4px] bg-white px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast md:inline"
              style={{ left: `calc(${wk(12)} + 12px)` }}
            >
              Squad · open-ended
            </span>
          </div>
        </Link>
      </div>

      {/* Closing thread */}
      <p className="mt-4 border-t border-lineSoft pt-3 text-center font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
        Every engagement opens with the Sovereign Blueprint &middot; no wrong doors
      </p>
    </div>
  );
}

export default function DeliveryHero() {
  const [verbIndex, setVerbIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => {
      setVerbIndex((i) => (i + 1) % modelVerbs.length);
    }, VERB_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <ScrollRevealRail>
        <div className="flex flex-col items-center justify-center pt-24 pb-14 text-center lg:pt-28 lg:pb-16">
          <ScrollReveal>
            {/* Spinning conic-gradient pill — the site's hero pill chrome
                (Hero.tsx / AkashicHero.tsx). Covered by the global
                reduced-motion override. */}
            <figure className="group relative mb-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-subtle-stroke p-[1px] shadow-sm transition-shadow hover:shadow">
              <span
                aria-hidden
                className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#266DF2_100%)] opacity-75 transition-opacity group-hover:opacity-100"
              />
              <span className="relative flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors group-hover:bg-white sm:text-sm">
                <span className="font-semibold text-primary-text">Delivery</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">One accountable partner</span>
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <h1 className="max-w-[17em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              We{" "}
              <span className="inline-grid align-baseline">
                {/* every verb shares one grid cell, so the cell is always as wide
                    as the widest word and the layout never shifts */}
                {modelVerbs.map((verb, i) => (
                  <span
                    key={verb}
                    aria-hidden={i !== verbIndex}
                    className="col-start-1 row-start-1 justify-self-center whitespace-nowrap"
                    style={{
                      opacity: i === verbIndex ? 1 : 0,
                      filter: i === verbIndex ? "blur(0)" : "blur(4px)",
                      transform: i === verbIndex ? "scale(1)" : "scale(0.96)",
                      transition:
                        "opacity 380ms cubic-bezier(0.2,0.8,0.2,1), filter 380ms cubic-bezier(0.2,0.8,0.2,1), transform 380ms cubic-bezier(0.2,0.8,0.2,1)",
                      transitionDelay: i === verbIndex ? "60ms" : "0ms",
                    }}
                  >
                    <span className="relative">
                      {verb}
                      <span
                        className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                        style={{
                          opacity: i === verbIndex ? 1 : 0,
                          transition: "opacity 380ms cubic-bezier(0.2,0.8,0.2,1)",
                          transitionDelay: i === verbIndex ? "180ms" : "0ms",
                        }}
                      />
                    </span>
                  </span>
                ))}
              </span>{" "}
              on your terms.
              <span className="mt-1.5 block sm:mt-2.5">One standard of accountability.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* One line, three parallel concrete acts — the clock below prices
                them, so this sentence only has to name them. */}
            <p className="mt-7 max-w-[42em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Our platform into your environment, your product into production,{" "}
              <br className="hidden sm:block" />
              or our squad into your sprints.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="#engagement-models" className="btn-secondary">
                See the three models
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={360} className="w-full">
            <div className="mx-auto mt-10 w-full max-w-[880px] lg:mt-12">
              <EngagementClock />
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
