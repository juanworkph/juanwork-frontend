"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";
import type {
  Category,
  DiscoverFreelancersFilters,
} from "../schema/discover-freelancers-data";
import { CategoryFilter } from "./category-filter";
import { SkillsFilter } from "./skills-filter";
import { HourlyRateFilter } from "./hourly-rate-filter";
import { ExperienceLevelFilter } from "./experience-level-filter";
import { AvailabilityFilter } from "./availability-filter";
import { LanguagesFilter } from "./languages-filter";
import { MinRatingFilter } from "./min-rating-filter";
import { LocationFilter } from "./location-filter";

interface FreelancerFilterSidebarProps {
  filters: DiscoverFreelancersFilters;
  categories: Category[];
  availableSkills: string[];
  isLoadingSkills: boolean;
  onFilterChange: (filters: Partial<DiscoverFreelancersFilters>) => void;
  onCategoryChange: (categoryId: string) => void;
  onClearFilters: () => void;
  totalFreelancers: number;
  isLoading: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const FilterSidebarContent = ({
  filters,
  categories,
  availableSkills,
  isLoadingSkills,
  onFilterChange,
  onCategoryChange,
  onClearFilters,
  totalFreelancers,
  isLoading,
}: Omit<FreelancerFilterSidebarProps, "isMobileOpen" | "onMobileClose">) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Filters</h2>
            <p className="text-sm text-muted-foreground">
              {totalFreelancers} freelancer{totalFreelancers !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          disabled={isLoading}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      </div>

      <Separator />

      {/* Filters */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-4">
          {/* Category Filter */}
          <div>
            <CategoryFilter
              value={filters.category}
              categories={categories}
              onChange={onCategoryChange}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Skills Filter */}
          <div>
            <SkillsFilter
              value={filters.skills}
              availableSkills={availableSkills}
              isLoading={isLoadingSkills}
              onChange={(skills) => onFilterChange({ skills })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Hourly Rate Filter */}
          <div>
            <HourlyRateFilter
              value={filters.hourlyRateRange}
              onChange={(hourlyRateRange) => onFilterChange({ hourlyRateRange })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Experience Level Filter */}
          <div>
            <ExperienceLevelFilter
              value={filters.experienceLevel}
              onChange={(experienceLevel) => onFilterChange({ experienceLevel })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Availability Filter */}
          <div>
            <AvailabilityFilter
              value={filters.availability}
              onChange={(availability) => onFilterChange({ availability })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Languages Filter */}
          <div>
            <LanguagesFilter
              value={filters.languages}
              onChange={(languages) => onFilterChange({ languages })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Min Rating Filter */}
          <div>
            <MinRatingFilter
              value={filters.minRating}
              onChange={(minRating) => onFilterChange({ minRating })}
              disabled={isLoading}
            />
          </div>

          <Separator />

          {/* Location Filter */}
          <div>
            <LocationFilter
              value={filters.location}
              onChange={(location) => onFilterChange({ location })}
              disabled={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export const FreelancerFilterSidebar = ({
  isMobileOpen = false,
  onMobileClose,
  ...props
}: FreelancerFilterSidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 border-r bg-background">
        <FilterSidebarContent {...props} />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-full sm:w-80 p-0">
          <SheetHeader className="p-4 pb-0">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FilterSidebarContent {...props} />
        </SheetContent>
      </Sheet>
    </>
  );
};
