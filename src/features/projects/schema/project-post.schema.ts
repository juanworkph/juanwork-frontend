import { z } from 'zod';

// ============================================
// API Types
// ============================================

/**
 * Request payload for creating a new project
 */
export interface CreateProjectRequest {
  name: string;
  description: string;
  categoryId: string;
  paymentType: 'fixed' | 'hourly';
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  skills?: string[]; // Existing skill IDs
  customSkills?: string[]; // Custom skill names to create
  upgradeTypeIds?: string[];
}

/**
 * Response payload after successfully creating a project
 */
export interface CreateProjectResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

/**
 * Category entity from the backend
 */
export interface Category {
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
 * Full project entity from the backend
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  paymentType: 'fixed' | 'hourly';
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
  status: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Paginated projects list response
 */
export interface ProjectsListResponse {
  projects: Project[];
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
 * Zod schema for validating project creation requests
 * Ensures all fields meet backend requirements before submission
 */
export const createProjectSchema = z.object({
  name: z.string()
    .min(10, 'Project name must be at least 10 characters')
    .max(200, 'Project name must not exceed 200 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  categoryId: z.string().uuid('Invalid category'),
  paymentType: z.enum(['fixed', 'hourly'], {
    message: 'Payment type must be either fixed or hourly'
  }),
  budgetMin: z.number()
    .min(1, 'Minimum budget must be at least 1'),
  budgetMax: z.number()
    .min(1, 'Maximum budget must be at least 1'),
  deliveryDays: z.number()
    .min(1, 'Delivery days must be at least 1')
    .max(365, 'Delivery days must not exceed 365'),
  skills: z.array(z.string().uuid()).optional(),
  customSkills: z.array(z.string()).optional(),
  upgradeTypeIds: z.array(z.string().uuid()).optional(),
}).refine(data => data.budgetMin <= data.budgetMax, {
  message: 'Minimum budget cannot be greater than maximum budget',
  path: ['budgetMax'],
});

/**
 * TypeScript type inferred from the Zod schema
 */
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
