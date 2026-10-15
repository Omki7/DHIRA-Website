/*
 * [02] Compare plans: one grid, grouped by module (Pipelines, Master Data,
 * Warehouse, BI, Governance), then deployment and add-ons. The limits are the
 * pricing workbook's per-organisation figures (lib/pricingSections.ts).
 * Marks are drawn, never characters (Rule 2: no checkmarks): a blue node for
 * included, a hollow ring for available on request, a short hairline for
 * not in the plan, the /akashic [11] language. Below lg the grid scrolls
 * sideways with the row labels pinned.
 */

import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPARE, COMPARE_NOTE, PLANS, type Cell } from "@/lib/pricingSections";

function Node() {
  return <span aria-hidden className="inline-block h-[9px] w-[9px] rounded-full bg-blue align-middle" />;
}

function Ring() {
  return <span aria-hidden className="inline-block h-[9px] w-[9px] rounded-full border-[1.5px] border-blue bg-background align-middle" />;
}

function Absent() {
  return <span aria-hidden className="inline-block h-px w-3 bg-overcast/70 align-middle" />;
}

function Mark({ cell }: { cell: Cell }) {
  if (typeof cell === "object") return <span className="text-[14px] font-medium text-ink">{cell.text}</span>;
  const text = { yes: "Included", option: "Available on request", no: "Not in this plan" }[cell];
  return (
    <>
      {cell === "yes" ? <Node /> : cell === "option" ? <Ring /> : <Absent />}
      <span className="sr-only">{text}</span>
    </>
  );
}

export default function PricingCompare() {
  return (
    <section id="compare" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="Compare plans"
          setup="Side by side."
          payoff="What each plan carries."
          lede="Every module is in every plan. The rows that change are how much each one carries, where Akashic runs and how it recovers."
        >
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="inline-flex items-center gap-2"><Node /> Included</span>
            <span className="inline-flex items-center gap-2"><Ring /> Available on request</span>
            <span className="inline-flex items-center gap-2"><Absent /> Not in the plan</span>
          </p>
        </SectionHeader>

        <ScrollReveal delay={80}>
          {/* contain:paint keeps the table inside its scroller. Without it the
              sticky first column leaks the 760px table width into the page's
              scrollable area on phones (718px at 390), which widens the layout
              viewport and pushes fixed UI such as RegionSuggest off screen. */}
          <div className="mt-12 overflow-x-auto [contain:paint] lg:mt-16">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">Akashic plans compared</caption>
              <thead>
                <tr className="border-b border-ink/80">
                  <th scope="col" className="sticky left-0 z-10 w-[34%] bg-background py-4 pr-6 font-mono text-[11px] font-normal uppercase tracking-eyebrow text-overcast">
                    Plan
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan.id} scope="col" className="w-[16.5%] py-4 text-center text-[17px] font-semibold tracking-[-0.01em] text-ink">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARE.map((group) => (
                <tbody key={group.heading}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={5}
                      className="sticky left-0 bg-background pb-2 pt-8 font-mono text-[11px] font-normal uppercase tracking-eyebrow text-overcast"
                    >
                      {group.heading}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-t border-dashed border-lineSoft">
                      <th scope="row" className="sticky left-0 z-10 bg-background py-3.5 pr-6 text-[15px] font-normal leading-snug text-ink">
                        {row.label}
                        {row.preview && <PreviewTag className="ml-2 align-[2px]" />}
                      </th>
                      {row.cells.map((cell, k) => (
                        <td key={PLANS[k].id} className="py-3.5 text-center">
                          <Mark cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-6 max-w-[46em] text-pretty text-[14px] leading-relaxed text-secondary-text">{COMPARE_NOTE}</p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
