/* ------------------------------------------------------------------------
 * ILLUSTRATIVE DIAGRAM — the model behind every EIS screen, stated once.
 *
 * [one-picture] claims "the columns rebuild, not just the numbers". A live
 * switcher cannot prove that on its own: the reader has to click, then
 * remember what the previous columns said. This shows all four industries
 * at once, so the claim is settled before anybody touches a control.
 *
 * THE PROOF IS THE REPETITION. The two right-hand columns say the same two
 * words down every row, and the two left-hand columns say something
 * different in each. That is the product's whole structural argument (one
 * governed spine, industry-shaped surfaces on top) rendered as a shape the
 * eye gets in about a second, without reading a label.
 *
 * Driven from lib/eisDomains.ts so it cannot drift from the screens.
 * --------------------------------------------------------------------- */

import { DOMAINS } from "@/lib/eisDomains";

/* Column headers are the ROLE each pillar plays, not its industry name:
   the industry names are the cells. */
const ROLES = ["The unit you run", "What it produces", "The people", "The money"];

export default function EisSchemaMatrixMockup() {
  return (
    <div className="overflow-hidden rounded-outer border border-eis-line bg-white">
      {/* Group headers. Colour encodes the category, and the two groups get
          different weights because they are not equally interesting. */}
      <div className="grid grid-cols-[1.15fr_1fr_1fr] border-b border-eis-line sm:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
        <span className="hidden sm:block" />
        <span className="col-span-2 border-l border-eis-line bg-blue-subtle/60 px-4 py-2.5 text-[9.5px] font-bold uppercase tracking-[0.11em] text-blue">
          Shaped by your industry
        </span>
        <span className="col-span-2 border-l border-eis-line px-4 py-2.5 text-[9.5px] font-bold uppercase tracking-[0.11em] text-eis-caption">
          Shared by every organisation
        </span>
      </div>

      {/* Role row. */}
      <div className="hidden border-b border-eis-line bg-primary-bg sm:grid sm:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
        <span className="px-4 py-2 text-[9.5px] font-bold uppercase tracking-[0.09em] text-eis-caption">
          Industry
        </span>
        {ROLES.map((r, i) => (
          <span
            key={r}
            className={`border-l border-eis-line px-4 py-2 text-[9.5px] font-bold uppercase tracking-[0.09em] ${
              i < 2 ? "text-blue" : "text-eis-caption"
            }`}
          >
            {r}
          </span>
        ))}
      </div>

      <div className="divide-y divide-eis-line">
        {DOMAINS.map((d) => (
          <div
            key={d.key}
            className="grid grid-cols-2 sm:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]"
          >
            <span className="col-span-2 px-4 pb-1 pt-3 text-[13px] font-medium text-eis-ink sm:col-span-1 sm:py-3.5 sm:pb-3.5">
              {d.tab}
            </span>
            {d.pillars.map((p, i) => (
              <span
                key={p.key}
                className={`flex flex-col justify-center px-4 pb-3 sm:border-l sm:border-eis-line sm:py-3.5 ${
                  i < 2 ? "sm:bg-blue-subtle/30" : ""
                }`}
              >
                <span
                  className={`text-[13px] font-medium leading-tight ${
                    i < 2 ? "text-eis-ink" : "text-eis-body"
                  }`}
                >
                  {p.label}
                </span>
                <span className="mt-0.5 text-[11px] leading-tight text-eis-caption">
                  {p.value}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
