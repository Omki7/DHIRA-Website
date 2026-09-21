"use client";

/* Simulated product UI — DeliveryHeroCockpit. DO NOT treat as live data layer. */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

type ChannelId = "saas" | "whitelabel" | "custom" | "product" | "squad";

interface Channel {
  id: ChannelId;
  name: string;
  category: string;
  icon: string;
  metricHighlight: string;
  metricLabel: string;
}

const CHANNELS: Channel[] = [
  {
    id: "saas",
    name: "Akashic SaaS",
    category: "Managed Cloud",
    icon: "cloud",
    metricHighlight: "99.99%",
    metricLabel: "SLA Uptime",
  },
  {
    id: "whitelabel",
    name: "White Label",
    category: "Sovereign VPC",
    icon: "shield",
    metricHighlight: "Dedicated",
    metricLabel: "Tenant Isolation",
  },
  {
    id: "custom",
    name: "Custom Tech & AI",
    category: "Bespoke Architecture",
    icon: "cpu",
    metricHighlight: "100%",
    metricLabel: "Sovereign IP",
  },
  {
    id: "product",
    name: "Product Engineering",
    category: "Full Lifecycle",
    icon: "rocket",
    metricHighlight: "2-Week",
    metricLabel: "Sprint Cadence",
  },
  {
    id: "squad",
    name: "Embedded Squad",
    category: "Senior Capacity",
    icon: "users",
    metricHighlight: "Zero",
    metricLabel: "Management Drift",
  },
];

export default function DeliveryHeroCockpit() {
  const [activeChannel, setActiveChannel] = useState<ChannelId>("saas");
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[1060px]">
      {/* Dynamic Background Light Cones & Gradient Mesh */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-blue/20 via-blue/[0.06] to-transparent opacity-70 blur-3xl"
        aria-hidden
      />

      {/* Floating Ambient Holographic Badges */}
      <div className="pointer-events-none absolute inset-0 -top-8 -bottom-8 overflow-visible select-none" aria-hidden>
        {/* Top-Left: Sovereign Badge */}
        <motion.div
          animate={reduced ? {} : { y: [-6, 6, -6], rotate: [-1, 1, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto absolute -top-5 left-4 hidden items-center gap-2 rounded-full border border-blue-border/80 bg-white/95 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(62,99,221,0.14)] backdrop-blur-md sm:flex"
        >
          <span className="flex h-2 w-2 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" />
          <span className="font-mono text-[11px] font-bold text-ink">
            Sovereign Cloud &middot; In-Region
          </span>
        </motion.div>

        {/* Top-Right: Security Badge */}
        <motion.div
          animate={reduced ? {} : { y: [5, -6, 5], rotate: [1, -1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="pointer-events-auto absolute -top-5 right-4 hidden items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(11,20,64,0.1)] backdrop-blur-md sm:flex"
        >
          <svg className="h-3.5 w-3.5 text-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-mono text-[11px] font-bold text-blue">100% Code &amp; Data Sovereignty</span>
        </motion.div>

        {/* Bottom-Left: Scale Badge */}
        <motion.div
          animate={reduced ? {} : { y: [4, -5, 4], rotate: [0.5, -0.8, 0.5] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="pointer-events-auto absolute -bottom-5 left-8 hidden items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(11,20,64,0.1)] backdrop-blur-md md:flex"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue" />
          <span className="font-mono text-[11px] font-medium text-inkSoft">
            National Scale &middot; 187M+ Verified
          </span>
        </motion.div>

        {/* Bottom-Right: Accountability Badge */}
        <motion.div
          animate={reduced ? {} : { y: [-5, 5, -5], rotate: [-0.5, 0.8, -0.5] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          className="pointer-events-auto absolute -bottom-5 right-8 hidden items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(11,20,64,0.1)] backdrop-blur-md md:flex"
        >
          <svg className="h-3.5 w-3.5 text-positive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="font-mono text-[11px] font-semibold text-ink">Zero Lock-In Guarantee</span>
        </motion.div>
      </div>

      {/* Main Delivery Convergence Engine Frame */}
      <div className="relative overflow-hidden rounded-[24px] border border-blue-border/60 bg-white/95 shadow-[0_20px_60px_-15px_rgba(11,20,64,0.14)] backdrop-blur-2xl">
        {/* Engine Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle-stroke bg-primary-bg/90 px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#E5484D]/80" />
              <span className="h-3 w-3 rounded-full bg-[#F5A623]/80" />
              <span className="h-3 w-3 rounded-full bg-[#30A46C]/80" />
            </div>
            <div className="hidden h-4 w-px bg-default-stroke sm:block" />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" />
              <span className="font-mono text-[12px] font-bold text-ink tracking-tight">
                DELIVERY CONVERGENCE ENGINE
              </span>
              <span className="hidden font-mono text-[11px] text-overcast md:inline">
                &middot; 5 Terms &rarr; 1 Governed Standard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-blue-border bg-blue-subtle px-3 py-1 font-mono text-[10px] font-bold text-blue">
              LIVE ARCHITECTURE
            </span>
          </div>
        </div>

        {/* 5 Ingress Channel Tabs (Visual Pipeline Selectors) */}
        <div className="border-b border-subtle-stroke bg-white p-2.5 sm:p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {CHANNELS.map((ch) => {
              const active = activeChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChannel(ch.id)}
                  aria-pressed={active}
                  className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all duration-200 ${
                    active
                      ? "border border-blue bg-blue-subtle/50 shadow-sm ring-1 ring-blue/30"
                      : "border border-transparent hover:border-subtle-stroke hover:bg-primary-bg/70"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-colors ${
                        active
                          ? "bg-blue text-white shadow-sm"
                          : "bg-primary-bg text-inkSoft group-hover:bg-tertiary-bg"
                      }`}
                    >
                      {ch.id === "saas" && "01"}
                      {ch.id === "whitelabel" && "02"}
                      {ch.id === "custom" && "03"}
                      {ch.id === "product" && "04"}
                      {ch.id === "squad" && "05"}
                    </span>
                    <span
                      className={`font-mono text-[9px] font-bold uppercase tracking-eyebrow ${
                        active ? "text-blue" : "text-overcast"
                      }`}
                    >
                      {ch.metricHighlight}
                    </span>
                  </div>

                  <p
                    className={`mt-2 font-mono text-[12px] font-bold tracking-tight ${
                      active ? "text-ink" : "text-inkSoft"
                    }`}
                  >
                    {ch.name}
                  </p>
                  <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                    {ch.category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Engine Stage: Graphic Topology & Live Telemetry Waveforms */}
        <div className="relative min-h-[360px] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeChannel === "saas" && (
              <motion.div
                key="saas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Pipeline Topology Flow Diagram */}
                <div className="rounded-2xl border border-subtle-stroke bg-primary-bg/50 p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" />
                      <span className="font-mono text-[11px] font-bold text-ink">
                        Managed Streaming Ingestion &amp; Knowledge Pipeline
                      </span>
                    </div>
                    <span className="rounded bg-blue-subtle px-2 py-0.5 font-mono text-[9.5px] font-bold text-blue">
                      Throughput: 48,200 events/sec
                    </span>
                  </div>

                  {/* Flow Nodes with Animated Visual SVG Connectors */}
                  <div className="mt-6 grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
                    {/* Node 1: Ingestion Stream */}
                    <div className="relative flex flex-col items-center rounded-xl border border-subtle-stroke bg-white p-4 text-center shadow-card">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-subtle text-blue font-mono font-bold text-xs">
                        KAFKA
                      </div>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Streaming Ingestion</p>
                      <p className="text-[11px] text-secondary-text">Multi-source zero-copy stream</p>
                      <span className="mt-2 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-positive-text">
                        Active &middot; 0.4ms latency
                      </span>
                    </div>

                    {/* Node 2: Governed Knowledge Layer (The Core) */}
                    <div className="relative flex flex-col items-center rounded-xl border-2 border-blue bg-blue-subtle/40 p-4 text-center shadow-frame">
                      <div className="absolute -top-3 rounded-full bg-blue px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white shadow-sm">
                        ONE STANDARD CORE
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white font-mono font-bold text-xs shadow-md">
                        KL
                      </div>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Governed Knowledge Layer</p>
                      <p className="text-[11px] text-secondary-text">Semantic entity linking &amp; security</p>
                      <span className="mt-2 rounded-full bg-blue px-2 py-0.5 font-mono text-[9px] font-semibold text-white">
                        Zero-Drift Verified
                      </span>
                    </div>

                    {/* Node 3: Query & Inference Engine */}
                    <div className="relative flex flex-col items-center rounded-xl border border-subtle-stroke bg-white p-4 text-center shadow-card">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-mono font-bold text-xs">
                        BI/AI
                      </div>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Low-Latency Execution</p>
                      <p className="text-[11px] text-secondary-text">Interactive dashboards &amp; agent orchestration</p>
                      <span className="mt-2 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-positive-text">
                        p95 &lt; 12ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Graphical Live Throughput Waveform */}
                <div className="rounded-2xl border border-subtle-stroke bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono text-[11px] font-bold text-ink">
                      Real-Time Ingestion Waveform &amp; SLA Monitor
                    </span>
                    <span className="font-mono text-[10px] text-positive-text font-bold">
                      ● 99.99% Availability Guaranteed
                    </span>
                  </div>

                  {/* SVG Waveform Graphic */}
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-primary-bg/70">
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 800 100"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#3E63DD" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,50 Q100,20 200,60 T400,30 T600,70 T800,40 L800,100 L0,100 Z"
                        fill="url(#waveGrad)"
                      />
                      <path
                        d="M0,50 Q100,20 200,60 T400,30 T600,70 T800,40"
                        stroke="#3E63DD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute inset-x-4 top-2 flex items-center justify-between text-[10px] font-mono text-inkSoft">
                      <span>00:00:00</span>
                      <span className="text-blue font-bold">Avg 48.2k events/sec</span>
                      <span>00:00:30 (Live)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChannel === "whitelabel" && (
              <motion.div
                key="whitelabel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Sovereign VPC Isolation Matrix */}
                <div className="rounded-2xl border border-blue-border/80 bg-blue-subtle/20 p-6 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-border/60 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white font-mono text-xs font-bold shadow">
                        VPC
                      </div>
                      <div>
                        <p className="font-mono text-[13px] font-bold text-ink">
                          Dedicated Sovereign Tenant Isolation
                        </p>
                        <p className="text-[11.5px] text-secondary-text">
                          Air-gapped VPC with customer-managed keys (CMEK)
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue px-3 py-1 font-mono text-[10px] font-bold text-white shadow-sm">
                      100% White-Labeled
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-positive" />
                        Custom Domain &amp; SSL
                      </div>
                      <p className="mt-2 font-mono text-[12px] text-blue">data.enterprise.internal</p>
                      <p className="mt-1 text-[11px] text-secondary-text">Private certificate authority &amp; mTLS</p>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-positive" />
                        Auth &amp; SAML 2.0
                      </div>
                      <p className="mt-2 font-mono text-[12px] text-blue">Enterprise SSO Active</p>
                      <p className="mt-1 text-[11px] text-secondary-text">RBAC, Okta, Azure AD integration</p>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-positive" />
                        Encryption Boundary
                      </div>
                      <p className="mt-2 font-mono text-[12px] text-positive-text">AES-256 GCM In-Region</p>
                      <p className="mt-1 text-[11px] text-secondary-text">Zero cross-border telemetry</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChannel === "custom" && (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Bespoke Architecture Graph */}
                <div className="rounded-2xl border border-subtle-stroke bg-primary-bg/40 p-6 shadow-card">
                  <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3">
                    <span className="font-mono text-[12px] font-bold text-ink">
                      Bespoke System Architecture &amp; IP Handover
                    </span>
                    <span className="rounded bg-emerald-50 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-positive-text">
                      100% Client Sovereign IP
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 text-center shadow-sm">
                      <span className="rounded bg-blue-subtle px-2 py-0.5 font-mono text-[9.5px] font-bold text-blue">
                        STEP 1
                      </span>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Custom AI &amp; LLM</p>
                      <p className="text-[11px] text-secondary-text">Domain-trained fine-tuning</p>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 text-center shadow-sm">
                      <span className="rounded bg-blue-subtle px-2 py-0.5 font-mono text-[9.5px] font-bold text-blue">
                        STEP 2
                      </span>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Microservices</p>
                      <p className="text-[11px] text-secondary-text">Go &amp; Rust backend APIs</p>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 text-center shadow-sm">
                      <span className="rounded bg-blue-subtle px-2 py-0.5 font-mono text-[9.5px] font-bold text-blue">
                        STEP 3
                      </span>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">CI/CD &amp; Testing</p>
                      <p className="text-[11px] text-secondary-text">Automated regression test suite</p>
                    </div>

                    <div className="rounded-xl border-2 border-blue bg-blue-subtle/30 p-4 text-center shadow-md">
                      <span className="rounded bg-blue px-2 py-0.5 font-mono text-[9.5px] font-bold text-white">
                        FINAL
                      </span>
                      <p className="mt-2 font-mono text-[12px] font-bold text-ink">Complete Handover</p>
                      <p className="text-[11px] text-secondary-text">Repo, keys, &amp; runbooks</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChannel === "product" && (
              <motion.div
                key="product"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Sprint Milestone Roadmap */}
                <div className="rounded-2xl border border-subtle-stroke bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3">
                    <span className="font-mono text-[12px] font-bold text-ink">
                      Sprint Burndown &amp; Milestone Checkpoint Matrix
                    </span>
                    <span className="font-mono text-[10px] text-blue font-bold">
                      Sprint Velocity: 94% on-time
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-subtle-stroke bg-primary-bg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-positive text-white font-mono text-[10px] font-bold">
                          ✓
                        </span>
                        <div>
                          <p className="font-mono text-[12.5px] font-bold text-ink">Milestone 1: Architecture &amp; Security Specs</p>
                          <p className="text-[11px] text-secondary-text">Threat model approved &middot; Baseline infrastructure codified</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-positive-text">Completed</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-blue-border bg-blue-subtle/30 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-blue text-white font-mono text-[10px] font-bold">
                          ▶
                        </span>
                        <div>
                          <p className="font-mono text-[12.5px] font-bold text-ink">Milestone 2: Core Ingestion &amp; API Layer</p>
                          <p className="text-[11px] text-secondary-text">Sprint 24 &middot; E2E automated test suite active</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-blue">In Progress (94%)</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-subtle-stroke bg-primary-bg px-4 py-3 opacity-60">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-tertiary-bg text-overcast font-mono text-[10px] font-bold">
                          03
                        </span>
                        <div>
                          <p className="font-mono text-[12.5px] font-bold text-ink">Milestone 3: Production Staging &amp; Cutover</p>
                          <p className="text-[11px] text-secondary-text">Performance stress testing &middot; Zero-downtime release</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-overcast">Upcoming</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChannel === "squad" && (
              <motion.div
                key="squad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Embedded Squad Node Topology */}
                <div className="rounded-2xl border border-subtle-stroke bg-primary-bg/50 p-6 shadow-card">
                  <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3">
                    <span className="font-mono text-[12px] font-bold text-ink">
                      Embedded Senior Squad Integration Matrix
                    </span>
                    <span className="rounded bg-blue px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-white">
                      Direct Jira / GitHub Bridge
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11.5px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-blue" />
                        Principal Cloud Architect
                      </div>
                      <p className="mt-2 text-[12px] text-secondary-text">
                        Terraform IaC, multi-cloud kubernetes, zero-trust
                      </p>
                      <span className="mt-3 inline-block font-mono text-[9.5px] text-positive-text font-bold">
                        ● Embedded in Squad Alpha
                      </span>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11.5px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-blue" />
                        Distributed Systems Lead
                      </div>
                      <p className="mt-2 text-[12px] text-secondary-text">
                        High-throughput streaming, Kafka, master data
                      </p>
                      <span className="mt-3 inline-block font-mono text-[9.5px] text-positive-text font-bold">
                        ● Active Commit Stream
                      </span>
                    </div>

                    <div className="rounded-xl border border-subtle-stroke bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2 font-mono text-[11.5px] font-bold text-ink">
                        <span className="h-2 w-2 rounded-full bg-blue" />
                        Senior AI/ML Engineer
                      </div>
                      <p className="mt-2 text-[12px] text-secondary-text">
                        Evaluation harnesses, LLM fine-tuning, latency optimization
                      </p>
                      <span className="mt-3 inline-block font-mono text-[9.5px] text-positive-text font-bold">
                        ● Direct PR Reviews
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Engine Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-subtle-stroke bg-primary-bg/70 px-6 py-3.5 text-[11.5px] font-mono text-inkSoft">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue" />
            <span className="text-ink font-semibold">One Standard:</span>
            <span>Direct engineer accountability &middot; 100% sovereign ownership</span>
          </div>
          <div className="flex items-center gap-3 text-overcast">
            <span>New York &middot; Hyderabad &middot; Bangalore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
