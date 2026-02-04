"use client";

import React, { useState } from "react";
import { VerificationTab } from "@/features/settings/components";
import {
  mockVerificationData,
  VerificationData,
} from "@/features/settings/schema";
import { toast } from "sonner";

export default function VerificationSettingsPage() {
  const [verificationData, setVerificationData] =
    useState<VerificationData>(mockVerificationData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    idType: string;
    idNumber: string;
    selfie?: File;
    idPhoto?: File;
  }) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success state update
      setVerificationData({
        ...verificationData,
        status: "processing",
        currentStep: 2,
        idType: data.idType as any,
        idNumber: data.idNumber,
        submittedAt: new Date().toISOString(),
      });

      toast.success("Verification documents submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit verification. Please try again.");
      console.error("Verification submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <VerificationTab
        verificationData={verificationData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
