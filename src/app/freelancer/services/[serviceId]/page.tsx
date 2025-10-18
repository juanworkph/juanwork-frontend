"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ServiceDetailView } from "@/features/services/components";
import { mockMyServices } from "@/features/services/schema";
import { toast } from "sonner";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);

  // Find the service by ID
  const service = mockMyServices.find((s) => s.id === resolvedParams.serviceId);

  // Handle not found
  if (!service) {
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
    toast.info(`Edit functionality for service ${resolvedParams.serviceId}`);
    // In a real app, navigate to edit page
    // router.push(`/freelancer/services/edit/${resolvedParams.serviceId}`);
  };

  const handleDelete = () => {
    toast.error("Delete functionality not implemented yet");
    // In a real app, show confirmation dialog and delete
  };

  const handleDuplicate = () => {
    toast.success(`Service duplicated successfully`);
    // In a real app, duplicate the service and redirect
    // router.push("/freelancer/services/my-services");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
    // In a real app, copy share link to clipboard
  };

  const handleBack = () => {
    router.push("/freelancer/services/my-services");
  };

  return (
    <div className="max-w-7xl mx-auto overflow-y-auto h-full p-6 lg:p-8">
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
  );
}
