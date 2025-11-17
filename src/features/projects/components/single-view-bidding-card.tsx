"use client";

import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import { Upload, X, FileText, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  type BidFormData,
  type Bid,
  validateBid,
  defaultBidValidationRules,
  formatFileSize,
  getBidStatusColor,
  getBidStatusLabel,
} from "../schema/bidding-data";
import type { ProjectDetails } from "../schema/projects-data";

interface SingleViewBiddingCardProps {
  project: ProjectDetails;
  existingBid?: Bid;
  onSubmit: (bid: BidFormData) => Promise<void>;
}

export const SingleViewBiddingCard = ({
  project,
  existingBid,
  onSubmit,
}: SingleViewBiddingCardProps) => {
  // Form state
  const [bidAmount, setBidAmount] = useState<string>(
    existingBid?.bidAmount.toString() || ""
  );
  const [deliveryDays, setDeliveryDays] = useState<string>(
    existingBid?.deliveryDays.toString() || ""
  );
  const [coverLetter, setCoverLetter] = useState<string>(
    existingBid?.coverLetter || ""
  );
  const [attachments, setAttachments] = useState<File[]>([]);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(!existingBid);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      setTouched({
        bidAmount: true,
        deliveryDays: true,
        coverLetter: true,
        attachments: true,
      });

      // Prepare form data
      const formData: BidFormData = {
        projectId: project.id,
        bidAmount: parseFloat(bidAmount) || 0,
        deliveryDays: parseInt(deliveryDays) || 0,
        coverLetter: coverLetter.trim(),
        attachments,
      };

      // Validate
      const validation = validateBid(formData, defaultBidValidationRules);

      if (!validation.valid) {
        setErrors(validation.errors);
        toast.error("Please fix the errors before submitting");
        return;
      }

      // Clear errors
      setErrors({});

      // Submit
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        toast.success(
          existingBid ? "Bid updated successfully" : "Bid submitted successfully"
        );
        setIsEditing(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit bid"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      bidAmount,
      deliveryDays,
      coverLetter,
      attachments,
      project.id,
      existingBid,
      onSubmit,
    ]
  );

  // Real-time validation function
  const validateForm = useCallback(() => {
    const formData: BidFormData = {
      projectId: project.id,
      bidAmount: parseFloat(bidAmount) || 0,
      deliveryDays: parseInt(deliveryDays) || 0,
      coverLetter: coverLetter.trim(),
      attachments,
    };

    const validation = validateBid(formData, defaultBidValidationRules);
    setErrors(validation.errors);
    return validation.valid;
  }, [bidAmount, deliveryDays, coverLetter, attachments, project.id]);

  // Handle field blur for validation
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateForm();
    },
    [validateForm]
  );

  // Handle field change with real-time validation
  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      // Update field value
      switch (field) {
        case "bidAmount":
          setBidAmount(value);
          break;
        case "deliveryDays":
          setDeliveryDays(value);
          break;
        case "coverLetter":
          setCoverLetter(value);
          break;
      }

      // If field has been touched, validate in real-time
      if (touched[field]) {
        setTimeout(() => {
          validateForm();
        }, 0);
      }
    },
    [touched, validateForm]
  );

  // Handle file upload
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      // Validate file count
      if (
        files.length + attachments.length >
        defaultBidValidationRules.maxAttachments
      ) {
        toast.error(
          `Maximum ${defaultBidValidationRules.maxAttachments} files allowed`
        );
        return;
      }

      // Validate file sizes
      const oversizedFiles = files.filter(
        (file) => file.size > defaultBidValidationRules.maxAttachmentSize
      );
      if (oversizedFiles.length > 0) {
        const maxSizeMB =
          defaultBidValidationRules.maxAttachmentSize / (1024 * 1024);
        toast.error(`Some files exceed the maximum size of ${maxSizeMB}MB`);
        return;
      }

      setAttachments((prev) => {
        const newAttachments = [...prev, ...files];
        setTimeout(() => validateForm(), 0);
        return newAttachments;
      });
      e.target.value = "";
    },
    [attachments, validateForm]
  );

  // Remove file
  const handleRemoveFile = useCallback(
    (index: number) => {
      setAttachments((prev) => {
        const newAttachments = prev.filter((_, i) => i !== index);
        setTimeout(() => validateForm(), 0);
        return newAttachments;
      });
    },
    [validateForm]
  );

  // Handle drag and drop
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);

      // Validate file count
      if (
        files.length + attachments.length >
        defaultBidValidationRules.maxAttachments
      ) {
        toast.error(
          `Maximum ${defaultBidValidationRules.maxAttachments} files allowed`
        );
        return;
      }

      // Validate file sizes
      const oversizedFiles = files.filter(
        (file) => file.size > defaultBidValidationRules.maxAttachmentSize
      );
      if (oversizedFiles.length > 0) {
        const maxSizeMB =
          defaultBidValidationRules.maxAttachmentSize / (1024 * 1024);
        toast.error(`Some files exceed the maximum size of ${maxSizeMB}MB`);
        return;
      }

      setAttachments((prev) => {
        const newAttachments = [...prev, ...files];
        setTimeout(() => validateForm(), 0);
        return newAttachments;
      });
    },
    [attachments, validateForm]
  );

  // Handle withdraw bid
  const handleWithdraw = useCallback(async () => {
    if (!existingBid) return;

    if (
      !confirm(
        "Are you sure you want to withdraw your bid? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // TODO: Implement withdraw API call
      toast.success("Bid withdrawn successfully");
    } catch (error) {
      toast.error("Failed to withdraw bid");
    }
  }, [existingBid]);

  // Calculate character count
  const characterCount = coverLetter.trim().length;
  const minCharacters = defaultBidValidationRules.minCoverLetterLength;

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">
          {existingBid ? "Your Bid" : "Bid on this Project"}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {existingBid
            ? "View or edit your submitted bid"
            : "Submit your bid to work on this project"}
        </CardDescription>
      </CardHeader>

      {existingBid && !isEditing ? (
        // Display existing bid
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Status</p>
              <Badge className={`${getBidStatusColor(existingBid.status)} text-xs sm:text-sm`}>
                {getBidStatusLabel(existingBid.status)}
              </Badge>
            </div>
            <div className="xs:text-right">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Bid Amount</p>
              <p className="text-base sm:text-lg font-semibold">
                ${existingBid.bidAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Delivery Time</p>
            <p className="text-sm sm:text-base font-medium">
              {existingBid.deliveryDays} day
              {existingBid.deliveryDays !== 1 ? "s" : ""}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Cover Letter</p>
            <p className="text-xs sm:text-sm whitespace-pre-wrap">
              {existingBid.coverLetter}
            </p>
          </div>

          {existingBid.attachments && existingBid.attachments.length > 0 && (
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">Attachments</p>
              <div className="space-y-2">
                {existingBid.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FileText className="size-3.5 sm:size-4 text-muted-foreground flex-shrink-0" />
                    <span className="flex-1 truncate">{attachment.name}</span>
                    <span className="text-muted-foreground flex-shrink-0">
                      {formatFileSize(attachment.size)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground pt-2 border-t">
            Submitted on{" "}
            {new Date(existingBid.submittedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardContent>
      ) : (
        // Edit/Create form
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            {/* Bid Amount */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="bidAmount" className="text-xs sm:text-sm">
                Bid Amount <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="bidAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => handleFieldChange("bidAmount", e.target.value)}
                  onBlur={() => handleBlur("bidAmount")}
                  className="pl-6 sm:pl-7 text-sm sm:text-base h-9 sm:h-10"
                  aria-invalid={touched.bidAmount && !!errors.bidAmount}
                  disabled={isSubmitting}
                />
              </div>
              {touched.bidAmount && errors.bidAmount && (
                <p className="text-xs sm:text-sm text-destructive">{errors.bidAmount}</p>
              )}
              {project.budget.type === "fixed" && (
                <p className="text-xs text-muted-foreground">
                  Project budget: ${project.budget.amount.toLocaleString()}
                </p>
              )}
            </div>

            {/* Delivery Days */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="deliveryDays" className="text-xs sm:text-sm">
                Delivery Time <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="deliveryDays"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter delivery time"
                  value={deliveryDays}
                  onChange={(e) => handleFieldChange("deliveryDays", e.target.value)}
                  onBlur={() => handleBlur("deliveryDays")}
                  className="pr-12 text-sm sm:text-base h-9 sm:h-10"
                  aria-invalid={touched.deliveryDays && !!errors.deliveryDays}
                  disabled={isSubmitting}
                />
                <span className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
                  days
                </span>
              </div>
              {touched.deliveryDays && errors.deliveryDays && (
                <p className="text-xs sm:text-sm text-destructive">
                  {errors.deliveryDays}
                </p>
              )}
            </div>

            {/* Cover Letter */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="coverLetter" className="text-xs sm:text-sm">
                  Cover Letter <span className="text-destructive">*</span>
                </Label>
                <span
                  className={`text-xs ${
                    characterCount < minCharacters
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {characterCount} / {minCharacters} min
                </span>
              </div>
              <Textarea
                id="coverLetter"
                placeholder="Describe why you're the best fit for this project..."
                value={coverLetter}
                onChange={(e) => handleFieldChange("coverLetter", e.target.value)}
                onBlur={() => handleBlur("coverLetter")}
                rows={5}
                className="text-xs sm:text-sm resize-none"
                aria-invalid={touched.coverLetter && !!errors.coverLetter}
                disabled={isSubmitting}
              />
              {touched.coverLetter && errors.coverLetter && (
                <p className="text-xs sm:text-sm text-destructive">{errors.coverLetter}</p>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="attachments" className="text-xs sm:text-sm">
                Attachments (Optional)
              </Label>
              <div className="space-y-2">
                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`relative rounded-lg border-2 border-dashed p-4 sm:p-6 transition-colors ${
                    isDragging
                      ? "border-primary bg-accent"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  } ${
                    isSubmitting ||
                    attachments.length >=
                      defaultBidValidationRules.maxAttachments
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (
                      !isSubmitting &&
                      attachments.length <
                        defaultBidValidationRules.maxAttachments
                    ) {
                      document.getElementById("attachments")?.click();
                    }
                  }}
                >
                  <Input
                    id="attachments"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={
                      isSubmitting ||
                      attachments.length >=
                        defaultBidValidationRules.maxAttachments
                    }
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center">
                    <Upload
                      className={`size-6 sm:size-8 ${
                        isDragging ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">
                        {isDragging
                          ? "Drop files here"
                          : "Drag and drop files here"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max {defaultBidValidationRules.maxAttachments} files, 10MB
                      each
                    </p>
                  </div>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-1.5 sm:space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <FileText className="size-3.5 sm:size-4 text-muted-foreground flex-shrink-0" />
                        <span className="flex-1 text-xs sm:text-sm truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => handleRemoveFile(index)}
                          disabled={isSubmitting}
                        >
                          <X className="size-3.5 sm:size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {touched.attachments && errors.attachments && (
                <p className="text-xs sm:text-sm text-destructive">{errors.attachments}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col xs:flex-row gap-2 p-4 sm:p-6 pt-0">
            {existingBid && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSubmitting}
                  className="w-full xs:w-auto text-xs sm:text-sm h-9 sm:h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleWithdraw}
                  disabled={isSubmitting}
                  className="w-full xs:w-auto text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Trash2 className="size-3.5 sm:size-4" />
                  <span className="ml-2">Withdraw</span>
                </Button>
              </>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full xs:w-auto xs:ml-auto text-xs sm:text-sm h-9 sm:h-10"
            >
              {isSubmitting
                ? "Submitting..."
                : existingBid
                ? "Update Bid"
                : "Submit Bid"}
            </Button>
          </CardFooter>
        </form>
      )}

      {existingBid && !isEditing && existingBid.status === "pending" && (
        <CardFooter className="flex flex-col xs:flex-row gap-2 border-t p-4 sm:p-6">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
          >
            <Pencil className="size-3.5 sm:size-4" />
            <span className="ml-2">Edit Bid</span>
          </Button>
          <Button
            variant="destructive"
            onClick={handleWithdraw}
            className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
          >
            <Trash2 className="size-3.5 sm:size-4" />
            <span className="ml-2">Withdraw</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
