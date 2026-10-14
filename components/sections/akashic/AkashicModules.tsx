import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { AKASHIC_STORY, dataLayerModules, intelligenceLayerModules } from "@/lib/akashicSections";
import { StoryLabel, StoryTitle, PreviewTag } from "@/components/sections/akashic/AkashicStory";
const c = AKASHIC_STORY.architecture;
const referenceIds = ["pipelines", "master-data", "warehouse", "ml", "ask", "bi"];
/* Modules with AI agents in preview carry one dashed line under their
   capabilities; the section coda names what the tag means. */
function ModuleRow({ modules, offset }: { modules: typeof dataLayerModules; offset: number }) {
  return <div className="ak-module-row">{modules.map((m, i) => <div key={m.id} id={m.id} className="ak-module-entry">
    <span id={m.id.replace("modules-", "")} className="scroll-mt-28" />
    <div className="ak-module-name"><DynamicSketchIcon text={m.icon} className="h-5 w-5" /><h4>{m.name}</h4></div>
    <p>{m.sub}</p>
    <ul className="ak-module-capabilities">{m.caps.slice(0, 2).map(cap => <li key={cap}>{cap}</li>)}</ul>
    {m.agent && <div className="ak-module-agent">{m.agent}<PreviewTag /></div>}
    <a href={"#reference-" + referenceIds[i + offset]} className="ak-module-link">Explore capabilities <span aria-hidden="true">↗</span></a>
  </div>)}</div>;
}
export default function AkashicModules() {
  return <section id="modules" className="ak-story bg-background"><div className="ak-story-wrap">
    <ScrollReveal><StoryLabel number="04">The architecture</StoryLabel><div className="ak-story-heading"><StoryTitle setup={c.setup}>{c.title}</StoryTitle><p className="ak-story-intro">{c.intro}</p></div></ScrollReveal>
    <div className="ak-foundation">
      <div className="ak-source-line"><span className="ak-small-label">Your sources</span><div>{c.sources.map(s => <span key={s}>{s}</span>)}</div></div>
      {c.layers.map((layer, i) => <ScrollReveal key={layer.number}><div className={"ak-layer " + (i === 1 ? "ak-layer-knowledge" : "")}>
        <div className="ak-layer-name"><span className="ak-small-label">{layer.number} / {layer.name}</span><h3>{layer.verb}</h3><p>{layer.desc}</p></div>
        {i === 1 ? <div className="ak-context-weave"><svg viewBox="0 0 700 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10C180 10 180 100 350 60S530 10 700 10M0 40C180 40 180 0 350 60S530 40 700 40M0 80C180 80 180 120 350 60S530 80 700 80M0 110C180 110 180 20 350 60S530 110 700 110" /></svg><div>{c.context.map(s => <span key={s}>{s}</span>)}</div></div> : <ModuleRow modules={i === 0 ? dataLayerModules : intelligenceLayerModules} offset={i === 0 ? 0 : 3} />}
      </div></ScrollReveal>)}
      <div id="modules-governance" className="ak-governance-line"><span id="governance" className="scroll-mt-28" /><span className="ak-small-label">07 / Akashic Governance</span><strong>{c.governance}</strong><span>{c.controls}</span><a href="#reference-governance" className="ak-module-link">Explore governance <span aria-hidden="true">↗</span></a></div>
    </div><p className="ak-story-coda">{c.coda}</p>
  </div></section>;
}
