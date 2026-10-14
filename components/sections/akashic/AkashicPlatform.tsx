import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SolutionWorkflow from "@/components/demos/akashic/SolutionWorkflow";
import {
  AKASHIC_SOLUTIONS as content,
  AKASHIC_SOLUTION_MODULES as MODULES,
  type AkashicSolution,
} from "@/lib/akashicSections";
import { StoryLabel, StoryTitle, StoryArrow } from "@/components/sections/akashic/AkashicStory";

/*
 * [10] Built on Akashic (rebuilt 14 Oct 2026).
 * One claim, distinct from [07]: the solutions are not separate products but
 * Akashic, configured. One sheet in [07]'s grid language: an axis column,
 * then a column per solution. Above, each solution stands in its own column
 * (who it serves, its claim, a three-step workflow). Below, on the tinted
 * platform band, the seven modules run as continuous lines across every
 * column: a blue node where a solution switches a module on, a hollow ring
 * where it is available but off, and a blue spine joining that solution's
 * modules. Separate columns above, shared lines below: the claim, drawn.
 * Desktop rows align across columns with `grid-template-rows: subgrid`
 * (akashic-story.css); below lg each solution stacks with only its own
 * modules. Copy and module sources: AKASHIC_SOLUTIONS in lib/akashicSections.
 * Replaces a tab carousel with auto-advance and simulated product screens:
 * no autoplay, no screens (the page already carries them), all three
 * solutions visible at once.
 */

type Spine = "start" | "mid" | "end" | undefined;

/* Where a module cell sits on its solution's spine, which runs from the
   first module the solution uses to the last. */
function spineAt(solution: AkashicSolution, index: number): Spine {
  const used = MODULES.flatMap((module, i) => (solution.modules.includes(module) ? [i] : []));
  const first = used[0];
  const last = used[used.length - 1];
  if (used.length < 2 || index < first || index > last) return undefined;
  if (index === first) return "start";
  if (index === last) return "end";
  return "mid";
}

export default function AkashicPlatform() {
  return (
    <section id="solutions" className="ak-story ak-solutions bg-background">
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number="11">Built on Akashic</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className="ak-story-intro">{content.intro}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="ak-config">
            <div className="ak-config-grid">
              {/* Row labels for the desktop sheet; every cell also names its
                  own module for assistive technology, so this column is hidden. */}
              <div className="ak-config-axis" aria-hidden="true">
                <p className="ak-config-axis-head">Solution</p>
                <p className="ak-config-axis-flow">Workflow</p>
                <p className="ak-config-axis-under">Akashic underneath</p>
                {MODULES.map((module) => (
                  <p key={module} className="ak-config-axis-module">
                    {module}
                  </p>
                ))}
                <p className="ak-config-axis-link" />
              </div>

              {content.items.map((solution) => (
                <article key={solution.id} className="ak-config-col" aria-labelledby={`solution-${solution.id}`}>
                  <header className="ak-config-head">
                    <p className="ak-config-category">{solution.category}</p>
                    <h3 id={`solution-${solution.id}`}>{solution.name}</h3>
                    <p className="ak-config-audience">{solution.audience}</p>
                    <h4>{solution.headline}</h4>
                  </header>

                  <SolutionWorkflow solution={solution} />

                  <p className="ak-config-under">
                    <span>Akashic underneath</span>
                  </p>
                  {MODULES.map((module, index) => {
                    const used = solution.modules.includes(module);
                    return (
                      <p key={module} className="ak-config-cell" data-used={used} data-spine={spineAt(solution, index)}>
                        <span className="ak-config-node" data-used={used} aria-hidden="true" />
                        <span className="ak-config-cell-name">
                          {module}
                          <span className="sr-only">{used ? ", in use" : ", not used"}</span>
                        </span>
                      </p>
                    );
                  })}

                  <Link href={solution.href} className="ak-config-link">
                    {solution.cta}
                    <StoryArrow />
                  </Link>
                </article>
              ))}
            </div>

            <div className="ak-config-legend">
              <p>
                <span className="ak-config-node" data-used="true" aria-hidden="true" />
                Switched on
              </p>
              <p>
                <span className="ak-config-node" data-used="false" aria-hidden="true" />
                Available, not used
              </p>
              <Link href={content.all.href} className="ak-config-all">
                {content.all.label}
                <StoryArrow />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
