export interface DashboardStats {
  totalEarnings: {
    value: number;
    change: number;
    period: string;
  };
  activeProjects: {
    value: number;
    change: number;
    period: string;
  };
  profileViews: {
    value: number;
    change: number;
    period: string;
  };
  completionRate: {
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
  type: 'proposal' | 'message' | 'review' | 'payment';
  message: string;
  time: string;
}

export interface Deadline {
  project: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface DashboardData {
  stats: DashboardStats;
  recentProjects: Project[];
  recentActivities: Activity[];
  upcomingDeadlines: Deadline[];
}

// Mock data
export const mockDashboardData: DashboardData = {
  stats: {
    totalEarnings: { value: 12500, change: 15.3, period: 'this month' },
    activeProjects: { value: 8, change: 2, period: 'this month' },
    profileViews: { value: 245, change: -8.2, period: 'this week' },
    completionRate: { value: 98, change: 2.1, period: 'overall' }
  },
  recentProjects: [
    { 
      id: 1, 
      title: 'E-commerce Website Redesign', 
      client: 'TechCorp Inc.', 
      status: 'In Progress', 
      progress: 75, 
      dueDate: '2024-01-15',
      budget: 5000,
      type: 'Web Development',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      clientRating: 4.8,
      urgency: 'high',
      avatar: '/api/placeholder/32/32'
    },
    { 
      id: 2, 
      title: 'Mobile App UI/UX Design', 
      client: 'StartupXYZ', 
      status: 'Review', 
      progress: 90, 
      dueDate: '2024-01-10',
      budget: 3500,
      type: 'UI/UX Design',
      skills: ['Figma', 'Prototyping', 'User Research'],
      clientRating: 5.0,
      urgency: 'medium',
      avatar: '/api/placeholder/32/32'
    },
    { 
      id: 3, 
      title: 'React Dashboard Development', 
      client: 'DataFlow Solutions', 
      status: 'Completed', 
      progress: 100, 
      dueDate: '2024-01-05',
      budget: 4200,
      type: 'Frontend Development',
      skills: ['React', 'Chart.js', 'REST API'],
      clientRating: 4.9,
      urgency: 'low',
      avatar: '/api/placeholder/32/32'
    },
    { 
      id: 4, 
      title: 'Brand Identity & Logo Design', 
      client: 'Creative Studio', 
      status: 'In Progress', 
      progress: 60, 
      dueDate: '2024-01-20',
      budget: 2800,
      type: 'Graphic Design',
      skills: ['Adobe Illustrator', 'Branding', 'Typography'],
      clientRating: 4.7,
      urgency: 'medium',
      avatar: '/api/placeholder/32/32'
    },
    { 
      id: 5, 
      title: 'WordPress Plugin Development', 
      client: 'BlogMaster Pro', 
      status: 'Planning', 
      progress: 15, 
      dueDate: '2024-02-01',
      budget: 3800,
      type: 'Backend Development',
      skills: ['PHP', 'WordPress', 'MySQL'],
      clientRating: 4.6,
      urgency: 'low',
      avatar: '/api/placeholder/32/32'
    }
  ],
  recentActivities: [
    { type: 'proposal', message: 'New proposal submitted for "AI Chatbot Development"', time: '2 hours ago' },
    { type: 'message', message: 'Message received from TechCorp Inc.', time: '4 hours ago' },
    { type: 'review', message: 'Received 5-star review from StartupXYZ', time: '1 day ago' },
    { type: 'payment', message: 'Payment of $4,200 received', time: '2 days ago' }
  ],
  upcomingDeadlines: [
    { project: 'E-commerce Website', deadline: '2024-01-15', priority: 'high' },
    { project: 'Mobile App Design', deadline: '2024-01-10', priority: 'medium' },
    { project: 'Logo Design', deadline: '2024-01-20', priority: 'low' }
  ]
}; 