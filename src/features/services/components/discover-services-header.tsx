import React from "react";
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
  SortAsc,
  SortDesc,
  Bell,
  User,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { DiscoverServicesFilters } from "../schema";
import { categories } from "../schema/discover-services-data";

interface DiscoverServicesHeaderProps {
  filters: DiscoverServicesFilters;
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
}

export function DiscoverServicesHeader({
  filters,
  onFilterChange,
}: DiscoverServicesHeaderProps) {
  const handleSortChange = () => {
    const sortOptions: Array<DiscoverServicesFilters["sortBy"]> = [
      "relevance",
      "rating-high",
      "price-low",
      "price-high",
      "popular",
    ];
    const currentIndex = sortOptions.indexOf(filters.sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    onFilterChange({ sortBy: sortOptions[nextIndex] });
  };

  const getSortLabel = () => {
    switch (filters.sortBy) {
      case "relevance":
        return "Most Relevant";
      case "rating-high":
        return "Rating: High to Low";
      case "price-low":
        return "Price: Low to High";
      case "price-high":
        return "Price: High to Low";
      case "popular":
        return "Most Popular";
      default:
        return "Sort";
    }
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
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10 h-11"
            />
          </div>

          {/* Category */}
          <Select
            value={filters.category}
            onValueChange={(value) => onFilterChange({ category: value })}
          >
            <SelectTrigger className="w-full sm:w-[200px] h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Button
            variant="outline"
            onClick={handleSortChange}
            className="gap-2 h-11 w-full sm:w-auto"
          >
            {filters.sortBy === "rating-high" ||
            filters.sortBy === "price-high" ||
            filters.sortBy === "popular" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{getSortLabel()}</span>
            <span className="sm:hidden">Sort</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
