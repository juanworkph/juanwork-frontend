import { ProjectDetails, ExtendedClientInfo, Project } from "./projects-data";
import { Bid } from "./bidding-data";

// ============================================================================
// COMPREHENSIVE MOCK DATA FOR PROJECT DETAILS VIEW
// ============================================================================
// This file contains extensive mock data for testing all scenarios in the
// freelancer project details view, including various client verification states,
// projects with/without attachments, different proposal statistics, and bid data.
// ============================================================================

// ----------------------------------------------------------------------------
// MOCK CLIENTS WITH VARIOUS VERIFICATION STATES
// ----------------------------------------------------------------------------

export const mockVerifiedClient: ExtendedClientInfo = {
  id: "client-verified-1",
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
};

export const mockUnverifiedClient: ExtendedClientInfo = {
  id: "client-unverified-1",
  name: "John Smith",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  country: "Canada",
  countryCode: "CA",
  verified: false,
  rating: 4.3,
  totalProjects: 5,
  responseTime: "6 hours",
  lastActive: "1 week ago",
  totalHires: 3,
  paymentVerified: false,
  memberSince: "2024-01-10T00:00:00Z",
  responseRate: 75,
  reviewCount: 4,
};

export const mockNewClient: ExtendedClientInfo = {
  id: "client-new-1",
  name: "Emily Rodriguez",
  avatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  country: "Spain",
  countryCode: "ES",
  verified: false,
  rating: 0,
  totalProjects: 1,
  responseTime: "12 hours",
  lastActive: "3 days ago",
  totalHires: 0,
  paymentVerified: true,
  memberSince: "2024-02-01T00:00:00Z",
  responseRate: 100,
  reviewCount: 0,
};

export const mockHighRatedClient: ExtendedClientInfo = {
  id: "client-highrated-1",
  name: "Ahmed Hassan",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  country: "United Arab Emirates",
  countryCode: "AE",
  verified: true,
  rating: 5.0,
  totalProjects: 45,
  responseTime: "30 minutes",
  lastActive: "10 minutes ago",
  totalHires: 42,
  paymentVerified: true,
  memberSince: "2021-06-20T00:00:00Z",
  responseRate: 98,
  reviewCount: 43,
};

export const mockInactiveClient: ExtendedClientInfo = {
  id: "client-inactive-1",
  name: "Lisa Chen",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  country: "Singapore",
  countryCode: "SG",
  verified: true,
  rating: 4.7,
  totalProjects: 19,
  responseTime: "3 hours",
  lastActive: "2 months ago",
  totalHires: 15,
  paymentVerified: true,
  memberSince: "2022-08-20T00:00:00Z",
  responseRate: 88,
  reviewCount: 17,
};

// ----------------------------------------------------------------------------
// MOCK PROJECT DETAILS - COMPREHENSIVE TEST SCENARIOS
// ----------------------------------------------------------------------------

// Scenario 1: Fixed price project with attachments and high competition
export const mockFixedProjectWithAttachments: ProjectDetails = {
  id: "proj-fixed-1",
  name: "E-commerce Website Redesign",
  description: `We are looking for an experienced web developer to completely redesign our e-commerce website. The project involves creating a modern, responsive design with improved user experience and conversion optimization.

Key requirements:
- Modern UI/UX design following current best practices
- Mobile-first responsive design
- Integration with existing backend API
- Performance optimization
- SEO-friendly implementation
- Cross-browser compatibility

The ideal candidate should have:
- Strong portfolio of e-commerce projects
- Experience with React and Next.js
- Understanding of conversion rate optimization
- Excellent communication skills

We have provided design mockups, brand guidelines, and current site analytics in the attachments. Please review them carefully before submitting your proposal.`,
  category: "Web Development",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
  status: "active",
  priority: "high",
  client: mockVerifiedClient,
  budget: {
    type: "fixed",
    amount: 4500,
    currency: "USD",
  },
  progress: {
    completedTasks: 0,
    totalTasks: 18,
    completedMilestones: 0,
    totalMilestones: 4,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 45,
    hoursLeft: 1080,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-fixed-1",
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  experienceLevel: "intermediate",
  duration: "6 weeks",
  upgrades: [
    {
      id: "upg-1",
      name: "Featured Project",
      slug: "featured",
      pricePaid: 25,
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "upg-2",
      name: "Urgent Listing",
      slug: "urgent",
      pricePaid: 15,
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  attachments: [
    {
      id: "att-1",
      name: "design-mockups.pdf",
      size: 2458624, // ~2.4 MB
      type: "application/pdf",
      url: "/attachments/design-mockups.pdf",
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-2",
      name: "brand-guidelines.pdf",
      size: 1048576, // 1 MB
      type: "application/pdf",
      url: "/attachments/brand-guidelines.pdf",
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-3",
      name: "current-site-analytics.xlsx",
      size: 524288, // 512 KB
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      url: "/attachments/current-site-analytics.xlsx",
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-img-1",
      name: "homepage-mockup.jpg",
      size: 1572864, // 1.5 MB
      type: "image/jpeg",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-img-2",
      name: "mobile-responsive-view.jpg",
      size: 1048576, // 1 MB
      type: "image/jpeg",
      url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-img-3",
      name: "checkout-flow-diagram.png",
      size: 2097152, // 2 MB
      type: "image/png",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  bidStats: {
    totalBids: 28,
    averageBid: 4200,
    lowestBid: 3200,
    highestBid: 5800,
    averageDeliveryTime: 42,
  },
  clientDetails: mockVerifiedClient,
};

// Scenario 2: Hourly project with multiple attachments and urgent priority
export const mockHourlyProjectWithAttachments: ProjectDetails = {
  id: "proj-hourly-1",
  name: "Mobile App Development - Food Delivery Platform",
  description: `Cross-platform mobile application for food delivery service with real-time tracking and payment integration.

Project scope includes:
- User authentication and profile management
- Restaurant browsing and search functionality
- Real-time order tracking with GPS integration
- Payment gateway integration (Stripe)
- Push notifications for order updates
- Admin dashboard for restaurant management
- Rating and review system

Technical requirements:
- React Native for cross-platform development
- Firebase for backend services and real-time database
- Google Maps API integration for location services
- Clean, maintainable, and well-documented code
- Comprehensive testing coverage

We're looking for an experienced mobile developer who can start immediately and work efficiently. The project is time-sensitive and requires daily progress updates.`,
  category: "Mobile Development",
  skills: [
    "React Native",
    "Firebase",
    "Stripe API",
    "Google Maps",
    "TypeScript",
  ],
  status: "active",
  priority: "urgent",
  client: mockHighRatedClient,
  budget: {
    type: "hourly",
    amount: 5400,
    currency: "USD",
    hourlyRate: 60,
    estimatedHours: 90,
  },
  progress: {
    completedTasks: 0,
    totalTasks: 24,
    completedMilestones: 0,
    totalMilestones: 6,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 60,
    hoursLeft: 1440,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-hourly-1",
  createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  isUrgent: true,
  experienceLevel: "expert",
  duration: "10-12 weeks",
  upgrades: [
    {
      id: "upg-3",
      name: "Urgent Priority",
      slug: "urgent",
      pricePaid: 35,
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "upg-4",
      name: "Sealed Bidding",
      slug: "sealed",
      pricePaid: 10,
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  attachments: [
    {
      id: "att-4",
      name: "app-wireframes.fig",
      size: 3145728, // 3 MB
      type: "application/octet-stream",
      url: "/attachments/app-wireframes.fig",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-5",
      name: "api-documentation.pdf",
      size: 1572864, // ~1.5 MB
      type: "application/pdf",
      url: "/attachments/api-documentation.pdf",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-6",
      name: "user-flow-diagram.png",
      size: 892416, // ~870 KB
      type: "image/png",
      url: "/attachments/user-flow-diagram.png",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-7",
      name: "technical-requirements.docx",
      size: 245760, // ~240 KB
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      url: "/attachments/technical-requirements.docx",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  bidStats: {
    totalBids: 42,
    averageBid: 58,
    lowestBid: 45,
    highestBid: 75,
    averageDeliveryTime: 65,
  },
  clientDetails: mockHighRatedClient,
};

// Scenario 3: Project with NO proposals (be the first bidder)
export const mockProjectNoProposals: ProjectDetails = {
  id: "proj-no-proposals",
  name: "API Integration & Testing Suite",
  description: `Integration of third-party APIs and comprehensive testing suite for existing web application.

Project requirements:
- Integrate payment gateway (Stripe) with existing checkout flow
- Integrate email service provider (SendGrid) for transactional emails
- Integrate analytics platform (Google Analytics 4)
- Write comprehensive unit and integration tests
- Create API documentation
- Implement error handling and logging

Deliverables:
- Fully integrated APIs with proper error handling
- Test suite with 80%+ code coverage
- API documentation using Swagger/OpenAPI
- Deployment guide and configuration instructions

This is a straightforward project for an experienced backend developer. We're looking for someone who can deliver clean, well-tested code.`,
  category: "Backend Development",
  skills: ["Node.js", "Express", "Jest", "REST APIs", "MongoDB"],
  status: "active",
  priority: "medium",
  client: mockNewClient,
  budget: {
    type: "hourly",
    amount: 2000,
    currency: "USD",
    hourlyRate: 50,
    estimatedHours: 40,
  },
  progress: {
    completedTasks: 0,
    totalTasks: 12,
    completedMilestones: 0,
    totalMilestones: 4,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 30,
    hoursLeft: 720,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-no-proposals",
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  experienceLevel: "intermediate",
  duration: "4 weeks",
  bidStats: {
    totalBids: 0,
    averageBid: 0,
    lowestBid: 0,
    highestBid: 0,
    averageDeliveryTime: 0,
  },
  clientDetails: mockNewClient,
};

// Scenario 4: Project with NO attachments
export const mockProjectNoAttachments: ProjectDetails = {
  id: "proj-no-attachments",
  name: "WordPress Plugin Development",
  description: `Custom WordPress plugin for e-commerce analytics with advanced reporting and dashboard features.

Plugin features:
- Sales analytics dashboard with charts and graphs
- Customer behavior tracking
- Product performance reports
- Export functionality (CSV, PDF)
- Email report scheduling
- Multi-site compatibility

Technical requirements:
- WordPress coding standards compliance
- PHP 7.4+ compatibility
- Responsive admin interface
- Proper sanitization and validation
- Translation-ready code
- Comprehensive inline documentation

The plugin should integrate seamlessly with WooCommerce and provide actionable insights for store owners. No design files are provided - you'll have creative freedom for the UI design within WordPress admin standards.`,
  category: "WordPress Development",
  skills: ["PHP", "WordPress", "MySQL", "JavaScript", "CSS"],
  status: "active",
  priority: "low",
  client: mockUnverifiedClient,
  budget: {
    type: "fixed",
    amount: 1200,
    currency: "USD",
  },
  progress: {
    completedTasks: 0,
    totalTasks: 10,
    completedMilestones: 0,
    totalMilestones: 3,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 35,
    hoursLeft: 840,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-no-attachments",
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  experienceLevel: "intermediate",
  duration: "5 weeks",
  bidStats: {
    totalBids: 8,
    averageBid: 1150,
    lowestBid: 900,
    highestBid: 1500,
    averageDeliveryTime: 32,
  },
  clientDetails: mockUnverifiedClient,
};

// Scenario 5: Entry-level project with low competition
export const mockEntryLevelProject: ProjectDetails = {
  id: "proj-entry-level",
  name: "Simple Landing Page Design",
  description: `We need a clean, modern landing page for our new product launch.

Requirements:
- Single page responsive design
- Hero section with call-to-action
- Features section (3-4 key features)
- Testimonials section
- Contact form
- Mobile-friendly design

Design preferences:
- Clean and minimalist style
- Use our brand colors (will be provided)
- Fast loading time
- Modern typography

This is a great opportunity for someone looking to build their portfolio. We're open to creative ideas and willing to provide feedback throughout the process.`,
  category: "Web Development",
  skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  status: "active",
  priority: "low",
  client: mockNewClient,
  budget: {
    type: "fixed",
    amount: 350,
    currency: "USD",
  },
  progress: {
    completedTasks: 0,
    totalTasks: 6,
    completedMilestones: 0,
    totalMilestones: 2,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 14,
    hoursLeft: 336,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-entry-level",
  createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  experienceLevel: "entry",
  duration: "2 weeks",
  attachments: [
    {
      id: "att-8",
      name: "brand-colors.pdf",
      size: 102400, // 100 KB
      type: "application/pdf",
      url: "/attachments/brand-colors.pdf",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  bidStats: {
    totalBids: 5,
    averageBid: 320,
    lowestBid: 250,
    highestBid: 400,
    averageDeliveryTime: 12,
  },
  clientDetails: mockNewClient,
};

// Scenario 6: Expert-level project with inactive client
export const mockExpertLevelProject: ProjectDetails = {
  id: "proj-expert-level",
  name: "Enterprise Data Analytics Platform",
  description: `Build a comprehensive data analytics platform for enterprise clients with real-time data processing and visualization.

Technical scope:
- Microservices architecture using Node.js and Python
- Real-time data streaming with Apache Kafka
- Data warehouse integration (Snowflake/BigQuery)
- Interactive dashboards with D3.js and React
- RESTful and GraphQL APIs
- Role-based access control
- Multi-tenant architecture
- Automated testing and CI/CD pipeline

Required expertise:
- 5+ years of full-stack development experience
- Strong background in data engineering
- Experience with distributed systems
- Cloud infrastructure (AWS/GCP)
- Performance optimization at scale
- Security best practices

This is a complex, long-term project requiring deep technical expertise. We're looking for a senior developer who can architect and implement a scalable solution.`,
  category: "Data Science",
  skills: [
    "Python",
    "Node.js",
    "React",
    "Apache Kafka",
    "D3.js",
    "PostgreSQL",
    "AWS",
  ],
  status: "active",
  priority: "high",
  client: mockInactiveClient,
  budget: {
    type: "hourly",
    amount: 12000,
    currency: "USD",
    hourlyRate: 80,
    estimatedHours: 150,
  },
  progress: {
    completedTasks: 0,
    totalTasks: 35,
    completedMilestones: 0,
    totalMilestones: 8,
    progressPercentage: 0,
    lastUpdated: new Date().toISOString(),
  },
  deadline: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDays: 120,
    hoursLeft: 2880,
    isOverdue: false,
  },
  projectUrl: "/freelancer/projects/proj-expert-level",
  createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  experienceLevel: "expert",
  duration: "4-5 months",
  attachments: [
    {
      id: "att-9",
      name: "system-architecture.pdf",
      size: 4194304, // 4 MB
      type: "application/pdf",
      url: "/attachments/system-architecture.pdf",
      uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "att-10",
      name: "data-model-schema.sql",
      size: 327680, // 320 KB
      type: "application/sql",
      url: "/attachments/data-model-schema.sql",
      uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  bidStats: {
    totalBids: 12,
    averageBid: 75,
    lowestBid: 60,
    highestBid: 95,
    averageDeliveryTime: 110,
  },
  clientDetails: mockInactiveClient,
};

// ----------------------------------------------------------------------------
// MOCK SIMILAR PROJECTS DATA
// ----------------------------------------------------------------------------

export const mockSimilarProjects: Project[] = [
  {
    id: "similar-1",
    name: "React Dashboard Development",
    description:
      "Build a modern admin dashboard using React and TypeScript with data visualization components.",
    category: "Web Development",
    skills: ["React", "TypeScript", "Chart.js", "Material-UI"],
    status: "active",
    priority: "medium",
    client: {
      id: "client-similar-1",
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      country: "South Korea",
      countryCode: "KR",
      verified: true,
      rating: 4.6,
      totalProjects: 11,
      responseTime: "4 hours",
      lastActive: "3 hours ago",
    },
    budget: {
      type: "fixed",
      amount: 3200,
      currency: "USD",
    },
    progress: {
      completedTasks: 0,
      totalTasks: 15,
      completedMilestones: 0,
      totalMilestones: 3,
      progressPercentage: 0,
      lastUpdated: new Date().toISOString(),
    },
    deadline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDays: 42,
      hoursLeft: 1008,
      isOverdue: false,
    },
    projectUrl: "/freelancer/projects/similar-1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    bidStats: {
      totalBids: 8,
      averageBid: 3000,
      lowestBid: 2500,
      highestBid: 3800,
      averageDeliveryTime: 38,
    },
  },
  {
    id: "similar-2",
    name: "Next.js E-learning Platform",
    description:
      "Develop an e-learning platform with course management, video streaming, and progress tracking.",
    category: "Web Development",
    skills: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
    status: "active",
    priority: "high",
    client: {
      id: "client-similar-2",
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      country: "United Kingdom",
      countryCode: "GB",
      verified: true,
      rating: 4.9,
      totalProjects: 28,
      responseTime: "1 hour",
      lastActive: "2 hours ago",
    },
    budget: {
      type: "hourly",
      amount: 5400,
      currency: "USD",
      hourlyRate: 60,
      estimatedHours: 90,
    },
    progress: {
      completedTasks: 0,
      totalTasks: 20,
      completedMilestones: 0,
      totalMilestones: 5,
      progressPercentage: 0,
      lastUpdated: new Date().toISOString(),
    },
    deadline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDays: 60,
      hoursLeft: 1440,
      isOverdue: false,
    },
    projectUrl: "/freelancer/projects/similar-2",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    bidStats: {
      totalBids: 22,
      averageBid: 58,
      lowestBid: 45,
      highestBid: 75,
      averageDeliveryTime: 55,
    },
  },
  {
    id: "similar-3",
    name: "SaaS Application Frontend",
    description:
      "Build responsive frontend for SaaS application with complex forms and data tables.",
    category: "Web Development",
    skills: ["React", "TypeScript", "Redux", "Tailwind CSS"],
    status: "active",
    priority: "medium",
    client: {
      id: "client-similar-3",
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      country: "Canada",
      countryCode: "CA",
      verified: true,
      rating: 4.7,
      totalProjects: 16,
      responseTime: "2 hours",
      lastActive: "1 hour ago",
    },
    budget: {
      type: "fixed",
      amount: 3800,
      currency: "USD",
    },
    progress: {
      completedTasks: 0,
      totalTasks: 18,
      completedMilestones: 0,
      totalMilestones: 4,
      progressPercentage: 0,
      lastUpdated: new Date().toISOString(),
    },
    deadline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDays: 50,
      hoursLeft: 1200,
      isOverdue: false,
    },
    projectUrl: "/freelancer/projects/similar-3",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    bidStats: {
      totalBids: 15,
      averageBid: 3600,
      lowestBid: 3000,
      highestBid: 4500,
      averageDeliveryTime: 45,
    },
  },
  {
    id: "similar-4",
    name: "Mobile Fitness App",
    description:
      "Cross-platform fitness tracking app with workout plans, nutrition tracking, and social features.",
    category: "Mobile Development",
    skills: ["React Native", "TypeScript", "Firebase", "Redux"],
    status: "active",
    priority: "medium",
    client: {
      id: "client-similar-4",
      name: "Jennifer Lee",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      country: "Australia",
      countryCode: "AU",
      verified: true,
      rating: 4.8,
      totalProjects: 12,
      responseTime: "3 hours",
      lastActive: "5 hours ago",
    },
    budget: {
      type: "fixed",
      amount: 4800,
      currency: "USD",
    },
    progress: {
      completedTasks: 0,
      totalTasks: 18,
      completedMilestones: 0,
      totalMilestones: 4,
      progressPercentage: 0,
      lastUpdated: new Date().toISOString(),
    },
    deadline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 57 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDays: 57,
      hoursLeft: 1368,
      isOverdue: false,
    },
    projectUrl: "/freelancer/projects/similar-4",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    bidStats: {
      totalBids: 12,
      averageBid: 4500,
      lowestBid: 3800,
      highestBid: 5500,
      averageDeliveryTime: 50,
    },
  },
  {
    id: "similar-5",
    name: "E-commerce Store Setup",
    description:
      "Set up and customize Shopify store with custom theme and payment integration.",
    category: "Web Development",
    skills: ["Shopify", "Liquid", "JavaScript", "CSS"],
    status: "active",
    priority: "low",
    client: {
      id: "client-similar-5",
      name: "Robert Taylor",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      country: "United States",
      countryCode: "US",
      verified: false,
      rating: 4.4,
      totalProjects: 6,
      responseTime: "5 hours",
      lastActive: "1 day ago",
    },
    budget: {
      type: "fixed",
      amount: 1800,
      currency: "USD",
    },
    progress: {
      completedTasks: 0,
      totalTasks: 10,
      completedMilestones: 0,
      totalMilestones: 3,
      progressPercentage: 0,
      lastUpdated: new Date().toISOString(),
    },
    deadline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDays: 28,
      hoursLeft: 672,
      isOverdue: false,
    },
    projectUrl: "/freelancer/projects/similar-5",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    bidStats: {
      totalBids: 18,
      averageBid: 1650,
      lowestBid: 1200,
      highestBid: 2200,
      averageDeliveryTime: 25,
    },
  },
];

// ----------------------------------------------------------------------------
// MOCK BID DATA - EXISTING BID SCENARIOS
// ----------------------------------------------------------------------------

// Scenario: Pending bid
export const mockPendingBid: Bid = {
  id: "bid-pending-1",
  projectId: "proj-fixed-1",
  freelancerId: "freelancer-1",
  bidAmount: 4200,
  deliveryDays: 40,
  coverLetter: `Hello,

I'm excited about the opportunity to work on your e-commerce website redesign project. With over 5 years of experience in React and Next.js development, I've successfully delivered numerous e-commerce projects with significant improvements in conversion rates.

My approach for this project:
1. Analyze the current site and identify pain points
2. Create a modern, mobile-first design based on your mockups
3. Implement the frontend with React and Next.js
4. Optimize for performance and SEO
5. Conduct thorough testing across devices and browsers

I've reviewed your design mockups and brand guidelines, and I'm confident I can deliver a high-quality solution that meets your requirements. I'm available to start immediately and can provide daily progress updates.

Looking forward to discussing this project further.

Best regards`,
  attachments: [
    {
      id: "bid-att-1",
      name: "portfolio-ecommerce-projects.pdf",
      size: 2097152, // 2 MB
      url: "/bid-attachments/portfolio-ecommerce-projects.pdf",
    },
  ],
  status: "pending",
  submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

// Scenario: Accepted bid
export const mockAcceptedBid: Bid = {
  id: "bid-accepted-1",
  projectId: "proj-hourly-1",
  freelancerId: "freelancer-1",
  bidAmount: 55,
  deliveryDays: 58,
  coverLetter: `Hi Ahmed,

I'm a senior mobile developer with 7+ years of experience building cross-platform applications using React Native. I've worked on several food delivery and logistics apps with real-time tracking features.

Key highlights of my experience:
- Built 3 food delivery apps with 100K+ downloads
- Expert in Firebase real-time database and cloud functions
- Extensive experience with Stripe payment integration
- Proficient in Google Maps API and geolocation services
- Strong focus on code quality and testing

I've reviewed your wireframes and API documentation. The scope is clear, and I'm confident I can deliver a robust, scalable solution. I can start immediately and provide daily updates on progress.

My hourly rate is $55, and I estimate 90-100 hours for the complete project including testing and deployment.

Let's discuss the project timeline and any specific requirements you have.

Best regards`,
  attachments: [],
  status: "accepted",
  submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
};

// Scenario: Rejected bid
export const mockRejectedBid: Bid = {
  id: "bid-rejected-1",
  projectId: "proj-no-attachments",
  freelancerId: "freelancer-1",
  bidAmount: 1500,
  deliveryDays: 40,
  coverLetter: `Hello,

I'm interested in developing your WordPress plugin. I have experience with WordPress development and can create a custom analytics plugin for your e-commerce store.

I can complete this project in 40 days for $1500.

Thank you for considering my proposal.`,
  attachments: [],
  status: "rejected",
  submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
};

// Scenario: Withdrawn bid
export const mockWithdrawnBid: Bid = {
  id: "bid-withdrawn-1",
  projectId: "proj-entry-level",
  freelancerId: "freelancer-1",
  bidAmount: 300,
  deliveryDays: 10,
  coverLetter: `Hi,

I'd love to work on your landing page project. I'm a frontend developer with experience in HTML, CSS, and JavaScript. I can create a clean, responsive landing page that meets your requirements.

I'll deliver the project in 10 days for $300.

Looking forward to working with you!`,
  attachments: [],
  status: "withdrawn",
  submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
};

// ----------------------------------------------------------------------------
// DATA FETCHING FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Get mock project details by project ID
 * Returns comprehensive project data including attachments, client details, and proposal stats
 * Supports both numeric IDs (1, 2, 3) and prefixed IDs (proj-fixed-1, proj-hourly-1)
 */
export const getProjectDetailsById = (
  projectId: string,
): ProjectDetails | undefined => {
  const allProjects = [
    mockFixedProjectWithAttachments,
    mockHourlyProjectWithAttachments,
    mockProjectNoProposals,
    mockProjectNoAttachments,
    mockEntryLevelProject,
    mockExpertLevelProject,
  ];

  // First try direct match
  let project = allProjects.find((project) => project.id === projectId);

  // If not found and projectId is numeric, map to mock projects
  if (!project && /^\d+$/.test(projectId)) {
    const numericId = parseInt(projectId, 10);
    const projectMap: Record<number, ProjectDetails> = {
      1: mockFixedProjectWithAttachments,
      2: mockHourlyProjectWithAttachments,
      3: mockProjectNoProposals,
      4: mockProjectNoAttachments,
      5: mockEntryLevelProject,
      6: mockExpertLevelProject,
      7: mockFixedProjectWithAttachments, // Reuse for additional IDs
      8: mockHourlyProjectWithAttachments,
      9: mockProjectNoProposals,
      10: mockProjectNoAttachments,
    };
    project = projectMap[numericId];
  }

  return project;
};

/**
 * Get similar projects based on category and skills
 * Implements priority-based matching:
 * 1. Projects with 3+ matching skills
 * 2. Projects in same category with 1+ matching skills
 * 3. Projects in same category
 */
export const getSimilarProjects = (
  currentProjectId: string,
  category: string,
  skills: string[],
  maxResults: number = 5,
): Project[] => {
  // Filter out current project
  const availableProjects = mockSimilarProjects.filter(
    (project) => project.id !== currentProjectId,
  );

  // Calculate match scores
  const projectsWithScores = availableProjects.map((project) => {
    const matchingSkills = project.skills.filter((skill) =>
      skills.includes(skill),
    ).length;
    const sameCategory = project.category === category;

    let score = 0;
    if (matchingSkills >= 3) {
      score = 3; // Highest priority
    } else if (sameCategory && matchingSkills >= 1) {
      score = 2; // Medium priority
    } else if (sameCategory) {
      score = 1; // Low priority
    }

    return { project, score, matchingSkills };
  });

  // Sort by score (descending) and matching skills (descending)
  const sortedProjects = projectsWithScores
    .filter((item) => item.score > 0) // Only include projects with some match
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.matchingSkills - a.matchingSkills;
    })
    .slice(0, maxResults)
    .map((item) => item.project);

  return sortedProjects;
};

/**
 * Get existing bid for a project by freelancer
 * Returns the bid if it exists, undefined otherwise
 */
export const getExistingBid = (
  projectId: string,
  freelancerId: string = "freelancer-1",
): Bid | undefined => {
  const allBids = [
    mockPendingBid,
    mockAcceptedBid,
    mockRejectedBid,
    mockWithdrawnBid,
  ];

  return allBids.find(
    (bid) => bid.projectId === projectId && bid.freelancerId === freelancerId,
  );
};

/**
 * Get all mock project details
 * Useful for testing and development
 */
export const getAllMockProjects = (): ProjectDetails[] => {
  return [
    mockFixedProjectWithAttachments,
    mockHourlyProjectWithAttachments,
    mockProjectNoProposals,
    mockProjectNoAttachments,
    mockEntryLevelProject,
    mockExpertLevelProject,
  ];
};

/**
 * Get mock clients
 * Useful for testing client-related features
 */
export const getAllMockClients = (): ExtendedClientInfo[] => {
  return [
    mockVerifiedClient,
    mockUnverifiedClient,
    mockNewClient,
    mockHighRatedClient,
    mockInactiveClient,
  ];
};

/**
 * Get all mock bids
 * Useful for testing bid-related features
 */
export const getAllMockBids = (): Bid[] => {
  return [mockPendingBid, mockAcceptedBid, mockRejectedBid, mockWithdrawnBid];
};
