/*
 * [01] Shelf & Warehouse — the retail problem as a creative split: the empty
 * shelf (dark plate) against the full warehouse two states over (paper-light
 * plate, red spine), then the fracture ledger beneath. Red appears only as the
 * problem indicator (token table). Fracture copy comes from the shared sector
 * config so the two stay in sync.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const retail = SECTOR_PAGES.retail;

const liveSignals = [
  {
    tag: "RESOLVE",
    title: "One SKU, every location",
    body: "Shelf, backroom, in-transit, and DC stock resolve into one live position per product.",
  },
  {
    tag: "PROJECT",
    title: "Stockout seen on Monday",
    body: "The promotion spike projects a Friday gap while the surplus can still be moved.",
  },
  {
    tag: "ACT",
    title: "Replenishment routed",
    body: "Surplus at the northern DC is routed to the stores that need it, before the shelf goes bare.",
  },
];

const emptyRows = [
  { store: "Store 114 · Nagpur", detail: "2 days cover", flag: true },
  { store: "Store 087 · Amravati", detail: "3 days cover", flag: false },
  { store: "Store 091 · Akola", detail: "4 days cover", flag: false },
];

function ChainEvidenceBand() {
  return (
    <div className="mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-ink shadow-frame">
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/sectors/retail-hq.jpg"
            alt="Retail store aisle with stocked shelves receding into the distance"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.12)_0%,rgba(10,10,12,0.68)_100%)]" aria-hidden />
          <div className="absolute left-5 top-5 rounded-full border border-white/[0.18] bg-white/[0.12] px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/[0.82] backdrop-blur-md">
            Region · Mon 09:20
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
            {["Shelf", "Backroom", "DC-2"].map((stage) => (
              <div key={stage} className="rounded-card border border-white/[0.16] bg-black/[0.34] px-3 py-2 backdrop-blur-md">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/[0.52]">
                  Stock
                </p>
                <p className={`mt-1 text-[12px] font-semibold ${stage === "DC-2" ? "text-blue-subtle" : "text-white"}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-6 py-7 text-white md:px-8">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent lg:inset-x-auto lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-[3px]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
            What the live picture is already saying
          </p>
          <div className="mt-6 space-y-5">
            {liveSignals.map((signal, idx) => (
              <div key={signal.title} className={idx > 0 ? "border-t border-dashed border-white/[0.14] pt-5" : ""}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-blue-subtle">
                  {signal.tag}
                </p>
                <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-white">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/[0.62]">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RetailShelf() {
  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[01]</span>
              &nbsp;&nbsp;THE PROBLEM
            </span>
            <span className="text-overcast">/ SHELF &amp; WAREHOUSE</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The shelves were empty. The warehouse was full.
          </h2>
        </ScrollReveal>

        {/* The two views */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-frame bg-ink px-7 py-9 text-white md:px-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/50">
                  On the shelf
                </p>
                <p className="mt-5 font-mono text-[34px] font-bold leading-none tracking-tight text-white md:text-[40px]">
                  Sold out<span className="text-blue">.</span>
                </p>
                <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/50">
                  Promotion running &middot; southern region
                </p>
                <div className="mt-6 space-y-2.5">
                  {emptyRows.map((row) => (
                    <div key={row.store} className="flex items-center gap-3 border-t border-dashed border-white/[0.14] pt-2.5 first:border-t-0 first:pt-0">
                      <span
                        className={`h-[6px] w-[6px] shrink-0 rounded-full ${row.flag ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-white/30"}`}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-white/85">
                        {row.store}
                      </span>
                      <span className={`shrink-0 font-mono text-[8.5px] uppercase tracking-[0.06em] ${row.flag ? "font-semibold text-blue-subtle" : "text-white/45"}`}>
                        {row.detail}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[26em] text-[15px] leading-relaxed text-white/[0.65]">
                  Shelves empty in one state while the tills keep ringing. The
                  replenishment order hasn&rsquo;t even been raised.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden flex-col items-center justify-center px-8 lg:flex" aria-hidden>
            <span className="h-full w-px border-l border-dashed border-line" />
            <span className="whitespace-nowrap py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-overcast">
              Two states apart
            </span>
            <span className="h-full w-px border-l border-dashed border-line" />
          </div>

          <ScrollReveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-7 py-9 md:px-9">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                In the warehouse
              </p>
              <p className="mt-5 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
                Surplus
              </p>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-overcast">
                DC-2 Bhiwandi &middot; 340 units of the same item
              </p>
              <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">
                POS says one thing, ERP another, the planning sheet a third, and
                all of them are days old. The replenishment lands after the
                promotion ends. The markdown follows a month later.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-9 max-w-[38em] text-center text-lg leading-relaxed text-inkSoft md:text-xl">
            The gap between the shelf and the warehouse is where every markdown
            is born.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <ChainEvidenceBand />
        </ScrollReveal>

        {/* Fractures */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {retail.problem.fractures.map((fracture, idx) => (
            <ScrollReveal key={fracture.title} delay={idx * 90}>
              <div className={idx > 0 ? "md:border-l md:border-dashed md:border-lineSoft md:pl-10" : ""}>
                <p className="text-[44px] font-semibold leading-none tracking-tighter text-lineSoft">
                  {idx + 1}
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                  {fracture.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                  {fracture.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            None of these are people problems. All of them are architecture problems.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
