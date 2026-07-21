"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const DEPT_FILTERS = ["View all", "Engineering", "Machine Learning", "Product", "Delivery"] as const;
type Dept = (typeof DEPT_FILTERS)[number];

const ROLES: { dept: Dept; title: string; desc: string; location: string; type: string }[] = [
  {
    dept: "Engineering",
    title: "Senior Data Engineer",
    desc: "Build and scale government data pipelines.",
    location: "Remote",
    type: "Full-time",
  },
  {
    dept: "Machine Learning",
    title: "ML Researcher, Grounding Systems",
    desc: "Advance grounding and retrieval systems for public-sector AI.",
    location: "Hyderabad",
    type: "Full-time",
  },
  {
    dept: "Product",
    title: "Product Manager, Akashic Platform",
    desc: "Own the roadmap for our flagship intelligence platform.",
    location: "New York",
    type: "Full-time",
  },
  {
    dept: "Delivery",
    title: "Implementation Lead, Government",
    desc: "Guide large-scale government deployments end to end.",
    location: "Remote",
    type: "Full-time",
  },
];

export default function JoinTheTeam() {
  const [activeFilter, setActiveFilter] = useState<Dept>("View all");
  const visibleRoles =
    activeFilter === "View all" ? ROLES : ROLES.filter((r) => r.dept === activeFilter);

  return (
    <section
      id="careers"
      aria-labelledby="careers-h"
      className="relative overflow-hidden bg-[#FAFAF9] pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      {/* Warm ambient — top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(215,155,60,0.08), transparent 70%)" }}
      />
      {/* Cool counterpoint — bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-32 h-[400px] w-[400px] blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(62,99,221,0.04), transparent 70%)" }}
      />

      <ScrollRevealRail className="relative z-10">

        {/* ── Eyebrow ── */}
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[09]</span>
              &nbsp;&nbsp;CAREERS / OPEN ROLES
            </span>

            {/* Live hiring indicator — the section's signature */}
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                  style={{ animationDuration: "2.4s" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
              </span>
              <span className="text-[11px] font-medium tracking-eyebrow text-blue">NOW HIRING</span>
            </span>
          </div>

          {/* ── Headline + subhead ── */}
          <h2
            id="careers-h"
            className="max-w-[14em] text-balance text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink sm:text-[48px] lg:text-[56px]"
          >
            Join us in building India&apos;s intelligence&nbsp;layer.
          </h2>
          <p className="mt-5 max-w-[34em] text-[17px] leading-relaxed text-inkSoft md:text-[18px]">
            We are a small team that ships. Our work runs inside systems people depend on daily,
            <br className="hidden sm:block" />
            touches millions of lives, and lasts beyond any single budget cycle.
            <br className="hidden sm:block" />
            If that matters to you, we should talk.
          </p>
        </ScrollReveal>

        {/* ── Open roles ── */}
        <ScrollReveal delay={90}>

          {/* Filter pills */}
          <div className="mt-12 flex flex-wrap gap-2">
            {DEPT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={[
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150",
                  activeFilter === f
                    ? "bg-ink text-white shadow-sm"
                    : "border border-line bg-white/70 text-inkSoft hover:border-ink/30 hover:text-ink",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Role rows */}
          <div className="mt-5 border-t border-lineSoft">
            {visibleRoles.map((r) => (
              <div key={r.title} className="group relative border-b border-lineSoft">

                {/* Blue left accent — grows on hover (the interaction signature) */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-200 ease-out group-hover:scale-y-100"
                />

                <div className="flex items-start justify-between gap-4 py-6 pl-5 pr-1 transition-[padding] duration-150 group-hover:pl-6">

                  {/* Left: dept + title + desc + tags */}
                  <div className="min-w-0">
                    <span className="mb-1.5 inline-block font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      {r.dept}
                    </span>
                    <p className="text-[15px] font-semibold leading-snug text-ink">{r.title}</p>
                    <p className="mt-1 max-w-[44em] text-sm leading-relaxed text-inkSoft">{r.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1.5 rounded-full border border-lineSoft bg-white px-3 py-1 text-xs text-inkSoft">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                          <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
                        </svg>
                        {r.location}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-lineSoft bg-white px-3 py-1 text-xs text-inkSoft">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1"/>
                          <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {r.type}
                      </span>
                    </div>
                  </div>

                  {/* Right: Apply */}
                  <Link
                    href="/careers"
                    className="mt-1 flex-shrink-0 text-sm font-semibold text-overcast transition-colors duration-150 group-hover:text-ink"
                  >
                    <span className="flex items-center gap-0.5">
                      Apply
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── CTA + locations ── */}
        <ScrollReveal delay={180}>
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-lineSoft pt-8 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/careers" className="btn-primary">
              Explore all open roles
            </Link>
            <span className="text-sm text-overcast">
              New York · Hyderabad · Bangalore · Remote
            </span>
          </div>
        </ScrollReveal>

      </ScrollRevealRail>
    </section>
  );
}
