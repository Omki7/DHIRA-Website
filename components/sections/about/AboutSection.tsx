import type { ReactNode } from "react";

export function AboutHeading({ number, label, setup, title, intro, dark = false }: {
  number: string;
  label: string;
  setup: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <header className="about-heading">
      <p data-about-reveal="0" className={`about-kicker ${dark ? "text-uc-mute" : "text-secondary-text"}`}><span className={dark ? "text-blue-300" : "text-overcast"}>{number}</span>{label}</p>
      <h2 data-about-reveal="70" className={`about-title ${dark ? "text-white" : "text-ink"}`}><span className={`block ${dark ? "text-uc-mute" : "text-inkSoft"}`}>{setup}</span>{" "}{title}</h2>
      {intro && <p data-about-reveal="120" className={`about-intro ${dark ? "text-uc-mute" : "text-secondary-text"}`}>{intro}</p>}
    </header>
  );
}

export default function AboutSection({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`about-section scroll-mt-20 ${className}`}><div className="about-shell">{children}</div></section>;
}
