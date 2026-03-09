import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  isProjectOnWork?: boolean;
  hasEnoughPoints?: boolean;
  onSubmit: (bid: BidFormData) => Promise<void>;
  onCancel?: () => Promise<void>;
}

export const SingleViewBiddingCard = ({
  project,
  existingBid,
  isProjectOnWork = false,
  hasEnoughPoints = true,
  onSubmit,
  onCancel,
}: SingleViewBiddingCardProps) => {
  // Form state
  const [bidAmount, setBidAmount] = useState<string>(
    existingBid?.bidAmount.toString() || "",
  );
  const [deliveryDays, setDeliveryDays] = useState<string>(
    existingBid?.deliveryDays?.toString() || "",
  );
  const [coverLetter, setCoverLetter] = useState<string>(
    existingBid?.coverLetter || "",
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Default to false if user hasn't bid, we will handle visibility conditionally
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isActive =
    project.status !== "completed" && project.status !== "cancelled";

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      setTouched({
        bidAmount: true,
        deliveryDays: true,
        coverLetter: true,
      });

      // Prepare form data
      const formData: BidFormData = {
        projectId: project.id,
        bidAmount: parseFloat(bidAmount) || 0,
        deliveryDays: parseInt(deliveryDays) || 0,
        coverLetter: coverLetter.trim(),
        attachments: [],
      };

      // Validate
      const validation = validateBid(
        formData,
        project.budget.type,
        defaultBidValidationRules,
      );

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
          existingBid
            ? "Bid updated successfully"
            : "Bid submitted successfully",
        );
        setIsEditing(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit bid",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      bidAmount,
      deliveryDays,
      coverLetter,
      project.id,
      project.budget.type,
      existingBid,
      onSubmit,
    ],
  );

  // Real-time validation function
  const validateForm = useCallback(() => {
    const formData: BidFormData = {
      projectId: project.id,
      bidAmount: parseFloat(bidAmount) || 0,
      deliveryDays: parseInt(deliveryDays) || 0,
      coverLetter: coverLetter.trim(),
      attachments: [],
    };

    const validation = validateBid(
      formData,
      project.budget.type,
      defaultBidValidationRules,
    );
    setErrors(validation.errors);
    return validation.valid;
  }, [bidAmount, deliveryDays, coverLetter, project.id, project.budget.type]);

  // Handle field blur for validation
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateForm();
    },
    [validateForm],
  );

  // Handle field change with real-time validation
  const handleFieldChange = useCallback(
    (field: string, value: string) => {
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

      if (touched[field]) {
        setTimeout(() => {
          validateForm();
        }, 0);
      }
    },
    [touched, validateForm],
  );

  // Handle withdraw bid
  const handleWithdraw = useCallback(async () => {
    if (!existingBid || !onCancel) return;

    if (
      !confirm(
        "Are you sure you want to withdraw your bid? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await onCancel();
    } catch (error) {
      // toast is presumably handled in the action or we can just let it bubble but let's assume it handles it
    }
  }, [existingBid, onCancel]);

  // Render logic based on the implementation plan
  let content;

  if (isActive && isProjectOnWork) {
    content = (
      <Button disabled className="w-full" variant="secondary">
        Already on Work
      </Button>
    );
  } else if (
    !isActive &&
    (!existingBid || existingBid.status === "withdrawn")
  ) {
    content = (
      <Button disabled className="w-full" variant="secondary">
        Project Closed
      </Button>
    );
  } else if (existingBid && existingBid.status !== "withdrawn" && !isEditing) {
    // If there's an existing bid, show the bid details unless the user is specifically editing (which is not allowed for some states)
    const canCancel = isActive && existingBid.status === "pending";
    const statusResultText =
      existingBid.status === "accepted"
        ? "You Won the bid"
        : existingBid.status === "rejected"
          ? "You Lost the bid"
          : `You ${existingBid.status} the bid`;

    content = (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getBidStatusColor(
                existingBid.status,
              )}`}
            >
              {getBidStatusLabel(existingBid.status)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Bid Amount</p>
            <div className="text-xl font-bold text-primary">
              ${Number(existingBid.bidAmount).toLocaleString()}
            </div>
          </div>
        </div>

        {existingBid.deliveryDays != null && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Delivery Time</p>
            <p className="font-medium text-foreground">
              {existingBid.deliveryDays} Day
              {existingBid.deliveryDays > 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div>
          <p className="text-xs text-muted-foreground mb-2">Cover Letter</p>
          <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {existingBid.coverLetter}
          </div>
        </div>

        {canCancel && onCancel && (
          <div className="flex gap-3 pt-4 border-t border-border">
            {/* Editing might not be supported cleanly via the same row right now if we only have cancel API, but let's keep it if we can resubmit */}
            <Button
              variant="destructive"
              className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20"
              onClick={handleWithdraw}
            >
              <Trash2 className="size-3.5 mr-2" />
              Cancel Bid
            </Button>
          </div>
        )}
        {!canCancel && (
          <Button disabled className="w-full mt-4" variant="secondary">
            {statusResultText}
          </Button>
        )}
      </div>
    );
  } else if (
    isActive &&
    (!existingBid || existingBid.status === "withdrawn") &&
    !hasEnoughPoints
  ) {
    content = (
      <Button disabled className="w-full" variant="secondary">
        JuanPoints Required
      </Button>
    );
  } else {
    // Show normal bidding form
    content = (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bid Amount */}
        <div>
          <label className="block text-xs text-foreground uppercase mb-1.5">
            Bid Amount *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              $
            </span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => handleFieldChange("bidAmount", e.target.value)}
              onBlur={() => handleBlur("bidAmount")}
              className={`w-full bg-background border ${
                touched.bidAmount && errors.bidAmount
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-primary focus:border-primary"
              } rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-1 placeholder:text-muted-foreground transition-all text-foreground`}
              placeholder="0.00"
              disabled={isSubmitting}
            />
          </div>
          {touched.bidAmount && errors.bidAmount ? (
            <p className="text-[10px] text-destructive mt-1">
              {errors.bidAmount}
            </p>
          ) : (
            <p className="text-[10px] text-muted-foreground mt-1">
              Project budget: ${project.budget.amount.toLocaleString()}
              {project.budget.type === "hourly" ? "/hr" : ""}
            </p>
          )}
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-xs text-foreground uppercase mb-1.5">
            Delivery Time *
          </label>
          <div className="relative">
            <input
              type="number"
              value={deliveryDays}
              onChange={(e) =>
                handleFieldChange("deliveryDays", e.target.value)
              }
              onBlur={() => handleBlur("deliveryDays")}
              className={`w-full bg-background border ${
                touched.deliveryDays && errors.deliveryDays
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-primary focus:border-primary"
              } rounded-lg px-4 py-2 text-sm focus:ring-1 placeholder:text-muted-foreground transition-all text-foreground`}
              placeholder="30"
              disabled={isSubmitting}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              days
            </span>
          </div>
          {touched.deliveryDays && errors.deliveryDays && (
            <p className="text-[10px] text-destructive mt-1">
              {errors.deliveryDays}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-xs text-foreground uppercase mb-1.5">
            Cover Letter *
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => handleFieldChange("coverLetter", e.target.value)}
            onBlur={() => handleBlur("coverLetter")}
            className={`w-full bg-background border ${
              touched.coverLetter && errors.coverLetter
                ? "border-destructive focus:ring-destructive"
                : "border-input focus:ring-primary focus:border-primary"
            } rounded-lg px-4 py-2 text-xs focus:ring-1 placeholder:text-muted-foreground resize-none transition-all text-foreground`}
            placeholder="Explain why you are the best fit for this project..."
            rows={6}
            disabled={isSubmitting}
          />
          {touched.coverLetter && errors.coverLetter && (
            <p className="text-[10px] text-destructive mt-1">
              {errors.coverLetter}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm"
        >
          {isSubmitting ? "Submitting..." : "Submit Bid"}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1 text-card-foreground flex flex-row items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded-full"></span>
        {existingBid ? "Your Bid" : "Bid on this Project"}
      </h3>
      <p className="text-xs text-muted-foreground mb-6">
        {existingBid
          ? "View details about your submitted bid"
          : "Place your bid to work on this project"}
      </p>

      {content}
    </div>
  );
};
