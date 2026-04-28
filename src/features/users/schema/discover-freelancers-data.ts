/**
 * Discover Freelancers Data Models
 * 
 * This file contains TypeScript interfaces for the Discover Freelancers feature,
 * including frontend models, backend API models, and transformation types.
 */

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type FreelancerExperienceLevel = 'beginner' | 'intermediate' | 'expert';
export type FreelancerAvailability = 'available-now' | 'available-1-week' | 'available-2-weeks' | 'not-available';
export type SortOption = 'relevance' | 'rating-high' | 'rate-low' | 'rate-high' | 'experience';

// ============================================================================
// FRONTEND MODELS
// ============================================================================

/**
 * Freelancer model (frontend)
 * This is the structure used throughout the frontend application
 */
export interface Freelancer {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  skills: string[];
  hourlyRate: {
    min: number;
    max: number;
    currency: string;
  };
  experienceLevel: FreelancerExperienceLevel;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  successRate: number; // Percentage (0-100)
  availability: FreelancerAvailability;
  location: string;
  languages: string[];
  isTopRated: boolean;
  isVerified: boolean;
  profileUrl: string;
}

/**
 * Category model
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  freelancerCount?: number;
}

/**
 * Skill model
 */
export interface Skill {
  id: string;
  name: string;
  categoryId?: string;
}

/**
 * Filter state for Discover Freelancers
 */
export interface DiscoverFreelancersFilters {
  search: string;
  category: string; // Category ID or "all"
  hourlyRateRange: {
    min: number;
    max: number;
  };
  skills: string[];
  experienceLevel: FreelancerExperienceLevel | 'all';
  availability: FreelancerAvailability | 'all';
  languages: string[];
  minRating: 0 | 4 | 4.5 | 5;
  location: string;
  sortBy: SortOption;
}

/**
 * Default filter values
 */
export const DEFAULT_FILTERS: DiscoverFreelancersFilters = {
  search: '',
  category: 'all',
  hourlyRateRange: {
    min: 0,
    max: 200,
  },
  skills: [],
  experienceLevel: 'all',
  availability: 'all',
  languages: [],
  minRating: 0,
  location: '',
  sortBy: 'relevance',
};

// ============================================================================
// API REQUEST/RESPONSE MODELS
// ============================================================================

/**
 * Query parameters for fetching freelancers
 */
export interface FreelancerQueryParams {
  role?: 'freelancer';
  status?: 'active';
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minRate?: number;
  maxRate?: number;
  skills?: string[];
  experienceLevel?: FreelancerExperienceLevel;
  availability?: FreelancerAvailability;
  minRating?: number;
  location?: string;
  languages?: string[];
  sortBy?: SortOption;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * API response for freelancers list
 * Backend returns data as array directly with pagination at root level
 */
export interface FreelancersResponse {
  success: boolean;
  data: APIFreelancer[] | { users: APIFreelancer[]; pagination: PaginationMeta };
  pagination?: PaginationMeta;
  message?: string;
}

/**
 * API response for categories list
 */
export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: APICategory[];
  };
  message?: string;
}

/**
 * API response for skills list
 */
export interface SkillsResponse {
  success: boolean;
  data: {
    skills: APISkill[];
  };
  message?: string;
}

// ============================================================================
// BACKEND API MODELS
// ============================================================================

/**
 * Freelancer model from backend API
 * This matches the structure returned by the backend
 */
export interface APIFreelancer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'freelancer';
  emailVerified: boolean;
  provider: string;
  company?: string;
  phoneNumber?: string;
  timeZone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  title?: string;
  hourlyRate?: string; // Numeric string from database
  bio?: string;
  languages?: string; // JSON string
  skills?: string; // JSON string
  socialLinks?: string; // JSON string
  createdAt: string;
  updatedAt: string;
  // Additional fields that might be joined or computed
  avatar?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  rating?: number;
  reviewCount?: number;
  completedJobs?: number;
  successRate?: number;
  availability?: string;
  isTopRated?: boolean;
  isVerified?: boolean;
}

/**
 * Category model from backend API
 */
export interface APICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  freelancerCount?: number;
}

/**
 * Skill model from backend API
 */
export interface APISkill {
  id: string;
  name: string;
  categoryId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * State for the Discover Freelancers page
 */
export interface DiscoverFreelancersState {
  freelancers: Freelancer[];
  categories: Category[];
  availableSkills: string[];
  filters: DiscoverFreelancersFilters;
  isLoading: boolean;
  isLoadingMore: boolean;
  isLoadingSkills: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  totalFreelancers: number;
  isSidebarOpen: boolean; // Mobile only
}

/**
 * Error response from API
 */
export interface APIError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format currency amount
 */
export const formatFreelancerCurrency = (
  amount: number,
  currency: string = "PHP"
): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get experience level label
 */
export const getFreelancerExperienceLevelLabel = (
  level: FreelancerExperienceLevel
): string => {
  switch (level) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "expert":
      return "Expert";
    default:
      return level;
  }
};

/**
 * Get availability label
 */
export const getFreelancerAvailabilityLabel = (
  status: FreelancerAvailability
): string => {
  switch (status) {
    case "available-now":
      return "Available Now";
    case "available-1-week":
      return "Available in 1 Week";
    case "available-2-weeks":
      return "Available in 2 Weeks";
    case "not-available":
      return "Not Available";
    default:
      return status;
  }
};

/**
 * Get availability color classes
 */
export const getFreelancerAvailabilityColor = (
  status: FreelancerAvailability
): string => {
  switch (status) {
    case "available-now":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "available-1-week":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "available-2-weeks":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "not-available":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};
