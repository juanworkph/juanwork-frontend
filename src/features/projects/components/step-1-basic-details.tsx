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
import type { ProjectFormData } from "../schema/project-form.schema";
import { formatFileSize } from "../utils/format-helpers";
import {
  validateProjectName,
  validateDescription,
  validateBudget,
  validateDeliveryDays,
} from "../utils/project-form-validator";
import {
  projectNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
} from "../schema/project-form.schema";

interface Step1Props {
  formData: ProjectFormData;
  onUpdate: (data: Partial<ProjectFormData>) => void;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export function Step1BasicDetails({ formData, onUpdate }: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for validation errors
  const [errors, setErrors] = useState<{
    projectName?: string;
    description?: string;
    budget?: string;
    deliveryDays?: string;
  }>({});

  // Validation handlers
  const handleProjectNameBlur = () => {
    const result = validateProjectName(formData.projectName);
    setErrors((prev) => ({ ...prev, projectName: result.error }));
  };

  const handleDescriptionBlur = () => {
    const result = validateDescription(formData.description);
    setErrors((prev) => ({ ...prev, description: result.error }));
  };

  const handleBudgetBlur = () => {
    if (formData.projectType === "fixed") {
      const result = validateBudget(formData.budget.min, formData.budget.max);
      setErrors((prev) => ({ ...prev, budget: result.error }));
    } else {
      // Clear budget error for hourly rate
      setErrors((prev) => ({ ...prev, budget: undefined }));
    }
  };

  const handleDeliveryDaysBlur = () => {
    const result = validateDeliveryDays(formData.deliveryDays);
    setErrors((prev) => ({ ...prev, deliveryDays: result.error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    let totalSize = formData.attachments.reduce(
      (sum, file) => sum + file.size,
      0
    );

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
      onUpdate({ attachments: [...formData.attachments, ...validFiles] });
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Basic Project Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell freelancers about your project and what you need
        </p>
      </div>

      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="projectName">
          Project Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="projectName"
          value={formData.projectName}
          onChange={(e) => {
            onUpdate({ projectName: e.target.value });
            // Clear error when user starts typing
            if (errors.projectName) {
              setErrors((prev) => ({ ...prev, projectName: undefined }));
            }
          }}
          onBlur={handleProjectNameBlur}
          placeholder="e.g. Build a modern e-commerce website with React"
          className="focus-visible:ring-[#F45A0B]"
        />
        {errors.projectName && (
          <p className="text-sm text-red-500">{errors.projectName}</p>
        )}
        {!errors.projectName && (
          <p className="text-sm text-gray-500">
            10-200 characters
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
            if (errors.description) {
              setErrors((prev) => ({ ...prev, description: undefined }));
            }
          }}
          onBlur={handleDescriptionBlur}
          placeholder="Describe your project in detail. What do you need? What are the requirements? What are your expectations?..."
          rows={6}
          className="focus-visible:ring-[#F45A0B]"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
        {!errors.description && (
          <p className="text-sm text-gray-500">
            {formData.description.length} characters (50-5000 required)
          </p>
        )}
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <Label htmlFor="projectType">
          Project Type <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.projectType}
          onValueChange={(value: "fixed" | "hourly") =>
            onUpdate({ projectType: value })
          }
        >
          <SelectTrigger className="focus:ring-[#F45A0B]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">Fixed Price</SelectItem>
            <SelectItem value="hourly">Hourly Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Budget */}
      {formData.projectType === "fixed" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">
                Minimum Budget (USD) <span className="text-red-500">*</span>
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
                  if (errors.budget) {
                    setErrors((prev) => ({ ...prev, budget: undefined }));
                  }
                }}
                onBlur={handleBudgetBlur}
                placeholder="500"
                className="focus-visible:ring-[#F45A0B]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMax">
                Maximum Budget (USD) <span className="text-red-500">*</span>
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
                  if (errors.budget) {
                    setErrors((prev) => ({ ...prev, budget: undefined }));
                  }
                }}
                onBlur={handleBudgetBlur}
                placeholder="1000"
                className="focus-visible:ring-[#F45A0B]"
              />
            </div>
          </div>
          {errors.budget && (
            <p className="text-sm text-red-500">{errors.budget}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">
            Hourly Rate (USD) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="hourlyRate"
            type="number"
            min="0"
            value={formData.budget.hourlyRate || ""}
            onChange={(e) =>
              onUpdate({
                budget: {
                  ...formData.budget,
                  hourlyRate: Number(e.target.value),
                },
              })
            }
            placeholder="50"
            className="focus-visible:ring-[#F45A0B]"
          />
        </div>
      )}

      {/* Delivery Days */}
      <div className="space-y-2">
        <Label htmlFor="deliveryDays">
          Delivery Days <span className="text-red-500">*</span>
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
            if (errors.deliveryDays) {
              setErrors((prev) => ({ ...prev, deliveryDays: undefined }));
            }
          }}
          onBlur={handleDeliveryDaysBlur}
          placeholder="7"
          className="focus-visible:ring-[#F45A0B]"
        />
        {errors.deliveryDays && (
          <p className="text-sm text-red-500">{errors.deliveryDays}</p>
        )}
        {!errors.deliveryDays && (
          <p className="text-sm text-gray-500">
            How many days do you need to complete this project? (1-365 days)
          </p>
        )}
      </div>

      {/* File Attachments */}
      <div className="space-y-2">
        <Label>Additional Files (Optional)</Label>
        <p className="text-sm text-gray-500 mb-2">
          Upload requirements, mockups, or reference files for your project (Max
          25 MB total)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-dashed border-2 h-32 flex flex-col items-center justify-center gap-2 hover:border-[#F45A0B]"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload files
          </span>
          <span className="text-xs text-gray-500">
            PDF, DOC, TXT, Images, ZIP (Max 25MB)
          </span>
        </Button>

        {/* Uploaded Files */}
        {formData.attachments.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Uploaded Files ({formData.attachments.length})
              </span>
              <span className="text-gray-500">
                {formatFileSize(totalSize)} / 25 MB
              </span>
            </div>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
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
