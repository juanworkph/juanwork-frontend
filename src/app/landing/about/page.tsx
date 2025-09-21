import { AboutUsSection } from '@/features/about/components/about-us-section';
import { WhyChooseUsSection } from '@/features/about/components/why-choose-us-section';
import { BestServicesSection } from '@/features/about/components/best-services-section';
import { CTASection } from '@/features/about/components/cta-section';
import { MeetOurTeamSection } from '@/features/about/components/meet-our-team-section';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutUsSection />
        <WhyChooseUsSection />
        <BestServicesSection />
        <MeetOurTeamSection />
        <CTASection />
      </main>
    </div>
  );
}
