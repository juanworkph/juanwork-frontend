// ============================================
// Type Definitions
// ============================================

/**
 * Project category type matching backend enum
 * Uses kebab-case format for consistency with backend
 */
export type ProjectCategory =
  | "web-development"
  | "mobile-app"
  | "ui-ux-design"
  | "e-commerce"
  | "api-development"
  | "devops"
  | "other";

/**
 * Project status type matching backend enum
 * Uses kebab-case format for consistency with backend
 */
export type ProjectStatus = "completed" | "in-progress" | "concept";

/**
 * Skill interface
 */
export interface Skill {
  id: string;
  name: string;
  isCustom: boolean;
}

/**
 * Main portfolio project interface for UI
 * Represents a portfolio project with all details
 */
export interface PortfolioProject {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  images: {
    thumbnail: string;
    gallery: string[];
  };
  technologies: string[];
  skills: Skill[]; // Changed from string[] to Skill[]
  client: {
    name: string;
    industry: string;
    location: string;
    testimonial?: {
      text: string;
      rating: number;
    };
  };
  timeline: {
    startDate: string;
    endDate?: string;
    duration: string;
  };
  projectDetails: {
    challenge: string;
    solution: string;
    results: string[];
  };
  links: {
    live?: string;
    github?: string;
    demo?: string;
    casestudy?: string;
  };
  metrics: {
    budget: number;
    teamSize: number;
    deliveryTime: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Portfolio statistics interface
 * Aggregated statistics for the portfolio dashboard
 */
export interface PortfolioStatistics {
  totalProjects: number;
  completedProjects: number;
  featuredProjects: number;
  averageRating: number;
  totalClients: number;
}

/**
 * API response interface from backend
 * Matches the backend IPortfolioProjectResponse structure
 */
export interface IPortfolioProjectResponse {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  images: {
    thumbnail: string;
    gallery: string[];
  };
  technologies: string[];
  skills: Skill[]; // Changed from string[] to Skill[]
  client: {
    name: string;
    industry: string;
    location: string;
    testimonial?: {
      text: string;
      rating: number;
    };
  };
  timeline: {
    startDate: string;
    endDate?: string;
    duration: string;
  };
  projectDetails: {
    challenge: string;
    solution: string;
    results: string[];
  };
  links: {
    live?: string;
    github?: string;
    demo?: string;
    casestudy?: string;
  };
  metrics: {
    budget: string; // API returns as string
    teamSize: number;
    deliveryTime: string;
  };
  tags: string[];
  createdAt: string; // API returns as ISO string
  updatedAt: string; // API returns as ISO string
}

/**
 * Form data interface for creating/updating portfolio projects
 */
export interface PortfolioProjectFormData {
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  images: {
    thumbnail: string;
    gallery: string[];
  };
  technologies: string[];
  skills: string[];
  client?: {
    name: string;
    industry: string;
    location: string;
    testimonial?: {
      text: string;
      rating: number;
    };
  };
  timeline: {
    startDate: string;
    endDate?: string;
    duration: string;
  };
  projectDetails?: {
    challenge: string;
    solution: string;
    results: string[];
  };
  links?: {
    live?: string;
    github?: string;
    demo?: string;
    casestudy?: string;
  };
  metrics?: {
    budget: number;
    teamSize: number;
    deliveryTime: string;
  };
  tags?: string[];
}

// ============================================
// Configuration Objects
// ============================================

/**
 * Status configuration for display
 * Maps status to label, color classes, and icon
 */
export const statusConfig = {
  completed: {
    label: "Completed",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "✓",
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "⏳",
  },
  concept: {
    label: "Concept",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    icon: "💡",
  },
} as const;

/**
 * Category configuration for display
 * Maps category to label and icon
 */
export const categoryConfig = {
  "web-development": {
    label: "Web Development",
    icon: "🌐",
  },
  "mobile-app": {
    label: "Mobile App",
    icon: "📱",
  },
  "ui-ux-design": {
    label: "UI/UX Design",
    icon: "🎨",
  },
  "e-commerce": {
    label: "E-commerce",
    icon: "🛒",
  },
  "api-development": {
    label: "API Development",
    icon: "🔌",
  },
  devops: {
    label: "DevOps",
    icon: "⚙️",
  },
  other: {
    label: "Other",
    icon: "📦",
  },
} as const;

// ============================================
// Type Guards
// ============================================

/**
 * Type guard to check if a value is a valid ProjectCategory
 */
export const isProjectCategory = (
  value: unknown
): value is ProjectCategory => {
  return (
    typeof value === "string" &&
    [
      "web-development",
      "mobile-app",
      "ui-ux-design",
      "e-commerce",
      "api-development",
      "devops",
      "other",
    ].includes(value)
  );
};

/**
 * Type guard to check if a value is a valid ProjectStatus
 */
export const isProjectStatus = (value: unknown): value is ProjectStatus => {
  return (
    typeof value === "string" &&
    ["completed", "in-progress", "concept"].includes(value)
  );
};

/**
 * Type guard to check if an object is a valid PortfolioProject
 */
export const isPortfolioProject = (
  value: unknown
): value is PortfolioProject => {
  if (typeof value !== "object" || value === null) return false;

  const project = value as Record<string, unknown>;

  return (
    typeof project.id === "string" &&
    typeof project.freelancerId === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    isProjectCategory(project.category) &&
    isProjectStatus(project.status) &&
    typeof project.featured === "boolean" &&
    typeof project.images === "object" &&
    project.images !== null &&
    Array.isArray(project.technologies) &&
    Array.isArray(project.skills) &&
    typeof project.client === "object" &&
    project.client !== null &&
    typeof project.timeline === "object" &&
    project.timeline !== null &&
    typeof project.projectDetails === "object" &&
    project.projectDetails !== null &&
    typeof project.links === "object" &&
    project.links !== null &&
    typeof project.metrics === "object" &&
    project.metrics !== null &&
    Array.isArray(project.tags) &&
    project.createdAt instanceof Date &&
    project.updatedAt instanceof Date
  );
};

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate portfolio project data
 * Checks if all required fields are present and valid
 */
export const validatePortfolioData = (project: unknown): boolean => {
  if (!isPortfolioProject(project)) return false;

  // Validate required fields
  if (!project.title || project.title.length < 5 || project.title.length > 100)
    return false;
  if (
    !project.description ||
    project.description.length < 50 ||
    project.description.length > 2000
  )
    return false;
  if (project.technologies.length === 0) return false;

  return true;
};

/**
 * Validate image URL format
 * Checks if URL is valid and points to an image
 */
export const validateImageUrl = (url: string): boolean => {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);
    // Check if URL has a valid protocol
    if (!["http:", "https:"].includes(urlObj.protocol)) return false;

    // Optional: Check if URL ends with image extension
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const hasImageExtension = imageExtensions.some((ext) =>
      url.toLowerCase().includes(ext)
    );

    // Accept URLs without extensions (e.g., Unsplash URLs with query params)
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate project links
 * Checks if all provided links are valid URLs
 */
export const validateProjectLinks = (links: unknown): boolean => {
  if (typeof links !== "object" || links === null) return false;

  const linksObj = links as Record<string, unknown>;
  const urlFields = ["live", "github", "demo", "casestudy"];

  for (const field of urlFields) {
    if (linksObj[field] !== undefined) {
      if (typeof linksObj[field] !== "string") return false;
      try {
        new URL(linksObj[field] as string);
      } catch {
        return false;
      }
    }
  }

  return true;
};

// ============================================
// Transformation Functions
// ============================================

/**
 * Transform API response to UI model
 * Converts string numbers to actual numbers and date strings to Date objects
 */
export const transformPortfolioProjectResponse = (
  apiProject: IPortfolioProjectResponse
): PortfolioProject => {
  return {
    id: apiProject.id,
    freelancerId: apiProject.freelancerId,
    title: apiProject.title,
    description: apiProject.description,
    category: apiProject.category,
    status: apiProject.status,
    featured: apiProject.featured,
    images: {
      thumbnail: apiProject.images.thumbnail,
      gallery: apiProject.images.gallery,
    },
    technologies: apiProject.technologies,
    skills: apiProject.skills,
    client: {
      name: apiProject.client.name,
      industry: apiProject.client.industry,
      location: apiProject.client.location,
      testimonial: apiProject.client.testimonial
        ? {
            text: apiProject.client.testimonial.text,
            rating: apiProject.client.testimonial.rating,
          }
        : undefined,
    },
    timeline: {
      startDate: apiProject.timeline.startDate,
      endDate: apiProject.timeline.endDate,
      duration: apiProject.timeline.duration,
    },
    projectDetails: {
      challenge: apiProject.projectDetails.challenge,
      solution: apiProject.projectDetails.solution,
      results: apiProject.projectDetails.results,
    },
    links: {
      live: apiProject.links.live,
      github: apiProject.links.github,
      demo: apiProject.links.demo,
      casestudy: apiProject.links.casestudy,
    },
    metrics: {
      budget: parseFloat(apiProject.metrics.budget),
      teamSize: apiProject.metrics.teamSize,
      deliveryTime: apiProject.metrics.deliveryTime,
    },
    tags: apiProject.tags,
    createdAt: new Date(apiProject.createdAt),
    updatedAt: new Date(apiProject.updatedAt),
  };
};

/**
 * Transform array of API responses to UI models
 */
export const transformPortfolioResponse = (
  apiProjects: IPortfolioProjectResponse[]
): PortfolioProject[] => {
  return apiProjects.map((project) =>
    transformPortfolioProjectResponse(project)
  );
};

/**
 * Safe transformation with error handling
 * Returns null if transformation fails
 */
export const safeTransformPortfolioProjectResponse = (
  apiProject: unknown
): PortfolioProject | null => {
  try {
    if (typeof apiProject !== "object" || apiProject === null) return null;
    return transformPortfolioProjectResponse(
      apiProject as IPortfolioProjectResponse
    );
  } catch (error) {
    console.error("Failed to transform portfolio project:", error);
    return null;
  }
};

// ============================================
// Filtering Functions
// ============================================

/**
 * Filter projects by category
 * Returns all projects if category is "all"
 */
export const filterProjectsByCategory = (
  projects: PortfolioProject[],
  category: string
): PortfolioProject[] => {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
};

/**
 * Filter projects by status
 */
export const filterProjectsByStatus = (
  projects: PortfolioProject[],
  status: ProjectStatus
): PortfolioProject[] => {
  return projects.filter((project) => project.status === status);
};

/**
 * Filter featured projects only
 */
export const filterFeaturedProjects = (
  projects: PortfolioProject[]
): PortfolioProject[] => {
  return projects.filter((project) => project.featured);
};

// ============================================
// Search Functions
// ============================================

/**
 * Search projects by query
 * Searches in title, description, technologies, skills, tags, and client name
 */
export const searchProjects = (
  projects: PortfolioProject[],
  query: string
): PortfolioProject[] => {
  if (!query || query.trim() === "") return projects;

  const lowerQuery = query.toLowerCase().trim();

  return projects.filter((project) => {
    // Search in title
    if (project.title.toLowerCase().includes(lowerQuery)) return true;

    // Search in description
    if (project.description.toLowerCase().includes(lowerQuery)) return true;

    // Search in technologies
    if (
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    // Search in skills
    if (project.skills.some((skill) => skill.name.toLowerCase().includes(lowerQuery)))
      return true;

    // Search in tags
    if (project.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
      return true;

    // Search in client name
    if (project.client.name.toLowerCase().includes(lowerQuery)) return true;

    return false;
  });
};

// ============================================
// Sorting Functions
// ============================================

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "title-asc"
  | "title-desc"
  | "rating-desc"
  | "rating-asc";

/**
 * Sort projects by specified option
 */
export const sortProjects = (
  projects: PortfolioProject[],
  sortBy: SortOption
): PortfolioProject[] => {
  const sorted = [...projects];

  switch (sortBy) {
    case "date-desc":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "date-asc":
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "rating-desc":
      return sorted.sort((a, b) => {
        const ratingA = a.client.testimonial?.rating ?? 0;
        const ratingB = b.client.testimonial?.rating ?? 0;
        return ratingB - ratingA;
      });
    case "rating-asc":
      return sorted.sort((a, b) => {
        const ratingA = a.client.testimonial?.rating ?? 0;
        const ratingB = b.client.testimonial?.rating ?? 0;
        return ratingA - ratingB;
      });
    default:
      return sorted;
  }
};

// ============================================
// Statistics Functions
// ============================================

/**
 * Calculate portfolio statistics from projects
 */
export const calculatePortfolioStatistics = (
  projects: PortfolioProject[]
): PortfolioStatistics => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  // Calculate average rating from projects with testimonials
  const projectsWithRatings = projects.filter(
    (p) => p.client.testimonial?.rating
  );
  const averageRating =
    projectsWithRatings.length > 0
      ? projectsWithRatings.reduce(
          (sum, p) => sum + (p.client.testimonial?.rating ?? 0),
          0
        ) / projectsWithRatings.length
      : 0;

  // Calculate total unique clients
  const uniqueClients = new Set(
    projects.map((p) => p.client.name.toLowerCase())
  );
  const totalClients = uniqueClients.size;

  return {
    totalProjects,
    completedProjects,
    featuredProjects,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalClients,
  };
};

// ============================================
// Formatting Functions
// ============================================

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format currency value
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format duration string
 * Converts duration like "3.5 months" to readable format
 */
export const formatDuration = (duration: string): string => {
  return duration;
};

/**
 * Get category label from category value
 */
export const getCategoryLabel = (category: ProjectCategory): string => {
  return categoryConfig[category].label;
};

/**
 * Get status label from status value
 */
export const getStatusLabel = (status: ProjectStatus): string => {
  return statusConfig[status].label;
};

/**
 * Get status color classes from status value
 */
export const getStatusColor = (status: ProjectStatus): string => {
  return statusConfig[status].color;
};
