import type { NextPage } from 'next';
import LuxuryHero from "@/components/LuxuryHero";
import ThesisSection from "@/components/ThesisSection";
import StructureSection from "@/components/StructureSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import Thesis from "@/components/Thesis";
import Entities from "@/components/Entities";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import QuickNavButtons from "@/components/QuickNavButtons";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen">
      <LuxuryHero />
      <ThesisSection />
      <StructureSection />
      <PrinciplesSection />
      <Reveal>
        <Thesis />
      </Reveal>
      <Reveal>
        <Entities />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <div className="py-16 flex items-center justify-center">
        <QuickNavButtons />
      </div>
    </main>
  );
}

export default Home;