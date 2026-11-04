import Image from "next/image";
import Link from "next/link";
import type { LifePage } from "@/content/pages/solutions-life";
import { AkashicWordmark } from "@/shared/components/icons";
import { ScrollRevealRail } from "@/shared/components/ui";
import styles from "./LifeHero.module.scss";

export interface LifeHeroProps {
  content: LifePage["hero"];
}

/*
 * [hero] Kept from the 23 Jul 2026 page (user's pick, 5 Nov 2026): the
 * headline on the left and the point-of-care photograph on the right, on
 * the page's pale ground. Brought into the family: the homepage pill badge
 * with its travelling arc, the hero type scale, and the site's button pair
 * in place of the cyan capsules. Below lg the photograph follows the
 * buttons instead of disappearing.
 */
export function LifeHero({ content }: LifeHeroProps) {
  const platformLead = content.badge.platform.replace(/\s*Akashic$/, "");
  return (
    <section id="hero" className={styles.hero}>
      <ScrollRevealRail>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.badge}>
              <span aria-hidden className={styles.badgeArc} />
              <span className={styles.badgeInner}>
                <span className={styles.badgeProduct}>{content.badge.product}</span>
                <span aria-hidden className={styles.badgeDivider} />
                <span className={styles.badgePlatform}>
                  {platformLead} <AkashicWordmark />
                </span>
              </span>
            </span>

            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.lede}>{content.lede}</p>

            <div className={styles.actions}>
              <Link href={content.primary.href} className="btn-primary">
                {content.primary.label}
              </Link>
              <Link href={content.secondary.href} className="btn-secondary">
                {content.secondary.label}
              </Link>
            </div>
          </div>

          <div className={styles.photo}>
            <Image
              src="/proof/point-of-care.jpg"
              alt={content.photoAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className={styles.image}
            />
          </div>
        </div>
      </ScrollRevealRail>

      <a href="#the-gap" aria-label={content.skipLabel} className={styles.skip}>
        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden="true">
          <path
            d="M10 4v16M4.5 14.5 10 20.5l5.5-6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
