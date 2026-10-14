"use client";

/*
 * The page's hand-off device: a two-tone thesis, a dropped hairline, and a
 * control carrying the NEXT section's eyebrow.
 *
 * ProblemSection has shipped this inline since the [01] → [02] rewrite and it
 * was the only bridge on the page, which is why [04] read as a non-sequitur —
 * every other section boundary is a hard cut. Lifted here so [03] → [04] can
 * use the same language rather than a second, slightly-different version of it.
 * ProblemSection still carries its own copy; fold it into this component when
 * you next touch that section.
 *
 * Client-only because the scroll is JS: there is no global
 * `scroll-behavior: smooth` (globals.css only sets `auto` under the
 * reduced-motion override), so a bare anchor would jump where [01]'s bridge
 * glides. Keeping the two consistent is the whole point of the component.
 *
 * Light ground only — the thesis and button palettes assume the white page
 * field. Do not render this inside a `dark` section without giving it an
 * inverted variant first.
 */

type SectionBridgeProps = {
  /** Setup line — sits in `inkSoft`. */
  lead: string;
  /** Payoff line — sits in full `ink`. The site's two-tone headline grammar. */
  payoff: string;
  /** Element id to scroll to, without the `#`. */
  targetId: string;
  /** The destination section's number, e.g. "04". */
  number: string;
  /** The destination section's eyebrow label, e.g. "HOW WE DELIVER". */
  label: string;
  className?: string;
};

export default function SectionBridge({
  lead,
  payoff,
  targetId,
  number,
  label,
  className = "",
}: SectionBridgeProps) {
  return (
    <div
      className={`relative mx-auto max-w-[900px] border-t border-dashed border-lineSoft pt-10 text-center ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-subtle/50 opacity-60 blur-3xl"
      />

      <p className="text-[20px] font-semibold leading-snug tracking-tight md:text-[26px]">
        <span className="block text-inkSoft">{lead}</span>
        <span className="mt-1.5 block text-ink">{payoff}</span>
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <span
          className="h-10 w-px bg-gradient-to-b from-lineSoft to-line"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => {
            document
              .getElementById(targetId)
              ?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              });
          }}
          className="group relative inline-flex items-center gap-2 rounded-full border border-default-stroke bg-background px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft shadow-card transition-all duration-300 ease-settle hover:border-ink hover:bg-ink hover:text-on-action hover:shadow-frame active:scale-95"
        >
          <span>
            <span className="text-overcast transition-colors duration-300 ease-settle group-hover:text-on-action/60">
              [{number}]
            </span>
            &nbsp;&nbsp;{label}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-300 ease-settle group-hover:translate-y-0.5"
          >
            <path d="M6 2.5v7M2.5 6l3.5 3.5 3.5-3.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
