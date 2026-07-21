"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProofComparisonMockup from "@/components/demos/mockups/ProofComparisonMockup";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* The two ends of the wipe. `pos` is how much of the BEFORE layer is showing,
   so 96 = almost all "before", 4 = almost all "after" — not the other way
   round. Both stop short of 0/100 so a sliver of the other side always stays
   on screen and the control never looks broken. */
const BEFORE_END = 96;
const AFTER_END = 4;

export default function TheProof() {
  const [pos, setPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(1100);
  // Drag has to track the pointer 1:1, but the toggle should glide. `glide`
  // swaps the wipe from a near-instant follow to the 650ms ease-settle step.
  const [glide, setGlide] = useState(false);
  const isDragging = useRef(false);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  // The knob's "See the change" pill is onboarding, not chrome: it teaches the
  // drag gesture, and once you have used either control it has done its job.
  // It also has to go — at the 4%/96% ends the pill is wider than the room
  // left beside the knob, so the container clips it mid-word.
  const [used, setUsed] = useState(false);

  // Only claim a side once the wipe has actually landed there. At the 50/50
  // default neither button is pressed, which is the truthful state.
  const atBefore = pos >= BEFORE_END - 6;
  const atAfter = pos <= AFTER_END + 6;

  const showSide = (target: number) => {
    setGlide(true);
    setUsed(true);
    setPos(target);
  };

  useEffect(() => {
    const handleResize = () => {
      if (graphContainerRef.current) {
        setContainerWidth(graphContainerRef.current.getBoundingClientRect().width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setGlide(false);
    setUsed(true);
    document.body.style.userSelect = "none";
    updatePos(e.clientX);
  };

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.userSelect = "";
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  }, []);

  const updatePos = (clientX: number) => {
    if (!graphContainerRef.current) return;
    const rect = graphContainerRef.current.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(4, Math.min(96, p));
    setPos(p);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let p = pos;
    if (e.key === "ArrowLeft") p -= 4;
    else if (e.key === "ArrowRight") p += 4;
    else if (e.key === "Home") p = AFTER_END;
    else if (e.key === "End") p = BEFORE_END;
    else return;
    e.preventDefault();
    setUsed(true);
    // Arrow keys nudge and should feel immediate; Home/End jump the whole
    // width, so they get the same glide the toggle uses.
    setGlide(e.key === "Home" || e.key === "End");
    setPos(Math.max(AFTER_END, Math.min(BEFORE_END, p)));
  };

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <section
      id="proof"
      className="relative overflow-hidden border-y border-lineSoft shadow-[0_20px_40px_-15px_rgba(11,20,64,0.06)] pt-12 pb-24 lg:pt-16 lg:pb-32 font-sans"
      style={{ "--pos": pos } as React.CSSProperties}
    >

      {/* AFTER background (base) — pristine brand white/blue */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-white"
        style={{ background: "radial-gradient(125% 100% at 50% 42%, #FFFFFF 0%, #F0F4FF 55%, #E5EDFF 100%)" }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-60">
          <defs>
            <pattern id="dotsSectionA" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.3" cy="1.3" r="1.3" fill="#3E63DD" fillOpacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotsSectionA)" />
        </svg>
      </div>

      {/* BEFORE background (clipped) — starts below the toggle button right at the mockup diagram */}
      <div
        className={`comparison-before-bg absolute top-[320px] bottom-0 left-0 pointer-events-none z-0 overflow-hidden bg-[#EAEFF6] transition-[width] ${
          glide ? "duration-650 ease-settle" : "duration-0"
        }`}
      >
        <div className="absolute inset-y-0 left-0 w-screen">
          <svg className="absolute inset-0 w-full h-full opacity-60">
            <defs>
              <pattern id="dotsSectionB" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="1.3" cy="1.3" r="1.3" fill="#64748B" fillOpacity="0.18" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotsSectionB)" />
          </svg>
        </div>
      </div>

      {/* Slider seam line (starts below the toggle button right at the mockup diagram) */}
      <div
        className={`comparison-slider-line absolute top-[320px] bottom-0 -translate-x-1/2 w-[2px] pointer-events-none z-20 transition-[left] ${
          glide ? "duration-650 ease-settle" : "duration-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(62,99,221,0) 0%, rgba(62,99,221,0.9) 10%, rgba(62,99,221,0.9) 90%, rgba(62,99,221,0) 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.6), 0 0 20px rgba(62,99,221,0.28)",
        }}
      />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mb-10 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[06]</span>
              &nbsp;&nbsp;THE PROOF
            </span>
          </div>

          {/* Joined Title */}
          <h2 className="max-w-[16em] text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink sm:text-[48px] lg:text-[56px]">
            Two realities. One organisation.
          </h2>

          {/* Joined Subheader */}
          <p className="mt-4 text-[17px] leading-relaxed text-inkSoft md:text-[18px]">
            The same team. The same data.
          </p>
        </ScrollReveal>

        {/* Mode Pill Toggle — Directly shown below subheader */}
        <ScrollReveal delay={60} className="flex flex-col items-start sm:items-center w-full mt-8">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
            Select Comparison Mode
          </div>
          <div
            role="group"
            aria-label="Choose which side to show"
            className="inline-flex rounded-full border-2 border-lineSoft bg-white p-1.5 shadow-lg shadow-black/[0.04] ring-4 ring-black/[0.02]"
          >
            <button
              type="button"
              onClick={() => showSide(BEFORE_END)}
              aria-pressed={atBefore}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ease-settle ${
                atBefore
                  ? "bg-[#334155] text-amber-300 shadow-md ring-1 ring-amber-400/30"
                  : "text-inkSoft hover:text-ink hover:bg-tertiary-bg"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full transition-all ${atBefore ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" : "bg-inkSoft/30"}`} />
              Before DHIRA
            </button>
            <button
              type="button"
              onClick={() => showSide(AFTER_END)}
              aria-pressed={atAfter}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ease-settle ${
                atAfter
                  ? "bg-blue text-white shadow-md shadow-blue/30 ring-1 ring-white/30"
                  : "text-inkSoft hover:text-ink hover:bg-tertiary-bg"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full transition-all ${atAfter ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" : "bg-inkSoft/30"}`} />
              After DHIRA
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div
            ref={graphContainerRef}
            onPointerDown={handlePointerDown}
            className="relative w-full overflow-hidden cursor-ew-resize select-none max-w-full lg:max-w-[1100px] mx-auto mt-12 lg:mt-14 mb-8 bg-transparent"
            style={{ aspectRatio: "1100 / 660", touchAction: "none" }}
          >
            <ProofComparisonMockup
              pos={pos}
              width={containerWidth}
              glide={glide}
              showHint={!used}
              onKeyDown={handleKeyDown}
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-6 lg:mt-8 max-w-[1100px] mx-auto">
          <ScrollReveal delay={220}>
            <p className="text-sm leading-relaxed text-inkSoft max-w-[54ch]">
              <span className="font-medium text-ink">Left,</span> four source systems, four different answers, and a reconciliation queue measured in days. <span className="font-medium text-ink">Right,</span> one certified master record every system trusts.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <Link href="#platform" className="btn-primary whitespace-nowrap">
              See how the foundation works
            </Link>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
