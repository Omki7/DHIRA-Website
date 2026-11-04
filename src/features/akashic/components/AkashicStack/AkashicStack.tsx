"use client";

import { useEffect, useState } from "react";
import type { AkashicPage, Group } from "@/content/pages/akashic";
import { ConnectorLogo } from "@/shared/components/icons";
import { PreviewTag, ScrollReveal } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicStack.module.scss";

function ReferenceGroup({
  group,
  chartTypes,
}: {
  group: Group;
  chartTypes: string;
}) {
  if (group.kind === "badges") return null;
  return (
    <div className={styles.group}>
      <h4>
        {group.label}
        {group.kind === "cap" && group.preview && (
          <PreviewTag className={styles.previewTag} />
        )}
      </h4>
      {group.kind === "conn" ? (
        <ul className={styles.connectorList}>
          {group.items.map((item) => (
            <li key={item.name}>
              <span aria-hidden="true" className={styles.connectorMark}>
                <ConnectorLogo id={item.logo} />
              </span>
              {item.name}
            </li>
          ))}
        </ul>
      ) : group.kind === "cap" ? (
        <dl className={group.items.length === 4 ? styles.pairs : ""}>
          {group.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              {item.sub && <dd>{item.sub}</dd>}
            </div>
          ))}
        </dl>
      ) : (
        <p className={styles.charts}>{chartTypes}</p>
      )}
    </div>
  );
}

export interface AkashicStackProps {
  content: AkashicPage["reference"];
}

export function AkashicStack({ content: c }: AkashicStackProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => ({
    [c.modules[0]?.id]: true,
  }));

  const openCount = c.modules.filter((m) => openMap[m.id]).length;
  const allExpanded = openCount === c.modules.length;
  const allCollapsed = openCount === 0;

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    c.modules.forEach((m) => {
      all[m.id] = true;
    });
    setOpenMap(all);
  };

  const collapseAll = () => {
    setOpenMap({});
  };

  useEffect(() => {
    const openAnchor = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("reference-")) return;
      const modId = id.replace(/^reference-/, "");
      setOpenMap((prev) => ({ ...prev, [modId]: true }));
      const panel = document.getElementById(id);
      if (panel instanceof HTMLDetailsElement) {
        panel.open = true;
        requestAnimationFrame(() =>
          panel.scrollIntoView({ block: "start", behavior: "instant" })
        );
      }
    };
    const openLinkedPanel = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>(
        'a[href^="#reference-"]'
      );
      if (!link) return;
      const panelId = link.hash.slice(1);
      const modId = panelId.replace(/^reference-/, "");
      setOpenMap((prev) => ({ ...prev, [modId]: true }));
      const panel = document.getElementById(panelId);
      if (panel instanceof HTMLDetailsElement) panel.open = true;
    };
    openAnchor();
    window.addEventListener("hashchange", openAnchor);
    document.addEventListener("click", openLinkedPanel);
    return () => {
      window.removeEventListener("hashchange", openAnchor);
      document.removeEventListener("click", openLinkedPanel);
    };
  }, []);

  return (
    <section id="stack" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={c.number}>{c.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={c.setup}>{c.title}</StoryTitle>
            <p className={styles.intro}>{c.intro}</p>
          </div>
        </ScrollReveal>

        <div className={styles.toolbar}>
          <span className={styles.counter}>
            {c.modules.length} modules · {openCount} open
          </span>
          <div className={styles.controls} role="group" aria-label="Module accordion controls">
            <button
              type="button"
              onClick={expandAll}
              className={styles.toggleBtn}
              disabled={allExpanded}
              aria-pressed={allExpanded}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className={styles.toggleBtn}
              disabled={allCollapsed}
              aria-pressed={allCollapsed}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 7.5L6 4L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Collapse all
            </button>
          </div>
        </div>

        <div className={styles.index}>
          {c.modules.map((m) => (
            <details
              id={"reference-" + m.id}
              key={m.id}
              open={Boolean(openMap[m.id])}
              onToggle={(e) => {
                const isOpen = e.currentTarget.open;
                setOpenMap((prev) => (prev[m.id] === isOpen ? prev : { ...prev, [m.id]: isOpen }));
              }}
              className={styles.module}
            >
              <summary>
                <div className={styles.nameWrap}>
                  <h3>{m.name}</h3>
                  <span className={styles.tagline}>{m.tagline}</span>
                </div>
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <div className={styles.content}>
                <p className={styles.desc}>{m.desc}</p>
                <div className={styles.groups}>
                  {m.groups.map((g) => (
                    <ReferenceGroup
                      key={g.label}
                      group={g}
                      chartTypes={c.chartTypes}
                    />
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className={styles.note}>{c.note}</p>
      </div>
    </section>
  );
}
