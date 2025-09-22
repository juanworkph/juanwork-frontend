"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Briefcase, 
  Star, 
  Eye, 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award,
  LineChart
} from 'lucide-react';

// Simple placeholder component
function ProfileVisitChart() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold text-muted-foreground">Profile Visits</p>
        <p className="text-sm text-muted-foreground">Profile analytics coming soon</p>
      </div>
    </div>
  );
}

export default function FreelancerPage() {
  // Mock data - in real app, this would come from API
  const dashboardData = {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Good morning, Alex! 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">
            Here's what's happening with your freelance business today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
          <Button variant="outline" className="gap-2 text-xs lg:text-sm">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button className="gap-2 text-xs lg:text-sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-xl lg:text-2xl font-bold">${dashboardData.stats.totalEarnings.value.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
                  <span className="text-xs lg:text-sm text-green-600 font-medium">
                    +{dashboardData.stats.totalEarnings.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{dashboardData.stats.totalEarnings.period}</span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-xl lg:text-2xl font-bold">{dashboardData.stats.activeProjects.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                  <span className="text-xs lg:text-sm text-blue-600 font-medium">
                    +{dashboardData.stats.activeProjects.change}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{dashboardData.stats.activeProjects.period}</span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-blue-100 rounded-full">
                <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-xl lg:text-2xl font-bold">{dashboardData.stats.profileViews.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
                  <span className="text-xs lg:text-sm text-red-600 font-medium">
                    {dashboardData.stats.profileViews.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{dashboardData.stats.profileViews.period}</span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-purple-100 rounded-full">
                <Eye className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-xl lg:text-2xl font-bold">{dashboardData.stats.completionRate.value}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
                  <span className="text-xs lg:text-sm text-orange-600 font-medium">
                    +{dashboardData.stats.completionRate.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{dashboardData.stats.completionRate.period}</span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-orange-100 rounded-full">
                <Target className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Visit Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4 lg:p-6 h-full w-full">
            <ProfileVisitChart />
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base lg:text-lg font-semibold">Recent Projects</CardTitle>
                <p className="text-sm text-muted-foreground">Your latest project activities</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 self-start sm:self-auto">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[350px] overflow-y-auto">
            {dashboardData.recentProjects.map((project) => (
              <div key={project.id} className="group p-4 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 rounded-xl border border-muted/40 hover:border-primary/20 transition-all duration-300">
                {/* Project Header */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-primary/10 to-accent/10">
                      {project.client.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {project.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{project.client}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{project.clientRating}</span>
                      </div>
                    </div>
                    
                    {/* Project Type & Budget */}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {project.type}
                      </Badge>
                      <span className="text-xs font-semibold text-green-600">${project.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress & Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                        {project.status}
                      </Badge>
                      {project.urgency === 'high' && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs font-medium">{project.progress}%</span>
                  </div>
                  
                  <Progress value={project.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Due: {project.dueDate}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(project.dueDate) > new Date() 
                          ? `${Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                          : 'Overdue'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Upcoming Deadlines */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardData.upcomingDeadlines.map((deadline, index) => (
              <div key={index} className={`p-3 bg-muted/30 rounded-lg border-l-4 ${getPriorityColor(deadline.priority)}`}>
                <h4 className="font-medium text-sm">{deadline.project}</h4>
                <p className="text-xs text-muted-foreground mt-1">{deadline.deadline}</p>
                <Badge variant="outline" className="mt-2 capitalize text-xs">
                  {deadline.priority} Priority
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 lg:h-5 lg:w-5" />
                Notes
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 px-2">
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg dark:bg-yellow-950/20">
              <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-200">Client Meeting</h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                Discuss project requirements with TechCorp Inc. at 3 PM
              </p>
              <span className="text-xs text-yellow-600 dark:text-yellow-400">Today</span>
            </div>
            
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg dark:bg-blue-950/20">
              <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">Design Inspiration</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Check out the new design trends for mobile apps
              </p>
              <span className="text-xs text-blue-600 dark:text-blue-400">Yesterday</span>
            </div>
            
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-lg dark:bg-green-950/20">
              <h4 className="font-medium text-sm text-green-800 dark:text-green-200">Code Review</h4>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                Review React components for the dashboard project
              </p>
              <span className="text-xs text-green-600 dark:text-green-400">2 days ago</span>
            </div>
            
            <Button variant="outline" className="w-full text-xs h-8 mt-2">
              View All Notes
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 lg:h-5 lg:w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  {activity.type === 'proposal' && <FileText className="h-4 w-4 text-primary" />}
                  {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-primary" />}
                  {activity.type === 'review' && <Star className="h-4 w-4 text-primary" />}
                  {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base lg:text-lg font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 lg:h-5 lg:w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
              <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
              Submit New Proposal
            </Button>
            <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
              <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5" />
              Message Clients
            </Button>
            <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
              <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
              Schedule Meeting
            </Button>
            <Button className="w-full justify-start gap-3 h-10 lg:h-12 text-sm" variant="outline">
              <Award className="h-4 w-4 lg:h-5 lg:w-5" />
              Update Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
