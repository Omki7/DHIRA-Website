import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { AkashicPage } from "@/content/pages/akashic";
import { StoryLabel, StoryArrow } from "@/components/sections/akashic/AkashicStory";
export default function AkashicClose({ content: c }: { content: AkashicPage["close"] }) {
  return <section id="talk-to-our-team" className="ak-story ak-close-section bg-background"><span id="login" className="scroll-mt-28" /><div className="ak-story-wrap"><ScrollReveal><div className="ak-close">
    <StoryLabel number={c.number} tone="card">{c.label}</StoryLabel><div className="ak-close-body">
      <div><h2>{c.setup}<br /><span>{c.title}</span></h2><p className="ak-close-intro">{c.intro}</p><div className="ak-close-actions"><Link href={c.primary.href} className="btn-primary btn-lg">{c.primary.label}<StoryArrow /></Link><Link href={c.secondary.href} className="btn-secondary btn-lg">{c.secondary.label}</Link></div></div>
      <div className="ak-close-agenda">{c.agenda.map((item, i) => <div key={item.label}><span className="ak-small-label">0{i + 1} / {item.label}</span><p>{item.text}</p></div>)}</div>
    </div><div className="ak-close-footer"><span>{c.footer}</span><span aria-hidden="true">{c.flow}</span></div>
  </div></ScrollReveal></div></section>;
}
