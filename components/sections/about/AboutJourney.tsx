"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

interface TimelineEvent {
  year: string;
  tag: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  highlight: string;
  icon: React.ReactNode;
}

const MILESTONES: TimelineEvent[] = [
  {
    year: "2018",
    tag: "01 / ORIGIN",
    title: "The Beginning",
    desc: "DHIRA sparked into life with a singular mission: to cut through enterprise data complexity and make real-time intelligence accessible at scale.",
    metric: "Day 01",
    metricLabel: "Mission launched",
    highlight: "Founded in New York & Hyderabad",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    year: "2019",
    tag: "02 / VALIDATION",
    title: "Early Impact & Enterprise Trust",
    desc: "First major enterprise contract delivered with 100% execution accuracy, validating our partnership model and real-world outcomes.",
    metric: "100%",
    metricLabel: "Delivery record",
    highlight: "First Enterprise Success",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    year: "2020",
    tag: "03 / ARCHITECTURE",
    title: "Akashic Platform R&D",
    desc: "Commenced core architectural R&D for Akashic—unifying structured, unstructured, and streaming data into one governed foundation.",
    metric: "v1.0",
    metricLabel: "Akashic R&D",
    highlight: "Governed Knowledge Layer",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    year: "2021",
    tag: "04 / SCALE",
    title: "Population Scale Deployment",
    desc: "Entrusted with a critical nationwide public-impact initiative, scaling platform capabilities to serve over 18 million citizens in real-time.",
    metric: "18M+",
    metricLabel: "Citizens impacted",
    highlight: "National DPI Rollout",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    year: "2023",
    tag: "05 / ACCELERATION",
    title: "Official Platform Launch",
    desc: "Official commercial launch of the Akashic Platform alongside team growth beyond 50 product engineers and domain architects.",
    metric: "50+",
    metricLabel: "Engineers & builders",
    highlight: "Platform Commercial Rollout",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    ),
  },
  {
    year: "2024",
    tag: "06 / EXPANSION",
    title: "Cross-Industry Rollout",
    desc: "Widespread enterprise adoption across smart cities, healthcare, banking, retail, and manufacturing sectors.",
    metric: "Multi-sector",
    metricLabel: "Enterprise adoption",
    highlight: "Cross-Industry Expansion",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    year: "2025",
    tag: "07 / RECOGNITION",
    title: "National AI Recognition",
    desc: "Recognised at Telangana AI Rising 2025 and Maha Hackathon 2025 for pioneering agentic orchestration and governance.",
    metric: "Winner",
    metricLabel: "National AI Challenge",
    highlight: "Telangana AI & Maha Hackathon",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
      </svg>
    ),
  },
  {
    year: "2026",
    tag: "08 / FRONTIER",
    title: "Sovereign AI Infrastructure",
    desc: "Establishing global leadership in sovereign AI infrastructure and enterprise governance for mission-critical operations.",
    metric: "Global",
    metricLabel: "AI Governance Leader",
    highlight: "Sovereign AI Infrastructure",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

interface Leader {
  id: string;
  name: string;
  badge: string;
  role: string;
  note: string;
  avatarSrc?: string;
  initials: string;
  meta: string;
  experience: string;
  imageScale?: string;
}

const LEADERS: Leader[] = [
  {
    id: "dilip",
    name: "Dilip Hanumara",
    badge: "The Visionary",
    role: "Founder & CEO",
    note: "Dominance over data is the mission. We built DHIRA to deliver trusted intelligence at population scale.",
    avatarSrc: "/avatars/dilip-hanumara-v2.png",
    initials: "DH",
    meta: "Executive Leadership & Strategy",
    experience: "15+ Yrs Enterprise Tech",
    imageScale: "scale-100 object-top",
  },
  {
    id: "rupa",
    name: "Rupa Sridhar",
    badge: "The Strategist",
    role: "Head of Solutions",
    note: "Aligning enterprise technology with core business outcomes across global digital transformation initiatives.",
    initials: "RS",
    meta: "Enterprise Digital Transformation",
    experience: "25+ Yrs Enterprise Strategy",
  },
  {
    id: "sirish",
    name: "Sirish Simha",
    badge: "The Architect",
    role: "Head of Technology",
    note: "Building resilient, high-throughput data architecture to power enterprise-grade decision intelligence.",
    initials: "SS",
    meta: "Data Architecture & Platform Engineering",
    experience: "30+ Yrs · Ex-Intel",
  },
  {
    id: "rajiv",
    name: "Rajiv Kumar",
    badge: "The Catalyst",
    role: "Head of Talent & HR",
    note: "Fostering high-performance engineering culture and building an AI-ready global workforce.",
    avatarSrc: "/avatars/rajiv-kumar-v2.png",
    initials: "RK",
    meta: "Talent Strategy & Culture",
    experience: "20+ Yrs Workforce Leadership",
    imageScale: "scale-[1.4] origin-top object-cover",
  },
  {
    id: "pratheep",
    name: "Pratheep Menon",
    badge: "The Growth Driver",
    role: "Head of Business Development",
    note: "Spearheading strategic enterprise partnerships across government and financial infrastructure sectors.",
    avatarSrc: "/avatars/pratheep-menon-v2.png",
    initials: "PM",
    meta: "Business Development & Key Accounts",
    experience: "30+ Yrs BFSI & Govt Sales",
    imageScale: "scale-[1.15] origin-top object-cover",
  },
];

export default function AboutJourney() {
  const [activeIdx, setActiveIdx] = useState(7); // Default to 2026
  const reduced = usePrefersReducedMotion();

  const activeMilestone = MILESTONES[activeIdx];

  const nextMilestone = () => setActiveIdx((prev) => (prev + 1) % MILESTONES.length);
  const prevMilestone = () => setActiveIdx((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);

  const progressPct = ((activeIdx + 1) / MILESTONES.length) * 100;

  return (
    <section id="proof" className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Our story</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Journey of transformation</span>
          </div>

          <h2 className="mt-5 text-4xl font-semibold tracking-tighter text-ink md:text-5xl lg:text-6xl">
            <span className="text-inkSoft">From origin to global platform.</span>{" "}
            <span>Our journey of transformation.</span>
          </h2>
          <p className="mt-4 max-w-[40em] text-base text-inkSoft md:text-lg leading-relaxed">
            Eight milestones that defined how DHIRA builds infrastructure and delivers population-scale intelligence.
          </p>
        </ScrollReveal>

        {/* --- MILESTONE INTERACTIVE TIMELINE --- */}
        <div className="mt-10 lg:mt-14">
          {/* Stepper Control Track */}
          <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-2 shadow-sm">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
              {MILESTONES.map((m, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={m.year}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative flex flex-1 min-w-[76px] items-center justify-center gap-2 rounded-btn px-3 py-2.5 font-mono text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-ink text-white shadow-sm"
                        : "bg-transparent text-inkSoft hover:bg-tertiary-bg hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                        isActive ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-overcast/40 group-hover:bg-blue"
                      }`}
                    />
                    <span>{m.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Stepper Progress Bar */}
            <div className="relative mt-1 h-1 w-full overflow-hidden rounded-full bg-tertiary-bg">
              <motion.div
                className="h-full bg-blue"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>

          {/* Master Milestone Stage Canvas */}
          <div className="relative mt-4 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 sm:p-10 shadow-card">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" />

            {/* Subtle Watermark Stamp */}
            <div
              className="pointer-events-none absolute right-6 bottom-2 select-none font-mono text-8xl sm:text-[140px] font-bold leading-none text-lineSoft/30"
              aria-hidden
            >
              {activeMilestone.year}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px] items-center"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner bg-blue-subtle text-blue border border-blue-border">
                      {activeMilestone.icon}
                    </span>
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-blue">
                        {activeMilestone.tag} &middot; {activeMilestone.year}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        {activeMilestone.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-base sm:text-lg leading-relaxed text-inkSoft max-w-[42em]">
                    {activeMilestone.desc}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-inkSoft shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                    <span>{activeMilestone.highlight}</span>
                  </div>
                </div>

                {/* Stat Highlight Tile (StatBand chrome recipe) */}
                {activeMilestone.metric && (
                  <div className="relative overflow-hidden rounded-frame border border-subtle-stroke bg-white p-6 sm:p-8 text-center shadow-card">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue via-blue/50 to-transparent" />
                    <span className="font-mono text-4xl sm:text-5xl font-semibold leading-none tracking-tighter text-ink">
                      {activeMilestone.metric}
                    </span>
                    <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-inkSoft">
                      {activeMilestone.metricLabel}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stepper Navigation Footer */}
            <div className="relative z-10 mt-8 pt-5 border-t border-dashed border-lineSoft flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
                MILESTONE <span className="text-ink font-semibold">{activeIdx + 1}</span> / {MILESTONES.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevMilestone}
                  className="btn-secondary h-9 w-9 p-0 flex items-center justify-center"
                  aria-label="Previous milestone"
                >
                  &larr;
                </button>
                <button
                  onClick={nextMilestone}
                  className="btn-secondary h-9 w-9 p-0 flex items-center justify-center"
                  aria-label="Next milestone"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- [06b] THE ENABLERS (EXECUTIVE LEADERSHIP GRID) --- */}
        <div className="mt-20 lg:mt-28 border-t border-lineSoft pt-16 lg:pt-20">
          <ScrollReveal>
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
              <p>
                <span className="text-overcast">[06b]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;The Enablers</span>
              </p>
              <span className="hidden text-overcast sm:inline">/ Architects of intelligence</span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tighter text-ink md:text-4xl lg:text-5xl">
              <span className="text-inkSoft">Empowering the vision.</span>{" "}
              <span>Led by domain veterans.</span>
            </h2>
            <p className="mt-3 max-w-[38em] text-base text-inkSoft leading-relaxed">
              Decades of engineering, digital transformation, data architecture, and institutional growth guiding DHIRA’s population-scale platform.
            </p>
          </ScrollReveal>

          {/* EXECUTIVE LEADERSHIP 5-CARD GRID */}
          <ScrollReveal delay={120}>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
              {LEADERS.map((leader) => {
                return (
                  <div
                    key={leader.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-frame border border-subtle-stroke bg-white p-5 shadow-card hover:border-blue-border hover:shadow-frame transition-all duration-300 h-full"
                  >
                    {/* Accent Top Blue Rule */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue/60 via-blue/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col flex-1">
                      {/* Badge Chip */}
                      <div className="mb-3 h-6 flex items-center">
                        <span className="inline-block rounded-chip border border-blue-border/60 bg-blue-subtle px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue">
                          {leader.badge}
                        </span>
                      </div>

                      {/* Leader Portrait */}
                      <div className="relative w-full aspect-[4/4.5] rounded-inner border border-subtle-stroke bg-primary-bg overflow-hidden shadow-xs mb-4">
                        {leader.avatarSrc ? (
                          <Image
                            src={leader.avatarSrc}
                            alt={leader.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 220px"
                            className={leader.imageScale || "object-cover object-top"}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-mono text-2xl font-semibold text-blue bg-gradient-to-br from-blue-subtle/80 via-primary-bg to-tertiary-bg border border-blue-border/40">
                            {leader.initials}
                          </div>
                        )}
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-lg font-semibold tracking-tight text-ink group-hover:text-blue transition-colors truncate">
                        {leader.name}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-inkSoft mt-0.5 truncate">
                        {leader.role}
                      </p>

                      {/* Meta Experience Tag */}
                      <p className="mt-2.5 font-mono text-[10.5px] text-overcast border-t border-dashed border-lineSoft pt-2 truncate">
                        {leader.experience}
                      </p>
                    </div>

                    {/* Executive Quote Box — Fixed 104px height for perfectly aligned level across all 5 cards */}
                    <blockquote className="mt-4 rounded-btn border border-subtle-stroke border-l-2 border-l-blue bg-primary-bg/80 p-3.5 text-[12px] text-secondary-text leading-snug italic h-[104px] shrink-0 flex items-center overflow-hidden">
                      &ldquo;{leader.note}&rdquo;
                    </blockquote>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
