"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  SingleViewHeader,
  SingleViewStatusAlert,
  SingleViewParameters,
  SingleViewDescription,
  SingleViewSkills,
  SingleViewUpgrades,
  SingleViewAttachments,
  SingleViewInsights,
  SingleViewPricingCard,
  SingleViewGallery,
  SingleViewLightbox,
  SingleViewSkeleton,
} from "@/components/single-view";
import { SingleViewProposalsTab } from "@/features/services/components";
import { getFreelancerServices } from "@/features/services/actions/my-services.actions";
import { MyService } from "@/features/services/schema/my-services-data";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [service, setService] = useState<MyService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine thumbnail and gallery for lightbox
  const allImages = React.useMemo(() => {
    if (!service) return [];
    return [service.thumbnail, ...(service.gallery || [])].filter(
      Boolean,
    ) as string[];
  }, [service]);

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const services = await getFreelancerServices();
        const foundService = services.find(
          (s) => s.id === resolvedParams.serviceId,
        );

        if (foundService) {
          setService(foundService);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load service");
        toast.error("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [resolvedParams.serviceId]);

  // Loading state
  if (isLoading) {
    return <SingleViewSkeleton />;
  }

  // Handle not found or error
  if (error || !service) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Service Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/freelancer/services/my-services")}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Services
          </Button>
        </div>
      </div>
    );
  }

  // Handlers
  const handleEdit = () => {
    router.push(`/freelancer/services/edit/${resolvedParams.serviceId}`);
  };

  const handleDelete = () => {
    toast.error("Delete functionality not implemented yet");
    // In a real app, show confirmation dialog and delete
  };

  const handleDuplicate = () => {
    router.push(
      `/freelancer/services/post-service?duplicate=${resolvedParams.serviceId}`,
    );
    toast.info("Duplicating service...");
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/freelancer/services/${resolvedParams.serviceId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  const handleBack = () => {
    router.push("/freelancer/services/my-services");
  };

  const handleManagePrice = () => {
    toast.info("Manage price functionality coming soon");
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
          Back to My Services
        </Button>

        {/* Service Header */}
        <SingleViewHeader
          serviceName={service.name}
          status={
            (service.status === "approved"
              ? "active"
              : service.status === "cancelled"
                ? "paused"
                : service.status) as
              | "pending"
              | "declined"
              | "draft"
              | "active"
              | "paused"
          }
          category={service.category}
          upgrades={service.upgrades}
          createdAt={service.createdAt.toISOString()}
          updatedAt={service.updatedAt.toISOString()}
          isOwner={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />

        {/* Status Alert */}
        <SingleViewStatusAlert
          status={
            (service.status === "approved"
              ? "active"
              : service.status === "cancelled"
                ? "paused"
                : service.status) as
              | "pending"
              | "declined"
              | "draft"
              | "active"
              | "paused"
          }
        />

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full mt-6">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="overview" variant="line">
              Overview
            </TabsTrigger>
            <TabsTrigger value="proposals" variant="line" className="gap-2">
              Proposals
              <span className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] border border-zinc-200 dark:border-zinc-800">
                {service.proposalsCount}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <TabsContent value="overview" className="mt-0 space-y-8">
                <div className="space-y-8">
                  {/* Service Parameters */}
                  <SingleViewParameters
                    deliveryDays={service.deliveryDays}
                    experienceLevel={service.experienceLevel}
                    category={service.category.name}
                    paymentType={service.paymentType}
                  />

                  {/* Service Gallery */}
                  {service.hasImages && (
                    <SingleViewGallery
                      thumbnail={service!.thumbnail || ""}
                      gallery={service!.gallery}
                      serviceName={service!.name}
                      onImageClick={handleImageClick}
                    />
                  )}

                  {/* Service Description */}
                  <SingleViewDescription description={service.description} />

                  {/* Skills */}
                  <SingleViewSkills skills={service.skills} />

                  {/* Promoted Features */}
                  <SingleViewUpgrades upgrades={service.upgrades} />

                  {/* Attachments */}
                  <SingleViewAttachments />
                </div>
              </TabsContent>

              <TabsContent value="proposals" className="mt-6">
                <SingleViewProposalsTab />
              </TabsContent>
            </div>

            {/* Right Column - Persistent Sidebar */}
            <div className="space-y-8">
              {/* INSIGHTS */}
              <SingleViewInsights
                views={service.views}
                proposalsCount={service.proposalsCount}
              />

              {/* Pricing Card */}
              <SingleViewPricingCard
                budgetMin={service.budgetMin}
                budgetMax={service.budgetMax}
                currency={service.currency}
                paymentType={service.paymentType}
                userType="freelancer"
                isOwner={true}
                onManagePrice={handleManagePrice}
              />
            </div>
          </div>
        </Tabs>
      </div>

      {/* Lightbox */}
      <SingleViewLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNext={handleLightboxNext}
        onPrevious={handleLightboxPrev}
        onSelectIndex={setCurrentImageIndex}
        serviceName={service!.name}
      />
    </div>
  );
}
