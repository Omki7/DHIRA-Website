import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { NewsroomAnnouncements, NewsroomMediaKit, NewsroomRecognition } from "@/components/sections/newsroom/NewsroomSections";
import { pageMetadata } from "@/lib/metadata";
import { NEWSROOM_HERO, NEWSROOM_SECTIONS } from "@/lib/newsroom";
import { mailto } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Newsroom",
  description: `${NEWSROOM_HERO.payoff} ${NEWSROOM_HERO.lede}`,
  path: "/newsroom",
});

const INDEX = NEWSROOM_SECTIONS.filter((section) => section.id !== "hero");

export default function NewsroomPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={NEWSROOM_HERO.label} setup={NEWSROOM_HERO.setup} payoff={NEWSROOM_HERO.payoff} lede={NEWSROOM_HERO.lede} index={INDEX} />
        <NewsroomAnnouncements />
        <NewsroomRecognition />
        <NewsroomMediaKit />
        <PageClose
          label="Media contact"
          setup="Writing about DHIRA or Akashic?"
          payoff="Reach the team directly."
          body="Interview requests, product briefings and fact checks go to one inbox, read by the people who can answer."
          primary={{ label: "Email the press team", href: mailto("Press enquiry") }}
          secondary={{ label: "Get the media kit", href: "#media-kit" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={NEWSROOM_SECTIONS} aria-label="Newsroom sections" />
    </>
  );
}
