import apiClient, { ApiSuccessResponse } from "@/lib/api-client";
import {
  ProjectQueryParams,
  ProjectsResponse,
  CategoriesResponse,
  APIProject,
  Project,
  Category,
  Skill,
  SkillsResponse,
  ExperienceLevel,
  ProjectDuration,
} from "../schema/findwork-data";

/**
 * Fetch projects from the backend API
 * @param params - Query parameters for filtering projects
 * @returns API response with projects array and pagination metadata
 */
export const fetchProjects = async (
  params: ProjectQueryParams = {}
): Promise<ApiSuccessResponse<ProjectsResponse>> => {
  try {
    const queryParams = new URLSearchParams();

    // Fetch draft projects by default for testing
    queryParams.append("status", params.status || "draft");

    if (params.categoryId) {
      queryParams.append("categoryId", params.categoryId);
    }

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    console.log("[API] Fetching projects with params:", queryParams.toString());

    const response = await apiClient.get<ApiSuccessResponse<ProjectsResponse>>(
      `/projects?${queryParams.toString()}`
    );

    console.log("[API] Projects response:", response.data);

    return response.data;
  } catch (error) {
    console.error("[API] Error fetching projects:", error);
    throw error;
  }
};

/**
 * Fetch categories from the backend API
 * @returns API response with categories array
 */
export const fetchCategories = async (): Promise<
  ApiSuccessResponse<CategoriesResponse>
> => {
  try {
    console.log("[API] Fetching categories...");

    const response = await apiClient.get<
      ApiSuccessResponse<CategoriesResponse>
    >("/categories");

    console.log("[API] Categories response:", response.data);

    return response.data;
  } catch (error) {
    console.error("[API] Error fetching categories:", error);
    throw error;
  }
};

/**
 * Fetch skills for a specific category
 * @param categoryId - The ID of the category
 * @returns Array of skills
 */
export const getCategorySkills = async (
  categoryId: string
): Promise<Skill[]> => {
  try {
    const response = await apiClient.get<ApiSuccessResponse<SkillsResponse>>(
      `/categories/${categoryId}/skills`
    );
    return response.data.data.skills;
  } catch (error) {
    console.error(
      `[API] Error fetching skills for category ${categoryId}:`,
      error
    );
    return [];
  }
};

/**
 * Format delivery days into duration category
 */
const formatDuration = (deliveryDays: number): ProjectDuration => {
  if (deliveryDays <= 30) {
    return "less-than-1-month";
  } else if (deliveryDays <= 90) {
    return "1-3-months";
  } else if (deliveryDays <= 180) {
    return "3-6-months";
  } else {
    return "more-than-6-months";
  }
};

/**
 * Transform API project data to frontend format
 * @param apiProject - Project data from backend API
 * @returns Transformed project for frontend consumption
 */
export const transformAPIProjectToFrontend = (
  apiProject: APIProject
): Project => {
  return {
    id: apiProject.id,
    title: apiProject.name,
    description: apiProject.description,
    category: apiProject.category?.name || "Uncategorized",
    skills: apiProject.skills?.map((s) => s.name) || [],
    budget: {
      type: apiProject.paymentType,
      min: apiProject.budgetMin,
      max: apiProject.budgetMax,
      currency: "PHP",
    },
    client: {
      id: "unknown",
      name: "Client",
      country: "Unknown",
      countryCode: "XX",
      verified: false,
    },
    experienceLevel: apiProject.experienceLevel,
    duration: formatDuration(apiProject.deliveryDays),
    deliveryDays: apiProject.deliveryDays,
    postedDate: apiProject.createdAt,
    proposalsCount: 0, // TODO: Add to backend
    upgrades: apiProject.upgrades || [],
    projectUrl: `/freelancer/projects/${apiProject.id}`,
  };
};

/**
 * Fetch projects and transform to frontend format
 * @param params - Query parameters for filtering projects
 * @returns Transformed projects array and pagination metadata
 */
export const getProjects = async (
  params: ProjectQueryParams = {}
): Promise<{
  projects: Project[];
  pagination: ProjectsResponse["pagination"];
}> => {
  const response = await fetchProjects(params);

  console.log(
    "[getProjects] Full response:",
    JSON.stringify(response, null, 2)
  );

  if (!response.success) {
    throw new Error("Failed to fetch projects");
  }

  // Handle different possible response structures
  let projectsData: APIProject[] = [];
  let paginationData: ProjectsResponse["pagination"];

  // Check if response.data exists
  if (!response.data) {
    console.error("[getProjects] response.data is undefined:", response);
    throw new Error("API returned invalid response structure");
  }

  // Case 1: response.data.projects exists (expected structure)
  if (response.data.projects) {
    projectsData = response.data.projects;
    paginationData = response.data.pagination;
  }
  // Case 2: response.data is directly an array (alternative structure)
  else if (Array.isArray(response.data)) {
    console.warn(
      "[getProjects] API returned array directly, creating default pagination"
    );
    projectsData = response.data as unknown as APIProject[];
    paginationData = {
      page: params.page || 1,
      limit: params.limit || 20,
      total: projectsData.length,
      totalPages: 1,
    };
  }
  // Case 3: Unknown structure
  else {
    console.error(
      "[getProjects] Unexpected response structure:",
      response.data
    );
    throw new Error(
      `Unexpected API response structure: ${JSON.stringify(response.data)}`
    );
  }

  console.log("[getProjects] Found projects:", projectsData.length);

  const transformedProjects = projectsData.map(transformAPIProjectToFrontend);

  return {
    projects: transformedProjects,
    pagination: paginationData,
  };
};

/**
 * Fetch categories from API
 * @returns Categories array
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetchCategories();

  if (!response.success) {
    throw new Error("Failed to fetch categories");
  }

  return response.data.categories;
};
