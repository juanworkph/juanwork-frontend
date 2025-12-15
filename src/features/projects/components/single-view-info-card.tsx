"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import type { ProjectDetails } from "../schema";
import { formatCurrency, getStatusColor, getPriorityColor } from "../schema";

interface SingleViewInfoCardProps {
  project: ProjectDetails;
}

export const SingleViewInfoCard = ({ project }: SingleViewInfoCardProps) => {
  const formatDeadline = (endDate: string) => {
    const date = new Date(endDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPostedDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Posted today";
    if (diffDays === 1) return "Posted yesterday";
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
    return `Posted on ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  return (
    <Card
      className="border border-gray-200 dark:border-gray-700"
      role="region"
      aria-labelledby="project-info-heading"
    >
      <CardContent className="p-4 sm:p-6">
        {/* Project Title with Badges */}
        <header className="space-y-3 mb-6">
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Project status badges"
          >
            <Badge
              className={getStatusColor(project.status)}
              role="status"
              aria-label={`Project status: ${project.status}`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            {project.priority && (
              <Badge
                className={getPriorityColor(project.priority)}
                role="status"
                aria-label={`Project priority: ${project.priority}`}
              >
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
              </Badge>
            )}
            {project.isFeatured && (
              <Badge
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0"
                role="status"
                aria-label="This is a featured project"
              >
                Featured
              </Badge>
            )}
          </div>

          <h1
            id="project-info-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            {project.name}
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400" aria-label={`Posted ${formatPostedDate(project.createdAt)}`}>
            {formatPostedDate(project.createdAt)}
          </p>
        </header>

        {/* Key Metrics Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Project key metrics"
        >
          {/* Budget */}
          <div
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            role="listitem"
            aria-label={`Budget: ${project.budget.type === "fixed"
              ? formatCurrency(project.budget.amount, project.budget.currency)
              : `${formatCurrency(project.budget.hourlyRate || 0, project.budget.currency)} per hour`}`}
          >
            <div
              className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0"
              aria-hidden="true"
            >
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" id="budget-label">
                Budget
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate" aria-labelledby="budget-label">
                {project.budget.type === "fixed"
                  ? formatCurrency(project.budget.amount, project.budget.currency)
                  : `${formatCurrency(project.budget.hourlyRate || 0, project.budget.currency)}/hr`}
              </p>
              {project.budget.type === "hourly" && project.budget.estimatedHours && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Est. {project.budget.estimatedHours} hours
                </p>
              )}
            </div>
          </div>

          {/* Timeline/Deadline */}
          <div
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            role="listitem"
            aria-label={`${project.duration ? "Duration" : "Deadline"}: ${project.duration || formatDeadline(project.deadline.endDate)}`}
          >
            <div
              className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0"
              aria-hidden="true"
            >
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" id="timeline-label">
                {project.duration ? "Duration" : "Deadline"}
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white" aria-labelledby="timeline-label">
                {project.duration || formatDeadline(project.deadline.endDate)}
              </p>
              {!project.duration && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {project.deadline.deliveryDays} days
                </p>
              )}
            </div>
          </div>

          {/* Proposals */}
          <div
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            role="listitem"
            aria-label={`${project.proposalStats?.totalProposals || 0} proposals submitted`}
          >
            <div
              className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0"
              aria-hidden="true"
            >
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" id="proposals-label">
                Proposals
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white" aria-labelledby="proposals-label">
                {project.proposalStats?.totalProposals || 0}
              </p>
              {project.proposalStats && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Avg: {formatCurrency(project.proposalStats.averageBid, project.budget.currency)}
                </p>
              )}
            </div>
          </div>

          {/* Experience Level */}
          <div
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            role="listitem"
            aria-label={`Required experience level: ${project.experienceLevel || "Intermediate"}`}
          >
            <div
              className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0"
              aria-hidden="true"
            >
              <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" id="experience-label">
                Experience
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white capitalize" aria-labelledby="experience-label">
                {project.experienceLevel || "Intermediate"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Level
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
