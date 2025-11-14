"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Calendar,
} from "lucide-react"
import { toast } from "sonner"
import { useBookmark } from "@/hooks/use-bookmark"
import {
  ProjectDetails,
  getStatusColor,
  getPriorityColor,
} from "../schema"

interface SingleViewHeaderProps {
  project: ProjectDetails
}

export const SingleViewHeader: React.FC<SingleViewHeaderProps> = ({
  project,
}) => {
  const router = useRouter()
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark(project.id)

  const handleBack = React.useCallback(() => {
    router.push("/freelancer/findwork")
  }, [router])

  const handleShare = React.useCallback(async () => {
    const projectUrl = `${window.location.origin}/freelancer/projects/${project.id}`

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(projectUrl)
        toast.success("Project link copied to clipboard")
      } else {
        // Fallback for browsers without Clipboard API support
        const textArea = document.createElement("textarea")
        textArea.value = projectUrl
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand("copy")
          toast.success("Project link copied to clipboard")
        } catch (err) {
          toast.error("Failed to copy link. Please copy manually: " + projectUrl)
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast.error("Failed to copy link to clipboard")
    }
  }, [project.id])

  const handleBookmark = React.useCallback(async () => {
    await toggleBookmark()
  }, [toggleBookmark])

  const formatPostedDate = React.useCallback((dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }
  }, [])

  const getTimeRemaining = React.useCallback((endDate: string): string => {
    const now = new Date()
    const end = new Date(endDate)
    const diffMs = end.getTime() - now.getTime()

    if (diffMs <= 0) {
      return "Expired"
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} remaining`
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} remaining`
    } else {
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${minutes} minute${minutes !== 1 ? "s" : ""} remaining`
    }
  }, [])

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4 sm:p-6">
        {/* Back Button */}
        <div className="mb-3 sm:mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-accent hover:text-accent-foreground -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Back to Find Work</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Title and Action Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                {project.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <Badge variant="outline" className="border text-xs sm:text-sm">
                  {project.category}
                </Badge>
                <Badge className={`${getStatusColor(project.status)} border text-xs sm:text-sm`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${getPriorityColor(project.priority)} border text-xs sm:text-sm`}
                >
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Action Buttons - Mobile optimized with icon-only on small screens */}
            <div className="flex items-center gap-2 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                disabled={isLoading}
                className={`border hover:bg-accent hover:text-accent-foreground flex-1 sm:flex-initial ${
                  isBookmarked ? "bg-accent text-accent-foreground" : ""
                }`}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark project"}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
                <span className="hidden md:inline ml-2">
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border hover:bg-accent hover:text-accent-foreground flex-1 sm:flex-initial"
                aria-label="Share project"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Share</span>
              </Button>
            </div>
          </div>

          {/* Posted Date and Time Remaining */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Posted {formatPostedDate(project.createdAt)}</span>
            </div>
            <span className="text-muted-foreground/50 hidden xs:inline">•</span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{getTimeRemaining(project.deadline.endDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
