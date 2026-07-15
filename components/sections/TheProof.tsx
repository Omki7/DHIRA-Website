"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProofComparisonMockup from "@/components/demos/mockups/ProofComparisonMockup";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function TheProof() {
  const [pos, setPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(1100);
  const isDragging = useRef(false);
  const graphContainerRef = useRef<HTMLDivElement>(null);

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
    else if (e.key === "Home") p = 4;
    else if (e.key === "End") p = 96;
    else return;
    e.preventDefault();
    setPos(Math.max(4, Math.min(96, p)));
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
      className="relative overflow-hidden border-y border-lineSoft shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] pt-16 pb-24 lg:pt-20 lg:pb-32 font-sans"
      style={{ "--pos": pos } as React.CSSProperties}
    >

      {/* AFTER background (base) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-white"
        style={{ background: "radial-gradient(125% 100% at 50% 42%, #FFFFFF 0%, #F8F9FA 55%, #EEF0F2 100%)" }}
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

      {/* BEFORE background (clipped) */}
      <div 
        className="comparison-before-bg absolute inset-y-0 left-0 pointer-events-none z-0 overflow-hidden bg-[#f1f5f9] transition-all duration-75"
      >
        <div className="absolute inset-y-0 left-0 w-screen">
          <svg className="absolute inset-0 w-full h-full opacity-70">
            <defs>
              <pattern id="dotsSectionB" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="1.3" cy="1.3" r="1.3" fill="#64748b" fillOpacity="0.12" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotsSectionB)" />
          </svg>
        </div>
      </div>

      {/* Section-wide slider line */}
      <div
        className="comparison-slider-line absolute top-0 bottom-0 -translate-x-1/2 w-[2.5px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.98) 18%, rgba(255,255,255,0.98) 82%, rgba(255,255,255,0.4))",
          boxShadow: "0 0 0 1px rgba(38,109,242,0.25), 0 0 22px rgba(38,109,242,0.22)"
        }}
      />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[06]</span>
              &nbsp;&nbsp;THE PROOF
            </span>
            <span className="text-overcast">/ BEFORE &amp; AFTER</span>
          </div>

          <h2 className="max-w-[16em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
            Two realities. One organisation.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-inkSoft">
            The same team. The same data. Drag across to see what changes
            <br className="hidden sm:block" />
            when every system draws from one governed source of truth.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div
            ref={graphContainerRef}
            onPointerDown={handlePointerDown}
            className="relative w-full overflow-hidden cursor-ew-resize select-none max-w-full lg:max-w-[1100px] mx-auto mt-12 mb-8 bg-transparent"
            style={{ aspectRatio: "1100 / 660", touchAction: "none" }}
          >
            <ProofComparisonMockup pos={pos} width={containerWidth} onKeyDown={handleKeyDown} />
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-6 md:mt-8 max-w-[1100px] mx-auto">
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
