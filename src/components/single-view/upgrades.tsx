"use client";

import React from "react";
import { Sparkles, Timer, FileCheck } from "lucide-react";
import type { ServiceUpgrade } from "@/features/services/schema/discover-services-data";

interface SingleViewUpgradesProps {
  upgrades: ServiceUpgrade[];
}

const getUpgradeDescription = (slug: string): string => {
  const descriptions: Record<string, string> = {
    recruiter:
      "Featured by expert recruiters who recommend your service to clients",
    nda: "Non-disclosure Agreement for confidentiality assurance",
    "ip-agreement": "Intellectual Property rights transfer guarantee",
    featured: "Premium placement in Featured Services section",
    urgent: "Priority listing showing immediate availability",
    private: "Exclusive visibility to registered clients only",
    sealed: "Private details until direct client contact",
  };
  return descriptions[slug] || "Premium service upgrade";
};

const getUpgradeIcon = (slug: string) => {
  switch (slug) {
    case "featured":
      return <Sparkles className="h-6 w-6 text-amber-500" />;
    case "urgent":
      return <Timer className="h-6 w-6 text-rose-500" />;
    case "nda":
      return <FileCheck className="h-6 w-6 text-blue-500" />;
    default:
      return <Sparkles className="h-6 w-6 text-zinc-400" />;
  }
};

export const SingleViewUpgrades = ({ upgrades }: SingleViewUpgradesProps) => {
  if (!upgrades || upgrades.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-primary rounded-full"></span>
        Promoted Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
              {getUpgradeIcon(upgrade.slug || "")}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1 uppercase tracking-tight">
                {upgrade.name}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {getUpgradeDescription(upgrade.slug || "")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
