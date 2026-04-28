/**
 * MyServicesGrid Component
 * 
 * Displays a responsive grid of service cards with action handlers.
 * Shows an empty state with call-to-action when no services exist.
 * 
 * Grid Layout:
 * - Mobile (<768px): 1 column
 * - Tablet (768px-1024px): 2 columns
 * - Desktop (>1024px): 3 columns
 * 
 * Requirements: 1.2, 1.3, 1.4, 6.7, 6.8, 10.1, 10.2, 10.3, 10.4
 */

import React from "react";
import { MyServiceCard } from "./my-services-card";
import { MyService } from "../schema/my-services-data";
import { EmptyState } from "@/components/ui/empty-state";
import { Package } from "lucide-react";

/**
 * Props interface for MyServicesGrid component
 */
interface MyServicesGridProps {
  services: MyService[];
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  onDuplicate?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
  onPause?: (serviceId: string) => void;
  onActivate?: (serviceId: string) => void;
  onCreateNew?: () => void;
}

/**
 * MyServicesGrid Component
 * 
 * Renders a responsive grid of service cards or an empty state.
 * Passes all action handlers to individual service cards.
 * 
 * Optimized with React.memo to prevent unnecessary re-renders - Requirement 11.2
 */
export const MyServicesGrid = React.memo<MyServicesGridProps>(({
  services,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onPause,
  onActivate,
  onCreateNew,
}) => {
  // Show empty state when no services exist - Requirement 1.4
  if (services.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No services found"
        description="Try adjusting your filters or search query, or create a new service to get started."
        action={onCreateNew ? {
          label: "Post New Service",
          onClick: onCreateNew,
        } : undefined}
      />
    );
  }

  // Render responsive grid of service cards - Requirements 1.2, 1.3, 10.1-10.4, 11.3
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="Services list"
    >
      {services.map((service) => (
        <MyServiceCard
          key={service.id}
          service={service}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onView={onView}
          onPause={onPause}
          onActivate={onActivate}
        />
      ))}
    </div>
  );
});

// Add display name for debugging
MyServicesGrid.displayName = "MyServicesGrid";
