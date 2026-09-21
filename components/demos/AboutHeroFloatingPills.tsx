"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

interface FlyInPill {
  id: string;
  label: string;
  iconBg: string;
  icon: React.ReactNode;
  posClass: string; // anchor position near hero text
  moveX: number[];
  moveY: number[];
  scale: number[];
  opacity: number[];
  duration: number;
  delay: number;
}

const FLY_PILLS: FlyInPill[] = [
  // --- TOP-LEFT CORNER FLY-IN ---
  {
    id: "raw-data",
    label: "Raw Data",
    iconBg: "bg-sky-50 text-sky-600 border border-sky-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    posClass: "top-[25%] left-[15%] sm:left-[22%] lg:left-[26%]",
    moveX: [-240, -110, -50, -10],
    moveY: [-160, -70, -30, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 0,
  },

  // --- TOP-RIGHT CORNER FLY-IN ---
  {
    id: "models",
    label: "Models",
    iconBg: "bg-rose-50 text-rose-600 border border-rose-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
      </svg>
    ),
    posClass: "top-[25%] right-[15%] sm:right-[22%] lg:right-[26%]",
    moveX: [240, 110, 50, 10],
    moveY: [-160, -70, -30, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 0.7,
  },

  // --- BOTTOM-LEFT CORNER FLY-IN ---
  {
    id: "security",
    label: "Security",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    posClass: "top-[62%] left-[18%] sm:left-[24%] lg:left-[28%]",
    moveX: [-240, -110, -50, -10],
    moveY: [160, 70, 30, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 1.4,
  },

  // --- BOTTOM-RIGHT CORNER FLY-IN ---
  {
    id: "insights",
    label: "Insights",
    iconBg: "bg-pink-50 text-pink-600 border border-pink-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
      </svg>
    ),
    posClass: "top-[62%] right-[18%] sm:right-[24%] lg:right-[28%]",
    moveX: [240, 110, 50, 10],
    moveY: [160, 70, 30, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 2.1,
  },

  // --- TOP-LEFT SECOND WAVE ---
  {
    id: "infrastructure",
    label: "Infrastructure",
    iconBg: "bg-blue-50 text-blue-600 border border-blue-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    posClass: "top-[18%] left-[12%] sm:left-[18%] lg:left-[22%]",
    moveX: [-220, -100, -40, 0],
    moveY: [-140, -60, -20, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 2.8,
  },

  // --- TOP-RIGHT SECOND WAVE ---
  {
    id: "governance",
    label: "Governance",
    iconBg: "bg-yellow-50 text-yellow-700 border border-yellow-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    posClass: "top-[18%] right-[12%] sm:right-[18%] lg:right-[22%]",
    moveX: [220, 100, 40, 0],
    moveY: [-140, -60, -20, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 3.5,
  },

  // --- BOTTOM-LEFT SECOND WAVE ---
  {
    id: "api",
    label: "API",
    iconBg: "bg-violet-50 text-violet-600 border border-violet-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    posClass: "top-[70%] left-[14%] sm:left-[20%] lg:left-[24%]",
    moveX: [-220, -100, -40, 0],
    moveY: [140, 60, 20, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 4.2,
  },

  // --- BOTTOM-RIGHT SECOND WAVE ---
  {
    id: "automation",
    label: "Automation",
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    posClass: "top-[70%] right-[14%] sm:right-[20%] lg:right-[24%]",
    moveX: [220, 100, 40, 0],
    moveY: [140, 60, 20, 0],
    scale: [0.5, 0.95, 1, 0.7],
    opacity: [0, 0.95, 1, 0],
    duration: 5.5,
    delay: 4.9,
  },
];

export default function AboutHeroFloatingPills() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {FLY_PILLS.map((pill) => (
        <motion.div
          key={pill.id}
          className={`absolute pointer-events-auto ${pill.posClass}`}
          animate={
            reduced
              ? { opacity: 0.8, scale: 1, x: 0, y: 0 }
              : {
                  x: pill.moveX,
                  y: pill.moveY,
                  scale: pill.scale,
                  opacity: pill.opacity,
                }
          }
          transition={
            reduced
              ? { duration: 0.3 }
              : {
                  duration: pill.duration,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: pill.delay,
                }
          }
        >
          <div className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(11,20,64,0.08)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-blue-border/80 hover:shadow-[0_8px_24px_rgba(62,99,221,0.2)] hover:bg-white">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${pill.iconBg}`}
            >
              {pill.icon}
            </span>
            <span className="font-mono text-xs font-semibold tracking-tight text-primary-text transition-colors duration-200 group-hover:text-blue">
              {pill.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
