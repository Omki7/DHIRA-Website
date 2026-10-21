import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import { getPage } from "@/lib/content";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

/* The branded 404. Next.js sends the 404 status for this page. */
export default async function NotFound() {
  const page = await getPage("not-found");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <section className="pb-24 pt-16 lg:pb-32 lg:pt-24">
          <ScrollRevealRail>
            <FigureEyebrow bare label={page.label} />
            <div className="mt-8 max-w-[52rem]">
              <TwoToneTitle as="h1" setup={page.setup} payoff={page.payoff} />
              <p className="mt-6 max-w-[36em] text-pretty text-lg leading-relaxed text-secondary-text">{page.lede}</p>
            </div>
            <ul className="mt-12 grid border-t border-lineSoft sm:grid-cols-2 lg:grid-cols-3">
              {page.destinations.map((item) => (
                <li key={item.href} className="border-b border-lineSoft">
                  <Link href={item.href} className="group block py-6 pr-6">
                    <span className="flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-150 group-hover:text-blue">
                      {nameOrWordmark(item.label)}
                      <span aria-hidden className="text-overcast transition-transform duration-250 ease-settle group-hover:translate-x-0.5 group-hover:text-blue">
                        &rarr;
                      </span>
                    </span>
                    <span className="mt-1 block text-[14px] text-secondary-text">{item.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={page.home.href} className="btn-primary btn-lg mt-10">
              {page.home.label}
            </Link>
          </ScrollRevealRail>
        </section>
      </main>
      <Footer />
    </>
  );
}
