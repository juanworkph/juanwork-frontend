import React, { useState, useMemo } from "react";
import { BookmarkCard } from "./bookmark-card";
import { CategoryFilter } from "./category-filter";
import { BookmarksHeader } from "./bookmarks-header";
import { BookmarksState } from "../schema/bookmarks-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BookmarksGridProps {
  bookmarksData: BookmarksState;
  onRemoveBookmark: (id: string) => void;
}

export function BookmarksGrid({
  bookmarksData,
  onRemoveBookmark,
}: BookmarksGridProps) {
  // State for UI controls
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    bookmarksData.settings.defaultView
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date_added" | "name" | "type">(
    bookmarksData.settings.sortBy
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    bookmarksData.settings.sortDirection
  );

  // Filter and sort bookmarks
  const filteredBookmarks = useMemo(() => {
    let result = [...bookmarksData.bookmarks];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((bookmark) => {
        if (selectedCategory === "Projects" && bookmark.type === "project")
          return true;
        if (selectedCategory === "Clients" && bookmark.type === "client")
          return true;
        if (selectedCategory === "Jobs" && bookmark.type === "job") return true;
        if (selectedCategory === "Articles" && bookmark.type === "article")
          return true;
        if (selectedCategory === "Resources" && bookmark.type === "resource")
          return true;
        if (
          selectedCategory === "Freelancers" &&
          bookmark.type === "freelancer"
        )
          return true;
        if (selectedCategory === "Services" && bookmark.type === "service")
          return true;
        return false;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((bookmark) => {
        // Search in title/name
        const title =
          bookmark.type === "client" || bookmark.type === "freelancer"
            ? bookmark.name.toLowerCase()
            : bookmark.title.toLowerCase();

        if (title.includes(query)) return true;

        // Search in description/summary/bio
        let description = "";
        if (bookmark.type === "article") {
          description = bookmark.summary.toLowerCase();
        } else if (bookmark.type === "freelancer") {
          description = bookmark.bio.toLowerCase();
        } else if ("description" in bookmark) {
          description = bookmark.description?.toLowerCase() || "";
        }

        if (description.includes(query)) return true;

        // Search in skills/tags
        if (
          "skills" in bookmark &&
          bookmark.skills.some((skill) => skill.toLowerCase().includes(query))
        ) {
          return true;
        }

        if (
          "tags" in bookmark &&
          bookmark.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          return true;
        }

        return false;
      });
    }

    // Sort bookmarks
    result.sort((a, b) => {
      if (sortBy === "date_added") {
        const dateA = new Date(a.bookmarkedAt).getTime();
        const dateB = new Date(b.bookmarkedAt).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (sortBy === "name") {
        const nameA =
          a.type === "client" || a.type === "freelancer" ? a.name : a.title;
        const nameB =
          b.type === "client" || b.type === "freelancer" ? b.name : b.title;
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      if (sortBy === "type") {
        return sortDirection === "asc"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      }

      return 0;
    });

    return result;
  }, [
    bookmarksData.bookmarks,
    selectedCategory,
    searchQuery,
    sortBy,
    sortDirection,
  ]);

  // Handle sort change
  const handleSortChange = (sort: {
    by: "date_added" | "name" | "type";
    direction: "asc" | "desc";
  }) => {
    if (sort.by === sortBy) {
      setSortDirection(sort.direction);
    } else {
      setSortBy(sort.by);
      setSortDirection(sort.direction);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <BookmarksHeader
        totalCount={bookmarksData.totalCount}
        lastUpdated={bookmarksData.lastUpdated}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with Categories */}
        <div className="lg:col-span-1">
          <CategoryFilter
            categories={bookmarksData.categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Bookmarks Grid/List */}
        <div className="lg:col-span-3">
          {filteredBookmarks.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  viewMode={viewMode}
                  onRemove={onRemoveBookmark}
                />
              ))}
            </div>
          ) : (
            <Alert
              variant="default"
              className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
            >
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-300">
                No bookmarks found. Try adjusting your filters or search query.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
