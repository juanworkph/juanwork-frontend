import apiClient from '@/lib/api-client';
import { 
  Category, 
  Skill, 
  UpgradeType, 
  CreateServiceRequest, 
  CreateServiceResponse,
  ApiSuccessResponse,
  ServiceResponse,
  ServicesListResponse
} from '../schema/service-post.schema';

/**
 * Fetch all active categories from the backend
 * @returns Promise<Category[]> - Array of category objects
 * @throws Error if the API request fails
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<{ categories: Category[] }>>(
      '/categories'
    );
    return response.data.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch skills for a specific category by its ID
 * @param categoryId - The UUID identifier of the category
 * @returns Promise<Skill[]> - Array of skill objects for the category
 * @throws Error if the API request fails
 */
export const getSkillsByCategory = async (categoryId: string): Promise<Skill[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<{ skills: Skill[] }>>(
      `/categories/${categoryId}/skills`
    );
    return response.data.data.skills;
  } catch (error) {
    console.error(`Error fetching skills for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Fetch all available upgrade types from the backend
 * @returns Promise<UpgradeType[]> - Array of upgrade type objects
 * @throws Error if the API request fails
 */
export const getAllUpgradeTypes = async (): Promise<UpgradeType[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<{ upgradeTypes: UpgradeType[] }>>(
      '/upgrade-types'
    );
    return response.data.data.upgradeTypes;
  } catch (error) {
    console.error('Error fetching upgrade types:', error);
    throw error;
  }
};

/**
 * Create a new service by submitting service data to the backend
 * @param data - CreateServiceRequest object containing all service details
 * @returns Promise<CreateServiceResponse> - Response containing created service details
 * @throws Error if the API request fails (400, 401, 403, 500, etc.)
 */
export const createService = async (data: CreateServiceRequest): Promise<CreateServiceResponse> => {
  try {
    const response = await apiClient.post<ApiSuccessResponse<CreateServiceResponse>>(
      '/services',
      data
    );
    return response.data.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

/**
 * Fetch a single service by its ID
 * @param serviceId - The UUID of the service to fetch
 * @returns Promise<ServiceResponse> - Service data object with all relations
 * @throws Error if the API request fails
 */
export const getSingleService = async (serviceId: string): Promise<ServiceResponse> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<ServiceResponse>>(
      `/services/${serviceId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching service ${serviceId}:`, error);
    throw error;
  }
};

/**
 * Fetch all services with optional filtering
 * @param filters - Optional filters for status, categoryId, pagination
 * @returns Promise<ServicesListResponse> - Services data with pagination info
 * @throws Error if the API request fails
 */
export const getAllServices = async (filters?: {
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}): Promise<ServicesListResponse> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.categoryId) {
      params.append('categoryId', filters.categoryId);
    }
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/services?${queryString}` : '/services';
    
    const response = await apiClient.get<ApiSuccessResponse<ServicesListResponse>>(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
