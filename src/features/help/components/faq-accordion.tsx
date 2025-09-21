"use client";

import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { FAQItem } from '../schema/help-center-data';

interface FAQAccordionProps {
  items: FAQItem[];
  categoryId?: string;
}

export function FAQAccordion({ items, categoryId }: FAQAccordionProps) {
  const filteredItems = categoryId 
    ? items.filter(item => item.categoryId === categoryId)
    : items;

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-muted-foreground">
              {item.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
