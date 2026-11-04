import type { EisPage } from "@/content/pages/solutions-eis";
import { PreviewTag, ScrollReveal, ScrollRevealRail, SectionCoda, SectionHeader } from "@/shared/components/ui";
import { MondayInboxMockup } from "../../mockups/MondayInboxMockup";
import { MondayWires } from "./MondayWires";
import styles from "./EisMonday.module.scss";

export interface EisMondayProps {
  content: EisPage["monday"];
  /** The section's place in the page's order. */
  num: string;
}

/* The field: one dot per change since Friday, 62 to a row, in one band per
   live system, drawn as a pattern so each band is one rectangle, not
   hundreds of circles. */
const COLS = 62;
const PITCH = 10;

/* For each decision (in rank order), one change in each band its facts
   come from: [column, row within that band]. The decisions' `bands` name
   the bands; these place the dots. */
const PICKS: [number, number][][] = [
  [
    [46, 3],
    [40, 9],
    [49, 2],
  ],
  [
    [25, 6],
    [21, 4],
    [30, 3],
  ],
  [
    [55, 5],
    [57, 11],
    [52, 7],
  ],
];

/*
 * [your-monday] Section [04] (5 Nov 2026, docs/EIS_PAGE_SCRIPT.md;
 * reworked after its critique the same day). The leader's week in one
 * picture: every change since Friday as a field, one band per live system;
 * each decision gathers one change from each of the three systems its facts
 * come from, and from xl those three flow together into its row in the
 * ranked inbox. Agents are in preview, so the eyebrow carries PreviewTag.
 * The old `#the-loop` anchor stays as an alias.
 */
export function EisMonday({ content, num }: EisMondayProps) {
  const { field, decisions } = content;
  const total = field.bands.reduce((sum, band) => sum + band.rows * COLS, 0);

  return (
    <section id="your-monday" className={styles.section}>
      <span id="the-loop" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label="YOUR MONDAY"
          tag={<PreviewTag />}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <MondayWires className={styles.board}>
            <div className={styles.field}>
              <p className={styles.legend}>
                <span>{field.legend}</span>
                <span className={styles.legendTotal}>{total.toLocaleString("en-GB")}</span>
              </p>
              {field.bands.map((band, b) => (
                <div key={band.system} className={styles.band}>
                  <p className={styles.bandLabel}>
                    {band.system}
                    <span className={styles.bandCount}>{(band.rows * COLS).toLocaleString("en-GB")}</span>
                  </p>
                  <svg
                    className={styles.grid}
                    viewBox={`0 0 ${COLS * PITCH} ${band.rows * PITCH}`}
                    aria-hidden="true"
                    focusable="false"
                  >
                    <defs>
                      <pattern id={`eis-monday-band-${b}`} width={PITCH} height={PITCH} patternUnits="userSpaceOnUse">
                        <circle cx={PITCH / 2} cy={PITCH / 2} r={2} className={styles.change} />
                      </pattern>
                    </defs>
                    <rect width={COLS * PITCH} height={band.rows * PITCH} fill={`url(#eis-monday-band-${b})`} />
                    {decisions.flatMap((decision, d) =>
                      decision.bands.map((bandIndex, k) => {
                        if (bandIndex !== b) return null;
                        const [col, row] = PICKS[d][k];
                        const cx = col * PITCH + PITCH / 2;
                        const cy = Math.min(row, band.rows - 1) * PITCH + PITCH / 2;
                        return (
                          <g key={`${d}-${k}`} className={styles.pick} style={{ ["--d" as string]: `${0.2 + d * 0.15}s` }}>
                            <circle cx={cx} cy={cy} r={7} className={styles.pickRing} />
                            <circle cx={cx} cy={cy} r={3.6} className={styles.pickDot} data-wire-from={d} />
                          </g>
                        );
                      }),
                    )}
                  </svg>
                </div>
              ))}
            </div>

            <div className={styles.inbox}>
              <MondayInboxMockup
                label={content.inboxLabel}
                columns={content.columns}
                decisions={decisions}
                open={content.open}
              />
            </div>
          </MondayWires>
        </ScrollReveal>

        <SectionCoda lead={content.coda.lead} payoff={content.coda.payoff} rule />
      </ScrollRevealRail>
    </section>
  );
}
