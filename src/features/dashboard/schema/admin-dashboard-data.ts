export interface AdminDashboardStats {
  totalUsers: {
    value: number;
    change: number;
    period: string;
    breakdown: {
      freelancers: number;
      clients: number;
    };
  };
  totalProjects: {
    value: number;
    change: number;
    period: string;
    breakdown: {
      active: number;
      completed: number;
      pending: number;
    };
  };
  platformRevenue: {
    value: number;
    change: number;
    period: string;
  };
  activeContracts: {
    value: number;
    change: number;
    period: string;
  };
}

export interface PendingApproval {
  id: string;
  type: "service" | "project" | "user" | "withdrawal";
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: "pending" | "reviewing";
  priority: "high" | "medium" | "low";
  avatar?: string;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "client";
  joinedAt: string;
  avatar?: string;
  verified: boolean;
  status: "active" | "pending" | "suspended";
}

export interface PlatformActivity {
  type:
    | "user_registration"
    | "project_posted"
    | "service_posted"
    | "contract_completed"
    | "payment_processed";
  message: string;
  time: string;
  user?: string;
  amount?: number;
}

export interface SystemHealth {
  metric: string;
  value: string | number;
  status: "healthy" | "warning" | "critical";
  icon: string;
}

export interface RevenueByMonth {
  month: string;
  revenue: number;
  transactions: number;
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  pendingApprovals: PendingApproval[];
  recentUsers: RecentUser[];
  platformActivities: PlatformActivity[];
  systemHealth: SystemHealth[];
  revenueByMonth: RevenueByMonth[];
}

// Mock data for admin dashboard
export const mockAdminDashboardData: AdminDashboardData = {
  stats: {
    totalUsers: {
      value: 12548,
      change: 12.5,
      period: "this month",
      breakdown: {
        freelancers: 8234,
        clients: 4314,
      },
    },
    totalProjects: {
      value: 5642,
      change: 8.3,
      period: "this month",
      breakdown: {
        active: 1842,
        completed: 3456,
        pending: 344,
      },
    },
    platformRevenue: {
      value: 487650,
      change: 15.7,
      period: "this month",
    },
    activeContracts: {
      value: 1842,
      change: 5.2,
      period: "this month",
    },
  },
  pendingApprovals: [
    {
      id: "1",
      type: "service",
      title: "Full Stack Web Development with React & Node.js",
      submittedBy: "John Smith",
      submittedAt: "2 hours ago",
      status: "pending",
      priority: "high",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      type: "project",
      title: "E-commerce Platform Development",
      submittedBy: "Sarah Johnson",
      submittedAt: "4 hours ago",
      status: "reviewing",
      priority: "medium",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      type: "withdrawal",
      title: "Withdrawal Request - $5,000",
      submittedBy: "Mike Chen",
      submittedAt: "6 hours ago",
      status: "pending",
      priority: "high",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      type: "user",
      title: "Professional Verification Request",
      submittedBy: "Emma Wilson",
      submittedAt: "8 hours ago",
      status: "pending",
      priority: "medium",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      type: "service",
      title: "Mobile App Development - iOS & Android",
      submittedBy: "David Brown",
      submittedAt: "12 hours ago",
      status: "reviewing",
      priority: "low",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ],
  recentUsers: [
    {
      id: "1",
      name: "Alice Martinez",
      email: "alice.martinez@email.com",
      role: "freelancer",
      joinedAt: "1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      verified: false,
      status: "active",
    },
    {
      id: "2",
      name: "Tech Innovations Inc.",
      email: "contact@techinnovations.com",
      role: "client",
      joinedAt: "3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "active",
    },
    {
      id: "3",
      name: "Robert Taylor",
      email: "robert.taylor@email.com",
      role: "freelancer",
      joinedAt: "5 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      verified: false,
      status: "pending",
    },
    {
      id: "4",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      role: "freelancer",
      joinedAt: "8 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "active",
    },
    {
      id: "5",
      name: "Global Systems Corp.",
      email: "info@globalsystems.com",
      role: "client",
      joinedAt: "10 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "active",
    },
  ],
  platformActivities: [
    {
      type: "payment_processed",
      message: "Payment of $8,500 processed for project completion",
      time: "5 minutes ago",
      user: "Sarah Johnson",
      amount: 8500,
    },
    {
      type: "project_posted",
      message: 'New project posted: "Mobile App Development"',
      time: "15 minutes ago",
      user: "Tech Innovations Inc.",
    },
    {
      type: "contract_completed",
      message: '"E-commerce Platform" marked as completed',
      time: "1 hour ago",
      user: "John Smith",
    },
    {
      type: "user_registration",
      message: "New freelancer registered: Alice Martinez",
      time: "1 hour ago",
      user: "Alice Martinez",
    },
    {
      type: "service_posted",
      message: 'New service posted: "Full Stack Development"',
      time: "2 hours ago",
      user: "David Brown",
    },
    {
      type: "payment_processed",
      message: "Payment of $3,200 processed for milestone completion",
      time: "3 hours ago",
      user: "Mike Chen",
      amount: 3200,
    },
    {
      type: "user_registration",
      message: "New client registered: Global Systems Corp.",
      time: "4 hours ago",
      user: "Global Systems Corp.",
    },
    {
      type: "contract_completed",
      message: '"Website Redesign" marked as completed',
      time: "5 hours ago",
      user: "Emma Wilson",
    },
  ],
  systemHealth: [
    {
      metric: "Server Uptime",
      value: "99.98%",
      status: "healthy",
      icon: "server",
    },
    {
      metric: "Response Time",
      value: "145ms",
      status: "healthy",
      icon: "zap",
    },
    {
      metric: "Active Sessions",
      value: 3847,
      status: "healthy",
      icon: "users",
    },
    {
      metric: "Database Load",
      value: "67%",
      status: "warning",
      icon: "database",
    },
    {
      metric: "API Calls",
      value: "1.2M/day",
      status: "healthy",
      icon: "activity",
    },
    {
      metric: "Error Rate",
      value: "0.03%",
      status: "healthy",
      icon: "alert-circle",
    },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 285000, transactions: 1234 },
    { month: "Feb", revenue: 312000, transactions: 1456 },
    { month: "Mar", revenue: 298000, transactions: 1389 },
    { month: "Apr", revenue: 345000, transactions: 1623 },
    { month: "May", revenue: 378000, transactions: 1789 },
    { month: "Jun", revenue: 398000, transactions: 1854 },
    { month: "Jul", revenue: 425000, transactions: 1923 },
    { month: "Aug", revenue: 445000, transactions: 2045 },
    { month: "Sep", revenue: 462000, transactions: 2134 },
    { month: "Oct", revenue: 478000, transactions: 2245 },
    { month: "Nov", revenue: 487000, transactions: 2312 },
    { month: "Dec", revenue: 487650, transactions: 2356 },
  ],
};
