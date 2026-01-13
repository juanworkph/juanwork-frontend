import React from 'react';
import { Briefcase } from 'lucide-react';
import { PortfolioCard } from './portfolio-card';
import { PortfolioCardSkeleton } from './portfolio-card-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { PortfolioProject } from '../schema/portfolio-data';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  viewMode: 'grid' | 'list';
  isLoading?: boolean;
  hasActiveFilters?: boolean;
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  onFeatureToggle?: (projectId: string) => void;
  onCreateNew?: () => void;
}

export function PortfolioGrid({ 
  projects, 
  viewMode,
  isLoading = false,
  hasActiveFilters = false,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onFeatureToggle,
  onCreateNew,
}: PortfolioGridProps) {
  // Show loading skeleton while fetching projects
  if (isLoading) {
    return (
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-6'
      }>
        {Array.from({ length: 6 }).map((_, index) => (
          <PortfolioCardSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // Show empty state when no projects
  if (!isLoading && projects.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title={hasActiveFilters ? "No projects match your filters" : "No portfolio projects yet"}
        description={
          hasActiveFilters
            ? "Try adjusting your filters to see more projects."
            : "Start showcasing your work by adding your first portfolio project"
        }
        action={
          !hasActiveFilters && onCreateNew
            ? {
                label: "Add New Portfolio",
                onClick: onCreateNew,
              }
            : undefined
        }
      />
    );
  }

  // Render projects in grid or list layout
  return (
    <div className={
      viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-6'
    }>
      {projects.map((project) => (
        <PortfolioCard
          key={project.id}
          project={project}
          viewMode={viewMode}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onView={onView}
          onFeatureToggle={onFeatureToggle}
        />
      ))}
    </div>
  );
} 