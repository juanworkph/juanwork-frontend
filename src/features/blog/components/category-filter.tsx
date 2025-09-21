import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categories } from '../schema/blog-data';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            selectedCategory === category && "bg-primary text-primary-foreground"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
