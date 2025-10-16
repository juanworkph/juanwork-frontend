export type ProjectType = "fixed" | "hourly";
export type ExperienceLevel = "entry" | "intermediate" | "expert";
export type ProjectDuration =
  | "less-than-1-month"
  | "1-3-months"
  | "3-6-months"
  | "more-than-6-months";

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  countryCode: string;
  rating?: number;
  reviewsCount?: number;
  verified: boolean;
  totalSpent?: number;
  hireRate?: number;
  jobsPosted?: number;
  memberSince?: string;
}

export interface Budget {
  type: ProjectType;
  min?: number;
  max?: number;
  hourlyRate?: number;
  currency: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budget: Budget;
  client: Client;
  experienceLevel: ExperienceLevel;
  duration: ProjectDuration;
  postedDate: string;
  deadline?: string;
  proposalsCount: number;
  isFeatured: boolean;
  isUrgent: boolean;
  location?: string;
  projectUrl: string;
  attachments?: number;
}

export interface FindWorkFilters {
  search: string;
  category: string;
  budgetRange: {
    min: number;
    max: number;
  };
  projectType: ProjectType | "all";
  skills: string[];
  experienceLevel: ExperienceLevel | "all";
  duration: ProjectDuration | "all";
  location: string;
  sortBy: "newest" | "budget-high" | "budget-low" | "proposals";
}

export interface FindWorkState {
  projects: Project[];
  filters: FindWorkFilters;
  totalProjects: number;
}

// Helper functions
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

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const getExperienceLevelLabel = (level: ExperienceLevel): string => {
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

export const getDurationLabel = (duration: ProjectDuration): string => {
  switch (duration) {
    case "less-than-1-month":
      return "Less than 1 month";
    case "1-3-months":
      return "1-3 months";
    case "3-6-months":
      return "3-6 months";
    case "more-than-6-months":
      return "More than 6 months";
    default:
      return duration;
  }
};

// Available skills for filtering
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
];

// Available categories
export const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "WordPress",
  "E-commerce",
  "Content Writing",
  "Marketing",
];

// Mock data
export const mockFindWorkData: FindWorkState = {
  projects: [
    {
      id: "1",
      title: "Modern E-commerce Website with Next.js",
      description:
        "Looking for an experienced Next.js developer to build a fully responsive e-commerce platform. Must have experience with Stripe integration, user authentication, and product management systems. The project includes building a custom admin dashboard and implementing advanced filtering features.",
      category: "Web Development",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      budget: {
        type: "fixed",
        min: 3000,
        max: 5000,
        currency: "USD",
      },
      client: {
        id: "c1",
        name: "Sarah Mitchell",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        country: "United States",
        countryCode: "US",
        rating: 4.9,
        reviewsCount: 47,
        verified: true,
        totalSpent: 25000,
        hireRate: 95,
        jobsPosted: 23,
      },
      experienceLevel: "expert",
      duration: "1-3-months",
      postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 12,
      isFeatured: true,
      isUrgent: true,
      projectUrl: "/projects/1",
      attachments: 3,
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design for Fitness Platform",
      description:
        "Need a talented UI/UX designer to create mockups and prototypes for a fitness tracking mobile application. Should include onboarding screens, workout tracking, progress dashboards, and social features.",
      category: "UI/UX Design",
      skills: ["Figma", "UI/UX Design", "Adobe XD", "Prototyping"],
      budget: {
        type: "hourly",
        hourlyRate: 45,
        currency: "USD",
      },
      client: {
        id: "c2",
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        country: "Canada",
        countryCode: "CA",
        rating: 4.8,
        reviewsCount: 31,
        verified: true,
        totalSpent: 15000,
        hireRate: 88,
        jobsPosted: 15,
      },
      experienceLevel: "intermediate",
      duration: "less-than-1-month",
      postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 8,
      isFeatured: false,
      isUrgent: false,
      projectUrl: "/projects/2",
    },
    {
      id: "3",
      title: "Python Django REST API Development",
      description:
        "Seeking a Python developer to build a RESTful API using Django. The API will handle user authentication, data management, and third-party integrations. Must be familiar with PostgreSQL and have experience with API documentation.",
      category: "Backend Development",
      skills: ["Python", "Django", "PostgreSQL", "REST API"],
      budget: {
        type: "fixed",
        min: 2000,
        max: 3500,
        currency: "USD",
      },
      client: {
        id: "c3",
        name: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        country: "Spain",
        countryCode: "ES",
        rating: 5.0,
        reviewsCount: 18,
        verified: true,
        totalSpent: 12000,
        hireRate: 92,
        jobsPosted: 10,
      },
      experienceLevel: "intermediate",
      duration: "1-3-months",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 15,
      isFeatured: true,
      isUrgent: false,
      projectUrl: "/projects/3",
      attachments: 2,
    },
    {
      id: "4",
      title: "WordPress Custom Theme Development",
      description:
        "Need a WordPress developer to create a custom theme based on provided Figma designs. The theme should be fully responsive, SEO-optimized, and include custom post types and ACF integration.",
      category: "WordPress",
      skills: ["WordPress", "PHP", "CSS", "JavaScript"],
      budget: {
        type: "fixed",
        min: 800,
        max: 1500,
        currency: "USD",
      },
      client: {
        id: "c4",
        name: "David Thompson",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        country: "United Kingdom",
        countryCode: "GB",
        rating: 4.7,
        reviewsCount: 25,
        verified: false,
        totalSpent: 8000,
        hireRate: 85,
        jobsPosted: 12,
      },
      experienceLevel: "intermediate",
      duration: "less-than-1-month",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 22,
      isFeatured: false,
      isUrgent: true,
      projectUrl: "/projects/4",
    },
    {
      id: "5",
      title: "React Native Mobile App Development",
      description:
        "Looking for a React Native developer to build a cross-platform mobile app for food delivery. Features include real-time tracking, payment integration, push notifications, and user reviews.",
      category: "Mobile Development",
      skills: ["React", "React Native", "TypeScript", "Firebase"],
      budget: {
        type: "hourly",
        hourlyRate: 55,
        currency: "USD",
      },
      client: {
        id: "c5",
        name: "Lisa Wang",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        country: "Singapore",
        countryCode: "SG",
        rating: 4.9,
        reviewsCount: 52,
        verified: true,
        totalSpent: 45000,
        hireRate: 97,
        jobsPosted: 35,
      },
      experienceLevel: "expert",
      duration: "3-6-months",
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 18,
      isFeatured: true,
      isUrgent: false,
      projectUrl: "/projects/5",
      attachments: 5,
    },
    {
      id: "6",
      title: "Logo and Brand Identity Design",
      description:
        "Startup company looking for a creative designer to develop a complete brand identity including logo, color palette, typography, and brand guidelines. Should deliver in multiple formats.",
      category: "Graphic Design",
      skills: ["Illustrator", "Photoshop", "UI/UX Design"],
      budget: {
        type: "fixed",
        min: 500,
        max: 1000,
        currency: "USD",
      },
      client: {
        id: "c6",
        name: "James Peterson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        country: "Australia",
        countryCode: "AU",
        rating: 4.6,
        reviewsCount: 14,
        verified: true,
        totalSpent: 5000,
        hireRate: 80,
        jobsPosted: 8,
      },
      experienceLevel: "intermediate",
      duration: "less-than-1-month",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 31,
      isFeatured: false,
      isUrgent: false,
      projectUrl: "/projects/6",
    },
    {
      id: "7",
      title: "Full Stack Developer for SaaS Platform",
      description:
        "Seeking an experienced full-stack developer to build a SaaS platform from scratch. Tech stack: Next.js, Node.js, PostgreSQL, AWS. Long-term project with potential for ongoing maintenance.",
      category: "Full Stack Development",
      skills: ["Next.js", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
      budget: {
        type: "hourly",
        hourlyRate: 70,
        currency: "USD",
      },
      client: {
        id: "c7",
        name: "Robert Kim",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        country: "South Korea",
        countryCode: "KR",
        rating: 4.8,
        reviewsCount: 29,
        verified: true,
        totalSpent: 32000,
        hireRate: 90,
        jobsPosted: 18,
      },
      experienceLevel: "expert",
      duration: "more-than-6-months",
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 25,
      isFeatured: true,
      isUrgent: true,
      projectUrl: "/projects/7",
      attachments: 4,
    },
    {
      id: "8",
      title: "Vue.js E-learning Platform Development",
      description:
        "Building an e-learning platform with Vue.js. Need developer to implement course management, video streaming, quiz system, and student progress tracking. Clean code and documentation required.",
      category: "Web Development",
      skills: ["Vue.js", "JavaScript", "Node.js", "MongoDB"],
      budget: {
        type: "fixed",
        min: 4000,
        max: 6000,
        currency: "USD",
      },
      client: {
        id: "c8",
        name: "Maria Garcia",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        country: "Mexico",
        countryCode: "MX",
        rating: 4.7,
        reviewsCount: 21,
        verified: true,
        totalSpent: 18000,
        hireRate: 87,
        jobsPosted: 14,
      },
      experienceLevel: "expert",
      duration: "3-6-months",
      postedDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 9,
      isFeatured: false,
      isUrgent: false,
      projectUrl: "/projects/8",
    },
    {
      id: "9",
      title: "Data Visualization Dashboard with D3.js",
      description:
        "Looking for a frontend developer skilled in D3.js to create interactive data visualizations and dashboards. Project includes charts, graphs, and real-time data updates.",
      category: "Data Science",
      skills: ["JavaScript", "D3.js", "React", "TypeScript"],
      budget: {
        type: "hourly",
        hourlyRate: 50,
        currency: "USD",
      },
      client: {
        id: "c9",
        name: "Jennifer Lee",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        country: "United States",
        countryCode: "US",
        rating: 4.9,
        reviewsCount: 38,
        verified: true,
        totalSpent: 28000,
        hireRate: 94,
        jobsPosted: 22,
      },
      experienceLevel: "intermediate",
      duration: "1-3-months",
      postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 14,
      isFeatured: false,
      isUrgent: false,
      projectUrl: "/projects/9",
    },
    {
      id: "10",
      title: "DevOps Engineer for CI/CD Pipeline Setup",
      description:
        "Need a DevOps engineer to set up CI/CD pipelines using GitHub Actions, configure AWS infrastructure, implement Docker containers, and establish monitoring systems.",
      category: "DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      budget: {
        type: "fixed",
        min: 2500,
        max: 4000,
        currency: "USD",
      },
      client: {
        id: "c10",
        name: "Thomas Anderson",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        country: "Germany",
        countryCode: "DE",
        rating: 4.8,
        reviewsCount: 16,
        verified: true,
        totalSpent: 22000,
        hireRate: 91,
        jobsPosted: 13,
      },
      experienceLevel: "expert",
      duration: "1-3-months",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      proposalsCount: 11,
      isFeatured: true,
      isUrgent: false,
      projectUrl: "/projects/10",
      attachments: 1,
    },
  ],
  filters: {
    search: "",
    category: "All Categories",
    budgetRange: {
      min: 0,
      max: 10000,
    },
    projectType: "all",
    skills: [],
    experienceLevel: "all",
    duration: "all",
    location: "",
    sortBy: "newest",
  },
  totalProjects: 10,
};
