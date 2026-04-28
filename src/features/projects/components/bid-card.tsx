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
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  FreelancerBid,
  formatBidAmount,
  formatRelativeTime,
} from "../schema/project-detail-data";
import { FileText } from "lucide-react";

interface BidCardProps {
  bid: FreelancerBid;
  isOwner?: boolean; // NEW: Indicates if current user owns the project
  onMessage?: (freelancerId: string) => void;
  onViewProfile?: (freelancerId: string) => void;
  onShortlist?: (bidId: string) => void;
  onAccept?: (bidId: string) => void;
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
  onAccept,
  onReject,
  onReport,
}) => {
  const { freelancer } = bid;

  // State for accept and reject confirmation dialogs
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  // State for toggling cover letter
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);

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
        />,
      );
    }

    // Half star
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />,
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300 dark:text-gray-600"
        />,
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
   * Handle accept action
   * Opens confirmation dialog
   */
  const handleAccept = (): void => {
    setIsAcceptDialogOpen(true);
  };

  /**
   * Handle accept confirmation
   * Calls onAccept handler and closes dialog
   */
  const handleConfirmAccept = (): void => {
    if (onAccept) {
      onAccept(bid.id);
    }
    setIsAcceptDialogOpen(false);
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
    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all group">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
        {/* Freelancer Info */}
        <div className="flex items-center gap-4 flex-1 w-full">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-background dark:border-zinc-900 shadow-lg">
              <AvatarImage
                src={freelancer.avatar}
                alt={freelancer.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {getInitials(freelancer.name)}
              </AvatarFallback>
            </Avatar>
            {freelancer.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background dark:border-zinc-900 flex items-center justify-center">
                <CheckCircle className="text-white h-3 w-3" />
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">
                {freelancer.name}
              </h4>
              {freelancer.isTopRated && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-tighter">
                  Top Rated
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {freelancer.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-zinc-900 dark:text-zinc-100">
                  {freelancer.rating.toFixed(1)}
                </span>
                <span className="text-zinc-400 font-normal">
                  ({freelancer.reviewCount} Reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Details */}
        <div className="flex items-center gap-8 md:gap-12 text-center md:text-left w-full md:w-auto px-4 md:px-0 py-4 md:py-0 border-y md:border-y-0 border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1 tracking-widest">
              Bid Amount
            </p>
            <p className="text-lg font-bold text-primary">
              {formatBidAmount(bid.bidAmount, bid.currency)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1 tracking-widest">
              Delivery Time
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {bid.deliveryDays} Days
            </p>
          </div>
        </div>

        {/* Actions - Only show for pending or shortlisted bids */}
        {(bid.status === "pending" || bid.status === "shortlisted") && (
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Button
              onClick={handleMessage}
              className="h-10 w-10 p-0 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              title="Message Freelancer"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleViewProfile}
              className="h-10 w-10 p-0 bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              title="View Profile"
            >
              <User className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <MoreVertical className="h-5 w-5 text-zinc-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
              >
                {bid.status === "pending" && (
                  <DropdownMenuItem
                    onClick={handleShortlist}
                    className="gap-3 py-2.5"
                  >
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Shortlist Bid</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleAccept}
                  className="gap-3 py-2.5 text-green-600 focus:text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Accept Bid</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                <DropdownMenuItem
                  onClick={handleReject}
                  className="gap-3 py-2.5 text-rose-500 focus:text-rose-500"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm font-medium">Reject Bid</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleReport}
                  className="gap-3 py-2.5 text-zinc-500"
                >
                  <Flag className="h-4 w-4" />
                  <span className="text-sm font-medium">Report Dispute</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Status indicator for non-actionable bids */}
        {bid.status !== "pending" && bid.status !== "shortlisted" && (
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Badge
              variant="outline"
              className={`capitalize px-3 py-1 font-bold ${
                bid.status === "accepted"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : bid.status === "rejected"
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                  : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
              }`}
            >
              {bid.status}
            </Badge>
            <Button
              variant="outline"
              onClick={handleViewProfile}
              className="h-10 w-10 p-0 rounded-lg"
              title="View Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Expandable Cover Letter */}
      {bid.coverLetter && (
        <div className="border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
          <button
            onClick={() => setIsCoverLetterOpen(!isCoverLetterOpen)}
            className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-expanded={isCoverLetterOpen}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Cover Letter
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isCoverLetterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCoverLetterOpen
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-6 pt-2">
              <div className="p-4 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg shadow-inner">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {bid.coverLetter}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accept Bid Confirmation Dialog */}
      <AlertDialog
        open={isAcceptDialogOpen}
        onOpenChange={setIsAcceptDialogOpen}
      >
        <AlertDialogContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Accept This Bid?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
              Are you sure you want to accept this bid from{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {freelancer.name}
              </span>
              ? This will start the project workspace and mark other pending bids as lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAccept}
              className="bg-green-600 hover:bg-green-700 text-white border-none"
            >
              Accept Bid
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Bid Confirmation Dialog */}
      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Reject This Bid?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
              Are you sure you want to reject this bid from{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {freelancer.name}
              </span>
              ? The freelancer will be notified. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReject}
              className="bg-rose-500 hover:bg-rose-600 text-white border-none"
            >
              Reject Bid
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/**
 * Custom comparison function for React.memo
 * Only re-render if bid data or status changes
 */
const arePropsEqual = (
  prevProps: BidCardProps,
  nextProps: BidCardProps,
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
    prevProps.bid.freelancer.isVerified !==
      nextProps.bid.freelancer.isVerified ||
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
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex gap-8">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-8 w-64" />
            </div>
          </div>

          {/* Action Buttons Section Skeleton */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
