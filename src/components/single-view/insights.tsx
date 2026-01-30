"use client";

import React from "react";
import { Eye, MessageCircle } from "lucide-react";

interface SingleViewInsightsProps {
  views: number;
  proposalsCount: number;
}

export const SingleViewInsights = ({
  views,
  proposalsCount,
}: SingleViewInsightsProps) => {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-[#F45A0B] rounded-full"></span>
        INSIGHTS
      </h3>
      <div className="grid grid-cols-2 gap-3">
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
                {views.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                Proposals
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {proposalsCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
