"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import {
  WorkstationStats,
  WorkstationFilters,
  ProjectsGrid,
  WorkstationStatsSkeleton,
  WorkstationProjectsGridSkeleton,
} from "@/features/workstation/components";
import {
  mockWorkstationProjects,
  calculateStats,
  filterProjects,
  ProjectStatus,
  ProjectType,
  Priority,
} from "@/features/workstation/schema";

export default function WorkstationPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all"
  );
  const [projectTypeFilter, setProjectTypeFilter] = useState<
    ProjectType | "all"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => calculateStats(mockWorkstationProjects), []);

  // Filter projects
  const filteredProjects = useMemo(
    () =>
      filterProjects(mockWorkstationProjects, {
        status: statusFilter,
        projectType: projectTypeFilter,
        priority: priorityFilter,
        searchQuery,
      }),
    [searchQuery, statusFilter, projectTypeFilter, priorityFilter]
  );

  // Handle project view
  const handleViewProject = (projectId: string) => {
    // Navigate to project overview page
    router.push(`/freelancer/workstation/overview`);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Workstation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and track all your active projects in one place
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 px-4 py-2 h-auto self-start sm:self-auto"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Stats Overview */}
        {isLoading ? (
          <WorkstationStatsSkeleton />
        ) : (
          <WorkstationStats stats={stats} />
        )}

        {/* Filters */}
        {!isLoading && (
          <WorkstationFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            projectTypeFilter={projectTypeFilter}
            onProjectTypeFilterChange={setProjectTypeFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            totalCount={mockWorkstationProjects.length}
            filteredCount={filteredProjects.length}
          />
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <WorkstationProjectsGridSkeleton />
        ) : (
          <ProjectsGrid
            projects={filteredProjects}
            onView={handleViewProject}
          />
        )}
      </div>
    </div>
  );
}
