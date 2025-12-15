import React, { useState, useMemo } from 'react';
import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';
import { PortfolioProject } from '../schema/portfolio-data';

interface ProjectGridProps {
  projects: PortfolioProject[];
  categories: string[];
  isOwnProfile?: boolean;
}

export function ProjectGrid({ projects, categories }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        project.skills.some(skill => skill.toLowerCase().includes(query)) ||
        project.client.name.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by featured only
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.featured);
    }

    return filtered;
  }, [projects, selectedCategory, searchQuery, showFeaturedOnly]);

  const handleViewDetails = (project: PortfolioProject) => {
    // In a real app, this would open a modal or navigate to a detail page
    console.log('View project details:', project.title);
    // For now, we'll just scroll to top or implement modal later
  };

  return (
    <div className="space-y-6">
      {/* Project Filters */}
      <ProjectFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFeaturedOnly={showFeaturedOnly}
        onShowFeaturedChange={setShowFeaturedOnly}
        totalResults={filteredProjects.length}
      />

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              viewMode={viewMode}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'All' || showFeaturedOnly
              ? "Try adjusting your filters to see more projects."
              : "No projects have been added to the portfolio yet."
            }
          </p>
          {(searchQuery || selectedCategory !== 'All' || showFeaturedOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setShowFeaturedOnly(false);
              }}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
} 