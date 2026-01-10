export type ProjectType = "fixed" | "hourly";
type ServiceStatus = "draft" | "pending" | "active" | "rejected";

export interface ServiceUpgradeOption {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  badgeColor: string;
  available: boolean;
}

// Legacy interface - kept for backward compatibility
// Note: New code should use ServiceFormData from service-form.schema.ts
interface LegacyServiceFormData {
  // Step 1: Basic Details
  serviceName: string;
  description: string;
  projectType: ProjectType;
  budget: {
    min: number;
    max: number;
    hourlyRate?: number;
  };
  attachments: File[];

  // Step 2: Categories & Skills
  category: string;
  skills: string[];

  // Step 3: Upgrades
  selectedUpgrades: string[];

  // Step 4: Preview & Submit
  status: ServiceStatus;
}

// Available categories
export const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "WordPress",
  "E-commerce",
  "Content Writing",
  "Marketing",
  "SEO",
  "Video Editing",
  "Animation",
];

// All available skills
export const allSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "CSS",
  "HTML",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Java",
  "C++",
  "C#",
  ".NET",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
];

// Service upgrades based on Freelancer.com model
export const serviceUpgrades: ServiceUpgradeOption[] = [
  {
    id: "recruiter",
    name: "RECRUITER",
    description:
      "Get featured by our expert recruiters who will recommend your service to potential clients. This is the best way to get discovered quickly.",
    price: 0,
    badge: "RECRUITER",
    badgeColor: "bg-purple-600",
    available: false, // SOLD OUT
  },
  {
    id: "nda",
    name: "NDA",
    description:
      "You agree to sign a Non-disclosure Agreement with clients. This shows clients that you take confidentiality seriously and are professional.",
    price: 24.63,
    badge: "NDA",
    badgeColor: "bg-blue-600",
    available: true,
  },
  {
    id: "ip-agreement",
    name: "IP AGREEMENT",
    description:
      "You agree to transfer Intellectual Property (IP) rights to clients. This proves that all work you deliver will belong to the client.",
    price: 24.63,
    badge: "IP AGREEMENT",
    badgeColor: "bg-red-600",
    available: true,
  },
  {
    id: "featured",
    name: "FEATURED",
    description:
      "Get prominent placement in our 'Featured Services' section to attract more clients and stand out from the competition.",
    price: 11.19,
    badge: "FEATURED",
    badgeColor: "bg-orange-500",
    available: true,
  },
  {
    id: "urgent",
    name: "URGENT",
    description:
      "Show clients that you're ready to start immediately and can deliver quickly. Perfect for time-sensitive opportunities.",
    price: 11.19,
    badge: "URGENT",
    badgeColor: "bg-red-500",
    available: true,
  },
  {
    id: "private",
    name: "PRIVATE",
    description:
      "Hide your service details from search engines and non-logged-in users, keeping your offerings exclusive to registered clients.",
    price: 24.63,
    badge: "PRIVATE",
    badgeColor: "bg-yellow-500",
    available: true,
  },
  {
    id: "sealed",
    name: "SEALED",
    description:
      "Keep your service details and pricing private until clients contact you directly. This helps you stand out with personalized proposals.",
    price: 11.19,
    badge: "SEALED",
    badgeColor: "bg-blue-500",
    available: true,
  },
];

// Skill recommendation function
export const getSkillRecommendations = (
  query: string,
  currentSkills: string[]
): string[] => {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const filtered = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(lowerQuery) && !currentSkills.includes(skill)
  );

  return filtered.slice(0, 5); // Return top 5 matches
};

// Initial form data (legacy)
const initialFormData: LegacyServiceFormData = {
  serviceName: "",
  description: "",
  projectType: "fixed",
  budget: {
    min: 0,
    max: 0,
  },
  attachments: [],
  category: "",
  skills: [],
  selectedUpgrades: [],
  status: "draft",
};

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateTotalUpgradeCost = (
  selectedUpgradeIds: string[]
): number => {
  return serviceUpgrades
    .filter((upgrade) => selectedUpgradeIds.includes(upgrade.id))
    .reduce((total, upgrade) => total + upgrade.price, 0);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
