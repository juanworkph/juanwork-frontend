"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccessDeniedProps {
  message?: string;
  onBack?: () => void;
}

/**
 * Access Denied Component
 * Displays when user tries to access a project they don't own
 */
export const AccessDenied: React.FC<AccessDeniedProps> = ({
  message = "You don't have permission to view this project",
  onBack,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/client/projects/my-projects");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {message}
        </p>

        {/* Action Button */}
        <Button
          onClick={handleBack}
          className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Projects
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
