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
import ScreenProgressRail from "@/components/ui/ScreenProgressRail";
import {
  PIPELINES_SCREEN_HTML,
  ASK_SCREEN_HTML,
  MODELS_SCREEN_HTML,
} from "@/components/demos/mockups/HeroProductScreensMockup";

/* Per-screen dwell times — the Ask screen carries the full South-region
   answer (paragraph + formula + chart) and needs longer to read.
   Each screen gained 2.5s on 22 Jul 2026 (team feedback): at 6s/9s a reader
   who started on the table had the card swapped out from under them before
   they had finished the first column. */
const SCREEN_DURATIONS = [8500, 11500, 8500];

export default function HeroProductsMockup() {
  const [activeCard, setActiveCard] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSelect = (id: number) => {
    setActiveCard(id);
    setResetTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, SCREEN_DURATIONS[activeCard]);
    return () => clearTimeout(timer);
  }, [activeCard, resetTrigger]);

  const getPos = (p: number) => {
    return p === 0 ? "center" : p === 1 ? "right" : "left";
  };

  const rp = [0, 1, 2].map((i) => (i - activeCard + 3) % 3);
  const pos0 = getPos(rp[0]);
  const pos1 = getPos(rp[1]);
  const pos2 = getPos(rp[2]);

  return (
    <div style={{ padding: "36px 0 0", fontFamily: "Inter, system-ui, sans-serif" }} className="w-full max-w-[1152px] mx-auto mt-8 relative z-10">
      {/* `w-fit` alone meant that below ~640px the three labels were squeezed
          into whatever width was left and each wrapped onto three lines, so
          the row read as a nine-line grey block colliding with the scroll-to-
          top button. It was already doing this before the relabel.

          Mobile now gets a single nowrap row that scrolls horizontally — the
          standard pattern, and honest about there being three of them. The
          scrollbar is hidden because the row auto-advances and the dots
          already signal position. Desktop is unchanged: centred, `w-fit`,
          gap-10. */}
      <div className="mx-auto mb-8 flex w-full max-w-full items-center gap-6 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-12 sm:w-fit sm:gap-10 sm:overflow-visible sm:px-0">
        {/* Plain language, not SKUs (23 Jul 2026, hero pass). These read
            "Akashic Data Pipelines / Ask Akashic / Akashic Data Warehouse" —
            internal product taxonomy, shown to a reader who at that moment had
            not yet been told what Akashic is. Three module names cannot teach
            anyone anything on first contact.

            They now narrate the headline directly above them: "Every system
            you run. One answer you can trace." becomes connect → resolve →
            ask, in that order, so the three screens read as one journey
            instead of a product list. Same three screens, same order, same
            SCREEN_DURATIONS indices — labels only. */}
        {[
          { id: 0, label: "Connect every source" },
          { id: 1, label: "Ask in plain language" },
          { id: 2, label: "One governed record" }
        ].map((tab) => {
          const isActive = activeCard === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(tab.id)}
              className={`group relative flex shrink-0 cursor-pointer select-none items-center gap-2.5 whitespace-nowrap pb-2 text-[15px] tracking-tight transition-colors duration-200 sm:text-[17px] ${
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
                  animation: isActive ? `progressFill ${SCREEN_DURATIONS[tab.id]}ms linear forwards` : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Simulated screens are pointer shortcuts only; the tabs above are the
          keyboard-accessible control for the same action, so the cards stay
          out of the accessibility tree. */}
      {/* 690px = the tallest card's real extent: `.hs-card` is 600px with
          `transform-origin: center top`, and the centre card is `scale(1.15)`.
          At the old 610px the absolutely-positioned cards overflowed by 80px
          and painted over anything below them — which is why the caption under
          this stack was never actually visible on the page. */}
      <div style={{ position: "relative", height: "690px", width: "100%" }}>
        <div
          className="hs-card"
          data-pos={pos0}
          aria-hidden="true"
          onClick={() => rp[0] !== 0 && handleSelect(0)}
          dangerouslySetInnerHTML={{ __html: PIPELINES_SCREEN_HTML }}
        />
        <div
          className="hs-card"
          data-pos={pos1}
          aria-hidden="true"
          onClick={() => rp[1] !== 0 && handleSelect(1)}
          dangerouslySetInnerHTML={{ __html: ASK_SCREEN_HTML }}
        />
        <div
          className="hs-card"
          data-pos={pos2}
          aria-hidden="true"
          onClick={() => rp[2] !== 0 && handleSelect(2)}
          dangerouslySetInnerHTML={{ __html: MODELS_SCREEN_HTML }}
        />
      </div>
      <ScreenProgressRail
        count={3}
        active={activeCard}
        durationMs={SCREEN_DURATIONS[activeCard]}
        resetKey={resetTrigger}
        className="mt-8"
      />

      <div className="mt-5 text-center">
        <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-tertiary-text">
          From every source · one trusted answer
        </span>
      </div>
    </div>
  );
}
