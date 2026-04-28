"use client";

import React, { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import type { ServiceFormData } from "../schema/service-form.schema";
import { useServiceFormData } from "../hooks/use-service-form-data";

interface Step2Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
  validationErrors?: Record<string, string>;
}

/**
 * Step 2: Categories & Skills Component
 * 
 * This component handles the second step of the service creation form,
 * allowing freelancers to select a category and add relevant skills.
 * 
 * Features:
 * - Fetches categories from API with loading/error states
 * - Fetches skills based on selected category
 * - Supports both existing skills (from database) and custom skills
 * - Multi-select with search functionality
 * - Maximum 20 skills validation
 * - Minimum 1 skill validation
 * - Retry functionality for failed API calls
 */
export function Step2CategoriesSkills({ formData, onUpdate, validationErrors = {} }: Step2Props) {
  const [maxSelectedError, setMaxSelectedError] = useState<string>("");

  // Integrate useServiceFormData hook
  const {
    categories,
    skills,
    isLoadingCategories,
    isLoadingSkills,
    errorCategories,
    errorSkills,
    refetchCategories,
    refetchSkills,
  } = useServiceFormData(formData.categoryId);

  /**
   * Handle category selection change
   * Updates formData with category name, ID, and slug
   * Clears all skills when category changes
   */
  const handleCategoryChange = (categoryName: string) => {
    const selectedCategory = categories.find(cat => cat.name === categoryName);
    if (selectedCategory) {
      onUpdate({
        category: selectedCategory.name,
        categoryId: selectedCategory.id,
        categorySlug: selectedCategory.slug,
        skills: [], // Clear skills when category changes
        skillIds: [], // Clear skill IDs
        customSkillNames: [], // Clear custom skills
      });
    }
  };

  // Convert skills to MultipleSelector options
  const skillOptions: Option[] = useMemo(() => {
    return skills.map(skill => ({
      value: skill.id,
      label: skill.name,
    }));
  }, [skills]);

  // Create a map of skill names to IDs for lookup
  const skillNameToIdMap = useMemo(() => {
    const map = new Map<string, string>();
    skills.forEach(skill => {
      map.set(skill.name.toLowerCase(), skill.id);
    });
    return map;
  }, [skills]);

  // Convert selected skills to MultipleSelector format
  const selectedSkillOptions: Option[] = useMemo(() => {
    return formData.skills.map((skillName) => {
      // Try to find the skill ID from the available skills
      const skillId = skillNameToIdMap.get(skillName.toLowerCase());
      
      return {
        // Use the actual skill ID if found, otherwise use the skill name (for custom skills)
        value: skillId || skillName,
        label: skillName,
      };
    });
  }, [formData.skills, skillNameToIdMap]);

  /**
   * Handle skill selection change
   * Separates existing skills (with IDs) from custom skills (user-created)
   * Updates formData with skills array, skillIds array, and customSkillNames array
   */
  const handleSkillsChange = (options: Option[]) => {
    const skillNames: string[] = [];
    const skillIds: string[] = [];
    const customSkillNames: string[] = [];
    
    options.forEach(opt => {
      // Filter out empty skill names
      if (!opt.label.trim()) {
        return;
      }
      
      skillNames.push(opt.label);
      
      // Check if this is an existing skill (has UUID in our skills list) or custom
      const isExistingSkill = skills.some(s => s.id === opt.value);
      
      if (isExistingSkill) {
        skillIds.push(opt.value);
      } else {
        customSkillNames.push(opt.label);
      }
    });
    
    onUpdate({ 
      skills: skillNames,
      skillIds,
      customSkillNames
    });
    setMaxSelectedError("");
  };

  /**
   * Handle max selected limit reached
   * Shows error message for 3 seconds
   */
  const handleMaxSelected = (maxLimit: number) => {
    setMaxSelectedError(`You can only select up to ${maxLimit} skills`);
    setTimeout(() => setMaxSelectedError(""), 3000);
  };

  /**
   * Sync search function for filtering skills
   * Filters skill options based on search query
   */
  const handleSearchSync = (value: string): Option[] => {
    if (!value.trim()) return skillOptions;
    
    const lowerQuery = value.toLowerCase();
    return skillOptions.filter(option =>
      option.label.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Categories & Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help clients find your service by selecting relevant categories and
          skills
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">
          Category <span className="text-red-500">*</span>
        </Label>
        
        {/* Loading State */}
        {isLoadingCategories && (
          <Skeleton className="h-10 w-full" />
        )}

        {/* Error State */}
        {errorCategories && !isLoadingCategories && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{errorCategories}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={refetchCategories}
                className="ml-2"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Category Select */}
        {!isLoadingCategories && !errorCategories && (
          <>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger 
                id="category"
                className={`focus:ring-[#F45A0B] ${
                  validationErrors.category ? "border-red-500 focus:ring-red-500" : ""
                }`}
                aria-label="Category"
                aria-describedby={validationErrors.category ? "category-error" : undefined}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(cat => cat.isActive)
                  .map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {validationErrors.category && (
              <p id="category-error" className="text-sm text-red-500 mt-1">
                {validationErrors.category}
              </p>
            )}
          </>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="skills">
          Skills <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-gray-500 mb-2">
          Add up to 20 skills you offer in this service. Type to search or create custom skills.
        </p>

        {/* Category-First Message */}
        {!formData.category && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please select a category first to add skills
            </AlertDescription>
          </Alert>
        )}

        {/* Skills Error State */}
        {errorSkills && formData.category && !isLoadingSkills && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{errorSkills}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => formData.categoryId && refetchSkills(formData.categoryId)}
                className="ml-2"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* MultipleSelector Component */}
        {formData.category && (
          <>
            <MultipleSelector
              value={selectedSkillOptions}
              onChange={handleSkillsChange}
              options={skillOptions}
              onSearchSync={handleSearchSync}
              placeholder={
                isLoadingSkills
                  ? "Loading skills..."
                  : "Type to search skills or create custom ones..."
              }
              disabled={!formData.category || isLoadingSkills}
              maxSelected={20}
              onMaxSelected={handleMaxSelected}
              creatable={true}
              emptyIndicator={
                <p className="text-center text-sm text-gray-500 py-2">
                  No skills found. Type to create a custom skill.
                </p>
              }
              loadingIndicator={
                <div className="flex items-center justify-center gap-2 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-500">Loading skills...</span>
                </div>
              }
              className={`focus-visible:ring-[#F45A0B] ${
                validationErrors.skills || validationErrors.customSkills ? "border-red-500" : ""
              }`}
              badgeClassName="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20 hover:bg-[#F45A0B]/20"
              hidePlaceholderWhenSelected={false}
              aria-label="Skills"
              aria-describedby={
                validationErrors.skills || validationErrors.customSkills 
                  ? "skills-error" 
                  : undefined
              }
            />
            {(validationErrors.skills || validationErrors.customSkills) && (
              <p id="skills-error" className="text-sm text-red-500 mt-1">
                {validationErrors.skills || validationErrors.customSkills}
              </p>
            )}
          </>
        )}

        {/* Max Selected Error */}
        {maxSelectedError && (
          <p className="text-sm text-red-500 mt-1">{maxSelectedError}</p>
        )}

        {/* Skills Counter */}
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-500">
            {formData.skills.length} / 20 skills added
          </span>
          {formData.skills.length >= 20 && (
            <span className="text-amber-600 dark:text-amber-400">
              Maximum skills reached
            </span>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Start typing a skill name to see recommendations. Adding relevant
              skills helps clients find your service more easily and increases
              your chances of getting hired!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
