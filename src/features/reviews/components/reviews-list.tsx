import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Loader2, MessageSquareOff } from "lucide-react";
import { Review } from "../schema";
import { ReviewCard } from "./review-card";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  onRespond?: (reviewId: string, message: string) => void;
  onHelpful?: (reviewId: string) => void;
  onLoadMore?: () => void;
  hasMoreReviews?: boolean;
  loadingMore?: boolean;
}

export function ReviewsList({
  reviews,
  isLoading,
  onRespond,
  onHelpful,
  onLoadMore,
  hasMoreReviews,
  loadingMore,
}: ReviewsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-10 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <Skeleton key={j} className="h-12 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquareOff className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No reviews found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          No reviews match your current filters. Try adjusting your search
          criteria.
        </p>
        <Button variant="outline" className="gap-2">
          <Star className="h-4 w-4" />
          View All Reviews
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onRespond={onRespond}
            onHelpful={onHelpful}
          />
        ))}
      </div>

      {hasMoreReviews && onLoadMore && (
        <div className="flex flex-col items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {reviews.length} reviews
          </p>
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="gap-2 px-6 py-3 h-auto text-base shadow-sm hover:shadow transition-all duration-200"
          >
            {loadingMore ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Star className="h-5 w-5" />
            )}
            {loadingMore ? "Loading..." : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  );
}
