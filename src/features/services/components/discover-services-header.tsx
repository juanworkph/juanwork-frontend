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
        {/* Top Row - Logo and User Menu */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/client" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F45A0B] to-orange-600 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                JuanWork
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Discover Services
              </p>
            </div>
          </Link>

          {/* Right Side - Notifications and User Menu */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&crop=face"
                      alt="User"
                    />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Tech Company
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Client
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
