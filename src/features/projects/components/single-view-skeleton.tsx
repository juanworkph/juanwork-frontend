import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * SingleViewSkeleton Component
 * 
 * Loading skeleton that maintains the layout structure of the project details page.
 * Matches the target layout with 2/3 main content and 1/3 sidebar on desktop.
 * Fully responsive with mobile-first design.
 */
export const SingleViewSkeleton = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Header Skeleton */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-6 sm:h-8 w-3/4" />
                <div className="flex gap-1.5 sm:gap-2">
                  <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
                  <Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Info Panel Skeleton */}
          <Card>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-3/4" />
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Skeleton className="h-16 sm:h-20 w-full" />
                <Skeleton className="h-16 sm:h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Client Card Skeleton */}
          <Card>
            <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                <div className="space-y-1.5 sm:space-y-2 flex-1">
                  <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                  <Skeleton className="h-2.5 sm:h-3 w-20 sm:w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bidding Form Skeleton */}
          <Card>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Skeleton className="h-9 sm:h-10 w-full" />
              <Skeleton className="h-9 sm:h-10 w-full" />
              <Skeleton className="h-24 sm:h-32 w-full" />
              <Skeleton className="h-9 sm:h-10 w-full" />
            </CardContent>
          </Card>

          {/* Similar Projects Skeleton */}
          <Card>
            <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
              <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
              <Skeleton className="h-16 sm:h-20 w-full" />
              <Skeleton className="h-16 sm:h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
