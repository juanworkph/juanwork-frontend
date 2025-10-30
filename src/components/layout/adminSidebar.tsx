"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Search,
  Shield,
  Activity,
  Database,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const mainNavigation = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
  ];

  const managementSection = [
    {
      label: "Services",
      href: "/admin/services",
      icon: Package,
    },
    {
      label: "Transactions",
      href: "/admin/transactions",
      icon: DollarSign,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: FileText,
    },
    {
      label: "More",
      href: "/admin/more",
      icon: MoreHorizontal,
    },
  ];

  const bottomNavigation = [
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      label: "Get Help",
      href: "/admin/help",
      icon: HelpCircle,
    },
    {
      label: "Search",
      href: "/admin/search",
      icon: Search,
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-[#1a1a1a] text-gray-100">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#1a1a1a]" />
          </div>
          <span className="text-lg font-semibold">JuanWork Admin</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Management Section */}
        <div className="pt-6">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Management
          </p>
          {managementSection.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#2a2a2a] text-white"
                    : "text-gray-400 hover:bg-[#252525] hover:text-gray-200"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-1">
        <Separator className="mb-4 bg-[#2a2a2a]" />

        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* User Profile */}
        <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#252525] cursor-pointer transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/logo.png" />
              <AvatarFallback className="bg-[#F45A0B] text-white text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">
                admin@juanwork.com
              </p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
