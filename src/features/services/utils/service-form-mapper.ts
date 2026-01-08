import type { ServiceFormData } from '../schema/service-form.schema';
import type { CreateServiceRequest } from '../schema/service-post.schema';

/**
 * Maps the frontend form data structure to the backend API request structure
 * 
 * This function transforms the multi-step form data (ServiceFormData) into the
 * format expected by the POST /services API endpoint (CreateServiceRequest).
 * 
 * Key transformations:
 * - serviceName → name
 * - budget.min → budgetMin, budget.max → budgetMax
 * - deliveryDays: 0 for hourly services, actual value for fixed services
 * - skillIds → skills (optional, only if array has items)
 * - customSkillNames → customSkills (optional, only if array has items)
 * - selectedUpgrades → upgradeTypeIds (optional, only if array has items)
 * 
 * @param formData - The complete form data from all 4 steps
 * @returns CreateServiceRequest object ready for API submission
 * 
 * @example
 * ```typescript
 * const formData: ServiceFormData = {
 *   serviceName: 'Web Development Service',
 *   description: 'Professional web development...',
 *   paymentType: 'fixed',
 *   experienceLevel: 'expert',
 *   budget: { min: 500, max: 2000 },
 *   deliveryDays: 14,
 *   categoryId: 'uuid-123',
 *   skillIds: ['skill-1', 'skill-2'],
 *   customSkillNames: ['Custom Framework'],
 *   selectedUpgrades: ['upgrade-1'],
 *   // ... other fields
 * };
 * 
 * const apiRequest = mapFormDataToApiRequest(formData);
 * // Result:
 * // {
 * //   name: 'Web Development Service',
 * //   description: 'Professional web development...',
 * //   categoryId: 'uuid-123',
 * //   paymentType: 'fixed',
 * //   experienceLevel: 'expert',
 * //   budgetMin: 500,
 * //   budgetMax: 2000,
 * //   deliveryDays: 14,
 * //   skills: ['skill-1', 'skill-2'],
 * //   customSkills: ['Custom Framework'],
 * //   upgradeTypeIds: ['upgrade-1']
 * // }
 * ```
 */
export const mapFormDataToApiRequest = (formData: ServiceFormData): CreateServiceRequest => {
  // Build the base request object with required fields
  const request: CreateServiceRequest = {
    name: formData.serviceName,
    description: formData.description,
    categoryId: formData.categoryId,
    paymentType: formData.paymentType,
    experienceLevel: formData.experienceLevel,
    budgetMin: formData.budget.min,
    budgetMax: formData.budget.max,
    // For hourly services, deliveryDays should be 0
    // For fixed services, use the actual value from the form
    deliveryDays: formData.paymentType === 'hourly' ? 0 : formData.deliveryDays,
  };

  // Add optional fields only if they have values
  // This keeps the request payload clean and avoids sending empty arrays
  
  if (formData.skillIds && formData.skillIds.length > 0) {
    request.skills = formData.skillIds;
  }

  if (formData.customSkillNames && formData.customSkillNames.length > 0) {
    request.customSkills = formData.customSkillNames;
  }

  if (formData.selectedUpgrades && formData.selectedUpgrades.length > 0) {
    request.upgradeTypeIds = formData.selectedUpgrades;
  }

  return request;
};
