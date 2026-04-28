export interface DashboardStats {
  totalEarnings: {
    value: number;
    change: number;
    period: string;
  };
  activeContracts: {
    value: number;
    change: number;
    period: string;
  };
  bidsReceived: {
    value: number;
    change: number;
    period: string;
  };
  successRate: {
    value: number;
    change: number;
    period: string;
  };
}

export interface Project {
  id: number;
  title: string;
  client: string;
  status: string;
  progress: number;
  dueDate: string;
  budget: number;
  type: string;
  skills: string[];
  clientRating: number;
  urgency: 'high' | 'medium' | 'low';
  avatar: string;
}

export interface Activity {
  title: string;
  description: string;
  time: string;
  color: string;
}

export interface ActivityDistributionItem {
  label: string;
  value: number;
  color: string;
}

export interface ProfileVisitDataPoint {
  day: string;
  visits: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentProjects: Project[];
  recentActivities: Activity[];
}
 