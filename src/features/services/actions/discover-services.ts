/**
 * API Service Functions for Discover Services Feature
 * Handles fetching services and categories from the backend API
 */

import apiClient from "@/lib/api-client";
import { AxiosError } from "axios";
import {
  APIService,
  APICategory,
  ServiceQueryParams,
  ServicesResponse,
  CategoriesResponse,
  APIError,
  isServicesResponse,
  isCategoriesResponse,
  isAPIError,
} from "../schema/discover-services-api";
import {
  Service,
  Category,
  formatDeliveryTime,
  formatRelativeTime,
  mapProviderLevel,
} from "../schema/discover-services-data";
import { ServiceDetailsData } from "../schema/single-view-data";

/**
 * Custom error class for API errors
 */
export class DiscoverServicesError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "DiscoverServicesError";
  }
}

/**
 * Transform API service to frontend format
 */
export const transformAPIServiceToFrontend = (
  apiService: APIService,
): Service => {
  // Construct full name from first_name and last_name
  const getProviderName = () => {
    if (apiService.freelancer?.first_name || apiService.freelancer?.last_name) {
      const firstName = apiService.freelancer.first_name || "";
      const lastName = apiService.freelancer.last_name || "";
      return `${firstName} ${lastName}`.trim();
    }
    // Fallback to name field if first_name/last_name not available
    return apiService.freelancer?.name || "Unknown";
  };

  return {
    id: apiService.id,
    serviceName: apiService.name,
    description: apiService.description,
    category: {
      id: apiService.category.id,
      name: apiService.category.name,
      slug: apiService.category.slug,
    },
    skills: apiService.skills.map((s) => s.name),
    pricing: {
      type: apiService.paymentType,
      starting: parseFloat(apiService.budgetMin.toString()), // Convert string to number
      currency: "PHP",
    },
    experienceLevel: apiService.experienceLevel,
    deliveryTime: formatDeliveryTime(apiService.deliveryDays),
    deliveryDays: apiService.deliveryDays,
    provider: {
      id: apiService.freelancer?.id || apiService.freelancerId,
      name: getProviderName(),
      avatar: apiService.freelancer?.avatar || "/images/default-avatar.png",
      level: mapProviderLevel(apiService.freelancer?.level || "new"),
      country: "Philippines", // TODO: Add to backend when available
    },
    postedDate: apiService.createdAt,
    postedAgo: formatRelativeTime(apiService.createdAt),
    totalOrders: 0, // TODO: Add to backend when available
    rating: 0, // TODO: Add to backend when available
    reviewCount: 0, // TODO: Add to backend when available
    isFeatured:
      apiService.upgrades?.some((u) => u.name === "Featured") || false,
    isUrgent: apiService.upgrades?.some((u) => u.name === "Urgent") || false,
    serviceUrl: `/client/services/${apiService.id}`,
    upgrades:
      apiService.upgrades?.map((upgrade) => ({
        id: upgrade.id,
        name: upgrade.name,
        pricePaid: parseFloat(upgrade.pricePaid.toString()),
        startDate: upgrade.startDate,
        endDate: upgrade.endDate,
      })) || [],
  };
};

/**
 * Transform API service detail to frontend ServiceDetailsData format
 */
export const transformAPIServiceDetailToFrontend = (
  apiService: APIService,
): ServiceDetailsData => {
  // Use the basic transformation for shared fields
  const baseService = transformAPIServiceToFrontend(apiService);

  // Extract gallery and thumbnail from attachments
  const attachments = apiService.attachments || [];
  const imageAttachments = attachments.filter((a) =>
    a.fileType.startsWith("image/"),
  );

  const hasImages = imageAttachments.length > 0;
  const thumbnail = hasImages
    ? imageAttachments[0].fileUrl
    : "/images/service-placeholder.png";
  const gallery = hasImages ? imageAttachments.map((a) => a.fileUrl) : [];

  return {
    ...baseService,
    longDescription: apiService.longDescription || apiService.description,
    category: apiService.category.name,
    thumbnail,
    gallery,
    hasImages,
    revisions: apiService.revisions || 3,
    features: apiService.skills.map((s) => s.name), // Fallback: use skills as features if separate features not available
    faqs: apiService.faqs || [],
    provider: {
      ...baseService.provider,
      title: "Service Provider", // Fallback
      country: "Philippines",
      countryCode: "PH",
      rating: 4.8, // Fallback
      reviewsCount: 12, // Fallback
      verified: true,
      responseTime: "1 hour",
    },
    rating: 4.8,
    reviewsCount: 12,
    totalOrders: 0,
    isTopRated: false,
  };
};

/**
 * Transform API category to frontend format
 */
export const transformAPICategoryToFrontend = (
  apiCategory: APICategory,
): Category => {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    icon: apiCategory.icon,
  };
};

/**
 * Handle API errors and transform to user-friendly messages
 */
const handleAPIError = (error: unknown): never => {
  // Log the error for debugging
  console.error("[handleAPIError] Caught error:", error);

  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<APIError>;

    // Network error
    if (!axiosError.response) {
      console.error("[handleAPIError] Network error detected");
      throw new DiscoverServicesError(
        "Network error, please check your connection",
        undefined,
        error,
      );
    }

    const statusCode = axiosError.response.status;
    const errorData = axiosError.response.data;

    console.error("[handleAPIError] Status code:", statusCode);
    console.error("[handleAPIError] Error data:", errorData);

    // Handle specific status codes
    switch (statusCode) {
      case 401:
        // 401 is allowed for public browsing, but we'll still throw for logging
        throw new DiscoverServicesError(
          "Authentication required, but you can continue browsing",
          401,
          error,
        );
      case 404:
        throw new DiscoverServicesError("No services found", 404, error);
      case 500:
        throw new DiscoverServicesError(
          "Server error, please try again later",
          500,
          error,
        );
      default:
        // Use API error message if available
        if (isAPIError(errorData)) {
          throw new DiscoverServicesError(
            errorData.message || "An error occurred",
            statusCode,
            error,
          );
        }
        throw new DiscoverServicesError(
          "An unexpected error occurred",
          statusCode,
          error,
        );
    }
  }

  // Unknown error type
  console.error("[handleAPIError] Unknown error type:", typeof error);
  throw new DiscoverServicesError(
    "An unexpected error occurred",
    undefined,
    error,
  );
};

/**
 * Validate services response
 */
const validateServicesResponse = (data: unknown): ServicesResponse => {
  if (!isServicesResponse(data)) {
    throw new DiscoverServicesError(
      "Invalid response format from server",
      undefined,
      data,
    );
  }
  return data;
};

/**
 * Validate categories response
 */
const validateCategoriesResponse = (data: unknown): CategoriesResponse => {
  if (!isCategoriesResponse(data)) {
    throw new DiscoverServicesError(
      "Invalid response format from server",
      undefined,
      data,
    );
  }
  return data;
};

/**
 * Fetch services from API with filters and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with services and pagination metadata
 */
export const fetchServices = async (
  params: ServiceQueryParams = {},
): Promise<{
  services: Service[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> => {
  try {
    // Build query parameters
    const queryParams: ServiceQueryParams = {
      // Don't filter by status - show all services
      // status: params.status || "active",  // Commented out - all services are draft in DB
      page: params.page || 1,
      limit: params.limit || 20,
      ...params,
    };

    // Remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== undefined),
    );

    // Make API request
    const response = await apiClient.get<ServicesResponse>("/services", {
      params: cleanParams,
    });

    console.log("[fetchServices] API Response:", response.data);

    // Validate response
    const validatedData = validateServicesResponse(response.data);

    console.log("[fetchServices] Validated data:", validatedData);
    console.log("[fetchServices] Services count:", validatedData.data.length);

    // Transform services to frontend format
    const services = validatedData.data.map(transformAPIServiceToFrontend);

    console.log("[fetchServices] Transformed services:", services.length);

    return {
      services,
      pagination: validatedData.pagination,
    };
  } catch (error) {
    // Handle 401 errors gracefully for public browsing
    if (error instanceof DiscoverServicesError && error.statusCode === 401) {
      console.warn(
        "Authentication required, but continuing with public browsing",
      );
      // Return empty result instead of throwing
      return {
        services: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },
      };
    }
    // This will throw an error and never return
    handleAPIError(error);
    // TypeScript needs this to understand the function never returns normally
    throw new Error("Unreachable");
  }
};

/**
 * Fetch all categories from API
 *
 * @returns Promise with array of categories
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    // Make API request
    const response = await apiClient.get<CategoriesResponse>("/categories");

    // Validate response
    const validatedData = validateCategoriesResponse(response.data);

    // Transform categories to frontend format
    const categories = validatedData.data.categories.map(
      transformAPICategoryToFrontend,
    );

    return categories;
  } catch (error) {
    handleAPIError(error);
    throw new Error("Unreachable");
  }
};

/**
 * Fetch a single service by ID
 *
 * @param serviceId - The service ID
 * @returns Promise with service data
 */
export const fetchServiceById = async (
  serviceId: string,
): Promise<ServiceDetailsData> => {
  try {
    const response = await apiClient.get<{
      success: boolean;
      data: APIService;
    }>(`/services/${serviceId}`);

    if (!response.data.success || !response.data.data) {
      throw new DiscoverServicesError("Service not found", 404);
    }

    return transformAPIServiceDetailToFrontend(response.data.data);
  } catch (error) {
    handleAPIError(error);
    throw new Error("Unreachable");
  }
};

/**
 * Fetch skills for a specific category
 *
 * @param categoryId - The category ID
 * @returns Promise with array of skill names
 */
export const fetchSkillsByCategory = async (
  categoryId: string,
): Promise<string[]> => {
  try {
    const response = await apiClient.get<{
      success: boolean;
      data: { skills: Array<{ id: string; name: string }> };
    }>(`/categories/${categoryId}/skills`);

    if (!response.data.success || !response.data.data) {
      return [];
    }

    // Extract skill names from the response
    return response.data.data.skills.map((skill) => skill.name);
  } catch (error) {
    console.error("Failed to fetch skills for category:", error);
    // Return empty array on error instead of throwing
    return [];
  }
};
