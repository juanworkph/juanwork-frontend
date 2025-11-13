// Proposal status types
export type ProposalStatus = "pending" | "accepted" | "declined" | "withdrawn";

// Proposal data model
export interface Proposal {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  message: string;
  budget?: number;
  timeline?: string;
  attachments?: string[];
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
}

// Proposal form data (for submission)
export interface ProposalFormData {
  message: string;
  budget?: number;
  timeline?: string;
  attachments?: File[];
}

// Helper function to get proposals by service ID
export const getProposalsByServiceId = (serviceId: string): Proposal[] => {
  return mockProposalsData.filter(
    (proposal) => proposal.serviceId === serviceId
  );
};

// Helper function to get proposals by client ID
export const getProposalsByClientId = (clientId: string): Proposal[] => {
  return mockProposalsData.filter(
    (proposal) => proposal.clientId === clientId
  );
};

// Helper function to get proposals by provider ID
export const getProposalsByProviderId = (providerId: string): Proposal[] => {
  return mockProposalsData.filter(
    (proposal) => proposal.providerId === providerId
  );
};

// Helper function to create a new proposal
export const createProposal = (
  serviceId: string,
  clientId: string,
  providerId: string,
  formData: ProposalFormData
): Proposal => {
  const newProposal: Proposal = {
    id: `prop${Date.now()}`,
    serviceId,
    clientId,
    providerId,
    message: formData.message,
    budget: formData.budget,
    timeline: formData.timeline,
    attachments: formData.attachments?.map((file) => file.name),
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProposalsData.push(newProposal);
  return newProposal;
};

// Helper function to update proposal status
export const updateProposalStatus = (
  proposalId: string,
  status: ProposalStatus
): Proposal | null => {
  const proposal = mockProposalsData.find((p) => p.id === proposalId);
  if (proposal) {
    proposal.status = status;
    proposal.updatedAt = new Date().toISOString();
    return proposal;
  }
  return null;
};

// Helper function to get proposal status label
export const getProposalStatusLabel = (status: ProposalStatus): string => {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "accepted":
      return "Accepted";
    case "declined":
      return "Declined";
    case "withdrawn":
      return "Withdrawn";
    default:
      return status;
  }
};

// Helper function to get proposal status color
export const getProposalStatusColor = (
  status: ProposalStatus
): string => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "accepted":
      return "text-green-600 bg-green-50";
    case "declined":
      return "text-red-600 bg-red-50";
    case "withdrawn":
      return "text-gray-600 bg-gray-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

// Mock proposals data
export const mockProposalsData: Proposal[] = [
  {
    id: "prop1",
    serviceId: "s1",
    clientId: "user1",
    providerId: "p1",
    message:
      "Hi Alex, I'm interested in your full-stack development service for my startup. We need a web application with user authentication, payment processing, and an admin dashboard. Can we discuss the requirements in detail?",
    budget: 3500,
    timeline: "6 weeks",
    attachments: ["requirements.pdf", "wireframes.pdf"],
    status: "accepted",
    createdAt: "2024-10-01T10:30:00Z",
    updatedAt: "2024-10-02T14:20:00Z",
  },
  {
    id: "prop2",
    serviceId: "s3",
    clientId: "user1",
    providerId: "p3",
    message:
      "Hello Maria, I need UI/UX design for a mobile fitness app. Looking for modern, clean designs with a focus on user engagement. Would love to see your portfolio and discuss the project.",
    budget: 1200,
    timeline: "2 weeks",
    status: "pending",
    createdAt: "2024-10-28T09:15:00Z",
    updatedAt: "2024-10-28T09:15:00Z",
  },
  {
    id: "prop3",
    serviceId: "s2",
    clientId: "user2",
    providerId: "p2",
    message:
      "Hi Sophie, we're building a food delivery app and need an experienced React Native developer. The app needs real-time tracking, payment integration, and push notifications. Are you available?",
    timeline: "8 weeks",
    status: "pending",
    createdAt: "2024-11-05T11:45:00Z",
    updatedAt: "2024-11-05T11:45:00Z",
  },
  {
    id: "prop4",
    serviceId: "s5",
    clientId: "user2",
    providerId: "p5",
    message:
      "Hello James, I need a custom WordPress theme for my photography portfolio. Looking for a minimalist design with a focus on showcasing images. Can you help?",
    budget: 1500,
    timeline: "3 weeks",
    status: "declined",
    createdAt: "2024-10-10T14:20:00Z",
    updatedAt: "2024-10-12T09:30:00Z",
  },
];
