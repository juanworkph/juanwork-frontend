// ============================================
// Type Definitions for Project Detail Page
// ============================================

/**
 * Bid status type for freelancer bids
 * Represents the current state of a bid in the hiring process
 */
import type { BidStatus } from "./bidding-data";

/**
 * Freelancer information within a bid
 */
export interface FreelancerInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isTopRated: boolean;
}

/**
 * Freelancer bid interface
 * Represents a proposal submitted by a freelancer for a project
 */
export interface FreelancerBid {
  id: string;
  projectId: string;
  freelancer: FreelancerInfo;
  bidAmount: number;
  currency: string;
  deliveryDays: number;
  coverLetter: string;
  status: BidStatus;
  submittedAt: Date;
}

/**
 * Project insights interface
 * Analytics data showing project performance metrics
 */
export interface ProjectInsights {
  totalViews: number;
  proposalsReceived: number;
  averageBidAmount: number;
  currency: string;
}

/**
 * Time remaining interface
 * Countdown timer data for project bidding period
 */
export interface TimeRemaining {
  endDate: Date;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isUrgent: boolean; // Less than 24 hours remaining
}

/**
 * Client information interface
 * Represents the client who posted the project
 */
export interface ClientInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  isVerified: boolean;
  memberSince: Date;
}

// ============================================
// Type Guards
// ============================================

/**
 * Type guard to check if a value is a valid BidStatus
 */
export const isBidStatus = (value: unknown): value is BidStatus => {
  return (
    typeof value === "string" &&
    ["pending", "shortlisted", "lost", "accepted", "rejected", "withdrawn", "expired"].includes(
      value as string
    )
  );
};

/**
 * Type guard to check if an object is a valid FreelancerBid
 */
export const isFreelancerBid = (value: unknown): value is FreelancerBid => {
  if (typeof value !== "object" || value === null) return false;

  const bid = value as Record<string, unknown>;

  return (
    typeof bid.id === "string" &&
    typeof bid.projectId === "string" &&
    typeof bid.freelancer === "object" &&
    bid.freelancer !== null &&
    typeof bid.bidAmount === "number" &&
    typeof bid.currency === "string" &&
    typeof bid.deliveryDays === "number" &&
    typeof bid.coverLetter === "string" &&
    isBidStatus(bid.status) &&
    bid.submittedAt instanceof Date
  );
};

// ============================================
// Helper Functions
// ============================================

/**
 * Get bid status display configuration
 */
export const getBidStatusConfig = (
  status: BidStatus
): { label: string; color: string; icon: string } => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: "⏱️",
      };
    case "shortlisted":
      return {
        label: "Shortlisted",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: "⭐",
      };
    case "lost":
      return {
        label: "Lost",
        color:
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
        icon: "✕",
      };
    case "accepted":
      return {
        label: "Accepted",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: "✓",
      };
    case "rejected":
      return {
        label: "Rejected",
        color:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: "✗",
      };
    default:
      return {
        label: status,
        color:
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
        icon: "•",
      };
  }
};

/**
 * Calculate time remaining from end date
 */
export const calculateTimeRemaining = (endDate: Date): TimeRemaining => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      endDate,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      isUrgent: false,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Urgent if less than 24 hours remaining
  const isUrgent = days === 0 && hours < 24;

  return {
    endDate,
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    isUrgent,
  };
};

/**
 * Format time remaining for display
 */
export const formatTimeRemaining = (timeRemaining: TimeRemaining): string => {
  if (timeRemaining.isExpired) {
    return "Bidding Closed";
  }

  const { days, hours } = timeRemaining;

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return `${hours} hour${hours !== 1 ? "s" : ""}`;
};

/**
 * Format currency amount
 */
export const formatBidAmount = (
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
 * Format relative time (e.g., "2 days ago")
 * Handles both Date objects and date strings
 */
export const formatRelativeTime = (date: Date | string): string => {
  // Handle invalid dates
  if (!date) {
    return 'Unknown';
  }
  
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

/**
 * Filter bids by status
 */
export const filterBidsByStatus = (
  bids: FreelancerBid[],
  status: "all" | BidStatus
): FreelancerBid[] => {
  if (status === "all") {
    return bids;
  }
  return bids.filter((bid) => bid.status === status);
};

/**
 * Sort bids by submission date (newest first)
 * Handles both Date objects and date strings
 */
export const sortBidsByDate = (bids: FreelancerBid[]): FreelancerBid[] => {
  return [...bids].sort((a, b) => {
    // Convert to Date objects if they're strings
    const dateA = typeof a.submittedAt === 'string' ? new Date(a.submittedAt) : a.submittedAt;
    const dateB = typeof b.submittedAt === 'string' ? new Date(b.submittedAt) : b.submittedAt;
    
    // Handle invalid dates by putting them at the end
    const timeA = dateA instanceof Date && !isNaN(dateA.getTime()) ? dateA.getTime() : 0;
    const timeB = dateB instanceof Date && !isNaN(dateB.getTime()) ? dateB.getTime() : 0;
    
    return timeB - timeA;
  });
};

/**
 * Calculate average bid amount from bids array
 */
export const calculateAverageBid = (bids: FreelancerBid[]): number => {
  if (bids.length === 0) return 0;

  const total = bids.reduce((sum, bid) => sum + bid.bidAmount, 0);
  return Math.round(total / bids.length);
};

/**
 * Get bid count by status
 */
export const getBidCountByStatus = (
  bids: FreelancerBid[],
  status: BidStatus
): number => {
  return bids.filter((bid) => bid.status === status).length;
};

/**
 * Validate project insights data
 */
export const validateProjectInsights = (
  insights: ProjectInsights
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (insights.totalViews < 0) {
    errors.push("Total views cannot be negative");
  }
  if (insights.proposalsReceived < 0) {
    errors.push("Proposals received cannot be negative");
  }
  if (insights.averageBidAmount < 0) {
    errors.push("Average bid amount cannot be negative");
  }
  if (!insights.currency || insights.currency.length !== 3) {
    errors.push("Invalid currency code");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// ============================================
// Mock Data for Development
// ============================================

/**
 * Mock freelancer bids data
 * Used for development until backend API is ready
 * 
 * Includes diverse scenarios:
 * - Verified and unverified freelancers
 * - Top-rated and regular freelancers
 * - Various rating levels (0-5 stars)
 * - Different experience levels (review counts)
 * - Range of bid amounts and delivery times
 * - Different bid statuses (pending, shortlisted, interviewed)
 * - Various locations
 */
export const mockFreelancerBids: FreelancerBid[] = [
  {
    id: "bid-1",
    projectId: "1",
    freelancer: {
      id: "freelancer-1",
      name: "Mark Grayson",
      avatar: "/avatars/mark-grayson.jpg",
      location: "Philippines",
      rating: 4.9,
      reviewCount: 127,
      isVerified: true,
      isTopRated: true,
    },
    bidAmount: 750,
    currency: "USD",
    deliveryDays: 5,
    coverLetter:
      "I have extensive experience in building e-commerce platforms with React and Next.js. I've successfully delivered 15+ similar projects with excellent client satisfaction. I can start immediately and deliver within 5 days.",
    status: "shortlisted",
    submittedAt: new Date("2024-01-20T10:30:00"),
  },
  {
    id: "bid-2",
    projectId: "1",
    freelancer: {
      id: "freelancer-2",
      name: "Sarah Chen",
      avatar: "/avatars/sarah-chen.jpg",
      location: "Singapore",
      rating: 4.8,
      reviewCount: 89,
      isVerified: true,
      isTopRated: true,
    },
    bidAmount: 850,
    currency: "USD",
    deliveryDays: 7,
    coverLetter:
      "Hi! I'm a senior full-stack developer with 8+ years of experience. I specialize in React, Next.js, and TypeScript. I've built numerous e-commerce platforms and can deliver a high-quality solution. My portfolio includes work for Fortune 500 companies. Let's discuss your requirements!",
    status: "lost",
    submittedAt: new Date("2024-01-20T08:15:00"),
  },
  {
    id: "bid-3",
    projectId: "1",
    freelancer: {
      id: "freelancer-3",
      name: "Alex Rodriguez",
      avatar: "/avatars/alex-rodriguez.jpg",
      location: "Mexico City, Mexico",
      rating: 4.7,
      reviewCount: 56,
      isVerified: true,
      isTopRated: false,
    },
    bidAmount: 680,
    currency: "USD",
    deliveryDays: 10,
    coverLetter:
      "Hello! I'm a passionate developer with strong expertise in modern web technologies. I've completed 50+ projects with 100% client satisfaction. I offer competitive rates and excellent communication. I'm available to start immediately and can work in your timezone.",
    status: "pending",
    submittedAt: new Date("2024-01-21T09:45:00"),
  },
  {
    id: "bid-4",
    projectId: "1",
    freelancer: {
      id: "freelancer-4",
      name: "Priya Sharma",
      avatar: "/avatars/priya-sharma.jpg",
      location: "Mumbai, India",
      rating: 4.6,
      reviewCount: 43,
      isVerified: true,
      isTopRated: false,
    },
    bidAmount: 550,
    currency: "USD",
    deliveryDays: 12,
    coverLetter:
      "Greetings! I'm a certified React developer with expertise in Next.js, TypeScript, and modern UI frameworks. I have a proven track record of delivering pixel-perfect, responsive applications. I provide daily updates and maintain clear communication throughout the project lifecycle.",
    status: "pending",
    submittedAt: new Date("2024-01-21T11:20:00"),
  },
  {
    id: "bid-5",
    projectId: "1",
    freelancer: {
      id: "freelancer-5",
      name: "James Wilson",
      avatar: "/avatars/james-wilson.jpg",
      location: "London, UK",
      rating: 5.0,
      reviewCount: 234,
      isVerified: true,
      isTopRated: true,
    },
    bidAmount: 1200,
    currency: "USD",
    deliveryDays: 7,
    coverLetter:
      "Good day! I'm a senior software architect with 12+ years of experience in enterprise-level applications. I lead a team of expert developers and can guarantee exceptional quality. My rate reflects premium service, including architecture design, code review, testing, and post-launch support. References available upon request.",
    status: "shortlisted",
    submittedAt: new Date("2024-01-19T16:30:00"),
  },
  {
    id: "bid-6",
    projectId: "1",
    freelancer: {
      id: "freelancer-6",
      name: "Maria Garcia",
      avatar: "/avatars/maria-garcia.jpg",
      location: "Barcelona, Spain",
      rating: 4.5,
      reviewCount: 31,
      isVerified: false,
      isTopRated: false,
    },
    bidAmount: 620,
    currency: "USD",
    deliveryDays: 14,
    coverLetter:
      "Hello! I'm a frontend specialist with a strong focus on user experience and performance optimization. I've worked on several e-commerce projects and understand the importance of conversion-focused design. I'm detail-oriented and committed to delivering clean, maintainable code.",
    status: "pending",
    submittedAt: new Date("2024-01-21T13:50:00"),
  },
  {
    id: "bid-7",
    projectId: "1",
    freelancer: {
      id: "freelancer-7",
      name: "David Kim",
      avatar: "/avatars/david-kim.jpg",
      location: "Seoul, South Korea",
      rating: 4.9,
      reviewCount: 156,
      isVerified: true,
      isTopRated: true,
    },
    bidAmount: 780,
    currency: "USD",
    deliveryDays: 6,
    coverLetter:
      "Hi there! I'm a full-stack developer specializing in React ecosystem. I have extensive experience with Next.js, TypeScript, and modern state management. I've built 20+ e-commerce platforms with features like payment integration, inventory management, and analytics. I guarantee timely delivery and excellent code quality.",
    status: "lost",
    submittedAt: new Date("2024-01-20T07:00:00"),
  },
  {
    id: "bid-8",
    projectId: "1",
    freelancer: {
      id: "freelancer-8",
      name: "Emma Thompson",
      avatar: "/avatars/emma-thompson.jpg",
      location: "Toronto, Canada",
      rating: 4.4,
      reviewCount: 28,
      isVerified: true,
      isTopRated: false,
    },
    bidAmount: 700,
    currency: "USD",
    deliveryDays: 9,
    coverLetter:
      "Hello! I'm a creative developer with a passion for building beautiful, functional web applications. I have experience with React, Next.js, and Tailwind CSS. I focus on writing clean, well-documented code and providing excellent client communication. I'd love to bring your vision to life!",
    status: "pending",
    submittedAt: new Date("2024-01-21T15:30:00"),
  },
  {
    id: "bid-9",
    projectId: "1",
    freelancer: {
      id: "freelancer-9",
      name: "Ahmed Hassan",
      avatar: "/avatars/ahmed-hassan.jpg",
      location: "Dubai, UAE",
      rating: 4.3,
      reviewCount: 19,
      isVerified: false,
      isTopRated: false,
    },
    bidAmount: 580,
    currency: "USD",
    deliveryDays: 15,
    coverLetter:
      "Greetings! I'm an enthusiastic developer eager to take on challenging projects. I have solid skills in React and Next.js, and I'm constantly learning new technologies. I offer competitive pricing and am committed to exceeding your expectations. Let's create something amazing together!",
    status: "pending",
    submittedAt: new Date("2024-01-22T10:15:00"),
  },
  {
    id: "bid-10",
    projectId: "1",
    freelancer: {
      id: "freelancer-10",
      name: "trial trial",
      avatar: "/avatars/trial-trial.jpg",
      location: "Not Set",
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      isTopRated: false,
    },
    bidAmount: 450,
    currency: "USD",
    deliveryDays: 20,
    coverLetter:
      "I'm a new freelancer looking to build my portfolio. I have strong technical skills and am eager to prove myself. I offer competitive pricing and dedicated support throughout the project. I'm willing to work extra hours to ensure your satisfaction and deliver quality work.",
    status: "pending",
    submittedAt: new Date("2024-01-22T14:45:00"),
  },
];

/**
 * Get mock bids for a specific project
 */
export const getMockBidsForProject = (projectId: string): FreelancerBid[] => {
  return mockFreelancerBids.filter((bid) => bid.projectId === projectId);
};

/**
 * Mock project insights data
 * Maps project ID to insights data
 */
export const mockProjectInsights: Record<string, ProjectInsights> = {
  "1": {
    totalViews: 156,
    proposalsReceived: 10,
    averageBidAmount: 716,
    currency: "USD",
  },
  "2": {
    totalViews: 42,
    proposalsReceived: 0,
    averageBidAmount: 0,
    currency: "USD",
  },
  "3": {
    totalViews: 28,
    proposalsReceived: 5,
    averageBidAmount: 1250,
    currency: "USD",
  },
};

/**
 * Get mock insights for a specific project
 */
export const getMockInsightsForProject = (
  projectId: string
): ProjectInsights => {
  return (
    mockProjectInsights[projectId] || {
      totalViews: 0,
      proposalsReceived: 0,
      averageBidAmount: 0,
      currency: "USD",
    }
  );
};

/**
 * Mock time remaining data
 * Maps project ID to end date for bidding period
 */
export const mockTimeRemaining: Record<string, Date> = {
  // Project 1: 4 days 5 hours from now
  "1": new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
  // Project 2: 10 days from now
  "2": new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  // Project 3: 2 days from now (urgent)
  "3": new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  // Project 4: 15 hours from now (very urgent)
  "4": new Date(Date.now() + 15 * 60 * 60 * 1000),
  // Project 5: Already expired (for testing)
  "5": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
};

/**
 * Get mock end date for a specific project
 */
export const getMockEndDateForProject = (projectId: string): Date => {
  return (
    mockTimeRemaining[projectId] ||
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default: 7 days from now
  );
};

/**
 * Get calculated time remaining for a specific project
 */
export const getMockTimeRemainingForProject = (
  projectId: string
): TimeRemaining => {
  const endDate = getMockEndDateForProject(projectId);
  return calculateTimeRemaining(endDate);
};

/**
 * Mock client information data
 * Maps project ID to client information
 */
export const mockClientInfo: Record<string, ClientInfo> = {
  "1": {
    id: "client-1",
    name: "John Doe",
    avatar: "/avatars/john-doe.jpg",
    location: "New York, USA",
    isVerified: true,
    memberSince: new Date("2022-03-15"),
  },
  "2": {
    id: "client-2",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah-johnson.jpg",
    location: "San Francisco, USA",
    isVerified: true,
    memberSince: new Date("2021-08-22"),
  },
  "3": {
    id: "client-3",
    name: "Michael Chen",
    avatar: "/avatars/michael-chen.jpg",
    location: "Singapore",
    isVerified: false,
    memberSince: new Date("2023-01-10"),
  },
  "4": {
    id: "client-4",
    name: "Emma Wilson",
    avatar: "/avatars/emma-wilson.jpg",
    location: "London, UK",
    isVerified: true,
    memberSince: new Date("2020-11-05"),
  },
  "5": {
    id: "client-5",
    name: "David Martinez",
    avatar: "/avatars/david-martinez.jpg",
    location: "Toronto, Canada",
    isVerified: false,
    memberSince: new Date("2023-06-18"),
  },
};

/**
 * Get mock client info for a specific project
 */
export const getMockClientInfoForProject = (projectId: string): ClientInfo => {
  return (
    mockClientInfo[projectId] || {
      id: "client-default",
      name: "Anonymous Client",
      avatar: "/avatars/default.jpg",
      location: "Not Set",
      isVerified: false,
      memberSince: new Date(),
    }
  );
};

/**
 * Format member since date
 */
export const formatMemberSince = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
};
