/**
 * Portfolio API Actions
 * 
 * This module provides API action functions for the Portfolio Management feature.
 * It handles CRUD operations for portfolio projects, fetching categories and skills,
 * and toggling featured status.
 * 
 * All portfolio-related functions require authentication and will throw errors if:
 * - User is not authenticated (401)
 * - User is not authorized (403)
 * - Resource is not found (404)
 * - Server error occurs (500)
 * 
 * Category and skill functions are public and do not require authentication.
 */

import apiClient, { ApiSuccessResponse } from '@/lib/api-client';
import {
  PortfolioProject,
  PortfolioProjectFormData,
  IPortfolioProjectResponse,
  transformPortfolioResponse,
  transformPortfolioProjectResponse,
} from '../schema/portfolio-data';

/**
 * Category interface matching backend structure
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Skill interface matching backend structure
 */
export interface Skill {
  id: string;
  name: string;
  categoryId?: string;
  isCustom?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API response interface for user portfolio endpoint
 */
interface UserPortfolioResponse {
  projects: IPortfolioProjectResponse[];
}

/**
 * Fetch all portfolio projects for the authenticated freelancer
 * 
 * This function retrieves all portfolio projects posted by the currently authenticated freelancer.
 * It requires a valid authentication token in the request headers.
 * The API client automatically adds the Bearer token from localStorage.
 * 
 * @returns Promise<PortfolioProject[]> - Array of transformed portfolio project objects
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
 *   const projects = await getFreelancerPortfolio();
 *   console.log(`Found ${projects.length} portfolio projects`);
 * } catch (error) {
 *   console.error('Failed to fetch portfolio:', error);
 *   // Handle error in component (show toast, redirect, etc.)
 * }
 * ```
 */
export const getFreelancerPortfolio = async (): Promise<PortfolioProject[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<UserPortfolioResponse>>(
      '/portfolio/user/me'
    );
    
    // Extract projects array from response
    const apiProjects = response.data.data.projects;
    
    // Transform API response to UI model
    // This handles:
    // - Numeric string parsing (budget from string to number)
    // - Date string conversion (createdAt, updatedAt)
    // - Optional fields (testimonial, links, etc.)
    return transformPortfolioResponse(apiProjects);
  } catch (error) {
    console.error('Error fetching freelancer portfolio:', error);
    throw error;
  }
};

/**
 * Create a new portfolio project
 * 
 * This function creates a new portfolio project for the authenticated freelancer.
 * It requires proper authentication and the user must have a freelancer role.
 * 
 * @param data - PortfolioProjectFormData object containing all project details
 * @returns Promise<PortfolioProject> - The created portfolio project
 * @throws Error if the API request fails:
 *   - 400: Bad request (validation errors)
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not a freelancer)
 *   - 500: Server error
 * 
 * Requirements: 5.1, 5.5, 5.6
 * 
 * @example
 * ```typescript
 * try {
 *   const newProject = await createPortfolioProject({
 *     title: 'E-commerce Platform',
 *     description: 'A full-featured e-commerce platform...',
 *     shortDescription: 'Modern e-commerce solution',
 *     category: 'e-commerce',
 *     status: 'completed',
 *     images: {
 *       thumbnail: 'https://example.com/thumb.jpg',
 *       gallery: ['https://example.com/img1.jpg']
 *     },
 *     technologies: ['React', 'Node.js', 'PostgreSQL'],
 *     skills: ['Frontend Development', 'Backend Development'],
 *     timeline: {
 *       startDate: '2024-01-01',
 *       endDate: '2024-06-01',
 *       duration: '6 months'
 *     }
 *   });
 *   console.log('Portfolio project created:', newProject.id);
 * } catch (error) {
 *   console.error('Failed to create portfolio project:', error);
 * }
 * ```
 */
export const createPortfolioProject = async (
  data: PortfolioProjectFormData
): Promise<PortfolioProject> => {
  try {
    const response = await apiClient.post<ApiSuccessResponse<IPortfolioProjectResponse>>(
      '/portfolio',
      data
    );
    
    // Transform the created project response to UI model
    return transformPortfolioProjectResponse(response.data.data);
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    throw error;
  }
};

/**
 * Update an existing portfolio project
 * 
 * This function updates a portfolio project owned by the authenticated freelancer.
 * It requires proper authentication and authorization (user must be the project owner).
 * All fields in the data parameter are optional - only provided fields will be updated.
 * 
 * @param projectId - The UUID identifier of the project to update
 * @param data - Partial PortfolioProjectFormData with fields to update
 * @returns Promise<PortfolioProject> - The updated portfolio project
 * @throws Error if the API request fails:
 *   - 400: Bad request (validation errors)
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project not found
 *   - 500: Server error
 * 
 * Requirements: 6.1, 6.4, 6.5
 * 
 * @example
 * ```typescript
 * try {
 *   const updatedProject = await updatePortfolioProject('project-uuid-123', {
 *     title: 'Updated Project Title',
 *     status: 'completed',
 *     featured: true
 *   });
 *   console.log('Portfolio project updated:', updatedProject.title);
 * } catch (error) {
 *   if (error.response?.status === 403) {
 *     console.error('You do not have permission to update this project');
 *   } else if (error.response?.status === 404) {
 *     console.error('Project not found');
 *   } else {
 *     console.error('Failed to update portfolio project:', error);
 *   }
 * }
 * ```
 */
export const updatePortfolioProject = async (
  projectId: string,
  data: Partial<PortfolioProjectFormData>
): Promise<PortfolioProject> => {
  try {
    const response = await apiClient.patch<ApiSuccessResponse<IPortfolioProjectResponse>>(
      `/portfolio/${projectId}`,
      data
    );
    
    // Transform the updated project response to UI model
    return transformPortfolioProjectResponse(response.data.data);
  } catch (error) {
    console.error(`Error updating portfolio project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Delete a portfolio project by its ID
 * 
 * This function deletes a portfolio project owned by the authenticated freelancer.
 * It requires proper authentication and authorization (user must be the project owner).
 * This action is permanent and cannot be undone.
 * 
 * @param projectId - The UUID identifier of the project to delete
 * @returns Promise<void> - Resolves when deletion is successful
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project not found
 *   - 500: Server error
 * 
 * Requirements: 7.3, 7.4
 * 
 * @example
 * ```typescript
 * try {
 *   await deletePortfolioProject('project-uuid-123');
 *   console.log('Portfolio project deleted successfully');
 *   // Update local state to remove the project
 * } catch (error) {
 *   if (error.response?.status === 403) {
 *     console.error('You do not have permission to delete this project');
 *   } else if (error.response?.status === 404) {
 *     console.error('Project not found');
 *   } else {
 *     console.error('Failed to delete portfolio project:', error);
 *   }
 * }
 * ```
 */
export const deletePortfolioProject = async (projectId: string): Promise<void> => {
  try {
    await apiClient.delete(`/portfolio/${projectId}`);
  } catch (error) {
    console.error(`Error deleting portfolio project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Get a single portfolio project by its ID
 * 
 * This function retrieves detailed information about a specific portfolio project.
 * It requires proper authentication and authorization (user must be the project owner).
 * 
 * @param projectId - The UUID identifier of the project to fetch
 * @returns Promise<PortfolioProject> - The portfolio project object
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project not found
 *   - 500: Server error
 * 
 * Requirements: 8.1
 * 
 * @example
 * ```typescript
 * try {
 *   const project = await getPortfolioProjectById('project-uuid-123');
 *   console.log('Portfolio project:', project.title);
 * } catch (error) {
 *   if (error.response?.status === 404) {
 *     console.error('Project not found');
 *   } else {
 *     console.error('Failed to fetch portfolio project:', error);
 *   }
 * }
 * ```
 */
export const getPortfolioProjectById = async (projectId: string): Promise<PortfolioProject> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<IPortfolioProjectResponse>>(
      `/portfolio/${projectId}`
    );
    
    // Transform the project response to UI model
    return transformPortfolioProjectResponse(response.data.data);
  } catch (error) {
    console.error(`Error fetching portfolio project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Fetch all categories from the backend
 * 
 * This function retrieves all available categories for portfolio projects.
 * This is a public endpoint and does not require authentication.
 * 
 * @returns Promise<Category[]> - Array of category objects
 * @throws Error if the API request fails:
 *   - 500: Server error
 * 
 * @example
 * ```typescript
 * try {
 *   const categories = await getCategories();
 *   console.log(`Found ${categories.length} categories`);
 * } catch (error) {
 *   console.error('Failed to fetch categories:', error);
 * }
 * ```
 */
export const getCategories = async (): Promise<Category[]> => {
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
 * Fetch skills, optionally filtered by category
 * 
 * This function retrieves skills from the backend. If a categoryId is provided,
 * it fetches only skills for that category. Otherwise, it fetches all skills.
 * This is a public endpoint and does not require authentication.
 * 
 * @param categoryId - Optional UUID of the category to filter skills by
 * @returns Promise<Skill[]> - Array of skill objects
 * @throws Error if the API request fails:
 *   - 404: Category not found (if categoryId provided)
 *   - 500: Server error
 * 
 * @example
 * ```typescript
 * // Get all skills
 * try {
 *   const allSkills = await getSkills();
 *   console.log(`Found ${allSkills.length} skills`);
 * } catch (error) {
 *   console.error('Failed to fetch skills:', error);
 * }
 * 
 * // Get skills for a specific category
 * try {
 *   const categorySkills = await getSkills('category-uuid-123');
 *   console.log(`Found ${categorySkills.length} skills for category`);
 * } catch (error) {
 *   console.error('Failed to fetch category skills:', error);
 * }
 * ```
 */
export const getSkills = async (categoryId?: string): Promise<Skill[]> => {
  try {
    let endpoint: string;
    
    if (categoryId) {
      // Fetch skills for specific category
      endpoint = `/categories/${categoryId}/skills`;
    } else {
      // Fetch all skills
      endpoint = '/skills';
    }
    
    const response = await apiClient.get<ApiSuccessResponse<{ skills: Skill[] }>>(
      endpoint
    );
    return response.data.data.skills;
  } catch (error) {
    if (categoryId) {
      console.error(`Error fetching skills for category ${categoryId}:`, error);
    } else {
      console.error('Error fetching skills:', error);
    }
    throw error;
  }
};

/**
 * Toggle the featured status of a portfolio project
 * 
 * This function updates the featured status of a portfolio project.
 * It's a convenience wrapper around updatePortfolioProject that specifically
 * handles the featured field.
 * 
 * @param projectId - The UUID identifier of the project to update
 * @param featured - The new featured status (true to feature, false to unfeature)
 * @returns Promise<PortfolioProject> - The updated portfolio project
 * @throws Error if the API request fails (same as updatePortfolioProject)
 * 
 * Requirements: 10.1, 10.3
 * 
 * @example
 * ```typescript
 * // Feature a project
 * try {
 *   const featuredProject = await toggleFeaturedStatus('project-uuid-123', true);
 *   console.log('Project featured:', featuredProject.featured);
 * } catch (error) {
 *   console.error('Failed to feature project:', error);
 * }
 * 
 * // Unfeature a project
 * try {
 *   const unfeaturedProject = await toggleFeaturedStatus('project-uuid-123', false);
 *   console.log('Project unfeatured:', unfeaturedProject.featured);
 * } catch (error) {
 *   console.error('Failed to unfeature project:', error);
 * }
 * ```
 */
export const toggleFeaturedStatus = async (
  projectId: string,
  featured: boolean
): Promise<PortfolioProject> => {
  return updatePortfolioProject(projectId, { featured });
};
