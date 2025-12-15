import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, Loader2, Receipt } from "lucide-react";
import { Transaction } from "../schema";
import { TransactionCard } from "./transaction-card";

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMoreTransactions?: boolean;
  loadingMore?: boolean;
}

export function TransactionsList({
  transactions,
  isLoading,
  onLoadMore,
  hasMoreTransactions,
  loadingMore,
}: TransactionsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Receipt className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No transactions found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          No transactions match your current filters. Try adjusting your search
          criteria.
        </p>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          View All Transactions
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {hasMoreTransactions && onLoadMore && (
        <div className="flex flex-col items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {transactions.length} transactions
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
              <Wallet className="h-5 w-5" />
            )}
            {loadingMore ? "Loading..." : "Load More Transactions"}
          </Button>
        </div>
      )}
    </div>
  );
}
