export type BookmarkType = 'project' | 'client' | 'job' | 'article' | 'resource';

export interface BookmarkProject {
  id: string;
  type: 'project';
  title: string;
  description: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    verified?: boolean;
  };
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
  };
  skills: string[];
  category: string;
  datePosted: string;
  deadline?: string;
  proposals: number;
  status: 'open' | 'in_progress' | 'completed' | 'canceled';
  location?: string;
  bookmarkedAt: string;
  featured?: boolean;
  projectUrl: string;
  thumbnail?: string;
}

export interface BookmarkClient {
  id: string;
  type: 'client';
  name: string;
  description: string;
  avatar?: string;
  location: string;
  industry: string;
  rating: number;
  totalSpent: number;
  projectsPosted: number;
  hireRate: number;
  bookmarkedAt: string;
  verified: boolean;
  clientUrl: string;
}

export interface BookmarkJob {
  id: string;
  type: 'job';
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  employmentType: 'full_time' | 'part_time' | 'contract' | 'freelance';
  description: string;
  skills: string[];
  datePosted: string;
  applicationDeadline?: string;
  bookmarkedAt: string;
  remote: boolean;
  jobUrl: string;
}

export interface BookmarkArticle {
  id: string;
  type: 'article';
  title: string;
  author: string;
  authorAvatar?: string;
  source: string;
  sourceLogo?: string;
  summary: string;
  publishedDate: string;
  readTime: number;
  category: string;
  tags: string[];
  bookmarkedAt: string;
  articleUrl: string;
  thumbnail?: string;
}

export interface BookmarkResource {
  id: string;
  type: 'resource';
  title: string;
  description: string;
  provider: string;
  providerLogo?: string;
  category: string;
  format: 'video' | 'ebook' | 'course' | 'tool' | 'template' | 'other';
  tags: string[];
  bookmarkedAt: string;
  resourceUrl: string;
  thumbnail?: string;
  isFree: boolean;
  rating?: number;
}

export type Bookmark = 
  | BookmarkProject 
  | BookmarkClient 
  | BookmarkJob 
  | BookmarkArticle 
  | BookmarkResource;

export interface BookmarksState {
  bookmarks: Bookmark[];
  categories: {
    name: string;
    count: number;
  }[];
  totalCount: number;
  lastUpdated: string;
  settings: {
    defaultView: 'grid' | 'list';
    sortBy: 'date_added' | 'name' | 'type';
    sortDirection: 'asc' | 'desc';
  };
}

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to get time ago
export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
};

// Mock data
export const mockBookmarksData: BookmarksState = {
  bookmarks: [
    {
      id: "proj-1",
      type: "project",
      title: "E-commerce Website Redesign and Development",
      description: "Looking for an experienced web developer to redesign our e-commerce platform with modern UI/UX, improved checkout flow, and integration with our inventory management system.",
      client: {
        id: "client-1",
        name: "TechRetail Solutions",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.8,
        verified: true
      },
      budget: {
        min: 5000,
        max: 8000,
        type: "fixed"
      },
      skills: ["React", "Node.js", "E-commerce", "UI/UX Design", "API Integration"],
      category: "Web Development",
      datePosted: "2024-04-15T10:30:00Z",
      deadline: "2024-05-15T23:59:59Z",
      proposals: 12,
      status: "open",
      location: "Remote",
      bookmarkedAt: "2024-04-16T14:25:00Z",
      featured: true,
      projectUrl: "/freelancer/projects/proj-1",
      thumbnail: "https://images.unsplash.com/photo-1661956602868-6ae368943878?w=600&h=400&fit=crop"
    },
    {
      id: "proj-2",
      type: "project",
      title: "Mobile App UI/UX Design for Fitness Tracking",
      description: "We need a talented UI/UX designer to create a modern, intuitive interface for our fitness tracking mobile application. The design should be clean, engaging, and focus on user experience.",
      client: {
        id: "client-2",
        name: "FitTech Innovations",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.5,
        verified: true
      },
      budget: {
        min: 3000,
        max: 4500,
        type: "fixed"
      },
      skills: ["UI/UX Design", "Mobile App Design", "Figma", "Prototyping", "User Research"],
      category: "UI/UX Design",
      datePosted: "2024-04-10T09:15:00Z",
      deadline: "2024-05-05T23:59:59Z",
      proposals: 8,
      status: "open",
      location: "Remote",
      bookmarkedAt: "2024-04-12T11:30:00Z",
      projectUrl: "/freelancer/projects/proj-2",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    },
    {
      id: "client-1",
      type: "client",
      name: "Digital Solutions Inc.",
      description: "A leading digital transformation company specializing in enterprise solutions and custom software development. Looking for talented developers and designers for ongoing projects.",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop",
      location: "San Francisco, CA",
      industry: "Software Development",
      rating: 4.9,
      totalSpent: 250000,
      projectsPosted: 35,
      hireRate: 85,
      bookmarkedAt: "2024-04-05T16:45:00Z",
      verified: true,
      clientUrl: "/freelancer/clients/client-1"
    },
    {
      id: "job-1",
      type: "job",
      title: "Senior Frontend Developer - React/TypeScript",
      company: "TechInnovate Solutions",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
      location: "New York, NY (Hybrid)",
      salary: {
        min: 120000,
        max: 150000,
        period: "yearly"
      },
      employmentType: "full_time",
      description: "We're looking for an experienced Frontend Developer with strong React and TypeScript skills to join our growing team. You'll be responsible for building and maintaining modern web applications for our enterprise clients.",
      skills: ["React", "TypeScript", "Redux", "Tailwind CSS", "Jest", "CI/CD"],
      datePosted: "2024-04-08T08:00:00Z",
      applicationDeadline: "2024-05-08T23:59:59Z",
      bookmarkedAt: "2024-04-09T10:15:00Z",
      remote: false,
      jobUrl: "/freelancer/jobs/job-1"
    },
    {
      id: "article-1",
      type: "article",
      title: "The Future of Freelancing: AI Tools That Will Transform Your Workflow",
      author: "Sarah Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
      source: "Freelance Insights",
      sourceLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop",
      summary: "Discover the latest AI tools that are revolutionizing how freelancers work, from automated client communication to intelligent project management and content creation assistants.",
      publishedDate: "2024-04-03T12:00:00Z",
      readTime: 8,
      category: "Technology",
      tags: ["AI", "Freelancing", "Productivity", "Tools", "Future of Work"],
      bookmarkedAt: "2024-04-03T15:20:00Z",
      articleUrl: "/blog/future-freelancing-ai-tools",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop"
    },
    {
      id: "resource-1",
      type: "resource",
      title: "Ultimate Freelancer Contract Template Bundle",
      description: "A comprehensive collection of legally-vetted contract templates specifically designed for freelancers. Includes templates for service agreements, NDAs, scope of work, and payment terms.",
      provider: "Freelance Legal Hub",
      providerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop",
      category: "Legal Resources",
      format: "template",
      tags: ["Contracts", "Legal", "Templates", "Freelancing", "Business"],
      bookmarkedAt: "2024-03-28T09:45:00Z",
      resourceUrl: "/resources/freelancer-contract-templates",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
      isFree: false,
      rating: 4.8
    },
    {
      id: "proj-3",
      type: "project",
      title: "Custom CRM Development for Real Estate Agency",
      description: "We need a developer to create a custom CRM solution tailored to our real estate business. The system should handle client management, property listings, transaction tracking, and generate reports.",
      client: {
        id: "client-3",
        name: "Premier Properties",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
        rating: 4.7
      },
      budget: {
        min: 8000,
        max: 12000,
        type: "fixed"
      },
      skills: ["CRM Development", "Database Design", "Full-stack Development", "Real Estate", "Reporting"],
      category: "Software Development",
      datePosted: "2024-04-05T14:20:00Z",
      deadline: "2024-05-20T23:59:59Z",
      proposals: 15,
      status: "open",
      bookmarkedAt: "2024-04-07T08:15:00Z",
      projectUrl: "/freelancer/projects/proj-3",
      thumbnail: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
    },
    {
      id: "resource-2",
      type: "resource",
      title: "Advanced React Patterns Course",
      description: "Master advanced React patterns and techniques to build scalable, maintainable, and high-performance applications. Learn compound components, render props, hooks, context, and more.",
      provider: "Frontend Masters",
      providerLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop",
      category: "Education",
      format: "course",
      tags: ["React", "JavaScript", "Frontend", "Web Development", "Programming"],
      bookmarkedAt: "2024-03-15T11:30:00Z",
      resourceUrl: "/resources/advanced-react-patterns",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop",
      isFree: false,
      rating: 4.9
    },
    {
      id: "article-2",
      type: "article",
      title: "How to Set Your Freelance Rates: A Comprehensive Guide",
      author: "Michael Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      source: "Freelance Success",
      sourceLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop",
      summary: "Learn how to strategically set your freelance rates to maximize income while staying competitive in the market. Includes formulas, market research techniques, and negotiation strategies.",
      publishedDate: "2024-03-25T10:00:00Z",
      readTime: 12,
      category: "Business",
      tags: ["Freelancing", "Pricing", "Business Strategy", "Negotiation", "Income"],
      bookmarkedAt: "2024-03-25T14:10:00Z",
      articleUrl: "/blog/setting-freelance-rates",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      id: "job-2",
      type: "job",
      title: "Remote UI/UX Designer",
      company: "DesignHub Global",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop",
      location: "Remote (Worldwide)",
      salary: {
        min: 70000,
        max: 90000,
        period: "yearly"
      },
      employmentType: "full_time",
      description: "Join our international design team creating beautiful, user-centered experiences for clients across various industries. We're looking for a UI/UX designer with a strong portfolio and experience in digital product design.",
      skills: ["UI Design", "UX Research", "Figma", "Design Systems", "Prototyping", "User Testing"],
      datePosted: "2024-04-01T09:30:00Z",
      applicationDeadline: "2024-05-01T23:59:59Z",
      bookmarkedAt: "2024-04-02T16:45:00Z",
      remote: true,
      jobUrl: "/freelancer/jobs/job-2"
    }
  ],
  categories: [
    { name: "Projects", count: 3 },
    { name: "Clients", count: 1 },
    { name: "Jobs", count: 2 },
    { name: "Articles", count: 2 },
    { name: "Resources", count: 2 }
  ],
  totalCount: 10,
  lastUpdated: "2024-04-16T18:30:00Z",
  settings: {
    defaultView: "grid",
    sortBy: "date_added",
    sortDirection: "desc"
  }
}; 