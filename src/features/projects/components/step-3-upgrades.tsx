import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Clock,
  Lock,
  FileCheck,
  Award,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { ProjectFormData } from "../schema/project-form.schema";
import type { UpgradeType } from "../schema/project-post.schema";
import { useProjectFormData } from "../hooks/use-project-form-data";
import { calculateTotalUpgradeCost } from "../utils/project-form-mapper";
import { formatCurrency } from "../utils/format-helpers";

interface Step3Props {
  formData: ProjectFormData;
  onUpdate: (data: Partial<ProjectFormData>) => void;
}

const upgradeIcons: Record<string, React.ReactNode> = {
  recruiter: <Award className="h-5 w-5" />,
  nda: <ShieldCheck className="h-5 w-5" />,
  "ip-agreement": <FileCheck className="h-5 w-5" />,
  featured: <Sparkles className="h-5 w-5" />,
  urgent: <Clock className="h-5 w-5" />,
  private: <Eye className="h-5 w-5" />,
  sealed: <Lock className="h-5 w-5" />,
};

export function Step3Upgrades({ formData, onUpdate }: Step3Props) {
  // Fetch upgrade types from API
  const {
    upgradeTypes,
    isLoadingUpgrades,
    errorUpgrades,
    refetchUpgrades,
  } = useProjectFormData();

  const handleToggleUpgrade = (upgradeId: string) => {
    const isSelected = formData.selectedUpgrades.includes(upgradeId);

    if (isSelected) {
      onUpdate({
        selectedUpgrades: formData.selectedUpgrades.filter(
          (id) => id !== upgradeId
        ),
      });
    } else {
      onUpdate({
        selectedUpgrades: [...formData.selectedUpgrades, upgradeId],
      });
    }
  };

  const totalCost = calculateTotalUpgradeCost(
    formData.selectedUpgrades,
    upgradeTypes
  );

  // Helper function to get badge color based on upgrade slug
  const getBadgeColor = (slug: string): string => {
    const colorMap: Record<string, string> = {
      recruiter: "bg-purple-600",
      nda: "bg-blue-600",
      "ip-agreement": "bg-red-600",
      featured: "bg-orange-500",
      urgent: "bg-red-500",
      private: "bg-yellow-500",
      sealed: "bg-blue-500",
    };
    return colorMap[slug] || "bg-gray-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose upgrades for your project (optional)
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enhance your project visibility and attract more qualified freelancers
          with optional upgrades
        </p>
      </div>

      {/* Total Cost Summary */}
      {formData.selectedUpgrades.length > 0 && (
        <Alert className="bg-[#F45A0B]/10 border-[#F45A0B]/20">
          <Sparkles className="h-4 w-4 text-[#F45A0B]" />
          <AlertDescription className="text-gray-900 dark:text-white">
            <div className="flex items-center justify-between">
              <span>
                {formData.selectedUpgrades.length} upgrade
                {formData.selectedUpgrades.length > 1 ? "s" : ""} selected
              </span>
              <span className="font-bold text-lg">
                Total: {formatCurrency(totalCost)}
              </span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Upgrade Cards */}
      <div className="space-y-4">
        {/* Loading State */}
        {isLoadingUpgrades && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-8 w-32 rounded-md" />
                    <Skeleton className="h-12 flex-1 rounded" />
                    <Skeleton className="h-8 w-20 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Error State */}
        {errorUpgrades && !isLoadingUpgrades && (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">
                    Failed to load upgrades
                  </p>
                  <p className="text-sm">{errorUpgrades}</p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                    Upgrades are optional. You can continue without them or try
                    again.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetchUpgrades}
                  className="ml-4 flex-shrink-0"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Upgrade Cards - API Data */}
        {!isLoadingUpgrades &&
          !errorUpgrades &&
          upgradeTypes.map((upgrade) => {
            const isSelected = formData.selectedUpgrades.includes(upgrade.id);
            const isDisabled = !upgrade.isActive;

            return (
              <Card
                key={upgrade.id}
                className={`transition-all duration-200 ${
                  isSelected
                    ? "border-[#F45A0B] ring-2 ring-[#F45A0B]/20 bg-[#F45A0B]/5"
                    : "border-gray-200 dark:border-gray-700"
                } ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => !isDisabled && handleToggleUpgrade(upgrade.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        checked={isSelected}
                        disabled={isDisabled}
                        onCheckedChange={() =>
                          !isDisabled && handleToggleUpgrade(upgrade.id)
                        }
                        className="data-[state=checked]:bg-[#F45A0B] data-[state=checked]:border-[#F45A0B]"
                      />
                    </div>

                    {/* Icon & Badge */}
                    <div className="flex-shrink-0">
                      <div
                        className={`${getBadgeColor(
                          upgrade.slug
                        )} text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2`}
                      >
                        {upgradeIcons[upgrade.slug] || (
                          <Sparkles className="h-5 w-5" />
                        )}
                        {upgrade.name.toUpperCase()}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {upgrade.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right">
                      {isDisabled ? (
                        <Badge
                          variant="destructive"
                          className="bg-gray-500 hover:bg-gray-500"
                        >
                          SOLD OUT
                        </Badge>
                      ) : (
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {upgrade.basePrice === 0
                            ? "FREE"
                            : formatCurrency(typeof upgrade.basePrice === 'string' 
                                ? parseFloat(upgrade.basePrice) 
                                : upgrade.basePrice)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Why choose upgrades?
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Upgrades increase your project visibility and help you attract
              more qualified freelancers. Projects with upgrades typically
              receive 3x more proposals and get filled faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
