/*
 * [00] Manufacturing Hero — The Line Already Knows.
 * The sector family's creative page: pitch left, a live line console right.
 * SIMULATED PRODUCT UI (§8a applies): the console is a fake Akashic screen —
 * torque trace, station rail, drift alert, and readouts with hardcoded demo
 * figures, not real product functionality.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const stations = [
  { code: "ST-01", name: "Form", state: "ok" },
  { code: "ST-02", name: "Fill", state: "ok" },
  { code: "ST-03", name: "Seal", state: "drift" },
  { code: "ST-04", name: "Pack", state: "ok" },
] as const;

const readouts = [
  { label: "Throughput", value: "412/min" },
  { label: "OEE", value: "87.4%" },
  { label: "Scrap", value: "0.6%" },
];

function TorqueTrace() {
  return (
    <div className="px-4 pb-1 pt-3.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
          Torque &middot; ST-03 &middot; 40 ms samples
        </span>
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-blue">
          Drift detected
        </span>
      </div>
      <svg viewBox="0 0 440 74" className="mt-2 h-[74px] w-full" aria-hidden>
        <line x1="0" y1="30" x2="440" y2="30" stroke="#e4e7ec" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="0" y1="14" x2="440" y2="14" stroke="#eeeff1" strokeWidth="1" />
        <line x1="0" y1="46" x2="440" y2="46" stroke="#eeeff1" strokeWidth="1" />
        <polyline
          fill="none"
          stroke="#8f99a8"
          strokeWidth="1.5"
          points="0,30 24,28 48,31 72,29 96,30 120,27 144,31 168,28 192,30 216,29 240,31 264,28"
        />
        <polyline
          fill="none"
          stroke="#3E63DD"
          strokeWidth="1.8"
          points="264,28 288,32 312,37 336,41 360,47 384,52 408,58 432,63"
        />
        <circle cx="432" cy="63" r="3.5" fill="#3E63DD" />
        <line x1="264" y1="8" x2="264" y2="66" stroke="#3E63DD" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <text x="258" y="12" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#8f99a8">
          IN SPEC
        </text>
        <text x="270" y="12" fontFamily="monospace" fontSize="8" fill="#3E63DD">
          08:14 DRIFT BEGINS
        </text>
      </svg>
    </div>
  );
}

function LineConsole() {
  return (
    <div className="w-full max-w-[480px] overflow-hidden rounded-frame border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <div className="flex items-center justify-between border-b border-dashed border-lineSoft px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Line 3 &middot; Packaging
        </span>
        <LiveChip />
      </div>

      <TorqueTrace />

      {/* Station rail */}
      <div className="px-4 pb-4 pt-3">
        <div className="relative">
          <div className="absolute left-[7px] right-[7px] top-[5px] border-t border-dashed border-line" aria-hidden />
          <div className="grid grid-cols-4">
            {stations.map((station) => (
              <div key={station.code} className="flex flex-col items-start">
                <span
                  className={`relative z-10 block h-[11px] w-[11px] rounded-full border-2 ${
                    station.state === "drift"
                      ? "border-blue bg-blue animate-[ps-pulse_2s_infinite]"
                      : "border-line bg-white"
                  }`}
                  aria-hidden
                />
                <span className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">
                  {station.code}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tracking-tight ${
                    station.state === "drift" ? "text-blue" : "text-ink"
                  }`}
                >
                  {station.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Drift alert */}
        <div className="mt-4 flex items-center justify-between rounded-card border border-blue-border bg-blue-subtle px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold tracking-tight text-ink">
              Seal torque drifting &middot; ST-03
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
              Flagged 14 min in &middot; before scrap
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white">
            Inspect
          </span>
        </div>
      </div>

      {/* Readouts — standard stat-cell recipe (§4a): dot eyebrow, figure, dashed dividers */}
      <div className="grid grid-cols-3 divide-x divide-dashed divide-lineSoft border-t border-dashed border-lineSoft">
        {readouts.map((readout) => (
          <div key={readout.label} className="px-3.5 py-3">
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-inkSoft">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              {readout.label}
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-bold tracking-tight text-ink">
              {readout.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-inkSoft">MES &middot; SCADA &middot; ERP unified</span>
        <span className="text-overcast">Every figure traceable</span>
      </div>
    </div>
  );
}

export default function ManufacturingHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-12">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">Manufacturing</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Akashic by sector</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                Akashic for manufacturing <span className="text-overcast">&middot;</span> Plants &amp; supply lines
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                The line already knows.{" "}
                <span className="relative inline-block">
                  Now you will.
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                Your machines report every forty milliseconds. Your reports
                arrive every month. Akashic closes that gap: one governed record
                connecting the shop floor to the enterprise, so drift is caught
                while the shift can still act.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#solution" className="btn-primary">
                  See how Akashic tackles it
                </Link>
                <Link href="#talk-to-our-team" className="btn-secondary">
                  Talk to our team
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <LineConsole />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <p className="border-t border-dashed border-lineSoft pb-10 pt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:pb-12">
            Built for plants, contract manufacturers, and multi-site operations &middot; governed end to end
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
