/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not a real browser, not a live window.
 * A macOS-style browser chrome that frames the Akashic EIS screenshots on
 * /solutions/eis, so a product still reads as a product when it is floating
 * on a photographic ground rather than sitting in a bordered card.
 * The URL shown is decorative. Nothing here is interactive.
 * --------------------------------------------------------------------- */

import type { ReactNode } from "react";

/* The chrome tracks the screenshot inside it: a light app in a dark window
   reads as a paste-up, and vice versa. */
type Tone = "light" | "dark";

const SURFACE: Record<Tone, { bar: string; pill: string; icon: string; edge: string }> = {
  light: {
    bar: "bg-panel",
    pill: "bg-background text-secondary-text",
    icon: "text-overcast",
    edge: "border-card-line",
  },
  dark: {
    bar: "bg-panel",
    pill: "bg-tertiary-bg text-secondary-text",
    icon: "text-inkSoft",
    edge: "border-line",
  },
};

/* Traffic lights. Real ones are unstroked flat discs at this size. */
const LIGHTS = ["#FF5F57", "#FEBC2E", "#28C840"];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EisBrowserChromeMockup({
  tone = "light",
  url = "akashic.dhira.ai",
  className = "",
  children,
}: {
  tone?: Tone;
  url?: string;
  className?: string;
  children: ReactNode;
}) {
  const s = SURFACE[tone];

  return (
    <div
      className={`overflow-hidden rounded-outer border ${s.edge}  ${className}`}
    >
      <div className={`flex h-11 items-center gap-3 px-4 ${s.bar}`}>
        <div className="flex shrink-0 items-center gap-2">
          {LIGHTS.map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className={`ml-2 hidden shrink-0 items-center gap-3 sm:flex ${s.icon}`}>
          <Chevron dir="left" />
          <Chevron dir="right" />
        </div>

        <div className="flex min-w-0 flex-1 justify-center">
          <div
            className={`max-w-[280px] truncate rounded-chip px-4 py-1 text-[11px] font-medium tracking-tight ${s.pill}`}
          >
            {url}
          </div>
        </div>

        {/* Right-hand toolbar. Balances the traffic lights so the URL pill
            sits optically centred rather than pushed right. */}
        <div className={`hidden shrink-0 items-center gap-3 sm:flex ${s.icon}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 15V4m0 0L8 8m4-4l4 4M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="7" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 7V5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
