export type ProjectStatus = 'active' | 'completed' | 'paused' | 'cancelled' | 'pending';
export type ProjectType = 'fixed' | 'hourly';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating?: number;
  totalProjects?: number;
  responseTime?: string;
  lastActive?: string;
}

export interface ProjectBudget {
  type: ProjectType;
  amount: number;
  currency: string;
  hourlyRate?: number;
  estimatedHours?: number;
}

export interface ProjectProgress {
  completedTasks: number;
  totalTasks: number;
  completedMilestones: number;
  totalMilestones: number;
  progressPercentage: number;
  lastUpdated: string;
}

export interface ProjectDeadline {
  startDate: string;
  endDate: string;
  deliveryDays: number;
  hoursLeft: number;
  isOverdue: boolean;
  daysOverdue?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  skills: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  client: Client;
  budget: ProjectBudget;
  progress: ProjectProgress;
  deadline: ProjectDeadline;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  isPinned?: boolean;
  isUrgent?: boolean;
  hasUnreadMessages?: boolean;
  messageCount?: number;
  attachmentCount?: number;
  notes?: string;
}

export interface ProjectsStats {
  total: number;
  active: number;
  completed: number;
  paused: number;
  cancelled: number;
  pending: number;
  totalEarnings: number;
  averageRating: number;
  onTimeDelivery: number;
}

export interface ProjectsFilters {
  status: ProjectStatus | 'all';
  priority: ProjectPriority | 'all';
  search: string;
  sortBy: 'name' | 'deadline' | 'progress' | 'budget' | 'created' | 'updated';
  sortDirection: 'asc' | 'desc';
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface ProjectsState {
  projects: Project[];
  stats: ProjectsStats;
  filters: ProjectsFilters;
}

// Helper functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getTimeLeft = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    const overdueDays = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    return `${overdueDays} day${overdueDays > 1 ? 's' : ''} overdue`;
  }
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} left`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  }
};

export const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'completed':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'paused':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'pending':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export const getPriorityColor = (priority: ProjectPriority): string => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'high':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  if (percentage >= 20) return 'bg-orange-500';
  return 'bg-red-500';
};

// Mock data
export const mockProjectsData: ProjectsState = {
  projects: [
    {
      id: '1',
      name: 'E-commerce Website Redesign',
      description: 'Complete redesign of the company website with modern UI/UX, mobile responsiveness, and improved conversion rates.',
      category: 'Web Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
      status: 'active',
      priority: 'high',
      client: {
        id: 'client1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
        country: 'United States',
        countryCode: 'US',
        verified: true,
        rating: 4.9,
        totalProjects: 23,
        responseTime: '2 hours',
        lastActive: '1 hour ago'
      },
      budget: {
        type: 'fixed',
        amount: 4500,
        currency: 'USD'
      },
      progress: {
        completedTasks: 12,
        totalTasks: 18,
        completedMilestones: 2,
        totalMilestones: 4,
        progressPercentage: 67,
        lastUpdated: new Date().toISOString()
      },
      deadline: {
        startDate: '2024-01-15T00:00:00Z',
        endDate: '2024-02-28T23:59:59Z',
        deliveryDays: 45,
        hoursLeft: 168,
        isOverdue: false
      },
      projectUrl: '/projects/1',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: new Date().toISOString(),
      startedAt: '2024-01-16T09:00:00Z',
      isPinned: true,
      hasUnreadMessages: true,
      messageCount: 3,
      attachmentCount: 8
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for food delivery service with real-time tracking and payment integration. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      category: 'Mobile Development',
      skills: ['React Native', 'Firebase', 'Stripe API', 'Google Maps'],
      status: 'active',
      priority: 'urgent',
      client: {
        id: 'client2',
        name: 'Ahmed Hassan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        verified: true,
        rating: 4.8,
        totalProjects: 15,
        responseTime: '1 hour',
        lastActive: '30 minutes ago'
      },
      budget: {
        type: 'hourly',
        amount: 3600,
        currency: 'USD',
        hourlyRate: 45,
        estimatedHours: 80
      },
      progress: {
        completedTasks: 8,
        totalTasks: 24,
        completedMilestones: 1,
        totalMilestones: 6,
        progressPercentage: 33,
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      deadline: {
        startDate: '2024-02-01T00:00:00Z',
        endDate: '2024-03-15T23:59:59Z',
        deliveryDays: 42,
        hoursLeft: 72,
        isOverdue: false
      },
      projectUrl: '/projects/2',
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      startedAt: '2024-02-02T08:30:00Z',
      isUrgent: true,
      hasUnreadMessages: true,
      messageCount: 7,
      attachmentCount: 12
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      description: 'Business intelligence dashboard with real-time data visualization and automated reporting features.',
      category: 'Data Science',
      skills: ['Python', 'Django', 'PostgreSQL', 'Chart.js', 'D3.js'],
      status: 'completed',
      priority: 'medium',
      client: {
        id: 'client3',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        country: 'Spain',
        countryCode: 'ES',
        verified: true,
        rating: 5.0,
        totalProjects: 8,
        responseTime: '4 hours',
        lastActive: '2 days ago'
      },
      budget: {
        type: 'fixed',
        amount: 2800,
        currency: 'USD'
      },
      progress: {
        completedTasks: 15,
        totalTasks: 15,
        completedMilestones: 3,
        totalMilestones: 3,
        progressPercentage: 100,
        lastUpdated: '2024-01-25T16:00:00Z'
      },
      deadline: {
        startDate: '2023-12-01T00:00:00Z',
        endDate: '2024-01-25T23:59:59Z',
        deliveryDays: 55,
        hoursLeft: 0,
        isOverdue: false
      },
      projectUrl: '/projects/3',
      createdAt: '2023-12-01T14:00:00Z',
      updatedAt: '2024-01-25T16:30:00Z',
      startedAt: '2023-12-02T09:00:00Z',
      completedAt: '2024-01-25T16:00:00Z',
      messageCount: 12,
      attachmentCount: 5
    },
    {
      id: '4',
      name: 'Brand Identity Design',
      description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines.',
      category: 'Design',
      skills: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Brand Strategy'],
      status: 'paused',
      priority: 'low',
      client: {
        id: 'client4',
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        country: 'Canada',
        countryCode: 'CA',
        verified: false,
        rating: 4.3,
        totalProjects: 12,
        responseTime: '6 hours',
        lastActive: '1 week ago'
      },
      budget: {
        type: 'fixed',
        amount: 1200,
        currency: 'USD'
      },
      progress: {
        completedTasks: 3,
        totalTasks: 8,
        completedMilestones: 1,
        totalMilestones: 3,
        progressPercentage: 38,
        lastUpdated: '2024-02-05T14:00:00Z'
      },
      deadline: {
        startDate: '2024-01-20T00:00:00Z',
        endDate: '2024-03-01T23:59:59Z',
        deliveryDays: 40,
        hoursLeft: 240,
        isOverdue: false
      },
      projectUrl: '/projects/4',
      createdAt: '2024-01-20T11:00:00Z',
      updatedAt: '2024-02-05T14:30:00Z',
      startedAt: '2024-01-21T10:00:00Z',
      messageCount: 5,
      attachmentCount: 3
    },
    {
      id: '5',
      name: 'API Integration & Testing',
      description: 'Integration of third-party APIs and comprehensive testing suite for existing web application.',
      category: 'Backend Development',
      skills: ['Node.js', 'Express', 'Jest', 'REST APIs', 'MongoDB'],
      status: 'pending',
      priority: 'medium',
      client: {
        id: 'client5',
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        country: 'Singapore',
        countryCode: 'SG',
        verified: true,
        rating: 4.7,
        totalProjects: 19,
        responseTime: '3 hours',
        lastActive: '5 hours ago'
      },
      budget: {
        type: 'hourly',
        amount: 1800,
        currency: 'USD',
        hourlyRate: 40,
        estimatedHours: 45
      },
      progress: {
        completedTasks: 0,
        totalTasks: 12,
        completedMilestones: 0,
        totalMilestones: 4,
        progressPercentage: 0,
        lastUpdated: '2024-02-10T00:00:00Z'
      },
      deadline: {
        startDate: '2024-02-15T00:00:00Z',
        endDate: '2024-03-30T23:59:59Z',
        deliveryDays: 44,
        hoursLeft: 1008,
        isOverdue: false
      },
      projectUrl: '/projects/5',
      createdAt: '2024-02-10T13:00:00Z',
      updatedAt: '2024-02-10T13:00:00Z',
      messageCount: 1,
      attachmentCount: 2
    },
    {
      id: '6',
      name: 'WordPress Plugin Development',
      description: 'Custom WordPress plugin for e-commerce analytics with advanced reporting and dashboard features.',
      category: 'WordPress Development',
      skills: ['PHP', 'WordPress', 'MySQL', 'JavaScript', 'CSS'],
      status: 'cancelled',
      priority: 'low',
      client: {
        id: 'client6',
        name: 'Robert Brown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        country: 'Australia',
        countryCode: 'AU',
        verified: true,
        rating: 4.1,
        totalProjects: 7,
        responseTime: '8 hours',
        lastActive: '2 weeks ago'
      },
      budget: {
        type: 'fixed',
        amount: 800,
        currency: 'USD'
      },
      progress: {
        completedTasks: 2,
        totalTasks: 10,
        completedMilestones: 0,
        totalMilestones: 3,
        progressPercentage: 20,
        lastUpdated: '2024-01-30T12:00:00Z'
      },
      deadline: {
        startDate: '2024-01-10T00:00:00Z',
        endDate: '2024-02-20T23:59:59Z',
        deliveryDays: 41,
        hoursLeft: 0,
        isOverdue: true,
        daysOverdue: 5
      },
      projectUrl: '/projects/6',
      createdAt: '2024-01-10T15:00:00Z',
      updatedAt: '2024-01-30T12:30:00Z',
      startedAt: '2024-01-11T09:00:00Z',
      messageCount: 8,
      attachmentCount: 1
    }
  ],
  stats: {
    total: 6,
    active: 2,
    completed: 1,
    paused: 1,
    cancelled: 1,
    pending: 1,
    totalEarnings: 12700,
    averageRating: 4.6,
    onTimeDelivery: 85
  },
  filters: {
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'updated',
    sortDirection: 'desc'
  }
}; 