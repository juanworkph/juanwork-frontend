import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  Bookmark,
  FileText,
  TrendingUp,
  Zap,
  Layers,
} from "lucide-react";
import {
  Project,
  formatCurrency,
  formatTimeAgo,
  getExperienceLevelLabel,
  getDurationLabel,
} from "../schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const budgetDisplay =
    project.budget.type === "fixed"
      ? `${formatCurrency(project.budget.min || 0)} - ${formatCurrency(
          project.budget.max || 0
        )}`
      : `${formatCurrency(project.budget.hourlyRate || 0)}/hr`;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 p-0">
      <CardContent className="p-6 h-full">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {project.isFeatured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            {project.isUrgent && (
              <Badge
                variant="outline"
                className="border-red-300 text-red-600 dark:text-red-400"
              >
                <Zap className="h-3 w-3 mr-1 fill-red-500" />
                Urgent
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              {project.category}
            </Badge>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            }`}
          >
            <Bookmark
              className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Title */}
        <Link href={project.projectUrl}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
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

        {/* Client Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-4">
          <Image
            src={
              project.client.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt={project.client.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-white dark:border-gray-700"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {project.client.name}
              </span>
              {project.client.verified && (
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{project.client.country}</span>
              {project.client.rating && (
                <>
                  <span>•</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{project.client.rating}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {project.budget.type === "fixed" ? "Budget" : "Hourly Rate"}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {budgetDisplay}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
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
            <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {getExperienceLevelLabel(project.experienceLevel)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Proposals
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {project.proposalsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Posted Time */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Posted {formatTimeAgo(project.postedDate)}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => (window.location.href = project.projectUrl)}
          >
            View Details
          </Button>
          <Button className="flex-1 bg-[#F45A0B] hover:bg-[#F45A0B]/80">
            Submit Proposal
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
