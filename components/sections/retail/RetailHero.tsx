"use client";

/*
 * [00] Retail Hero: real store-aisle texture plus a simulated Akashic merch
 * desk. The console is storytelling UI only: hardcoded demo readouts, store
 * states, and a stock-cover trace, not live product functionality (§8a).
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const stores = [
  { code: "083", name: "Pune", state: "ok" },
  { code: "114", name: "Nagpur", state: "low" },
  { code: "DC-2", name: "Bhiwandi", state: "ok" },
  { code: "—", name: "Routed", state: "ok" },
] as const;

const readouts = [
  { label: "Sell-through", value: "1,840/hr" },
  { label: "Cover", value: "2 days" },
  { label: "Stockout", value: "Fri" },
];

const retailSystems = ["POS", "E-commerce", "ERP", "WMS", "Supplier EDI", "Planning"];

const signalRows = [
  { label: "Sell-through signal", value: "SKU · store · till time" },
  { label: "Stock graph", value: "Shelf · backroom · DC · in transit" },
  { label: "Enterprise record", value: "Margin · promo · lead time" },
];

function CoverTrace() {
  const baseline = 66;
  const stockout = 52;
  return (
    <div className="px-4 pb-1 pt-3.5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
          Cover · Store 114 · this week
        </span>
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-blue">
          Stockout projected
        </span>
      </div>
      <svg viewBox="0 0 440 74" className="mt-2 h-[74px] w-full" aria-hidden>
        <line x1="0" y1="18" x2="440" y2="18" stroke="#ffffff" strokeWidth="1" opacity="0.09" />
        <line x1="0" y1={baseline} x2="440" y2={baseline} stroke="#ffffff" strokeWidth="1" opacity="0.09" />
        {/* stockout line */}
        <line x1="0" y1={stockout} x2="440" y2={stockout} stroke="#8DA2F0" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <text x="2" y={stockout - 4} fontFamily="monospace" fontSize="8" fill="#c9cfda">
          STOCKOUT LINE
        </text>
        {/* cover falling as the promotion runs */}
        <polyline
          fill="none"
          stroke="#aab2be"
          strokeWidth="1.5"
          points="0,22 44,25 88,29 132,34 176,40 220,46 264,50"
        />
        <polyline
          fill="none"
          stroke="#8DA2F0"
          strokeWidth="1.8"
          points="264,50 308,55 352,59 396,63 432,66"
        />
        <circle cx="396" cy="63" r="3.5" fill="#8DA2F0" />
        <line x1="264" y1="8" x2="264" y2={baseline} stroke="#8DA2F0" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <text x="258" y="12" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#c9cfda">
          COVER OK
        </text>
        <text x="270" y="12" fontFamily="monospace" fontSize="8" fill="#9db0f5">
          FRI COVER GAP
        </text>
      </svg>
    </div>
  );
}

function MerchConsole() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-white/[0.14] bg-[rgba(14,16,20,0.55)] text-left shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
      <div className="flex items-center justify-between border-b border-white/[0.1] px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/70">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Merch desk · Live sell-through
        </span>
        <LiveChip />
      </div>

      <CoverTrace />

      <div className="px-4 pb-4 pt-3">
        <div className="relative">
          <div className="absolute left-[7px] right-[7px] top-[5px] border-t border-dashed border-white/15" aria-hidden />
          <div className="grid grid-cols-4">
            {stores.map((store) => (
              <div key={store.name} className="flex flex-col items-start">
                <span
                  className={`relative z-10 block h-[11px] w-[11px] rounded-full border-2 ${
                    store.state === "low"
                      ? "border-blue bg-blue animate-[ps-pulse_2s_infinite]"
                      : "border-white/30 bg-transparent"
                  }`}
                  aria-hidden
                />
                <span className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-white/45">
                  {store.code}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tracking-tight ${
                    store.state === "low" ? "text-blue-subtle" : "text-white"
                  }`}
                >
                  {store.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {signalRows.map((row) => (
            <div key={row.label} className="rounded-card border border-white/[0.1] bg-white/[0.04] px-3 py-2">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/45">
                {row.label}
              </p>
              <p className="mt-1 text-[11.5px] font-semibold leading-snug tracking-tight text-white/90">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-card border border-blue/40 bg-blue/[0.16] px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold tracking-tight text-white">
              Move 240 units · DC-2 → Store 114
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-white/55">
              Ahead of the weekend peak · trend attached
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white">
            Approve
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
        {readouts.map((readout) => (
          <div key={readout.label} className="px-3.5 py-3">
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-white/55">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              {readout.label}
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-bold tracking-tight text-white">
              {readout.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-white/50">POS · ERP · WMS unified</span>
        <span className="text-white/35">Every number traceable</span>
      </div>
    </div>
  );
}

function RetailSystemsRail() {
  return (
    <div className="grid gap-3 border-t border-white/[0.15] py-5 md:grid-cols-[auto_1fr] md:items-center">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/[0.55]">
        Systems joined
      </p>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {retailSystems.map((system) => (
          <span
            key={system}
            className="rounded-full border border-white/[0.18] bg-white/10 px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/80 backdrop-blur-md"
          >
            {system}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RetailHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/sectors/retail-hq.jpg"
        alt="Bright retail store aisle with stocked shelves receding into the distance"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.92)_0%,rgba(10,10,12,0.74)_44%,rgba(10,10,12,0.36)_100%)]" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.1)_0%,rgba(10,10,12,0.28)_62%,rgba(10,10,12,0.82)_100%)]" aria-hidden />
      <div className="dot-grid absolute inset-0 opacity-[0.08] invert" aria-hidden />

      <ScrollRevealRail dark>
        <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:gap-16">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.12] px-3.5 py-1.5 text-xs text-white shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold">Retail</span>
                <span className="h-3.5 w-px bg-white/[0.24]" aria-hidden />
                <span className="font-medium text-white/[0.72]">Akashic by sector</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/[0.62]">
                Akashic for retail <span className="text-white/[0.35]">·</span> Chains, brands &amp; marketplaces
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 max-w-[9.5em] text-5xl font-semibold leading-[1.02] tracking-tightest text-white md:text-6xl lg:text-[66px]">
                Know what sells.{" "}
                <span className="relative inline-block">
                  Before it ships.
                  <span className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-blue/80" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[37em] text-lg leading-relaxed text-white/[0.72]">
                Demand shows up in your POS in real time and in your planning
                sheet three weeks later. Akashic connects sales, stock, and
                supply into one live picture, so the forecast runs on today&rsquo;s
                signal, not last month&rsquo;s export.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="#solution"
                  className="inline-flex h-10 items-center justify-center rounded-btn bg-white px-4 text-sm font-semibold text-ink transition-colors duration-250 ease-settle hover:bg-blue-subtle"
                >
                  See how Akashic tackles it
                </Link>
                <Link
                  href="#talk-to-our-team"
                  className="inline-flex h-10 items-center justify-center rounded-btn border border-white/[0.22] bg-white/[0.08] px-4 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-250 ease-settle hover:bg-white/[0.14]"
                >
                  Talk to our team
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <MerchConsole />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <RetailSystemsRail />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
