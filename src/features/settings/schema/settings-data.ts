export type SettingsTab =
  | "profile"
  | "juanpoints"
  | "password"
  | "social"
  | "notifications"
  | "privacy"
  | "deactivation";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  title: string;
  hourlyRate: number;
  avatar?: string;
  location: string;
  timezone: string;
  languages: string[];
  skills: string[];
}

export interface JuanPoints {
  currentPoints: number;
  totalEarned: number;
  lifetimePoints: number;
  level: number;
  nextLevelPoints: number;
  rewardsRedeemed: number;
  adsWatched: number;
  dailyLimit: number;
  dailyWatched: number;
}

export interface JuanPointsHistory {
  id: string;
  type: "earned" | "redeemed" | "expired" | "bonus";
  points: number;
  description: string;
  date: string;
}

export interface SocialLinks {
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  portfolio?: string;
  behance?: string;
  dribbble?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  projectUpdates: boolean;
  messageNotifications: boolean;
  paymentAlerts: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "clients-only";
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showEarnings: boolean;
  allowSearchEngines: boolean;
  showOnlineStatus: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: "discount" | "feature" | "boost" | "badge";
  image?: string;
  available: boolean;
}

export interface SettingsState {
  profile: UserProfile;
  juanPoints: JuanPoints;
  pointsHistory: JuanPointsHistory[];
  socialLinks: SocialLinks;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  availableRewards: Reward[];
}

// Helper functions
export const calculateLevel = (points: number): number => {
  return Math.floor(points / 1000) + 1;
};

export const getNextLevelPoints = (currentLevel: number): number => {
  return currentLevel * 1000;
};

export const getPointsTypeColor = (type: JuanPointsHistory["type"]): string => {
  switch (type) {
    case "earned":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "redeemed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "expired":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "bonus":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Mock data
export const mockSettingsData: SettingsState = {
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Experienced full-stack developer with 8+ years in web and mobile development. Passionate about creating elegant solutions to complex problems.",
    title: "Senior Full-Stack Developer",
    hourlyRate: 75,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    languages: ["English", "Spanish"],
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
  },
  juanPoints: {
    currentPoints: 2450,
    totalEarned: 5680,
    lifetimePoints: 8930,
    level: 3,
    nextLevelPoints: 4000,
    rewardsRedeemed: 5,
    adsWatched: 34,
    dailyLimit: 10,
    dailyWatched: 3,
  },
  pointsHistory: [
    {
      id: "1",
      type: "earned",
      points: 50,
      description: "Watched promotional video",
      date: "2024-02-15T10:30:00Z",
    },
    {
      id: "2",
      type: "earned",
      points: 100,
      description: "Completed profile verification",
      date: "2024-02-14T14:20:00Z",
    },
    {
      id: "3",
      type: "redeemed",
      points: -500,
      description: "Profile boost for 7 days",
      date: "2024-02-13T09:15:00Z",
    },
    {
      id: "4",
      type: "bonus",
      points: 200,
      description: "Monthly login bonus",
      date: "2024-02-12T08:00:00Z",
    },
    {
      id: "5",
      type: "earned",
      points: 50,
      description: "Watched promotional video",
      date: "2024-02-11T16:45:00Z",
    },
    {
      id: "6",
      type: "earned",
      points: 300,
      description: "Completed 5-star project",
      date: "2024-02-10T11:30:00Z",
    },
    {
      id: "7",
      type: "redeemed",
      points: -250,
      description: "Featured listing for 3 days",
      date: "2024-02-09T15:20:00Z",
    },
    {
      id: "8",
      type: "earned",
      points: 50,
      description: "Watched promotional video",
      date: "2024-02-08T13:10:00Z",
    },
  ],
  socialLinks: {
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    portfolio: "https://portfolio.johndoe.dev",
  },
  notifications: {
    emailNotifications: true,
    projectUpdates: true,
    messageNotifications: true,
    paymentAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    pushNotifications: true,
    smsNotifications: false,
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showEarnings: false,
    allowSearchEngines: true,
    showOnlineStatus: true,
  },
  availableRewards: [
    {
      id: "1",
      name: "Profile Boost",
      description: "Increase your profile visibility for 7 days",
      pointsCost: 500,
      type: "boost",
      available: true,
    },
    {
      id: "2",
      name: "Featured Listing",
      description: "Feature your profile on homepage for 3 days",
      pointsCost: 250,
      type: "feature",
      available: true,
    },
    {
      id: "3",
      name: "Premium Badge",
      description: "Get a premium badge on your profile for 30 days",
      pointsCost: 1000,
      type: "badge",
      available: true,
    },
    {
      id: "4",
      name: "10% Connect Discount",
      description: "Get 10% off on your next project connect",
      pointsCost: 300,
      type: "discount",
      available: true,
    },
    {
      id: "5",
      name: "Profile Analytics",
      description: "Unlock detailed profile analytics for 30 days",
      pointsCost: 750,
      type: "feature",
      available: true,
    },
    {
      id: "6",
      name: "Priority Support",
      description: "Get priority customer support for 30 days",
      pointsCost: 1500,
      type: "feature",
      available: false,
    },
  ],
};
