import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { DiscoverFreelancersFilters } from "../schema";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

interface DiscoverFreelancersHeaderProps {
  filters: DiscoverFreelancersFilters;
  onFilterChange: (filters: Partial<DiscoverFreelancersFilters>) => void;
  totalResults: number;
}

export function DiscoverFreelancersHeader({
  filters,
  onFilterChange,
  totalResults,
}: DiscoverFreelancersHeaderProps) {
  // Local state for search input (before debouncing)
  const [searchInput, setSearchInput] = useState(filters.search);
  
  // Debounce search input by 300ms
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  // Update filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onFilterChange]);

  // Sync local state with external filter changes
  useEffect(() => {
    if (filters.search !== searchInput) {
      setSearchInput(filters.search);
    }
  }, [filters.search, searchInput]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (value: DiscoverFreelancersFilters["sortBy"]) => {
    onFilterChange({ sortBy: value });
  };

  const getSortLabel = (sortBy: DiscoverFreelancersFilters["sortBy"]) => {
    switch (sortBy) {
      case "relevance":
        return "Relevance";
      case "rating-high":
        return "Rating: High to Low";
      case "rate-low":
        return "Rate: Low to High";
      case "rate-high":
        return "Rate: High to Low";
      case "experience":
        return "Most Experience";
      default:
        return "Sort";
    }
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 shadow-sm bg-white dark:bg-gray-900">
      <div className="px-4 sm:px-6 py-4">
        {/* Result Count */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{totalResults}</span> freelancer{totalResults !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search and Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search freelancers by name, skill, or category..."
              value={searchInput}
              onChange={handleSearchChange}
              className="pl-10 h-11"
            />
          </div>

          {/* Sort Dropdown */}
          <Select
            value={filters.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full sm:w-[220px] h-11">
              <SelectValue placeholder="Sort by">
                {getSortLabel(filters.sortBy)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating-high">Rating: High to Low</SelectItem>
              <SelectItem value="rate-low">Rate: Low to High</SelectItem>
              <SelectItem value="rate-high">Rate: High to Low</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
