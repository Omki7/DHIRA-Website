"use client";

/**
 * DESIGN INTENT:
 * Section 06: Voices from the Field (Editorial Layout)
 *
 * Replaces the previous 3D card stack with an open, airy, editorial layout.
 * Conforms to AGENTS.md Rule 1 and typography rules:
 * - Uses `font-display` (Newsreader) for large, elegant pull-quotes.
 * - Typographic drop-quote (”) instead of SVG bubbles.
 * - Clean bottom tab navigation with a continuous segmented loading bar.
 */

import React, { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const AUTOPLAY_MS = 9000;

type Dispatch = {
  quote: string;
  name: string;
  role: string;
  org: string;
  index: string;
  avatarPath: string;
};

const DISPATCHES: Dispatch[] = [
  {
    quote: "Before Akashic, student performance data lived in isolated state repositories while enrollment records were maintained separately. By deploying Akashic, we unified the academic registers and performance logs of over 1.89 crore students. Every piece brought new depth and undeniable clarity to our national lifecycle tracking.",
    name: "Dr. Amara Collins",
    role: "Programme Lead, National Education",
    org: "EduPlatform",
    index: "01",
    avatarPath: "/avatars/amara.png",
  },
  {
    quote: "Managing emigration approvals and benefit payouts across millions of citizens created a massive reconciliation gap. Akashic consolidated 387,000 active employment records, legacy logs, and biometric cards into a single ledger. What used to take a desk full of physical files is now resolved instantly.",
    name: "Kai Sterling",
    role: "Director of Immigration",
    org: "GovWorkforce",
    index: "02",
    avatarPath: "/avatars/kai.png",
  },
  {
    quote: "Executing a statewide socioeconomic census usually meant collecting spreadsheets from 40 different districts. With Akashic, we ingested, unified, and validated survey responses from millions of households in less than three weeks. We now run policy simulations on a single source of truth that our cabinet trusts implicitly.",
    name: "Lena Harper",
    role: "Senior Policy Official",
    org: "StateGov",
    index: "03",
    avatarPath: "/avatars/lena.png",
  },
];

/* ─── Premium Stylized Logos ─── */
function EduPlatformLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function GovWorkforceLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function StateGovLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18M10 22V12h4v10" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

const LOGO_COMPONENTS = [
  { component: EduPlatformLogo, id: "edu" },
  { component: GovWorkforceLogo, id: "work" },
  { component: StateGovLogo, id: "gov" },
];

export default function VoicesDispatches() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (reduced || paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISPATCHES.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduced]);

  return (
    <div 
      className="mt-12 lg:mt-20 w-full max-w-5xl mx-auto px-4 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ── Open, Airy Quote Stack (CSS Grid keeps height relative to tallest item) ── */}
      <div className="relative grid grid-cols-1 grid-rows-1" aria-live="polite">
        {DISPATCHES.map((d, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              className={`col-start-1 row-start-1 flex flex-col items-start transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive 
                  ? "opacity-100 translate-y-0 pointer-events-auto z-10" 
                  : "opacity-0 translate-y-8 pointer-events-none z-0 absolute inset-0"
              }`}
            >
              <div className="font-serif text-[64px] md:text-[80px] leading-[0.6] text-transparent bg-clip-text bg-gradient-to-br from-blue to-blue/30 opacity-40 mb-6 select-none">
                &rdquo;
              </div>
              
              <blockquote className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-tight text-ink max-w-[40em]">
                {d.quote.split(/(Akashic)/g).map((part, index) => 
                  part === "Akashic" 
                    ? <span key={index} className="text-blue font-medium">{part}</span> 
                    : part
                )}
              </blockquote>

              <div className="mt-8 md:mt-12 flex items-center gap-4">
                <img 
                  src={d.avatarPath} 
                  alt={d.name} 
                  className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-subtle-stroke/50 shadow-sm transition-transform duration-500 hover:scale-105 object-cover" 
                />
                <div className="flex flex-col">
                  <span className="text-[15px] sm:text-[16px] font-semibold text-ink">
                    {d.name}
                  </span>
                  <span className="text-[14px] sm:text-[15px] text-inkSoft mt-0.5">
                    {d.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tabbed Navigation with Segmented Loading Bar ── */}
      <div className="mt-16 md:mt-24 relative">
        
        {/* The segmented continuous loading bar spanning the top edge */}
        <div className="absolute top-0 left-0 right-0 flex h-[3px] z-10">
          {DISPATCHES.map((_, i) => {
            const isPast = i < activeIndex;
            const isActive = i === activeIndex;
            
            let widthValue = isPast ? "100%" : "0%";
            if (reduced && isActive) widthValue = "100%";

            return (
              <div key={i} className="flex-1 bg-transparent overflow-hidden">
                <div
                  className={`h-full bg-blue ${
                    isActive && !reduced ? "animate-[progressFill_9s_linear_forwards]" : ""
                  }`}
                  style={{
                    width: widthValue,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Tab Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-lineSoft rounded-xl overflow-hidden bg-white shadow-sm">
          {DISPATCHES.map((d, i) => {
            const isActive = i === activeIndex;
            const LogoComp = LOGO_COMPONENTS[i].component;

            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 text-center border-b sm:border-b-0 sm:border-r border-lineSoft last:border-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-inset ${
                  isActive ? "bg-primary-bg" : "bg-white hover:bg-primary-bg/50"
                }`}
                aria-selected={isActive}
                role="tab"
              >
                {/* We use a subtle top border fallback if JS is disabled, but the animated bar sits above this anyway */}
                <span className="text-[14px] md:text-[15px] font-semibold text-ink mb-1.5">
                  {d.name}
                </span>
                
                <div className={`flex items-center gap-1.5 text-[12px] md:text-[13px] font-medium transition-colors ${
                  isActive ? "text-ink" : "text-inkSoft group-hover:text-ink/75"
                }`}>
                  <LogoComp className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-blue" : "text-inkSoft"}`} />
                  {d.org}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
