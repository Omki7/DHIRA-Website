"use client";

/*
 * [05] Audience — Who this is for.
 * Enterprise requirement router on the soft blue narrative band (Rule 5a).
 * Visitors can enter their requirement or select common enterprise scenarios
 * to highlight the optimal engagement path and service configuration.
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
  servicesLabel: string;
  services: string[];
  ctaLabel: string;
  ctaHref: string;
  keywords: string[];
}

const categories: AudienceCategory[] = [
  {
    id: "partners",
    num: "01",
    title: "Technology Partners",
    desc: "You have a technology requirement and need a team to design, build, or deliver it.",
    servicesLabel: "Relevant services",
    services: ["Custom Technology Services", "Product Engineering"],
    ctaLabel: "Start a conversation",
    ctaHref: "#talk-to-our-team",
    keywords: [
      "build",
      "custom",
      "product",
      "from scratch",
      "ai",
      "modernise",
      "modernize",
      "software",
      "solution",
      "partner",
      "cloud",
      "analytics",
      "bi",
      "initiative",
    ],
  },
  {
    id: "akashic",
    num: "02",
    title: "Akashic Customers",
    desc: "You want to adopt a ready-to-use platform or deploy Akashic under your own brand.",
    servicesLabel: "Relevant offerings",
    services: ["Akashic SaaS", "Akashic White Label"],
    ctaLabel: "Explore Akashic",
    ctaHref: "/akashic",
    keywords: [
      "akashic",
      "platform",
      "saas",
      "white label",
      "whitelabel",
      "brand",
      "branded",
      "adopt",
      "ready",
      "license",
      "tenant",
      "turnkey",
    ],
  },
  {
    id: "teams",
    num: "03",
    title: "Existing Engineering Teams",
    desc: "You already have a team and need additional engineering capacity or specialized expertise.",
    servicesLabel: "Relevant services",
    services: ["Staff Augmentation", "Product Engineering"],
    ctaLabel: "Discuss Capacity",
    ctaHref: "#talk-to-our-team",
    keywords: [
      "team",
      "staff",
      "engineers",
      "engineer",
      "capacity",
      "squad",
      "augment",
      "augmentation",
      "extend",
      "bandwidth",
      "senior",
      "specialist",
      "sprint",
    ],
  },
];

const commonScenarios = [
  { label: "Build custom platform", query: "Build a custom software and AI platform" },
  { label: "White-label Akashic", query: "White-label Akashic platform under our brand" },
  { label: "Extend engineering squad", query: "Extend our team with specialized senior engineers" },
];

export default function DeliveryFit() {
  const [query, setQuery] = useState("");

  // Determine matched category based on search query
  const matchedCategoryId = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;

    let bestMatch: string | null = null;
    let maxScore = 0;

    categories.forEach((cat) => {
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
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-16 pb-24 lg:pt-20 lg:pb-32"
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
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Who this is for.
          </h2>
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            Whether you&rsquo;re looking for a technology partner, a platform, or additional engineering capacity, we can meet you where you are.
          </p>
        </ScrollReveal>

        {/* Enterprise Requirement Router Bar */}
        <ScrollReveal delay={100}>
          <div className="mx-auto mt-10 max-w-[760px]">
            <div className="rounded-tile border border-subtle-stroke bg-white p-2.5 shadow-sm transition-all duration-200 focus-within:border-blue focus-within:shadow-card">
              <div className="flex items-center gap-3 px-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-overcast"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your requirement (e.g., custom AI platform, white-label Akashic, squad extension)..."
                  className="w-full bg-transparent text-[14.5px] font-medium text-ink placeholder:text-overcast focus:outline-none md:text-[15px]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear requirement filter"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-overcast hover:bg-tertiary-bg hover:text-ink"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Common Scenarios Filter Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                Common scenarios:
              </span>
              {commonScenarios.map((s) => {
                const isSelected = query === s.query;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setQuery(isSelected ? "" : s.query)}
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow transition-all duration-200 ${
                      isSelected
                        ? "border-blue bg-blue text-white shadow-sm"
                        : "border-subtle-stroke bg-white/90 text-inkSoft hover:border-blue-border hover:bg-blue-subtle/40 hover:text-blue"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Profile Router */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {categories.map((c, idx) => {
            const isMatched = matchedCategoryId === c.id;
            const hasQuery = Boolean(query.trim());

            return (
              <ScrollReveal key={c.num} delay={120 + idx * 80}>
                <div
                  className={`flex h-full flex-col justify-between rounded-tile border p-6 transition-all duration-250 ease-settle lg:p-7 ${
                    isMatched
                      ? "border-blue bg-white shadow-frame ring-1 ring-blue/25 -translate-y-1"
                      : hasQuery
                      ? "border-subtle-stroke bg-white/80 opacity-60 hover:opacity-100"
                      : "border-blue-border/60 bg-white shadow-card hover:-translate-y-1 hover:shadow-frame"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded font-mono text-[10.5px] font-bold ${
                            isMatched ? "bg-blue text-white" : "bg-blue-subtle text-blue"
                          }`}
                        >
                          {c.num}
                        </span>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                          Profile {c.num}
                        </span>
                      </div>
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-border bg-blue-subtle px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                          Recommended
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                          Standard
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-[21px] font-semibold tracking-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-secondary-text">
                      {c.desc}
                    </p>

                    <div className="mt-6 border-t border-dashed border-lineSoft pt-4">
                      <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                        {c.servicesLabel}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {c.services.map((s) => (
                          <span
                            key={s}
                            className={`rounded-full border px-3 py-1 font-mono text-[10.5px] font-medium ${
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

                  <div className="mt-8 border-t border-subtle-stroke pt-4">
                    <Link
                      href={c.ctaHref}
                      className={`flex w-full items-center justify-center rounded-md px-4 py-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow transition-colors duration-200 ${
                        isMatched
                          ? "bg-blue text-white hover:bg-blue-hover shadow-sm"
                          : "bg-primary-bg text-ink border border-subtle-stroke hover:bg-blue hover:text-white hover:border-blue"
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
