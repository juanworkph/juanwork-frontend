import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Loader2 } from "lucide-react";
import { FreelancerProfile } from "../schema";
import { FreelancerCard } from "./freelancer-card";

interface FreelancerListProps {
  freelancers: FreelancerProfile[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

export function FreelancerList({
  freelancers,
  isLoading,
  onLoadMore,
  hasMore,
  loadingMore,
}: FreelancerListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (freelancers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No freelancers found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          No freelancers match your current filters. Try adjusting your search
          criteria or check back later for more talent.
        </p>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Browse All Freelancers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
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
                <Users className="h-5 w-5" />
                Load More Freelancers
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
