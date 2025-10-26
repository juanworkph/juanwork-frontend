export type ProposalStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "expired"
  | "withdrawn";
export type ProjectType = "fixed" | "hourly";

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  rating?: number;
  verified: boolean;
  totalSpent?: number;
  projectsPosted?: number;
}

export interface ProjectBudget {
  type: ProjectType;
  min: number;
  max: number;
  currency: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: ProjectBudget;
  skills: string[];
  duration?: string;
  experience?: "entry" | "intermediate" | "expert";
  projectUrl: string;
  postedDate: string;
  proposalDeadline?: string;
  featured?: boolean;
}

export interface Proposal {
  id: string;
  project: Project;
  client: Client;
  status: ProposalStatus;
  proposedAmount: number;
  proposalType: ProjectType;
  coverLetter: string;
  deliveryTime: number;
  submittedAt: string;
  expiresAt?: string;
  clientViewed: boolean;
  clientViewedAt?: string;
  clientMessages?: number;
  lastUpdated?: string;
  isUrgent?: boolean;
  isPinned?: boolean;
}

export interface ProposalsStats {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  expired: number;
  withdrawn: number;
  viewRate: number;
  responseRate: number;
  successRate: number;
}

export interface ProposalsFilters {
  status: ProposalStatus | "all";
  search: string;
  sortBy: "date" | "amount" | "expiry" | "activity";
  sortDirection: "asc" | "desc";
}

export interface ProposalsState {
  proposals: Proposal[];
  stats: ProposalsStats;
  filters: ProposalsFilters;
}

export const mockProposalsData: ProposalsState = {
  proposals: [
    {
      id: "prop-1",
      project: {
        id: "proj-1",
        title: "E-commerce Website Development",
        description:
          "Looking for an experienced developer to build a modern e-commerce platform with React, Node.js, and PostgreSQL.",
        category: "Web Development",
        budget: { type: "fixed", min: 5000, max: 8000, currency: "USD" },
        skills: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
        duration: "2-3 months",
        experience: "expert",
        projectUrl: "/projects/e-commerce-development",
        postedDate: "2024-01-15T10:00:00Z",
        proposalDeadline: "2024-01-22T23:59:59Z",
        featured: true,
      },
      client: {
        id: "client-1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face",
        country: "United States",
        rating: 4.9,
        verified: true,
        totalSpent: 125000,
        projectsPosted: 23,
      },
      status: "pending",
      proposedAmount: 6500,
      proposalType: "fixed",
      coverLetter: "I'm excited to work on your e-commerce platform...",
      deliveryTime: 60,
      submittedAt: "2024-01-16T14:30:00Z",
      expiresAt: "2024-01-22T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-17T09:15:00Z",
      clientMessages: 2,
      lastUpdated: "2024-01-17T16:45:00Z",
      isUrgent: true,
      isPinned: true,
    },
    {
      id: "prop-2",
      project: {
        id: "proj-2",
        title: "Mobile App UI/UX Design",
        description:
          "Need a talented designer to create modern, user-friendly designs for our fitness tracking mobile app.",
        category: "UI/UX Design",
        budget: { type: "hourly", min: 40, max: 60, currency: "USD" },
        skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "Mobile Design"],
        duration: "1-2 months",
        experience: "intermediate",
        projectUrl: "/projects/mobile-app-design",
        postedDate: "2024-01-14T15:30:00Z",
        proposalDeadline: "2024-01-21T23:59:59Z",
      },
      client: {
        id: "client-2",
        name: "Marcus Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        country: "Canada",
        rating: 4.7,
        verified: true,
        totalSpent: 85000,
        projectsPosted: 15,
      },
      status: "accepted",
      proposedAmount: 50,
      proposalType: "hourly",
      coverLetter:
        "Your fitness app design project caught my attention. I specialize in mobile app UI/UX design...",
      deliveryTime: 45,
      submittedAt: "2024-01-15T11:20:00Z",
      expiresAt: "2024-01-21T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-15T16:30:00Z",
      clientMessages: 5,
      lastUpdated: "2024-01-18T10:20:00Z",
    },
    {
      id: "prop-3",
      project: {
        id: "proj-3",
        title: "Content Management System",
        description:
          "We need a custom CMS built with Laravel and Vue.js for our media company.",
        category: "Backend Development",
        budget: { type: "fixed", min: 3000, max: 5000, currency: "USD" },
        skills: ["Laravel", "Vue.js", "MySQL", "PHP", "REST API"],
        duration: "1-2 months",
        experience: "intermediate",
        projectUrl: "/projects/cms-development",
        postedDate: "2024-01-13T09:00:00Z",
        proposalDeadline: "2024-01-20T23:59:59Z",
      },
      client: {
        id: "client-3",
        name: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        country: "Spain",
        rating: 4.8,
        verified: false,
        totalSpent: 45000,
        projectsPosted: 8,
      },
      status: "declined",
      proposedAmount: 4200,
      proposalType: "fixed",
      coverLetter:
        "I have extensive experience with Laravel and Vue.js development...",
      deliveryTime: 35,
      submittedAt: "2024-01-14T08:45:00Z",
      expiresAt: "2024-01-20T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-16T14:20:00Z",
      lastUpdated: "2024-01-17T11:30:00Z",
    },
    {
      id: "prop-4",
      project: {
        id: "proj-4",
        title: "Data Analysis & Visualization",
        description:
          "Looking for a data scientist to analyze our sales data and create interactive dashboards.",
        category: "Data Science",
        budget: { type: "hourly", min: 35, max: 55, currency: "USD" },
        skills: ["Python", "Pandas", "Plotly", "Data Analysis", "SQL"],
        duration: "2-4 weeks",
        experience: "intermediate",
        projectUrl: "/projects/data-analysis",
        postedDate: "2024-01-12T13:15:00Z",
        proposalDeadline: "2024-01-19T23:59:59Z",
      },
      client: {
        id: "client-4",
        name: "David Thompson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        country: "United Kingdom",
        rating: 4.6,
        verified: true,
        totalSpent: 65000,
        projectsPosted: 12,
      },
      status: "pending",
      proposedAmount: 45,
      proposalType: "hourly",
      coverLetter:
        "I'm a data scientist with 4+ years of experience in Python and data visualization...",
      deliveryTime: 21,
      submittedAt: "2024-01-13T16:10:00Z",
      expiresAt: "2024-01-19T23:59:59Z",
      clientViewed: false,
      lastUpdated: "2024-01-13T16:10:00Z",
    },
    {
      id: "prop-5",
      project: {
        id: "proj-5",
        title: "WordPress Theme Customization",
        description:
          "Need help customizing an existing WordPress theme for our business website.",
        category: "WordPress",
        budget: { type: "fixed", min: 800, max: 1200, currency: "USD" },
        skills: ["WordPress", "PHP", "CSS", "JavaScript", "Custom Post Types"],
        duration: "2-3 weeks",
        experience: "entry",
        projectUrl: "/projects/wordpress-customization",
        postedDate: "2024-01-11T11:30:00Z",
        proposalDeadline: "2024-01-18T23:59:59Z",
      },
      client: {
        id: "client-5",
        name: "Lisa Park",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        country: "Australia",
        rating: 4.4,
        verified: true,
        totalSpent: 25000,
        projectsPosted: 6,
      },
      status: "expired",
      proposedAmount: 1000,
      proposalType: "fixed",
      coverLetter:
        "I have experience with WordPress development and theme customization...",
      deliveryTime: 18,
      submittedAt: "2024-01-12T10:15:00Z",
      expiresAt: "2024-01-18T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-14T12:00:00Z",
      lastUpdated: "2024-01-18T23:59:59Z",
    },
  ],
  stats: {
    total: 5,
    pending: 2,
    accepted: 1,
    declined: 1,
    expired: 1,
    withdrawn: 0,
    viewRate: 80,
    responseRate: 60,
    successRate: 20,
  },
  filters: {
    status: "all",
    search: "",
    sortBy: "date",
    sortDirection: "desc",
  },
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

export const getTimeLeft = (expiresAt: string): string => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days}d ${hours}h left`;
  } else if (hours > 0) {
    return `${hours}h left`;
  } else {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
  }
};

export const getStatusColor = (status: ProposalStatus): string => {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    case "accepted":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "declined":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "expired":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    case "withdrawn":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
  }
};

// Mock data for client domain - proposals sent to freelancers
export const mockClientProposalsData: ProposalsState = {
  proposals: [
    {
      id: "client-prop-1",
      project: {
        id: "client-proj-1",
        title: "E-commerce Platform Development",
        description:
          "We need an experienced full-stack developer to build a modern e-commerce platform with React, Node.js, and PostgreSQL. The project includes payment integration, user authentication, and admin dashboard.",
        category: "Web Development",
        budget: { type: "fixed", min: 8000, max: 12000, currency: "USD" },
        skills: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Stripe",
          "AWS",
          "TypeScript",
        ],
        duration: "3-4 months",
        experience: "expert",
        projectUrl: "/projects/e-commerce-platform",
        postedDate: "2024-01-20T10:00:00Z",
        proposalDeadline: "2024-02-05T23:59:59Z",
        featured: true,
      },
      client: {
        id: "freelancer-1",
        name: "Alex Martinez",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        country: "Spain",
        rating: 4.9,
        verified: true,
        totalSpent: 85000,
        projectsPosted: 42,
      },
      status: "pending",
      proposedAmount: 10000,
      proposalType: "fixed",
      coverLetter: "I have 8+ years of experience in full-stack development...",
      deliveryTime: 90,
      submittedAt: "2024-01-21T14:30:00Z",
      expiresAt: "2024-02-05T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-22T09:15:00Z",
      clientMessages: 3,
      lastUpdated: "2024-01-23T16:45:00Z",
      isUrgent: true,
      isPinned: true,
    },
    {
      id: "client-prop-2",
      project: {
        id: "client-proj-2",
        title: "Mobile App UI/UX Redesign",
        description:
          "Looking for a talented UI/UX designer to redesign our existing mobile fitness app. Need modern, user-friendly designs with focus on engagement and retention.",
        category: "UI/UX Design",
        budget: { type: "hourly", min: 50, max: 80, currency: "USD" },
        skills: [
          "Figma",
          "Adobe XD",
          "Prototyping",
          "Mobile Design",
          "User Research",
        ],
        duration: "2-3 months",
        experience: "intermediate",
        projectUrl: "/projects/mobile-app-redesign",
        postedDate: "2024-01-18T15:30:00Z",
        proposalDeadline: "2024-02-03T23:59:59Z",
      },
      client: {
        id: "freelancer-2",
        name: "Jessica Lee",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        country: "Singapore",
        rating: 4.8,
        verified: true,
        totalSpent: 65000,
        projectsPosted: 28,
      },
      status: "accepted",
      proposedAmount: 65,
      proposalType: "hourly",
      coverLetter:
        "I specialize in mobile app UI/UX design with a focus on user engagement...",
      deliveryTime: 60,
      submittedAt: "2024-01-19T11:20:00Z",
      expiresAt: "2024-02-03T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-19T16:30:00Z",
      clientMessages: 8,
      lastUpdated: "2024-01-24T10:20:00Z",
    },
    {
      id: "client-prop-3",
      project: {
        id: "client-proj-3",
        title: "Backend API Development",
        description:
          "Need a skilled backend developer to build RESTful APIs for our SaaS platform using Laravel and MySQL.",
        category: "Backend Development",
        budget: { type: "fixed", min: 4000, max: 6000, currency: "USD" },
        skills: ["Laravel", "MySQL", "PHP", "REST API", "Redis"],
        duration: "1-2 months",
        experience: "intermediate",
        projectUrl: "/projects/backend-api-development",
        postedDate: "2024-01-17T09:00:00Z",
        proposalDeadline: "2024-02-01T23:59:59Z",
      },
      client: {
        id: "freelancer-3",
        name: "Mohammed Hassan",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        country: "Egypt",
        rating: 4.7,
        verified: true,
        totalSpent: 45000,
        projectsPosted: 19,
      },
      status: "declined",
      proposedAmount: 5500,
      proposalType: "fixed",
      coverLetter:
        "I have extensive experience with Laravel and API development...",
      deliveryTime: 45,
      submittedAt: "2024-01-18T08:45:00Z",
      expiresAt: "2024-02-01T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-19T14:20:00Z",
      lastUpdated: "2024-01-20T11:30:00Z",
    },
    {
      id: "client-prop-4",
      project: {
        id: "client-proj-4",
        title: "Data Analytics Dashboard",
        description:
          "Looking for a data scientist to build an interactive analytics dashboard using Python and React. Need experience with data visualization and real-time updates.",
        category: "Data Science",
        budget: { type: "hourly", min: 40, max: 65, currency: "USD" },
        skills: [
          "Python",
          "Pandas",
          "Plotly",
          "React",
          "Data Visualization",
          "SQL",
        ],
        duration: "2-3 weeks",
        experience: "expert",
        projectUrl: "/projects/data-analytics-dashboard",
        postedDate: "2024-01-16T13:15:00Z",
        proposalDeadline: "2024-01-30T23:59:59Z",
      },
      client: {
        id: "freelancer-4",
        name: "Sofia Andersson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        country: "Sweden",
        rating: 4.9,
        verified: true,
        totalSpent: 72000,
        projectsPosted: 31,
      },
      status: "pending",
      proposedAmount: 55,
      proposalType: "hourly",
      coverLetter:
        "I'm a data scientist with 6+ years of experience in Python and data visualization...",
      deliveryTime: 18,
      submittedAt: "2024-01-17T16:10:00Z",
      expiresAt: "2024-01-30T23:59:59Z",
      clientViewed: false,
      lastUpdated: "2024-01-17T16:10:00Z",
    },
    {
      id: "client-prop-5",
      project: {
        id: "client-proj-5",
        title: "WordPress Site Migration",
        description:
          "Need help migrating our WordPress site to a new hosting provider and optimizing performance.",
        category: "WordPress",
        budget: { type: "fixed", min: 1000, max: 1500, currency: "USD" },
        skills: [
          "WordPress",
          "PHP",
          "MySQL",
          "Server Migration",
          "Performance Optimization",
        ],
        duration: "1-2 weeks",
        experience: "entry",
        projectUrl: "/projects/wordpress-migration",
        postedDate: "2024-01-15T11:30:00Z",
        proposalDeadline: "2024-01-29T23:59:59Z",
      },
      client: {
        id: "freelancer-5",
        name: "Carlos Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        country: "Mexico",
        rating: 4.6,
        verified: false,
        totalSpent: 28000,
        projectsPosted: 12,
      },
      status: "expired",
      proposedAmount: 1200,
      proposalType: "fixed",
      coverLetter:
        "I have experience with WordPress migrations and performance optimization...",
      deliveryTime: 10,
      submittedAt: "2024-01-16T10:15:00Z",
      expiresAt: "2024-01-29T23:59:59Z",
      clientViewed: true,
      clientViewedAt: "2024-01-17T12:00:00Z",
      lastUpdated: "2024-01-29T23:59:59Z",
    },
  ],
  stats: {
    total: 5,
    pending: 2,
    accepted: 1,
    declined: 1,
    expired: 1,
    withdrawn: 0,
    viewRate: 80,
    responseRate: 60,
    successRate: 20,
  },
  filters: {
    status: "all",
    search: "",
    sortBy: "date",
    sortDirection: "desc",
  },
};
