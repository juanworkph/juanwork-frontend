"use client";

import React, { useState, useMemo } from "react";
import { ReviewsHeader, ReviewsList } from "@/features/reviews/components";
import { mockClientReviewsData, ReviewsState } from "@/features/reviews/schema";
import { toast } from "sonner";

export default function ClientReviewsPage() {
  // State for reviews data
  const [reviewsData, setReviewsData] = useState<ReviewsState>(
    mockClientReviewsData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter reviews based on current filters
  const filteredReviews = useMemo(() => {
    let result = [...reviewsData.reviews];

    // Filter by rating
    if (reviewsData.filters.rating !== "all") {
      result = result.filter(
        (review) => review.ratings.overall === reviewsData.filters.rating
      );
    }

    // Filter by search query
    if (reviewsData.filters.search.trim()) {
      const query = reviewsData.filters.search.toLowerCase();
      result = result.filter((review) => {
        return (
          review.project.name.toLowerCase().includes(query) ||
          review.message.toLowerCase().includes(query) ||
          review.project.category.toLowerCase().includes(query)
        );
      });
    }

    // Sort reviews
    result.sort((a, b) => {
      if (reviewsData.filters.sortBy === "recent") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return reviewsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (reviewsData.filters.sortBy === "rating") {
        return reviewsData.filters.sortDirection === "asc"
          ? a.ratings.overall - b.ratings.overall
          : b.ratings.overall - a.ratings.overall;
      }

      if (reviewsData.filters.sortBy === "helpful") {
        const helpfulA = a.wasHelpful || 0;
        const helpfulB = b.wasHelpful || 0;
        return reviewsData.filters.sortDirection === "asc"
          ? helpfulA - helpfulB
          : helpfulB - helpfulA;
      }

      return 0;
    });

    return result;
  }, [reviewsData.reviews, reviewsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<ReviewsState["filters"]>) => {
    setReviewsData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle refreshing reviews
  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setReviewsData(mockClientReviewsData);
      setIsLoading(false);
      toast.success("Reviews refreshed successfully");
    }, 800);
  };

  // Handle marking review as helpful
  const handleMarkHelpful = (reviewId: string) => {
    setReviewsData((prev) => {
      const updatedReviews = prev.reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              wasHelpful: (review.wasHelpful || 0) + 1,
            }
          : review
      );

      return {
        ...prev,
        reviews: updatedReviews,
      };
    });

    toast.success("Thank you for marking this review as helpful");
  };

  // Handle loading more reviews
  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setLoadingMore(false);
      toast.info("No more reviews to load");
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <ReviewsHeader
        stats={reviewsData.stats}
        filters={reviewsData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      <ReviewsList
        reviews={filteredReviews}
        isLoading={isLoading}
        onHelpful={handleMarkHelpful}
        onLoadMore={handleLoadMore}
        hasMoreReviews={false}
        loadingMore={loadingMore}
      />
    </div>
  );
}
