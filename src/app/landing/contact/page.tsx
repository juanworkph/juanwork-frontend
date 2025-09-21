import { ContactForm } from '@/features/contact/components/contact-form';
import { ContactInfo } from '@/features/contact/components/contact-info';

export const metadata = {
  title: 'Contact Us | JuanWork',
  description: 'Get in touch with the JuanWork team for any questions, support, or feedback.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We&apos;d love to hear from you. Reach out to our team with any questions or inquiries.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
