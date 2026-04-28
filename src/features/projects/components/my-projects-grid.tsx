import React from "react";
import { MyProject } from "../schema/my-projects-data";
import { MyProjectCard } from "./my-project-card";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

interface MyProjectsGridProps {
  projects: MyProject[];
  isLoading?: boolean;
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  onCreateNew?: () => void;
}

export function MyProjectsGrid({
  projects,
  isLoading = false,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onCreateNew,
}: MyProjectsGridProps) {
  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-muted p-6">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>

          {/* Heading and Description */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              No projects yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Get started by posting your first project and connect with talented freelancers.
            </p>
          </div>

          {/* CTA Button */}
          {onCreateNew && (
            <Button onClick={onCreateNew} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Post New Project
            </Button>
          )}

          {/* Secondary text */}
          <p className="text-xs text-muted-foreground">
            It only takes a few minutes to create a project post
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <MyProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onView={onView}
        />
      ))}
    </div>
  );
}
