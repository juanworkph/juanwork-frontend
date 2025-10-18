export type ProjectStatus =
  | "in-progress"
  | "completed"
  | "overdue"
  | "pending"
  | "cancelled";

export type ProjectType = "fixed" | "hourly";

export type Priority = "low" | "medium" | "high" | "urgent";

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
}

export interface WorkstationProject {
  id: string;
  title: string;
  description: string;
  client: Client;
  status: ProjectStatus;
  projectType: ProjectType;
  priority: Priority;
  budget: number;
  hourlyRate?: number;
  progress: number; // 0-100
  startDate: Date;
  deadline: Date;
  completedDate?: Date;
  hoursWorked?: number;
  estimatedHours?: number;
  category: string;
  skills: string[];
  lastUpdate: Date;
  attachments: number;
  messages: number;
}

// Mock data for workstation projects
export const mockWorkstationProjects: WorkstationProject[] = [
  {
    id: "1",
    title: "E-commerce Website Development",
    description:
      "Build a modern e-commerce platform with payment integration, product management, and user authentication.",
    client: {
      id: "c1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      country: "United States",
    },
    status: "in-progress",
    projectType: "fixed",
    priority: "high",
    budget: 5000,
    progress: 65,
    startDate: new Date(2025, 0, 10),
    deadline: new Date(2025, 1, 15),
    hoursWorked: 45,
    estimatedHours: 80,
    category: "Web Development",
    skills: ["React", "Node.js", "MongoDB", "Stripe"],
    lastUpdate: new Date(2025, 0, 17),
    attachments: 8,
    messages: 24,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description:
      "Design a complete user interface and user experience for a fitness tracking mobile application.",
    client: {
      id: "c2",
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      country: "Canada",
    },
    status: "in-progress",
    projectType: "hourly",
    priority: "medium",
    budget: 0,
    hourlyRate: 75,
    progress: 40,
    startDate: new Date(2025, 0, 5),
    deadline: new Date(2025, 1, 1),
    hoursWorked: 28,
    estimatedHours: 60,
    category: "UI/UX Design",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    lastUpdate: new Date(2025, 0, 18),
    attachments: 15,
    messages: 32,
  },
  {
    id: "3",
    title: "WordPress Blog Customization",
    description:
      "Customize an existing WordPress blog with a new theme, plugins, and SEO optimization.",
    client: {
      id: "c3",
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      country: "United Kingdom",
    },
    status: "completed",
    projectType: "fixed",
    priority: "low",
    budget: 800,
    progress: 100,
    startDate: new Date(2024, 11, 20),
    deadline: new Date(2025, 0, 10),
    completedDate: new Date(2025, 0, 8),
    hoursWorked: 15,
    estimatedHours: 15,
    category: "WordPress",
    skills: ["WordPress", "PHP", "CSS"],
    lastUpdate: new Date(2025, 0, 8),
    attachments: 5,
    messages: 12,
  },
  {
    id: "4",
    title: "Python Data Analysis Script",
    description:
      "Create Python scripts for automated data analysis and visualization of sales data.",
    client: {
      id: "c4",
      name: "David Martinez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      country: "Spain",
    },
    status: "overdue",
    projectType: "fixed",
    priority: "urgent",
    budget: 1200,
    progress: 75,
    startDate: new Date(2024, 11, 28),
    deadline: new Date(2025, 0, 15),
    hoursWorked: 32,
    estimatedHours: 40,
    category: "Data Analysis",
    skills: ["Python", "Pandas", "Matplotlib"],
    lastUpdate: new Date(2025, 0, 16),
    attachments: 6,
    messages: 18,
  },
  {
    id: "5",
    title: "Logo Design & Brand Identity",
    description:
      "Design a modern logo and complete brand identity package for a tech startup.",
    client: {
      id: "c5",
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      country: "Australia",
    },
    status: "in-progress",
    projectType: "fixed",
    priority: "medium",
    budget: 2500,
    progress: 55,
    startDate: new Date(2025, 0, 12),
    deadline: new Date(2025, 1, 20),
    hoursWorked: 22,
    estimatedHours: 35,
    category: "Graphic Design",
    skills: ["Illustrator", "Photoshop", "Branding"],
    lastUpdate: new Date(2025, 0, 18),
    attachments: 12,
    messages: 28,
  },
  {
    id: "6",
    title: "SEO Audit & Optimization",
    description:
      "Conduct comprehensive SEO audit and implement optimization strategies for a business website.",
    client: {
      id: "c6",
      name: "Robert Taylor",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      country: "United States",
    },
    status: "pending",
    projectType: "hourly",
    priority: "low",
    budget: 0,
    hourlyRate: 60,
    progress: 0,
    startDate: new Date(2025, 0, 20),
    deadline: new Date(2025, 2, 1),
    hoursWorked: 0,
    estimatedHours: 25,
    category: "SEO",
    skills: ["SEO", "Google Analytics", "Keyword Research"],
    lastUpdate: new Date(2025, 0, 18),
    attachments: 3,
    messages: 5,
  },
  {
    id: "7",
    title: "React Native Mobile App",
    description:
      "Develop a cross-platform mobile application for food delivery service.",
    client: {
      id: "c7",
      name: "Sophia Lee",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      country: "Singapore",
    },
    status: "in-progress",
    projectType: "fixed",
    priority: "high",
    budget: 8000,
    progress: 30,
    startDate: new Date(2025, 0, 8),
    deadline: new Date(2025, 2, 10),
    hoursWorked: 35,
    estimatedHours: 120,
    category: "Mobile Development",
    skills: ["React Native", "TypeScript", "Firebase"],
    lastUpdate: new Date(2025, 0, 18),
    attachments: 10,
    messages: 42,
  },
  {
    id: "8",
    title: "Content Writing Package",
    description:
      "Write 10 blog posts on digital marketing topics with SEO optimization.",
    client: {
      id: "c8",
      name: "James Brown",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      country: "Ireland",
    },
    status: "completed",
    projectType: "fixed",
    priority: "medium",
    budget: 1500,
    progress: 100,
    startDate: new Date(2024, 11, 15),
    deadline: new Date(2025, 0, 5),
    completedDate: new Date(2025, 0, 3),
    hoursWorked: 25,
    estimatedHours: 25,
    category: "Content Writing",
    skills: ["Content Writing", "SEO", "Research"],
    lastUpdate: new Date(2025, 0, 3),
    attachments: 11,
    messages: 15,
  },
];

// Status configuration
export const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; icon: string }
> = {
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "🔄",
  },
  completed: {
    label: "Completed",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "✓",
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "⚠️",
  },
  pending: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "⏳",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: "✕",
  },
};

// Priority configuration
export const priorityConfig: Record<
  Priority,
  { label: string; color: string; icon: string }
> = {
  low: {
    label: "Low",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    icon: "⬇️",
  },
  medium: {
    label: "Medium",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "➖",
  },
  high: {
    label: "High",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    icon: "⬆️",
  },
  urgent: {
    label: "Urgent",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "🔥",
  },
};

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getDaysRemaining = (deadline: Date): number => {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (deadline: Date, status: ProjectStatus): boolean => {
  return (
    status !== "completed" &&
    status !== "cancelled" &&
    getDaysRemaining(deadline) < 0
  );
};

// Statistics calculation
export const calculateStats = (projects: WorkstationProject[]) => {
  const inProgress = projects.filter((p) => p.status === "in-progress").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const overdue = projects.filter((p) => p.status === "overdue").length;
  const pending = projects.filter((p) => p.status === "pending").length;

  const totalEarnings = projects
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.budget, 0);

  const activeProjects = projects.filter(
    (p) => p.status === "in-progress" || p.status === "overdue"
  );
  const avgProgress =
    activeProjects.length > 0
      ? Math.round(
          activeProjects.reduce((sum, p) => sum + p.progress, 0) /
            activeProjects.length
        )
      : 0;

  return {
    inProgress,
    completed,
    overdue,
    pending,
    totalEarnings,
    avgProgress,
    total: projects.length,
  };
};

// Filter functions
export const filterProjects = (
  projects: WorkstationProject[],
  filters: {
    status?: ProjectStatus | "all";
    projectType?: ProjectType | "all";
    priority?: Priority | "all";
    searchQuery?: string;
  }
): WorkstationProject[] => {
  return projects.filter((project) => {
    // Status filter
    if (
      filters.status &&
      filters.status !== "all" &&
      project.status !== filters.status
    ) {
      return false;
    }

    // Project type filter
    if (
      filters.projectType &&
      filters.projectType !== "all" &&
      project.projectType !== filters.projectType
    ) {
      return false;
    }

    // Priority filter
    if (
      filters.priority &&
      filters.priority !== "all" &&
      project.priority !== filters.priority
    ) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.client.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    return true;
  });
};
