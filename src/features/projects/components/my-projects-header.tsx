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
import { ProjectFilterStatus } from "../schema/my-projects-data";

interface MyProjectsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: ProjectFilterStatus;
  onStatusChange: (status: ProjectFilterStatus) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalProjects: number;
  activeProjects: number;
  inProgressProjects: number;
  totalBids: number;
  filteredCount: number;
  onCreateNew: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function MyProjectsHeader({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  totalProjects,
  activeProjects,
  inProgressProjects,
  totalBids,
  filteredCount,
  onCreateNew,
  onRefresh,
  isLoading,
}: MyProjectsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your posted projects
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 px-4 py-2 h-auto"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh projects list"
          >
            <RefreshCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </Button>
          <Button
            onClick={onCreateNew}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 gap-2"
            aria-label="Post a new project"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Post New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Project statistics">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Total Projects
          </p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1" aria-label={`${totalProjects} total projects`}>
            {totalProjects}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Active Projects
          </p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1" aria-label={`${activeProjects} active projects`}>
            {activeProjects}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            In Progress
          </p>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1" aria-label={`${inProgressProjects} projects in progress`}>
            {inProgressProjects}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
            Total Bids
          </p>
          <p className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1" aria-label={`${totalBids} total bids received`}>
            {totalBids}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4" role="search" aria-label="Search and filter projects">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search projects by title, description, category, or skills"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            onStatusChange(value as ProjectFilterStatus)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter projects by status">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Sort projects">
            <SlidersHorizontal className="h-4 w-4 mr-2" aria-hidden="true" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="most-bidders">Most Bidders</SelectItem>
            <SelectItem value="least-bidders">Least Bidders</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="text-sm text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
          Showing {filteredCount} of {totalProjects} projects
        </div>
      )}
    </div>
  );
}
