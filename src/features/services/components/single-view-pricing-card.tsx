"use client";

import React, { memo } from "react";
import type { ServicePricing, PackageDetails } from "@/features/services/schema";
import { getDeliveryTimeLabel } from "@/features/services/schema";

interface SingleViewPricingCardProps {
  pricing: ServicePricing;
  packageDetails?: PackageDetails;
  selectedPackage: "basic" | "standard" | "premium" | null;
  onSubmitProposal: () => void;
  onContactProvider: () => void;
}

export const SingleViewPricingCard = memo(({
  pricing,
  packageDetails,
  selectedPackage,
  onSubmitProposal,
  onContactProvider,
}: SingleViewPricingCardProps) => {
  // Determine price to display
  const getDisplayPrice = () => {
    if (pricing.type === "package" && selectedPackage && packageDetails) {
      return {
        price: packageDetails[selectedPackage].price,
        label: `${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} Package`,
      };
    }

    if (pricing.type === "hourly" && pricing.hourlyRate) {
      return {
        price: pricing.hourlyRate,
        label: "per hour",
      };
    }

    return {
      price: pricing.starting,
      label: "starting at",
    };
  };

  // Get delivery time for selected package
  const getDeliveryTime = () => {
    if (pricing.type === "package" && selectedPackage && packageDetails) {
      return packageDetails[selectedPackage].deliveryTime;
    }
    return null;
  };

  const { price, label } = getDisplayPrice();
  const deliveryTime = getDeliveryTime();

  return (
    <>
      {/* Desktop: Sticky Card */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-4" role="complementary" aria-label="Service pricing">
        <div className="p-6">
          {/* Price Display */}
          <div className="mb-6" aria-label={`Price: ${label} ${pricing.currency === "USD" ? "$" : pricing.currency}${price.toLocaleString()}`}>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {pricing.currency === "USD" ? "$" : pricing.currency}
                {price.toLocaleString()}
              </span>
              {pricing.type === "hourly" && (
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  /hr
                </span>
              )}
            </div>
          </div>

          {/* Delivery Time */}
          {deliveryTime && (
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{getDeliveryTimeLabel(deliveryTime)} Delivery</span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={onSubmitProposal}
              className="w-full py-3 px-4 bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
              aria-label="Submit proposal for this service"
            >
              Submit Proposal
            </button>
            <button
              onClick={onContactProvider}
              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
              aria-label="Contact service provider"
            >
              Contact Provider
            </button>
          </div>

          {/* Additional Info */}
          {pricing.type === "package" && selectedPackage && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700" role="status" aria-live="polite">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} package selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 shadow-lg" role="complementary" aria-label="Service pricing">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Price */}
            <div className="flex-shrink-0" aria-label={`Price: ${label} ${pricing.currency === "USD" ? "$" : pricing.currency}${price.toLocaleString()}`}>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {pricing.currency === "USD" ? "$" : pricing.currency}
                  {price.toLocaleString()}
                </span>
                {pricing.type === "hourly" && (
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    /hr
                  </span>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 flex-1 justify-end">
              <button
                onClick={onContactProvider}
                className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
                aria-label="Contact service provider"
              >
                Contact
              </button>
              <button
                onClick={onSubmitProposal}
                className="px-4 sm:px-6 py-2 bg-[#F45A0B] hover:bg-[#F45A0B]/90 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F45A0B] focus-visible:ring-offset-2"
                aria-label="Submit proposal for this service"
              >
                Submit Proposal
              </button>
            </div>
          </div>

          {/* Delivery Time on Mobile */}
          {deliveryTime && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{getDeliveryTimeLabel(deliveryTime)} Delivery</span>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for mobile fixed bottom bar */}
      <div className="lg:hidden h-20 sm:h-24" aria-hidden="true"></div>
    </>
  );
});

SingleViewPricingCard.displayName = "SingleViewPricingCard";
