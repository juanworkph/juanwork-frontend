import { ContactUsSection } from '@/features/contact/components/contact-us-section';
import { WhyChooseUsSection } from '@/features/contact/components/why-choose-us-section';
import { BestServicesSection } from '@/features/contact/components/best-services-section';
import { CTASection } from '@/features/contact/components/cta-section';
import { MeetOurTeamSection } from '@/features/contact/components/meet-our-team-section';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ContactUsSection />
      </main>
    </div>
  );
}
