import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Loader2, AlertCircle } from "lucide-react";
import { Project } from "../schema";
import { ProjectCard } from "./project-card";

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ProjectList({
  projects,
  isLoading,
  onLoadMore,
  hasMore,
  loadingMore,
  error,
  onRetry,
}: ProjectListProps) {
  // Error state
  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Projects
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          {error}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <Briefcase className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No projects found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          No projects match your current filters. Try adjusting your search
          criteria or check back later for new opportunities.
        </p>
        <Button variant="outline" className="gap-2">
          <Briefcase className="h-4 w-4" />
          Browse All Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="gap-2 px-8 py-6 text-base"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading More...
              </>
            ) : (
              <>
                <Briefcase className="h-5 w-5" />
                Load More Projects
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
