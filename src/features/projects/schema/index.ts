// Export all from projects-data
export * from "./projects-data";

// Export post-project types from project-form.schema (new location)
export type {
  PostProjectStatus,
  ProjectFormData,
  ProjectType,
} from "./project-form.schema";
export {
  initialFormData,
  projectNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
  projectTypeSchema,
  categorySchema,
  skillsSchema,
  attachmentsSchema,
} from "./project-form.schema";

// Export API types from project-post.schema
export type {
  CreateProjectRequest,
  CreateProjectResponse,
  Category,
  Skill,
  UpgradeType,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "./project-post.schema";
export { createProjectSchema } from "./project-post.schema";

// Export my-projects types and functions
export type {
  MyProject,
  ProjectStatus,
  ProjectFilterStatus,
  PaymentType,
  ExperienceLevel,
  ProjectCategory,
  ProjectSkill,
  ProjectUpgrade,
  IProjectResponse,
} from "./my-projects-data";
export {
  mockMyProjects,
  projectStatusConfig,
  projectFilterOptions,
  upgradeDisplayNames,
  getProjectsByStatus,
  getDeliveryDaysLabel,
  getExperienceLevelLabel,
  getBudgetDisplay,
  getUpgradeDisplayName,
  sortProjects,
  searchProjects,
  calculateProjectStatistics,
  formatDate,
  formatCurrency,
  transformProjectResponse,
  transformProjectsResponse,
  safeTransformProjectResponse,
  validateProjectData,
  isProjectStatus,
  isPaymentType,
  isExperienceLevel,
  isMyProject,
} from "./my-projects-data";

// Export bidding-data types and functions
export type {
  BidStatus,
  BidFormData,
  BidAttachment,
  Bid,
  BidValidationRules,
  BidValidationResult,
} from "./bidding-data";
export {
  defaultBidValidationRules,
  validateBid,
  formatFileSize,
  getBidStatusColor,
  getBidStatusLabel,
} from "./bidding-data";

// Export comprehensive mock data for testing
export {
  // Mock clients
  mockVerifiedClient,
  mockUnverifiedClient,
  mockNewClient,
  mockHighRatedClient,
  mockInactiveClient,
  // Mock projects
  mockFixedProjectWithAttachments,
  mockHourlyProjectWithAttachments,
  mockProjectNoProposals,
  mockProjectNoAttachments,
  mockEntryLevelProject,
  mockExpertLevelProject,
  // Mock similar projects
  mockSimilarProjects,
  // Mock bids
  mockPendingBid,
  mockAcceptedBid,
  mockRejectedBid,
  mockWithdrawnBid,
  // Data fetching functions
  getProjectDetailsById,
  getSimilarProjects,
  getExistingBid,
  getAllMockProjects,
  getAllMockClients,
  getAllMockBids,
} from "./mock-data";
