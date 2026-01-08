import type { ProviderLevel } from "./discover-services-data";

// Delivery time type
export type DeliveryTime = "1-week" | "2-weeks" | "1-month" | "2-months" | "3-months";

// Extended service details with additional information
export interface ServiceDetailsData {
  id: string;
  serviceName: string;
  description: string;
  longDescription: string;
  category: string;
  skills: string[];
  pricing: {
    type: "package" | "hourly" | "fixed";
    starting: number;
    packages?: {
      basic: number;
      standard: number;
      premium: number;
    };
    hourlyRate?: number;
    currency: string;
  };
  deliveryTime: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    country: string;
    countryCode: string;
    rating: number;
    reviewsCount: number;
    verified: boolean;
    level: ProviderLevel;
    responseTime: string;
  };
  rating: number;
  reviewsCount: number;
  totalOrders: number;
  isFeatured: boolean;
  isTopRated: boolean;
  thumbnail: string;
  gallery: string[];
  revisions: number;
  serviceUrl: string;
  features: string[];
  requirements?: string[];
  faqs?: FAQ[];
  packageDetails?: PackageDetails;
}

// Package details for each tier
export interface PackageDetails {
  basic: PackageDetail;
  standard: PackageDetail;
  premium: PackageDetail;
}

export interface PackageDetail {
  name: string;
  price: number;
  deliveryTime: DeliveryTime;
  revisions: number;
  features: string[];
  description: string;
}

// FAQ structure
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Helper function to get service details by ID
export const getServiceDetailsById = (
  serviceId: string
): ServiceDetailsData | null => {
  const service = mockServiceDetailsData.find((s) => s.id === serviceId);
  return service || null;
};

// Mock service details data (extending the discover services data)
export const mockServiceDetailsData: ServiceDetailsData[] = [
  {
    id: "s1",
    serviceName: "Professional Full Stack Web Development",
    description:
      "I will create a modern, responsive full-stack web application using React, Next.js, Node.js, and MongoDB. Perfect for startups and businesses looking to establish their online presence with cutting-edge technology.",
    longDescription:
      "Transform your business idea into a fully functional web application with my professional full-stack development service. I specialize in building scalable, secure, and high-performance web applications using the latest technologies including React, Next.js, Node.js, and MongoDB.\n\nWith over 5 years of experience in full-stack development, I've helped numerous startups and established businesses launch their digital products successfully. My approach focuses on clean code, best practices, and delivering solutions that not only meet but exceed expectations.\n\nWhat sets my service apart is the attention to detail, commitment to deadlines, and ongoing support even after project completion. I believe in building long-term relationships with my clients and ensuring their success in the digital space.",
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
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop",
    ],
    revisions: 3,
    serviceUrl: "/services/s1",
    features: [
      "Responsive design for all devices",
      "Modern UI/UX implementation",
      "RESTful API development",
      "Database design and optimization",
      "User authentication and authorization",
      "Payment gateway integration",
      "Admin dashboard",
      "Email notifications",
      "SEO optimization",
      "Performance optimization",
      "Security best practices",
      "Code documentation",
    ],
    requirements: [
      "Detailed project requirements document",
      "Brand assets (logo, colors, fonts)",
      "Content for the website",
      "Third-party API credentials (if applicable)",
      "Hosting credentials (if deployment included)",
    ],
    packageDetails: {
      basic: {
        name: "Basic Package",
        price: 2000,
        deliveryTime: "1-month",
        revisions: 2,
        description:
          "Perfect for small projects and MVPs. Get a functional web application with essential features.",
        features: [
          "Up to 5 pages/screens",
          "Responsive design",
          "Basic user authentication",
          "Database integration",
          "Contact form",
          "Basic SEO setup",
          "2 revisions",
          "30 days support",
        ],
      },
      standard: {
        name: "Standard Package",
        price: 3500,
        deliveryTime: "1-month",
        revisions: 3,
        description:
          "Most popular choice for growing businesses. Includes advanced features and integrations.",
        features: [
          "Up to 10 pages/screens",
          "Responsive design",
          "Advanced user authentication",
          "Database integration",
          "Payment gateway integration",
          "Admin dashboard",
          "Email notifications",
          "Advanced SEO optimization",
          "3 revisions",
          "60 days support",
        ],
      },
      premium: {
        name: "Premium Package",
        price: 5000,
        deliveryTime: "1-month",
        revisions: 5,
        description:
          "Complete solution for established businesses. Everything you need for a production-ready application.",
        features: [
          "Unlimited pages/screens",
          "Responsive design",
          "Advanced user authentication with roles",
          "Database integration and optimization",
          "Payment gateway integration",
          "Advanced admin dashboard",
          "Email and SMS notifications",
          "Third-party API integrations",
          "Advanced SEO optimization",
          "Performance optimization",
          "Security audit",
          "Deployment to production",
          "5 revisions",
          "90 days support",
        ],
      },
    },
    faqs: [
      {
        id: "faq1",
        question: "What technologies do you use?",
        answer:
          "I primarily use React and Next.js for the frontend, Node.js with Express for the backend, and MongoDB for the database. I also work with TypeScript for type safety and Tailwind CSS for styling. All technologies are chosen based on project requirements.",
      },
      {
        id: "faq2",
        question: "Do you provide source code?",
        answer:
          "Yes, absolutely! You will receive the complete source code with documentation. The code is clean, well-organized, and follows industry best practices.",
      },
      {
        id: "faq3",
        question: "Will the website be mobile-friendly?",
        answer:
          "Yes, all websites I develop are fully responsive and optimized for mobile, tablet, and desktop devices. Mobile-first design is a standard practice in all my projects.",
      },
      {
        id: "faq4",
        question: "Do you offer post-launch support?",
        answer:
          "Yes, all packages include post-launch support ranging from 30 to 90 days depending on the package. During this period, I'll fix any bugs and provide technical assistance.",
      },
      {
        id: "faq5",
        question: "Can you integrate third-party services?",
        answer:
          "Absolutely! I have experience integrating various third-party services including payment gateways (Stripe, PayPal), email services (SendGrid, Mailchimp), analytics tools, and more.",
      },
    ],
  },
  {
    id: "s2",
    serviceName: "Mobile App Development with React Native",
    description:
      "Expert mobile app development for iOS and Android using React Native. I specialize in creating high-performance, user-friendly mobile applications with seamless user experiences.",
    longDescription:
      "Bring your mobile app idea to life with professional React Native development. I create cross-platform mobile applications that work seamlessly on both iOS and Android devices, saving you time and development costs.\n\nWith extensive experience in mobile app development, I focus on creating apps that are not only functional but also provide an exceptional user experience. From concept to deployment, I handle every aspect of the development process.",
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
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    ],
    revisions: 2,
    serviceUrl: "/services/s2",
    features: [
      "Cross-platform development (iOS & Android)",
      "Native performance optimization",
      "Push notifications",
      "Offline functionality",
      "Real-time data synchronization",
      "Social media integration",
      "In-app purchases",
      "Analytics integration",
      "App store submission assistance",
    ],
    requirements: [
      "Detailed app requirements",
      "Design mockups or wireframes",
      "API documentation (if backend exists)",
      "App store developer accounts",
    ],
    faqs: [
      {
        id: "faq1",
        question: "Will the app work on both iOS and Android?",
        answer:
          "Yes! React Native allows me to build apps that work on both platforms with a single codebase, ensuring consistency and reducing development time.",
      },
      {
        id: "faq2",
        question: "Can you help with app store submission?",
        answer:
          "Yes, I provide guidance and assistance with submitting your app to both the Apple App Store and Google Play Store.",
      },
    ],
  },
  {
    id: "s3",
    serviceName: "UI/UX Design for Web and Mobile",
    description:
      "I will design beautiful, intuitive user interfaces and experiences for your web or mobile applications. Includes wireframes, mockups, prototypes, and design systems with pixel-perfect precision.",
    longDescription:
      "Create stunning user experiences that delight your users and drive conversions. I specialize in UI/UX design for web and mobile applications, combining aesthetics with functionality to create interfaces that users love.\n\nMy design process is user-centered and data-driven. I conduct thorough research, create detailed wireframes and prototypes, and iterate based on feedback to ensure the final design meets both user needs and business goals.",
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
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    ],
    revisions: 5,
    serviceUrl: "/services/s3",
    features: [
      "User research and personas",
      "Information architecture",
      "Wireframing",
      "High-fidelity mockups",
      "Interactive prototypes",
      "Design system creation",
      "Responsive design",
      "Accessibility compliance",
      "Usability testing",
    ],
    requirements: [
      "Project brief and goals",
      "Target audience information",
      "Brand guidelines (if available)",
      "Competitor examples",
      "Content outline",
    ],
    faqs: [
      {
        id: "faq1",
        question: "What design tools do you use?",
        answer:
          "I primarily use Figma for all design work as it allows for easy collaboration and handoff to developers. I can also work with Adobe XD if preferred.",
      },
      {
        id: "faq2",
        question: "Will I receive the source files?",
        answer:
          "Yes, you'll receive all source files including Figma/XD files, exported assets, and a complete design system documentation.",
      },
    ],
  },
];
