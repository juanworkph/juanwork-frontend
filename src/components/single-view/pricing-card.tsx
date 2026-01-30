"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/features/services/schema/discover-services-data";

interface SingleViewPricingCardProps {
  budgetMin: number;
  budgetMax: number;
  currency: string;
  paymentType: "fixed" | "hourly" | "package";
  userType?: "freelancer" | "client"; // Deprecated for action logic, use isOwner
  isOwner?: boolean;
  onManagePrice?: () => void;
  onSubmitProposal?: () => void;
  onContactProvider?: () => void;
}

export const SingleViewPricingCard = ({
  budgetMin,
  budgetMax,
  currency,
  paymentType,
  userType,
  isOwner = false, // Default to false (viewer/buyer mode)
  onManagePrice,
  onSubmitProposal,
  onContactProvider,
}: SingleViewPricingCardProps) => {
  const getPaymentTypeLabel = () => {
    switch (paymentType) {
      case "fixed":
        return "FIXED RATE";
      case "hourly":
        return "HOURLY RATE";
      case "package":
        return "PACKAGE RATE";
      default:
        return "FIXED RATE";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <span className="w-1 h-3 bg-[#F45A0B] rounded-full"></span>
          PRICING
        </h2>
      </div>

      <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
        <div className="bg-background-light dark:bg-background-dark border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            TYPE
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
            {getPaymentTypeLabel()}
          </span>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mb-6 text-center">
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2">
            EST. INVESTMENT
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">
              {formatCurrency(budgetMin, currency)}
            </span>
            <span className="text-xs text-zinc-400 uppercase font-medium">
              TO
            </span>
            <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">
              {formatCurrency(budgetMax, currency)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {isOwner ? (
          <Button
            onClick={onManagePrice}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-xs group"
          >
            Manage Price
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <div className="space-y-3">
            {onSubmitProposal && (
              <Button
                onClick={onSubmitProposal}
                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-xs group"
              >
                Submit Proposal
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            <Button
              onClick={onContactProvider}
              variant="outline"
              className="w-full border-zinc-200 dark:border-zinc-800 font-bold py-6 rounded-xl uppercase tracking-widest text-xs group hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Provider
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
