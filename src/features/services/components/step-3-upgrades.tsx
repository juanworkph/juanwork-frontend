import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Clock,
  Lock,
  FileCheck,
  Award,
} from "lucide-react";
import {
  ServiceFormData,
  serviceUpgrades,
  formatCurrency,
  calculateTotalUpgradeCost,
} from "../schema";

interface Step3Props {
  formData: ServiceFormData;
  onUpdate: (data: Partial<ServiceFormData>) => void;
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

  const totalCost = calculateTotalUpgradeCost(formData.selectedUpgrades);

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
        {serviceUpgrades.map((upgrade) => {
          const isSelected = formData.selectedUpgrades.includes(upgrade.id);
          const isDisabled = !upgrade.available;

          return (
            <Card
              key={upgrade.id}
              className={`transition-all duration-200 ${
                isSelected
                  ? "border-[#F45A0B] ring-2 ring-[#F45A0B]/20 bg-[#F45A0B]/5"
                  : "border-gray-200 dark:border-gray-700"
              } ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                      className={`${upgrade.badgeColor} text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2`}
                    >
                      {upgradeIcons[upgrade.id]}
                      {upgrade.name}
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
                        {upgrade.price === 0
                          ? "FREE"
                          : formatCurrency(upgrade.price)}
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
              Upgrades increase your service visibility and help you attract
              more clients. Services with upgrades typically receive 3x more
              inquiries and get hired faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
