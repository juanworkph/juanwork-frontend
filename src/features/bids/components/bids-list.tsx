import React from 'react';
import { BidCard } from './bid-card';
import { Bid } from '../schema/bids-data';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';

interface BidsListProps {
  bids: Bid[];
  isLoading: boolean;
  onWithdraw: (id: string) => void;
  onPin: (id: string, isPinned: boolean) => void;
  onLoadMore?: () => void;
  hasMoreBids?: boolean;
  loadingMore?: boolean;
}

export function BidsList({
  bids,
  isLoading,
  onWithdraw,
  onPin,
  onLoadMore,
  hasMoreBids,
  loadingMore
}: BidsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <BidCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <Alert variant="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 p-6">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-300 text-base ml-2">
          No bids found. Try adjusting your filters or search query.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {bids.map((bid) => (
          <BidCard 
            key={bid.id} 
            bid={bid} 
            onWithdraw={onWithdraw}
            onPin={onPin}
          />
        ))}
      </div>

      {hasMoreBids && onLoadMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={onLoadMore} 
            disabled={loadingMore}
            className="gap-2 px-6 py-2.5 h-auto text-base"
          >
            {loadingMore ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
            {loadingMore ? 'Loading...' : 'Load More Bids'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Skeleton loader for bid cards
function BidCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-b flex justify-between items-center">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-5 w-36" />
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-5">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        
        {/* Client info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-28 mt-1.5" />
          </div>
        </div>
        
        {/* Bid details grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
        
        {/* Client interaction */}
        <div className="flex items-center gap-5 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-5 border-t flex justify-between bg-gray-50/50 dark:bg-gray-800/20">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
} 