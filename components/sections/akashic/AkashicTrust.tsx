import ScrollReveal from "@/components/ui/ScrollReveal";
import type { AkashicPage } from "@/content/pages/akashic";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

function SecurityIllustration({ index }: { index: number }) {
  const paths = [
    "M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A11 11 0 0112 5c5 0 9 7 9 7a17 17 0 01-3 3.8M6.2 6.2A17 17 0 003 12s4 7 9 7a11 11 0 005.8-1.8",
    "M4 4h16v16H4zM4 9h16M10 4v16M14 13h3M14 17h3",
    "M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6",
    "M6 11V8a6 6 0 0112 0v3M4 11h16v10H4zM12 15v3",
  ];
  return (
    <div className={"ak-security-illustration ak-security-illustration-" + index} aria-hidden="true">
      <span className="ak-security-orbit" />
      <span className="ak-security-orbit" />
      <span className="ak-security-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d={paths[index]} />
        </svg>
      </span>
      {index === 1 && <><span className="ak-security-field">Visible</span><span className="ak-security-field">••••••</span></>}
      {index === 2 && <><span className="ak-security-field">Reports</span><span className="ak-security-field">Answers</span></>}
      {index === 3 && <><span className="ak-security-field">Data</span><span className="ak-security-field">Models</span></>}
    </div>
  );
}

export default function AkashicTrust({ content }: { content: AkashicPage["trust"] }) {
  return (
    <section id="trust" className="ak-story ak-security bg-background">
      <div className="ak-story-wrap relative">
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className="mt-10 lg:mt-12"><StoryTitle setup={content.setup}>{content.title}</StoryTitle></div>
          <p className="ak-story-intro mt-6">{content.intro}</p>
          <div className="ak-security-badges">
            {content.badges.map((badge, i) => <span key={badge}><span aria-hidden="true">0{i + 1}</span>{badge}</span>)}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="ak-security-cards">
            {content.cards.map((card, i) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <SecurityIllustration index={i} />
                <span className="ak-security-caption">{card.caption}</span>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
