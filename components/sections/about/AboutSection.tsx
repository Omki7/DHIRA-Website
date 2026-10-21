import type { ReactNode } from "react";
import FigureEyebrow from "@/components/ui/FigureEyebrow";

/* The /about section header: the site's one eyebrow rail (ui/FigureEyebrow,
   `[NN]  LABEL`, left), the two-tone title, the intro beneath. The page ran
   its own unruled kicker with a bare number until 20 Oct 2026 (founder: one
   eyebrow format across the site). `data-about-reveal` feeds AboutMotion.

   Where the heading sits in a column beside a drawing, the section passes
   its eyebrow to AboutSection instead, so the rail runs the full width as it
   does on every other page; the heading then omits `number` and `label`.
   `card` drops the rail inside the closing card. */
export function AboutHeading({ number, label, setup, title, intro, dark = false, card = false }: {
  number?: string;
  label?: string;
  setup: string;
  title: string;
  intro?: string;
  dark?: boolean;
  card?: boolean;
}) {
  return (
    <header className="about-heading">
      {number && label && <div data-about-reveal="0"><FigureEyebrow num={number} label={label} dark={dark} bare={card} /></div>}
      <h2 data-about-reveal="70" className="about-title text-ink"><span className={`block ${dark ? "text-uc-mute" : "text-inkSoft"}`}>{setup}</span>{" "}{title}</h2>
      {intro && <p data-about-reveal="120" className={`about-intro ${dark ? "text-uc-mute" : "text-secondary-text"}`}>{intro}</p>}
    </header>
  );
}

export default function AboutSection({ id, eyebrow, children, className = "" }: { id: string; eyebrow?: { number: string; label: string }; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`about-section scroll-mt-20 ${className}`}>
      <div className="about-shell">
        {eyebrow && <div data-about-reveal="0"><FigureEyebrow num={eyebrow.number} label={eyebrow.label} /></div>}
        {children}
      </div>
    </section>
  );
}
