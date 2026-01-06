import React, { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import type { ProjectFormData } from "../schema/project-form.schema";
import { useProjectFormData } from "../hooks/use-project-form-data";
import { validateCustomSkill } from "../utils/skill-filter";

interface Step2Props {
  formData: ProjectFormData;
  onUpdate: (data: Partial<ProjectFormData>) => void;
}

export function Step2CategoriesSkills({ formData, onUpdate }: Step2Props) {
  const [maxSelectedError, setMaxSelectedError] = useState<string>("");

  // Integrate useProjectFormData hook
  const {
    categories,
    skills,
    isLoadingCategories,
    isLoadingSkills,
    errorCategories,
    errorSkills,
    refetchCategories,
    refetchSkills,
  } = useProjectFormData(formData.categoryId);

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

  // Handle skill selection change
  const handleSkillsChange = (options: Option[]) => {
    const skillNames: string[] = [];
    const skillIds: string[] = [];
    const customSkillNames: string[] = [];
    
    options.forEach(opt => {
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

  // Handle max selected limit
  const handleMaxSelected = (maxLimit: number) => {
    setMaxSelectedError(`You can only select up to ${maxLimit} skills`);
    setTimeout(() => setMaxSelectedError(""), 3000);
  };

  // Sync search function for filtering skills
  const handleSearchSync = (value: string): Option[] => {
    if (!value.trim()) return skillOptions;
    
    const lowerQuery = value.toLowerCase();
    return skillOptions.filter(option =>
      option.label.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Categories & Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help freelancers find your project by selecting relevant categories
          and required skills
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
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="focus:ring-[#F45A0B]">
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
        )}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="skills">
          Required Skills <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-gray-500 mb-2">
          Add up to 10 skills required for this project. Type to search or create custom skills.
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
            maxSelected={10}
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
            className="focus-visible:ring-[#F45A0B]"
            badgeClassName="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20 hover:bg-[#F45A0B]/20"
            hidePlaceholderWhenSelected={false}
          />
        )}

        {/* Max Selected Error */}
        {maxSelectedError && (
          <p className="text-sm text-red-500 mt-1">{maxSelectedError}</p>
        )}

        {/* Skills Counter */}
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-500">
            {formData.skills.length} / 10 skills added
          </span>
          {formData.skills.length >= 10 && (
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
              skills helps qualified freelancers find your project more easily
              and increases your chances of finding the right talent!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
