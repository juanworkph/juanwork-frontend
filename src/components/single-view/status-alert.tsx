"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SingleViewStatusAlertProps {
  status:
    | "pending"
    | "declined"
    | "draft"
    | "active"
    | "paused"
    | "completed"
    | "cancelled";
  userType?: "freelancer" | "client";
}

export const SingleViewStatusAlert = ({
  status,
  userType = "freelancer",
}: SingleViewStatusAlertProps) => {
  // Only show active alert for clients (owners), not for freelancers viewing
  if (status === "active" && userType === "freelancer") {
    return null;
  }

  const isFreelancer = userType === "freelancer";

  const alertConfig = {
    active: {
      className:
        "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10",
      iconClassName: "h-4 w-4 text-green-600 dark:text-green-400",
      textClassName: "text-green-800 dark:text-green-200",
      message: isFreelancer
        ? "This service is active."
        : "Your project is active and receiving bids. Review proposals to find the best talent.",
    },
    pending: {
      className:
        "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10",
      iconClassName: "h-4 w-4 text-yellow-600 dark:text-yellow-400",
      textClassName: "text-yellow-800 dark:text-yellow-200",
      message: isFreelancer
        ? "Your service is currently under review. This usually takes 24-48 hours. You'll be notified once it's approved."
        : "This project is currently under review and is not yet visible to freelancers.",
    },
    declined: {
      className:
        "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10",
      iconClassName: "h-4 w-4 text-red-600 dark:text-red-400",
      textClassName: "text-red-800 dark:text-red-200",
      message: isFreelancer
        ? "Your service was declined. Please review our guidelines and make necessary changes before resubmitting."
        : "This project was declined. Please review guidelines and edit to resubmit.",
    },
    draft: {
      className:
        "border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20",
      iconClassName: "h-4 w-4 text-indigo-600 dark:text-indigo-400",
      textClassName: "text-indigo-600 dark:text-indigo-400",
      message: isFreelancer
        ? "This service is saved as a draft. Complete and submit it to make it visible to clients."
        : "This project is saved as a draft. Complete and publish it to start receiving bids.",
    },
    paused: {
      className:
        "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10",
      iconClassName: "h-4 w-4 text-gray-600 dark:text-gray-400",
      textClassName: "text-gray-800 dark:text-gray-200",
      message: isFreelancer
        ? "This service is currently paused and not visible to clients."
        : "This project is paused and not accepting new bids.",
    },
    completed: {
      className:
        "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10",
      iconClassName: "h-4 w-4 text-purple-600 dark:text-purple-400",
      textClassName: "text-purple-800 dark:text-purple-200",
      message: isFreelancer
        ? "This project has been completed."
        : "This project has been completed successfully! Don't forget to leave a review.",
    },
    cancelled: {
      className:
        "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10",
      iconClassName: "h-4 w-4 text-gray-600 dark:text-gray-400",
      textClassName: "text-gray-800 dark:text-gray-200",
      message: isFreelancer
        ? "This project was cancelled."
        : "This project has been cancelled and is no longer accepting bids.",
    },
  };

  const config = alertConfig[status];
  if (!config) return null;

  return (
    <Alert className={config.className}>
      <AlertCircle className={config.iconClassName} />
      <AlertDescription className={config.textClassName}>
        {config.message}
      </AlertDescription>
    </Alert>
  );
};
