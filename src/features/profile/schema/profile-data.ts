export interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
  flag?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5 scale
  category: 'Technical' | 'Design' | 'Business' | 'Communication';
  yearsOfExperience: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  gpa?: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  website?: string;
  avatar: string;
  coverImage?: string;
  hourlyRate: number;
  availability: 'Available' | 'Busy' | 'Not Available';
  responseTime: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  portfolio?: string;
}

export interface VideoIntroduction {
  url: string;
  thumbnail: string;
  duration: string;
  title: string;
}

export interface ProfileStats {
  totalEarnings: number;
  completedProjects: number;
  clientSatisfaction: number;
  responseRate: number;
  onTimeDelivery: number;
  totalReviews: number;
  averageRating: number;
}

export interface FreelancerProfile {
  personalInfo: PersonalInfo;
  videoIntroduction?: VideoIntroduction;
  skills: Skill[];
  languages: Language[];
  education: Education[];
  certifications: Certification[];
  workExperience: WorkExperience[];
  socialLinks: SocialLinks;
  stats: ProfileStats;
  joinDate: string;
  lastActive: string;
  isVerified: boolean;
  profileCompleteness: number;
}

// Mock data
export const mockFreelancerProfile: FreelancerProfile = {
  personalInfo: {
    name: "Alex Rodriguez",
    title: "Full-Stack Developer & UI/UX Designer",
    bio: "Passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern design principles. I love turning complex problems into simple, beautiful solutions that users enjoy interacting with.",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    email: "alex.rodriguez@email.com",
    phone: "+1 (555) 123-4567",
    website: "https://alexrodriguez.dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    hourlyRate: 85,
    availability: "Available",
    responseTime: "Within 1 hour"
  },
  videoIntroduction: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    duration: "2:34",
    title: "Meet Alex - Your Next Full-Stack Developer"
  },
  skills: [
    { name: "React", level: 5, category: "Technical", yearsOfExperience: 4 },
    { name: "TypeScript", level: 5, category: "Technical", yearsOfExperience: 3 },
    { name: "Node.js", level: 4, category: "Technical", yearsOfExperience: 4 },
    { name: "Next.js", level: 5, category: "Technical", yearsOfExperience: 3 },
    { name: "UI/UX Design", level: 4, category: "Design", yearsOfExperience: 5 },
    { name: "Figma", level: 4, category: "Design", yearsOfExperience: 3 },
    { name: "Tailwind CSS", level: 5, category: "Technical", yearsOfExperience: 2 },
    { name: "PostgreSQL", level: 4, category: "Technical", yearsOfExperience: 3 },
    { name: "AWS", level: 3, category: "Technical", yearsOfExperience: 2 },
    { name: "Project Management", level: 4, category: "Business", yearsOfExperience: 4 },
    { name: "Client Communication", level: 5, category: "Communication", yearsOfExperience: 5 },
    { name: "Agile/Scrum", level: 4, category: "Business", yearsOfExperience: 3 }
  ],
  languages: [
    { name: "English", level: "Native", flag: "🇺🇸" },
    { name: "Spanish", level: "Fluent", flag: "🇪🇸" },
    { name: "French", level: "Fluent", flag: "🇫🇷" },
    { name: "Portuguese", level: "Basic", flag: "🇧🇷" }
  ],
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startYear: 2016,
      endYear: 2020,
      gpa: "3.8/4.0",
      description: "Focused on software engineering, algorithms, and human-computer interaction. Graduated Magna Cum Laude."
    },
    {
      id: "2",
      institution: "Google UX Design Certificate",
      degree: "Professional Certificate",
      field: "User Experience Design",
      startYear: 2021,
      endYear: 2021,
      description: "Comprehensive program covering design thinking, wireframing, prototyping, and user research methodologies."
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      credentialId: "AWS-SAA-123456",
      verificationUrl: "https://aws.amazon.com/verification"
    },
    {
      id: "2",
      name: "React Professional Developer",
      issuer: "Meta",
      issueDate: "2023-03-20",
      credentialId: "META-REACT-789012"
    },
    {
      id: "3",
      name: "Google Analytics Certified",
      issuer: "Google",
      issueDate: "2023-01-10",
      expiryDate: "2024-01-10",
      credentialId: "GA-CERT-345678"
    }
  ],
  workExperience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Full-Stack Developer",
      startDate: "2022-01",
      endDate: "2023-12",
      description: "Led development of customer-facing web applications serving 100k+ users. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led migration from legacy system to modern React architecture",
        "Mentored 3 junior developers and conducted code reviews"
      ]
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Frontend Developer & UI Designer",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Designed and developed user interfaces for SaaS platform. Worked closely with product team to create intuitive user experiences.",
      technologies: ["React", "JavaScript", "Figma", "Styled Components"],
      achievements: [
        "Increased user engagement by 60% through UI/UX improvements",
        "Established design system used across all product features",
        "Reduced development time by 30% through reusable components"
      ]
    },
    {
      id: "3",
      company: "Digital Agency Pro",
      position: "Web Developer",
      startDate: "2019-01",
      endDate: "2020-05",
      description: "Developed responsive websites and web applications for various clients across different industries.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
      achievements: [
        "Delivered 25+ successful client projects",
        "Maintained 98% client satisfaction rate",
        "Implemented SEO best practices resulting in 50% traffic increase"
      ]
    }
  ],
  socialLinks: {
    github: "https://github.com/alexrodriguez",
    linkedin: "https://linkedin.com/in/alexrodriguez",
    twitter: "https://twitter.com/alexrodriguez",
    behance: "https://behance.net/alexrodriguez",
    dribbble: "https://dribbble.com/alexrodriguez",
    portfolio: "https://alexrodriguez.dev"
  },
  stats: {
    totalEarnings: 125000,
    completedProjects: 47,
    clientSatisfaction: 98,
    responseRate: 100,
    onTimeDelivery: 96,
    totalReviews: 89,
    averageRating: 4.9
  },
  joinDate: "2019-01-15",
  lastActive: "2024-01-15T10:30:00Z",
  isVerified: true,
  profileCompleteness: 95
}; 