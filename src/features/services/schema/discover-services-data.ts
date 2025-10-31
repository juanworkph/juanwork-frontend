export type ServicePricingType = "fixed" | "hourly" | "package";
export type DeliveryTime =
  | "24-hours"
  | "3-days"
  | "1-week"
  | "2-weeks"
  | "1-month"
  | "custom";

export interface ServiceProvider {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  country: string;
  countryCode: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  level: "entry" | "intermediate" | "expert";
  responseTime: string;
}

export interface ServicePricing {
  type: ServicePricingType;
  starting: number;
  hourlyRate?: number;
  packages?: {
    basic: number;
    standard: number;
    premium: number;
  };
  currency: string;
}

export interface DiscoverService {
  id: string;
  serviceName: string;
  description: string;
  category: string;
  skills: string[];
  pricing: ServicePricing;
  deliveryTime: DeliveryTime;
  provider: ServiceProvider;
  rating: number;
  reviewsCount: number;
  totalOrders: number;
  isFeatured: boolean;
  isTopRated: boolean;
  thumbnail?: string;
  gallery?: string[];
  revisions: number;
  serviceUrl: string;
}

export interface DiscoverServicesFilters {
  search: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  skills: string[];
  deliveryTime: DeliveryTime | "all";
  pricingType: ServicePricingType | "all";
  minRating: number;
  providerLevel: "entry" | "intermediate" | "expert" | "all";
  sortBy: "relevance" | "rating-high" | "price-low" | "price-high" | "popular";
}

export interface DiscoverServicesState {
  services: DiscoverService[];
  filters: DiscoverServicesFilters;
  totalServices: number;
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

export const getDeliveryTimeLabel = (time: DeliveryTime): string => {
  switch (time) {
    case "24-hours":
      return "24 Hours";
    case "3-days":
      return "3 Days";
    case "1-week":
      return "1 Week";
    case "2-weeks":
      return "2 Weeks";
    case "1-month":
      return "1 Month";
    case "custom":
      return "Custom";
    default:
      return time;
  }
};

export const getPricingTypeLabel = (type: ServicePricingType): string => {
  switch (type) {
    case "fixed":
      return "Fixed Price";
    case "hourly":
      return "Hourly Rate";
    case "package":
      return "Package Pricing";
    default:
      return type;
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
  "React Native",
  "Flutter",
  "WordPress",
  "Shopify",
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
  "Video Editing",
  "Animation",
  "SEO Services",
];

// Mock data
export const mockDiscoverServicesData: DiscoverServicesState = {
  services: [
    {
      id: "s1",
      serviceName: "Professional Full Stack Web Development",
      description:
        "I will create a modern, responsive full-stack web application using React, Next.js, Node.js, and MongoDB. Perfect for startups and businesses looking to establish their online presence with cutting-edge technology.",
      category: "Full Stack Development",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
      pricing: {
        type: "package",
        starting: 2000,
        packages: {
          basic: 2000,
          standard: 3500,
          premium: 5000,
        },
        currency: "USD",
      },
      deliveryTime: "1-month",
      provider: {
        id: "p1",
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        title: "Senior Full Stack Developer",
        country: "United States",
        countryCode: "US",
        rating: 4.9,
        reviewsCount: 127,
        verified: true,
        level: "expert",
        responseTime: "1 hour",
      },
      rating: 4.9,
      reviewsCount: 89,
      totalOrders: 143,
      isFeatured: true,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      gallery: ["img1.jpg", "img2.jpg", "img3.jpg"],
      revisions: 3,
      serviceUrl: "/services/s1",
    },
    {
      id: "s2",
      serviceName: "Mobile App Development with React Native",
      description:
        "Expert mobile app development for iOS and Android using React Native. I specialize in creating high-performance, user-friendly mobile applications with seamless user experiences.",
      category: "Mobile Development",
      skills: [
        "React Native",
        "JavaScript",
        "Redux",
        "Firebase",
        "iOS",
        "Android",
      ],
      pricing: {
        type: "hourly",
        starting: 75,
        hourlyRate: 75,
        currency: "USD",
      },
      deliveryTime: "2-weeks",
      provider: {
        id: "p2",
        name: "Sophie Martin",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        title: "Mobile App Developer",
        country: "France",
        countryCode: "FR",
        rating: 4.9,
        reviewsCount: 82,
        verified: true,
        level: "expert",
        responseTime: "1 hour",
      },
      rating: 4.8,
      reviewsCount: 67,
      totalOrders: 98,
      isFeatured: true,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      gallery: ["app1.jpg", "app2.jpg"],
      revisions: 2,
      serviceUrl: "/services/s2",
    },
    {
      id: "s3",
      serviceName: "UI/UX Design for Web and Mobile",
      description:
        "I will design beautiful, intuitive user interfaces and experiences for your web or mobile applications. Includes wireframes, mockups, prototypes, and design systems with pixel-perfect precision.",
      category: "UI/UX Design",
      skills: [
        "Figma",
        "Adobe XD",
        "UI/UX Design",
        "Prototyping",
        "User Research",
      ],
      pricing: {
        type: "fixed",
        starting: 800,
        currency: "USD",
      },
      deliveryTime: "1-week",
      provider: {
        id: "p3",
        name: "Maria Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        title: "UI/UX Designer & Product Designer",
        country: "Spain",
        countryCode: "ES",
        rating: 5.0,
        reviewsCount: 94,
        verified: true,
        level: "expert",
        responseTime: "30 minutes",
      },
      rating: 5.0,
      reviewsCount: 78,
      totalOrders: 108,
      isFeatured: true,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      gallery: ["design1.jpg", "design2.jpg", "design3.jpg"],
      revisions: 5,
      serviceUrl: "/services/s3",
    },
    {
      id: "s4",
      serviceName: "Python Data Analysis and Visualization",
      description:
        "Professional data analysis and visualization services using Python, Pandas, Matplotlib, and Seaborn. Perfect for businesses needing insights from their data with interactive dashboards.",
      category: "Data Science",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Analysis"],
      pricing: {
        type: "hourly",
        starting: 60,
        hourlyRate: 60,
        currency: "USD",
      },
      deliveryTime: "1-week",
      provider: {
        id: "p4",
        name: "Rachel Kim",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        title: "Data Scientist & ML Engineer",
        country: "South Korea",
        countryCode: "KR",
        rating: 4.9,
        reviewsCount: 48,
        verified: true,
        level: "expert",
        responseTime: "2 hours",
      },
      rating: 4.7,
      reviewsCount: 45,
      totalOrders: 67,
      isFeatured: false,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      revisions: 2,
      serviceUrl: "/services/s4",
    },
    {
      id: "s5",
      serviceName: "WordPress Custom Theme Development",
      description:
        "I will develop a custom WordPress theme tailored to your brand and requirements. Includes responsive design, plugin integration, SEO optimization, and WooCommerce support.",
      category: "WordPress",
      skills: ["WordPress", "PHP", "CSS", "JavaScript", "MySQL", "WooCommerce"],
      pricing: {
        type: "package",
        starting: 1200,
        packages: {
          basic: 1200,
          standard: 2000,
          premium: 3000,
        },
        currency: "USD",
      },
      deliveryTime: "2-weeks",
      provider: {
        id: "p5",
        name: "James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        title: "WordPress Expert & Theme Developer",
        country: "United Kingdom",
        countryCode: "GB",
        rating: 4.7,
        reviewsCount: 103,
        verified: true,
        level: "intermediate",
        responseTime: "3 hours",
      },
      rating: 4.8,
      reviewsCount: 92,
      totalOrders: 156,
      isFeatured: false,
      isTopRated: false,
      thumbnail:
        "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?w=800&h=400&fit=crop",
      revisions: 3,
      serviceUrl: "/services/s5",
    },
    {
      id: "s6",
      serviceName: "E-commerce Store Setup with Shopify",
      description:
        "Complete e-commerce store setup using Shopify. Includes theme customization, product listing, payment integration, shipping setup, and launch support with ongoing maintenance.",
      category: "E-commerce",
      skills: ["Shopify", "E-commerce", "CSS", "JavaScript", "Liquid"],
      pricing: {
        type: "fixed",
        starting: 1500,
        currency: "USD",
      },
      deliveryTime: "2-weeks",
      provider: {
        id: "p6",
        name: "Emma Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        title: "E-commerce Specialist",
        country: "Canada",
        countryCode: "CA",
        rating: 4.8,
        reviewsCount: 76,
        verified: true,
        level: "intermediate",
        responseTime: "2 hours",
      },
      rating: 4.9,
      reviewsCount: 68,
      totalOrders: 89,
      isFeatured: true,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop",
      revisions: 2,
      serviceUrl: "/services/s6",
    },
    {
      id: "s7",
      serviceName: "DevOps CI/CD Pipeline Implementation",
      description:
        "I will set up automated CI/CD pipelines using GitHub Actions, Jenkins, or GitLab CI. Includes Docker containerization, Kubernetes orchestration, and cloud deployment to AWS or Azure.",
      category: "DevOps",
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Jenkins",
        "GitHub Actions",
        "Terraform",
      ],
      pricing: {
        type: "hourly",
        starting: 85,
        hourlyRate: 85,
        currency: "USD",
      },
      deliveryTime: "1-week",
      provider: {
        id: "p7",
        name: "Emma Zhang",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        title: "DevOps Engineer & Cloud Architect",
        country: "Singapore",
        countryCode: "SG",
        rating: 5.0,
        reviewsCount: 58,
        verified: true,
        level: "expert",
        responseTime: "2 hours",
      },
      rating: 5.0,
      reviewsCount: 51,
      totalOrders: 71,
      isFeatured: true,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
      revisions: 1,
      serviceUrl: "/services/s7",
    },
    {
      id: "s8",
      serviceName: "RESTful API Development with Node.js",
      description:
        "Expert backend API development using Node.js, Express, and MongoDB. Includes authentication with JWT, comprehensive API documentation, testing, and deployment to cloud platforms.",
      category: "Backend Development",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "REST API",
        "JWT",
        "TypeScript",
      ],
      pricing: {
        type: "package",
        starting: 1800,
        packages: {
          basic: 1800,
          standard: 3000,
          premium: 4000,
        },
        currency: "USD",
      },
      deliveryTime: "2-weeks",
      provider: {
        id: "p8",
        name: "David Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        title: "Backend Developer",
        country: "Canada",
        countryCode: "CA",
        rating: 4.8,
        reviewsCount: 76,
        verified: true,
        level: "intermediate",
        responseTime: "2 hours",
      },
      rating: 4.9,
      reviewsCount: 73,
      totalOrders: 89,
      isFeatured: false,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      revisions: 3,
      serviceUrl: "/services/s8",
    },
    {
      id: "s9",
      serviceName: "Logo Design and Brand Identity",
      description:
        "Professional logo design and complete brand identity package. Includes logo concepts, color palette, typography guidelines, brand style guide, and source files in multiple formats.",
      category: "Graphic Design",
      skills: ["Illustrator", "Photoshop", "Brand Identity", "Logo Design"],
      pricing: {
        type: "package",
        starting: 500,
        packages: {
          basic: 500,
          standard: 800,
          premium: 1200,
        },
        currency: "USD",
      },
      deliveryTime: "3-days",
      provider: {
        id: "p9",
        name: "Lucas Silva",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        title: "Graphic Designer & Brand Specialist",
        country: "Brazil",
        countryCode: "BR",
        rating: 4.8,
        reviewsCount: 91,
        verified: true,
        level: "intermediate",
        responseTime: "1 hour",
      },
      rating: 4.9,
      reviewsCount: 105,
      totalOrders: 124,
      isFeatured: false,
      isTopRated: true,
      thumbnail:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=400&fit=crop",
      revisions: 5,
      serviceUrl: "/services/s9",
    },
    {
      id: "s10",
      serviceName: "SEO Optimization and Content Strategy",
      description:
        "Comprehensive SEO services to improve your website's search engine rankings. Includes keyword research, on-page optimization, technical SEO, content strategy, and monthly performance reports.",
      category: "SEO Services",
      skills: ["SEO", "Content Writing", "Google Analytics", "Marketing"],
      pricing: {
        type: "fixed",
        starting: 600,
        currency: "USD",
      },
      deliveryTime: "1-week",
      provider: {
        id: "p10",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        title: "SEO Specialist & Content Strategist",
        country: "United States",
        countryCode: "US",
        rating: 4.7,
        reviewsCount: 84,
        verified: true,
        level: "intermediate",
        responseTime: "3 hours",
      },
      rating: 4.8,
      reviewsCount: 72,
      totalOrders: 95,
      isFeatured: false,
      isTopRated: false,
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      revisions: 2,
      serviceUrl: "/services/s10",
    },
  ],
  filters: {
    search: "",
    category: "All Categories",
    priceRange: {
      min: 0,
      max: 10000,
    },
    skills: [],
    deliveryTime: "all",
    pricingType: "all",
    minRating: 0,
    providerLevel: "all",
    sortBy: "relevance",
  },
  totalServices: 10,
};
