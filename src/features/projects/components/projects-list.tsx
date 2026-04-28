import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FolderX, Loader2, FolderOpen, AlertCircle } from 'lucide-react';
import { Project } from '../schema';
import { ProjectCard } from './project-card';

interface ProjectsListProps {
  projects: Project[];
  isLoading: boolean;
  onPin?: (id: string) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onComplete?: (id: string) => void;
  onLoadMore?: () => void;
  hasMoreProjects?: boolean;
  loadingMore?: boolean;
}

export function ProjectsList({
  projects,
  isLoading,
  onPin,
  onPause,
  onResume,
  onComplete,
  onLoadMore,
  hasMoreProjects,
  loadingMore
}: ProjectsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Alert
        variant="default"
        className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 p-6"
      >
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-300 text-base ml-2">
          No projects found. Try adjusting your filters or search query.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onPin={onPin}
            onPause={onPause}
            onResume={onResume}
            onComplete={onComplete}
          />
        ))}
      </div>

      {hasMoreProjects && onLoadMore && (
        <div className="flex justify-center pt-8">
          <Button variant="outline" onClick={onLoadMore} disabled={loadingMore} className="gap-2">
            {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderOpen className="h-4 w-4" />}
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Skeleton loader for project cards
function ProjectCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-b flex justify-between items-center">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-5 w-36" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />

        {/* Client info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-28 mt-1.5" />
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t flex justify-between bg-gray-50/50 dark:bg-gray-800/20">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
} 