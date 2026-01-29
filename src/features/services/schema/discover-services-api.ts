/**
 * API Types for Discover Services Feature
 * These types match the backend API response structure
 */

// Backend API Service Model
export interface APIService {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  };
  paymentType: "fixed" | "hourly";
  budgetMin: number | string; // Can be string from API
  budgetMax: number | string; // Can be string from API
  deliveryDays: number;
  experienceLevel: "beginner" | "intermediate" | "expert";
  status: "draft" | "pending" | "active" | "completed" | "paused" | "cancelled";
  createdAt: string;
  updatedAt: string;
  freelancerId: string;
  freelancer?: {
    // Made optional
    id: string;
    name?: string; // Deprecated - use first_name and last_name
    first_name?: string;
    last_name?: string;
    email: string;
    avatar?: string;
    level?: string;
  };
  skills: Array<{
    id: string;
    name: string;
    isCustom: boolean;
  }>;
  upgrades?: Array<{
    id: string;
    upgradeTypeId?: string;
    name: string;
    pricePaid: number | string;
    startDate?: string;
    endDate?: string;
  }>;
  attachments?: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
  }>;
  longDescription?: string;
  revisions?: number;
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

// Backend API Category Model
export interface APICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

// API Request Parameters
export interface ServiceQueryParams {
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  experienceLevel?: string;
  paymentType?: string;
}

// API Response Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ServicesResponse {
  success: boolean;
  data: APIService[]; // Changed: data is directly an array
  pagination: PaginationMeta; // Changed: pagination is a sibling property
  message?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: APICategory[];
  };
  message?: string;
}

// Error Response Types
export interface APIError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends APIError {
  errors?: ValidationError[];
}

// Type Guards
export const isServicesResponse = (data: unknown): data is ServicesResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "data" in data &&
    Array.isArray((data as ServicesResponse).data) && // Changed: data is directly an array
    "pagination" in data && // Changed: pagination is a sibling property
    typeof (data as ServicesResponse).pagination === "object"
  );
};

export const isCategoriesResponse = (
  data: unknown,
): data is CategoriesResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "data" in data &&
    typeof (data as CategoriesResponse).data === "object" &&
    "categories" in (data as CategoriesResponse).data &&
    Array.isArray((data as CategoriesResponse).data.categories)
  );
};

export const isAPIError = (error: unknown): error is APIError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    (error as APIError).success === false &&
    "error" in error &&
    "message" in error
  );
};
