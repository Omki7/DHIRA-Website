"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    const openAnchor = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("reference-")) return;
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
      const panel = document.getElementById(link.hash.slice(1));
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
        <div className={styles.index}>
          {c.modules.map((m, i) => (
            <details
              id={"reference-" + m.id}
              key={m.id}
              open={i === 0}
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
