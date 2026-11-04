import Link from "next/link";
import type { AboutPage } from "@/content/pages/about";
import { NextJoinDrawing } from "./NextJoinDrawing";
import styles from "./AboutClose.module.scss";

/*
 * [06] The close: the page's last step widens to the reader.
 *
 * A centred closing card (DESIGN_SYSTEM §3.6), so its kicker carries no
 * number. [03]'s joined systems return in miniature with one standing apart,
 * the reader's own; the headline answers the hero's "makes all your data
 * agree". One action. Careers is reached from [05], which also carries the
 * old #careers and #join-us anchors.
 */

export interface AboutCloseProps {
  content: AboutPage["close"];
}

export function AboutClose({ content }: AboutCloseProps) {
  return (
    <section id="talk-to-our-team" aria-labelledby="about-close-title" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.card}>
          <NextJoinDrawing joined={content.drawing.joined} yours={content.drawing.yours} />
          <p className={styles.kicker} data-about-reveal="0">
            {content.label}
          </p>
          <h2 id="about-close-title" className={styles.title} data-about-reveal="70">
            <span className={styles.setup}>{content.setup}</span> {content.title}
          </h2>
          <p className={styles.intro} data-about-reveal="120">
            {content.intro}
          </p>
          <div className={styles.actions} data-about-reveal="160">
            <Link href={content.primary.href} className="btn-primary btn-lg">
              {content.primary.label}
            </Link>
          </div>
          <p className={styles.offices}>
            <span className={styles.officesLabel}>{content.locationLabel}</span>
            {content.offices.map((office) => (
              <span key={office} className={styles.office}>
                {office}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
