import type { LifePage } from "@/content/pages/solutions-life";
import { AkashicWordmark } from "@/shared/components/icons";
import { DrawnFigure, ScrollRevealRail, SectionHeader, SectionLink } from "@/shared/components/ui";
import { OneGround } from "./OneGround";
import styles from "./LifeFoundation.module.scss";

export interface LifeFoundationProps {
  content: LifePage["foundation"];
  /** The section's place in the page's order. */
  num: string;
}

/*
 * [built-on-akashic] The proof is what Akashic Life is built on (5 Nov 2026,
 * docs/LIFE_PAGE_SCRIPT.md). Replaces the circle chain, the three-layer
 * register and the stake statement. Akashic Life carries no figures of its
 * own (the page's claims rules), so the figures here are the national
 * programmes', as on home and /about, unnamed beyond their platform names.
 * One onward link to /akashic. Below xl the drawing gives way to the same
 * facts as ruled rows. Old anchors `#record-of-work`, `#how-its-built` and
 * `#the-stake` land here.
 */
export function LifeFoundation({ content, num }: LifeFoundationProps) {
  return (
    <section id="built-on-akashic" className={styles.section}>
      <span id="record-of-work" aria-hidden="true" className={styles.alias} />
      <span id="how-its-built" aria-hidden="true" className={styles.alias} />
      <span id="the-stake" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        >
          <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
        </SectionHeader>

        <DrawnFigure className={styles.board} threshold={0.3}>
          <OneGround content={content} />

          {/* Below xl: the same facts, ruled. Akashic Life heads the
              modules it runs on, under the ground line. */}
          <div className={styles.rows}>
            <ul className={styles.programmes}>
              {content.programmes.map((programme) => (
                <li key={programme.name} className={styles.programmeRow}>
                  <p className={styles.figure}>{programme.figure}</p>
                  <p className={styles.figureLabel}>{programme.label}</p>
                  <p className={styles.programme}>{programme.name}</p>
                </li>
              ))}
            </ul>
            <p className={styles.rowsGround}>
              <AkashicWordmark />
              <span className={styles.groundNote}>{content.ground}</span>
            </p>
            <div className={styles.modules}>
              <p className={styles.lifeName}>{content.life.name}</p>
              <p className={styles.lifeLabel}>{content.life.label}</p>
              <ul className={styles.moduleList}>
                {content.roots.map((r) => (
                  <li key={r.module} className={styles.moduleRow}>
                    <p className={styles.module}>{r.module}</p>
                    <p className={styles.moduleName}>{r.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DrawnFigure>
      </ScrollRevealRail>
    </section>
  );
}
