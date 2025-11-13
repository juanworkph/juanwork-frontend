"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";

interface ServiceFeaturesProps {
  deliveryTime: string;
  revisions: number;
  features?: string[];
}

export function ServiceFeatures({
  deliveryTime,
  revisions,
  features = [],
}: ServiceFeaturesProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700" role="region" aria-labelledby="service-features-heading">
      <CardHeader>
        <CardTitle id="service-features-heading" className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          What's Included
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Delivery & Revisions Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg" role="list" aria-label="Service summary">
          <div className="flex items-center gap-3" role="listitem">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg" aria-hidden="true">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Delivery Time
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {getDeliveryTimeLabel(deliveryTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3" role="listitem">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg" aria-hidden="true">
              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Revisions
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {revisions} {revisions === 1 ? "revision" : "revisions"}
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        {features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
              Features & Deliverables
            </h3>
            <ul className="space-y-2 sm:space-y-3" role="list" aria-label="Service features">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-gray-700 dark:text-gray-300"
                  role="listitem"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Revision Policy */}
        <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30" role="note" aria-label="Revision policy">
          <h4 className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Revision Policy
          </h4>
          <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
            This service includes {revisions}{" "}
            {revisions === 1 ? "revision" : "revisions"}. Additional revisions
            may be available upon request and may incur extra charges.
          </p>
        </div>
      </CardContent>
    </Card>
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
