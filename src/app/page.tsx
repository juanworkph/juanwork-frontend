import { HeroSection } from '@/features/home/components/hero-section';
import { FeaturesSection } from '@/features/home/components/features-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}