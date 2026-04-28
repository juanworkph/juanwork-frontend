"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Clock, XCircle, AlertTriangle } from "lucide-react";
import {
  calculateTimeRemaining,
  TimeRemaining,
} from "../schema/project-detail-data";

interface TimeRemainingCardProps {
  endDate: Date;
  status: string;
  onCloseBids?: () => void;
}

/**
 * TimeRemainingCard Component
 *
 * Displays a countdown timer showing time remaining until project bidding closes.
 * Updates in real-time every second and highlights urgent countdowns (< 24 hours).
 * Includes a "Close Bids" button for active projects.
 *
 * Optimized with React.memo to prevent unnecessary re-renders.
 *
 * Requirements:
 * - 3.1: Display countdown timer (days, hours)
 * - 3.2: Display "Bidding Closed" when expired
 * - 3.3: Update countdown in real-time
 * - 3.4: Highlight countdown when < 24 hours (warning color)
 * - 9.2: Provide "Close Bids" button
 * - 9.5: Show button only when project is active
 * - 9.6: Call onCloseBids handler when clicked
 * - Performance: Optimized with React.memo
 */
const TimeRemainingCardComponent: React.FC<TimeRemainingCardProps> = ({
  endDate,
  status,
  onCloseBids,
}) => {
  // State for time remaining
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(endDate)
  );

  // State for confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Effect for real-time countdown updates
  useEffect(() => {
    // Update immediately on mount or when endDate changes
    setTimeRemaining(calculateTimeRemaining(endDate));

    // Set up interval to update every second
    const interval = setInterval(() => {
      const updated = calculateTimeRemaining(endDate);
      setTimeRemaining(updated);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [endDate]);

  // Determine if project is active (can close bids)
  const isActive = status === "open" || status === "active";
  const showCloseButton = isActive && !timeRemaining.isExpired && onCloseBids;

  /**
   * Handle close bids confirmation
   * Requirements: 9.5, 9.6
   */
  const handleConfirmCloseBids = (): void => {
    if (onCloseBids) {
      onCloseBids();
    }
    setIsDialogOpen(false);
  };

  // Format countdown display
  const formatCountdown = (): string => {
    if (timeRemaining.isExpired) {
      return "Bidding Closed";
    }

    const { days, hours, minutes } = timeRemaining;

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} ${hours} hour${hours !== 1 ? "s" : ""}`;
    }

    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  // Determine styling based on state
  const getCountdownClasses = (): string => {
    if (timeRemaining.isExpired) {
      return "text-red-600 dark:text-red-400";
    }
    if (timeRemaining.isUrgent) {
      return "text-yellow-600 dark:text-yellow-400";
    }
    return "text-gray-900 dark:text-white";
  };

  const getIconClasses = (): string => {
    if (timeRemaining.isExpired) {
      return "text-red-600 dark:text-red-400";
    }
    if (timeRemaining.isUrgent) {
      return "text-yellow-600 dark:text-yellow-400";
    }
    return "text-gray-600 dark:text-gray-400";
  };

  const getCardClasses = (): string => {
    if (timeRemaining.isUrgent && !timeRemaining.isExpired) {
      return "border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10";
    }
    return "";
  };

  return (
    <Card className={getCardClasses()}>
      <CardHeader>
        <CardTitle className="text-lg">Time Remaining</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Countdown Display */}
        <div 
          className="flex items-center gap-3"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={timeRemaining.isExpired ? "Bidding has closed" : `Time remaining: ${formatCountdown()}`}
        >
          <Clock className={`h-5 w-5 ${getIconClasses()}`} aria-hidden="true" />
          <div className="flex-1">
            <p className={`text-2xl font-bold ${getCountdownClasses()}`}>
              {formatCountdown()}
            </p>
            {timeRemaining.isUrgent && !timeRemaining.isExpired && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Bidding closes soon!
              </p>
            )}
          </div>
        </div>

        {/* Close Bids Button with Confirmation Dialog */}
        {showCloseButton && (
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                size="sm"
                aria-label="Close project bids early and stop accepting new proposals"
              >
                <XCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                Close Bids
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Close Project Bids?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left">
                  Are you sure you want to close bidding for this project? This
                  action cannot be undone. Once closed, freelancers will no
                  longer be able to submit bids, and you will need to select
                  from the existing proposals.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel aria-label="Cancel closing bids">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmCloseBids}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  aria-label="Confirm close bids"
                >
                  Close Bids
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Expired Message */}
        {timeRemaining.isExpired && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This project is no longer accepting bids.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Memoized TimeRemainingCard component
 * Prevents unnecessary re-renders when parent updates
 */
export const TimeRemainingCard = React.memo(TimeRemainingCardComponent);

/**
 * TimeRemainingCardSkeleton Component
 *
 * Loading skeleton for TimeRemainingCard while data is being fetched.
 * Provides visual feedback during loading state.
 *
 * Requirements:
 * - 13.1: Display skeleton loaders for content sections
 */
export const TimeRemainingCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Time Remaining</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Countdown Display Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
};
