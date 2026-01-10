import { z } from 'zod';
import type { ExperienceLevel } from './discover-services-data';

// ============================================
// Form Types
// ============================================

/**
 * Payment type for services
 */
export type PaymentType = 'fixed' | 'hourly';

/**
 * Status of a service post
 */
export type ServiceStatus = 'draft' | 'pending' | 'active' | 'completed' | 'paused' | 'cancelled';

/**
 * Complete form data structure for the multi-step service posting form
 * This interface represents the UI state across all 4 steps
 */
export interface ServiceFormData {
  // Step 1: Basic Details
  serviceName: string;
  description: string;
  paymentType: PaymentType;
  experienceLevel: ExperienceLevel;
  budget: {
    min: number;
    max: number;
  };
  deliveryDays: number;
  attachments: File[];

  // Step 2: Categories & Skills
  category: string; // Category name for display
  categoryId: string; // Category UUID for API
  categorySlug: string; // Category slug for fetching skills
  skills: string[]; // Skill names for display
  skillIds: string[]; // Existing skill IDs for API
  customSkillNames: string[]; // Custom skill names for API

  // Step 3: Upgrades
  selectedUpgrades: string[]; // Upgrade IDs for API

  // Step 4: Preview & Submit
  status: ServiceStatus;
}

/**
 * Initial form data with default values
 */
export const initialFormData: ServiceFormData = {
  serviceName: '',
  description: '',
  paymentType: 'fixed',
  experienceLevel: 'intermediate',
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
  skillIds: [],
  customSkillNames: [],
  selectedUpgrades: [],
  status: 'draft',
};

// ============================================
// Form Validation Schemas
// ============================================

/**
 * Zod schema for validating service name
 * Must be between 10-200 characters
 */
export const serviceNameSchema = z.string()
  .min(10, 'Service name must be at least 10 characters')
  .max(200, 'Service name must not exceed 200 characters')
  .trim();

/**
 * Zod schema for validating service description
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
}).refine(data => data.min <= data.max, {
  message: 'Minimum budget cannot be greater than maximum budget',
  path: ['max'],
});

/**
 * Zod schema for validating delivery days
 * Must be between 1-365 days for fixed-price services
 * Can be 0 for hourly services
 */
export const deliveryDaysSchema = z.number()
  .min(0, 'Delivery days cannot be negative')
  .max(365, 'Delivery days must not exceed 365')
  .int('Delivery days must be a whole number');

/**
 * Zod schema for validating payment type
 */
export const paymentTypeSchema = z.enum(['fixed', 'hourly'], {
  message: 'Payment type must be either fixed or hourly'
});

/**
 * Zod schema for validating experience level
 */
export const experienceLevelSchema = z.enum(['beginner', 'intermediate', 'expert'], {
  message: 'Experience level must be beginner, intermediate, or expert'
});

/**
 * Zod schema for validating category selection
 */
export const categorySchema = z.string()
  .min(1, 'Please select a category')
  .uuid('Invalid category ID');

/**
 * Zod schema for validating skills array
 * Must have at least 1 skill and maximum 20 skills
 */
export const skillsSchema = z.array(z.string())
  .min(1, 'Please add at least one skill')
  .max(20, 'Maximum 20 skills allowed');

/**
 * Zod schema for validating custom skill names
 * Each custom skill name must not be empty
 */
export const customSkillsSchema = z.array(
  z.string().min(1, 'Custom skill name cannot be empty')
).optional();

/**
 * Zod schema for validating file attachments
 * Maximum 5 files allowed
 */
export const attachmentsSchema = z.array(z.instanceof(File))
  .max(5, 'Maximum 5 files allowed')
  .optional();

/**
 * Zod schema for validating service status
 */
export const serviceStatusSchema = z.enum(['draft', 'pending', 'active', 'completed', 'paused', 'cancelled'], {
  message: 'Invalid service status'
});
