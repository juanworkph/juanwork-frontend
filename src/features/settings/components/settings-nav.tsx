"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Zap, Lock, Share2, UserCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "", label: "Profile", icon: User },
  { path: "/juanpoints", label: "JuanPoints", icon: Zap },
  { path: "/password", label: "Password", icon: Lock },
  { path: "/socials", label: "Social Links", icon: Share2 },
  {
    path: "/verification",
    label: "Verification",
    icon: ShieldCheck,
  },
  { path: "/account", label: "Account", icon: UserCircle },
];

export function SettingsNav() {
  const pathname = usePathname();
  const { currentRole } = useAuth();
  const basePath =
    currentRole === "client" ? "/client/settings" : "/freelancer/settings";

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const href = `${basePath}${item.path}`;
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group",
              isActive
                ? "bg-primary text-white shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                isActive
                  ? "text-white"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
