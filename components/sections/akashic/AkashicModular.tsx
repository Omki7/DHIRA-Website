"use client";

/*
 * [04] Start Anywhere, Scale Everywhere — Modular by Design.
 * Tabbed module explorer. The detail panel carries the AkashicMark and the
 * each module lives in, making "the foundation is the same either way"
 * literal. Panel chrome is simulated UI (AGENTS.md §8a).
 */

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardBadge, BlueChip, AkashicMark } from "@/components/sections/akashic/AkashicCardChrome";

type Layer = "data" | "knowledge" | "ai" | "governance";

const layerNames: Record<Layer, string> = {
  data: "Lives in the Data Foundation",
  knowledge: "Lives in the Knowledge Foundation",
  ai: "Lives in AI & Decision Intelligence",
  governance: "The floor under every module",
};

const layerChips: Record<Layer, string> = {
  data: "DATA FOUNDATION",
  knowledge: "KNOWLEDGE",
  ai: "AI & DECISION",
  governance: "GOVERNANCE",
};

const modules: {
  name: string;
  icon: string;
  tagline: string;
  body: string;
  layer: Layer;
}[] = [
  {
    name: "Akashic Pipelines",
    icon: "Akashic Data Pipelines",
    tagline: "Every source, ingested and validated.",
    body: "Bring in structured and unstructured data: CRMs, ERPs, PDFs, spreadsheets, live feeds. Validated the moment it arrives. Works standalone as your ingestion layer, or as the entry point into the full platform.",
    layer: "data",
  },
  {
    name: "Akashic Master Data",
    icon: "Akashic Master Data",
    tagline: "One golden record. No duplicates.",
    body: "Resolve every version of an entity, whether a customer, a vendor, or a location, into one trusted record. Solves “which record is real” on its own, and becomes the foundation every other module builds on if you add more later.",
    layer: "data",
  },
  {
    name: "Akashic Warehouse",
    icon: "Akashic Data Warehouse",
    tagline: "Structured, modelled, ready to query.",
    body: "Turns mastered records into models built for fast, reliable queries, with context and relationships built in, not bolted on after. Use it as your analytics-ready warehouse today; it's also what makes every answer downstream mean the same thing everywhere.",
    layer: "data",
  },
  {
    name: "Akashic ML",
    icon: "Akashic Machine Learning",
    tagline: "Build and monitor models where your data already lives.",
    body: "Train, deploy, and monitor predictive models directly on governed data. No separate export, no separate environment to maintain.",
    layer: "ai",
  },
  {
    name: "Ask Akashic",
    icon: "Akashic Insights",
    tagline: "Plain-language answers, grounded in your data.",
    body: "Ask a question in plain language, get an answer sourced from your governed model, not a guess. Works from day one against whatever data you've connected so far.",
    layer: "ai",
  },
  {
    name: "Akashic BI",
    icon: "Akashic BI",
    tagline: "Dashboards and metrics, defined once.",
    body: "Build dashboards and reports where every metric means the same thing every time it's used. For a team that needs answers now, not a BI project that takes a quarter to stand up.",
    layer: "ai",
  },
  {
    name: "Akashic Governance",
    icon: "Akashic Data Governance",
    tagline: "Access, lineage, and audit, from day one.",
    body: "Role-based access, full lineage, and audit trails apply from the first module you deploy. Governance isn't something you add later. It's already running underneath whatever you start with.",
    layer: "governance",
  },
];

export default function AkashicModular() {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <section id="modular" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[04]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Modular by design</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            Every module works alone. Together, they&rsquo;re the whole platform.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
            You don&rsquo;t have to adopt Akashic all at once. Start with the module
            that solves your biggest problem today. The foundation is the same
            either way, so nothing you start with gets rebuilt later.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div className="mx-auto mt-12 grid max-w-[1100px] gap-5 lg:mt-14 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Tab list */}
            <div
              className="flex gap-1 overflow-x-auto rounded-frame border border-subtle-stroke bg-primary-bg p-1.5 lg:flex-col lg:self-start lg:overflow-visible"
              role="tablist"
              aria-label="Akashic modules"
            >
              {modules.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-[10px] border px-3 py-2.5 text-left transition-all duration-250 ease-settle lg:shrink ${
                    i === active
                      ? "border-subtle-stroke bg-white shadow-card"
                      : "border-transparent hover:bg-white/70"
                  }`}
                >
                  <DynamicSketchIcon
                    text={m.icon}
                    className={`h-4 w-4 shrink-0 ${i === active ? "text-blue" : "text-inkSoft"}`}
                  />
                  <span className={`whitespace-nowrap text-[13.5px] font-medium lg:whitespace-normal ${i === active ? "text-blue" : "text-ink"}`}>
                    {m.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="flex flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
              <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
              <div key={mod.name} className="flex flex-1 animate-fade-in flex-col">
                <div className="flex items-center gap-2.5 border-b border-subtle-stroke bg-white px-5 py-3.5">
                  <CardBadge icon={mod.icon} />
                  <h3 className="min-w-0 flex-1 truncate text-[14.5px] font-bold tracking-tight text-ink">{mod.name}</h3>
                  <BlueChip label={layerChips[mod.layer]} />
                </div>
                <div className="grid flex-1 items-center gap-8 p-6 md:grid-cols-[minmax(0,1fr)_150px] md:p-7">
                  <div>
                    <p className="text-[19px] font-semibold leading-snug tracking-tight text-ink">{mod.tagline}</p>
                    <p className="mt-3 max-w-[38em] text-[15px] leading-relaxed text-inkSoft">{mod.body}</p>
                  </div>
                  <div className="hidden flex-col items-center justify-center gap-3 md:flex">
                    <AkashicMark />
                    <p className="text-center text-[11px] leading-snug text-overcast">{layerNames[mod.layer]}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-subtle-stroke bg-white px-5 py-3">
                  <BlueChip label="WORKS STANDALONE" />
                  <BlueChip label="SNAPS INTO THE PLATFORM" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-center border-t border-lineSoft pt-12 text-center lg:mt-20">
            <p className="max-w-[24em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              Start with one. Add the rest when you&rsquo;re ready. The foundation
              never changes.
            </p>
            <Link href="#talk-to-our-team" className="btn-primary mt-8">
              Talk to our team
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
