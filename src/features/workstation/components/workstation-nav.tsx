"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  FileCheck,
  DollarSign,
  Settings,
} from "lucide-react";

export type WorkstationTab =
  | "overview"
  | "tasks"
  | "tracking"
  | "approvals"
  | "finances"
  | "settings";

const navItems: {
  id: WorkstationTab;
  label: string;
  icon: React.ElementType;
  href: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    href: "/freelancer/workstation/overview",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    href: "/freelancer/workstation/tasks",
  },
  {
    id: "tracking",
    label: "Time Tracking",
    icon: Clock,
    href: "/freelancer/workstation/tracking",
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: FileCheck,
    href: "/freelancer/workstation/approvals",
  },
  {
    id: "finances",
    label: "Finances",
    icon: DollarSign,
    href: "/freelancer/workstation/finances",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/freelancer/workstation/settings",
  },
];

export function WorkstationNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-card border rounded-lg shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
