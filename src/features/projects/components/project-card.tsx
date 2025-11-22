import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  Star,
  ExternalLink,
  MessageCircle,
  Pin,
  Flag,
  Calendar,
  Layers,
  TrendingUp,
} from "lucide-react";
import {
  Project,
  formatCurrency,
  getTimeLeft,
  getStatusColor,
  getPriorityColor,
} from "../schema";
import { useAuth } from "@/contexts/auth-context";

interface ProjectCardProps {
  project: Project;
  onPin?: (id: string) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function ProjectCard({
  project,
  onPause,
  onResume,
  onComplete,
}: ProjectCardProps) {
  const { currentRole } = useAuth();
  const isClient = currentRole === "client";
  const formattedBudget = formatCurrency(
    project.budget.amount,
    project.budget.currency
  );
  const timeLeft = getTimeLeft(project.deadline.endDate);

  // Format deadline date - consistent between server and client
  const formatDeadlineDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const deadlineDate = formatDeadlineDate(project.deadline.endDate);

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200 py-0">
      <CardContent className="flex-1 p-4">
        {/* Header with category and status */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{deadlineDate}</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(project.status)} text-xs`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge
            variant="outline"
            className={`${getPriorityColor(project.priority)} text-xs`}
          >
            <Flag className="h-3 w-3 mr-1" />
            {project.priority}
          </Badge>
          {project.isPinned && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
              <Pin className="h-3 w-3 mr-1 fill-amber-600" />
              Pinned
            </Badge>
          )}
        </div>

        {/* Project Title and Description */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg line-clamp-2 mb-[10px]">
            <Link
              href={project.projectUrl}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
            >
              {project.name}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {project.description}
          </p>

          {/* Client info with avatar */}
          <div className="flex items-center gap-2">
            <Image
              src={
                project.client.avatar ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              }
              alt={project.client.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {project.client.name}
                </p>
                {project.client.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                )}
              </div>
              <div className="flex items-center gap-1">
                {project.client.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {project.client.country}
                    </span>
                  </div>
                )}
                {project.client.rating && (
                  <div className="flex items-center gap-1">
                    <span className="mx-1">•</span>
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {project.client.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Details - Compact Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isClient ? "Cost" : "Budget"}
                </p>
                <p className="text-sm font-semibold">{formattedBudget}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock
                className={`h-4 w-4 ${
                  project.deadline.isOverdue
                    ? "text-red-500 dark:text-red-400"
                    : "text-amber-500 dark:text-amber-400"
                }`}
              />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Time Left
                </p>
                <p
                  className={`text-sm font-semibold ${
                    project.deadline.isOverdue ? "text-red-600 dark:text-red-400" : ""
                  }`}
                >
                  {timeLeft}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </p>
                <p className="text-sm font-semibold">
                  {project.progress.progressPercentage}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tasks
                </p>
                <p className="text-sm font-semibold">
                  {project.progress.completedTasks}/{project.progress.totalTasks}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <Progress
              value={project.progress.progressPercentage}
              className="h-2"
            />
          </div>

          {/* Additional info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span>
                {project.progress.completedMilestones}/{project.progress.totalMilestones} milestones
              </span>
            </div>
            {project.hasUnreadMessages && (
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400">
                  {project.messageCount} new msg
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between w-full gap-2">
          <div className="flex gap-2">
            {project.status === "active" && onPause && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => onPause(project.id)}
              >
                Pause
              </Button>
            )}
            {project.status === "paused" && onResume && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => onResume(project.id)}
              >
                Resume
              </Button>
            )}
            {project.status === "active" && onComplete && (
              <Button
                size="sm"
                className="text-xs h-8 bg-green-600 hover:bg-green-700"
                onClick={() => onComplete(project.id)}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </Button>
            )}
          </div>
          <Link href={project.projectUrl}>
            <Button size="sm" className="gap-1 text-xs h-8">
              <span>View</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
