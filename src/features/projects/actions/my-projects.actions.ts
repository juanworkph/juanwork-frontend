import apiClient, { ApiSuccessResponse } from '@/lib/api-client';
import { 
  IProjectResponse, 
  MyProject,
  transformProjectsResponse 
} from '../schema/my-projects-data';

/**
 * API response interface for user projects endpoint
 */
interface UserProjectsResponse {
  projects: IProjectResponse[];
}

/**
 * Fetch all projects for the authenticated user
 * 
 * This function retrieves all projects posted by the currently authenticated client.
 * It requires a valid authentication token in the request headers.
 * 
 * @returns Promise<MyProject[]> - Array of transformed project objects
 * @throws Error if the API request fails (401, 403, 500, etc.)
 * 
 * Requirements: 1.1, 1.5
 * 
 * @example
 * ```typescript
 * try {
 *   const projects = await getUserProjects();
 *   console.log(`Found ${projects.length} projects`);
 * } catch (error) {
 *   console.error('Failed to fetch projects:', error);
 * }
 * ```
 */
export const getUserProjects = async (): Promise<MyProject[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<UserProjectsResponse>>(
      '/projects/user/me'
    );
    
    // Extract projects array from response
    const apiProjects = response.data.data.projects;
    
    // Transform API response to UI model
    return transformProjectsResponse(apiProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

/**
 * Delete a project by its ID
 * 
 * This function deletes a project owned by the authenticated user.
 * It requires proper authentication and authorization (user must be the project owner).
 * 
 * @param projectId - The UUID identifier of the project to delete
 * @returns Promise<void> - Resolves when deletion is successful
 * @throws Error if the API request fails:
 *   - 401: Unauthorized (no token or invalid token)
 *   - 403: Forbidden (not project owner)
 *   - 404: Project not found
 *   - 500: Server error
 * 
 * Requirements: 6.4
 * 
 * @example
 * ```typescript
 * try {
 *   await deleteProject('project-uuid-123');
 *   console.log('Project deleted successfully');
 * } catch (error) {
 *   if (error.response?.status === 403) {
 *     console.error('You do not have permission to delete this project');
 *   } else if (error.response?.status === 404) {
 *     console.error('Project not found');
 *   } else {
 *     console.error('Failed to delete project:', error);
 *   }
 * }
 * ```
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await apiClient.delete(`/projects/${projectId}`);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};
