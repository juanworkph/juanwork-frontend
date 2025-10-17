import { UserRole } from "@/types/user";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;

  isButton?: boolean;
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  isDropdown?: boolean;
  dropdownMenu?: DropdownMenuItem[];
}

export interface NavSection {
  common: NavItem[];
  feature?: NavItem[];
}

export interface DropdownMenuItem {
  label: string;
  href: string;
}

/**
 * Navigation configuration for each user role
 */
export const navigation: Record<UserRole, NavSection> = {
  guest: {
    common: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/landing/about" },
      { label: "Our Blog", href: "/landing/blog" },
      { label: "Contact Us", href: "/landing/contact" },
      { label: "Help Center", href: "/landing/help" },
    ],
    feature: [
      { label: "Login", href: "/auth", isButton: true, variant: "ghost" },
      { label: "Sign Up", href: "/auth/signup", isButton: true },
    ],
  },

  client: {
    common: [
      { label: "Dashboard", href: "/client" },
      {
        label: "Hire Talent",
        href: "javascript:void(0)",
        isDropdown: true,
        dropdownMenu: [
          { label: "Discover Services", href: "/client/hire-talent/discover-services" },
          { label: "Discover Freelancers", href: "/client/hire-talent/discover-freelancers" },
        ],
      },
      {
        label: "Project Manage",
        href: "javascript:void(0)",
        isDropdown: true,
        dropdownMenu: [
          { label: "Post a Project", href: "/client/projects/post-project" },
          { label: "My Projects", href: "/client/projects/my-projects" },
        ],
      },
      { label: "Messages", href: "/client/messages" },
    ],
    feature: [
      { label: "Post a Project", href: "/client/projects/post-project" },
      { label: "Workstation", href: "/client/workstation" },
    ],
  },

  freelancer: {
    common: [
      { label: "Dashboard", href: "/freelancer" },
      { label: "Find Work", href: "/freelancer/findwork" },
      { label: "My Services", href: "/freelancer/services/my-services" },
      { label: "Messages", href: "/freelancer/messages" },
    ],
    feature: [
      { label: "Post a Service", href: "/freelancer/services/post-service"},
    ],
  },

  admin: {
    common: [
      { label: "Dashboard", href: "/admin" },
      { label: "Users", href: "/admin/users" },
      { label: "Projects", href: "/admin/projects" },
      { label: "Services", href: "/admin/services" },
      { label: "Messages", href: "/admin/messages" },
    ],
    // feature: [],
  },
};

/**
 * Gets navigation Config specific to a user role
 */
export const navigationWhereRole = (
  userRole: UserRole
): NavSection => {
  switch (userRole) {
    case "guest":
      return navigation.guest;
    case "freelancer":
      return navigation.freelancer;
    case "client":
      return navigation.client;
    case "admin":
      return navigation.admin;
    default:
      return navigation.guest;
  }
};
