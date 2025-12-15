import React from "react";

/**
 * SingleViewSkeleton Component
 * 
 * Displays a loading skeleton that matches the layout of the actual service details page.
 * Includes shimmer animation effect for better user experience.
 */
export const SingleViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            {/* Back button skeleton */}
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-shimmer"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"
                  ></div>
                ))}
              </div>
            </div>

            {/* Overview Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              {/* Title skeleton */}
              <div className="flex items-start gap-3 mb-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-shimmer"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-shimmer"></div>
              </div>

              {/* Skills skeleton */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"
                  ></div>
                ))}
              </div>

              {/* Stats skeleton */}
              <div className="flex gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-shimmer"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-shimmer"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-shimmer"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4 animate-shimmer"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6 animate-shimmer"></div>
              
              {/* Rating summary skeleton */}
              <div className="flex items-center gap-8 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                </div>
                <div className="flex-1 space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                      <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                      <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual reviews skeleton */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-shimmer"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-shimmer"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-6">
            {/* Pricing Card Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-shimmer"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
              </div>
            </div>

            {/* Provider Card Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-shimmer"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-shimmer"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-shimmer"></div>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-shimmer"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #f0f0f0 0%,
            #e0e0e0 20%,
            #f0f0f0 40%,
            #f0f0f0 100%
          );
          background-size: 1000px 100%;
        }

        :global(.dark) .animate-shimmer {
          background: linear-gradient(
            to right,
            #374151 0%,
            #4b5563 20%,
            #374151 40%,
            #374151 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
};
