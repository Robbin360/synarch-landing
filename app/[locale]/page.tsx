import type { Metadata } from 'next';
import MainLayout from '@/components/MainLayout';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Synarch | Empowering Brands to Inspire People',
  description: 'Creamos experiencias digitales que encienden pasiones y reinventan lo posible.',
};

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ContactSection />
    </MainLayout>
  );
}