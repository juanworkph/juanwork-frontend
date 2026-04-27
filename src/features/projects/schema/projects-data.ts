export type ProjectStatus =
  | "active"
  | "completed"
  | "paused"
  | "cancelled"
  | "pending";
export type ProjectType = "fixed" | "hourly";
export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating?: number;
  totalProjects?: number;
  responseTime?: string;
  lastActive?: string;
}

export interface ExtendedClientInfo extends Client {
  totalHires: number;
  paymentVerified: boolean;
  memberSince: string;
  responseRate: number; // percentage
  reviewCount?: number;
}

export interface ProjectBudget {
  type: ProjectType;
  amount: number;
  currency: string;
  hourlyRate?: number;
  estimatedHours?: number;
}

export interface ProjectProgress {
  completedTasks: number;
  totalTasks: number;
  completedMilestones: number;
  totalMilestones: number;
  progressPercentage: number;
  lastUpdated: string;
}

export interface ProjectDeadline {
  startDate: string;
  endDate: string;
  deliveryDays: number;
  hoursLeft: number;
  isOverdue: boolean;
  daysOverdue?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  skills: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  client: Client;
  budget: ProjectBudget;
  progress: ProjectProgress;
  deadline: ProjectDeadline;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  isPinned?: boolean;
  isUrgent?: boolean;
  isFeatured?: boolean;
  hasUnreadMessages?: boolean;
  messageCount?: number;
  attachmentCount?: number;
  notes?: string;
  bidStats?: BidStatistics;
  views?: number;
}

export interface ProjectAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ProjectUpgrade {
  id: string;
  name: string;
  slug?: string;
  pricePaid?: number;
  startDate?: string;
  endDate?: string;
}

export interface BidStatistics {
  totalBids: number;
  averageBid: number;
  lowestBid?: number;
  highestBid?: number;
  averageDeliveryTime?: number;
}

export interface ProjectDetails extends Project {
  attachments?: ProjectAttachment[];
  clientDetails?: ExtendedClientInfo;
  experienceLevel?: "entry" | "intermediate" | "expert";
  duration?: string;
  upgrades?: ProjectUpgrade[];
}

export interface ProjectsStats {
  total: number;
  active: number;
  completed: number;
  paused: number;
  cancelled: number;
  pending: number;
  totalEarnings: number;
  totalSpent: number; // For client context
  averageRating: number;
  onTimeDelivery: number;
}

export interface ProjectsFilters {
  status: ProjectStatus | "all";
  priority: ProjectPriority | "all";
  search: string;
  sortBy: "name" | "deadline" | "progress" | "budget" | "created" | "updated";
  sortDirection: "asc" | "desc";
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface ProjectsState {
  projects: Project[];
  stats: ProjectsStats;
  filters: ProjectsFilters;
}

// Helper functions
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getTimeLeft = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) {
    const overdueDays = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    return `${overdueDays} day${overdueDays > 1 ? "s" : ""} overdue`;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} left`;
  } else {
    return `${hours} hour${hours > 1 ? "s" : ""} left`;
  }
};

export const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "paused":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "pending":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const getPriorityColor = (priority: ProjectPriority): string => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "high":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-blue-500";
  if (percentage >= 40) return "bg-yellow-500";
  if (percentage >= 20) return "bg-orange-500";
  return "bg-red-500";
};
