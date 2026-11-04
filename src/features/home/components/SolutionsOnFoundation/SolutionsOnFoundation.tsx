import Link from "next/link";
import type { HomeSolution, HomeSolutions } from "@/content/pages/home";
import { nameOrWordmark } from "@/shared/components/icons";
import { SolutionIllustration } from "../SolutionIllustration";
import styles from "./SolutionsOnFoundation.module.scss";

export interface SolutionsOnFoundationProps {
  blocks: HomeSolution[];
  modules: string[];
  foundation: HomeSolutions["foundation"];
}

/* The shared base belongs to every solution. No selection or module subsets. */
export function SolutionsOnFoundation({ blocks, modules, foundation }: SolutionsOnFoundationProps) {
  return (
    <div>
      <ul className={styles.solutions}>
        {blocks.map((block) => (
          <li key={block.id} className={styles.solution}>
            <Link
              href={block.href}
              aria-labelledby={`home-solution-${block.id}`}
              className={styles.card}
            >
              <div className={styles.illustration}>
                <SolutionIllustration kind={block.id} label={block.illustrationLabel} />
              </div>
              <div className={styles.body}>
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
            </Link>
            <span aria-hidden="true" className={styles.stem} />
          </li>
        ))}
      </ul>

      {/* The stems meet one continuous rail before entering the platform. */}
      <div aria-hidden="true" className={styles.rail}>
        <span className={styles.railStem} />
      </div>
      <div className={styles.foundation}>
        <div className={styles.foundationHead}>
          <div className={styles.foundationName}>
            {nameOrWordmark(foundation.name)}
          </div>
          <div className={styles.foundationCopy}>
            <p className={styles.foundationCaption}>{foundation.caption}</p>
            <p className={styles.foundationDescription}>{foundation.description}</p>
          </div>
        </div>
        <ul className={styles.modules}>
          {modules.map((name) => (
            <li key={name} className={styles.module}>
              <span aria-hidden="true" className={styles.moduleDot} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
