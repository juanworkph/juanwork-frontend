"use client";

import React, { useState, useMemo } from 'react';
import { ProjectsHeader, ProjectsList } from '@/features/projects/components';
import { mockProjectsData } from '@/features/projects/schema';
import { ProjectsState } from '@/features/projects/schema';

export default function FreelancerProjectsPage() {
  // State for projects data
  const [projectsData, setProjectsData] = useState<ProjectsState>(mockProjectsData);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    let result = [...projectsData.projects];
    
    // Filter by status
    if (projectsData.filters.status !== 'all') {
      result = result.filter(project => project.status === projectsData.filters.status);
    }
    
    // Filter by priority
    if (projectsData.filters.priority !== 'all') {
      result = result.filter(project => project.priority === projectsData.filters.priority);
    }
    
    // Filter by search query
    if (projectsData.filters.search.trim()) {
      const query = projectsData.filters.search.toLowerCase();
      result = result.filter(project => {
        return (
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.client.name.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.skills.some(skill => skill.toLowerCase().includes(query))
        );
      });
    }
    
    // Sort projects
    result.sort((a, b) => {
      if (projectsData.filters.sortBy === 'name') {
        return projectsData.filters.sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      if (projectsData.filters.sortBy === 'deadline') {
        const dateA = new Date(a.deadline.endDate).getTime();
        const dateB = new Date(b.deadline.endDate).getTime();
        return projectsData.filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (projectsData.filters.sortBy === 'progress') {
        return projectsData.filters.sortDirection === 'asc' 
          ? a.progress.progressPercentage - b.progress.progressPercentage
          : b.progress.progressPercentage - a.progress.progressPercentage;
      }
      
      if (projectsData.filters.sortBy === 'budget') {
        return projectsData.filters.sortDirection === 'asc' 
          ? a.budget.amount - b.budget.amount
          : b.budget.amount - a.budget.amount;
      }
      
      if (projectsData.filters.sortBy === 'created') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return projectsData.filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (projectsData.filters.sortBy === 'updated') {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return projectsData.filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      return 0;
    });
    
    return result;
  }, [projectsData.projects, projectsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<ProjectsState['filters']>) => {
    setProjectsData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters
      }
    }));
  };

  // Handle refreshing projects
  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProjectsData(mockProjectsData);
      setIsLoading(false);
    }, 800);
  };

  // Handle pinning a project
  const handlePinProject = (id: string) => {
    setProjectsData(prev => {
      const updatedProjects = prev.projects.map(project => 
        project.id === id ? { 
          ...project, 
          isPinned: !project.isPinned,
          updatedAt: new Date().toISOString() 
        } : project
      );
      
      return {
        ...prev,
        projects: updatedProjects
      };
    });
  };

  // Handle pausing a project
  const handlePauseProject = (id: string) => {
    setProjectsData(prev => {
      const updatedProjects = prev.projects.map(project => 
        project.id === id ? { 
          ...project, 
          status: 'paused' as const,
          updatedAt: new Date().toISOString() 
        } : project
      );
      
      const stats = {
        ...prev.stats,
        active: updatedProjects.filter(p => p.status === 'active').length,
        paused: updatedProjects.filter(p => p.status === 'paused').length
      };
      
      return {
        ...prev,
        projects: updatedProjects,
        stats
      };
    });
  };

  // Handle resuming a project
  const handleResumeProject = (id: string) => {
    setProjectsData(prev => {
      const updatedProjects = prev.projects.map(project => 
        project.id === id ? { 
          ...project, 
          status: 'active' as const,
          updatedAt: new Date().toISOString() 
        } : project
      );
      
      const stats = {
        ...prev.stats,
        active: updatedProjects.filter(p => p.status === 'active').length,
        paused: updatedProjects.filter(p => p.status === 'paused').length
      };
      
      return {
        ...prev,
        projects: updatedProjects,
        stats
      };
    });
  };

  // Handle completing a project
  const handleCompleteProject = (id: string) => {
    setProjectsData(prev => {
      const updatedProjects = prev.projects.map(project => 
        project.id === id ? { 
          ...project, 
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: {
            ...project.progress,
            progressPercentage: 100,
            completedTasks: project.progress.totalTasks,
            completedMilestones: project.progress.totalMilestones
          }
        } : project
      );
      
      const stats = {
        ...prev.stats,
        active: updatedProjects.filter(p => p.status === 'active').length,
        completed: updatedProjects.filter(p => p.status === 'completed').length
      };
      
      return {
        ...prev,
        projects: updatedProjects,
        stats
      };
    });
  };

  // Handle loading more projects
  const handleLoadMore = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <ProjectsHeader 
        stats={projectsData.stats}
        filters={projectsData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      
      <ProjectsList 
        projects={filteredProjects}
        isLoading={isLoading}
        onPin={handlePinProject}
        onPause={handlePauseProject}
        onResume={handleResumeProject}
        onComplete={handleCompleteProject}
        onLoadMore={handleLoadMore}
        hasMoreProjects={false}
        loadingMore={loadingMore}
      />
    </div>
  );
} 