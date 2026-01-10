"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  PortfolioHeader,
  PortfolioFilters,
  PortfolioGrid,
  PortfolioProjectFormModal,
  ConfirmDeleteDialog,
} from '@/features/portfolio/components';
import {
  getFreelancerPortfolio,
  deletePortfolioProject,
  toggleFeaturedStatus,
} from '@/features/portfolio/actions/portfolio.actions';
import { PortfolioProject } from '@/features/portfolio/schema/portfolio-data';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FreelancerPortfolioPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, currentRole } = useAuth();

  // State management (Sub-task 11.3)
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Debounced search query (Sub-task 17.1)
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Modal state management (Sub-task 11.13)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Delete dialog state (Sub-task 11.8)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<PortfolioProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Authentication check (Sub-task 11.2)
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        toast.error('Please login to access your portfolio');
        router.push('/auth');
        return;
      }

      if (currentRole !== 'freelancer') {
        toast.error('Access denied. Only freelancers can access this page.');
      }
    }
  }, [isAuthenticated, authLoading, currentRole, router]);

  // Load view mode from session storage (Sub-task 11.7)
  useEffect(() => {
    const savedViewMode = sessionStorage.getItem('portfolioViewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Fetch projects function (Sub-task 11.4)
  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated || currentRole !== 'freelancer') {
      return;
    }

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const portfolioProjects = await getFreelancerPortfolio();
      setProjects(portfolioProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load portfolio projects';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, currentRole]);

  // Fetch projects on mount (Sub-task 11.4)
  useEffect(() => {
    if (isAuthenticated && currentRole === 'freelancer') {
      fetchProjects();
    }
  }, [isAuthenticated, currentRole, fetchProjects]);

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return uniqueCategories;
  }, [projects]);

  // Filtering logic (Sub-task 11.5)
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by featured only
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.featured);
    }

    return filtered;
  }, [projects, selectedCategory, showFeaturedOnly]);

  // Search logic (Sub-task 11.6)
  const searchedProjects = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return filteredProjects;
    }

    const query = debouncedSearchQuery.toLowerCase();

    return filteredProjects.filter(project => {
      // Search in title
      if (project.title.toLowerCase().includes(query)) return true;

      // Search in description
      if (project.description.toLowerCase().includes(query)) return true;

      // Search in technologies
      if (project.technologies.some(tech => tech.toLowerCase().includes(query))) return true;

      // Search in skills
      if (project.skills.some(skill => skill.name.toLowerCase().includes(query))) return true;

      // Search in tags
      if (project.tags.some(tag => tag.toLowerCase().includes(query))) return true;

      // Search in client name
      if (project.client?.name?.toLowerCase().includes(query)) return true;

      return false;
    });
  }, [filteredProjects, debouncedSearchQuery]);

  // Calculate if there are active filters (Sub-task 14.3)
  const hasActiveFilters = useMemo(() => {
    return selectedCategory !== 'All' || showFeaturedOnly || searchQuery.trim() !== '';
  }, [selectedCategory, showFeaturedOnly, searchQuery]);

  // Calculate statistics (Sub-task 11.11)
  const statistics = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const featuredProjects = projects.filter(p => p.featured).length;

    // Calculate average rating from client testimonials
    const projectsWithRatings = projects.filter(
      p => p.client?.testimonial?.rating !== undefined
    );
    const averageRating = projectsWithRatings.length > 0
      ? projectsWithRatings.reduce((sum, p) => sum + (p.client?.testimonial?.rating || 0), 0) / projectsWithRatings.length
      : 0;

    // Calculate total unique clients
    const uniqueClients = new Set(
      projects
        .filter(p => p.client?.name)
        .map(p => p.client.name)
    );
    const totalClients = uniqueClients.size;

    return {
      totalProjects,
      completedProjects,
      featuredProjects,
      averageRating,
      totalClients,
    };
  }, [projects]);

  // View mode toggle handler (Sub-task 11.7)
  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
    sessionStorage.setItem('portfolioViewMode', mode);
  }, []);

  // Refresh functionality (Sub-task 11.12)
  const handleRefresh = useCallback(async () => {
    toast.info('Refreshing portfolio...');
    await fetchProjects();
    if (!error) {
      toast.success('Portfolio refreshed successfully');
    }
  }, [fetchProjects, error]);

  // Retry handler for error state (Sub-task 14.2)
  const handleRetry = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  // Modal handlers (Sub-task 11.13)
  const handleCreate = useCallback(() => {
    setModalMode('create');
    setSelectedProject(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setModalMode('edit');
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  }, [projects]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleModalSuccess = useCallback(async () => {
    await fetchProjects();
    handleModalClose();
  }, [fetchProjects, handleModalClose]);

  const handleView = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setModalMode('edit');
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  }, [projects]);

  // Delete functionality (Sub-task 11.8)
  const handleDelete = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(project);
      setIsDeleteDialogOpen(true);
    }
  }, [projects]);

  const handleConfirmDelete = useCallback(async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      await deletePortfolioProject(projectToDelete.id);
      
      // Remove from local state
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      
      toast.success('Portfolio project deleted successfully');
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  }, [projectToDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  }, []);

  // Duplicate functionality (Sub-task 11.9)
  const handleDuplicate = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      // Create a copy with "(Copy)" appended to title
      const duplicatedProject = {
        ...project,
        id: '', // Will be generated by backend
        title: `${project.title} (Copy)`,
        featured: false, // Reset featured status
      };

      setModalMode('create');
      setSelectedProject(duplicatedProject);
      setIsModalOpen(true);
      toast.info('Project duplicated. Make changes and save.');
    }
  }, [projects]);

  // Feature toggle functionality (Sub-task 11.10)
  const handleFeatureToggle = useCallback(async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newFeaturedStatus = !project.featured;

    try {
      await toggleFeaturedStatus(projectId, newFeaturedStatus);

      // Update local state
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId ? { ...p, featured: newFeaturedStatus } : p
        )
      );

      toast.success(
        newFeaturedStatus
          ? 'Project marked as featured'
          : 'Project removed from featured'
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update featured status';
      toast.error(errorMessage);
    }
  }, [projects]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show access denied if not freelancer
  if (!authLoading && isAuthenticated && currentRole !== 'freelancer') {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Only freelancers can access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Portfolio Header with Stats */}
      <PortfolioHeader
        totalProjects={statistics.totalProjects}
        completedProjects={statistics.completedProjects}
        featuredProjects={statistics.featuredProjects}
        averageRating={statistics.averageRating}
        totalClients={statistics.totalClients}
        onCreateNew={handleCreate}
        onRefresh={handleRefresh}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        isLoading={isLoading}
      />

      {/* Error State with Retry Button (Sub-task 14.2) */}
      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Portfolio</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="ml-4 bg-background hover:bg-background/90"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <PortfolioFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFeaturedOnly={showFeaturedOnly}
        onFeaturedToggle={() => setShowFeaturedOnly(prev => !prev)}
        totalResults={searchedProjects.length}
      />

      {/* Projects Grid with Loading, Error, and Empty States (Sub-task 14.3) */}
      <PortfolioGrid
        projects={searchedProjects}
        viewMode={viewMode}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onView={handleView}
        onFeatureToggle={handleFeatureToggle}
        onCreateNew={handleCreate}
      />

      {/* Create/Edit Modal */}
      <PortfolioProjectFormModal
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedProject || undefined}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectTitle={projectToDelete?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
}
