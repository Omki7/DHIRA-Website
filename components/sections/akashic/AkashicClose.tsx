import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AKASHIC_STORY } from "@/lib/akashicSections";
import { StoryLabel, StoryArrow } from "@/components/sections/akashic/AkashicStory";
const c = AKASHIC_STORY.close;
export default function AkashicClose() {
  return <section id="talk-to-our-team" className="ak-story ak-close-section bg-background"><span id="login" className="scroll-mt-28" /><div className="ak-story-wrap"><ScrollReveal><div className="ak-close">
    <StoryLabel number="13">{c.label}</StoryLabel><div className="ak-close-body">
      <div><h2>{c.setup}<br /><span>{c.title}</span></h2><p className="ak-close-intro">{c.intro}</p><div className="ak-close-actions"><Link href="#get-started" className="btn-primary-invert btn-lg">{c.primary}<StoryArrow /></Link><Link href="/delivery" className="btn-secondary-invert btn-lg">{c.secondary}</Link></div></div>
      <div className="ak-close-agenda">{c.agenda.map((item, i) => <div key={item.label}><span className="ak-small-label">0{i + 1} / {item.label}</span><p>{item.text}</p></div>)}</div>
    </div><div className="ak-close-footer"><span>{c.footer}</span><span aria-hidden="true">Source → Context → Answer</span></div>
  </div></ScrollReveal></div></section>;
}
