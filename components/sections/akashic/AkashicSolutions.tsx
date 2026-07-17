/*
 * [09] Built on Akashic — start from a solution, not a blank platform.
 * Three pre-configured assemblies shown as three equal house cards on the
 * page's second dark chapter (same ak-depth slab treatment as [05]).
 * Each card must be recognisable at a glance (user direction, Jul 2026):
 * the header carries the product's own sketch icon via CardHeader, and the
 * body is a tall visual-first sim — EIS reads as a dashboard (KPIs + trend
 * chart), Life as a clinical study record (phases), Knowledge as documents
 * plus a plain-language ask. The card bodies are SIMULATED PRODUCT UI
 * (AGENTS.md §8a). The EIS sim reuses the page's running South-region
 * example ([01]/[05]) instead of a cropped screenshot — the real
 * /eis/home.png capture is still in ₹ while the enterprise demo world runs
 * in $ (see content decisions memo).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { BlueChip, Capillary, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

/* EIS: unmistakably a dashboard — KPI tiles over a trend line with the
   South dip marked, and the "why" underneath. */
function EisBody() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3.5">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-inner border border-card-line bg-white px-2.5 py-1.5">
          <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-secondary-text">South region</div>
          <div className="text-[14px] font-bold tabular-nums text-ink">&minus;8%</div>
          <div className="text-[8.5px] leading-tight text-secondary-text">vs target</div>
        </div>
        <div className="rounded-inner border border-card-line bg-white px-2.5 py-1.5">
          <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-secondary-text">Renewals stalled</div>
          <div className="text-[14px] font-bold tabular-nums text-ink">2</div>
          <div className="text-[8.5px] leading-tight text-secondary-text">since July</div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col rounded-inner border border-card-line bg-white px-2.5 pt-1.5 pb-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-secondary-text">Revenue vs target</span>
          <span className="font-mono text-[8px] font-semibold text-blue">Q3</span>
        </div>
        <svg viewBox="0 0 200 44" preserveAspectRatio="none" className="mt-1 w-full flex-1" aria-hidden>
          <polygon points="4,14 40,13 76,18 106,24 132,36 160,32 196,29 196,44 4,44" fill="rgba(62,99,221,0.08)" />
          <line x1="4" y1="18" x2="196" y2="18" stroke="#C9D2F0" strokeWidth="1" strokeDasharray="3 3" />
          <polyline
            points="4,14 40,13 76,18 106,24 132,36 160,32 196,29"
            fill="none"
            stroke="#3E63DD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="132" cy="36" r="2.5" fill="#3E63DD" />
        </svg>
      </div>
      <div className="rounded-inner border border-blue-border bg-blue-subtle/60 px-2.5 py-1.5">
        <span className="text-[10.5px] leading-snug text-ink">Why: two distributor renewals stalled in July.</span>
      </div>
    </div>
  );
}

/* Life: unmistakably clinical — a study record with phase progress, three
   sources merging into one governed record. */
function LifeBody() {
  return (
    <div className="flex h-full flex-col justify-between gap-1.5 p-3.5">
      <div className="rounded-inner border border-card-line bg-white px-2.5 py-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-secondary-text">
            Study VX-201 &middot; Site 14
          </span>
          <span className="font-mono text-[8px] font-semibold text-blue">Phase III</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1" aria-hidden>
          <div className="h-1.5 flex-1 rounded-full bg-blue/70" />
          <div className="h-1.5 flex-1 rounded-full bg-blue/70" />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-subtle">
            <div className="h-full w-2/3 rounded-full bg-blue/70" />
          </div>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[7.5px] text-secondary-text" aria-hidden>
          <span>I</span>
          <span>II</span>
          <span>III</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Clinical", "Regulatory", "Commercial"].map((s) => (
          <span key={s} className="rounded-chip border border-card-line bg-white px-2 py-1 text-[10px] font-medium text-inkSoft">
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2" aria-hidden>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
        <span className="text-[10px] font-semibold text-[#6E7178]">unified</span>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
      </div>
      <div className="rounded-inner border-[1.5px] border-blue bg-gradient-to-b from-[#F6F8FF] to-white px-3 py-2 text-center shadow-[0_6px_18px_rgba(62,99,221,0.08)]">
        <span className="text-[11px] font-bold text-blue">One record per study, site, and product</span>
      </div>
    </div>
  );
}

function DocGlyph() {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 12 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      className="shrink-0 text-overcast"
      aria-hidden
    >
      <path d="M2 1.5h5.5L10.5 4.5v8H2z" />
      <path d="M7.5 1.5v3h3" />
    </svg>
  );
}

/* Knowledge: unmistakably documents — a small stack of files, then the
   plain-language question being typed against them. */
function KnowledgeBody() {
  const docs = [
    { name: "Procurement_policy.pdf", tag: "policy" },
    { name: "Vendor_MSA_2025.docx", tag: "contract" },
    { name: "Data_sharing_MOU.pdf", tag: "agreement" },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-1.5 p-3.5">
      <div className="flex flex-col gap-1.5">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center gap-2 rounded-inner border border-card-line bg-white px-2.5 py-1.5">
            <DocGlyph />
            <span className="min-w-0 flex-1 truncate font-mono text-[9.5px] text-ink">{d.name}</span>
            <span className="shrink-0 rounded-micro bg-[#F1F2F4] px-1.5 py-0.5 font-mono text-[8.5px] text-[#7C828C]">
              {d.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-inner border border-blue-border bg-blue-subtle/60 px-2.5 py-2">
        <span className="text-[11px] leading-relaxed text-ink">
          &ldquo;What does the exit clause say?&rdquo;
          <span className="ml-0.5 font-bold text-blue">|</span>
        </span>
      </div>
    </div>
  );
}

const solutions = [
  {
    id: "akashic-eis",
    name: "Akashic EIS",
    term: "Executive intelligence",
    desc: "The organisation’s performance in one live view, built for the people who answer for it.",
    href: "/solutions/eis",
    body: <EisBody />,
  },
  {
    id: "akashic-life",
    name: "Akashic Life",
    term: "Life sciences",
    desc: "Clinical, regulatory, and commercial data on one governed record.",
    href: "/solutions/life",
    body: <LifeBody />,
  },
  {
    id: "akashic-knowledge",
    name: "Akashic Knowledge",
    term: "Document intelligence",
    desc: "Every policy, contract, and institutional document: readable, searchable, and citable.",
    href: "/solutions/knowledge",
    body: <KnowledgeBody />,
  },
];

export default function AkashicSolutions() {
  return (
    <section id="solutions" className="ak-depth relative scroll-mt-24 overflow-hidden">
      {/* Same precisely-cut dark slab as [05]: crisp seams, blue horizon
          glows, machined dot texture. The page's second dark chapter. */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(62,99,221,0.22),transparent_72%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(62,99,221,0.16),transparent_72%)]" aria-hidden />

      <div className="relative rail-container border-x-0 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-white/40">[09]</span>
            <span className="text-white/70">&nbsp;&nbsp;Built on Akashic</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-white md:text-heading-md">
            Start from a solution, not a blank platform.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-white/70">
            Three pre-configured assemblies of Akashic&rsquo;s seven modules, each built
            for a job that already exists. Your first question is a business one, not a
            configuration one.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-[1100px] gap-4 md:grid-cols-3 md:gap-5 lg:mt-16">
          {solutions.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 90}>
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-outer bg-white shadow-deep ring-1 ring-white/10 transition-transform duration-250 ease-settle hover:-translate-y-1"
              >
                <Capillary bright />
                <CardHeader
                  icon={s.name}
                  name={s.name}
                  sub={s.term}
                  chip={<BlueChip label="PRE-CONFIGURED" />}
                />

                {/* The visual does the telling: simulated product UI (§8a) */}
                <div className="h-[192px] border-b border-card-divide bg-panel/50">{s.body}</div>

                <p className="flex-1 px-4 py-3.5 text-[13px] leading-relaxed text-inkSoft">{s.desc}</p>

                <div className="flex items-center justify-between border-t border-card-divide px-4 py-3">
                  <span className="text-[13px] font-semibold text-blue">Explore {s.name}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue transition-transform duration-250 ease-settle group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:mt-14">
            <span className="inline-flex items-center font-semibold text-white">
              <AkashicLogo className="h-5 w-5" />
              <span className="-ml-1 text-[14px]">kashic</span>
            </span>
            <span className="text-[14px] font-medium text-white/70">
              &middot; Different problems. Same governed foundation underneath.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
