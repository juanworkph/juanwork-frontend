/**
 * ServiceCardSkeleton Component
 * 
 * Loading skeleton that mimics the structure of MyServiceCard.
 * Displays animated placeholders for all card elements while data is being fetched.
 * 
 * Structure matches MyServiceCard:
 * - Status badge, category badge, upgrade badges, action button
 * - Service name (2 lines)
 * - Description (3 lines)
 * - Skills tags (4 tags)
 * - Details grid (Budget Fee, Experience Level, Payment Type)
 * - Stats (Views, Proposals)
 * 
 * Requirements: 1.1
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ServiceCardSkeleton Component
 * 
 * Displays a loading skeleton that matches the MyServiceCard layout
 * for a consistent loading experience.
 */
export const ServiceCardSkeleton: React.FC = () => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header: Status, Category, Upgrades, and Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Badge Skeleton */}
            <Skeleton className="h-6 w-20" />
            
            {/* Category Badge Skeleton */}
            <Skeleton className="h-6 w-24" />
            
            {/* Upgrade Badges Skeleton (2 badges) */}
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Action Button Skeleton */}
          <Skeleton className="h-8 w-8 rounded" />
        </div>

        {/* Service Name Skeleton (2 lines) */}
        <div className="space-y-2 mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        {/* Description Skeleton (3 lines) */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Skills Skeleton (4 tags) */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Service Details Grid Skeleton */}
        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {/* Budget Fee Row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Experience Level Row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Payment Type Row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between text-sm mt-auto">
          <div className="flex items-center gap-4">
            {/* Views Count Skeleton */}
            <Skeleton className="h-4 w-12" />
            
            {/* Proposals Count Skeleton */}
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
