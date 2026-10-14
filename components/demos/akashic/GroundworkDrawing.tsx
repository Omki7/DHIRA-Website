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

import useDrawn from "@/hooks/useDrawn";
import { AKASHIC_ADVANTAGE as c, type SeatPin } from "@/lib/akashicSections";
import PreviewTag from "@/components/ui/PreviewTag";

const pinNumber = (pin: SeatPin) => c.seats.findIndex((s) => s.pin === pin) + 1;

function Pin({ pin, className }: { pin: SeatPin; className: string }) {
  return <span className={"ak-gw-pin ad-fade " + className} style={{ "--ad-delay": "1.3s" } as React.CSSProperties}>{pinNumber(pin)}</span>;
}

const delay = (s: number) => ({ "--ad-delay": `${s}s` }) as React.CSSProperties;

export default function GroundworkDrawing() {
  const [ref, drawn] = useDrawn<HTMLElement>(0.3);
  const cols = c.useCases;

  return (
    <>
      <figure ref={ref} data-drawn={drawn} className="ak-gw">
        <figcaption className="sr-only">
          Four use cases, dashboards, forecasts, AI answers and AI agents, built two ways. Project by project,
          each use case rebuilds its own connect, unify and define groundwork. With Akashic, the groundwork
          is laid once and every use case builds only its own work on top. AI agents are in preview.
        </figcaption>

        <div className="ak-gw-grid" aria-hidden="true">
          <span className="ak-gw-corner ak-small-label">Use case</span>
          {cols.map((u, i) => (
            <div key={u.name} className="ak-gw-head">
              <span className="ak-gw-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="ak-gw-name">{u.name}</span>
              {u.preview && <PreviewTag />}
            </div>
          ))}

          <div className="ak-gw-rowlabel">
            <strong>{c.rows.project.name}</strong>
            <span>{c.rows.project.note}</span>
          </div>
          {cols.map((u, col) => (
            <div key={u.name} className="ak-gw-stack" data-preview={u.preview}>
              <span className="ak-gw-work ad-fade" style={delay(col * 0.2 + 0.24)} />
              {c.layers.map((layer, li) => (
                <span key={layer} className="ak-gw-rebuilt ad-fade" style={delay(col * 0.2 + (c.layers.length - 1 - li) * 0.06)}>
                  <span>{layer}</span>
                  {col === 1 && li === 1 && <Pin pin="rebuilt" className="ak-gw-pin-rebuilt" />}
                </span>
              ))}
            </div>
          ))}

          <div className="ak-gw-rowlabel ak-gw-rowlabel-akashic">
            <strong>{c.rows.akashic.name}</strong>
            <span>{c.rows.akashic.note}</span>
          </div>
          <div className="ak-gw-shared">
            <div className="ak-gw-works">
              {cols.map((u, col) => (
                <span key={u.name} className="ak-gw-work ad-fade" data-preview={u.preview} style={delay(1 + col * 0.12)}>
                  {col === 0 && <Pin pin="work" className="ak-gw-pin-work" />}
                </span>
              ))}
            </div>
            {c.layers.map((layer, li) => (
              <span key={layer} className="ak-gw-band ad-strike" style={delay(0.35 + (c.layers.length - 1 - li) * 0.1)}>
                <span>{layer}</span>
                {li === 0 && <Pin pin="define" className="ak-gw-pin-define" />}
                {li === c.layers.length - 1 && <Pin pin="band" className="ak-gw-pin-band" />}
              </span>
            ))}
            <p className="ak-gw-governance">
              <strong>{c.governance}</strong>
              <span>{c.controls}</span>
              <span className="ak-gw-reuse">{c.bandNote} <span aria-hidden="true">→</span></span>
            </p>
          </div>
        </div>

        <ul className="ak-gw-legend" aria-hidden="true">
          <li><span className="ak-gw-swatch ak-gw-swatch-work" />{c.legend.work}</li>
          <li><span className="ak-gw-swatch ak-gw-swatch-rebuilt" />{c.legend.rebuilt}</li>
          <li><span className="ak-gw-swatch ak-gw-swatch-shared" />{c.legend.shared}</li>
          <li><span className="ak-gw-swatch ak-gw-swatch-preview" />{c.legend.preview}</li>
        </ul>
      </figure>

      <ol className="ak-gw-seats">
        {c.seats.map((seat, i) => (
          <li key={seat.role}>
            <span className="ak-gw-pin" aria-hidden="true">{i + 1}</span>
            <div>
              <p className="ak-small-label">{seat.role}</p>
              <p className="ak-gw-seat-line">{seat.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
