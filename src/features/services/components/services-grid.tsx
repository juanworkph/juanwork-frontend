import React from "react";
import { ServiceCard } from "./service-card";
import { MyService } from "../schema/my-services-data";
import { Package } from "lucide-react";

interface ServicesGridProps {
  services: MyService[];
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  onDuplicate?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
}

export function ServicesGrid({
  services,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
}: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Package className="h-10 w-10 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No services found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          Try adjusting your filters or search query, or create a new service to
          get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onView={onView}
        />
      ))}
    </div>
  );
}
