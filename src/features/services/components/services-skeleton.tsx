import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesHeaderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-11 w-full sm:w-[180px]" />
        <Skeleton className="h-11 w-full sm:w-[180px]" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <Card className="group overflow-hidden p-0">
      {/* Thumbnail */}
      <Skeleton className="h-48 w-full" />

      <CardContent className="pt-0 pr-5 pb-5 pl-5 h-auto">
        {/* Service Name */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Status and Upgrades */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Category */}
        <Skeleton className="h-5 w-32 mb-3" />

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>

        {/* Stats and Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}
