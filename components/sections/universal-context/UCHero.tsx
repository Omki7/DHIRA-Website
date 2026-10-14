"use client";

import { useRef } from "react";
import Link from "next/link";
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
    /* HEIGHTS CUT ~26% (23 Jul 2026, homepage pacing pass). At lg:816px in a
       900px viewport this was a full screen of scroll carrying six words, and
       it opened the longest section on the page (3.5 screens) with a title
       card. It is a band now, not a screen.

       The orb geometry below is UNCHANGED — its offsets are measured from the
       container's BOTTOM edge, so shrinking the height only removes dead space
       above the headline; the arc still breaks the frame at the same distance
       from the bottom. The `pb` values on the headline block were retuned to
       hold a constant ~44–54px of clearance above the planet's apex at every
       breakpoint. Change one of these two ladders and you must recheck the
       other, or the headline sits on the arc.

       22 Sep 2026: the kicker now clears the eyebrow rule by ~56 to 72px at
       every step (the 23 Jul cut overshot and left it 21 to 28px under the
       rule, reading as part of it). The md+ steps assume the defining
       sentence sets on ONE line; if it grows to two, add ~30px to them.

       23 Sep 2026: every step gained 64px for the CTA under the defining
       sentence (28px gap + 36px button), so the kicker keeps its clearance
       under the eyebrow rule. Remove the CTA and take the 64px back out. */
    <div
      ref={ref}
      className="relative h-[476px] overflow-hidden sm:h-[526px] md:h-[580px] lg:h-[640px] xl:h-[680px]"
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
                <stop offset="0.33" stopColor="#2A2A31" stopOpacity="0" />
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
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-[210px] sm:pb-[250px] md:pb-[310px] lg:pb-[350px] xl:pb-[400px]"
      >
        <div className="flex max-w-full flex-col items-center text-center">
          {/* The hand-off from [01], whose last line is "The data underneath
              was never made ready for AI to answer from." This names what
              was missing; the sentence below says what Akashic does about
              it. Mono, uppercase, `tracking-eyebrow`: the site's label voice,
              one step up in size because it sits over display type.
              "The missing layer" became "The intelligence layer" (14 Oct
              2026) so home names Akashic the way /akashic's hero does ("The
              intelligence layer behind every decision"); it still answers
              [01]'s missing-data line. */}
          <p className="font-mono text-[12px] uppercase tracking-eyebrow text-uc-mute sm:text-[13px]">
            The intelligence layer
          </p>
          {/* Section headline scale (48 to 64px, 600, `tracking-tighter`).
              It was 96px at xl, which outranked the page's own H1 (72px). */}
          <h2
            id="platform-h"
            className="mt-4 max-w-full text-balance text-[40px] font-semibold leading-[1.05] tracking-tighter text-uc-text sm:text-[48px] md:text-[56px] lg:text-[64px]"
          >
            Meet Akashic
          </h2>
          {/* THE DEFINING SENTENCE, and the map of the section: its two
              halves are the two blocks below it. "Ready for AI" is the five
              tiles (what your AI stands on); "puts AI to work" is the step
              rail (reason, answer, forecast, act). Keep the three in step. */}
          <p className="mt-5 max-w-[30em] text-balance text-[16px] leading-relaxed text-uc-mute sm:mt-6 md:text-[18px]">
            Akashic makes your data ready for AI, then puts AI to work on it.
          </p>
          {/* The section's one exit to the platform page, placed where the
              reader has just met the name (23 Sep 2026, user direction). */}
          <Link href="/akashic" className="btn-primary-invert group mt-7">
            Explore Akashic
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform ease-settle group-hover:translate-x-0.5 motion-reduce:transition-none">
              <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
