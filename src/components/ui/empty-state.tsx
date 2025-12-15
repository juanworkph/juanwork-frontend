import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4",
        className
      )}
    >
      {Icon && (
        <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
      )}
      <h3 className="text-sm sm:text-base font-medium text-foreground mb-1 sm:mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mb-4 sm:mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} size="sm" className="text-xs sm:text-sm">
          {action.label}
        </Button>
      )}
    </div>
  );
};
