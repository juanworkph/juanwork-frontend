import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MapPin,
  Clock,
  Calendar,
  Star,
  MessageSquare,
  User,
  MoreVertical,
  Video,
  X,
  Flag,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  FreelancerBid,
  formatBidAmount,
  formatRelativeTime,
} from "../schema/project-detail-data";

interface BidCardProps {
  bid: FreelancerBid;
  isOwner?: boolean; // NEW: Indicates if current user owns the project
  onMessage?: (freelancerId: string) => void;
  onViewProfile?: (freelancerId: string) => void;
  onShortlist?: (bidId: string) => void;
  onInterview?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
  onReport?: (bidId: string) => void;
}

/**
 * BidCard Component
 *
 * Displays individual freelancer bid information including profile,
 * bid details, and action buttons.
 *
 * Optimized with React.memo to prevent unnecessary re-renders.
 * Only re-renders when bid data or handlers change.
 *
 * Requirements:
 * - 4.2: Display freelancer avatar, name, location, rating
 * - 4.3: Display verification status and badges (Top Rated, Verified)
 * - 4.4: Display bid amount and proposed delivery time
 * - 4.5: Display when bid was submitted
 * - 4.6: Display number of reviews
 * - 8.1: Provide "Message" button
 * - 8.2: Provide "View Profile" button
 * - 8.3-8.6: Provide "More" menu with actions
 * - Performance: Optimized with React.memo
 */
const BidCardComponent: React.FC<BidCardProps> = ({
  bid,
  isOwner = true, // NEW: Default to true for backward compatibility
  onMessage,
  onViewProfile,
  onShortlist,
  onInterview,
  onReject,
  onReport,
}) => {
  const { freelancer } = bid;

  // State for reject confirmation dialog
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  /**
   * Get initials for avatar fallback
   */
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  /**
   * Render rating stars
   */
  const renderRatingStars = (rating: number): React.ReactElement[] => {
    const stars: React.ReactElement[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Half star
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300 dark:text-gray-600"
        />
      );
    }

    return stars;
  };

  /**
   * Handle message button click
   */
  const handleMessage = (): void => {
    if (onMessage) {
      onMessage(freelancer.id);
    }
  };

  /**
   * Handle view profile button click
   */
  const handleViewProfile = (): void => {
    if (onViewProfile) {
      onViewProfile(freelancer.id);
    }
  };

  /**
   * Handle shortlist action
   */
  const handleShortlist = (): void => {
    if (onShortlist) {
      onShortlist(bid.id);
    }
  };

  /**
   * Handle interview action
   */
  const handleInterview = (): void => {
    if (onInterview) {
      onInterview(bid.id);
    }
  };

  /**
   * Handle reject action
   * Opens confirmation dialog instead of directly rejecting
   * Requirements: 8.6
   */
  const handleReject = (): void => {
    setIsRejectDialogOpen(true);
  };

  /**
   * Handle reject confirmation
   * Calls onReject handler and closes dialog
   * Requirements: 8.6
   */
  const handleConfirmReject = (): void => {
    if (onReject) {
      onReject(bid.id);
    }
    setIsRejectDialogOpen(false);
  };

  /**
   * Handle report action
   */
  const handleReport = (): void => {
    if (onReport) {
      onReport(bid.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Freelancer Info Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-16 w-16">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback className="bg-[#F45A0B]/10 text-[#F45A0B] text-lg font-semibold">
                {getInitials(freelancer.name)}
              </AvatarFallback>
            </Avatar>

            {/* Freelancer Details */}
            <div className="flex-1 space-y-2">
              {/* Name and Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {freelancer.name}
                </h3>
                {freelancer.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {freelancer.isTopRated && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                  >
                    <Star className="h-3 w-3 mr-1 fill-[#F45A0B]" />
                    Top Rated
                  </Badge>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{freelancer.location}</span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderRatingStars(freelancer.rating)}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {freelancer.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({freelancer.reviewCount}{" "}
                  {freelancer.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>
          </div>

          {/* Bid Details Section */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Bid Amount */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Bid Amount:
              </span>
              <span className="text-lg font-bold text-[#F45A0B]">
                {formatBidAmount(bid.bidAmount, bid.currency)}
              </span>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>
                {bid.deliveryDays} {bid.deliveryDays === 1 ? "day" : "days"}{" "}
                delivery
              </span>
            </div>

            {/* Submitted Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Submitted {formatRelativeTime(bid.submittedAt)}</span>
            </div>
          </div>

          {/* Action Buttons Section - Only show for owners */}
          {isOwner && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Message Button */}
              <Button
                size="sm"
                onClick={handleMessage}
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white"
                aria-label={`Send message to ${freelancer.name}`}
              >
                <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                Message
              </Button>

              {/* View Profile Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewProfile}
                aria-label={`View ${freelancer.name}'s profile`}
              >
                <User className="h-4 w-4 mr-2" aria-hidden="true" />
                View Profile
              </Button>

              {/* More Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`More actions for ${freelancer.name}'s bid`}
                  >
                    <MoreVertical className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={handleShortlist}
                    aria-label={`Shortlist ${freelancer.name}'s bid`}
                  >
                    <Star className="h-4 w-4 mr-2" aria-hidden="true" />
                    Shortlist
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleInterview}
                    aria-label={`Schedule interview with ${freelancer.name}`}
                  >
                    <Video className="h-4 w-4 mr-2" aria-hidden="true" />
                    Interview
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleReject} 
                    variant="destructive"
                    aria-label={`Reject ${freelancer.name}'s bid`}
                  >
                    <X className="h-4 w-4 mr-2" aria-hidden="true" />
                    Reject
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                  onClick={handleReport} 
                  variant="destructive"
                  aria-label={`Report ${freelancer.name}'s bid`}
                >
                  <Flag className="h-4 w-4 mr-2" aria-hidden="true" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          )}
        </div>

        {/* Reject Bid Confirmation Dialog */}
        <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Reject This Bid?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Are you sure you want to reject this bid from{" "}
                <span className="font-semibold">{freelancer.name}</span>? The
                freelancer will be notified of your decision. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel aria-label="Cancel rejecting bid">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmReject}
                className="bg-red-600 hover:bg-red-700 text-white"
                aria-label="Confirm reject bid"
              >
                Reject Bid
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

/**
 * Custom comparison function for React.memo
 * Only re-render if bid data or status changes
 */
const arePropsEqual = (
  prevProps: BidCardProps,
  nextProps: BidCardProps
): boolean => {
  // Check if bid ID or status changed (most common changes)
  if (
    prevProps.bid.id !== nextProps.bid.id ||
    prevProps.bid.status !== nextProps.bid.status
  ) {
    return false;
  }

  // Check if bid amount or delivery days changed
  if (
    prevProps.bid.bidAmount !== nextProps.bid.bidAmount ||
    prevProps.bid.deliveryDays !== nextProps.bid.deliveryDays
  ) {
    return false;
  }

  // Check if freelancer data changed
  if (
    prevProps.bid.freelancer.id !== nextProps.bid.freelancer.id ||
    prevProps.bid.freelancer.name !== nextProps.bid.freelancer.name ||
    prevProps.bid.freelancer.rating !== nextProps.bid.freelancer.rating ||
    prevProps.bid.freelancer.isVerified !== nextProps.bid.freelancer.isVerified ||
    prevProps.bid.freelancer.isTopRated !== nextProps.bid.freelancer.isTopRated
  ) {
    return false;
  }

  // Props are equal, skip re-render
  return true;
};

/**
 * Memoized BidCard component
 * Prevents unnecessary re-renders when parent updates
 */
export const BidCard = React.memo(BidCardComponent, arePropsEqual);

/**
 * BidCardSkeleton Component
 *
 * Loading skeleton for BidCard while data is being fetched.
 * Provides visual feedback during loading state.
 *
 * Requirements:
 * - 13.1: Display skeleton loaders for content sections
 */
export const BidCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Freelancer Info Section Skeleton */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar Skeleton */}
            <Skeleton className="h-16 w-16 rounded-full" />

            {/* Freelancer Details Skeleton */}
            <div className="flex-1 space-y-2">
              {/* Name and Badges Skeleton */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Location Skeleton */}
              <Skeleton className="h-4 w-24" />

              {/* Rating and Reviews Skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Bid Details Section Skeleton */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>

          {/* Action Buttons Section Skeleton */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
