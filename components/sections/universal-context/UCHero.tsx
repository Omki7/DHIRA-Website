"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

const AURA_CONIC =
  "conic-gradient(from 0deg at 50% 50%, #eef1ea 0deg, #6cbdb0 10deg, #161e69 60deg, #161e69 180deg, #bb2a1e 180deg, #bb2a1e 300deg, #ccc427 350deg, #eef1ea 360deg)";

export default function UCHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const textBlur = useTransform(scrollYProgress, [0, 0.7], [12, 0]);
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;
  const textY = useTransform(scrollYProgress, [0, 0.7], [28, 0]);
  const orbOpacity = useTransform(scrollYProgress, [0.02, 0.7], [0, 1]);
  // The orb rises into frame as you scroll: it starts sunk below its resting
  // spot and lifts up, so the semicircle "pops up" over the fold rather than
  // just fading in (user direction 20 Jul 2026).
  const orbY = useTransform(scrollYProgress, [0, 0.82], [240, 0]);

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

      {/* orb system: halo ring + planet + chromatic aura, one scalable unit.
          Outer layer carries the scroll opacity + rise; inner layer owns the
          responsive position/scale (kept separate so framer's transform and
          the responsive `scale-*` utilities don't clobber each other). */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { opacity: orbOpacity, y: orbY }}
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
        {/* gradient edge ring */}
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
          </defs>
          <circle
            cx="500"
            cy="500"
            fill="none"
            r="500"
            stroke="url(#uc-edge)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      </motion.div>

      {/* headline */}
      <motion.div
        style={
          reduced
            ? undefined
            : { opacity: textOpacity, filter: textFilter, y: textY }
        }
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-[230px] sm:pb-[270px] md:pb-[330px] lg:pb-[360px] xl:pb-[416px]"
      >
        <div className="flex max-w-full flex-col items-center gap-1 text-center">
          <p className="text-sm text-uc-mute sm:text-base">Stop guessing. Get grounded.</p>
          <h2 className="max-w-full text-balance text-[40px] font-semibold leading-none tracking-[-0.024em] text-uc-text sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[96px]">
            Meet Akashic
          </h2>
          {/* Closes the loop [01] opens: "You asked for one number.
              You got three." */}
          <p className="mt-5 text-sm text-uc-dim sm:mt-6 sm:text-base">
            Ask once. Get one answer.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
