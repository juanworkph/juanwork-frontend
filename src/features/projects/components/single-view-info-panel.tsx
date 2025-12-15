"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  Calendar,
  Clock,
  Briefcase,
  FileText,
  Download,
  Users,
  TrendingUp,
  Award,
} from "lucide-react"
import {
  ProjectDetails,
  formatCurrency,
} from "../schema"

interface SingleViewInfoPanelProps {
  project: ProjectDetails
}

export const SingleViewInfoPanel: React.FC<SingleViewInfoPanelProps> = ({
  project,
}) => {
  const formatDate = React.useCallback((dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }, [])

  const formatFileSize = React.useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }, [])

  const calculateDuration = React.useCallback((): string => {
    if (project.duration) {
      return project.duration
    }
    
    const start = new Date(project.deadline.startDate)
    const end = new Date(project.deadline.endDate)
    const diffMs = end.getTime() - start.getTime()
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (days < 7) {
      return `${days} day${days !== 1 ? "s" : ""}`
    } else if (days < 30) {
      const weeks = Math.floor(days / 7)
      return `${weeks} week${weeks !== 1 ? "s" : ""}`
    } else {
      const months = Math.floor(days / 30)
      return `${months} month${months !== 1 ? "s" : ""}`
    }
  }, [project.deadline.startDate, project.deadline.endDate, project.duration])

  const getBudgetDisplay = React.useCallback((): {
    label: string
    value: string
    subtitle?: string
  } => {
    if (project.budget.type === "fixed") {
      return {
        label: "Fixed Price",
        value: formatCurrency(project.budget.amount, project.budget.currency),
      }
    } else {
      const hourlyRate = project.budget.hourlyRate || project.budget.amount
      const estimatedHours = project.budget.estimatedHours || 0
      const estimatedTotal = hourlyRate * estimatedHours
      
      return {
        label: "Hourly Rate",
        value: `${formatCurrency(hourlyRate, project.budget.currency)}/hr`,
        subtitle: estimatedHours > 0 
          ? `Est. ${estimatedHours} hrs (${formatCurrency(estimatedTotal, project.budget.currency)} total)`
          : undefined,
      }
    }
  }, [project.budget])

  const budgetInfo = getBudgetDisplay()

  const getExperienceLevelLabel = (level?: string): string => {
    if (!level) return "Not specified"
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  const getProposalInfo = (): {
    message: string
    competitionLevel: "none" | "low" | "moderate" | "high"
    colorClass: string
    showBidRange: boolean
  } => {
    const count = project.proposalStats?.totalProposals || 0
    
    if (count === 0) {
      return {
        message: "Be the first to submit a proposal!",
        competitionLevel: "none",
        colorClass: "text-green-600 dark:text-green-400",
        showBidRange: false,
      }
    } else if (count >= 20) {
      return {
        message: `${count} proposals submitted`,
        competitionLevel: "high",
        colorClass: "text-red-600 dark:text-red-400",
        showBidRange: true,
      }
    } else if (count >= 10) {
      return {
        message: `${count} proposals submitted`,
        competitionLevel: "moderate",
        colorClass: "text-orange-600 dark:text-orange-400",
        showBidRange: true,
      }
    } else {
      return {
        message: `${count} proposal${count !== 1 ? "s" : ""} submitted`,
        competitionLevel: "low",
        colorClass: "text-blue-600 dark:text-blue-400",
        showBidRange: count >= 5,
      }
    }
  }

  const proposalInfo = getProposalInfo()

  const getCompetitionBadge = () => {
    const { competitionLevel } = proposalInfo
    
    if (competitionLevel === "none") return null
    
    const badgeConfig = {
      low: {
        label: "Low Competition",
        className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      },
      moderate: {
        label: "Moderate Competition",
        className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      },
      high: {
        label: "High Competition",
        className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
    }
    
    const config = badgeConfig[competitionLevel as keyof typeof badgeConfig]
    if (!config) return null
    
    return (
      <Badge variant="outline" className={`${config.className} border-0 text-xs sm:text-sm`}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Project Description */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground text-base sm:text-lg">Project Description</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </CardContent>
      </Card>

      {/* Budget Information */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
            Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {budgetInfo.value}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {budgetInfo.label}
              </span>
            </div>
            {budgetInfo.subtitle && (
              <p className="text-xs sm:text-sm text-muted-foreground">
                {budgetInfo.subtitle}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline & Duration */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Posted</span>
              </div>
              <p className="text-sm sm:text-base text-foreground font-medium">
                {formatDate(project.createdAt)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Deadline</span>
              </div>
              <p className="text-sm sm:text-base text-foreground font-medium">
                {formatDate(project.deadline.endDate)}
              </p>
            </div>
            <div className="xs:col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Duration</span>
              </div>
              <p className="text-sm sm:text-base text-foreground font-medium">
                {calculateDuration()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Required */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <Award className="h-4 w-4 sm:h-5 sm:w-5" />
            Skills Required
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border bg-accent/50 text-accent-foreground text-xs sm:text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Experience Level</p>
              <p className="text-sm sm:text-base text-foreground font-medium">
                {getExperienceLevelLabel(project.experienceLevel)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Project Type</p>
              <p className="text-sm sm:text-base text-foreground font-medium">
                {project.budget.type === "fixed" ? "Fixed Price" : "Hourly"}
              </p>
            </div>
            <div className="xs:col-span-2">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <p className="text-xs sm:text-sm text-muted-foreground">Proposals</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm sm:text-base font-semibold ${proposalInfo.colorClass}`}>
                    {proposalInfo.message}
                  </p>
                  {getCompetitionBadge()}
                </div>
                
                {project.proposalStats && project.proposalStats.totalProposals > 0 && (
                  <div className="space-y-1.5">
                    {project.proposalStats.averageBid > 0 && (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Average bid: <span className="font-medium text-foreground">
                            {project.budget.type === "hourly" 
                              ? `${formatCurrency(project.proposalStats.averageBid, project.budget.currency)}/hr`
                              : formatCurrency(project.proposalStats.averageBid, project.budget.currency)
                            }
                          </span>
                        </p>
                      </div>
                    )}
                    
                    {proposalInfo.showBidRange && project.proposalStats.lowestBid > 0 && project.proposalStats.highestBid > 0 && (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Bid range: <span className="font-medium text-foreground">
                            {project.budget.type === "hourly"
                              ? `${formatCurrency(project.proposalStats.lowestBid, project.budget.currency)}/hr - ${formatCurrency(project.proposalStats.highestBid, project.budget.currency)}/hr`
                              : `${formatCurrency(project.proposalStats.lowestBid, project.budget.currency)} - ${formatCurrency(project.proposalStats.highestBid, project.budget.currency)}`
                            }
                          </span>
                        </p>
                      </div>
                    )}
                    
                    {project.proposalStats.averageDeliveryTime > 0 && (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Avg. delivery: <span className="font-medium text-foreground">
                            {project.proposalStats.averageDeliveryTime} days
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card className="border shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            Attachments {project.attachments && project.attachments.length > 0 && `(${project.attachments.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {project.attachments && project.attachments.length > 0 ? (
            <div className="space-y-2">
              {project.attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  download={attachment.name}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors group"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                  </div>
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-accent-foreground shrink-0 ml-2" />
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                No attachments provided for this project
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
