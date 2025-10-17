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
import { X, Plus, Sparkles } from "lucide-react";
import {
  ServiceFormData,
  categories,
  getSkillRecommendations,
} from "../schema";

interface Step2Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
}

export function Step2CategoriesSkills({ formData, onUpdate }: Step2Props) {
  const [skillInput, setSkillInput] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSkillInputChange = (value: string) => {
    setSkillInput(value);
    const recs = getSkillRecommendations(value, formData.skills);
    setRecommendations(recs);
  };

  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    if (formData.skills.includes(skill.trim())) return;
    if (formData.skills.length >= 10) {
      alert("You can add up to 10 skills only");
      return;
    }

    onUpdate({ skills: [...formData.skills, skill.trim()] });
    setSkillInput("");
    setRecommendations([]);
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
          and skills
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">
          Category <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => onUpdate({ category: value })}
        >
          <SelectTrigger className="focus:ring-[#F45A0B]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="skills">
          Skills <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-gray-500 mb-2">
          Add up to 10 skills required for this project
        </p>

        {/* Skill Input */}
        <div className="relative">
          <div className="flex gap-2">
            <Input
              id="skills"
              value={skillInput}
              onChange={(e) => handleSkillInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a skill (e.g. React, Node.js)"
              className="focus-visible:ring-[#F45A0B]"
              disabled={formData.skills.length >= 10}
            />
            <Button
              type="button"
              onClick={() => handleAddSkill(skillInput)}
              disabled={!skillInput.trim() || formData.skills.length >= 10}
              className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Skill Recommendations */}
          {recommendations.length > 0 && (
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
                    key={skill}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white transition-colors"
                  >
                    {skill}
                  </button>
                ))}
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
              skills helps qualified freelancers find your project more easily!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
