import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  ProjectStatus,
  ProjectType,
  Priority,
} from "../schema/workstation-data";

interface WorkstationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ProjectStatus | "all";
  onStatusFilterChange: (status: ProjectStatus | "all") => void;
  projectTypeFilter: ProjectType | "all";
  onProjectTypeFilterChange: (type: ProjectType | "all") => void;
  priorityFilter: Priority | "all";
  onPriorityFilterChange: (priority: Priority | "all") => void;
  totalCount: number;
  filteredCount: number;
}

export function WorkstationFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  projectTypeFilter,
  onProjectTypeFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  totalCount,
  filteredCount,
}: WorkstationFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-end">
        {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Projects
        </h2> */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCount} of {totalCount} projects
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search - Takes 2 columns on large screens */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            onStatusFilterChange(value as ProjectStatus | "all")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Project Type Filter */}
        <Select
          value={projectTypeFilter}
          onValueChange={(value) =>
            onProjectTypeFilterChange(value as ProjectType | "all")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fixed">Fixed Price</SelectItem>
            <SelectItem value="hourly">Hourly Rate</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select
          value={priorityFilter}
          onValueChange={(value) =>
            onPriorityFilterChange(value as Priority | "all")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
