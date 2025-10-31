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
