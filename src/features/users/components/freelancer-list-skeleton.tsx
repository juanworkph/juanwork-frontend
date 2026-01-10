import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FreelancerListSkeletonProps {
  count?: number;
}

/**
 * FreelancerCardSkeleton Component
 * 
 * Displays a loading skeleton that matches the FreelancerCard layout
 */
export function FreelancerCardSkeleton() {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 p-0">
      <CardContent className="p-6 h-full">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        {/* Freelancer Avatar and Info */}
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Bio Preview */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-18" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex gap-3 w-full">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * FreelancerListSkeleton Component
 * 
 * Displays a grid of freelancer card skeletons for initial loading state
 * Responsive: 1 column on mobile, 2 on tablet, 3 on desktop
 */
export function FreelancerListSkeleton({ count = 6 }: FreelancerListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <FreelancerCardSkeleton key={index} />
      ))}
    </div>
  );
}
