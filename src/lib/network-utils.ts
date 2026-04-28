/**
 * Network Utilities
 *
 * Utilities for handling network errors, retries, and connection quality detection.
 */

import { AxiosError } from "axios";

/**
 * Network error types for classification
 */
export enum NetworkErrorType {
  TIMEOUT = "TIMEOUT",
  NO_CONNECTION = "NO_CONNECTION",
  SERVER_ERROR = "SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNKNOWN = "UNKNOWN",
}

/**
 * Retry options configuration
 */
export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: any) => void;
  shouldRetry?: (error: any) => boolean;
  signal?: AbortSignal;
}

/**
 * Calculate exponential backoff delay
 *
 * @param attempt - Current retry attempt (0-indexed)
 * @param baseDelay - Base delay in milliseconds (default: 1000ms)
 * @param maxDelay - Maximum delay in milliseconds (default: 30000ms)
 * @returns Delay in milliseconds with jitter
 */
export const calculateBackoff = (
  attempt: number,
  baseDelay: number = 1000,
  maxDelay: number = 30000
): number => {
  // Exponential backoff: baseDelay * 2^attempt
  const exponentialDelay = baseDelay * Math.pow(2, attempt);

  // Cap at maxDelay
  const cappedDelay = Math.min(exponentialDelay, maxDelay);

  // Add jitter (random 0-25% of delay) to prevent thundering herd
  const jitter = Math.random() * 0.25 * cappedDelay;

  return Math.floor(cappedDelay + jitter);
};

/**
 * Classify network error into specific type
 *
 * @param error - Error object from API call
 * @returns NetworkErrorType classification
 */
export const classifyNetworkError = (error: any): NetworkErrorType => {
  // Check if it's an Axios error
  if (error.isAxiosError || error.response) {
    const axiosError = error as AxiosError;

    // Check for cancellation (Axios)
    if (
      axiosError.code === "ERR_CANCELED" ||
      axiosError.name === "CanceledError"
    ) {
      return NetworkErrorType.UNKNOWN;
    }

    // Check for timeout
    if (
      axiosError.code === "ECONNABORTED" ||
      axiosError.message?.includes("timeout")
    ) {
      return NetworkErrorType.TIMEOUT;
    }

    // Check for network error (no response)
    if (!axiosError.response) {
      return NetworkErrorType.NO_CONNECTION;
    }

    // Check status codes
    const status = axiosError.response.status;

    if (status === 401) {
      return NetworkErrorType.UNAUTHORIZED;
    }

    if (status === 403) {
      return NetworkErrorType.FORBIDDEN;
    }

    if (status === 404) {
      return NetworkErrorType.NOT_FOUND;
    }

    if (status >= 400 && status < 500) {
      return NetworkErrorType.BAD_REQUEST;
    }

    if (status >= 500) {
      return NetworkErrorType.SERVER_ERROR;
    }
  }

  // Check for AbortError (request cancelled)
  if (error.name === "AbortError" || error.name === "CanceledError") {
    return NetworkErrorType.UNKNOWN; // Don't retry cancelled requests
  }

  return NetworkErrorType.UNKNOWN;
};

/**
 * Determine if error should be retried
 *
 * @param error - Error object
 * @returns true if error is retryable
 */
export const isRetryableError = (error: any): boolean => {
  const errorType = classifyNetworkError(error);

  // Retry these error types
  const retryableTypes = [
    NetworkErrorType.TIMEOUT,
    NetworkErrorType.NO_CONNECTION,
    NetworkErrorType.SERVER_ERROR,
  ];

  return retryableTypes.includes(errorType);
};

/**
 * Get user-friendly error message based on error type
 *
 * @param error - Error object
 * @param context - Context for the error (e.g., "loading project")
 * @returns User-friendly error message
 */
export const getErrorMessage = (
  error: any,
  context: string = "performing this action"
): string => {
  const errorType = classifyNetworkError(error);

  switch (errorType) {
    case NetworkErrorType.TIMEOUT:
      return `Request timed out while ${context}. Please check your connection and try again.`;

    case NetworkErrorType.NO_CONNECTION:
      return `Network error while ${context}. Please check your internet connection and try again.`;

    case NetworkErrorType.SERVER_ERROR:
      return `Server error while ${context}. Please try again later.`;

    case NetworkErrorType.UNAUTHORIZED:
      return `Authentication required. Please log in and try again.`;

    case NetworkErrorType.FORBIDDEN:
      return `You don't have permission to perform this action.`;

    case NetworkErrorType.NOT_FOUND:
      return `The requested resource was not found.`;

    case NetworkErrorType.BAD_REQUEST:
      // Try to extract message from response
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      return `Invalid request while ${context}. Please try again.`;

    default:
      return `An error occurred while ${context}. Please try again.`;
  }
};

/**
 * Retry a function with exponential backoff
 *
 * @param fn - Async function to retry
 * @param options - Retry configuration options
 * @returns Promise that resolves with function result or rejects after max retries
 *
 * @example
 * ```typescript
 * const data = await retryWithBackoff(
 *   () => apiClient.get('/data'),
 *   {
 *     maxRetries: 3,
 *     baseDelay: 1000,
 *     onRetry: (attempt) => console.log(`Retry attempt ${attempt}`),
 *   }
 * );
 * ```
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    onRetry,
    shouldRetry = isRetryableError,
    signal,
  } = options;

  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check if request was cancelled
      if (signal?.aborted) {
        throw new Error("Request cancelled");
      }

      // Try to execute the function
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      const isLastAttempt = attempt === maxRetries;
      const shouldRetryError = shouldRetry(error);

      // Don't retry if:
      // - This is the last attempt
      // - Error is not retryable
      // - Request was cancelled
      if (isLastAttempt || !shouldRetryError || signal?.aborted) {
        throw error;
      }

      // Calculate backoff delay
      const delay = calculateBackoff(attempt, baseDelay, maxDelay);

      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, error);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
};

/**
 * Check if browser is online
 *
 * @returns true if browser reports online status
 */
export const isOnline = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return true; // Assume online in SSR
  }

  return navigator.onLine;
};

/**
 * Get network quality based on connection type
 *
 * @returns Network quality: 'fast', 'slow', or 'offline'
 */
export const getNetworkQuality = (): "fast" | "slow" | "offline" => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "fast"; // Assume fast in SSR
  }

  // Check if offline
  if (!navigator.onLine) {
    return "offline";
  }

  // Check Network Information API (if available)
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    const effectiveType = connection.effectiveType;

    // Slow connections: 2g, slow-2g
    if (effectiveType === "slow-2g" || effectiveType === "2g") {
      return "slow";
    }

    // Fast connections: 4g
    if (effectiveType === "4g") {
      return "fast";
    }

    // Medium connections: 3g (consider as fast for simplicity)
    return "fast";
  }

  // Default to fast if API not available
  return "fast";
};

/**
 * Add online/offline event listeners
 *
 * @param onOnline - Callback when connection is restored
 * @param onOffline - Callback when connection is lost
 * @returns Cleanup function to remove listeners
 */
export const addConnectionListeners = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {}; // No-op in SSR
  }

  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
};

/**
 * Create an AbortController with timeout
 *
 * @param timeoutMs - Timeout in milliseconds
 * @returns AbortController that will abort after timeout
 */
export const createTimeoutController = (timeoutMs: number): AbortController => {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return controller;
};

/**
 * Wait for network to be online
 *
 * @param timeoutMs - Maximum time to wait in milliseconds (default: 30000)
 * @returns Promise that resolves when online or rejects on timeout
 */
export const waitForOnline = (timeoutMs: number = 30000): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Already online
    if (isOnline()) {
      resolve();
      return;
    }

    // Set up timeout
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Timeout waiting for network connection"));
    }, timeoutMs);

    // Listen for online event
    const handleOnline = () => {
      cleanup();
      resolve();
    };

    const cleanup = () => {
      clearTimeout(timeout);
      window.removeEventListener("online", handleOnline);
    };

    window.addEventListener("online", handleOnline);
  });
};
