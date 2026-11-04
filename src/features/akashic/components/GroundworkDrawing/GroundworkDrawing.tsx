"use client";

/*
 * [07] The groundwork drawing. Two rows share one set of use-case columns:
 *
 *   Project by project  every column carries its own hatched Define / Unify /
 *                       Connect stack, so the groundwork visibly repeats.
 *   With Akashic        the same three layers run once as a continuous band;
 *                       each column adds only its own blue block of new work.
 *
 * The difference in drawn area is the argument, visible without interaction
 * (no figures: Design Rule 4). The fourth column, AI agents, is dashed
 * because agents are in preview, and sits on the solid band because the
 * groundwork beneath them is live. Numbered pins key the four executive
 * seats listed under the figure to the part of the drawing each is about.
 *
 * Draws in once on entry via useDrawn + the .ad-fade/.ad-strike kit;
 * reduced motion lands on the final state.
 */

import type { CSSProperties } from "react";
import type { AkashicAdvantage } from "@/content/pages/akashic";
import { PreviewTag } from "@/shared/components/ui";
import useDrawn from "@/shared/hooks/useDrawn";
import styles from "./GroundworkDrawing.module.scss";

/* A numbered pin; `n` is the seat (1-based) whose line it illustrates. */
function Pin({ n, className }: { n: number; className: string }) {
  return (
    <span
      className={`${styles.pin} ${styles.gridPin} ad-fade ${className}`}
      style={{ "--ad-delay": "1.3s" } as CSSProperties}
    >
      {n}
    </span>
  );
}

const delay = (s: number) => ({ "--ad-delay": `${s}s` }) as CSSProperties;

export interface GroundworkDrawingProps {
  content: AkashicAdvantage;
}

export function GroundworkDrawing({ content: c }: GroundworkDrawingProps) {
  const pinNumber = (pin: AkashicAdvantage["seats"][number]["pin"]) =>
    c.seats.findIndex((s) => s.pin === pin) + 1;
  const [ref, drawn] = useDrawn<HTMLElement>(0.3);
  const cols = c.useCases;

  return (
    <figure ref={ref} data-drawn={drawn} className={styles.figure}>
      <figcaption className={styles.srOnly}>{c.figureCaption}</figcaption>

      <div className={styles.grid} aria-hidden="true">
        <span className={`${styles.corner} ${styles.smallLabel}`}>
          {c.cornerLabel}
        </span>
        {cols.map((u, i) => (
          <div key={u.name} className={styles.head}>
            <span className={styles.index}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.name}>{u.name}</span>
            {u.preview && <PreviewTag />}
          </div>
        ))}

        <div className={styles.rowlabel}>
          <strong>{c.rows.project.name}</strong>
          <span>{c.rows.project.note}</span>
        </div>
        {cols.map((u, col) => (
          <div key={u.name} className={styles.stack} data-preview={u.preview}>
            <span
              className={`${styles.work} ad-fade`}
              style={delay(col * 0.2 + 0.24)}
            />
            {c.layers.map((layer, li) => (
              <span
                key={layer}
                className={`${styles.rebuilt} ad-fade`}
                style={delay(col * 0.2 + (c.layers.length - 1 - li) * 0.06)}
              >
                <span>{layer}</span>
                {col === 1 && li === 1 && (
                  <Pin
                    n={pinNumber("rebuilt")}
                    className={styles.pinRebuilt}
                  />
                )}
              </span>
            ))}
          </div>
        ))}

        <div className={`${styles.rowlabel} ${styles.rowlabelAkashic}`}>
          <strong>{c.rows.akashic.name}</strong>
          <span>{c.rows.akashic.note}</span>
        </div>
        <div className={styles.shared}>
          <div className={styles.works}>
            {cols.map((u, col) => (
              <span
                key={u.name}
                className={`${styles.work} ad-fade`}
                data-preview={u.preview}
                style={delay(1 + col * 0.12)}
              >
                {col === 0 && (
                  <Pin n={pinNumber("work")} className={styles.pinWork} />
                )}
              </span>
            ))}
          </div>
          {c.layers.map((layer, li) => (
            <span
              key={layer}
              className={`${styles.band} ad-strike`}
              style={delay(0.35 + (c.layers.length - 1 - li) * 0.1)}
            >
              <span>{layer}</span>
              {li === 0 && (
                <Pin n={pinNumber("define")} className={styles.pinDefine} />
              )}
              {li === c.layers.length - 1 && (
                <Pin n={pinNumber("band")} className={styles.pinBand} />
              )}
            </span>
          ))}
          <p className={styles.governance}>
            <strong>{c.governance}</strong>
            <span>{c.controls}</span>
            <span className={styles.reuse}>
              {c.bandNote} <span aria-hidden="true">&rarr;</span>
            </span>
          </p>
        </div>
      </div>

      <ul className={styles.legend} aria-hidden="true">
        <li>
          <span className={`${styles.swatch} ${styles.swatchWork}`} />
          {c.legend.work}
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.swatchRebuilt}`} />
          {c.legend.rebuilt}
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.swatchShared}`} />
          {c.legend.shared}
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.swatchPreview}`} />
          {c.legend.preview}
        </li>
      </ul>
    </figure>
  );
}
