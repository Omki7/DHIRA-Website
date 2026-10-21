/*
 * Small shared chrome for the Akashic page and the sector heroes: the blue
 * capillary edge, the live and blue status chips, and the Akashic wordmark
 * badge. Simulated-UI conventions: docs/DESIGN_SYSTEM.md.
 */

import AkashicWordmark from "@/components/icons/AkashicWordmark";

/* The page's signature edge: a 3px blue capillary that tops every Akashic
   card. `bright` is the variant used on the dark anchor ground. */
export function Capillary({ bright = false }: { bright?: boolean }) {
  return <div className={bright ? "ak-capillary-bright" : "ak-capillary"} aria-hidden />;
}

export function LiveChip({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-chip border border-positive-border bg-positive-subtle px-2 py-1">
      <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2.4s_infinite]" />
      <span className="text-[9px] font-bold tracking-[0.03em] text-positive-text">{label}</span>
    </span>
  );
}

export function BlueChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-chip border border-blue-border bg-blue-subtle px-2 py-1 text-[9px] font-bold uppercase tracking-[0.03em] text-blue">
      {label}
    </span>
  );
}

/* The Akashic wordmark badge (design direction, Jul 2026: show the brand
   mark, not a stack diagram). */
export function AkashicMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-inner border border-card-line bg-background px-4 py-2.5  ${className}`}
    >
      <AkashicWordmark className="text-[13.5px] font-bold tracking-tight text-ink" />
    </div>
  );
}
