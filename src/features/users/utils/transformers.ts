/**
 * Data Transformation Utilities
 * 
 * This file contains pure functions for transforming data between
 * backend API format and frontend format.
 */

import {
  Freelancer,
  Category,
  APIFreelancer,
  APICategory,
  APISkill,
  FreelancerAvailability,
  FreelancerExperienceLevel,
} from '../schema/discover-freelancers-data';

// ============================================================================
// MAPPING FUNCTIONS
// ============================================================================

/**
 * Map backend availability string to frontend availability type
 */
export const mapAvailability = (availability?: string): FreelancerAvailability => {
  if (!availability) return 'not-available';
  
  const map: Record<string, FreelancerAvailability> = {
    'available-now': 'available-now',
    'available': 'available-now',
    'available-1-week': 'available-1-week',
    'available-2-weeks': 'available-2-weeks',
    'not-available': 'not-available',
    'busy': 'not-available',
  };
  
  return map[availability.toLowerCase()] || 'not-available';
};

/**
 * Map backend experience level to frontend type
 */
export const mapExperienceLevel = (level?: string): FreelancerExperienceLevel => {
  if (!level) return 'beginner';
  
  const map: Record<string, FreelancerExperienceLevel> = {
    'beginner': 'beginner',
    'entry': 'beginner',
    'intermediate': 'intermediate',
    'expert': 'expert',
    'advanced': 'expert',
  };
  
  return map[level.toLowerCase()] || 'beginner';
};

/**
 * Parse JSON string safely
 */
const parseJSON = <T>(jsonString?: string, defaultValue: T = [] as T): T => {
  if (!jsonString) return defaultValue;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return defaultValue;
  }
};

// ============================================================================
// TRANSFORMATION FUNCTIONS
// ============================================================================

/**
 * Transform backend freelancer to frontend format
 */
export const transformAPIFreelancerToFrontend = (apiFreelancer: APIFreelancer): Freelancer => {
  // Parse JSON fields safely
  const skills = parseJSON<string[]>(apiFreelancer.skills, []);
  const languages = parseJSON<string[]>(apiFreelancer.languages, []);
  
  // Parse hourly rate
  const hourlyRateValue = apiFreelancer.hourlyRate 
    ? parseFloat(apiFreelancer.hourlyRate) 
    : 20; // Default placeholder rate
  
  // Construct full name
  const name = `${apiFreelancer.firstName || ''} ${apiFreelancer.lastName || ''}`.trim() || 'Freelancer';
  
  // Determine location
  const location = apiFreelancer.country || 
                   apiFreelancer.city || 
                   'Philippines'; // Default placeholder
  
  // Get category info (use placeholder if not available)
  const category = apiFreelancer.category || {
    id: apiFreelancer.categoryId || 'general',
    name: 'General',
    slug: 'general',
  };
  
  // Infer experience level from completed jobs (placeholder logic)
  let experienceLevel: FreelancerExperienceLevel = 'beginner';
  if (apiFreelancer.completedJobs) {
    if (apiFreelancer.completedJobs >= 50) {
      experienceLevel = 'expert';
    } else if (apiFreelancer.completedJobs >= 10) {
      experienceLevel = 'intermediate';
    }
  }
  
  return {
    id: apiFreelancer.id,
    name,
    title: apiFreelancer.title || 'Freelancer', // Placeholder
    bio: apiFreelancer.bio || 'Experienced freelancer ready to help with your project.', // Placeholder
    avatar: apiFreelancer.avatar || '', // Empty string if no avatar, component will handle fallback
    category,
    skills: skills.length > 0 ? skills : ['General Skills'], // Placeholder
    hourlyRate: {
      min: hourlyRateValue,
      max: hourlyRateValue * 1.5, // Estimate max as 1.5x min
      currency: 'PHP',
    },
    experienceLevel,
    rating: apiFreelancer.rating || 0, // Placeholder
    reviewCount: apiFreelancer.reviewCount || 0, // Placeholder
    completedJobs: apiFreelancer.completedJobs || 0, // Placeholder
    successRate: apiFreelancer.successRate || 0, // Placeholder
    availability: mapAvailability(apiFreelancer.availability),
    location,
    languages: languages.length > 0 ? languages : ['English'], // Default to English
    isTopRated: apiFreelancer.isTopRated || false,
    isVerified: apiFreelancer.isVerified || apiFreelancer.emailVerified || false,
    profileUrl: `/client/freelancers/${apiFreelancer.id}`,
  };
};

/**
 * Transform backend category to frontend format
 */
export const transformAPICategoryToFrontend = (apiCategory: APICategory): Category => {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    icon: apiCategory.icon,
    freelancerCount: apiCategory.freelancerCount,
  };
};

/**
 * Transform backend skill to frontend format
 */
export const transformAPISkillToString = (apiSkill: APISkill): string => {
  return apiSkill.name;
};
