import { Fragment, type CSSProperties } from "react";
import type { EisMonday } from "@/content/pages/solutions-eis";
import { cx } from "@/shared/utils/cx";
import styles from "./MondayInboxMockup.module.scss";

/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI: THE DECISIONS INBOX. Section [04] Your Monday.
 * The three decisions that need a leader this week, ranked by money at
 * stake, as the "Monday, 8 a.m." teaser video shows them; the first one
 * open: what the agents found, the proposed action and its impact. Teases,
 * never reveals: no app chrome, no filters, no workflow trail (that story
 * belongs to [06]), three rows at native size. The controls are drawn, not
 * live, so they are spans. Each row's header carries `data-wire-to` (its
 * rank) so the field's changes can flow into it.
 * --------------------------------------------------------------------- */

export interface MondayInboxMockupProps {
  /** The inbox's accessible name: it is a sample, not live data. */
  label: string;
  columns: EisMonday["columns"];
  decisions: EisMonday["decisions"];
  open: EisMonday["open"];
}

export function MondayInboxMockup({ label, columns, decisions, open }: MondayInboxMockupProps) {
  const most = Math.max(...decisions.map((d) => d.amount));
  return (
    <figure className={styles.inbox}>
      <figcaption className={styles.srOnly}>{label}</figcaption>
      <div className={styles.head} aria-hidden="true">
        <span>{columns.rank}</span>
        <span className={styles.headDue}>{columns.due}</span>
      </div>
      <ol className={styles.list}>
        {decisions.map((decision, i) => (
          <li
            key={decision.title}
            className={cx(styles.item, i === 0 && styles.itemOpen)}
            /* Rank order still arrives one by one, but the first row is in
               within 0.3s (critique, 5 Nov 2026: at 0.9s a fast scroller
               saw an empty inbox). */
            style={{ ["--d" as string]: `${0.3 + i * 0.12}s` } as CSSProperties}
          >
            <div className={styles.row} data-wire-to={i}>
              <span className={styles.rank} aria-hidden="true">
                {i + 1}
              </span>
              <div className={styles.what}>
                <p className={styles.path}>
                  {decision.path.map((step, j) => (
                    <Fragment key={step}>
                      {j > 0 && <span aria-hidden="true"> › </span>}
                      {step}
                    </Fragment>
                  ))}
                </p>
                <p className={styles.title}>{decision.title}</p>
              </div>
              <div className={styles.stake}>
                <span className={styles.stakeValue}>{decision.stake}</span>
                <span className={styles.bar} aria-hidden="true">
                  <span style={{ ["--w" as string]: `${(decision.amount / most) * 100}%` } as CSSProperties} />
                </span>
              </div>
              <p className={styles.due}>
                <span className={styles.dueLabel}>{columns.due} </span>
                {decision.due}
              </p>
            </div>

            {i === 0 && (
              <div className={styles.open}>
                <div className={styles.facts}>
                  <p className={styles.label}>
                    {open.factsLabel}
                    <span className={styles.found}>{open.found}</span>
                  </p>
                  <ul className={styles.factList}>
                    {open.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.proposal}>
                  <p className={styles.label}>{open.actionLabel}</p>
                  <p className={styles.action}>{open.action}</p>
                  <p className={styles.impact}>{open.impact}</p>
                  <div className={styles.controls} aria-hidden="true">
                    <span className={styles.approve}>{open.actions.primary}</span>
                    {open.actions.others.map((control) => (
                      <span key={control} className={styles.control}>
                        {control}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
