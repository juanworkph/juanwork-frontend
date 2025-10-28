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
