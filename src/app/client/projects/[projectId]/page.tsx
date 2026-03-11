"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  X,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SingleViewHeader,
  SingleViewParameters,
  SingleViewDescription,
  SingleViewSkills,
  SingleViewAttachments,
  SingleViewUpgrades,
  SingleViewInsights,
  SingleViewPricingCard,
  SingleViewStatusAlert,
} from "@/components/single-view";
import { SingleViewBidsSection } from "@/features/projects/components";
import { AccessDenied } from "@/features/projects/components/access-denied";
import { NetworkStatusIndicator } from "@/features/projects/components/network-status-indicator";
import { ErrorRetryCard } from "@/features/projects/components/error-retry-card";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import {
  FreelancerBid,
  ProjectInsights,
  TimeRemaining,
  calculateTimeRemaining,
  getMockEndDateForProject,
} from "@/features/projects/schema/project-detail-data";
import {
  getProjectById,
  getProjectBids,
  getProjectInsights,
  closeProjectBids,
  shortlistBid,
  acceptBid,
  rejectBid,
} from "@/features/projects/actions/project-detail.actions";
import { addConnectionListeners } from "@/lib/network-utils";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { user, isLoading: isAuthLoading } = useAuth();

  // State for project data
  const [project, setProject] = useState<any | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [hasCheckedOwnership, setHasCheckedOwnership] =
    useState<boolean>(false);

  // State for new data
  const [bids, setBids] = useState<FreelancerBid[]>([]);
  const [insights, setInsights] = useState<ProjectInsights | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null,
  );
  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [bidsError, setBidsError] = useState<string | null>(null);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // State for connection tracking and retry logic
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  // Refs for AbortControllers to cancel requests on unmount
  const projectAbortController = useRef<AbortController | null>(null);
  const bidsAbortController = useRef<AbortController | null>(null);
  const insightsAbortController = useRef<AbortController | null>(null);
  const pollingAbortController = useRef<AbortController | null>(null);
  const pollingIntervalRef = useRef<any>(null);

  // Note: Confirmation dialogs are handled by child components (TimeRemainingCard and BidCard)
  // No need for page-level dialog state

  // Handlers - Memoized with useCallback for stable references (MUST be before any conditional returns)
  const handleEdit = useCallback(() => {
    toast.info(`Edit functionality for project ${resolvedParams.projectId}`);
    // In a real app, navigate to edit page
    // router.push(`/client/projects/edit/${resolvedParams.projectId}`);
  }, [resolvedParams.projectId]);

  const handleDelete = useCallback(() => {
    toast.error("Delete functionality not implemented yet");
    // In a real app, show confirmation dialog and delete
    // After successful deletion:
    // router.push("/client/projects/my-projects");
  }, []);

  const handleDuplicate = useCallback(() => {
    toast.success(`Project duplicated successfully`);
    // In a real app, duplicate the project and redirect
    // router.push("/client/projects/my-projects");
  }, []);

  const handleShare = useCallback(() => {
    toast.success("Share link copied to clipboard!");
    // In a real app, copy share link to clipboard
    // const shareUrl = `${window.location.origin}/projects/${resolvedParams.projectId}`;
    // navigator.clipboard.writeText(shareUrl);
  }, []);

  const handleBack = useCallback(() => {
    router.push("/client/projects/my-projects");
  }, [router]);

  // New action handlers for bid management - Memoized with useCallback
  // Note: Confirmation dialog is handled by TimeRemainingCard component
  const handleCloseBids = useCallback(async () => {
    // Guard: Check ownership
    if (!user || !isOwner) {
      toast.error("You don't have permission to perform this action");
      return;
    }

    try {
      await closeProjectBids(resolvedParams.projectId);
      toast.success("Bidding closed successfully");
      // Update time remaining to show as expired
      if (timeRemaining) {
        setTimeRemaining({ ...timeRemaining, isExpired: true });
      }
    } catch (error) {
      toast.error("Failed to close bidding");
      console.error("Error closing bids:", error);
    }
  }, [resolvedParams.projectId, timeRemaining, user, isOwner]);

  const handleMessageFreelancer = useCallback(
    (freelancerId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      toast.info(`Opening message with freelancer ${freelancerId}`);
      // In a real app, navigate to messages
      // router.push(`/client/messages?userId=${freelancerId}`);
    },
    [user, isOwner],
  );

  const handleViewProfile = useCallback(
    (freelancerId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      toast.info(`Viewing profile of freelancer ${freelancerId}`);
      // In a real app, navigate to freelancer profile
      // router.push(`/freelancers/${freelancerId}`);
    },
    [user, isOwner],
  );

  const handleShortlist = useCallback(
    async (bidId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      try {
        await shortlistBid(resolvedParams.projectId, bidId);
        toast.success("Bid shortlisted successfully");
        // Update local state
        setBids((prev) =>
          prev.map((bid) =>
            bid.id === bidId ? { ...bid, status: "shortlisted" as const } : bid,
          ),
        );
      } catch (error) {
        toast.error("Failed to shortlist bid");
        console.error("Error shortlisting bid:", error);
      }
    },
    [resolvedParams.projectId, user, isOwner],
  );

  const handleAcceptBid = useCallback(
    async (bidId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      try {
        await acceptBid(resolvedParams.projectId, bidId);
        toast.success("Bid accepted successfully");
        // Update local state: mark accepted bid as 'accepted', mark other pending bids as 'lost'
        // Shortlisted bids remain 'shortlisted'.
        setBids((prev) =>
          prev.map((bid) => {
            if (bid.id === bidId) return { ...bid, status: "accepted" as const };
            if (bid.status === "pending") return { ...bid, status: "lost" as const };
            return bid;
          }),
        );
      } catch (error) {
        toast.error("Failed to accept bid");
        console.error("Error accepting bid:", error);
      }
    },
    [resolvedParams.projectId, user, isOwner],
  );

  // Note: Confirmation dialog is handled by BidCard component
  const handleReject = useCallback(
    async (bidId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      try {
        await rejectBid(resolvedParams.projectId, bidId);
        toast.success("Bid rejected successfully");
        // Update local state
        setBids((prev) =>
          prev.map((bid) =>
            bid.id === bidId ? { ...bid, status: "rejected" as const } : bid,
          ),
        );
      } catch (error) {
        toast.error("Failed to reject bid");
        console.error("Error rejecting bid:", error);
      }
    },
    [resolvedParams.projectId, user, isOwner],
  );

  const handleReport = useCallback(
    (bidId: string) => {
      // Guard: Check ownership
      if (!user || !isOwner) {
        toast.error("You don't have permission to perform this action");
        return;
      }

      toast.info(`Report functionality for bid ${bidId} not implemented yet`);
      // In a real app, show report dialog
    },
    [user, isOwner],
  );

  // Retry functions for manual retry
  const retryFetchProject = useCallback(async () => {
    try {
      setIsLoadingProject(true);
      setProjectError(null);

      // Create new AbortController
      projectAbortController.current = new AbortController();

      const projectData = await getProjectById(
        resolvedParams.projectId,
        projectAbortController.current.signal,
      );
      setProject(projectData);
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to load project. Please try again.";
      setProjectError(errorMessage);
      console.error("Error fetching project:", error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingProject(false);
    }
  }, [resolvedParams.projectId]);

  const retryFetchBids = useCallback(async () => {
    try {
      setIsLoadingBids(true);
      setBidsError(null);

      // Create new AbortController
      bidsAbortController.current = new AbortController();

      const bidsData = await getProjectBids(
        resolvedParams.projectId,
        bidsAbortController.current.signal,
      );
      setBids(bidsData);
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to load bids. Please try again.";
      setBidsError(errorMessage);
      console.error("Error fetching bids:", error);
    } finally {
      setIsLoadingBids(false);
    }
  }, [resolvedParams.projectId]);

  const retryFetchInsights = useCallback(async () => {
    try {
      setIsLoadingInsights(true);
      setInsightsError(null);

      // Create new AbortController
      insightsAbortController.current = new AbortController();

      const insightsData = await getProjectInsights(
        resolvedParams.projectId,
        insightsAbortController.current.signal,
      );
      setInsights(insightsData);
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to load insights. Please try again.";
      setInsightsError(errorMessage);
      console.error("Error fetching insights:", error);
    } finally {
      setIsLoadingInsights(false);
    }
  }, [resolvedParams.projectId]);

  // Add online/offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      console.log("[Network] Connection restored");
      setIsOnline(true);
      setRetryCount(0);
      toast.success("Connection restored!");
    };

    const handleOffline = () => {
      console.log("[Network] Connection lost");
      setIsOnline(false);
      toast.error("Connection lost. Please check your internet connection.");
    };

    const cleanup = addConnectionListeners(handleOnline, handleOffline);

    return cleanup;
  }, []);

  // Fetch project data on mount
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoadingProject(true);
        setProjectError(null);

        // Create AbortController for this request
        projectAbortController.current = new AbortController();

        const projectData = await getProjectById(
          resolvedParams.projectId,
          projectAbortController.current.signal,
        );
        setProject(projectData);
      } catch (error: any) {
        // Don't show error if request was cancelled
        if (
          error.name === "AbortError" ||
          error.name === "CanceledError" ||
          error.message === "canceled" ||
          error.code === "ERR_CANCELED"
        ) {
          console.log("[Project] Request cancelled");
          return;
        }

        const errorMessage =
          error.message || "Failed to load project. Please try again.";
        setProjectError(errorMessage);
        console.error("Error fetching project:", error);
        toast.error(errorMessage);
      } finally {
        setIsLoadingProject(false);
      }
    };

    fetchProjectData();

    // Cleanup: Cancel request on unmount
    return () => {
      if (projectAbortController.current) {
        projectAbortController.current.abort();
        console.log("[Project] Aborting request on unmount");
      }
    };
  }, [resolvedParams.projectId]);

  // Check ownership after project and user are loaded
  // Note: We intentionally use project?.clientId and user?.id instead of the full objects
  // to prevent infinite loops caused by object reference changes
  useEffect(() => {
    if (!isLoadingProject && !isAuthLoading && project && user) {
      const ownershipCheck = project.clientId === user.id;
      setIsOwner(ownershipCheck);
      setHasCheckedOwnership(true);

      // If not owner, show error and redirect
      if (!ownershipCheck) {
        toast.error("You don't have permission to view this project", {
          duration: 3000,
        });

        // Redirect after showing error
        const redirectTimer = setTimeout(() => {
          router.push("/client/projects/my-projects");
        }, 2000);

        return () => clearTimeout(redirectTimer);
      }
    } else if (!isLoadingProject && !isAuthLoading && project && !user) {
      // User not authenticated
      toast.error("Please log in to view this project");
      router.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    project?.clientId,
    user?.id,
    isLoadingProject,
    isAuthLoading,
    router,
    resolvedParams.projectId,
  ]);

  // Fetch bids and insights data on mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch bids
      try {
        setIsLoadingBids(true);
        setBidsError(null);

        // Create AbortController for this request
        bidsAbortController.current = new AbortController();

        const bidsData = await getProjectBids(
          resolvedParams.projectId,
          bidsAbortController.current.signal,
        );
        setBids(bidsData);
      } catch (error: any) {
        // Don't show error if request was cancelled
        if (
          error.name === "AbortError" ||
          error.name === "CanceledError" ||
          error.message === "canceled" ||
          error.code === "ERR_CANCELED"
        ) {
          console.log("[Bids] Request cancelled");
        } else {
          const errorMessage =
            error.message || "Failed to load bids. Please try again.";
          setBidsError(errorMessage);
          console.error("Error fetching bids:", error);
        }
      } finally {
        setIsLoadingBids(false);
      }

      // Fetch insights
      try {
        setIsLoadingInsights(true);
        setInsightsError(null);

        // Create AbortController for this request
        insightsAbortController.current = new AbortController();

        const insightsData = await getProjectInsights(
          resolvedParams.projectId,
          insightsAbortController.current.signal,
        );
        setInsights(insightsData);
      } catch (error: any) {
        // Don't show error if request was cancelled
        if (
          error.name === "AbortError" ||
          error.name === "CanceledError" ||
          error.message === "canceled" ||
          error.code === "ERR_CANCELED"
        ) {
          console.log("[Insights] Request cancelled");
        } else {
          const errorMessage =
            error.message || "Failed to load insights. Please try again.";
          setInsightsError(errorMessage);
          console.error("Error fetching insights:", error);
        }
      } finally {
        setIsLoadingInsights(false);
      }

      // Calculate time remaining
      const endDate = getMockEndDateForProject(resolvedParams.projectId);
      const timeRemainingData = calculateTimeRemaining(endDate);
      setTimeRemaining(timeRemainingData);
    };

    fetchData();

    // Cleanup: Cancel requests on unmount
    return () => {
      if (bidsAbortController.current) {
        bidsAbortController.current.abort();
        console.log("[Bids] Aborting request on unmount");
      }
      if (insightsAbortController.current) {
        insightsAbortController.current.abort();
        console.log("[Insights] Aborting request on unmount");
      }
    };
  }, [resolvedParams.projectId]);

  // Create enhanced project object with biddersCount
  const projectWithBiddersCount = React.useMemo(() => {
    if (!project) return null;
    return {
      ...project,
      biddersCount: bids.length,
    };
  }, [project, bids.length]);

  // Update countdown timer every second
  useEffect(() => {
    if (!timeRemaining || timeRemaining.isExpired) return;

    const interval = setInterval(() => {
      const endDate = getMockEndDateForProject(resolvedParams.projectId);
      const updated = calculateTimeRemaining(endDate);
      setTimeRemaining(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, resolvedParams.projectId]);

  // Use a ref to track current bids length to avoid dependency loop in polling useEffect
  const bidsLengthRef = useRef(bids.length);
  useEffect(() => {
    bidsLengthRef.current = bids.length;
  }, [bids.length]);

  // Poll for new bids every 30 seconds
  useEffect(() => {
    // Don't poll if bidding is closed or expired
    if (!timeRemaining || timeRemaining.isExpired) {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      return;
    }

    // Create AbortController for polling
    pollingAbortController.current = new AbortController();

    // Set up polling interval (30 seconds)
    const pollInterval = setInterval(async () => {
      try {
        // Check if polling was cancelled
        if (pollingAbortController.current?.signal.aborted) {
          console.log("[Polling] Cancelled");
          return;
        }

        console.log("[Polling] Checking for new bids...");

        // Fetch latest bids with AbortSignal
        const latestBids = await getProjectBids(
          resolvedParams.projectId,
          pollingAbortController.current?.signal,
        );

        // Success - reset retry count and update online status
        if (!isOnline) {
          setIsOnline(true);
          setRetryCount(0);
          toast.success("Connection restored!");
          console.log("[Polling] Connection restored");
        }

        // Check if there are new bids using the ref to avoid dependency loop
        if (latestBids.length !== bidsLengthRef.current) {
          const newBidsCount = latestBids.length - bidsLengthRef.current;

          // Update bids state
          setBids(latestBids);

          // Fetch updated insights
          const latestInsights = await getProjectInsights(
            resolvedParams.projectId,
            pollingAbortController.current?.signal,
          );
          setInsights(latestInsights);

          // Show notification for new bids
          if (newBidsCount > 0) {
            toast.info(
              `${newBidsCount} new bid${newBidsCount > 1 ? "s" : ""} received!`,
            );
          }

          console.log(`[Polling] Updated: ${newBidsCount} new bid(s)`);
        } else {
          console.log("[Polling] No new bids");
        }
      } catch (error: any) {
        // Don't show error if request was cancelled
        if (
          error.name === "AbortError" ||
          error.name === "CanceledError" ||
          error.message === "canceled" ||
          error.code === "ERR_CANCELED"
        ) {
          console.log("[Polling] Request cancelled");
          return;
        }

        console.error("[Polling] Error fetching bids:", error);

        // Handle network error
        if (isOnline) {
          setIsOnline(false);
          toast.error("Connection lost. Attempting to reconnect...");
          console.log("[Polling] Connection lost, will retry");
        }

        // Increment retry count
        setRetryCount((prev) => {
          const newCount = prev + 1;

          if (newCount >= maxRetries) {
            toast.error(
              "Failed to reconnect after multiple attempts. Please refresh the page.",
              { duration: 5000 },
            );
            console.log(`[Polling] Max retries (${maxRetries}) reached`);
          } else {
            console.log(`[Polling] Retry attempt ${newCount}/${maxRetries}`);
          }

          return newCount;
        });
      }
    }, 30000); // Poll every 30 seconds

    pollingIntervalRef.current = pollInterval;

    // Cleanup interval and abort controller on unmount
    return () => {
      console.log("[Polling] Cleaning up polling interval");
      clearInterval(pollInterval);
      pollingIntervalRef.current = null;

      if (pollingAbortController.current) {
        pollingAbortController.current.abort();
        console.log("[Polling] Aborting polling requests");
      }
    };
  }, [
    resolvedParams.projectId,
    timeRemaining?.isExpired,
    isOnline,
    retryCount,
    maxRetries,
    // bids.length removed to fix loop
  ]);

  // Handle loading state (including auth loading)
  if (isLoadingProject || isAuthLoading || !hasCheckedOwnership) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Project...
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we fetch the project details.
          </p>
        </div>
      </div>
    );
  }

  // Handle access denied (non-owner)
  if (project && user && !isOwner) {
    return <AccessDenied />;
  }

  // Handle error state
  if (projectError || !project) {
    return (
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 -ml-2 hover:bg-transparent hover:text-[#F45A0B]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Projects
        </Button>

        {/* Network Status Indicator */}
        <NetworkStatusIndicator
          retryCount={retryCount}
          maxRetries={maxRetries}
        />

        {/* Error Retry Card */}
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-full max-w-2xl">
            <ErrorRetryCard
              error={projectError || "Project not found"}
              context="loading project"
              onRetry={retryFetchProject}
              onBack={handleBack}
              isRetrying={isLoadingProject}
              showBackButton={true}
              showRefreshButton={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 -ml-2 hover:bg-transparent hover:text-[#F45A0B]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Projects
        </Button>

        {/* Network Status Indicator */}
        <NetworkStatusIndicator
          retryCount={retryCount}
          maxRetries={maxRetries}
        />

        {/* Header */}
        <SingleViewHeader
          serviceName={projectWithBiddersCount.name}
          status={projectWithBiddersCount.status}
          category={projectWithBiddersCount.category}
          upgrades={projectWithBiddersCount.upgrades}
          createdAt={projectWithBiddersCount.createdAt.toString()}
          updatedAt={projectWithBiddersCount.updatedAt.toString()}
          userType="client" // Shows Edit/Delete actions for Owner
          isOwner={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />

        {/* Status Alert */}
        <SingleViewStatusAlert
          status={projectWithBiddersCount.status}
          userType="client" // Shows Owner-specific messages
        />

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full mt-6">
          <TabsList variant="line" className="w-full mb-6">
            <TabsTrigger value="overview" variant="line">
              Overview
            </TabsTrigger>
            <TabsTrigger value="bids" variant="line" className="gap-2">
              Bids{" "}
              <span className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] border border-zinc-200 dark:border-zinc-800">
                {projectWithBiddersCount.biddersCount}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content Area - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <SingleViewParameters
                  deliveryDays={projectWithBiddersCount.deliveryDays}
                  experienceLevel={projectWithBiddersCount.experienceLevel}
                  category={projectWithBiddersCount.category.name}
                  paymentType={projectWithBiddersCount.paymentType}
                />

                <SingleViewDescription
                  description={projectWithBiddersCount.description}
                />

                <SingleViewSkills skills={projectWithBiddersCount.skills} />

                <SingleViewUpgrades
                  upgrades={projectWithBiddersCount.upgrades}
                />

                <SingleViewAttachments
                  attachments={[]} // Placeholder as per logic
                />
              </TabsContent>

              <TabsContent value="bids" className="mt-0">
                <SingleViewBidsSection
                  bids={bids}
                  isLoading={isLoadingBids}
                  error={bidsError}
                  isOwner={isOwner}
                  onMessageFreelancer={handleMessageFreelancer}
                  onViewProfile={handleViewProfile}
                  onShortlist={handleShortlist}
                  onAccept={handleAcceptBid}
                  onReject={handleReject}
                  onReport={handleReport}
                  onRetry={retryFetchBids}
                />
              </TabsContent>
            </div>

            {/* Sidebar - 1/3 width - Rendered once */}
            <aside
              className="space-y-6 hidden lg:block"
              aria-label="Project statistics and actions"
            >
              <SingleViewInsights
                views={insights?.totalViews || 0}
                proposalsCount={insights?.proposalsReceived || 0}
              />

              <SingleViewPricingCard
                budgetMin={projectWithBiddersCount.budgetMin}
                budgetMax={projectWithBiddersCount.budgetMax}
                currency={projectWithBiddersCount.currency}
                paymentType={projectWithBiddersCount.paymentType}
                userType="client" // View-only budget card for client
                isOwner={true}
              />

              {/* Close Project Action */}
              <button
                onClick={handleCloseBids}
                className="w-full flex items-center justify-between p-4 border border-rose-500/20 rounded-xl hover:bg-rose-500/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                    <X className="h-3 w-3 text-white stroke-[3px]" />
                  </div>
                  <span className="text-sm font-bold text-rose-500">
                    Close This Project
                  </span>
                </div>
                <ChevronRight className="h-3 w-3 text-rose-500/50 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </aside>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
