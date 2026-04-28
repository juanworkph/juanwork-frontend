/**
 * My Services API Actions
 * 
 * This module provides API action functions for the My Services feature.
 * It handles fetching, deleting, and updating service status for freelancers.
 * 
 * All functions require authentication and will throw errors if:
 * - User is not authenticated (401)
 * - User is not authorized (403)
 * - Resource is not found (404)
 * - Server error occurs (500)
 */

import apiClient, { ApiSuccessResponse } from '@/lib/api-client';
import { 
  IServiceResponse, 
  MyService,
  transformServicesResponse,
  transformServiceResponse
} from '../schema/my-services-data';

/**
 * API response interface for user services endpoint
 */
interface UserServicesResponse {
  services: IServiceResponse[];
}

/**
 * Fetch all services for the authenticated freelancer
 * 
 * This function retrieves all services posted by the currently authenticated freelancer.
 * It requires a valid authentication token in the request headers.
 * The API client automatically adds the Bearer token from localStorage.
 * 
 * @returns Promise<MyService[]> - Array of transformed service objects
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not a freelancer)
 *   - 500: Server error
 * 
 * Requirements: 1.1, 1.5
 * 
 * @example
 * ```typescript
 * try {
 *   const services = await getFreelancerServices();
 *   console.log(`Found ${services.length} services`);
 * } catch (error) {
 *   console.error('Failed to fetch services:', error);
 *   // Handle error in component (show toast, redirect, etc.)
 * }
 * ```
 */
export const getFreelancerServices = async (): Promise<MyService[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<UserServicesResponse>>(
      '/services/user/me'
    );
    
    // Extract services array from response
    const apiServices = response.data.data.services;
    
    // Transform API response to UI model
    // This handles:
    // - Numeric string parsing (budgetMin, budgetMax)
    // - Date string conversion
    // - Missing optional fields (views, proposalsCount set to 0)
    // - Currency defaults to "PHP" if not provided
    return transformServicesResponse(apiServices);
  } catch (error) {
    console.error('Error fetching freelancer services:', error);
    throw error;
  }
};

/**
 * Delete a service by its ID
 * 
 * This function deletes a service owned by the authenticated freelancer.
 * It requires proper authentication and authorization (user must be the service owner).
 * 
 * @param serviceId - The UUID identifier of the service to delete
 * @returns Promise<void> - Resolves when deletion is successful
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not service owner)
 *   - 404: Service not found
 *   - 500: Server error
 * 
 * Requirements: 6.3, 6.4
 * 
 * @example
 * ```typescript
 * try {
 *   await deleteService('service-uuid-123');
 *   console.log('Service deleted successfully');
 *   // Update local state to remove the service
 * } catch (error) {
 *   if (error.response?.status === 403) {
 *     console.error('You do not have permission to delete this service');
 *   } else if (error.response?.status === 404) {
 *     console.error('Service not found');
 *   } else {
 *     console.error('Failed to delete service:', error);
 *   }
 * }
 * ```
 */
export const deleteService = async (serviceId: string): Promise<void> => {
  try {
    await apiClient.delete(`/services/${serviceId}`);
  } catch (error) {
    console.error(`Error deleting service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Update service status (pause or activate)
 * 
 * This function updates the status of a service owned by the authenticated freelancer.
 * It can be used to pause an approved service or activate a paused service.
 * 
 * Status transitions:
 * - 'approved' → 'paused': Pause an active service
 * - 'paused' → 'active': Activate a paused service (backend will set to 'approved')
 * 
 * @param serviceId - The UUID identifier of the service to update
 * @param status - The new status ('paused' or 'active')
 * @returns Promise<MyService> - The updated service object
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not service owner)
 *   - 404: Service not found
 *   - 500: Server error
 * 
 * Requirements: 6.7, 6.8
 * 
 * @example
 * ```typescript
 * // Pause a service
 * try {
 *   const updatedService = await updateServiceStatus('service-uuid-123', 'paused');
 *   console.log('Service paused:', updatedService.status);
 *   // Update local state with the new service data
 * } catch (error) {
 *   console.error('Failed to pause service:', error);
 * }
 * 
 * // Activate a service
 * try {
 *   const updatedService = await updateServiceStatus('service-uuid-123', 'active');
 *   console.log('Service activated:', updatedService.status);
 *   // Update local state with the new service data
 * } catch (error) {
 *   console.error('Failed to activate service:', error);
 * }
 * ```
 */
export const updateServiceStatus = async (
  serviceId: string,
  status: 'paused' | 'active'
): Promise<MyService> => {
  try {
    const response = await apiClient.patch<ApiSuccessResponse<IServiceResponse>>(
      `/services/${serviceId}`,
      { status }
    );
    
    // Transform the updated service response to UI model
    return transformServiceResponse(response.data.data);
  } catch (error) {
    console.error(`Error updating service ${serviceId} status to ${status}:`, error);
    throw error;
  }
};
