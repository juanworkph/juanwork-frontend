"use client";

// React and Next.js imports
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Feature components
import {
  ErrorBoundary,
  ErrorState,
  SingleViewActions,
  SingleViewBiddingCard,
  SingleViewClientCard,
  SingleViewDetailsCard,
  SingleViewHeader,
  SingleViewInfoCard,
  SingleViewRequirementsCard,
  SingleViewSimilarProjects,
  SingleViewSkeleton,
} from "@/features/projects/components";

// Data fetching functions
import { getExistingBid, getProjectDetailsById } from "@/features/projects/schema";

// Custom hooks
import { useBookmark } from "@/hooks/use-bookmark";

// Type imports
import type { Bid, BidFormData, ProjectDetails } from "@/features/projects/schema";

// Lazy load share modal for code splitting
const SingleViewShareModal = lazy(() =>
  import("@/features/projects/components").then((mod) => ({
    default: mod.SingleViewShareModal,
  }))
);

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<"not-found" | "network" | null>(null)
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [existingBid, setExistingBid] = useState<Bid | undefined>(undefined)
  
  // Bookmark functionality
  const { isBookmarked, toggleBookmark, isLoading: isBookmarkLoading } = useBookmark(
    unwrappedParams.projectId
  )

  // Modal state
  const [showShareModal, setShowShareModal] = useState(false);

  // Fetch project data
  const fetchProjectData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate network delay for realistic loading state
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get comprehensive mock data using the new data fetching function
      const projectData = getProjectDetailsById(unwrappedParams.projectId)

      if (!projectData) {
        setError("not-found")
        setProject(null)
        setExistingBid(undefined)
      } else {
        setProject(projectData)
        // Check if user has already submitted a bid for this project
        const bid = getExistingBid(unwrappedParams.projectId)
        setExistingBid(bid)
      }
    } catch (err) {
      console.error("Error fetching project:", err)
      setError("network")
      setProject(null)
      setExistingBid(undefined)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on mount and when projectId changes
  useEffect(() => {
    fetchProjectData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unwrappedParams.projectId])

  // Handle bid submission
  const handleBidSubmit = async (bidData: BidFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Bid submitted:", bidData)
      // In a real app, this would make an API call
    } catch (err) {
      console.error("Error submitting bid:", err)
      throw err
    }
  }

  // Handle navigation back to find work
  const handleBackToFindWork = () => {
    router.push("/freelancer/findwork")
  }

  // Handle retry for network errors
  const handleRetry = () => {
    fetchProjectData()
  }

  // Handle modal actions
  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleReport = () => {
    // TODO: Implement report modal in future task
    console.log("Report functionality will be implemented soon");
  };

  // Show loading state
  if (isLoading) {
    return <SingleViewSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <ErrorState
        type={error === "not-found" ? "not_found" : "network"}
        onRetry={error === "network" ? handleRetry : undefined}
        onBack={handleBackToFindWork}
      />
    )
  }

  // This should not happen due to error handling above, but TypeScript needs it
  if (!project) {
    return (
      <ErrorState type="not_found" onBack={handleBackToFindWork} />
    )
  }

  // Render main content with error boundary
  return (
    <ErrorBoundary
      fallback={<ErrorState type="network" onBack={handleBackToFindWork} />}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-in fade-in duration-300">
        {/* Header with Breadcrumb */}
        <SingleViewHeader
          projectName={project.name}
          category={project.category}
          projectId={project.id}
        />

        {/* Main Content - Responsive Layout */}
        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content Area - 2/3 width on desktop, full width on mobile/tablet */}
            <section className="lg:col-span-2 space-y-4 md:space-y-6" aria-label="Project information">
              {/* Project Info Card */}
              <SingleViewInfoCard project={project} />

              {/* Project Details Card */}
              <SingleViewDetailsCard
                description={project.description}
                attachments={project.attachments}
              />

              {/* Project Requirements Card */}
              <SingleViewRequirementsCard
                skills={project.skills}
                experienceLevel={project.experienceLevel}
                projectType={project.budget.type}
                duration={project.duration}
              />
            </section>

            {/* Sidebar - 1/3 width on desktop, full width on mobile/tablet */}
            <aside
              className="space-y-4 md:space-y-6 lg:block"
              aria-label="Project details sidebar"
            >
              {/* Bidding Card */}
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

              {/* Actions - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:block">
                <SingleViewActions
                  isBookmarked={isBookmarked}
                  onBookmark={toggleBookmark}
                  onShare={handleShare}
                  onReport={handleReport}
                  isBookmarkLoading={isBookmarkLoading}
                />
              </div>

              {/* Similar Projects - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:block">
                <SingleViewSimilarProjects
                  currentProjectId={project.id}
                  category={project.category}
                  skills={project.skills}
                  maxProjects={5}
                />
              </div>
            </aside>

            {/* Mobile-only: Client, Actions, and Similar Projects below main content */}
            <section className="md:hidden space-y-4 lg:col-span-2" aria-label="Additional project information">
              {project.clientDetails && (
                <SingleViewClientCard client={project.clientDetails} />
              )}
              <SingleViewActions
                isBookmarked={isBookmarked}
                onBookmark={toggleBookmark}
                onShare={handleShare}
                onReport={handleReport}
                isBookmarkLoading={isBookmarkLoading}
              />
              <SingleViewSimilarProjects
                currentProjectId={project.id}
                category={project.category}
                skills={project.skills}
                maxProjects={5}
              />
            </section>
          </div>
        </main>

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
      </div>
    </ErrorBoundary>
  );
}
