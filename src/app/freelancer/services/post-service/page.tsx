"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import {
  Step1BasicDetails,
  Step2CategoriesSkills,
  Step3Upgrades,
  Step4Preview,
  ProgressIndicator,
} from "@/features/services/components";
import {
  ServiceFormData,
  initialFormData,
  serviceNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
  categorySchema,
  skillsSchema,
} from "@/features/services/schema/service-form.schema";
import { mapFormDataToApiRequest } from "@/features/services/utils/service-form-mapper";
import { createService } from "@/features/services/actions/service-post.actions";

const STEPS = ["Basic Details", "Categories & Skills", "Upgrades", "Review"];

/**
 * Service Post Page Component
 * 
 * This page implements a 4-step wizard for freelancers to create and publish service offerings.
 * 
 * Features:
 * - Multi-step form with progress tracking
 * - Step-by-step validation using Zod schemas
 * - Form data persistence across step navigation
 * - API integration with backend service creation endpoint
 * - Success/error handling with user feedback
 * - Redirect to service detail page on successful submission
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 13.1, 13.2, 13.3, 13.4, 13.5
 */
export default function PostAServicePage() {
  const router = useRouter();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedServiceId, setSubmittedServiceId] = useState<string>("");
  
  // Error state for persistent error display
  const [submitError, setSubmitError] = useState<{
    message: string;
    type: 'validation' | 'auth' | 'permission' | 'network' | 'server';
    canRetry: boolean;
  } | null>(null);

  /**
   * Update form data with partial updates
   * Requirement: 13.2 - Preserve all field values when navigating between steps
   */
  const handleUpdate = (data: Partial<ServiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  /**
   * Validate current step before allowing navigation
   * Requirement: 1.3, 1.4 - Validate and display errors for invalid fields
   */
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    switch (step) {
      case 1: {
        // Validate service name
        const nameResult = serviceNameSchema.safeParse(formData.serviceName);
        if (!nameResult.success) {
          errors.serviceName = nameResult.error.issues[0]?.message || "Invalid service name";
          isValid = false;
        }

        // Validate description
        const descResult = descriptionSchema.safeParse(formData.description);
        if (!descResult.success) {
          errors.description = descResult.error.issues[0]?.message || "Invalid description";
          isValid = false;
        }

        // Validate budget
        const budgetResult = budgetSchema.safeParse(formData.budget);
        if (!budgetResult.success) {
          errors.budget = budgetResult.error.issues[0]?.message || "Invalid budget";
          isValid = false;
        }

        // Validate delivery days (conditional on payment type)
        if (formData.paymentType === 'fixed') {
          const deliveryResult = deliveryDaysSchema.safeParse(formData.deliveryDays);
          if (!deliveryResult.success) {
            errors.deliveryDays = deliveryResult.error.issues[0]?.message || "Invalid delivery days";
            isValid = false;
          } else if (formData.deliveryDays < 1 || formData.deliveryDays > 365) {
            errors.deliveryDays = "Delivery days must be between 1 and 365 for fixed-price services";
            isValid = false;
          }
        }

        break;
      }

      case 2: {
        // Validate category
        const categoryResult = categorySchema.safeParse(formData.categoryId);
        if (!categoryResult.success) {
          errors.category = "Please select a category";
          isValid = false;
        }

        // Validate skills (at least 1, max 20)
        const skillsResult = skillsSchema.safeParse(formData.skills);
        if (!skillsResult.success) {
          errors.skills = skillsResult.error.issues[0]?.message || "Invalid skills selection";
          isValid = false;
        }

        // Validate custom skill names are not empty
        // Requirement: 3.7 - Custom skill names must not be empty
        if (formData.customSkillNames.length > 0) {
          const emptyCustomSkills = formData.customSkillNames.filter(name => !name.trim());
          if (emptyCustomSkills.length > 0) {
            errors.customSkills = "Custom skill names cannot be empty";
            isValid = false;
          }
        }

        break;
      }

      case 3:
        // Upgrades are optional, always valid
        break;

      case 4:
        // Final validation - re-validate all steps
        return validateStep(1) && validateStep(2) && validateStep(3);

      default:
        break;
    }

    setValidationErrors(errors);

    // Show toast with all errors (not just first)
    // Requirement: 1.4 - Show all validation errors for invalid fields
    if (!isValid) {
      const errorMessages = Object.values(errors);
      if (errorMessages.length > 0) {
        // Show first error in toast, but all errors will be displayed inline
        toast.error(errorMessages[0]);
      }
    }

    return isValid;
  };

  /**
   * Handle Next button click
   * Requirement: 1.3 - Enable Next button only when current step is valid
   */
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setValidationErrors({}); // Clear errors on successful validation
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  /**
   * Handle Previous button click
   * Requirement: 1.2 - Allow navigation between steps
   */
  const handlePrevious = () => {
    setValidationErrors({}); // Clear errors when going back
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  /**
   * Navigate to a specific step (used by edit buttons in preview)
   * Requirement: 5.2 - Allow navigation back to any previous step for editing
   */
  const handleNavigateToStep = (step: number) => {
    setValidationErrors({}); // Clear errors when navigating
    setCurrentStep(step);
  };

  /**
   * Handle form submission
   * Requirement: 1.6, 5.4, 5.5, 5.6 - Submit form and handle success/error
   * Requirement: 14.5, 14.6, 7.6, 7.7 - Display error messages and allow retry
   */
  const handleSubmit = async () => {
    // Final validation
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null); // Clear previous errors

    try {
      // Map form data to API request format
      const apiRequest = mapFormDataToApiRequest(formData);

      // Call API to create service
      const response = await createService(apiRequest);

      // Success handling
      setSubmittedServiceId(response.id);
      setIsSubmitted(true);
      toast.success("Service submitted successfully!");

      // Clear form data after successful submission
      // Requirement: 13.5 - Clear form data after successful submission
      setFormData(initialFormData);
      setValidationErrors({});
      
    } catch (error: unknown) {
      // Error handling
      // Requirement: 5.6, 7.6, 7.7, 14.5, 14.6 - Handle API errors with detailed messages
      console.error("Error creating service:", error);

      // Handle different error types
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; error?: string; details?: Array<{ message: string }>; validationErrors?: Record<string, string> } } };
        const status = axiosError.response.status;
        const errorData = axiosError.response.data;
        const message = errorData?.message || errorData?.error || "An error occurred";

        switch (status) {
          case 400:
            // Validation errors - parse and display details
            let validationMessage = "Validation Error: ";
            
            if (errorData?.details && Array.isArray(errorData.details)) {
              // If backend returns array of validation errors
              validationMessage += errorData.details.map((d) => d.message).join(", ");
            } else if (errorData?.validationErrors) {
              // If backend returns object of validation errors
              validationMessage += Object.values(errorData.validationErrors).join(", ");
            } else {
              validationMessage += message;
            }
            
            setSubmitError({
              message: validationMessage,
              type: 'validation',
              canRetry: true
            });
            toast.error(validationMessage);
            break;
            
          case 401:
            // Unauthorized - redirect to login
            setSubmitError({
              message: "You must be logged in to create a service. Redirecting to login...",
              type: 'auth',
              canRetry: false
            });
            toast.error("You must be logged in to create a service");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
              router.push("/auth?redirect=/freelancer/services/post-service");
            }, 2000);
            break;
            
          case 403:
            // Forbidden - permission error
            setSubmitError({
              message: "You don't have permission to create services. Only freelancers can create services.",
              type: 'permission',
              canRetry: false
            });
            toast.error("Permission denied: Only freelancers can create services");
            break;
            
          case 404:
            // Not found - resource error
            setSubmitError({
              message: "Resource not found. Please check your selections and try again.",
              type: 'validation',
              canRetry: true
            });
            toast.error("Resource not found. Please try again.");
            break;
            
          case 500:
            // Server error
            setSubmitError({
              message: "Server error occurred. Our team has been notified. Please try again later.",
              type: 'server',
              canRetry: true
            });
            toast.error("Server error. Please try again later.");
            break;
            
          default:
            // Other errors
            setSubmitError({
              message: `Error: ${message}`,
              type: 'server',
              canRetry: true
            });
            toast.error(`Error: ${message}`);
        }
      } else if (error && typeof error === 'object' && 'request' in error) {
        // Network error - no response received
        setSubmitError({
          message: "Unable to connect to server. Please check your internet connection and try again.",
          type: 'network',
          canRetry: true
        });
        toast.error("Network error. Please check your connection.");
      } else {
        // Other errors
        setSubmitError({
          message: "An unexpected error occurred. Please try again.",
          type: 'server',
          canRetry: true
        });
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle retry after error
   * Requirement: 14.6 - Allow retry after error
   */
  const handleRetry = () => {
    setSubmitError(null);
    handleSubmit();
  };

  /**
   * Dismiss error message
   */
  const handleDismissError = () => {
    setSubmitError(null);
  };

  /**
   * Success Screen
   * Requirement: 5.5 - Redirect to service detail page on success
   */
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
              Your service "{formData.serviceName}" has been submitted for
              review. Our team will review it and notify you once it's approved
              and live. This usually takes 24-48 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                  setSubmittedServiceId("");
                }}
                variant="outline"
              >
                Post Another Service
              </Button>
              <Button
                onClick={() => router.push(`/freelancer/services/${submittedServiceId}`)}
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
              >
                View Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /**
   * Main Form UI
   * Requirement: 1.1 - Display 4-step wizard interface
   */
  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Post a New Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details to create your service and attract clients
          </p>
        </div>

        {/* Progress Indicator */}
        {/* Requirement: Show progress indicator (1/4, 2/4, 3/4, 4/4) */}
        <ProgressIndicator currentStep={currentStep} steps={STEPS} />

        {/* Error Display */}
        {/* Requirement: 14.5, 14.6 - Display error messages and allow retry */}
        {submitError && (
          <Alert 
            variant="destructive" 
            className="border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold mb-1">
                  {submitError.type === 'validation' && 'Validation Error'}
                  {submitError.type === 'auth' && 'Authentication Required'}
                  {submitError.type === 'permission' && 'Permission Denied'}
                  {submitError.type === 'network' && 'Network Error'}
                  {submitError.type === 'server' && 'Server Error'}
                </p>
                <p className="text-sm">{submitError.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {submitError.canRetry && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isSubmitting}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      'Retry'
                    )}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleDismissError}
                  className="h-8 w-8"
                  aria-label="Dismiss error"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Form Content */}
        <Card>
          <CardContent className="p-6 lg:p-8">
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <Step1BasicDetails 
                formData={formData} 
                onUpdate={handleUpdate}
                validationErrors={validationErrors}
              />
            )}
            
            {/* Step 2: Categories & Skills */}
            {currentStep === 2 && (
              <Step2CategoriesSkills
                formData={formData}
                onUpdate={handleUpdate}
                validationErrors={validationErrors}
              />
            )}
            
            {/* Step 3: Upgrades */}
            {currentStep === 3 && (
              <Step3Upgrades 
                formData={formData} 
                onUpdate={handleUpdate} 
              />
            )}
            
            {/* Step 4: Preview */}
            {currentStep === 4 && (
              <Step4Preview 
                formData={formData}
                onNavigateToStep={handleNavigateToStep}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
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
      </div>
    </div>
  );
}
