import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Search,
  RefreshCcw,
  SlidersHorizontal,
  TrendingUp,
  MessageSquare,
  Award,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { ReviewsState, getStarPercentage, getRatingColor } from "../schema";

interface ReviewsHeaderProps {
  stats: ReviewsState["stats"];
  filters: ReviewsState["filters"];
  onFilterChange: (filters: Partial<ReviewsState["filters"]>) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function ReviewsHeader({
  stats,
  filters,
  onFilterChange,
  onRefresh,
  isLoading,
}: ReviewsHeaderProps) {
  // Handle rating filter change
  const handleRatingChange = (rating: ReviewsState["filters"]["rating"]) => {
    onFilterChange({ rating });
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  // Handle sort direction change
  const handleSortDirectionChange = () => {
    onFilterChange({
      sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with Title and Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Star className="h-7 w-7 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Client Reviews
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.total} reviews • {stats.averageRating.toFixed(1)} average
                rating
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 px-4 py-2 h-auto"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCcw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant={filters.sortDirection === "asc" ? "outline" : "default"}
              size="sm"
              className="gap-2 px-4 py-2 h-auto"
              onClick={handleSortDirectionChange}
            >
              {filters.sortDirection === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {filters.sortDirection === "asc"
                  ? "Oldest First"
                  : "Newest First"}
              </span>
            </Button>
          </div>
        </div>

        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reviews by client, project, or message..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 h-11"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="lg" className="gap-2 px-4">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort By</span>
              <Badge variant="secondary" className="ml-1 font-normal">
                {filters.sortBy === "recent"
                  ? "Recent"
                  : filters.sortBy === "rating"
                  ? "Rating"
                  : "Helpful"}
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Average Rating Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Overall Rating
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(stats.averageRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Based on {stats.total} reviews
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Rating Distribution
          </p>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count =
                rating === 5
                  ? stats.fiveStars
                  : rating === 4
                  ? stats.fourStars
                  : rating === 3
                  ? stats.threeStars
                  : rating === 2
                  ? stats.twoStars
                  : stats.oneStar;
              const percentage = getStarPercentage(count, stats.total);

              return (
                <button
                  key={rating}
                  onClick={() =>
                    handleRatingChange(rating as 1 | 2 | 3 | 4 | 5)
                  }
                  className={`w-full flex items-center gap-3 group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-2 transition-colors ${
                    filters.rating === rating
                      ? "bg-gray-50 dark:bg-gray-700/50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {rating}
                    </span>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12 text-right">
                    {count}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 w-12 text-right">
                    {percentage}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Ratings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span
              className={`text-lg font-bold ${getRatingColor(
                stats.averageCommunication
              )}`}
            >
              {stats.averageCommunication.toFixed(1)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Communication
          </p>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(stats.averageCommunication)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            <span
              className={`text-lg font-bold ${getRatingColor(
                stats.averageQuality
              )}`}
            >
              {stats.averageQuality.toFixed(1)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Quality
          </p>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(stats.averageQuality)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
            <span
              className={`text-lg font-bold ${getRatingColor(
                stats.averageExpertise
              )}`}
            >
              {stats.averageExpertise.toFixed(1)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Expertise
          </p>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(stats.averageExpertise)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <span
              className={`text-lg font-bold ${getRatingColor(
                stats.averageProfessionalism
              )}`}
            >
              {stats.averageProfessionalism.toFixed(1)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Professionalism
          </p>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(stats.averageProfessionalism)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <span
              className={`text-lg font-bold ${getRatingColor(
                stats.averageDeadlines
              )}`}
            >
              {stats.averageDeadlines.toFixed(1)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Deadlines
          </p>
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(stats.averageDeadlines)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
