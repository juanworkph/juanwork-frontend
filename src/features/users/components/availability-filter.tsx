"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FreelancerAvailability } from "../schema/discover-freelancers-data";

interface AvailabilityFilterProps {
  value: FreelancerAvailability | "all";
  onChange: (value: FreelancerAvailability | "all") => void;
  disabled?: boolean;
}

const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "available-now", label: "Available Now" },
  { value: "available-1-week", label: "Available in 1 Week" },
  { value: "available-2-weeks", label: "Available in 2 Weeks" },
  { value: "not-available", label: "Not Available" },
] as const;

export const AvailabilityFilter = ({
  value,
  onChange,
  disabled = false,
}: AvailabilityFilterProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as FreelancerAvailability | "all");
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Availability</Label>
      <RadioGroup
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="space-y-2"
      >
        {AVAILABILITY_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`availability-${option.value}`}
              disabled={disabled}
            />
            <Label
              htmlFor={`availability-${option.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
