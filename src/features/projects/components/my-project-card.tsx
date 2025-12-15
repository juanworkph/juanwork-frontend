import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageCircle,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Layers,
} from "lucide-react";
import {
  MyProject,
  projectStatusConfig,
  formatDate,
  formatCurrency,
  getDurationLabel,
  getExperienceLevelLabel,
} from "../schema/my-projects-data";

interface MyProjectCardProps {
  project: MyProject;
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
  onView?: (projectId: string) => void;
}

export function MyProjectCard({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
}: MyProjectCardProps) {
  const statusInfo = projectStatusConfig[project.status];

  const handleCardClick = () => {
    if (onView) {
      onView(project.id);
    }
  };

  const budgetDisplay =
    project.budgetType === "fixed"
      ? `${formatCurrency(project.budget.min)} - ${formatCurrency(
          project.budget.max
        )}`
      : `${formatCurrency(project.budget.hourlyRate || 0)}/hr`;

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden p-0 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 h-auto">
        {/* Header: Status, Category, and Upgrades */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusInfo.color}>
              <span className="mr-1">{statusInfo.icon}</span>
              {statusInfo.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              {project.category}
            </Badge>
            {project.upgrades.length > 0 && (
              <>
                {project.upgrades.slice(0, 2).map((upgrade) => (
                  <Badge key={upgrade} variant="outline" className="text-xs">
                    {upgrade.toUpperCase()}
                  </Badge>
                ))}
                {project.upgrades.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.upgrades.length - 2}
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              {onView && (
                <DropdownMenuItem onClick={() => onView(project.id)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View Details</span>
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(project.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              )}
              {onDuplicate && (
                <DropdownMenuItem onClick={() => onDuplicate(project.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(project.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Project Title */}
        <h3 className="font-semibold text-xl text-gray-900 dark:text-white line-clamp-2 mb-3">
          {project.projectTitle}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
              +{project.skills.length - 5} more
            </span>
          )}
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {project.budgetType === "fixed" ? "Budget" : "Hourly Rate"}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {budgetDisplay}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageCircle className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Proposals
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {project.proposalsCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Duration
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {getDurationLabel(project.duration)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {getExperienceLevelLabel(project.experienceLevel)}
              </p>
            </div>
          </div>
        </div>

        {/* Hired Count */}
        {project.hiredCount > 0 && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300 font-medium">
              {project.hiredCount} freelancer{project.hiredCount > 1 ? "s" : ""}{" "}
              hired
            </span>
          </div>
        )}

        {/* Footer: Dates */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {formatDate(project.createdAt)}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{" "}
            {formatDate(project.updatedAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
