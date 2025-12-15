import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Filter,
  RefreshCcw,
  SlidersHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { BidsState } from "../schema/bids-data";

interface BidsHeaderProps {
  stats: BidsState["stats"];
  filters: BidsState["filters"];
  onFilterChange: (filters: Partial<BidsState["filters"]>) => void;
  onRefresh: () => void;
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

export function BidsHeader({
  stats,
  filters,
  onFilterChange,
  onRefresh,
  isLoading,
  title = "My Bids",
  subtitle,
}: BidsHeaderProps) {
  // Handle status filter change
  const handleStatusChange = (status: BidsState["filters"]["status"]) => {
    onFilterChange({ status });
  };

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

  return (
    <div className="space-y-8">
      {/* Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle || `${stats.total} bids across all projects`}
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
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button
          variant={filters.status === "all" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("all")}
        >
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">All</span>
            <span className="text-xl font-bold">{stats.total}</span>
          </div>
        </Button>

        <Button
          variant={filters.status === "pending" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("pending")}
        >
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">Pending</span>
            <span className="text-xl font-bold">{stats.pending}</span>
          </div>
        </Button>

        <Button
          variant={filters.status === "accepted" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("accepted")}
        >
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">Accepted</span>
            <span className="text-xl font-bold">{stats.accepted}</span>
          </div>
        </Button>

        <Button
          variant={filters.status === "rejected" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("rejected")}
        >
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
            <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">Rejected</span>
            <span className="text-xl font-bold">{stats.rejected}</span>
          </div>
        </Button>

        <Button
          variant={filters.status === "withdrawn" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("withdrawn")}
        >
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">Withdrawn</span>
            <span className="text-xl font-bold">{stats.withdrawn}</span>
          </div>
        </Button>

        <Button
          variant={filters.status === "expired" ? "default" : "outline"}
          className="justify-start gap-3 p-4 h-auto shadow-sm hover:shadow transition-all duration-200"
          onClick={() => handleStatusChange("expired")}
        >
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <AlertCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">Expired</span>
            <span className="text-xl font-bold">{stats.expired}</span>
          </div>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bids by project title, client, or keywords..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 h-11"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="gap-2 px-4">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>

          <Button variant="outline" size="lg" className="gap-2 px-4">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Sort By</span>
            <Badge variant="secondary" className="ml-1 font-normal">
              {filters.sortBy === "date"
                ? "Date"
                : filters.sortBy === "amount"
                ? "Amount"
                : filters.sortBy === "expiry"
                ? "Expiry"
                : "Activity"}
            </Badge>
          </Button>
        </div>
      </div>

      {/* Performance Stats - Commented out as requested by user */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">View Rate</p>
          <p className="text-xl font-semibold">{stats.viewRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">of your bids are viewed by clients</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Response Rate</p>
          <p className="text-xl font-semibold">{stats.responseRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">of your bids receive client responses</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
          <p className="text-xl font-semibold">{stats.successRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">of your bids are accepted</p>
        </div>
      </div> */}
    </div>
  );
}
