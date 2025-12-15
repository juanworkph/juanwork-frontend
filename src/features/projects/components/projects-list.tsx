import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderX, Loader2, FolderOpen } from 'lucide-react';
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
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FolderX className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-gray-600 mb-6">No projects match your current filters.</p>
        <Button variant="outline" className="gap-2">
          <FolderOpen className="h-4 w-4" />Browse Projects
        </Button>
      </div>
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