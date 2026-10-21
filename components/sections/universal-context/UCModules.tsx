"use client";

import { useEffect, useRef, useState } from "react";
import { ModuleMomentStage } from "@/components/demos/mockups/AkashicModuleMomentsMockup";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomePlatform } from "@/content/pages/home";

/*
 * Homepage [02], second half: the seven modules beside their drawings
 * (21 Oct 2026, user: "on the left show the modules, on the right those
 * small illustrations... a precursor for the next solution section"). It
 * replaced the particle "Ask why a number moved" demo, whose claim /akashic
 * [01] owns.
 *
 * Left, the rail: each module with a dwell bar and, while active, what it
 * does in plain words. Right, that module's moment drawing
 * (ModuleMomentStage), replayed each time the rail moves. The module names
 * are the ones the [03] slab draws, so the next section reads as these
 * modules switched on. The rotation runs only on screen and not at all
 * under reduced motion (Rule 6a); choosing a module takes over.
 */

const ROTATE_MS = 8500;

type Item = HomePlatform["modules"]["items"][number];

// Horizontal dwell bar: fills while a module is active, full once passed.
function LoadBar({ state, reduced, run }: { state: "done" | "active" | "idle"; reduced: boolean; run: number }) {
  return (
    <span className="mt-2.5 block h-[2px] w-full max-w-[320px] overflow-hidden rounded-full bg-uc-line">
      {state === "done" && <span className="block size-full bg-uc-mute" />}
      {state === "active" &&
        (reduced ? (
          <span className="block size-full bg-uc-mute" />
        ) : (
          <span key={run} className="block size-full origin-left bg-uc-mute" style={{ animation: `uc-load ${ROTATE_MS}ms linear both` }} />
        ))}
    </span>
  );
}

function ModuleRail({ items, active, choose, reduced, run }: { items: Item[]; active: number; choose: (i: number) => void; reduced: boolean; run: number }) {
  return (
    <ol className="flex w-full flex-col">
      {items.map((item, i) => {
        const on = i === active;
        return (
          <li key={item.name} className="flex gap-4 pb-5 last:pb-0">
            <span aria-hidden="true" className={`w-6 shrink-0 pt-[3px] font-mono text-[11px] transition-colors duration-500 ease-settle ${on ? "text-uc-text" : "text-uc-mute"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <button type="button" onClick={() => choose(i)} aria-pressed={on} className="w-fit cursor-pointer text-left">
                <span className={`text-[17px] font-medium leading-snug transition-colors duration-500 ease-settle ${on ? "text-uc-text" : "text-uc-mute hover:text-uc-text"}`}>
                  {item.name}
                </span>
              </button>
              <LoadBar state={i < active ? "done" : on ? "active" : "idle"} reduced={reduced} run={run} />
              <div className={`grid transition-all duration-500 ease-settle ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="mt-2 max-w-[380px] text-pretty text-[15px] leading-relaxed text-uc-mute">{item.text}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Heading({ content, center = false }: { content: HomePlatform["modules"]; center?: boolean }) {
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start"}`}>
      <h3 className="max-w-[20em] text-balance text-[28px] font-semibold leading-[1.15] tracking-tight lg:text-[32px]">
        <span className="block text-uc-mute">{content.title.setup}</span>
        <span className="block text-uc-text">{content.title.payoff}</span>
      </h3>
      <p className="mt-4 max-w-[30em] text-pretty text-[15px] leading-relaxed text-uc-mute lg:text-[16px]">{content.lede}</p>
    </div>
  );
}

export default function UCModules({ content }: { content: HomePlatform["modules"] }) {
  const items = content.items;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const inView = useOnScreen(rootRef);
  const reduced = usePrefersReducedMotion();
  // Bumped when the section returns to view or a module is chosen, so the
  // dwell bar and the drawing restart together.
  const [run, setRun] = useState(0);
  const [wasInView, setWasInView] = useState(inView);
  if (inView !== wasInView) {
    setWasInView(inView);
    if (inView) setRun((r) => r + 1);
  }

  const choose = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % items.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active, reduced, inView, run, items.length]);

  return (
    <div ref={rootRef} className="relative w-full border-y border-uc-line">
      {/* desktop split */}
      <div className="relative z-10 hidden lg:flex lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-[clamp(64px,10svh,112px)] md:px-10 xl:px-14">
          <Heading content={content} />
          <div className="mt-10 w-full max-w-[520px]">
            <ModuleRail items={items} active={active} choose={choose} reduced={reduced} run={run} />
          </div>
        </div>
        <div className="flex items-center border-l border-uc-stroke px-4 py-12 lg:w-[56%] xl:px-8">
          <ModuleMomentStage index={active} playKey={run} caption />
        </div>
      </div>

      {/* phones and tablets */}
      <div className="relative z-10 flex w-full flex-col px-6 pb-20 pt-16 md:px-10 lg:hidden">
        <Heading content={content} center />
        <div className="mt-8 w-full">
          <ModuleMomentStage index={active} playKey={run} caption />
        </div>
        <div className="mx-auto mt-8 w-full max-w-[440px]">
          <ModuleRail items={items} active={active} choose={choose} reduced={reduced} run={run} />
        </div>
      </div>
    </div>
  );
}
