"use client";

import { useState, useEffect } from "react";
import useDrawn from "@/shared/hooks/useDrawn";
import { MotionToggle } from "@/shared/components/ui";
import styles from "./AboutCulture.module.scss";

export const DHIRA_ACRONYM = [
  {
    num: "01",
    char: "D",
    word: "Digital",
    tagline: "Sovereign Foundations",
    definition: "Unified data lakehouse, streaming events, and governed knowledge architecture.",
    detail: "Unifying structured records, document stores, and real-time streaming into a single sovereign foundation.",
  },
  {
    num: "02",
    char: "H",
    word: "Human",
    tagline: "Operator Primacy",
    definition: "Calm operator interfaces keeping people in full decision authority.",
    detail: "High-clarity control surfaces designed for critical operational decisions, preventing autonomous model drift.",
  },
  {
    num: "03",
    char: "I",
    word: "Interfaces",
    tagline: "Unified Command",
    definition: "Conversational, analytical, and workflow command surfaces.",
    detail: "Natural language querying, dense tabular views, and live system state unified into a single pane of glass.",
  },
  {
    num: "04",
    char: "R",
    word: "Robotic",
    tagline: "Physical Edge Sync",
    definition: "Physical actuator telemetry and edge hardware synchronisation.",
    detail: "Bridging software intelligence with hardware controllers, physical robotics, and real-time sensor streams.",
  },
  {
    num: "05",
    char: "A",
    word: "Agents",
    tagline: "Governed Reasoning",
    definition: "Goal-directed reasoning loops with strict operational boundary policies.",
    detail: "Autonomous execution bounded by deterministic verification rules, complete auditability, and zero hallucination.",
  },
];

export function DhiraDotMatrix() {
  // Defaults to 0 (Letter D) on page load so definition of Digital is immediately visible
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.2);

  // Auto-sweep tour through D -> H -> I -> R -> A when idle
  useEffect(() => {
    if (isPaused || isHovered) return;
    const timer = setInterval(() => {
      setActiveLetter((prev) => (prev + 1) % 5);
    }, 3600);
    return () => clearInterval(timer);
  }, [isPaused, isHovered]);

  const current = DHIRA_ACRONYM[activeLetter];

  return (
    <div
      ref={ref}
      data-drawn={drawn}
      className={styles.lineSection}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Precision Vector Bus Lines: 2 base conduit lines + 1 dynamic 3rd line */}
      <div
        className={`${styles.lineCanvas} ${isPaused ? styles.linePaused : ""}`}
        role="img"
        aria-label="DHIRA architectural parallel line drawing"
      >
        <svg
          viewBox="15 15 650 190"
          className={styles.lineSvg}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ==================== LETTER D ==================== */}
          <g
            className={`${styles.letterGroup} ${activeLetter === 0 ? styles.groupActive : ""}`}
            onPointerEnter={() => setActiveLetter(0)}
            onClick={() => setActiveLetter(0)}
            role="button"
            tabIndex={0}
            aria-label="Letter D — Digital: Sovereign data foundations"
          >
            {/* 2 Base Structural Conduit Lines */}
            <path d="M34 30 L34 180" className={styles.baseWire} />
            <path d="M46 30 L46 180" className={styles.baseWire} />
            <path d="M46 30 L80 30 C124 30 138 65 138 105 C138 145 124 180 80 180 L46 180" className={styles.baseWire} />
            <path d="M46 42 L78 42 C108 42 122 68 122 105 C122 142 108 168 78 168 L46 168" className={styles.baseWire} />
            <circle cx="34" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="46" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="34" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="46" cy="180" r="2.2" className={styles.baseNode} />

            {/* 3rd Dynamic Center Line (Arrives on view / highlights on D) */}
            <path d="M40 30 L40 180" className={styles.centerWire} />
            <path d="M46 36 L79 36 C116 36 130 66 130 105 C130 144 116 174 79 174 L46 174" className={styles.centerWire} />
            <circle cx="40" cy="30" r="2.6" className={styles.centerNode} />
            <circle cx="40" cy="180" r="2.6" className={styles.centerNode} />
          </g>

          {/* ==================== LETTER H ==================== */}
          <g
            className={`${styles.letterGroup} ${activeLetter === 1 ? styles.groupActive : ""}`}
            onPointerEnter={() => setActiveLetter(1)}
            onClick={() => setActiveLetter(1)}
            role="button"
            tabIndex={0}
            aria-label="Letter H — Human: Operator primacy"
          >
            {/* 2 Base Lines (Left & Right Spines + Crossbar) */}
            <path d="M175 30 L175 180" className={styles.baseWire} />
            <path d="M187 30 L187 180" className={styles.baseWire} />
            <path d="M245 30 L245 180" className={styles.baseWire} />
            <path d="M257 30 L257 180" className={styles.baseWire} />
            <path d="M187 100 L245 100" className={styles.baseWire} />
            <path d="M187 110 L245 110" className={styles.baseWire} />
            <circle cx="175" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="187" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="175" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="187" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="245" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="257" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="245" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="257" cy="180" r="2.2" className={styles.baseNode} />

            {/* 3rd Center Line */}
            <path d="M181 30 L181 180" className={styles.centerWire} />
            <path d="M251 30 L251 180" className={styles.centerWire} />
            <path d="M187 105 L245 105" className={styles.centerWire} />
            <circle cx="181" cy="30" r="2.4" className={styles.centerNode} />
            <circle cx="181" cy="180" r="2.4" className={styles.centerNode} />
            <circle cx="251" cy="30" r="2.4" className={styles.centerNode} />
            <circle cx="251" cy="180" r="2.4" className={styles.centerNode} />
          </g>

          {/* ==================== LETTER I ==================== */}
          <g
            className={`${styles.letterGroup} ${activeLetter === 2 ? styles.groupActive : ""}`}
            onPointerEnter={() => setActiveLetter(2)}
            onClick={() => setActiveLetter(2)}
            role="button"
            tabIndex={0}
            aria-label="Letter I — Interfaces: Unified command"
          >
            {/* 2 Base Lines (Top/Bottom Caps + Stem) */}
            <path d="M295 30 L355 30" className={styles.baseWire} />
            <path d="M295 180 L355 180" className={styles.baseWire} />
            <path d="M320 30 L320 180" className={styles.baseWire} />
            <path d="M330 30 L330 180" className={styles.baseWire} />
            <circle cx="295" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="355" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="295" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="355" cy="180" r="2.2" className={styles.baseNode} />

            {/* 3rd Center Line */}
            <path d="M325 30 L325 180" className={styles.centerWire} />
            <path d="M305 36 L345 36" className={styles.centerWire} />
            <path d="M305 174 L345 174" className={styles.centerWire} />
            <circle cx="325" cy="30" r="2.4" className={styles.centerNode} />
            <circle cx="325" cy="180" r="2.4" className={styles.centerNode} />
          </g>

          {/* ==================== LETTER R ==================== */}
          <g
            className={`${styles.letterGroup} ${activeLetter === 3 ? styles.groupActive : ""}`}
            onPointerEnter={() => setActiveLetter(3)}
            onClick={() => setActiveLetter(3)}
            role="button"
            tabIndex={0}
            aria-label="Letter R — Robotic: Physical edge sync"
          >
            {/* 2 Base Lines (Spine, Loop, Leg) */}
            <path d="M395 30 L395 180" className={styles.baseWire} />
            <path d="M407 30 L407 180" className={styles.baseWire} />
            <path d="M407 30 L442 30 C474 30 486 46 486 70 C486 94 474 110 442 110 L407 110" className={styles.baseWire} />
            <path d="M407 42 L438 42 C460 42 470 52 470 70 C470 88 460 98 438 98 L407 98" className={styles.baseWire} />
            <path d="M434 104 L478 180" className={styles.baseWire} />
            <path d="M444 110 L488 180" className={styles.baseWire} />
            <circle cx="395" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="407" cy="30" r="2.2" className={styles.baseNode} />
            <circle cx="395" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="407" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="478" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="488" cy="180" r="2.2" className={styles.baseNode} />

            {/* 3rd Center Line */}
            <path d="M401 30 L401 180" className={styles.centerWire} />
            <path d="M407 36 L440 36 C468 36 478 49 478 70 C478 91 468 104 440 104 L407 104" className={styles.centerWire} />
            <path d="M439 107 L483 180" className={styles.centerWire} />
            <circle cx="401" cy="30" r="2.4" className={styles.centerNode} />
            <circle cx="401" cy="180" r="2.4" className={styles.centerNode} />
            <circle cx="483" cy="180" r="2.4" className={styles.centerNode} />
          </g>

          {/* ==================== LETTER A ==================== */}
          <g
            className={`${styles.letterGroup} ${activeLetter === 4 ? styles.groupActive : ""}`}
            onPointerEnter={() => setActiveLetter(4)}
            onClick={() => setActiveLetter(4)}
            role="button"
            tabIndex={0}
            aria-label="Letter A — Agents: Governed reasoning"
          >
            {/* 2 Base Lines (Diagonal Legs + Crossbar) */}
            <path d="M540 180 L588 34" className={styles.baseWire} />
            <path d="M552 180 L594 44" className={styles.baseWire} />
            <path d="M644 180 L596 34" className={styles.baseWire} />
            <path d="M632 180 L590 44" className={styles.baseWire} />
            <path d="M558 124 L626 124" className={styles.baseWire} />
            <path d="M562 134 L622 134" className={styles.baseWire} />
            <circle cx="540" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="552" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="644" cy="180" r="2.2" className={styles.baseNode} />
            <circle cx="632" cy="180" r="2.2" className={styles.baseNode} />

            {/* 3rd Center Line */}
            <path d="M546 180 L592 30 L638 180" className={styles.centerWire} />
            <path d="M560 129 L624 129" className={styles.centerWire} />
            <circle cx="546" cy="180" r="2.4" className={styles.centerNode} />
            <circle cx="638" cy="180" r="2.4" className={styles.centerNode} />
            <circle cx="592" cy="30" r="2.8" className={styles.centerNode} />
          </g>
        </svg>
      </div>

      {/* D · H · I · R · A Acronym Pill Bar (Earlier clean design) */}
      <div className={styles.acronymBar} role="tablist" aria-label="DHIRA acronym exploration">
        {DHIRA_ACRONYM.map((item, idx) => {
          const isSelected = activeLetter === idx;
          return (
            <button
              key={item.char}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`${styles.acronymPill} ${isSelected ? styles.acronymPillActive : ""}`}
              onPointerEnter={() => setActiveLetter(idx)}
              onClick={() => setActiveLetter(idx)}
            >
              <span className={styles.acronymChar}>{item.char}</span>
              <span className={styles.acronymDivider} aria-hidden="true">·</span>
              <span>{item.word}</span>
            </button>
          );
        })}
      </div>

      {/* Definition of Active Letter (Defaults to Digital on page load) */}
      <div className={styles.definitionBox} role="region" aria-live="polite">
        <div className={styles.defHeader}>
          <span className={styles.defNum}>{current.num}</span>
          <span className={styles.defWord}>{current.word}</span>
          <span className={styles.defTagline}>&mdash; {current.tagline}</span>
        </div>
        <p className={styles.defDetail}>
          {current.definition} {current.detail}
        </p>
      </div>

      {/* Quiet company byline with Motion toggle */}
      <div className={styles.bylineWrap}>
        <p className={styles.bylineText}>
          Digital Human Interfaces &amp; Robotic Agents &middot; New York &middot; Hyderabad &middot; Bangalore
        </p>
        <MotionToggle
          paused={isPaused}
          onToggle={() => setIsPaused((p) => !p)}
          controls="letter highlight cycle"
          className={styles.motionToggle}
        />
      </div>
    </div>
  );
}
