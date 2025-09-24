"use client";

import React from 'react';
import {
  DashboardHeader,
  StatsOverview,
  ProfileVisitChart,
  RecentProjects,
  UpcomingDeadlines,
  Notes,
  RecentActivity,
  QuickActions,
} from '@/features/dashboard/components';
import { mockDashboardData } from '@/features/dashboard/schema';

export default function FreelancerPage() {
  // Use the mock data from the dashboard feature
  const dashboardData = mockDashboardData;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Header */}
      <DashboardHeader userName="Alex" />

      {/* Stats Overview */}
      <StatsOverview stats={dashboardData.stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Visit Chart */}
        <ProfileVisitChart />

        {/* Recent Projects */}
        <RecentProjects projects={dashboardData.recentProjects} />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines deadlines={dashboardData.upcomingDeadlines} />

        {/* Notes */}
        <Notes />

        {/* Recent Activity */}
        <RecentActivity activities={dashboardData.recentActivities} />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
