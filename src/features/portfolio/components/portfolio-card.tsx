import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  Github,
  Play,
  Calendar,
  DollarSign,
  Users,
  Star,
  Award,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  StarOff,
  ImageIcon,
} from "lucide-react";
import {
  PortfolioProject,
  statusConfig,
  getStatusLabel,
  getStatusColor,
} from "../schema/portfolio-data";

/**
 * Helper function to format relative time (e.g., "2 days ago")
 */
const getTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

interface PortfolioCardProps {
  project: PortfolioProject;
  viewMode: "grid" | "list";
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  onFeatureToggle?: (projectId: string) => void;
}

export function PortfolioCard({
  project,
  viewMode,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onFeatureToggle,
}: PortfolioCardProps) {
  // Action dropdown menu component
  const ActionDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="Open menu"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onView && (
          <DropdownMenuItem onClick={() => onView(project.id)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(project.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem onClick={() => onDuplicate(project.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
        )}
        {onFeatureToggle && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFeatureToggle(project.id)}>
              {project.featured ? (
                <>
                  <StarOff className="mr-2 h-4 w-4" />
                  Unfeature
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Feature
                </>
              )}
            </DropdownMenuItem>
          </>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(project.id)}
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (viewMode === "list") {
    return (
      <Card className="py-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Image */}
            <div className="relative w-full lg:w-80 h-48 lg:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
              {project.images.thumbnail ? (
                <Image
                  src={project.images.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                </div>
              )}
              {project.featured && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                  <Award className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => onView && onView(project.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors"
                      onClick={() => onView && onView(project.id)}
                    >
                      {project.title}
                    </h3>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {project.description.length > 150 
                      ? `${project.description.substring(0, 150)}...` 
                      : project.description}
                  </p>
                  
                  {/* Category and Skills */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    {project.skills && project.skills.length > 0 && (
                      <>
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill.id} variant="outline" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.skills.length - 3} more
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {getTimeAgo(project.createdAt)}</span>
                    </div>
                    {project.metrics.budget && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${project.metrics.budget.toLocaleString()}</span>
                      </div>
                    )}
                    {project.client.testimonial && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{project.client.testimonial.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Dropdown */}
                <ActionDropdown />
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 6} more
                  </Badge>
                )}
              </div>

              {/* Client Info and Links */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{project.client.name}</span>
                  <span>•</span>
                  <span>{project.client.industry}</span>
                </div>
                <div className="flex gap-2">
                  {project.links.live && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.links.live, "_blank");
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.links.github, "_blank");
                      }}
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="py-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card group overflow-hidden">
      {/* Project Image */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {project.images.thumbnail ? (
          <Image
            src={project.images.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <ImageIcon className="h-16 w-16 text-gray-400 dark:text-gray-600" />
          </div>
        )}
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 z-10">
            <Award className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.links.live && (
              <Button
                size="sm"
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.links.live, "_blank");
                }}
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </Button>
            )}
            {project.links.demo && (
              <Button
                size="sm"
                variant="secondary"
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.links.demo, "_blank");
                }}
              >
                <Play className="h-4 w-4" />
                Demo
              </Button>
            )}
          </div>
        </div>
        <Badge
          className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}
        >
          {getStatusLabel(project.status)}
        </Badge>
      </div>

      <CardContent className="p-6 pt-1 space-y-4">
        {/* Project Title & Description */}
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => onView && onView(project.id)}
          >
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Category and Skills */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
          {project.skills && project.skills.length > 0 && (
            <>
              {project.skills.slice(0, 3).map((skill) => (
                <Badge key={skill.id} variant="outline" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
              {project.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.skills.length - 3} more
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Project Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Posted {getTimeAgo(project.createdAt)}</span>
          </div>
          {project.client.testimonial && project.client.testimonial.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{project.client.testimonial.rating}/5</span>
            </div>
          )}
        </div>

        {/* Client & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">
            {project.client.name}
          </div>
          <div className="flex gap-1 items-center">
            {project.links.github && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.links.github, "_blank");
                }}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            <ActionDropdown />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
