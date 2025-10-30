"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  DollarSign,
  Settings,
  Shield,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
      badge: "12.5K",
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
      badge: "5.6K",
    },
    {
      label: "Services",
      href: "/admin/services",
      icon: Package,
      badge: "3.2K",
    },
    {
      label: "Transactions",
      href: "/admin/transactions",
      icon: DollarSign,
      badge: null,
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  // Mock admin data
  const adminData = {
    name: "Admin",
    role: "Platform Administrator",
    avatar: "/images/logo.png",
    pendingApprovals: 14,
    systemHealth: "healthy" as const,
    stats: {
      activeUsers: 3847,
      todayRevenue: 12450,
      pendingIssues: 3,
      uptime: 99.98,
    },
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="p-6 space-y-6">
          {/* Admin Profile Header */}
          <Card className="border-0 bg-gradient-to-br from-[#F45A0B]/10 to-[#F45A0B]/5">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F45A0B] to-orange-600 flex items-center justify-center">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 rounded-full p-1 ${
                      adminData.systemHealth === "healthy"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-xl font-bold">{adminData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {adminData.role}
                  </p>
                </div>

                {/* Pending Approvals Badge */}
                {adminData.pendingApprovals > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {adminData.pendingApprovals} Pending Approvals
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#F45A0B] text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">Platform Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#F45A0B]" />
                    <span className="text-sm">Active Users</span>
                  </div>
                  <span className="text-sm font-medium">
                    {adminData.stats.activeUsers.toLocaleString()}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Today's Revenue</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${adminData.stats.todayRevenue.toLocaleString()}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Pending Issues</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {adminData.stats.pendingIssues}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">System Uptime</span>
                  </div>
                  <span className="text-sm font-medium">
                    {adminData.stats.uptime}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    All Systems Operational
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    No issues detected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/admin/users/new"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                >
                  <Users className="h-4 w-4 text-[#F45A0B]" />
                  <span>Add New User</span>
                </Link>
                <Link
                  href="/admin/announcements"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                >
                  <AlertCircle className="h-4 w-4 text-[#F45A0B]" />
                  <span>Send Announcement</span>
                </Link>
                <Link
                  href="/admin/reports"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                >
                  <BarChart3 className="h-4 w-4 text-[#F45A0B]" />
                  <span>Generate Report</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Admin Info */}
          <div className="text-center text-xs text-muted-foreground">
            <p>JuanWork Admin Panel v1.0</p>
            <p className="mt-1">© 2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
