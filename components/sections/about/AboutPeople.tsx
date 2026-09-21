"use client";

/*
 * [07] People — The People Behind Dhira
 * Restrained, human-centered presentation:
 * - Authentic, high-quality portrait frames without corporate clutter
 * - Name, role, and a concise human description
 * - Minimal borders and generous breathing room
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface Leader {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarSrc: string;
  imageClass: string;
}

const LEADERS: Leader[] = [
  {
    id: "dilip",
    name: "Dilip Hanumara",
    role: "Founder & CEO",
    description: "Sets company direction and architecture strategy.",
    avatarSrc: "/avatars/dilip-ceo.png",
    imageClass: "object-cover object-[center_top]",
  },
  {
    id: "sirish",
    name: "Sirish Simha",
    role: "Head of Technology",
    description: "Leads core platform engineering and distributed systems.",
    avatarSrc: "/avatars/sirish-simha.png",
    imageClass: "object-cover object-[center_top]",
  },
  {
    id: "rupa",
    name: "Rupa Sridhar",
    role: "Head of Solutions",
    description: "Architects enterprise AI and large-scale data systems.",
    avatarSrc: "/avatars/rupa-sridhar.png",
    imageClass: "object-cover object-[center_15%]",
  },
  {
    id: "rajiv",
    name: "Rajiv Kumar",
    role: "Head of Talent & HR",
    description: "Builds engineering culture and high-ownership teams.",
    avatarSrc: "/avatars/rajiv-kumar.png",
    imageClass: "object-cover object-[center_top]",
  },
  {
    id: "pratheep",
    name: "Pratheep Menon",
    role: "Head of Business Development",
    description: "Drives strategic partnerships and enterprise relationships.",
    avatarSrc: "/avatars/pratheep-menon.png",
    imageClass: "object-cover object-[center_top]",
  },
];

export default function AboutPeople() {
  return (
    <section
      id="people"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[07]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The People</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Leadership</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl leading-[1.12]">
              The people behind Dhira.
            </h2>
            <p className="mt-5 text-lg text-secondary-text leading-relaxed sm:text-xl">
              Dhira is built by engineers, technologists, and leaders who stay close to the work. Different backgrounds. Different disciplines. One shared expectation: build something worth depending on.
            </p>
          </div>
        </ScrollReveal>

        {/* --- 5 LEADERSHIP PROFILES (CLEAN, HUMAN, MINIMAL) --- */}
        <div className="mt-16 pt-12 border-t border-lineSoft">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 items-start">
            {LEADERS.map((leader, idx) => (
              <ScrollReveal key={leader.id} delay={60 + idx * 40}>
                <div className="group flex flex-col">
                  {/* Clean Portrait Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-primary-bg">
                    <Image
                      src={leader.avatarSrc}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className={`transition-transform duration-500 ease-out group-hover:scale-103 ${leader.imageClass}`}
                    />
                  </div>

                  {/* Leader Info */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold tracking-tight text-ink group-hover:text-blue transition-colors">
                      {leader.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-blue mt-0.5">
                      {leader.role}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-secondary-text">
                      {leader.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
