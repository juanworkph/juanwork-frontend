import React from "react";

/**
 * Error types supported by the ErrorState component
 */
export type ErrorType = "not_found" | "network" | "generic";

/**
 * ErrorState Component Props
 */
interface ErrorStateProps {
  /**
   * Type of error to display (determines icon and default messages)
   */
  type?: ErrorType;
  /**
   * Custom error title (overrides default)
   */
  title?: string;
  /**
   * Custom error message (overrides default)
   */
  message?: string;
  /**
   * Label for the action button
   */
  actionLabel?: string;
  /**
   * Callback function when action button is clicked
   */
  onAction?: () => void;
  /**
   * Optional secondary action
   */
  secondaryActionLabel?: string;
  /**
   * Callback for secondary action
   */
  onSecondaryAction?: () => void;
}

/**
 * Default error configurations based on error type
 */
const ERROR_CONFIGS: Record<
  ErrorType,
  {
    title: string;
    message: string;
    actionLabel: string;
    icon: React.ReactNode;
  }
> = {
  not_found: {
    title: "Service Not Found",
    message:
      "The service you're looking for doesn't exist or has been removed.",
    actionLabel: "Browse Services",
    icon: (
      <svg
        className="w-10 h-10 text-orange-600 dark:text-orange-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  network: {
    title: "Unable to Load Service",
    message: "We're having trouble loading this service. Please try again.",
    actionLabel: "Retry",
    icon: (
      <svg
        className="w-10 h-10 text-red-600 dark:text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
        />
      </svg>
    ),
  },
  generic: {
    title: "Something Went Wrong",
    message:
      "An unexpected error occurred. Please try again or contact support if the problem persists.",
    actionLabel: "Try Again",
    icon: (
      <svg
        className="w-10 h-10 text-red-600 dark:text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
};

/**
 * ErrorState Component
 * 
 * Displays an error state with an icon, title, message, and action buttons.
 * Supports different error types (not_found, network, generic) with appropriate
 * default messages and icons, or custom content can be provided.
 * 
 * @example
 * // Service not found error
 * <ErrorState
 *   type="not_found"
 *   onAction={() => router.push('/services')}
 * />
 * 
 * @example
 * // Network error with retry
 * <ErrorState
 *   type="network"
 *   onAction={() => refetch()}
 * />
 * 
 * @example
 * // Custom error with secondary action
 * <ErrorState
 *   title="Custom Error"
 *   message="Something specific went wrong"
 *   actionLabel="Primary Action"
 *   onAction={handlePrimary}
 *   secondaryActionLabel="Secondary Action"
 *   onSecondaryAction={handleSecondary}
 * />
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  type = "generic",
  title,
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  const config = ERROR_CONFIGS[type];

  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayActionLabel = actionLabel || config.actionLabel;

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4"
      role="alert"
      aria-live="polite"
    >
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
              type === "not_found"
                ? "bg-orange-100 dark:bg-orange-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
            aria-hidden="true"
          >
            {config.icon}
          </div>
        </div>

        {/* Error Title */}
        <h1
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          id="error-title"
        >
          {displayTitle}
        </h1>

        {/* Error Message */}
        <p
          className="text-gray-600 dark:text-gray-400 mb-6"
          id="error-message"
        >
          {displayMessage}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Primary Action Button */}
          {onAction && (
            <button
              onClick={onAction}
              className="px-6 py-3 bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F45A0B] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-describedby="error-title error-message"
            >
              {displayActionLabel}
            </button>
          )}

          {/* Secondary Action Button */}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-describedby="error-title error-message"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>

        {/* Additional Help Text (optional) */}
        {type === "generic" && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            If this problem continues, please{" "}
            <a
              href="/support"
              className="text-[#F45A0B] hover:underline focus:outline-none focus:ring-2 focus:ring-[#F45A0B] rounded"
            >
              contact support
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
};
