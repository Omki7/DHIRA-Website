import type { CSSProperties, ReactNode } from "react";
import type {
  ArchitectureFacet,
  ArchitectureIconKey,
  ArchitectureLayer,
  ArchitectureModule,
  ArchitectureSource,
  ArchitectureStep,
} from "@/content/pages/akashic";
import { ConnectorLogo } from "@/shared/components/icons";
import { cx } from "@/shared/utils/cx";
import { ArchitectureIcon } from "./ArchitectureIcon";
import styles from "./AkashicModules.module.scss";

/*
 * The parts of the [04] figure, all Server Components. Every row is a
 * `Layer`: its label (key and verb), its body, and its cell in the flow
 * column, where the question's numbered node sits. `tone` picks the row's
 * category accent and surface. The four platform layers get an explicit
 * colour tab; teams and external systems remain neutral.
 */

export type LayerTone = "users" | "gov" | "intel" | "know" | "data" | "systems";

const TONES: Record<LayerTone, string> = {
  users: styles.toneUsers,
  gov: styles.toneGov,
  intel: styles.toneIntel,
  know: styles.toneKnow,
  data: styles.toneData,
  systems: styles.toneSystems,
};

const LAYER_ICONS: Partial<Record<LayerTone, ArchitectureIconKey>> = {
  gov: "governance",
  intel: "machine-learning",
  know: "entities",
  data: "data-warehouse",
};

/* Seconds into the draw: rows arrive top to bottom, the way the question travels. */
export const at = (seconds: number) => ({ ["--ad-delay" as string]: `${seconds}s` }) as CSSProperties;

export interface LayerProps {
  tone: LayerTone;
  layer: ArchitectureLayer;
  delay: number;
  /** The row's cell in the flow column: one or two `Step`s. */
  flow: ReactNode;
  children: ReactNode;
}

export function Layer({ tone, layer, delay, flow, children }: LayerProps) {
  const icon = LAYER_ICONS[tone];
  return (
    <div className={cx(styles.layer, icon && styles.platformLayer, TONES[tone], styles.rise)} style={at(delay)}>
      <div className={styles.layerLabel}>
        {icon && <ArchitectureIcon name={icon} className={styles.layerSymbol} />}
        <div>
          <h3 className={styles.layerKey}>{layer.key}</h3>
          <p className={styles.layerVerb}>{layer.verb}</p>
        </div>
      </div>
      <div className={styles.layerBody}>{children}</div>
      <div className={styles.layerFlow}>{flow}</div>
    </div>
  );
}

export interface StepProps {
  /** Its number on the path, 1 to 7; also the node ArchitectureFlow measures. */
  n: number;
  step: ArchitectureStep;
  /** The return leg: the answer coming back up. */
  back?: boolean;
}

export function Step({ n, step, back = false }: StepProps) {
  return (
    <div className={cx(styles.step, back && styles.stepBack)}>
      <span aria-hidden="true" data-flow-node={n} className={styles.node} style={at(0.55 + (n - 1) * 0.26)}>
        {back ? (
          <svg viewBox="0 0 12 12" className={styles.nodeArrow} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9.5v-7M3 5.5l3-3 3 3" />
          </svg>
        ) : (
          n
        )}
      </span>
      <p className={styles.stepText}>
        <span className={styles.stepKey}>
          {step.key}
          <span className={styles.srOnly}>: </span>
        </span>
        {step.text}
      </p>
    </div>
  );
}

export function ModuleTile({ module }: { module: ArchitectureModule }) {
  /* No id from module.anchor here: #data-pipelines, #master-data and the
     other module hashes land in the [02] walkthrough (teardownData
     MODULE_ANCHOR_ALIASES). The tile keeps its modules-* and older aliases.
     Its arrow opens the module's sheet in [09] Capabilities and connections. */
  return (
    <a href={`#reference-${module.reference}`} className={styles.tile}>
      {module.aliases.map((alias) => (
        <span key={alias} id={alias} className={styles.anchor} />
      ))}
      <span className={styles.tileHead}>
        <span className={styles.badge}>
          <ArchitectureIcon name={module.icon} className={styles.badgeIcon} />
        </span>
        <span className={styles.tileName}>{module.name}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={styles.tileArrow}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.tileLine}>{module.line}</span>
    </a>
  );
}

/* A named part with its glyph and one plain line: a governance control or
   a part of the knowledge layer. */
export function Facet({ facet, className }: { facet: ArchitectureFacet; className?: string }) {
  return (
    <li className={cx(styles.facet, className)}>
      <span className={styles.facetMark}>
        <ArchitectureIcon name={facet.icon} className={styles.facetIcon} />
      </span>
      <span className={styles.facetText}>
        <span className={styles.facetName}>{facet.name}</span>
        {facet.detail && <span className={styles.facetDetail}>{facet.detail}</span>}
      </span>
    </li>
  );
}

export function TeamChip({ team }: { team: ArchitectureFacet }) {
  return (
    <li className={styles.team}>
      <span className={styles.teamMark}>
        <ArchitectureIcon name={team.icon} className={styles.teamIcon} />
      </span>
      {team.name}
    </li>
  );
}

export function SourceChip({ source }: { source: ArchitectureSource }) {
  return (
    <li className={styles.source}>
      {source.logo === "documents" ? (
        <ArchitectureIcon name="documents" className={styles.sourceLogo} />
      ) : (
        <ConnectorLogo id={source.logo} className={styles.sourceLogo} />
      )}
      <span>{source.name}</span>
    </li>
  );
}
