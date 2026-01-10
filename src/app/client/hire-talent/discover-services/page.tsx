"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  ServiceFilterSidebar,
  DiscoverServicesHeader,
  ServiceDiscoveryList,
  LoadingOverlay,
} from "@/features/services/components";
import {
  Service,
  Category,
  DiscoverServicesFilters,
  defaultFilters,
} from "@/features/services/schema";
import {
  fetchServices,
  fetchCategories,
  DiscoverServicesError,
} from "@/features/services/actions/discover-services";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export default function DiscoverServicesPage() {
  // State management
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<DiscoverServicesFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Debounce search input by 300ms to avoid excessive filtering
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch categories and initial services in parallel
        const [categoriesData, servicesData] = await Promise.all([
          fetchCategories(),
          fetchServices({ page: 1, limit: 20 }),
        ]);

        setCategories(categoriesData);
        setServices(servicesData.services);
        setPage(1);
        setHasMore(servicesData.pagination.page < servicesData.pagination.totalPages);
      } catch (err) {
        const errorMessage =
          err instanceof DiscoverServicesError
            ? err.message
            : "Failed to load services. Please try again.";
        setError(errorMessage);
        console.error("Error fetching initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch services when filters change (except search and sortBy which are client-side)
  useEffect(() => {
    const fetchFilteredServices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Build query params from filters
        const queryParams: any = {
          page: 1,
          limit: 20,
        };

        // Add category filter if not "all"
        if (filters.category !== "all") {
          queryParams.categoryId = filters.category;
        }

        const servicesData = await fetchServices(queryParams);

        setServices(servicesData.services);
        setPage(1);
        setHasMore(servicesData.pagination.page < servicesData.pagination.totalPages);
      } catch (err) {
        const errorMessage =
          err instanceof DiscoverServicesError
            ? err.message
            : "Failed to load services. Please try again.";
        setError(errorMessage);
        console.error("Error fetching filtered services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if not initial load (initial load is handled by first useEffect)
    if (categories.length > 0) {
      fetchFilteredServices();
    }
  }, [filters.category, categories.length]); // Re-fetch when category changes or categories are loaded

  // Client-side filtering - memoized to avoid re-computation
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Filter by search (client-side) - using debounced search value
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (service) =>
          service.serviceName.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Filter by price range (client-side)
    result = result.filter((service) => {
      const price = service.pricing.starting;
      return (
        price >= filters.priceRange.min &&
        price <= filters.priceRange.max
      );
    });

    // Filter by pricing type (client-side)
    if (filters.pricingType !== "all") {
      result = result.filter(
        (service) => service.pricing.type === filters.pricingType
      );
    }

    // Filter by skills (client-side, OR logic)
    if (filters.skills.length > 0) {
      result = result.filter((service) =>
        filters.skills.some((skill) =>
          service.skills.includes(skill)
        )
      );
    }

    // Filter by experience level (client-side)
    if (filters.experienceLevel !== "all") {
      result = result.filter(
        (service) => service.experienceLevel === filters.experienceLevel
      );
    }

    // Filter by delivery time (client-side)
    if (filters.deliveryTime !== "all") {
      result = result.filter((service) => {
        switch (filters.deliveryTime) {
          case "24-hours":
            return service.deliveryDays <= 1;
          case "3-days":
            return service.deliveryDays <= 3;
          case "7-days":
            return service.deliveryDays <= 7;
          case "anytime":
            return true;
          default:
            return true;
        }
      });
    }

    // Filter by provider level (client-side)
    if (filters.providerLevel !== "all") {
      result = result.filter(
        (service) => service.provider.level === filters.providerLevel
      );
    }

    return result;
  }, [
    services,
    debouncedSearch,
    filters.priceRange,
    filters.pricingType,
    filters.skills,
    filters.experienceLevel,
    filters.deliveryTime,
    filters.providerLevel,
  ]);

  // Client-side sorting - memoized separately to avoid re-filtering when only sort changes
  const sortedServices = useMemo(() => {
    const result = [...filteredServices];

    // Sort services (client-side)
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "relevance":
          // Sort by rating, total orders, and featured status
          const scoreA =
            a.rating * 0.4 +
            (a.totalOrders / 200) * 0.3 +
            (a.isFeatured ? 1 : 0) * 0.3;
          const scoreB =
            b.rating * 0.4 +
            (b.totalOrders / 200) * 0.3 +
            (b.isFeatured ? 1 : 0) * 0.3;
          return scoreB - scoreA;
        case "rating-high":
          // Sort by rating in descending order
          return b.rating - a.rating;
        case "price-low":
          return a.pricing.starting - b.pricing.starting;
        case "price-high":
          return b.pricing.starting - a.pricing.starting;
        case "popular":
          return b.totalOrders - a.totalOrders;
        default:
          return 0;
      }
    });

    return result;
  }, [filteredServices, filters.sortBy]);

  const handleFilterChange = (newFilters: Partial<DiscoverServicesFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Trigger re-fetch by updating a dependency
    setPage(1);
    window.location.reload();
  };

  // Handle loading more services (pagination)
  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      setError(null);

      const nextPage = page + 1;

      // Build query params from filters
      const queryParams: any = {
        page: nextPage,
        limit: 20,
      };

      // Add category filter if not "all"
      if (filters.category !== "all") {
        queryParams.categoryId = filters.category;
      }

      const servicesData = await fetchServices(queryParams);

      // Append new services to existing array with deduplication
      setServices((prev) => {
        const existingIds = new Set(prev.map(s => s.id));
        const newServices = servicesData.services.filter(s => !existingIds.has(s.id));
        return [...prev, ...newServices];
      });
      setPage(nextPage);
      setHasMore(servicesData.pagination.page < servicesData.pagination.totalPages);
    } catch (err) {
      const errorMessage =
        err instanceof DiscoverServicesError
          ? err.message
          : "Failed to load more services. Please try again.";
      setError(errorMessage);
      console.error("Error loading more services:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, page, filters.category]);

  // Scroll detection for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollableElement = document.querySelector('main');
      if (!scrollableElement) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // Trigger load more when user scrolls to 80% of the page
      if (scrollPercentage > 0.8 && hasMore && !isLoadingMore && !isLoading) {
        handleLoadMore();
      }
    };

    const scrollableElement = document.querySelector('main');
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
      return () => scrollableElement.removeEventListener('scroll', handleScroll);
    }
  }, [hasMore, isLoadingMore, isLoading, handleLoadMore]);

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
        <ServiceFilterSidebar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalServices={sortedServices.length}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <DiscoverServicesHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            totalResults={sortedServices.length}
            isLoading={isLoading}
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
                Show Filters ({sortedServices.length} services)
              </>
            )}
          </Button>
        </div>

        {/* Services List - Scrollable */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="p-6">
            {/* Loading Overlay for Filter Changes */}
            <LoadingOverlay isVisible={isLoading && services.length > 0} message="Applying filters..." />
            
            <ServiceDiscoveryList
              services={sortedServices}
              isLoading={isLoading}
              hasMore={hasMore}
              loadingMore={isLoadingMore}
              error={error}
              onRetry={handleRetry}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
