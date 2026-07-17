import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import KnowledgeHero from "@/components/sections/knowledge/KnowledgeHero";
import KnowledgeFracture from "@/components/sections/knowledge/KnowledgeFracture";
import KnowledgeGrid from "@/components/sections/knowledge/KnowledgeGrid";
import KnowledgeNation from "@/components/sections/knowledge/KnowledgeNation";
import KnowledgeMorning from "@/components/sections/knowledge/KnowledgeMorning";
import KnowledgeProof from "@/components/sections/knowledge/KnowledgeProof";
import KnowledgeChain from "@/components/sections/knowledge/KnowledgeChain";
import KnowledgeClose from "@/components/sections/knowledge/KnowledgeClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { KNOWLEDGE_SECTIONS } from "@/lib/knowledgeSections";

export const metadata: Metadata = {
  title: "Akashic Knowledge — Intelligence at civilisation scale.",
  description:
    "The national knowledge grid: adaptive content, language, and pace for 1.89 crore registered learners, on the architecture that runs DIKSHA.",
};

export default function KnowledgePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <KnowledgeHero />
        <KnowledgeFracture />
        <KnowledgeGrid />
        <KnowledgeNation />
        <KnowledgeMorning />
        <KnowledgeProof />
        <KnowledgeChain />
        <KnowledgeClose />
      </main>
      <Footer />
      <PageMinimap sections={KNOWLEDGE_SECTIONS} aria-label="Knowledge page sections" />
    </>
  );
}
