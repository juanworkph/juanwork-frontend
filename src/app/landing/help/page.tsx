import { CategoryCard } from '@/features/help/components/category-card';
import { FAQAccordion } from '@/features/help/components/faq-accordion';
import { faqCategories, faqItems } from '@/features/help/schema/help-center-data';

export const metadata = {
  title: 'Help Center | JuanWork',
  description: 'Find answers to frequently asked questions and get support for using JuanWork.',
};

export default function HelpCenterPage() {
  // Get the most common FAQs (first 5)
  const commonFaqs = faqItems.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Center</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find answers to common questions and get the support you need.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {faqCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-muted/50">
          <div className="px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={commonFaqs} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
