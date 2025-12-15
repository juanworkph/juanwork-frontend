"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  FreelancerFilterSidebar,
  DiscoverFreelancersHeader,
  FreelancerList,
} from "@/features/users/components";
import {
  mockDiscoverFreelancersData,
  DiscoverFreelancersState,
  DiscoverFreelancersFilters,
} from "@/features/users/schema";

export default function DiscoverFreelancersPage() {
  const [freelancersData, setFreelancersData] =
    useState<DiscoverFreelancersState>(mockDiscoverFreelancersData);
  const [isLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and sort freelancers
  const filteredFreelancers = useMemo(() => {
    let result = [...freelancersData.freelancers];

    // Filter by search
    if (freelancersData.filters.search.trim()) {
      const query = freelancersData.filters.search.toLowerCase();
      result = result.filter(
        (freelancer) =>
          freelancer.name.toLowerCase().includes(query) ||
          freelancer.title.toLowerCase().includes(query) ||
          freelancer.bio.toLowerCase().includes(query) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(query)
          ) ||
          freelancer.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (freelancersData.filters.category !== "All Categories") {
      result = result.filter(
        (freelancer) => freelancer.category === freelancersData.filters.category
      );
    }

    // Filter by hourly rate range
    result = result.filter((freelancer) => {
      const rateMin = freelancer.hourlyRate.min;
      const rateMax = freelancer.hourlyRate.max;
      return (
        rateMax >= freelancersData.filters.hourlyRateRange.min &&
        rateMin <= freelancersData.filters.hourlyRateRange.max
      );
    });

    // Filter by skills
    if (freelancersData.filters.skills.length > 0) {
      result = result.filter((freelancer) =>
        freelancersData.filters.skills.some((skill) =>
          freelancer.skills.includes(skill)
        )
      );
    }

    // Filter by experience level
    if (freelancersData.filters.experienceLevel !== "all") {
      result = result.filter(
        (freelancer) =>
          freelancer.experienceLevel === freelancersData.filters.experienceLevel
      );
    }

    // Filter by availability
    if (freelancersData.filters.availability !== "all") {
      result = result.filter(
        (freelancer) =>
          freelancer.availability === freelancersData.filters.availability
      );
    }

    // Filter by languages
    if (freelancersData.filters.languages.length > 0) {
      result = result.filter((freelancer) =>
        freelancersData.filters.languages.some((lang) =>
          freelancer.languages.includes(lang)
        )
      );
    }

    // Filter by minimum rating
    if (freelancersData.filters.minRating > 0) {
      result = result.filter(
        (freelancer) => freelancer.rating >= freelancersData.filters.minRating
      );
    }

    // Sort freelancers
    result.sort((a, b) => {
      switch (freelancersData.filters.sortBy) {
        case "relevance":
          // Sort by rating and success rate combined
          const scoreA = a.rating * 0.6 + (a.successRate / 100) * 0.4;
          const scoreB = b.rating * 0.6 + (b.successRate / 100) * 0.4;
          return scoreB - scoreA;
        case "rating-high":
          return b.rating - a.rating;
        case "rate-low":
          return a.hourlyRate.min - b.hourlyRate.min;
        case "rate-high":
          return b.hourlyRate.max - a.hourlyRate.max;
        case "experience":
          return b.completedJobs - a.completedJobs;
        default:
          return 0;
      }
    });

    return result;
  }, [freelancersData.freelancers, freelancersData.filters]);

  const handleFilterChange = (filters: Partial<DiscoverFreelancersFilters>) => {
    setFreelancersData({
      ...freelancersData,
      filters: {
        ...freelancersData.filters,
        ...filters,
      },
    });
  };

  const handleClearFilters = () => {
    setFreelancersData({
      ...freelancersData,
      filters: {
        ...freelancersData.filters,
        hourlyRateRange: { min: 0, max: 200 },
        availability: "all",
        skills: [],
        experienceLevel: "all",
        location: "",
        languages: [],
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
        <FreelancerFilterSidebar
          filters={freelancersData.filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalFreelancers={filteredFreelancers.length}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <DiscoverFreelancersHeader
            filters={freelancersData.filters}
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
                Show Filters ({filteredFreelancers.length} freelancers)
              </>
            )}
          </Button>
        </div>

        {/* Freelancers List - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <FreelancerList
              freelancers={filteredFreelancers}
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
