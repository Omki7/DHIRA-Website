"use client";

/*
 * [09] Built on Akashic — start from a solution, not a blank platform.
 * Redesigned to use a split-pane vertical-tab interface based on user direction.
 * Left side: 3 vertical modules (tabs).
 * Right side: Active solution headline, description, and a premium empty image placeholder
 * waiting for actual platform screenshots.
 * Skinned in house tokens on the page's second ak-depth slab.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";

interface Solution {
  id: string;
  name: string;
  term: string;
  headline: string;
  para: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

/* ─── Generic Icons for the Tabs ─── */
function PulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function BeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M6 14h12" />
    </svg>
  );
}

function DocumentSearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M10 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12.12 16.12L15 19" />
    </svg>
  );
}

const solutions: Solution[] = [
  {
    id: "akashic-eis",
    name: "Akashic EIS",
    term: "Executive intelligence",
    headline: "The organisation’s performance, on one live screen.",
    para: "Performance, risk, and open decisions in one place, for the people who answer for them. Every figure is traceable back to its source system in real-time.",
    href: "/solutions/eis",
    icon: PulseIcon,
  },
  {
    id: "akashic-life",
    name: "Akashic Life",
    term: "Life sciences",
    headline: "One governed record for every study, site, and product.",
    para: "Clinical, regulatory, and commercial data brought together for the people who file, approve, and launch. Audit-ready lineage under every figure.",
    href: "/solutions/life",
    icon: BeakerIcon,
  },
  {
    id: "akashic-knowledge",
    name: "Akashic Knowledge",
    term: "Document intelligence",
    headline: "Ask your documents a question.",
    para: "Policies, contracts, and institutional knowledge — readable, searchable, and citable at last. Every plain-language answer points directly to the source clause.",
    href: "/solutions/knowledge",
    icon: DocumentSearchIcon,
  },
];

const SLIDE_MS = 8000;

export default function AkashicPlatform() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % solutions.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_MS);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section id="solutions" className="ak-depth relative scroll-mt-24 overflow-hidden">
      {/* Same precisely-cut dark slab: crisp seams, blue horizon glows, machined dot texture. */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(62,99,221,0.22),transparent_72%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(62,99,221,0.16),transparent_72%)]" aria-hidden />

      <div className="relative rail-container border-x-0 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">[10]</span>
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-white/70">Built on Akashic</span>
          </div>
          <h2 className="text-balance text-[36px] font-semibold leading-[1.1] tracking-tighter text-white md:text-[48px] max-w-[20em]">
            Works for Everyone —<br /> From Founders to Teams
          </h2>
          <p className="mt-5 max-w-[38em] text-[17px] leading-relaxed text-white/70 md:text-[18px]">
            Whether you&rsquo;re leading the company or running operations on the ground, Akashic keeps everyone aligned. Three pre-configured assemblies, built for a job that already exists.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 max-w-[1200px]">
          <ScrollReveal delay={90}>
            {/* ── Split-Pane Container ── */}
            <div 
              className="flex flex-col lg:flex-row overflow-hidden rounded-2xl bg-white shadow-float-dark"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={() => setIsPaused(false)}
            >
              
              {/* ── Left Strip: Vertical Tabs ── */}
              <div className="flex w-full lg:w-[380px] shrink-0 flex-col border-r border-card-divide bg-[#FAFAFB]">
                {solutions.map((s, index) => {
                  const isActive = index === currentIndex;
                  const Icon = s.icon;
                  
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`group relative flex flex-col items-start border-b border-card-divide p-6 lg:p-8 last:border-b-0 text-left transition-colors duration-250 focus:outline-none focus-visible:bg-blue-subtle ${
                        isActive ? "bg-white" : "hover:bg-white/60"
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      {/* Active Highlight Border */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[4px] bg-blue transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} aria-hidden />
                      
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                            isActive ? "border-blue-border bg-blue-subtle text-blue" : "border-card-line bg-white text-inkSoft group-hover:border-blue-border/50 group-hover:text-ink"
                          }`}>
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <span className={`text-[17px] font-semibold tracking-tight transition-colors ${
                            isActive ? "text-ink" : "text-inkSoft group-hover:text-ink"
                          }`}>
                            {s.name}
                          </span>
                        </div>
                        <svg className={`h-4.5 w-4.5 transition-transform duration-250 ${
                          isActive ? "text-blue translate-x-1" : "text-card-divide group-hover:text-inkSoft"
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
                      <p className="mt-3.5 text-[14px] leading-relaxed text-inkSoft pl-[44px]">
                        <span className="font-medium text-ink/80">{s.term}</span> — {s.headline.length > 55 ? s.headline.substring(0, 52) + "..." : s.headline}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* ── Right Strip: Main Content & Platform Image Placeholder ── */}
              <div className="relative flex min-w-0 flex-1 flex-col bg-white p-8 md:p-12 lg:p-14 min-h-[640px]">
                {solutions.map((s, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-8 md:inset-12 lg:inset-14 flex flex-col transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActive 
                          ? "z-10 opacity-100 translate-y-0 pointer-events-auto" 
                          : "z-0 opacity-0 translate-y-4 pointer-events-none"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="flex-none">
                        <h3 className="text-balance text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] font-bold tracking-tighter text-ink">
                          {s.headline}
                        </h3>
                        <p className="mt-5 max-w-[38em] text-[16px] md:text-[17px] leading-relaxed text-inkSoft">
                          {s.para}
                        </p>
                      </div>

                      {/* ── Premium Empty Image Placeholder ── */}
                      <div className="mt-10 flex-1 w-full rounded-xl border border-lineSoft bg-primary-bg shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col items-center justify-center">
                         {/* Subtle drafting grid background pattern */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(26,28,29,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,28,29,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                         
                         <div className="relative z-10 flex flex-col items-center justify-center gap-4 opacity-70">
                            <div className="h-14 w-14 rounded-full bg-white border border-subtle-stroke shadow-sm flex items-center justify-center">
                              <svg className="w-6 h-6 text-overcast" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                <path d="M21 15l-5-5L5 21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="font-semibold text-[14px] text-ink">Platform Interface</span>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-text mt-1 text-center">
                                Placeholder ready for<br/> {s.name} screenshot
                              </span>
                            </div>
                         </div>
                      </div>

                      {/* ── CTA Link ── */}
                      <div className="mt-8 flex items-center">
                        <Link 
                          href={s.href} 
                          className="group inline-flex items-center gap-2 text-[15px] font-bold tracking-tight text-blue hover:text-blue-hover transition-colors"
                          tabIndex={isActive ? 0 : -1}
                        >
                           Explore {s.name}
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-250 ease-settle group-hover:translate-x-1" aria-hidden>
                             <path d="M5 12h14M12 5l7 7-7 7" />
                           </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:mt-16">
            <span className="inline-flex items-center font-semibold text-white">
              <AkashicLogo className="h-5 w-5" />
              <span className="-ml-1 text-[14px]">kashic</span>
            </span>
            <span className="text-[14px] font-medium text-white/70">
              &middot; Different problems. Same governed foundation underneath.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
