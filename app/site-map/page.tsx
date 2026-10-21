import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageHero from "@/components/ui/PageHero";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { getSiteMap } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { REGIONAL_PATHS, regionPath } from "@/lib/region";
import { getAllRoutes, getRouteGroups } from "@/lib/routes";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getSiteMap();
  return pageMetadata(page.seo);
}

/* The HTML site map (GIGW 3.0; the founder's footer links one). Built from
   lib/routes.ts, the list sitemap.xml and llms.txt also read, plus the
   India versions from lib/region.ts. Article and story pages indent under
   their hub. */
export default async function SiteMapPage() {
  const [{ page }, groups, routes] = await Promise.all([getSiteMap(), getRouteGroups(), getAllRoutes()]);
  const depth = (path: string) => path.split("/").filter(Boolean).length;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label={page.label}
          setup={page.setup}
          payoff={page.payoff}
          lede={page.lede}
          meta={`${routes.length + REGIONAL_PATHS.length} ${page.countSuffix}`}
        />
        <section className="bg-background pb-24 pt-12 lg:pb-32 lg:pt-16">
          <ScrollRevealRail>
            <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <div key={group.heading}>
                  <h2 className="border-b border-lineSoft pb-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{nameOrWordmark(group.heading)}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {group.routes.map((route) => {
                      const child = depth(route.path) > 1 && !route.path.startsWith("/sectors") && !route.path.startsWith("/solutions/") && route.path !== "/akashic/1-0";
                      return (
                        <li key={route.path} className={child ? "pl-4" : ""}>
                          <Link
                            href={route.path}
                            className={`${child ? "text-[14px] text-secondary-text" : "text-[15px] font-medium text-ink"} transition-colors duration-150 hover:text-blue`}
                          >
                            {nameOrWordmark(route.title)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {REGIONAL_PATHS.length > 0 && (
                <div>
                  <h2 className="border-b border-lineSoft pb-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{page.regionalHeading}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {REGIONAL_PATHS.map((path) => {
                      const title = routes.find((route) => route.path === path)?.title ?? path;
                      return (
                        <li key={path}>
                          <Link href={regionPath(path, "in")} className="text-[15px] font-medium text-ink transition-colors duration-150 hover:text-blue">
                            {title}
                            {page.regionalSuffix}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </ScrollRevealRail>
        </section>
      </main>
      <Footer />
    </>
  );
}
