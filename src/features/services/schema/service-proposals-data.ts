export type ServiceProposalStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "withdrawn";

export interface ServiceProposalClient {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  rating: number;
  reviewCount: number;
  totalSpent: number;
  verified: boolean;
}

export interface ServiceProposal {
  id: string;
  serviceId: string;
  client: ServiceProposalClient;
  status: ServiceProposalStatus;
  title: string;
  coverLetter: string;
  budget?: string; // Changed to string to support ranges like "₱10-₱50"
  deliveryTime?: number; // Client might propose different timeline
  submittedAt: string;
  lastUpdated: string;
  isRead: boolean;
}

export const mockServiceProposals: ServiceProposal[] = [
  {
    id: "sp-1",
    serviceId: "srv-1",
    client: {
      id: "cli-1",
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
      country: "Singapore",
      rating: 4.8,
      reviewCount: 124,
      totalSpent: 12500,
      verified: true,
    },
    status: "pending",
    title: "Expert Headless Shopify Architecture",
    coverLetter:
      "I specialize in building high-conversion Shopify stores using Hydrogen and Oxygen. For your project, I'll implement a custom Sanity.io CMS integration to provide...",
    budget: "₱35,000 - ₱45,000",
    deliveryTime: 14,
    submittedAt: "2024-01-28T10:30:00Z",
    lastUpdated: "2024-01-28T10:30:00Z",
    isRead: false,
  },
  {
    id: "sp-2",
    serviceId: "srv-1",
    client: {
      id: "cli-2",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      country: "United States",
      rating: 5.0,
      reviewCount: 287,
      totalSpent: 45000,
      verified: true,
    },
    status: "accepted",
    title: "End-to-End Headless E-commerce Solution with Next.js",
    coverLetter:
      "I can deliver a lightning-fast headless storefront using Next.js 14 and the Shopify Storefront API. My focus is on Core Web Vitals and seamless mobile experiences...",
    budget: "₱50,000 - ₱60,000",
    deliveryTime: 10,
    submittedAt: "2024-01-25T14:15:00Z",
    lastUpdated: "2024-01-26T09:00:00Z",
    isRead: true,
  },
  {
    id: "sp-3",
    serviceId: "srv-1",
    client: {
      id: "cli-3",
      name: "David Smith",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      country: "United Kingdom",
      rating: 4.5,
      reviewCount: 42,
      totalSpent: 2800,
      verified: false,
    },
    status: "declined",
    title: "Custom Shopify Liquid & React Integration",
    coverLetter:
      "Offering a robust implementation of Shopify headless using a React-based frontend. I have extensive experience migrating traditional stores to headless...",
    budget: "₱25,000 - ₱30,000",
    deliveryTime: 21,
    submittedAt: "2024-01-20T08:45:00Z",
    lastUpdated: "2024-01-21T10:00:00Z",
    isRead: true,
  },
  {
    id: "sp-4",
    serviceId: "srv-1",
    client: {
      id: "cli-4",
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      country: "Australia",
      rating: 4.9,
      reviewCount: 89,
      totalSpent: 8500,
      verified: true,
    },
    status: "pending",
    title: "High-Performance Shopify Hydrogen Store",
    coverLetter:
      "I propose building your store on Shopify's Hydrogen framework for maximum performance and flexibility. This includes full custom component design...",
    budget: "₱40,000 - ₱55,000",
    deliveryTime: 18,
    submittedAt: "2024-01-29T08:00:00Z",
    lastUpdated: "2024-01-29T08:00:00Z",
    isRead: false,
  },
];
