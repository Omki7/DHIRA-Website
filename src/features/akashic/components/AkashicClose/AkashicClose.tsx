import Link from "next/link";
import type { AkashicPage } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { StoryArrow, StoryLabel } from "../AkashicStory";
import styles from "./AkashicClose.module.scss";

export interface AkashicCloseProps {
  content: AkashicPage["close"];
}

export function AkashicClose({ content: c }: AkashicCloseProps) {
  return (
    <section id="talk-to-our-team" className={styles.section}>
      <span id="login" />
      <div className={styles.wrap}>
        <ScrollReveal>
          <div className={styles.card}>
            <StoryLabel number={c.number} tone="card">
              {c.label}
            </StoryLabel>
            <div className={styles.body}>
              <div>
                <h2>
                  {c.setup}
                  <br />
                  <span>{c.title}</span>
                </h2>
                <p className={styles.intro}>{c.intro}</p>
                <div className={styles.actions}>
                  <Link href={c.primary.href} className="btn-primary btn-lg">
                    {c.primary.label}
                    <StoryArrow />
                  </Link>
                  <Link
                    href={c.secondary.href}
                    className="btn-secondary btn-lg"
                  >
                    {c.secondary.label}
                  </Link>
                </div>
              </div>
              <div className={styles.agenda}>
                {c.agenda.map((item, i) => (
                  <div key={item.label}>
                    <span className={styles.agendaLabel}>
                      0{i + 1} / {item.label}
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.footer}>
              <span>{c.footer}</span>
              <span aria-hidden="true">{c.flow}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
