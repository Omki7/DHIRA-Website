"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import type { AkashicReference, ReferenceLayer } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { sectionScrollTop } from "@/shared/utils/navigation";
import { ArchitectureIcon } from "../AkashicModules/ArchitectureIcon";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import { LAYER_TONES, ReferenceSheet } from "./ReferenceSheet";
import styles from "./AkashicStack.module.scss";

/*
 * [09] Capabilities and connections, rebuilt 5 Nov 2026 in [05]'s language
 * (user: "elevate the design like how we did for 05… enterprise grade").
 * A module index grouped by [05]'s layers (Data, Intelligence, Governance,
 * each in its arch-* tone; read from the data up, with [05]'s module order
 * inside each layer), and the chosen module's specification sheet beside
 * it. ARIA tabs: arrow keys, Home and End move between modules.
 *
 * Every `#reference-<id>` link on the page (the [05] module tiles) selects
 * its sheet and scrolls to it; a URL with that hash does the same on load.
 * All seven sheets are server-rendered; without JS they show stacked.
 */
const PREFIX = "reference-";
const LAYER_ORDER: ReferenceLayer[] = ["data", "intel", "gov"];

export interface AkashicStackProps {
  content: AkashicReference;
}

export function AkashicStack({ content: c }: AkashicStackProps) {
  const [active, setActive] = useState(c.modules[0]?.id ?? "");
  const tabs = useRef(new Map<string, HTMLButtonElement>());

  const groups = LAYER_ORDER.map((layer) => ({
    layer,
    modules: c.modules.filter((m) => m.layer === layer),
  })).filter((g) => g.modules.length > 0);
  const order = groups.flatMap((g) => g.modules.map((m) => m.id));

  useEffect(() => {
    const ids = new Set(c.modules.map((m) => m.id));
    const show = (id: string) => {
      if (!ids.has(id)) return;
      flushSync(() => setActive(id));
      const sheet = document.getElementById(PREFIX + id);
      if (!sheet) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: sectionScrollTop(sheet), behavior: reduced ? "instant" : "smooth" });
    };
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith(PREFIX)) show(hash.slice(PREFIX.length));
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>(`a[href^="#${PREFIX}"]`);
      if (!link) return;
      const id = link.hash.slice(PREFIX.length + 1);
      if (!ids.has(id)) return;
      event.preventDefault();
      window.history.pushState(null, "", link.hash);
      show(id);
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, [c.modules]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const i = order.indexOf(id);
    const n = order.length;
    let next: string | undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = order[(i + 1) % n];
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = order[(i - 1 + n) % n];
    else if (event.key === "Home") next = order[0];
    else if (event.key === "End") next = order[n - 1];
    if (!next) return;
    event.preventDefault();
    setActive(next);
    tabs.current.get(next)?.focus();
  };

  return (
    <section id="stack" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={c.number}>{c.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={c.setup} tone="reference">
              {c.title}
            </StoryTitle>
            <p className={styles.intro}>{c.intro}</p>
          </div>
        </ScrollReveal>

        <div className={styles.console}>
          <div role="tablist" aria-label={c.indexLabel} aria-orientation="vertical" className={styles.index}>
            {groups.map((group) => (
              <div key={group.layer} className={cx(styles.layerGroup, LAYER_TONES[group.layer])}>
                <p aria-hidden="true" className={styles.layerName}>
                  {c.layers[group.layer]}
                </p>
                <div className={styles.layerTabs}>
                  {group.modules.map((m) => {
                    const selected = m.id === active;
                    return (
                      <button
                        key={m.id}
                        ref={(node) => {
                          if (node) tabs.current.set(m.id, node);
                          else tabs.current.delete(m.id);
                        }}
                        type="button"
                        role="tab"
                        id={`reference-tab-${m.id}`}
                        aria-selected={selected}
                        aria-controls={PREFIX + m.id}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActive(m.id)}
                        onKeyDown={(event) => onKeyDown(event, m.id)}
                        className={styles.tab}
                      >
                        <span className={styles.badge}>
                          <ArchitectureIcon name={m.glyph} className={styles.badgeIcon} />
                        </span>
                        <span className={styles.tabText}>
                          <span className={styles.tabName}>{m.name}</span>
                          <span className={styles.tabLine}>{m.tagline}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sheets}>
            {c.modules.map((m) => (
              <ReferenceSheet
                key={m.id}
                module={m}
                layerName={c.layers[m.layer]}
                chartTypes={c.chartTypes}
                hidden={m.id !== active}
              />
            ))}
          </div>
        </div>

        <p className={styles.note}>{c.note}</p>
      </div>
    </section>
  );
}
