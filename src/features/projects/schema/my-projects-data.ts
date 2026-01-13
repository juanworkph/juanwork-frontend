// ============================================
// Type Definitions
// ============================================

/**
 * Project status enum matching backend ProjectStatus
 */
export type ProjectStatus =
  | "draft"
  | "pending"
  | "active"
  | "completed"
  | "paused"
  | "cancelled";

/**
 * Filter status type including "all" option for UI filtering
 */
export type ProjectFilterStatus =
  | "all"
  | "draft"
  | "pending"
  | "active"
  | "completed"
  | "paused"
  | "cancelled";

/**
 * Payment type for projects
 */
export type PaymentType = "fixed" | "hourly";

/**
 * Experience level for projects
 */
export type ExperienceLevel = "beginner" | "intermediate" | "expert";

/**
 * Category interface matching API response
 */
export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Skill interface matching API response
 */
export interface ProjectSkill {
  id: string;
  name: string;
  isCustom: boolean;
}

/**
 * Upgrade interface matching API response
 */
export interface ProjectUpgrade {
  id: string;
  name: string;
  slug: string;
}

/**
 * Main project interface for My Projects feature
 * Represents a project posted by a client
 */
export interface MyProject {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  skills: ProjectSkill[];
  paymentType: PaymentType;
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  currency: string;
  status: ProjectStatus;
  experienceLevel: ExperienceLevel;
  upgrades: ProjectUpgrade[];
  biddersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API response interface from backend
 * Matches IProjectResponse from backend
 */
export interface IProjectResponse {
  id: string;
  clientId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    isActive: boolean;
    displayOrder: number;
  };
  name: string;
  description: string;
  paymentType: "fixed" | "hourly";
  experienceLevel: "beginner" | "intermediate" | "expert";
  budgetMin: string;
  budgetMax: string;
  deliveryDays: number;
  currency: string;
  status: ProjectStatus;
  skills: {
    id: string;
    name: string;
    isCustom: boolean;
  }[];
  upgrades: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    pricePaid: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Type Guards
// ============================================

/**
 * Type guard to check if a value is a valid ProjectStatus
 */
export const isProjectStatus = (value: unknown): value is ProjectStatus => {
  return (
    typeof value === "string" &&
    ["draft", "pending", "active", "completed", "paused", "cancelled"].includes(
      value
    )
  );
};

/**
 * Type guard to check if a value is a valid PaymentType
 */
export const isPaymentType = (value: unknown): value is PaymentType => {
  return typeof value === "string" && ["fixed", "hourly"].includes(value);
};

/**
 * Type guard to check if a value is a valid ExperienceLevel
 */
export const isExperienceLevel = (
  value: unknown
): value is ExperienceLevel => {
  return (
    typeof value === "string" &&
    ["beginner", "intermediate", "expert"].includes(value)
  );
};

/**
 * Type guard to check if an object is a valid MyProject
 */
export const isMyProject = (value: unknown): value is MyProject => {
  if (typeof value !== "object" || value === null) return false;

  const project = value as Record<string, unknown>;

  return (
    typeof project.id === "string" &&
    typeof project.name === "string" &&
    typeof project.description === "string" &&
    typeof project.category === "object" &&
    project.category !== null &&
    Array.isArray(project.skills) &&
    isPaymentType(project.paymentType) &&
    typeof project.budgetMin === "number" &&
    typeof project.budgetMax === "number" &&
    typeof project.deliveryDays === "number" &&
    typeof project.currency === "string" &&
    isProjectStatus(project.status) &&
    isExperienceLevel(project.experienceLevel) &&
    Array.isArray(project.upgrades) &&
    typeof project.biddersCount === "number" &&
    project.createdAt instanceof Date &&
    project.updatedAt instanceof Date
  );
};

// ============================================
// Transformation Functions
// ============================================

/**
 * Transform API response to UI model
 * Converts string numbers to actual numbers and simplifies nested structures
 */
export const transformProjectResponse = (
  apiProject: IProjectResponse
): MyProject => {
  return {
    id: apiProject.id,
    name: apiProject.name,
    description: apiProject.description,
    category: {
      id: apiProject.category.id,
      name: apiProject.category.name,
      slug: apiProject.category.slug,
    },
    skills: apiProject.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      isCustom: skill.isCustom,
    })),
    paymentType: apiProject.paymentType,
    budgetMin: parseFloat(apiProject.budgetMin),
    budgetMax: parseFloat(apiProject.budgetMax),
    deliveryDays: apiProject.deliveryDays,
    currency: apiProject.currency,
    status: apiProject.status,
    experienceLevel: apiProject.experienceLevel,
    upgrades: apiProject.upgrades.map((upgrade) => ({
      id: upgrade.id,
      name: upgrade.name,
      slug: upgrade.slug,
    })),
    biddersCount: 0, // TODO: Backend needs to provide this field
    createdAt: new Date(apiProject.createdAt),
    updatedAt: new Date(apiProject.updatedAt),
  };
};

/**
 * Transform multiple API responses to UI models
 */
export const transformProjectsResponse = (
  apiProjects: IProjectResponse[]
): MyProject[] => {
  return apiProjects.map(transformProjectResponse);
};

/**
 * Validate and transform API response with error handling
 */
export const safeTransformProjectResponse = (
  apiProject: unknown
): MyProject | null => {
  try {
    // Basic validation
    if (typeof apiProject !== "object" || apiProject === null) {
      console.error("Invalid project response: not an object");
      return null;
    }

    const project = apiProject as IProjectResponse;

    // Validate required fields
    if (!project.id || !project.name || !project.category) {
      console.error("Invalid project response: missing required fields");
      return null;
    }

    return transformProjectResponse(project);
  } catch (error) {
    console.error("Error transforming project response:", error);
    return null;
  }
};

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate project data completeness
 */
export const validateProjectData = (
  project: MyProject
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!project.id) errors.push("Project ID is required");
  if (!project.name || project.name.trim().length === 0)
    errors.push("Project name is required");
  if (!project.description || project.description.trim().length === 0)
    errors.push("Project description is required");
  if (!project.category || !project.category.id)
    errors.push("Project category is required");
  if (project.budgetMin < 0) errors.push("Budget minimum cannot be negative");
  if (project.budgetMax < 0) errors.push("Budget maximum cannot be negative");
  if (project.budgetMin > project.budgetMax)
    errors.push("Budget minimum cannot exceed maximum");
  if (project.deliveryDays < 1)
    errors.push("Delivery days must be at least 1");
  if (!isProjectStatus(project.status))
    errors.push("Invalid project status");
  if (!isPaymentType(project.paymentType))
    errors.push("Invalid payment type");
  if (!isExperienceLevel(project.experienceLevel))
    errors.push("Invalid experience level");

  return {
    valid: errors.length === 0,
    errors,
  };
};


// ============================================
// Mock Data (Legacy - for backward compatibility)
// ============================================

/**
 * Mock data for projects
 * @deprecated Use API data instead
 */
export const mockMyProjects: MyProject[] = [
  {
    id: "1",
    name: "E-commerce Website Development",
    description:
      "Need a full-featured e-commerce website with product catalog, shopping cart, payment integration, and admin panel. Should be responsive and SEO-friendly.",
    category: {
      id: "cat-1",
      name: "Web Development",
      slug: "web-development",
    },
    skills: [
      { id: "skill-1", name: "React", isCustom: false },
      { id: "skill-2", name: "Next.js", isCustom: false },
      { id: "skill-3", name: "Node.js", isCustom: false },
      { id: "skill-4", name: "Stripe", isCustom: false },
      { id: "skill-5", name: "MongoDB", isCustom: false },
    ],
    paymentType: "fixed",
    budgetMin: 3000,
    budgetMax: 6000,
    deliveryDays: 90,
    currency: "USD",
    status: "active",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-28"),
    biddersCount: 15,
    experienceLevel: "expert",
    upgrades: [
      { id: "up-1", name: "Featured", slug: "featured" },
      { id: "up-2", name: "Urgent", slug: "urgent" },
    ],
  },
  {
    id: "2",
    name: "Mobile App for Fitness Tracking",
    description:
      "Looking for an experienced React Native developer to build a cross-platform fitness tracking app with workout plans, progress tracking, and social features.",
    category: {
      id: "cat-2",
      name: "Mobile Development",
      slug: "mobile-development",
    },
    skills: [
      { id: "skill-6", name: "React Native", isCustom: false },
      { id: "skill-7", name: "Firebase", isCustom: false },
      { id: "skill-8", name: "Redux", isCustom: false },
    ],
    paymentType: "hourly",
    budgetMin: 50,
    budgetMax: 80,
    deliveryDays: 60,
    currency: "USD",
    status: "active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-27"),
    biddersCount: 22,
    experienceLevel: "intermediate",
    upgrades: [{ id: "up-3", name: "NDA", slug: "nda" }],
  },
];

// ============================================
// Configuration Objects
// ============================================

/**
 * Status badge configurations for UI display
 */
export const projectStatusConfig: Record<
  ProjectStatus,
  {
    label: string;
    color: string;
    icon: string;
  }
> = {
  draft: {
    label: "Draft",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "📝",
  },
  pending: {
    label: "Pending",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    icon: "⏱️",
  },
  active: {
    label: "Active",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "🟢",
  },
  completed: {
    label: "Completed",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    icon: "✓",
  },
  paused: {
    label: "Paused",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "⏸️",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: "🔒",
  },
};

/**
 * Filter options for project status dropdown
 */
export const projectFilterOptions: {
  value: ProjectFilterStatus;
  label: string;
}[] = [
  { value: "all", label: "All Projects" },
  { value: "draft", label: "Drafts" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" },
];

/**
 * Upgrade slug to display name mapping
 */
export const upgradeDisplayNames: Record<string, string> = {
  featured: "Featured",
  urgent: "Urgent",
  nda: "NDA Required",
  sealed: "Sealed Bidding",
};

// ============================================
// Helper Functions
// ============================================

/**
 * Format date to readable string
 * Handles both Date objects and date strings
 */
export const formatDate = (date: Date | string): string => {
  // Handle invalid dates
  if (!date) {
    return 'N/A';
  }
  
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj);
};

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get projects filtered by status
 */
export const getProjectsByStatus = (
  projects: MyProject[],
  status: ProjectFilterStatus
): MyProject[] => {
  if (status === "all") {
    return projects;
  }
  return projects.filter((project) => project.status === status);
};

/**
 * Get delivery days label
 */
export const getDeliveryDaysLabel = (days: number): string => {
  if (days === 1) return "1 day";
  if (days < 7) return `${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month" : `${months} months`;
};

/**
 * Get experience level label
 */
export const getExperienceLevelLabel = (
  level: ExperienceLevel
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
 * Get budget display string based on payment type
 */
export const getBudgetDisplay = (project: MyProject): string => {
  if (project.paymentType === "fixed") {
    return `${formatCurrency(project.budgetMin, project.currency)} - ${formatCurrency(project.budgetMax, project.currency)}`;
  } else {
    // For hourly, show the hourly rate range
    return `${formatCurrency(project.budgetMin, project.currency)} - ${formatCurrency(project.budgetMax, project.currency)}/hr`;
  }
};

/**
 * Get upgrade display name from slug
 */
export const getUpgradeDisplayName = (slug: string): string => {
  return upgradeDisplayNames[slug] || slug;
};

/**
 * Sort projects by criteria
 */
export const sortProjects = (
  projects: MyProject[],
  sortBy: string
): MyProject[] => {
  const sorted = [...projects];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    case "most-bidders":
      return sorted.sort((a, b) => b.biddersCount - a.biddersCount);
    case "least-bidders":
      return sorted.sort((a, b) => a.biddersCount - b.biddersCount);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

/**
 * Search projects by query
 */
export const searchProjects = (
  projects: MyProject[],
  query: string
): MyProject[] => {
  if (!query || query.trim().length === 0) {
    return projects;
  }

  const lowerQuery = query.toLowerCase().trim();

  return projects.filter((project) => {
    // Search in name
    if (project.name.toLowerCase().includes(lowerQuery)) return true;

    // Search in description
    if (project.description.toLowerCase().includes(lowerQuery)) return true;

    // Search in category name
    if (project.category.name.toLowerCase().includes(lowerQuery)) return true;

    // Search in skills
    if (
      project.skills.some((skill) =>
        skill.name.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    return false;
  });
};

/**
 * Calculate project statistics
 */
export const calculateProjectStatistics = (projects: MyProject[]) => {
  return {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    inProgress: projects.filter((p) => p.status === "active" && p.biddersCount > 0).length,
    totalBids: projects.reduce((sum, p) => sum + p.biddersCount, 0),
    draft: projects.filter((p) => p.status === "draft").length,
    pending: projects.filter((p) => p.status === "pending").length,
    completed: projects.filter((p) => p.status === "completed").length,
    paused: projects.filter((p) => p.status === "paused").length,
    cancelled: projects.filter((p) => p.status === "cancelled").length,
  };
};
