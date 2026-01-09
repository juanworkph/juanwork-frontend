"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatFreelancerCurrency } from "../schema/discover-freelancers-data";

interface HourlyRateFilterProps {
  value: {
    min: number;
    max: number;
  };
  onChange: (value: { min: number; max: number }) => void;
  disabled?: boolean;
  maxRate?: number;
}

export const HourlyRateFilter = ({
  value,
  onChange,
  disabled = false,
  maxRate = 200,
}: HourlyRateFilterProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange({
      min: values[0],
      max: values[1],
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Hourly Rate</Label>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatFreelancerCurrency(value.min)}</span>
          <span>{formatFreelancerCurrency(value.max)}</span>
        </div>
      </div>
      <Slider
        min={0}
        max={maxRate}
        step={5}
        value={[value.min, value.max]}
        onValueChange={handleSliderChange}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};
