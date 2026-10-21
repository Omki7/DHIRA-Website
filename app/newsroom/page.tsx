import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import { NewsroomAnnouncements, NewsroomMediaKit, NewsroomRecognition } from "@/components/sections/newsroom/NewsroomSections";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getLeaders, getPage, getPressReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("newsroom");
  return pageMetadata(seo);
}

export default async function NewsroomPage() {
  const [page, releases, leaders] = await Promise.all([getPage("newsroom"), getPressReleases(), getLeaders()]);
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={page.sections.slice(1)} />
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
