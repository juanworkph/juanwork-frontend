import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  Wallet,
  CreditCard,
  History,
  Bell,
  Shield,
  FileText,
  LucideIcon,
} from "lucide-react";
import { UserRole } from "@/types/user";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
  onClick?: () => void;
  className?: string;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
  roles?: UserRole[];
  separator?: boolean;
}

export const userMenuConfig: MenuSection[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "profile",
        label: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        id: "help-support",
        label: "Help & Support",
        href: "/help",
        icon: HelpCircle,
      },
    ],
    separator: true,
  },
  {
    id: "finance",
    label: "Finance",
    roles: ["freelancer"],
    items: [
      {
        id: "view-balance",
        label: "View Balance",
        href: "/balance",
        icon: Wallet,
      },
      {
        id: "withdraw-funds",
        label: "Withdraw Funds",
        href: "/withdraw",
        icon: CreditCard,
      },
      {
        id: "add-funds",
        label: "Add Funds",
        href: "/add-funds",
        icon: CreditCard,
      },
      {
        id: "transaction-history",
        label: "Transaction History",
        href: "/transactions",
        icon: History,
      },
    ],
    separator: true,
  },
  {
    id: "security",
    label: "Security",
    items: [
      {
        id: "security-settings",
        label: "Security Settings",
        href: "/security",
        icon: Shield,
      },
      {
        id: "privacy-policy",
        label: "Privacy Policy",
        href: "/privacy",
        icon: FileText,
      },
    ],
    separator: true,
  },
  {
    id: "signout",
    label: "",
    items: [
      {
        id: "sign-out",
        label: "Sign Out",
        href: "#",
        icon: LogOut,
        className:
          "text-destructive focus:text-destructive focus:bg-destructive/10",
      },
    ],
  },
];

// Helper function to filter and map menu sections based on user role
export const getFilteredMenuSections = (userRole: UserRole): MenuSection[] => {
  return userMenuConfig
    .filter((section) => {
      // If section has no role restriction, show for all roles
      if (!section.roles) return true;

      // If section has role restrictions, check if user role is included
      return section.roles.includes(userRole);
    })
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => {
          // If item has no role restriction, show for all roles
          if (!item.roles) return true;

          // If item has role restrictions, check if user role is included
          return item.roles.includes(userRole);
        })
        .map((item) => {
          // Don't prefix href if it's "#" (e.g., Sign Out) or already an absolute URL
          if (item.href === "#" || item.href.startsWith("http")) {
            return item;
          }

          // Construct role-specific path, e.g., "/settings" -> "/freelancer/settings"
          // Don't prefix for guests
          if (userRole === "guest") {
            return item;
          }

          const prefixedHref = `/${userRole}${item.href}`;
          return {
            ...item,
            href: prefixedHref,
          };
        }),
    }));
};

// Helper function to get menu sections for mobile
export const getMobileMenuSections = (userRole: UserRole): MenuSection[] => {
  return getFilteredMenuSections(userRole).filter(
    (section) => section.id !== "signout",
  );
};

// Helper function to get sign out item
export const getSignOutItem = (): MenuItem | null => {
  const signOutSection = userMenuConfig.find(
    (section) => section.id === "signout",
  );
  return signOutSection?.items[0] || null;
};
