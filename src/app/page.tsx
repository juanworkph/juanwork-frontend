import { HeroSection } from "@/features/home/components/hero-section";
import { PartnersBarSection } from "@/features/home/components/partners-bar-section";
import { DigitalEvolutionSection } from "@/features/home/components/digital-evolution-section";
import { ExploreCategoriesSection } from "@/features/home/components/explore-categories-section";
import { DedicationSection } from "@/features/home/components/dedication-section";
import { EcosystemFeaturesSection } from "@/features/home/components/ecosystem-features-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { WorkflowSection } from "@/features/home/components/workflow-section";
import { CtaBannerSection } from "@/features/home/components/cta-banner-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <main className="flex-1">
        <HeroSection />
        <PartnersBarSection />
        <DigitalEvolutionSection />
        <ExploreCategoriesSection />
        <DedicationSection />
        <EcosystemFeaturesSection />
        <TestimonialsSection />
        <WorkflowSection />
        <CtaBannerSection />
      </main>
    </div>
  );
}
