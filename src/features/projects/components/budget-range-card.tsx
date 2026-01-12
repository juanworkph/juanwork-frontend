"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

/**
 * Payment type for projects
 */
type PaymentType = "fixed" | "hourly";

/**
 * Props for BudgetRangeCard component
 */
interface BudgetRangeCardProps {
  paymentType: PaymentType;
  budgetMin: number;
  budgetMax: number;
  currency: string;
}

/**
 * Format currency amount with proper thousand separators
 * 
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., "USD", "PHP")
 * @returns Formatted currency string (e.g., "$1,000")
 */
const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * BudgetRangeCard Component
 *
 * Displays the budget range for a project with payment type badge.
 * Shows budget in min - max format with proper currency formatting.
 *
 * Optimized with React.memo to prevent unnecessary re-renders.
 *
 * Requirements:
 * - 14.1: Display payment type badge (Fixed/Hourly)
 * - 14.2: Display budget range (min - max)
 * - 14.3: Format currency with proper separators
 * - 14.4: Use Card component from Shadcn
 * - Performance: Optimized with React.memo
 */
const BudgetRangeCardComponent: React.FC<BudgetRangeCardProps> = ({
  paymentType,
  budgetMin,
  budgetMax,
  currency,
}) => {
  // Determine payment type label
  const paymentTypeLabel = paymentType === "fixed" ? "Fixed Price" : "Hourly Rate";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Budget Range</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Type Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
            aria-label={`Payment type: ${paymentTypeLabel}`}
          >
            {paymentTypeLabel}
          </Badge>
        </div>

        {/* Budget Range Display */}
        <div 
          className="flex items-center gap-3"
          role="group"
          aria-label={`Budget range: ${formatCurrency(budgetMin, currency)} to ${formatCurrency(budgetMax, currency)}`}
        >
          <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paymentType === "fixed" ? "Project Budget" : "Hourly Rate"}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(budgetMin, currency)} - {formatCurrency(budgetMax, currency)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Memoized BudgetRangeCard component
 * Prevents unnecessary re-renders when parent updates
 */
export const BudgetRangeCard = React.memo(BudgetRangeCardComponent);
