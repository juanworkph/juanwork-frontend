"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MyProjectsHeader,
  MyProjectsGrid,
} from "@/features/projects/components";
import {
  mockMyProjects,
  ProjectFilterStatus,
  getProjectsByStatus,
  type MyProject,
} from "@/features/projects/schema";
import { toast } from "sonner";

export default function MyProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ProjectFilterStatus>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects by status
  const statusFilteredProjects = useMemo(
    () => getProjectsByStatus(mockMyProjects, selectedStatus),
    [selectedStatus]
  );

  // Filter by search query
  const searchFilteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return statusFilteredProjects;

    const query = searchQuery.toLowerCase();
    return statusFilteredProjects.filter(
      (project) =>
        project.projectTitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  }, [statusFilteredProjects, searchQuery]);

  // Sort projects
  const sortedProjects = useMemo(() => {
    const projects = [...searchFilteredProjects];

    switch (sortBy) {
      case "newest":
        return projects.sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      case "oldest":
        return projects.sort(
          (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
        );
      case "most-proposals":
        return projects.sort((a, b) => b.proposalsCount - a.proposalsCount);
      case "least-proposals":
        return projects.sort((a, b) => a.proposalsCount - b.proposalsCount);
      case "name-asc":
        return projects.sort((a, b) =>
          a.projectTitle.localeCompare(b.projectTitle)
        );
      case "name-desc":
        return projects.sort((a, b) =>
          b.projectTitle.localeCompare(a.projectTitle)
        );
      default:
        return projects;
    }
  }, [searchFilteredProjects, sortBy]);

  // Handlers
  const handleCreateNew = () => {
    router.push("/client/projects/post-project");
  };

  const handleEdit = (projectId: string) => {
    toast.info(`Editing project ${projectId}`);
    // In a real app, navigate to edit page
    // router.push(`/client/projects/edit/${projectId}`);
  };

  const handleDelete = (projectId: string) => {
    toast.error(
      `Delete functionality not implemented yet for project ${projectId}`
    );
    // In a real app, show confirmation dialog and delete
  };

  const handleDuplicate = (projectId: string) => {
    toast.success(`Project ${projectId} duplicated successfully`);
    // In a real app, duplicate the project
  };

  const handleView = (projectId: string) => {
    toast.info(`Viewing project ${projectId}`);
    // In a real app, navigate to project details
    // router.push(`/client/projects/${projectId}`);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Projects refreshed successfully");
  };

  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        <MyProjectsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalProjects={mockMyProjects.length}
          filteredCount={sortedProjects.length}
          onCreateNew={handleCreateNew}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <MyProjectsGrid
          projects={sortedProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onView={handleView}
        />
      </div>
    </div>
  );
}
