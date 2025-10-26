import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bookmark as BookmarkType } from "../schema/bookmarks-data";
import { formatDate, getTimeAgo } from "../schema/bookmarks-data";
import {
  Bookmark,
  ExternalLink,
  Star,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  Users,
  FileText,
  BookOpen,
  Folder,
  DollarSign,
  Tag,
  CheckCircle,
  User,
  Package,
  TrendingUp,
  Award,
} from "lucide-react";

interface BookmarkCardProps {
  bookmark: BookmarkType;
  viewMode: "grid" | "list";
  onRemove: (id: string) => void;
}

export function BookmarkCard({
  bookmark,
  viewMode,
  onRemove,
}: BookmarkCardProps) {
  // Helper function to get bookmark icon
  const getBookmarkIcon = () => {
    switch (bookmark.type) {
      case "project":
        return <Briefcase className="h-4 w-4" />;
      case "client":
        return <Users className="h-4 w-4" />;
      case "job":
        return <FileText className="h-4 w-4" />;
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "resource":
        return <Folder className="h-4 w-4" />;
      case "freelancer":
        return <User className="h-4 w-4" />;
      case "service":
        return <Package className="h-4 w-4" />;
      default:
        return <Bookmark className="h-4 w-4" />;
    }
  };

  // Helper function to get bookmark title
  const getBookmarkTitle = () => {
    switch (bookmark.type) {
      case "project":
      case "job":
      case "article":
      case "resource":
      case "service":
        return bookmark.title;
      case "client":
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
      case "job":
      case "resource":
      case "service":
        return bookmark.description;
      case "client":
        return bookmark.description;
      case "freelancer":
        return bookmark.bio;
      case "article":
        return bookmark.summary;
      default:
        return "";
    }
  };

  // Helper function to get bookmark URL
  const getBookmarkUrl = () => {
    switch (bookmark.type) {
      case "project":
        return bookmark.projectUrl;
      case "client":
        return bookmark.clientUrl;
      case "job":
        return bookmark.jobUrl;
      case "article":
        return bookmark.articleUrl;
      case "resource":
        return bookmark.resourceUrl;
      case "freelancer":
        return bookmark.freelancerUrl;
      case "service":
        return bookmark.serviceUrl;
      default:
        return "#";
    }
  };

  // Helper function to get bookmark thumbnail
  const getBookmarkThumbnail = () => {
    switch (bookmark.type) {
      case "project":
        return (
          bookmark.thumbnail ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "client":
        return (
          bookmark.avatar ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "job":
        return (
          bookmark.companyLogo ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "article":
        return (
          bookmark.thumbnail ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "resource":
        return (
          bookmark.thumbnail ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "freelancer":
        return (
          bookmark.avatar ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      case "service":
        return (
          bookmark.thumbnail ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop"
        );
      default:
        return "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop";
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

      case "client":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.location}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.industry}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Projects
                </p>
                <p className="text-sm font-medium">{bookmark.projectsPosted}</p>
              </div>

              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Spent
                </p>
                <p className="text-sm font-medium">
                  ${(bookmark.totalSpent / 1000).toFixed(1)}k
                </p>
              </div>

              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hire Rate
                </p>
                <p className="text-sm font-medium">{bookmark.hireRate}%</p>
              </div>
            </div>
          </>
        );

      case "job":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.location}
                  {bookmark.remote && " (Remote)"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.employmentType.replace("_", " ")}
                </span>
              </div>
            </div>

            {bookmark.salary && (
              <div className="flex items-center gap-1 mt-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">
                  ${bookmark.salary.min.toLocaleString()} - $
                  {bookmark.salary.max.toLocaleString()}/
                  {bookmark.salary.period}
                </span>
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

      case "article":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.readTime} min read
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(bookmark.publishedDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                By {bookmark.author}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {bookmark.source}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {bookmark.tags
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              {bookmark.tags.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.tags.length - (viewMode === "grid" ? 3 : 5)} more
                </Badge>
              )}
            </div>
          </>
        );

      case "resource":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Folder className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.format.charAt(0).toUpperCase() +
                    bookmark.format.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {bookmark.category}
                </span>
              </div>

              {bookmark.isFree ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0">
                  Free
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                  Premium
                </Badge>
              )}
            </div>

            {bookmark.rating && (
              <div className="flex items-center gap-1 mt-2">
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

            <div className="flex flex-wrap gap-1 mt-3">
              {bookmark.tags
                .slice(0, viewMode === "grid" ? 3 : 5)
                .map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              {bookmark.tags.length > (viewMode === "grid" ? 3 : 5) && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.tags.length - (viewMode === "grid" ? 3 : 5)} more
                </Badge>
              )}
            </div>
          </>
        );

      case "freelancer":
        return (
          <>
            <div className="flex items-center gap-2 mt-2">
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
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
        <div className="relative h-40">
          <Image
            src={getBookmarkThumbnail()}
            alt={getBookmarkTitle()}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge className="bg-white/90 text-gray-800 border-0 backdrop-blur-sm">
              {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
            </Badge>
            {bookmark.type === "project" && bookmark.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-0">
                Featured
              </Badge>
            )}
            {bookmark.type === "service" && bookmark.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-0">
                Featured
              </Badge>
            )}
            {bookmark.type === "client" && bookmark.verified && (
              <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Verified
              </Badge>
            )}
            {bookmark.type === "freelancer" && bookmark.verified && (
              <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Verified
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {getBookmarkIcon()}
              <span>Saved {getTimeAgo(bookmark.bookmarkedAt)}</span>
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
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-40 sm:h-auto sm:w-48 flex-shrink-0">
            <Image
              src={getBookmarkThumbnail()}
              alt={getBookmarkTitle()}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge className="bg-white/90 text-gray-800 border-0 backdrop-blur-sm">
                {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                {getBookmarkIcon()}
                <span>Saved {getTimeAgo(bookmark.bookmarkedAt)}</span>
              </div>

              <div className="flex gap-1">
                {bookmark.type === "project" && bookmark.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">
                    Featured
                  </Badge>
                )}
                {bookmark.type === "service" && bookmark.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">
                    Featured
                  </Badge>
                )}
                {bookmark.type === "client" && bookmark.verified && (
                  <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </Badge>
                )}
                {bookmark.type === "freelancer" && bookmark.verified && (
                  <Badge className="bg-green-100 text-green-800 border-0 flex items-center gap-1">
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
        </div>
      </Card>
    );
  }
}
