import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: "default" | "destructive";
}

/**
 * ErrorState Component
 *
 * Displays error messages with optional retry functionality.
 * Used when API calls fail or other errors occur.
 *
 * Requirements:
 * - 13.2: Show error message when API fails
 * - 13.3: Add retry button for failed requests
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Error Loading Data",
  message = "Something went wrong while loading the data. Please try again.",
  onRetry,
  variant = "destructive",
}) => {
  return (
    <Alert variant={variant} className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p className="mb-3">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label="Retry loading data"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};
