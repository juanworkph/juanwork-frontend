import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Eye,
  Target,
} from "lucide-react";
import { DashboardStats } from "../schema/dashboard-data";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Total Earnings */}
      <Card className="shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                Total Earnings
              </p>
              <p className="text-xl lg:text-2xl font-bold">
                ${stats.totalEarnings.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
                <span className="text-xs lg:text-sm text-green-600 font-medium">
                  +{stats.totalEarnings.change}%
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {stats.totalEarnings.period}
                </span>
              </div>
            </div>
            <div className="p-2 lg:p-3 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                Active Projects
              </p>
              <p className="text-xl lg:text-2xl font-bold">
                {stats.activeProjects.value}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                <span className="text-xs lg:text-sm text-blue-600 font-medium">
                  +{stats.activeProjects.change}
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {stats.activeProjects.period}
                </span>
              </div>
            </div>
            <div className="p-2 lg:p-3 bg-blue-100 rounded-full">
              <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Views */}
      <Card className="shadow-sm bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                Profile Views
              </p>
              <p className="text-xl lg:text-2xl font-bold">
                {stats.profileViews.value}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
                <span className="text-xs lg:text-sm text-red-600 font-medium">
                  {stats.profileViews.change}%
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {stats.profileViews.period}
                </span>
              </div>
            </div>
            <div className="p-2 lg:p-3 bg-purple-100 rounded-full">
              <Eye className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card className="shadow-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-muted-foreground">
                Completion Rate
              </p>
              <p className="text-xl lg:text-2xl font-bold">
                {stats.completionRate.value}%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
                <span className="text-xs lg:text-sm text-orange-600 font-medium">
                  +{stats.completionRate.change}%
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {stats.completionRate.period}
                </span>
              </div>
            </div>
            <div className="p-2 lg:p-3 bg-orange-100 rounded-full">
              <Target className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
