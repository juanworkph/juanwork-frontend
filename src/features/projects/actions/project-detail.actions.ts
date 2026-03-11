/**
 * Project Detail Actions
 *
 * This file contains API action functions for the Project Detail page.
 * All functions include retry logic with exponential backoff for network resilience.
 */

import apiClient, { ApiSuccessResponse } from "@/lib/api-client";
import { FreelancerBid, ProjectInsights } from "../schema/project-detail-data";
import { BidFormData, Bid } from "../schema/bidding-data";
import {
  retryWithBackoff,
  getErrorMessage,
  RetryOptions,
} from "@/lib/network-utils";

/**
 * Fetch a project by ID
 *
 * This function retrieves a single project with all its details including
 * category, skills, and upgrades. It requires authentication.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<any> - Project data with all relations
 * @throws Error if the API request fails (401, 404, 500, etc.)
 *
 * @example
 * ```typescript
 * try {
 *   const project = await getProjectById('project-123');
 *   console.log(`Project: ${project.name}`);
 * } catch (error) {
 *   console.error('Failed to fetch project:', error);
 * }
 * ```
 */
export const getProjectById = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<any> => {
  try {
    // Retry configuration
    const retryOptions: RetryOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[getProjectById] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    const response = await retryWithBackoff(
      () =>
        apiClient.get<ApiSuccessResponse<any>>(`/projects/${projectId}`, {
          signal,
        }),
      retryOptions,
    );

    return response.data.data;
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(`Failed to fetch project ${projectId}:`, error);

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "loading project");
    throw new Error(errorMessage);
  }
};

/**
 * Fetch all bids for a specific project
 *
 * This function retrieves all freelancer bids submitted for a project.
 * It requires authentication and the user must be the project owner.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<FreelancerBid[]> - Array of freelancer bids
 * @throws Error if the API request fails (401, 403, 404, 500, etc.)
 *
 * Requirements: 4.1
 *
 * @example
 * ```typescript
 * try {
 *   const bids = await getProjectBids('project-123');
 *   console.log(`Found ${bids.length} bids`);
 * } catch (error) {
 *   console.error('Failed to fetch bids:', error);
 * }
 * ```
 */
export const getProjectBids = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<FreelancerBid[]> => {
  try {
    // Retry configuration
    const retryOptions: RetryOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[getProjectBids] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    const response = await retryWithBackoff(
      () =>
        apiClient.get<ApiSuccessResponse<{ bids: FreelancerBid[] }>>(
          `/projects/${projectId}/bids`,
          { signal },
        ),
      retryOptions,
    );

    return response.data.data.bids;
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(`Failed to fetch bids for project ${projectId}:`, error);

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "loading bids");
    throw new Error(errorMessage);
  }
};

/**
 * Fetch project insights and analytics
 *
 * This function retrieves analytics data for a project including:
 * - Total views count
 * - Number of proposals received
 * - Average bid amount
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<ProjectInsights> - Project analytics data
 * @throws Error if the API request fails (401, 403, 404, 500, etc.)
 *
 * Requirements: 5.1
 *
 * @example
 * ```typescript
 * try {
 *   const insights = await getProjectInsights('project-123');
 *   console.log(`Views: ${insights.totalViews}, Proposals: ${insights.proposalsReceived}`);
 * } catch (error) {
 *   console.error('Failed to fetch insights:', error);
 * }
 * ```
 */
export const getProjectInsights = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectInsights> => {
  try {
    // Retry configuration
    const retryOptions: RetryOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[getProjectInsights] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    const response = await retryWithBackoff(
      () =>
        apiClient.get<ApiSuccessResponse<ProjectInsights>>(
          `/projects/${projectId}/insights`,
          { signal },
        ),
      retryOptions,
    );

    return response.data.data;
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(`Failed to fetch insights for project ${projectId}:`, error);

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "loading project insights");
    throw new Error(errorMessage);
  }
};

/**
 * Close bidding for a project
 *
 * This function closes the bidding period for a project, preventing new bids
 * from being submitted. Only the project owner can close bidding.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<void> - Resolves when bidding is closed successfully
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project not found
 *   - 500: Server error
 *
 * Requirements: 9.5, 9.6
 *
 * @example
 * ```typescript
 * try {
 *   await closeProjectBids('project-123');
 *   console.log('Bidding closed successfully');
 * } catch (error) {
 *   console.error('Failed to close bidding:', error);
 * }
 * ```
 */
export const closeProjectBids = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<void> => {
  try {
    // Retry configuration (fewer retries for write operations)
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[closeProjectBids] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    await retryWithBackoff(
      () => apiClient.post(`/projects/${projectId}/close-bids`, {}, { signal }),
      retryOptions,
    );
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(`Failed to close bids for project ${projectId}:`, error);

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "closing bidding");
    throw new Error(errorMessage);
  }
};

/**
 * Shortlist a freelancer bid
 *
 * This function marks a bid as shortlisted, moving it to a special category
 * for easier review and comparison. Only the project owner can shortlist bids.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param bidId - The UUID identifier of the bid to shortlist
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<void> - Resolves when bid is shortlisted successfully
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project or bid not found
 *   - 500: Server error
 *
 * Requirements: 8.1, 8.2, 8.3
 *
 * @example
 * ```typescript
 * try {
 *   await shortlistBid('project-123', 'bid-456');
 *   console.log('Bid shortlisted successfully');
 * } catch (error) {
 *   console.error('Failed to shortlist bid:', error);
 * }
 * ```
 */
export const shortlistBid = async (
  projectId: string,
  bidId: string,
  signal?: AbortSignal,
): Promise<void> => {
  try {
    // Retry configuration (fewer retries for write operations)
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[shortlistBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    await retryWithBackoff(
      () =>
        apiClient.post(
          `/projects/${projectId}/bids/${bidId}/shortlist`,
          {},
          { signal },
        ),
      retryOptions,
    );
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(
      `Failed to shortlist bid ${bidId} for project ${projectId}:`,
      error,
    );

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "shortlisting bid");
    throw new Error(errorMessage);
  }
};

/**
 * Accept a bid
 *
 * This function accepts a bid, marking it as accepted, creating a workspace,
 * and marking the project as active. Other pending bids are marked as lost.
 * Only the project owner can accept bids.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param bidId - The UUID identifier of the bid to accept
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<any> - Resolves with workspace data when bid is accepted successfully
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project or bid not found
 *   - 500: Server error
 */
export const acceptBid = async (
  projectId: string,
  bidId: string,
  signal?: AbortSignal,
): Promise<any> => {
  try {
    // Retry configuration (fewer retries for write operations)
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[acceptBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    const response = await retryWithBackoff(
      () =>
        apiClient.post(
          `/projects/${projectId}/bids/${bidId}/accept`,
          {},
          { signal },
        ),
      retryOptions,
    );
    
    return response.data;
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(
      `Failed to accept bid ${bidId} for project ${projectId}:`,
      error,
    );

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "accepting bid");
    throw new Error(errorMessage);
  }
};

/**
 * Reject a freelancer bid
 *
 * This function rejects a bid, removing it from consideration.
 * The freelancer will be notified of the rejection.
 * Only the project owner can reject bids.
 *
 * Includes automatic retry with exponential backoff for network errors.
 *
 * @param projectId - The UUID identifier of the project
 * @param bidId - The UUID identifier of the bid to reject
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<void> - Resolves when bid is rejected successfully
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project or bid not found
 *   - 500: Server error
 *
 * Requirements: 8.6
 *
 * @example
 * ```typescript
 * try {
 *   await rejectBid('project-123', 'bid-456');
 *   console.log('Bid rejected successfully');
 * } catch (error) {
 *   console.error('Failed to reject bid:', error);
 * }
 * ```
 */
export const rejectBid = async (
  projectId: string,
  bidId: string,
  signal?: AbortSignal,
): Promise<void> => {
  try {
    // Retry configuration (fewer retries for write operations)
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[rejectBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    // Wrap API call with retry logic
    await retryWithBackoff(
      () =>
        apiClient.post(
          `/projects/${projectId}/bids/${bidId}/reject`,
          {},
          { signal },
        ),
      retryOptions,
    );
  } catch (error: any) {
    // Don't swallow cancellation errors - rethrow them so the UI can handle them
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    console.error(
      `Failed to reject bid ${bidId} for project ${projectId}:`,
      error,
    );

    // Get user-friendly error message
    const errorMessage = getErrorMessage(error, "rejecting bid");
    throw new Error(errorMessage);
  }
};

/**
 * Submit a bid for a project
 *
 * @param projectId - The UUID identifier of the project
 * @param data - Bid data
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<Bid>
 */
export const submitProjectBid = async (
  projectId: string,
  data: BidFormData,
  signal?: AbortSignal,
): Promise<Bid> => {
  try {
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[submitProjectBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    const response = await retryWithBackoff(
      () =>
        apiClient.post<ApiSuccessResponse<Bid>>(
          `/projects/${projectId}/bids`,
          data,
          { signal },
        ),
      retryOptions,
    );

    return response.data.data;
  } catch (error: any) {
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }
    console.error(`Failed to submit bid for project ${projectId}:`, error);
    throw new Error(getErrorMessage(error, "submitting bid"));
  }
};

/**
 * Cancel a project bid
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<void>
 */
export const cancelProjectBid = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<void> => {
  try {
    const retryOptions: RetryOptions = {
      maxRetries: 2,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[cancelProjectBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    await retryWithBackoff(
      () => apiClient.delete(`/projects/${projectId}/bids`, { signal }),
      retryOptions,
    );
  } catch (error: any) {
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }
    console.error(`Failed to cancel bid for project ${projectId}:`, error);
    throw new Error(getErrorMessage(error, "cancelling bid"));
  }
};

/**
 * Get freelancer's bid for a project
 *
 * @param projectId - The UUID identifier of the project
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise<Bid | null>
 */
export const getMyProjectBid = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<Bid | null> => {
  try {
    const retryOptions: RetryOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      signal,
      onRetry: (attempt, error) => {
        console.log(
          `[getMyProjectBid] Retry attempt ${attempt} after error:`,
          error.message,
        );
      },
    };

    const response = await retryWithBackoff(
      () =>
        apiClient.get<ApiSuccessResponse<{ bid: Bid | null }>>(
          `/projects/${projectId}/bids/me`,
          { signal },
        ),
      retryOptions,
    );

    return response.data.data.bid;
  } catch (error: any) {
    if (
      error.name === "CanceledError" ||
      error.name === "AbortError" ||
      error.message === "canceled"
    ) {
      throw error;
    }

    // If it's a 401 or 403, we might not be authenticated as a freelancer or at all.
    // In that case, we can safely return null or throw.
    // We'll let standard error handle it unless it's a generic UI error.

    console.error(`Failed to get my bid for project ${projectId}:`, error);
    throw new Error(getErrorMessage(error, "loading your bid"));
  }
};
