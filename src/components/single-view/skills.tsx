"use client";

import React from "react";

interface Skill {
  id: string;
  name: string;
}

interface SingleViewSkillsProps {
  skills: Skill[];
}

export const SingleViewSkills = ({ skills }: SingleViewSkillsProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-primary rounded-full"></span>
        Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-medium"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};
