import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioCardSkeletonProps {
  viewMode: "grid" | "list";
}

export function PortfolioCardSkeleton({
  viewMode,
}: PortfolioCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card className="py-0 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Image Skeleton */}
            <div className="relative w-full lg:w-80 h-48 lg:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
              {/* Featured Badge Skeleton */}
              <div className="absolute top-3 left-3">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            {/* Project Info Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Title and Status Badge */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  {/* Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  {/* Metrics Row */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                {/* Action Dropdown Skeleton */}
                <Skeleton className="h-8 w-8 rounded" />
              </div>

              {/* Technologies Skeleton */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-20" />
                ))}
              </div>

              {/* Client Info and Links Skeleton */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view skeleton
  return (
    <Card className="py-0 shadow-sm bg-card overflow-hidden">
      {/* Project Image Skeleton */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Skeleton className="w-full h-full" />
        {/* Featured Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-24" />
        </div>
        {/* Status Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      <CardContent className="p-6 pt-1 space-y-4">
        {/* Project Title & Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Technologies Skeleton */}
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16" />
          ))}
          <Skeleton className="h-6 w-10" />
        </div>

        {/* Project Metrics Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Client & Actions Skeleton */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-1 items-center">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
