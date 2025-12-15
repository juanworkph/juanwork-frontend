"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Clock,
  Code,
} from "lucide-react";

interface SingleViewRequirementsCardProps {
  skills: string[];
  experienceLevel?: string;
  projectType?: string;
  duration?: string;
}

export const SingleViewRequirementsCard = ({
  skills,
  experienceLevel = "intermediate",
  projectType = "fixed",
  duration,
}: SingleViewRequirementsCardProps) => {
  const getExperienceLevelLabel = (level: string): string => {
    const labels: Record<string, string> = {
      entry: "Entry Level",
      intermediate: "Intermediate",
      expert: "Expert",
    };
    return labels[level] || level;
  };

  const getExperienceLevelDescription = (level: string): string => {
    const descriptions: Record<string, string> = {
      entry: "Looking for someone who is relatively new to this field",
      intermediate: "Looking for someone with substantial experience in this field",
      expert: "Looking for someone with comprehensive and deep expertise in this field",
    };
    return descriptions[level] || "";
  };

  const getProjectTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      fixed: "Fixed Price",
      hourly: "Hourly Rate",
    };
    return labels[type] || type;
  };

  return (
    <Card
      className="border border-gray-200 dark:border-gray-700"
      role="region"
      aria-labelledby="project-requirements-heading"
    >
      <CardHeader>
        <h2
          id="project-requirements-heading"
          className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-none"
        >
          Project Requirements
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills & Expertise */}
        <section className="space-y-3" aria-labelledby="skills-heading">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            <h3 id="skills-heading" className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Skills & Expertise
            </h3>
          </div>
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Required skills list">
            {skills.map((skill) => (
              <li
                key={skill}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Project Details Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Project details">
          {/* Experience Level */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" aria-hidden="true" />
              <h4 id="experience-level-heading" className="text-sm font-semibold text-gray-900 dark:text-white">
                Experience Level
              </h4>
            </div>
            <div className="pl-7" aria-labelledby="experience-level-heading">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {getExperienceLevelLabel(experienceLevel)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {getExperienceLevelDescription(experienceLevel)}
              </p>
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
              <h4 id="project-type-heading" className="text-sm font-semibold text-gray-900 dark:text-white">
                Project Type
              </h4>
            </div>
            <div className="pl-7" aria-labelledby="project-type-heading">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {getProjectTypeLabel(projectType)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {projectType === "fixed"
                  ? "One-time project with a set budget"
                  : "Ongoing work billed by the hour"}
              </p>
            </div>
          </div>

          {/* Duration */}
          {duration && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500 dark:text-green-400" aria-hidden="true" />
                <h4 id="duration-heading" className="text-sm font-semibold text-gray-900 dark:text-white">
                  Project Duration
                </h4>
              </div>
              <div className="pl-7" aria-labelledby="duration-heading">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {duration}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Expected time to complete
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Additional Info */}
        <aside
          className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
          role="note"
          aria-labelledby="before-apply-heading"
        >
          <h4 id="before-apply-heading" className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Before You Apply
          </h4>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Make sure you have the required skills and experience level for this project.
            Review the project description and attachments carefully to understand all requirements.
          </p>
        </aside>
      </CardContent>
    </Card>
  );
};
