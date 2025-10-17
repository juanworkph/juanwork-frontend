"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  FilterSidebar,
  FindWorkHeader,
  ProjectList,
} from "@/features/findwork/components";
import {
  mockFindWorkData,
  FindWorkState,
  FindWorkFilters,
} from "@/features/findwork/schema";

export default function FindWorkPage() {
  const [findWorkData, setFindWorkData] =
    useState<FindWorkState>(mockFindWorkData);
  const [isLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...findWorkData.projects];

    // Filter by search
    if (findWorkData.filters.search.trim()) {
      const query = findWorkData.filters.search.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          project.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (findWorkData.filters.category !== "All Categories") {
      result = result.filter(
        (project) => project.category === findWorkData.filters.category
      );
    }

    // Filter by budget range
    result = result.filter((project) => {
      if (project.budget.type === "fixed") {
        const budgetMax = project.budget.max || 0;
        return (
          budgetMax >= findWorkData.filters.budgetRange.min &&
          budgetMax <= findWorkData.filters.budgetRange.max
        );
      } else {
        const hourlyRate = project.budget.hourlyRate || 0;
        return (
          hourlyRate >= findWorkData.filters.budgetRange.min / 100 &&
          hourlyRate <= findWorkData.filters.budgetRange.max / 100
        );
      }
    });

    // Filter by project type
    if (findWorkData.filters.projectType !== "all") {
      result = result.filter(
        (project) => project.budget.type === findWorkData.filters.projectType
      );
    }

    // Filter by skills
    if (findWorkData.filters.skills.length > 0) {
      result = result.filter((project) =>
        findWorkData.filters.skills.some((skill) =>
          project.skills.includes(skill)
        )
      );
    }

    // Filter by experience level
    if (findWorkData.filters.experienceLevel !== "all") {
      result = result.filter(
        (project) =>
          project.experienceLevel === findWorkData.filters.experienceLevel
      );
    }

    // Filter by duration
    if (findWorkData.filters.duration !== "all") {
      result = result.filter(
        (project) => project.duration === findWorkData.filters.duration
      );
    }

    // Sort projects
    result.sort((a, b) => {
      switch (findWorkData.filters.sortBy) {
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
  }, [findWorkData.projects, findWorkData.filters]);

  const handleFilterChange = (filters: Partial<FindWorkFilters>) => {
    setFindWorkData({
      ...findWorkData,
      filters: {
        ...findWorkData.filters,
        ...filters,
      },
    });
  };

  const handleClearFilters = () => {
    setFindWorkData({
      ...findWorkData,
      filters: {
        ...findWorkData.filters,
        budgetRange: { min: 0, max: 10000 },
        projectType: "all",
        skills: [],
        experienceLevel: "all",
        duration: "all",
        location: "",
      },
    });
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 lg:z-0 transform transition-transform duration-300 lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <FilterSidebar
          filters={findWorkData.filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalProjects={filteredProjects.length}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <FindWorkHeader
          filters={findWorkData.filters}
          onFilterChange={handleFilterChange}
        />

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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

        {/* Projects List */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <ProjectList
              projects={filteredProjects}
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
