import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileText, Tag, DollarSign, Layers, Sparkles, Calendar, AlertCircle, RefreshCw } from "lucide-react";
import type { ProjectFormData } from "../schema/project-form.schema";
import { useProjectFormData } from "../hooks/use-project-form-data";
import { calculateTotalUpgradeCost, findUpgradesByIds } from "../utils/project-form-mapper";
import { formatCurrency, formatFileSize } from "../utils/format-helpers";

interface Step4Props {
  formData: ProjectFormData;
}

export function Step4Preview({ formData }: Step4Props) {
  // Fetch upgrade types from API
  const {
    upgradeTypes,
    isLoadingUpgrades,
    errorUpgrades,
    refetchUpgrades,
  } = useProjectFormData();

  // Find selected upgrades from API data
  const selectedUpgradesList = findUpgradesByIds(
    formData.selectedUpgrades,
    upgradeTypes
  );

  // Calculate total upgrade cost using API data
  const totalUpgradeCost = calculateTotalUpgradeCost(
    formData.selectedUpgrades,
    upgradeTypes
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Your Project
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please review all details before submitting your project to
          freelancers
        </p>
      </div>

      {/* Preview Cards */}
      <div className="space-y-4">
        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-[#F45A0B]" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {formData.projectName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {formData.description}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Project Type</p>
                <Badge variant="secondary" className="text-sm">
                  {formData.projectType === "fixed"
                    ? "Fixed Price"
                    : "Hourly Rate"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience Level</p>
                <Badge variant="secondary" className="text-sm capitalize">
                  {formData.experienceLevel}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Budget</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formData.projectType === "fixed"
                    ? `${formatCurrency(
                        formData.budget.min
                      )} - ${formatCurrency(formData.budget.max)}`
                    : `${formatCurrency(formData.budget.hourlyRate || 0)}/hour`}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Delivery Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#F45A0B]" />
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formData.deliveryDays} {formData.deliveryDays === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Project Files ({formData.attachments.length})
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-[#F45A0B]" />
              Categories & Skills
            </CardTitle>
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
                Required Skills ({formData.skills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                Selected Upgrades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedUpgradesList.map((upgrade) => (
                <div
                  key={upgrade.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#F45A0B] text-white">
                      {upgrade.name}
                    </Badge>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {upgrade.description.length > 80
                        ? `${upgrade.description.slice(0, 80)}...`
                        : upgrade.description}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white ml-4 flex-shrink-0">
                    {formatCurrency(typeof upgrade.basePrice === 'string' 
                      ? parseFloat(upgrade.basePrice) 
                      : upgrade.basePrice)}
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
                    Your Project Budget
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formData.projectType === "fixed"
                      ? `${formatCurrency(
                          formData.budget.min
                        )} - ${formatCurrency(formData.budget.max)}`
                      : `${formatCurrency(
                          formData.budget.hourlyRate || 0
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
              Once you submit your project, it will be reviewed by our team.
              You'll receive a notification once it's approved and live for
              freelancers to see. Click the "Submit Project" button below to
              continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
