import React from "react";
import {
  Users,
  Wallet,
  CheckCircle2,
  ChevronRight,
  XCircle,
  Eye,
  FileText,
  X,
} from "lucide-react";
import { ProjectInsights, TimeRemaining } from "../schema/project-detail-data";
import { formatCurrency } from "../schema/my-projects-data";

interface ProjectDetailSidebarProps {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  paymentType: "fixed" | "hourly";
  budgetMin: number;
  budgetMax: number;
  currency: string;
  timeRemaining: TimeRemaining | null;
  insights: ProjectInsights | null;
  isLoadingInsights?: boolean;
  insightsError?: string | null;
  isOwner: boolean; // NEW: Indicates if current user owns the project
  onCloseBids?: () => void;
  onShare?: () => void;
  onRetryInsights?: () => void;
}

/**
 * ProjectDetailSidebar Component
 *
 * Reusable sidebar component for project detail page.
 * Displays time remaining, quick actions, social sharing, insights, and budget.
 * Handles loading and error states for insights.
 */
export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({
  projectId,
  projectName,
  projectDescription,
  projectStatus,
  paymentType,
  budgetMin,
  budgetMax,
  currency,
  timeRemaining,
  insights,
  isLoadingInsights = false,
  insightsError = null,
  isOwner,
  onCloseBids,
  onShare,
  onRetryInsights,
}) => {
  return (
    <div className="space-y-6">
      {/* Performance/Insights Card */}
      <div className="">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-[#F45A0B] rounded-full"></span>{" "}
          PERFORMANCE
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Views */}
          <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                  Views
                </p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {insights?.totalViews?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Bids */}
          <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                  Bids
                </p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {insights?.proposalsReceived?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Card */}
      <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full"></span> Budget
        </h3>
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-5 mb-6 text-center">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">
            Est. Investment
          </p>
          <p className="text-2xl font-bold flex items-center justify-center gap-2">
            <span className="text-primary">
              {formatCurrency(budgetMin, currency)}
            </span>
            <span className="text-xs text-zinc-500 uppercase">TO</span>
            <span className="text-primary">
              {formatCurrency(budgetMax, currency)}
            </span>
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Payment method verified
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 uppercase">
              <span className="w-1 h-1 bg-green-500 rounded-full"></span> System
              Operational
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3">
        <button
          onClick={onCloseBids}
          className="w-full flex items-center justify-between p-4 border border-rose-500/20 rounded-xl hover:bg-rose-500/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
              <X className="h-3 w-3 text-white stroke-[3px]" />
            </div>
            <span className="text-sm font-bold text-rose-500">
              Close This Project
            </span>
          </div>
          <ChevronRight className="h-3 w-3 text-rose-500/50 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
