import type { AkashicPage } from "@/content/pages/akashic";
import { AkashicWordmark } from "@/shared/components/icons";
import { PreviewTag, ScrollReveal, SectionLink } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { ArchitectureIcon } from "./ArchitectureIcon";
import { Facet, Layer, ModuleTile, SourceChip, Step, TeamChip, at } from "./ArchitectureParts";
import styles from "./AkashicModules.module.scss";

/*
 * [04] The architecture, drawn the way leading platforms draw theirs
 * (4 Nov 2026, user, after Databricks' Data Intelligence Platform,
 * Microsoft Fabric and Salesforce's platform stack): full-width layer
 * bands, read top to bottom. The finishing pass keeps this architecture
 * compact: one outcome per module, distinct layer tabs and connected
 * components, with specifications available through each module's [10] link.
 *
 *   Every team       twelve teams, boardroom to front line
 *   Akashic          the platform frame, its header, then the four layers
 *                    it runs: Governance (the module and its six controls),
 *                    Intelligence (three modules, AI agents in preview),
 *                    Knowledge (the shared layer, not a module) and Data
 *                    (three modules)
 *   Your systems     every named connector and ingestion type from [10]
 *
 * One grid for every row: the label column (from xl), the body, then the
 * flow column, where ONE question runs down through every layer and comes
 * back up answered (ArchitectureFlow, the figure's only client leaf). No
 * team gets its own path. Module tiles open their [10] sheet and keep
 * their older anchors. Final state under reduced motion and without JS.
 */

export interface AkashicModulesProps {
  content: AkashicPage["architecture"];
}

export function AkashicModules({ content: c }: AkashicModulesProps) {
  const [ask, check, answer, understand, match, source] = c.flow.steps;

  return (
    <section id="modules" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={c.number}>{c.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={c.setup}>{c.title}</StoryTitle>
            <p className={styles.intro}>{c.intro}</p>
          </div>
        </ScrollReveal>

        <figure aria-label={c.figureLabel} className={styles.figure}>
          <ArchitectureFlow label={c.flow.label} motion={c.flow.motion}>
            {/* Every team */}
            <Layer
              tone="users"
              layer={c.users}
              delay={0}
              flow={
                <>
                  <Step n={1} step={ask} />
                  <Step n={7} step={c.flow.back} back />
                </>
              }
            >
              <ul className={styles.teams}>
                {c.users.teams.map((team) => (
                  <TeamChip key={team.name} team={team} />
                ))}
              </ul>
            </Layer>

            {/* The platform: the four layers Akashic runs */}
            <div className={styles.frame}>
              <div className={cx(styles.frameHead, styles.rise)} style={at(0.06)}>
                <div className={styles.frameBrand}>
                  <AkashicWordmark className={styles.wordmark} />
                  <span className={styles.tagline}>{c.platform.tagline}</span>
                  <span className={styles.count}>{c.platform.count}</span>
                </div>
              </div>

              <Layer tone="gov" layer={c.governance} delay={0.12} flow={<Step n={2} step={check} />}>
                <div className={styles.govGrid}>
                  <ModuleTile module={c.governance.module} />
                  <ul className={styles.controls}>
                    {c.governance.controls.map((control) => (
                      <Facet key={control.name} facet={control} className={styles.control} />
                    ))}
                  </ul>
                </div>
              </Layer>

              <Layer tone="intel" layer={c.intelligence} delay={0.18} flow={<Step n={3} step={answer} />}>
                <div className={styles.modules}>
                  {c.intelligence.modules.map((module) => (
                    <ModuleTile key={module.anchor} module={module} />
                  ))}
                </div>
                <a href={c.intelligence.agents.href} className={styles.agents}>
                  <span className={styles.agentsMark}>
                    <ArchitectureIcon name="agents" className={styles.agentsIcon} />
                  </span>
                  <span className={styles.agentsName}>{c.intelligence.agents.name}</span>
                  <PreviewTag />
                  <span className={styles.agentsLine}>{c.intelligence.agents.line}</span>
                </a>
              </Layer>

              <Layer tone="know" layer={c.knowledge} delay={0.24} flow={<Step n={4} step={understand} />}>
                <ul className={styles.weave}>
                  {c.knowledge.parts.map((part) => (
                    <Facet key={part.name} facet={part} className={styles.part} />
                  ))}
                </ul>
                <p className={styles.note}>{c.knowledge.note}</p>
              </Layer>

              <Layer tone="data" layer={c.data} delay={0.3} flow={<Step n={5} step={match} />}>
                <div className={styles.modules}>
                  {c.data.modules.map((module) => (
                    <ModuleTile key={module.anchor} module={module} />
                  ))}
                </div>
              </Layer>
            </div>

            {/* Your systems */}
            <Layer tone="systems" layer={c.systems} delay={0.36} flow={<Step n={6} step={source} />}>
              <div className={styles.systems}>
                {c.systems.groups.map((group) => (
                  <div key={group.name} className={styles.group}>
                    <p className={styles.groupName}>{group.name}</p>
                    <ul className={styles.sources}>
                      {group.items.map((item) => (
                        <SourceChip key={item.name} source={item} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Layer>
          </ArchitectureFlow>
        </figure>

        {/* The onward link sits under the architecture (user, 4 Nov 2026). */}
        <div className={styles.foot}>
          <SectionLink href={c.link.href}>{c.link.label}</SectionLink>
        </div>
      </div>
    </section>
  );
}
