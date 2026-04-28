/**
 * Export all schema types and utilities
 */

// API Types
export * from "./discover-services-api";

// Frontend Types and Utilities
export * from "./discover-services-data";

// My Services (Freelancer) - Export specific types to avoid conflicts
export type {
  ServiceStatus,
  ServiceFilterStatus,
  PaymentType,
  ServiceSortOption,
  MyService,
  IServiceResponse,
  ServiceStatistics,
} from "./my-services-data";

export {
  statusConfig,
  experienceLevelConfig,
  filterOptions,
  sortOptions,
  transformServiceResponse,
  transformServicesResponse,
  formatBudget,
  formatCurrency,
  formatNumber,
  formatDate,
  formatRelativeTime,
  isServiceStatus,
  isServiceFilterStatus,
  isPaymentType,
  isExperienceLevel,
  isMyService,
  filterServicesByStatus,
  searchServices,
  sortServices,
  calculateStatistics,
  validateServiceData,
  canEditService,
  canDeleteService,
  canPauseService,
  canActivateService,
} from "./my-services-data";

// Single Service View
export * from "./single-view-data";
export * from "./single-view-proposals-data";

// Service Post/Create
export * from "./post-service-data";
export * from "./service-form.schema";
export * from "./service-post.schema";

// Bookmarks
export * from "./bookmarks-data";
