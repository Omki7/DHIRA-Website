import type { AkashicPage, LayerModule } from "@/content/pages/akashic";
import { DynamicSketchIcon } from "@/shared/components/icons";
import { PreviewTag, ScrollReveal } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicModules.module.scss";

const referenceIds = [
  "pipelines",
  "master-data",
  "warehouse",
  "ml",
  "ask",
  "bi",
];
/* Anchors renamed to the modules' one names on 26 Oct 2026; the old ones still land. */
const LEGACY_ANCHORS: Record<string, string> = {
  "modules-data-warehouse": "data-warehousing",
  "modules-ask-akashic": "ask-ai",
};

/* Modules with AI agents in preview carry one dashed line under their
   capabilities; the section coda names what the tag means. */
function ModuleRow({
  modules,
  offset,
  explore,
}: {
  modules: LayerModule[];
  offset: number;
  explore: string;
}) {
  return (
    <div className={styles.moduleRow}>
      {modules.map((m, i) => (
        <div key={m.id} id={m.id} className={styles.moduleEntry}>
          <span id={m.id.replace("modules-", "")} />
          {LEGACY_ANCHORS[m.id] && (
            <span id={LEGACY_ANCHORS[m.id]} />
          )}
          <div className={styles.moduleName}>
            <DynamicSketchIcon text={m.icon} className="h-5 w-5" />
            <h4>{m.name}</h4>
          </div>
          <p>{m.sub}</p>
          <ul className={styles.moduleCapabilities}>
            {m.caps.slice(0, 2).map((cap) => (
              <li key={cap}>{cap}</li>
            ))}
          </ul>
          {m.agent && (
            <div className={styles.moduleAgent}>
              {m.agent}
              <PreviewTag />
            </div>
          )}
          <a
            href={"#reference-" + referenceIds[i + offset]}
            className={styles.moduleLink}
          >
            {explore} <span aria-hidden="true">&nearr;</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export interface AkashicModulesProps {
  content: AkashicPage["architecture"];
}

export function AkashicModules({ content: c }: AkashicModulesProps) {
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
        <div className={styles.foundation}>
          <div className={styles.sourceLine}>
            <span className={styles.smallLabel}>{c.sourcesLabel}</span>
            <div className={styles.sourceList}>
              {c.sources.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          {c.layers.map((layer, i) => (
            <ScrollReveal key={layer.number}>
              <div
                className={`${styles.layer} ${
                  i === 1 ? styles.layerKnowledge : ""
                }`}
              >
                <div className={styles.layerName}>
                  <span
                    className={`${styles.smallLabel} ${styles.smallLabelBlue}`}
                  >
                    {layer.number} / {layer.name}
                  </span>
                  <h3>{layer.verb}</h3>
                  <p>{layer.desc}</p>
                </div>
                {i === 1 ? (
                  <div className={styles.contextWeave}>
                    <svg
                      viewBox="0 0 700 120"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M0 10C180 10 180 100 350 60S530 10 700 10M0 40C180 40 180 0 350 60S530 40 700 40M0 80C180 80 180 120 350 60S530 80 700 80M0 110C180 110 180 20 350 60S530 110 700 110" />
                    </svg>
                    <div>
                      {c.context.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ModuleRow
                    modules={i === 0 ? c.modules.data : c.modules.intelligence}
                    offset={i === 0 ? 0 : 3}
                    explore={c.explore}
                  />
                )}
              </div>
            </ScrollReveal>
          ))}
          <div id="modules-governance" className={styles.governanceLine}>
            <span id="governance" />
            <span className={styles.smallLabel}>{c.governanceLabel}</span>
            <strong>{c.governance}</strong>
            <span>{c.controls}</span>
            <a
              href="#reference-governance"
              className={styles.moduleLink}
            >
              {c.exploreGovernance} <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
        </div>
        <p className={styles.coda}>{c.coda}</p>
      </div>
    </section>
  );
}
