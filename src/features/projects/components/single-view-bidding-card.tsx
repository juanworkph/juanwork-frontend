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
  onSubmit: (bid: BidFormData) => Promise<void>;
}

export const SingleViewBiddingCard = ({
  project,
  existingBid,
  onSubmit,
}: SingleViewBiddingCardProps) => {
  // Form state
  const [bidAmount, setBidAmount] = useState<string>(
    existingBid?.bidAmount.toString() || "",
  );
  const [deliveryDays, setDeliveryDays] = useState<string>(
    existingBid?.deliveryDays.toString() || "",
  );
  const [coverLetter, setCoverLetter] = useState<string>(
    existingBid?.coverLetter || "",
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(!existingBid);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        attachments: [], // Removed attachments requirement
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
    [bidAmount, deliveryDays, coverLetter, project.id, existingBid, onSubmit],
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

    const validation = validateBid(formData, defaultBidValidationRules);
    setErrors(validation.errors);
    return validation.valid;
  }, [bidAmount, deliveryDays, coverLetter, project.id]);

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
    [touched, validateForm],
  );

  // Handle withdraw bid
  const handleWithdraw = useCallback(async () => {
    if (!existingBid) return;

    if (
      !confirm(
        "Are you sure you want to withdraw your bid? This action cannot be undone.",
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

  return (
    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1 text-card-foreground flex flex-row items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded-full"></span>
        {existingBid ? "Your Bid" : "Bid on this Project"}
      </h3>
      <p className="text-xs text-muted-foreground mb-6">
        {existingBid
          ? "View or edit your submitted bid"
          : "Place your bid to work on this project"}
      </p>

      {existingBid && !isEditing ? (
        // Display existing bid
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
                ${existingBid.bidAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Delivery Time</p>
            <p className="font-medium text-foreground">
              {existingBid.deliveryDays} Day
              {existingBid.deliveryDays > 1 ? "s" : ""}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Cover Letter</p>
            <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {existingBid.coverLetter}
            </div>
          </div>

          {existingBid.status === "pending" && (
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="flex-1 border-border hover:bg-muted"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="size-3.5 mr-2" />
                Edit Bid
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20"
                onClick={handleWithdraw}
              >
                <Trash2 className="size-3.5 mr-2" />
                Withdraw
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Edit/Create form
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

          {existingBid ? (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm"
              >
                {isSubmitting ? "Updating..." : "Update Bid"}
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit Bid"}
            </button>
          )}
        </form>
      )}
    </div>
  );
};
