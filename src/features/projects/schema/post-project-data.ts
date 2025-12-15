import { ProjectType } from "./projects-data";

export type PostProjectStatus = "draft" | "pending" | "active" | "rejected";

export interface ProjectUpgrade {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  badgeColor: string;
  available: boolean;
}

export interface ProjectFormData {
  // Step 1: Basic Details
  projectName: string;
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
  status: PostProjectStatus;
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

// Project upgrades for clients posting projects
export const projectUpgrades: ProjectUpgrade[] = [
  {
    id: "recruiter",
    name: "RECRUITER",
    description:
      "Get your project featured by our expert recruiters who will recommend it to top freelancers. This is the best way to attract quality talent quickly.",
    price: 0,
    badge: "RECRUITER",
    badgeColor: "bg-purple-600",
    available: false, // SOLD OUT
  },
  {
    id: "nda",
    name: "NDA",
    description:
      "Require freelancers to sign a Non-disclosure Agreement. This ensures confidentiality and shows you take project security seriously.",
    price: 24.63,
    badge: "NDA",
    badgeColor: "bg-blue-600",
    available: true,
  },
  {
    id: "ip-agreement",
    name: "IP AGREEMENT",
    description:
      "Require transfer of Intellectual Property (IP) rights. This ensures that all work delivered will belong to your company.",
    price: 24.63,
    badge: "IP AGREEMENT",
    badgeColor: "bg-red-600",
    available: true,
  },
  {
    id: "featured",
    name: "FEATURED",
    description:
      "Get prominent placement in 'Featured Projects' section to attract more qualified freelancers and fill your position faster.",
    price: 11.19,
    badge: "FEATURED",
    badgeColor: "bg-orange-500",
    available: true,
  },
  {
    id: "urgent",
    name: "URGENT",
    description:
      "Mark your project as urgent to attract freelancers who can start immediately and deliver quickly. Perfect for time-sensitive work.",
    price: 11.19,
    badge: "URGENT",
    badgeColor: "bg-red-500",
    available: true,
  },
  {
    id: "private",
    name: "PRIVATE",
    description:
      "Hide your project details from search engines and non-logged-in users, keeping your requirements exclusive to registered freelancers.",
    price: 24.63,
    badge: "PRIVATE",
    badgeColor: "bg-yellow-500",
    available: true,
  },
  {
    id: "sealed",
    name: "SEALED",
    description:
      "Keep your project details and budget private until freelancers contact you directly. This helps attract personalized proposals.",
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

// Initial form data
export const initialFormData: ProjectFormData = {
  projectName: "",
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
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateTotalUpgradeCost = (
  selectedUpgradeIds: string[]
): number => {
  return projectUpgrades
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
