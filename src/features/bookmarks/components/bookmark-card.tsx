import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bookmark as BookmarkType } from "../schema/bookmarks-data";
import { formatDate, getTimeAgo } from "../schema/bookmarks-data";
import {
  ExternalLink,
  Star,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  DollarSign,
  CheckCircle,
  User,
  Save,
  TrendingUp,
  Award,
} from "lucide-react";

interface BookmarkCardProps {
  bookmark: BookmarkType;
  viewMode: "grid" | "list";
  onRemove: (id: string) => void;
  userRole?: "freelancer" | "client";
}

export function BookmarkCard({
  bookmark,
  viewMode,
  onRemove,
  userRole,
}: BookmarkCardProps) {
  // Helper function to get user avatar
  const getUserAvatar = () => {
    switch (bookmark.type) {
      case "project":
        return (
          bookmark.client.avatar ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        );
      case "freelancer":
        return (
          bookmark.avatar ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        );
      case "service":
        return (
          bookmark.freelancer.avatar ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        );
      default:
        return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
    }
  };

  // Helper function to get user name
  const getUserName = () => {
    switch (bookmark.type) {
      case "project":
        return bookmark.client.name;
      case "freelancer":
        return bookmark.name;
      case "service":
        return bookmark.freelancer.name;
      default:
        return "Unknown";
    }
  };

  // Helper function to get bookmark title
  const getBookmarkTitle = () => {
    switch (bookmark.type) {
      case "project":
      case "service":
        return bookmark.title;
      case "freelancer":
        return bookmark.name;
      default:
        return "Bookmark";
    }
  };

  // Helper function to get bookmark description
  const getBookmarkDescription = () => {
    switch (bookmark.type) {
      case "project":
      case "service":
        return bookmark.description;
      case "freelancer":
        return bookmark.bio;
      default:
        return "";
    }
  };

  // Helper function to get bookmark URL
  const getBookmarkUrl = () => {
    switch (bookmark.type) {
      case "project":
        return bookmark.projectUrl;
      case "freelancer":
        return bookmark.freelancerUrl;
      case "service":
        return bookmark.serviceUrl;
      default:
        return "#";
    }
  };

  // Render different content based on bookmark type
  const renderSpecificContent = () => {
    switch (bookmark.type) {
      case "project":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Image
                  src={getUserAvatar()}
                  alt={getUserName()}
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  by {bookmark.client.name}
                </span>
              </div>

              {bookmark.client.verified && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">
                  {bookmark.budget.type === "fixed"
                    ? `$${bookmark.budget.min.toLocaleString()} - $${bookmark.budget.max.toLocaleString()}`
                    : `$${bookmark.budget.min.toLocaleString()} - $${bookmark.budget.max.toLocaleString()}/hr`}
                </span>
              </div>

              {bookmark.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {bookmark.location}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Posted: {formatDate(bookmark.datePosted)}
                </span>
              </div>

              {bookmark.deadline && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Due: {formatDate(bookmark.deadline)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)} more
                </Badge>
              )}
            </div>
          </>
        );

      case "freelancer":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={getUserAvatar()}
                alt={getUserName()}
                width={30}
                height={30}
                className="rounded-full object-cover"
              />

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.location}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">
                  ${bookmark.hourlyRate}/hr
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= Math.floor(bookmark.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {bookmark.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {bookmark.totalJobs} jobs
                </span>
              </div>

              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {bookmark.successRate}% success
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {bookmark.availability}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {bookmark.responseTime}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)} more
                </Badge>
              )}
            </div>
          </>
        );

      case "service":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Image
                  src={getUserAvatar()}
                  alt={getUserName()}
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  by {bookmark.freelancer.name}
                </span>
              </div>

              {bookmark.freelancer.verified && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 text-xs">
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">
                  {bookmark.pricing.type === "fixed"
                    ? `$${bookmark.pricing.min.toLocaleString()} - $${bookmark.pricing.max.toLocaleString()}`
                    : `$${bookmark.pricing.min} - $${bookmark.pricing.max}/hr`}
                </span>
              </div>

              {bookmark.deliveryTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {bookmark.deliveryTime}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              {bookmark.rating && (
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(bookmark.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {bookmark.rating.toFixed(1)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {bookmark.totalOrders} orders
                </span>
              </div>
            </div>

            {bookmark.revisions && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {bookmark.revisions} revisions included
                </Badge>
              </div>
            )}

            <div className="flex flex-wrap gap-1 mt-3">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)} more
                </Badge>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Render grid or list view
  if (viewMode === "grid") {
    return (
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200 py-0">
        <CardContent className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Save className="h-4 w-4" />
              <span>Saved&nbsp;•&nbsp;{getTimeAgo(bookmark.bookmarkedAt)}</span>
            </div>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs">
              {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1 flex-shrink-0">
              {bookmark.type === "project" && bookmark.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                  Featured
                </Badge>
              )}
              {bookmark.type === "service" && bookmark.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                  Featured
                </Badge>
              )}
              {bookmark.type === "freelancer" && bookmark.verified && (
                <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1 text-xs">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          </div>

          <h3 className="font-medium text-lg mt-2 line-clamp-1">
            {getBookmarkTitle()}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
            {getBookmarkDescription()}
          </p>

          {renderSpecificContent()}
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onRemove(bookmark.id)}
            >
              Remove
            </Button>

            <Link href={getBookmarkUrl()} passHref>
              <Button size="sm" className="gap-1 text-xs">
                <span>View</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    );
  } else {
    // List view
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 py-0">
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Save className="h-4 w-4" />
              <span>Saved&nbsp;•&nbsp;{getTimeAgo(bookmark.bookmarkedAt)}</span>
            </div>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs">
              {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1 flex-shrink-0">
              {bookmark.type === "project" && bookmark.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                  Featured
                </Badge>
              )}
              {bookmark.type === "service" && bookmark.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                  Featured
                </Badge>
              )}
              {bookmark.type === "freelancer" && bookmark.verified && (
                <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1 text-xs">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          </div>

          <h3 className="font-medium text-lg mt-2">{getBookmarkTitle()}</h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
            {getBookmarkDescription()}
          </p>

          {renderSpecificContent()}

          <div className="flex justify-end mt-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onRemove(bookmark.id)}
            >
              Remove
            </Button>

            <Link href={getBookmarkUrl()} passHref>
              <Button size="sm" className="gap-1 text-xs">
                <span>View</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }
}
