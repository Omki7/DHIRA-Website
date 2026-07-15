/*
 * Shared card chrome + the MiniStack motif for the Akashic product page.
 * Used by the [02]–[08] sections so every simulated-UI card speaks the same
 * visual language (see AGENTS.md §8a for the simulated-UI convention).
 */

import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import AkashicLogo from "@/components/icons/AkashicLogo";

export const CARD =
  "relative flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-card transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame";

export function CardBadge({ icon }: { icon: string }) {
  return (
    <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <DynamicSketchIcon text={icon} className="h-[15px] w-[15px] text-blue" />
    </div>
  );
}

export function CardHeader({
  icon,
  name,
  sub,
  chip,
}: {
  icon: string;
  name: string;
  sub: string;
  chip: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
      <CardBadge icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13.5px] font-bold tracking-tight text-ink">{name}</span>
        <span className="truncate text-[10.5px] text-tertiary-text">{sub}</span>
      </div>
      {chip}
    </div>
  );
}

export function CardDesc({ text }: { text: string }) {
  return <p className="px-4 pt-3 text-[12px] leading-relaxed text-inkSoft">{text}</p>;
}

export function LiveChip({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-[7px] border border-[#CBE8D7] bg-[#EDF7F1] px-2 py-1">
      <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
      <span className="text-[9px] font-bold tracking-[0.03em] text-[#1B7A47]">{label}</span>
    </span>
  );
}

export function BlueChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 text-[9px] font-bold tracking-[0.03em] text-blue">
      {label}
    </span>
  );
}

/* The Akashic wordmark badge. Use instead of MiniStack on the Akashic page
   (design direction, Jul 2026: show the brand mark, not the stack). */
export function AkashicMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[10px] border border-subtle-stroke bg-white px-4 py-2.5 shadow-card ${className}`}
    >
      <AkashicLogo className="h-5 w-5" />
      <span className="-ml-1 text-[13.5px] font-bold tracking-tight text-ink">kashic</span>
    </div>
  );
}

/* The recurring "one identical stack" motif: three layers + governance base. */
export function MiniStack({
  className = "",
  highlight,
}: {
  className?: string;
  highlight?: "data" | "knowledge" | "ai" | "governance";
}) {
  const layer = (key: "data" | "knowledge" | "ai", base: string) => {
    if (!highlight) return base;
    if (highlight === key) return "h-[8px] rounded-[2px] border border-blue bg-blue/80";
    return `${base} opacity-30`;
  };
  const base =
    highlight && highlight !== "governance"
      ? "mt-[1px] h-[6px] rounded-[2px] bg-ink opacity-30"
      : "mt-[1px] h-[6px] rounded-[2px] bg-ink";
  return (
    <div className={`w-[112px] ${className}`}>
      <div className="flex items-center justify-center pb-1">
        <AkashicLogo className="h-4 w-4" />
        <span className="-ml-1 text-[10px] font-bold text-ink">kashic</span>
      </div>
      <div className="flex flex-col gap-[3px] rounded-[7px] border border-subtle-stroke bg-white p-[5px] shadow-card">
        <div className={layer("data", "h-[8px] rounded-[2px] border border-blue-border bg-blue-subtle")} />
        <div className={layer("knowledge", "h-[8px] rounded-[2px] border border-blue-border bg-blue-subtle/50")} />
        <div className={layer("ai", "h-[8px] rounded-[2px] border border-blue-border bg-blue-subtle")} />
        <div className={base} />
      </div>
    </div>
  );
}
