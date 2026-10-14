import type { AkashicSolution } from "@/lib/akashicSections";

/* A solution's three-step workflow for /akashic [10]: a vertical run of line
   glyphs joined by a dashed spine, so three solutions fit side by side.
   Glyphs are drawn in the /akashic line language (1.5 stroke, round caps,
   currentColor). Knock-out fills use `fill-background`, never white, so the
   figure holds in the dark theme. No checkmark anywhere (Rule 2). */

function WorkflowGlyph({ solution, step }: { solution: AkashicSolution["id"]; step: number }) {
  const key = `${solution}${step}`;
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Enterprise Intelligence: read the business, explain the signal, approve the action */}
      {key === "ei0" && <><path d="M11 12h28v35H11zM18 6h28v35M25 0h28v35" opacity=".35" /><rect x="9" y="17" width="29" height="39" rx="3" className="fill-background" /><path d="M17 28h13M17 35h13M17 42h7M38 36h14M47 31l5 5-5 5" /></>}
      {key === "ei1" && <><rect x="12" y="8" width="32" height="46" rx="3" /><path d="M20 18h15M20 25h10M20 45h9" /><circle cx="39" cy="36" r="10" className="fill-background" /><path d="M46 43l8 8M35 36h8M39 32v8" /></>}
      {key === "ei2" && <><rect x="7" y="15" width="28" height="34" rx="3" /><path d="M14 24h14M14 31h8M35 33h20M49 27l6 6-6 6M46 16h11v34H46" /><circle cx="21" cy="41" r="3" /></>}
      {/* IPMS: read every bid (a cited line), check the rules (a decision), approve the award (a sealed bid) */}
      {key === "ipms0" && <><path d="M22 6h22l10 10v36" opacity=".35" /><path d="M12 12h24l10 10v36H12z" className="fill-background" /><path d="M36 12v10h10M19 30h20M19 46h12" /><rect x="17" y="35" width="24" height="6" rx="2" /></>}
      {key === "ipms1" && <><path d="M32 6l13 13-13 13-13-13z" /><path d="M19 19H9v20M45 19h10v20" /><rect x="3" y="39" width="14" height="14" rx="3" /><rect x="47" y="39" width="14" height="14" rx="3" /><path d="M28 19h8" /></>}
      {key === "ipms2" && <><rect x="6" y="14" width="44" height="32" rx="3" /><path d="M6 17l22 16 22-16" /><circle cx="46" cy="44" r="10" className="fill-background" /><circle cx="46" cy="44" r="4.5" /></>}
      {/* Akashic Life: screen at the visit, carry the record, coordinate care */}
      {key === "life0" && <><rect x="17" y="4" width="30" height="56" rx="6" /><path d="M26 11h12M28 53h8M21 33h7l4-11 5 20 4-9h2" /><path d="M7 19l-3-3M57 19l3-3" opacity=".4" /></>}
      {key === "life1" && <><rect x="19" y="11" width="26" height="42" rx="3" /><path d="M26 22h12M26 29h12M26 36h7M10 39A24 24 0 0152 16M52 9v7h-7M54 25A24 24 0 0112 48M12 55v-7h7" /></>}
      {key === "life2" && <><path d="M11 55V23h42v32M23 55V41h18v14M7 23L32 7l25 16M28 27h8M32 23v8M17 33h3M44 33h3" /><path d="M5 55h54" /></>}
    </svg>
  );
}

export default function SolutionWorkflow({ solution }: { solution: AkashicSolution }) {
  return (
    <figure className="ak-config-flow" aria-label={`${solution.name} workflow`}>
      <ol>
        {solution.stages.map((stage, step) => (
          <li key={stage.title}>
            <span className="ak-config-glyph">
              <WorkflowGlyph solution={solution.id} step={step} />
            </span>
            <span>
              <strong>{stage.title}</strong>
              <span>{stage.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption>{solution.note}</figcaption>
    </figure>
  );
}
