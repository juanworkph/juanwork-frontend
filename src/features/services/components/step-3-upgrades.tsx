import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
} from "lucide-react";
import { ServiceFormData } from "../schema/service-form.schema";
import { UpgradeType } from "../schema/service-post.schema";
import { getAllUpgradeTypes } from "../actions/service-post.actions";

interface Step3Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
}

// Icon mapping for upgrade types based on slug
const upgradeIcons: Record<string, React.ReactNode> = {
  recruiter: <Award className="h-5 w-5" />,
  nda: <ShieldCheck className="h-5 w-5" />,
  "ip-agreement": <FileCheck className="h-5 w-5" />,
  featured: <Sparkles className="h-5 w-5" />,
  urgent: <Clock className="h-5 w-5" />,
  private: <Eye className="h-5 w-5" />,
  sealed: <Lock className="h-5 w-5" />,
};

// Badge colors for upgrade types based on slug
const upgradeBadgeColors: Record<string, string> = {
  recruiter: "bg-purple-600",
  nda: "bg-blue-600",
  "ip-agreement": "bg-red-600",
  featured: "bg-orange-500",
  urgent: "bg-red-500",
  private: "bg-yellow-500",
  sealed: "bg-blue-500",
};

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
 * Helper function to parse price from backend
 * Backend returns numeric as string, need to convert to number
 */
const parsePrice = (price: number | string): number => {
  if (typeof price === "number") {
    return price;
  }
  return parseFloat(price) || 0;
};

export function Step3Upgrades({ formData, onUpdate }: Step3Props) {
  const [upgrades, setUpgrades] = useState<UpgradeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch upgrade types on component mount
  useEffect(() => {
    const fetchUpgrades = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedUpgrades = await getAllUpgradeTypes();
        
        // Filter only active upgrades
        const activeUpgrades = fetchedUpgrades.filter(
          (upgrade) => upgrade.isActive
        );
        
        setUpgrades(activeUpgrades);
      } catch (err) {
        console.error("Error fetching upgrades:", err);
        setError("Failed to load upgrade options. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpgrades();
  }, []);

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

  // Calculate total cost from selected upgrades
  const calculateTotalCost = (): number => {
    return upgrades
      .filter((upgrade) => formData.selectedUpgrades.includes(upgrade.id))
      .reduce((total, upgrade) => total + parsePrice(upgrade.basePrice), 0);
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose upgrades for your service (optional)
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enhance your visibility and attract more clients with optional
          upgrades
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-8 w-32 rounded-md" />
                  <Skeleton className="h-4 flex-1 rounded" />
                  <Skeleton className="h-6 w-20 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upgrades Content */}
      {!isLoading && !error && (
        <>
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

          {/* Empty State */}
          {upgrades.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No upgrade options are currently available.
              </AlertDescription>
            </Alert>
          )}

          {/* Upgrade Cards */}
          {upgrades.length > 0 && (
            <div className="space-y-4">
              {upgrades.map((upgrade) => {
                const isSelected = formData.selectedUpgrades.includes(upgrade.id);
                const price = parsePrice(upgrade.basePrice);
                const icon = upgradeIcons[upgrade.slug] || <Sparkles className="h-5 w-5" />;
                const badgeColor = upgradeBadgeColors[upgrade.slug] || "bg-gray-600";

                return (
                  <Card
                    key={upgrade.id}
                    className={`transition-all duration-200 ${
                      isSelected
                        ? "border-[#F45A0B] ring-2 ring-[#F45A0B]/20 bg-[#F45A0B]/5"
                        : "border-gray-200 dark:border-gray-700"
                    } cursor-pointer`}
                    onClick={() => handleToggleUpgrade(upgrade.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 mt-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleUpgrade(upgrade.id)}
                            className="data-[state=checked]:bg-[#F45A0B] data-[state=checked]:border-[#F45A0B]"
                          />
                        </div>

                        {/* Icon & Badge */}
                        <div className="flex-shrink-0">
                          <div
                            className={`${badgeColor} text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2`}
                          >
                            {icon}
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
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {price === 0 ? "FREE" : formatCurrency(price)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Info Box */}
          {upgrades.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Why choose upgrades?
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Upgrades increase your service visibility and help you attract
                    more clients. Services with upgrades typically receive 3x more
                    inquiries and get hired faster.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
