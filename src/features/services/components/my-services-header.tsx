/**
 * MyServicesHeader Component
 * 
 * Displays the header section for the My Services page including:
 * - Page title and description
 * - Statistics cards (Total, Approved, Pending, Views, Proposals)
 * - Search input with debouncing
 * - Status filter dropdown
 * - Sort dropdown
 * - Action buttons (Post New Service, Refresh)
 * 
 * Requirements: 3.1-3.4, 4.1-4.4, 5.1-5.3, 7.1-7.6, 9.1-9.4, 11.1-11.2
 */

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  RefreshCw,
  Layers,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  Filter,
  SortAsc,
} from "lucide-react";
import {
  ServiceFilterStatus,
  ServiceSortOption,
  filterOptions,
  sortOptions,
  formatNumber,
} from "../schema/my-services-data";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

/**
 * Props interface for MyServicesHeader component
 */
interface MyServicesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: ServiceFilterStatus;
  onStatusChange: (status: ServiceFilterStatus) => void;
  sortBy: ServiceSortOption;
  onSortChange: (sort: ServiceSortOption) => void;
  totalServices: number;
  approvedServices: number;
  pendingServices: number;
  totalViews: number;
  totalProposals: number;
  filteredCount: number;
  onCreateNew: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

/**
 * StatCard Sub-component
 * 
 * Displays a single statistic card with icon, title, and value
 */
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(value)}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${colorClass || "bg-gray-100 dark:bg-gray-800"}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * MyServicesHeader Component
 * 
 * Main header component for the My Services page with statistics,
 * search, filters, and action buttons.
 * 
 * Optimized with React.memo to prevent unnecessary re-renders - Requirement 11.2
 */
export const MyServicesHeader = React.memo<MyServicesHeaderProps>(({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  totalServices,
  approvedServices,
  pendingServices,
  totalViews,
  totalProposals,
  filteredCount,
  onCreateNew,
  onRefresh,
  isLoading,
}) => {
  // Local state for search input - Requirement 4.1
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce search input by 300ms - Requirement 11.1
  const debouncedSearchQuery = useDebouncedValue(localSearchQuery, 300);

  // Update parent component when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  // Sync local state with prop when it changes externally
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search input change - Requirement 11.2
  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  }, []);

  // Check if filters are active
  const hasActiveFilters = selectedStatus !== "all" || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Header Section - Title, Description, and Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all your posted services
          </p>
        </div>

        {/* Action Buttons - Requirements 9.1-9.4, 11.1-11.2, 11.3 */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Refresh Button - Requirements 9.1-9.4, 11.3 */}
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh services list"
            aria-busy={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
            <span className="ml-2">Refresh</span>
          </Button>

          {/* Post New Service Button - Requirements 11.1-11.2, 11.3 */}
          <Button
            onClick={onCreateNew}
            aria-label="Create and post a new service"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Post New Service</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards Section - Requirements 7.1-7.6 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Services Card - Requirement 7.1 */}
        <StatCard
          title="Total Services"
          value={totalServices}
          icon={<Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          colorClass="bg-blue-100 dark:bg-blue-900/30"
        />

        {/* Approved Services Card - Requirement 7.2 */}
        <StatCard
          title="Approved"
          value={approvedServices}
          icon={<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
          colorClass="bg-green-100 dark:bg-green-900/30"
        />

        {/* Pending Services Card - Requirement 7.3 */}
        <StatCard
          title="Pending"
          value={pendingServices}
          icon={<Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
          colorClass="bg-yellow-100 dark:bg-yellow-900/30"
        />

        {/* Total Views Card - Requirement 7.4 */}
        <StatCard
          title="Total Views"
          value={totalViews}
          icon={<Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
          colorClass="bg-purple-100 dark:bg-purple-900/30"
        />

        {/* Total Proposals Card - Requirement 7.5 */}
        <StatCard
          title="Total Proposals"
          value={totalProposals}
          icon={<MessageCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
          colorClass="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>
      
      {/* Search and Filters Section - Requirements 4.1-4.4 */}
      <div className="space-y-4">
        {/* Search, Filter, and Sort in one row - Requirements 3.1-3.4, 4.1-4.4, 5.1-5.3, 11.3 */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input - Requirements 4.1-4.4, 11.3 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search services by name, description, category, or skills..."
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              className="pl-10"
              aria-label="Search services by name, description, category, or skills"
              role="searchbox"
            />
          </div>

          {/* Status Filter Dropdown - Requirements 3.1-3.4, 11.3 */}
          <div className="w-full sm:w-48">
            <Select
              value={selectedStatus}
              onValueChange={(value) => onStatusChange(value as ServiceFilterStatus)}
            >
              <SelectTrigger aria-label="Filter services by status">
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Dropdown - Requirements 5.1-5.3, 11.3 */}
          <div className="w-full sm:w-48">
            <Select
              value={sortBy}
              onValueChange={(value) => onSortChange(value as ServiceSortOption)}
            >
              <SelectTrigger aria-label="Sort services by criteria">
                <SortAsc className="h-4 w-4 mr-2" aria-hidden="true" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtered Count Display - Requirement 4.3 */}
        {hasActiveFilters && (
          <p className="text-sm text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
            Showing {formatNumber(filteredCount)} of {formatNumber(totalServices)} services
          </p>
        )}
      </div>
    </div>
  );
});

// Add display name for debugging
MyServicesHeader.displayName = "MyServicesHeader";
