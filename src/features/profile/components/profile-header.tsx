"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Edit,
  Share2,
  Star,
  Shield,
  CheckCircle,
  Camera,
  Briefcase,
  Building2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import type {
  PersonalInfo,
  ProfileStats,
  ClientPersonalInfo,
  ClientStats,
  CompanyDetails,
} from "../schema";

interface ProfileHeaderProps {
  personalInfo: PersonalInfo | ClientPersonalInfo;
  companyDetails?: CompanyDetails;
  stats: ProfileStats | ClientStats;
  isVerified: boolean;
  profileCompleteness: number;
  joinDate: string;
  isOwnProfile?: boolean;
}

export function ProfileHeader({
  personalInfo,
  companyDetails,
  stats,
  isVerified,
  profileCompleteness,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const { currentRole } = useAuth();
  const isFreelancer = currentRole === "freelancer";
  const isClient = currentRole === "client";

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-700 border-green-200";
      case "Busy":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Not Available":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Type guards and helper functions
  const hasHourlyRate = (
    info: PersonalInfo | ClientPersonalInfo
  ): info is PersonalInfo => {
    return "hourlyRate" in info;
  };

  const isProfileStats = (s: ProfileStats | ClientStats): s is ProfileStats => {
    return "completedProjects" in s && "clientSatisfaction" in s;
  };

  const isClientStats = (s: ProfileStats | ClientStats): s is ClientStats => {
    return "totalProjects" in s && "activeProjects" in s;
  };

  return (
    <Card className="overflow-hidden shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 py-0">
      {/* Cover Image */}
      <div className="relative h-48 lg:h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        {personalInfo.coverImage && (
          <Image
            src={personalInfo.coverImage}
            alt="Profile cover"
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 gap-2 bg-white/90 hover:bg-white text-gray-900"
          >
            <Camera className="h-4 w-4" />
            Edit Cover
          </Button>
        )}
      </div>

      <CardContent className="relative px-6 pb-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 -mt-16 lg:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-white shadow-xl">
                <AvatarImage
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                />
                <AvatarFallback className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Name and Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {personalInfo.name}
                </h1>
                {isVerified && (
                  <div className="flex items-center gap-1">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </div>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-3">
                {personalInfo.title}
              </p>

              {/* Company Info (for clients) */}
              {isClient && companyDetails && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Building2 className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">{companyDetails.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{companyDetails.industry}</span>
                </div>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{stats.averageRating}</span>
                  <span>({stats.totalReviews} reviews)</span>
                </div>
                {isFreelancer && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Responds {personalInfo.responseTime}</span>
                  </div>
                )}
                {isClient && isClientStats(stats) && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{stats.totalProjects} projects posted</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:items-end">
            {!isOwnProfile ? (
              <>
                {isFreelancer && hasHourlyRate(personalInfo) ? (
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <DollarSign className="h-4 w-4" />
                    Hire ${personalInfo.hourlyRate}/hr
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Briefcase className="h-4 w-4" />
                    View Projects
                  </Button>
                )}
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Status and Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Badge
            className={`${getAvailabilityColor(
              personalInfo.availability
            )} font-medium px-3 py-1`}
          >
            {personalInfo.availability}
          </Badge>

          {isFreelancer && isProfileStats(stats) && (
            <>
              <Badge variant="outline" className="font-medium px-3 py-1">
                {stats.completedProjects} Projects Completed
              </Badge>

              <Badge variant="outline" className="font-medium px-3 py-1">
                {stats.clientSatisfaction}% Client Satisfaction
              </Badge>
            </>
          )}

          {isClient && isClientStats(stats) && (
            <>
              <Badge variant="outline" className="font-medium px-3 py-1">
                {stats.activeProjects} Active Projects
              </Badge>

              {stats.paymentVerified && (
                <Badge className="bg-green-100 text-green-700 border-green-200 font-medium px-3 py-1">
                  Payment Verified
                </Badge>
              )}
            </>
          )}

          {personalInfo.website && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-blue-600 hover:text-blue-700"
            >
              <Globe className="h-4 w-4" />
              {isFreelancer ? "Portfolio Website" : "Website"}
            </Button>
          )}
        </div>

        {/* Profile Completeness (only for own profile) */}
        {isOwnProfile && (
          <div
            className={`mt-4 p-4 rounded-lg border ${
              isClient
                ? "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
                : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium ${
                  isClient
                    ? "text-indigo-900 dark:text-indigo-100"
                    : "text-blue-900 dark:text-blue-100"
                }`}
              >
                Profile Completeness
              </span>
              <span
                className={`text-sm font-bold ${
                  isClient
                    ? "text-indigo-900 dark:text-indigo-100"
                    : "text-blue-900 dark:text-blue-100"
                }`}
              >
                {profileCompleteness}%
              </span>
            </div>
            <div
              className={`w-full rounded-full h-2 ${
                isClient
                  ? "bg-indigo-200 dark:bg-indigo-800"
                  : "bg-blue-200 dark:bg-blue-800"
              }`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isClient
                    ? "bg-gradient-to-r from-indigo-600 to-purple-500"
                    : "bg-gradient-to-r from-blue-600 to-blue-500"
                }`}
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <p
              className={`text-xs mt-2 ${
                isClient
                  ? "text-indigo-700 dark:text-indigo-300"
                  : "text-blue-700 dark:text-blue-300"
              }`}
            >
              {isClient
                ? "Complete your profile to attract more qualified freelancers"
                : "Complete your profile to attract more clients"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
