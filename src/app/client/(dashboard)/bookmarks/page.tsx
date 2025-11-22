"use client";

import React, { useState } from "react";
import { BookmarksGrid } from "@/features/bookmarks/components";
import { mockClientBookmarksData } from "@/features/bookmarks/schema";

export default function ClientBookmarksPage() {
  // State for bookmarks data
  const [bookmarksData, setBookmarksData] = useState(mockClientBookmarksData);

  // Handle removing a bookmark
  const handleRemoveBookmark = (id: string) => {
    setBookmarksData((prev) => {
      const updatedBookmarks = prev.bookmarks.filter(
        (bookmark) => bookmark.id !== id
      );

      // Recalculate category counts
      const updatedCategories = prev.categories.map((category) => {
        const count = updatedBookmarks.filter((bookmark) => {
          if (category.name === "Freelancers" && bookmark.type === "freelancer")
            return true;
          if (category.name === "Services" && bookmark.type === "service")
            return true;
          return false;
        }).length;

        return { ...category, count };
      });

      return {
        ...prev,
        bookmarks: updatedBookmarks,
        categories: updatedCategories,
        totalCount: updatedBookmarks.length,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  return (
    <div className="space-y-6">
      <BookmarksGrid
        bookmarksData={bookmarksData}
        onRemoveBookmark={handleRemoveBookmark}
        userRole="client"
      />
    </div>
  );
}
