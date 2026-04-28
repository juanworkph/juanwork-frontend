"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";

interface MinRatingFilterProps {
  value: 0 | 4 | 4.5 | 5;
  onChange: (value: 0 | 4 | 4.5 | 5) => void;
  disabled?: boolean;
}

const RATING_OPTIONS = [
  { value: 0, label: "All Ratings", stars: 0 },
  { value: 4, label: "4+ Stars", stars: 4 },
  { value: 4.5, label: "4.5+ Stars", stars: 4.5 },
  { value: 5, label: "5 Stars", stars: 5 },
] as const;

const StarRating = ({ rating }: { rating: number }) => {
  if (rating === 0) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={i}
          className="h-3 w-3 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="h-3 w-3 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export const MinRatingFilter = ({
  value,
  onChange,
  disabled = false,
}: MinRatingFilterProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(Number(newValue) as 0 | 4 | 4.5 | 5);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Minimum Rating</Label>
      <RadioGroup
        value={String(value)}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="space-y-2"
      >
        {RATING_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={String(option.value)}
              id={`rating-${option.value}`}
              disabled={disabled}
            />
            <Label
              htmlFor={`rating-${option.value}`}
              className="text-sm font-normal cursor-pointer flex items-center gap-2"
            >
              <span>{option.label}</span>
              <StarRating rating={option.stars} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
