"use client";

/*
 * [05] Audience — Designed for your engineering reality.
 * 3-Card Grid with requirement search router ("Type your problem we will suggest best fit")
 * and clean light UI dashboard preview mockups underneath.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface ProfileItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  badge: string;
  keywords: string[];
  mockupKind: "ai-custom" | "cloud-dashboard" | "squad-board";
}

const PROFILES: ProfileItem[] = [
  {
    id: "partners",
    num: "01",
    title: "Technology Partners",
    tagline: "Custom Software & AI Development",
    description: "You have a technical initiative and need an accountable partner to architect, build, and deploy custom software, AI applications, or microservices.",
    deliverables: ["Full Source Code Ownership", "Custom PyTorch & LLM Runtimes", "2-Week Sprint Cadence"],
    ctaLabel: "Start custom engineering",
    ctaHref: "#talk-to-our-team",
    badge: "Custom Engineering",
    keywords: ["build", "custom", "product", "from scratch", "ai", "modernise", "software", "solution", "partner", "bespoke"],
    mockupKind: "ai-custom",
  },
  {
    id: "akashic",
    num: "02",
    title: "Platform Customers",
    tagline: "Private Cloud & Platform Deployment",
    description: "You want to adopt a turnkey cloud platform or deploy Akashic white-labeled inside your private VPC ecosystem under your brand.",
    deliverables: ["99.99% Availability SLA", "Isolated Private VPC Perimeter", "Customer-Managed Keys"],
    ctaLabel: "Explore platform rollout",
    ctaHref: "/akashic",
    badge: "Managed Private Cloud",
    keywords: ["akashic", "platform", "saas", "white label", "whitelabel", "brand", "adopt", "ready", "tenant", "cloud", "private"],
    mockupKind: "cloud-dashboard",
  },
  {
    id: "teams",
    num: "03",
    title: "Engineering Squads",
    tagline: "Senior Engineering Capacity",
    description: "You have an active engineering organization and need principal AI, cloud, and distributed leads to accelerate release velocity.",
    deliverables: ["Principal AI & Cloud Leads", "GitHub & Jira Direct Sync", "Zero Management Overhead"],
    ctaLabel: "Discuss team capacity",
    ctaHref: "#talk-to-our-team",
    badge: "Team Augmentation",
    keywords: ["team", "staff", "engineers", "capacity", "squad", "augment", "augmentation", "extend", "senior", "scale"],
    mockupKind: "squad-board",
  },
];

const SCENARIOS = [
  { label: "Build custom AI platform", query: "Build a custom software and AI platform" },
  { label: "Private cloud rollout", query: "Deploy private cloud platform under our brand" },
  { label: "Extend engineering team", query: "Extend our team with specialized senior engineers" },
];

export default function DeliveryFit() {
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
          <div className="flex items-center justify-center font-mono text-[11px] uppercase tracking-eyebrow text-center">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Audience &amp; Fit</span>
            </p>
          </div>

          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Designed for your engineering reality.
          </h2>
          <p className="mt-3 text-center max-w-2xl mx-auto text-base text-inkSoft">
            Now that you have seen how we deliver at scale, select the profile that matches your organization&rsquo;s goals.
          </p>
        </ScrollReveal>

        {/* Interactive Requirement Search Router Bar */}
        <ScrollReveal delay={80}>
          <div className="mx-auto mt-8 max-w-[680px]">
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
                  placeholder="Describe your need — we will suggest the best fit for you..."
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

            {/* Scenario Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast font-medium">
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
                        : "border-subtle-stroke bg-white text-inkSoft hover:border-blue-border hover:bg-blue-subtle/50 hover:text-blue"
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
                      ? "border-blue bg-white shadow-frame ring-2 ring-blue/20 -translate-y-1.5"
                      : hasQuery
                      ? "border-subtle-stroke bg-white/70 opacity-60 hover:opacity-100"
                      : "border-subtle-stroke bg-white shadow-sm hover:-translate-y-1.5 hover:border-blue-border hover:shadow-frame"
                  }`}
                >
                  {/* Top Content Area */}
                  <div>
                    {/* Badge & Number Row */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-3.5">
                      <span className="font-mono text-[11px] font-bold text-blue uppercase tracking-eyebrow">
                        Profile {profile.num}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isMatched && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-blue-border bg-blue-subtle px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
                            Matched
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
                        href={profile.ctaHref}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-blue hover:text-blue-hover transition-colors group/link"
                      >
                        <span>{profile.ctaLabel}</span>
                        <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Light Application UI Mockup Box (Matching Reference Screenshot) */}
                  <div className="mt-6">
                    {/* Mockup Type 1: Workbooks & Data Table UI (Matching Screenshot Card 1) */}
                    {profile.mockupKind === "ai-custom" && (
                      <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg/60 p-3 shadow-inner text-[10px]">
                        <div className="flex items-center justify-between border-b border-subtle-stroke pb-2">
                          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-subtle-stroke text-inkSoft">
                            <span>🔍</span>
                            <span>Search pipelines...</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className="rounded bg-white px-1.5 py-0.5 border border-subtle-stroke text-ink font-semibold">&lt;/&gt; SQL</span>
                            <span className="rounded bg-ink px-2 py-0.5 text-white font-bold">▶ Run</span>
                          </div>
                        </div>
                        <div className="mt-2.5 flex gap-2.5">
                          {/* Sidebar */}
                          <div className="w-1/3 space-y-1 font-mono text-[9px] text-secondary-text">
                            <div className="rounded bg-white p-1 font-bold text-ink border border-subtle-stroke">Segment</div>
                            <div className="px-1 py-0.5">PyTorch LLM</div>
                            <div className="px-1 py-0.5">RAG Engine</div>
                            <div className="px-1 py-0.5 text-blue font-semibold bg-blue-subtle/50 rounded">Revenue</div>
                            <div className="px-1 py-0.5">Win Rate</div>
                          </div>
                          {/* Data Table */}
                          <div className="w-2/3 rounded bg-white p-2 border border-subtle-stroke font-mono text-[9px]">
                            <div className="flex justify-between border-b border-subtle-stroke pb-1 font-semibold text-overcast">
                              <span>Segment</span>
                              <span>Revenue</span>
                            </div>
                            <div className="mt-1 space-y-1 text-ink">
                              <div className="flex justify-between"><span>1 Strategic</span><span className="font-bold">$1.42M</span></div>
                              <div className="flex justify-between"><span>2 Enterprise</span><span className="font-bold">$1.18M</span></div>
                              <div className="flex justify-between"><span>3 Mid-market</span><span className="font-bold">$0.94M</span></div>
                              <div className="flex justify-between"><span>4 Public Sector</span><span className="font-bold">$0.67M</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mockup Type 2: Dashboards KPI & Segment Bar Chart UI (Matching Screenshot Card 2) */}
                    {profile.mockupKind === "cloud-dashboard" && (
                      <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg/60 p-3 shadow-inner text-[10px]">
                        {/* Top 3 KPI Cards */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="rounded bg-white p-1.5 border border-subtle-stroke">
                            <p className="text-[8px] uppercase tracking-eyebrow text-overcast">Revenue</p>
                            <p className="font-bold text-ink text-[11px]">$4.82M</p>
                            <p className="text-[8px] font-bold text-emerald-600">+12.4%</p>
                          </div>
                          <div className="rounded bg-white p-1.5 border border-subtle-stroke">
                            <p className="text-[8px] uppercase tracking-eyebrow text-overcast">New ARR</p>
                            <p className="font-bold text-ink text-[11px]">$1.31M</p>
                            <p className="text-[8px] font-bold text-emerald-600">+6.1%</p>
                          </div>
                          <div className="rounded bg-white p-1.5 border border-subtle-stroke">
                            <p className="text-[8px] uppercase tracking-eyebrow text-overcast">Win Rate</p>
                            <p className="font-bold text-ink text-[11px]">38.9%</p>
                            <p className="text-[8px] font-bold text-blue">+2.0pp</p>
                          </div>
                        </div>
                        {/* Vertical Bar Chart Container */}
                        <div className="mt-2.5 rounded bg-white p-2.5 border border-subtle-stroke">
                          <p className="text-[9px] font-semibold text-inkSoft mb-2">Revenue by segment</p>
                          <div className="flex items-end justify-between gap-2 h-14 px-1">
                            <div className="w-1/5 rounded-t bg-indigo-200 h-[45%]" />
                            <div className="w-1/5 rounded-t bg-indigo-300 h-[65%]" />
                            <div className="w-1/5 rounded-t bg-indigo-400 h-[80%]" />
                            <div className="w-1/5 rounded-t bg-blue h-[100%]" />
                            <div className="w-1/5 rounded-t bg-indigo-200 h-[55%]" />
                          </div>
                          <div className="flex justify-between font-mono text-[8px] text-overcast mt-1">
                            <span>SMB</span><span>Mid</span><span>Ent</span><span>Strat</span><span>Public</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mockup Type 3: Analytics Chat & Line Chart UI (Matching Screenshot Card 3) */}
                    {profile.mockupKind === "squad-board" && (
                      <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg/60 p-3 shadow-inner text-[10px] space-y-2">
                        {/* Right Chat Bubble */}
                        <div className="flex justify-end">
                          <div className="rounded-full bg-white border border-subtle-stroke px-3 py-1 text-[9.5px] font-medium text-ink shadow-xs">
                            Why did win rate dip in March?
                          </div>
                        </div>
                        {/* AI Answer Card */}
                        <div className="rounded-xl bg-white p-2.5 border border-subtle-stroke text-[9px] text-secondary-text leading-relaxed">
                          <p className="text-inkSoft font-medium">Mid-market win rate fell from 41.2% to 34.6%, driven by longer sales cycles.</p>
                          {/* Line Chart Simulation */}
                          <div className="mt-2 rounded border border-subtle-stroke p-2 bg-primary-bg/50">
                            <div className="flex justify-between text-[8px] font-mono text-overcast">
                              <span>Queried semantic model</span>
                            </div>
                            <svg viewBox="0 0 100 25" className="w-full h-7 mt-1 stroke-blue fill-none stroke-[2]">
                              <path d="M0,10 Q25,5 50,18 T100,8" />
                              <path d="M0,18 Q30,15 60,12 T100,10" stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                        {/* Bottom Input Box */}
                        <div className="flex items-center justify-between rounded-full bg-white border border-subtle-stroke px-3 py-1">
                          <span className="text-[9px] text-overcast font-medium">Ask me about your data</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-white text-[8px] font-bold">↑</span>
                        </div>
                      </div>
                    )}
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




