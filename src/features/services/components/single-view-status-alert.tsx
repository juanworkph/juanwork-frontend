"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SingleViewStatusAlertProps {
  status: "pending" | "declined" | "draft" | "active" | "paused";
}

export const SingleViewStatusAlert = ({
  status,
}: SingleViewStatusAlertProps) => {
  if (status === "active") {
    return null;
  }

  const alertConfig = {
    pending: {
      className:
        "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10",
      iconClassName: "h-4 w-4 text-yellow-600 dark:text-yellow-400",
      textClassName: "text-yellow-800 dark:text-yellow-200",
      message:
        "Your service is currently under review. This usually takes 24-48 hours. You'll be notified once it's approved.",
    },
    declined: {
      className:
        "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10",
      iconClassName: "h-4 w-4 text-red-600 dark:text-red-400",
      textClassName: "text-red-800 dark:text-red-200",
      message:
        "Your service was declined. Please review our guidelines and make necessary changes before resubmitting.",
    },
    draft: {
      className:
        "border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20",
      iconClassName: "h-4 w-4 text-indigo-600 dark:text-indigo-400",
      textClassName: "text-indigo-600 dark:text-indigo-400",
      message:
        "This service is saved as a draft. Complete and submit it to make it visible to clients.",
    },
    paused: {
      className:
        "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10",
      iconClassName: "h-4 w-4 text-gray-600 dark:text-gray-400",
      textClassName: "text-gray-800 dark:text-gray-200",
      message: "This service is currently paused and not visible to clients.",
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
