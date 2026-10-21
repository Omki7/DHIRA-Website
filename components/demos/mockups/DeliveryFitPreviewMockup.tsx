/*
 * SIMULATED PRODUCT UI: the three small previews under the /delivery [06]
 * "Partnership fit" cards (a pipeline workbook, a KPI dashboard, an
 * analytics chat), one per engagement profile. Labels and figures are
 * artwork, not editorial copy, so they stay here rather than in content/
 * (docs/CONTENT.md). DESIGN DEBT, carried from the earlier build: the
 * sample figures are illustrative, and the emoji and the emerald, indigo
 * and amber accents sit outside the token palette.
 */

import type { DeliveryPage } from "@/content/pages/delivery";

type Kind = DeliveryPage["fit"]["profiles"][number]["mockupKind"];

export default function DeliveryFitPreviewMockup({ kind }: { kind: Kind }) {
  return (
    <div aria-hidden className="mt-6">
      {/* Mockup Type 1: Workbooks & Data Table UI (Matching Screenshot Card 1) */}
      {kind === "ai-custom" && (
        <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg p-3  text-[10px]">
          <div className="flex items-center justify-between border-b border-subtle-stroke pb-2">
            <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded border border-subtle-stroke text-inkSoft">
              <span>🔍</span>
              <span>Search pipelines...</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="rounded bg-background px-1.5 py-0.5 border border-subtle-stroke text-ink font-semibold">&lt;/&gt; SQL</span>
              <span className="rounded bg-ink px-2 py-0.5 text-on-action font-bold">▶ Run</span>
            </div>
          </div>
          <div className="mt-2.5 flex gap-2.5">
            {/* Sidebar */}
            <div className="w-1/3 space-y-1 font-mono text-[9px] text-secondary-text">
              <div className="rounded bg-background p-1 font-bold text-ink border border-subtle-stroke">Segment</div>
              <div className="px-1 py-0.5">PyTorch LLM</div>
              <div className="px-1 py-0.5">RAG Engine</div>
              <div className="px-1 py-0.5 text-blue font-semibold bg-blue-subtle rounded">Revenue</div>
              <div className="px-1 py-0.5">Win Rate</div>
            </div>
            {/* Data Table */}
            <div className="w-2/3 rounded bg-background p-2 border border-subtle-stroke font-mono text-[9px]">
              <div className="flex justify-between border-b border-subtle-stroke pb-1 font-semibold text-overcast">
                <span>Segment</span>
                <span>Revenue</span>
              </div>
              <div className="mt-1 space-y-1 text-ink">
                <div className="flex justify-between"><span>1 Strategic</span><span className="font-bold">$1.42M</span></div>
                <div className="flex justify-between"><span>2 Enterprise</span><span className="font-bold">$1.18M</span></div>
                <div className="flex justify-between"><span>3 Mid-market</span><span className="font-bold">$0.94M</span></div>
                <div className="flex justify-between"><span>4 Public Sector</span><span className="font-bold">$0.67M</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mockup Type 2: Dashboards KPI & Segment Bar Chart UI (Matching Screenshot Card 2) */}
      {kind === "cloud-dashboard" && (
        <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg p-3  text-[10px]">
          {/* Top 3 KPI Cards */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="rounded bg-background p-1.5 border border-subtle-stroke">
              <p className="text-[8px] uppercase tracking-eyebrow text-overcast">Revenue</p>
              <p className="font-bold text-ink text-[11px]">$4.82M</p>
              <p className="text-[8px] font-bold text-emerald-600">+12.4%</p>
            </div>
            <div className="rounded bg-background p-1.5 border border-subtle-stroke">
              <p className="text-[8px] uppercase tracking-eyebrow text-overcast">New ARR</p>
              <p className="font-bold text-ink text-[11px]">$1.31M</p>
              <p className="text-[8px] font-bold text-emerald-600">+6.1%</p>
            </div>
            <div className="rounded bg-background p-1.5 border border-subtle-stroke">
              <p className="text-[8px] uppercase tracking-eyebrow text-overcast">Win Rate</p>
              <p className="font-bold text-ink text-[11px]">38.9%</p>
              <p className="text-[8px] font-bold text-blue">+2.0pp</p>
            </div>
          </div>
          {/* Vertical Bar Chart Container */}
          <div className="mt-2.5 rounded bg-background p-2.5 border border-subtle-stroke">
            <p className="text-[9px] font-semibold text-inkSoft mb-2">Revenue by segment</p>
            <div className="flex items-end justify-between gap-2 h-14 px-1">
              <div className="w-1/5 rounded-t bg-indigo-200 h-[45%]" />
              <div className="w-1/5 rounded-t bg-indigo-300 h-[65%]" />
              <div className="w-1/5 rounded-t bg-indigo-400 h-[80%]" />
              <div className="w-1/5 rounded-t bg-blue h-[100%]" />
              <div className="w-1/5 rounded-t bg-indigo-200 h-[55%]" />
            </div>
            <div className="flex justify-between font-mono text-[8px] text-overcast mt-1">
              <span>SMB</span><span>Mid</span><span>Ent</span><span>Strat</span><span>Public</span>
            </div>
          </div>
        </div>
      )}

      {/* Mockup Type 3: Analytics Chat & Line Chart UI (Matching Screenshot Card 3) */}
      {kind === "squad-board" && (
        <div className="rounded-xl border border-subtle-stroke bg-tertiary-bg p-3  text-[10px] space-y-2">
          {/* Right Chat Bubble */}
          <div className="flex justify-end">
            <div className="rounded-full bg-background border border-subtle-stroke px-3 py-1 text-[9.5px] font-medium text-ink ">
              Why did win rate dip in March?
            </div>
          </div>
          {/* AI Answer Card */}
          <div className="rounded-xl bg-background p-2.5 border border-subtle-stroke text-[9px] text-secondary-text leading-relaxed">
            <p className="text-inkSoft font-medium">Mid-market win rate fell from 41.2% to 34.6%, driven by longer sales cycles.</p>
            {/* Line Chart Simulation */}
            <div className="mt-2 rounded border border-subtle-stroke p-2 bg-primary-bg">
              <div className="flex justify-between text-[8px] font-mono text-overcast">
                <span>Queried semantic model</span>
              </div>
              <svg viewBox="0 0 100 25" className="w-full h-7 mt-1 stroke-blue fill-none stroke-[2]">
                <path d="M0,10 Q25,5 50,18 T100,8" />
                <path d="M0,18 Q30,15 60,12 T100,10" stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          {/* Bottom Input Box */}
          <div className="flex items-center justify-between rounded-full bg-background border border-subtle-stroke px-3 py-1">
            <span className="text-[9px] text-overcast font-medium">Ask me about your data</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-on-action text-[8px] font-bold">↑</span>
          </div>
        </div>
      )}
    </div>
  );
}
