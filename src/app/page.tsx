import { HeroSection } from '@/features/home/components/hero-section';
import { WhatWeOfferSection } from '@/features/home/components/what-we-offer-section';
import { ChooseCategorySection } from '@/features/home/components/choose-category-section';
import { FeatureCardsSection } from '@/features/home/components/feature-cards-section';
import { CTASection } from '@/features/home/components/cta-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <WhatWeOfferSection />
        <ChooseCategorySection />
        <FeatureCardsSection />
        <CTASection />
      </main>
    </div>
  );
}