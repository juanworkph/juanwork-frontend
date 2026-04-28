/**
 * Discover Freelancers API Service
 * 
 * This file contains API service functions for fetching freelancers, categories,
 * and skills. All functions are async Server Actions for Next.js 15.
 */

'use server';

import apiClient from '@/lib/api-client';
import { AxiosError } from 'axios';
import {
  Freelancer,
  Category,
  FreelancerQueryParams,
  FreelancersResponse,
  CategoriesResponse,
  SkillsResponse,
  PaginationMeta,
} from '../schema/discover-freelancers-data';
import {
  transformAPIFreelancerToFrontend,
  transformAPICategoryToFrontend,
  transformAPISkillToString,
} from '../utils/transformers';

/**
 * Fetch freelancers from the API
 * 
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with freelancers array and pagination metadata
 */
export const fetchFreelancers = async (
  params: FreelancerQueryParams = {}
): Promise<{
  freelancers: Freelancer[];
  pagination: PaginationMeta;
}> => {
  try {
    // Set default parameters
    const queryParams: FreelancerQueryParams = {
      role: 'freelancer',
      page: params.page || 1,
      limit: params.limit || 20,
      ...params,
    };

    // Build query string
    const searchParams = new URLSearchParams();
    
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          // Handle array parameters (skills, languages)
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    // Make API request
    const response = await apiClient.get<FreelancersResponse>(
      `/users?${searchParams.toString()}`
    );

    // Check if response is successful
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch freelancers');
    }

    // The backend returns data as an array directly, not nested under 'users'
    const usersArray = Array.isArray(response.data.data) 
      ? response.data.data 
      : response.data.data.users || [];

    // Transform freelancers to frontend format
    const freelancers = usersArray.map(transformAPIFreelancerToFrontend);

    // Get pagination from response
    const pagination = response.data.pagination || {
      page: params.page || 1,
      limit: params.limit || 20,
      total: freelancers.length,
      totalPages: 1,
    };

    return {
      freelancers,
      pagination,
    };
  } catch (error) {
    // Handle errors
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      
      if (statusCode === 404) {
        // No freelancers found
        return {
          freelancers: [],
          pagination: {
            page: params.page || 1,
            limit: params.limit || 20,
            total: 0,
            totalPages: 0,
          },
        };
      } else if (statusCode === 500) {
        throw new Error('Server error, please try again later');
      } else if (!error.response) {
        throw new Error('Network error, please check your connection');
      }
      
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch freelancers. Please try again.'
      );
    }
    
    throw error;
  }
};

/**
 * Fetch all categories from the API
 * 
 * @returns Promise with categories array
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<CategoriesResponse>('/categories');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch categories');
    }

    // Transform categories to frontend format
    const categories = response.data.data.categories
      .filter(cat => cat.isActive)
      .map(transformAPICategoryToFrontend);

    return categories;
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      
      if (statusCode === 404) {
        // No categories found
        return [];
      } else if (statusCode === 500) {
        throw new Error('Server error, please try again later');
      } else if (!error.response) {
        throw new Error('Network error, please check your connection');
      }
      
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch categories. Please try again.'
      );
    }
    
    throw error;
  }
};

/**
 * Fetch skills for a specific category from the API
 * 
 * @param categoryId - Category ID to fetch skills for (optional, fetches all if not provided)
 * @returns Promise with skills array
 */
export const fetchSkillsByCategory = async (categoryId?: string): Promise<string[]> => {
  try {
    const endpoint = categoryId 
      ? `/skills?categoryId=${categoryId}` 
      : '/skills';
    
    const response = await apiClient.get<SkillsResponse>(endpoint);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch skills');
    }

    // Transform skills to frontend format (just extract names)
    const skills = response.data.data.skills
      .filter(skill => skill.isActive)
      .map(transformAPISkillToString);

    return skills;
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      
      if (statusCode === 404) {
        // No skills found for this category
        return [];
      } else if (statusCode === 500) {
        throw new Error('Server error, please try again later');
      } else if (!error.response) {
        throw new Error('Network error, please check your connection');
      }
      
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch skills. Please try again.'
      );
    }
    
    throw error;
  }
};

/**
 * Fetch all skills (not filtered by category)
 * 
 * @returns Promise with all skills array
 */
export const fetchAllSkills = async (): Promise<string[]> => {
  return fetchSkillsByCategory();
};
