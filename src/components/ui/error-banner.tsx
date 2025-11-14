import * as React from "react";
import { AlertCircle, RefreshCw, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  variant?: "default" | "destructive";
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = "Error",
  message,
  onRetry,
  onDismiss,
  className,
  variant = "destructive",
}) => {
  return (
    <Alert variant={variant} className={cn("relative", className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-sm sm:text-base">{title}</AlertTitle>
      <AlertDescription className="text-xs sm:text-sm">
        <p className="mb-3">{message}</p>
        <div className="flex flex-wrap gap-2">
          {onRetry && (
            <Button
              onClick={onRetry}
              size="sm"
              variant="outline"
              className="h-8 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1.5" />
              Retry
            </Button>
          )}
          {onDismiss && (
            <Button
              onClick={onDismiss}
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
            >
              <X className="h-3 w-3 mr-1.5" />
              Dismiss
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
