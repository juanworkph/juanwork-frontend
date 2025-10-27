"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Search,
  RefreshCcw,
  SlidersHorizontal,
  DollarSign,
  Clock,
  Plus,
  SortAsc,
  SortDesc,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { AddFundsModal, TransactionsList } from "@/features/payment/components";
import {
  mockClientPaymentData,
  formatCurrency,
} from "@/features/payment/schema";
import { PaymentState } from "@/features/payment/schema";
import { toast } from "sonner";

export default function ClientPaymentPage() {
  // State for payment data
  const [paymentData, setPaymentData] = useState<PaymentState>(
    mockClientPaymentData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    let result = [...paymentData.transactions];

    // Filter by type
    if (paymentData.filters.type !== "all") {
      result = result.filter(
        (transaction) => transaction.type === paymentData.filters.type
      );
    }

    // Filter by status
    if (paymentData.filters.status !== "all") {
      result = result.filter(
        (transaction) => transaction.status === paymentData.filters.status
      );
    }

    // Filter by search query
    if (paymentData.filters.search.trim()) {
      const query = paymentData.filters.search.toLowerCase();
      result = result.filter((transaction) => {
        return (
          transaction.description.toLowerCase().includes(query) ||
          transaction.projectName?.toLowerCase().includes(query) ||
          transaction.clientName?.toLowerCase().includes(query) ||
          transaction.type.toLowerCase().includes(query)
        );
      });
    }

    // Sort transactions
    result.sort((a, b) => {
      if (paymentData.filters.sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return paymentData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (paymentData.filters.sortBy === "amount") {
        return paymentData.filters.sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      return 0;
    });

    return result;
  }, [paymentData.transactions, paymentData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<PaymentState["filters"]>) => {
    setPaymentData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange({ search: e.target.value });
  };

  // Handle sort direction change
  const handleSortDirectionChange = () => {
    handleFilterChange({
      sortDirection:
        paymentData.filters.sortDirection === "asc" ? "desc" : "asc",
    });
  };

  // Handle refreshing payment data
  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setPaymentData(mockClientPaymentData);
      setIsLoading(false);
      toast.success("Payment data refreshed successfully");
    }, 800);
  };

  // Handle adding funds
  const handleAddFunds = (amount: number, accountId: string) => {
    const account = paymentData.withdrawalAccounts.find(
      (a) => a.id === accountId
    );

    if (!account) return;

    // Create new deposit transaction
    const newTransaction = {
      id: `deposit-${Date.now()}`,
      type: "bonus" as const,
      amount: amount,
      currency: paymentData.stats.currency,
      status: "completed" as const,
      description: `Funds added via ${account.accountName}`,
      date: new Date().toISOString(),
      method: account.method,
      fee: 0,
      netAmount: amount,
    };

    setPaymentData((prev) => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      stats: {
        ...prev.stats,
        availableBalance: prev.stats.availableBalance + amount,
        withdrawnAmount: prev.stats.withdrawnAmount + amount,
      },
    }));

    toast.success(
      `Successfully added ${formatCurrency(
        amount,
        paymentData.stats.currency
      )} to your account!`,
      {
        description: `Your funds are now available to use for projects.`,
      }
    );
  };

  // Handle loading more transactions
  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  const spendingChange =
    paymentData.stats.thisMonthEarnings > paymentData.stats.lastMonthEarnings
      ? ((paymentData.stats.thisMonthEarnings -
          paymentData.stats.lastMonthEarnings) /
          paymentData.stats.lastMonthEarnings) *
        100
      : -(
          (paymentData.stats.lastMonthEarnings -
            paymentData.stats.thisMonthEarnings) /
          paymentData.stats.lastMonthEarnings
        ) * 100;

  const isPositiveChange =
    paymentData.stats.thisMonthEarnings >= paymentData.stats.lastMonthEarnings;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="space-y-8">
        {/* Header with Title and Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Wallet className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Payments & Balance
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your account balance, payments, and transaction history
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 px-4 py-2 h-auto"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCcw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              <Button
                variant={
                  paymentData.filters.sortDirection === "asc"
                    ? "outline"
                    : "default"
                }
                size="sm"
                className="gap-2 px-4 py-2 h-auto"
                onClick={handleSortDirectionChange}
              >
                {paymentData.filters.sortDirection === "asc" ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {paymentData.filters.sortDirection === "asc"
                    ? "Oldest First"
                    : "Newest First"}
                </span>
              </Button>

              <Button
                size="sm"
                className="gap-2 px-4 py-2 h-auto bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsAddFundsModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>Add Funds</span>
              </Button>
            </div>
          </div>

          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions by project, freelancer, or description..."
                value={paymentData.filters.search}
                onChange={handleSearchChange}
                className="pl-10 pr-4 h-11"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="gap-2 px-4">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
                <Badge variant="secondary" className="ml-1 font-normal">
                  {paymentData.filters.type === "all"
                    ? "All"
                    : paymentData.filters.type}
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Account Balance */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Account Balance
              </p>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(
                paymentData.stats.availableBalance,
                paymentData.stats.currency
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Available for projects
            </p>
          </div>

          {/* Pending Payments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Payments
              </p>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(
                paymentData.stats.pendingBalance,
                paymentData.stats.currency
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Processing payments
            </p>
          </div>

          {/* Total Spent */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Spent
              </p>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(
                paymentData.stats.totalEarnings,
                paymentData.stats.currency
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Lifetime spending
            </p>
          </div>

          {/* This Month */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                This Month
              </p>
              <div
                className={`p-2 rounded-full ${
                  isPositiveChange
                    ? "bg-orange-100 dark:bg-orange-900/30"
                    : "bg-green-100 dark:bg-green-900/30"
                }`}
              >
                {isPositiveChange ? (
                  <ArrowUpRight className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(
                paymentData.stats.thisMonthEarnings,
                paymentData.stats.currency
              )}
            </p>
            <div className="flex items-center gap-1">
              {isPositiveChange ? (
                <TrendingUp className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-600 dark:text-green-400" />
              )}
              <p
                className={`text-xs font-medium ${
                  isPositiveChange
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {Math.abs(spendingChange).toFixed(1)}% vs last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <TransactionsList
        transactions={filteredTransactions}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        hasMoreTransactions={false}
        loadingMore={loadingMore}
      />

      <AddFundsModal
        isOpen={isAddFundsModalOpen}
        onClose={() => setIsAddFundsModalOpen(false)}
        onSubmit={handleAddFunds}
        currentBalance={paymentData.stats.availableBalance}
        currency={paymentData.stats.currency}
        accounts={paymentData.withdrawalAccounts}
      />
    </div>
  );
}
