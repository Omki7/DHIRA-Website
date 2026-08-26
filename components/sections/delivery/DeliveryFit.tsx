"use client";

/*
 * [05] Audience — Who this is for.
 * Streamlined interactive requirement router matching the modern visual standard.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface AudienceCategory {
  id: string;
  num: string;
  title: string;
  desc: string;
  services: string[];
  specs: string[];
  ctaLabel: string;
  ctaHref: string;
  keywords: string[];
}

const CATEGORIES: AudienceCategory[] = [
  {
    id: "partners",
    num: "01",
    title: "Technology Partners",
    desc: "You have a technical initiative and need an accountable partner to architect, build, and deploy custom technology or products.",
    services: ["Custom Tech & AI", "Product Engineering"],
    specs: ["Bespoke Architecture", "100% Sovereign IP"],
    ctaLabel: "Start a conversation",
    ctaHref: "#talk-to-our-team",
    keywords: ["build", "custom", "product", "from scratch", "ai", "modernise", "software", "solution", "partner"],
  },
  {
    id: "akashic",
    num: "02",
    title: "Akashic Platform Customers",
    desc: "You want to adopt a turnkey sovereign cloud platform or deploy Akashic white-labeled under your own brand.",
    services: ["Akashic SaaS", "White Label VPC"],
    specs: ["Managed Sovereign Cloud", "Dedicated Tenant VPC"],
    ctaLabel: "Explore Akashic",
    ctaHref: "/akashic",
    keywords: ["akashic", "platform", "saas", "white label", "whitelabel", "brand", "adopt", "ready", "tenant"],
  },
  {
    id: "teams",
    num: "03",
    title: "Engineering Teams",
    desc: "You have an active engineering organization and need principal AI, cloud, and distributed leads to accelerate delivery.",
    services: ["Staff Augmentation", "Squad Extension"],
    specs: ["Principal/Staff Leads", "Direct GitHub/Jira Sync"],
    ctaLabel: "Discuss Capacity",
    ctaHref: "#talk-to-our-team",
    keywords: ["team", "staff", "engineers", "capacity", "squad", "augment", "augmentation", "extend", "senior"],
  },
];

const SCENARIOS = [
  { label: "Build custom AI platform", query: "Build a custom software and AI platform" },
  { label: "White-label Akashic", query: "White-label Akashic platform under our brand" },
  { label: "Extend engineering squad", query: "Extend our team with specialized senior engineers" },
];

export default function DeliveryFit() {
  const [query, setQuery] = useState("");

  const matchedCategoryId = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;

    let bestMatch: string | null = null;
    let maxScore = 0;

    CATEGORIES.forEach((cat) => {
      let score = 0;
      cat.keywords.forEach((kw) => {
        if (trimmed.includes(kw.toLowerCase())) {
          score += 1;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = cat.id;
      }
    });

    return maxScore > 0 ? bestMatch : "partners";
  }, [query]);

  return (
    <section
      id="partnership-fit"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_20%,#F1F5FE_80%,#FFFFFF_100%)] pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Audience</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Three starting profiles</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-4xl">
            Who this is for.
          </h2>
          <p className="mt-3 max-w-[38em] text-base leading-relaxed text-secondary-text md:text-lg">
            Whether you need a custom engineering partner, a ready platform, or squad capacity, we meet you where you are.
          </p>
        </ScrollReveal>

        {/* Enterprise Requirement Router Bar */}
        <ScrollReveal delay={100}>
          <div className="mx-auto mt-8 max-w-[700px]">
            <div className="rounded-2xl border border-subtle-stroke bg-white p-2.5 shadow-sm transition-all focus-within:border-blue focus-within:shadow-frame">
              <div className="flex items-center gap-3 px-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-blue">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your requirement (e.g. custom AI, white label, squad extension)..."
                  className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-overcast focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear requirement filter"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-overcast hover:bg-tertiary-bg hover:text-ink"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Quick Scenario Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                Scenarios:
              </span>
              {SCENARIOS.map((s) => {
                const isSelected = query === s.query;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setQuery(isSelected ? "" : s.query)}
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold transition-all ${
                      isSelected
                        ? "border-blue bg-blue text-white shadow-sm"
                        : "border-subtle-stroke bg-white/90 text-inkSoft hover:border-blue-border hover:bg-blue-subtle/50 hover:text-blue"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Profile Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {CATEGORIES.map((c, idx) => {
            const isMatched = matchedCategoryId === c.id;
            const hasQuery = Boolean(query.trim());

            return (
              <ScrollReveal key={c.num} delay={120 + idx * 80}>
                <div
                  className={`flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                    isMatched
                      ? "border-blue bg-white shadow-frame ring-2 ring-blue/20 -translate-y-1"
                      : hasQuery
                      ? "border-subtle-stroke bg-white/70 opacity-60 hover:opacity-100"
                      : "border-subtle-stroke bg-white shadow-sm hover:-translate-y-1 hover:border-blue-border hover:shadow-frame"
                  }`}
                >
                  <div>
                    {/* Top Row: Num & Badge */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded font-mono text-[10.5px] font-bold ${
                            isMatched ? "bg-blue text-white" : "bg-blue-subtle text-blue"
                          }`}
                        >
                          {c.num}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-inkSoft">
                          Profile {c.num}
                        </span>
                      </div>
                      {isMatched && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-border bg-blue-subtle px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
                          Matched
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-secondary-text font-sans">
                      {c.desc}
                    </p>

                    {/* Specs Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded bg-primary-bg px-2 py-0.5 font-mono text-[9.5px] font-medium text-inkSoft border border-subtle-stroke"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Recommended Paths */}
                    <div className="mt-5 border-t border-dashed border-lineSoft pt-3.5">
                      <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                        Recommended Paths
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.services.map((s) => (
                          <span
                            key={s}
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                              isMatched
                                ? "border-blue-border bg-blue-subtle text-blue"
                                : "border-subtle-stroke bg-primary-bg text-secondary-text"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 border-t border-subtle-stroke pt-4">
                    <Link
                      href={c.ctaHref}
                      className={`flex w-full items-center justify-center rounded-full px-4 py-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow transition-all ${
                        isMatched
                          ? "bg-blue text-white hover:bg-blue-hover shadow-sm"
                          : "bg-ink text-white hover:bg-action-hover"
                      }`}
                    >
                      {c.ctaLabel} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollRevealRail>
    </section>
  );
}

