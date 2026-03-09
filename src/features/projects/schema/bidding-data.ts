// Bidding data schema for project proposals

export type BidStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export interface BidFormData {
  projectId: string;
  bidAmount: number;
  deliveryDays?: number;
  coverLetter: string;
  attachments: File[];
}

export interface BidAttachment {
  id: string;
  name: string;
  size: number;
  url: string;
}

export interface Bid {
  id: string;
  projectId: string;
  freelancerId: string;
  bidAmount: number;
  deliveryDays?: number;
  coverLetter: string;
  attachments: BidAttachment[];
  status: BidStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface BidValidationRules {
  minBidAmount: number;
  maxBidAmount: number;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  minCoverLetterLength: number;
  maxAttachments: number;
  maxAttachmentSize: number; // in bytes
}

export interface BidValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// Default validation rules
export const defaultBidValidationRules: BidValidationRules = {
  minBidAmount: 5,
  maxBidAmount: 100000,
  minDeliveryDays: 1,
  maxDeliveryDays: 365,
  minCoverLetterLength: 100,
  maxAttachments: 5,
  maxAttachmentSize: 10 * 1024 * 1024, // 10MB
};

// Validation function
export const validateBid = (
  data: BidFormData,
  paymentType: "fixed" | "hourly" = "fixed",
  rules: BidValidationRules = defaultBidValidationRules,
): BidValidationResult => {
  const errors: Record<string, string> = {};

  // Validate bid amount
  if (!data.bidAmount || data.bidAmount <= 0) {
    errors.bidAmount = "Bid amount is required and must be greater than 0";
  } else if (data.bidAmount < rules.minBidAmount) {
    errors.bidAmount = `Minimum bid is $${rules.minBidAmount}`;
  } else if (data.bidAmount > rules.maxBidAmount) {
    errors.bidAmount = `Maximum bid is $${rules.maxBidAmount}`;
  }

  // Validate delivery days (only for fixed-price projects)
  if (paymentType === "fixed") {
    if (!data.deliveryDays || data.deliveryDays <= 0) {
      errors.deliveryDays =
        "Delivery time is required and must be greater than 0";
    } else if (data.deliveryDays < rules.minDeliveryDays) {
      errors.deliveryDays = `Minimum delivery time is ${rules.minDeliveryDays} day${
        rules.minDeliveryDays > 1 ? "s" : ""
      }`;
    } else if (data.deliveryDays > rules.maxDeliveryDays) {
      errors.deliveryDays = `Maximum delivery time is ${rules.maxDeliveryDays} days`;
    } else if (!Number.isInteger(data.deliveryDays)) {
      errors.deliveryDays = "Delivery time must be a whole number";
    }
  }

  // Validate cover letter
  if (!data.coverLetter || data.coverLetter.trim().length === 0) {
    errors.coverLetter = "Cover letter is required";
  } else if (data.coverLetter.trim().length < rules.minCoverLetterLength) {
    errors.coverLetter = `Cover letter must be at least ${rules.minCoverLetterLength} characters (currently ${data.coverLetter.trim().length})`;
  }

  // Validate attachments
  if (data.attachments && data.attachments.length > rules.maxAttachments) {
    errors.attachments = `Maximum ${rules.maxAttachments} attachments allowed`;
  }

  // Validate individual attachment sizes
  if (data.attachments && data.attachments.length > 0) {
    const oversizedFiles = data.attachments.filter(
      (file) => file.size > rules.maxAttachmentSize,
    );
    if (oversizedFiles.length > 0) {
      const maxSizeMB = rules.maxAttachmentSize / (1024 * 1024);
      errors.attachments = `Some files exceed the maximum size of ${maxSizeMB}MB`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Helper function to get bid status color
export const getBidStatusColor = (status: BidStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "accepted":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "rejected":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "withdrawn":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

// Helper function to get bid status label
export const getBidStatusLabel = (status: BidStatus): string => {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "withdrawn":
      return "Withdrawn";
    default:
      return status;
  }
};
