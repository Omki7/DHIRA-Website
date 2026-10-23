"use client";
import { useEffect } from "react";
import ConnectorLogo from "@/components/icons/ConnectorLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { AkashicPage, Group } from "@/content/pages/akashic";
import { StoryLabel, StoryTitle, PreviewTag } from "@/components/sections/akashic/AkashicStory";

function ReferenceGroup({ group, chartTypes }: { group: Group; chartTypes: string }) {
  if (group.kind === "badges") return null;
  return <div className="ak-reference-group"><h4>{group.label}{group.kind === "cap" && group.preview && <PreviewTag className="ml-2 align-[1px]" />}</h4>
    {group.kind === "conn" ? <ul className="ak-connector-list">{group.items.map(item => <li key={item.name}><span aria-hidden="true" className="ak-connector-mark"><ConnectorLogo id={item.logo} /></span>{item.name}</li>)}</ul>
    : group.kind === "cap" ? <dl className={group.items.length === 4 ? "ak-reference-pairs" : ""}>{group.items.map(item => <div key={item.term}><dt>{item.term}</dt>{item.sub && <dd>{item.sub}</dd>}</div>)}</dl>
    : <p className="ak-reference-charts">{chartTypes}</p>}
  </div>;
}
export default function AkashicStack({ content: c }: { content: AkashicPage["reference"] }) {
  useEffect(() => {
    const openAnchor = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("reference-")) return;
      const panel = document.getElementById(id);
      if (panel instanceof HTMLDetailsElement) {
        panel.open = true;
        requestAnimationFrame(() => panel.scrollIntoView({ block: "start", behavior: "instant" }));
      }
    };
    const openLinkedPanel = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#reference-"]');
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
  return <section id="stack" className="ak-story ak-reference"><div className="ak-story-wrap">
    <ScrollReveal><StoryLabel number={c.number}>{c.label}</StoryLabel><div className="ak-story-heading"><StoryTitle setup={c.setup}>{c.title}</StoryTitle><p className="ak-story-intro">{c.intro}</p></div></ScrollReveal>
    <div className="ak-reference-index">{c.modules.map((m, i) => <details id={"reference-" + m.id} key={m.id} open={i === 0} className="ak-reference-module">
      <summary><div className="ak-reference-name"><h3>{m.name}</h3><span className="ak-reference-tagline">{m.tagline}</span></div><span className="ak-reference-plus" aria-hidden="true" /></summary>
      <div className="ak-reference-content"><p className="ak-reference-desc">{m.desc}</p><div className="ak-reference-groups">{m.groups.map(g => <ReferenceGroup key={g.label} group={g} chartTypes={c.chartTypes} />)}</div></div>
    </details>)}</div><p className="ak-reference-note">{c.note}</p>
  </div></section>;
}
