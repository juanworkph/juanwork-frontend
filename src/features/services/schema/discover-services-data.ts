export type ServicePricingType = "fixed" | "hourly" | "package";
export type ServiceStatus =
  | "pending"
  | "declined"
  | "draft"
  | "active"
  | "paused";
export type ExperienceLevel = "beginner" | "intermediate" | "expert";
export type ProviderLevel = "new" | "level1" | "level2" | "top" | "expert";
export type DeliveryTimeFilter =
  | "24-hours"
  | "3-days"
  | "7-days"
  | "anytime"
  | "all";
export type SortOption =
  | "relevance"
  | "rating-high"
  | "price-low"
  | "price-high"
  | "popular";

// Category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  serviceCount?: number;
}

// Service Provider interface
export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  level: ProviderLevel;
  country?: string;
  countryCode?: string;
  title?: string;
  rating?: number;
  reviewsCount?: number;
  verified?: boolean;
  responseTime?: string;
}

// Service Upgrade interface
export interface ServiceUpgrade {
  id: string;
  name: string;
  slug?: string;
  pricePaid?: number;
  startDate?: string;
  endDate?: string;
}

// Service Pricing interface
export interface ServicePricing {
  type: ServicePricingType;
  starting: number;
  currency: string;
  packages?: {
    basic: number;
    standard: number;
    premium: number;
  };
  hourlyRate?: number;
}

// Main Service interface (Frontend)
export interface Service {
  id: string;
  serviceName: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  skills: string[];
  pricing: ServicePricing;
  experienceLevel: ExperienceLevel;
  deliveryTime: string; // Computed display text (e.g., "3 days delivery")
  deliveryDays: number; // Raw number for filtering
  provider: ServiceProvider;
  postedDate: string; // ISO date
  postedAgo: string; // Relative format (e.g., "2 days ago")
  totalOrders: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isUrgent: boolean;
  serviceUrl: string;
  status: ServiceStatus;
  upgrades?: ServiceUpgrade[]; // Optional upgrades array
}

// Filters interface
export interface DiscoverServicesFilters {
  search: string;
  category: string; // Category ID or "all"
  priceRange: {
    min: number;
    max: number;
  };
  pricingType: ServicePricingType | "all";
  skills: string[];
  experienceLevel: ExperienceLevel | "all";
  deliveryTime: DeliveryTimeFilter;
  providerLevel: ProviderLevel | "all";
  sortBy: SortOption;
}

// State interface
export interface DiscoverServicesState {
  services: Service[];
  categories: Category[];
  filters: DiscoverServicesFilters;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  totalServices: number;
}

// Default filter values
export const defaultFilters: DiscoverServicesFilters = {
  search: "",
  category: "all",
  priceRange: {
    min: 0,
    max: 10000,
  },
  pricingType: "all",
  skills: [],
  experienceLevel: "all",
  deliveryTime: "all",
  providerLevel: "all",
  sortBy: "relevance",
};

// Helper functions
export const formatCurrency = (
  amount: number,
  currency: string = "PHP",
): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDeliveryTime = (days: number): string => {
  if (days === 1) return "1 day delivery";
  if (days < 7) return `${days} days delivery`;
  if (days < 30) return `${Math.floor(days / 7)} weeks delivery`;
  return `${Math.floor(days / 30)} months delivery`;
};

export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const posted = new Date(date);
  const diffMs = now.getTime() - posted.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
};

export const mapProviderLevel = (level?: string): ProviderLevel => {
  if (!level) return "new";

  const levelLower = level.toLowerCase();
  if (levelLower.includes("top") || levelLower.includes("expert")) return "top";
  if (levelLower.includes("level 2") || levelLower.includes("level2"))
    return "level2";
  if (levelLower.includes("level 1") || levelLower.includes("level1"))
    return "level1";
  return "new";
};

export const getDeliveryTimeLabel = (filter: DeliveryTimeFilter): string => {
  switch (filter) {
    case "24-hours":
      return "24 Hours";
    case "3-days":
      return "3 Days";
    case "7-days":
      return "7 Days";
    case "anytime":
      return "Anytime";
    case "all":
      return "All";
    default:
      return filter;
  }
};

export const getPricingTypeLabel = (
  type: ServicePricingType | "all",
): string => {
  switch (type) {
    case "fixed":
      return "Fixed Price";
    case "hourly":
      return "Hourly Rate";
    case "all":
      return "All";
    default:
      return type;
  }
};

export const getExperienceLevelLabel = (
  level: ExperienceLevel | "all",
): string => {
  switch (level) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "expert":
      return "Expert";
    case "all":
      return "All";
    default:
      return level;
  }
};

export const getProviderLevelLabel = (level: ProviderLevel | "all"): string => {
  switch (level) {
    case "new":
      return "New Seller";
    case "level1":
      return "Level 1";
    case "level2":
      return "Level 2";
    case "top":
      return "Top Rated";
    case "all":
      return "All";
    default:
      return level;
  }
};

// Available skills for filtering (can be fetched from API in future)
export const availableSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "CSS",
  "HTML",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "React Native",
  "Flutter",
  "WordPress",
  "Shopify",
];
