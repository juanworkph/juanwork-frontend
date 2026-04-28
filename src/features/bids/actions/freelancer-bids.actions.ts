import apiClient, { ApiSuccessResponse } from '@/lib/api-client';
import { Bid, BidStatus } from '../schema/bids-data';

/**
 * Backend interface for the freelancer bid with project details
 */
export interface ApiFreelancerBid {
  id: string;
  projectId: string;
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    skills: string[];
    budget: {
      min: number;
      max: number;
      type: "fixed" | "hourly";
    };
    postedAt: string;
    deadline: string;
    projectUrl: string;
    experienceLevel: string;
    upgrades: string[];
  };
  client: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  amount: number;
  bidType: "fixed" | "hourly";
  coverLetter: string | null;
  bidDate: string;
  status: BidStatus;
  bidderCount: number;
  lowestBidAmount: number;
  clientViewed: boolean;
  expiresAt?: string;
}

interface FreelancerBidsResponse {
  bids: ApiFreelancerBid[];
}

/**
 * Transforms an API freelancer bid to the UI Bid model
 */
const transformFreelancerBid = (apiBid: ApiFreelancerBid): Bid => {
  return {
    id: apiBid.id,
    projectId: apiBid.projectId,
    project: {
      id: apiBid.project.id,
      title: apiBid.project.title,
      description: apiBid.project.description,
      category: apiBid.project.category,
      skills: apiBid.project.skills,
      budget: apiBid.project.budget,
      postedAt: apiBid.project.postedAt,
      deadline: apiBid.project.deadline,
      projectUrl: apiBid.project.projectUrl,
      
      // Map real project experience/features
      experience: apiBid.project.experienceLevel === 'beginner' 
        ? 'entry' 
        : (apiBid.project.experienceLevel as "intermediate" | "expert"),
      featured: apiBid.project.upgrades?.includes('featured') || false,
      upgrades: apiBid.project.upgrades || [],
      
      // Location is still not in DB project schema
      location: "Remote",
    },
    client: {
      id: apiBid.client.id,
      name: apiBid.client.name,
      avatar: apiBid.client.avatar || undefined,
      verified: apiBid.client.verified,
      // Placeholders for missing client info
      country: "United States",
      rating: 4.8,
      totalSpent: 10000,
      projectsPosted: 15,
      hireRate: 85,
      memberSince: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    amount: apiBid.amount,
    bidType: apiBid.bidType,
    coverLetter: apiBid.coverLetter || '',
    bidDate: apiBid.bidDate,
    status: apiBid.status,
    bidderCount: apiBid.bidderCount,
    lowestBidAmount: apiBid.lowestBidAmount,
    clientViewed: apiBid.clientViewed,
    expiresAt: apiBid.expiresAt,
    // Add missing properties expected by the frontend
    views: 0, // Hardcoded per user request
  };
};

/**
 * Fetch all bids placed by the authenticated freelancer
 * 
 * @returns Promise<Bid[]> - Array of transformed bid objects
 */
export const getFreelancerBids = async (): Promise<Bid[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<FreelancerBidsResponse>>(
      '/projects/bids/me'
    );
    
    // Extract bids array from response
    const apiBids = response.data.data.bids;
    
    // Transform API response to UI model
    return apiBids.map(transformFreelancerBid);
  } catch (error) {
    console.error('Error fetching freelancer bids:', error);
    throw error;
  }
};

/**
 * Withdraw a bid by its ID (which matches the project ID routing in our backend for DELETE)
 * Actually, the backend DELETE route is /projects/:projectId/bids
 * So we need the projectId to cancel a bid.
 * 
 * @param projectId - The project ID of the bid to withdraw
 */
export const withdrawFreelancerBid = async (projectId: string): Promise<void> => {
  try {
    await apiClient.delete(`/projects/${projectId}/bids`);
  } catch (error) {
    console.error(`Error withdrawing bid for project ${projectId}:`, error);
    throw error;
  }
};
