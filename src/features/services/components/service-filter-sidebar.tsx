import React, { useMemo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Filter,
  DollarSign,
  Clock,
  Award,
  Package,
} from "lucide-react";
import {
  DiscoverServicesFilters,
  DeliveryTimeFilter,
  Category,
} from "../schema";
import {
  formatCurrency,
  availableSkills,
} from "../schema/discover-services-data";
import { fetchSkillsByCategory } from "../actions/discover-services";

interface ServiceFilterSidebarProps {
  filters: DiscoverServicesFilters;
  categories: Category[];
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
  onClearFilters: () => void;
  totalServices: number;
  isLoading: boolean;
}

export function ServiceFilterSidebar({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
  totalServices,
  isLoading,
}: ServiceFilterSidebarProps) {
  const [categorySkills, setCategorySkills] = useState<string[]>(availableSkills);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  // Fetch skills when category changes
  useEffect(() => {
    const loadSkills = async () => {
      if (filters.category === "all") {
        // Show all skills when no category is selected
        setCategorySkills(availableSkills);
        return;
      }

      setIsLoadingSkills(true);
      try {
        const skills = await fetchSkillsByCategory(filters.category);
        setCategorySkills(skills.length > 0 ? skills : availableSkills);
      } catch (error) {
        console.error("Failed to load skills:", error);
        setCategorySkills(availableSkills);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    loadSkills();
  }, [filters.category]);

  // Convert skills array to Option format for MultipleSelector
  const skillOptions = useMemo<Option[]>(
    () => categorySkills.map((skill) => ({ value: skill, label: skill })),
    [categorySkills]
  );

  const selectedSkillOptions = useMemo<Option[]>(
    () => filters.skills.map((skill) => ({ value: skill, label: skill })),
    [filters.skills]
  );

  const handleSkillsChange = (options: Option[]) => {
    const skills = options.map((opt) => opt.value);
    onFilterChange({ skills });
  };

  const hasActiveFilters =
    filters.pricingType !== "all" ||
    filters.experienceLevel !== "all" ||
    filters.deliveryTime !== "all" ||
    filters.providerLevel !== "all" ||
    filters.category !== "all" ||
    filters.skills.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 10000;

  return (
    <aside className="w-full lg:w-80 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-sm text-orange-900 dark:text-orange-100 font-medium">
            {totalServices} service{totalServices !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <DollarSign className="h-4 w-4" />
            Price Range
          </Label>
          <div className="space-y-4 px-1">
            <Slider
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={([min, max]) =>
                onFilterChange({ priceRange: { min, max } })
              }
              max={10000}
              min={0}
              step={100}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{formatCurrency(filters.priceRange.min)}</span>
              <span>{formatCurrency(filters.priceRange.max)}</span>
            </div>
          </div>
        </div>

        {/* Pricing Type */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-4 w-4" />
            Pricing Type
          </Label>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({ pricingType: "all" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "all"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              All Types
            </button>
            <button
              onClick={() => onFilterChange({ pricingType: "fixed" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "fixed"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Fixed Price
            </button>
            <button
              onClick={() => onFilterChange({ pricingType: "hourly" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "hourly"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Hourly Rate
            </button>
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Award className="h-4 w-4" />
            Experience Level
          </Label>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({ experienceLevel: "all" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.experienceLevel === "all"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              All Levels
            </button>
            <button
              onClick={() => onFilterChange({ experienceLevel: "beginner" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.experienceLevel === "beginner"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Beginner
            </button>
            <button
              onClick={() => onFilterChange({ experienceLevel: "intermediate" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.experienceLevel === "intermediate"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Intermediate
            </button>
            <button
              onClick={() => onFilterChange({ experienceLevel: "expert" })}
              disabled={isLoading}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.experienceLevel === "expert"
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Expert
            </button>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4" />
            Delivery Time
          </Label>
          <Select
            value={filters.deliveryTime}
            onValueChange={(value) =>
              onFilterChange({ deliveryTime: value as DeliveryTimeFilter })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Delivery Times</SelectItem>
              <SelectItem value="24-hours">24 Hours</SelectItem>
              <SelectItem value="3-days">3 Days</SelectItem>
              <SelectItem value="7-days">7 Days</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Provider Level */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Award className="h-4 w-4" />
            Provider Level
          </Label>
          <Select
            value={filters.providerLevel}
            onValueChange={(value) =>
              onFilterChange({
                providerLevel: value as "new" | "level1" | "level2" | "top" | "all",
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="new">New Seller</SelectItem>
              <SelectItem value="level1">Level 1</SelectItem>
              <SelectItem value="level2">Level 2</SelectItem>
              <SelectItem value="top">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-4 w-4" />
            Category
          </Label>
          {isLoading && categories.length === 0 ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Select
              value={filters.category}
              onValueChange={(value) => onFilterChange({ category: value })}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                    {category.serviceCount !== undefined && ` (${category.serviceCount})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Skills ({filters.skills.length} selected)
          </Label>
          {isLoadingSkills ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <MultipleSelector
              value={selectedSkillOptions}
              onChange={handleSkillsChange}
              options={skillOptions}
              placeholder="Select skills..."
              emptyIndicator={
                <p className="text-center text-sm text-gray-500">
                  {filters.category === "all" 
                    ? "No skills found" 
                    : "No skills found for this category"}
                </p>
              }
              disabled={isLoading || isLoadingSkills}
              className="w-full"
              badgeClassName="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
            />
          )}
        </div>
      </div>
    </aside>
  );
}
