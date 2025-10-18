import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Clock,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit,
} from "lucide-react";
import { PersonalInfo } from "../schema/profile-data";

interface AboutMeSectionProps {
  personalInfo: PersonalInfo;
  joinDate: string;
  isOwnProfile?: boolean;
}

export function AboutMeSection({
  personalInfo,
  joinDate,
  isOwnProfile = false,
}: AboutMeSectionProps) {
  const formatJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Card className="shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-xl font-semibold">About Me</CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Bio */}
        <div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            {personalInfo.bio}
          </p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location & Timezone */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Location
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Timezone
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {personalInfo.timezone}
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Availability */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {personalInfo.email}
                </p>
              </div>
            </div>

            {personalInfo.phone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {personalInfo.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Joined {formatJoinDate(joinDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Response time: {personalInfo.responseTime}</span>
          </div>

          {personalInfo.website && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">Visit Website</span>
            </Button>
          )}
        </div>

        {/* Availability Status */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div
                className={`w-3 h-3 rounded-full ${
                  personalInfo.availability === "Available"
                    ? "bg-green-500"
                    : personalInfo.availability === "Busy"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-green-900 dark:text-green-100">
                Currently {personalInfo.availability}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                {personalInfo.availability === "Available"
                  ? "Ready to take on new projects and respond quickly to messages"
                  : personalInfo.availability === "Busy"
                  ? "Currently working on projects but can discuss new opportunities"
                  : "Not taking on new projects at the moment"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
