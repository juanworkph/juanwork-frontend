export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'Web Development' | 'Mobile App' | 'UI/UX Design' | 'E-commerce' | 'API Development' | 'DevOps' | 'Other';
  status: 'Completed' | 'In Progress' | 'Concept';
  featured: boolean;
  images: {
    thumbnail: string;
    gallery: string[];
  };
  technologies: string[];
  skills: string[];
  client: {
    name: string;
    industry: string;
    location: string;
    testimonial?: {
      text: string;
      rating: number;
    };
  };
  timeline: {
    startDate: string;
    endDate?: string;
    duration: string;
  };
  projectDetails: {
    challenge: string;
    solution: string;
    results: string[];
  };
  links: {
    live?: string;
    github?: string;
    demo?: string;
    casestudy?: string;
  };
  metrics: {
    budget: number;
    teamSize: number;
    deliveryTime: string;
  };
  tags: string[];
}

export interface PortfolioStats {
  totalProjects: number;
  completedProjects: number;
  happyClients: number;
  yearsExperience: number;
  averageRating: number;
  totalEarnings: number;
  onTimeDelivery: number;
  repeatClients: number;
}

export interface PortfolioSettings {
  showPricing: boolean;
  showTestimonials: boolean;
  showMetrics: boolean;
  featuredProjectsLimit: number;
}

export interface FreelancerPortfolio {
  projects: PortfolioProject[];
  stats: PortfolioStats;
  settings: PortfolioSettings;
  categories: string[];
  skills: string[];
  lastUpdated: string;
}

// Mock data
export const mockPortfolioData: FreelancerPortfolio = {
  projects: [
    {
      id: "1",
      title: "E-commerce Platform Redesign",
      description: "Complete redesign and development of a modern e-commerce platform with advanced features including real-time inventory management, AI-powered recommendations, and seamless checkout experience. Built with React, Node.js, and integrated with multiple payment gateways.",
      shortDescription: "Modern e-commerce platform with AI recommendations and seamless UX",
      category: "E-commerce",
      status: "Completed",
      featured: true,
      images: {
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
        ]
      },
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      skills: ["Frontend Development", "Backend Development", "UI/UX Design", "Database Design"],
      client: {
        name: "TechMart Solutions",
        industry: "Retail Technology",
        location: "New York, NY",
        testimonial: {
          text: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise is outstanding.",
          rating: 5
        }
      },
      timeline: {
        startDate: "2023-08-01",
        endDate: "2023-11-15",
        duration: "3.5 months"
      },
      projectDetails: {
        challenge: "The client needed a complete overhaul of their outdated e-commerce platform with modern features, better performance, and mobile-first design.",
        solution: "Developed a fully responsive, modern e-commerce platform with advanced features including AI recommendations, real-time inventory, and optimized checkout flow.",
        results: [
          "40% increase in conversion rate",
          "60% faster page load times",
          "25% increase in average order value",
          "95% mobile user satisfaction"
        ]
      },
      links: {
        live: "https://techmart-demo.com",
        github: "https://github.com/alexrodriguez/ecommerce-platform",
        demo: "https://demo.techmart-solutions.com"
      },
      metrics: {
        budget: 15000,
        teamSize: 1,
        deliveryTime: "On time"
      },
      tags: ["E-commerce", "React", "Full-stack", "AI Integration"]
    },
    {
      id: "2",
      title: "FinTech Mobile App",
      description: "Cross-platform mobile application for personal finance management with features like expense tracking, budget planning, investment portfolio, and AI-powered financial insights. Built with React Native and integrated with banking APIs.",
      shortDescription: "Personal finance app with AI insights and banking integration",
      category: "Mobile App",
      status: "Completed",
      featured: true,
      images: {
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop"
        ]
      },
      technologies: ["React Native", "TypeScript", "Firebase", "Plaid API", "Chart.js"],
      skills: ["Mobile Development", "API Integration", "Data Visualization", "UI/UX Design"],
      client: {
        name: "FinanceFlow Inc.",
        industry: "Financial Technology",
        location: "San Francisco, CA",
        testimonial: {
          text: "The mobile app Alex created has transformed how our users manage their finances. Exceptional work with great attention to user experience.",
          rating: 5
        }
      },
      timeline: {
        startDate: "2023-12-01",
        endDate: "2024-03-15",
        duration: "3.5 months"
      },
      projectDetails: {
        challenge: "Create a comprehensive personal finance app that simplifies complex financial data and provides actionable insights for users.",
        solution: "Developed an intuitive mobile app with clean UI, smart categorization, and AI-powered insights to help users make better financial decisions.",
        results: [
          "50,000+ app downloads in first 3 months",
          "4.8/5 app store rating",
          "30% increase in user financial awareness",
          "85% user retention rate"
        ]
      },
      links: {
        demo: "https://financeflow-demo.com",
        casestudy: "https://alexrodriguez.dev/case-studies/fintech-app"
      },
      metrics: {
        budget: 12000,
        teamSize: 1,
        deliveryTime: "1 week early"
      },
      tags: ["Mobile App", "FinTech", "React Native", "AI"]
    },
    {
      id: "3",
      title: "SaaS Dashboard Design System",
      description: "Comprehensive design system and dashboard interface for a B2B SaaS platform. Includes component library, design tokens, documentation, and implementation in React. Features advanced data visualization and responsive design.",
      shortDescription: "Complete design system and dashboard for B2B SaaS platform",
      category: "UI/UX Design",
      status: "Completed",
      featured: true,
      images: {
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop"
        ]
      },
      technologies: ["Figma", "React", "Storybook", "Tailwind CSS", "TypeScript"],
      skills: ["UI/UX Design", "Design Systems", "Component Library", "Frontend Development"],
      client: {
        name: "DataViz Pro",
        industry: "Business Intelligence",
        location: "Austin, TX",
        testimonial: {
          text: "Alex created a beautiful and functional design system that has become the foundation of our entire product suite. Highly recommended!",
          rating: 5
        }
      },
      timeline: {
        startDate: "2023-05-01",
        endDate: "2023-07-30",
        duration: "3 months"
      },
      projectDetails: {
        challenge: "Create a scalable design system that could support multiple products while maintaining consistency and improving development efficiency.",
        solution: "Designed and developed a comprehensive design system with reusable components, clear documentation, and seamless developer handoff.",
        results: [
          "50% reduction in design-to-development time",
          "100% design consistency across products",
          "90% developer satisfaction with components",
          "Adopted by 3 additional product teams"
        ]
      },
      links: {
        demo: "https://storybook.datavizpro.com",
        casestudy: "https://alexrodriguez.dev/case-studies/design-system"
      },
      metrics: {
        budget: 8000,
        teamSize: 1,
        deliveryTime: "On time"
      },
      tags: ["Design System", "UI/UX", "Component Library", "Figma"]
    }
  ],
  stats: {
    totalProjects: 47,
    completedProjects: 45,
    happyClients: 42,
    yearsExperience: 5,
    averageRating: 4.9,
    totalEarnings: 285000,
    onTimeDelivery: 96,
    repeatClients: 68
  },
  settings: {
    showPricing: true,
    showTestimonials: true,
    showMetrics: true,
    featuredProjectsLimit: 3
  },
  categories: [
    "Web Development",
    "Mobile App",
    "UI/UX Design", 
    "E-commerce",
    "API Development",
    "DevOps"
  ],
  skills: [
    "React", "TypeScript", "Node.js", "Next.js", "React Native",
    "UI/UX Design", "Figma", "AWS", "Docker", "PostgreSQL",
    "MongoDB", "Tailwind CSS", "API Development", "Microservices"
  ],
  lastUpdated: "2024-01-15T10:30:00Z"
}; 