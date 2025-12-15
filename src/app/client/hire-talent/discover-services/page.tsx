"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  ServiceFilterSidebar,
  DiscoverServicesHeader,
  ServiceDiscoveryList,
} from "@/features/services/components";
import {
  mockDiscoverServicesData,
  DiscoverServicesState,
  DiscoverServicesFilters,
} from "@/features/services/schema";

export default function DiscoverServicesPage() {
  const [servicesData, setServicesData] = useState<DiscoverServicesState>(
    mockDiscoverServicesData
  );
  const [isLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let result = [...servicesData.services];

    // Filter by search
    if (servicesData.filters.search.trim()) {
      const query = servicesData.filters.search.toLowerCase();
      result = result.filter(
        (service) =>
          service.serviceName.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          service.category.toLowerCase().includes(query) ||
          service.provider.name.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (servicesData.filters.category !== "All Categories") {
      result = result.filter(
        (service) => service.category === servicesData.filters.category
      );
    }

    // Filter by price range
    result = result.filter((service) => {
      const price = service.pricing.starting;
      return (
        price >= servicesData.filters.priceRange.min &&
        price <= servicesData.filters.priceRange.max
      );
    });

    // Filter by skills
    if (servicesData.filters.skills.length > 0) {
      result = result.filter((service) =>
        servicesData.filters.skills.some((skill) =>
          service.skills.includes(skill)
        )
      );
    }

    // Filter by pricing type
    if (servicesData.filters.pricingType !== "all") {
      result = result.filter(
        (service) => service.pricing.type === servicesData.filters.pricingType
      );
    }

    // Filter by delivery time
    if (servicesData.filters.deliveryTime !== "all") {
      result = result.filter(
        (service) => service.deliveryTime === servicesData.filters.deliveryTime
      );
    }

    // Filter by provider level
    if (servicesData.filters.providerLevel !== "all") {
      result = result.filter(
        (service) =>
          service.provider.level === servicesData.filters.providerLevel
      );
    }

    // Filter by minimum rating
    if (servicesData.filters.minRating > 0) {
      result = result.filter(
        (service) => service.rating >= servicesData.filters.minRating
      );
    }

    // Sort services
    result.sort((a, b) => {
      switch (servicesData.filters.sortBy) {
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
  }, [servicesData.services, servicesData.filters]);

  const handleFilterChange = (filters: Partial<DiscoverServicesFilters>) => {
    setServicesData({
      ...servicesData,
      filters: {
        ...servicesData.filters,
        ...filters,
      },
    });
  };

  const handleClearFilters = () => {
    setServicesData({
      ...servicesData,
      filters: {
        ...servicesData.filters,
        priceRange: { min: 0, max: 10000 },
        pricingType: "all",
        skills: [],
        deliveryTime: "all",
        providerLevel: "all",
        minRating: 0,
      },
    });
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
        <ServiceFilterSidebar
          filters={servicesData.filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalServices={filteredServices.length}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <DiscoverServicesHeader
            filters={servicesData.filters}
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
                Show Filters ({filteredServices.length} services)
              </>
            )}
          </Button>
        </div>

        {/* Services List - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <ServiceDiscoveryList
              services={filteredServices}
              isLoading={isLoading}
              hasMore={false}
              loadingMore={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
