/**
 * Portfolio Actions Index
 * 
 * Central export point for all portfolio-related API actions.
 * This file re-exports all action functions for easy importing in components.
 */

export {
  getFreelancerPortfolio,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  getPortfolioProjectById,
  getCategories,
  getSkills,
  toggleFeaturedStatus,
  type Category,
  type Skill,
} from './portfolio.actions';
