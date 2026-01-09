"use client";

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

interface LanguagesFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

// Common languages for freelancers
const COMMON_LANGUAGES: Option[] = [
  { value: "English", label: "English" },
  { value: "Filipino", label: "Filipino" },
  { value: "Tagalog", label: "Tagalog" },
  { value: "Cebuano", label: "Cebuano" },
  { value: "Ilocano", label: "Ilocano" },
  { value: "Spanish", label: "Spanish" },
  { value: "Chinese", label: "Chinese" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Arabic", label: "Arabic" },
  { value: "Hindi", label: "Hindi" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Russian", label: "Russian" },
];

export const LanguagesFilter = ({
  value,
  onChange,
  disabled = false,
}: LanguagesFilterProps) => {
  const handleChange = (options: Option[]) => {
    onChange(options.map((opt) => opt.value));
  };

  const selectedOptions: Option[] = value.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Languages</Label>
      <MultipleSelector
        value={selectedOptions}
        onChange={handleChange}
        options={COMMON_LANGUAGES}
        placeholder="Select languages..."
        emptyIndicator={
          <p className="text-center text-sm text-muted-foreground">
            No languages found
          </p>
        }
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};
