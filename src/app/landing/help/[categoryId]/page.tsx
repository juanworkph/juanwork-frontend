"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/features/help/components/faq-accordion';
import { faqCategories, faqItems } from '@/features/help/schema/help-center-data';
import { ArrowLeft } from 'lucide-react';

export default function HelpCategoryPage() {
  const { categoryId } = useParams();
  const category = faqCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="px-4 md:px-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/help">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Help Center
              </Link>
            </Button>
            
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category.title}</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={faqItems} categoryId={categoryId as string} />
              
              <div className="mt-12 text-center">
                <p className="mb-4 text-muted-foreground">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
