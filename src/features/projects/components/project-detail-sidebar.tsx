import React from "react";
import { TimeRemainingCard, TimeRemainingCardSkeleton } from "./time-remaining-card";
import { QuickActionsCard } from "./quick-actions-card";
import { SocialSharingCard } from "./social-sharing-card";
import { ProjectInsightsCard, ProjectInsightsCardSkeleton } from "./project-insights-card";
import { BudgetRangeCard } from "./budget-range-card";
import { ErrorState } from "./error-state";
import { ProjectInsights, TimeRemaining } from "../schema/project-detail-data";

interface ProjectDetailSidebarProps {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  paymentType: "fixed" | "hourly";
  budgetMin: number;
  budgetMax: number;
  currency: string;
  timeRemaining: TimeRemaining | null;
  insights: ProjectInsights | null;
  isLoadingInsights?: boolean;
  insightsError?: string | null;
  isOwner: boolean; // NEW: Indicates if current user owns the project
  onCloseBids?: () => void;
  onShare?: () => void;
  onRetryInsights?: () => void;
}

/**
 * ProjectDetailSidebar Component
 *
 * Reusable sidebar component for project detail page.
 * Displays time remaining, quick actions, social sharing, insights, and budget.
 * Handles loading and error states for insights.
 */
export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({
  projectId,
  projectName,
  projectDescription,
  projectStatus,
  paymentType,
  budgetMin,
  budgetMax,
  currency,
  timeRemaining,
  insights,
  isLoadingInsights = false,
  insightsError = null,
  isOwner, // NEW
  onCloseBids,
  onShare,
  onRetryInsights,
}) => {
  return (
    <>
      {/* Time Remaining Card - Only show for owners */}
      {isOwner && timeRemaining ? (
        <TimeRemainingCard
          endDate={timeRemaining.endDate}
          status={projectStatus}
          onCloseBids={onCloseBids}
        />
      ) : isOwner ? (
        <TimeRemainingCardSkeleton />
      ) : null}

      {/* Quick Actions - Only show for owners */}
      {isOwner && (
        <QuickActionsCard
          onShareProject={onShare}
          onDownloadReport={() => {
            // TODO: Implement download report functionality
            console.log("Download report clicked");
          }}
          onPreviewAsFreelancer={() => {
            // TODO: Implement preview as freelancer functionality
            console.log("Preview as freelancer clicked");
          }}
        />
      )}

      {/* Social Sharing Card */}
      <SocialSharingCard
        projectId={projectId}
        projectTitle={projectName}
        projectDescription={projectDescription}
      />

      {/* Project Insights Card */}
      {insightsError ? (
        <ErrorState
          title="Failed to Load Insights"
          message={insightsError}
          onRetry={onRetryInsights}
        />
      ) : isLoadingInsights ? (
        <ProjectInsightsCardSkeleton />
      ) : insights ? (
        <ProjectInsightsCard insights={insights} currency={currency} />
      ) : null}

      {/* Budget Range Card */}
      <BudgetRangeCard
        paymentType={paymentType}
        budgetMin={budgetMin}
        budgetMax={budgetMax}
        currency={currency}
      />
    </>
  );
};
