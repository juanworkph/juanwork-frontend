/**
 * My Services Page
 *
 * Main page for freelancers to view, manage, and track all their posted services.
 *
 * Features:
 * - Authentication and authorization checks
 * - Real-time service data fetching from API
 * - Search, filter, and sort functionality
 * - CRUD operations (view, edit, delete, duplicate)
 * - Service status management (pause/activate)
 * - Statistics dashboard
 * - Responsive design
 *
 * Requirements: All requirements from 1.1 to 13.5
 */

"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { MyServicesHeader } from "@/features/services/components/my-services-header";
import { MyServicesGrid } from "@/features/services/components/my-services-grid";
import { ServiceCardSkeleton } from "@/features/services/components/service-card-skeleton";
import { ConfirmDialog } from "@/features/services/components/confirm-dialog";
import {
  getFreelancerServices,
  deleteService,
  updateServiceStatus,
} from "@/features/services/actions/my-services.actions";
import {
  MyService,
  ServiceFilterStatus,
  ServiceSortOption,
  filterServicesByStatus,
  searchServices,
  sortServices,
  calculateStatistics,
} from "@/features/services/schema/my-services-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Loading Skeleton Component
 * Displays while services are being fetched
 */
const MyServicesPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        {/* Statistics Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton - Requirement 1.1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * Error State Component
 * Displays when there's an error fetching services
 * Requirements: 1.5
 */
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      <Alert
        variant="destructive"
        className="border-red-200 dark:border-red-800"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Failed to Load Services</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{message}</p>
          <Button onClick={onRetry} variant="outline" size="sm">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

/**
 * Access Denied Component
 * Displays when user is not a freelancer
 */
const AccessDenied: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      <Card className="border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is only accessible to freelancers. Please log in with a
            freelancer account.
          </p>
          <Button onClick={() => router.push("/auth")}>Go to Login</Button>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Main My Services Page Component
 */
export default function MyServicesPage() {
  const router = useRouter();

  // Subtask 6.2: Authentication check
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    currentRole,
  } = useAuth();

  // Subtask 6.3: State management
  const [services, setServices] = useState<MyService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ServiceFilterStatus>("all");
  const [sortBy, setSortBy] = useState<ServiceSortOption>("newest");

  // Subtask 6.8: Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  // Subtask 6.4: Implement fetchServices function
  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFreelancerServices();
      setServices(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch services";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch services on mount when authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated && currentRole === "freelancer") {
      fetchServices();
    }
  }, [authLoading, isAuthenticated, currentRole, fetchServices]);

  // Subtask 6.2: Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [authLoading, isAuthenticated, router]);

  // Subtask 6.5: Implement filtering logic
  const filteredByStatus = useMemo(() => {
    return filterServicesByStatus(services, selectedStatus);
  }, [services, selectedStatus]);

  // Subtask 6.6: Implement search logic
  const searchedServices = useMemo(() => {
    return searchServices(filteredByStatus, searchQuery);
  }, [filteredByStatus, searchQuery]);

  // Subtask 6.7: Implement sorting logic
  const sortedServices = useMemo(() => {
    return sortServices(searchedServices, sortBy);
  }, [searchedServices, sortBy]);

  // Subtask 6.11: Calculate statistics from service data
  const statistics = useMemo(() => {
    return calculateStatistics(services);
  }, [services]);

  // Subtask 6.13: Implement navigation handlers
  const handleView = useCallback(
    (serviceId: string) => {
      router.push(`/freelancer/services/${serviceId}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (serviceId: string) => {
      router.push(`/freelancer/services/edit/${serviceId}`);
    },
    [router],
  );

  const handleCreateNew = useCallback(() => {
    router.push("/freelancer/services/post-service");
  }, [router]);

  // Subtask 6.8: Implement delete functionality
  const handleDelete = useCallback((serviceId: string) => {
    setServiceToDelete(serviceId);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!serviceToDelete) return;

    try {
      await deleteService(serviceToDelete);
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete));
      toast.success("Service deleted successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete service";
      toast.error(errorMessage);
    } finally {
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  }, [serviceToDelete]);

  const cancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setServiceToDelete(null);
  }, []);

  // Subtask 6.9: Implement duplicate functionality
  const handleDuplicate = useCallback(
    (serviceId: string) => {
      const service = services.find((s) => s.id === serviceId);
      if (!service) {
        toast.error("Service not found");
        return;
      }

      // Navigate to post-service page with duplicate query param
      router.push(`/freelancer/services/post-service?duplicate=${serviceId}`);
      toast.info("Duplicating service...");
    },
    [services, router],
  );

  // Subtask 6.10: Implement pause/activate functionality
  const handlePause = useCallback(async (serviceId: string) => {
    try {
      const updatedService = await updateServiceStatus(serviceId, "paused");
      setServices((prev) =>
        prev.map((s) => (s.id === serviceId ? updatedService : s)),
      );
      toast.success("Service paused successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to pause service";
      toast.error(errorMessage);
    }
  }, []);

  const handleActivate = useCallback(async (serviceId: string) => {
    try {
      const updatedService = await updateServiceStatus(serviceId, "active");
      setServices((prev) =>
        prev.map((s) => (s.id === serviceId ? updatedService : s)),
      );
      toast.success("Service activated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to activate service";
      toast.error(errorMessage);
    }
  }, []);

  // Subtask 6.12: Implement refresh functionality
  const handleRefresh = useCallback(async () => {
    await fetchServices();
    if (!error) {
      toast.success("Services refreshed successfully");
    }
  }, [fetchServices, error]);

  // Show loading skeleton while auth is loading
  if (authLoading) {
    return <MyServicesPageSkeleton />;
  }

  // Subtask 6.2: Show access denied if not freelancer
  if (!authLoading && isAuthenticated && currentRole !== "freelancer") {
    return <AccessDenied />;
  }

  // Show loading skeleton while fetching services
  if (isLoading && services.length === 0) {
    return <MyServicesPageSkeleton />;
  }

  // Show error state if there's an error
  if (error && services.length === 0) {
    return <ErrorState message={error} onRetry={fetchServices} />;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header with statistics, search, filters, and actions */}
        <MyServicesHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalServices={statistics.totalServices}
          approvedServices={statistics.approvedServices}
          pendingServices={statistics.pendingServices}
          totalViews={statistics.totalViews}
          totalBids={statistics.totalBids}
          filteredCount={sortedServices.length}
          onCreateNew={handleCreateNew}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {/* Grid of service cards */}
        <MyServicesGrid
          services={sortedServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onView={handleView}
          onPause={handlePause}
          onActivate={handleActivate}
          onCreateNew={handleCreateNew}
        />

        {/* Delete Confirmation Dialog - Requirement 6.3 */}
        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Delete Service"
          description="Are you sure you want to delete this service? This action cannot be undone. All associated data will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          variant="destructive"
        />
      </div>
    </div>
  );
}
