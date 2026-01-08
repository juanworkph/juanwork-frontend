import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Service } from "../schema";
import { ServiceDiscoveryCard } from "./service-discovery-card";

interface ServiceDiscoveryListProps {
  services: Service[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ServiceDiscoveryList({
  services,
  isLoading,
  onLoadMore,
  hasMore,
  loadingMore,
  error,
  onRetry,
}: ServiceDiscoveryListProps) {
  // Show error state
  if (error && services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load services
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          {error}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No services found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          No services match your current filters. Try adjusting your search
          criteria or check back later for new services.
        </p>
        <Button variant="outline" className="gap-2">
          <Package className="h-4 w-4" />
          Browse All Services
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceDiscoveryCard key={service.id} service={service} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="gap-2 px-8 py-6 text-base"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading More...
              </>
            ) : (
              <>
                <Package className="h-5 w-5" />
                Load More Services
              </>
            )}
          </Button>
        </div>
      )}

      {/* Show error for pagination failures */}
      {error && services.length > 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      )}

      {/* Show "No more services" message */}
      {!hasMore && services.length > 0 && !loadingMore && (
        <div className="flex justify-center pt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No more services to load
          </p>
        </div>
      )}
    </div>
  );
}
