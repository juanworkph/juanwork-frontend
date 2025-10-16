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
  Award,
  MapPin,
  Briefcase,
} from "lucide-react";
import {
  FindWorkFilters,
  ProjectType,
  ExperienceLevel,
  ProjectDuration,
  availableSkills,
  getExperienceLevelLabel,
  getDurationLabel,
  formatCurrency,
} from "../schema";

interface FilterSidebarProps {
  filters: FindWorkFilters;
  onFilterChange: (filters: Partial<FindWorkFilters>) => void;
  onClearFilters: () => void;
  totalProjects: number;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  totalProjects,
}: FilterSidebarProps) {
  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ skills: newSkills });
  };

  const hasActiveFilters =
    filters.projectType !== "all" ||
    filters.experienceLevel !== "all" ||
    filters.duration !== "all" ||
    filters.skills.length > 0 ||
    filters.budgetRange.min > 0 ||
    filters.budgetRange.max < 10000;

  return (
    <aside className="w-full lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
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
            {totalProjects} project{totalProjects !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Budget Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <DollarSign className="h-4 w-4" />
            Budget Range
          </Label>
          <div className="space-y-4 px-1">
            <Slider
              value={[filters.budgetRange.min, filters.budgetRange.max]}
              onValueChange={([min, max]) =>
                onFilterChange({ budgetRange: { min, max } })
              }
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{formatCurrency(filters.budgetRange.min)}</span>
              <span>{formatCurrency(filters.budgetRange.max)}</span>
            </div>
          </div>
        </div>

        {/* Project Type */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Briefcase className="h-4 w-4" />
            Project Type
          </Label>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({ projectType: "all" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.projectType === "all"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => onFilterChange({ projectType: "fixed" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.projectType === "fixed"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Fixed Price
            </button>
            <button
              onClick={() => onFilterChange({ projectType: "hourly" })}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.projectType === "hourly"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
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
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) =>
              onFilterChange({
                experienceLevel: value as ExperienceLevel | "all",
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

        {/* Project Duration */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4" />
            Project Duration
          </Label>
          <Select
            value={filters.duration}
            onValueChange={(value) =>
              onFilterChange({ duration: value as ProjectDuration | "all" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="less-than-1-month">
                Less than 1 month
              </SelectItem>
              <SelectItem value="1-3-months">1-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="more-than-6-months">
                More than 6 months
              </SelectItem>
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
