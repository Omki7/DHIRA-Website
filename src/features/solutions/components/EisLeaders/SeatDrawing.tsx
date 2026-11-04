import type { EisLeaderSeat } from "@/content/pages/solutions-eis";
import styles from "./EisLeaders.module.scss";

/*
 * One hairline drawing per seat (200 by 56): the picture of its answer in
 * shapes a leader already reads. Blue is the answer; everything else is
 * the line colour. Decorative: the answer is in the text beside it.
 */

const W = 200;
const H = 56;

function Forecast() {
  return (
    <>
      <path d="M4 44 L196 22" className={styles.planLine} />
      <path d="M4 46 C60 42, 110 30, 196 12" className={styles.answerLine} />
      <circle cx="196" cy="12" r="3.5" className={styles.answerDot} />
      <path d="M190 22 L190 13" className={styles.gap} />
    </>
  );
}

/* Receivables by age: current, then 1 to 30, 31 to 60 and over 60 days;
   everything overdue in blue. */
function Ageing() {
  const bars = [34, 24, 15, 19];
  return (
    <>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={16 + i * 46}
          y={H - 4 - h}
          width={30}
          height={h}
          rx={2}
          className={i >= 1 ? styles.barAnswer : styles.bar}
        />
      ))}
      <path d={`M4 ${H - 4} L196 ${H - 4}`} className={styles.base} />
    </>
  );
}

/* Accounts up for renewal, by size: one healthy in grey, the two at risk
   in blue, Northwind (the larger) ringed. */
function Renewals() {
  return (
    <>
      <circle cx="44" cy="28" r="20" className={styles.account} />
      <circle cx="112" cy="29" r="16" className={styles.accountAnswer} />
      <circle cx="112" cy="29" r="22" className={styles.ring} />
      <circle cx="168" cy="32" r="9" className={styles.accountAnswer} />
    </>
  );
}

/* Fourteen engagements: nine on track, three to watch, two at risk. */
function Projects() {
  return (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const cls = i >= 12 ? styles.cellAnswer : i >= 9 ? styles.cellWatch : styles.cell;
        return <rect key={i} x={14 + col * 26} y={8 + row * 24} width={18} height={18} rx={3} className={cls} />;
      })}
    </>
  );
}

/* Eight chairs for the kickoff: five from the bench, a gap, three joiners. */
function Seats() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={14 + i * 21 + (i >= 5 ? 14 : 0)} cy={28} r={8} className={i < 5 ? styles.chair : styles.chairAnswer} />
      ))}
    </>
  );
}

const DRAWINGS: Record<EisLeaderSeat["drawing"], () => React.JSX.Element> = {
  forecast: Forecast,
  ageing: Ageing,
  renewals: Renewals,
  projects: Projects,
  seats: Seats,
};

export function SeatDrawing({ kind }: { kind: EisLeaderSeat["drawing"] }) {
  const Drawing = DRAWINGS[kind];
  return (
    <svg className={styles.drawing} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  );
}
