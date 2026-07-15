"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Renders three fake app screens (Akashic Data Pipelines table, Ask Akashic chat,
 * Akashic Data Warehouse view) as static visual props for the Hero section. Auto-cycles
 * every 6000ms via `activeCard`.
 *
 * The three card interiors are built as raw HTML strings and injected via
 * `dangerouslySetInnerHTML` below (search for that prop). This is
 * intentional: each card is a pixel-precise, non-interactive mockup with no
 * real state, so a plain HTML string was simpler than a deep JSX tree. Do
 * not refactor this to real component state without a concrete reason —
 * see AGENTS.md §8.
 */

import { useState, useEffect } from "react";
import {
  PIPELINES_SCREEN_HTML,
  ASK_SCREEN_HTML,
  MODELS_SCREEN_HTML,
} from "@/components/demos/mockups/HeroProductScreensMockup";

export default function HeroProductsMockup() {
  const [activeCard, setActiveCard] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSelect = (id: number) => {
    setActiveCard(id);
    setResetTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeCard, resetTrigger]);

  const getPos = (p: number) => {
    return p === 0 ? "center" : p === 1 ? "right" : "left";
  };

  const rp = [0, 1, 2].map((i) => (i - activeCard + 3) % 3);
  const pos0 = getPos(rp[0]);
  const pos1 = getPos(rp[1]);
  const pos2 = getPos(rp[2]);

  return (
    <div style={{ padding: "36px 0 58px", minHeight: "792px", fontFamily: "Inter, system-ui, sans-serif" }} className="w-full max-w-[1152px] mx-auto mt-8 relative z-10 mb-24">
      <div className="mx-auto mb-12 flex w-fit items-center gap-10">
        {[
          { id: 0, label: "Akashic Data Pipelines" },
          { id: 1, label: "Ask Akashic" },
          { id: 2, label: "Akashic Data Warehouse" }
        ].map((tab) => {
          const isActive = activeCard === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(tab.id)}
              className={`group relative flex cursor-pointer select-none items-center gap-2.5 pb-2 text-[17px] tracking-tight transition-colors duration-200 ${
                isActive ? "text-primary-text" : "text-tertiary-text hover:text-secondary-text"
              }`}
              style={{ fontFamily: "Inter, sans-serif", fontWeight: isActive ? 600 : 400 }}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "scale-100 bg-blue opacity-100" : "scale-50 bg-tertiary-text opacity-40 group-hover:opacity-70"
                }`}
              />
              {tab.label}
              <span
                key={isActive ? `active-${resetTrigger}` : "inactive"}
                className="absolute bottom-0 left-0 h-px bg-tertiary-text/40 transition-all duration-300"
                style={{
                  width: isActive ? "100%" : "0%",
                  animation: isActive ? "progressFill 6s linear forwards" : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", height: "610px", width: "100%" }}>
        <div
          className="hs-card"
          data-pos={pos0}
          onClick={() => rp[0] !== 0 && handleSelect(0)}
          dangerouslySetInnerHTML={{ __html: PIPELINES_SCREEN_HTML }}
        />
        <div
          className="hs-card"
          data-pos={pos1}
          onClick={() => rp[1] !== 0 && handleSelect(1)}
          dangerouslySetInnerHTML={{ __html: ASK_SCREEN_HTML }}
        />
        <div
          className="hs-card"
          data-pos={pos2}
          onClick={() => rp[2] !== 0 && handleSelect(2)}
          dangerouslySetInnerHTML={{ __html: MODELS_SCREEN_HTML }}
        />
      </div>
      <div style={{ marginTop: "30px", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.14em", color: "#8E8F91" }}>
          FROM EVERY SOURCE – ONE TRUSTED ANSWER
        </span>
      </div>
    </div>
  );
}
