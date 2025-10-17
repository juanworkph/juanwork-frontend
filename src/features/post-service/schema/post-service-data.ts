export type ProjectType = "fixed" | "hourly";
export type ServiceStatus = "draft" | "pending" | "active" | "rejected";

export interface ServiceUpgrade {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  badgeColor: string;
  available: boolean;
}

export interface ServiceFormData {
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

// Service upgrades based on the image
export const serviceUpgrades: ServiceUpgrade[] = [
  {
    id: "recruiter",
    name: "RECRUITER",
    description:
      "One of our experts will find and recommend the perfect freelancer for your job. Take out the guesswork and save time with a Recruiter. This is the best experience for new users.",
    price: 0,
    badge: "RECRUITER",
    badgeColor: "bg-purple-600",
    available: false, // SOLD OUT
  },
  {
    id: "nda",
    name: "NDA",
    description:
      "Freelancers must sign a Non-disclosure Agreement to work on your project. Freelancers agree to keep details discussed through private messages and files confidential.",
    price: 24.63,
    badge: "NDA",
    badgeColor: "bg-blue-600",
    available: true,
  },
  {
    id: "ip-agreement",
    name: "IP AGREEMENT",
    description:
      "Do you need ownership? This upgrade will require your Freelancer to sign an Intellectual Property (IP) Agreement. This will prove that all the work done belongs to you.",
    price: 24.63,
    badge: "IP AGREEMENT",
    badgeColor: "bg-red-600",
    available: true,
  },
  {
    id: "featured",
    name: "FEATURED",
    description:
      "Attract more freelancers with a prominent placement in our 'Featured Jobs and Contests' page.",
    price: 11.19,
    badge: "FEATURED",
    badgeColor: "bg-orange-500",
    available: true,
  },
  {
    id: "urgent",
    name: "URGENT",
    description:
      "Make your project stand out and let freelancers know that your job is time sensitive.",
    price: 11.19,
    badge: "URGENT",
    badgeColor: "bg-red-500",
    available: true,
  },
  {
    id: "private",
    name: "PRIVATE",
    description:
      "Hide project details from search engines and users that are not logged in, for projects that you need to keep confidential.",
    price: 24.63,
    badge: "PRIVATE",
    badgeColor: "bg-yellow-500",
    available: true,
  },
  {
    id: "sealed",
    name: "SEALED",
    description:
      "Do you want higher-quality proposals? This upgrade will hide a Freelancer's bid from other Freelancers. This will result in accurate and unique proposals for your project.",
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
export const initialFormData: ServiceFormData = {
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
