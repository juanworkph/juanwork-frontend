"use client";

// React and Next.js imports
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI components from library
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Global SingleView components
import {
  SingleViewHeader,
  SingleViewParameters,
  SingleViewDescription,
  SingleViewSkills,
  SingleViewUpgrades,
  SingleViewAttachments,
  SingleViewSkeleton,
  SingleViewInsights,
  SingleViewPricingCard,
  SingleViewGallery,
  SingleViewLightbox,
  SingleViewRecommendation,
} from "@/components/single-view";

// Feature components
import {
  ErrorBoundary,
  ErrorState,
  SingleViewActions,
  SingleViewClientCard,
} from "@/features/projects/components";
import { SingleViewBiddingCard } from "@/features/projects/components/single-view-bidding-card";

// API actions
import {
  getProjectById,
  submitProjectBid,
  cancelProjectBid,
  getMyProjectBid,
} from "@/features/projects/actions/project-detail.actions";

// Custom hooks
import { useBookmark } from "@/hooks/use-bookmark";

// Type imports
import type {
  Bid,
  BidFormData,
  ProjectDetails,
} from "@/features/projects/schema";

// Lazy load share modal for code splitting
const SingleViewShareModal = lazy(() =>
  import("@/features/projects/components").then((mod) => ({
    default: mod.SingleViewShareModal,
  })),
);

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<"not-found" | "network" | null>(null);
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [existingBid, setExistingBid] = useState<Bid | undefined>(undefined);

  // Gallery/Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  // Bookmark functionality
  const {
    isBookmarked,
    toggleBookmark,
    isLoading: isBookmarkLoading,
  } = useBookmark(unwrappedParams.projectId);

  // Modal state
  const [showShareModal, setShowShareModal] = useState(false);

  // Fetch project data
  const fetchProjectData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay for realistic loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get comprehensive data using the API action
      const projectData = await getProjectById(unwrappedParams.projectId);

      if (!projectData) {
        setError("not-found");
        setProject(null);
        setExistingBid(undefined);
        setProjectImages([]);
        return;
      }

      // Fetch existing bid if any
      let existingBidData: Bid | undefined = undefined;
      try {
        const bidResult = await getMyProjectBid(unwrappedParams.projectId);
        if (bidResult) {
          existingBidData = bidResult;
        }
      } catch (err) {
        console.warn("Failed to fetch existing bid", err);
      }
      // Transform the flat API response into the nested ProjectDetails structure
      // that the UI components expect.
      const transformedProject: ProjectDetails = {
        ...projectData,
        category: projectData.category?.name || "Uncategorized",
        skills: Array.isArray(projectData.skills)
          ? projectData.skills.map((s: any) => s.name || s)
          : [],
        budget: {
          type: projectData.paymentType || "fixed",
          amount: parseFloat(projectData.budgetMax || "0"),
          currency: projectData.currency || "PHP",
          hourlyRate:
            projectData.paymentType === "hourly"
              ? parseFloat(projectData.budgetMax || "0")
              : undefined,
        },
        // Map min/max for the PricingCard
        budgetMin: parseFloat(projectData.budgetMin || "0"),
        budgetMax: parseFloat(projectData.budgetMax || "0"),
        // Upgrades mapping
        upgrades: Array.isArray(projectData.upgrades)
          ? projectData.upgrades
          : [],
        deadline: {
          startDate: projectData.createdAt,
          endDate: projectData.createdAt,
          deliveryDays: projectData.deliveryDays || 0,
          hoursLeft: 0,
          isOverdue: false,
        },
        // Required mock properties for Project interface if missing in API
        client: projectData.client
          ? {
              id: projectData.client.id,
              name: projectData.client.name,
              avatar: projectData.client.avatar || undefined,
              country: projectData.client.country || "Philippines",
              countryCode: "PH",
              verified: projectData.client.verified,
              rating: projectData.client.rating,
              totalProjects: projectData.client.totalProjects,
              responseTime: projectData.client.responseTime,
              lastActive: projectData.client.lastActive,
            }
          : {
              id: projectData.clientId || "unknown",
              name: "Client",
              country: "Philippines",
              countryCode: "PH",
              verified: false,
            },
        clientDetails: projectData.client
          ? {
              id: projectData.client.id,
              name: projectData.client.name,
              avatar: projectData.client.avatar || undefined,
              country: projectData.client.country || "Philippines",
              countryCode: "PH",
              verified: projectData.client.verified,
              rating: projectData.client.rating,
              totalProjects: projectData.client.totalProjects,
              totalHires: projectData.client.totalHires,
              paymentVerified: projectData.client.paymentVerified,
              memberSince: projectData.client.memberSince,
              responseRate: projectData.client.responseRate,
              reviewCount: projectData.client.totalProjects,
              lastActive: projectData.client.lastActive,
            }
          : undefined,
        // Use real stats
        bidStats: projectData.bidStats,
        views: projectData.views || 0,
        progress: projectData.progress || {
          completedTasks: 0,
          totalTasks: 0,
          completedMilestones: 0,
          totalMilestones: 0,
          progressPercentage: 0,
          lastUpdated: projectData.updatedAt || projectData.createdAt,
        },
        projectUrl: `/projects/${projectData.id}`,
      };

      setProject(transformedProject);
      setExistingBid(existingBidData);

      // Extract image attachments for the gallery
      const images = Array.isArray(projectData.attachments)
        ? projectData.attachments
            .filter((a: any) => a?.type?.toLowerCase().includes("image"))
            .map((a: any) => a.url)
        : [];
      setProjectImages(images);
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("network");
      setProject(null);
      setExistingBid(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and when projectId changes
  useEffect(() => {
    fetchProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unwrappedParams.projectId]);

  // Handle bid submission
  const handleBidSubmit = async (bidData: BidFormData) => {
    try {
      const result = await submitProjectBid(unwrappedParams.projectId, bidData);
      setExistingBid(result);
      // Removed toast.success here since SingleViewBiddingCard handles it
    } catch (err) {
      console.error("Error submitting bid:", err);
      throw err;
    }
  };

  // Handle bid cancellation
  const handleBidCancel = async () => {
    try {
      await cancelProjectBid(unwrappedParams.projectId);
      setExistingBid(undefined);
      toast.success("Bid cancelled successfully");
    } catch (err) {
      console.error("Error cancelling bid:", err);
      toast.error(err instanceof Error ? err.message : "Failed to cancel bid");
      throw err;
    }
  };

  // Handle navigation back to find work
  const handleBackToFindWork = () => {
    router.push("/freelancer/findwork");
  };

  // Handle retry for network errors
  const handleRetry = () => {
    fetchProjectData();
  };

  // Handle modal actions
  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleReport = () => {
    // TODO: Implement report modal in future task
    console.log("Report functionality will be implemented soon");
  };

  const handleContactProvider = () => {
    // TODO: Implement contact functionality
    console.log("Contact provider implementation coming soon");
    // Could redirect to messages or open modal
  };

  const handleSubmitProposal = () => {
    // Scroll to bidding card or focus input
    // For now, just a placeholder action since Bidding Card is already present
    console.log("Submit proposal clicked from pricing card");
    document
      .querySelector("aside")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lightbox handlers
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  // Helper to format file size for generic attachments component
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Show loading state
  if (isLoading) {
    return <SingleViewSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorState
        type={error === "not-found" ? "not_found" : "network"}
        onRetry={error === "network" ? handleRetry : undefined}
        onBack={handleBackToFindWork}
      />
    );
  }

  // This should not happen due to error handling above, but TypeScript needs it
  if (!project) {
    return <ErrorState type="not_found" onBack={handleBackToFindWork} />;
  }

  // Render main content with error boundary
  return (
    <ErrorBoundary
      fallback={<ErrorState type="network" onBack={handleBackToFindWork} />}
    >
      <div className="min-h-screen position-relative animate-in fade-in duration-300">
        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBackToFindWork}
            className="mb-6 -ml-2 hover:bg-transparent hover:text-[#F45A0B]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Find Work
          </Button>

          {/* Header with Breadcrumb */}
          <SingleViewHeader
            serviceName={project.name}
            status={project.status}
            category={{ id: "cat-1", name: project.category }}
            upgrades={project.upgrades || []}
            createdAt={project.createdAt}
            updatedAt={project.updatedAt || project.createdAt}
            userType="freelancer"
            isOwner={false}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
            {/* Main Content Area - 2/3 width */}
            <section
              className="lg:col-span-2 space-y-4 md:space-y-8"
              aria-label="Project information"
            >
              {/* Project Parameters */}
              <SingleViewParameters
                deliveryDays={project.deadline?.deliveryDays || 0}
                experienceLevel={project.experienceLevel || "entry"}
                category={project.category}
                paymentType={project.budget.type}
              />

              {/* Project Gallery (Images only) */}
              {projectImages.length > 0 && (
                <SingleViewGallery
                  thumbnail={projectImages[0]}
                  gallery={projectImages.slice(1)}
                  serviceName={project.name}
                  onImageClick={handleImageClick}
                />
              )}

              {/* Project Description */}
              <SingleViewDescription description={project.description} />

              {/* Skills */}
              <SingleViewSkills
                skills={project.skills.map((skill, index) => ({
                  id: `skill-${index}`,
                  name: skill,
                }))}
              />

              {/* Upgrades */}
              <SingleViewUpgrades upgrades={project.upgrades || []} />

              {/* Attachments */}
              <SingleViewAttachments
                attachments={project.attachments?.map((a) => ({
                  name: a.name,
                  size: formatFileSize(a.size),
                  type: a.type,
                  url: a.url,
                }))}
              />
            </section>

            {/* Sidebar - 1/3 width */}
            <aside
              className="space-y-4 md:space-y-6 lg:block"
              aria-label="Project details sidebar"
            >
              {/* Insights Card */}
              <SingleViewInsights
                views={project.views || 0}
                bidsCount={project.bidStats?.totalBids || 0}
                bidsLabel="Bids"
              />

              {/* Pricing Card */}
              <SingleViewPricingCard
                budgetMin={(project as any).budgetMin || 0}
                budgetMax={(project as any).budgetMax || 0}
                currency={project.budget.currency}
                paymentType={project.budget.type as any}
                isOwner={false}
                onContactProvider={handleContactProvider}
                // onSubmitProposal removed to hide button
              />

              {/* Bidding Card (Feature Specific) */}
              <SingleViewBiddingCard
                project={project}
                existingBid={existingBid}
                isProjectOnWork={false} // Adjust this logic as needed based on actual work status
                hasEnoughPoints={true} // Add real points check here when loyalty/points system is integrated
                onSubmit={handleBidSubmit}
                onCancel={handleBidCancel}
              />

              {/* Client Card - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:block">
                {project.clientDetails && (
                  <SingleViewClientCard client={project.clientDetails} />
                )}
              </div>
            </aside>

            {/* Mobile-only: Client and Actions */}
            <section
              className="md:hidden space-y-4 lg:col-span-2"
              aria-label="Additional project information"
            >
              {project.clientDetails && (
                <SingleViewClientCard client={project.clientDetails} />
              )}
            </section>
          </div>

          {/* Similar Projects - Full width at bottom */}
          <div className="mt-8">
            <SingleViewRecommendation
              currentId={project.id}
              category={project.category}
              skills={project.skills}
              type="project"
              maxItems={3} // Grid is 3 columns
            />
          </div>
        </div>
      </div>

      {/* Share Modal - Lazy loaded */}
      {showShareModal && (
        <Suspense fallback={null}>
          <SingleViewShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            projectUrl={
              typeof window !== "undefined" ? window.location.href : ""
            }
            projectName={project.name}
          />
        </Suspense>
      )}

      {/* Lightbox - For full size images */}
      <SingleViewLightbox
        images={projectImages}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNextImage}
        onPrevious={handlePrevImage}
        onSelectIndex={setCurrentImageIndex}
        serviceName={project.name}
      />
    </ErrorBoundary>
  );
}
