"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MyProjectsHeader,
  MyProjectsGrid,
  ConfirmDialog,
} from "@/features/projects/components";
import {
  ProjectFilterStatus,
  getProjectsByStatus,
  searchProjects,
  sortProjects,
  calculateProjectStatistics,
  type MyProject,
} from "@/features/projects/schema";
import { getUserProjects, deleteProject } from "@/features/projects/actions/my-projects.actions";
import { useAuth } from "@/contexts/auth-context";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldAlert } from "lucide-react";

export default function MyProjectsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, currentRole } = useAuth();
  
  // State management
  const [projects, setProjects] = useState<MyProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ProjectFilterStatus>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserProjects();
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch projects";
      setError(errorMessage);
      console.error("Error fetching projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch projects on mount (only if authenticated)
  useEffect(() => {
    if (isAuthenticated && currentRole === "client") {
      fetchProjects();
    }
  }, [isAuthenticated, currentRole, fetchProjects]);

  // Debounce search query for performance optimization
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Filter projects by status
  const statusFilteredProjects = useMemo(
    () => getProjectsByStatus(projects, selectedStatus),
    [projects, selectedStatus]
  );

  // Filter by search query (using debounced value)
  const searchFilteredProjects = useMemo(() => {
    return searchProjects(statusFilteredProjects, debouncedSearchQuery);
  }, [statusFilteredProjects, debouncedSearchQuery]);

  // Sort projects
  const sortedProjects = useMemo(() => {
    return sortProjects(searchFilteredProjects, sortBy);
  }, [searchFilteredProjects, sortBy]);

  // Calculate statistics
  const statistics = useMemo(() => {
    return calculateProjectStatistics(projects);
  }, [projects]);

  // Handlers
  const handleCreateNew = useCallback(() => {
    router.push("/client/projects/post-project");
  }, [router]);

  const handleEdit = useCallback((projectId: string) => {
    router.push(`/client/projects/edit/${projectId}`);
  }, [router]);

  const handleDelete = useCallback((projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!projectToDelete) return;

    try {
      setIsDeleting(true);
      await deleteProject(projectToDelete);
      
      // Remove deleted project from local state
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
      
      toast.success("Project deleted successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete project";
      console.error("Error deleting project:", err);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  }, [projectToDelete]);

  const cancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  }, []);

  const handleDuplicate = useCallback((projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      toast.error("Project not found");
      return;
    }

    // Navigate to post-project page with project ID as query parameter
    router.push(`/client/projects/post-project?duplicate=${projectId}`);
    toast.info("Duplicating project...");
  }, [projects, router]);

  const handleView = useCallback((projectId: string) => {
    router.push(`/client/projects/${projectId}`);
  }, [router]);

  const handleRefresh = useCallback(async () => {
    try {
      await fetchProjects();
      toast.success("Projects refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh projects");
    }
  }, [fetchProjects]);

  const handleRetry = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="position-relative h-full" role="main" aria-busy="true" aria-label="Loading projects">
        <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/auth");
    return null;
  }

  // Show access denied if not client
  if (currentRole !== "client") {
    return (
      <div className="position-relative h-full" role="main">
        <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
          <Alert variant="destructive" role="alert">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this page. This page is only
              available to clients.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/")} aria-label="Go to home page">Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error && !isLoading) {
    return (
      <div className="position-relative h-full" role="main">
        <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
          <Alert variant="destructive" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Error Loading Projects</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{error}</p>
              <Button onClick={handleRetry} variant="outline" size="sm" aria-label="Retry loading projects">
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="position-relative h-full" role="main" aria-busy={isLoading}>
        <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
          <MyProjectsHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalProjects={statistics.total}
            activeProjects={statistics.active}
            inProgressProjects={statistics.inProgress}
            totalBids={statistics.totalBids}
            filteredCount={sortedProjects.length}
            onCreateNew={handleCreateNew}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />

          <MyProjectsGrid
            projects={sortedProjects}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onView={handleView}
            onCreateNew={handleCreateNew}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your project and remove all associated data."
        confirmText="Delete Project"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={isDeleting}
        variant="destructive"
      />
    </>
  );
}
