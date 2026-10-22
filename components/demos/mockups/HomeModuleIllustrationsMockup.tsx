"use client";

/**
 * SIMULATED PRODUCT UI: native-size product fragments for the homepage.
 * The established illustrative world uses $25.4 million revenue and channel
 * shares of 46 / 32 / 22. These are business teasers, not application layouts.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { HomeHeroModuleKind } from "@/content/pages/home";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type SymbolName = "building" | "store" | "box" | "lock" | "document" | "message" | "link" | "chart";

function Symbol({ name, className = "h-4 w-4" }: { name: SymbolName; className?: string }) {
  const paths: Record<SymbolName, ReactNode> = {
    building: <><path d="M4 21V5l8-3 8 3v16M2 21h20M9 21v-5h6v5M8 7h1m6 0h1M8 11h1m6 0h1" /></>,
    store: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0M9 20v-6h6v6" /></>,
    box: <><path d="m12 3 9 5v9l-9 5-9-5V8ZM3 8l9 5 9-5M12 13v9M7.5 5.5l9 5" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    document: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9ZM14 3v6h6M8 13h8M8 17h5" /></>,
    message: <path d="M7 18H4V4h16v14h-8l-5 4Z" />,
    link: <><path d="m9 15 6-6M7 14l-2 2a3 3 0 0 0 4 4l4-4M11 8l4-4a3 3 0 0 1 4 4l-2 2" /></>,
    chart: <><path d="M4 20V10M12 20V4M20 20v-8" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{paths[name]}</svg>;
}

function Tag({ children, positive = false }: { children: ReactNode; positive?: boolean }) {
  return <span className={"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] leading-none " + (positive ? "bg-positive-subtle text-positive-text" : "bg-primary-bg text-secondary-text")}>{children}</span>;
}

function MasterDataTeaser() {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner bg-ink text-background"><Symbol name="building" className="h-5 w-5" /></span>
        <div>
          <p className="text-[15px] font-medium tracking-tight text-ink">Your organisation</p>
          <p className="mt-0.5 text-[11px] text-secondary-text">Group</p>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-positive" />
      </div>
      <div className="relative ml-5 mt-3 border-l border-line pl-5">
        <div className="absolute -left-px top-0 h-10 w-px bg-blue" />
        {[
          { region: "North region", selected: true },
          { region: "South region", selected: false },
        ].map(({ region, selected }) => (
          <div key={region} className="relative py-2">
            <span className={"absolute -left-5 top-6 h-px w-5 " + (selected ? "bg-blue" : "bg-line")} />
            <div className={"rounded-inner px-3 py-2.5 " + (selected ? "bg-blue-subtle" : "bg-primary-bg")}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium text-ink">{region}</span>
                <Symbol name="building" className={"h-4 w-4 " + (selected ? "text-blue" : "text-secondary-text")} />
              </div>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-secondary-text">
                <span className="flex items-center gap-1"><Symbol name="store" className="h-3 w-3" />Stores</span>
                <span className="flex items-center gap-1"><Symbol name="box" className="h-3 w-3" />Distribution</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CHANNELS = [
  { name: "Direct", share: 46, colour: "bg-blue" },
  { name: "Partner", share: 32, colour: "bg-inkSoft" },
  { name: "Online", share: 22, colour: "bg-[rgb(var(--diagram-purple))]" },
];

function BusinessIntelligenceTeaser() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="pt-3">
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-secondary-text">Net revenue</p>
          <p className="mt-1 font-heading text-[40px] font-medium leading-none tracking-tightest text-ink">$25.4<span className="ml-1.5 text-[13px] font-normal tracking-normal text-secondary-text">million</span></p>
        </div>
        <Tag>Quarter 2</Tag>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-b border-lineSoft px-2 pb-0">
        {CHANNELS.map((channel, index) => (
          <div key={channel.name} className="flex flex-col items-center justify-end">
            <span className="mb-1.5 text-[12px] font-medium text-ink">{channel.share}%</span>
            <motion.div className={"w-full max-w-12 origin-bottom rounded-t-[5px] " + channel.colour}
              style={{ height: channel.share * 1.65 }}
              initial={reduced ? false : { scaleY: 0.15 }}
              animate={reduced ? { scaleY: 1 } : undefined}
              whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : index * 0.1, ease: [0.2, 0.8, 0.2, 1] }} />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 px-2 text-center text-[11px] text-secondary-text">
        {CHANNELS.map(channel => <span key={channel.name}>{channel.name}</span>)}
      </div>
    </div>
  );
}

function GovernanceTeaser() {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-border bg-background text-blue"><Symbol name="lock" className="h-5 w-5" /></span>
        <div>
          <p className="text-[17px] font-medium leading-tight tracking-tight text-ink">Private by design.</p>
          <p className="mt-1 text-[11px] text-secondary-text">Access follows every role.</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-blue-border pt-3">
        <span className="text-[11px] text-secondary-text">Finance <span className="text-blue">·</span> Owner</span>
        <Tag positive><span className="h-1.5 w-1.5 rounded-full bg-positive" />Governed</Tag>
      </div>
    </div>
  );
}

function AskTeaser() {
  return (
    <div className="pt-3">
      <div className="ml-4 flex items-start gap-2 rounded-inner border border-card-line bg-primary-bg px-3 py-2.5 text-[12px] leading-relaxed text-secondary-text">
        <Symbol name="message" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>Which channel is growing fastest?</span>
      </div>
      <div className="relative mt-3 rounded-outer border border-card-line bg-background px-4 py-4">
        <p className="text-[18px] font-medium tracking-tight text-ink">Online leads.</p>
        <div className="mt-1.5 flex items-end gap-2">
          <span className="font-heading text-[42px] font-medium leading-none tracking-tightest text-blue">18%</span>
          <span className="pb-1 text-[11px] leading-tight text-secondary-text">growth<br />this quarter</span>
          <svg aria-hidden viewBox="0 0 68 35" className="mb-1 ml-auto h-9 w-[68px]" fill="none"><path d="M2 31C10 31 8 22 17 23S24 28 31 18 39 23 47 12 56 13 66 3" className="stroke-blue" strokeWidth="2" strokeLinecap="round" /><circle cx="66" cy="3" r="2.5" className="fill-blue" /></svg>
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-lineSoft pt-3 text-[11px] text-secondary-text">
          <Symbol name="document" className="h-3.5 w-3.5 text-blue" />
          <span>Sales records</span>
          <span className="ml-auto rounded-full bg-blue-subtle px-2 py-0.5 text-[10px] text-blue">Source cited</span>
        </div>
      </div>
    </div>
  );
}

function PipelinesTeaser() {
  return (
    <div className="pt-4">
      <div className="flex items-center">
        {(["chart", "document", "box"] as const).map((symbol, index) => (
          <div key={symbol} className="flex flex-1 items-center">
            <span className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-inner " + (index === 1 ? "bg-blue text-on-accent" : "border border-card-line bg-background text-inkSoft")}><Symbol name={symbol} className="h-[18px] w-[18px]" /></span>
            {index < 2 && <span className="relative mx-2 h-px flex-1 bg-line"><span className="absolute left-1/2 -top-0.5 h-[5px] w-[5px] rounded-full bg-blue" /></span>}
          </div>
        ))}
        <Tag positive><span className="h-1.5 w-1.5 rounded-full bg-positive" />In sync</Tag>
      </div>
      <p className="mt-4 text-[18px] font-medium tracking-tight text-ink">One connected business.</p>
      <p className="mt-1 text-[11px] text-secondary-text">Sales · Finance · Operations</p>
    </div>
  );
}

function ForecastTeaser() {
  return (
    <div className="pt-3">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-medium tracking-tight text-ink">Demand, ahead.</p>
        <Tag>Forecast</Tag>
      </div>
      <svg aria-hidden viewBox="0 0 300 105" className="mt-3 h-[105px] w-full overflow-visible" fill="none">
        <path d="M0 87H300M0 48H300" className="stroke-lineSoft" strokeDasharray="2 5" />
        <path d="M165 50C185 30 200 42 218 21S255 20 300 5V56C260 58 245 49 218 66S185 56 165 50Z" className="fill-blue-subtle" />
        <path d="M0 87C14 87 17 72 33 75S48 89 62 71 81 75 96 59 118 68 133 53 153 58 165 50" className="stroke-inkSoft" strokeWidth="2" strokeLinecap="round" />
        <path d="M165 50C185 38 200 49 218 37S255 35 300 25" className="stroke-blue" strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round" />
        <path d="M165 9V97" className="stroke-blue-border" />
        <circle cx="165" cy="50" r="6" className="fill-background stroke-blue" strokeWidth="2" />
        <circle cx="165" cy="50" r="2" className="fill-blue" />
      </svg>
      <div className="flex justify-between text-[10px] text-secondary-text"><span>Past performance</span><span className="text-blue">Expected demand →</span></div>
    </div>
  );
}

function WarehouseTeaser() {
  return (
    <div className="pt-3">
      <div className="flex items-center justify-between text-[11px] text-secondary-text">
        <span>Net revenue</span>
        <Symbol name="link" className="h-4 w-4 text-blue" />
      </div>
      <p className="mt-1.5 font-heading text-[30px] font-medium leading-tight tracking-tightest text-ink">$25.4 <span className="text-[18px] font-normal tracking-tight">million</span></p>
      <div className="mt-4 flex items-center gap-1.5 border-t border-lineSoft pt-3">
        {["Sales", "Finance", "Leadership"].map(team => <span key={team} className="rounded-full border border-card-line px-2 py-1 text-[10px] text-secondary-text">{team}</span>)}
        <Symbol name="link" className="ml-auto h-3.5 w-3.5 text-blue" />
      </div>
      <p className="mt-2.5 text-[11px] text-secondary-text">One definition. Every team.</p>
    </div>
  );
}

const DRAWINGS: Record<HomeHeroModuleKind, () => ReactNode> = {
  "master-data": MasterDataTeaser,
  bi: BusinessIntelligenceTeaser,
  governance: GovernanceTeaser,
  ask: AskTeaser,
  pipelines: PipelinesTeaser,
  ml: ForecastTeaser,
  warehouse: WarehouseTeaser,
};

export default function HomeModuleIllustrationsMockup({ kind }: { kind: HomeHeroModuleKind }) {
  const Draw = DRAWINGS[kind];
  return <Draw />;
}
