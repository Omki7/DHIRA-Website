import type { CSSProperties } from "react";
import type { EisGapBoard } from "@/content/pages/solutions-eis";
import { DrawnFigure } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./EisGap.module.scss";

/*
 * [02] The decision gap, drawn as swimlanes over one month (4 Nov 2026).
 *
 * Rows are departments; each one's system holds one piece of the same
 * client. The month runs left to right in the time column. Two readings of
 * the same three pieces share the drawing:
 *
 *   Department reporting  grey wires run along each lane to month-end and
 *                         meet in the monthly pack on day 26
 *   Enterprise Intelligence  a blue spine joins the three pieces on day 0
 *                         and lands in one risk in front of leadership
 *
 * The red dashed line is the renewal notice on day 9; the decision runway
 * under it measures the two outcomes. The slow grey path draws first, then
 * the blue one, once, when the board enters view (DrawnFigure); final state
 * under reduced motion and without JS. From xl the board is one grid; below
 * it the lanes stack on the spine and the month becomes a compact runway.
 */

/** Custom properties for computed geometry and stagger (Rule 8). */
const vars = (values: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [`--${key}`, value])) as CSSProperties;

export interface GapBoardProps {
  board: EisGapBoard;
}

export function GapBoard({ board }: GapBoardProps) {
  const x = (day: number) => `${(day / board.horizon) * 100}%`;
  const deadline = x(board.deadline);
  const pack = x(board.pack.day);

  return (
    <figure className={styles.frame} aria-label={board.label}>
      <div className={styles.bar}>
        <p className={styles.client}>
          <span className={styles.clientName}>{board.client}</span>
          <span className={styles.clientNote}>{board.clientNote}</span>
        </p>
        <div className={styles.legend} aria-hidden="true">
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchDepartment)} />
            {board.legend.department}
          </span>
          <span className={styles.key}>
            <span className={cx(styles.swatch, styles.swatchIntelligence)} />
            {board.legend.intelligence}
          </span>
          <span className={styles.scenario}>{board.scenario}</span>
        </div>
      </div>

      <DrawnFigure className={styles.board} threshold={0.3}>
        {/* Grid furniture (xl): column heads, row rules, the leadership band. */}
        <p className={cx(styles.head, styles.headDepartment)} aria-hidden="true">{board.columns.department}</p>
        <p className={cx(styles.head, styles.headPiece)} aria-hidden="true">{board.columns.piece}</p>
        {[2, 3, 4, 5].map((row) => (
          <span key={row} aria-hidden="true" className={cx(styles.rule, row === 5 && styles.ruleStrong)} style={vars({ row })} />
        ))}
        <span aria-hidden="true" className={styles.leadBand} />

        {/* The pieces, and the one risk they add up to. */}
        <div className={styles.stack}>
          {board.lanes.map((lane, i) => (
            <div key={lane.department} className={styles.lane} style={vars({ row: i + 2, d: `${i * 90}ms` })}>
              <p className={styles.laneName}>
                {lane.department}
                <span className={styles.laneNote}>{lane.system}</span>
              </p>
              <div className={styles.piece}>
                <p className={styles.signal}>{lane.signal}</p>
                <p className={styles.seenBy}>{lane.seenBy}</p>
              </div>
            </div>
          ))}
          <div className={cx(styles.lane, styles.leadership)}>
            <p className={styles.laneName}>
              {board.leadership.name}
              <span className={styles.laneNote}>{board.leadership.note}</span>
            </p>
            <div className={styles.risk}>
              <p className={styles.riskStamp}>{board.risk.stamp}</p>
              <p className={styles.riskTitle}>{board.risk.title}</p>
              <p className={styles.riskBody}>{board.risk.body}</p>
            </div>
          </div>
        </div>

        <p className={styles.runwayLabel}>{board.runway.label}</p>

        {/* The month. */}
        <div className={styles.time}>
          {board.ruler.map((tick, i) => (
            <p
              key={tick.day}
              className={cx(
                styles.tick,
                i === board.ruler.length - 1 && styles.tickEnd,
                tick.day / board.horizon > 0.5 && styles.tickRight,
                tick.tone === "deadline" && styles.tickDeadline,
                tick.tone === "muted" && styles.tickMuted,
              )}
              style={vars({ x: x(tick.day) })}
            >
              <span className={styles.tickDay}>{tick.label}</span>
              {tick.note && (
                <>
                  <span className={styles.tickDot} aria-hidden="true"> · </span>
                  <span className={styles.tickNote}>{tick.note}</span>
                </>
              )}
            </p>
          ))}

          <div aria-hidden="true">
            {board.ruler.map((tick) => (
              <span key={tick.day} className={styles.tickMark} style={vars({ x: x(tick.day) })} />
            ))}

            {/* Department reporting: each lane runs on to month-end (xl);
                below xl one wire stands for all three. */}
            {board.lanes.map((lane, i) => (
              <span key={lane.department} className={styles.laneWire} style={vars({ lane: i, x: pack, d: `${200 + i * 90}ms` })} />
            ))}
            <span className={styles.pathWire} style={vars({ x: pack, d: "200ms" })} />
            {board.lanes.map((lane, i) => (
              <span key={lane.department} className={styles.laneEnd} style={vars({ lane: i, x: pack })} />
            ))}
            <span className={styles.collector} style={vars({ x: pack })} />
            <span className={styles.pathEnd} style={vars({ x: pack })} />

            {/* Enterprise Intelligence: one spine through the pieces on day 0. */}
            <span className={styles.spine} />
            {board.lanes.map((lane, i) => (
              <span key={lane.department} className={styles.junction} style={vars({ lane: i })} />
            ))}
            <span className={cx(styles.junction, styles.junctionRisk)} />
            <span className={styles.origin} />

            <span className={styles.deadline} style={vars({ x: deadline })} />
          </div>

          <div className={styles.pack} style={vars({ x: pack })}>
            <p className={styles.packTitle}>{board.pack.title}</p>
            <p className={styles.packNote}>{board.pack.note}</p>
          </div>

          <p className={cx(styles.span, styles.spanAct)} style={vars({ from: "0%", to: deadline })}>
            <span className={styles.spanLabel}>{board.runway.act}</span>
          </p>
          <p className={cx(styles.span, styles.spanLate)} style={vars({ from: deadline, to: pack })}>
            <span className={styles.spanLabel}>{board.runway.late}</span>
          </p>
        </div>
      </DrawnFigure>
    </figure>
  );
}
