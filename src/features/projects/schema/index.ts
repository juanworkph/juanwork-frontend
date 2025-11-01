// Export all from projects-data
export * from "./projects-data";

// Export post-project types and unique exports only (avoid conflicts)
export type {
  PostProjectStatus,
  ProjectUpgrade,
  ProjectFormData,
} from "./post-project-data";
export {
  projectUpgrades,
  initialFormData,
  calculateTotalUpgradeCost,
} from "./post-project-data";

// Export my-projects types and functions
export type {
  MyProject,
  MyProjectStatus,
  ProjectFilterStatus,
} from "./my-projects-data";
export {
  mockMyProjects,
  projectStatusConfig,
  projectFilterOptions,
  getProjectsByStatus,
  getDurationLabel as getProjectDurationLabel,
  getExperienceLevelLabel as getProjectExperienceLevelLabel,
} from "./my-projects-data";
