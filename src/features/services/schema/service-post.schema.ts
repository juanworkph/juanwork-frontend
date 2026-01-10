import { z } from 'zod';

// ============================================
// API Types
// ============================================

/**
 * Request payload for creating a new service
 */
export interface CreateServiceRequest {
  name: string;
  description: string;
  categoryId: string;
  paymentType: 'fixed' | 'hourly';
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  skills?: string[]; // Existing skill IDs
  customSkills?: string[]; // Custom skill names to create
  upgradeTypeIds?: string[];
}

/**
 * Response payload after successfully creating a service
 */
export interface CreateServiceResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

/**
/**
 * Category entity from the backend (API response)
 */
export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

/**
 * Skill entity from the backend
 */
export interface Skill {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

/**
 * Upgrade type entity from the backend
 * Note: basePrice comes from PostgreSQL numeric type as string
 */
export interface UpgradeType {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number | string; // Can be string from database or number after parsing
  isActive: boolean;
}

/**
 * Attachment entity from the backend
 */
export interface Attachment {
  id: string;
  referenceModel: string;
  referenceId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
}

/**
 * Full service entity from the backend with all relations
 */
export interface ServiceResponse {
  id: string;
  freelancerId: string;
  categoryId: string;
  name: string;
  description: string;
  paymentType: 'fixed' | 'hourly';
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryEntity;
  skills: Skill[];
  upgrades: UpgradeType[];
  attachments: Attachment[];
}

/**
 * Paginated services list response
 */
export interface ServicesListResponse {
  services: ServiceResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Generic success response wrapper from the API
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Generic error response wrapper from the API
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// ============================================
// Zod Validation Schemas
// ============================================

/**
 * Zod schema for validating service creation requests
 * Ensures all fields meet backend requirements before submission
 * Includes conditional validation for deliveryDays based on paymentType
 */
export const createServiceSchema = z.object({
  name: z.string()
    .min(10, 'Service name must be at least 10 characters')
    .max(200, 'Service name must not exceed 200 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  categoryId: z.string().uuid('Invalid category'),
  paymentType: z.enum(['fixed', 'hourly'], {
    message: 'Payment type must be either fixed or hourly'
  }),
  experienceLevel: z.enum(['beginner', 'intermediate', 'expert'], {
    message: 'Experience level must be beginner, intermediate, or expert'
  }),
  budgetMin: z.number()
    .min(1, 'Minimum budget must be at least 1'),
  budgetMax: z.number()
    .min(1, 'Maximum budget must be at least 1'),
  deliveryDays: z.number()
    .min(0, 'Delivery days cannot be negative')
    .max(365, 'Delivery days must not exceed 365')
    .int('Delivery days must be a whole number'),
  skills: z.array(z.string().uuid()).optional(),
  customSkills: z.array(z.string().min(1, 'Custom skill name cannot be empty')).optional(),
  upgradeTypeIds: z.array(z.string().uuid()).optional(),
})
  .refine(data => data.budgetMin <= data.budgetMax, {
    message: 'Minimum budget cannot be greater than maximum budget',
    path: ['budgetMax'],
  })
  .refine(
    data => {
      // If payment type is 'fixed', deliveryDays must be between 1-365
      if (data.paymentType === 'fixed') {
        return data.deliveryDays >= 1 && data.deliveryDays <= 365;
      }
      // If payment type is 'hourly', deliveryDays can be 0 or any value
      return true;
    },
    {
      message: 'Delivery days must be between 1 and 365 for fixed-price services',
      path: ['deliveryDays'],
    }
  );

/**
 * TypeScript type inferred from the Zod schema
 */
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
