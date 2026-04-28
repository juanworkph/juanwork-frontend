import React from "react";
import {
  DollarSign,
  Briefcase,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
  LucideIcon,
} from "lucide-react";
import { DashboardStats } from "../schema/dashboard-data";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  stats: DashboardStats;
}

interface StatConfig {
  key: keyof DashboardStats;
  label: string;
  icon: LucideIcon;
  format?: (val: number) => string;
  iconColorClass: string;
  iconBgClass: string;
}

const STATS_CONFIG: StatConfig[] = [
  {
    key: "totalEarnings",
    label: "Total Earnings",
    icon: DollarSign,
    format: (val) => `$${val.toLocaleString()}`,
    iconColorClass: "text-emerald-500",
    iconBgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    key: "activeContracts",
    label: "Active Contracts",
    icon: Briefcase,
    iconColorClass: "text-blue-500",
    iconBgClass: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    key: "bidsReceived",
    label: "Bids Received",
    icon: Inbox,
    iconColorClass: "text-purple-500",
    iconBgClass: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    key: "successRate",
    label: "Success Rate",
    icon: Target,
    format: (val) => `${val}%`,
    iconColorClass: "text-orange-500",
    iconBgClass: "bg-orange-500/10 dark:bg-orange-500/20",
  },
];

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {STATS_CONFIG.map(({ key, label, icon: Icon, format, iconColorClass, iconBgClass }) => {
        const stat = stats[key];
        const isPositive = stat.change >= 0;
        const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <div
            key={key}
            className="p-6 rounded-xl bg-card-accent border border-border flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top row: Icon and Change Badge */}
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "p-3 rounded-full transition-colors duration-300",
                  iconBgClass
                )}
              >
                <Icon className={cn("w-6 h-6", iconColorClass)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  isPositive
                    ? "text-emerald-600 bg-emerald-500/10"
                    : "text-rose-600 bg-rose-500/10"
                )}
              >
                <ChangeIcon className="w-3 h-3" />
                {Math.abs(stat.change)}%
              </div>
            </div>

            {/* Bottom row: Value and Label */}
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-foreground">
                {format ? format(stat.value) : stat.value}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
            
            {/* Subtle gradient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-current opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}

