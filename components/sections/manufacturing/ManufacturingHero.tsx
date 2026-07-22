"use client";

/*
 * [00] Manufacturing Hero: real factory-floor texture plus a simulated Akashic
 * line console. The console is storytelling UI only: hardcoded demo readouts,
 * station states, and drift alerts, not live product functionality.
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const stations = [
  { code: "ST-01", name: "Press", state: "ok" },
  { code: "ST-02", name: "Weld", state: "ok" },
  { code: "ST-03", name: "Coat", state: "drift" },
  { code: "ST-04", name: "Inspect", state: "ok" },
] as const;

const readouts = [
  { label: "Throughput", value: "412/min" },
  { label: "OEE", value: "87.4%" },
  { label: "Scrap", value: "0.6%" },
];

const plantSystems = ["MES", "SCADA", "Historian", "ERP", "QMS", "Planning"];

const signalRows = [
  { label: "Machine signals", value: "Torque · vibration · temperature" },
  { label: "Production context", value: "Line · shift · batch · work order" },
  { label: "Enterprise record", value: "Cost · quality · supplier lot" },
];

function TorqueTrace() {
  return (
    <div className="px-4 pb-1 pt-3.5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
          Torque · ST-03 · 40 ms samples
        </span>
        <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-blue">
          Drift detected
        </span>
      </div>
      <svg viewBox="0 0 440 74" className="mt-2 h-[74px] w-full" aria-hidden>
        <line x1="0" y1="30" x2="440" y2="30" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 4" opacity="0.12" />
        <line x1="0" y1="14" x2="440" y2="14" stroke="#ffffff" strokeWidth="1" opacity="0.07" />
        <line x1="0" y1="46" x2="440" y2="46" stroke="#ffffff" strokeWidth="1" opacity="0.07" />
        <polyline
          fill="none"
          stroke="#aab2be"
          strokeWidth="1.5"
          points="0,30 24,28 48,31 72,29 96,30 120,27 144,31 168,28 192,30 216,29 240,31 264,28"
        />
        <polyline
          fill="none"
          stroke="#8DA2F0"
          strokeWidth="1.8"
          points="264,28 288,32 312,37 336,41 360,47 384,52 408,58 432,63"
        />
        <circle cx="432" cy="63" r="3.5" fill="#8DA2F0" />
        <line x1="264" y1="8" x2="264" y2="66" stroke="#8DA2F0" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
        <text x="258" y="12" textAnchor="end" fontFamily="monospace" fontSize="8" fill="#c9cfda">
          IN SPEC
        </text>
        <text x="270" y="12" fontFamily="monospace" fontSize="8" fill="#9db0f5">
          08:14 DRIFT BEGINS
        </text>
      </svg>
    </div>
  );
}

function LineConsole() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-white/[0.14] bg-[rgba(14,16,20,0.55)] text-left shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
      <div className="flex items-center justify-between border-b border-white/[0.1] px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/70">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Bay A · Line 3 · Cell health
        </span>
        <LiveChip />
      </div>

      <TorqueTrace />

      <div className="px-4 pb-4 pt-3">
        <div className="relative">
          <div className="absolute left-[7px] right-[7px] top-[5px] border-t border-dashed border-white/15" aria-hidden />
          <div className="grid grid-cols-4">
            {stations.map((station) => (
              <div key={station.code} className="flex flex-col items-start">
                <span
                  className={`relative z-10 block h-[11px] w-[11px] rounded-full border-2 ${
                    station.state === "drift"
                      ? "border-blue bg-blue animate-[ps-pulse_2s_infinite]"
                      : "border-white/30 bg-transparent"
                  }`}
                  aria-hidden
                />
                <span className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-white/45">
                  {station.code}
                </span>
                <span
                  className={`text-[11.5px] font-semibold tracking-tight ${
                    station.state === "drift" ? "text-blue-subtle" : "text-white"
                  }`}
                >
                  {station.name}
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
              Coating temperature drifting · ST-03
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-white/55">
              Flagged before scrap · work order ready
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white">
            Inspect
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
        <span className="text-white/50">MES · SCADA · ERP unified</span>
        <span className="text-white/35">Every figure traceable</span>
      </div>
    </div>
  );
}

function PlantSystemsRail() {
  return (
    <div className="grid gap-3 border-t border-white/[0.15] py-5 md:grid-cols-[auto_1fr] md:items-center">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/[0.55]">
        Plant systems joined
      </p>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {plantSystems.map((system) => (
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

export default function ManufacturingHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/sectors/manufacturing-hq.jpg"
        alt="Wide manufacturing bay with overhead cranes, steel columns, and marked production lanes"
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
                <span className="font-semibold">Manufacturing</span>
                <span className="h-3.5 w-px bg-white/[0.24]" aria-hidden />
                <span className="font-medium text-white/[0.72]">Akashic by sector</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/[0.62]">
                Akashic for manufacturing <span className="text-white/[0.35]">·</span> Plants &amp; supply lines
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 max-w-[9.5em] text-5xl font-semibold leading-[1.02] tracking-tightest text-white md:text-6xl lg:text-[66px]">
                The line already knows.{" "}
                <span className="relative inline-block">
                  Now you will.
                  <span className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-blue/80" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[37em] text-lg leading-relaxed text-white/[0.72]">
                Your machines report every forty milliseconds. Your reports
                arrive every month. Akashic closes that gap: one governed record
                connecting the shop floor to the enterprise, so drift is caught
                while the shift can still act.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="#solution"
                  className="btn-primary-invert"
                >
                  See how Akashic tackles it
                </Link>
                <Link
                  href="#talk-to-our-team"
                  className="btn-secondary-invert backdrop-blur-md"
                >
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
          <PlantSystemsRail />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
