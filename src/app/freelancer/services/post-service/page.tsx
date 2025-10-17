"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Step1BasicDetails,
  Step2CategoriesSkills,
  Step3Upgrades,
  Step4Preview,
  ProgressIndicator,
} from "@/features/post-service/components";
import {
  ServiceFormData,
  initialFormData,
  calculateTotalUpgradeCost,
} from "@/features/post-service/schema";

const STEPS = ["Basic Details", "Categories & Skills", "Upgrades", "Review"];

export default function PostAServicePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdate = (data: Partial<ServiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.projectName.trim()) {
          toast.error("Please enter a project name");
          return false;
        }
        if (!formData.description.trim()) {
          toast.error("Please enter a description");
          return false;
        }
        if (formData.projectType === "fixed") {
          if (formData.budget.min <= 0 || formData.budget.max <= 0) {
            toast.error("Please enter valid budget amounts");
            return false;
          }
          if (formData.budget.min > formData.budget.max) {
            toast.error("Minimum budget cannot be greater than maximum budget");
            return false;
          }
        } else {
          if (!formData.budget.hourlyRate || formData.budget.hourlyRate <= 0) {
            toast.error("Please enter a valid hourly rate");
            return false;
          }
        }
        return true;

      case 2:
        if (!formData.category) {
          toast.error("Please select a category");
          return false;
        }
        if (formData.skills.length === 0) {
          toast.error("Please add at least one skill");
          return false;
        }
        return true;

      case 3:
        // Optional step, always valid
        return true;

      case 4:
        // Final validation
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to submit the service
      console.log("Submitting service:", formData);

      setIsSubmitted(true);
      toast.success("Service submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit service. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Service Submitted Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Your service "{formData.projectName}" has been submitted for
              review. Our team will review it and notify you once it's approved
              and live. This usually takes 24-48 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                }}
                variant="outline"
              >
                Post Another Service
              </Button>
              <Button
                onClick={() =>
                  (window.location.href = "/freelancer/services/my-services")
                }
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
              >
                View My Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 overflow-y-auto h-full py-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Post a New Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in the details to create your service and attract qualified
          freelancers
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} steps={STEPS} />

      {/* Form Content */}
      <Card>
        <CardContent className="p-6 lg:p-8">
          {currentStep === 1 && (
            <Step1BasicDetails formData={formData} onUpdate={handleUpdate} />
          )}
          {currentStep === 2 && (
            <Step2CategoriesSkills
              formData={formData}
              onUpdate={handleUpdate}
            />
          )}
          {currentStep === 3 && (
            <Step3Upgrades formData={formData} onUpdate={handleUpdate} />
          )}
          {currentStep === 4 && <Step4Preview formData={formData} />}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </span>
        </div>

        {currentStep < STEPS.length ? (
          <Button
            onClick={handleNext}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/90 gap-2 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Submit Service
              </>
            )}
          </Button>
        )}
      </div>

      {/* Cost Summary Footer */}
      {formData.selectedUpgrades.length > 0 && (
        <Card className="border-[#F45A0B]/20 bg-[#F45A0B]/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                {formData.selectedUpgrades.length} upgrade
                {formData.selectedUpgrades.length > 1 ? "s" : ""} selected
              </span>
              <span className="font-bold text-lg text-[#F45A0B]">
                $
                {calculateTotalUpgradeCost(formData.selectedUpgrades).toFixed(
                  2
                )}{" "}
                USD
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
