"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "../schema/discover-freelancers-data";

interface CategoryFilterProps {
  value: string;
  categories: Category[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CategoryFilter = ({
  value,
  categories,
  onChange,
  disabled = false,
}: CategoryFilterProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="category-filter" className="text-sm font-medium">
        Category
      </Label>
      <Select
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger id="category-filter" className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center justify-between w-full">
              <span>All Categories</span>
            </div>
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex items-center justify-between w-full gap-2">
                <span>{category.name}</span>
                {category.freelancerCount !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({category.freelancerCount})
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
