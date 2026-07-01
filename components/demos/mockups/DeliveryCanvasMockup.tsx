"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Renders a fake console mockup for HowWeDeliver's three delivery phases
 * (audit score, deployment terminal, query results). Purely presentational;
 * all figures (readiness %, row counts, latency) are hardcoded, not live data.
 */

import { useEffect, useState } from "react";

interface DeliveryCanvasMockupProps {
  activeStep: number;
}

export default function DeliveryCanvasMockup({ activeStep }: DeliveryCanvasMockupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full rounded-frame border border-lineSoft bg-[#FAFAFB] h-[340px] flex items-center justify-center">
        <span className="text-xs text-overcast font-mono">LOADING PREVIEW...</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-frame border border-lineSoft bg-white shadow-card overflow-hidden h-[340px] flex flex-col font-sans select-none text-[13px]">
      {/* ── Top Bar ── */}
      <div className="flex h-11 items-center justify-between border-b border-lineSoft bg-[#FAFAFB] px-4">
        <div className="flex items-center gap-2">
          {/* Mac-like dots */}
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-overcast/35" />
            <span className="h-2 w-2 rounded-full bg-overcast/35" />
            <span className="h-2 w-2 rounded-full bg-overcast/35" />
          </div>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-inkSoft">
            {activeStep === 0 && "SYSTEM_READINESS_AUDIT"}
            {activeStep === 1 && "AKASHIC_PLATFORM_BUILD"}
            {activeStep === 2 && "GOVERNED_OPERATIONS_CONSOLE"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75 duration-1000" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-blue font-semibold">
            {activeStep === 0 && "AUDITING"}
            {activeStep === 1 && "DEPLOYING"}
            {activeStep === 2 && "OPERATIONAL"}
          </span>
        </div>
      </div>

      {/* ── Canvas Body ── */}
      <div className="relative flex-1 bg-white p-5 overflow-hidden">
        {/* Phase 01: Audit */}
        <div
          className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-settle ${
            activeStep === 0
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h4 className="font-semibold text-ink text-sm">Sovereign Data Registry</h4>
              <p className="text-[11px] text-inkSoft mt-1 leading-snug">
                Mapping legacy systems to design the Governance Framework.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-btn bg-[#FAFAFB] border border-lineSoft px-4 py-2 text-center min-w-[90px]">
              <span className="font-mono text-xl font-semibold text-blue leading-none tracking-tight">
                86.2%
              </span>
              <span className="text-[9px] uppercase tracking-wider text-overcast mt-1">
                Readiness Score
              </span>
            </div>
          </div>

          <div className="flex-1 mt-4 flex flex-col gap-2">
            {/* Source items */}
            {[
              { name: "Legacy Customer RDBMS", type: "Structured", status: "PASS (96%)", color: "text-blue" },
              { name: "S3 Unstructured Vault", type: "Files / PDF", status: "PENDING BLUEPRINT", color: "text-overcast" },
              { name: "Global ERP Database", type: "Structured", status: "PASS (92%)", color: "text-blue" },
              { name: "Real-time Telemetry Stream", type: "Streaming", status: "PASS (99%)", color: "text-blue" },
            ].map((src, i) => (
              <div
                key={src.name}
                className="flex items-center justify-between border-b border-lineSoft/55 pb-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${src.status.includes("PASS") ? "bg-blue" : "bg-[#D9A034]"}`} />
                  <span className="font-medium text-inkSoft">{src.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-overcast">{src.type}</span>
                  <span className={`font-mono text-[10px] uppercase font-semibold ${src.color}`}>
                    {src.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 02: Platform Deploy */}
        <div
          className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-settle ${
            activeStep === 1
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div>
            <h4 className="font-semibold text-ink text-sm">Akashic Integration Canvas</h4>
            <p className="text-[11px] text-inkSoft mt-1 leading-snug">
              Bridging structured and unstructured pipelines into the unified Knowledge Graph.
            </p>
          </div>

          {/* SVG Connector Graphic */}
          <div className="relative h-28 my-2 border border-lineSoft/40 bg-[#FAFAFB]/60 rounded-btn flex items-center justify-between px-6 overflow-hidden">
            {/* Left nodes */}
            <div className="flex flex-col gap-3 z-10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-inkSoft bg-white border border-lineSoft px-2 py-0.5 rounded-btn shadow-sm">
                RDBMS Stream
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-inkSoft bg-white border border-lineSoft px-2 py-0.5 rounded-btn shadow-sm">
                PDF Silos
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-inkSoft bg-white border border-lineSoft px-2 py-0.5 rounded-btn shadow-sm">
                Live APIs
              </span>
            </div>

            {/* SVG Connections with animate */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Path 1 */}
              <path
                d="M100,28 C140,28 170,56 220,56"
                fill="none"
                stroke="#EEEFF1"
                strokeWidth="1.5"
              />
              <path
                d="M100,28 C140,28 170,56 220,56"
                fill="none"
                stroke="#3E63DD"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="animate-[dashmove_1.5s_linear_infinite]"
                style={{ strokeDashoffset: 0 }}
              />

              {/* Path 2 */}
              <path
                d="M90,56 L220,56"
                fill="none"
                stroke="#EEEFF1"
                strokeWidth="1.5"
              />
              <path
                d="M90,56 L220,56"
                fill="none"
                stroke="#3E63DD"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="animate-[dashmove_2s_linear_infinite]"
                style={{ strokeDashoffset: 0 }}
              />

              {/* Path 3 */}
              <path
                d="M95,84 C135,84 170,56 220,56"
                fill="none"
                stroke="#EEEFF1"
                strokeWidth="1.5"
              />
              <path
                d="M95,84 C135,84 170,56 220,56"
                fill="none"
                stroke="#3E63DD"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="animate-[dashmove_1.2s_linear_infinite]"
                style={{ strokeDashoffset: 0 }}
              />
            </svg>

            {/* Right node */}
            <div className="z-10 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full border border-blue bg-blue-subtle text-blue flex items-center justify-center font-bold text-[11px] animate-[ps-breathe_3s_ease-in-out_infinite] shadow-sm">
                Core
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-blue font-semibold mt-1">
                Akashic Graph
              </span>
            </div>
          </div>

          {/* Compile terminal */}
          <div className="rounded-btn bg-[#1A1C1D] text-white/80 p-3 font-mono text-[10px] flex flex-col gap-0.5 leading-snug">
            <div className="flex items-center justify-between">
              <span className="text-white/40">[deploy] core platform modules</span>
              <span className="text-blue">100% OK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">[bridge] legacy stream integrations</span>
              <span className="text-blue">100% OK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">[graph] semantic entities compiled</span>
              <span className="text-[#30A46C] animate-pulse">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Phase 03: Operational */}
        <div
          className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-settle ${
            activeStep === 2
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div>
            <h4 className="font-semibold text-ink text-sm">Governed Operations Console</h4>
            <p className="text-[11px] text-inkSoft mt-1 leading-snug">
              Running BI analytics, natural language queries, and security verification.
            </p>
          </div>

          {/* Search box mock */}
          <div className="mt-3 flex items-center gap-2 border border-lineSoft bg-[#FAFAFB] px-3 py-2 rounded-btn">
            <svg className="h-3.5 w-3.5 text-overcast" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="9" r="6" />
              <path d="M14 14l4 4" />
            </svg>
            <span className="font-mono text-[11px] text-ink">
              Identify workforce clearance anomalies by country
            </span>
          </div>

          {/* Query result mock */}
          <div className="flex-1 mt-3 flex flex-col justify-between border border-lineSoft/60 rounded-btn p-3 bg-white">
            <div className="flex items-center justify-between text-[10px] font-mono text-overcast border-b border-lineSoft pb-1.5">
              <span>QUERY RESOLVED IN 12MS</span>
              <span className="text-[#30A46C] font-semibold bg-[#ECFDF5] px-1.5 py-0.5 rounded-btn uppercase tracking-wider text-[8px]">
                Governed &amp; Traceable
              </span>
            </div>

            {/* Miniature horizontal bar chart */}
            <div className="flex-1 my-2 flex flex-col justify-center gap-1.5">
              {[
                { label: "Sovereignty Anomalies", value: "4 instances", width: "w-2/5" },
                { label: "Duplicate Records", value: "12 instances", width: "w-[75%]" },
                { label: "Ration Out-of-bounds", value: "1 instance", width: "w-[15%]" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center justify-between text-[10px]">
                  <span className="text-inkSoft font-medium w-36 truncate">{bar.label}</span>
                  <div className="flex-1 bg-tertiary-bg h-2 rounded-full mx-3 overflow-hidden">
                    <div className={`${bar.width} bg-blue h-full rounded-full`} />
                  </div>
                  <span className="font-mono text-overcast w-16 text-right">{bar.value}</span>
                </div>
              ))}
            </div>

            {/* Bottom metadata */}
            <div className="flex justify-between border-t border-lineSoft/60 pt-1.5 font-mono text-[9px] text-overcast uppercase">
              <span>Uptime: 99.999%</span>
              <span>Encrypted: AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
