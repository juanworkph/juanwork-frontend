"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { PortfolioProjectDetail } from "@/features/portfolio/components/portfolio-project-detail";
import { PortfolioProjectFormModal } from "@/features/portfolio/components/portfolio-project-form-modal";
import { ConfirmDeleteDialog } from "@/features/portfolio/components/confirm-delete-dialog";
import {
  getPortfolioProjectById,
  deletePortfolioProject,
  toggleFeaturedStatus,
} from "@/features/portfolio/actions/portfolio.actions";
import { PortfolioProject } from "@/features/portfolio/schema/portfolio-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Portfolio Project Detail Page
 * 
 * This page displays detailed information about a single portfolio project.
 * It fetches project data by ID from the URL params and provides actions
 * for editing, deleting, featuring/unfeaturing, and navigating back.
 * 
 * Requirements: 8.1, 8.2, 8.4, 8.5
 */
export default function PortfolioProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isLoading: authLoading } = useAuth();

  // Extract project ID from URL params
  const projectId = params.id as string;

  // State management
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetch project data by ID
   * 
   * Requirements: 8.1, 8.2
   */
  const fetchProject = async () => {
    if (!projectId) {
      setError("Project ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const projectData = await getPortfolioProjectById(projectId);
      setProject(projectData);
    } catch (err: any) {
      console.error("Error fetching portfolio project:", err);
      
      // Handle specific error cases
      if (err.response?.status === 404) {
        setError("Project not found. It may have been deleted or you don't have access to it.");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view this project.");
      } else if (err.response?.status === 401) {
        setError("You must be logged in to view this project.");
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      } else {
        setError("Failed to load project. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle edit action - opens modal in edit mode
   * 
   * Requirements: 8.4
   */
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  /**
   * Handle delete action - shows confirmation dialog
   * 
   * Requirements: 8.4
   */
  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  /**
   * Confirm and execute delete action
   * 
   * Requirements: 8.4
   */
  const handleConfirmDelete = async () => {
    if (!project) return;

    try {
      setIsDeleting(true);
      await deletePortfolioProject(project.id);
      
      toast.success("Portfolio project deleted successfully");
      
      // Navigate back to portfolio list
      router.push("/freelancer/portfolio");
    } catch (err: any) {
      console.error("Error deleting portfolio project:", err);
      
      if (err.response?.status === 403) {
        toast.error("You don't have permission to delete this project");
      } else if (err.response?.status === 404) {
        toast.error("Project not found");
      } else {
        toast.error("Failed to delete project. Please try again.");
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  /**
   * Handle feature toggle action
   * 
   * Requirements: 8.4
   */
  const handleFeatureToggle = async () => {
    if (!project) return;

    const newFeaturedStatus = !project.featured;

    try {
      // Optimistic update
      setProject({ ...project, featured: newFeaturedStatus });

      await toggleFeaturedStatus(project.id, newFeaturedStatus);
      
      toast.success(
        newFeaturedStatus
          ? "Project featured successfully"
          : "Project unfeatured successfully"
      );
    } catch (err: any) {
      console.error("Error toggling featured status:", err);
      
      // Revert optimistic update on error
      setProject({ ...project, featured: !newFeaturedStatus });
      
      toast.error("Failed to update featured status. Please try again.");
    }
  };

  /**
   * Handle back navigation
   * 
   * Requirements: 8.5
   */
  const handleBack = () => {
    router.push("/freelancer/portfolio");
  };

  /**
   * Handle modal close
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle modal success - refresh project data
   */
  const handleModalSuccess = () => {
    setIsModalOpen(false);
    fetchProject();
    toast.success("Portfolio project updated successfully");
  };

  /**
   * Fetch project data on component mount
   */
  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Check authentication
    if (!user) {
      toast.error("You must be logged in to view portfolio projects");
      router.push("/auth");
      return;
    }

    // Check user role
    if (user.role !== "freelancer") {
      toast.error("Only freelancers can access portfolio projects");
      router.push("/");
      return;
    }

    // Fetch project data
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, user, authLoading]);

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Show loading state while fetching project
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Image Skeleton */}
          <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {error || "Project not found"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {error === "Project not found. It may have been deleted or you don't have access to it."
                ? "The project you're looking for doesn't exist or has been removed."
                : "There was a problem loading the project details."}
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={handleBack} variant="outline">
                Back to Portfolio
              </Button>
              {error && error !== "Project not found. It may have been deleted or you don't have access to it." && (
                <Button onClick={fetchProject}>
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render project detail
  return (
    <div className="container mx-auto px-4 py-8">
      <PortfolioProjectDetail
        project={project}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFeatureToggle={handleFeatureToggle}
        onBack={handleBack}
      />

      {/* Edit Modal */}
      <PortfolioProjectFormModal
        mode="edit"
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={project}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={project.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
