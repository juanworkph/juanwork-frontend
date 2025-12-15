export type ServiceFilterStatus =
  | "all"
  | "pending"
  | "approved"
  | "declined"
  | "draft";
export type MyServiceStatus = "pending" | "approved" | "declined" | "draft";

export interface MyService {
  id: string;
  serviceName: string;
  description: string;
  category: string;
  skills: string[];
  projectType: "fixed" | "hourly";
  budget: {
    min: number;
    max: number;
    hourlyRate?: number;
  };
  status: MyServiceStatus;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  inquiries: number;
  upgrades: string[];
  thumbnail?: string;
}

// Mock data for services
export const mockMyServices: MyService[] = [
  {
    id: "1",
    serviceName: "Professional Full Stack Web Development",
    description:
      "I will create a modern, responsive full-stack web application using React, Next.js, Node.js, and MongoDB. Perfect for startups and businesses looking to establish their online presence.",
    category: "Full Stack Development",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
    ],
    projectType: "fixed",
    budget: {
      min: 2000,
      max: 5000,
    },
    status: "approved",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    views: 450,
    inquiries: 23,
    upgrades: ["featured", "urgent"],
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    serviceName: "Mobile App Development with React Native",
    description:
      "Expert mobile app development for iOS and Android using React Native. I specialize in creating high-performance, user-friendly mobile applications.",
    category: "Mobile Development",
    skills: ["React Native", "JavaScript", "Redux", "Firebase"],
    projectType: "hourly",
    budget: {
      hourlyRate: 75,
      min: 0,
      max: 0,
    },
    status: "approved",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    views: 320,
    inquiries: 15,
    upgrades: ["nda"],
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    serviceName: "UI/UX Design for Web and Mobile",
    description:
      "I will design beautiful, intuitive user interfaces and experiences for your web or mobile applications. Includes wireframes, mockups, and prototypes.",
    category: "UI/UX Design",
    skills: ["Figma", "Adobe XD", "Sketch", "UI/UX Design", "Prototyping"],
    projectType: "fixed",
    budget: {
      min: 800,
      max: 2000,
    },
    status: "pending",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    views: 120,
    inquiries: 5,
    upgrades: ["featured"],
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    serviceName: "Python Data Analysis and Visualization",
    description:
      "Professional data analysis and visualization services using Python, Pandas, and Matplotlib. Perfect for businesses needing insights from their data.",
    category: "Data Science",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Analysis"],
    projectType: "hourly",
    budget: {
      hourlyRate: 60,
      min: 0,
      max: 0,
    },
    status: "declined",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-12"),
    views: 89,
    inquiries: 2,
    upgrades: [],
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    serviceName: "WordPress Custom Theme Development",
    description:
      "I will develop a custom WordPress theme tailored to your brand and requirements. Includes responsive design, plugin integration, and SEO optimization.",
    category: "WordPress",
    skills: ["WordPress", "PHP", "CSS", "JavaScript", "MySQL"],
    projectType: "fixed",
    budget: {
      min: 1200,
      max: 3000,
    },
    status: "approved",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
    views: 280,
    inquiries: 18,
    upgrades: ["sealed"],
    thumbnail:
      "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    serviceName: "E-commerce Store Setup with Shopify",
    description:
      "Complete e-commerce store setup using Shopify. Includes theme customization, product listing, payment integration, and launch support.",
    category: "E-commerce",
    skills: ["Shopify", "E-commerce", "CSS", "JavaScript", "Liquid"],
    projectType: "fixed",
    budget: {
      min: 1500,
      max: 3500,
    },
    status: "draft",
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28"),
    views: 0,
    inquiries: 0,
    upgrades: [],
    thumbnail:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop",
  },
  {
    id: "7",
    serviceName: "DevOps CI/CD Pipeline Implementation",
    description:
      "I will set up automated CI/CD pipelines using GitHub Actions, Jenkins, or GitLab CI. Includes Docker containerization and cloud deployment.",
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "GitHub Actions"],
    projectType: "hourly",
    budget: {
      hourlyRate: 85,
      min: 0,
      max: 0,
    },
    status: "pending",
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-26"),
    views: 95,
    inquiries: 7,
    upgrades: ["urgent"],
    thumbnail:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
  },
  {
    id: "8",
    serviceName: "RESTful API Development with Node.js",
    description:
      "Expert backend API development using Node.js, Express, and MongoDB. Includes authentication, documentation, and deployment.",
    category: "Backend Development",
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
    projectType: "fixed",
    budget: {
      min: 1800,
      max: 4000,
    },
    status: "approved",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-22"),
    views: 410,
    inquiries: 21,
    upgrades: ["featured", "nda", "ip-agreement"],
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  },
];

// Status badge configurations
export const statusConfig = {
  approved: {
    label: "Approved",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "✓",
  },
  pending: {
    label: "Pending Review",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "⏳",
  },
  declined: {
    label: "Declined",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "✕",
  },
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    icon: "📝",
  },
};

// Filter options
export const filterOptions: {
  value: ServiceFilterStatus;
  label: string;
  count?: number;
}[] = [
  { value: "all", label: "All Services" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending Review" },
  { value: "declined", label: "Declined" },
  { value: "draft", label: "Drafts" },
];

// Helper functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getServicesByStatus = (
  services: MyService[],
  status: ServiceFilterStatus
): MyService[] => {
  if (status === "all") {
    return services;
  }
  return services.filter((service) => service.status === status);
};
