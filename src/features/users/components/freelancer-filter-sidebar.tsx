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
import { Filter, X, DollarSign, Award, Clock, Star, Globe } from "lucide-react";
import {
  DiscoverFreelancersFilters,
  FreelancerExperienceLevel,
  AvailabilityStatus,
  availableSkills,
  availableLanguages,
  formatCurrency,
} from "../schema";

interface FreelancerFilterSidebarProps {
  filters: DiscoverFreelancersFilters;
  onFilterChange: (filters: Partial<DiscoverFreelancersFilters>) => void;
  onClearFilters: () => void;
  totalFreelancers: number;
}

export function FreelancerFilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  totalFreelancers,
}: FreelancerFilterSidebarProps) {
  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ skills: newSkills });
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    onFilterChange({ languages: newLanguages });
  };

  const hasActiveFilters =
    filters.availability !== "all" ||
    filters.experienceLevel !== "all" ||
    filters.skills.length > 0 ||
    filters.languages.length > 0 ||
    filters.hourlyRateRange.min > 0 ||
    filters.hourlyRateRange.max < 200 ||
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
            {totalFreelancers} freelancer{totalFreelancers !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        {/* Hourly Rate Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <DollarSign className="h-4 w-4" />
            Hourly Rate Range
          </Label>
          <div className="space-y-4 px-1">
            <Slider
              value={[filters.hourlyRateRange.min, filters.hourlyRateRange.max]}
              onValueChange={([min, max]) =>
                onFilterChange({ hourlyRateRange: { min, max } })
              }
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{formatCurrency(filters.hourlyRateRange.min)}/hr</span>
              <span>{formatCurrency(filters.hourlyRateRange.max)}/hr</span>
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

        {/* Availability */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4" />
            Availability
          </Label>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({ availability: "all" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.availability === "all"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              All Availability
            </button>
            <button
              onClick={() => onFilterChange({ availability: "available" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.availability === "available"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Available Now
            </button>
            <button
              onClick={() => onFilterChange({ availability: "busy" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.availability === "busy"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Busy
            </button>
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Award className="h-4 w-4" />
            Experience Level
          </Label>
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) =>
              onFilterChange({
                experienceLevel: value as FreelancerExperienceLevel | "all",
              })
            }
          >
            <SelectTrigger className="w-full">
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

        {/* Languages */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Globe className="h-4 w-4" />
            Languages ({filters.languages.length} selected)
          </Label>
          <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            {availableLanguages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`language-${language}`}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
                />
                <label
                  htmlFor={`language-${language}`}
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  {language}
                </label>
              </div>
            ))}
          </div>
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

        {/* Selected Languages */}
        {filters.languages.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Selected Languages:
            </Label>
            <div className="flex flex-wrap gap-2">
              {filters.languages.map((language) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleLanguageToggle(language)}
                >
                  {language}
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
