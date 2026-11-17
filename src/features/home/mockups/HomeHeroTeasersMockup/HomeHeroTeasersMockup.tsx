/**
 * SIMULATED PRODUCT UI: the fragments around the homepage pitch. One shell
 * for every fragment: a hairline frame, a solid header surface naming the
 * module, solution or service line, and a native-size outcome below it.
 *
 * 17 Nov 2026, fourth pass (user: no images under the tabs; left and right,
 * as they were that morning): six fragments per offering, three each side
 * of the headline in the morning's places (xl and up). Each slot stacks its
 * fragment from every offering in one grid cell, so a swap moves nothing.
 * Below xl there is no room beside the headline, so the first three slots
 * form a row under the offerings (two from sm, one on phones).
 * Rendered once, entering by CSS, so the fragments show without JavaScript.
 */
import { useId, type CSSProperties } from "react";
import type { HomeHeroModule, HomeHeroOffering } from "@/content/pages/home";
import { HomeModuleIllustrationsMockup } from "../HomeModuleIllustrationsMockup";
import styles from "./HomeHeroTeasersMockup.module.scss";

/* Slots follow the fragments' reading order in home.ts: even ones down the
   left, odd ones down the right. */
const SIDES = [
  { side: "left", slots: [0, 2, 4] },
  { side: "right", slots: [1, 3, 5] },
] as const;

function Teaser({ module, active }: { module: HomeHeroModule; active: boolean }) {
  const captionId = useId();
  return (
    <figure className={styles.teaser} data-active={active} aria-hidden={!active} aria-labelledby={captionId}>
      <figcaption id={captionId} className={styles.header}>
        <span className={styles.module}>{module.module}</span>
        <span className={styles.srOnly}>
          {module.title}. {module.description}
        </span>
      </figcaption>
      <div className={styles.drawing} aria-hidden>
        <HomeModuleIllustrationsMockup kind={module.kind} />
      </div>
    </figure>
  );
}

export interface HomeHeroTeasersMockupProps {
  offerings: readonly HomeHeroOffering[];
  active: number;
}

export function HomeHeroTeasersMockup({ offerings, active }: HomeHeroTeasersMockupProps) {
  return (
    <div className={styles.field}>
      {SIDES.map(({ side, slots }) => (
        <div key={side} className={styles.side} data-side={side}>
          {slots.map((slot) => (
            <div
              key={slot}
              className={styles.slot}
              data-slot={slot}
              style={{ "--slot": slot, "--row": Math.floor(slot / 2) } as CSSProperties}
            >
              {offerings.map((offering, index) => (
                <Teaser key={offering.id} module={offering.fragments[slot]} active={index === active} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
