"use client";

import React, { useState, useMemo } from "react";
import {
  ProposalsHeader,
  ProposalsList,
} from "@/features/proposals/components";
import { mockClientProposalsData } from "@/features/proposals/schema";
import { ProposalsState } from "@/features/proposals/schema";

export default function ClientProposalsPage() {
  // State for proposals data
  const [proposalsData, setProposalsData] = useState<ProposalsState>(
    mockClientProposalsData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore] = useState(false);

  // Filter proposals based on current filters
  const filteredProposals = useMemo(() => {
    let result = [...proposalsData.proposals];

    // Filter by status
    if (proposalsData.filters.status !== "all") {
      result = result.filter(
        (proposal) => proposal.status === proposalsData.filters.status
      );
    }

    // Filter by search query
    if (proposalsData.filters.search.trim()) {
      const query = proposalsData.filters.search.toLowerCase();
      result = result.filter((proposal) => {
        return (
          proposal.project.title.toLowerCase().includes(query) ||
          proposal.project.description.toLowerCase().includes(query) ||
          proposal.client.name.toLowerCase().includes(query) ||
          proposal.project.category.toLowerCase().includes(query) ||
          proposal.project.skills.some((skill) =>
            skill.toLowerCase().includes(query)
          )
        );
      });
    }

    // Sort proposals
    result.sort((a, b) => {
      if (proposalsData.filters.sortBy === "date") {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return proposalsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (proposalsData.filters.sortBy === "amount") {
        return proposalsData.filters.sortDirection === "asc"
          ? a.proposedAmount - b.proposedAmount
          : b.proposedAmount - a.proposedAmount;
      }

      if (proposalsData.filters.sortBy === "expiry") {
        if (!a.expiresAt && !b.expiresAt) return 0;
        if (!a.expiresAt)
          return proposalsData.filters.sortDirection === "asc" ? 1 : -1;
        if (!b.expiresAt)
          return proposalsData.filters.sortDirection === "asc" ? -1 : 1;

        const dateA = new Date(a.expiresAt).getTime();
        const dateB = new Date(b.expiresAt).getTime();
        return proposalsData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (proposalsData.filters.sortBy === "activity") {
        const activityA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const activityB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        return proposalsData.filters.sortDirection === "asc"
          ? activityA - activityB
          : activityB - activityA;
      }

      return 0;
    });

    return result;
  }, [proposalsData.proposals, proposalsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<ProposalsState["filters"]>) => {
    setProposalsData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle refreshing proposals
  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setProposalsData(mockClientProposalsData);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-10">
      <ProposalsHeader
        stats={proposalsData.stats}
        filters={proposalsData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        title="Proposals Sent"
        subtitle={`${proposalsData.stats.total} proposals sent to freelancers`}
      />

      <ProposalsList
        proposals={filteredProposals}
        isLoading={isLoading}
        hasMoreProposals={false}
        loadingMore={loadingMore}
      />
    </div>
  );
}
