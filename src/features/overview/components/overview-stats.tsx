import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  AlertCircle,
  Target,
  Ban,
} from "lucide-react";

interface OverviewStatsProps {
  stats: {
    total: number;
    completed: number;
    assignedToMe: number;
    inProgress: number;
    overdue: number;
    blocked: number;
  };
}

export function OverviewStats({ stats }: OverviewStatsProps) {
  const statCards = [
    {
      id: "total",
      label: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      iconColor: "text-gray-500",
      iconBg: "bg-gray-500/10",
    },
    {
      id: "completed",
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
    },
    {
      id: "assigned",
      label: "Assigned to Me",
      value: stats.assignedToMe,
      icon: Target,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
    {
      id: "blocked",
      label: "Blocked",
      value: stats.blocked,
      icon: Ban,
      iconColor: "text-red-500",
      iconBg: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="position-relative">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
