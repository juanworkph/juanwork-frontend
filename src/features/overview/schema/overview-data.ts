export type TaskStatus = "todo" | "in-progress" | "completed" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type MemberRole =
  | "project-manager"
  | "developer"
  | "designer"
  | "client";

export interface ProjectMember {
  id: string;
  name: string;
  role: MemberRole;
  avatar?: string;
  email: string;
  isOnline: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: ProjectMember;
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface ProjectNote {
  id: string;
  content: string;
  author: ProjectMember;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: ProjectMember;
  uploadedAt: Date;
  url: string;
}

export interface ProjectMilestone {
  id: string;
  name: string;
  progress: number;
  dueDate: Date;
  status: "pending" | "in-progress" | "completed";
}

export interface ProjectOverview {
  id: string;
  name: string;
  description: string;
  client: {
    name: string;
    company: string;
    avatar?: string;
    email: string;
  };
  budget: {
    amount: number;
    spent: number;
    currency: string;
  };
  deadline: Date;
  startDate: Date;
  status: "active" | "completed" | "on-hold" | "cancelled";
  category: string;
  progress: number;
  members: ProjectMember[];
  tasks: ProjectTask[];
  notes: ProjectNote[];
  files: ProjectFile[];
  milestones: ProjectMilestone[];
}

// Helper functions
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const getFileIcon = (type: string): string => {
  if (type.includes("image")) return "🖼️";
  if (type.includes("pdf")) return "📄";
  if (type.includes("document") || type.includes("word")) return "📝";
  if (type.includes("spreadsheet") || type.includes("excel")) return "📊";
  if (type.includes("presentation")) return "📽️";
  if (type.includes("video")) return "🎥";
  if (type.includes("audio")) return "🎵";
  if (type.includes("zip") || type.includes("compressed")) return "📦";
  return "📎";
};

export const taskStatusConfig: Record<
  TaskStatus,
  { label: string; color: string; icon: string }
> = {
  todo: {
    label: "To Do",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    icon: "⭕",
  },
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
  blocked: {
    label: "Blocked",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "🚫",
  },
};

export const taskPriorityConfig: Record<
  TaskPriority,
  { label: string; color: string; icon: string }
> = {
  low: {
    label: "Low",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    icon: "⬇️",
  },
  medium: {
    label: "Medium",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "➡️",
  },
  high: {
    label: "High",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: "⬆️",
  },
  urgent: {
    label: "Urgent",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: "🔥",
  },
};

export const roleConfig: Record<MemberRole, { label: string; color: string }> =
  {
    "project-manager": {
      label: "Project Manager",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    },
    developer: {
      label: "Developer",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    designer: {
      label: "Designer",
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    },
    client: {
      label: "Client",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
  };

// Mock Data
const mockMembers: ProjectMember[] = [
  {
    id: "m1",
    name: "Sarah Johnson",
    role: "project-manager",
    email: "sarah.j@company.com",
    isOnline: true,
  },
  {
    id: "m2",
    name: "Mike Chen",
    role: "developer",
    email: "mike.c@company.com",
    isOnline: true,
  },
  {
    id: "m3",
    name: "Emma Davis",
    role: "designer",
    email: "emma.d@company.com",
    isOnline: false,
  },
  {
    id: "m4",
    name: "John Smith",
    role: "client",
    email: "john.smith@clientcompany.com",
    isOnline: false,
  },
];

export const mockProjectOverview: ProjectOverview = {
  id: "proj-001",
  name: "E-Commerce Website Redesign",
  description:
    "Complete redesign and development of the e-commerce platform with modern UI/UX, improved performance, and new features including AI-powered product recommendations and seamless checkout experience.",
  client: {
    name: "John Smith",
    company: "TechCorp Inc.",
    email: "john.smith@techcorp.com",
  },
  budget: {
    amount: 45000,
    spent: 28500,
    currency: "USD",
  },
  deadline: new Date("2025-12-15"),
  startDate: new Date("2025-09-01"),
  status: "active",
  category: "Web Development",
  progress: 63,
  members: mockMembers,
  tasks: [
    {
      id: "t1",
      title: "Design Homepage Mockup",
      description: "Create high-fidelity mockup for the new homepage design",
      status: "completed",
      priority: "high",
      assignee: mockMembers[2],
      dueDate: new Date("2025-10-25"),
      completedAt: new Date("2025-10-24"),
      createdAt: new Date("2025-10-15"),
    },
    {
      id: "t2",
      title: "Implement Product Catalog API",
      description:
        "Build RESTful API for product catalog with filtering and search",
      status: "in-progress",
      priority: "urgent",
      assignee: mockMembers[1],
      dueDate: new Date("2025-10-28"),
      createdAt: new Date("2025-10-18"),
    },
    {
      id: "t3",
      title: "Set up Payment Gateway",
      description: "Integrate Stripe payment gateway with checkout flow",
      status: "in-progress",
      priority: "high",
      assignee: mockMembers[1],
      dueDate: new Date("2025-11-05"),
      createdAt: new Date("2025-10-20"),
    },
    {
      id: "t4",
      title: "User Authentication System",
      description: "Implement secure user authentication with OAuth support",
      status: "todo",
      priority: "medium",
      assignee: mockMembers[1],
      dueDate: new Date("2025-11-10"),
      createdAt: new Date("2025-10-22"),
    },
    {
      id: "t5",
      title: "Mobile Responsive Design",
      description: "Ensure all pages are fully responsive on mobile devices",
      status: "todo",
      priority: "high",
      assignee: mockMembers[2],
      dueDate: new Date("2025-11-15"),
      createdAt: new Date("2025-10-22"),
    },
    {
      id: "t6",
      title: "Performance Optimization",
      description: "Optimize images, lazy loading, and code splitting",
      status: "blocked",
      priority: "medium",
      assignee: mockMembers[1],
      dueDate: new Date("2025-11-20"),
      createdAt: new Date("2025-10-23"),
    },
  ],
  notes: [
    {
      id: "n1",
      content:
        "Client requested to add a wishlist feature. Will need to update scope and timeline.",
      author: mockMembers[0],
      createdAt: new Date("2025-10-22T10:30:00"),
    },
    {
      id: "n2",
      content:
        "Payment gateway integration is taking longer than expected due to compliance requirements. May need an additional week.",
      author: mockMembers[1],
      createdAt: new Date("2025-10-23T14:15:00"),
    },
    {
      id: "n3",
      content:
        "Homepage mockup approved by client with minor color adjustments. Moving to development phase.",
      author: mockMembers[2],
      createdAt: new Date("2025-10-24T09:00:00"),
    },
  ],
  files: [
    {
      id: "f1",
      name: "Homepage-Mockup-v3.fig",
      type: "application/figma",
      size: 4500000,
      uploadedBy: mockMembers[2],
      uploadedAt: new Date("2025-10-24T08:45:00"),
      url: "#",
    },
    {
      id: "f2",
      name: "Project-Requirements.pdf",
      type: "application/pdf",
      size: 850000,
      uploadedBy: mockMembers[0],
      uploadedAt: new Date("2025-10-15T11:20:00"),
      url: "#",
    },
    {
      id: "f3",
      name: "API-Documentation.docx",
      type: "application/document",
      size: 1200000,
      uploadedBy: mockMembers[1],
      uploadedAt: new Date("2025-10-20T16:30:00"),
      url: "#",
    },
    {
      id: "f4",
      name: "Brand-Guidelines.pdf",
      type: "application/pdf",
      size: 3200000,
      uploadedBy: mockMembers[3],
      uploadedAt: new Date("2025-10-16T10:00:00"),
      url: "#",
    },
    {
      id: "f5",
      name: "Product-Images.zip",
      type: "application/zip",
      size: 25600000,
      uploadedBy: mockMembers[2],
      uploadedAt: new Date("2025-10-21T13:45:00"),
      url: "#",
    },
  ],
  milestones: [
    {
      id: "ms1",
      name: "Design Phase",
      progress: 100,
      dueDate: new Date("2025-10-25"),
      status: "completed",
    },
    {
      id: "ms2",
      name: "Backend Development",
      progress: 70,
      dueDate: new Date("2025-11-10"),
      status: "in-progress",
    },
    {
      id: "ms3",
      name: "Frontend Development",
      progress: 45,
      dueDate: new Date("2025-11-25"),
      status: "in-progress",
    },
    {
      id: "ms4",
      name: "Testing & QA",
      progress: 0,
      dueDate: new Date("2025-12-05"),
      status: "pending",
    },
    {
      id: "ms5",
      name: "Deployment",
      progress: 0,
      dueDate: new Date("2025-12-15"),
      status: "pending",
    },
  ],
};

// Calculate task stats
export const calculateTaskStats = (
  tasks: ProjectTask[],
  currentUserId: string
) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const assignedToMe = tasks.filter(
    (t) => t.assignee.id === currentUserId
  ).length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const overdue = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < new Date()
  ).length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;

  return {
    total,
    completed,
    assignedToMe,
    inProgress,
    overdue,
    blocked,
  };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
