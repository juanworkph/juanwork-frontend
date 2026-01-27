"use client";

import React, { useState } from "react";
import { X, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillsManagerProps {
  initialSkills?: string[];
}

const skillColors = [
  "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
  "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30",
  "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30",
  "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30",
  "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30",
];

export function SkillsManager({ initialSkills = [] }: SkillsManagerProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!skills.includes(inputValue.trim()) && skills.length < 15) {
        setSkills([...skills, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold text-foreground mb-2 px-1 uppercase tracking-wider opacity-70">
        Skills
      </label>
      <div className="flex flex-wrap gap-2 mb-4 p-4 bg-muted/50 border border-border rounded-xl min-h-[60px]">
        {skills.map((skill, index) => (
          <Badge
            key={skill}
            variant="outline"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200",
              skillColors[index % skillColors.length],
            )}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:opacity-70 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="relative group">
        <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddSkill}
          className="w-full pl-11 pr-4 py-6 bg-card dark:bg-card-accent border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
          placeholder="Add a skill and press Enter"
        />
      </div>
      <p className="text-[10px] text-muted-foreground text-right font-medium">
        Max 15 skills
      </p>
    </div>
  );
}
