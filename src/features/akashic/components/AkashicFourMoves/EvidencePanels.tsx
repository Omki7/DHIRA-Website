import type { ReactNode } from "react";
import type { AkashicPage, AskWorld } from "@/content/pages/akashic";
import styles from "./AkashicFourMoves.module.scss";

export type IconKey = AskWorld["chips"][number]["icon"];
export type World = AskWorld;
export type Chrome = AkashicPage["inAction"]["chrome"];

/* Bars plot percent-of-target on a 0–110% scale; the target line sits at 100. */
const CHART_MAX = 110;

export function UiIcon({
  icon,
  size = 10,
}: {
  icon: IconKey;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (icon === "source") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }
  if (icon === "graph") {
    return (
      <svg {...common}>
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="19" cy="15" r="2.5" />
        <path d="M6.5 17L10.5 8M14 7.5l3.5 6M7.5 18.6l9-3.2" />
      </svg>
    );
  }
  if (icon === "bolt") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
      </svg>
    );
  }
  if (icon === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }
  if (icon === "report") {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 14l2.2 2.2L15 11.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8" />
    </svg>
  );
}

export function PanelHeader({
  icon,
  label,
  right,
}: {
  icon: IconKey;
  label: string;
  right: ReactNode;
}) {
  return (
    <div className={styles.panelHeader}>
      <span className={styles.panelIcon}>
        <UiIcon icon={icon} size={11} />
      </span>
      <span className={styles.panelLabel}>{label}</span>
      <span className={styles.panelRight}>{right}</span>
    </div>
  );
}

export function SystemsPanel({
  world,
  chrome,
}: {
  world: World;
  chrome: Chrome;
}) {
  const { chart } = world;
  const targetLeft = `${(100 / CHART_MAX) * 100}%`;
  return (
    <div className={styles.panelCard}>
      <PanelHeader
        icon="source"
        label={chrome.systems}
        right={<span className={styles.lagTag}>{chart.lagTag}</span>}
      />
      <div className={styles.chartBody}>
        <p className={styles.chartTitle}>{chart.title}</p>
        <div className={styles.chartRows}>
          {chart.rows.map((row, i) => (
            <div key={row.label} className={styles.chartRow}>
              <span className={row.lag ? styles.rowLabelLag : styles.rowLabel}>
                {row.label}
              </span>
              <span className={styles.track}>
                <span
                  className={`${styles.bar} ${row.lag ? styles.barRed : styles.barBlue}`}
                  style={{
                    width: `${(row.pct / CHART_MAX) * 100}%`,
                    animation: `akx-fillx 0.8s cubic-bezier(0.2,0.8,0.2,1) ${0.25 + i * 0.14}s both`,
                  }}
                  aria-hidden
                />
                <span
                  className={styles.targetLine}
                  style={{ left: targetLeft }}
                  aria-hidden
                />
              </span>
              <span className={row.lag ? styles.pctTextLag : styles.pctText}>
                {row.pct}%
              </span>
            </div>
          ))}
        </div>
        <p className={styles.targetLegend} aria-hidden>
          <span className={styles.targetTick} />
          {chrome.targetLine}
        </p>
      </div>
      <p className={styles.footnote}>{chart.footnote}</p>
    </div>
  );
}

export function DocumentsPanel({
  world,
  chrome,
}: {
  world: World;
  chrome: Chrome;
}) {
  const { excerpt, record, counted } = world.docs;
  return (
    <div className={styles.panelCard}>
      <PanelHeader
        icon="doc"
        label={chrome.documents}
        right={<span className={styles.docCount}>{counted}</span>}
      />
      <div className={styles.docsBody}>
        <div className={styles.excerptBox}>
          <div className={styles.excerptHeader}>
            <span className={styles.excerptIcon}>
              <UiIcon icon={excerpt.icon} size={11} />
            </span>
            <span className={styles.excerptSource}>{excerpt.source}</span>
            <span className={styles.excerptDate}>{excerpt.date}</span>
          </div>
          <p className={styles.excerptText}>
            {excerpt.pre}
            <span
              style={{
                backgroundColor: "rgb(var(--diagram-gold-bg))",
                backgroundRepeat: "no-repeat",
                backgroundSize: "0% 100%",
                animation:
                  "akx-mark 0.7s 1.35s cubic-bezier(0.2,0.8,0.2,1) both",
              }}
            >
              {excerpt.mark}
            </span>
            {excerpt.post}
          </p>
        </div>
        <div className={styles.recordBox}>
          <span className={styles.recordIcon}>
            <UiIcon icon={record.icon} size={11} />
          </span>
          <div className={styles.recordDetails}>
            <span className={styles.recordName}>{record.name}</span>
            <span className={styles.recordSub}>{record.sub}</span>
          </div>
          <span className={styles.recordStatus}>{record.status}</span>
        </div>
      </div>
    </div>
  );
}
