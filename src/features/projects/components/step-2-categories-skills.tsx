import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Plus, Sparkles, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import type { ProjectFormData } from "../schema/project-form.schema";
import type { Category, Skill } from "../schema/project-post.schema";
import { useProjectFormData } from "../hooks/use-project-form-data";
import { validateCustomSkill, isSkillAlreadySelected } from "../utils/skill-filter";

interface Step2Props {
  formData: ProjectFormData;
  onUpdate: (data: Partial<ProjectFormData>) => void;
}

export function Step2CategoriesSkills({ formData, onUpdate }: Step2Props) {
  const [skillInput, setSkillInput] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [customSkillError, setCustomSkillError] = useState<string>("");

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
    filterSkills,
  } = useProjectFormData(formData.categorySlug);

  // Get filtered skill recommendations
  const recommendations = filterSkills(skillQuery, formData.skills);

  const handleSkillInputChange = (value: string) => {
    setSkillInput(value);
    setSkillQuery(value);
    setCustomSkillError("");
  };

  const handleCategoryChange = (categoryName: string) => {
    const selectedCategory = categories.find(cat => cat.name === categoryName);
    if (selectedCategory) {
      onUpdate({
        category: selectedCategory.name,
        categoryId: selectedCategory.id,
        categorySlug: selectedCategory.slug,
        skills: [], // Clear skills when category changes
      });
    }
  };

  const handleAddSkill = (skillName: string) => {
    const trimmedSkill = skillName.trim();
    
    if (!trimmedSkill) {
      return;
    }

    // Check if skill already selected
    if (isSkillAlreadySelected(trimmedSkill, formData.skills)) {
      setCustomSkillError("This skill is already added");
      return;
    }

    // Check max skills limit
    if (formData.skills.length >= 10) {
      setCustomSkillError("You can add up to 10 skills only");
      return;
    }

    // Validate custom skill if it's not from recommendations
    const isFromRecommendations = recommendations.some(
      skill => skill.name.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (!isFromRecommendations) {
      const validation = validateCustomSkill(trimmedSkill);
      if (!validation.isValid) {
        setCustomSkillError(validation.error || "Invalid skill name");
        return;
      }
    }

    onUpdate({ skills: [...formData.skills, trimmedSkill] });
    setSkillInput("");
    setSkillQuery("");
    setCustomSkillError("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate({
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(skillInput);
    }
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
          Add up to 10 skills required for this project
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

        {/* Skills Loading State */}
        {isLoadingSkills && formData.category && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading skills...</span>
          </div>
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
                onClick={() => formData.categorySlug && refetchSkills(formData.categorySlug)}
                className="ml-2"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Skill Input */}
        <div className="relative">
          <div className="flex gap-2">
            <Input
              id="skills"
              value={skillInput}
              onChange={(e) => handleSkillInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                formData.category
                  ? "Type a skill (e.g. React, Node.js)"
                  : "Select a category first"
              }
              className="focus-visible:ring-[#F45A0B]"
              disabled={!formData.category || formData.skills.length >= 10 || isLoadingSkills}
            />
            <Button
              type="button"
              onClick={() => handleAddSkill(skillInput)}
              disabled={
                !skillInput.trim() ||
                !formData.category ||
                formData.skills.length >= 10 ||
                isLoadingSkills
              }
              className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Custom Skill Error */}
          {customSkillError && (
            <p className="text-sm text-red-500 mt-1">{customSkillError}</p>
          )}

          {/* Skill Recommendations */}
          {recommendations.length > 0 && skillQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="h-4 w-4 text-[#F45A0B]" />
                  <span className="font-medium">Recommended Skills</span>
                </div>
              </div>
              <div className="p-2 space-y-1">
                {recommendations.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleAddSkill(skill.name)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white transition-colors"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Matching Skills - Custom Skill Message */}
          {recommendations.length === 0 && skillQuery.trim() && formData.category && !isLoadingSkills && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div className="p-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-medium mb-1">No matching skills found</p>
                <p className="text-xs">Press Enter to add &quot;{skillQuery}&quot; as a custom skill</p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-[#F45A0B]/10 text-[#F45A0B] border border-[#F45A0B]/20 hover:bg-[#F45A0B]/20"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 hover:text-red-600"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        {/* Skills Counter */}
        <div className="flex items-center justify-between text-sm">
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
