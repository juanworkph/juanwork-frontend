"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  User,
  ExternalLink,
} from "lucide-react";
import type { ServiceProvider } from "../schema/discover-services-data";

interface SingleViewProviderCardProps {
  provider: ServiceProvider;
}

export const SingleViewProviderCard = memo(({ provider }: SingleViewProviderCardProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get level badge styling
  const getLevelBadgeStyle = (
    level: "entry" | "intermediate" | "expert"
  ): string => {
    switch (level) {
      case "expert":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0";
      case "intermediate":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "entry":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0";
      default:
        return "";
    }
  };

  // Get level label
  const getLevelLabel = (level: "entry" | "intermediate" | "expert"): string => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Get country flag emoji
  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-6" role="region" aria-labelledby="provider-name">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-2 ring-gray-100 dark:ring-gray-700">
          <AvatarImage
            src={provider.avatar}
            alt={`${provider.name}'s profile picture`}
          />
          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-base sm:text-lg font-semibold">
            {getInitials(provider.name)}
          </AvatarFallback>
        </Avatar>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          {/* Name with Verification Badge */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 id="provider-name" className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {provider.name}
            </h2>
            {provider.verified && (
              <Shield
                className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400 flex-shrink-0"
                aria-label="Verified provider"
                role="img"
              />
            )}
          </div>

          {/* Title */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            {provider.title}
          </p>

          {/* Country */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            <span className="mr-1" role="img" aria-label={`Country: ${provider.country}`}>{getCountryFlag(provider.countryCode)}</span>
            <span>{provider.country}</span>
          </div>
        </div>
      </div>

      {/* Level Badge */}
      <div>
        <Badge className={getLevelBadgeStyle(provider.level)} aria-label={`Provider level: ${getLevelLabel(provider.level)}`}>
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
          {getLevelLabel(provider.level)} Level
        </Badge>
      </div>

      {/* Stats */}
      <div className="space-y-3" role="list" aria-label="Provider statistics">
        {/* Rating */}
        <div className="flex items-center justify-between" role="listitem">
          <div className="flex items-center gap-2" aria-label={`Rating: ${provider.rating.toFixed(1)} out of 5 stars`}>
            <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {provider.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {provider.reviewsCount} {provider.reviewsCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between" role="listitem">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm">Response time</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
            {provider.responseTime}
          </span>
        </div>
      </div>

      {/* View Profile Button */}
      <Button
        asChild
        variant="outline"
        className="w-full group hover:bg-orange-50 dark:hover:bg-orange-950 hover:border-orange-500 dark:hover:border-orange-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
      >
        <Link
          href={`/client/providers/${provider.id}`}
          className="flex items-center justify-center gap-2"
          aria-label={`View ${provider.name}'s full profile`}
        >
          <User className="h-4 w-4" aria-hidden="true" />
          View Profile
          <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        </Link>
      </Button>
    </article>
  );
});

SingleViewProviderCard.displayName = "SingleViewProviderCard";
