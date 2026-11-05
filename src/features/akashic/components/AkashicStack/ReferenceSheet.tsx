import type { Group, ModuleDef, ReferenceLayer } from "@/content/pages/akashic";
import { ConnectorLogo } from "@/shared/components/icons";
import { PreviewTag, Tag } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { ArchitectureIcon } from "../AkashicModules/ArchitectureIcon";
import styles from "./AkashicStack.module.scss";

/* One module's specification sheet in [09]: a header in the module's [05]
   layer colour, the plain description, then hairline spec rows (a mono key,
   then connectors, capabilities or chart types). Preview capabilities are
   dashed and tagged, as everywhere on the site. */

export const LAYER_TONES: Record<ReferenceLayer, string> = {
  data: styles.toneData,
  intel: styles.toneIntel,
  gov: styles.toneGov,
};

function ReferenceGroup({ group, chartTypes }: { group: Group; chartTypes: string }) {
  const preview = group.kind === "cap" && group.preview;
  return (
    <div className={styles.group}>
      <h4 className={styles.groupKey}>
        {group.label}
        {preview && <PreviewTag className={styles.previewTag} />}
      </h4>
      {group.kind === "conn" && (
        <ul className={styles.connectors}>
          {group.items.map((item) => (
            <li key={item.name}>
              <span aria-hidden="true" className={styles.logo}>
                <ConnectorLogo id={item.logo} />
              </span>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {group.kind === "cap" && (
        <dl
          className={cx(
            styles.caps,
            (group.items.length === 3 || group.items.length >= 5) && styles.capsWide,
            preview && styles.capsPreview,
          )}
        >
          {group.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              {item.sub && <dd>{item.sub}</dd>}
            </div>
          ))}
        </dl>
      )}
      {group.kind === "charts" && (
        <ul className={styles.tags}>
          {chartTypes.split(" · ").map((type) => (
            <li key={type}>
              <Tag>{type}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface ReferenceSheetProps {
  module: ModuleDef;
  layerName: string;
  chartTypes: string;
  hidden: boolean;
}

export function ReferenceSheet({ module: m, layerName, chartTypes, hidden }: ReferenceSheetProps) {
  return (
    <section
      role="tabpanel"
      id={`reference-${m.id}`}
      aria-labelledby={`reference-tab-${m.id}`}
      hidden={hidden}
      tabIndex={0}
      className={cx(styles.sheet, LAYER_TONES[m.layer])}
    >
      <header className={styles.sheetHead}>
        <span className={styles.sheetBadge}>
          <ArchitectureIcon name={m.glyph} className={styles.sheetIcon} />
        </span>
        <div className={styles.sheetTitle}>
          <h3>{m.name}</h3>
          {/* Governance is its own layer: name it once. */}
          <p>{layerName === m.name ? m.tagline : `${layerName} layer · ${m.tagline}`}</p>
        </div>
      </header>
      <div className={styles.sheetBody}>
        <p className={styles.desc}>{m.desc}</p>
        <div className={styles.groups}>
          {m.groups.map((group) => (
            <ReferenceGroup key={group.label} group={group} chartTypes={chartTypes} />
          ))}
        </div>
      </div>
    </section>
  );
}
