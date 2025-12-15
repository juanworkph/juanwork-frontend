// Bookmark data model
export interface Bookmark {
  id: string;
  userId: string;
  serviceId: string;
  createdAt: string;
}

// Helper function to check if a service is bookmarked
export const isServiceBookmarked = (
  serviceId: string,
  userId: string
): boolean => {
  return mockBookmarksData.some(
    (bookmark) =>
      bookmark.serviceId === serviceId && bookmark.userId === userId
  );
};

// Helper function to get all bookmarks for a user
export const getUserBookmarks = (userId: string): Bookmark[] => {
  return mockBookmarksData.filter((bookmark) => bookmark.userId === userId);
};

// Helper function to add a bookmark
export const addBookmark = (
  serviceId: string,
  userId: string
): Bookmark => {
  const newBookmark: Bookmark = {
    id: `bm${Date.now()}`,
    userId,
    serviceId,
    createdAt: new Date().toISOString(),
  };
  mockBookmarksData.push(newBookmark);
  return newBookmark;
};

// Helper function to remove a bookmark
export const removeBookmark = (
  serviceId: string,
  userId: string
): boolean => {
  const index = mockBookmarksData.findIndex(
    (bookmark) =>
      bookmark.serviceId === serviceId && bookmark.userId === userId
  );
  if (index !== -1) {
    mockBookmarksData.splice(index, 1);
    return true;
  }
  return false;
};

// Mock bookmarks data (simulating a logged-in user with ID "user1")
export const mockBookmarksData: Bookmark[] = [
  {
    id: "bm1",
    userId: "user1",
    serviceId: "s1",
    createdAt: "2024-10-15T10:30:00Z",
  },
  {
    id: "bm2",
    userId: "user1",
    serviceId: "s3",
    createdAt: "2024-10-20T14:20:00Z",
  },
  {
    id: "bm3",
    userId: "user1",
    serviceId: "s7",
    createdAt: "2024-10-25T09:15:00Z",
  },
  {
    id: "bm4",
    userId: "user2",
    serviceId: "s2",
    createdAt: "2024-10-18T11:45:00Z",
  },
  {
    id: "bm5",
    userId: "user2",
    serviceId: "s5",
    createdAt: "2024-10-22T16:30:00Z",
  },
];

// Current logged-in user ID (for demo purposes)
export const CURRENT_USER_ID = "user1";
