import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { DiscoverServicesFilters } from "../schema";
import { useDebounce } from "@/components/ui/multiple-selector";

interface DiscoverServicesHeaderProps {
  filters: DiscoverServicesFilters;
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
  totalResults: number;
  isLoading: boolean;
}

export function DiscoverServicesHeader({
  filters,
  onFilterChange,
  totalResults,
  isLoading,
}: DiscoverServicesHeaderProps) {
  // Local state for immediate search input (before debouncing)
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce the search input with 300ms delay
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync local state with parent filters when filters.search changes externally
  // (e.g., when clear filters is clicked)
  useEffect(() => {
    if (filters.search !== searchInput) {
      setSearchInput(filters.search);
    }
  }, [filters.search]);

  // Update parent filter when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ sortBy: value as DiscoverServicesFilters["sortBy"] });
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 shadow-sm bg-white dark:bg-gray-900">
      <div className="px-6 py-4">

        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services by name, skill, or category..."
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
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating-high">Rating: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Result Count Display */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {isLoading ? (
            <span>Loading services...</span>
          ) : (
            <span>
              Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{totalResults}</span> service{totalResults !== 1 ? 's' : ''}
              {filters.search && (
                <span>
                  {' '}for <span className="font-semibold text-gray-900 dark:text-gray-100">&quot;{filters.search}&quot;</span>
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
