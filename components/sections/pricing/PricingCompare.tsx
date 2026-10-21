"use client";

/*
 * [02] Compare plans: one grid, grouped by module (Data Pipelines, Master
 * Data, Warehouse, Business Intelligence, Governance), then deployment and
 * add-ons. The limits are the pricing workbook's per-organisation figures
 * (content/pages/pricing.ts).
 *
 * Redesigned 21 Oct 2026 with [01]:
 * - from lg the plan row pins under the site header while the grid
 *   scrolls, priced on the term chosen in [01] (PricingTerm), so a reader
 *   deep in the Governance rows still knows which column is which;
 * - Enterprise is one tinted column top to bottom, the same ground as its
 *   column in [01], and says "Sized to your estate" once per module group
 *   instead of "Custom" on every row;
 * - a row lights on hover so a figure can be read across.
 * Marks are drawn, never characters (Rule 2: no checkmarks): a blue node
 * for included, a hollow ring for available on request, a short hairline
 * for not in the plan, the /akashic [11] language. Below lg the grid
 * scrolls sideways with the row labels pinned.
 */

import { useEffect, useRef, type RefObject } from "react";
import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Cell, PlaceholderPrices, Plan, PricingPage } from "@/content/pages/pricing";
import { planPrice } from "@/lib/pricing";
import { usePricingTerm } from "./PricingTerm";

function Node() {
  return <span aria-hidden className="inline-block h-[9px] w-[9px] rounded-full bg-blue align-middle" />;
}

function Ring() {
  return <span aria-hidden className="inline-block h-[9px] w-[9px] rounded-full border-[1.5px] border-blue bg-background align-middle" />;
}

function Absent() {
  return <span aria-hidden className="inline-block h-px w-3 bg-default-stroke align-middle" />;
}

function Mark({ cell, labels }: { cell: Cell; labels: Record<"yes" | "option" | "no", string> }) {
  if (typeof cell === "object") return <span className="text-[14px] text-ink">{cell.text}</span>;
  return (
    <>
      {cell === "yes" ? <Node /> : cell === "option" ? <Ring /> : <Absent />}
      <span className="sr-only">{labels[cell]}</span>
    </>
  );
}

/* The pinned row's offset: the site header's bottom edge while it shows,
   0 while it is hidden, read on scroll only while the grid is on screen. */
function usePinnedTop(section: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = section.current;
    const header = document.querySelector<HTMLElement>("header.sticky");
    if (!node || !header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      node.style.setProperty("--pin-top", `${Math.max(0, Math.round(header.getBoundingClientRect().bottom))}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const visible = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        header.addEventListener("transitionend", schedule);
      } else {
        window.removeEventListener("scroll", schedule);
        header.removeEventListener("transitionend", schedule);
      }
    });
    visible.observe(node);
    return () => {
      visible.disconnect();
      window.removeEventListener("scroll", schedule);
      header.removeEventListener("transitionend", schedule);
      cancelAnimationFrame(frame);
    };
  }, [section]);
}

const ENTERPRISE = "bg-primary-bg";
const RULE = "border-t border-dashed border-lineSoft py-3.5 transition-colors duration-150";
const CELL = `${RULE} text-center`;

export default function PricingCompare({
  content,
  plans: PLANS,
  prices,
  labels,
}: {
  content: PricingPage["compare"];
  plans: Plan[];
  prices: PlaceholderPrices;
  labels: Pick<PricingPage["planCopy"], "from">;
}) {
  const { term } = usePricingTerm();
  const sectionRef = useRef<HTMLElement>(null);
  usePinnedTop(sectionRef);
  const markLabels = { yes: content.legend.yes, option: content.legend.option, no: content.absentLabel };
  const saas = PLANS.slice(0, 3);
  const enterprise = PLANS[3];

  return (
    <section ref={sectionRef} id="compare" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={content.num} label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede}>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="inline-flex items-center gap-2"><Node /> {content.legend.yes}</span>
            <span className="inline-flex items-center gap-2"><Ring /> {content.legend.option}</span>
            <span className="inline-flex items-center gap-2"><Absent /> {content.legend.no}</span>
          </p>
          <p aria-hidden className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-blue lg:hidden">{content.scrollHint} &rarr;</p>
        </SectionHeader>

        <ScrollReveal delay={80}>
          {/* contain:paint keeps the table inside its scroller on phones;
              from lg the table fits, so the scroller steps aside and the
              plan row can pin to the window. */}
          <div className="mt-12 overflow-x-auto [contain:paint] lg:mt-14 lg:overflow-visible lg:[contain:none]">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
              <caption className="sr-only">{content.caption}</caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-20 w-[150px] border-b border-ink/80 bg-background py-4 pr-4 align-bottom font-mono text-[11px] font-normal uppercase tracking-eyebrow text-overcast sm:w-[36%] sm:pr-6 lg:top-[var(--pin-top,0px)]">
                    {content.planHeader}
                  </th>
                  {PLANS.map((plan) => {
                    const isEnterprise = plan.id === "enterprise";
                    return (
                      <th
                        key={plan.id}
                        scope="col"
                        className={`z-10 w-[16%] border-b border-ink/80 px-2 py-4 text-center align-bottom lg:sticky lg:top-[var(--pin-top,0px)] ${isEnterprise ? `${ENTERPRISE} rounded-t-tile` : "bg-background"}`}
                      >
                        <span className="block text-[16px] font-semibold tracking-[-0.01em] text-ink">{plan.name}</span>
                        <span className="mt-1 block text-[12.5px] font-normal tabular-nums text-secondary-text">
                          {isEnterprise && `${labels.from} `}
                          {planPrice(prices, plan.id, term)}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {content.groups.map((group) => (
                <tbody key={group.heading}>
                  <tr>
                    <th scope="colgroup" colSpan={4} className="sticky left-0 bg-background pb-2.5 pt-9 font-mono text-[11px] font-normal uppercase tracking-eyebrow text-inkSoft">
                      {group.heading}
                    </th>
                    <td aria-hidden className={ENTERPRISE} />
                  </tr>
                  {group.rows.map((row, r) => (
                    <tr key={row.label} className="group">
                      <th scope="row" className={`sticky left-0 z-10 bg-background pr-4 text-left text-[14px] font-normal sm:pr-6 sm:text-[15px] leading-snug text-ink group-hover:bg-primary-bg ${RULE}`}>
                        {row.label}
                        {row.preview && <PreviewTag className="ml-2 align-[2px]" />}
                      </th>
                      {row.cells.map((cell, k) => (
                        <td key={saas[k].id} className={`${CELL} tabular-nums group-hover:bg-primary-bg`}>
                          <Mark cell={cell} labels={markLabels} />
                        </td>
                      ))}
                      {group.enterprise ? (
                        r === 0 && (
                          <td rowSpan={group.rows.length} className={`${ENTERPRISE} border-t border-dashed border-lineSoft px-3 py-3.5 text-center align-middle`}>
                            <span className="sr-only">{enterprise.name}: </span>
                            <span className="text-balance text-[13.5px] font-medium leading-snug text-ink">{group.enterprise}</span>
                          </td>
                        )
                      ) : (
                        <td className={`${CELL} ${ENTERPRISE} group-hover:bg-tertiary-bg`}>
                          {row.enterprise && <Mark cell={row.enterprise} labels={markLabels} />}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <td colSpan={4} />
                  <td aria-hidden className={`${ENTERPRISE} h-4 rounded-b-tile`} />
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-6 max-w-[46em] text-pretty text-[14px] leading-relaxed text-secondary-text">{content.note}</p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
