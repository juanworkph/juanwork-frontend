"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, FileText, DollarSign } from "lucide-react";
import {
  ProjectInsights,
  formatBidAmount,
} from "../schema/project-detail-data";

interface ProjectInsightsCardProps {
  insights: ProjectInsights;
  currency?: string;
}

/**
 * ProjectInsightsCard Component
 *
 * Displays project performance analytics including total views,
 * proposals received, and average bid amount.
 * Handles edge case when no proposals exist (shows "N/A" for average).
 *
 * Optimized with React.memo to prevent unnecessary re-renders.
 *
 * Requirements:
 * - 5.1: Display total number of views
 * - 5.2: Display number of proposals received
 * - 5.3: Display average bid amount
 * - 5.4: Show "0" for proposals and "N/A" for average when no proposals exist
 * - Performance: Optimized with React.memo
 */
const ProjectInsightsCardComponent: React.FC<ProjectInsightsCardProps> = ({
  insights,
  currency,
}) => {
  // Use provided currency or fall back to insights currency
  const displayCurrency = currency || insights.currency;

  // Format average bid amount or show "N/A" if no proposals
  const formatAverageBid = (): string => {
    if (insights.proposalsReceived === 0) {
      return "N/A";
    }
    return formatBidAmount(insights.averageBidAmount, displayCurrency);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Views */}
        <div 
          className="flex items-center gap-3"
          role="group"
          aria-label={`Total views: ${insights.totalViews}`}
        >
          <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Views
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {insights.totalViews}
            </p>
          </div>
        </div>

        {/* Proposals Received */}
        <div 
          className="flex items-center gap-3"
          role="group"
          aria-label={`Proposals received: ${insights.proposalsReceived}`}
        >
          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Proposals Received
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {insights.proposalsReceived}
            </p>
          </div>
        </div>

        {/* Average Bid Amount */}
        <div 
          className="flex items-center gap-3"
          role="group"
          aria-label={`Average bid amount: ${formatAverageBid()}`}
        >
          <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average Bid
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatAverageBid()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Memoized ProjectInsightsCard component
 * Prevents unnecessary re-renders when parent updates
 */
export const ProjectInsightsCard = React.memo(ProjectInsightsCardComponent);

/**
 * ProjectInsightsCardSkeleton Component
 *
 * Loading skeleton for ProjectInsightsCard while data is being fetched.
 * Provides visual feedback during loading state.
 *
 * Requirements:
 * - 13.1: Display skeleton loaders for content sections
 */
export const ProjectInsightsCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Views Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Proposals Received Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>

        {/* Average Bid Amount Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
