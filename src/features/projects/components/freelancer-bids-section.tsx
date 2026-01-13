"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, AlertCircle } from "lucide-react";
import { BidCard, BidCardSkeleton } from "./bid-card";
import { ErrorState } from "./error-state";
import {
  FreelancerBid,
  filterBidsByStatus,
  sortBidsByDate,
  getBidCountByStatus,
} from "../schema/project-detail-data";

interface FreelancerBidsSectionProps {
  bids: FreelancerBid[];
  isLoading?: boolean;
  error?: string | null;
  isOwner?: boolean; // NEW: Indicates if current user owns the project
  onMessageFreelancer?: (freelancerId: string) => void;
  onViewProfile?: (freelancerId: string) => void;
  onShortlist?: (bidId: string) => void;
  onInterview?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
  onReport?: (bidId: string) => void;
  onRetry?: () => void;
}

/**
 * FreelancerBidsSection Component
 *
 * Displays all freelancer bids with filtering tabs and empty states.
 * Allows clients to view, filter, and manage bids on their project.
 * Handles loading and error states.
 *
 * Optimized with React.memo and useMemo for filtered bids.
 *
 * Requirements:
 * - 4.1: Display all bids in a list format
 * - 4.7: Display empty state when no bids exist
 * - 4.8: Provide tabs to filter by: All Bids, Shortlisted, Interviewed
 * - 13.1: Display skeleton loaders for content sections
 * - 13.2: Show error message when API fails
 * - 13.3: Add retry button for failed requests
 * - Performance: Optimized with React.memo and useMemo
 */
const FreelancerBidsSectionComponent: React.FC<FreelancerBidsSectionProps> = ({
  bids,
  isLoading = false,
  isOwner = true, // NEW: Default to true for backward compatibility
  error = null,
  onMessageFreelancer,
  onViewProfile,
  onShortlist,
  onInterview,
  onReject,
  onReport,
  onRetry,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<
    "all" | "shortlisted" | "interviewed"
  >("all");

  /**
   * Calculate bid counts for each tab
   */
  const allBidsCount = bids.length;
  const shortlistedCount = useMemo(
    () => getBidCountByStatus(bids, "shortlisted"),
    [bids]
  );
  const interviewedCount = useMemo(
    () => getBidCountByStatus(bids, "interviewed"),
    [bids]
  );

  /**
   * Filter bids based on active tab
   * Uses useMemo for performance optimization
   */
  const filteredBids = useMemo(() => {
    if (activeTab === "all") {
      return sortBidsByDate(bids);
    }
    return sortBidsByDate(filterBidsByStatus(bids, activeTab));
  }, [bids, activeTab]);

  /**
   * Handle tab change
   */
  const handleTabChange = (value: string): void => {
    if (
      value === "all" ||
      value === "shortlisted" ||
      value === "interviewed"
    ) {
      setActiveTab(value);
    }
  };

  /**
   * Render empty state based on active tab
   */
  const renderEmptyState = (): React.ReactElement => {
    const emptyStateConfig = {
      all: {
        icon: <FileText className="h-12 w-12 text-gray-400" />,
        title: "No bids received yet",
        description:
          "Check back later for proposals from freelancers interested in your project.",
      },
      shortlisted: {
        icon: <Users className="h-12 w-12 text-gray-400" />,
        title: "No shortlisted bids yet",
        description:
          "Shortlist promising candidates from the All Bids tab to keep track of your top choices.",
      },
      interviewed: {
        icon: <AlertCircle className="h-12 w-12 text-gray-400" />,
        title: "No interviewed bids yet",
        description:
          "Schedule interviews with shortlisted candidates to discuss your project in detail.",
      },
    };

    const config = emptyStateConfig[activeTab];

    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="mb-4">{config.icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {config.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
          {config.description}
        </p>
      </div>
    );
  };

  /**
   * Render list of bid cards with loading and error states
   */
  const renderBidsList = (): React.ReactElement => {
    // Show error state if there's an error
    if (error) {
      return (
        <ErrorState
          title="Failed to Load Bids"
          message={error}
          onRetry={onRetry}
        />
      );
    }

    // Show loading skeletons while loading
    if (isLoading) {
      return (
        <div className="space-y-4">
          <BidCardSkeleton />
          <BidCardSkeleton />
          <BidCardSkeleton />
        </div>
      );
    }

    // Show empty state if no bids
    if (filteredBids.length === 0) {
      return renderEmptyState();
    }

    // Render bid cards
    return (
      <div className="space-y-4">
        {filteredBids.map((bid) => (
          <BidCard
            key={bid.id}
            bid={bid}
            isOwner={isOwner}
            onMessage={onMessageFreelancer}
            onViewProfile={onViewProfile}
            onShortlist={onShortlist}
            onInterview={onInterview}
            onReject={onReject}
            onReport={onReport}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Freelancer Bids
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
          >
            {allBidsCount} {allBidsCount === 1 ? "Bid" : "Bids"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2"
              aria-label={`All bids, ${allBidsCount} total`}
              aria-controls="all-bids-panel"
            >
              All Bids
              <Badge
                variant="secondary"
                className="ml-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                aria-hidden="true"
              >
                {allBidsCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="shortlisted"
              className="flex items-center gap-2"
              aria-label={`Shortlisted bids, ${shortlistedCount} total`}
              aria-controls="shortlisted-bids-panel"
            >
              Shortlisted
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                aria-hidden="true"
              >
                {shortlistedCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="interviewed"
              className="flex items-center gap-2"
              aria-label={`Interviewed bids, ${interviewedCount} total`}
              aria-controls="interviewed-bids-panel"
            >
              Interviewed
              <Badge
                variant="secondary"
                className="ml-1 bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100"
                aria-hidden="true"
              >
                {interviewedCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0" id="all-bids-panel" role="tabpanel">
            {renderBidsList()}
          </TabsContent>

          <TabsContent value="shortlisted" className="mt-0" id="shortlisted-bids-panel" role="tabpanel">
            {renderBidsList()}
          </TabsContent>

          <TabsContent value="interviewed" className="mt-0" id="interviewed-bids-panel" role="tabpanel">
            {renderBidsList()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

/**
 * Memoized FreelancerBidsSection component
 * Prevents unnecessary re-renders when parent updates
 */
export const FreelancerBidsSection = React.memo(FreelancerBidsSectionComponent);
