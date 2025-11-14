import { ProjectDetails } from "./projects-data"

// Enhanced mock data for project details view with attachments and proposal statistics
export const mockProjectDetails: ProjectDetails = {
  id: "1",
  name: "E-commerce Website Redesign",
  description:
    "We are looking for an experienced web developer to completely redesign our e-commerce website. The project involves creating a modern, responsive design with improved user experience and conversion optimization.\n\nKey requirements:\n- Modern UI/UX design following current best practices\n- Mobile-first responsive design\n- Integration with existing backend API\n- Performance optimization\n- SEO-friendly implementation\n- Cross-browser compatibility\n\nThe ideal candidate should have:\n- Strong portfolio of e-commerce projects\n- Experience with React and Next.js\n- Understanding of conversion rate optimization\n- Excellent communication skills",
  category: "Web Development",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
  status: "active",
  priority: "high",
  client: {
    id: "client1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face",
    country: "United States",
    countryCode: "US",
    verified: true,
    rating: 4.9,
    totalProjects: 23,
    responseTime: "2 hours",
    lastActive: "1 hour ago",
  },
  budget: {
    type: "fixed",
    amount: 4500,
    currency: "USD",
  },
  progress: {
    completedTasks: 12,
    totalTasks: 18,
    completedMilestones: 2,
    totalMilestones: 4,
    progressPercentage: 67,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-02-28T23:59:59Z",
    deliveryDays: 45,
    hoursLeft: 168,
    isOverdue: false,
  },
  projectUrl: "/projects/1",
  createdAt: "2024-01-15T08:00:00Z",
  updatedAt: new Date().toISOString(),
  startedAt: "2024-01-16T09:00:00Z",
  isPinned: true,
  hasUnreadMessages: true,
  messageCount: 3,
  attachmentCount: 3,
  experienceLevel: "intermediate",
  duration: "6 weeks",
  attachments: [
    {
      id: "att1",
      name: "design-mockups.pdf",
      size: 2458624, // ~2.4 MB
      type: "application/pdf",
      url: "/attachments/design-mockups.pdf",
      uploadedAt: "2024-01-15T08:30:00Z",
    },
    {
      id: "att2",
      name: "brand-guidelines.pdf",
      size: 1048576, // 1 MB
      type: "application/pdf",
      url: "/attachments/brand-guidelines.pdf",
      uploadedAt: "2024-01-15T08:30:00Z",
    },
    {
      id: "att3",
      name: "current-site-analytics.xlsx",
      size: 524288, // 512 KB
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      url: "/attachments/current-site-analytics.xlsx",
      uploadedAt: "2024-01-15T08:30:00Z",
    },
  ],
  proposalStats: {
    totalProposals: 15,
    averageBid: 4200,
    lowestBid: 3500,
    highestBid: 5500,
    averageDeliveryTime: 42,
  },
  clientDetails: {
    id: "client1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face",
    country: "United States",
    countryCode: "US",
    verified: true,
    rating: 4.9,
    totalProjects: 23,
    responseTime: "2 hours",
    lastActive: "1 hour ago",
    totalHires: 18,
    paymentVerified: true,
    memberSince: "2022-03-15T00:00:00Z",
    responseRate: 95,
    reviewCount: 21,
  },
}

// Mock data for hourly project
export const mockHourlyProjectDetails: ProjectDetails = {
  id: "2",
  name: "Mobile App Development",
  description:
    "Cross-platform mobile application for food delivery service with real-time tracking and payment integration.\n\nProject scope includes:\n- User authentication and profile management\n- Restaurant browsing and search\n- Real-time order tracking with GPS\n- Payment gateway integration (Stripe)\n- Push notifications\n- Admin dashboard\n\nTechnical requirements:\n- React Native for cross-platform development\n- Firebase for backend services\n- Google Maps API integration\n- Clean, maintainable code\n- Comprehensive documentation",
  category: "Mobile Development",
  skills: ["React Native", "Firebase", "Stripe API", "Google Maps"],
  status: "active",
  priority: "urgent",
  client: {
    id: "client2",
    name: "Ahmed Hassan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    country: "United Arab Emirates",
    countryCode: "AE",
    verified: true,
    rating: 4.8,
    totalProjects: 15,
    responseTime: "1 hour",
    lastActive: "30 minutes ago",
  },
  budget: {
    type: "hourly",
    amount: 3600,
    currency: "USD",
    hourlyRate: 45,
    estimatedHours: 80,
  },
  progress: {
    completedTasks: 8,
    totalTasks: 24,
    completedMilestones: 1,
    totalMilestones: 6,
    progressPercentage: 33,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  deadline: {
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-03-15T23:59:59Z",
    deliveryDays: 42,
    hoursLeft: 72,
    isOverdue: false,
  },
  projectUrl: "/projects/2",
  createdAt: "2024-02-01T10:00:00Z",
  updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  startedAt: "2024-02-02T08:30:00Z",
  isUrgent: true,
  hasUnreadMessages: true,
  messageCount: 7,
  attachmentCount: 2,
  experienceLevel: "expert",
  duration: "10-12 weeks",
  attachments: [
    {
      id: "att4",
      name: "app-wireframes.fig",
      size: 3145728, // 3 MB
      type: "application/octet-stream",
      url: "/attachments/app-wireframes.fig",
      uploadedAt: "2024-02-01T10:15:00Z",
    },
    {
      id: "att5",
      name: "api-documentation.pdf",
      size: 1572864, // ~1.5 MB
      type: "application/pdf",
      url: "/attachments/api-documentation.pdf",
      uploadedAt: "2024-02-01T10:15:00Z",
    },
  ],
  proposalStats: {
    totalProposals: 28,
    averageBid: 48,
    lowestBid: 35,
    highestBid: 65,
    averageDeliveryTime: 75,
  },
  clientDetails: {
    id: "client2",
    name: "Ahmed Hassan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    country: "United Arab Emirates",
    countryCode: "AE",
    verified: true,
    rating: 4.8,
    totalProjects: 15,
    responseTime: "1 hour",
    lastActive: "30 minutes ago",
    totalHires: 12,
    paymentVerified: true,
    memberSince: "2023-01-10T00:00:00Z",
    responseRate: 92,
    reviewCount: 14,
  },
}

// Mock data for project with no proposals
export const mockNewProjectDetails: ProjectDetails = {
  id: "5",
  name: "API Integration & Testing",
  description:
    "Integration of third-party APIs and comprehensive testing suite for existing web application.",
  category: "Backend Development",
  skills: ["Node.js", "Express", "Jest", "REST APIs", "MongoDB"],
  status: "pending",
  priority: "medium",
  client: {
    id: "client5",
    name: "Lisa Chen",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    country: "Singapore",
    countryCode: "SG",
    verified: true,
    rating: 4.7,
    totalProjects: 19,
    responseTime: "3 hours",
    lastActive: "5 hours ago",
  },
  budget: {
    type: "hourly",
    amount: 1800,
    currency: "USD",
    hourlyRate: 40,
    estimatedHours: 45,
  },
  progress: {
    completedTasks: 0,
    totalTasks: 12,
    completedMilestones: 0,
    totalMilestones: 4,
    progressPercentage: 0,
    lastUpdated: "2024-02-10T00:00:00Z",
  },
  deadline: {
    startDate: "2024-02-15T00:00:00Z",
    endDate: "2024-03-30T23:59:59Z",
    deliveryDays: 44,
    hoursLeft: 1008,
    isOverdue: false,
  },
  projectUrl: "/projects/5",
  createdAt: "2024-02-10T13:00:00Z",
  updatedAt: "2024-02-10T13:00:00Z",
  messageCount: 1,
  attachmentCount: 0,
  experienceLevel: "intermediate",
  duration: "4-6 weeks",
  proposalStats: {
    totalProposals: 0,
    averageBid: 0,
    lowestBid: 0,
    highestBid: 0,
    averageDeliveryTime: 0,
  },
  clientDetails: {
    id: "client5",
    name: "Lisa Chen",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    country: "Singapore",
    countryCode: "SG",
    verified: true,
    rating: 4.7,
    totalProjects: 19,
    responseTime: "3 hours",
    lastActive: "5 hours ago",
    totalHires: 15,
    paymentVerified: true,
    memberSince: "2022-08-20T00:00:00Z",
    responseRate: 88,
    reviewCount: 17,
  },
}

// Helper function to get mock project details by ID
export const getMockProjectDetails = (projectId: string): ProjectDetails | undefined => {
  const projects = [mockProjectDetails, mockHourlyProjectDetails, mockNewProjectDetails]
  return projects.find((p) => p.id === projectId)
}
