import { z } from 'zod';
import { ProjectCategory, ProjectStatus } from './portfolio-data';

// ============================================
// Form Validation Schemas
// ============================================

/**
 * Zod schema for validating project title
 * Requirements: 20.1 - Title must be 5-100 characters
 */
export const titleSchema = z.string()
  .min(5, 'Title must be at least 5 characters')
  .max(100, 'Title must not exceed 100 characters')
  .trim();

/**
 * Zod schema for validating project description
 * Requirements: 20.2 - Description must be 20-2000 characters
 */
export const descriptionSchema = z.string()
  .min(20, 'Description must be at least 20 characters')
  .max(2000, 'Description must not exceed 2000 characters')
  .trim();

/**
 * Zod schema for validating short description
 * Requirements: 20.3 - Short description must be 20-200 characters
 */
export const shortDescriptionSchema = z.string()
  .min(20, 'Short description must be at least 20 characters')
  .max(200, 'Short description must not exceed 200 characters')
  .trim();

/**
 * Zod schema for validating category
 * Requirements: 20.5 - Valid category selection required
 * Note: Accepts any string since categories are fetched dynamically from the database
 */
export const categorySchema = z.string()
  .min(1, 'Please select a category');

/**
 * Zod schema for validating status
 * Requirements: 20.6 - Valid status selection required
 */
export const statusSchema = z.enum([
  'completed',
  'in-progress',
  'concept',
], {
  message: 'Please select a valid status'
});

/**
 * Zod schema for validating technologies array
 * Requirements: 20.4 - At least one technology required
 */
export const technologiesSchema = z.array(z.string())
  .min(1, 'Please add at least one technology')
  .max(20, 'Maximum 20 technologies allowed');

/**
 * Zod schema for validating skills array
 */
export const skillsSchema = z.array(z.string())
  .max(20, 'Maximum 20 skills allowed')
  .optional();

/**
 * Zod schema for validating image URL
 * Requirements: 9.3, 9.5 - Valid URL format
 */
export const imageUrlSchema = z.string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

/**
 * Zod schema for validating gallery URLs
 */
export const galleryUrlsSchema = z.array(z.string().url('Please enter a valid URL'))
  .max(10, 'Maximum 10 gallery images allowed')
  .optional();

/**
 * Zod schema for validating project links
 * Requirements: 16.1-16.5 - Valid URL format for links
 */
export const linkUrlSchema = z.string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

/**
 * Zod schema for validating testimonial rating
 * Requirements: 17.2 - Rating must be 1-5 stars
 */
export const ratingSchema = z.number()
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating must not exceed 5')
  .int('Rating must be a whole number')
  .optional();

/**
 * Zod schema for validating budget
 * Requirements: 18.1 - Budget must be positive
 */
export const budgetSchema = z.number()
  .min(0, 'Budget must be a positive number')
  .optional();

/**
 * Zod schema for validating team size
 * Requirements: 18.2 - Team size must be positive integer
 */
export const teamSizeSchema = z.number()
  .min(1, 'Team size must be at least 1')
  .int('Team size must be a whole number')
  .optional();

/**
 * Simplified portfolio project form schema
 * Only includes essential fields for portfolio creation
 */
export const portfolioProjectFormSchema = z.object({
  // Basic Info (Required)
  title: titleSchema,
  description: descriptionSchema,
  category: categorySchema,

  // Skills (Optional)
  skills: skillsSchema,

  // Client Info (Optional)
  clientName: z.string().max(100, 'Client name must not exceed 100 characters').optional().or(z.literal('')),

  // Media (Optional)
  thumbnailUrl: imageUrlSchema,

  // Links (Optional)
  liveUrl: linkUrlSchema,
  githubUrl: linkUrlSchema,
  demoUrl: linkUrlSchema,
});

/**
 * Type inference from schema
 */
export type PortfolioProjectFormData = z.infer<typeof portfolioProjectFormSchema>;

/**
 * Default form values
 */
export const defaultFormValues: Partial<PortfolioProjectFormData> = {
  title: '',
  description: '',
  category: 'web-development',
  skills: [],
  clientName: '',
  thumbnailUrl: '',
  liveUrl: '',
  githubUrl: '',
  demoUrl: '',
};
