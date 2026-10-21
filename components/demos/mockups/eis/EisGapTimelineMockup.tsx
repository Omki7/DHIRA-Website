"use client";

import { useState } from "react";
import DhiraLogo from "@/components/icons/DhiraLogo";

/* ------------------------------------------------------------------------
 * THE DECISION HORIZON — Section [02]: The Decision Gap.
 * Creative, clutter-free interactive simulator.
 * Features a prominent circular Akashic Hero Core where the decision
 * timeline passes directly through the center.
 * --------------------------------------------------------------------- */

type Mode = "akashic" | "legacy";

export default function EisGapTimelineMockup() {
  const [mode, setMode] = useState<Mode>("akashic");
  const isAkashic = mode === "akashic";

  return (
    <div className="overflow-hidden rounded-outer border border-line bg-background shadow-sm transition-colors">
      {/* 1. Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-lineSoft bg-primary-bg px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              isAkashic ? "bg-positive animate-pulse" : "bg-red"
            }`}
          />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
            Decision Horizon Simulation · Northwind Account ($180K ARR)
          </span>
        </div>

        {/* Interactive Mode Toggle */}
        <div className="inline-flex items-center rounded-btn border border-line bg-background p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setMode("akashic")}
            className={`relative rounded-inner px-3 py-1 font-mono text-[11px] font-bold transition-all ${
              isAkashic
                ? "bg-blue text-white shadow-xs"
                : "text-secondary-text hover:text-ink"
            }`}
          >
            ● With Akashic EIS
          </button>
          <button
            type="button"
            onClick={() => setMode("legacy")}
            className={`relative rounded-inner px-3 py-1 font-mono text-[11px] font-bold transition-all ${
              !isAkashic
                ? "bg-red text-white shadow-xs"
                : "text-secondary-text hover:text-ink"
            }`}
          >
            Without Akashic (Legacy ERP)
          </button>
        </div>
      </div>

      {/* 2. Visual Stage */}
      <div className="relative px-4 py-8 sm:px-6 sm:py-10 bg-background overflow-hidden">
        
        {/* Subtle dot matrix grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(rgb(var(--card-line)) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative mx-auto max-w-[840px] h-[300px]">
          
          {/* SVG Canvas for precision-aligned lines, barriers, and orbit paths */}
          <svg
            viewBox="0 0 840 300"
            fill="none"
            className="absolute inset-0 w-full h-full select-none"
            aria-hidden="true"
          >
            {/* The Horizontal Transit Rail (at Y=160) */}
            <line
              x1="60"
              y1="160"
              x2="780"
              y2="160"
              stroke="rgb(var(--card-line))"
              strokeWidth="2"
            />

            {/* Left Flow Rail (Day 0 to Akashic Core) */}
            <line
              x1="60"
              y1="160"
              x2="330"
              y2="160"
              stroke={isAkashic ? "rgb(var(--blue))" : "rgb(var(--inkSoft))"}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* When Legacy: Dashed Danger Line shoots through to Day 26 */}
            {!isAkashic && (
              <line
                x1="330"
                y1="160"
                x2="780"
                y2="160"
                stroke="rgb(var(--red))"
                strokeWidth="3"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            )}

            {/* Day 9 Deadline Vertical Barrier Line (at X=590) */}
            <line
              x1="590"
              y1="40"
              x2="590"
              y2="250"
              stroke={isAkashic ? "rgb(var(--card-line))" : "rgb(var(--red))"}
              strokeWidth={isAkashic ? "1.5" : "2"}
              strokeDasharray="4 4"
            />

            {/* Station 1 Origin Node (X=60, Y=160) */}
            <circle cx="60" cy="160" r="6" fill="rgb(var(--ink))" />
            <circle cx="60" cy="160" r="12" stroke="rgb(var(--card-line))" strokeWidth="2" />

            {/* Station 2 Deadline Node (X=590, Y=160) */}
            <circle
              cx="590"
              cy="160"
              r="6"
              fill={isAkashic ? "rgb(var(--card-line))" : "rgb(var(--red))"}
            />

            {/* Station 3 Failure Node (X=780, Y=160) */}
            <circle
              cx="780"
              cy="160"
              r="6"
              fill={isAkashic ? "rgb(var(--card-line))" : "rgb(var(--red))"}
            />

            {/* Outer Concentric Guide Orbit around Akashic Circle (Center X=410, Y=160) */}
            <circle
              cx="410"
              cy="160"
              r="90"
              stroke={isAkashic ? "rgb(var(--blue-border))" : "rgb(var(--card-line))"}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={isAkashic ? "0.9" : "0.3"}
            />
            <circle
              cx="410"
              cy="160"
              r="108"
              stroke={isAkashic ? "rgb(var(--blue-border))" : "rgb(var(--card-line))"}
              strokeWidth="1"
              opacity={isAkashic ? "0.4" : "0.15"}
            />
          </svg>

          {/* STATION 1: DAY 0 (Anchored at X=60px, Y=160px) */}
          <div className="absolute left-[30px] sm:left-[45px] top-[40px] flex flex-col items-start z-10">
            <span className="inline-flex items-center gap-1 rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
              01 · Signal
            </span>
            <div className="mt-1.5 rounded-inner border border-lineSoft bg-background p-2.5 shadow-xs max-w-[145px]">
              <span className="block font-mono text-[8.5px] font-bold uppercase tracking-wider text-tertiary-text">
                Day 0 · Mon 09:00
              </span>
              <span className="block text-[12px] font-bold text-ink mt-0.5">
                Risk Detected
              </span>
              <span className="block text-[10px] text-secondary-text leading-tight mt-1">
                74d invoice + VP exit
              </span>
            </div>
          </div>

          {/* CENTER HERO PRODUCT CIRCLE (Centered at X=410px, Y=160px) */}
          <div className="absolute left-[48.8%] top-[160px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            
            {/* Callout Above Circle */}
            <div className="mb-2 whitespace-nowrap">
              {isAkashic ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-positive text-white px-2.5 py-0.5 font-mono text-[9.5px] font-bold tracking-wider shadow-xs uppercase">
                  <span>● Intercepted in 30 Mins</span>
                  <span className="opacity-80">· +18d Early</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-red text-white px-2.5 py-0.5 font-mono text-[9.5px] font-bold tracking-wider shadow-xs uppercase">
                  ⚠ System Blind Spot
                </span>
              )}
            </div>

            {/* The Solid Circular Hub */}
            <div
              className={`relative flex h-[150px] w-[150px] sm:h-[160px] sm:w-[160px] flex-col items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isAkashic
                  ? "border-blue bg-background shadow-lg scale-102"
                  : "border-line bg-primary-bg opacity-75"
              }`}
            >
              {/* Pulse effect when live */}
              {isAkashic && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-blue animate-ping opacity-25 pointer-events-none"
                />
              )}

              {/* Logo Badge */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full mb-1 transition-colors ${
                  isAkashic ? "bg-blue text-white shadow-xs" : "bg-card-line text-tertiary-text"
                }`}
              >
                <DhiraLogo className="h-4.5 w-4.5 text-current" />
              </div>

              <span className="font-heading text-[13px] sm:text-[14px] font-bold text-ink leading-tight">
                Akashic EIS
              </span>

              <span
                className={`font-mono text-[8.5px] uppercase tracking-wider font-bold mt-0.5 ${
                  isAkashic ? "text-blue" : "text-tertiary-text"
                }`}
              >
                {isAkashic ? "Hero Decision Core" : "Engine Bypassed"}
              </span>

              {/* Status pill inside circle */}
              <div
                className={`mt-1.5 flex items-center gap-1 rounded-full px-2 py-0.5 border ${
                  isAkashic
                    ? "border-positive-border bg-positive-subtle text-positive-text"
                    : "border-line bg-primary-bg text-secondary-text"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isAkashic ? "bg-positive animate-pulse" : "bg-red"
                  }`}
                />
                <span className="font-mono text-[8px] font-bold">
                  {isAkashic ? "Resolved 09:30 AM" : "No Intercept"}
                </span>
              </div>
            </div>
          </div>

          {/* STATION 2: DAY 9 DEADLINE (Anchored at X=590px / ~70%) */}
          <div
            className={`absolute left-[70.2%] top-[40px] -translate-x-1/2 flex flex-col items-center z-10 transition-opacity duration-300 ${
              isAkashic ? "opacity-45" : "opacity-100"
            }`}
          >
            <span
              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                isAkashic
                  ? "bg-card-line text-secondary-text"
                  : "bg-red text-white"
              }`}
            >
              Day 9 · Deadline
            </span>
            <div
              className={`mt-1.5 rounded-inner border p-2 shadow-xs bg-background max-w-[125px] text-center ${
                isAkashic ? "border-line" : "border-red/40 bg-red/5"
              }`}
            >
              <span className="block text-[11px] font-bold text-ink leading-tight">
                Notice Closes
              </span>
              <span
                className={`block font-mono text-[8.5px] mt-0.5 ${
                  isAkashic ? "text-positive" : "text-red font-semibold"
                }`}
              >
                {isAkashic ? "Already saved" : "Irreversible loss"}
              </span>
            </div>
          </div>

          {/* STATION 3: DAY 26 MONTH-END (Anchored at X=780px / Far Right) */}
          <div
            className={`absolute right-[25px] sm:right-[35px] top-[40px] flex flex-col items-end z-10 transition-opacity duration-300 ${
              isAkashic ? "opacity-35" : "opacity-100"
            }`}
          >
            <span
              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                isAkashic
                  ? "bg-card-line text-tertiary-text"
                  : "bg-red text-white"
              }`}
            >
              03 · Month-End
            </span>
            <div
              className={`mt-1.5 rounded-inner border p-2.5 shadow-xs max-w-[140px] text-right bg-background ${
                isAkashic ? "border-lineSoft" : "border-red/40 bg-red/5"
              }`}
            >
              <span className="block font-mono text-[8.5px] font-bold uppercase tracking-wider text-tertiary-text">
                Day 26
              </span>
              <span className="block text-[12px] font-bold text-ink mt-0.5">
                The Monthly Pack
              </span>
              <span
                className={`block text-[9.5px] leading-tight mt-0.5 ${
                  isAkashic ? "text-secondary-text" : "text-red font-bold"
                }`}
              >
                {isAkashic ? "Protected early" : "17d late · -$180K loss"}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Executive KPI Contrast Strip */}
      <div className="grid grid-cols-1 divide-y divide-lineSoft border-t border-lineSoft sm:grid-cols-3 sm:divide-y-0 sm:divide-x bg-primary-bg">
        
        {/* Metric 1 */}
        <div className="p-4 sm:p-5">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-tertiary-text font-bold">
            Time to Action
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`font-heading text-xl sm:text-2xl font-bold transition-colors ${
                isAkashic ? "text-positive" : "text-red"
              }`}
            >
              {isAkashic ? "30 Minutes" : "26 Days"}
            </span>
            <span className="font-mono text-[10.5px] text-secondary-text">
              {isAkashic ? "(Day 0 · 09:30 AM)" : "(17 Days Past Deadline)"}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-secondary-text leading-snug">
            {isAkashic
              ? "Live correlation intercepts risk immediately on appearance."
              : "Discovered only after month-end reporting close."}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-tertiary-text font-bold">
            Deadline Margin
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`font-heading text-xl sm:text-2xl font-bold transition-colors ${
                isAkashic ? "text-positive" : "text-red"
              }`}
            >
              {isAkashic ? "+18 Days Early" : "17 Days Late"}
            </span>
            <span className="font-mono text-[10.5px] text-secondary-text">
              {isAkashic ? "Safe Window" : "Permanent Loss"}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-secondary-text leading-snug">
            {isAkashic
              ? "Intervention executed 18 days before notice window."
              : "Notice window expired on Day 9 with no alert raised."}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-tertiary-text font-bold">
            P&L Outcome
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`font-heading text-xl sm:text-2xl font-bold transition-colors ${
                isAkashic ? "text-positive" : "text-red"
              }`}
            >
              {isAkashic ? "$180,000 Retained" : "-$180,000 Churn"}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-secondary-text leading-snug">
            {isAkashic
              ? "Renewed contract with updated payment schedule."
              : "Account lapsed silently without executive visibility."}
          </p>
        </div>

      </div>
    </div>
  );
}
