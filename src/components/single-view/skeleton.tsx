import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SingleViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar Skeleton (like in page.tsx) */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <Skeleton className="h-10 w-48 mb-6" />

        {/* Service Header Skeleton */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
          <div className="space-y-4 flex-1">
            <div className="flex gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-10 sm:h-10 sm:w-24" />
            ))}
          </div>
        </div>

        {/* Status Alert Skeleton */}
        <Skeleton className="h-16 w-full rounded-xl mb-6" />

        {/* Tabs Skeleton */}
        <div className="flex gap-8 border-b border-border mb-6">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-2xl" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Insights */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </div>

            {/* Pricing Card */}
            <Skeleton className="h-96 w-full rounded-2xl" />

            {/* Provider Card (for client) */}
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
