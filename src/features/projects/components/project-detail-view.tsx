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
  AlertCircle,
  Wallet,
  Layers,
  CheckCircle2,
  XCircle,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MyProject,
  projectStatusConfig,
  formatDate,
  getDeliveryDaysLabel,
  getExperienceLevelLabel,
  getBudgetDisplay,
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
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
              {statusInfo.label}
            </span>
            <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 uppercase tracking-wider shadow-sm">
              {project.category.name}
            </span>
            {project.upgrades.map((upgrade) => (
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
            {project.name}
          </h1>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Created: {formatDate(project.createdAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Updated: {formatDate(project.updatedAt)}
            </div>
          </div>
        </div>

        {/* Action Buttons - Only show for owners */}
        {isOwner && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onShare}
              className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDuplicate}
              className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onEdit}
              className="px-6 py-2 border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              className="px-6 py-2 bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 border-none"
            >
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
            Your project is active and receiving bids from freelancers. Review
            bids and hire the best talent for your project.
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
            This project has been cancelled. It is no longer accepting bids from
            freelancers.
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

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="line" className="w-full">
          <TabsTrigger value="overview" variant="line">
            Overview
          </TabsTrigger>
          <TabsTrigger value="bids" variant="line" className="gap-2">
            Bids{" "}
            <span className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] border border-zinc-200 dark:border-zinc-800">
              {project.biddersCount}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProjectDetailLayout
            leftColumn={
              <div className="space-y-8">
                {/* Project Parameters */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Project Parameters
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Clock className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-semibold">
                        {getDeliveryDaysLabel(project.deliveryDays)}
                      </p>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Sparkles className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Expertise
                      </p>
                      <p className="text-sm font-semibold">
                        {getExperienceLevelLabel(project.experienceLevel)}
                      </p>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Wallet className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Budget Type
                      </p>
                      <p className="text-sm font-semibold capitalize">
                        {project.paymentType} Price
                      </p>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Layers className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Category
                      </p>
                      <p className="text-sm font-semibold">
                        {project.category.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Project Description
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                    {project.description}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Features */}
                {project.upgrades.length > 0 && (
                  <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                      <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                      Promoted Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.upgrades.map((upgrade) => (
                        <div
                          key={upgrade.id}
                          className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                            {upgrade.slug === "featured" && (
                              <Sparkles className="h-6 w-6 text-amber-500" />
                            )}
                            {upgrade.slug === "urgent" && (
                              <Clock className="h-6 w-6 text-rose-500" />
                            )}
                            {upgrade.slug === "nda" && (
                              <FileCheck className="h-6 w-6 text-blue-500" />
                            )}
                            {!["featured", "urgent", "nda"].includes(
                              upgrade.slug,
                            ) && <Sparkles className="h-6 w-6 text-zinc-400" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1 uppercase tracking-tight">
                              {upgrade.name}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {getUpgradeDescription(upgrade.slug)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments Section - Placeholder for now as data doesn't have it */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Attachments
                  </h3>
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-500 italic">
                      No attachments provided.
                    </p>
                  </div>
                </div>
              </div>
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
