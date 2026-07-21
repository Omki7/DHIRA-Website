"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const AURA_CONIC =
  "conic-gradient(from 0deg at 50% 50%, #eef1ea 0deg, #6cbdb0 10deg, #161e69 60deg, #161e69 180deg, #bb2a1e 180deg, #bb2a1e 300deg, #ccc427 350deg, #eef1ea 360deg)";

export default function UCHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Use strict margin detection (-120px top & bottom) so the animation
  // ONLY triggers live when UCHero is firmly inside the user's visible viewport!
  const isInView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: false,
  });

  return (
    <div
      ref={ref}
      className="relative h-[500px] overflow-hidden sm:h-[580px] md:h-[680px] lg:h-[816px]"
    >
      {/* vertical pinstripe texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-white/[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 8px)",
        }}
      />

      {/* orb system: halo ring + planet + chromatic aura, one scalable unit. */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, y: 180, scale: 0.95 }}
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 180, scale: 0.95 }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 z-10"
      >
        <div className="absolute bottom-[-1320px] left-1/2 -ml-[1123.5px] h-[2247px] w-[2247px] origin-center scale-[0.42] sm:bottom-[-1393px] sm:scale-[0.55] md:bottom-[-1480px] md:scale-[0.72] lg:bottom-[-1588px] lg:scale-[0.88] xl:bottom-[-1635.5px] xl:scale-100">
          {/* halo ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle closest-side, transparent 64%, rgba(255,255,255,0.04) 71%, rgba(255,255,255,0.12) 74.5%, rgba(255,255,255,0.16) 75.5%, rgba(255,255,255,0.125) 77.5%, rgba(255,255,255,0.07) 80.5%, rgba(255,255,255,0.035) 85%, rgba(255,255,255,0.015) 91%, transparent 98%)",
            }}
          />
          {/* chromatic aura behind the planet edge */}
          <div className="absolute left-1/2 top-1/2 -ml-[864px] -mt-[864px] h-[1728px] w-[1728px]">
            <div
              className="absolute -inset-1 rounded-full opacity-45 blur-[10px]"
              style={{ backgroundImage: AURA_CONIC }}
            />
            <div
              className="absolute -inset-0.5 rounded-full blur-[2px]"
              style={{ backgroundImage: AURA_CONIC }}
            />
            <div className="absolute inset-0 rounded-full bg-uc-bg blur-[0.5px]" />
          </div>
          {/* planet body */}
          <div className="absolute left-1/2 top-1/2 -ml-[864px] -mt-[864px] h-[1728px] w-[1728px] rounded-full bg-uc-bg" />
          {/* gradient edge ring & semi-circle completion SVG */}
          <svg
            className="absolute left-1/2 top-1/2 -ml-[864px] -mt-[864px] h-[1728px] w-[1728px] overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1000 1000"
          >
            <defs>
              <linearGradient id="uc-edge" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="0.33" stopColor="#2A3157" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="uc-arc-glow" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#6CBDB0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="75%" stopColor="#6CBDB0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3E63DD" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base stroke */}
            <circle
              cx="500"
              cy="500"
              fill="none"
              r="500"
              stroke="url(#uc-edge)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Animated semi-circle completion stroke */}
            <motion.circle
              cx="500"
              cy="500"
              fill="none"
              r="500"
              stroke="url(#uc-arc-glow)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1570.8 1570.8"
              initial={{ strokeDashoffset: 1570.8 }}
              animate={
                reduced
                  ? { strokeDashoffset: 0 }
                  : isInView
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: 1570.8 }
              }
              transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              vectorEffect="non-scaling-stroke"
              filter="url(#glow-blur)"
            />

            {/* Apex completion pulse node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.3 }}
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.3 }
              }
              transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
              transform="translate(500, 0)"
            >
              <circle r="16" fill="#3E63DD" opacity="0.4" className="animate-ping" />
              <circle r="8" fill="#6CBDB0" opacity="0.8" />
              <circle r="4" fill="#FFFFFF" />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      {/* headline */}
      <motion.div
        initial={
          reduced
            ? false
            : { opacity: 0, y: 55, scale: 0.9, filter: "blur(14px)" }
        }
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : isInView
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 55, scale: 0.9, filter: "blur(14px)" }
        }
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-[230px] sm:pb-[270px] md:pb-[330px] lg:pb-[360px] xl:pb-[416px]"
      >
        <div className="flex max-w-full flex-col items-center gap-1 text-center">
          <p className="font-mono text-sm uppercase tracking-wide text-uc-mute sm:text-base">
            Stop guessing. Get grounded.
          </p>
          <h2 className="max-w-full text-balance text-[40px] font-semibold leading-none tracking-[-0.024em] text-uc-text sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[96px]">
            Meet Akashic
          </h2>
          <p className="mt-5 text-sm text-uc-dim sm:mt-6 sm:text-base">
            Ask once. Get one answer.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
