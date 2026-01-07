import { ProjectFormData } from '../schema/project-form.schema';
import { 
  CreateProjectRequest, 
  Category, 
  UpgradeType 
} from '../schema/project-post.schema';

/**
 * Maps frontend form data to backend API request format
 * Transforms UI-friendly field names to API-expected field names
 * 
 * @param formData - The complete form data from the multi-step form
 * @returns CreateProjectRequest - API-ready request payload
 * 
 * Validates Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */
export const mapFormDataToApiRequest = (
  formData: ProjectFormData
): CreateProjectRequest => {
  return {
    // Requirement 9.1: Map projectName to name
    name: formData.projectName,
    
    // Requirement 9.1: Map description
    description: formData.description,
    
    // Requirement 9.2: Map category to categoryId (UUID)
    categoryId: formData.categoryId,
    
    // Requirement 9.5: Map projectType to paymentType
    paymentType: formData.projectType,
    
    // Requirement 9.6: Include budgetMin and budgetMax as numbers
    budgetMin: formData.budget.min,
    budgetMax: formData.budget.max,
    
    // Requirement 9.6: Include deliveryDays as number (only for fixed price projects)
    // For hourly projects, send 1 as placeholder (backend requires positive number)
    deliveryDays: formData.projectType === 'fixed' ? formData.deliveryDays : 1,
    
    // Requirement 9.3: Map existing skill IDs to skills array
    skills: formData.skillIds && formData.skillIds.length > 0 ? formData.skillIds : undefined,
    
    // Requirement 9.3: Map custom skill names to customSkills array
    customSkills: formData.customSkillNames && formData.customSkillNames.length > 0 
      ? formData.customSkillNames 
      : undefined,
    
    // Requirement 9.4: Map selectedUpgrades to upgradeTypeIds array (only if upgrades exist)
    upgradeTypeIds: formData.selectedUpgrades.length > 0 
      ? formData.selectedUpgrades 
      : undefined,
  };
};

/**
 * Finds a category by its name from the categories array
 * Case-sensitive exact match
 * 
 * @param categoryName - The name of the category to find
 * @param categories - Array of all available categories
 * @returns Category object if found, undefined otherwise
 * 
 * Validates Requirement: 9.2
 */
export const findCategoryByName = (
  categoryName: string,
  categories: Category[]
): Category | undefined => {
  return categories.find(cat => cat.name === categoryName);
};

/**
 * Finds multiple upgrades by their IDs
 * Returns only the upgrades that match the provided IDs
 * 
 * @param upgradeIds - Array of upgrade type IDs to find
 * @param upgrades - Array of all available upgrade types
 * @returns Array of matching UpgradeType objects
 * 
 * Validates Requirement: 9.2
 */
export const findUpgradesByIds = (
  upgradeIds: string[],
  upgrades: UpgradeType[]
): UpgradeType[] => {
  return upgrades.filter(upgrade => upgradeIds.includes(upgrade.id));
};

/**
 * Calculates the total cost of selected upgrades
 * Sums up the basePrice of all selected upgrade types
 * Handles basePrice as either number or string (from database)
 * 
 * @param upgradeIds - Array of selected upgrade type IDs
 * @param upgrades - Array of all available upgrade types
 * @returns Total cost as a number (sum of all basePrice values)
 * 
 * Validates Requirement: 9.2
 */
export const calculateTotalUpgradeCost = (
  upgradeIds: string[],
  upgrades: UpgradeType[]
): number => {
  const selectedUpgrades = findUpgradesByIds(upgradeIds, upgrades);
  return selectedUpgrades.reduce((total, upgrade) => {
    // Convert basePrice to number (handles both string and number types)
    const price = typeof upgrade.basePrice === 'string' 
      ? parseFloat(upgrade.basePrice) 
      : upgrade.basePrice;
    return total + (isNaN(price) ? 0 : price);
  }, 0);
};
