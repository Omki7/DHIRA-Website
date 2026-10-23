"use client";

/*
 * /delivery [06] Partnership fit: a requirement search that routes to one
 * of three engagement profiles, each card with a simulated product preview
 * underneath (demos/mockups/DeliveryFitPreviewMockup). Copy:
 * content/pages/delivery.ts `fit`.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DeliveryFitPreviewMockup from "@/components/demos/mockups/DeliveryFitPreviewMockup";
import type { DeliveryPage } from "@/content/pages/delivery";


export default function DeliveryFit({ content }: { content: DeliveryPage["fit"] }) {
  const PROFILES = content.profiles;
  const SCENARIOS = content.scenarios;
  const [query, setQuery] = useState("");

  const matchedCategoryId = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;

    let bestMatch: string | null = null;
    let maxScore = 0;

    PROFILES.forEach((cat) => {
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

    return maxScore > 0 ? bestMatch : content.fallbackProfile;
  }, [query, PROFILES, content.fallbackProfile]);

  return (
    <section
      id="partnership-fit"
      className="scroll-mt-24 border-t border-lineSoft bg-band pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center justify-center font-mono text-[11px] uppercase tracking-eyebrow text-center">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
          </div>

          <h2 className="mt-4 text-center text-3xl font-medium tracking-tight text-ink md:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-3 text-center max-w-2xl mx-auto text-base text-inkSoft">
            {content.lede}
          </p>
        </ScrollReveal>

        {/* Interactive Requirement Search Router Bar */}
        <ScrollReveal delay={80}>
          <div className="mx-auto mt-8 max-w-[680px]">
            <div className="rounded-2xl border border-subtle-stroke bg-background p-2.5  transition-all focus-within:border-blue ">
              <div className="flex items-center gap-3 px-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-blue">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={content.searchPlaceholder}
                  aria-label={content.searchPlaceholder}
                  className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-overcast focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label={content.clearLabel}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-overcast hover:bg-tertiary-bg hover:text-ink"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Scenario Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast font-medium">
                {content.scenariosLabel}
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
                        ? "border-blue bg-blue text-on-action "
                        : "border-subtle-stroke bg-background text-inkSoft hover:border-blue-border hover:bg-blue-subtle hover:text-blue"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Card Grid: Content Above, Light Dashboard UI Below */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
          {PROFILES.map((profile, idx) => {
            const isMatched = matchedCategoryId === profile.id;
            const hasQuery = Boolean(query.trim());

            return (
              <ScrollReveal key={profile.id} delay={100 + idx * 60}>
                <div
                  className={`group flex h-full flex-col justify-between rounded-[24px] border p-6 transition-all duration-300 ${
                    isMatched
                      ? "border-blue bg-background  ring-2 ring-blue/20 -translate-y-1.5"
                      : hasQuery
                      ? "border-subtle-stroke bg-background opacity-60 hover:opacity-100"
                      : "border-subtle-stroke bg-background  hover:-translate-y-1.5 hover:border-blue-border "
                  }`}
                >
                  {/* Top Content Area */}
                  <div>
                    {/* Badge & Number Row */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-3.5">
                      <span className="font-mono text-[11px] font-bold text-blue uppercase tracking-eyebrow">
                        {content.profileLabel} {profile.num}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isMatched && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-blue-border bg-blue-subtle px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
                            {content.matched}
                          </span>
                        )}
                        <span className="rounded-full bg-primary-bg px-2.5 py-0.5 font-mono text-[10px] font-bold text-inkSoft border border-subtle-stroke">
                          {profile.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-ink group-hover:text-blue transition-colors">
                      {profile.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-eyebrow text-blue font-semibold">
                      {profile.tagline}
                    </p>

                    {/* Description Paragraph */}
                    <p className="mt-3 text-xs leading-relaxed text-secondary-text font-sans">
                      {profile.description}
                    </p>

                    {/* Deliverables Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {profile.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded bg-primary-bg px-2 py-0.5 font-mono text-[9.5px] font-medium text-inkSoft border border-subtle-stroke"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* CTA Link */}
                    <div className="mt-5 pt-3 border-t border-dashed border-lineSoft">
                      <Link
                        href={profile.cta.href}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-blue hover:text-blue-hover transition-colors group/link"
                      >
                        <span>{profile.cta.label}</span>
                        <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                      </Link>
                    </div>
                  </div>

                  <DeliveryFitPreviewMockup kind={profile.mockupKind} />

                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
