/**
 * Users Schema Exports
 * 
 * This file exports all TypeScript interfaces, types, and helper functions
 * for the users/freelancers features. All exports are from discover-freelancers-data.ts
 * which contains API-aligned types and utilities.
 */

// Export types from discover-freelancers-data
export type {
  Freelancer,
  Category,
  Skill,
  DiscoverFreelancersFilters,
  DiscoverFreelancersState,
  FreelancerExperienceLevel,
  FreelancerAvailability,
  SortOption,
  FreelancerQueryParams,
  PaginationMeta,
  FreelancersResponse,
  CategoriesResponse,
  SkillsResponse,
  APIFreelancer,
  APICategory,
  APISkill,
  APIError,
} from "./discover-freelancers-data";

// Export constants and helper functions from discover-freelancers-data
export {
  DEFAULT_FILTERS,
  formatFreelancerCurrency,
  getFreelancerExperienceLevelLabel,
  getFreelancerAvailabilityLabel,
  getFreelancerAvailabilityColor,
} from "./discover-freelancers-data";
