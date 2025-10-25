export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  countryCode: string;
  verified: boolean;
  company?: string;
  projectsCompleted?: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  completedDate: string;
  budget: number;
  currency: string;
}

export interface ReviewRatings {
  overall: ReviewRating;
  communication: ReviewRating;
  quality: ReviewRating;
  expertise: ReviewRating;
  professionalism: ReviewRating;
  deadlines: ReviewRating;
}

export interface Review {
  id: string;
  client: Client;
  project: Project;
  ratings: ReviewRatings;
  message: string;
  createdAt: string;
  isPublic: boolean;
  isFeatured?: boolean;
  wasHelpful?: number;
  freelancerResponse?: {
    message: string;
    respondedAt: string;
  };
}

export interface ReviewsStats {
  total: number;
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  responseRate: number;
  averageCommunication: number;
  averageQuality: number;
  averageExpertise: number;
  averageProfessionalism: number;
  averageDeadlines: number;
}

export interface ReviewsFilters {
  rating: ReviewRating | "all";
  search: string;
  sortBy: "recent" | "rating" | "helpful";
  sortDirection: "asc" | "desc";
  isPublic?: boolean;
}

export interface ReviewsState {
  reviews: Review[];
  stats: ReviewsStats;
  filters: ReviewsFilters;
}

// Helper functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return "text-green-600 dark:text-green-400";
  if (rating >= 3.5) return "text-blue-600 dark:text-blue-400";
  if (rating >= 2.5) return "text-yellow-600 dark:text-yellow-400";
  if (rating >= 1.5) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

export const getRatingBgColor = (rating: number): string => {
  if (rating >= 4.5) return "bg-green-100 dark:bg-green-900/30";
  if (rating >= 3.5) return "bg-blue-100 dark:bg-blue-900/30";
  if (rating >= 2.5) return "bg-yellow-100 dark:bg-yellow-900/30";
  if (rating >= 1.5) return "bg-orange-100 dark:bg-orange-900/30";
  return "bg-red-100 dark:bg-red-900/30";
};

export const getStarPercentage = (rating: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((rating / total) * 100);
};

// Mock data for Freelancer
export const mockReviewsData: ReviewsState = {
  reviews: [
    {
      id: "1",
      client: {
        id: "client1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "TechCorp Inc.",
        projectsCompleted: 23,
      },
      project: {
        id: "proj1",
        name: "E-commerce Website Redesign",
        category: "Web Development",
        completedDate: "2024-01-25T16:00:00Z",
        budget: 4500,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 5,
        professionalism: 5,
        deadlines: 5,
      },
      message:
        "Exceptional work! The freelancer went above and beyond to deliver a stunning website redesign. Communication was excellent throughout the project, and they were very responsive to feedback. The final product exceeded our expectations in terms of both design and functionality. Would highly recommend and will definitely work together again!",
      createdAt: "2024-01-26T10:30:00Z",
      isPublic: true,
      isFeatured: true,
      wasHelpful: 12,
      freelancerResponse: {
        message:
          "Thank you so much for the wonderful review! It was a pleasure working with you and your team. Looking forward to future collaborations!",
        respondedAt: "2024-01-26T14:20:00Z",
      },
    },
    {
      id: "2",
      client: {
        id: "client2",
        name: "Ahmed Hassan",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        country: "United Arab Emirates",
        countryCode: "AE",
        verified: true,
        company: "Digital Solutions LLC",
        projectsCompleted: 15,
      },
      project: {
        id: "proj2",
        name: "Mobile App Development",
        category: "Mobile Development",
        completedDate: "2024-02-10T18:00:00Z",
        budget: 3600,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 5,
        professionalism: 4,
        deadlines: 5,
      },
      message:
        "Outstanding developer with great technical skills. The mobile app was delivered on time with all the features we requested. Very professional and easy to work with. The code quality is excellent and well-documented.",
      createdAt: "2024-02-11T09:15:00Z",
      isPublic: true,
      wasHelpful: 8,
    },
    {
      id: "3",
      client: {
        id: "client3",
        name: "Maria Garcia",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        country: "Spain",
        countryCode: "ES",
        verified: true,
        company: "Analytics Pro",
        projectsCompleted: 8,
      },
      project: {
        id: "proj3",
        name: "Data Analytics Dashboard",
        category: "Data Science",
        completedDate: "2024-01-20T14:00:00Z",
        budget: 2800,
        currency: "USD",
      },
      ratings: {
        overall: 4,
        communication: 4,
        quality: 5,
        expertise: 5,
        professionalism: 4,
        deadlines: 3,
      },
      message:
        "Very skilled developer with deep knowledge of data visualization. The dashboard looks great and works perfectly. There were some minor delays in delivery, but the quality of work made up for it. Would work with them again.",
      createdAt: "2024-01-21T11:30:00Z",
      isPublic: true,
      wasHelpful: 5,
      freelancerResponse: {
        message:
          "Thank you for your feedback! I apologize for the delay and appreciate your understanding. It was great working on this project with you.",
        respondedAt: "2024-01-21T16:45:00Z",
      },
    },
    {
      id: "4",
      client: {
        id: "client4",
        name: "James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        country: "Canada",
        countryCode: "CA",
        verified: false,
        company: "StartupHub",
        projectsCompleted: 12,
      },
      project: {
        id: "proj4",
        name: "Brand Identity Design",
        category: "Design",
        completedDate: "2024-02-05T12:00:00Z",
        budget: 1200,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 4,
        professionalism: 5,
        deadlines: 5,
      },
      message:
        "Amazing designer! Created a beautiful brand identity that perfectly captures our vision. Very creative and professional. Highly recommended!",
      createdAt: "2024-02-06T08:20:00Z",
      isPublic: true,
      isFeatured: true,
      wasHelpful: 15,
    },
    {
      id: "5",
      client: {
        id: "client5",
        name: "Lisa Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        country: "Singapore",
        countryCode: "SG",
        verified: true,
        company: "CloudTech Asia",
        projectsCompleted: 19,
      },
      project: {
        id: "proj5",
        name: "API Integration & Testing",
        category: "Backend Development",
        completedDate: "2024-01-15T16:30:00Z",
        budget: 1800,
        currency: "USD",
      },
      ratings: {
        overall: 4,
        communication: 4,
        quality: 4,
        expertise: 5,
        professionalism: 4,
        deadlines: 4,
      },
      message:
        "Solid technical skills and good communication. The API integration was done professionally and all tests passed. Would recommend for backend projects.",
      createdAt: "2024-01-16T13:10:00Z",
      isPublic: true,
      wasHelpful: 6,
    },
    {
      id: "6",
      client: {
        id: "client6",
        name: "Robert Brown",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        country: "Australia",
        countryCode: "AU",
        verified: true,
        company: "Digital Marketing Co",
        projectsCompleted: 7,
      },
      project: {
        id: "proj6",
        name: "WordPress Plugin Development",
        category: "WordPress Development",
        completedDate: "2023-12-20T10:00:00Z",
        budget: 800,
        currency: "USD",
      },
      ratings: {
        overall: 3,
        communication: 3,
        quality: 4,
        expertise: 4,
        professionalism: 3,
        deadlines: 2,
      },
      message:
        "The plugin works as expected, but there were significant delays in delivery. Communication could have been better. The final product is good, but the process was frustrating.",
      createdAt: "2023-12-21T15:40:00Z",
      isPublic: false,
      wasHelpful: 2,
    },
  ],
  stats: {
    total: 6,
    averageRating: 4.3,
    fiveStars: 3,
    fourStars: 2,
    threeStars: 1,
    twoStars: 0,
    oneStar: 0,
    responseRate: 50,
    averageCommunication: 4.3,
    averageQuality: 4.7,
    averageExpertise: 4.7,
    averageProfessionalism: 4.2,
    averageDeadlines: 4.0,
  },
  filters: {
    rating: "all",
    search: "",
    sortBy: "recent",
    sortDirection: "desc",
  },
};

// Mock data for Client
export const mockClientReviewsData: ReviewsState = {
  reviews: [
    {
      id: "1",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png", // This would be the client's company logo
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj1",
        name: "E-commerce Website Redesign",
        category: "Web Development",
        completedDate: "2024-01-25T16:00:00Z",
        budget: 4500,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 5,
        professionalism: 5,
        deadlines: 5,
      },
      message:
        "John delivered exceptional work on our e-commerce redesign. His communication was excellent throughout the project, and he was very responsive to feedback. The final product exceeded our expectations in terms of both design and functionality. Would highly recommend and will definitely work together again!",
      createdAt: "2024-01-26T10:30:00Z",
      isPublic: true,
      isFeatured: true,
      wasHelpful: 12,
      freelancerResponse: {
        message:
          "Thank you so much for the wonderful review! It was a pleasure working with you and your team. Looking forward to future collaborations!",
        respondedAt: "2024-01-26T14:20:00Z",
      },
    },
    {
      id: "2",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj2",
        name: "Mobile App Development",
        category: "Mobile Development",
        completedDate: "2024-02-10T18:00:00Z",
        budget: 3600,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 5,
        professionalism: 4,
        deadlines: 5,
      },
      message:
        "Ahmed developed an outstanding mobile app for us with all the features we requested. Very professional and easy to work with. The code quality is excellent and well-documented. We're already planning our next project together.",
      createdAt: "2024-02-11T09:15:00Z",
      isPublic: true,
      wasHelpful: 8,
      freelancerResponse: {
        message:
          "Thank you for the great review! It was a pleasure working on your mobile app. Looking forward to our next project together.",
        respondedAt: "2024-02-11T15:30:00Z",
      },
    },
    {
      id: "3",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj3",
        name: "Data Analytics Dashboard",
        category: "Data Science",
        completedDate: "2024-01-20T14:00:00Z",
        budget: 2800,
        currency: "USD",
      },
      ratings: {
        overall: 4,
        communication: 4,
        quality: 5,
        expertise: 5,
        professionalism: 4,
        deadlines: 3,
      },
      message:
        "Maria created a great data visualization dashboard for us. She has deep knowledge of data visualization techniques. There were some minor delays in delivery, but the quality of work made up for it. We would work with her again.",
      createdAt: "2024-01-21T11:30:00Z",
      isPublic: true,
      wasHelpful: 5,
      freelancerResponse: {
        message:
          "Thank you for your feedback! I apologize for the delay and appreciate your understanding. It was great working on this project with you.",
        respondedAt: "2024-01-21T16:45:00Z",
      },
    },
    {
      id: "4",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj4",
        name: "Brand Identity Design",
        category: "Design",
        completedDate: "2024-02-05T12:00:00Z",
        budget: 1200,
        currency: "USD",
      },
      ratings: {
        overall: 5,
        communication: 5,
        quality: 5,
        expertise: 4,
        professionalism: 5,
        deadlines: 5,
      },
      message:
        "Emily designed an amazing brand identity that perfectly captures our vision. Very creative and professional throughout the entire process. We've already received numerous compliments on our new branding.",
      createdAt: "2024-02-06T08:20:00Z",
      isPublic: true,
      isFeatured: true,
      wasHelpful: 15,
    },
    {
      id: "5",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj5",
        name: "API Integration & Testing",
        category: "Backend Development",
        completedDate: "2024-01-15T16:30:00Z",
        budget: 1800,
        currency: "USD",
      },
      ratings: {
        overall: 4,
        communication: 4,
        quality: 4,
        expertise: 5,
        professionalism: 4,
        deadlines: 4,
      },
      message:
        "Michael demonstrated solid technical skills and good communication throughout the project. The API integration was done professionally and all tests passed. Would recommend for backend projects.",
      createdAt: "2024-01-16T13:10:00Z",
      isPublic: true,
      wasHelpful: 6,
      freelancerResponse: {
        message:
          "Thank you for the opportunity to work on this project! I'm glad everything met your expectations and look forward to possibly working together again.",
        respondedAt: "2024-01-16T18:25:00Z",
      },
    },
    {
      id: "6",
      client: {
        id: "client1",
        name: "Your Company",
        avatar: "/images/logo.png",
        country: "United States",
        countryCode: "US",
        verified: true,
        company: "Your Company",
      },
      project: {
        id: "proj6",
        name: "WordPress Plugin Development",
        category: "WordPress Development",
        completedDate: "2023-12-20T10:00:00Z",
        budget: 800,
        currency: "USD",
      },
      ratings: {
        overall: 3,
        communication: 3,
        quality: 4,
        expertise: 4,
        professionalism: 3,
        deadlines: 2,
      },
      message:
        "The plugin works as expected, but there were significant delays in delivery. Communication could have been better during the development process. The final product is good, but the process was somewhat frustrating.",
      createdAt: "2023-12-21T15:40:00Z",
      isPublic: false,
      wasHelpful: 2,
      freelancerResponse: {
        message:
          "I appreciate your honest feedback. I sincerely apologize for the delays and communication issues. I've taken your feedback to heart and am improving my processes to ensure better experiences for future clients.",
        respondedAt: "2023-12-22T09:15:00Z",
      },
    },
  ],
  stats: {
    total: 6,
    averageRating: 4.3,
    fiveStars: 3,
    fourStars: 2,
    threeStars: 1,
    twoStars: 0,
    oneStar: 0,
    responseRate: 83, // 5 out of 6 have responses
    averageCommunication: 4.3,
    averageQuality: 4.7,
    averageExpertise: 4.5,
    averageProfessionalism: 4.2,
    averageDeadlines: 4.0,
  },
  filters: {
    rating: "all",
    search: "",
    sortBy: "recent",
    sortDirection: "desc",
  },
};
