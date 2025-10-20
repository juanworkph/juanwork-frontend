import React from "react";
import { ProposalCard } from "./proposal-card";
import { Proposal } from "../schema/proposals-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Loader2, FileX } from "lucide-react";

interface ProposalsListProps {
  proposals: Proposal[];
  isLoading: boolean;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onWithdraw?: (id: string) => void;
  onLoadMore?: () => void;
  hasMoreProposals?: boolean;
  loadingMore?: boolean;
}

export function ProposalsList({
  proposals,
  isLoading,
  onAccept,
  onDecline,
  onWithdraw,
  onLoadMore,
  hasMoreProposals,
  loadingMore,
}: ProposalsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <ProposalCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
          <FileX className="h-12 w-12 text-gray-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No proposals found
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          No proposals match your current filters. Try adjusting your search
          criteria or explore new project opportunities.
        </p>

        <Button variant="outline" className="gap-2">
          <Send className="h-4 w-4" />
          Browse Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onAccept={onAccept}
            onDecline={onDecline}
            onWithdraw={onWithdraw}
          />
        ))}
      </div>

      {/* Load More Section */}
      {hasMoreProposals && onLoadMore && (
        <div className="flex flex-col items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {proposals.length} of many proposals
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
              <Send className="h-5 w-5" />
            )}
            {loadingMore ? "Loading more proposals..." : "Load More Proposals"}
          </Button>
        </div>
      )}
    </div>
  );
}

// Skeleton loader for proposal cards
function ProposalCardSkeleton() {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-3">
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Client info */}
        <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-12 rounded" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-12 mx-auto mb-1" />
            <Skeleton className="h-3 w-14 mx-auto" />
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-12 mx-auto mb-1" />
            <Skeleton className="h-3 w-14 mx-auto" />
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-12 mx-auto mb-1" />
            <Skeleton className="h-3 w-14 mx-auto" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
