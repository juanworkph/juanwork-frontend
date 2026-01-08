"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";
import type { ServiceFormData } from "../schema/service-form.schema";
import {
  serviceNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
  paymentTypeSchema,
  experienceLevelSchema,
  attachmentsSchema,
} from "../schema/service-form.schema";

interface Step1Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
  validationErrors?: Record<string, string>;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_FILES = 5;

/**
 * Helper function to format file size in human-readable format
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

/**
 * Step 1: Basic Service Details Component
 * 
 * This component handles the first step of the service creation form,
 * collecting basic information about the service including name, description,
 * payment type, experience level, budget, delivery days, and file attachments.
 * 
 * Features:
 * - Real-time validation with error messages
 * - Character counters for text fields
 * - Conditional delivery days field (shown only for fixed-price services)
 * - File upload with size validation (max 5 files, 25MB total)
 * - Responsive design with TailwindCSS
 */
export function Step1BasicDetails({ 
  formData, 
  onUpdate, 
  validationErrors = {} 
}: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state for validation errors (from blur events)
  const [errors, setErrors] = useState<{
    serviceName?: string;
    description?: string;
    budget?: string;
    deliveryDays?: string;
  }>({});

  // Merge validation errors from parent with local errors
  const allErrors = { ...validationErrors, ...errors };

  // ============================================
  // Validation Handlers
  // ============================================

  const handleServiceNameBlur = () => {
    const result = serviceNameSchema.safeParse(formData.serviceName);
    if (!result.success) {
      setErrors((prev) => ({ 
        ...prev, 
        serviceName: result.error.issues[0]?.message 
      }));
    } else {
      setErrors((prev) => ({ ...prev, serviceName: undefined }));
    }
  };

  const handleDescriptionBlur = () => {
    const result = descriptionSchema.safeParse(formData.description);
    if (!result.success) {
      setErrors((prev) => ({ 
        ...prev, 
        description: result.error.issues[0]?.message 
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleBudgetBlur = () => {
    const result = budgetSchema.safeParse(formData.budget);
    if (!result.success) {
      setErrors((prev) => ({ 
        ...prev, 
        budget: result.error.issues[0]?.message 
      }));
    } else {
      setErrors((prev) => ({ ...prev, budget: undefined }));
    }
  };

  const handleDeliveryDaysBlur = () => {
    // Only validate delivery days for fixed-price services
    if (formData.paymentType === 'fixed') {
      const result = deliveryDaysSchema.safeParse(formData.deliveryDays);
      if (!result.success) {
        setErrors((prev) => ({ 
          ...prev, 
          deliveryDays: result.error.issues[0]?.message 
        }));
      } else if (formData.deliveryDays < 1 || formData.deliveryDays > 365) {
        setErrors((prev) => ({ 
          ...prev, 
          deliveryDays: 'Delivery days must be between 1 and 365 for fixed-price services' 
        }));
      } else {
        setErrors((prev) => ({ ...prev, deliveryDays: undefined }));
      }
    } else {
      // Clear error for hourly services
      setErrors((prev) => ({ ...prev, deliveryDays: undefined }));
    }
  };

  // ============================================
  // File Upload Handlers
  // ============================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const currentFiles = formData.attachments;
    
    // Check if adding new files would exceed the max file count
    if (currentFiles.length + newFiles.length > MAX_FILES) {
      alert(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    const validFiles: File[] = [];
    let totalSize = currentFiles.reduce((sum, file) => sum + file.size, 0);

    for (const file of newFiles) {
      if (totalSize + file.size <= MAX_FILE_SIZE) {
        validFiles.push(file);
        totalSize += file.size;
      } else {
        alert(`Cannot upload ${file.name}. Total file size exceeds 25MB.`);
        break;
      }
    }

    if (validFiles.length > 0) {
      onUpdate({ attachments: [...currentFiles, ...validFiles] });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    onUpdate({ attachments: newAttachments });
  };

  const totalSize = formData.attachments.reduce(
    (sum, file) => sum + file.size,
    0
  );

  // ============================================
  // Render
  // ============================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Basic Service Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell clients about your service and what you can offer
        </p>
      </div>

      {/* Service Name */}
      <div className="space-y-2">
        <Label htmlFor="serviceName">
          Service Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="serviceName"
          value={formData.serviceName}
          onChange={(e) => {
            onUpdate({ serviceName: e.target.value });
            // Clear error when user starts typing
            if (allErrors.serviceName) {
              setErrors((prev) => ({ ...prev, serviceName: undefined }));
            }
          }}
          onBlur={handleServiceNameBlur}
          placeholder="e.g. I will build a modern e-commerce website with React"
          className={`focus-visible:ring-[#F45A0B] ${
            allErrors.serviceName ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          aria-label="Service name"
          aria-describedby={allErrors.serviceName ? "serviceName-error" : "serviceName-hint"}
        />
        {allErrors.serviceName && (
          <p id="serviceName-error" className="text-sm text-red-500">
            {allErrors.serviceName}
          </p>
        )}
        {!allErrors.serviceName && (
          <p id="serviceName-hint" className="text-sm text-gray-500">
            {formData.serviceName.length}/200 characters (minimum 10)
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => {
            onUpdate({ description: e.target.value });
            // Clear error when user starts typing
            if (allErrors.description) {
              setErrors((prev) => ({ ...prev, description: undefined }));
            }
          }}
          onBlur={handleDescriptionBlur}
          placeholder="Describe your service in detail. What will you deliver? What makes your service unique? What experience do you bring?..."
          rows={6}
          className={`focus-visible:ring-[#F45A0B] ${
            allErrors.description ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          aria-label="Service description"
          aria-describedby={allErrors.description ? "description-error" : "description-hint"}
        />
        {allErrors.description && (
          <p id="description-error" className="text-sm text-red-500">
            {allErrors.description}
          </p>
        )}
        {!allErrors.description && (
          <p id="description-hint" className="text-sm text-gray-500">
            {formData.description.length}/5000 characters (minimum 50)
          </p>
        )}
      </div>

      {/* Payment Type and Experience Level */}
      <div className="grid grid-cols-2 gap-4">
        {/* Payment Type */}
        <div className="space-y-2">
          <Label htmlFor="paymentType">
            Payment Type <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.paymentType}
            onValueChange={(value: 'fixed' | 'hourly') => {
              onUpdate({ paymentType: value });
              // Reset delivery days when switching to hourly
              if (value === 'hourly') {
                onUpdate({ paymentType: value, deliveryDays: 0 });
                setErrors((prev) => ({ ...prev, deliveryDays: undefined }));
              } else {
                // Set default delivery days for fixed
                onUpdate({ paymentType: value, deliveryDays: formData.deliveryDays || 7 });
              }
            }}
          >
            <SelectTrigger 
              id="paymentType"
              className="focus:ring-[#F45A0B] w-full"
              aria-label="Payment type"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Price</SelectItem>
              <SelectItem value="hourly">Hourly Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">
            Experience Level <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(value: 'beginner' | 'intermediate' | 'expert') =>
              onUpdate({ experienceLevel: value })
            }
          >
            <SelectTrigger 
              id="experienceLevel"
              className="focus:ring-[#F45A0B] w-full"
              aria-label="Experience level"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">
                <div className="flex flex-col">
                  <span className="font-medium">Beginner</span>
                  <span className="text-xs text-gray-500">Entry-level freelancers</span>
                </div>
              </SelectItem>
              <SelectItem value="intermediate">
                <div className="flex flex-col">
                  <span className="font-medium">Intermediate</span>
                  <span className="text-xs text-gray-500">Mid-level freelancers</span>
                </div>
              </SelectItem>
              <SelectItem value="expert">
                <div className="flex flex-col">
                  <span className="font-medium">Expert</span>
                  <span className="text-xs text-gray-500">Senior-level freelancers</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Delivery Days - Only for Fixed Price services */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          formData.paymentType === "fixed" 
            ? "max-h-40 opacity-100" 
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          <Label htmlFor="deliveryDays">
            Delivery Days {formData.paymentType === "fixed" && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id="deliveryDays"
            type="number"
            min="1"
            max="365"
            value={formData.deliveryDays || ""}
            onChange={(e) => {
              onUpdate({ deliveryDays: Number(e.target.value) });
              // Clear error when user starts typing
              if (allErrors.deliveryDays) {
                setErrors((prev) => ({ ...prev, deliveryDays: undefined }));
              }
            }}
            onBlur={handleDeliveryDaysBlur}
            placeholder="7"
            className={`focus-visible:ring-[#F45A0B] ${
              allErrors.deliveryDays && formData.paymentType === "fixed" 
                ? "border-red-500 focus-visible:ring-red-500" 
                : ""
            }`}
            disabled={formData.paymentType !== "fixed"}
            required={formData.paymentType === "fixed"}
            aria-label="Delivery days"
            aria-describedby={allErrors.deliveryDays ? "deliveryDays-error" : "deliveryDays-hint"}
          />
          {allErrors.deliveryDays && formData.paymentType === "fixed" && (
            <p id="deliveryDays-error" className="text-sm text-red-500">
              {allErrors.deliveryDays}
            </p>
          )}
          {!allErrors.deliveryDays && formData.paymentType === "fixed" && (
            <p id="deliveryDays-hint" className="text-sm text-gray-500">
              How many days do you need to complete this service? (1-365 days)
            </p>
          )}
        </div>
      </div>

      {/* Budget Range - Same for both Fixed and Hourly */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budgetMin">
              Minimum Budget (PHP) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="budgetMin"
              type="number"
              min="0"
              value={formData.budget.min || ""}
              onChange={(e) => {
                onUpdate({
                  budget: { ...formData.budget, min: Number(e.target.value) },
                });
                // Clear error when user starts typing
                if (allErrors.budget) {
                  setErrors((prev) => ({ ...prev, budget: undefined }));
                }
              }}
              onBlur={handleBudgetBlur}
              placeholder="500"
              className={`focus-visible:ring-[#F45A0B] ${
                allErrors.budget ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              aria-label="Minimum budget"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budgetMax">
              Maximum Budget (PHP) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="budgetMax"
              type="number"
              min="0"
              value={formData.budget.max || ""}
              onChange={(e) => {
                onUpdate({
                  budget: { ...formData.budget, max: Number(e.target.value) },
                });
                // Clear error when user starts typing
                if (allErrors.budget) {
                  setErrors((prev) => ({ ...prev, budget: undefined }));
                }
              }}
              onBlur={handleBudgetBlur}
              placeholder="1000"
              className={`focus-visible:ring-[#F45A0B] ${
                allErrors.budget ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              aria-label="Maximum budget"
            />
          </div>
        </div>
        {allErrors.budget && (
          <p className="text-sm text-red-500">{allErrors.budget}</p>
        )}
        {!allErrors.budget && (
          <p className="text-sm text-gray-500">
            {formData.paymentType === "fixed" 
              ? "Set your service budget range" 
              : "Set your hourly rate range"}
          </p>
        )}
      </div>

      {/* File Attachments */}
      <div className="space-y-2">
        <Label>Additional Files (Optional)</Label>
        <p className="text-sm text-gray-500 mb-2">
          Upload portfolio samples or files that showcase your work (Max {MAX_FILES} files, 25 MB total)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
          aria-label="Upload files"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={formData.attachments.length >= MAX_FILES}
          className="w-full border-dashed border-2 h-32 flex flex-col items-center justify-center gap-2 hover:border-[#F45A0B] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formData.attachments.length >= MAX_FILES 
              ? `Maximum ${MAX_FILES} files reached` 
              : "Click to upload files"}
          </span>
          <span className="text-xs text-gray-500">
            PDF, DOC, TXT, Images, ZIP (Max 25MB)
          </span>
        </Button>

        {/* Uploaded Files List */}
        {formData.attachments.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Uploaded Files ({formData.attachments.length}/{MAX_FILES})
              </span>
              <span className="text-gray-500">
                {formatFileSize(totalSize)} / 25 MB
              </span>
            </div>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                    className="flex-shrink-0 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
