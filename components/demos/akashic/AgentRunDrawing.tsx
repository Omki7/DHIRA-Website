"use client";

/*
 * [05] The agent run drawing. One run, left to right, where position is
 * role (founder's wireframe, re-drawn; see AKASHIC_AGENTS):
 *
 *   lanes       brackets over the run: agents (dashed blue, preview),
 *               a person (ink), the record (solid blue, live controls)
 *   rail        six steps; dashed blue while agents work, ink after the
 *               person signs, so the line itself changes hands at the gate
 *   agents      each agent hangs from the step it works in on a leader;
 *               the Approve column holds no agent, only the line that says so
 *   foundation  the two agents that keep the data healthy, under every run
 *
 * The claim ("agents do the legwork, people make the call") is visible
 * without interaction. Draws in once on entry via useDrawn + the
 * .ad-fade/.ad-strike kit; reduced motion lands on the final state and
 * drops the gate's ping (globals.css).
 */

import type { CSSProperties } from "react";
import useDrawn from "@/hooks/useDrawn";
import type { AkashicAgent, AkashicAgents } from "@/content/pages/akashic";

const delay = (s: number) => ({ "--ad-delay": `${s}s` }) as CSSProperties;

function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" />
    </svg>
  );
}

function AgentList({ agents, start, preview }: { agents: AkashicAgent[]; start: number; preview: boolean }) {
  return (
    <ul className="ak-ag-agents">
      {agents.map((a, i) => (
        <li key={a.code} className="ad-fade" style={delay(start + i * 0.1)}>
          <span className="ak-ag-agent">
            <span className="ak-ag-code" data-preview={preview}>{a.code}</span>
            <strong>{a.name}</strong>
          </span>
          <span className="ak-ag-agent-line">{a.line}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AgentRunDrawing({ content: c }: { content: AkashicAgents }) {
  const [ref, drawn] = useDrawn<HTMLElement>(0.3);
  const steps = c.steps;
  const agentSteps = steps.filter((s) => s.kind === "agent").length;

  return (
    <figure ref={ref} data-drawn={drawn} className="ak-ag">
      <figcaption className="sr-only">
        {c.figureCaption} {c.preview ? c.previewNote : ""}
      </figcaption>

      {/* Lanes: who owns each stretch of the run (desktop; below lg the
          gate node and its note carry the same split). */}
      <div className="ak-ag-lanes" aria-hidden="true">
        <span className="ak-ag-lane ad-fade" data-kind="agent" style={{ gridColumn: `1 / span ${agentSteps}`, ...delay(0.05) }}>
          {c.lanes.agent}
        </span>
        <span className="ak-ag-lane ad-fade" data-kind="person" style={delay(0.85)}>{c.lanes.person}</span>
        <span className="ak-ag-lane ad-fade" data-kind="record" style={delay(1.05)}>{c.lanes.record}</span>
      </div>

      <ol className="ak-ag-run">
        {steps.map((step, i) => (
          <li key={step.name} className="ak-ag-step" data-kind={step.kind}>
            <div className="ak-ag-rail" aria-hidden="true">
              <span className="ak-ag-node ad-fade" style={delay(0.15 + i * 0.16)}>
                {step.kind === "person" ? (
                  <>
                    <span className="ak-ag-ping ad-ping" />
                    <PersonGlyph />
                  </>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {i < steps.length - 1 && <span className="ak-ag-line ad-strike" data-out={step.kind} style={delay(0.2 + i * 0.16)} />}
            </div>
            <div className="ak-ag-body ad-fade" style={delay(0.25 + i * 0.16)}>
              <h3 className="ak-ag-name">{step.name}</h3>
              <p className="ak-ag-detail">{step.detail}</p>
            </div>
            {step.agents ? (
              <AgentList agents={step.agents} start={0.6 + i * 0.16} preview={c.preview} />
            ) : (
              <p className="ak-ag-note ad-fade" data-kind={step.kind} style={delay(1.1 + i * 0.05)}>{step.note}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="ak-ag-foundation">
        <p className="ak-small-label">{c.foundation.label}</p>
        <AgentList agents={c.foundation.agents} start={1.3} preview={c.preview} />
      </div>

      <ul className="ak-ag-legend" aria-hidden="true">
        <li><span className="ak-ag-swatch" data-kind="agent" />{c.legend.agent}</li>
        <li><span className="ak-ag-swatch" data-kind="person" />{c.legend.person}</li>
        <li><span className="ak-ag-swatch" data-kind="record" />{c.legend.record}</li>
      </ul>
    </figure>
  );
}
