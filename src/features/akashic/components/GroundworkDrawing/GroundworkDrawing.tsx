import type { CSSProperties } from "react";
import type { AkashicAdvantage } from "@/content/pages/akashic";
import { AkashicWordmark } from "@/shared/components/icons";
import { DrawnFigure } from "@/shared/components/ui/DrawnFigure";
import { cx } from "@/shared/utils/cx";
import { ArchitectureIcon } from "../AkashicModules/ArchitectureIcon";
import styles from "./GroundworkDrawing.module.scss";

/**
 * [08] Business initiatives, not individual dashboards or model outputs.
 * Isolated delivery repeats four setup tasks inside each project boundary.
 * Akashic connects the same projects to one reusable foundation. There is
 * no duration axis, estimated saving or assumption that new project work
 * disappears. The small connection reveal explains sharing, not speed.
 */
type Project = AkashicAdvantage["projects"][number];
type AssetTone = AkashicAdvantage["assets"][number]["tone"];

const TONES: Record<AssetTone, string> = {
  data: styles.toneData,
  know: styles.toneKnow,
  gov: styles.toneGov,
};

function ProjectHeading({ project, id }: { project: Project; id: string }) {
  return (
    <header className={styles.projectHeading}>
      <span className={styles.projectIcon}>
        <ArchitectureIcon name={project.icon} />
      </span>
      <div>
        <p className={styles.owner}>{project.owner}</p>
        <h4 id={id}>{project.name}</h4>
        <p className={styles.work}>{project.work}</p>
      </div>
    </header>
  );
}

export interface GroundworkDrawingProps {
  content: AkashicAdvantage;
}

export function GroundworkDrawing({ content: c }: GroundworkDrawingProps) {
  return (
    <>
      <DrawnFigure className={styles.drawing} threshold={0.15}>
        <figure className={styles.figure}>
          <figcaption className={styles.srOnly}>{c.figureCaption}</figcaption>

          <div className={styles.isolated}>
            <header className={styles.plateHeading}>
              <h3>{c.rows.project.name}</h3>
              <p>{c.rows.project.note}</p>
            </header>
            <div className={styles.isolatedProjects}>
              {c.projects.map((project) => (
                <article key={project.id} className={styles.isolatedProject} aria-labelledby={`repeat-${project.id}`}>
                  <ProjectHeading project={project} id={`repeat-${project.id}`} />
                  <p className={styles.rebuildLabel}>{c.rebuildLabel}</p>
                  <ul className={styles.repeatStack}>
                    {c.assets.map((asset) => (
                      <li key={asset.id}>
                        <ArchitectureIcon name={asset.icon} />
                        <span>{asset.repeated}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.shared}>
            <header className={styles.plateHeading}>
              <div className={styles.brandTitle}>
                <AkashicWordmark className={styles.wordmark} />
                <h3>{c.rows.akashic.name}</h3>
              </div>
              <p>{c.rows.akashic.note}</p>
            </header>
            <p className={styles.workLabel}>{c.projectWorkLabel}</p>
            <div className={styles.sharedProjects}>
              {c.projects.map((project, index) => (
                <article
                  key={project.id}
                  className={styles.sharedProject}
                  style={{ "--project-index": index } as CSSProperties}
                  aria-labelledby={`reuse-${project.id}`}
                >
                  <ProjectHeading project={project} id={`reuse-${project.id}`} />
                </article>
              ))}
            </div>
            <div className={styles.foundation}>
              <header className={styles.foundationHead}>
                <h4>{c.foundation.title}</h4>
                <p>{c.foundation.note}</p>
              </header>
              <dl className={styles.assets}>
                {c.assets.map((asset) => (
                  <div key={asset.id} className={cx(styles.asset, TONES[asset.tone])}>
                    <dt>
                      <span className={styles.assetIcon}><ArchitectureIcon name={asset.icon} /></span>
                      {asset.name}
                    </dt>
                    <dd className={styles.assetDetail}>{asset.shared}</dd>
                    <dd className={styles.component}>{asset.component}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </figure>
      </DrawnFigure>
    </>
  );
}
