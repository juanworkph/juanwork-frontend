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
  Layers,
  TrendingUp,
  Award,
  Sparkles,
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
            {/* Client info with avatar */}
            <div className="flex items-center gap-2">
              <Image
                src={getUserAvatar()}
                alt={getUserName()}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {bookmark.client.name}
                  </p>
                  {bookmark.client.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {bookmark.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {bookmark.location}
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
                    Budget
                  </p>
                  <p className="text-sm font-semibold">
                    {bookmark.budget.type === "fixed"
                      ? `$${bookmark.budget.min.toLocaleString()}-$${bookmark.budget.max.toLocaleString()}`
                      : `$${bookmark.budget.min}-$${bookmark.budget.max}/hr`}
                  </p>
                </div>
              </div>

              {bookmark.deadline && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Deadline
                    </p>
                    <p className="text-sm font-semibold">
                      {formatDate(bookmark.deadline)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)}
                </Badge>
              )}
            </div>
          </>
        );

      case "freelancer":
        return (
          <>
            {/* Freelancer info with avatar */}
            <div className="flex items-center gap-2">
              <Image
                src={getUserAvatar()}
                alt={getUserName()}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {bookmark.name}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {bookmark.location}
                  </span>
                  <span className="mx-1">•</span>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {bookmark.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Freelancer Details - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hourly Rate
                  </p>
                  <p className="text-sm font-semibold">
                    ${bookmark.hourlyRate}/hr
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Jobs Done
                  </p>
                  <p className="text-sm font-semibold">{bookmark.totalJobs}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Success
                  </p>
                  <p className="text-sm font-semibold">
                    {bookmark.successRate}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Response
                  </p>
                  <p className="text-sm font-semibold">
                    {bookmark.responseTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div>
              <Badge variant="secondary" className="text-xs">
                {bookmark.availability}
              </Badge>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)}
                </Badge>
              )}
            </div>
          </>
        );

      case "service":
        return (
          <>
            {/* Freelancer info with avatar */}
            <div className="flex items-center gap-2">
              <Image
                src={getUserAvatar()}
                alt={getUserName()}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {bookmark.freelancer.name}
                  </p>
                  {bookmark.freelancer.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {bookmark.rating && (
                    <>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {bookmark.rating.toFixed(1)}
                      </span>
                      <span className="mx-1">•</span>
                    </>
                  )}
                  <Award className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {bookmark.totalOrders} orders
                  </span>
                </div>
              </div>
            </div>

            {/* Service Details - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Pricing
                  </p>
                  <p className="text-sm font-semibold">
                    {bookmark.pricing.type === "fixed"
                      ? `$${bookmark.pricing.min}-$${bookmark.pricing.max}`
                      : `$${bookmark.pricing.min}-$${bookmark.pricing.max}/hr`}
                  </p>
                </div>
              </div>

              {bookmark.deliveryTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Delivery
                    </p>
                    <p className="text-sm font-semibold">
                      {bookmark.deliveryTime}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Revisions Badge */}
            {bookmark.revisions && (
              <div>
                <Badge variant="outline" className="text-xs">
                  {bookmark.revisions} revisions
                </Badge>
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {bookmark.skills
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              {bookmark.skills.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.skills.length - (viewMode === "grid" ? 3 : 5)}
                </Badge>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Get category for display
  const getCategory = () => {
    switch (bookmark.type) {
      case "project":
        return bookmark.category || "Project";
      case "freelancer":
        return bookmark.title || "Freelancer";
      case "service":
        return bookmark.category || "Service";
      default:
        return "Bookmark";
    }
  };

  // Format bookmarked date - consistent between server and client
  const formatBookmarkedDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Render grid or list view
  if (viewMode === "grid") {
    return (
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200 py-0">
        <CardContent className="flex-1 p-4">
          {/* Header with category and saved date */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>{getCategory()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatBookmarkedDate(bookmark.bookmarkedAt)}</span>
              </div>
            </div>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs">
              {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
            </Badge>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {bookmark.type === "project" && bookmark.featured && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {bookmark.type === "service" && bookmark.featured && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {bookmark.type === "freelancer" && bookmark.verified && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg line-clamp-2 mb-[10px]">
              <Link
                href={getBookmarkUrl()}
                className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
              >
                {getBookmarkTitle()}
              </Link>
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {getBookmarkDescription()}
            </p>

            {renderSpecificContent()}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => onRemove(bookmark.id)}
            >
              Remove
            </Button>

            <Link href={getBookmarkUrl()}>
              <Button size="sm" className="gap-1 text-xs h-8">
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
          {/* Header with category and saved date */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>{getCategory()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatBookmarkedDate(bookmark.bookmarkedAt)}</span>
              </div>
            </div>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs">
              {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
            </Badge>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {bookmark.type === "project" && bookmark.featured && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {bookmark.type === "service" && bookmark.featured && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {bookmark.type === "freelancer" && bookmark.verified && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              <Link
                href={getBookmarkUrl()}
                className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
              >
                {getBookmarkTitle()}
              </Link>
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {getBookmarkDescription()}
            </p>

            {renderSpecificContent()}
          </div>

          <div className="flex justify-end mt-4 pt-4 gap-2 border-t border-gray-100 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => onRemove(bookmark.id)}
            >
              Remove
            </Button>

            <Link href={getBookmarkUrl()}>
              <Button size="sm" className="gap-1 text-xs h-8">
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
