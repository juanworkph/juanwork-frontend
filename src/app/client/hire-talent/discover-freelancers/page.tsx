"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import {
  FreelancerFilterSidebar,
  DiscoverFreelancersHeader,
  FreelancerList,
} from "@/features/users/components";
import {
  Freelancer,
  Category,
  DiscoverFreelancersFilters,
  DEFAULT_FILTERS,
} from "@/features/users/schema";
import {
  fetchFreelancers,
  fetchCategories,
  fetchSkillsByCategory,
} from "@/features/users/actions/discover-freelancers";
import {
  filterBySearch,
  filterByCategory,
  filterByHourlyRate,
  filterBySkills,
  filterByExperienceLevel,
  filterByAvailability,
  filterByLanguages,
  filterByMinRating,
  filterByLocation,
  applySorting,
} from "@/features/users/utils/filters";

export default function DiscoverFreelancersPage() {
  // State management
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [filters, setFilters] = useState<DiscoverFreelancersFilters>(DEFAULT_FILTERS);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Requirement 4.6, 21.1: Debounce search input by 300ms
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  // Fetch categories on mount
  // Requirement 3.1: Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // Don't set error state for categories - continue with empty array
      }
    };

    loadCategories();
  }, []);

  // Fetch initial freelancers on mount
  // Requirements 2.1, 2.2, 2.3, 13.1: Fetch freelancers with role='freelancer', status='active'
  useEffect(() => {
    const loadInitialFreelancers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching freelancers...');
        const { freelancers: fetchedFreelancers, pagination } = await fetchFreelancers({
          role: 'freelancer',
          page: 1,
          limit: 20,
        });

        console.log('Fetched freelancers:', fetchedFreelancers);
        console.log('Pagination:', pagination);

        setFreelancers(fetchedFreelancers);
        setPage(1);
        setHasMore(pagination.page < pagination.totalPages);
      } catch (err) {
        console.error('Error fetching freelancers:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch freelancers';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialFreelancers();
  }, []);

  // Fetch skills when category changes
  // Requirement 6.3: Fetch skills for selected category
  useEffect(() => {
    const loadSkills = async () => {
      setIsLoadingSkills(true);

      try {
        const categoryId = filters.category === 'all' ? undefined : filters.category;
        const skills = await fetchSkillsByCategory(categoryId);
        setAvailableSkills(skills);

        // Requirement 6.9: Clear incompatible skills when category changes
        if (categoryId && filters.skills.length > 0) {
          const compatibleSkills = filters.skills.filter(skill => skills.includes(skill));
          if (compatibleSkills.length !== filters.skills.length) {
            setFilters(prev => ({
              ...prev,
              skills: compatibleSkills,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setAvailableSkills([]);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    loadSkills();
  }, [filters.category, filters.skills]);

  // Filter freelancers client-side
  // Requirement 21.2: Memoize filtering logic with specific dependencies
  const filteredFreelancers = useMemo(() => {
    let result = [...freelancers];

    // Apply filters in sequence
    // Requirement 4.6, 21.1: Use debounced search value
    result = filterBySearch(result, debouncedSearch);
    result = filterByCategory(result, filters.category);
    result = filterByHourlyRate(result, filters.hourlyRateRange.min, filters.hourlyRateRange.max);
    result = filterBySkills(result, filters.skills);
    result = filterByExperienceLevel(result, filters.experienceLevel);
    result = filterByAvailability(result, filters.availability);
    result = filterByLanguages(result, filters.languages);
    result = filterByMinRating(result, filters.minRating);
    result = filterByLocation(result, filters.location);

    return result;
  }, [
    freelancers,
    debouncedSearch,
    filters.category,
    filters.hourlyRateRange,
    filters.skills,
    filters.experienceLevel,
    filters.availability,
    filters.languages,
    filters.minRating,
    filters.location,
  ]);

  // Sort filtered freelancers
  // Requirement 21.2: Memoize sorting logic separately from filtering
  const sortedFreelancers = useMemo(() => {
    return applySorting([...filteredFreelancers], filters.sortBy);
  }, [filteredFreelancers, filters.sortBy]);

  // Handle filter changes
  // Requirement 3.6, 13.5: Reset pagination when filters change
  const handleFilterChange = useCallback((newFilters: Partial<DiscoverFreelancersFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Handle category change (triggers skills fetch via useEffect)
  // Requirement 3.4: Filter by category
  const handleCategoryChange = useCallback((categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId,
    }));
  }, []);

  // Handle clear filters
  // Requirement 17.1-17.12: Reset all filters to defaults
  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Handle load more (pagination)
  // Requirement 13.2: Fetch next page when scrolling to bottom
  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const { freelancers: newFreelancers, pagination } = await fetchFreelancers({
        role: 'freelancer',
        page: nextPage,
        limit: 20,
      });

      setFreelancers(prev => [...prev, ...newFreelancers]);
      setPage(nextPage);
      setHasMore(pagination.page < pagination.totalPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more freelancers';
      setError(errorMessage);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, hasMore, isLoadingMore]);

  // Handle retry after error
  // Requirement 16.6: Provide retry button for errors
  const handleRetry = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { freelancers: fetchedFreelancers, pagination } = await fetchFreelancers({
        role: 'freelancer',
        page: 1,
        limit: 20,
      });

      setFreelancers(fetchedFreelancers);
      setPage(1);
      setHasMore(pagination.page < pagination.totalPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch freelancers';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      {/* Requirements 10.4: Wire filter sidebar to page state */}
      <FreelancerFilterSidebar
        filters={filters}
        categories={categories}
        availableSkills={availableSkills}
        isLoadingSkills={isLoadingSkills}
        onFilterChange={handleFilterChange}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        totalFreelancers={sortedFreelancers.length}
        isLoading={isLoading}
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        {/* Requirements 10.5: Wire header to page state */}
        <div className="flex-shrink-0">
          <DiscoverFreelancersHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            totalResults={sortedFreelancers.length}
          />
        </div>

        {/* Mobile Filter Toggle */}
        {/* Requirements 10.8: Implement responsive mobile sidebar toggle */}
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
                Show Filters ({sortedFreelancers.length} freelancers)
              </>
            )}
          </Button>
        </div>

        {/* Freelancers List - Scrollable */}
        {/* Requirements 10.6: Wire freelancer list to page state */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <FreelancerList
              freelancers={sortedFreelancers}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
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
