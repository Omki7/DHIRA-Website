import type { AkashicPage } from "@/content/pages/akashic";
import { nameOrWordmark } from "@/shared/components/icons";
import { ScrollReveal } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicOpenFoundations.module.scss";

export interface AkashicOpenFoundationsProps {
  content: AkashicPage["open"];
}

export function AkashicOpenFoundations({ content }: AkashicOpenFoundationsProps) {
  return (
    <section id="open" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.titleWrap}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className={styles.principles}>
            {content.principles.map((principle, i) => (
              <article key={principle.title}>
                <svg
                  viewBox="0 0 120 48"
                  className={styles.mark}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  {i === 0 && (
                    <>
                      <rect x="2" y="12" width="24" height="24" rx="3" />
                      <rect x="34" y="12" width="24" height="24" rx="3" />
                      <rect
                        x="66"
                        y="12"
                        width="24"
                        height="24"
                        rx="3"
                        strokeDasharray="3 3"
                      />
                      <path d="M102 24h16M110 16v16" />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <path d="M3 7h77v34H3zM13 17h39M13 25h58M13 33h24" />
                      <path d="M93 15l-7 9 7 9M108 15l7 9-7 9" />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <rect x="2" y="10" width="35" height="28" rx="3" />
                      <path d="M37 24h22M59 24c14 0 14-15 28-15h28M59 24h56M59 24c14 0 14 15 28 15h28" />
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <path d="M5 5h37l10 10v28H5zM42 5v11h10M17 23h23M17 31h16M66 24h49M104 13l11 11-11 11" />
                    </>
                  )}
                </svg>
                <h3>{principle.title}</h3>
                <p>{principle.desc}</p>
                <span className={styles.detail}>{principle.detail}</span>
              </article>
            ))}
          </div>
        </ScrollReveal>
        <div className={styles.close}>
          <span className={styles.productName}>
            {nameOrWordmark(content.productName)}
          </span>
          <p>{content.close}</p>
        </div>
      </div>
    </section>
  );
}
