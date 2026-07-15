"use client";

/*
 * [01] Akashic in action — the product page's first fold, on blue (#3E63DD),
 * a deliberate echo of the home page's "Meet Akashic" moment (AGENTS.md Rule 5
 * exception). Split stage: narrative + world toggle left, a live ask
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
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

type IconKey = "source" | "graph" | "bolt" | "doc" | "mail" | "report";
type Chip = { icon: IconKey; label: string };

type World = {
  label: string;
  question: string;
  asker: string;
  context: string;
  steps: { name: string; line: string }[];
  answer: string;
  answerDetail: string;
  chart: {
    title: string;
    rows: { label: string; pct: number; lag?: boolean }[];
    lagTag: string;
    footnote: string;
  };
  docs: {
    counted: string;
    excerpt: { icon: IconKey; source: string; date: string; pre: string; mark: string; post: string };
    record: { icon: IconKey; name: string; sub: string; status: string };
  };
  chips: Chip[];
};

const worlds: World[] = [
  {
    label: "Enterprise",
    question: "Why is the South region behind on target, and what’s driving it?",
    asker: "Regional head",
    context: "vs Q3 target",
    steps: [
      { name: "Connected", line: "Pulls in your sales numbers, and the contracts and emails behind them." },
      { name: "Understood", line: "Knows your regions and targets, so “behind” means the same thing everywhere." },
      { name: "Reasoned", line: "Follows the shortfall to its cause: two renewal deals, still unsigned." },
      { name: "Answered", line: "One plain answer, with the numbers and the paperwork attached." },
    ],
    answer: "South is 8% behind target because two distributor renewals stalled in July.",
    answerDetail: "Both distributors pushed back on the revised pricing. Neither renewal has been signed.",
    chart: {
      title: "Revenue vs target · South region",
      rows: [
        { label: "APR", pct: 102 },
        { label: "MAY", pct: 99 },
        { label: "JUN", pct: 97 },
        { label: "JUL", pct: 92, lag: true },
      ],
      lagTag: "−8% vs target",
      footnote: "The gap is $80,500. The two stalled renewals account for all of it.",
    },
    docs: {
      counted: "3 read · 2 cited",
      excerpt: {
        icon: "mail",
        source: "AeroCorp · renewal email",
        date: "2 JUL",
        pre: "“We ",
        mark: "can’t commit at the revised pricing",
        post: " until our board reviews it in August.”",
      },
      record: {
        icon: "doc",
        name: "Lumina Systems · renewal contract",
        sub: "$38,000 · counter-signature pending since 14 June",
        status: "Unsigned",
      },
    },
    chips: [
      { icon: "source", label: "2 systems · 3 documents read" },
      { icon: "graph", label: "Every line traced to its source" },
      { icon: "bolt", label: "Ready in seconds" },
    ],
  },
  {
    label: "Public programmes",
    question: "Why are enrolments lagging in District 7, and what changed on the ground?",
    asker: "District lead",
    context: "vs enrolment target",
    steps: [
      { name: "Connected", line: "Pulls in enrolment counts, and the camp schedules and field reports behind them." },
      { name: "Understood", line: "Knows your districts and targets, so “lagging” means the same thing everywhere." },
      { name: "Reasoned", line: "Follows the gap to its cause: two outreach camps, both rescheduled." },
      { name: "Answered", line: "One plain answer, with the counts and the field notes attached." },
    ],
    answer: "District 7 is 9% behind target because two outreach camps were rescheduled after the July floods.",
    answerDetail: "Both camps are now set for early August. The gap closes once they run.",
    chart: {
      title: "Enrolments vs target · by district",
      rows: [
        { label: "D-5", pct: 102 },
        { label: "D-6", pct: 98 },
        { label: "D-7", pct: 91, lag: true },
      ],
      lagTag: "−9% vs target",
      footnote: "The gap is 550 enrolments. The two rescheduled camps account for all of it.",
    },
    docs: {
      counted: "4 read · 2 cited",
      excerpt: {
        icon: "report",
        source: "Camp 04 · field report",
        date: "6 JUL",
        pre: "“Venue roads are still waterlogged. ",
        mark: "Camp moved to 3 August",
        post: ".”",
      },
      record: {
        icon: "doc",
        name: "Camp 07 · reschedule notice",
        sub: "300 expected enrolments · new date 8 August",
        status: "Rescheduled",
      },
    },
    chips: [
      { icon: "source", label: "2 systems · 4 field notes read" },
      { icon: "graph", label: "Every line traced to its source" },
      { icon: "bolt", label: "Ready in seconds" },
    ],
  },
];

/* What the status line says while the run is underway, per phase 0–4. */
const STATUS_LABELS = [
  "Thinking",
  "Reading systems and documents",
  "Getting your context",
  "Tracing the cause",
  "Writing the answer",
];

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
    <div className="flex items-center gap-1.5 border-b border-[#EBEEF4] bg-[#F7F8FB] px-3 py-2">
      <span className="text-blue">
        <UiIcon icon={icon} size={11} />
      </span>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-overcast">
        {label}
      </span>
      <span className="ml-auto flex items-center">{right}</span>
    </div>
  );
}

function SystemsPanel({ world }: { world: World }) {
  const { chart } = world;
  const targetLeft = `${(100 / CHART_MAX) * 100}%`;
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#E3E7F0] bg-white">
      <PanelHeader
        icon="source"
        label="From your systems"
        right={
          <span
            className="rounded-full border border-red/20 bg-red/[0.06] px-2 py-0.5 font-mono text-[9px] font-semibold text-red"
            style={{ animation: "akx-rise 0.5s 0.95s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {chart.lagTag}
          </span>
        }
      />
      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">{chart.title}</p>
        <div className="flex flex-col gap-2">
          {chart.rows.map((row, i) => (
            <div key={row.label} className="grid grid-cols-[30px_1fr_38px] items-center gap-2">
              <span className={`font-mono text-[9px] ${row.lag ? "font-semibold text-red" : "text-overcast"}`}>
                {row.label}
              </span>
              <span className="relative block h-[10px] rounded-full bg-[#EDF0F6]">
                <span
                  className={`absolute inset-y-0 left-0 origin-left rounded-full ${row.lag ? "bg-red" : "bg-blue"}`}
                  style={{
                    width: `${(row.pct / CHART_MAX) * 100}%`,
                    animation: `akx-fillx 0.8s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.14}s both`,
                  }}
                  aria-hidden
                />
                <span
                  className="absolute -bottom-[3px] -top-[3px] w-px border-l border-dashed border-[#9AA6C0]"
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
        <p className="flex items-center justify-end gap-1.5 font-mono text-[8.5px] text-overcast" aria-hidden>
          <span className="inline-block h-3 w-px border-l border-dashed border-[#9AA6C0]" />
          100% of target
        </p>
      </div>
      <p
        className="border-t border-[#EBEEF4] bg-[#FAFBFC] px-3 py-2 text-[11px] leading-snug text-inkSoft"
        style={{ animation: "akx-rise 0.5s 1.1s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {chart.footnote}
      </p>
    </div>
  );
}

function DocumentsPanel({ world }: { world: World }) {
  const { excerpt, record, counted } = world.docs;
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#E3E7F0] bg-white">
      <PanelHeader
        icon="doc"
        label="From your documents"
        right={<span className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-overcast">{counted}</span>}
      />
      <div className="flex flex-1 flex-col gap-2 px-3 py-3">
        <div
          className="flex flex-1 flex-col rounded-[9px] border border-[#E3E7F0] bg-white p-2.5"
          style={{ animation: "akx-rise 0.5s 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-blue-subtle text-blue">
              <UiIcon icon={excerpt.icon} size={11} />
            </span>
            <span className="min-w-0 truncate text-[10.5px] font-semibold text-ink">{excerpt.source}</span>
            <span className="ml-auto shrink-0 font-mono text-[8.5px] text-overcast">{excerpt.date}</span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink">
            {excerpt.pre}
            <span
              style={{
                backgroundImage: "linear-gradient(0deg,#FCE9A8,#FCE9A8)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "0% 100%",
                animation: "akx-mark 0.7s 1.35s ease-out both",
              }}
            >
              {excerpt.mark}
            </span>
            {excerpt.post}
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-[9px] border border-[#E3E7F0] bg-white p-2.5"
          style={{ animation: "akx-rise 0.5s 0.65s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-blue-subtle text-blue">
            <UiIcon icon={record.icon} size={11} />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10.5px] font-semibold leading-tight text-ink">{record.name}</span>
            <span className="truncate font-mono text-[8.5px] text-tertiary-text">{record.sub}</span>
          </div>
          <span className="ml-auto shrink-0 rounded-[4px] border border-red/20 bg-red/5 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-red">
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

export default function AkashicFourMoves() {
  const [active, setActive] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const world = worlds[active];
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
    if (!started) return;
    const q = worlds[active].question;
    if (reduced) {
      setTypedLen(q.length);
      setPhase(5);
      return;
    }
    setTypedLen(0);
    setPhase(0);
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
  }, [started, active, reduced]);

  const solidShadow = "shadow-[0_2px_6px_rgba(11,20,64,0.12),0_28px_56px_-22px_rgba(11,20,64,0.55)]";
  const ctaClasses = `inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-250 ease-settle hover:bg-white/15`;
  const ctaReveal = revealed ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2";

  return (
    <section id="akashic-in-action" className="relative scroll-mt-24 bg-[#3E63DD]" ref={sectionRef}>
      <div className="rail-container flex flex-col justify-center border-x-0 py-16 lg:min-h-screen lg:py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">

          {/* Left: narrative + world toggle */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="text-center lg:text-left">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                  <span className="text-white/40">[01]</span>
                  <span className="text-white/80">&nbsp;&nbsp;Akashic in action</span>
                </p>
                <h2 className="mt-5 text-heading-sm font-semibold leading-tight tracking-tight text-white md:text-heading-md">
                  Ask a real question.
                  <br className="hidden lg:block" /> Watch Akashic answer it.
                </h2>
                <p className="mx-auto mt-5 max-w-[34em] text-lg leading-relaxed text-white/75 lg:mx-0">
                  Every real question has two halves. The number sits in a system. The
                  reason sits in a document nobody queries. Joining them by hand takes a
                  week: the answer arrives after the decision. Akashic reads both and
                  answers as one, lineage attached.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="mt-8 flex justify-center lg:justify-start">
                <div
                  className="inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm"
                  role="tablist"
                  aria-label="Choose a world"
                >
                  {worlds.map((w, i) => (
                    <button
                      key={w.label}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => {
                        if (i !== active) setActive(i);
                      }}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-250 ease-settle ${
                        i === active
                          ? "bg-white text-blue shadow-card"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className={`mt-10 hidden transition-all duration-700 ease-settle lg:block ${ctaReveal}`}>
              <Link href="#how-it-works" className={ctaClasses}>
                See what&rsquo;s underneath
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: the ask simulation */}
          <div className="flex w-full flex-col gap-3.5 lg:col-span-7">

            {/* Question card — a focused input while the run is underway */}
            <div
              className={`flex items-start gap-3.5 rounded-[14px] bg-white p-4 transition-all duration-400 ease-settle sm:p-5 ${solidShadow} ${
                running ? "ring-[3px] ring-white/35" : "ring-1 ring-[#0B1440]/15"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
                    <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_infinite]">|</span>
                  )}
                </p>
                <div className="mt-1.5 flex h-4 items-center gap-2 font-mono text-[11px] text-overcast">
                  <span
                    className={`transition-opacity duration-500 ${typingDone ? "opacity-100" : "opacity-0"}`}
                  >
                    {world.asker} &middot; {world.context}
                  </span>
                  {typingDone && phase < 5 && (
                    <span className="inline-flex items-center gap-1.5 font-bold text-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_1.5s_infinite]" />
                      {STATUS_LABELS[phase]}&hellip;
                    </span>
                  )}
                </div>
              </div>
              <span className="mt-0.5 flex shrink-0 items-center gap-1 self-start rounded-full bg-blue px-2.5 py-1 text-[9px] font-bold tracking-[0.06em] text-white shadow-[0_2px_6px_rgba(62,99,221,0.35)]">
                ASK
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[11px] font-bold text-blue shadow-[0_2px_10px_rgba(255,255,255,0.35)]">
                      0{i + 1}
                    </span>
                    <p className="min-w-0 text-[13.5px] leading-snug">
                      <span className="font-semibold text-white">{step.name}</span>
                      <span className="ml-2 text-white/75">{step.line}</span>
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
              <div className={`overflow-hidden rounded-[14px] bg-white ring-1 ring-[#0B1440]/15 ${solidShadow}`}>

                {/* Chrome strip: who answered, for whom */}
                <div className="flex items-center border-b border-[#EBEEF4] bg-[#FAFBFC] px-4 py-2.5">
                  <AkashicLogo className="h-4 w-4" />
                  <span className="-ml-1 text-[11.5px] font-bold tracking-tight text-ink">kashic</span>
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.1em] text-overcast">&middot; Answer</span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[9.5px] text-overcast">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                    for {world.asker} &middot; 09:41
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
                    <SystemsPanel world={world} />
                    <DocumentsPanel world={world} />
                  </div>

                  {/* Evidence footer */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-[#EBEEF4] pt-3">
                    {world.chips.map((chip, i) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-lineSoft bg-[#FAFAFB] px-2.5 py-1 font-mono text-[9.5px] text-inkSoft"
                        style={{ animation: `akx-rise 0.5s ${1.55 + i * 0.12}s cubic-bezier(0.22,1,0.36,1) both` }}
                      >
                        <span className="text-blue"><UiIcon icon={chip.icon} /></span>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`text-center transition-all duration-700 ease-settle lg:hidden ${ctaReveal}`}>
              <Link href="#how-it-works" className={ctaClasses}>
                See what&rsquo;s underneath
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
      {/* Gradient bridge to smooth the exit into bg-primary-bg */}
      <div className="absolute -bottom-px left-0 right-0 h-[120px] bg-gradient-to-t from-primary-bg to-transparent pointer-events-none" aria-hidden />
    </section>
  );
}
