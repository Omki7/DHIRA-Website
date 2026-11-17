/**
 * SIMULATED PRODUCT UI: the homepage teasers beyond the platform (17 Nov
 * 2026). Solutions: the three built on Akashic (Enterprise Intelligence,
 * Intelligent Procurement Management System, Akashic Life) and three from
 * /solutions "More solutions" (Demand sensing, Churn and pricing
 * intelligence, Claims and fraud). Services: the three service lines'
 * deliverables (a Strategic Advisory roadmap, an Engineering at Scale build
 * rail, an AI use case with human review) and three ways to work from
 * /services (Embedded engineers, Cloud and infrastructure, Managed Akashic).
 * Same grammar and demo world as the module teasers (header of
 * HomeModuleIllustrationsMockup); no new figures, no clinical values, and
 * wherever AI scores or drafts, a person decides.
 */
import { Fragment } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./HomeModuleIllustrationsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* Enterprise Intelligence: the rolling forecast, revised            */
/* ---------------------------------------------------------------- */
/* Shapes only: history to today, the previous forecast dashed, the revised
   one in blue (the /solutions/enterprise-intelligence drawing, in small). */
const EI = { w: 208, h: 52, today: 100 };
const HISTORY_Y = [46, 42, 44, 39, 40, 35, 36, 32];
const PREVIOUS_Y = [32, 33, 31, 32, 30, 31, 30];
const REVISED_Y = [32, 28, 25, 21, 17, 13, 9];
const hx = (i: number) => (i * EI.today) / (HISTORY_Y.length - 1);
const fx = (j: number) => EI.today + (j * (EI.w - EI.today)) / (REVISED_Y.length - 1);
const line = (ys: number[], x: (i: number) => number) => ys.map((y, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y}`).join(" ");

export function EnterpriseIntelligenceTeaser() {
  const end = REVISED_Y.length - 1;
  return (
    <div>
      <div className={styles.figureRow}>
        <p className={styles.label}>Rolling forecast</p>
        <span className={styles.change}>Revised</span>
      </div>
      <svg viewBox={`0 0 ${EI.w} ${EI.h + 12}`} className={cx(styles.forecast, styles.chart)} fill="none" aria-hidden>
        <path d={line(HISTORY_Y, hx)} className={styles.strokeInk} strokeOpacity={0.7} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
        <path d={line(PREVIOUS_Y, fx)} className={styles.strokeInkSoft} strokeOpacity={0.6} strokeDasharray="2 3" strokeLinecap="round" />
        <path d={line(REVISED_Y, fx)} className={styles.strokeBlue} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        <path d={`M ${EI.today} 4 V ${EI.h}`} className={styles.strokeLine} strokeDasharray="2 2" />
        <circle cx={EI.today} cy={REVISED_Y[0]} r={2.5} className={styles.fillInk} />
        <circle cx={fx(end)} cy={REVISED_Y[end]} r={2.5} className={styles.fillBlue} />
        <text x={EI.today} y={EI.h + 11} textAnchor="middle" className={styles.today}>
          Today
        </text>
        <text x={EI.w} y={EI.h + 11} textAnchor="end" className={styles.today}>
          12 months
        </text>
      </svg>
      <div className={styles.pipeFoot}>
        <span className={styles.orders}>Every figure traced</span>
        <span className={cx(styles.tertiary, styles.mono)}>3 sources</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Intelligent Procurement Management System: evidence for an award  */
/* ---------------------------------------------------------------- */
/* One tender requirement and the bid evidence linked to it (the /solutions
   drawing, in small). People decide; the one still to check is said. The
   long name takes two header lines, so the card names the requirement
   without a label above it. */
const EVIDENCE = [
  { name: "Completion certificate", status: "Linked", focal: true },
  { name: "Work orders", status: "Linked", focal: false },
  { name: "Client reference", status: "To check", focal: false },
];

export function ProcurementTeaser() {
  return (
    <div>
      <p className={styles.recordName}>Evidence of prior delivery</p>
      <div className={cx(styles.roles, styles.rows)}>
        {EVIDENCE.map((e) => (
          <div key={e.name} className={styles.roleRow}>
            <span className={styles.roleName}>{e.name}</span>
            <span className={cx(styles.mono, e.focal ? styles.scopeOpen : styles.tertiary)}>{e.status}</span>
          </div>
        ))}
      </div>
      <p className={cx(styles.footnote, styles.tertiary, styles.mono)}>The committee decides</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Akashic Life: one visit, carried into care                        */
/* ---------------------------------------------------------------- */
export function LifeTeaser() {
  return (
    <div>
      <div className={styles.figureRow}>
        <p className={styles.label}>Antenatal visit</p>
        <span className={cx(styles.mono, styles.scopeOpen)}>Risk screened</span>
      </div>
      <p className={styles.recordName}>Mother’s care record</p>
      <div className={styles.carryLine}>
        <span className={styles.dot} />
        <span className={styles.carryDash} />
        <span className={styles.carryRing} />
      </div>
      <div className={styles.carryPlaces}>
        <div>
          <p className={styles.place}>Home visit</p>
          <p className={cx(styles.placeNote, styles.tertiary, styles.mono)}>Offline</p>
        </div>
        <div className={styles.driverEnd}>
          <p className={styles.place}>Health centre</p>
          <p className={cx(styles.placeNote, styles.tertiary, styles.mono)}>When connected</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Strategic Advisory: a prioritised roadmap, now, next, later       */
/* ---------------------------------------------------------------- */
/* Three priorities in order: now, next, later. The first is under way, so
   it alone is blue. HTML, not SVG, so its type stays at the card's sizes at
   every width (an SVG's labels grew to 16px in the phone card). */
const STAGES = ["Now", "Next", "Later"];
const PRIORITIES = ["One record", "Forecast", "AI assistant"];

export function RoadmapTeaser() {
  return (
    <div>
      <div className={styles.road}>
        <span />
        {STAGES.map((stage) => (
          <span key={stage} className={cx(styles.roadStage, styles.tertiary, styles.mono)}>
            {stage}
          </span>
        ))}
        {PRIORITIES.map((name, row) => (
          <Fragment key={name}>
            <span className={styles.roadName}>{name}</span>
            {STAGES.map((stage, col) => (
              <span key={stage} className={styles.roadCell}>
                {col === row && <span className={cx(styles.roadBar, row === 0 && styles.roadBarOn)} />}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
      <div className={styles.pipeFoot}>
        <span className={styles.orders}>Planned with your team</span>
        <span className={cx(styles.tertiary, styles.mono)}>Measured</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Engineering at Scale: one system, built and tested                */
/* ---------------------------------------------------------------- */
/* An ordered rail (DESIGN_SYSTEM §7: steps on a rail when the order is
   real). Tested, not yet live: the next step is the open node. */
const STEPS = ["Design", "Build", "Test", "Live"];
const STEPS_DONE = 3;

export function EngineeringTeaser() {
  return (
    <div>
      <div className={styles.figureRow}>
        <p className={styles.label}>Order service</p>
        <span className={cx(styles.mono, styles.scopeOpen)}>Tests passing</span>
      </div>
      <p className={styles.recordName}>On the stack you choose</p>
      <div className={styles.rail}>
        {STEPS.map((step, i) => (
          <div key={step} className={styles.step} data-done={i < STEPS_DONE}>
            <span className={styles.stepNode} />
            <span className={cx(styles.mono, i < STEPS_DONE ? styles.stepDone : styles.tertiary)}>{step}</span>
          </div>
        ))}
      </div>
      <p className={cx(styles.footnote, styles.tertiary, styles.mono)}>Documented and handed over</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* AI Solutions and Accelerators: AI drafts, people decide           */
/* ---------------------------------------------------------------- */
/* An AI use case in daily work with human review built in (the /services
   "You leave with" line). Nothing is sent without a person (DO NOT
   OVERSELL, home.ts [02]); the one in review is the focal row. */
const REPLIES = [
  { topic: "Refund request", status: "Approved", now: false },
  { topic: "Delivery question", status: "In review", now: true },
  { topic: "Invoice dispute", status: "To a person", now: false },
];

export function AiReviewTeaser() {
  return (
    <div>
      <div className={styles.figureRow}>
        <p className={styles.label}>Customer replies</p>
        <span className={cx(styles.tertiary, styles.mono)}>Drafted by AI</span>
      </div>
      <div className={cx(styles.roles, styles.rows)}>
        {REPLIES.map((r) => (
          <div key={r.topic} className={styles.roleRow}>
            <span className={styles.roleName}>{r.topic}</span>
            <span className={cx(styles.mono, r.now ? styles.scopeOpen : styles.tertiary)}>{r.status}</span>
          </div>
        ))}
      </div>
      <p className={cx(styles.footnote, styles.tertiary, styles.mono)}>Reviewed by your team</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Demand sensing: the baseline, moved by your signals               */
/* ---------------------------------------------------------------- */
/* "An AI baseline forecast enriched with internal and external signals ...
   Planners approve before release" (/solutions). Directions only, no
   invented volumes; the strongest signal is the focal row. */
const SIGNALS = [
  { name: "Promotion calendar", effect: "Raises", up: true, focal: true },
  { name: "Weather", effect: "Lowers", up: false, focal: false },
];

export function DemandTeaser() {
  return (
    <div>
      <p className={styles.label}>AI baseline, next 12 weeks</p>
      <div className={cx(styles.roles, styles.rows)}>
        {SIGNALS.map((s) => (
          <div key={s.name} className={styles.roleRow}>
            <span className={styles.roleName}>{s.name}</span>
            <span className={cx(styles.scope, styles.mono, s.focal ? styles.scopeOpen : styles.tertiary)}>
              <svg viewBox="0 0 10 10" className={styles.arrow} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={s.up ? "M5 8.5V1.5M2 4.5L5 1.5L8 4.5" : "M5 1.5V8.5M2 5.5L5 8.5L8 5.5"} />
              </svg>
              {s.effect}
            </span>
          </div>
        ))}
      </div>
      <p className={cx(styles.footnote, styles.tertiary, styles.mono)}>A planner approves release</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Churn and pricing intelligence: an account's health, and why      */
/* ---------------------------------------------------------------- */
/* "An account health score, ranked root causes, a play per account"
   (/solutions). The score is drawn, not numbered, so no figure is invented. */
const HEALTH_Y = [6, 8, 7, 10, 12, 11, 15, 18, 17, 22, 25];
const HEALTH_W = 208;
const healthX = (i: number) => (i * HEALTH_W) / (HEALTH_Y.length - 1);

export function ChurnTeaser() {
  const end = HEALTH_Y.length - 1;
  return (
    <div>
      <div className={styles.figureRow}>
        <p className={styles.label}>Account health</p>
        <span className={cx(styles.mono, styles.scopeOpen)}>Falling</span>
      </div>
      <svg viewBox={`0 0 ${HEALTH_W} 30`} className={cx(styles.health, styles.chart)} fill="none" aria-hidden>
        <path d={line(HEALTH_Y, healthX)} className={styles.strokeBlue} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={healthX(end)} cy={HEALTH_Y[end]} r={2.5} className={styles.fillBlue} />
      </svg>
      <div className={cx(styles.pipeFoot, styles.causeRow)}>
        <span className={styles.orders}>Late deliveries</span>
        <span className={cx(styles.tertiary, styles.mono)}>Top cause</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Claims and fraud: the riskiest claims first                       */
/* ---------------------------------------------------------------- */
/* "Machine-learning risk scoring for prioritisation" (/solutions). A
   five-step meter per claim; an investigator, not the score, decides, so
   the queue is said to be for one. */
const CLAIMS = [
  { name: "Motor claim", score: 4, focal: true },
  { name: "Home claim", score: 2, focal: false },
  { name: "Travel claim", score: 1, focal: false },
];

export function ClaimsTeaser() {
  return (
    <div>
      <p className={styles.label}>Riskiest first, for an investigator</p>
      <div className={cx(styles.roles, styles.rows)}>
        {CLAIMS.map((c) => (
          <div key={c.name} className={styles.roleRow}>
            <span className={styles.roleName}>{c.name}</span>
            <span className={styles.meter}>
              {[0, 1, 2, 3, 4].map((step) => (
                <span key={step} className={cx(styles.meterStep, step < c.score && (c.focal ? styles.meterFocal : styles.meterOn))} />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Embedded engineers: one backlog, two teams                        */
/* ---------------------------------------------------------------- */
/* "Our engineers inside your team and backlog" (/services). Your board,
   your columns; blue marks the work our engineers hold. */
const LANES = [
  { name: "To do", tasks: ["you", "ours", "you"] },
  { name: "Doing", tasks: ["ours", "you"] },
  { name: "Done", tasks: ["you", "ours", "ours"] },
] as const;

export function EmbeddedTeaser() {
  return (
    <div>
      <p className={styles.label}>Your backlog</p>
      <div className={styles.board}>
        {LANES.map((lane) => (
          <div key={lane.name} className={styles.lane}>
            <span className={cx(styles.boardHead, styles.tertiary, styles.mono)}>{lane.name}</span>
            {lane.tasks.map((who, i) => (
              <span key={i} className={cx(styles.task, who === "ours" && styles.taskOurs)} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span className={cx(styles.legendItem, styles.tertiary, styles.mono)}>
          <span className={cx(styles.legendMark, styles.legendYou)} />
          Your team
        </span>
        <span className={cx(styles.legendItem, styles.tertiary, styles.mono)}>
          <span className={styles.legendMark} />
          Our engineers
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Cloud and infrastructure: where it runs is your rule              */
/* ---------------------------------------------------------------- */
/* "Environments designed around your security and residency rules", with
   monitoring and runbooks as deliverables (/services). */
const PLACES = ["Cloud", "On premises", "Hybrid"];
const PLACE_ON = 1;

export function CloudTeaser() {
  return (
    <div>
      <p className={styles.label}>Where it runs</p>
      <div className={styles.segments}>
        {PLACES.map((place, i) => (
          <span key={place} className={cx(styles.segment, i === PLACE_ON && styles.segmentOn)}>
            {place}
          </span>
        ))}
      </div>
      <div className={cx(styles.roles, styles.rows)}>
        <div className={styles.roleRow}>
          <span className={styles.roleName}>Data stays in</span>
          <span className={cx(styles.mono, styles.scopeOpen)}>Your region</span>
        </div>
        <div className={styles.roleRow}>
          <span className={styles.roleName}>Runbooks</span>
          <span className={cx(styles.mono, styles.tertiary)}>Handed over</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Managed Akashic: who does what                                    */
/* ---------------------------------------------------------------- */
/* "Akashic set up, run and supported for you" (/services); you bring the
   sources and the priority use cases. */
const DUTIES = [
  { duty: "Sources and priorities", who: "you" },
  { duty: "Set up", who: "dhira" },
  { duty: "Run and support", who: "dhira" },
] as const;

export function ManagedTeaser() {
  return (
    <div className={styles.owners}>
      <span />
      <span className={cx(styles.ownerHead, styles.tertiary, styles.mono)}>You</span>
      <span className={cx(styles.ownerHead, styles.tertiary, styles.mono)}>DHIRA</span>
      {DUTIES.map((d) => (
        <Fragment key={d.duty}>
          <span className={styles.ownerName}>{d.duty}</span>
          <span className={styles.ownerCell}>{d.who === "you" && <span className={cx(styles.ownerMark, styles.ownerMarkYou)} />}</span>
          <span className={styles.ownerCell}>{d.who === "dhira" && <span className={styles.ownerMark} />}</span>
        </Fragment>
      ))}
    </div>
  );
}
