"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import {
  Step1BasicDetails,
  Step2CategoriesSkills,
  Step3Upgrades,
  Step4Preview,
  ProgressIndicator,
} from "@/features/projects/components";
import {
  ProjectFormData,
  initialFormData,
} from "@/features/projects/schema/project-form.schema";
import { calculateTotalUpgradeCost } from "@/features/projects/utils/project-form-mapper";
import { createProject } from "@/features/projects/actions/project-post.actions";
import { mapFormDataToApiRequest } from "@/features/projects/utils/project-form-mapper";
import { handleApiError } from "@/features/projects/utils/project-form-validator";
import { createProjectSchema } from "@/features/projects/schema/project-post.schema";
import { useProjectFormData } from "@/features/projects/hooks/use-project-form-data";
import { ZodError } from "zod";

const STEPS = ["Basic Details", "Categories & Skills", "Upgrades", "Review"];

// LocalStorage key for form data persistence
const FORM_DATA_STORAGE_KEY = "juanwork_project_form_draft";

// Helper functions for form data persistence
const saveFormDataToStorage = (formData: ProjectFormData): void => {
  try {
    // Create a copy without File objects (can't be serialized)
    const serializableData = {
      ...formData,
      attachments: [], // Don't persist file objects
    };
    localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(serializableData));
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
  }
};

const restoreFormDataFromStorage = (): ProjectFormData | null => {
  try {
    const savedData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData) as ProjectFormData;
    }
  } catch (error) {
    console.error("Error restoring form data from localStorage:", error);
  }
  return null;
};

const clearFormDataFromStorage = (): void => {
  try {
    localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing form data from localStorage:", error);
  }
};

export default function PostAProjectPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Fetch upgrade types for calculating total cost
  const { upgradeTypes } = useProjectFormData();

  // Restore form data from localStorage on mount (if user was redirected after 401)
  useEffect(() => {
    const savedFormData = restoreFormDataFromStorage();
    if (savedFormData) {
      setFormData(savedFormData);
      toast.info("Your previous form data has been restored");
    }
  }, []);

  // Authentication guard - redirect if not authenticated or not a client
  useEffect(() => {
    // Wait for auth to finish loading
    if (isAuthLoading) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please log in to post a project");
      router.push("/auth");
      return;
    }

    // Check if user is a client
    if (user?.role !== "client") {
      // User is authenticated but not a client (e.g., freelancer)
      toast.error("Only clients can post projects");
      // Don't redirect, show error message in UI instead
    }
  }, [isAuthenticated, isAuthLoading, user, router]);

  const handleUpdate = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        // Validate project name
        if (!formData.projectName.trim()) {
          errors.projectName = "Project name is required";
        } else if (formData.projectName.trim().length < 10) {
          errors.projectName = "Project name must be at least 10 characters";
        } else if (formData.projectName.trim().length > 200) {
          errors.projectName = "Project name must not exceed 200 characters";
        }
        
        // Validate description
        if (!formData.description.trim()) {
          errors.description = "Description is required";
        } else if (formData.description.trim().length < 50) {
          errors.description = "Description must be at least 50 characters";
        } else if (formData.description.trim().length > 5000) {
          errors.description = "Description must not exceed 5000 characters";
        }
        
        // Validate budget (both min and max are required for both payment types)
        if (!formData.budget.min || formData.budget.min <= 0) {
          errors.budgetMin = "Minimum budget must be greater than 0";
        }
        if (!formData.budget.max || formData.budget.max <= 0) {
          errors.budgetMax = "Maximum budget must be greater than 0";
        }
        if (formData.budget.min && formData.budget.max && formData.budget.min > formData.budget.max) {
          errors.budget = "Minimum budget cannot be greater than maximum budget";
        }
        
        // Validate delivery days only for fixed price projects
        if (formData.projectType === "fixed") {
          if (!formData.deliveryDays || formData.deliveryDays <= 0) {
            errors.deliveryDays = "Delivery days must be at least 1";
          } else if (formData.deliveryDays > 365) {
            errors.deliveryDays = "Delivery days must not exceed 365";
          }
        }
        
        // Set all errors at once
        setValidationErrors(errors);
        
        // Show toast with first error if any
        if (Object.keys(errors).length > 0) {
          const firstError = Object.values(errors)[0];
          toast.error(firstError);
          return false;
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
      // Clear validation errors when moving to next step
      setValidationErrors({});
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
      // Step 1: Transform form data to API request format
      const apiRequest = mapFormDataToApiRequest(formData);
      
      // DEBUG: Log the request data
      console.log('=== API Request Data ===');
      console.log(JSON.stringify(apiRequest, null, 2));
      console.log('Experience Level:', apiRequest.experienceLevel);
      console.log('=======================');

      // Step 2: Validate the transformed data using Zod schema
      try {
        createProjectSchema.parse(apiRequest);
      } catch (validationError) {
        if (validationError instanceof ZodError) {
          const firstError = validationError.issues[0];
          toast.error(firstError.message || "Validation failed");
          setIsSubmitting(false);
          return;
        }
        throw validationError;
      }

      // Step 3: Call the API to create the project
      const response = await createProject(apiRequest);

      // Step 4: Handle success
      setCreatedProjectId(response.id);
      setIsSubmitted(true);
      
      // Clear saved form data from localStorage after successful submission
      clearFormDataFromStorage();
      
      toast.success(`Project "${response.name}" created successfully!`);
    } catch (error) {
      // Step 5: Handle errors
      const errorMessage = handleApiError(error);
      
      // Check if it's a 401 error (unauthorized)
      if (errorMessage === "Please log in to continue") {
        // Save form data before redirecting to login
        saveFormDataToStorage(formData);
        toast.error("Your session has expired. Please log in again.");
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/auth");
        }, 1500);
        return;
      }
      
      // For other errors, display the error message
      toast.error(errorMessage);
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
              Project Submitted Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-2xl mx-auto">
              Your project "{formData.projectName}" has been created successfully.
            </p>
            {createdProjectId && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                Project ID: {createdProjectId}
              </p>
            )}
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Freelancers can now view and bid on your project. You'll receive notifications when proposals come in.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                  setCreatedProjectId(null);
                }}
                variant="outline"
              >
                Post Another Project
              </Button>
              <Button
                onClick={() => router.push("/client/projects/my-projects")}
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
              >
                View My Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state while checking authentication
  if (isAuthLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Card>
          <CardContent className="p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#F45A0B]" />
            <p className="text-gray-600 dark:text-gray-400">
              Checking authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state for non-client users
  if (isAuthenticated && user?.role !== "client") {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Access Restricted
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Only clients can post projects. You are currently logged in as a{" "}
              <span className="font-semibold">{user?.role}</span>.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => router.push(`/${user?.role}`)}
                variant="outline"
              >
                Go to {user?.role} Dashboard
              </Button>
              <Button
                onClick={() => router.push("/client")}
                className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
              >
                Switch to Client Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="position-relative h-full">
      <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Post a New Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details to create your project and attract qualified
            freelancers
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} steps={STEPS} />

        {/* Form Content */}
        <Card>
          <CardContent className="p-6 lg:p-8">
            {currentStep === 1 && (
              <Step1BasicDetails 
                formData={formData} 
                onUpdate={handleUpdate}
                validationErrors={validationErrors}
              />
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
                  Submit Project
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
                  {calculateTotalUpgradeCost(
                    formData.selectedUpgrades,
                    upgradeTypes
                  ).toFixed(2)}{" "}
                  USD
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
