"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";
import UCButton from "./UCButton";

// Heavy rAF atom-field canvas (below the fold, absolutely positioned): client-only
// + deferred to keep its animation JS off the initial bundle.
const GlyphMorphCanvas = dynamic(() => import("@/components/demos/GlyphMorphCanvas"), {
  ssr: false,
});

const ROTATE_MS = 7000;

// Pipeline order, top to bottom: the question drops in at the header and flows
// down through ingest → store → explore → govern. Each step carries a dot and a
// horizontal dwell bar that fills before the section advances (user direction
// 20 Jul 2026). Index-matched to GLYPHS in GlyphMorphCanvas — reorder both
// together or the canvas desyncs.
const TABS = [
  {
    title: "Ingest & unify",
    desc: "Every source connected, every entity resolved to one trusted record.",
  },
  {
    title: "Store & predict",
    desc: "A governed warehouse feeding forecasts for demand, revenue, and risk.",
  },
  {
    title: "Explore & ask",
    desc: "Live dashboards and plain-language answers, returned with their sources.",
  },
  {
    title: "Govern & prove",
    desc: "Lineage, masking, access and audit behind every answer. Always on.",
  },
];

// Horizontal dwell bar: fills left-to-right while a step is active, sits full
// once it has passed, empty while it waits its turn.
function LoadBar({
  state,
  reduced,
}: {
  state: "done" | "active" | "idle";
  reduced: boolean;
}) {
  return (
    <span className="mt-3 block h-[2px] w-full max-w-[300px] overflow-hidden rounded-full bg-uc-line">
      {state === "done" && <span className="block size-full bg-uc-mute" />}
      {state === "active" &&
        (reduced ? (
          <span className="block size-full bg-uc-mute" />
        ) : (
          <motion.span
            key="load"
            className="block size-full origin-left bg-uc-mute"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
          />
        ))}
    </span>
  );
}

function StepRail({
  active,
  setActive,
  reduced,
}: {
  active: number;
  setActive: (i: number) => void;
  reduced: boolean;
}) {
  return (
    <div className="flex w-full flex-col">
      {TABS.map((tab, i) => {
        const on = i === active;
        return (
          <div key={tab.title} className="flex gap-4 pb-6 last:pb-0">
            <div aria-hidden="true" className="relative w-[11px] shrink-0">
              <span
                className={`absolute left-1/2 top-3 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500 ease-settle ${
                  on ? "border-uc-mute bg-uc-mute" : "border-uc-stroke bg-uc-bg"
                }`}
              />
            </div>
            <div className="flex min-w-0 flex-col pb-1">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group w-fit cursor-pointer text-left"
              >
                <span
                  className={`text-[17px] font-medium leading-[1.4] tracking-[-0.01em] transition-colors duration-500 ease-settle ${
                    on ? "text-uc-text" : "text-uc-mute"
                  }`}
                >
                  {tab.title}
                </span>
              </button>
              <LoadBar
                state={i < active ? "done" : on ? "active" : "idle"}
                reduced={reduced}
              />
              <div
                className={`grid transition-all duration-500 ease-settle ${
                  on
                    ? "grid-rows-[1fr] opacity-100 blur-0"
                    : "grid-rows-[0fr] opacity-0 blur-[1px]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="mt-2.5 max-w-[380px] text-balance text-[15px] font-medium leading-[1.45] tracking-[-0.01em] text-uc-mute">
                    {tab.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Heading({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-6 ${center ? "items-center text-center" : "items-start"}`}>
      <p className="inline-flex h-6 items-center rounded-lg bg-uc-pill px-1.5 text-[14px] font-medium leading-5 tracking-[-0.14px] text-uc-pilltext">
        The platform
      </p>
      <h2 className="max-w-[478px] text-balance text-[32px] font-medium leading-[36px] tracking-[-0.01em] text-uc-text lg:text-[40px] lg:leading-[44px]">
        <span>One question, answered end to end. </span>
        <span className="text-uc-mute">Grounded at every step.</span>
      </h2>
    </div>
  );
}

export default function UCSignals() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % TABS.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active, reduced]);

  return (
    <div className="relative w-full border-y border-uc-line">
      {/* desktop split */}
      <div className="relative z-10 hidden lg:flex lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-[clamp(64px,10svh,120px)] md:px-10 xl:px-14">
          <Heading />
          <div className="mt-10 w-full max-w-[520px]">
            <StepRail active={active} setActive={setActive} reduced={reduced} />
          </div>
          <UCButton href="/akashic" className="mt-10">
            Explore Akashic
          </UCButton>
        </div>
        <div className="relative overflow-hidden border-l border-uc-stroke lg:w-1/2">
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_64%_at_50%_48%,black_50%,transparent_100%)]">
            <GlyphMorphCanvas active={active} />
          </div>
        </div>
      </div>

      {/* mobile stack */}
      <div className="relative z-10 flex w-full flex-col px-6 pb-24 pt-[88px] md:px-10 lg:hidden">
        <Heading center />
        <div className="relative mx-auto mt-8 aspect-square w-full max-w-[520px] [mask-image:radial-gradient(circle_at_center,black_46%,transparent_82%)]">
          <GlyphMorphCanvas active={active} />
        </div>
        <div className="mx-auto mt-6 w-full max-w-[440px]">
          <StepRail active={active} setActive={setActive} reduced={reduced} />
        </div>
        <div className="mt-8 flex justify-center">
          <UCButton href="/akashic">Explore Akashic</UCButton>
        </div>
      </div>
    </div>
  );
}
