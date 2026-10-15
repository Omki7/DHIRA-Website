"use client";

/*
 * /integrations [01]: the connector directory, grouped by category (a named
 * taxonomy), with a filter that narrows every group at once. Each tile
 * carries the connector's mono badge in its own brand colour (inline style,
 * the Rule 8 exception) and the module that reads it. Data:
 * lib/integrations.ts, itself read from the /akashic [10] module sheets.
 */

import { useMemo, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONNECTOR_CATEGORIES } from "@/lib/integrations";

const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

export default function IntegrationsDirectory() {
  const [query, setQuery] = useState("");
  const total = CONNECTOR_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CONNECTOR_CATEGORIES;
    return CONNECTOR_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) => item.name.toLowerCase().includes(q) || category.name.toLowerCase().includes(q) || item.module.toLowerCase().includes(q)
      ),
    })).filter((category) => category.items.length > 0);
  }, [query]);

  const shown = filtered.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <section id="directory" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label="Directory"
          setup="Seven kinds of system."
          payoff="One governed foundation."
          lede="Every connector below is part of Akashic today. Systems not listed connect through REST, webhooks or files."
        />

        <ScrollReveal delay={80}>
          <div className="mt-10 flex flex-col gap-3 border-y border-lineSoft py-5 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="connector-filter" className="sr-only">
              Find a connector
            </label>
            <input
              id="connector-filter"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a connector, for example SAP or Kafka"
              className="h-11 w-full max-w-[26rem] rounded-[10px] border border-subtle-stroke bg-background px-3.5 text-[15px] text-primary-text shadow-input transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
            />
            <p className={label} aria-live="polite">
              Showing {shown} of {total}
            </p>
          </div>
        </ScrollReveal>

        {filtered.length === 0 ? (
          <p className="mt-10 max-w-[36em] text-[16px] leading-relaxed text-secondary-text">
            No listed connector matches. Most systems connect through REST, webhooks or files.{" "}
            <a href="#talk-to-our-team" className="text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
              Ask about yours
            </a>
            .
          </p>
        ) : (
          <div className="mt-4">
            {filtered.map((category) => (
              <div key={category.id} id={category.id} className="grid scroll-mt-28 gap-6 border-b border-lineSoft py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{category.name}</h3>
                  <p className="mt-2 max-w-[24em] text-pretty text-[15px] leading-relaxed text-secondary-text">{category.line}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-3 rounded-tile border border-subtle-stroke bg-background px-3.5 py-3">
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip font-mono text-[11px] font-medium text-white"
                        style={{ background: item.color }}
                      >
                        {item.mono}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-medium text-ink">{item.name}</span>
                        <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.1em] text-overcast">{item.module}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </ScrollRevealRail>
    </section>
  );
}
