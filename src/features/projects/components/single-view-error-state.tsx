import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * ErrorState Component Props
 */
interface ErrorStateProps {
  /**
   * Type of error to display
   * - 'not_found': Project doesn't exist or has been removed
   * - 'network': Failed to fetch project data due to network issues
   */
  type: "not_found" | "network";
  /**
   * Callback function when retry button is clicked (only for network errors)
   */
  onRetry?: () => void;
  /**
   * Callback function when back button is clicked
   */
  onBack: () => void;
}

/**
 * ErrorState Component
 * 
 * Displays error messages for project details page with appropriate actions.
 * Supports both 'not_found' and 'network' error types.
 * Matches the service view error state pattern.
 */
export const ErrorState = ({ type, onRetry, onBack }: ErrorStateProps) => {
  const isNotFound = type === "not_found";

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
      <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] space-y-4 sm:space-y-6 px-4">
        <Alert variant="destructive" className="max-w-2xl w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">
            {isNotFound ? "Project Not Found" : "Network Error"}
          </AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            {isNotFound
              ? "The project you're looking for doesn't exist or may have been removed."
              : "Unable to load project details. Please check your connection and try again."}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
            aria-label="Go back to find work"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="ml-2">Back to Find Work</span>
          </Button>
          {!isNotFound && onRetry && (
            <Button
              onClick={onRetry}
              className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
              aria-label="Retry loading project"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
