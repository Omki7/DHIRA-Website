"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomeVoices } from "@/content/pages/home";
import { cx } from "@/shared/utils/cx";
import styles from "./VoicesDispatches.module.scss";

export interface VoicesDispatchesProps {
  content: HomeVoices;
}

// A reader-led interview spread. The quote stays still until the reader moves on.
export function VoicesDispatches({ content }: VoicesDispatchesProps) {
  const HOME_VOICES = content.dispatches;
  const { highlight } = content;
  const [active, setActive] = useState(0);
  const dispatch = HOME_VOICES[active];

  return (
    <div className={styles.root}>
      <div className={styles.person}>
        <div className={styles.portrait}>
          <div className={styles.frame}>
            <Image key={dispatch.avatarPath} src={dispatch.avatarPath} alt={dispatch.name} width={240} height={300} sizes="(min-width: 1024px) 200px, 144px" className={styles.photo} />
          </div>
          <span aria-hidden="true" className={styles.badge}>{dispatch.index}</span>
        </div>
        <div className={styles.meta}>
          <p className={styles.name}>{dispatch.name}</p>
          <p className={styles.role}>{dispatch.role}</p>
          <p className={styles.org}>{dispatch.org}</p>
        </div>
      </div>

      <div className={styles.quoteColumn}>
        <div className={styles.quoteStage} aria-live="polite" aria-atomic="true">
          <span aria-hidden="true" className={styles.mark}>“</span>
          {HOME_VOICES.map((item, index) => (
            <blockquote key={item.index} aria-hidden={index !== active} className={cx(styles.quote, index === active ? styles.visible : styles.invisible)}>
              {item.quote.split(new RegExp(`(${highlight})`, "g")).map((part, i) => part === highlight ? <span key={i} className={styles.highlight}>{part}</span> : part)}
            </blockquote>
          ))}
        </div>
        <div className={styles.controls}>
          <p className={styles.counter}>{dispatch.index} / 0{HOME_VOICES.length}</p>
          <button type="button" aria-label={content.previous} onClick={() => setActive((active + HOME_VOICES.length - 1) % HOME_VOICES.length)} className={styles.step}><span aria-hidden="true">←</span></button>
          <button type="button" aria-label={content.next} onClick={() => setActive((active + 1) % HOME_VOICES.length)} className={styles.step}><span aria-hidden="true">→</span></button>
        </div>
      </div>

      <div role="group" aria-label={content.chooser} className={styles.chooser}>
        {HOME_VOICES.map((item, index) => (
          <button key={item.index} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={cx(styles.choice, active === index ? styles.choiceActive : styles.choiceIdle)}>
            <span className={cx(styles.choiceRule, active === index ? styles.choiceRuleActive : styles.choiceRuleIdle)} />
            <span className={cx(styles.choiceIndex, active === index ? styles.choiceIndexActive : styles.choiceIndexIdle)}>{item.index}</span>
            <span><span className={styles.choiceName}>{item.name}</span><span className={styles.choiceOrg}>{item.org}</span></span>
            <span aria-hidden="true" className={styles.choiceArrow}>{active === index ? "↗" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
