/**
 * Freelancer Filtering Utilities
 * 
 * This file contains pure functions for filtering freelancers based on various criteria.
 * All functions are client-side filters that operate on the Freelancer[] array.
 */

import {
  Freelancer,
  DiscoverFreelancersFilters,
  FreelancerExperienceLevel,
  FreelancerAvailability,
} from '../schema/discover-freelancers-data';

// ============================================================================
// INDIVIDUAL FILTER FUNCTIONS
// ============================================================================

/**
 * Filter freelancers by search query
 * Searches in: name, title, bio, and skills
 * Case-insensitive matching
 * 
 * @param freelancers - Array of freelancers to filter
 * @param search - Search query string
 * @returns Filtered array of freelancers
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */
export const filterBySearch = (
  freelancers: Freelancer[],
  search: string
): Freelancer[] => {
  // If search is empty, return all freelancers
  if (!search || search.trim() === '') {
    return freelancers;
  }

  const searchLower = search.toLowerCase().trim();

  return freelancers.filter((freelancer) => {
    // Check name
    if (freelancer.name.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Check title
    if (freelancer.title.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Check bio
    if (freelancer.bio.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Check skills (any skill matches)
    if (freelancer.skills.some(skill => 
      skill.toLowerCase().includes(searchLower)
    )) {
      return true;
    }

    return false;
  });
};

/**
 * Filter freelancers by category
 * 
 * @param freelancers - Array of freelancers to filter
 * @param categoryId - Category ID to filter by, or "all" for no filter
 * @returns Filtered array of freelancers
 * 
 * Requirements: 3.4, 3.5
 */
export const filterByCategory = (
  freelancers: Freelancer[],
  categoryId: string
): Freelancer[] => {
  // If category is "all", return all freelancers
  if (categoryId === 'all') {
    return freelancers;
  }

  return freelancers.filter((freelancer) => 
    freelancer.category.id === categoryId
  );
};

/**
 * Filter freelancers by hourly rate range
 * Includes freelancers whose rate range overlaps with the filter range
 * 
 * @param freelancers - Array of freelancers to filter
 * @param min - Minimum hourly rate
 * @param max - Maximum hourly rate
 * @returns Filtered array of freelancers
 * 
 * Requirements: 5.2, 5.3
 */
export const filterByHourlyRate = (
  freelancers: Freelancer[],
  min: number,
  max: number
): Freelancer[] => {
  return freelancers.filter((freelancer) => {
    // Check if freelancer's rate range overlaps with filter range
    // Overlap occurs if: freelancer.max >= filter.min AND freelancer.min <= filter.max
    return (
      freelancer.hourlyRate.max >= min &&
      freelancer.hourlyRate.min <= max
    );
  });
};

/**
 * Filter freelancers by skills (OR logic)
 * Includes freelancers that have ANY of the selected skills
 * 
 * @param freelancers - Array of freelancers to filter
 * @param skills - Array of skill names to filter by
 * @returns Filtered array of freelancers
 * 
 * Requirements: 6.5
 */
export const filterBySkills = (
  freelancers: Freelancer[],
  skills: string[]
): Freelancer[] => {
  // If skills array is empty, return all freelancers
  if (!skills || skills.length === 0) {
    return freelancers;
  }

  // Convert selected skills to lowercase for case-insensitive comparison
  const skillsLower = skills.map(skill => skill.toLowerCase());

  return freelancers.filter((freelancer) => {
    // Check if freelancer has ANY of the selected skills
    return freelancer.skills.some(freelancerSkill =>
      skillsLower.includes(freelancerSkill.toLowerCase())
    );
  });
};

/**
 * Filter freelancers by experience level
 * 
 * @param freelancers - Array of freelancers to filter
 * @param level - Experience level to filter by, or "all" for no filter
 * @returns Filtered array of freelancers
 * 
 * Requirements: 7.2
 */
export const filterByExperienceLevel = (
  freelancers: Freelancer[],
  level: FreelancerExperienceLevel | 'all'
): Freelancer[] => {
  // If level is "all", return all freelancers
  if (level === 'all') {
    return freelancers;
  }

  return freelancers.filter((freelancer) => 
    freelancer.experienceLevel === level
  );
};

/**
 * Filter freelancers by availability status
 * 
 * @param freelancers - Array of freelancers to filter
 * @param availability - Availability status to filter by, or "all" for no filter
 * @returns Filtered array of freelancers
 * 
 * Requirements: 8.2
 */
export const filterByAvailability = (
  freelancers: Freelancer[],
  availability: FreelancerAvailability | 'all'
): Freelancer[] => {
  // If availability is "all", return all freelancers
  if (availability === 'all') {
    return freelancers;
  }

  return freelancers.filter((freelancer) => 
    freelancer.availability === availability
  );
};

/**
 * Filter freelancers by languages (OR logic)
 * Includes freelancers that speak ANY of the selected languages
 * 
 * @param freelancers - Array of freelancers to filter
 * @param languages - Array of language names to filter by
 * @returns Filtered array of freelancers
 * 
 * Requirements: 9.3
 */
export const filterByLanguages = (
  freelancers: Freelancer[],
  languages: string[]
): Freelancer[] => {
  // If languages array is empty, return all freelancers
  if (!languages || languages.length === 0) {
    return freelancers;
  }

  // Convert selected languages to lowercase for case-insensitive comparison
  const languagesLower = languages.map(lang => lang.toLowerCase());

  return freelancers.filter((freelancer) => {
    // Check if freelancer speaks ANY of the selected languages
    return freelancer.languages.some(freelancerLang =>
      languagesLower.includes(freelancerLang.toLowerCase())
    );
  });
};

/**
 * Filter freelancers by minimum rating
 * 
 * @param freelancers - Array of freelancers to filter
 * @param minRating - Minimum rating threshold (0 for no filter)
 * @returns Filtered array of freelancers
 * 
 * Requirements: 10.2
 */
export const filterByMinRating = (
  freelancers: Freelancer[],
  minRating: number
): Freelancer[] => {
  // If minRating is 0, return all freelancers
  if (minRating === 0) {
    return freelancers;
  }

  return freelancers.filter((freelancer) => 
    freelancer.rating >= minRating
  );
};

/**
 * Filter freelancers by location
 * Exact match (case-insensitive)
 * 
 * @param freelancers - Array of freelancers to filter
 * @param location - Location string to filter by
 * @returns Filtered array of freelancers
 * 
 * Requirements: 11.3
 */
export const filterByLocation = (
  freelancers: Freelancer[],
  location: string
): Freelancer[] => {
  // If location is empty, return all freelancers
  if (!location || location.trim() === '') {
    return freelancers;
  }

  const locationLower = location.toLowerCase().trim();

  return freelancers.filter((freelancer) => 
    freelancer.location.toLowerCase() === locationLower
  );
};

// ============================================================================
// COMBINED FILTER FUNCTION
// ============================================================================

/**
 * Apply all filters to a list of freelancers
 * Filters are applied in sequence for optimal performance
 * 
 * @param freelancers - Array of freelancers to filter
 * @param filters - Filter criteria object
 * @returns Filtered array of freelancers
 * 
 * Requirements: 17.2-17.12
 */
export const applyFilters = (
  freelancers: Freelancer[],
  filters: DiscoverFreelancersFilters
): Freelancer[] => {
  let filtered = freelancers;

  // Apply each filter in sequence
  // Order matters for performance - more restrictive filters first
  
  // 1. Category filter (usually most restrictive)
  filtered = filterByCategory(filtered, filters.category);

  // 2. Experience level filter
  filtered = filterByExperienceLevel(filtered, filters.experienceLevel);

  // 3. Availability filter
  filtered = filterByAvailability(filtered, filters.availability);

  // 4. Hourly rate range filter
  filtered = filterByHourlyRate(
    filtered,
    filters.hourlyRateRange.min,
    filters.hourlyRateRange.max
  );

  // 5. Minimum rating filter
  filtered = filterByMinRating(filtered, filters.minRating);

  // 6. Location filter
  filtered = filterByLocation(filtered, filters.location);

  // 7. Skills filter (OR logic)
  filtered = filterBySkills(filtered, filters.skills);

  // 8. Languages filter (OR logic)
  filtered = filterByLanguages(filtered, filters.languages);

  // 9. Search filter (applied last as it's most expensive)
  filtered = filterBySearch(filtered, filters.search);

  return filtered;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if any filters are active (not at default values)
 * 
 * @param filters - Filter criteria object
 * @returns True if any filter is active
 */
export const hasActiveFilters = (filters: DiscoverFreelancersFilters): boolean => {
  return (
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.hourlyRateRange.min !== 0 ||
    filters.hourlyRateRange.max !== 200 ||
    filters.skills.length > 0 ||
    filters.experienceLevel !== 'all' ||
    filters.availability !== 'all' ||
    filters.languages.length > 0 ||
    filters.minRating !== 0 ||
    filters.location !== ''
  );
};

/**
 * Count active filters
 * 
 * @param filters - Filter criteria object
 * @returns Number of active filters
 */
export const countActiveFilters = (filters: DiscoverFreelancersFilters): number => {
  let count = 0;

  if (filters.search !== '') count++;
  if (filters.category !== 'all') count++;
  if (filters.hourlyRateRange.min !== 0 || filters.hourlyRateRange.max !== 200) count++;
  if (filters.skills.length > 0) count++;
  if (filters.experienceLevel !== 'all') count++;
  if (filters.availability !== 'all') count++;
  if (filters.languages.length > 0) count++;
  if (filters.minRating !== 0) count++;
  if (filters.location !== '') count++;

  return count;
};

// ============================================================================
// SORTING FUNCTIONS
// ============================================================================

/**
 * Sort freelancers by relevance score
 * Relevance = rating * 0.6 + successRate * 0.4
 * Higher scores appear first (descending order)
 * 
 * @param freelancers - Array of freelancers to sort
 * @returns Sorted array of freelancers (descending by relevance)
 * 
 * Requirements: 12.2
 */
export const sortByRelevance = (freelancers: Freelancer[]): Freelancer[] => {
  return [...freelancers].sort((a, b) => {
    // Calculate relevance scores
    // successRate is a percentage (0-100), so divide by 100 to normalize
    const scoreA = a.rating * 0.6 + (a.successRate / 100) * 0.4;
    const scoreB = b.rating * 0.6 + (b.successRate / 100) * 0.4;
    
    // Sort descending (higher score first)
    return scoreB - scoreA;
  });
};

/**
 * Sort freelancers by rating (high to low)
 * Higher ratings appear first (descending order)
 * 
 * @param freelancers - Array of freelancers to sort
 * @returns Sorted array of freelancers (descending by rating)
 * 
 * Requirements: 12.3
 */
export const sortByRatingHigh = (freelancers: Freelancer[]): Freelancer[] => {
  return [...freelancers].sort((a, b) => {
    // Sort descending (higher rating first)
    return b.rating - a.rating;
  });
};

/**
 * Sort freelancers by hourly rate (low to high)
 * Lower minimum rates appear first (ascending order)
 * 
 * @param freelancers - Array of freelancers to sort
 * @returns Sorted array of freelancers (ascending by min rate)
 * 
 * Requirements: 12.4
 */
export const sortByRateLow = (freelancers: Freelancer[]): Freelancer[] => {
  return [...freelancers].sort((a, b) => {
    // Sort ascending (lower min rate first)
    return a.hourlyRate.min - b.hourlyRate.min;
  });
};

/**
 * Sort freelancers by hourly rate (high to low)
 * Higher maximum rates appear first (descending order)
 * 
 * @param freelancers - Array of freelancers to sort
 * @returns Sorted array of freelancers (descending by max rate)
 * 
 * Requirements: 12.5
 */
export const sortByRateHigh = (freelancers: Freelancer[]): Freelancer[] => {
  return [...freelancers].sort((a, b) => {
    // Sort descending (higher max rate first)
    return b.hourlyRate.max - a.hourlyRate.max;
  });
};

/**
 * Sort freelancers by experience (most experience first)
 * Higher completed jobs count appears first (descending order)
 * 
 * @param freelancers - Array of freelancers to sort
 * @returns Sorted array of freelancers (descending by completed jobs)
 * 
 * Requirements: 12.6
 */
export const sortByExperience = (freelancers: Freelancer[]): Freelancer[] => {
  return [...freelancers].sort((a, b) => {
    // Sort descending (more completed jobs first)
    return b.completedJobs - a.completedJobs;
  });
};

/**
 * Apply sorting to freelancers based on sort option
 * 
 * @param freelancers - Array of freelancers to sort
 * @param sortBy - Sort option to apply
 * @returns Sorted array of freelancers
 * 
 * Requirements: 12.2, 12.3, 12.4, 12.5, 12.6
 */
export const applySorting = (
  freelancers: Freelancer[],
  sortBy: 'relevance' | 'rating-high' | 'rate-low' | 'rate-high' | 'experience'
): Freelancer[] => {
  switch (sortBy) {
    case 'relevance':
      return sortByRelevance(freelancers);
    case 'rating-high':
      return sortByRatingHigh(freelancers);
    case 'rate-low':
      return sortByRateLow(freelancers);
    case 'rate-high':
      return sortByRateHigh(freelancers);
    case 'experience':
      return sortByExperience(freelancers);
    default:
      // Default to relevance if unknown sort option
      return sortByRelevance(freelancers);
  }
};
