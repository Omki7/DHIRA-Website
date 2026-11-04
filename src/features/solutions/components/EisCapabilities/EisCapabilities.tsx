"use client";

import { useState } from "react";
import type { EisGuaranteeId, EisPage } from "@/content/pages/solutions-eis";
import { PreviewTag, ScrollReveal, ScrollRevealRail, SectionHeader, Tag } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { EisGovernanceInspectorMockup } from "../../mockups/EisGovernanceInspectorMockup";
import styles from "./EisCapabilities.module.scss";

export interface EisCapabilitiesProps {
  content: EisPage["capabilities"];
}

/* [capabilities] Section [04]: Enterprise governance. Master and detail:
   three guarantees on the left, the evidence for the picked one on the
   right. The picked guarantee is highlighted with blue-subtle on
   blue-border, as highlighted records are (DESIGN_SYSTEM §4). */
export function EisCapabilities({ content }: EisCapabilitiesProps) {
  const [activeId, setActiveId] = useState<EisGuaranteeId>(content.guarantees[0].id);
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <section id="capabilities" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num="04"
          label="ENTERPRISE GOVERNANCE"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className={styles.studio}>
          <div className={styles.guarantees}>
            {content.guarantees.map((g) => {
              const isSelected = activeId === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setActiveId(g.id);
                    if (g.id !== "execution") setIsAuthorized(false);
                  }}
                  className={cx(styles.guarantee, isSelected && styles.guaranteeActive)}
                >
                  <span className={styles.guaranteeHead}>
                    <span className={styles.guaranteeTag}>{g.tag}</span>
                    {g.preview && <PreviewTag />}
                  </span>
                  <span className={styles.guaranteeTitle}>{g.title}</span>
                  <span className={styles.guaranteeBody}>{g.headline}</span>
                  <span className={styles.proofs}>
                    {g.proofs.map((proof) => (
                      <Tag key={proof} tone="muted">
                        {proof}
                      </Tag>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <ScrollReveal delay={100} className={styles.evidence}>
            <EisGovernanceInspectorMockup
              active={activeId}
              isAuthorized={isAuthorized}
              onAuthorize={() => setIsAuthorized(true)}
              onReset={() => setIsAuthorized(false)}
            />
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
