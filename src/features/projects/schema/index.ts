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

// Export mock project details (legacy - kept for backward compatibility)
export {
  mockProjectDetails,
  mockHourlyProjectDetails,
  mockNewProjectDetails,
  getMockProjectDetails,
} from "./mock-project-details";

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
