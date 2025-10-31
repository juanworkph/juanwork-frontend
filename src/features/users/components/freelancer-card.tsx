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
  Award,
  TrendingUp,
  MessageCircle,
  Briefcase,
  Globe,
  Target,
} from "lucide-react";
import {
  FreelancerProfile,
  formatCurrency,
  getExperienceLevelLabel,
  getAvailabilityLabel,
  getAvailabilityColor,
} from "../schema";

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const rateDisplay = `${formatCurrency(
    freelancer.hourlyRate.min
  )} - ${formatCurrency(freelancer.hourlyRate.max)}/hr`;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 p-0">
      <CardContent className="p-6 h-full">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {freelancer.isTopRated && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <Award className="h-3 w-3 mr-1 fill-white" />
                Top Rated
              </Badge>
            )}
            {freelancer.isFeatured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={getAvailabilityColor(freelancer.availability)}
            >
              {getAvailabilityLabel(freelancer.availability)}
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

        {/* Freelancer Avatar and Info */}
        <div className="flex items-start gap-4 mb-4">
          <Link href={freelancer.profileUrl}>
            <div className="relative">
              <Image
                src={
                  freelancer.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt={freelancer.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white dark:border-gray-700 shadow-md hover:scale-105 transition-transform"
              />
              {freelancer.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={freelancer.profileUrl}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {freelancer.name}
              </h3>
            </Link>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {freelancer.title}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {freelancer.rating.toFixed(1)}
                </span>
                <span>({freelancer.reviewsCount})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{freelancer.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {freelancer.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {freelancer.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
            >
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
              +{freelancer.skills.length - 5} more
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Completed
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {freelancer.completedJobs} jobs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-500 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Success Rate
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {freelancer.successRate}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hourly Rate
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {rateDisplay}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Response Time
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {freelancer.responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{getExperienceLevelLabel(freelancer.experienceLevel)}</span>
          </div>
          {freelancer.languages.length > 0 && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>{freelancer.languages.join(", ")}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => (window.location.href = freelancer.profileUrl)}
          >
            View Profile
          </Button>
          <Button className="flex-1 bg-[#F45A0B] hover:bg-[#F45A0B]/80 gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
