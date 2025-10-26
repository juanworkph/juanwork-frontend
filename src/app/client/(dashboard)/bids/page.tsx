"use client";

import React, { useState, useMemo } from "react";
import { BidsHeader, BidsList } from "@/features/bids/components";
import { mockClientBidsData } from "@/features/bids/schema";
import { BidsState } from "@/features/bids/schema";

export default function ClientBidsPage() {
  // State for bids data
  const [bidsData, setBidsData] = useState<BidsState>(mockClientBidsData);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter bids based on current filters
  const filteredBids = useMemo(() => {
    let result = [...bidsData.bids];

    // Filter by status
    if (bidsData.filters.status !== "all") {
      result = result.filter((bid) => bid.status === bidsData.filters.status);
    }

    // Filter by search query
    if (bidsData.filters.search.trim()) {
      const query = bidsData.filters.search.toLowerCase();
      result = result.filter((bid) => {
        // Search in project title
        if (bid.project.title.toLowerCase().includes(query)) return true;

        // Search in project description
        if (bid.project.description.toLowerCase().includes(query)) return true;

        // Search in freelancer name (stored in client field from client's perspective)
        if (bid.client.name.toLowerCase().includes(query)) return true;

        // Search in project category
        if (bid.project.category.toLowerCase().includes(query)) return true;

        // Search in skills
        if (
          bid.project.skills.some((skill) =>
            skill.toLowerCase().includes(query)
          )
        )
          return true;

        return false;
      });
    }

    // Sort bids
    result.sort((a, b) => {
      if (bidsData.filters.sortBy === "date") {
        const dateA = new Date(a.bidDate).getTime();
        const dateB = new Date(b.bidDate).getTime();
        return bidsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (bidsData.filters.sortBy === "amount") {
        return bidsData.filters.sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      if (bidsData.filters.sortBy === "expiry") {
        if (!a.expiresAt && !b.expiresAt) return 0;
        if (!a.expiresAt)
          return bidsData.filters.sortDirection === "asc" ? 1 : -1;
        if (!b.expiresAt)
          return bidsData.filters.sortDirection === "asc" ? -1 : 1;

        const dateA = new Date(a.expiresAt).getTime();
        const dateB = new Date(b.expiresAt).getTime();
        return bidsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (bidsData.filters.sortBy === "activity") {
        const activityA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const activityB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        return bidsData.filters.sortDirection === "asc"
          ? activityA - activityB
          : activityB - activityA;
      }

      return 0;
    });

    return result;
  }, [bidsData.bids, bidsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<BidsState["filters"]>) => {
    setBidsData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle refreshing bids
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setBidsData(mockClientBidsData);
      setIsLoading(false);
    }, 800);
  };

  // Handle pinning/unpinning a bid
  const handlePinBid = (id: string, isPinned: boolean) => {
    setBidsData((prev) => {
      const updatedBids = prev.bids.map((bid) =>
        bid.id === id
          ? { ...bid, isPinned, lastUpdated: new Date().toISOString() }
          : bid
      );

      return {
        ...prev,
        bids: updatedBids,
      };
    });
  };

  // Handle loading more bids
  const handleLoadMore = () => {
    setLoadingMore(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoadingMore(false);
      // In a real app, we would fetch more bids and append them to the existing list
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <BidsHeader
        stats={bidsData.stats}
        filters={bidsData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        title="Bids Received"
        subtitle={`${bidsData.stats.total} bids received on your projects`}
      />

      <BidsList
        bids={filteredBids}
        isLoading={isLoading}
        onPin={handlePinBid}
        onLoadMore={handleLoadMore}
        hasMoreBids={false} // In a real app, this would be determined by the API response
        loadingMore={loadingMore}
      />
    </div>
  );
}
