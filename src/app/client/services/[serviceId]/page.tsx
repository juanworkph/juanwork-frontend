"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  SingleViewServiceHeader,
  SingleViewParameters,
  SingleViewDescription,
  SingleViewSkills,
  SingleViewUpgrades,
  SingleViewAttachments,
  SingleViewInsights,
  SingleViewPricingCard,
  SingleViewProviderCard,
  SingleViewSkeleton,
  SingleViewGallery,
  SingleViewLightbox,
  ErrorState,
} from "@/features/services/components";
import {
  ServiceDetailsData,
  createProposal,
  ProposalFormData,
} from "@/features/services/schema";
import { fetchServiceById } from "@/features/services/actions/discover-services";
import { useBookmark } from "@/hooks/use-bookmark";

// Lazy load modal components for code splitting
const SingleViewProposalModal = lazy(() =>
  import("@/features/services/components").then((mod) => ({
    default: mod.SingleViewProposalModal,
  })),
);
const SingleViewShareModal = lazy(() =>
  import("@/features/services/components").then((mod) => ({
    default: mod.SingleViewShareModal,
  })),
);

// Main page component
export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;

  // State management
  const [service, setService] = useState<ServiceDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine thumbnail and gallery for lightbox
  const allImages = React.useMemo(() => {
    if (!service) return [];
    return [service.thumbnail, ...(service.gallery || [])].filter(Boolean);
  }, [service]);

  // Bookmark hook
  const { isBookmarked, toggleBookmark } = useBookmark(serviceId);

  // Fetch service data
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) return;

      try {
        setIsLoading(true);
        setError(null);

        const serviceData = await fetchServiceById(serviceId);

        setService(serviceData);
      } catch (err: any) {
        console.error("Error fetching service:", err);
        // Handle specific error codes if needed
        if (err.statusCode === 404) {
          setError("not_found");
        } else {
          setError("network");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId]);

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

  // Handle lightbox
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handleLightboxPrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  };

  // Handle proposal submission
  const handleSubmitProposal = async (data: ProposalFormData) => {
    try {
      await createProposal(
        serviceId,
        "client-123", // Mock client ID
        service ? service.provider.id : "provider-1",
        data,
      );
      toast.success("Proposal submitted successfully!");
      handleCloseProposalModal();
    } catch (err) {
      toast.error("Failed to submit proposal. Please try again.");
      console.error("Error submitting proposal:", err);
    }
  };

  // Handle report
  const handleReport = () => {
    toast.info("Report functionality coming soon");
  };

  const handleBack = () => {
    router.push("/client/services");
  };

  // Loading state
  if (isLoading) {
    return <SingleViewSkeleton />;
  }

  // Error state
  if (error || !service) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-center">
          <ErrorState type={error === "not_found" ? "not_found" : "network"} />
          <Button
            onClick={handleBack}
            className="mt-6 bg-[#F45A0B] hover:bg-[#F45A0B]/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  // Main content
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
          Back to Services
        </Button>

        {/* Service Header */}
        <SingleViewServiceHeader
          serviceName={service.serviceName}
          status="active"
          category={{ id: service.category, name: service.category }}
          upgrades={[]}
          createdAt={new Date().toISOString()}
          updatedAt={new Date().toISOString()}
          userType="client"
          isBookmarked={isBookmarked}
          onBookmark={toggleBookmark}
          onShare={handleOpenShareModal}
          onReport={handleReport}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Parameters */}
            <SingleViewParameters
              deliveryDays={parseInt(service.deliveryTime.split("-")[0]) || 7}
              experienceLevel="expert"
              category={service.category}
            />

            {/* Service Gallery */}
            {service.hasImages && (
              <SingleViewGallery
                thumbnail={service.thumbnail}
                gallery={service.gallery}
                serviceName={service.serviceName}
                onImageClick={handleImageClick}
              />
            )}

            {/* Service Description */}
            <SingleViewDescription description={service.longDescription} />

            {/* Skills */}
            <SingleViewSkills
              skills={service.skills.map((skill, index) => ({
                id: `skill-${index}`,
                name: skill,
              }))}
            />

            {/* Promoted Features */}
            {service.isFeatured && (
              <SingleViewUpgrades
                upgrades={[
                  {
                    id: "featured",
                    name: "Featured",
                    slug: "featured",
                  },
                ]}
              />
            )}

            {/* Attachments */}
            <SingleViewAttachments />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* 1. Service Insights */}
            <SingleViewInsights
              views={service.views || 0}
              proposalsCount={service.proposalsCount || 0}
            />

            {/* 2. Service Pricing Card */}
            <SingleViewPricingCard
              budgetMin={service.pricing.starting}
              budgetMax={
                service.pricing.packages?.premium ||
                service.pricing.starting * 2
              }
              currency={service.pricing.currency}
              paymentType={service.pricing.type}
              userType="client"
              onSubmitProposal={handleOpenProposalModal}
              onContactProvider={() => {
                toast.info("Contact provider functionality coming soon");
              }}
            />

            {/* 3. Service Provider Card */}
            <SingleViewProviderCard provider={service.provider} />
          </div>
        </div>
      </div>

      {/* Proposal Modal - Lazy loaded */}
      {showProposalModal && (
        <Suspense fallback={null}>
          <SingleViewProposalModal
            isOpen={showProposalModal}
            onClose={handleCloseProposalModal}
            service={service}
            selectedPackage={null}
            onSubmit={handleSubmitProposal}
          />
        </Suspense>
      )}

      {/* Share Modal - Lazy loaded */}
      {showShareModal && (
        <Suspense fallback={null}>
          <SingleViewShareModal
            isOpen={showShareModal}
            onClose={handleCloseShareModal}
            serviceUrl={`${window.location.origin}/client/services/${serviceId}`}
            serviceName={service.serviceName}
          />
        </Suspense>
      )}

      {/* Lightbox */}
      <SingleViewLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNext={handleLightboxNext}
        onPrevious={handleLightboxPrev}
        onSelectIndex={setCurrentImageIndex}
        serviceName={service.serviceName}
      />
    </div>
  );
}
