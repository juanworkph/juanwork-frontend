import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MessageSquare,
  Paperclip,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import {
  WorkstationProject,
  statusConfig,
  priorityConfig,
  formatCurrency,
  formatDate,
  getDaysRemaining,
} from "../schema/workstation-data";

interface ProjectCardProps {
  project: WorkstationProject;
  onView?: (projectId: string) => void;
}

export function ProjectCard({ project, onView }: ProjectCardProps) {
  const statusInfo = statusConfig[project.status];
  const priorityInfo = priorityConfig[project.priority];
  const daysRemaining = getDaysRemaining(project.deadline);

  const getDeadlineColor = () => {
    if (project.status === "completed")
      return "text-green-600 dark:text-green-400";
    if (project.status === "overdue" || daysRemaining < 0)
      return "text-red-600 dark:text-red-400";
    if (daysRemaining <= 3) return "text-orange-600 dark:text-orange-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getDeadlineText = () => {
    if (project.status === "completed")
      return `Completed ${formatDate(project.completedDate!)}`;
    if (project.status === "overdue" || daysRemaining < 0) {
      return `${Math.abs(daysRemaining)} days overdue`;
    }
    if (daysRemaining === 0) return "Due today";
    if (daysRemaining === 1) return "Due tomorrow";
    return `${daysRemaining} days left`;
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer p-0"
      onClick={() => onView?.(project.id)}
    >
      <CardContent className="p-6 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={statusInfo.color}>
                <span className="mr-1">{statusInfo.icon}</span>
                {statusInfo.label}
              </Badge>
              <Badge className={priorityInfo.color}>
                <span className="mr-1">{priorityInfo.icon}</span>
                {priorityInfo.label}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-[#F45A0B] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={project.client.avatar}
              alt={project.client.name}
            />
            <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {project.client.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {project.client.country}
            </p>
          </div>
        </div>

        {/* Progress */}
        {project.status !== "pending" && project.status !== "cancelled" && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}

        {/* Budget & Time Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F45A0B]/10">
              <DollarSign className="h-4 w-4 text-[#F45A0B]" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Budget</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {project.projectType === "fixed"
                  ? formatCurrency(project.budget)
                  : `${formatCurrency(project.hourlyRate || 0)}/hr`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${
                getDeadlineColor() === "text-red-600 dark:text-red-400"
                  ? "bg-red-50 dark:bg-red-900/10"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <Calendar className={`h-4 w-4 ${getDeadlineColor()}`} />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Deadline
              </p>
              <p className={`text-sm font-semibold ${getDeadlineColor()}`}>
                {getDeadlineText()}
              </p>
            </div>
          </div>
        </div>

        {/* Hours Info (for active projects) */}
        {project.hoursWorked !== undefined && project.estimatedHours && (
          <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hours: {project.hoursWorked} / {project.estimatedHours}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {Math.round((project.hoursWorked / project.estimatedHours) * 100)}
              %
            </span>
          </div>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs bg-gray-50 dark:bg-gray-800"
            >
              {skill}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs bg-gray-50 dark:bg-gray-800"
            >
              +{project.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{project.messages}</span>
            </div>
            <div className="flex items-center gap-1">
              <Paperclip className="h-4 w-4" />
              <span>{project.attachments}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-[#F45A0B] hover:text-[#F45A0B] hover:bg-[#F45A0B]/10"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(project.id);
            }}
          >
            View
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
