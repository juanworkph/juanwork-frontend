import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  X,
  DollarSign,
  Clock,
  Star,
  Award,
  Package,
} from "lucide-react";
import {
  DiscoverServicesFilters,
  ServicePricingType,
  DeliveryTime,
} from "../schema";
import {
  formatCurrency,
  getDeliveryTimeLabel,
  availableSkills,
} from "../schema/discover-services-data";

interface ServiceFilterSidebarProps {
  filters: DiscoverServicesFilters;
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
  onClearFilters: () => void;
  totalServices: number;
}

export function ServiceFilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  totalServices,
}: ServiceFilterSidebarProps) {
  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ skills: newSkills });
  };

  const hasActiveFilters =
    filters.pricingType !== "all" ||
    filters.deliveryTime !== "all" ||
    filters.providerLevel !== "all" ||
    filters.skills.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 10000 ||
    filters.minRating > 0;

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
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
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
            />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{formatCurrency(filters.priceRange.min)}</span>
              <span>{formatCurrency(filters.priceRange.max)}</span>
            </div>
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Star className="h-4 w-4" />
            Minimum Rating
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {[0, 3, 3.5, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange({ minRating: rating })}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  filters.minRating === rating
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {rating === 0 ? "Any" : `${rating}+`}
              </button>
            ))}
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
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "all"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => onFilterChange({ pricingType: "fixed" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "fixed"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Fixed Price
            </button>
            <button
              onClick={() => onFilterChange({ pricingType: "hourly" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "hourly"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Hourly Rate
            </button>
            <button
              onClick={() => onFilterChange({ pricingType: "package" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.pricingType === "package"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Package Pricing
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
              onFilterChange({ deliveryTime: value as DeliveryTime | "all" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Delivery Times</SelectItem>
              <SelectItem value="24-hours">24 Hours</SelectItem>
              <SelectItem value="3-days">3 Days</SelectItem>
              <SelectItem value="1-week">1 Week</SelectItem>
              <SelectItem value="2-weeks">2 Weeks</SelectItem>
              <SelectItem value="1-month">1 Month</SelectItem>
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
                providerLevel: value as
                  | "entry"
                  | "intermediate"
                  | "expert"
                  | "all",
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Skills ({filters.skills.length} selected)
          </Label>
          <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            {availableSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                />
                <label
                  htmlFor={`skill-${skill}`}
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skills */}
        {filters.skills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Selected Skills:
            </Label>
            <div className="flex flex-wrap gap-2">
              {filters.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
