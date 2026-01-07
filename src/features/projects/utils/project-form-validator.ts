import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { ApiErrorResponse } from '../schema/project-post.schema';
import {
  projectNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
} from '../schema/project-form.schema';

// ============================================
// Types
// ============================================

/**
 * Validation result interface
 * Used to return validation status and error messages
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// ============================================
// API Error Handling
// ============================================

/**
 * Handle API errors and convert them to user-friendly messages
 * Maps HTTP status codes to appropriate error messages
 * 
 * @param error - The error object from the API call
 * @returns User-friendly error message
 * 
 * @example
 * try {
 *   await createProject(data);
 * } catch (error) {
 *   const message = handleApiError(error);
 *   toast.error(message);
 * }
 */
export const handleApiError = (error: unknown): string => {
  // Check if error is an Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // If we have a response from the server
    if (axiosError.response) {
      const apiError = axiosError.response.data;
      const statusCode = axiosError.response.status;
      
      // Map status codes to user-friendly messages
      switch (statusCode) {
        case 400:
          // Return validation message from backend
          return apiError?.message || 'Validation failed. Please check your input.';
        
        case 401:
          return 'Please log in to continue';
        
        case 403:
          return 'Only clients can create projects';
        
        case 404:
          return 'Resource not found';
        
        case 500:
          return 'Server error. Please try again later';
        
        default:
          return apiError?.message || 'An unexpected error occurred';
      }
    }
    
    // Network error (no response from server)
    if (axiosError.request) {
      return 'Network error. Please check your connection';
    }
  }
  
  // Unknown error type
  return 'An unexpected error occurred. Please try again';
};

// ============================================
// Form Validation Functions
// ============================================

/**
 * Validate project name
 * Must be between 10-200 characters
 * 
 * @param name - The project name to validate
 * @returns Validation result with error message if invalid
 * 
 * @example
 * const result = validateProjectName('My Project');
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export const validateProjectName = (name: string): ValidationResult => {
  try {
    projectNameSchema.parse(name);
    return { isValid: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        isValid: false,
        error: error.issues?.[0]?.message || 'Invalid project name',
      };
    }
    return {
      isValid: false,
      error: 'Invalid project name',
    };
  }
};

/**
 * Validate project description
 * Must be between 50-5000 characters
 * 
 * @param description - The project description to validate
 * @returns Validation result with error message if invalid
 * 
 * @example
 * const result = validateDescription('This is a detailed project description...');
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export const validateDescription = (description: string): ValidationResult => {
  try {
    descriptionSchema.parse(description);
    return { isValid: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        isValid: false,
        error: error.issues?.[0]?.message || 'Invalid description',
      };
    }
    return {
      isValid: false,
      error: 'Invalid description',
    };
  }
};

/**
 * Validate budget values
 * Ensures min and max are positive and min <= max
 * 
 * @param min - Minimum budget value
 * @param max - Maximum budget value
 * @returns Validation result with error message if invalid
 * 
 * @example
 * const result = validateBudget(100, 500);
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export const validateBudget = (min: number, max: number): ValidationResult => {
  try {
    budgetSchema.parse({ min, max });
    return { isValid: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        isValid: false,
        error: error.issues?.[0]?.message || 'Invalid budget values',
      };
    }
    return {
      isValid: false,
      error: 'Invalid budget values',
    };
  }
};

/**
 * Validate delivery days
 * Must be between 1-365 days
 * 
 * @param days - Number of delivery days
 * @returns Validation result with error message if invalid
 * 
 * @example
 * const result = validateDeliveryDays(30);
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export const validateDeliveryDays = (days: number): ValidationResult => {
  try {
    deliveryDaysSchema.parse(days);
    return { isValid: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        isValid: false,
        error: error.issues?.[0]?.message || 'Invalid delivery days',
      };
    }
    return {
      isValid: false,
      error: 'Invalid delivery days',
    };
  }
};

/**
 * Validate all form fields at once
 * Useful for final validation before submission
 * 
 * @param formData - Object containing all form fields
 * @returns Object with validation results for each field
 * 
 * @example
 * const results = validateAllFields({
 *   projectName: 'My Project',
 *   description: 'A detailed description...',
 *   budgetMin: 100,
 *   budgetMax: 500,
 *   deliveryDays: 30
 * });
 * 
 * if (!results.projectName.isValid) {
 *   console.error(results.projectName.error);
 * }
 */
export const validateAllFields = (formData: {
  projectName: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deliveryDays: number;
}): {
  projectName: ValidationResult;
  description: ValidationResult;
  budget: ValidationResult;
  deliveryDays: ValidationResult;
  isAllValid: boolean;
} => {
  const projectName = validateProjectName(formData.projectName);
  const description = validateDescription(formData.description);
  const budget = validateBudget(formData.budgetMin, formData.budgetMax);
  const deliveryDays = validateDeliveryDays(formData.deliveryDays);

  return {
    projectName,
    description,
    budget,
    deliveryDays,
    isAllValid: projectName.isValid && description.isValid && budget.isValid && deliveryDays.isValid,
  };
};
