import type { NextPage } from 'next';
import AnimatedHero from "@/components/AnimatedHero";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import QuickNavButtons from "@/components/QuickNavButtons";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen">
      <AnimatedHero />
      <StatsSection />
      <ServicesSection />
      <ContactSection />
      <div className="py-16 flex items-center justify-center">
        <QuickNavButtons />
      </div>
    </main>
  );
}

export default Home;