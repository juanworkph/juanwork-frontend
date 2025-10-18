"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MyServicesHeader,
  ServicesGrid,
  ServicesHeaderSkeleton,
  ServicesGridSkeleton,
} from "@/features/services/components";
import {
  mockMyServices,
  ServiceFilterStatus,
  getServicesByStatus,
  type MyService,
} from "@/features/services/schema";
import { toast } from "sonner";

export default function MyServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ServiceFilterStatus>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  // Filter services by status
  const statusFilteredServices = useMemo(
    () => getServicesByStatus(mockMyServices, selectedStatus),
    [selectedStatus]
  );

  // Filter by search query
  const searchFilteredServices = useMemo(() => {
    if (!searchQuery.trim()) return statusFilteredServices;

    const query = searchQuery.toLowerCase();
    return statusFilteredServices.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  }, [statusFilteredServices, searchQuery]);

  // Sort services
  const sortedServices = useMemo(() => {
    const services = [...searchFilteredServices];

    switch (sortBy) {
      case "newest":
        return services.sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      case "oldest":
        return services.sort(
          (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
        );
      case "most-views":
        return services.sort((a, b) => b.views - a.views);
      case "most-inquiries":
        return services.sort((a, b) => b.inquiries - a.inquiries);
      case "name-asc":
        return services.sort((a, b) =>
          a.serviceName.localeCompare(b.serviceName)
        );
      case "name-desc":
        return services.sort((a, b) =>
          b.serviceName.localeCompare(a.serviceName)
        );
      default:
        return services;
    }
  }, [searchFilteredServices, sortBy]);

  // Handlers
  const handleCreateNew = () => {
    router.push("/freelancer/services/post-service");
  };

  const handleEdit = (serviceId: string) => {
    toast.info(`Editing service ${serviceId}`);
    // In a real app, navigate to edit page
    // router.push(`/freelancer/services/edit/${serviceId}`);
  };

  const handleDelete = (serviceId: string) => {
    toast.error(
      `Delete functionality not implemented yet for service ${serviceId}`
    );
    // In a real app, show confirmation dialog and delete
  };

  const handleDuplicate = (serviceId: string) => {
    toast.success(`Service ${serviceId} duplicated successfully`);
    // In a real app, duplicate the service
  };

  const handleView = (serviceId: string) => {
    router.push(`/freelancer/services/${serviceId}`);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Services refreshed successfully");
  };

  return (
    <div className="max-w-7xl mx-auto overflow-y-auto space-y-8 h-full p-6 lg:p-8">
      {isLoading ? (
        <ServicesHeaderSkeleton />
      ) : (
        <MyServicesHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalServices={mockMyServices.length}
          filteredCount={sortedServices.length}
          onCreateNew={handleCreateNew}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
      )}

      {isLoading ? (
        <ServicesGridSkeleton />
      ) : (
        <ServicesGrid
          services={sortedServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onView={handleView}
        />
      )}
    </div>
  );
}
