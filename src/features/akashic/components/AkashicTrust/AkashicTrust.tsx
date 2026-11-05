import type { AkashicPage, ControlIcon } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicTrust.module.scss";

/*
 * [07] Privacy and control (merged 5 Nov 2026 from [06] Trust and [07] Open,
 * platform audit). The section's shape is a two-column ledger: what stays
 * private, and what stays open, three rows each, then the certifications
 * and the laws followed as two separate, labelled lines. It sits on the
 * page's one soft blue band (Rule 5a), which [07] Open carried before.
 * The open group keeps the #open anchor that other pages link to.
 */

const ICONS: Record<ControlIcon, string> = {
  "no-training":
    "M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A11 11 0 0112 5c5 0 9 7 9 7a17 17 0 01-3 3.8M6.2 6.2A17 17 0 003 12s4 7 9 7a11 11 0 005.8-1.8",
  permissions: "M4 4h16v16H4zM4 9h16M10 4v16M14 13h3M14 17h3",
  definitions: "M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6",
  inspect: "M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14",
  extend: "M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4",
  keep: "M4 14v6h16v-6M12 3v12M7.5 10.5L12 15l4.5-4.5",
};

function ControlGlyph({ icon }: { icon: ControlIcon }) {
  return (
    <span className={styles.glyph} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ICONS[icon]} />
      </svg>
    </span>
  );
}

export interface AkashicTrustProps {
  content: AkashicPage["trust"];
}

export function AkashicTrust({ content }: AkashicTrustProps) {
  return (
    <section id="trust" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.titleWrap}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
          </div>
          <p className={styles.intro}>{content.intro}</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.groups}>
            {content.groups.map((group) => (
              <div key={group.id} className={styles.group}>
                {/* Other pages link to /akashic#open: it lands on this group. */}
                <span id={group.id} className={styles.anchor} aria-hidden="true" />
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <dl className={styles.rows}>
                  {group.items.map((item) => (
                    <div key={item.title} className={styles.row}>
                      <ControlGlyph icon={item.icon} />
                      <div>
                        <dt>{item.title}</dt>
                        <dd>{item.text}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <dl className={styles.frameworks}>
            {content.frameworks.map((framework) => (
              <div key={framework.label} className={styles.framework}>
                <dt>{framework.label}</dt>
                <dd>
                  <ul>
                    {framework.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
