"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Server,
  Zap,
  Database,
  Activity,
  Eye,
  Shield,
  Package,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { mockAdminDashboardData } from "@/features/dashboard/schema";

export default function AdminDashboardPage() {
  const dashboardData = mockAdminDashboardData;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "project_posted":
        return <Briefcase className="h-4 w-4 text-purple-600" />;
      case "service_posted":
        return <Package className="h-4 w-4 text-orange-600" />;
      case "contract_completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "payment_processed":
        return <DollarSign className="h-4 w-4 text-emerald-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getApprovalIcon = (type: string) => {
    switch (type) {
      case "service":
        return <Package className="h-4 w-4" />;
      case "project":
        return <Briefcase className="h-4 w-4" />;
      case "user":
        return <Users className="h-4 w-4" />;
      case "withdrawal":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#F45A0B] to-orange-600 bg-clip-text text-transparent">
            Admin Dashboard 📊
          </h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">
            Welcome back! Here's your platform overview
          </p>
        </div>
        <div className="flex gap-2 lg:gap-3">
          <Button variant="outline" className="gap-2 text-xs lg:text-sm">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 gap-2 text-xs lg:text-sm">
            <Shield className="h-4 w-4" />
            Admin Actions
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total Users */}
        <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <p className="text-xl lg:text-2xl font-bold">
                  {dashboardData.stats.totalUsers.value.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                  <span className="text-xs lg:text-sm text-blue-600 font-medium">
                    +{dashboardData.stats.totalUsers.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {dashboardData.stats.totalUsers.period}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>
                    {dashboardData.stats.totalUsers.breakdown.freelancers.toLocaleString()}{" "}
                    freelancers
                  </span>
                  <span>
                    {dashboardData.stats.totalUsers.breakdown.clients.toLocaleString()}{" "}
                    clients
                  </span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Projects */}
        <Card className="shadow-sm bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                  Total Projects
                </p>
                <p className="text-xl lg:text-2xl font-bold">
                  {dashboardData.stats.totalProjects.value.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600" />
                  <span className="text-xs lg:text-sm text-purple-600 font-medium">
                    +{dashboardData.stats.totalProjects.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {dashboardData.stats.totalProjects.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>
                    {dashboardData.stats.totalProjects.breakdown.active} active
                  </span>
                  <span>
                    {dashboardData.stats.totalProjects.breakdown.pending}{" "}
                    pending
                  </span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-purple-100 rounded-full">
                <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Revenue */}
        <Card className="shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                  Platform Revenue
                </p>
                <p className="text-xl lg:text-2xl font-bold">
                  ${dashboardData.stats.platformRevenue.value.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
                  <span className="text-xs lg:text-sm text-green-600 font-medium">
                    +{dashboardData.stats.platformRevenue.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {dashboardData.stats.platformRevenue.period}
                  </span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Contracts */}
        <Card className="shadow-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                  Active Contracts
                </p>
                <p className="text-xl lg:text-2xl font-bold">
                  {dashboardData.stats.activeContracts.value.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
                  <span className="text-xs lg:text-sm text-orange-600 font-medium">
                    +{dashboardData.stats.activeContracts.change}%
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {dashboardData.stats.activeContracts.period}
                  </span>
                </div>
              </div>
              <div className="p-2 lg:p-3 bg-orange-100 rounded-full">
                <FileCheck className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#F45A0B]" />
                  Pending Approvals
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-[#F45A0B]/10 text-[#F45A0B]"
                >
                  {dashboardData.pendingApprovals.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.pendingApprovals.slice(0, 5).map((approval) => (
                  <div
                    key={approval.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={approval.avatar} />
                      <AvatarFallback>
                        {approval.submittedBy.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getApprovalIcon(approval.type)}
                        <p className="text-sm font-medium truncate">
                          {approval.title}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        by {approval.submittedBy} • {approval.submittedAt}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(approval.priority)}
                    >
                      {approval.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 gap-2"
                onClick={() => console.log("View all approvals")}
              >
                View All Approvals
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Platform Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#F45A0B]" />
                Recent Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.platformActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {activity.amount && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        ${activity.amount.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4 lg:space-y-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-[#F45A0B]" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.systemHealth.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metric.status)}
                        <span className="text-sm">{metric.metric}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {metric.value}
                      </span>
                    </div>
                    {index < dashboardData.systemHealth.length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#F45A0B]" />
                  Recent Users
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.recentUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                        {user.verified && (
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        user.role === "freelancer"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 gap-2"
                onClick={() => console.log("View all users")}
              >
                View All Users
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
