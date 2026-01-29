/**
 * My Services Data Types and Schemas
 * Types, interfaces, and utilities for the My Services feature
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Service status types
 */
export type ServiceStatus =
  | "draft"
  | "pending"
  | "approved"
  | "declined"
  | "paused"
  | "cancelled";

/**
 * Service filter status (includes "all" option)
 */
export type ServiceFilterStatus =
  | "all"
  | "draft"
  | "pending"
  | "approved"
  | "declined"
  | "paused"
  | "cancelled";

/**
 * Payment type for services
 */
export type PaymentType = "fixed" | "hourly";

/**
 * Experience level for services
 */
export type ExperienceLevel = "beginner" | "intermediate" | "expert";

/**
 * Sort options for services
 */
export type ServiceSortOption =
  | "newest"
  | "oldest"
  | "most-views"
  | "least-views"
  | "most-proposals"
  | "least-proposals"
  | "name-asc"
  | "name-desc";

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Main MyService interface for UI
 */
export interface MyService {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  skills: Array<{
    id: string;
    name: string;
    isCustom: boolean;
  }>;
  paymentType: PaymentType;
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  currency: string;
  status: ServiceStatus;
  experienceLevel: ExperienceLevel;
  upgrades: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  views: number;
  proposalsCount: number;
  thumbnail?: string;
  gallery?: string[];
  hasImages: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response interface (matches backend structure)
 */
export interface IServiceResponse {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  };
  paymentType: "fixed" | "hourly";
  budgetMin: string | number;
  budgetMax: string | number;
  deliveryDays: number;
  experienceLevel: "beginner" | "intermediate" | "expert";
  status:
    | "draft"
    | "pending"
    | "approved"
    | "declined"
    | "paused"
    | "cancelled";
  currency?: string;
  createdAt: string;
  updatedAt: string;
  freelancerId: string;
  skills: Array<{
    id: string;
    name: string;
    isCustom: boolean;
  }>;
  upgrades: Array<{
    id: string;
    name: string;
    slug?: string;
    pricePaid?: number | string;
    startDate?: string;
    endDate?: string;
  }>;
}

/**
 * Service statistics interface
 */
export interface ServiceStatistics {
  totalServices: number;
  approvedServices: number;
  pendingServices: number;
  totalViews: number;
  totalProposals: number;
}

// ============================================================================
// CONFIGURATION OBJECTS
// ============================================================================

/**
 * Status badge configuration
 */
export const statusConfig = {
  approved: {
    label: "Approved",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "✓",
  },
  pending: {
    label: "Pending Review",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "⏳",
  },
  declined: {
    label: "Declined",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "✕",
  },
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: "📝",
  },
  paused: {
    label: "Paused",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    icon: "⏸",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-300",
    icon: "⊗",
  },
} as const;

/**
 * Experience level configuration
 */
export const experienceLevelConfig = {
  beginner: {
    label: "Beginner",
    description: "0-2 years",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  intermediate: {
    label: "Intermediate",
    description: "2-5 years",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  expert: {
    label: "Expert",
    description: "5+ years",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
} as const;

/**
 * Filter options for service status
 */
export const filterOptions: Array<{
  value: ServiceFilterStatus;
  label: string;
}> = [
  { value: "all", label: "All Services" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending Review" },
  { value: "declined", label: "Declined" },
  { value: "draft", label: "Drafts" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" },
];

/**
 * Sort options for services
 */
export const sortOptions: Array<{
  value: ServiceSortOption;
  label: string;
}> = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most-views", label: "Most Views" },
  { value: "least-views", label: "Least Views" },
  { value: "most-proposals", label: "Most Proposals" },
  { value: "least-proposals", label: "Least Proposals" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

// ============================================================================
// TRANSFORMATION FUNCTIONS
// ============================================================================

/**
 * Transform API service response to UI model
 */
export const transformServiceResponse = (
  apiService: IServiceResponse,
): MyService => {
  return {
    id: apiService.id,
    name: apiService.name,
    description: apiService.description,
    category: {
      id: apiService.category.id,
      name: apiService.category.name,
      slug: apiService.category.slug,
    },
    skills: apiService.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      isCustom: skill.isCustom,
    })),
    paymentType: apiService.paymentType,
    budgetMin:
      typeof apiService.budgetMin === "string"
        ? parseFloat(apiService.budgetMin)
        : apiService.budgetMin,
    budgetMax:
      typeof apiService.budgetMax === "string"
        ? parseFloat(apiService.budgetMax)
        : apiService.budgetMax,
    deliveryDays: apiService.deliveryDays,
    currency: apiService.currency || "PHP",
    status: apiService.status,
    experienceLevel: apiService.experienceLevel,
    upgrades: apiService.upgrades.map((upgrade) => ({
      id: upgrade.id,
      name: upgrade.name,
      slug: upgrade.slug || upgrade.name.toLowerCase().replace(/\s+/g, "-"),
    })),
    views: 0, // TODO: Backend needs to provide this
    proposalsCount: 0, // TODO: Backend needs to provide this
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Mock data
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop",
    ], // Mock data
    hasImages: true,
    createdAt: new Date(apiService.createdAt),
    updatedAt: new Date(apiService.updatedAt),
  };
};

/**
 * Transform array of API service responses to UI models
 */
export const transformServicesResponse = (
  apiServices: IServiceResponse[],
): MyService[] => {
  return apiServices.map(transformServiceResponse);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format budget as min-max range
 */
export const formatBudget = (service: MyService): string => {
  const { budgetMin, budgetMax, currency } = service;
  return `${currency} ${budgetMin.toLocaleString()} - ${budgetMax.toLocaleString()}`;
};

/**
 * Format budget with currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = "PHP",
): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

/**
 * Format large numbers with comma separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard for ServiceStatus
 */
export const isServiceStatus = (value: unknown): value is ServiceStatus => {
  return (
    typeof value === "string" &&
    [
      "draft",
      "pending",
      "approved",
      "declined",
      "paused",
      "cancelled",
    ].includes(value)
  );
};

/**
 * Type guard for ServiceFilterStatus
 */
export const isServiceFilterStatus = (
  value: unknown,
): value is ServiceFilterStatus => {
  return (
    typeof value === "string" &&
    [
      "all",
      "draft",
      "pending",
      "approved",
      "declined",
      "paused",
      "cancelled",
    ].includes(value)
  );
};

/**
 * Type guard for PaymentType
 */
export const isPaymentType = (value: unknown): value is PaymentType => {
  return typeof value === "string" && ["fixed", "hourly"].includes(value);
};

/**
 * Type guard for ExperienceLevel
 */
export const isExperienceLevel = (value: unknown): value is ExperienceLevel => {
  return (
    typeof value === "string" &&
    ["beginner", "intermediate", "expert"].includes(value)
  );
};

/**
 * Type guard for MyService
 */
export const isMyService = (value: unknown): value is MyService => {
  if (typeof value !== "object" || value === null) return false;

  const service = value as MyService;
  return (
    typeof service.id === "string" &&
    typeof service.name === "string" &&
    typeof service.description === "string" &&
    typeof service.category === "object" &&
    Array.isArray(service.skills) &&
    isPaymentType(service.paymentType) &&
    typeof service.budgetMin === "number" &&
    typeof service.budgetMax === "number" &&
    isServiceStatus(service.status) &&
    isExperienceLevel(service.experienceLevel)
  );
};

// ============================================================================
// FILTERING AND SORTING FUNCTIONS
// ============================================================================

/**
 * Filter services by status
 */
export const filterServicesByStatus = (
  services: MyService[],
  status: ServiceFilterStatus,
): MyService[] => {
  if (status === "all") {
    return services;
  }
  return services.filter((service) => service.status === status);
};

/**
 * Search services by query (name, description, category, skills)
 */
export const searchServices = (
  services: MyService[],
  query: string,
): MyService[] => {
  if (!query.trim()) {
    return services;
  }

  const lowerQuery = query.toLowerCase();
  return services.filter((service) => {
    const nameMatch = service.name.toLowerCase().includes(lowerQuery);
    const descriptionMatch = service.description
      .toLowerCase()
      .includes(lowerQuery);
    const categoryMatch = service.category.name
      .toLowerCase()
      .includes(lowerQuery);
    const skillsMatch = service.skills.some((skill) =>
      skill.name.toLowerCase().includes(lowerQuery),
    );

    return nameMatch || descriptionMatch || categoryMatch || skillsMatch;
  });
};

/**
 * Sort services by specified criteria
 */
export const sortServices = (
  services: MyService[],
  sortBy: ServiceSortOption,
): MyService[] => {
  const sorted = [...services];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    case "oldest":
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
    case "most-views":
      return sorted.sort((a, b) => b.views - a.views);
    case "least-views":
      return sorted.sort((a, b) => a.views - b.views);
    case "most-proposals":
      return sorted.sort((a, b) => b.proposalsCount - a.proposalsCount);
    case "least-proposals":
      return sorted.sort((a, b) => a.proposalsCount - b.proposalsCount);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

// ============================================================================
// STATISTICS FUNCTIONS
// ============================================================================

/**
 * Calculate service statistics
 */
export const calculateStatistics = (
  services: MyService[],
): ServiceStatistics => {
  return {
    totalServices: services.length,
    approvedServices: services.filter((s) => s.status === "approved").length,
    pendingServices: services.filter((s) => s.status === "pending").length,
    totalViews: services.reduce((sum, s) => sum + s.views, 0),
    totalProposals: services.reduce((sum, s) => sum + s.proposalsCount, 0),
  };
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate service data completeness
 */
export const validateServiceData = (service: MyService): boolean => {
  return (
    !!service.id &&
    !!service.name &&
    !!service.description &&
    !!service.category.id &&
    service.skills.length > 0 &&
    service.budgetMin > 0 &&
    service.budgetMax >= service.budgetMin
  );
};

/**
 * Check if service can be edited
 */
export const canEditService = (service: MyService): boolean => {
  return ["draft", "declined"].includes(service.status);
};

/**
 * Check if service can be deleted
 */
export const canDeleteService = (service: MyService): boolean => {
  return true; // All services can be deleted
};

/**
 * Check if service can be paused
 */
export const canPauseService = (service: MyService): boolean => {
  return service.status === "approved";
};

/**
 * Check if service can be activated
 */
export const canActivateService = (service: MyService): boolean => {
  return service.status === "paused";
};
