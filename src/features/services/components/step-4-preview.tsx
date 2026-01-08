"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Tag,
  DollarSign,
  Layers,
  Sparkles,
  Calendar,
  AlertCircle,
  RefreshCw,
  Edit2,
  Clock,
  Briefcase,
} from "lucide-react";
import type { ServiceFormData } from "../schema/service-form.schema";
import { useServiceFormData } from "../hooks/use-service-form-data";

interface Step4Props {
  formData: ServiceFormData;
  onNavigateToStep?: (step: number) => void;
}

/**
 * Helper function to format currency
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Helper function to format file size
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Helper function to parse price from backend
 * Backend returns numeric as string, need to convert to number
 */
const parsePrice = (price: number | string): number => {
  if (typeof price === "number") {
    return price;
  }
  return parseFloat(price) || 0;
};

/**
 * Step 4: Preview Component
 *
 * This component displays a read-only preview of all service data
 * before final submission. It shows:
 * - Basic service details (name, description, payment type, experience level, budget, delivery days)
 * - Categories and skills
 * - Selected upgrades with total cost
 * - Edit buttons to navigate back to specific steps
 *
 * Features:
 * - Fetches upgrade data from API with loading/error states
 * - Calculates total upgrade cost
 * - Conditional display of delivery days (only for fixed-price services)
 * - Edit buttons for each section
 * - Responsive design with TailwindCSS
 */
export function Step4Preview({ formData, onNavigateToStep }: Step4Props) {
  // Fetch upgrade types from API
  const { upgradeTypes, isLoadingUpgrades, errorUpgrades, refetchUpgrades } =
    useServiceFormData();

  // Find selected upgrades from API data
  const selectedUpgradesList = upgradeTypes.filter((upgrade) =>
    formData.selectedUpgrades.includes(upgrade.id)
  );

  // Calculate total upgrade cost
  const totalUpgradeCost = selectedUpgradesList.reduce((total, upgrade) => {
    return total + parsePrice(upgrade.basePrice);
  }, 0);

  /**
   * Handle edit button click
   * Navigates to the specified step
   */
  const handleEdit = (step: number) => {
    if (onNavigateToStep) {
      onNavigateToStep(step);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Your Service
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please review all details before submitting your service to clients
        </p>
      </div>

      {/* Preview Cards */}
      <div className="space-y-4">
        {/* Basic Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-[#F45A0B]" />
                Service Details
              </CardTitle>
              {onNavigateToStep && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(1)}
                  className="text-[#F45A0B] hover:text-[#F45A0B] hover:bg-[#F45A0B]/10"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {formData.serviceName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {formData.description}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Type</p>
                <Badge variant="secondary" className="text-sm">
                  {formData.paymentType === "fixed"
                    ? "Fixed Price"
                    : "Hourly Rate"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience Level</p>
                <Badge variant="secondary" className="text-sm capitalize">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {formData.experienceLevel}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Budget</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formData.paymentType === "fixed"
                    ? `${formatCurrency(formData.budget.min)} - ${formatCurrency(
                        formData.budget.max
                      )}`
                    : `${formatCurrency(formData.budget.min)} - ${formatCurrency(
                        formData.budget.max
                      )}/hour`}
                </p>
              </div>
              {formData.paymentType === "fixed" && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Delivery Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#F45A0B]" />
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formData.deliveryDays}{" "}
                      {formData.deliveryDays === 1 ? "day" : "days"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {formData.attachments.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Portfolio Samples ({formData.attachments.length})
                  </p>
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <span className="text-gray-900 dark:text-white truncate">
                          {file.name}
                        </span>
                        <span className="text-gray-500 ml-2 flex-shrink-0">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Categories & Skills */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-[#F45A0B]" />
                Categories & Skills
              </CardTitle>
              {onNavigateToStep && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(2)}
                  className="text-[#F45A0B] hover:text-[#F45A0B] hover:bg-[#F45A0B]/10"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Category</p>
              <Badge variant="outline" className="text-sm">
                <Layers className="h-3 w-3 mr-1" />
                {formData.category}
              </Badge>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Your Skills ({formData.skills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={`${skill}-${index}`}
                    variant="secondary"
                    className="bg-[#F45A0B]/10 text-[#F45A0B] border border-[#F45A0B]/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrades */}
        {isLoadingUpgrades ? (
          <Card className="border-[#F45A0B]/20 bg-[#F45A0B]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                Selected Upgrades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ) : errorUpgrades ? (
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Failed to load upgrade details: {errorUpgrades}</span>
                  <Button
                    type="button"
                    onClick={refetchUpgrades}
                    variant="outline"
                    size="sm"
                    className="ml-4"
                  >
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : selectedUpgradesList.length > 0 ? (
          <Card className="border-[#F45A0B]/20 bg-[#F45A0B]/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                  Selected Upgrades
                </CardTitle>
                {onNavigateToStep && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(3)}
                    className="text-[#F45A0B] hover:text-[#F45A0B] hover:bg-[#F45A0B]/10"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedUpgradesList.map((upgrade) => (
                <div
                  key={upgrade.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Badge className="bg-[#F45A0B] text-white flex-shrink-0">
                      {upgrade.name}
                    </Badge>
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {upgrade.description.length > 80
                        ? `${upgrade.description.slice(0, 80)}...`
                        : upgrade.description}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white ml-4 flex-shrink-0">
                    {formatCurrency(parsePrice(upgrade.basePrice))}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">
                  Total Upgrades Cost
                </span>
                <span className="text-[#F45A0B]">
                  {formatCurrency(totalUpgradeCost)}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Total Cost Summary */}
        <Card className="border-2 border-[#F45A0B] bg-gradient-to-r from-[#F45A0B]/10 to-[#F45A0B]/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#F45A0B] flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your Service Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formData.paymentType === "fixed"
                      ? `${formatCurrency(formData.budget.min)} - ${formatCurrency(
                          formData.budget.max
                        )}`
                      : `${formatCurrency(formData.budget.min)} - ${formatCurrency(
                          formData.budget.max
                        )}/hour`}
                  </p>
                </div>
              </div>
              {totalUpgradeCost > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upgrades
                  </p>
                  <p className="text-xl font-bold text-[#F45A0B]">
                    +{formatCurrency(totalUpgradeCost)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Ready to Submit?
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Once you submit your service, it will be reviewed by our team.
              You'll receive a notification once it's approved and live for
              clients to see. Click the "Submit Service" button below to
              continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
