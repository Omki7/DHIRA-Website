import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { PageMinimap } from "@/shared/components/navigation";
import { NewsroomAnnouncements, NewsroomMediaKit, NewsroomRecognition } from "@/components/sections/newsroom/NewsroomSections";
import { PageClose } from "@/shared/components/ui";
import { PageHero } from "@/shared/components/ui";
import { getLeaders, getPage, getPressReleases, getUiStrings } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("newsroom");
  return pageMetadata(seo);
}

export default async function NewsroomPage() {
  const [page, releases, leaders] = await Promise.all([getPage("newsroom"), getPressReleases(), getLeaders()]);
  const ui = await getUiStrings();
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero indexLabel={ui.onThisPage} label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={page.sections.slice(1)} />
        <NewsroomAnnouncements content={page.announcements} releases={releases} />
        <NewsroomRecognition content={page.recognition} />
        <NewsroomMediaKit content={page.mediaKit} boilerplate={page.boilerplate} leaders={leaders} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
