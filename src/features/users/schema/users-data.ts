export type FreelancerExperienceLevel = "entry" | "intermediate" | "expert";
export type AvailabilityStatus = "available" | "busy" | "not-available";

export interface FreelancerProfile {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  bio: string;
  category: string;
  skills: string[];
  hourlyRate: {
    min: number;
    max: number;
    currency: string;
  };
  country: string;
  countryCode: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  experienceLevel: FreelancerExperienceLevel;
  availability: AvailabilityStatus;
  completedJobs: number;
  successRate: number;
  totalEarnings: number;
  responseTime: string;
  memberSince: string;
  languages: string[];
  portfolio?: {
    items: number;
    featuredWork?: string[];
  };
  certifications?: string[];
  education?: string;
  isFeatured: boolean;
  isTopRated: boolean;
  profileUrl: string;
}

export interface DiscoverFreelancersFilters {
  search: string;
  category: string;
  hourlyRateRange: {
    min: number;
    max: number;
  };
  skills: string[];
  experienceLevel: FreelancerExperienceLevel | "all";
  availability: AvailabilityStatus | "all";
  location: string;
  languages: string[];
  minRating: number;
  sortBy: "relevance" | "rating-high" | "rate-low" | "rate-high" | "experience";
}

export interface DiscoverFreelancersState {
  freelancers: FreelancerProfile[];
  filters: DiscoverFreelancersFilters;
  totalFreelancers: number;
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

export const getExperienceLevelLabel = (
  level: FreelancerExperienceLevel
): string => {
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

export const getAvailabilityLabel = (status: AvailabilityStatus): string => {
  switch (status) {
    case "available":
      return "Available Now";
    case "busy":
      return "Busy";
    case "not-available":
      return "Not Available";
    default:
      return status;
  }
};

export const getAvailabilityColor = (status: AvailabilityStatus): string => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "busy":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "not-available":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
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
  "Swift",
  "Kotlin",
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
];

// Available languages
export const availableLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Portuguese",
  "Italian",
  "Russian",
  "Arabic",
  "Hindi",
];

// Mock data
export const mockDiscoverFreelancersData: DiscoverFreelancersState = {
  freelancers: [
    {
      id: "f1",
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "Senior Full Stack Developer",
      bio: "Experienced full-stack developer specializing in React, Next.js, and Node.js. Built 50+ web applications for startups and enterprises. Expert in creating scalable, performant solutions.",
      category: "Full Stack Development",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "AWS",
      ],
      hourlyRate: {
        min: 60,
        max: 85,
        currency: "USD",
      },
      country: "United States",
      countryCode: "US",
      rating: 4.9,
      reviewsCount: 127,
      verified: true,
      experienceLevel: "expert",
      availability: "available",
      completedJobs: 143,
      successRate: 98,
      totalEarnings: 285000,
      responseTime: "1 hour",
      memberSince: "2020-03-15",
      languages: ["English"],
      portfolio: {
        items: 28,
        featuredWork: ["work1.jpg", "work2.jpg", "work3.jpg"],
      },
      certifications: ["AWS Certified Developer", "React Advanced"],
      education: "B.S. Computer Science, MIT",
      isFeatured: true,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f1",
    },
    {
      id: "f2",
      name: "Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      title: "UI/UX Designer & Product Designer",
      bio: "Award-winning UI/UX designer with 8 years of experience. Specialized in creating beautiful, user-centered designs for web and mobile applications. Fluent in Figma and Adobe Creative Suite.",
      category: "UI/UX Design",
      skills: [
        "Figma",
        "UI/UX Design",
        "Adobe XD",
        "Prototyping",
        "User Research",
      ],
      hourlyRate: {
        min: 50,
        max: 75,
        currency: "USD",
      },
      country: "Spain",
      countryCode: "ES",
      rating: 5.0,
      reviewsCount: 94,
      verified: true,
      experienceLevel: "expert",
      availability: "available",
      completedJobs: 108,
      successRate: 99,
      totalEarnings: 195000,
      responseTime: "30 minutes",
      memberSince: "2019-08-22",
      languages: ["English", "Spanish"],
      portfolio: {
        items: 42,
        featuredWork: ["design1.jpg", "design2.jpg"],
      },
      certifications: [
        "Google UX Design Professional",
        "Nielsen Norman Group UX",
      ],
      education: "M.A. Design, Central Saint Martins",
      isFeatured: true,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f2",
    },
    {
      id: "f3",
      name: "David Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      title: "Python Developer & Data Engineer",
      bio: "Python specialist with expertise in Django, Flask, data processing, and API development. Strong background in building scalable backend systems and data pipelines.",
      category: "Backend Development",
      skills: ["Python", "Django", "PostgreSQL", "REST API", "Docker", "AWS"],
      hourlyRate: {
        min: 45,
        max: 70,
        currency: "USD",
      },
      country: "Canada",
      countryCode: "CA",
      rating: 4.8,
      reviewsCount: 76,
      verified: true,
      experienceLevel: "intermediate",
      availability: "busy",
      completedJobs: 89,
      successRate: 96,
      totalEarnings: 142000,
      responseTime: "2 hours",
      memberSince: "2021-01-10",
      languages: ["English", "Chinese"],
      portfolio: {
        items: 18,
      },
      certifications: ["AWS Solutions Architect"],
      education: "B.S. Computer Engineering, University of Toronto",
      isFeatured: false,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f3",
    },
    {
      id: "f4",
      name: "Sophie Martin",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      title: "Mobile App Developer (iOS & Android)",
      bio: "Specialized in React Native and Flutter development. Built 30+ mobile apps with 5M+ downloads. Expert in creating smooth, native-feeling cross-platform applications.",
      category: "Mobile Development",
      skills: [
        "React Native",
        "Flutter",
        "TypeScript",
        "Firebase",
        "iOS",
        "Android",
      ],
      hourlyRate: {
        min: 55,
        max: 80,
        currency: "USD",
      },
      country: "France",
      countryCode: "FR",
      rating: 4.9,
      reviewsCount: 82,
      verified: true,
      experienceLevel: "expert",
      availability: "available",
      completedJobs: 67,
      successRate: 97,
      totalEarnings: 178000,
      responseTime: "1 hour",
      memberSince: "2020-06-18",
      languages: ["English", "French"],
      portfolio: {
        items: 24,
        featuredWork: ["app1.jpg", "app2.jpg", "app3.jpg"],
      },
      certifications: ["Google Flutter Developer"],
      education: "M.S. Software Engineering, École Polytechnique",
      isFeatured: true,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f4",
    },
    {
      id: "f5",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      title: "WordPress Expert & Theme Developer",
      bio: "WordPress developer with 6 years of experience. Specialized in custom theme development, plugin creation, and WooCommerce solutions. Built 100+ WordPress sites.",
      category: "WordPress",
      skills: ["WordPress", "PHP", "JavaScript", "CSS", "WooCommerce", "MySQL"],
      hourlyRate: {
        min: 35,
        max: 55,
        currency: "USD",
      },
      country: "United Kingdom",
      countryCode: "GB",
      rating: 4.7,
      reviewsCount: 103,
      verified: true,
      experienceLevel: "intermediate",
      availability: "available",
      completedJobs: 156,
      successRate: 95,
      totalEarnings: 124000,
      responseTime: "3 hours",
      memberSince: "2019-11-05",
      languages: ["English"],
      portfolio: {
        items: 35,
      },
      certifications: ["WordPress Certified Developer"],
      isFeatured: false,
      isTopRated: false,
      profileUrl: "/freelancer/profile/f5",
    },
    {
      id: "f6",
      name: "Emma Zhang",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      title: "DevOps Engineer & Cloud Architect",
      bio: "DevOps specialist focused on AWS, Docker, Kubernetes, and CI/CD pipelines. Helping companies build and scale their cloud infrastructure efficiently.",
      category: "DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
      hourlyRate: {
        min: 70,
        max: 95,
        currency: "USD",
      },
      country: "Singapore",
      countryCode: "SG",
      rating: 5.0,
      reviewsCount: 58,
      verified: true,
      experienceLevel: "expert",
      availability: "busy",
      completedJobs: 71,
      successRate: 100,
      totalEarnings: 210000,
      responseTime: "2 hours",
      memberSince: "2020-09-12",
      languages: ["English", "Chinese"],
      portfolio: {
        items: 15,
      },
      certifications: [
        "AWS Certified Solutions Architect",
        "Kubernetes Certified Administrator",
      ],
      education: "B.S. Computer Science, National University of Singapore",
      isFeatured: true,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f6",
    },
    {
      id: "f7",
      name: "Lucas Silva",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      title: "Graphic Designer & Brand Specialist",
      bio: "Creative graphic designer specializing in brand identity, logo design, and marketing materials. Passionate about creating memorable visual experiences that tell stories.",
      category: "Graphic Design",
      skills: [
        "Illustrator",
        "Photoshop",
        "Figma",
        "Brand Identity",
        "Logo Design",
      ],
      hourlyRate: {
        min: 40,
        max: 60,
        currency: "USD",
      },
      country: "Brazil",
      countryCode: "BR",
      rating: 4.8,
      reviewsCount: 91,
      verified: true,
      experienceLevel: "intermediate",
      availability: "available",
      completedJobs: 124,
      successRate: 96,
      totalEarnings: 98000,
      responseTime: "1 hour",
      memberSince: "2021-03-20",
      languages: ["English", "Portuguese", "Spanish"],
      portfolio: {
        items: 48,
        featuredWork: ["brand1.jpg", "brand2.jpg"],
      },
      certifications: ["Adobe Certified Professional"],
      isFeatured: false,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f7",
    },
    {
      id: "f8",
      name: "Rachel Kim",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      title: "Data Scientist & ML Engineer",
      bio: "Data scientist with expertise in machine learning, deep learning, and data analysis. Experienced in building predictive models and deploying ML solutions at scale.",
      category: "Data Science",
      skills: [
        "Python",
        "Machine Learning",
        "TensorFlow",
        "PyTorch",
        "SQL",
        "R",
      ],
      hourlyRate: {
        min: 65,
        max: 90,
        currency: "USD",
      },
      country: "South Korea",
      countryCode: "KR",
      rating: 4.9,
      reviewsCount: 48,
      verified: true,
      experienceLevel: "expert",
      availability: "available",
      completedJobs: 52,
      successRate: 98,
      totalEarnings: 156000,
      responseTime: "2 hours",
      memberSince: "2021-07-08",
      languages: ["English", "Korean"],
      portfolio: {
        items: 12,
      },
      certifications: [
        "Google TensorFlow Developer",
        "AWS Machine Learning Specialty",
      ],
      education: "Ph.D. Computer Science, Stanford University",
      isFeatured: true,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f8",
    },
    {
      id: "f9",
      name: "Oliver Brown",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      title: "Frontend Developer & React Specialist",
      bio: "Frontend developer focused on React, TypeScript, and modern web technologies. Creating beautiful, performant user interfaces with attention to detail and accessibility.",
      category: "Frontend Development",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Redux",
        "GraphQL",
      ],
      hourlyRate: {
        min: 50,
        max: 70,
        currency: "USD",
      },
      country: "Australia",
      countryCode: "AU",
      rating: 4.7,
      reviewsCount: 64,
      verified: true,
      experienceLevel: "intermediate",
      availability: "available",
      completedJobs: 78,
      successRate: 94,
      totalEarnings: 112000,
      responseTime: "4 hours",
      memberSince: "2020-12-01",
      languages: ["English"],
      portfolio: {
        items: 22,
      },
      certifications: ["React Advanced Patterns"],
      education: "B.S. Computer Science, University of Sydney",
      isFeatured: false,
      isTopRated: false,
      profileUrl: "/freelancer/profile/f9",
    },
    {
      id: "f10",
      name: "Aisha Patel",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      title: "Vue.js Developer & Frontend Architect",
      bio: "Vue.js expert with strong experience in building complex SPAs. Specialized in component architecture, state management, and performance optimization.",
      category: "Frontend Development",
      skills: ["Vue.js", "JavaScript", "TypeScript", "Nuxt.js", "Vuex", "CSS"],
      hourlyRate: {
        min: 45,
        max: 65,
        currency: "USD",
      },
      country: "India",
      countryCode: "IN",
      rating: 4.8,
      reviewsCount: 87,
      verified: true,
      experienceLevel: "intermediate",
      availability: "not-available",
      completedJobs: 96,
      successRate: 97,
      totalEarnings: 105000,
      responseTime: "3 hours",
      memberSince: "2021-02-14",
      languages: ["English", "Hindi"],
      portfolio: {
        items: 31,
      },
      certifications: ["Vue.js Certified Developer"],
      education: "B.Tech Computer Engineering, IIT Delhi",
      isFeatured: false,
      isTopRated: true,
      profileUrl: "/freelancer/profile/f10",
    },
  ],
  filters: {
    search: "",
    category: "All Categories",
    hourlyRateRange: {
      min: 0,
      max: 200,
    },
    skills: [],
    experienceLevel: "all",
    availability: "all",
    location: "",
    languages: [],
    minRating: 0,
    sortBy: "relevance",
  },
  totalFreelancers: 10,
};
