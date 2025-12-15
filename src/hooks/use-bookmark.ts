"use client"

import * as React from "react"
import { toast } from "sonner"

const BOOKMARKS_STORAGE_KEY = "juanwork_bookmarks"

export interface UseBookmarkReturn {
  isBookmarked: boolean
  toggleBookmark: () => Promise<void>
  isLoading: boolean
  error: Error | null
}

/**
 * Custom hook for managing project bookmarks
 * Persists bookmarks in localStorage and provides toast notifications
 * 
 * @param projectId - The unique identifier of the project to bookmark
 * @returns Object containing bookmark state and toggle function
 */
export const useBookmark = (projectId: string): UseBookmarkReturn => {
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<Error | null>(null)

  // Load bookmark state from localStorage on mount
  React.useEffect(() => {
    try {
      const bookmarks = getBookmarksFromStorage()
      setIsBookmarked(bookmarks.includes(projectId))
    } catch (err) {
      console.error("Failed to load bookmarks:", err)
      setError(err as Error)
    }
  }, [projectId])

  const toggleBookmark = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const bookmarks = getBookmarksFromStorage()
      let newBookmarks: string[]

      if (isBookmarked) {
        // Remove bookmark
        newBookmarks = bookmarks.filter((id) => id !== projectId)
        saveBookmarksToStorage(newBookmarks)
        setIsBookmarked(false)
        toast.success("Project removed from bookmarks")
      } else {
        // Add bookmark
        newBookmarks = [...bookmarks, projectId]
        saveBookmarksToStorage(newBookmarks)
        setIsBookmarked(true)
        toast.success("Project bookmarked")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(err as Error)
      toast.error(`Failed to update bookmark: ${errorMessage}`)
      console.error("Bookmark toggle error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [projectId, isBookmarked])

  return {
    isBookmarked,
    toggleBookmark,
    isLoading,
    error,
  }
}

/**
 * Retrieves bookmarks from localStorage
 * @returns Array of project IDs that are bookmarked
 */
const getBookmarksFromStorage = (): string[] => {
  try {
    if (typeof window === "undefined") {
      return []
    }

    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error("Failed to parse bookmarks from localStorage:", err)
    return []
  }
}

/**
 * Saves bookmarks to localStorage
 * @param bookmarks - Array of project IDs to save
 */
const saveBookmarksToStorage = (bookmarks: string[]): void => {
  try {
    if (typeof window === "undefined") {
      return
    }

    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks))
  } catch (err) {
    console.error("Failed to save bookmarks to localStorage:", err)
    throw new Error("Failed to save bookmarks")
  }
}
