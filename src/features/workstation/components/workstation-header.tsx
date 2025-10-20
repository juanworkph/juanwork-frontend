"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageConfig {
  title: string;
  description: string;
}

const pageConfigs: Record<string, PageConfig> = {
  overview: {
    title: "Project Overview",
    description:
      "Track project progress, manage tasks, and collaborate with your team",
  },
  tasks: {
    title: "Tasks",
    description: "Manage and organize all project tasks",
  },
  tracking: {
    title: "Time Tracking",
    description: "Track time spent on project tasks and activities",
  },
  approvals: {
    title: "Approvals",
    description: "Review and approve project deliverables and requests",
  },
  finances: {
    title: "Finances",
    description: "Monitor project budget, expenses, and payments",
  },
  settings: {
    title: "Settings",
    description: "Configure workstation preferences and notifications",
  },
};

export function WorkstationHeader() {
  const pathname = usePathname();

  // Extract the current page from pathname (e.g., "/freelancer/workstation/overview" -> "overview")
  const currentPage = pathname?.split("/").pop() || "overview";

  // Get page config or use default
  const config = pageConfigs[currentPage] || pageConfigs.overview;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {config.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{config.description}</p>
      </div>

      {/* Optional: Back to Projects button */}
      <Link href="/freelancer/workstation">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Button>
      </Link>
    </div>
  );
}
