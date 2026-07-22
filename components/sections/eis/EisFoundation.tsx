/*
 * [08] Built on Akashic — What It Stands On.
 * Restaged in Keytail-inspired dark sky glass aesthetics.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Band = {
  eyebrow: string;
  title: string;
  modules: { name: string; href?: string }[];
  lit?: boolean;
};

const bands: Band[] = [
  {
    eyebrow: "The executive layer",
    title: "Akashic EIS",
    modules: [
      { name: "Morning brief" },
      { name: "Three lenses" },
      { name: "Provenance" },
      { name: "Action composer" },
      { name: "Approvals" },
    ],
    lit: true,
  },
  {
    eyebrow: "Layer 03",
    title: "Intelligence",
    modules: [
      { name: "Ask Akashic", href: "/akashic#modules-ask-ai" },
      { name: "Akashic BI", href: "/akashic#modules-business-intelligence" },
      { name: "Akashic ML", href: "/akashic#modules-machine-learning" },
    ],
  },
  {
    eyebrow: "Layer 02",
    title: "Knowledge",
    modules: [{ name: "Meaning carried across every source" }],
  },
  {
    eyebrow: "Layer 01",
    title: "Data",
    modules: [
      { name: "Akashic Pipelines", href: "/akashic#modules-data-pipelines" },
      { name: "Akashic Master Data", href: "/akashic#modules-master-data" },
      { name: "Akashic Warehouse", href: "/akashic#modules-data-warehousing" },
    ],
  },
];

const mapping = [
  ["Figures that mean the same thing in every region", "Akashic Warehouse, governed metric layer"],
  ["One account, not five spellings of it", "Akashic Master Data"],
  ["The sourced answer and its citations", "Ask Akashic"],
  ["Forecast and risk scores on the signal cards", "Akashic ML"],
  ["Who may open the compensation line", "Akashic Governance, access control"],
  ["The record of who approved what, and when", "Akashic Governance, audit trail"],
  ["Your systems read without disruption", "Akashic Pipelines"],
];

function ModuleChip({ name, href, lit }: { name: string; href?: string; lit?: boolean }) {
  const base = `inline-flex items-center rounded-[7px] border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors duration-250 ease-settle ${
    lit
      ? "border-blue-400/50 bg-blue/20 text-white font-semibold"
      : "border-white/10 bg-white/[0.04] text-white/60"
  }`;
  if (!href) return <span className={base}>{name}</span>;
  return (
    <Link href={href} className={`${base} hover:border-blue-400 hover:text-white`}>
      {name}
    </Link>
  );
}

function ElevationBand({ band }: { band: Band }) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-inner border px-5 py-4 md:flex-row md:items-center md:gap-6 ${
        band.lit
          ? "border-blue-400/40 bg-gradient-to-r from-blue/30 via-blue/15 to-transparent"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="w-[150px] shrink-0">
        <p
          className={`font-mono text-[9px] font-bold uppercase tracking-[0.08em] ${
            band.lit ? "text-blue-400" : "text-white/40"
          }`}
        >
          {band.eyebrow}
        </p>
        <p
          className={`mt-1 text-[16px] font-semibold tracking-tight ${
            band.lit ? "text-white" : "text-white/80"
          }`}
        >
          {band.title}
        </p>
      </div>
      <div className="flex min-w-0 flex-wrap gap-2">
        {band.modules.map((m) => (
          <ModuleChip key={m.name} name={m.name} href={m.href} lit={band.lit} />
        ))}
      </div>
    </div>
  );
}

export default function EisFoundation() {
  return (
    <section id="built-on-akashic" className="relative scroll-mt-24 overflow-hidden bg-transparent">
      <div className="relative rail-container border-x-0 pt-16 pb-20 lg:pt-20 lg:pb-24">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-white/40">[08]</span>
              <span className="text-white/70">&nbsp;&nbsp;What it stands on</span>
            </p>
            <span className="hidden text-white/40 sm:inline">/ Built on Akashic</span>
          </div>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-white md:text-heading-md">
            An executive screen is only as good as the platform under it.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-white/70">
            Everything EIS shows you is produced underneath by Akashic: the
            connectors that read your systems, the master data that resolves them
            into one record, the metric layer that makes &ldquo;revenue&rdquo;
            mean one thing in every region, the answer engine that cites its
            sources, and the governance layer that decides who may see what and
            keeps the record of what was done.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <ScrollReveal delay={100}>
            <div className="flex gap-3">
              <div className="relative flex w-[26px] shrink-0 items-center justify-center rounded-inner border border-white/10 bg-white/[0.03]">
                <span className="whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-white/50 [writing-mode:vertical-rl]">
                  Governed &middot; end to end
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                {bands.map((band) => (
                  <ElevationBand key={band.title} band={band} />
                ))}
                <div className="rounded-inner border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-blue-400">
                    Akashic Governance
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                    {["Access control", "Lineage", "Audit trail", "Data residency"].map((g) => (
                      <span key={g} className="flex items-center gap-2 text-[12px] text-white/70">
                        <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-blue-400" aria-hidden />
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-blue-400">
              What you see &middot; what produces it
            </p>
            <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {mapping.map(([seen, produced]) => (
                <div key={seen} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[1fr_1fr] sm:gap-6">
                  <dt className="text-[13.5px] leading-snug text-white">{seen}</dt>
                  <dd className="font-mono text-[11px] uppercase leading-snug tracking-[0.05em] text-white/60">
                    {produced}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[28em] text-[17px] leading-relaxed text-white/70">
              If Akashic is already in place, EIS is the layer above it, not a
              second platform.
            </p>
            <Link
              href="/akashic"
              className="mt-6 inline-flex items-center gap-2 rounded-btn border border-white/25 px-4 py-2 text-[14px] font-medium text-white transition-colors duration-250 ease-settle hover:border-white/50 hover:bg-white/10"
            >
              See the Akashic platform
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
