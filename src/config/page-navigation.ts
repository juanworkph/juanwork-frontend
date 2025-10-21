import { UserRole } from "@/types/user";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Bell,
  Bookmark,
  FileText,
  Send,
  FolderOpen,
  Star,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface PageNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: number;
}

/**
 * Page navigation configuration for each user role
 */
export const pageNavigation: Record<
  Exclude<UserRole, "guest" | "admin">,
  PageNavItem[]
> = {
  freelancer: [
    {
      name: "Dashboard",
      href: "/freelancer",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Profile",
      href: "/freelancer/profile",
      icon: User,
    },
    {
      name: "Portfolio",
      href: "/freelancer/portfolio",
      icon: Briefcase,
    },
    {
      name: "Notifications",
      href: "/freelancer/notifications",
      icon: Bell,
      badge: 3,
    },
    {
      name: "Bookmarks",
      href: "/freelancer/bookmarks",
      icon: Bookmark,
    },
    {
      name: "Bids",
      href: "/freelancer/bids",
      icon: FileText,
    },
    {
      name: "Proposals",
      href: "/freelancer/proposals",
      icon: Send,
    },
    {
      name: "Projects",
      href: "/freelancer/projects",
      icon: FolderOpen,
    },
    {
      name: "Reviews",
      href: "/freelancer/reviews",
      icon: Star,
    },
    {
      name: "Payment",
      href: "/freelancer/payment",
      icon: CreditCard,
    },
    {
      name: "Settings",
      href: "/freelancer/settings",
      icon: Settings,
    },
  ],

  client: [
    {
      name: "Dashboard",
      href: "/client",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Profile",
      href: "/client/profile",
      icon: User,
    },
    {
      name: "Notifications",
      href: "/client/notifications",
      icon: Bell,
      badge: 3,
    },
    {
      name: "Bookmarks",
      href: "/client/bookmarks",
      icon: Bookmark,
    },
    {
      name: "Bids",
      href: "/client/bids",
      icon: FileText,
    },
    {
      name: "Proposals",
      href: "/client/proposals",
      icon: Send,
    },
    {
      name: "Projects",
      href: "/client/projects",
      icon: FolderOpen,
    },
    {
      name: "Reviews",
      href: "/client/reviews",
      icon: Star,
    },
    {
      name: "Payment",
      href: "/client/payment",
      icon: CreditCard,
    },
    {
      name: "Settings",
      href: "/client/settings",
      icon: Settings,
    },
  ],
};

/**
 * Gets page navigation items specific to a user role
 */
export const pageNavigationWhereUserRole = (
  userRole: Exclude<UserRole, "guest" | "admin">
): PageNavItem[] => {
  return pageNavigation[userRole] || pageNavigation.freelancer;
};
