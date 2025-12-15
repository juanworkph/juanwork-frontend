export type ProjectFilterStatus =
  | "all"
  | "open"
  | "in-progress"
  | "completed"
  | "closed"
  | "draft";
export type MyProjectStatus =
  | "open"
  | "in-progress"
  | "completed"
  | "closed"
  | "draft";

export interface MyProject {
  id: string;
  projectTitle: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: "fixed" | "hourly";
  budget: {
    min: number;
    max: number;
    hourlyRate?: number;
  };
  status: MyProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  proposalsCount: number;
  hiredCount: number;
  duration: "short" | "medium" | "long";
  experienceLevel: "entry" | "intermediate" | "expert";
  upgrades: string[];
}

// Mock data for projects
export const mockMyProjects: MyProject[] = [
  {
    id: "1",
    projectTitle: "E-commerce Website Development",
    description:
      "Need a full-featured e-commerce website with product catalog, shopping cart, payment integration, and admin panel. Should be responsive and SEO-friendly.",
    category: "Web Development",
    skills: ["React", "Next.js", "Node.js", "Stripe", "MongoDB"],
    budgetType: "fixed",
    budget: {
      min: 3000,
      max: 6000,
    },
    status: "open",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-28"),
    proposalsCount: 15,
    hiredCount: 0,
    duration: "long",
    experienceLevel: "expert",
    upgrades: ["featured", "urgent"],
  },
  {
    id: "2",
    projectTitle: "Mobile App for Fitness Tracking",
    description:
      "Looking for an experienced React Native developer to build a cross-platform fitness tracking app with workout plans, progress tracking, and social features.",
    category: "Mobile Development",
    skills: ["React Native", "Firebase", "Redux", "iOS", "Android"],
    budgetType: "hourly",
    budget: {
      min: 0,
      max: 0,
      hourlyRate: 60,
    },
    status: "in-progress",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-27"),
    proposalsCount: 22,
    hiredCount: 1,
    duration: "medium",
    experienceLevel: "intermediate",
    upgrades: ["nda"],
  },
  {
    id: "3",
    projectTitle: "UI/UX Redesign for SaaS Platform",
    description:
      "Need a talented UI/UX designer to redesign our existing SaaS platform. Must include wireframes, high-fidelity mockups, and interactive prototypes.",
    category: "UI/UX Design",
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
    budgetType: "fixed",
    budget: {
      min: 1500,
      max: 3000,
    },
    status: "open",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-26"),
    proposalsCount: 18,
    hiredCount: 0,
    duration: "short",
    experienceLevel: "expert",
    upgrades: ["featured"],
  },
  {
    id: "4",
    projectTitle: "Data Analytics Dashboard Development",
    description:
      "Seeking a Python developer to build a data analytics dashboard using Django and modern visualization libraries. Should connect to our existing database.",
    category: "Data Science",
    skills: ["Python", "Django", "PostgreSQL", "D3.js", "Data Visualization"],
    budgetType: "fixed",
    budget: {
      min: 2500,
      max: 4500,
    },
    status: "completed",
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2024-01-15"),
    proposalsCount: 12,
    hiredCount: 1,
    duration: "medium",
    experienceLevel: "expert",
    upgrades: [],
  },
  {
    id: "5",
    projectTitle: "WordPress Plugin Development",
    description:
      "Need a custom WordPress plugin for advanced booking functionality. Must integrate with WooCommerce and include payment processing.",
    category: "WordPress",
    skills: ["WordPress", "PHP", "WooCommerce", "JavaScript", "MySQL"],
    budgetType: "fixed",
    budget: {
      min: 1200,
      max: 2500,
    },
    status: "in-progress",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
    proposalsCount: 9,
    hiredCount: 1,
    duration: "short",
    experienceLevel: "intermediate",
    upgrades: ["sealed"],
  },
  {
    id: "6",
    projectTitle: "DevOps Infrastructure Setup",
    description:
      "Looking for DevOps engineer to set up CI/CD pipelines, containerization with Docker, and Kubernetes orchestration for our microservices architecture.",
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
    budgetType: "hourly",
    budget: {
      min: 0,
      max: 0,
      hourlyRate: 80,
    },
    status: "open",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
    proposalsCount: 7,
    hiredCount: 0,
    duration: "medium",
    experienceLevel: "expert",
    upgrades: ["urgent"],
  },
  {
    id: "7",
    projectTitle: "Brand Identity and Logo Design",
    description:
      "Startup looking for a creative designer to develop complete brand identity including logo, color palette, typography, and brand guidelines.",
    category: "Graphic Design",
    skills: ["Illustrator", "Photoshop", "Brand Identity", "Logo Design"],
    budgetType: "fixed",
    budget: {
      min: 800,
      max: 1500,
    },
    status: "closed",
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2024-01-10"),
    proposalsCount: 24,
    hiredCount: 1,
    duration: "short",
    experienceLevel: "intermediate",
    upgrades: [],
  },
  {
    id: "8",
    projectTitle: "API Integration and Backend Development",
    description:
      "Need a backend developer to build RESTful APIs and integrate third-party services. Node.js and Express experience required.",
    category: "Backend Development",
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
    budgetType: "fixed",
    budget: {
      min: 2000,
      max: 4000,
    },
    status: "draft",
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28"),
    proposalsCount: 0,
    hiredCount: 0,
    duration: "medium",
    experienceLevel: "intermediate",
    upgrades: [],
  },
];

// Status badge configurations
export const projectStatusConfig = {
  open: {
    label: "Open",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "🟢",
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "⏳",
  },
  completed: {
    label: "Completed",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    icon: "✓",
  },
  closed: {
    label: "Closed",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: "🔒",
  },
  draft: {
    label: "Draft",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "📝",
  },
};

// Filter options
export const projectFilterOptions: {
  value: ProjectFilterStatus;
  label: string;
}[] = [
  { value: "all", label: "All Projects" },
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
  { value: "draft", label: "Drafts" },
];

// Helper functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

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

export const getProjectsByStatus = (
  projects: MyProject[],
  status: ProjectFilterStatus
): MyProject[] => {
  if (status === "all") {
    return projects;
  }
  return projects.filter((project) => project.status === status);
};

export const getDurationLabel = (
  duration: "short" | "medium" | "long"
): string => {
  switch (duration) {
    case "short":
      return "1-3 months";
    case "medium":
      return "3-6 months";
    case "long":
      return "6+ months";
    default:
      return duration;
  }
};

export const getExperienceLevelLabel = (
  level: "entry" | "intermediate" | "expert"
): string => {
  switch (level) {
    case "entry":
      return "Entry Level";
    case "intermediate":
      return "Intermediate";
    case "expert":
      return "Expert";
    default:
      return level;
  }
};
