import {
  DashboardStats,
  Project,
  Activity,
  ActivityDistributionItem,
  ProfileVisitDataPoint,
  DashboardData,
} from "@/features/dashboard/schema/dashboard-data";

export const profileVisitChartData: ProfileVisitDataPoint[] = [
  { day: "Mon", visits: 130 },
  { day: "Tue", visits: 90 },
  { day: "Wed", visits: 110 },
  { day: "Thu", visits: 80 },
  { day: "Fri", visits: 100 },
  { day: "Sat", visits: 60 },
  { day: "Sun", visits: 50 },
];

export const activityDistributionData: ActivityDistributionItem[] = [
  { label: "Proposals", value: 14, color: "var(--primary)" }, // orange-500
  { label: "Projects", value: 17, color: "#3b82f6" }, // blue-500
  { label: "Bids", value: 11, color: "#a855f7" }, // purple-500
  { label: "Ongoing", value: 11, color: "#10b981" }, // emerald-500
];

export const mockDashboardData: DashboardData = {
  stats: {
    totalEarnings: { value: 125000, change: 15.3, period: "this month" },
    activeContracts: { value: 8, change: 2, period: "this month" },
    bidsReceived: { value: 24, change: -8.2, period: "this week" },
    successRate: { value: 89, change: 2.1, period: "overall" },
  },
  recentProjects: [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-01-15",
      budget: 5000,
      type: "Web Development",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      clientRating: 4.8,
      urgency: "high",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      title: "Mobile App UI/UX",
      client: "Sari-Sari Digital",
      status: "In Progress",
      progress: 30,
      dueDate: "2024-02-10",
      budget: 2800,
      type: "UI/UX Design",
      skills: ["Figma", "Next.js"],
      clientRating: 5.0,
      urgency: "medium",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      title: "Brand Identity Design",
      client: "Solaris Energy",
      status: "In Progress",
      progress: 45,
      dueDate: "2024-03-05",
      budget: 1200,
      type: "Branding",
      skills: ["Illustrator", "Brand Guidelines"],
      clientRating: 4.9,
      urgency: "low",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      title: "Content Marketing Strategy",
      client: "Global Media",
      status: "Planning",
      progress: 10,
      dueDate: "2024-04-20",
      budget: 3500,
      type: "Marketing",
      skills: ["SEO", "Content Writing"],
      clientRating: 4.7,
      urgency: "medium",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
  ],
  recentActivities: [
    {
      title: "Proposal accepted",
      description: "Green Solutions Inc. approved your backend bid.",
      time: "2 hours ago",
      color: "bg-emerald-500",
    },
    {
      title: "Payment received",
      description: "Milestone #2 for Web App ($1,200) cleared.",
      time: "5 hours ago",
      color: "bg-blue-500",
    },
    {
      title: "New message",
      description: "Client from 'Pixel Hub' sent a feedback file.",
      time: "Yesterday",
      color: "bg-orange-500",
    },
  ],
};
