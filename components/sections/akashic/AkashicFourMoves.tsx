"use client";

/*
 * [01] Akashic in action — the product page (eyebrow "Ask Akashic" since 14 Oct 2026)'s first fold, on the blue-tint
 * band (rgb(var(--band))) shared with the careers/company pages. Split stage: narrative
 * + world toggle left, a live ask
 * simulation right. The question types itself FIRST; the four moves stay
 * hidden until it finishes (their space is reserved so the fold never jumps),
 * then cascade in one by one, and the answer card pops in as a two-panel
 * evidence dossier: "From your systems" (numbers) beside "From your
 * documents" (the why) — the structured + unstructured pull made obvious in
 * plain words. The run plays once and persists; switching worlds replays it.
 *
 * Everything on the right is SIMULATED PRODUCT UI (AGENTS.md §8a): canned
 * copy and demo data for storytelling only.
 */

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { AkashicPage, AskWorld } from "@/content/pages/akashic";
import AkashicWordmark from "@/components/icons/AkashicWordmark";

type IconKey = AskWorld["chips"][number]["icon"];
type World = AskWorld;
type Chrome = AkashicPage["inAction"]["chrome"];

/* Bars plot percent-of-target on a 0–110% scale; the target line sits at 100. */
const CHART_MAX = 110;

function UiIcon({ icon, size = 10 }: { icon: IconKey; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (icon === "source") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }
  if (icon === "graph") {
    return (
      <svg {...common}>
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="19" cy="15" r="2.5" />
        <path d="M6.5 17L10.5 8M14 7.5l3.5 6M7.5 18.6l9-3.2" />
      </svg>
    );
  }
  if (icon === "bolt") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
      </svg>
    );
  }
  if (icon === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }
  if (icon === "report") {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 14l2.2 2.2L15 11.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The two evidence panels inside the answer card                     */
/* ------------------------------------------------------------------ */

function PanelHeader({
  icon,
  label,
  right,
}: {
  icon: IconKey;
  label: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 border-b border-card-divide bg-panel px-3 py-2">
      <span className="text-blue">
        <UiIcon icon={icon} size={11} />
      </span>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-secondary-text">
        {label}
      </span>
      <span className="ml-auto flex items-center">{right}</span>
    </div>
  );
}

function SystemsPanel({ world, chrome }: { world: World; chrome: Chrome }) {
  const { chart } = world;
  const targetLeft = `${(100 / CHART_MAX) * 100}%`;
  return (
    <div className="flex flex-col overflow-hidden rounded-inner border border-card-line bg-background">
      <PanelHeader
        icon="source"
        label={chrome.systems}
        right={
          <span
            className="rounded-full border border-red/20 bg-red/[0.06] px-2 py-0.5 font-mono text-[9px] font-semibold text-red"
            style={{ animation: "akx-rise 0.5s 0.95s cubic-bezier(0.2,0.8,0.2,1) both" }}
          >
            {chart.lagTag}
          </span>
        }
      />
      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-3">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-secondary-text">{chart.title}</p>
        <div className="flex flex-col gap-2">
          {chart.rows.map((row, i) => (
            <div key={row.label} className="grid grid-cols-[30px_1fr_38px] items-center gap-2">
              <span className={`font-mono text-[9px] ${row.lag ? "font-semibold text-red" : "text-secondary-text"}`}>
                {row.label}
              </span>
              <span className="relative block h-[10px] rounded-full bg-panel">
                <span
                  className={`absolute inset-y-0 left-0 origin-left rounded-full ${row.lag ? "bg-red" : "bg-blue"}`}
                  style={{
                    width: `${(row.pct / CHART_MAX) * 100}%`,
                    animation: `akx-fillx 0.8s cubic-bezier(0.2,0.8,0.2,1) ${0.25 + i * 0.14}s both`,
                  }}
                  aria-hidden
                />
                <span
                  className="absolute -bottom-[3px] -top-[3px] w-px border-l border-dashed border-overcast"
                  style={{ left: targetLeft }}
                  aria-hidden
                />
              </span>
              <span
                className={`text-right font-mono text-[10px] ${row.lag ? "font-bold text-red" : "font-medium text-inkSoft"}`}
              >
                {row.pct}%
              </span>
            </div>
          ))}
        </div>
        <p className="flex items-center justify-end gap-1.5 font-mono text-[9px] text-secondary-text" aria-hidden>
          <span className="inline-block h-3 w-px border-l border-dashed border-overcast" />
          {chrome.targetLine}
        </p>
      </div>
      <p
        className="border-t border-card-divide bg-panel px-3 py-2 text-[11px] leading-snug text-inkSoft"
        style={{ animation: "akx-rise 0.5s 1.1s cubic-bezier(0.2,0.8,0.2,1) both" }}
      >
        {chart.footnote}
      </p>
    </div>
  );
}

function DocumentsPanel({ world, chrome }: { world: World; chrome: Chrome }) {
  const { excerpt, record, counted } = world.docs;
  return (
    <div className="flex flex-col overflow-hidden rounded-inner border border-card-line bg-background">
      <PanelHeader
        icon="doc"
        label={chrome.documents}
        right={<span className="font-mono text-[9px] uppercase tracking-[0.06em] text-secondary-text">{counted}</span>}
      />
      <div className="flex flex-1 flex-col gap-2 bg-panel px-3 py-3">
        <div
          className="flex flex-1 flex-col rounded-inner border border-card-line bg-background p-2.5 "
          style={{ animation: "akx-rise 0.5s 0.45s cubic-bezier(0.2,0.8,0.2,1) both" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-chip bg-blue-subtle text-blue">
              <UiIcon icon={excerpt.icon} size={11} />
            </span>
            <span className="min-w-0 truncate text-[10.5px] font-semibold text-ink">{excerpt.source}</span>
            <span className="ml-auto shrink-0 font-mono text-[9px] text-secondary-text">{excerpt.date}</span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink">
            {excerpt.pre}
            <span
              style={{
                backgroundColor: "rgb(var(--diagram-gold-bg))",
                backgroundRepeat: "no-repeat",
                backgroundSize: "0% 100%",
                animation: "akx-mark 0.7s 1.35s cubic-bezier(0.2,0.8,0.2,1) both",
              }}
            >
              {excerpt.mark}
            </span>
            {excerpt.post}
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-inner border border-card-line bg-background p-2.5 "
          style={{ animation: "akx-rise 0.5s 0.65s cubic-bezier(0.2,0.8,0.2,1) both" }}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-chip bg-blue-subtle text-blue">
            <UiIcon icon={record.icon} size={11} />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10.5px] font-semibold leading-tight text-ink">{record.name}</span>
            <span className="truncate font-mono text-[9px] text-secondary-text">{record.sub}</span>
          </div>
          <span className="ml-auto shrink-0 rounded-micro border border-red/20 bg-red/5 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-red">
            {record.status}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function AkashicFourMoves({ content }: { content: AkashicPage["inAction"] }) {
  const { worlds, statusLabels: STATUS_LABELS, chrome } = content;
  const [active, setActive] = useState(0);
  const [typedRun, setTypedLen] = useState(0);
  const [phaseRun, setPhase] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const world = worlds[active];
  /* Reduced motion shows the finished run at once. */
  const typedLen = started && reduced ? world.question.length : typedRun;
  const phase = started && reduced ? 5 : phaseRun;
  const typingDone = typedLen >= world.question.length;
  const revealed = phase === 5;
  const running = started && !revealed;

  // Pull-to-pop: the moment the section peeks in from the wireframes above,
  // a rAF eased glide lands it flush with the viewport. Native smooth scroll
  // is too uneven across platforms for this to feel like one motion.
  useEffect(() => {
    if (reduced) return;
    let lastY = window.scrollY;
    let lastScrollTime = Date.now();
    let snapping = false;
    let cooldownUntil = 0;
    let rafId = 0;

    const abort = () => {
      if (snapping) {
        snapping = false;
        cancelAnimationFrame(rafId);
        cooldownUntil = Date.now() + 1200;
        lastY = window.scrollY;
      }
    };
    const onWheelUp = (e: WheelEvent) => {
      if (e.deltaY < 0) abort();
    };

    const glide = (targetY: number) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;
      const dur = Math.min(950, 480 + Math.abs(dist) * 0.4);
      const t0 = performance.now();
      snapping = true;
      let expectedY = startY;
      const ease = (t: number) => 1 - Math.pow(1 - t, 4);
      const stepFrame = (now: number) => {
        if (!snapping) return;

        // If the actual scroll position deviates from where we scrolled,
        // it means the user manually scrolled (wheel, trackpad, touch, etc.). Abort.
        const currentY = window.scrollY;
        if (Math.abs(currentY - expectedY) > 1.5) {
          abort();
          return;
        }

        const p = Math.min((now - t0) / dur, 1);
        const nextY = startY + dist * ease(p);
        expectedY = nextY;

        window.scrollTo(0, nextY);

        if (p < 1) {
          rafId = requestAnimationFrame(stepFrame);
        } else {
          snapping = false;
          cooldownUntil = Date.now() + 1600;
          lastY = window.scrollY;
        }
      };
      rafId = requestAnimationFrame(stepFrame);
    };

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const y = window.scrollY;
      const delta = y - lastY;
      const now = Date.now();
      const dt = now - lastScrollTime;
      lastY = y;
      lastScrollTime = now;

      if (snapping || delta <= 0) return;

      // If delta is large or scroll speed is high, user is scrolling fast. Avoid hijacking.
      const speed = dt > 0 ? Math.abs(delta) / dt : 0;
      if (speed > 1.5 || delta > 40) {
        cooldownUntil = Date.now() + 1000;
        return;
      }

      if (Date.now() < cooldownUntil) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // A light downward scroll with the section edge on screen pulls it flush.
      if (rect.top < vh - 72 && rect.top > vh * 0.22) {
        glide(y + rect.top);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheelUp, { passive: true });
    window.addEventListener("touchstart", abort, { passive: true });
    return () => {
      abort();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheelUp);
      window.removeEventListener("touchstart", abort);
    };
  }, [reduced]);

  // Start the run once, the first time the section is properly on screen.
  // It never resets on scroll-out: the answered state stays put.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The run: type the question, hold a beat on "Thinking", cascade the four
  // moves in order, then reveal the answer. Replays only on a world switch.
  useEffect(() => {
    if (!started || reduced) return;
    const q = worlds[active].question;
    const timers: number[] = [];
    let i = 0;
    const typer = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= q.length) {
        window.clearInterval(typer);
        [1, 2, 3, 4, 5].forEach((p, idx) => {
          timers.push(window.setTimeout(() => setPhase(p), 800 + idx * 850 + (p === 5 ? 250 : 0)));
        });
      }
    }, 22);
    return () => {
      window.clearInterval(typer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [started, active, reduced, worlds]);

  const solidShadow = "";

  return (
    <section id="akashic-in-action" className="relative scroll-mt-24 bg-background" ref={sectionRef}>
      <div className="rail-container flex flex-col justify-center border-x-0 pt-12 pb-16 lg:min-h-screen lg:py-10">
        {/* The site's one eyebrow rail, full width above both columns. The
            "See what's underneath" button that ended this section went on 20
            Oct 2026: no section ends on a next-section button (founder). */}
        <ScrollReveal>
          <FigureEyebrow num={content.eyebrow.number} label={content.eyebrow.label} />
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-14">

          {/* Left: narrative + world toggle */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div>
                {/* Header rewritten 14 Oct 2026 (user: "watch Akashic answer it.
                    no one cares"). The headline states the executive gain the demo
                    proves (the cause, fast, defensible); the mechanism moves to
                    the lede and the four moves on the right. */}
                {/* From lg the setup line must hold on one line in the 5-col
                    column, so the size tracks the column width (measured 14 Oct
                    2026: the setup is ~10.7x its font size wide). */}
                <h2 className="text-balance text-heading-sm font-semibold text-ink md:text-heading-md lg:text-[length:clamp(32px,calc(3.8vw_-_7px),48px)]">
                  <span className="text-inkSoft lg:whitespace-nowrap">{content.title.setup}</span>
                  <br className="hidden lg:block" /> {content.title.payoff}
                </h2>
                <p className="mt-6 max-w-[34em] text-lg leading-relaxed text-inkSoft">
                  {content.lede}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="mt-8 flex">
                <div
                  className="inline-flex rounded-full border border-blue-border bg-background p-1"
                  role="tablist"
                  aria-label={content.examplesLabel}
                >
                  {worlds.map((w, i) => (
                    <button
                      key={w.label}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => {
                        if (i !== active) {
                          setActive(i);
                          setTypedLen(0);
                          setPhase(0);
                        }
                      }}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-250 ease-settle ${
                        i === active
                          ? "bg-blue-solid text-on-accent"
                          : "text-inkSoft hover:text-ink"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right: the ask simulation */}
          <div className="flex w-full flex-col gap-3.5 lg:col-span-7">

            {/* Question card — a focused input while the run is underway */}
            <div
              className={`flex items-start gap-3.5 rounded-outer bg-background p-4 transition-all duration-400 ease-settle sm:p-5 ${solidShadow} ${
                running ? "ring-[3px] ring-blue/25" : "ring-1 ring-lineSoft"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 shrink-0 text-blue"
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="min-h-[2.8em] text-lg font-medium leading-snug text-ink sm:text-xl xl:min-h-0">
                  {world.question.slice(0, typedLen)}
                  {(!typingDone || phase === 0) && started && !reduced && (
                    <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_step-end_infinite]">|</span>
                  )}
                </p>
                <div className="mt-1.5 flex h-4 items-center gap-2 font-mono text-[11px] text-secondary-text">
                  <span
                    className={`transition-opacity duration-500 ${typingDone ? "opacity-100" : "opacity-0"}`}
                  >
                    {world.asker} &middot; {world.context}
                  </span>
                  {typingDone && phase < 5 && (
                    <span className="inline-flex items-center gap-1.5 font-bold text-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" />
                      {STATUS_LABELS[phase]}&hellip;
                    </span>
                  )}
                </div>
              </div>

              {/* Enterprise input affordances. Mic is a real Akashic capability
                  (speech-to-text); the ⌘K hint and scope chip are honest UI. */}
              <div className="flex shrink-0 items-center gap-1.5 self-start">
                <span className="hidden items-center gap-0.5 rounded-chip border border-lineSoft bg-panel px-1.5 py-1 font-mono text-[9px] font-semibold text-secondary-text sm:flex" aria-hidden>
                  &#8984;K
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-overcast transition-colors hover:bg-panel hover:text-blue" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
                  </svg>
                </span>
                <span className="flex items-center gap-1 rounded-full bg-blue-solid px-3 py-1.5 text-[10px] font-bold tracking-[0.06em] text-on-accent ">
                  <span className="uppercase">{chrome.ask}</span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Four moves — hidden until the question is asked, then each row
                rises in as it lights. Space is reserved so the fold never jumps. */}
            <div className="py-1 pl-1" aria-hidden={phase === 0}>
              {world.steps.map((step, i) => {
                const lit = phase >= i + 1;
                return (
                  <div
                    key={step.name}
                    className={`flex items-center gap-4 py-2.5 transition-all duration-500 ease-settle ${
                      lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-solid font-mono text-[11px] font-bold text-on-accent ">
                      0{i + 1}
                    </span>
                    <p className="min-w-0 text-[13.5px] leading-snug">
                      <span className="font-semibold text-ink">{step.name}</span>
                      <span className="ml-2 text-inkSoft">{step.line}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Answer card — always laid out so the fold never jumps; content
                pops in (and re-animates) when the run reaches the answer */}
            <div
              key={`ans-${active}-${revealed ? "on" : "off"}`}
              className={revealed ? "animate-[akx-pop_0.65s_cubic-bezier(0.34,1.56,0.64,1)_both]" : "invisible"}
              aria-hidden={!revealed}
            >
              <div className={`overflow-hidden rounded-outer bg-background ring-1 ring-lineSoft ${solidShadow}`}>

                {/* Chrome strip: who answered, for whom */}
                <div className="flex items-center border-b border-card-divide bg-panel px-4 py-2.5">
                  <AkashicWordmark className="text-[11.5px] font-bold tracking-tight text-ink" />
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.1em] text-secondary-text">&middot; {chrome.answer}</span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[9.5px] text-secondary-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden />
                    {chrome.for} {world.asker} &middot; {chrome.time}
                  </span>
                  {/* Read the answer aloud. Akashic ships text-to-speech. */}
                  <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-overcast transition-colors hover:bg-background hover:text-blue" aria-hidden>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                    </svg>
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[16px] font-semibold leading-snug text-ink sm:text-[17px]">
                    {world.answer}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-inkSoft">
                    {world.answerDetail}
                  </p>

                  {/* The proof, side by side: numbers and paperwork */}
                  <div className="mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
                    <SystemsPanel world={world} chrome={chrome} />
                    <DocumentsPanel world={world} chrome={chrome} />
                  </div>

                  {/* Evidence footer */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-card-divide pt-3">
                    {world.chips.map((chip, i) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-lineSoft bg-primary-bg px-2.5 py-1 font-mono text-[9.5px] text-secondary-text"
                        style={{ animation: `akx-rise 0.5s ${1.55 + i * 0.12}s cubic-bezier(0.2,0.8,0.2,1) both` }}
                      >
                        <span className="text-blue"><UiIcon icon={chip.icon} /></span>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
