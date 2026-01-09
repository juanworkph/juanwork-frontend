import React, { useEffect, useRef } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Users, Loader2, AlertCircle } from "lucide-react";
import { Freelancer } from "../schema/discover-freelancers-data";
import { FreelancerCard } from "./freelancer-card";
import { FreelancerListSkeleton } from "./freelancer-list-skeleton";

interface FreelancerListProps {
  freelancers: Freelancer[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  onLoadMore: () => void;
  onRetry: () => void;
}

/**
 * FreelancerList Component
 * 
 * Displays a responsive grid of freelancer cards with support for:
 * - Initial loading state with skeleton loaders
 * - Empty state when no freelancers found
 * - Error states with retry functionality
 * - Infinite scroll pagination
 * - Loading more indicator
 * 
 * Requirements: 2.4, 2.5, 2.6, 13.2, 13.3, 13.4, 15.1, 15.2, 15.3, 15.4, 16.1-16.6
 */
export function FreelancerList({
  freelancers,
  isLoading,
  isLoadingMore,
  hasMore,
  error,
  onLoadMore,
  onRetry,
}: FreelancerListProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll implementation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the trigger element is visible and we have more data to load
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, onLoadMore]);

  // Initial loading state - show skeleton loaders
  // Requirement 15.1: Display skeleton loaders for initial load
  if (isLoading) {
    return <FreelancerListSkeleton count={6} />;
  }

  // Error state - show error message with retry button
  // Requirements 16.1-16.6: Handle various error types with retry functionality
  if (error) {
    const getErrorDetails = (errorMessage: string) => {
      // Network error
      if (errorMessage.toLowerCase().includes("network")) {
        return {
          title: "Network Error",
          description: "Network error, please check your connection",
        };
      }
      // Server error (500)
      if (errorMessage.toLowerCase().includes("server") || errorMessage.includes("500")) {
        return {
          title: "Server Error",
          description: "Server error, please try again later",
        };
      }
      // Not found (404)
      if (errorMessage.includes("404") || errorMessage.toLowerCase().includes("not found")) {
        return {
          title: "No Freelancers Found",
          description: "No freelancers found",
        };
      }
      // Generic error
      return {
        title: "Error",
        description: errorMessage,
      };
    };

    const errorDetails = getErrorDetails(error);

    return (
      <EmptyState
        icon={AlertCircle}
        title={errorDetails.title}
        description={errorDetails.description}
        action={{
          label: "Retry",
          onClick: onRetry,
        }}
        className="py-20"
      />
    );
  }

  // Empty state - no freelancers found
  // Requirements 2.5: Display "No freelancers found" message
  if (freelancers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No freelancers found"
        description="Try adjusting your filters or search criteria"
        className="py-20"
      />
    );
  }

  // Main content - display freelancer cards in responsive grid
  // Requirement 2.4: Display freelancers in grid layout
  // Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop
  return (
    <div className="space-y-6">
      {/* Freelancer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>

      {/* Infinite Scroll Trigger Element */}
      {/* Requirement 13.2: Automatically fetch next page when scrolling to bottom */}
      <div ref={observerTarget} className="flex justify-center pt-8">
        {isLoadingMore && (
          // Requirement 15.3: Display loading spinner for pagination
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Loading more freelancers...</span>
          </div>
        )}
        {!hasMore && !isLoadingMore && (
          // Requirement 13.4: Display "No more freelancers" when all loaded
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            No more freelancers to load
          </div>
        )}
      </div>
    </div>
  );
}
