/**
 * SIMULATED PRODUCT UI: the structure-led homepage teasers (Master Data,
 * Governance, Ask Akashic, Data Pipelines). Grammar and demo figures in the
 * header of HomeModuleIllustrationsMockup.
 */
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./HomeModuleIllustrationsMockup.module.scss";

/* Source systems keep one colour wherever they appear (Rule 8: SVG hex). */
const SRC = { salesforce: "#2A9BE0", netsuite: "#7C5CFC", plan: "#E0A93B" };

/* ---------------------------------------------------------------- */
/* Master Data: the organisation as a hierarchy                      */
/* ---------------------------------------------------------------- */
export function MasterDataTeaser() {
  const regions = [
    { name: "North region", detail: "Stores · Distribution", on: true },
    { name: "West region", on: false },
  ];
  return (
    <div>
      <div className={styles.orgRow}>
        <span className={styles.orgIconBox}>
          <svg viewBox="0 0 16 16" className={styles.orgIcon} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" aria-hidden>
            <path d="M3 14V3.5L8 2l5 1.5V14M1.5 14h13M6.5 14v-3h3v3" />
          </svg>
        </span>
        <span className={styles.orgName}>Your organisation</span>
      </div>
      <div className={styles.tree}>
        {regions.map((r) => (
          <div key={r.name} className={styles.treeItem}>
            <span className={cx(styles.branch, r.on ? styles.branchOn : styles.branchOff)} />
            <div className={cx(styles.region, r.on && styles.regionOn)}>
              <div className={styles.regionHead}>
                <span className={cx(styles.regionName, r.on ? styles.regionNameOn : styles.regionNameOff)}>{r.name}</span>
                {r.on && <span className={styles.dot} />}
              </div>
              {r.detail && <p className={cx(styles.regionDetail, styles.tertiary, styles.mono)}>{r.detail}</p>}
            </div>
          </div>
        ))}
        <div className={styles.treeItem}>
          <span className={cx(styles.branch, styles.branchOff)} />
          <span className={styles.moreRegions}>3 more regions</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Governance: one report, a different view for each role            */
/* ---------------------------------------------------------------- */
export function GovernanceTeaser() {
  const roles = [
    { role: "Finance", scope: "All regions", open: true },
    { role: "Regional head", scope: "Own region", open: true },
    { role: "Analyst", scope: "Tax ID masked", open: false },
  ];
  return (
    <div className={styles.roles}>
      {roles.map((r) => (
        <div key={r.role} className={styles.roleRow}>
          <span className={styles.roleName}>{r.role}</span>
          <span className={cx(styles.scope, styles.mono, r.open ? styles.scopeOpen : styles.tertiary)}>
            {!r.open && (
              <svg viewBox="0 0 12 12" className={styles.lock} fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
                <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
              </svg>
            )}
            {r.scope}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Ask Akashic: a plain question, a cited answer                     */
/* ---------------------------------------------------------------- */
export function AskTeaser() {
  return (
    <div>
      <p className={styles.question}>
        Which channel is growing fastest?
      </p>
      <div className={styles.answerRow}>
        <span className={styles.answerMark}>
          <span className={styles.dot} />
        </span>
        <p className={styles.answer}>
          Online, up <span className={styles.answerFigure}>18%</span> this quarter. Now 22% of revenue.
          <span className={styles.cite}>[1]</span>
        </p>
      </div>
      <p className={cx(styles.footnote, styles.tertiary, styles.mono)}>[1] Sales records</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Data Pipelines: three systems arrive as one view                  */
/* ---------------------------------------------------------------- */
const LANES = [
  { y: 10, name: "Salesforce", colour: SRC.salesforce },
  { y: 36, name: "NetSuite", colour: SRC.netsuite },
  { y: 62, name: "Sales plan", colour: SRC.plan },
];
const JOIN = { x: 168, y: 36 };
const lane = (y: number) => (y === JOIN.y ? `M 78 ${y} H ${JOIN.x}` : `M 78 ${y} H 112 C 142 ${y}, 140 ${JOIN.y}, ${JOIN.x} ${JOIN.y}`);

export function PipelinesTeaser() {
  const reduced = usePrefersReducedMotion();
  return (
    <div>
      <svg viewBox="0 0 208 72" className={cx(styles.lanes, styles.chart)} fill="none" aria-hidden>
        {LANES.map((l) => (
          <g key={l.name}>
            <circle cx={4} cy={l.y} r={3} fill={l.colour} />
            <text x={13} y={l.y + 3.8} className={styles.laneName}>
              {l.name}
            </text>
            <path d={lane(l.y)} stroke={l.colour} strokeOpacity={0.55} strokeWidth={1.2} />
          </g>
        ))}
        <path d={`M ${JOIN.x} ${JOIN.y} H 208`} className={styles.strokeBlue} strokeWidth={1.4} />
        <circle cx={JOIN.x} cy={JOIN.y} r={7} className={styles.strokeBlueBorder} />
        <circle cx={JOIN.x} cy={JOIN.y} r={3} className={styles.fillBlue} />
        {/* Records travel; the global gate rests SMIL off screen (Rule 6a). */}
        {!reduced &&
          LANES.map((l, i) => (
            <circle key={l.name} r={2} fill={l.colour}>
              <animateMotion dur="2.6s" begin={`-${i * 0.85}s`} repeatCount="indefinite" path={lane(l.y)} />
            </circle>
          ))}
      </svg>
      <div className={styles.pipeFoot}>
        <span className={styles.orders}>
          <span className={styles.ordersCount}>82,401</span> orders
        </span>
        <span className={cx(styles.tertiary, styles.mono)}>0 rejected</span>
      </div>
    </div>
  );
}
