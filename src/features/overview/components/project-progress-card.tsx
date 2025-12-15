import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle2, Clock, Circle } from "lucide-react";
import { ProjectMilestone, formatDate } from "../schema/overview-data";

interface ProjectProgressCardProps {
  overallProgress: number;
  milestones: ProjectMilestone[];
}

export function ProjectProgressCard({
  overallProgress,
  milestones,
}: ProjectProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#F45A0B] flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Project Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-blue-900 dark:text-blue-100">
              Overall Progress
            </p>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Milestones */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Milestones
          </h4>
          <div className="space-y-3">
            {milestones.map((milestone, index) => {
              const Icon =
                milestone.status === "completed"
                  ? CheckCircle2
                  : milestone.status === "in-progress"
                  ? Clock
                  : Circle;

              const statusColor =
                milestone.status === "completed"
                  ? "text-green-500"
                  : milestone.status === "in-progress"
                  ? "text-blue-500"
                  : "text-gray-400";

              const bgColor =
                milestone.status === "completed"
                  ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                  : milestone.status === "in-progress"
                  ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700";

              return (
                <div
                  key={milestone.id}
                  className={`relative p-3 rounded-lg border ${bgColor} transition-all`}
                >
                  {/* Connection Line */}
                  {index < milestones.length - 1 && (
                    <div
                      className={`absolute left-4 top-full h-3 w-0.5 ${
                        milestone.status === "completed"
                          ? "bg-green-300 dark:bg-green-700"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  )}

                  <div className="flex items-start gap-3">
                    <Icon
                      className={`h-5 w-5 ${statusColor} flex-shrink-0 mt-0.5`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {milestone.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            milestone.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : milestone.status === "in-progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {milestone.status === "completed"
                            ? "Completed"
                            : milestone.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between gap-3 mb-2">
                        <Progress
                          value={milestone.progress}
                          className="h-1.5 flex-1"
                        />
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 min-w-[35px] text-right">
                          {milestone.progress}%
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due: {formatDate(milestone.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
