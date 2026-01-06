'use server';

import apiClient from '@/lib/api-client';
import { 
  Category, 
  Skill, 
  UpgradeType, 
  CreateProjectRequest, 
  CreateProjectResponse,
  ApiSuccessResponse 
} from '../schema/project-post.schema';

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
 * Fetch skills for a specific category by its slug
 * @param categorySlug - The slug identifier of the category
 * @returns Promise<Skill[]> - Array of skill objects for the category
 * @throws Error if the API request fails
 */
export const getSkillsByCategory = async (categorySlug: string): Promise<Skill[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<{ skills: Skill[] }>>(
      `/categories/${categorySlug}/skills`
    );
    return response.data.data.skills;
  } catch (error) {
    console.error(`Error fetching skills for category ${categorySlug}:`, error);
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
 * Create a new project by submitting project data to the backend
 * @param data - CreateProjectRequest object containing all project details
 * @returns Promise<CreateProjectResponse> - Response containing created project details
 * @throws Error if the API request fails (400, 403, 500, etc.)
 */
export const createProject = async (data: CreateProjectRequest): Promise<CreateProjectResponse> => {
  try {
    const response = await apiClient.post<ApiSuccessResponse<CreateProjectResponse>>(
      '/projects',
      data
    );
    return response.data.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Fetch a single project by its ID
 * @param projectId - The UUID of the project to fetch
 * @returns Promise<any> - Project data object
 * @throws Error if the API request fails
 */
export const getSingleProject = async (projectId: string): Promise<any> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<any>>(
      `/projects/${projectId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Fetch all projects with optional filtering
 * @param filters - Optional filters for status, categoryId, pagination
 * @returns Promise<any> - Projects data with pagination info
 * @throws Error if the API request fails
 */
export const getAllProjects = async (filters?: {
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}): Promise<any> => {
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
    const url = queryString ? `/projects?${queryString}` : '/projects';
    
    const response = await apiClient.get<ApiSuccessResponse<any>>(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
