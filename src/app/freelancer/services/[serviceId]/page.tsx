"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ServiceDetailView } from "@/features/services/components";
import { getFreelancerServices } from "@/features/services/actions/my-services.actions";
import { MyService } from "@/features/services/schema/my-services-data";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

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

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const services = await getFreelancerServices();
        const foundService = services.find((s) => s.id === resolvedParams.serviceId);
        
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
    return (
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
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
    router.push(`/freelancer/services/post-service?duplicate=${resolvedParams.serviceId}`);
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

        {/* Service Detail */}
        <ServiceDetailView
          service={service}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}
