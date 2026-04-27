import apiClient, { ApiSuccessResponse } from '@/lib/api-client';
import { Project } from '../schema/projects-data';

interface FreelancerWorkspacesResponse {
  projects: Project[];
}

/**
 * Fetch all workspace projects for the authenticated freelancer
 * 
 * @returns Promise<Project[]> - Array of project objects
 */
export const getFreelancerWorkspaces = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<FreelancerWorkspacesResponse>>(
      '/projects/workspaces/me'
    );
    
    // The backend returns the array directly under projects
    return response.data.data.projects;
  } catch (error) {
    console.error('Error fetching freelancer workspaces:', error);
    throw error;
  }
};

/**
 * Update the status of a workspace project
 * 
 * @param workspaceId - Workspace ID
 * @param status - New status
 * @returns Promise<void>
 */
export const updateWorkspaceStatus = async (
  workspaceId: string, 
  status: "active" | "paused" | "completed"
): Promise<void> => {
  try {
    await apiClient.patch(
      `/projects/workspaces/${workspaceId}/status`,
      { status }
    );
  } catch (error) {
    console.error(`Error updating workspace status for ${workspaceId}:`, error);
    throw error;
  }
};
