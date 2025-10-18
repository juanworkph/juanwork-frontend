import React from "react";
import { ProjectCard } from "./project-card";
import { WorkstationProject } from "../schema/workstation-data";
import { Briefcase } from "lucide-react";

interface ProjectsGridProps {
  projects: WorkstationProject[];
  onView?: (projectId: string) => void;
}

export function ProjectsGrid({ projects, onView }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Briefcase className="h-10 w-10 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Projects Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          No projects match your current filters. Try adjusting your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onView={onView} />
      ))}
    </div>
  );
}
