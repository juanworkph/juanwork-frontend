import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Search,
  RefreshCcw,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Download,
  SortAsc,
  SortDesc,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { PaymentState, formatCurrency } from "../schema";

interface PaymentHeaderProps {
  stats: PaymentState["stats"];
  filters: PaymentState["filters"];
  onFilterChange: (filters: Partial<PaymentState["filters"]>) => void;
  onRefresh: () => void;
  onWithdraw: () => void;
  isLoading: boolean;
}

export function PaymentHeader({
  stats,
  filters,
  onFilterChange,
  onRefresh,
  onWithdraw,
  isLoading,
}: PaymentHeaderProps) {
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

  const earningsChange =
    stats.thisMonthEarnings > stats.lastMonthEarnings
      ? ((stats.thisMonthEarnings - stats.lastMonthEarnings) /
          stats.lastMonthEarnings) *
        100
      : -(
          (stats.lastMonthEarnings - stats.thisMonthEarnings) /
          stats.lastMonthEarnings
        ) * 100;

  const isPositiveChange = stats.thisMonthEarnings >= stats.lastMonthEarnings;

  return (
    <div className="space-y-8">
      {/* Header with Title and Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Wallet className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Earnings & Payments
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your earnings, withdrawals, and payment history
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

            <Button
              size="sm"
              className="gap-2 px-4 py-2 h-auto bg-green-600 hover:bg-green-700"
              onClick={onWithdraw}
            >
              <Download className="h-4 w-4" />
              <span>Withdraw</span>
            </Button>
          </div>
        </div>

        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions by project, client, or description..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 h-11"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="lg" className="gap-2 px-4">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              <Badge variant="secondary" className="ml-1 font-normal">
                {filters.type === "all" ? "All" : filters.type}
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Earnings Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Available Balance
            </p>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(stats.availableBalance, stats.currency)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ready to withdraw
          </p>
        </div>

        {/* Pending Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Balance
            </p>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(stats.pendingBalance, stats.currency)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Processing payments
          </p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Earnings
            </p>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(stats.totalEarnings, stats.currency)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Lifetime earnings
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
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              {isPositiveChange ? (
                <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(stats.thisMonthEarnings, stats.currency)}
          </p>
          <div className="flex items-center gap-1">
            {isPositiveChange ? (
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
            <p
              className={`text-xs font-medium ${
                isPositiveChange
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {Math.abs(earningsChange).toFixed(1)}% vs last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
