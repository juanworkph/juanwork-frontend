"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const LocationFilter = ({
  value,
  onChange,
  disabled = false,
}: LocationFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="location-filter" className="text-sm font-medium">
        Location
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="location-filter"
          type="text"
          placeholder="Search location..."
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="pl-9 pr-9"
        />
        {value && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            aria-label="Clear location"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
