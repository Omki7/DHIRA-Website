"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./journey-explorer.css";
import { JOURNEY_CHAPTERS, JOURNEY_INTRO, JOURNEY_MOMENTS } from "@/lib/aboutJourney";
import { createJourneyNetwork } from "./journeyNetwork";

const SCROLL_SETTLE_MS = 135;

function Heading() {
  return <header className="jr-heading">
    <p className="jr-eyebrow"><span>02</span> THE JOURNEY</p>
    <div className="jr-heading-row"><div><h2>{JOURNEY_INTRO.title}</h2><p className="jr-intro">{JOURNEY_INTRO.description}</p></div><p className="jr-timespan">2018 <span aria-hidden="true">/</span> An open horizon</p></div>
  </header>;
}

export default function JourneyExplorer() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const moment = JOURNEY_MOMENTS[active];

  useEffect(() => {
    const viewport = matchMedia("(min-width: 700px) and (min-height: 740px), (min-width: 360px) and (min-height: 820px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(viewport.matches && !reduced.matches);
    update();
    viewport.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => { viewport.removeEventListener("change", update); reduced.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const track = trackRef.current, stage = stageRef.current, canvas = canvasRef.current;
    if (!track || !stage || !canvas) return;
    const network = createJourneyNetwork(canvas);
    if (!network) { setEnhanced(false); return; }
    const lastMoment = JOURNEY_MOMENTS.length - 1;
    let step = 210;
    let target = 0;
    let position = 0;
    let frame = 0;
    let lastTime = 0;
    let lastActive = -1;

    const readScroll = () => {
      const offset = parseFloat(getComputedStyle(stage).top);
      // A media change can hide the stage before React cleans up this effect.
      if (!Number.isFinite(offset)) return;
      const scrollProgress = Math.max(0, Math.min(lastMoment, (offset - track.getBoundingClientRect().top) / step));
      const nextActive = Math.min(lastMoment, Math.floor(scrollProgress + 0.5));
      target = nextActive;
      if (nextActive !== lastActive) { lastActive = nextActive; setActive(nextActive); }
    };
    const tick = (time: number) => {
      frame = 0;
      const elapsed = Math.min(40, lastTime ? time - lastTime : 16);
      lastTime = time;
      position += (target - position) * (1 - Math.exp(-elapsed / SCROLL_SETTLE_MS));
      if (Math.abs(target - position) < 0.0005) position = target;
      network.draw(position);
      if (position !== target) frame = requestAnimationFrame(tick);
      else lastTime = 0;
    };
    const schedule = () => {
      readScroll();
      if (!frame && target !== position) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      if (!stage.getClientRects().length) return;
      step = parseFloat(getComputedStyle(stage).getPropertyValue("--jr-step"));
      track.style.setProperty("--jr-travel", `${step * (lastMoment + 0.75)}px`);
      network.resize();
      readScroll();
      position = target;
      network.draw(position);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [enhanced]);

  return <div ref={trackRef} className="jr-track" data-enhanced={enhanced}>
    <div ref={stageRef} className="jr-stage" aria-hidden="true" data-year={moment.year} data-event={moment.id}>
      <Heading />
      <div className="jr-reading">
        <div className="jr-date-stack">
          {JOURNEY_CHAPTERS.map((chapter, index) => <p key={chapter.year} className="jr-year jr-layer" data-current={moment.yearIndex === index}>{chapter.year}</p>)}
        </div>
        <div className="jr-copy-stack">
          {JOURNEY_MOMENTS.map((event, index) => <article key={event.id} className="jr-event jr-layer" data-current={active === index} style={{ "--jr-accent": event.colour } as CSSProperties}>
            <div className="jr-event-meta"><p className="jr-category"><span />{event.category}</p>{event.eventCount > 1 && <span className="jr-event-count">{String(event.eventIndex + 1).padStart(2, "0")}<span>/</span>{String(event.eventCount).padStart(2, "0")}</span>}</div>
            <h3>{event.title}</h3>
            <p className="jr-description">{event.description}</p>
          </article>)}
        </div>
      </div>
      <div className="jr-network"><canvas ref={canvasRef} className="jr-network-canvas" /></div>
      <div className="jr-footline">
        <div className="jr-year-axis">
          {JOURNEY_CHAPTERS.map((chapter, index) => <div key={chapter.year} className="jr-year-stop" data-current={moment.yearIndex === index} data-past={moment.yearIndex > index} style={{ "--jr-accent": chapter.colour } as CSSProperties}><i /><span>{chapter.year}</span></div>)}
        </div>
        <svg className="jr-scroll-hint" viewBox="0 0 12 16" fill="none"><path d="M6 1v12m-4-4 4 4 4-4" /></svg>
      </div>
    </div>
    <div className="jr-flow">
      <Heading />
      {JOURNEY_CHAPTERS.map((chapter) => <div key={chapter.year} className="jr-flow-year" data-future={chapter.future || undefined} style={{ "--jr-accent": chapter.colour } as CSSProperties}>
        <h3 className="jr-year">{chapter.year}</h3>
        <div className="jr-flow-events">{chapter.events.map((event) => <article key={event.id} className="jr-flow-event" style={{ "--jr-accent": event.colour } as CSSProperties}>
          <p className="jr-category"><span />{event.category}</p><h4>{event.title}</h4><p className="jr-description">{event.description}</p>
        </article>)}</div>
      </div>)}
    </div>
  </div>;
}
