import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface WorkstationStatsProps {
  stats: {
    inProgress: number;
    completed: number;
    overdue: number;
    pending: number;
    totalEarnings: number;
    avgProgress: number;
  };
}

export function WorkstationStats({ stats }: WorkstationStatsProps) {
  const statCards = [
    {
      id: "in-progress",
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
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
      id: "overdue",
      label: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="flex flex-col items-start">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
