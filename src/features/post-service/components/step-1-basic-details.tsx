import React, { useRef } from "react";
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
import { ServiceFormData, formatFileSize } from "../schema";

interface Step1Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export function Step1BasicDetails({ formData, onUpdate }: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          Basic Service Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your service to get started
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
          onChange={(e) => onUpdate({ projectName: e.target.value })}
          placeholder="e.g. Build a Modern E-commerce Website"
          className="focus-visible:ring-[#F45A0B]"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your project in detail. Include your requirements, expectations, and any specific features you need..."
          rows={6}
          className="focus-visible:ring-[#F45A0B]"
        />
        <p className="text-sm text-gray-500">
          {formData.description.length} characters
        </p>
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
              onChange={(e) =>
                onUpdate({
                  budget: { ...formData.budget, min: Number(e.target.value) },
                })
              }
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
              onChange={(e) =>
                onUpdate({
                  budget: { ...formData.budget, max: Number(e.target.value) },
                })
              }
              placeholder="1000"
              className="focus-visible:ring-[#F45A0B]"
            />
          </div>
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

      {/* File Attachments */}
      <div className="space-y-2">
        <Label>Additional Files (Optional)</Label>
        <p className="text-sm text-gray-500 mb-2">
          Upload files that might be helpful (Max 25 MB total)
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
