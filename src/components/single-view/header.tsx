"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Copy,
  Share2,
  Calendar,
  History,
  Bookmark,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/features/services/schema/my-services-data";
import type { ServiceUpgrade } from "@/features/services/schema/discover-services-data";

interface SingleViewHeaderProps {
  serviceName: string;
  status:
    | "pending"
    | "declined"
    | "draft"
    | "active"
    | "paused"
    | "completed"
    | "cancelled";
  category: { id: string; name: string };
  upgrades: ServiceUpgrade[];
  createdAt: string;
  updatedAt: string;
  userType?: "freelancer" | "client"; // Deprecated for action logic
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  // Client-specific actions
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onReport?: () => void;
}

const statusConfig = {
  active: { label: "Active", color: "green" },
  pending: { label: "Pending", color: "yellow" },
  declined: { label: "Declined", color: "red" },
  draft: { label: "Draft", color: "gray" },
  paused: { label: "Paused", color: "gray" },
  completed: { label: "Completed", color: "blue" },
  cancelled: { label: "Cancelled", color: "red" },
};

export const SingleViewHeader = ({
  serviceName,
  status,
  category,
  upgrades,
  createdAt,
  updatedAt,
  userType,
  isOwner = false, // Default to false (viewer mode)
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  isBookmarked,
  onBookmark,
  onReport,
}: SingleViewHeaderProps) => {
  const statusInfo = statusConfig[status];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            {statusInfo.label}
          </span>
          <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 uppercase tracking-wider shadow-sm">
            {category.name}
          </span>
          {upgrades.map((upgrade) => (
            <span
              key={upgrade.id}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider",
                upgrade.slug === "featured"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  : upgrade.slug === "urgent"
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
              )}
            >
              {upgrade.name}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {serviceName}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Created: {formatDate(new Date(createdAt))}
          </span>
          <span className="flex items-center gap-1.5">
            <History className="h-4 w-4" />
            Updated: {formatDate(new Date(updatedAt))}
          </span>
        </div>
      </div>

      {/* Action Buttons - Different for freelancer vs client */}
      {/* Action Buttons - Different for freelancer vs client */}
      {/* Action Buttons - Owner vs Viewer */}
      {isOwner ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={onDuplicate}
            className="flex items-center gap-2 px-4 py-2 border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 sm:h-10"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            onClick={onEdit}
            className="px-6 py-2 border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 sm:h-10"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            className="px-6 py-2 bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 border-none h-9 sm:h-10"
          >
            Delete
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Share service"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onBookmark}
            className={`border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10 ${
              isBookmarked ? "bg-primary/10 text-primary" : ""
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark service"}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onReport}
            className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Report service"
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
