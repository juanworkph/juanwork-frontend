"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { ProjectsHeader, ProjectsList } from '@/features/projects/components';
import { Project, ProjectsState } from '@/features/projects/schema';
import { getFreelancerWorkspaces, updateWorkspaceStatus } from '@/features/projects/actions/freelancer-projects.actions';

// Calculate stats based on project list
const calculateStats = (projects: Project[]) => {
  return {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    paused: projects.filter(p => p.status === 'paused').length,
    cancelled: projects.filter(p => p.status === 'cancelled').length,
    pending: projects.filter(p => p.status === 'pending').length,
    totalEarnings: projects.filter(p => p.status === 'completed').reduce((acc, curr) => acc + curr.budget.amount, 0),
    totalSpent: 0, // Not applicable for freelancer
    averageRating: 4.8, // Mocked overall rating for now
    onTimeDelivery: 98 // Mocked percentage for now
  };
};

export default function FreelancerProjectsPage() {
  // State for projects data
  const [projectsData, setProjectsData] = useState<ProjectsState>({
    projects: [],
    stats: calculateStats([]),
    filters: {
      status: 'all',
      priority: 'all',
      search: '',
      sortBy: 'updated',
      sortDirection: 'desc'
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projects = await getFreelancerWorkspaces();
      setProjectsData(prev => ({
        ...prev,
        projects,
        stats: calculateStats(projects)
      }));
    } catch (error) {
      toast.error('Failed to load projects');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchProjects();
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
  const handlePauseProject = async (id: string) => {
    try {
      // Optimistic update
      setProjectsData(prev => {
        const updatedProjects = prev.projects.map(project => 
          project.id === id ? { 
            ...project, 
            status: 'paused' as const,
            updatedAt: new Date().toISOString() 
          } : project
        );
        return {
          ...prev,
          projects: updatedProjects,
          stats: calculateStats(updatedProjects)
        };
      });

      await updateWorkspaceStatus(id, 'paused');
      toast.success('Project paused');
    } catch (error) {
      toast.error('Failed to pause project');
      fetchProjects(); // Revert on failure
    }
  };

  // Handle resuming a project
  const handleResumeProject = async (id: string) => {
    try {
      // Optimistic update
      setProjectsData(prev => {
        const updatedProjects = prev.projects.map(project => 
          project.id === id ? { 
            ...project, 
            status: 'active' as const,
            updatedAt: new Date().toISOString() 
          } : project
        );
        return {
          ...prev,
          projects: updatedProjects,
          stats: calculateStats(updatedProjects)
        };
      });

      await updateWorkspaceStatus(id, 'active');
      toast.success('Project resumed');
    } catch (error) {
      toast.error('Failed to resume project');
      fetchProjects(); // Revert on failure
    }
  };

  // Handle completing a project
  const handleCompleteProject = async (id: string) => {
    try {
      // Optimistic update
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
        return {
          ...prev,
          projects: updatedProjects,
          stats: calculateStats(updatedProjects)
        };
      });

      await updateWorkspaceStatus(id, 'completed');
      toast.success('Project marked as completed');
    } catch (error) {
      toast.error('Failed to complete project');
      fetchProjects(); // Revert on failure
    }
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