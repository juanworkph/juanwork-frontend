"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ProjectsHeader, ProjectsList } from "@/features/projects/components";
import {
  ProjectsState,
  Project,
} from "@/features/projects/schema";
import { toast } from "sonner";
import { 
  getClientWorkspaces, 
  updateClientWorkspaceStatus 
} from "@/features/projects/actions/client-projects.actions";

export default function ClientProjectsPage() {
  // State for projects data
  const [projectsData, setProjectsData] = useState<ProjectsState>({
    projects: [],
    stats: {
      total: 0,
      active: 0,
      completed: 0,
      paused: 0,
      cancelled: 0,
      pending: 0,
      totalEarnings: 0,
      totalSpent: 0,
      averageRating: 0,
      onTimeDelivery: 0,
    },
    filters: {
      status: "all",
      priority: "all",
      search: "",
      sortBy: "updated",
      sortDirection: "desc",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch projects on mount
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const workspaces = await getClientWorkspaces();
      
      const stats = {
        total: workspaces.length,
        active: workspaces.filter((p) => p.status === "active").length,
        completed: workspaces.filter((p) => p.status === "completed").length,
        paused: workspaces.filter((p) => p.status === "paused").length,
        cancelled: workspaces.filter((p) => p.status === "cancelled").length,
        pending: workspaces.filter((p) => p.status === "pending").length,
        totalEarnings: 0,
        totalSpent: workspaces.reduce((sum, p) => sum + (p.budget?.amount || 0), 0),
        averageRating: 0,
        onTimeDelivery: 0,
      };

      setProjectsData((prev) => ({
        ...prev,
        projects: workspaces,
        stats,
      }));
    } catch (error) {
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    let result = [...projectsData.projects];

    // Filter by status
    if (projectsData.filters.status !== "all") {
      result = result.filter(
        (project) => project.status === projectsData.filters.status
      );
    }

    // Filter by priority
    if (projectsData.filters.priority !== "all") {
      result = result.filter(
        (project) => project.priority === projectsData.filters.priority
      );
    }

    // Filter by search query
    if (projectsData.filters.search.trim()) {
      const query = projectsData.filters.search.toLowerCase();
      result = result.filter((project) => {
        return (
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.skills.some((skill) => skill.toLowerCase().includes(query))
        );
      });
    }

    // Sort projects
    result.sort((a, b) => {
      if (projectsData.filters.sortBy === "name") {
        return projectsData.filters.sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (projectsData.filters.sortBy === "deadline") {
        const dateA = new Date(a.deadline.endDate).getTime();
        const dateB = new Date(b.deadline.endDate).getTime();
        return projectsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (projectsData.filters.sortBy === "progress") {
        return projectsData.filters.sortDirection === "asc"
          ? a.progress.progressPercentage - b.progress.progressPercentage
          : b.progress.progressPercentage - a.progress.progressPercentage;
      }

      if (projectsData.filters.sortBy === "budget") {
        return projectsData.filters.sortDirection === "asc"
          ? a.budget.amount - b.budget.amount
          : b.budget.amount - a.budget.amount;
      }

      if (projectsData.filters.sortBy === "created") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return projectsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (projectsData.filters.sortBy === "updated") {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return projectsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      return 0;
    });

    return result;
  }, [projectsData.projects, projectsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<ProjectsState["filters"]>) => {
    setProjectsData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle refreshing projects
  const handleRefresh = () => {
    fetchProjects();
  };

  // Handle pinning a project (Local state only for now)
  const handlePinProject = (id: string) => {
    setProjectsData((prev) => {
      const updatedProjects = prev.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              isPinned: !project.isPinned,
              updatedAt: new Date().toISOString(),
            }
          : project
      );

      return {
        ...prev,
        projects: updatedProjects,
      };
    });

    toast.success("Project pin status updated");
  };

  // Generic status update handler with optimistic UI
  const handleStatusUpdate = async (id: string, newStatus: "active" | "paused" | "completed") => {
    const originalProjects = [...projectsData.projects];
    
    // Optimistic update
    setProjectsData((prev) => {
      const updatedProjects = prev.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: newStatus,
              ...(newStatus === "completed" ? { completedAt: new Date().toISOString() } : {}),
              updatedAt: new Date().toISOString(),
              progress: newStatus === "completed" 
                ? {
                    ...project.progress,
                    progressPercentage: 100,
                    completedTasks: project.progress.totalTasks,
                    completedMilestones: project.progress.totalMilestones,
                  }
                : project.progress
            }
          : project
      );

      return {
        ...prev,
        projects: updatedProjects,
        stats: {
          ...prev.stats,
          active: updatedProjects.filter((p) => p.status === "active").length,
          paused: updatedProjects.filter((p) => p.status === "paused").length,
          completed: updatedProjects.filter((p) => p.status === "completed").length,
        }
      };
    });

    try {
      await updateClientWorkspaceStatus(id, newStatus);
      toast.success(`Project ${newStatus} successfully`);
    } catch (error) {
      toast.error("Failed to update project status");
      // Revert optimistic update
      setProjectsData((prev) => ({
        ...prev,
        projects: originalProjects,
        stats: {
          ...prev.stats,
          active: originalProjects.filter((p) => p.status === "active").length,
          paused: originalProjects.filter((p) => p.status === "paused").length,
          completed: originalProjects.filter((p) => p.status === "completed").length,
        }
      }));
    }
  };

  const handlePauseProject = (id: string) => handleStatusUpdate(id, "paused");
  const handleResumeProject = (id: string) => handleStatusUpdate(id, "active");
  const handleCompleteProject = (id: string) => handleStatusUpdate(id, "completed");

  // Handle loading more projects
  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setLoadingMore(false);
      toast.info("No more projects to load");
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
