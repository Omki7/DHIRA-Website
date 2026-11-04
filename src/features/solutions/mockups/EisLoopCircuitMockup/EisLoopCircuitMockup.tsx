/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not live software, not real customer data.
 *
 * [the-loop]'s five stations, and the return leg that makes them a loop.
 *
 * WHY THIS IS STATIC. The previous build was a tabbed simulator: five
 * stations, one visible, four behind tabs an executive was never going to
 * click. A section whose entire claim is "the loop closes" cannot hide four
 * fifths of the loop. Everything is on screen at once.
 *
 * WHY THE RETURN LEG IS DRAWN. Signal to record is a line, not a loop. What
 * makes it a loop is that the write lands back in the source system, so the
 * NEXT morning's brief reads the changed world. That leg is the product's
 * actual claim and every competitor's diagram stops one station short of
 * it, so here it is the only dashed, accented element in the picture.
 *
 * The scenario station is content the page had nowhere else: options,
 * costed, before the decision. Without it the loop reads as "alert, then
 * obey", which is not how a chief executive decides anything.
 *
 * Severity colours come from the shared diagram palette: pink for act now,
 * gold for watch, green for clear.
 * --------------------------------------------------------------------- */

import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./EisLoopCircuitMockup.module.scss";

/* Stacks on a phone. Side by side, this truncated
   "MaintenanceOrder.PlannedStart" and the action names, and unlike the
   simulated app screens (where truncation is honest, because a real app
   truncates) this is a diagram, where losing the value loses the point. */
function Field({ k, v, mono = true }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldKey}>{k}</span>
      <span className={cx(styles.fieldValue, mono ? styles.fieldMono : styles.fieldPlain)}>{v}</span>
    </div>
  );
}

const FEED = [
  { system: "ERPNext Accounts", note: "Invoice 74 days overdue ($118K)", dot: styles.dotHigh },
  { system: "CRM / Selling", note: "VP Claims departed; new sponsor unengaged", dot: styles.dotWatch },
  { system: "Customer Health", note: "NPS score dropped from 48 to 12", dot: styles.dotPurple },
];

const OPTIONS = [
  { opt: "Wait for standard dunning", cost: "–$180K ARR", note: "Churn risk 78% · renewal slips", bad: true },
  { opt: "Executive sponsor outreach", cost: "Retains $180K", note: "Collects $118K overdue in 14d", bad: false },
];

const RECORD = [
  ["09:14", "Consent and policy verified (G1)"],
  ["09:14", "Approved by Rupa S (G3)"],
  ["09:15", "Written to ERPNext; task in AWM (O1)"],
];

const STATIONS: { n: string; name: string; claim: string; art: ReactNode }[] = [
  {
    n: "01",
    name: "Signal",
    claim: "Three systems flag one account before the quarter is exposed.",
    art: (
      <div className={styles.list}>
        {FEED.map((f) => (
          <div key={f.system} className={styles.feedRow}>
            <span className={cx(styles.dot, styles.feedDot, f.dot)} />
            <span className={styles.feedText}>
              <span className={styles.feedSystem}>{f.system}</span>
              <span className={styles.feedNote}>{f.note}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "02",
    name: "Question",
    claim: "The executive asks in natural English. The answer cites the exact ERP doctype.",
    art: (
      <div>
        <p className={styles.quote}>
          &ldquo;What is our revenue exposure if Northwind Insurance churns at renewal?&rdquo;
        </p>
        <div className={cx(styles.fields, styles.fieldsSpaced)}>
          <Field k="Account" v="Northwind Insurance · SOW-2024-03" />
          <Field k="Defined as" v="$180K ARR · contract expiry 31 Dec" />
        </div>
      </div>
    ),
  },
  {
    n: "03",
    name: "Scenario",
    claim: "Both options costed, so the decision is a strategic choice, not an instruction.",
    art: (
      <div className={styles.list}>
        {OPTIONS.map((o) => (
          <div key={o.opt} className={cx(styles.option, o.bad ? styles.optionBad : styles.optionGood)}>
            <span className={styles.optionText}>
              <span className={styles.optionName}>{o.opt}</span>
              <span className={styles.optionNote}>{o.note}</span>
            </span>
            <span className={cx(styles.optionCost, o.bad ? styles.costBad : styles.costGood)}>{o.cost}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "04",
    name: "Decision",
    claim: "A scoped action with verified impact and a named executive approver.",
    art: (
      <div className={styles.fields}>
        <Field k="Action" v="Schedule sponsor call · dispatch aged AR" mono={false} />
        <Field k="Target" v="ERPNext CRM & Accounts via REST API" />
        <Field k="Approver" v="Rupa S (Solutions & Sales lead)" mono={false} />
      </div>
    ),
  },
  {
    n: "05",
    name: "Record",
    claim: "Written to ERPNext, verified on next CDC cycle, logged in immutable audit.",
    art: (
      <div className={styles.list}>
        {RECORD.map(([t, what]) => (
          <div key={t + what} className={styles.recordRow}>
            <span className={styles.recordTime}>{t}</span>
            <span className={styles.recordWhat}>{what}</span>
            <span className={cx(styles.dot, styles.dotClear)} />
          </div>
        ))}
      </div>
    ),
  },
];

export function EisLoopCircuitMockup() {
  return (
    <div className={styles.root}>
      {/* The padding leaves the gutter the return leg is drawn in. */}
      <div className={styles.track}>
        {/* THE RETURN LEG. A bracket up the left-hand gutter, from the record
            back into the signal. Dashed and accented because it is the one
            element here that a reporting tool does not have. */}
        <div className={styles.leg} aria-hidden />
        <svg className={styles.legArrow} width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path
            d="M1 1l4 4-4 4"
            fill="none"
            stroke="rgb(var(--blue))"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {STATIONS.map((s, i) => {
          const last = i === STATIONS.length - 1;
          return (
            <div key={s.n} className={styles.station}>
              {/* The forward rail between stations. */}
              {!last && <span className={styles.rail} aria-hidden />}

              <div className={cx(styles.stationRow, !last && styles.stationRowSpaced)}>
                <span className={styles.node}>{s.n}</span>
                <div className={styles.stationBody}>
                  <div className={styles.stationText}>
                    <h4 className={styles.stationName}>{s.name}</h4>
                    <p className={styles.stationClaim}>{s.claim}</p>
                  </div>
                  <div className={styles.art}>{s.art}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Where the leg lands, said in words. */}
        <div className={styles.coda}>
          <span className={styles.codaSpacer} />
          <p className={styles.codaText}>
            <span className={styles.codaLead}>The leg that closes it.</span> SAP PM now holds the new window, so
            tomorrow&rsquo;s 06:00 brief opens on a plant that is no longer stopping. Nothing was rekeyed, and the
            whole thing is in the record.
          </p>
        </div>
      </div>
    </div>
  );
}
