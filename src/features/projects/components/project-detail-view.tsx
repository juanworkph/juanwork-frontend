import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Users,
  FileCheck,
  XCircle,
  CheckCircle2,
  Layers,
  AlertCircle,
} from "lucide-react";
import {
  MyProject,
  projectStatusConfig,
  formatDate,
  getDeliveryDaysLabel,
  getExperienceLevelLabel,
} from "../schema/my-projects-data";
import {
  FreelancerBid,
  ProjectInsights,
  TimeRemaining,
} from "../schema/project-detail-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RequiredSkills } from "./required-skills";
import { ProjectDetailLayout } from "./project-detail-layout";
import { FreelancerBidsSection } from "./freelancer-bids-section";
import { ProjectDetailSidebar } from "./project-detail-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDetailViewProps {
  project: MyProject;
  bids: FreelancerBid[];
  insights: ProjectInsights | null;
  timeRemaining: TimeRemaining | null;
  isLoadingBids?: boolean;
  isLoadingInsights?: boolean;
  bidsError?: string | null;
  insightsError?: string | null;
  isOwner: boolean; // NEW: Indicates if current user owns the project
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  onCloseBids?: () => void;
  onMessageFreelancer?: (freelancerId: string) => void;
  onViewProfile?: (freelancerId: string) => void;
  onShortlist?: (bidId: string) => void;
  onInterview?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
  onReport?: (bidId: string) => void;
  onRetryBids?: () => void; // NEW: Retry fetching bids
  onRetryInsights?: () => void; // NEW: Retry fetching insights
}

export function ProjectDetailView({
  project,
  bids,
  insights,
  timeRemaining,
  isLoadingBids = false,
  isLoadingInsights = false,
  bidsError = null,
  insightsError = null,
  isOwner, // NEW
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  onCloseBids,
  onMessageFreelancer,
  onViewProfile,
  onShortlist,
  onInterview,
  onReject,
  onReport,
  onRetryBids, // NEW
  onRetryInsights, // NEW
}: ProjectDetailViewProps) {
  const statusInfo = projectStatusConfig[project.status];

  /**
   * Handle retry for bids loading
   */
  const handleRetryBids = () => {
    if (onRetryBids) {
      onRetryBids();
    } else {
      // Fallback to page reload
      window.location.reload();
    }
  };

  /**
   * Handle retry for insights loading
   */
  const handleRetryInsights = () => {
    if (onRetryInsights) {
      onRetryInsights();
    } else {
      // Fallback to page reload
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge className={statusInfo.color}>
              <span className="mr-1">{statusInfo.icon}</span>
              {statusInfo.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              {project.category.name}
            </Badge>
            {project.upgrades.length > 0 && (
              <div className="flex gap-1">
                {project.upgrades.map((upgrade) => (
                  <Badge
                    key={upgrade.id}
                    variant="secondary"
                    className="text-xs bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                  >
                    {upgrade.name.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatDate(project.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Only show for owners */}
        {isOwner && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="border-[#F45A0B] text-[#F45A0B] hover:bg-[#F45A0B]/10"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}

        {/* View-only indicator for non-owners */}
        {!isOwner && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <AlertCircle className="h-4 w-4" />
            <span>View-only mode</span>
          </div>
        )}
      </div>

      {/* Status Alerts */}
      {project.status === "active" && (
        <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Your project is active and receiving bids from freelancers.
            Review bids and hire the best talent for your project.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "completed" && (
        <Alert className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
          <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <AlertDescription className="text-purple-800 dark:text-purple-200">
            This project has been completed successfully! Don't forget to leave
            a review for the freelancer(s) you worked with.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "cancelled" && (
        <Alert className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10">
          <XCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <AlertDescription className="text-gray-800 dark:text-gray-200">
            This project has been cancelled. It is no longer accepting bids
            from freelancers.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "draft" && (
        <Alert className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            This project is saved as a draft. Complete and publish it to start
            receiving bids from freelancers.
          </AlertDescription>
        </Alert>
      )}

      {project.biddersCount > 0 && (
        <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <span className="font-semibold">
              {project.biddersCount} freelancer
              {project.biddersCount > 1 ? "s" : ""}
            </span>{" "}
            have bid on this project. Review bids and hire the best talent.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bids">
            Bids ({project.biddersCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProjectDetailLayout
            leftColumn={
              <>
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#F45A0B]">
                      Project Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <RequiredSkills skills={project.skills} />

                {/* Project Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Project Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Delivery Days
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {getDeliveryDaysLabel(project.deliveryDays)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Experience Level
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {getExperienceLevelLabel(project.experienceLevel)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Payment Type
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {project.paymentType === "fixed"
                            ? "Fixed Price"
                            : "Hourly Rate"}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Category
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {project.category.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Upgrades */}
                {project.upgrades.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Project Upgrades
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {project.upgrades.map((upgrade) => (
                          <div
                            key={upgrade.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#F45A0B]/10 flex items-center justify-center flex-shrink-0">
                              <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white uppercase">
                                {upgrade.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {getUpgradeDescription(upgrade.slug)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            }
            rightColumn={
              <ProjectDetailSidebar
                projectId={project.id}
                projectName={project.name}
                projectDescription={project.description}
                projectStatus={project.status}
                paymentType={project.paymentType}
                budgetMin={project.budgetMin}
                budgetMax={project.budgetMax}
                currency={project.currency}
                timeRemaining={timeRemaining}
                insights={insights}
                isLoadingInsights={isLoadingInsights}
                insightsError={insightsError}
                isOwner={isOwner}
                onCloseBids={onCloseBids}
                onShare={onShare}
                onRetryInsights={handleRetryInsights}
              />
            }
          />
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <ProjectDetailLayout
            leftColumn={
              <FreelancerBidsSection
                bids={bids}
                isLoading={isLoadingBids}
                error={bidsError}
                isOwner={isOwner}
                onMessageFreelancer={onMessageFreelancer}
                onViewProfile={onViewProfile}
                onShortlist={onShortlist}
                onInterview={onInterview}
                onReject={onReject}
                onReport={onReport}
                onRetry={handleRetryBids}
              />
            }
            rightColumn={
              <ProjectDetailSidebar
                projectId={project.id}
                projectName={project.name}
                projectDescription={project.description}
                projectStatus={project.status}
                paymentType={project.paymentType}
                budgetMin={project.budgetMin}
                budgetMax={project.budgetMax}
                currency={project.currency}
                timeRemaining={timeRemaining}
                insights={insights}
                isLoadingInsights={isLoadingInsights}
                insightsError={insightsError}
                isOwner={isOwner}
                onCloseBids={onCloseBids}
                onShare={onShare}
                onRetryInsights={handleRetryInsights}
              />
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to get upgrade descriptions
function getUpgradeDescription(upgrade: string): string {
  const descriptions: Record<string, string> = {
    featured:
      "Premium placement in Featured Projects section for maximum visibility",
    urgent: "Priority listing showing immediate hiring need",
    nda: "Non-disclosure Agreement requirement for confidentiality",
    sealed: "Private budget details until freelancer selection",
    "ip-agreement": "Intellectual Property rights transfer included",
  };
  return descriptions[upgrade] || "Premium project upgrade";
}
