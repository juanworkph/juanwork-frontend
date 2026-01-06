import { z } from 'zod';

// ============================================
// Form Types
// ============================================

/**
 * Payment type for projects
 */
export type ProjectType = 'fixed' | 'hourly';

/**
 * Status of a project post
 */
export type PostProjectStatus = 'draft' | 'pending' | 'active' | 'rejected';

/**
 * Complete form data structure for the multi-step project posting form
 * This interface represents the UI state across all 4 steps
 */
export interface ProjectFormData {
  // Step 1: Basic Details
  projectName: string;
  description: string;
  projectType: ProjectType;
  budget: {
    min: number;
    max: number;
    hourlyRate?: number;
  };
  deliveryDays: number;
  attachments: File[];

  // Step 2: Categories & Skills
  category: string; // Category name for display
  categoryId: string; // Category UUID for API
  categorySlug: string; // Category slug for fetching skills
  skills: string[]; // Skill names for display

  // Step 3: Upgrades
  selectedUpgrades: string[]; // Upgrade IDs for API

  // Step 4: Preview & Submit
  status: PostProjectStatus;
}

/**
 * Initial form data with default values
 */
export const initialFormData: ProjectFormData = {
  projectName: '',
  description: '',
  projectType: 'fixed',
  budget: {
    min: 0,
    max: 0,
  },
  deliveryDays: 7,
  attachments: [],
  category: '',
  categoryId: '',
  categorySlug: '',
  skills: [],
  selectedUpgrades: [],
  status: 'draft',
};

// ============================================
// Form Validation Schemas
// ============================================

/**
 * Zod schema for validating project name
 * Must be between 10-200 characters
 */
export const projectNameSchema = z.string()
  .min(10, 'Project name must be at least 10 characters')
  .max(200, 'Project name must not exceed 200 characters')
  .trim();

/**
 * Zod schema for validating project description
 * Must be between 50-5000 characters
 */
export const descriptionSchema = z.string()
  .min(50, 'Description must be at least 50 characters')
  .max(5000, 'Description must not exceed 5000 characters')
  .trim();

/**
 * Zod schema for validating budget values
 * Ensures min <= max and both are positive
 */
export const budgetSchema = z.object({
  min: z.number()
    .min(1, 'Minimum budget must be at least 1'),
  max: z.number()
    .min(1, 'Maximum budget must be at least 1'),
  hourlyRate: z.number().optional(),
}).refine(data => data.min <= data.max, {
  message: 'Minimum budget cannot be greater than maximum budget',
  path: ['max'],
});

/**
 * Zod schema for validating delivery days
 * Must be between 1-365 days
 */
export const deliveryDaysSchema = z.number()
  .min(1, 'Delivery days must be at least 1')
  .max(365, 'Delivery days must not exceed 365')
  .int('Delivery days must be a whole number');

/**
 * Zod schema for validating project type
 */
export const projectTypeSchema = z.enum(['fixed', 'hourly'], {
  message: 'Project type must be either fixed or hourly'
});

/**
 * Zod schema for validating category selection
 */
export const categorySchema = z.string()
  .min(1, 'Please select a category')
  .uuid('Invalid category ID');

/**
 * Zod schema for validating skills array
 */
export const skillsSchema = z.array(z.string())
  .min(1, 'Please add at least one skill')
  .max(20, 'Maximum 20 skills allowed');

/**
 * Zod schema for validating file attachments
 */
export const attachmentsSchema = z.array(z.instanceof(File))
  .max(5, 'Maximum 5 files allowed')
  .optional();
