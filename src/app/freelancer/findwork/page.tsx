"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  FilterSidebar,
  FindWorkHeader,
  ProjectList,
} from "@/features/findwork/components";
import { FindWorkFilters, Project, Category } from "@/features/findwork/schema";
import {
  getProjects,
  getCategories,
} from "@/features/findwork/actions/findwork";

const DEFAULT_FILTERS: FindWorkFilters = {
  search: "",
  category: "All Categories",
  budgetRange: { min: 0, max: 10000 },
  projectType: "all",
  skills: [],
  experienceLevel: "all",
  deliveryDays: 180,
  location: "",
  sortBy: "newest",
};

export default function FindWorkPage() {
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FindWorkFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Categories are optional, so we don't block the page
      }
    };

    fetchCategoriesData();
  }, []);

  // Fetch projects
  const fetchProjectsData = useCallback(
    async (pageNum: number, isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
          setError(null);
        }

        // Prepare query parameters
        const categoryId =
          filters.category !== "All Categories"
            ? categories.find((c) => c.name === filters.category)?.id
            : undefined;

        const response = await getProjects({
          status: "draft",
          categoryId,
          page: pageNum,
          limit: 20,
        });

        if (isLoadMore) {
          setProjects((prev) => [...prev, ...response.projects]);
        } else {
          setProjects(response.projects);
        }

        setHasMore(response.pagination.page < response.pagination.totalPages);
        setPage(pageNum);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch projects";
        setError(errorMessage);
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters.category, categories]
  );

  // Fetch projects on mount and when category filter changes
  useEffect(() => {
    if (categories.length > 0 || filters.category === "All Categories") {
      fetchProjectsData(1, false);
    }
  }, [filters.category, categories.length, fetchProjectsData]);

  // Filter and sort projects client-side
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by search (debounced)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          project.category.toLowerCase().includes(query)
      );
    }

    // Filter by budget range
    result = result.filter((project) => {
      if (project.budget.type === "fixed") {
        const budgetMax = project.budget.max || 0;
        return (
          budgetMax >= filters.budgetRange.min &&
          budgetMax <= filters.budgetRange.max
        );
      } else {
        const hourlyRate = project.budget.hourlyRate || 0;
        return (
          hourlyRate >= filters.budgetRange.min / 100 &&
          hourlyRate <= filters.budgetRange.max / 100
        );
      }
    });

    // Filter by project type
    if (filters.projectType !== "all") {
      result = result.filter(
        (project) => project.budget.type === filters.projectType
      );
    }

    // Filter by skills (OR logic)
    if (filters.skills.length > 0) {
      result = result.filter((project) =>
        filters.skills.some((skill) => project.skills.includes(skill))
      );
    }

    // Filter by experience level
    if (filters.experienceLevel !== "all") {
      result = result.filter(
        (project) => project.experienceLevel === filters.experienceLevel
      );
    }

    // Filter by delivery days
    if (filters.deliveryDays < 180) {
      // Only filter if not at max (assuming 180 is max/any)
      result = result.filter(
        (project) => project.deliveryDays <= filters.deliveryDays
      );
    }

    // Sort projects
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        case "budget-high": {
          const budgetA =
            a.budget.type === "fixed"
              ? a.budget.max || 0
              : (a.budget.hourlyRate || 0) * 100;
          const budgetB =
            b.budget.type === "fixed"
              ? b.budget.max || 0
              : (b.budget.hourlyRate || 0) * 100;
          return budgetB - budgetA;
        }
        case "budget-low": {
          const budgetA =
            a.budget.type === "fixed"
              ? a.budget.min || 0
              : (a.budget.hourlyRate || 0) * 100;
          const budgetB =
            b.budget.type === "fixed"
              ? b.budget.min || 0
              : (b.budget.hourlyRate || 0) * 100;
          return budgetA - budgetB;
        }
        case "proposals":
          return a.proposalsCount - b.proposalsCount;
        default:
          return 0;
      }
    });

    return result;
  }, [projects, debouncedSearch, filters]);

  const handleFilterChange = (newFilters: Partial<FindWorkFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));

    // Reset pagination when category changes (triggers new API call)
    if (newFilters.category !== undefined) {
      setPage(1);
      setHasMore(true);
    }
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      fetchProjectsData(page + 1, true);
    }
  };

  const handleRetry = () => {
    fetchProjectsData(1, false);
  };

  return (
    <div className="flex h-full">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Scrollable */}
      <div
        className={`fixed lg:static left-0 h-full z-40 lg:z-0 transform transition-transform duration-300 lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalProjects={filteredProjects.length}
          categories={categories}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <FindWorkHeader
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full gap-2"
          >
            {isSidebarOpen ? (
              <>
                <X className="h-4 w-4" />
                Close Filters
              </>
            ) : (
              <>
                <Menu className="h-4 w-4" />
                Show Filters ({filteredProjects.length} projects)
              </>
            )}
          </Button>
        </div>

        {/* Projects List - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <ProjectList
              projects={filteredProjects}
              isLoading={isLoading}
              hasMore={hasMore}
              loadingMore={isLoadingMore}
              error={error}
              onLoadMore={handleLoadMore}
              onRetry={handleRetry}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
