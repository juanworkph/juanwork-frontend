import React from "react";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function ProgressIndicator({
  currentStep,
  steps,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex-1 flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#F45A0B] text-white"
                      : isActive
                      ? "bg-[#F45A0B] text-white ring-4 ring-[#F45A0B]/20"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isActive || isCompleted
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 -mt-6">
                  <div
                    className={`h-full rounded transition-all duration-200 ${
                      stepNumber < currentStep
                        ? "bg-[#F45A0B]"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
