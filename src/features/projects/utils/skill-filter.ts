import { Skill } from '../schema/project-post.schema';

/**
 * Filter skills based on user input query
 * Example: query="R" will match "React", "Ruby", "Rust"
 * 
 * @param skills - Array of available skills from API
 * @param query - User's search query
 * @param selectedSkills - Array of already selected skill names
 * @returns Filtered array of skills (max 10)
 */
export function filterSkillsByQuery(
  skills: Skill[],
  query: string,
  selectedSkills: string[]
): Skill[] {
  if (!query.trim()) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  
  return skills
    .filter(skill => 
      skill.name.toLowerCase().includes(lowerQuery) && 
      !isSkillAlreadySelected(skill.name, selectedSkills)
    )
    .slice(0, 10); // Limit to 10 recommendations
}

/**
 * Check if a skill name already exists in the selected skills list
 * 
 * @param skillName - Name of the skill to check
 * @param selectedSkills - Array of already selected skill names
 * @returns True if skill is already selected
 */
export function isSkillAlreadySelected(
  skillName: string,
  selectedSkills: string[]
): boolean {
  return selectedSkills.some(
    skill => skill.toLowerCase() === skillName.toLowerCase()
  );
}

/**
 * Validate custom skill input
 * 
 * @param skillName - Name of the custom skill to validate
 * @returns Validation result with error message if invalid
 */
export function validateCustomSkill(skillName: string): {
  isValid: boolean;
  error?: string;
} {
  const trimmedName = skillName.trim();
  
  if (!trimmedName) {
    return { 
      isValid: false, 
      error: 'Skill name cannot be empty' 
    };
  }
  
  if (trimmedName.length < 2) {
    return { 
      isValid: false, 
      error: 'Skill name must be at least 2 characters' 
    };
  }
  
  if (trimmedName.length > 50) {
    return { 
      isValid: false, 
      error: 'Skill name must not exceed 50 characters' 
    };
  }
  
  return { isValid: true };
}
