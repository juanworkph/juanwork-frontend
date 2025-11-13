"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Package,
  Clock,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import type { ServiceDetailsData } from "../schema/service-details-data";

interface ServiceOverviewProps {
  service: ServiceDetailsData;
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Service Title with Badges */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Service badges">
          {service.isTopRated && (
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0" aria-label="Top rated service">
              <Award className="h-3 w-3 mr-1 fill-white" aria-hidden="true" />
              Top Rated
            </Badge>
          )}
          {service.isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0" aria-label="Featured service">
              <Star className="h-3 w-3 mr-1 fill-white" aria-hidden="true" />
              Featured
            </Badge>
          )}
        </div>

        <h1 id="service-overview-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {service.serviceName}
        </h1>
      </div>

      {/* Category Badge */}
      <div>
        <Badge variant="secondary" className="text-sm" aria-label={`Category: ${service.category}`}>
          <Package className="h-4 w-4 mr-1.5" aria-hidden="true" />
          {service.category}
        </Badge>
      </div>

      {/* Service Stats */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-sm" role="list" aria-label="Service statistics">
        {/* Rating */}
        <div className="flex items-center gap-2" role="listitem">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <span className="font-semibold text-gray-900 dark:text-white" aria-label={`Rating: ${service.rating} out of 5`}>
            {service.rating}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            ({service.reviewsCount} {service.reviewsCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        {/* Total Orders */}
        <div className="flex items-center gap-2" role="listitem">
          <ShoppingCart className="h-5 w-5 text-purple-500 dark:text-purple-400" aria-hidden="true" />
          <span className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{service.totalOrders}</span> {service.totalOrders === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-2" role="listitem">
          <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
          <span className="text-gray-700 dark:text-gray-300">
            Delivery in{" "}
            <span className="font-semibold">
              {getDeliveryTimeLabel(service.deliveryTime)}
            </span>
          </span>
        </div>

        {/* Revisions */}
        <div className="flex items-center gap-2" role="listitem">
          <RefreshCw className="h-5 w-5 text-green-500 dark:text-green-400" aria-hidden="true" />
          <span className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{service.revisions}</span>{" "}
            {service.revisions === 1 ? "revision" : "revisions"}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          About This Service
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {service.longDescription}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Skills & Expertise
        </h3>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Service skills">
          {service.skills.map((skill) => (
            <span
              key={skill}
              role="listitem"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to format delivery time
function getDeliveryTimeLabel(deliveryTime: string): string {
  const timeMap: Record<string, string> = {
    "1-day": "1 day",
    "2-days": "2 days",
    "3-days": "3 days",
    "1-week": "1 week",
    "2-weeks": "2 weeks",
    "3-weeks": "3 weeks",
    "1-month": "1 month",
    "2-months": "2 months",
    "3-months": "3 months",
  };

  return timeMap[deliveryTime] || deliveryTime;
}
