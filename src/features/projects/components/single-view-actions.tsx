"use client";

import { Bookmark, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SingleViewActionsProps {
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onReport: () => void;
  isBookmarkLoading?: boolean;
}

export const SingleViewActions = ({
  isBookmarked,
  onBookmark,
  onShare,
  onReport,
  isBookmarkLoading = false,
}: SingleViewActionsProps) => {
  return (
    <>
      {/* Mobile: Horizontal button group */}
      <Card className="lg:hidden">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={onBookmark}
              disabled={isBookmarkLoading}
              className="flex-1"
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark project"}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              <span className="ml-2">{isBookmarked ? "Saved" : "Save"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="flex-1"
              aria-label="Share project"
            >
              <Share2 className="h-4 w-4" />
              <span className="ml-2">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReport}
              className="flex-1"
              aria-label="Report project"
            >
              <Flag className="h-4 w-4" />
              <span className="ml-2">Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desktop: Vertical stack in sidebar */}
      <Card className="hidden lg:block">
        <CardContent className="p-4 space-y-2">
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="sm"
            onClick={onBookmark}
            disabled={isBookmarkLoading}
            className="w-full justify-start"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark project"}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
            <span className="ml-2">{isBookmarked ? "Saved" : "Save Project"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="w-full justify-start"
            aria-label="Share project"
          >
            <Share2 className="h-4 w-4" />
            <span className="ml-2">Share Project</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReport}
            className="w-full justify-start"
            aria-label="Report project"
          >
            <Flag className="h-4 w-4" />
            <span className="ml-2">Report Project</span>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
