"use client";

/*
 * [09] Built on Akashic — start from a solution, not a blank platform.
 * Interface modelled on Keboola's homepage "Verified Results" spotlight
 * carousel (user direction, Jul 2026): one large card per solution — left
 * rail with product mark, headline, one-line support, three stacked stats
 * with hairline dividers, and the explore CTA; the visual laid out in full
 * on the right; arrows and timed progress dots. Skinned entirely in house
 * tokens on the page's second ak-depth slab (same treatment as [05]).
 *
 * The EIS slide shows the real product capture /eis/home.png in full.
 * ASSET FLAG: both /eis/home*.png captures still carry the rejected demo
 * cast ("NEXORA · EIS" masthead; home-ceo.png names "Meridian Retail") and
 * run in ₹ inside the $-denominated enterprise demo world — regenerate the
 * captures with the approved cast (see content decisions memo, decision 4).
 * Life and Knowledge have no captures yet, so their slides carry the
 * SIMULATED PRODUCT UI bodies (AGENTS.md §8a) in a framed window; swap for
 * real captures when they exist.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { BlueChip, Capillary, CardBadge } from "@/components/sections/akashic/AkashicCardChrome";

/* Life: unmistakably clinical — a study record with phase progress, three
   sources merging into one governed record. */
function LifeBody() {
  return (
    <div className="flex h-full flex-col justify-between gap-1.5 p-3.5">
      <div className="rounded-inner border border-card-line bg-white px-2.5 py-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-secondary-text">
            Study VX-201 &middot; Site 14
          </span>
          <span className="font-mono text-[8px] font-semibold text-blue">Phase III</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1" aria-hidden>
          <div className="h-1.5 flex-1 rounded-full bg-blue/70" />
          <div className="h-1.5 flex-1 rounded-full bg-blue/70" />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-subtle">
            <div className="h-full w-2/3 rounded-full bg-blue/70" />
          </div>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[7.5px] text-secondary-text" aria-hidden>
          <span>I</span>
          <span>II</span>
          <span>III</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Clinical", "Regulatory", "Commercial"].map((s) => (
          <span key={s} className="rounded-chip border border-card-line bg-white px-2 py-1 text-[10px] font-medium text-inkSoft">
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2" aria-hidden>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
        <span className="text-[10px] font-semibold text-[#6E7178]">unified</span>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
      </div>
      <div className="rounded-inner border-[1.5px] border-blue bg-gradient-to-b from-[#F6F8FF] to-white px-3 py-2 text-center shadow-[0_6px_18px_rgba(62,99,221,0.08)]">
        <span className="text-[11px] font-bold text-blue">One record per study, site, and product</span>
      </div>
    </div>
  );
}

function DocGlyph() {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 12 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      className="shrink-0 text-overcast"
      aria-hidden
    >
      <path d="M2 1.5h5.5L10.5 4.5v8H2z" />
      <path d="M7.5 1.5v3h3" />
    </svg>
  );
}

/* Knowledge: unmistakably documents — a small stack of files, then the
   plain-language question being typed against them. */
function KnowledgeBody() {
  const docs = [
    { name: "Procurement_policy.pdf", tag: "policy" },
    { name: "Vendor_MSA_2025.docx", tag: "contract" },
    { name: "Data_sharing_MOU.pdf", tag: "agreement" },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-1.5 p-3.5">
      <div className="flex flex-col gap-1.5">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center gap-2 rounded-inner border border-card-line bg-white px-2.5 py-1.5">
            <DocGlyph />
            <span className="min-w-0 flex-1 truncate font-mono text-[9.5px] text-ink">{d.name}</span>
            <span className="shrink-0 rounded-micro bg-[#F1F2F4] px-1.5 py-0.5 font-mono text-[8.5px] text-[#7C828C]">
              {d.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-inner border border-blue-border bg-blue-subtle/60 px-2.5 py-2">
        <span className="text-[11px] leading-relaxed text-ink">
          &ldquo;What does the exit clause say?&rdquo;
          <span className="ml-0.5 font-bold text-blue">|</span>
        </span>
      </div>
    </div>
  );
}

interface SolutionStat {
  value: string;
  label: string;
}

interface Solution {
  id: string;
  name: string;
  term: string;
  headline: string;
  para: string;
  stats: SolutionStat[];
  href: string;
  image?: { src: string; alt: string };
  body?: React.ReactNode;
}

const solutions: Solution[] = [
  {
    id: "akashic-eis",
    name: "Akashic EIS",
    term: "Executive intelligence",
    headline: "The organisation’s performance, on one live screen.",
    para: "Performance, risk, and open decisions in one place, for the people who answer for them.",
    stats: [
      { value: "Live", label: "not a monthly deck" },
      { value: "Traceable", label: "every figure, to its source" },
      { value: "Weeks", label: "to first answers, not quarters" },
    ],
    href: "/solutions/eis",
    image: {
      src: "/eis/home.png",
      alt: "Akashic EIS home screen: the morning intelligence feed with business pulse tiles",
    },
  },
  {
    id: "akashic-life",
    name: "Akashic Life",
    term: "Life sciences",
    headline: "One governed record for every study, site, and product.",
    para: "Clinical, regulatory, and commercial data brought together for the people who file, approve, and launch.",
    stats: [
      { value: "Unified", label: "across three regulated worlds" },
      { value: "Lineage", label: "under every figure" },
      { value: "Audit-ready", label: "for filing day" },
    ],
    href: "/solutions/life",
    body: <LifeBody />,
  },
  {
    id: "akashic-knowledge",
    name: "Akashic Knowledge",
    term: "Document intelligence",
    headline: "Ask your documents a question.",
    para: "Policies, contracts, and institutional knowledge — readable, searchable, and citable at last.",
    stats: [
      { value: "Plain language", label: "ask in a sentence" },
      { value: "Cited", label: "every answer points to the clause" },
      { value: "Institutional", label: "policies, contracts, minutes" },
    ],
    href: "/solutions/knowledge",
    body: <KnowledgeBody />,
  },
];

const SLIDE_MS = 6000;

export default function AkashicSolutions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % solutions.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_MS);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section id="solutions" className="ak-depth relative scroll-mt-24 overflow-hidden">
      {/* Same precisely-cut dark slab as [05]: crisp seams, blue horizon
          glows, machined dot texture. The page's second dark chapter. */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(62,99,221,0.22),transparent_72%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(62,99,221,0.16),transparent_72%)]" aria-hidden />

      <div className="relative rail-container border-x-0 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-white/40">[09]</span>
            <span className="text-white/70">&nbsp;&nbsp;Built on Akashic</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-white md:text-heading-md">
            Start from a solution, not a blank platform.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-white/70">
            Three pre-configured assemblies of Akashic&rsquo;s seven modules, each built
            for a job that already exists. Your first question is a business one, not a
            configuration one.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-[1160px] lg:mt-16">
          <ScrollReveal delay={90}>
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-card-line bg-white/95 text-ink shadow-frame backdrop-blur transition-colors duration-250 ease-settle hover:border-blue-border hover:text-blue focus:outline-none sm:-left-5"
                aria-label="Previous solution"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-card-line bg-white/95 text-ink shadow-frame backdrop-blur transition-colors duration-250 ease-settle hover:border-blue-border hover:text-blue focus:outline-none sm:-right-5"
                aria-label="Next solution"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* The spotlight card. Slides share one grid cell so the card
                  sizes to the tallest slide and crossfades between them. */}
              <div className="overflow-hidden rounded-outer bg-white shadow-deep ring-1 ring-white/10">
                <Capillary bright />
                <div className="grid">
                  {solutions.map((s, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={s.id}
                        className={`[grid-area:1/1] transition-opacity duration-500 ease-in-out ${
                          isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                        }`}
                        aria-hidden={!isActive}
                      >
                        <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                          {/* Left rail: mark, headline, support, stats, CTA */}
                          <div className="flex h-full flex-col p-7 md:p-9 lg:p-11">
                            <div className="flex items-center gap-2.5">
                              <CardBadge icon={s.name} />
                              <span className="min-w-0 truncate text-[15px] font-bold tracking-tight text-ink">
                                {s.name}
                              </span>
                              <BlueChip label="PRE-CONFIGURED" />
                            </div>

                            <h3 className="mt-6 text-balance text-[24px] font-semibold leading-[1.15] tracking-tight text-ink md:text-[28px]">
                              {s.headline}
                            </h3>
                            <p className="mt-3.5 text-[14.5px] leading-relaxed text-inkSoft">{s.para}</p>

                            <div className="mt-7 divide-y divide-card-divide border-y border-card-divide">
                              {s.stats.map((stat) => (
                                <div key={stat.value} className="py-3">
                                  <div className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
                                    {stat.value}
                                  </div>
                                  <div className="mt-0.5 text-[12.5px] text-secondary-text">{stat.label}</div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-auto pt-6">
                              <Link
                                href={s.href}
                                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-blue"
                                tabIndex={isActive ? 0 : -1}
                              >
                                Explore {s.name}
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5"
                                  aria-hidden
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>

                          {/* Right: the visual, laid out in full */}
                          <div className="flex items-center justify-center border-t border-card-divide bg-panel/60 p-5 md:p-7 lg:border-l lg:border-t-0">
                            {s.image ? (
                              <img
                                src={s.image.src}
                                alt={s.image.alt}
                                className="h-auto w-full rounded-inner ring-1 ring-ink/10 shadow-frame"
                              />
                            ) : (
                              /* Simulated product UI (§8a) in a framed window
                                 until a real capture exists */
                              <div className="w-full max-w-[420px] overflow-hidden rounded-inner border border-card-line bg-white shadow-card">
                                <div className="border-b border-card-divide bg-panel px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                                  {s.name}
                                </div>
                                <div className="h-[252px]">{s.body}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timed progress dots */}
              <div className="mt-7 flex items-center justify-center gap-2">
                {solutions.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-12" : "w-2.5 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Show ${s.name}`}
                    aria-current={index === currentIndex}
                  >
                    {index === currentIndex && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-white/25" />
                        <span
                          className="absolute inset-0 origin-left rounded-full bg-blue"
                          style={{
                            animation: `progressFill ${SLIDE_MS}ms linear forwards`,
                            animationPlayState: isPaused ? "paused" : "running",
                          }}
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:mt-14">
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
      </div>
    </section>
  );
}
