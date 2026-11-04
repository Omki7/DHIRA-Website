import Link from "next/link";
import type { CSSProperties } from "react";
import type { HomeSolution, HomeSolutions } from "@/content/pages/home";
import { nameOrWordmark } from "@/shared/components/icons";
import { DrawnFigure } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { SolutionIllustration } from "../SolutionIllustration";
import styles from "./SolutionsOnFoundation.module.scss";

export interface SolutionsOnFoundationProps {
  blocks: HomeSolution[];
  modules: string[];
  foundation: HomeSolutions["foundation"];
}

/* Three solutions standing on one platform, built as one plate (4 Nov 2026,
   user: [03] did not feel at the level of the rest of the page). Each bay
   names its solution, then its process drawing rests on the Akashic
   foundation that runs under all three; ground, drawing and foundation
   deepen in step (background, primary-bg, depth). Pointing at a solution
   lights its socket and all seven modules: every solution uses the whole
   platform (user, 21 Oct 2026). No selection, no module subsets. */
export function SolutionsOnFoundation({ blocks, modules, foundation }: SolutionsOnFoundationProps) {
  return (
    <div className={styles.plate}>
      <ul className={styles.solutions}>
        {blocks.map((block, i) => (
          <li key={block.id} className={styles.solution}>
            <Link href={block.href} aria-labelledby={`home-solution-${block.id}`} className={styles.card}>
              <div className={styles.copy}>
                <p className={styles.audience}>{block.audience}</p>
                <h3 id={`home-solution-${block.id}`} className={styles.name}>
                  {block.name}
                </h3>
                <p className={styles.benefit}>{block.benefit}</p>
                <span className={styles.more}>
                  <span className={styles.moreLabel}>{block.linkLabel}</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={styles.moreArrow} aria-hidden="true">
                    <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <DrawnFigure className={styles.scene} threshold={0.4}>
                <SolutionIllustration kind={block.id} label={block.illustrationLabel} delay={i * 0.18} />
              </DrawnFigure>
            </Link>
            {/* Where the bay plugs into the platform. */}
            <span aria-hidden="true" className={styles.socket} />
          </li>
        ))}
      </ul>

      <DrawnFigure className={styles.foundation} threshold={0.5}>
        <div className={styles.foundationHead}>
          <div className={styles.foundationName}>{nameOrWordmark(foundation.name)}</div>
          <div className={styles.foundationCopy}>
            <p className={styles.foundationCaption}>{foundation.caption}</p>
            <p className={styles.foundationDescription}>{foundation.description}</p>
          </div>
        </div>
        <ul className={styles.modules}>
          {modules.map((name, i) => (
            <li key={name} className={cx(styles.module, "ad-fade")} style={{ ["--ad-delay" as string]: `${0.1 + i * 0.06}s`, ["--i" as string]: i } as CSSProperties}>
              <span aria-hidden="true" className={styles.moduleMark} />
              {name}
            </li>
          ))}
        </ul>
      </DrawnFigure>
    </div>
  );
}
