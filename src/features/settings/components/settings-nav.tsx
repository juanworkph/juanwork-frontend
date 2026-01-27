"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Zap, Lock, Share2, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/freelancer/settings", label: "Profile", icon: User },
  { href: "/freelancer/settings/juanpoints", label: "JuanPoints", icon: Zap },
  { href: "/freelancer/settings/password", label: "Password", icon: Lock },
  { href: "/freelancer/settings/socials", label: "Social Links", icon: Share2 },
  { href: "/freelancer/settings/account", label: "Account", icon: UserCircle },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group",
              isActive
                ? "bg-[#f97316] text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
