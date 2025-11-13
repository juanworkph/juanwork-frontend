export * from "./post-service-data";
export * from "./my-services-data";

// Discover Services exports (avoiding naming conflicts)
export type {
  DiscoverService,
  ServiceProvider,
  ServicePricing,
  ServicePricingType,
  DeliveryTime,
  DiscoverServicesFilters,
  DiscoverServicesState,
} from "./discover-services-data";

export {
  mockDiscoverServicesData,
  getDeliveryTimeLabel,
  getPricingTypeLabel,
} from "./discover-services-data";

// Re-export conflicting items with aliases for discover services
export {
  availableSkills as discoverServiceSkills,
  categories as discoverServiceCategories,
} from "./discover-services-data";

// Service Details exports
export type {
  ServiceDetailsData,
  PackageDetails,
  PackageDetail,
  FAQ,
} from "./service-details-data";

export {
  mockServiceDetailsData,
  getServiceDetailsById,
} from "./service-details-data";

// Bookmarks exports
export type { Bookmark } from "./bookmarks-data";

export {
  mockBookmarksData,
  isServiceBookmarked,
  getUserBookmarks,
  addBookmark,
  removeBookmark,
  CURRENT_USER_ID,
} from "./bookmarks-data";

// Proposals exports
export type {
  Proposal,
  ProposalStatus,
  ProposalFormData,
} from "./proposals-data";

export {
  mockProposalsData,
  getProposalsByServiceId,
  getProposalsByClientId,
  getProposalsByProviderId,
  createProposal,
  updateProposalStatus,
  getProposalStatusLabel,
  getProposalStatusColor,
} from "./proposals-data";
