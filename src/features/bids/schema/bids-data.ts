export type BidStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "withdrawn"
  | "shortlisted"
  | "lost"
  | "expired";

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
  country?: string;
  totalSpent?: number;
  projectsPosted?: number;
  hireRate?: number;
  memberSince?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budget: {
    min: number;
    max: number;
    type: "fixed" | "hourly";
  };
  duration?: string;
  experience?: "entry" | "intermediate" | "expert";
  postedAt: string;
  deadline: string;
  location?: string;
  projectUrl: string;
  attachments?: number;
  featured?: boolean;
}

export interface Bid {
  id: string;
  projectId: string;
  project: Project;
  client: Client;
  amount: number;
  bidType: "fixed" | "hourly";
  coverLetter: string;
  deliveryTime?: string;
  bidderCount: number;
  lowestBidAmount: number;
  clientViewed: boolean;
  clientViewedAt?: string;
  clientMessages?: number;
  bidDate: string;
  status: BidStatus;
  expiresAt?: string;
  lastUpdated?: string;
  isPinned?: boolean;
  notes?: string;
  proposedMilestones?: {
    title: string;
    description: string;
    amount: number;
    dueDate?: string;
  }[];
  attachments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
}

export interface BidsState {
  bids: Bid[];
  filters: {
    status: BidStatus | "all";
    sortBy: "date" | "amount" | "expiry" | "activity";
    sortDirection: "asc" | "desc";
    search: string;
  };
  stats: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
    expired: number;
    // Freelancer specific
    viewRate?: number;
    responseRate?: number;
    successRate?: number;
    // Client specific
    activeProjects?: number;
    totalBidsReceived?: number;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to calculate time left
export const getTimeLeft = (deadline: string): string => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Expired";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h left`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m left`;
  } else {
    return `${diffMinutes}m left`;
  }
};

// Helper function to get status color
export const getStatusColor = (status: BidStatus): string => {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    case "accepted":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
    case "withdrawn":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    case "expired":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  }
};

// Helper function to get status icon
export const getStatusIcon = (status: BidStatus): string => {
  switch (status) {
    case "pending":
      return "clock";
    case "accepted":
      return "check-circle";
    case "rejected":
      return "x-circle";
    case "withdrawn":
      return "arrow-left";
    case "expired":
      return "alert-circle";
    default:
      return "circle";
  }
};

// Mock data
export const mockBidsData: BidsState = {
  bids: [
    {
      id: "bid-1",
      projectId: "proj-1",
      project: {
        id: "proj-1",
        title: "E-commerce Website Redesign and Development",
        description:
          "Looking for an experienced web developer to redesign our e-commerce platform with modern UI/UX, improved checkout flow, and integration with our inventory management system.",
        category: "Web Development",
        skills: [
          "React",
          "Node.js",
          "E-commerce",
          "UI/UX Design",
          "API Integration",
        ],
        budget: {
          min: 5000,
          max: 8000,
          type: "fixed",
        },
        duration: "2-3 months",
        experience: "intermediate",
        postedAt: "2024-04-15T10:30:00Z",
        deadline: "2024-05-15T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-1",
        attachments: 3,
        featured: true,
      },
      client: {
        id: "client-1",
        name: "TechRetail Solutions",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.8,
        verified: true,
        country: "United States",
        totalSpent: 250000,
        projectsPosted: 35,
        hireRate: 85,
        memberSince: "2020-06-15",
      },
      amount: 6500,
      bidType: "fixed",
      coverLetter:
        "I'm excited about your e-commerce redesign project as it aligns perfectly with my expertise in React, Node.js, and e-commerce development. With over 5 years of experience building and optimizing online stores, I've helped businesses increase conversion rates by an average of 35% through improved UI/UX and streamlined checkout processes. I've worked with various inventory management systems and can ensure seamless integration with your existing setup. My approach would be to first conduct a thorough analysis of your current platform, identify pain points, and then develop a modern, responsive design that enhances user experience while maintaining your brand identity. I'd be happy to discuss my portfolio of similar projects and provide more specific insights about how I can help TechRetail Solutions succeed.",
      deliveryTime: "10 weeks",
      proposedMilestones: [
        {
          title: "Initial Design and Wireframes",
          description:
            "Complete site wireframes, design mockups, and user flow diagrams for approval.",
          amount: 1500,
          dueDate: "2024-05-30T00:00:00Z",
        },
        {
          title: "Frontend Development",
          description:
            "Develop responsive frontend with React components, implement UI/UX design.",
          amount: 2500,
          dueDate: "2024-06-30T00:00:00Z",
        },
        {
          title: "Backend Integration",
          description:
            "Connect to inventory system, implement checkout flow, payment processing.",
          amount: 2000,
          dueDate: "2024-07-20T00:00:00Z",
        },
        {
          title: "Testing and Launch",
          description: "Comprehensive testing, bug fixes, and site deployment.",
          amount: 500,
          dueDate: "2024-07-30T00:00:00Z",
        },
      ],
      attachments: [
        {
          name: "portfolio_ecommerce_samples.pdf",
          size: 3500000,
          type: "application/pdf",
          url: "#",
        },
        {
          name: "project_timeline.xlsx",
          size: 250000,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          url: "#",
        },
      ],
      status: "pending",
      bidDate: "2024-04-16T14:25:00Z",
      lastUpdated: "2024-04-16T14:25:00Z",
      expiresAt: "2024-05-15T23:59:59Z",
      bidderCount: 12,
      lowestBidAmount: 450,
      clientViewed: true,
      clientViewedAt: "2024-04-17T09:15:00Z",
      clientMessages: 2,
      isPinned: true,
      notes: "Follow up on May 1st if no response",
    },
    {
      id: "bid-2",
      projectId: "proj-2",
      project: {
        id: "proj-2",
        title: "Mobile App UI/UX Design for Fitness Tracking",
        description:
          "We need a talented UI/UX designer to create a modern, intuitive interface for our fitness tracking mobile application. The design should be clean, engaging, and focus on user experience.",
        category: "UI/UX Design",
        skills: [
          "UI/UX Design",
          "Mobile App Design",
          "Figma",
          "Prototyping",
          "User Research",
        ],
        budget: {
          min: 3000,
          max: 4500,
          type: "fixed",
        },
        duration: "3-4 weeks",
        experience: "expert",
        postedAt: "2024-04-10T09:15:00Z",
        deadline: "2024-04-30T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-2",
      },
      client: {
        id: "client-2",
        name: "FitTech Innovations",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.5,
        verified: true,
        country: "Canada",
        totalSpent: 120000,
        projectsPosted: 18,
        hireRate: 75,
      },
      amount: 4200,
      bidType: "fixed",
      coverLetter:
        "As a UI/UX specialist with a focus on fitness and health applications, I'm particularly interested in your project. I've designed interfaces for three successful fitness tracking apps with a combined user base of over 500,000 users. My approach combines aesthetic appeal with functional design that encourages user engagement and habit formation - critical for fitness app retention. I'd start with user research to understand your target audience's needs, create wireframes and user flows, then develop high-fidelity prototypes that your development team can easily implement. I'm proficient with Figma and can deliver all necessary assets and documentation.",
      deliveryTime: "3 weeks",
      status: "accepted",
      bidDate: "2024-04-12T11:30:00Z",
      lastUpdated: "2024-04-18T15:45:00Z",
      bidderCount: 23,
      lowestBidAmount: 3200,
      clientViewed: true,
      clientViewedAt: "2024-04-13T08:20:00Z",
      clientMessages: 5,
      isPinned: false,
    },
    {
      id: "bid-3",
      projectId: "proj-3",
      project: {
        id: "proj-3",
        title: "Custom CRM Development for Real Estate Agency",
        description:
          "We need a developer to create a custom CRM solution tailored to our real estate business. The system should handle client management, property listings, transaction tracking, and generate reports.",
        category: "Software Development",
        skills: [
          "CRM Development",
          "Database Design",
          "Full-stack Development",
          "Real Estate",
          "Reporting",
        ],
        budget: {
          min: 8000,
          max: 12000,
          type: "fixed",
        },
        duration: "3-4 months",
        experience: "expert",
        postedAt: "2024-04-05T14:20:00Z",
        deadline: "2024-04-25T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-3",
      },
      client: {
        id: "client-3",
        name: "Premier Properties",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.7,
        country: "Australia",
        totalSpent: 350000,
        projectsPosted: 42,
      },
      amount: 10500,
      bidType: "fixed",
      coverLetter:
        "I specialize in developing custom CRM solutions for real estate businesses and have completed similar projects for 5 agencies across different markets. My most recent CRM implementation helped a mid-sized agency increase their lead conversion by 40% and reduce administrative work by 25%. I understand the unique needs of property management, client tracking, and real estate transactions. For your project, I would build a scalable solution using a modern tech stack that integrates with common real estate tools and provides comprehensive reporting capabilities. I've attached my portfolio with similar CRM projects for your review.",
      status: "rejected",
      bidDate: "2024-04-07T08:15:00Z",
      lastUpdated: "2024-04-15T11:30:00Z",
      expiresAt: "2024-04-25T23:59:59Z",
      deliveryTime: "3 weeks",
      bidderCount: 18,
      lowestBidAmount: 2200,
      clientViewed: true,
      clientViewedAt: "2024-04-08T16:45:00Z",
      clientMessages: 1,
    },
    {
      id: "bid-4",
      projectId: "proj-4",
      project: {
        id: "proj-4",
        title: "Content Marketing Strategy for SaaS Startup",
        description:
          "Looking for an experienced content marketer to develop and execute a comprehensive content strategy for our B2B SaaS product. The strategy should include blog posts, whitepapers, case studies, and social media content.",
        category: "Marketing",
        skills: [
          "Content Marketing",
          "SEO",
          "B2B Marketing",
          "SaaS",
          "Content Strategy",
        ],
        budget: {
          min: 2000,
          max: 3000,
          type: "fixed",
        },
        duration: "1-2 months",
        experience: "intermediate",
        postedAt: "2024-04-08T11:00:00Z",
        deadline: "2024-04-22T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-4",
      },
      client: {
        id: "client-4",
        name: "GrowthTech Solutions",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.9,
        verified: true,
        country: "United Kingdom",
        totalSpent: 85000,
        projectsPosted: 15,
        hireRate: 90,
      },
      amount: 2800,
      bidType: "fixed",
      coverLetter:
        "Having worked with 7 SaaS startups to develop content strategies that drove significant growth, I'm confident I can help GrowthTech Solutions achieve similar results. My approach focuses on creating valuable content that addresses your target audience's pain points while strategically positioning your solution. I've helped B2B SaaS companies increase organic traffic by an average of 150% within 6 months and improve lead generation by 60% through strategic content. I would start by conducting a content audit, competitor analysis, and keyword research to identify opportunities, then develop a comprehensive strategy with a 3-month content calendar.",
      status: "withdrawn",
      bidDate: "2024-04-09T13:45:00Z",
      lastUpdated: "2024-04-14T10:20:00Z",
      expiresAt: "2024-04-22T23:59:59Z",
      bidderCount: 27,
      lowestBidAmount: 2100,
      clientViewed: true,
      clientViewedAt: "2024-04-10T09:30:00Z",
      clientMessages: 0,
    },
    {
      id: "bid-5",
      projectId: "proj-5",
      project: {
        id: "proj-5",
        title: "WordPress E-commerce Site with Custom Plugins",
        description:
          "Need an experienced WordPress developer to build an e-commerce site with several custom plugins for a specialty food business. The site should include online ordering, reservation system, and loyalty program integration.",
        category: "Web Development",
        skills: [
          "WordPress",
          "WooCommerce",
          "PHP",
          "Custom Plugins",
          "E-commerce",
        ],
        budget: {
          min: 4000,
          max: 6000,
          type: "fixed",
        },
        duration: "6-8 weeks",
        experience: "intermediate",
        postedAt: "2024-04-01T15:45:00Z",
        deadline: "2024-04-20T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-5",
      },
      client: {
        id: "client-5",
        name: "Gourmet Delights",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.6,
        country: "Italy",
        totalSpent: 75000,
        projectsPosted: 12,
        hireRate: 80,
      },
      amount: 5500,
      bidType: "fixed",
      coverLetter:
        "As a WordPress specialist with extensive experience in food and restaurant websites, I'm excited about your project. I've built 15+ WordPress e-commerce sites with custom functionality similar to your requirements. My expertise includes developing custom WooCommerce extensions, reservation systems that integrate with popular POS solutions, and loyalty programs that drive repeat business. For your specialty food business, I would create a visually appealing, mobile-optimized site with seamless ordering functionality and custom plugins tailored to your specific needs. I've worked with several specialty food retailers and understand the unique requirements of showcasing gourmet products online.",
      status: "expired",
      bidDate: "2024-04-02T09:30:00Z",
      lastUpdated: "2024-04-02T09:30:00Z",
      expiresAt: "2024-04-20T23:59:59Z",
      bidderCount: 31,
      lowestBidAmount: 3800,
      clientViewed: false,
      clientMessages: 0,
    },
    {
      id: "bid-6",
      projectId: "proj-6",
      project: {
        id: "proj-6",
        title: "Data Analysis and Visualization for Healthcare Startup",
        description:
          "We're looking for a data analyst to help us make sense of our patient engagement data. The project involves analyzing user behavior, creating visualizations, and providing actionable insights to improve our healthcare platform.",
        category: "Data Science & Analytics",
        skills: [
          "Data Analysis",
          "Python",
          "Data Visualization",
          "Healthcare",
          "Statistical Analysis",
        ],
        budget: {
          min: 50,
          max: 70,
          type: "hourly",
        },
        duration: "4-6 weeks",
        experience: "expert",
        postedAt: "2024-04-12T13:20:00Z",
        deadline: "2024-05-10T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-6",
        featured: true,
      },
      client: {
        id: "client-6",
        name: "HealthTech Innovations",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 5.0,
        verified: true,
        country: "United States",
        totalSpent: 420000,
        projectsPosted: 28,
        hireRate: 95,
        memberSince: "2019-03-10",
      },
      amount: 65,
      bidType: "hourly",
      coverLetter:
        "With a background in healthcare analytics and 7+ years of experience in data science, I'm well-positioned to help HealthTech Innovations extract meaningful insights from your patient engagement data. I've worked with three healthcare startups to implement data-driven strategies that increased patient engagement by 40-60%. My approach combines rigorous statistical analysis with clear, actionable visualizations that non-technical stakeholders can understand and implement. I'm proficient in Python, R, and various visualization tools, with specific experience in HIPAA-compliant data handling. I would start by understanding your key metrics and business questions, then develop a comprehensive analysis plan to deliver insights that drive real improvements to your platform.",
      deliveryTime: "5 weeks",
      status: "pending",
      bidDate: "2024-04-14T16:30:00Z",
      lastUpdated: "2024-04-14T16:30:00Z",
      expiresAt: "2024-05-10T23:59:59Z",
      bidderCount: 9,
      lowestBidAmount: 280,
      clientViewed: true,
      clientViewedAt: "2024-04-15T11:45:00Z",
      clientMessages: 3,
      isPinned: true,
    },
    {
      id: "bid-7",
      projectId: "proj-7",
      project: {
        id: "proj-7",
        title: "Brand Identity Design for Organic Food Company",
        description:
          "We're launching a new organic food brand and need a complete brand identity package including logo, color palette, typography, packaging design concepts, and brand guidelines.",
        category: "Graphic Design",
        skills: [
          "Brand Identity",
          "Logo Design",
          "Packaging Design",
          "Typography",
          "Brand Guidelines",
        ],
        budget: {
          min: 3500,
          max: 5000,
          type: "fixed",
        },
        duration: "3-5 weeks",
        experience: "expert",
        postedAt: "2024-04-09T10:15:00Z",
        deadline: "2024-05-05T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-7",
      },
      client: {
        id: "client-7",
        name: "Nature's Harvest",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.8,
        verified: true,
        country: "New Zealand",
        totalSpent: 95000,
        projectsPosted: 14,
        hireRate: 85,
      },
      amount: 4800,
      bidType: "fixed",
      coverLetter:
        "As a brand identity designer with a focus on sustainable and organic brands, your project immediately caught my attention. I've created brand identities for 12+ food and beverage companies, including 5 organic/natural food brands that have successfully launched in competitive markets. My design philosophy centers on creating authentic, memorable brand identities that communicate core values while standing out on shelves. For Nature's Harvest, I would develop a visual identity that conveys organic authenticity, quality, and sustainability through thoughtful design elements. My process includes extensive research into your target market, competitors, and brand values before developing concepts that align with your vision.",
      deliveryTime: "4 weeks",
      status: "pending",
      bidDate: "2024-04-11T14:20:00Z",
      lastUpdated: "2024-04-11T14:20:00Z",
      expiresAt: "2024-05-05T23:59:59Z",
      bidderCount: 24,
      lowestBidAmount: 3800,
      clientViewed: false,
      clientMessages: 0,
    },
    {
      id: "bid-8",
      projectId: "proj-8",
      project: {
        id: "proj-8",
        title: "Social Media Marketing Campaign for Fashion Brand",
        description:
          "We're looking for a social media marketer to create and execute a 3-month campaign for our sustainable fashion brand launch. The campaign should include content creation, community management, and paid advertising across Instagram, TikTok, and Pinterest.",
        category: "Social Media Marketing",
        skills: [
          "Social Media Marketing",
          "Content Creation",
          "Paid Advertising",
          "Fashion",
          "Sustainability",
        ],
        budget: {
          min: 4000,
          max: 6000,
          type: "fixed",
        },
        duration: "3 months",
        experience: "intermediate",
        postedAt: "2024-04-07T09:00:00Z",
        deadline: "2024-04-28T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-8",
      },
      client: {
        id: "client-8",
        name: "EcoChic Apparel",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.7,
        country: "Sweden",
        totalSpent: 110000,
        projectsPosted: 19,
        hireRate: 75,
      },
      amount: 5500,
      bidType: "fixed",
      coverLetter:
        "Having managed successful social media campaigns for 8 fashion brands, including 3 with a sustainability focus, I'm excited about the opportunity to work with EcoChic Apparel. My most recent sustainable fashion campaign generated a 300% increase in engagement and contributed to a 45% boost in launch sales. I understand the unique positioning required for sustainable fashion and how to effectively communicate these values to conscious consumers. My approach would include developing a cohesive content strategy across platforms, creating authentic content that showcases your sustainable practices, implementing targeted paid campaigns, and building an engaged community around your brand values.",
      status: "accepted",
      bidDate: "2024-04-08T11:45:00Z",
      lastUpdated: "2024-04-16T09:30:00Z",
      expiresAt: "2024-04-28T23:59:59Z",
      bidderCount: 29,
      lowestBidAmount: 3800,
      clientViewed: true,
      clientViewedAt: "2024-04-09T14:15:00Z",
      clientMessages: 7,
      isPinned: true,
    },
  ],
  filters: {
    status: "all",
    sortBy: "date",
    sortDirection: "desc",
    search: "",
  },
  stats: {
    total: 8,
    pending: 3,
    accepted: 2,
    rejected: 1,
    withdrawn: 1,
    expired: 1,
    viewRate: 87.5,
    responseRate: 75,
    successRate: 25,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 8,
  },
};

// Mock data for client bids (bids received on client's projects from freelancers)
export const mockClientBidsData: BidsState = {
  bids: [
    {
      id: "client-bid-1",
      projectId: "client-proj-1",
      project: {
        id: "client-proj-1",
        title: "Modern E-commerce Platform with Admin Dashboard",
        description:
          "Need an experienced developer to build a full-featured e-commerce platform with inventory management, payment integration, and comprehensive admin dashboard.",
        category: "Web Development",
        skills: [
          "React",
          "Node.js",
          "MongoDB",
          "Stripe Integration",
          "Admin Panel",
        ],
        budget: {
          min: 8000,
          max: 12000,
          type: "fixed",
        },
        duration: "3-4 months",
        experience: "expert",
        postedAt: "2024-04-10T08:00:00Z",
        deadline: "2024-05-20T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-1",
        attachments: 2,
        featured: true,
      },
      client: {
        id: "freelancer-1",
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        rating: 4.9,
        verified: true,
        country: "United States",
        totalSpent: 150000,
        projectsPosted: 47,
        hireRate: 92,
        memberSince: "2020-03-15",
      },
      amount: 10500,
      bidType: "fixed",
      coverLetter:
        "With 8+ years of experience building e-commerce platforms, I'm confident I can deliver exactly what you need. I've developed 15+ successful e-commerce sites with complex admin dashboards, payment integrations, and inventory systems. My most recent project increased client sales by 65% within the first quarter. I use modern React architecture with Next.js for optimal performance, Node.js/Express for the backend, and MongoDB for flexible data management. I'll include comprehensive documentation, testing, and post-launch support. My approach ensures scalability, security, and excellent user experience across all devices.",
      deliveryTime: "12 weeks",
      proposedMilestones: [
        {
          title: "Design & Architecture",
          description:
            "Complete system design, database schema, and UI/UX wireframes.",
          amount: 2000,
          dueDate: "2024-06-05T00:00:00Z",
        },
        {
          title: "Core E-commerce Features",
          description:
            "Product catalog, shopping cart, checkout flow, and payment integration.",
          amount: 4000,
          dueDate: "2024-07-10T00:00:00Z",
        },
        {
          title: "Admin Dashboard",
          description:
            "Comprehensive admin panel with inventory, order, and customer management.",
          amount: 3000,
          dueDate: "2024-08-05T00:00:00Z",
        },
        {
          title: "Testing & Deployment",
          description:
            "Full testing, bug fixes, documentation, and production deployment.",
          amount: 1500,
          dueDate: "2024-08-25T00:00:00Z",
        },
      ],
      status: "pending",
      bidDate: "2024-04-12T09:30:00Z",
      lastUpdated: "2024-04-12T09:30:00Z",
      expiresAt: "2024-05-20T23:59:59Z",
      bidderCount: 23,
      lowestBidAmount: 9000,
      clientViewed: true,
      clientViewedAt: "2024-04-13T14:20:00Z",
      clientMessages: 4,
      isPinned: true,
    },
    {
      id: "client-bid-2",
      projectId: "client-proj-1",
      project: {
        id: "client-proj-1",
        title: "Modern E-commerce Platform with Admin Dashboard",
        description:
          "Need an experienced developer to build a full-featured e-commerce platform with inventory management, payment integration, and comprehensive admin dashboard.",
        category: "Web Development",
        skills: [
          "React",
          "Node.js",
          "MongoDB",
          "Stripe Integration",
          "Admin Panel",
        ],
        budget: {
          min: 8000,
          max: 12000,
          type: "fixed",
        },
        duration: "3-4 months",
        experience: "expert",
        postedAt: "2024-04-10T08:00:00Z",
        deadline: "2024-05-20T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-1",
        attachments: 2,
        featured: true,
      },
      client: {
        id: "freelancer-2",
        name: "Sarah Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
        rating: 4.7,
        verified: true,
        country: "Canada",
        totalSpent: 95000,
        projectsPosted: 32,
        hireRate: 85,
      },
      amount: 9200,
      bidType: "fixed",
      coverLetter:
        "As a full-stack developer specializing in e-commerce solutions, I've built over 20 successful online stores with advanced features. My expertise includes React, Node.js, and seamless payment integrations. I focus on creating user-friendly interfaces that convert visitors into customers while providing powerful admin tools for easy management. I'll deliver a scalable platform optimized for performance and SEO. Previous clients have seen 40-80% increase in conversion rates after implementing my solutions.",
      deliveryTime: "11 weeks",
      status: "pending",
      bidDate: "2024-04-11T15:45:00Z",
      lastUpdated: "2024-04-11T15:45:00Z",
      expiresAt: "2024-05-20T23:59:59Z",
      bidderCount: 23,
      lowestBidAmount: 9000,
      clientViewed: true,
      clientViewedAt: "2024-04-13T10:15:00Z",
      clientMessages: 2,
    },
    {
      id: "client-bid-3",
      projectId: "client-proj-1",
      project: {
        id: "client-proj-1",
        title: "Modern E-commerce Platform with Admin Dashboard",
        description:
          "Need an experienced developer to build a full-featured e-commerce platform with inventory management, payment integration, and comprehensive admin dashboard.",
        category: "Web Development",
        skills: [
          "React",
          "Node.js",
          "MongoDB",
          "Stripe Integration",
          "Admin Panel",
        ],
        budget: {
          min: 8000,
          max: 12000,
          type: "fixed",
        },
        duration: "3-4 months",
        experience: "expert",
        postedAt: "2024-04-10T08:00:00Z",
        deadline: "2024-05-20T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-1",
        attachments: 2,
        featured: true,
      },
      client: {
        id: "freelancer-3",
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        rating: 4.8,
        verified: true,
        country: "United Kingdom",
        totalSpent: 120000,
        projectsPosted: 55,
        hireRate: 88,
      },
      amount: 11800,
      bidType: "fixed",
      coverLetter:
        "With a proven track record of delivering enterprise-grade e-commerce platforms, I'm well-equipped to bring your project to life. I've worked with major brands to create high-performing online stores that handle thousands of transactions daily. My development approach emphasizes security, scalability, and maintainability. I'll implement best practices for code organization, comprehensive testing, and detailed documentation to ensure your platform is robust and easy to maintain long-term.",
      deliveryTime: "13 weeks",
      status: "accepted",
      bidDate: "2024-04-12T11:20:00Z",
      lastUpdated: "2024-04-15T16:30:00Z",
      expiresAt: "2024-05-20T23:59:59Z",
      bidderCount: 23,
      lowestBidAmount: 9000,
      clientViewed: true,
      clientViewedAt: "2024-04-13T09:45:00Z",
      clientMessages: 8,
      isPinned: true,
    },
    {
      id: "client-bid-4",
      projectId: "client-proj-2",
      project: {
        id: "client-proj-2",
        title: "Mobile Fitness App UI/UX Design",
        description:
          "Looking for a creative UI/UX designer to design an engaging fitness tracking mobile app interface with gamification elements and social features.",
        category: "UI/UX Design",
        skills: [
          "UI Design",
          "UX Design",
          "Mobile App",
          "Figma",
          "Prototyping",
        ],
        budget: {
          min: 3000,
          max: 5000,
          type: "fixed",
        },
        duration: "3-4 weeks",
        experience: "expert",
        postedAt: "2024-04-08T10:00:00Z",
        deadline: "2024-04-30T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-2",
        featured: false,
      },
      client: {
        id: "freelancer-4",
        name: "Emma Williams",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        rating: 5.0,
        verified: true,
        country: "Australia",
        totalSpent: 85000,
        projectsPosted: 28,
        hireRate: 95,
      },
      amount: 4500,
      bidType: "fixed",
      coverLetter:
        "As a UI/UX specialist focusing on health and fitness apps, I've designed interfaces for 12+ fitness applications with a combined user base of 2M+ users. My designs prioritize engagement, motivation, and ease of use - crucial for fitness app retention. I'll create an interface that makes tracking workouts feel rewarding and social features feel natural. My process includes user research, wireframes, high-fidelity prototypes, and design system documentation. I use Figma for collaborative design and can provide developer-ready assets.",
      deliveryTime: "3 weeks",
      status: "pending",
      bidDate: "2024-04-09T13:15:00Z",
      lastUpdated: "2024-04-09T13:15:00Z",
      expiresAt: "2024-04-30T23:59:59Z",
      bidderCount: 18,
      lowestBidAmount: 3500,
      clientViewed: true,
      clientViewedAt: "2024-04-10T08:30:00Z",
      clientMessages: 3,
    },
    {
      id: "client-bid-5",
      projectId: "client-proj-2",
      project: {
        id: "client-proj-2",
        title: "Mobile Fitness App UI/UX Design",
        description:
          "Looking for a creative UI/UX designer to design an engaging fitness tracking mobile app interface with gamification elements and social features.",
        category: "UI/UX Design",
        skills: [
          "UI Design",
          "UX Design",
          "Mobile App",
          "Figma",
          "Prototyping",
        ],
        budget: {
          min: 3000,
          max: 5000,
          type: "fixed",
        },
        duration: "3-4 weeks",
        experience: "expert",
        postedAt: "2024-04-08T10:00:00Z",
        deadline: "2024-04-30T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-2",
      },
      client: {
        id: "freelancer-5",
        name: "Alex Johnson",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
        rating: 4.6,
        verified: false,
        country: "United States",
        totalSpent: 45000,
        projectsPosted: 18,
        hireRate: 78,
      },
      amount: 3800,
      bidType: "fixed",
      coverLetter:
        "I'm a UI/UX designer with 6 years of experience creating engaging mobile applications. I've worked on several fitness and wellness apps, understanding the importance of motivational design and intuitive user flows. My approach combines beautiful aesthetics with psychological principles that encourage user engagement and habit formation. I'll deliver comprehensive wireframes, interactive prototypes, and a complete design system tailored to your fitness app vision.",
      deliveryTime: "4 weeks",
      status: "rejected",
      bidDate: "2024-04-09T09:45:00Z",
      lastUpdated: "2024-04-14T11:00:00Z",
      expiresAt: "2024-04-30T23:59:59Z",
      bidderCount: 18,
      lowestBidAmount: 3500,
      clientViewed: true,
      clientViewedAt: "2024-04-10T14:20:00Z",
      clientMessages: 1,
    },
    {
      id: "client-bid-6",
      projectId: "client-proj-3",
      project: {
        id: "client-proj-3",
        title: "Content Marketing Strategy for Tech Startup",
        description:
          "Seeking an experienced content marketer to develop and execute a comprehensive 6-month content strategy including blog posts, whitepapers, case studies, and social media campaigns.",
        category: "Digital Marketing",
        skills: [
          "Content Marketing",
          "SEO",
          "B2B Marketing",
          "Content Strategy",
          "Social Media",
        ],
        budget: {
          min: 4000,
          max: 6000,
          type: "fixed",
        },
        duration: "6 months",
        experience: "intermediate",
        postedAt: "2024-04-05T09:30:00Z",
        deadline: "2024-05-01T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-3",
      },
      client: {
        id: "freelancer-6",
        name: "Jennifer Martinez",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face",
        rating: 4.8,
        verified: true,
        country: "Spain",
        totalSpent: 72000,
        projectsPosted: 24,
        hireRate: 82,
      },
      amount: 5200,
      bidType: "fixed",
      coverLetter:
        "As a content marketing specialist with focus on B2B tech companies, I've helped 15+ startups establish strong content foundations that drive organic growth. My strategies have consistently generated 100-200% increases in organic traffic within 6 months. I'll develop a data-driven content plan that positions your startup as a thought leader while driving qualified leads. This includes keyword research, content calendar, SEO-optimized articles, thought leadership pieces, and social media amplification strategies.",
      deliveryTime: "6 months",
      status: "pending",
      bidDate: "2024-04-06T14:30:00Z",
      lastUpdated: "2024-04-06T14:30:00Z",
      expiresAt: "2024-05-01T23:59:59Z",
      bidderCount: 31,
      lowestBidAmount: 4000,
      clientViewed: false,
      clientMessages: 0,
    },
    {
      id: "client-bid-7",
      projectId: "client-proj-4",
      project: {
        id: "client-proj-4",
        title: "Data Analytics Dashboard Development",
        description:
          "Need a developer to create an interactive analytics dashboard using Python, React, and D3.js for visualizing complex business data with real-time updates.",
        category: "Data Visualization",
        skills: [
          "Python",
          "React",
          "D3.js",
          "Data Visualization",
          "Dashboard Design",
        ],
        budget: {
          min: 60,
          max: 85,
          type: "hourly",
        },
        duration: "6-8 weeks",
        experience: "expert",
        postedAt: "2024-04-12T11:00:00Z",
        deadline: "2024-05-25T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-4",
        featured: true,
      },
      client: {
        id: "freelancer-7",
        name: "Robert Taylor",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
        rating: 4.9,
        verified: true,
        country: "Germany",
        totalSpent: 135000,
        projectsPosted: 41,
        hireRate: 90,
      },
      amount: 75,
      bidType: "hourly",
      coverLetter:
        "With 9+ years specializing in data visualization and dashboard development, I've built analytics platforms for Fortune 500 companies and startups alike. I'm expert in Python (Pandas, NumPy) for data processing, React for frontend, and D3.js/Chart.js for beautiful, interactive visualizations. I focus on creating dashboards that not only look great but provide actionable insights through intuitive data presentation. I'll implement real-time data updates, responsive design, and advanced filtering capabilities.",
      deliveryTime: "7 weeks",
      status: "pending",
      bidDate: "2024-04-13T10:20:00Z",
      lastUpdated: "2024-04-13T10:20:00Z",
      expiresAt: "2024-05-25T23:59:59Z",
      bidderCount: 4,
      lowestBidAmount: 120,
      clientViewed: true,
      clientViewedAt: "2024-04-14T09:15:00Z",
      clientMessages: 5,
      isPinned: true,
    },
    {
      id: "client-bid-8",
      projectId: "client-proj-5",
      project: {
        id: "client-proj-5",
        title: "Brand Identity Design for Sustainable Fashion Brand",
        description:
          "Creating a complete brand identity package for an eco-friendly fashion startup including logo, color palette, typography, brand guidelines, and packaging concepts.",
        category: "Graphic Design",
        skills: [
          "Brand Identity",
          "Logo Design",
          "Brand Strategy",
          "Packaging Design",
          "Typography",
        ],
        budget: {
          min: 3500,
          max: 5500,
          type: "fixed",
        },
        duration: "4-5 weeks",
        experience: "expert",
        postedAt: "2024-04-07T08:45:00Z",
        deadline: "2024-05-10T23:59:59Z",
        location: "Remote",
        projectUrl: "/client/projects/client-proj-5",
      },
      client: {
        id: "freelancer-8",
        name: "Sophie Anderson",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
        rating: 5.0,
        verified: true,
        country: "Denmark",
        totalSpent: 98000,
        projectsPosted: 35,
        hireRate: 94,
      },
      amount: 5000,
      bidType: "fixed",
      coverLetter:
        "As a brand identity designer specializing in sustainable and ethical brands, I've created visual identities for 20+ eco-conscious companies that authentically communicate their values. My design philosophy centers on creating meaningful, timeless identities that resonate with conscious consumers. For your sustainable fashion brand, I'll develop a complete visual language that embodies sustainability, style, and authenticity. This includes logo concepts, color psychology-driven palette, typography system, brand guidelines, and packaging design that reflects your eco-friendly mission.",
      deliveryTime: "4 weeks",
      status: "accepted",
      bidDate: "2024-04-08T13:50:00Z",
      lastUpdated: "2024-04-12T10:30:00Z",
      expiresAt: "2024-05-10T23:59:59Z",
      bidderCount: 27,
      lowestBidAmount: 4200,
      clientViewed: true,
      clientViewedAt: "2024-04-09T11:25:00Z",
      clientMessages: 6,
      isPinned: true,
    },
  ],
  filters: {
    status: "all",
    sortBy: "date",
    sortDirection: "desc",
    search: "",
  },
  stats: {
    total: 8,
    pending: 4,
    accepted: 2,
    rejected: 1,
    withdrawn: 0,
    expired: 1,
    viewRate: 87.5,
    responseRate: 75,
    successRate: 25,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 8,
  },
};
