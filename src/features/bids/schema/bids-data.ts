export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';

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
    type: 'fixed' | 'hourly';
  };
  duration?: string;
  experience?: 'entry' | 'intermediate' | 'expert';
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
  bidType: 'fixed' | 'hourly';
  coverLetter: string;
  deliveryTime?: string;
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
  status: BidStatus;
  bidDate: string;
  lastUpdated: string;
  expiresAt?: string;
  bidderCount: number;
  clientViewed: boolean;
  clientViewedAt?: string;
  clientMessages?: number;
  isPinned?: boolean;
  notes?: string;
}

export interface BidsState {
  bids: Bid[];
  filters: {
    status: BidStatus | 'all';
    sortBy: 'date' | 'amount' | 'expiry' | 'activity';
    sortDirection: 'asc' | 'desc';
    search: string;
  };
  stats: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
    expired: number;
    viewRate: number;
    responseRate: number;
    successRate: number;
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function to calculate time left
export const getTimeLeft = (deadline: string): string => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return 'Expired';
  }
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    case 'pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    case 'accepted':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    case 'expired':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  }
};

// Helper function to get status icon
export const getStatusIcon = (status: BidStatus): string => {
  switch (status) {
    case 'pending':
      return 'clock';
    case 'accepted':
      return 'check-circle';
    case 'rejected':
      return 'x-circle';
    case 'withdrawn':
      return 'arrow-left';
    case 'expired':
      return 'alert-circle';
    default:
      return 'circle';
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
        description: "Looking for an experienced web developer to redesign our e-commerce platform with modern UI/UX, improved checkout flow, and integration with our inventory management system.",
        category: "Web Development",
        skills: ["React", "Node.js", "E-commerce", "UI/UX Design", "API Integration"],
        budget: {
          min: 5000,
          max: 8000,
          type: "fixed"
        },
        duration: "2-3 months",
        experience: "intermediate",
        postedAt: "2024-04-15T10:30:00Z",
        deadline: "2024-05-15T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-1",
        attachments: 3,
        featured: true
      },
      client: {
        id: "client-1",
        name: "TechRetail Solutions",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.8,
        verified: true,
        country: "United States",
        totalSpent: 250000,
        projectsPosted: 35,
        hireRate: 85,
        memberSince: "2020-06-15"
      },
      amount: 6500,
      bidType: "fixed",
      coverLetter: "I'm excited about your e-commerce redesign project as it aligns perfectly with my expertise in React, Node.js, and e-commerce development. With over 5 years of experience building and optimizing online stores, I've helped businesses increase conversion rates by an average of 35% through improved UI/UX and streamlined checkout processes. I've worked with various inventory management systems and can ensure seamless integration with your existing setup. My approach would be to first conduct a thorough analysis of your current platform, identify pain points, and then develop a modern, responsive design that enhances user experience while maintaining your brand identity. I'd be happy to discuss my portfolio of similar projects and provide more specific insights about how I can help TechRetail Solutions succeed.",
      deliveryTime: "10 weeks",
      proposedMilestones: [
        {
          title: "Initial Design and Wireframes",
          description: "Complete site wireframes, design mockups, and user flow diagrams for approval.",
          amount: 1500,
          dueDate: "2024-05-30T00:00:00Z"
        },
        {
          title: "Frontend Development",
          description: "Develop responsive frontend with React components, implement UI/UX design.",
          amount: 2500,
          dueDate: "2024-06-30T00:00:00Z"
        },
        {
          title: "Backend Integration",
          description: "Connect to inventory system, implement checkout flow, payment processing.",
          amount: 2000,
          dueDate: "2024-07-20T00:00:00Z"
        },
        {
          title: "Testing and Launch",
          description: "Comprehensive testing, bug fixes, and site deployment.",
          amount: 500,
          dueDate: "2024-07-30T00:00:00Z"
        }
      ],
      attachments: [
        {
          name: "portfolio_ecommerce_samples.pdf",
          size: 3500000,
          type: "application/pdf",
          url: "#"
        },
        {
          name: "project_timeline.xlsx",
          size: 250000,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          url: "#"
        }
      ],
      status: "pending",
      bidDate: "2024-04-16T14:25:00Z",
      lastUpdated: "2024-04-16T14:25:00Z",
      expiresAt: "2024-05-15T23:59:59Z",
      bidderCount: 15,
      clientViewed: true,
      clientViewedAt: "2024-04-17T09:15:00Z",
      clientMessages: 2,
      isPinned: true,
      notes: "Follow up on May 1st if no response"
    },
    {
      id: "bid-2",
      projectId: "proj-2",
      project: {
        id: "proj-2",
        title: "Mobile App UI/UX Design for Fitness Tracking",
        description: "We need a talented UI/UX designer to create a modern, intuitive interface for our fitness tracking mobile application. The design should be clean, engaging, and focus on user experience.",
        category: "UI/UX Design",
        skills: ["UI/UX Design", "Mobile App Design", "Figma", "Prototyping", "User Research"],
        budget: {
          min: 3000,
          max: 4500,
          type: "fixed"
        },
        duration: "3-4 weeks",
        experience: "expert",
        postedAt: "2024-04-10T09:15:00Z",
        deadline: "2024-04-30T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-2"
      },
      client: {
        id: "client-2",
        name: "FitTech Innovations",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.5,
        verified: true,
        country: "Canada",
        totalSpent: 120000,
        projectsPosted: 18,
        hireRate: 75
      },
      amount: 4200,
      bidType: "fixed",
      coverLetter: "As a UI/UX specialist with a focus on fitness and health applications, I'm particularly interested in your project. I've designed interfaces for three successful fitness tracking apps with a combined user base of over 500,000 users. My approach combines aesthetic appeal with functional design that encourages user engagement and habit formation - critical for fitness app retention. I'd start with user research to understand your target audience's needs, create wireframes and user flows, then develop high-fidelity prototypes that your development team can easily implement. I'm proficient with Figma and can deliver all necessary assets and documentation.",
      deliveryTime: "3 weeks",
      status: "accepted",
      bidDate: "2024-04-12T11:30:00Z",
      lastUpdated: "2024-04-18T15:45:00Z",
      bidderCount: 23,
      clientViewed: true,
      clientViewedAt: "2024-04-13T08:20:00Z",
      clientMessages: 5,
      isPinned: false
    },
    {
      id: "bid-3",
      projectId: "proj-3",
      project: {
        id: "proj-3",
        title: "Custom CRM Development for Real Estate Agency",
        description: "We need a developer to create a custom CRM solution tailored to our real estate business. The system should handle client management, property listings, transaction tracking, and generate reports.",
        category: "Software Development",
        skills: ["CRM Development", "Database Design", "Full-stack Development", "Real Estate", "Reporting"],
        budget: {
          min: 8000,
          max: 12000,
          type: "fixed"
        },
        duration: "3-4 months",
        experience: "expert",
        postedAt: "2024-04-05T14:20:00Z",
        deadline: "2024-04-25T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-3"
      },
      client: {
        id: "client-3",
        name: "Premier Properties",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.7,
        country: "Australia",
        totalSpent: 350000,
        projectsPosted: 42
      },
      amount: 10500,
      bidType: "fixed",
      coverLetter: "I specialize in developing custom CRM solutions for real estate businesses and have completed similar projects for 5 agencies across different markets. My most recent CRM implementation helped a mid-sized agency increase their lead conversion by 40% and reduce administrative work by 25%. I understand the unique needs of property management, client tracking, and real estate transactions. For your project, I would build a scalable solution using a modern tech stack that integrates with common real estate tools and provides comprehensive reporting capabilities. I've attached my portfolio with similar CRM projects for your review.",
      status: "rejected",
      bidDate: "2024-04-07T08:15:00Z",
      lastUpdated: "2024-04-15T11:30:00Z",
      expiresAt: "2024-04-25T23:59:59Z",
      bidderCount: 18,
      clientViewed: true,
      clientViewedAt: "2024-04-08T16:45:00Z",
      clientMessages: 1
    },
    {
      id: "bid-4",
      projectId: "proj-4",
      project: {
        id: "proj-4",
        title: "Content Marketing Strategy for SaaS Startup",
        description: "Looking for an experienced content marketer to develop and execute a comprehensive content strategy for our B2B SaaS product. The strategy should include blog posts, whitepapers, case studies, and social media content.",
        category: "Marketing",
        skills: ["Content Marketing", "SEO", "B2B Marketing", "SaaS", "Content Strategy"],
        budget: {
          min: 2000,
          max: 3000,
          type: "fixed"
        },
        duration: "1-2 months",
        experience: "intermediate",
        postedAt: "2024-04-08T11:00:00Z",
        deadline: "2024-04-22T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-4"
      },
      client: {
        id: "client-4",
        name: "GrowthTech Solutions",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.9,
        verified: true,
        country: "United Kingdom",
        totalSpent: 85000,
        projectsPosted: 15,
        hireRate: 90
      },
      amount: 2800,
      bidType: "fixed",
      coverLetter: "Having worked with 7 SaaS startups to develop content strategies that drove significant growth, I'm confident I can help GrowthTech Solutions achieve similar results. My approach focuses on creating valuable content that addresses your target audience's pain points while strategically positioning your solution. I've helped B2B SaaS companies increase organic traffic by an average of 150% within 6 months and improve lead generation by 60% through strategic content. I would start by conducting a content audit, competitor analysis, and keyword research to identify opportunities, then develop a comprehensive strategy with a 3-month content calendar.",
      status: "withdrawn",
      bidDate: "2024-04-09T13:45:00Z",
      lastUpdated: "2024-04-14T10:20:00Z",
      expiresAt: "2024-04-22T23:59:59Z",
      bidderCount: 27,
      clientViewed: true,
      clientViewedAt: "2024-04-10T09:30:00Z",
      clientMessages: 0
    },
    {
      id: "bid-5",
      projectId: "proj-5",
      project: {
        id: "proj-5",
        title: "WordPress E-commerce Site with Custom Plugins",
        description: "Need an experienced WordPress developer to build an e-commerce site with several custom plugins for a specialty food business. The site should include online ordering, reservation system, and loyalty program integration.",
        category: "Web Development",
        skills: ["WordPress", "WooCommerce", "PHP", "Custom Plugins", "E-commerce"],
        budget: {
          min: 4000,
          max: 6000,
          type: "fixed"
        },
        duration: "6-8 weeks",
        experience: "intermediate",
        postedAt: "2024-04-01T15:45:00Z",
        deadline: "2024-04-20T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-5"
      },
      client: {
        id: "client-5",
        name: "Gourmet Delights",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.6,
        country: "Italy",
        totalSpent: 75000,
        projectsPosted: 12,
        hireRate: 80
      },
      amount: 5500,
      bidType: "fixed",
      coverLetter: "As a WordPress specialist with extensive experience in food and restaurant websites, I'm excited about your project. I've built 15+ WordPress e-commerce sites with custom functionality similar to your requirements. My expertise includes developing custom WooCommerce extensions, reservation systems that integrate with popular POS solutions, and loyalty programs that drive repeat business. For your specialty food business, I would create a visually appealing, mobile-optimized site with seamless ordering functionality and custom plugins tailored to your specific needs. I've worked with several specialty food retailers and understand the unique requirements of showcasing gourmet products online.",
      status: "expired",
      bidDate: "2024-04-02T09:30:00Z",
      lastUpdated: "2024-04-02T09:30:00Z",
      expiresAt: "2024-04-20T23:59:59Z",
      bidderCount: 31,
      clientViewed: false,
      clientMessages: 0
    },
    {
      id: "bid-6",
      projectId: "proj-6",
      project: {
        id: "proj-6",
        title: "Data Analysis and Visualization for Healthcare Startup",
        description: "We're looking for a data analyst to help us make sense of our patient engagement data. The project involves analyzing user behavior, creating visualizations, and providing actionable insights to improve our healthcare platform.",
        category: "Data Science & Analytics",
        skills: ["Data Analysis", "Python", "Data Visualization", "Healthcare", "Statistical Analysis"],
        budget: {
          min: 50,
          max: 70,
          type: "hourly"
        },
        duration: "4-6 weeks",
        experience: "expert",
        postedAt: "2024-04-12T13:20:00Z",
        deadline: "2024-05-10T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-6",
        featured: true
      },
      client: {
        id: "client-6",
        name: "HealthTech Innovations",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 5.0,
        verified: true,
        country: "United States",
        totalSpent: 420000,
        projectsPosted: 28,
        hireRate: 95,
        memberSince: "2019-03-10"
      },
      amount: 65,
      bidType: "hourly",
      coverLetter: "With a background in healthcare analytics and 7+ years of experience in data science, I'm well-positioned to help HealthTech Innovations extract meaningful insights from your patient engagement data. I've worked with three healthcare startups to implement data-driven strategies that increased patient engagement by 40-60%. My approach combines rigorous statistical analysis with clear, actionable visualizations that non-technical stakeholders can understand and implement. I'm proficient in Python, R, and various visualization tools, with specific experience in HIPAA-compliant data handling. I would start by understanding your key metrics and business questions, then develop a comprehensive analysis plan to deliver insights that drive real improvements to your platform.",
      deliveryTime: "5 weeks",
      status: "pending",
      bidDate: "2024-04-14T16:30:00Z",
      lastUpdated: "2024-04-14T16:30:00Z",
      expiresAt: "2024-05-10T23:59:59Z",
      bidderCount: 19,
      clientViewed: true,
      clientViewedAt: "2024-04-15T11:45:00Z",
      clientMessages: 3,
      isPinned: true
    },
    {
      id: "bid-7",
      projectId: "proj-7",
      project: {
        id: "proj-7",
        title: "Brand Identity Design for Organic Food Company",
        description: "We're launching a new organic food brand and need a complete brand identity package including logo, color palette, typography, packaging design concepts, and brand guidelines.",
        category: "Graphic Design",
        skills: ["Brand Identity", "Logo Design", "Packaging Design", "Typography", "Brand Guidelines"],
        budget: {
          min: 3500,
          max: 5000,
          type: "fixed"
        },
        duration: "3-5 weeks",
        experience: "expert",
        postedAt: "2024-04-09T10:15:00Z",
        deadline: "2024-05-05T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-7"
      },
      client: {
        id: "client-7",
        name: "Nature's Harvest",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.8,
        verified: true,
        country: "New Zealand",
        totalSpent: 95000,
        projectsPosted: 14,
        hireRate: 85
      },
      amount: 4800,
      bidType: "fixed",
      coverLetter: "As a brand identity designer with a focus on sustainable and organic brands, your project immediately caught my attention. I've created brand identities for 12+ food and beverage companies, including 5 organic/natural food brands that have successfully launched in competitive markets. My design philosophy centers on creating authentic, memorable brand identities that communicate core values while standing out on shelves. For Nature's Harvest, I would develop a visual identity that conveys organic authenticity, quality, and sustainability through thoughtful design elements. My process includes extensive research into your target market, competitors, and brand values before developing concepts that align with your vision.",
      deliveryTime: "4 weeks",
      status: "pending",
      bidDate: "2024-04-11T14:20:00Z",
      lastUpdated: "2024-04-11T14:20:00Z",
      expiresAt: "2024-05-05T23:59:59Z",
      bidderCount: 24,
      clientViewed: false,
      clientMessages: 0
    },
    {
      id: "bid-8",
      projectId: "proj-8",
      project: {
        id: "proj-8",
        title: "Social Media Marketing Campaign for Fashion Brand",
        description: "We're looking for a social media marketer to create and execute a 3-month campaign for our sustainable fashion brand launch. The campaign should include content creation, community management, and paid advertising across Instagram, TikTok, and Pinterest.",
        category: "Social Media Marketing",
        skills: ["Social Media Marketing", "Content Creation", "Paid Advertising", "Fashion", "Sustainability"],
        budget: {
          min: 4000,
          max: 6000,
          type: "fixed"
        },
        duration: "3 months",
        experience: "intermediate",
        postedAt: "2024-04-07T09:00:00Z",
        deadline: "2024-04-28T23:59:59Z",
        location: "Remote",
        projectUrl: "/freelancer/projects/proj-8"
      },
      client: {
        id: "client-8",
        name: "EcoChic Apparel",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.7,
        country: "Sweden",
        totalSpent: 110000,
        projectsPosted: 19,
        hireRate: 75
      },
      amount: 5500,
      bidType: "fixed",
      coverLetter: "Having managed successful social media campaigns for 8 fashion brands, including 3 with a sustainability focus, I'm excited about the opportunity to work with EcoChic Apparel. My most recent sustainable fashion campaign generated a 300% increase in engagement and contributed to a 45% boost in launch sales. I understand the unique positioning required for sustainable fashion and how to effectively communicate these values to conscious consumers. My approach would include developing a cohesive content strategy across platforms, creating authentic content that showcases your sustainable practices, implementing targeted paid campaigns, and building an engaged community around your brand values.",
      status: "accepted",
      bidDate: "2024-04-08T11:45:00Z",
      lastUpdated: "2024-04-16T09:30:00Z",
      expiresAt: "2024-04-28T23:59:59Z",
      bidderCount: 29,
      clientViewed: true,
      clientViewedAt: "2024-04-09T14:15:00Z",
      clientMessages: 7,
      isPinned: true
    }
  ],
  filters: {
    status: 'all',
    sortBy: 'date',
    sortDirection: 'desc',
    search: ''
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
    successRate: 25
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 8
  }
}; 