"use client";

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Loader2 } from "lucide-react";

interface SkillsFilterProps {
  value: string[];
  availableSkills: string[];
  isLoading?: boolean;
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const SkillsFilter = ({
  value,
  availableSkills,
  isLoading = false,
  onChange,
  disabled = false,
}: SkillsFilterProps) => {
  const handleChange = (options: Option[]) => {
    onChange(options.map((opt) => opt.value));
  };

  const selectedOptions: Option[] = value.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const skillOptions: Option[] = availableSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-2">
        Skills
        {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
      </Label>
      <MultipleSelector
        value={selectedOptions}
        onChange={handleChange}
        options={skillOptions}
        placeholder={
          isLoading ? "Loading skills..." : "Select skills..."
        }
        emptyIndicator={
          <p className="text-center text-sm text-muted-foreground">
            {isLoading ? "Loading..." : "No skills found"}
          </p>
        }
        disabled={disabled || isLoading}
        className="w-full"
      />
      {!isLoading && availableSkills.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Select a category to see available skills
        </p>
      )}
    </div>
  );
};
