import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";

/* The branded 404 (added 15 Oct 2026; the framework default before). Says
   what happened in one line, then routes the visitor to the places most
   people are looking for. Next.js sends the 404 status for this page. */

const DESTINATIONS = [
  { label: "Akashic", href: "/akashic", line: "The governed data and AI platform" },
  { label: "Solutions", href: "/solutions", line: "Business problems, solved on Akashic" },
  { label: "Pricing", href: "/pricing", line: "Plans, deployment and how to buy" },
  { label: "Insights", href: "/insights", line: "Perspectives from the team" },
  { label: "Contact", href: "/contact", line: "Talk to the people who build it" },
  { label: "Site map", href: "/site-map", line: "Every page, in one place" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <section className="pb-24 pt-16 lg:pb-32 lg:pt-24">
          <ScrollRevealRail isLast>
            <FigureEyebrow bare label="404" />
            <div className="mt-8 max-w-[52rem]">
              <TwoToneTitle as="h1" setup="Page not found." payoff="The link may be old, or the page has moved." />
              <p className="mt-6 max-w-[36em] text-pretty text-lg leading-relaxed text-secondary-text">
                Try one of these, or go back to the home page.
              </p>
            </div>
            <ul className="mt-12 grid border-t border-lineSoft sm:grid-cols-2 lg:grid-cols-3">
              {DESTINATIONS.map((item) => (
                <li key={item.href} className="border-b border-lineSoft">
                  <Link href={item.href} className="group block py-6 pr-6">
                    <span className="flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-150 group-hover:text-blue">
                      {item.label}
                      <span aria-hidden className="text-overcast transition-transform duration-250 ease-settle group-hover:translate-x-0.5 group-hover:text-blue">
                        &rarr;
                      </span>
                    </span>
                    <span className="mt-1 block text-[14px] text-secondary-text">{item.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/" className="btn-primary btn-lg mt-10">
              Go to the home page
            </Link>
          </ScrollRevealRail>
        </section>
      </main>
      <Footer />
    </>
  );
}
