/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI: the governance inspector beside [04]'s three
 * guarantees. It shows the evidence for the guarantee the reader picked.
 *
 * Drawn flat like the homepage and /akashic mockups (4 Nov 2026): a mono
 * header line instead of browser chrome, opaque surfaces (no tints by
 * opacity), severity from the shared diagram colours, no checkmark
 * (Rule 2). The section owns the state; this only draws it.
 * --------------------------------------------------------------------- */

import type { EisGuaranteeId } from "@/content/pages/solutions-eis";
import { cx } from "@/shared/utils/cx";
import { CorrelationPanel, ExecutionPanel, MetricPanel } from "./panels";
import styles from "./EisGovernanceInspectorMockup.module.scss";

export interface EisGovernanceInspectorMockupProps {
  active: EisGuaranteeId;
  isAuthorized: boolean;
  onAuthorize: () => void;
  onReset: () => void;
}

export function EisGovernanceInspectorMockup({
  active,
  isAuthorized,
  onAuthorize,
  onReset,
}: EisGovernanceInspectorMockupProps) {
  return (
    <div className={styles.root}>
      <div className={cx(styles.label, styles.head)}>
        <span className={styles.headTitle}>Governance inspector</span>
        <span className={styles.headStatus}>
          <span aria-hidden className={styles.statusDot} />
          G-1 verified
        </span>
      </div>

      <div className={styles.body}>
        {active === "metric" && <MetricPanel />}
        {active === "correlation" && <CorrelationPanel />}
        {active === "execution" && (
          <ExecutionPanel isAuthorized={isAuthorized} onAuthorize={onAuthorize} onReset={onReset} />
        )}
      </div>

      <div className={cx(styles.label, styles.foot)}>
        <span>Audit trail: cryptographically verified</span>
        <span>Zero data mutation without executive consent</span>
      </div>
    </div>
  );
}
