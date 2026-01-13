/**
 * Export all portfolio schema types and utilities
 */

// Type Definitions
export type {
  ProjectCategory,
  ProjectStatus,
  PortfolioProject,
  PortfolioStatistics,
  IPortfolioProjectResponse,
  PortfolioProjectFormData,
  SortOption,
} from "./portfolio-data";

// Configuration Objects
export { statusConfig, categoryConfig } from "./portfolio-data";

// Type Guards
export {
  isProjectCategory,
  isProjectStatus,
  isPortfolioProject,
} from "./portfolio-data";

// Validation Helpers
export {
  validatePortfolioData,
  validateImageUrl,
  validateProjectLinks,
} from "./portfolio-data";

// Transformation Functions
export {
  transformPortfolioProjectResponse,
  transformPortfolioResponse,
  safeTransformPortfolioProjectResponse,
} from "./portfolio-data";

// Filtering Functions
export {
  filterProjectsByCategory,
  filterProjectsByStatus,
  filterFeaturedProjects,
} from "./portfolio-data";

// Search Functions
export { searchProjects } from "./portfolio-data";

// Sorting Functions
export { sortProjects } from "./portfolio-data";

// Statistics Functions
export { calculatePortfolioStatistics } from "./portfolio-data";

// Formatting Functions
export {
  formatDate,
  formatCurrency,
  formatDuration,
  getCategoryLabel,
  getStatusLabel,
  getStatusColor,
} from "./portfolio-data";
