import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, SlidersHorizontal, RefreshCcw } from "lucide-react";
import { ServiceFilterStatus } from "../schema/my-services-data";

interface MyServicesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: ServiceFilterStatus;
  onStatusChange: (status: ServiceFilterStatus) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalServices: number;
  filteredCount: number;
  onCreateNew: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function MyServicesHeader({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  totalServices,
  filteredCount,
  onCreateNew,
  onRefresh,
  isLoading,
}: MyServicesHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your posted services
          </p>
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
            <span>Refresh</span>
          </Button>
          <Button
            onClick={onCreateNew}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Post New Service
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Total Services
          </p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
            {totalServices}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Active Services
          </p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
            {totalServices > 0 ? Math.floor(totalServices * 0.6) : 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
            Pending Review
          </p>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mt-1">
            {totalServices > 0 ? Math.floor(totalServices * 0.2) : 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            Total Inquiries
          </p>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
            {totalServices > 0 ? Math.floor(totalServices * 12) : 0}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            onStatusChange(value as ServiceFilterStatus)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="most-views">Most Views</SelectItem>
            <SelectItem value="most-inquiries">Most Inquiries</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCount} of {totalServices} services
        </div>
      )}
    </div>
  );
}
