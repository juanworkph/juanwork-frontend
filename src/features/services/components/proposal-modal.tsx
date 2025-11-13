"use client";

import React, { useState, useRef, useEffect } from "react";
import { ServiceDetailsData } from "@/features/services/schema";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetailsData;
  selectedPackage: "basic" | "standard" | "premium" | null;
  onSubmit: (formData: ProposalFormData) => Promise<void>;
}

export interface ProposalFormData {
  message: string;
  budget?: number;
  timeline?: string;
  attachments?: File[];
}

const MAX_MESSAGE_LENGTH = 1000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

export const ProposalModal = ({
  isOpen,
  onClose,
  service,
  selectedPackage,
  onSubmit,
}: ProposalModalProps) => {
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Get selected package details
  const getSelectedPackageDetails = () => {
    if (service.pricing.type === "package" && selectedPackage && service.packageDetails) {
      return service.packageDetails[selectedPackage];
    }
    return null;
  };

  const packageDetails = getSelectedPackageDetails();

  // Get price to display
  const getPrice = () => {
    if (service.pricing.type === "package" && packageDetails) {
      return packageDetails.price;
    }
    if (service.pricing.type === "fixed") {
      return service.pricing.starting;
    }
    if (service.pricing.type === "hourly" && service.pricing.hourlyRate) {
      return service.pricing.hourlyRate;
    }
    return service.pricing.starting;
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage("");
      setBudget("");
      setTimeline("");
      setAttachments([]);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or less`;
    }

    if (budget && (isNaN(Number(budget)) || Number(budget) <= 0)) {
      newErrors.budget = "Budget must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];
    const newErrors: string[] = [];

    Array.from(files).forEach((file) => {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        newErrors.push(`${file.name}: Invalid file type`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: File size exceeds 10MB`);
        return;
      }

      newFiles.push(file);
    });

    if (newErrors.length > 0) {
      setErrors({ ...errors, attachments: newErrors.join(", ") });
    } else {
      setErrors({ ...errors, attachments: "" });
    }

    setAttachments((prev) => [...prev, ...newFiles]);
  };

  // Handle drag and drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Remove attachment
  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData: ProposalFormData = {
        message: message.trim(),
        budget: budget ? Number(budget) : undefined,
        timeline: timeline.trim() || undefined,
        attachments: attachments.length > 0 ? attachments : undefined,
      };

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      setErrors({
        submit: "Failed to submit proposal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2
            id="proposal-modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            Submit Proposal
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Service Summary */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {service.serviceName}
              </h3>
              {packageDetails && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {packageDetails.name} Package
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#F45A0B]">
                ${getPrice().toLocaleString()}
              </p>
              {service.pricing.type === "hourly" && (
                <p className="text-xs text-gray-500 dark:text-gray-400">/hour</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project requirements, timeline, and any specific details..."
              rows={6}
              maxLength={MAX_MESSAGE_LENGTH}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F45A0B] focus:border-transparent resize-none ${
                errors.message
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.message && (
                <p id="message-error" className="text-sm text-red-500">
                  {errors.message}
                </p>
              )}
              <p
                className={`text-xs ml-auto ${
                  message.length > MAX_MESSAGE_LENGTH * 0.9
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {message.length}/{MAX_MESSAGE_LENGTH}
              </p>
            </div>
          </div>

          {/* Budget Field (Optional) */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Budget (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                min="0"
                step="0.01"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F45A0B] focus:border-transparent ${
                  errors.budget
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              />
            </div>
            {errors.budget && (
              <p id="budget-error" className="text-sm text-red-500 mt-1">
                {errors.budget}
              </p>
            )}
          </div>

          {/* Timeline Field (Optional) */}
          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Timeline (Optional)
            </label>
            <input
              type="text"
              id="timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g., 2 weeks, 1 month"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F45A0B] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attachments (Optional)
            </label>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? "border-[#F45A0B] bg-orange-50 dark:bg-orange-900/10"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                aria-label="Upload files"
              />
              <svg
                className="w-12 h-12 mx-auto mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Drag and drop files here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#F45A0B] hover:underline font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
              </p>
            </div>
            {errors.attachments && (
              <p className="text-sm text-red-500 mt-1">{errors.attachments}</p>
            )}

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2"
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Proposal"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
