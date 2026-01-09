"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FreelancerExperienceLevel } from "../schema/discover-freelancers-data";

interface ExperienceLevelFilterProps {
  value: FreelancerExperienceLevel | "all";
  onChange: (value: FreelancerExperienceLevel | "all") => void;
  disabled?: boolean;
}

const EXPERIENCE_LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
] as const;

export const ExperienceLevelFilter = ({
  value,
  onChange,
  disabled = false,
}: ExperienceLevelFilterProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as FreelancerExperienceLevel | "all");
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Experience Level</Label>
      <RadioGroup
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="space-y-2"
      >
        {EXPERIENCE_LEVELS.map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={level.value}
              id={`experience-${level.value}`}
              disabled={disabled}
            />
            <Label
              htmlFor={`experience-${level.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {level.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
