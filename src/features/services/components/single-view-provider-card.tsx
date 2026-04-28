"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, MapPin, User, CheckCircle2 } from "lucide-react";
import type {
  ServiceProvider,
  ProviderLevel,
} from "../schema/discover-services-data";

interface SingleViewProviderCardProps {
  provider: ServiceProvider;
}

export const SingleViewProviderCard = memo(
  ({ provider }: SingleViewProviderCardProps) => {
    // Get initials for avatar fallback
    const getInitials = (name: string): string => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    // Get level label text for the top caption
    const getLevelCaption = (level: ProviderLevel): string => {
      switch (level) {
        case "expert":
          return "EXPERT LEVEL";
        case "top":
          return "TOP RATED";
        case "level2":
          return "LEVEL 2";
        case "level1":
          return "LEVEL 1";
        case "new":
          return "NEW SELLER";
        default:
          return "SELLER LEVEL";
      }
    };

    // Get specific level value relative to the caption
    const getLevelValue = (level: ProviderLevel): string => {
      switch (level) {
        case "expert":
          return "Level 4";
        case "top":
          return "Top Rated";
        case "level2":
          return "Level 2";
        case "level1":
          return "Level 1";
        case "new":
          return "New";
        default:
          return "-";
      }
    };

    return (
      <article
        className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"
        role="region"
        aria-labelledby="provider-name"
      >
        {/* Header Section */}
        <div className="flex items-start gap-4">
          {/* Avatar with Online Indicator */}
          <div className="relative">
            <Avatar className="h-14 w-14 ring-2 ring-white dark:ring-gray-800 shadow-sm">
              <AvatarImage
                src={provider.avatar}
                alt={`${provider.name}'s profile picture`}
              />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                {getInitials(provider.name)}
              </AvatarFallback>
            </Avatar>
            {/* Online Indicator (mocked for now as per design) */}
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
          </div>

          {/* Provider Info */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2
                id="provider-name"
                className="text-lg font-bold text-gray-900 dark:text-white truncate"
              >
                {provider.name}
              </h2>
              {provider.verified && (
                <Shield
                  className="h-4 w-4 text-blue-500 fill-blue-500"
                  aria-label="Verified provider"
                />
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1.5">
              {provider.title || "Service Provider"}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              <span>{provider.country || "Remote"}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Level Box */}
          <div className="bg-[#FDF4FF] dark:bg-purple-900/10 rounded-xl p-3 text-center space-y-1">
            <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              {getLevelCaption(provider.level)}
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {getLevelValue(provider.level)}
            </p>
          </div>

          {/* Rating Box */}
          <div className="bg-[#FFFBEB] dark:bg-yellow-900/10 rounded-xl p-3 text-center space-y-1">
            <p className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
              RATING
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {provider.rating?.toFixed(1)} ({provider.reviewsCount})
            </p>
          </div>
        </div>

        {/* View Profile Button */}
        <Button
          asChild
          variant="outline"
          className="w-full h-11 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 rounded-xl font-medium transition-all"
        >
          <Link href={`/client/providers/${provider.id}`}>
            <User className="mr-2 h-4 w-4" />
            View Full Profile
          </Link>
        </Button>
      </article>
    );
  },
);

SingleViewProviderCard.displayName = "SingleViewProviderCard";
