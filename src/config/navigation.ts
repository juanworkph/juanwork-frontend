import { UserRole } from "@/types/user";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// Define navigation items for each user role
export const navigationConfig: Record<UserRole, NavSection[]> = {
  client: [
    {
      items: [
        {
          title: "Dashboard",
          href: "/client",
          icon: "dashboard",
        },
        {
          title: "Projects",
          href: "/client/projects",
          icon: "projects",
        },
        {
          title: "Freelancers",
          href: "/client/freelancers",
          icon: "users",
        },
        {
          title: "Messages",
          href: "/client/messages",
          icon: "messages",
        },
        {
          title: "Settings",
          href: "/client/settings",
          icon: "settings",
        },
      ],
    },
  ],
  freelancer: [
    {
      items: [
        {
          title: "Dashboard",
          href: "/freelancer",
          icon: "dashboard",
        },
        {
          title: "Jobs",
          href: "/freelancer/jobs",
          icon: "briefcase",
        },
        {
          title: "Proposals",
          href: "/freelancer/proposals",
          icon: "file",
        },
        {
          title: "Clients",
          href: "/freelancer/clients",
          icon: "users",
        },
        {
          title: "Messages",
          href: "/freelancer/messages",
          icon: "messages",
        },
        {
          title: "Settings",
          href: "/freelancer/settings",
          icon: "settings",
        },
      ],
    },
  ],
  public_client: [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "home",
        },
        {
          title: "Post a Job",
          href: "/post-job",
          icon: "plus",
        },
        {
          title: "Find Freelancers",
          href: "/freelancers",
          icon: "search",
        },
        {
          title: "How it Works",
          href: "/how-it-works",
          icon: "info",
        },
        {
          title: "Login",
          href: "/auth/login",
          icon: "login",
        },
        {
          title: "Sign Up",
          href: "/auth/register",
          icon: "user-plus",
        },
      ],
    },
  ],
  public_freelancer: [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "home",
        },
        {
          title: "Find Jobs",
          href: "/jobs",
          icon: "search",
        },
        {
          title: "How it Works",
          href: "/how-it-works-freelancer",
          icon: "info",
        },
        {
          title: "Login",
          href: "/auth/login",
          icon: "login",
        },
        {
          title: "Sign Up",
          href: "/auth/register",
          icon: "user-plus",
        },
      ],
    },
  ],
  workstation: [
    {
      items: [
        {
          title: "Dashboard",
          href: "/workstation",
          icon: "dashboard",
        },
        {
          title: "Projects",
          href: "/workstation/projects",
          icon: "projects",
        },
        {
          title: "Users",
          href: "/workstation/users",
          icon: "users",
        },
        {
          title: "Reports",
          href: "/workstation/reports",
          icon: "chart",
        },
        {
          title: "Settings",
          href: "/workstation/settings",
          icon: "settings",
        },
      ],
    },
  ],
};
