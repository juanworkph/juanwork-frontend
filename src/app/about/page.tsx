import { CompanyMission } from '@/features/about/components/company-mission';
import { TeamSection } from '@/features/about/components/team-section';
import { ValuesSection } from '@/features/about/components/values-section';

export const metadata = {
  title: 'About Us | JuanWork',
  description: 'Learn about JuanWork, our mission, values, and the team behind our platform.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About JuanWork</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Connecting talent with opportunity across the globe.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CompanyMission />
        <ValuesSection />
        <TeamSection />
      </main>
    </div>
  );
}
