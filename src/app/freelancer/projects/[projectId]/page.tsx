"use client";

// React and Next.js imports
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

// Data fetching functions
import {
  getExistingBid,
  getProjectDetailsById,
} from "@/features/projects/schema";

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

      // Get comprehensive mock data using the new data fetching function
      const projectData = getProjectDetailsById(unwrappedParams.projectId);

      if (!projectData) {
        setError("not-found");
        setProject(null);
        setExistingBid(undefined);
        setProjectImages([]);
      } else {
        setProject(projectData);
        // Check if user has already submitted a bid for this project
        const bid = getExistingBid(unwrappedParams.projectId);
        setExistingBid(bid);

        // Extract image attachments for the gallery
        const images =
          projectData.attachments
            ?.filter((a) => a.type.toLowerCase().includes("image"))
            .map((a) => a.url) || [];
        setProjectImages(images);
      }
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Bid submitted:", bidData);
      // In a real app, this would make an API call
    } catch (err) {
      console.error("Error submitting bid:", err);
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
            upgrades={[]}
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
                views={1243} // Mock data as it's not in schema
                proposalsCount={project.proposalStats?.totalProposals || 0}
                proposalsLabel="Bids"
              />

              {/* Pricing Card */}
              <SingleViewPricingCard
                budgetMin={
                  project.budget.type === "hourly"
                    ? project.budget.hourlyRate || 0
                    : project.budget.amount
                }
                budgetMax={
                  project.budget.type === "hourly"
                    ? project.budget.hourlyRate || 0
                    : project.budget.amount
                }
                currency={project.budget.currency}
                paymentType={project.budget.type}
                isOwner={false}
                onContactProvider={handleContactProvider}
                // onSubmitProposal removed to hide button
              />

              {/* Bidding Card (Feature Specific) */}
              <SingleViewBiddingCard
                project={project}
                existingBid={existingBid}
                onSubmit={handleBidSubmit}
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
