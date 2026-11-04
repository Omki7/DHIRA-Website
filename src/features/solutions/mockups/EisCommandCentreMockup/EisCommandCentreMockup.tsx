"use client";

/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI: Enterprise Intelligence role cockpits ([01]).
 *
 * THE TEASE (DESIGN_SYSTEM §8):
 * 1. Short. The stage is capped at 350px so it teases rather than reveals,
 *    and its lower third dissolves into the page.
 * 2. Five roles (CEO, Finance, Sales, Delivery, People) switch instantly.
 * 3. A legible caption under the stage carries the claim, as under the
 *    homepage's module cards.
 *
 * Flat, hairline chrome as in the homepage and /akashic mockups (4 Nov
 * 2026): a mono header line instead of app chrome, opaque surfaces, no
 * shadows, figures at 600 with tabular digits. The active role is ink, as
 * the homepage's Before / After switch is.
 * --------------------------------------------------------------------- */

import { useState } from "react";
import Link from "next/link";
import { cx } from "@/shared/utils/cx";
import { ROLES, type RoleConfig, type RoleId } from "./roles";
import styles from "./EisCommandCentreMockup.module.scss";

type Tone = NonNullable<RoleConfig["kpis"][number]["tone"]>;
type Status = NonNullable<RoleConfig["preview"]["items"][number]["status"]>;

const NOTE_TONE: Record<Tone, string> = {
  positive: styles.notePositive,
  negative: styles.noteNegative,
  neutral: styles.noteNeutral,
};

const VALUE_TONE: Record<Status, string> = {
  bad: styles.valueBad,
  warn: styles.valueWarn,
  ok: styles.valueOk,
};

export interface EisCommandCentreMockupProps {
  /** Where the caption's link goes: the page's closing card. */
  ctaHref: string;
}

export function EisCommandCentreMockup({ ctaHref }: EisCommandCentreMockupProps) {
  const [selectedRole, setSelectedRole] = useState<RoleId>("ceo");
  const role = ROLES.find((r) => r.id === selectedRole) ?? ROLES[0];

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.switch}>
          {ROLES.map((r) => {
            const isActive = r.id === selectedRole;
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedRole(r.id)}
                className={cx(styles.option, isActive && styles.optionActive)}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        <div className={styles.sync}>
          <span aria-hidden className={styles.syncDot} />
          <span className={styles.syncLabel}>Live ERPNext sync</span>
        </div>
      </div>

      {/* The stage: short, and its lower third dissolves into the page. */}
      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <span className={styles.stageTitle}>
            Enterprise Intelligence <span className={styles.stageDot}>·</span> {role.title}
          </span>
          <span className={styles.stageAside}>0 open data conflicts</span>
        </div>

        <div className={styles.stageBody}>
          <div className={styles.kpis}>
            {role.kpis.map((k) => (
              <div key={k.label} className={styles.kpi}>
                <div className={styles.kpiLabel}>{k.label}</div>
                <div className={styles.kpiValue}>{k.value}</div>
                <div className={cx(styles.kpiNote, NOTE_TONE[k.tone ?? "neutral"])}>{k.note}</div>
              </div>
            ))}
          </div>

          <div className={styles.feed}>
            <div className={styles.feedHead}>
              <div className={styles.feedHeading}>
                <span className={styles.feedBadge}>{role.preview.badge}</span>
                <span className={styles.feedTitle}>{role.preview.title}</span>
              </div>
              <span className={styles.feedMeta}>{role.preview.meta}</span>
            </div>

            <div className={styles.rows}>
              {role.preview.items.map((item) => (
                <div key={item.label} className={styles.row}>
                  <div className={styles.rowText}>
                    <span className={styles.rowLabel}>{item.label}</span>
                    <span className={styles.rowSub}>{item.sub}</span>
                  </div>
                  <span className={cx(styles.rowValue, VALUE_TONE[item.status ?? "ok"])}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className={styles.caption}>
        <span className={styles.captionLead}>{role.label} cockpit.</span> {role.caption}{" "}
        <Link href={ctaHref} className={styles.captionLink}>
          See it with your own data
        </Link>
      </p>
    </div>
  );
}
