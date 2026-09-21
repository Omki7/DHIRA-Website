/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not live software, not real customer data.
 *
 * The first screen each executive lens opens on, all three at once.
 *
 * WHY SIDE BY SIDE. The claim is "same record, same governance, different
 * first screen". That is a claim about a DIFFERENCE, and a role switcher
 * cannot show a difference: the reader sees one screen, clicks, and has to
 * remember the previous one to notice anything changed. Printed together,
 * the argument settles itself. The three questions differ, the three sets
 * of figures differ, the three action sets differ, and the governance line
 * under all of them is identical.
 *
 * The identical footer is the point, not filler. It is the only element
 * repeated verbatim across the three panels, so the eye reads "one system,
 * three surfaces" without being told.
 * --------------------------------------------------------------------- */

export type LensKey = "chief-executive" | "finance" | "operations";

type Lens = {
  key: LensKey;
  role: string;
  initials: string;
  question: string;
  /* Three figures, because three is what fits before a screen becomes a
     report. Each carries the note that makes it actionable. */
  figures: { label: string; value: string; note: string }[];
  decisions: string[];
  /* Why this seat is served these three, in one line. Was section-level
     prose that only ever described the selected role. */
  answersFor: string;
};

export const LENSES: Lens[] = [
  {
    key: "chief-executive",
    role: "Chief executive",
    initials: "CE",
    question: "What could take the firm down, and is the model shifting fast enough?",
    /* The question is existential, so the three figures answer it in that
       order: what is concentrated, how long the firm can fund itself, and
       whether the operating model is improving. */
    figures: [
      { label: "Client concentration", value: "32.4%", note: "Top three clients, board limit 30%" },
      { label: "Cash runway", value: "14 months", note: "At current burn, before new bookings" },
      { label: "Revenue per employee", value: "₹42.8 L", note: "Up 6.2%, the model is shifting" },
    ],
    decisions: ["Escalate", "Approve a renewal", "Hold a key person"],
    answersFor: "Answers for the whole organisation, so the exposure that spans pillars arrives first.",
  },
  {
    key: "finance",
    role: "Chief financial officer",
    initials: "CF",
    question: "What is stuck, and what is compressing?",
    figures: [
      { label: "Unbilled work", value: "₹9.6 Cr", note: "Across 11 active projects" },
      { label: "Days sales outstanding", value: "62 days", note: "Up 7 days this quarter" },
      { label: "Overdue receivables", value: "₹3.1 Cr", note: "4 accounts past 90 days" },
    ],
    decisions: ["Raise the invoice", "Start collection", "Re-forecast"],
    answersFor: "Answers for cash, so every figure traces to the ledger line it came from.",
  },
  {
    key: "operations",
    /* Was "Head of delivery", which only exists in professional services. A
       chief operating officer runs the plant, the store estate, the branch
       network and the project portfolio alike, so the figures are stated in
       terms every one of them uses. */
    role: "Chief operating officer",
    initials: "CO",
    question: "What has stopped, and are the right people on what matters?",
    figures: [
      { label: "Units running red", value: "4", note: "Of 12 plants, 2 shifts down" },
      { label: "Single points of failure", value: "7", note: "One certified person each" },
      { label: "Idle capacity", value: "38 days", note: "Median ageing, up from 24" },
    ],
    decisions: ["Approve the change", "Redeploy", "Name a successor"],
    answersFor: "Answers for whether the thing runs, in whatever the operating unit happens to be.",
  },
];

function LensPanel({ lens }: { lens: Lens }) {
  return (
    /* `primary-bg`, not white: this section sits on the white page ground,
       where a white panel separates from it by a hairline alone and the three
       seats stopped reading as three panels. Same inset treatment the
       evidence panels in [capabilities] and [the-loop] use. */
    <div className="flex h-full flex-col rounded-outer border border-eis-line bg-primary-bg p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-tile bg-eis-ink text-[10px] font-medium text-white">
          {lens.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium text-eis-ink">
            {lens.role}
          </span>
          <span className="block text-[9px] uppercase tracking-eyebrow text-eis-caption">
            Operating loop, active surface
          </span>
        </span>
      </div>

      <p className="mt-3.5 text-[14px] leading-snug tracking-tight text-eis-ink">
        &ldquo;{lens.question}&rdquo;
      </p>

      <div className="mt-3.5 space-y-2">
        {lens.figures.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline justify-between gap-3 border-b border-card-divide pb-2 last:border-0 last:pb-0"
          >
            <span className="min-w-0">
              <span className="block text-[9px] font-medium uppercase tracking-eyebrow text-eis-caption">
                {f.label}
              </span>
              <span className="mt-0.5 block truncate text-[10.5px] text-eis-body">
                {f.note}
              </span>
            </span>
            <span className="shrink-0 text-[16px] font-medium tracking-tight text-eis-ink">
              {f.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {lens.decisions.map((d) => (
          <span
            key={d}
            className="rounded-chip border border-eis-line bg-white px-2 py-1 text-[10px] font-medium text-eis-ink"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Identical on every lens. That is the argument, so it is pinned to
          the bottom of all three panels and lines up across them. */}
      <p className="mt-auto border-t border-card-divide pt-2.5 text-[9px] uppercase tracking-eyebrow text-eis-caption">
        Same record &middot; same governance &middot; different first screen
      </p>
    </div>
  );
}

export default function EisLensCompareMockup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {LENSES.map((l) => (
        <div key={l.key} className="flex flex-col">
          <LensPanel lens={l} />
          <p className="mt-3 px-1 text-[13px] leading-[1.45] text-eis-caption">
            {l.answersFor}
          </p>
        </div>
      ))}
    </div>
  );
}
