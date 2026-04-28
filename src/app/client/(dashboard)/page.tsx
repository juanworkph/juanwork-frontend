"use client";

import React from 'react';
import {
  DashboardHeader,
  StatsOverview,
  ProfileVisitChart,
  ActiveProjects,
  ActivityDistribution,
  ProjectNotes,
  RecentActivity,
  QuickActions,
} from '@/features/dashboard/components';
import { 
  mockDashboardData, 
  profileVisitChartData, 
  activityDistributionData 
} from '@/data/dashboard';

export default function ClientPage() {
  const dashboardData = mockDashboardData;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Header */}
      <DashboardHeader userName="Alex" />

      {/* Stats Overview */}
      <StatsOverview stats={dashboardData.stats} />

      {/* Main Content Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Visit Chart */}
        <ProfileVisitChart data={profileVisitChartData} />

        {/* Activity Distribution */}
        <ActivityDistribution data={activityDistributionData} />
      </div>

      {/* Secondary Content Grid: Projects & Sidebar Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Active Projects */}
        <ActiveProjects projects={dashboardData.recentProjects} />

        {/* Right Sidebar Stack */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Recent Activity */}
          <RecentActivity activities={dashboardData.recentActivities} />

          {/* Notes */}
          <ProjectNotes />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
