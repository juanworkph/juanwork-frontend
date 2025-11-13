"use client";

import React, { memo } from "react";
import { Bookmark, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ServiceActionsProps {
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onReport: () => void;
}

export const ServiceActions = memo(({
  isBookmarked,
  onBookmark,
  onShare,
  onReport,
}: ServiceActionsProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700" aria-labelledby="service-actions-heading">
      <h3 id="service-actions-heading" className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
        Actions
      </h3>
      <div className="flex gap-2 sm:gap-3" role="group" aria-label="Service actions">
        {/* Bookmark Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="default"
              onClick={onBookmark}
              className={`flex-1 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2 ${
                isBookmarked
                  ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                  : ""
              }`}
              aria-label={
                isBookmarked ? "Remove bookmark from this service" : "Bookmark this service for later"
              }
              aria-pressed={isBookmarked}
            >
              <Bookmark
                className={`size-3 sm:size-4 transition-all ${
                  isBookmarked ? "fill-current" : ""
                }`}
                aria-hidden="true"
              />
              <span className="hidden sm:inline text-sm">
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isBookmarked
                ? "Remove from bookmarks"
                : "Save this service for later"}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Share Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="default"
              onClick={onShare}
              className="flex-1 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
              aria-label="Share this service with others"
            >
              <Share2 className="size-3 sm:size-4" aria-hidden="true" />
              <span className="hidden sm:inline text-sm">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this service with others</p>
          </TooltipContent>
        </Tooltip>

        {/* Report Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="default"
              onClick={onReport}
              className="flex-1 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
              aria-label="Report inappropriate content"
            >
              <Flag className="size-3 sm:size-4" aria-hidden="true" />
              <span className="hidden sm:inline text-sm">Report</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Report inappropriate content</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
});

ServiceActions.displayName = "ServiceActions";
