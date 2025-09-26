export type NotificationType = 
  | 'message'
  | 'project_invite'
  | 'project_update'
  | 'payment'
  | 'review'
  | 'milestone'
  | 'system'
  | 'proposal'
  | 'contract';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  project?: {
    id: string;
    title: string;
  };
  timestamp: string;
  isRead: boolean;
  isUrgent?: boolean;
  actionUrl?: string;
  actionLabel?: string;
  amount?: number;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  lastChecked: string;
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    soundEnabled: boolean;
    showUnreadOnly: boolean;
  };
}

// Helper function to get relative time
export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
};

// Mock data
export const mockNotificationsData: NotificationsState = {
  notifications: [
    {
      id: "1",
      type: "message",
      title: "New Message",
      message: "Sarah Johnson sent you a message about the e-commerce project.",
      sender: {
        id: "user123",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      project: {
        id: "proj456",
        title: "E-commerce Website Redesign"
      },
      timestamp: "2024-04-26T10:23:00Z",
      isRead: false,
      actionUrl: "/freelancer/messages/msg789",
      actionLabel: "Reply"
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Received",
      message: "You received a payment of $1,250.00 for the Mobile App UI/UX Design project.",
      timestamp: "2024-04-25T16:45:00Z",
      isRead: false,
      amount: 1250,
      actionUrl: "/freelancer/finances",
      actionLabel: "View Details"
    },
    {
      id: "3",
      type: "project_invite",
      title: "New Project Invitation",
      message: "You've been invited to submit a proposal for a new Web Application Development project.",
      sender: {
        id: "client456",
        name: "Tech Innovations Inc.",
        avatar: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=150&h=150&fit=crop"
      },
      timestamp: "2024-04-25T09:12:00Z",
      isRead: true,
      isUrgent: true,
      actionUrl: "/freelancer/proposals/new",
      actionLabel: "View Invitation"
    },
    {
      id: "4",
      type: "review",
      title: "New 5-star Review",
      message: "DataViz Pro left you a 5-star review for the SaaS Dashboard Design System project.",
      sender: {
        id: "client789",
        name: "DataViz Pro",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face"
      },
      project: {
        id: "proj789",
        title: "SaaS Dashboard Design System"
      },
      timestamp: "2024-04-24T14:30:00Z",
      isRead: false,
      actionUrl: "/freelancer/reviews",
      actionLabel: "View Review"
    },
    {
      id: "5",
      type: "milestone",
      title: "Milestone Completed",
      message: "You've completed the 'Frontend Development' milestone for the E-commerce Website Redesign project.",
      project: {
        id: "proj456",
        title: "E-commerce Website Redesign"
      },
      timestamp: "2024-04-23T11:20:00Z",
      isRead: true,
      actionUrl: "/freelancer/projects/proj456",
      actionLabel: "View Project"
    },
    {
      id: "6",
      type: "system",
      title: "Profile Boost Available",
      message: "Boost your profile visibility for 7 days to attract more clients and projects.",
      timestamp: "2024-04-22T08:15:00Z",
      isRead: true,
      actionUrl: "/freelancer/profile/boost",
      actionLabel: "Boost Profile"
    },
    {
      id: "7",
      type: "project_update",
      title: "Project Update",
      message: "The deadline for the Mobile App UI/UX Design project has been extended by 5 days.",
      project: {
        id: "proj567",
        title: "Mobile App UI/UX Design"
      },
      timestamp: "2024-04-21T16:05:00Z",
      isRead: true,
      actionUrl: "/freelancer/projects/proj567",
      actionLabel: "View Project"
    },
    {
      id: "8",
      type: "proposal",
      title: "Proposal Accepted",
      message: "Your proposal for the React Dashboard Development project has been accepted!",
      project: {
        id: "proj678",
        title: "React Dashboard Development"
      },
      timestamp: "2024-04-20T10:45:00Z",
      isRead: true,
      isUrgent: true,
      actionUrl: "/freelancer/projects/proj678",
      actionLabel: "Start Project"
    },
    {
      id: "9",
      type: "message",
      title: "New Message",
      message: "Michael Chen sent you a message regarding the project timeline.",
      sender: {
        id: "user234",
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      project: {
        id: "proj678",
        title: "React Dashboard Development"
      },
      timestamp: "2024-04-19T14:30:00Z",
      isRead: true,
      actionUrl: "/freelancer/messages/msg456",
      actionLabel: "Reply"
    },
    {
      id: "10",
      type: "contract",
      title: "Contract Ready for Signature",
      message: "A new contract for the Brand Identity project is ready for your signature.",
      project: {
        id: "proj890",
        title: "Brand Identity & Logo Design"
      },
      timestamp: "2024-04-18T09:20:00Z",
      isRead: true,
      isUrgent: true,
      actionUrl: "/freelancer/contracts/cont123",
      actionLabel: "Review Contract"
    },
    {
      id: "11",
      type: "payment",
      title: "Payment Received",
      message: "You received a payment of $850.00 for the WordPress Plugin Development project.",
      timestamp: "2024-04-17T15:10:00Z",
      isRead: true,
      amount: 850,
      actionUrl: "/freelancer/finances",
      actionLabel: "View Details"
    },
    {
      id: "12",
      type: "system",
      title: "Weekly Summary",
      message: "Your weekly activity summary is now available. Check your performance and insights.",
      timestamp: "2024-04-16T08:00:00Z",
      isRead: true,
      actionUrl: "/freelancer/analytics",
      actionLabel: "View Summary"
    }
  ],
  unreadCount: 4,
  lastChecked: "2024-04-25T18:30:00Z",
  settings: {
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: false,
    showUnreadOnly: false
  }
}; 