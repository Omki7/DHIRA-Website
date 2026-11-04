/* SIMULATED PRODUCT UI: part of EisGovernanceInspectorMockup (see its
   banner). One panel per guarantee; the sample figures belong to the
   Northwind account that runs through the page. */

import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./EisGovernanceInspectorMockup.module.scss";

interface PanelHeadProps {
  kicker: string;
  kickerClass: string;
  title: string;
  aside: ReactNode;
}

function PanelHead({ kicker, kickerClass, title, aside }: PanelHeadProps) {
  return (
    <div className={styles.panelHead}>
      <div>
        <span className={cx(styles.label, kickerClass)}>{kicker}</span>
        <h4 className={styles.panelTitle}>{title}</h4>
      </div>
      <div className={styles.panelAside}>{aside}</div>
    </div>
  );
}

const LINEAGE = [
  { chip: "CRM", chipClass: styles.chipCrm, name: "Salesforce opportunity", ref: "Opp #4012 · Northwind" },
  { chip: "ERP", chipClass: styles.chipErp, name: "ERPNext accounts receivable", ref: "Inv #8942 · 74 days overdue" },
  { chip: "Delivery", chipClass: styles.chipDelivery, name: "Jira delivery milestones", ref: "Project P-104 · CR-07 scope dispute" },
];

export function MetricPanel() {
  return (
    <div className={styles.panel}>
      <PanelHead
        kicker="Metric lineage inspector"
        kickerClass={styles.toneBlue}
        title="Net ARR at risk"
        aside={
          <>
            <span className={styles.figure}>$180,000</span>
            <span className={cx(styles.label, styles.figureNote)}>100% deterministic · zero hallucination</span>
          </>
        }
      />

      <div className={styles.inset}>
        <span className={cx(styles.label, styles.blockLabel)}>Governed calculation logic</span>
        <code className={styles.formula}>
          Net_Risk = &sum;(Contract_ARR &times; Weight) where (DSO &gt; 60 &or; Project_RAG = &quot;Red&quot;)
        </code>
        <div className={styles.terms}>
          <div>
            <span className={styles.term}>Consolidation:</span> 12 entities, intercompany eliminated
          </div>
          <div>
            <span className={styles.term}>Rate policy:</span> Corporate FX locked 01 Oct 2026
          </div>
        </div>
      </div>

      <div>
        <span className={cx(styles.label, styles.blockLabel, styles.listLabel)}>
          Upstream lineage verification (source to screen)
        </span>
        <div className={styles.stack}>
          {LINEAGE.map((row) => (
            <div key={row.name} className={styles.lineageRow}>
              <div className={styles.lineageName}>
                <span className={cx(styles.label, styles.chip, row.chipClass)}>{row.chip}</span>
                <span className={styles.lineageText}>{row.name}</span>
              </div>
              <span className={styles.lineageRef}>{row.ref}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.verified}>
        <span className={styles.verifiedText}>Row-level permission verified for Chief Executive seat.</span>
        <span className={cx(styles.label, styles.verifiedStamp)}>Audited OK</span>
      </div>
    </div>
  );
}

const SIGNALS = [
  {
    level: "high",
    label: "Signal 01 · CRM",
    age: "2 min ago",
    text: "MSA renewal due 22 Oct. Primary executive sponsor (VP Claims) resigned; replacement unengaged.",
  },
  {
    level: "watch",
    label: "Signal 02 · Delivery",
    age: "1 min ago",
    text: "Project P-104 is 3 weeks behind plan. Fixed-price budget exceeded by $61,000 due to a change-request dispute.",
  },
  {
    level: "watch",
    label: "Signal 03 · Finance",
    age: "4 min ago",
    text: "Invoice #8942 for $118,000 is 74 days overdue. Account NPS dropped from 48 to 12.",
  },
] as const;

export function CorrelationPanel() {
  return (
    <div className={styles.panel}>
      <PanelHead
        kicker="Triangulated risk signal"
        kickerClass={styles.toneRed}
        title="Northwind Insurance exposure"
        aside={
          <span className={cx(styles.label, styles.renewal)}>
            <span aria-hidden className={styles.renewalDot} />
            Renewal in 18 days
          </span>
        }
      />

      <div className={styles.signals}>
        {SIGNALS.map((s) => (
          <div key={s.label} className={cx(styles.signal, s.level === "high" ? styles.signalHigh : styles.signalWatch)}>
            <div className={cx(styles.label, styles.signalHead)}>
              <span className={s.level === "high" ? styles.toneRed : styles.toneGold}>{s.label}</span>
              <span className={styles.signalAge}>Updated {s.age}</span>
            </div>
            <p className={styles.signalText}>{s.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.correlated}>
        <span className={cx(styles.label, styles.toneBlue)}>Correlated view</span>
        <p className={styles.correlatedText}>
          Independent departmental tools treat these as three isolated low-priority items. When correlated across
          the knowledge layer, renewal probability drops from <span className={styles.strong}>85%</span> to{" "}
          <span className={cx(styles.strong, styles.toneRed)}>22%</span>.
        </p>
      </div>
    </div>
  );
}

export interface ExecutionPanelProps {
  isAuthorized: boolean;
  onAuthorize: () => void;
  onReset: () => void;
}

export function ExecutionPanel({ isAuthorized, onAuthorize, onReset }: ExecutionPanelProps) {
  return (
    <div className={styles.panel}>
      <PanelHead
        kicker="Executive decision gate · G-1"
        kickerClass={styles.toneBlue}
        title="Policy-checked intervention"
        aside={<span className={styles.duties}>Segregation of duties enforced</span>}
      />

      <div className={cx(styles.inset, styles.action)}>
        <div>
          <span className={cx(styles.label, styles.blockLabel)}>Proposed action</span>
          <p className={styles.actionText}>
            Escalate Northwind renewal to executive steering committee and issue aged AR statement with credit
            freeze.
          </p>
        </div>

        <div className={styles.people}>
          <div>
            <span className={styles.peopleRole}>Composed by:</span> <span className={styles.term}>Neha P. (FP&amp;A)</span>
            <span className={styles.peopleNote}>Cannot self-authorise</span>
          </div>
          <div>
            <span className={styles.peopleRole}>Required sign-off:</span>{" "}
            <span className={styles.term}>Dilip H. (CEO)</span>
            <span className={cx(styles.peopleNote, styles.toneBlue)}>Dual-key authority</span>
          </div>
        </div>
      </div>

      <div className={styles.gate}>
        {!isAuthorized ? (
          <div className={styles.gateHeld}>
            <p className={styles.gateText}>
              Action is held behind the G-1 policy gate. Systems remain strictly read-only until human sign-off.
            </p>
            <button type="button" onClick={onAuthorize} className={styles.authorise}>
              Sign and authorise intervention
            </button>
          </div>
        ) : (
          <div className={styles.gateDone}>
            <div className={styles.committed}>
              <span aria-hidden className={styles.committedDot} />
              <span>Action authorised and committed</span>
            </div>
            <div className={styles.record}>
              <div>
                <span className={styles.recordKey}>SIGNATURE:</span> SHA-256: 8f9a2e1d7c4b0a...c41e
              </div>
              <div>
                <span className={styles.recordKey}>AUDIT LOG:</span> Immutable record committed at 18:25:40 UTC
              </div>
              <div>
                <span className={styles.recordKey}>WRITE-BACK:</span> Salesforce and ERPNext updated via scoped principal
              </div>
            </div>
            <button type="button" onClick={onReset} className={styles.reset}>
              Reset simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
