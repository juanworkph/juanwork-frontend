"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ServiceDetailsHeader,
  ServiceGallery,
  ServiceOverview,
  ServiceFeatures,
  ServicePricingCard,
  ServiceProviderCard,
  ServiceActions,
  ServiceDetailsSkeleton,
  ErrorState,
} from "@/features/services/components";
import {
  getServiceDetailsById,
  ServiceDetailsData,
  isServiceBookmarked,
  addBookmark,
  removeBookmark,
  CURRENT_USER_ID,
  createProposal,
  ProposalFormData,
} from "@/features/services/schema";

// Lazy load modal components for code splitting
const ImageLightbox = lazy(() =>
  import("@/features/services/components").then((mod) => ({
    default: mod.ImageLightbox,
  }))
);
const ProposalModal = lazy(() =>
  import("@/features/services/components").then((mod) => ({
    default: mod.ProposalModal,
  }))
);
const ShareModal = lazy(() =>
  import("@/features/services/components").then((mod) => ({
    default: mod.ShareModal,
  }))
);

// Main page component
export default function ServiceDetailsPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;

  // State management
  const [service, setService] = useState<ServiceDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch service data
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const serviceData = getServiceDetailsById(serviceId);

        if (!serviceData) {
          setError("not_found");
          return;
        }

        setService(serviceData);

        // Check if service is bookmarked
        const bookmarked = isServiceBookmarked(CURRENT_USER_ID, serviceId);
        setIsBookmarked(bookmarked);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("network");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  // Handle bookmark toggle with optimistic updates and toast notifications
  const handleBookmarkToggle = () => {
    if (!service) return;

    // Store previous state for rollback on error
    const previousBookmarkState = isBookmarked;

    try {
      // Optimistic UI update
      setIsBookmarked(!isBookmarked);

      // Perform the bookmark action
      if (previousBookmarkState) {
        // Remove bookmark
        const success = removeBookmark(serviceId, CURRENT_USER_ID);

        if (success) {
          toast.success("Bookmark removed", {
            description: "Service removed from your bookmarks",
          });
        } else {
          throw new Error("Failed to remove bookmark");
        }
      } else {
        // Add bookmark
        addBookmark(serviceId, CURRENT_USER_ID);
        toast.success("Service bookmarked", {
          description: "You can find this service in your bookmarks",
        });
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);

      // Revert optimistic update on error
      setIsBookmarked(previousBookmarkState);

      // Show error toast
      toast.error("Unable to update bookmark", {
        description: "Please try again later",
      });
    }
  };

  // Handle proposal modal
  const handleOpenProposalModal = () => {
    setShowProposalModal(true);
  };

  const handleCloseProposalModal = () => {
    setShowProposalModal(false);
  };

  // Handle share modal
  const handleOpenShareModal = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  // Handle report
  const handleReport = () => {
    // TODO: Implement report modal in future task
    toast.info("Report feature", {
      description: "Report functionality will be implemented soon",
    });
  };

  // Handle proposal submission
  const handleProposalSubmit = async (formData: ProposalFormData) => {
    if (!service) return;

    try {
      // Create proposal
      createProposal(serviceId, CURRENT_USER_ID, service.provider.id, formData);

      // Show success toast
      toast.success("Proposal submitted successfully", {
        description:
          "The service provider will review your proposal and get back to you soon.",
      });

      // Close modal
      handleCloseProposalModal();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      throw error; // Re-throw to let modal handle the error
    }
  };

  // Handle lightbox
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };

  const handleNextImage = () => {
    if (!service) return;
    const allImages = [service.thumbnail || "", ...(service.gallery || [])];
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePreviousImage = () => {
    if (!service) return;
    const allImages = [service.thumbnail || "", ...(service.gallery || [])];
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Loading state
  if (isLoading) {
    return <ServiceDetailsSkeleton />;
  }

  // Error states
  if (error === "not_found") {
    return (
      <ErrorState
        type="not_found"
        onAction={() =>
          (window.location.href = "/client/hire-talent/discover-services")
        }
      />
    );
  }

  if (error === "network" || !service) {
    return <ErrorState type="network" onAction={() => window.location.reload()} />;
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-in fade-in duration-300">
      {/* Header */}
      <ServiceDetailsHeader
        serviceName={service.serviceName}
        category={service.category}
      />

      {/* Main Content - Responsive Layout */}
      <main className="container mx-auto px-4 py-6 md:py-8" role="main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content Area - 2/3 width on desktop, full width on mobile/tablet */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Service Gallery */}
            <ServiceGallery
              thumbnail={service.thumbnail || ""}
              gallery={service.gallery}
              serviceName={service.serviceName}
              onImageClick={handleOpenLightbox}
            />

            {/* Service Overview */}
            <section
              className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700"
              aria-labelledby="service-overview-heading"
            >
              <ServiceOverview service={service} />
            </section>

            {/* Service Features */}
            <ServiceFeatures
              deliveryTime={service.deliveryTime}
              revisions={service.revisions}
              features={service.features}
            />
          </div>

          {/* Sidebar - 1/3 width on desktop, full width on mobile/tablet, hidden on mobile (shown in fixed bottom bar) */}
          <aside
            className="space-y-4 md:space-y-6 lg:block"
            aria-label="Service details sidebar"
          >
            {/* Service Pricing Card - Desktop sticky, Mobile fixed bottom */}
            <ServicePricingCard
              pricing={service.pricing}
              packageDetails={service.packageDetails}
              selectedPackage={null}
              onSubmitProposal={handleOpenProposalModal}
              onContactProvider={() => {
                // TODO: Implement contact provider functionality
                console.log("Contact provider clicked");
              }}
            />

            {/* Service Provider Card - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block">
              <ServiceProviderCard provider={service.provider} />
            </div>

            {/* Service Actions - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block">
              <ServiceActions
                isBookmarked={isBookmarked}
                onBookmark={handleBookmarkToggle}
                onShare={handleOpenShareModal}
                onReport={handleReport}
              />
            </div>
          </aside>

          {/* Mobile-only: Provider and Actions below main content */}
          <div className="md:hidden space-y-4 lg:col-span-2">
            <ServiceProviderCard provider={service.provider} />
            <ServiceActions
              isBookmarked={isBookmarked}
              onBookmark={handleBookmarkToggle}
              onShare={handleOpenShareModal}
              onReport={handleReport}
            />
          </div>
        </div>
      </main>

      {/* Proposal Modal - Lazy loaded */}
      {showProposalModal && (
        <Suspense fallback={null}>
          <ProposalModal
            isOpen={showProposalModal}
            onClose={handleCloseProposalModal}
            service={service}
            selectedPackage={null}
            onSubmit={handleProposalSubmit}
          />
        </Suspense>
      )}

      {/* Share Modal - Lazy loaded */}
      {showShareModal && (
        <Suspense fallback={null}>
          <ShareModal
            isOpen={showShareModal}
            onClose={handleCloseShareModal}
            serviceUrl={typeof window !== "undefined" ? window.location.href : ""}
            serviceName={service.serviceName}
          />
        </Suspense>
      )}

      {/* Image Lightbox - Lazy loaded */}
      {showLightbox && (
        <Suspense fallback={null}>
          <ImageLightbox
            images={[service.thumbnail || "", ...(service.gallery || [])]}
            currentIndex={lightboxIndex}
            isOpen={showLightbox}
            onClose={handleCloseLightbox}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
            serviceName={service.serviceName}
          />
        </Suspense>
      )}
    </div>
  );
}
