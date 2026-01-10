import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageCircle,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Layers
} from "lucide-react";
import {
  MyService,
  statusConfig,
  formatDate,
} from "../schema/my-services-data";
import { formatCurrency } from "../schema/discover-services-data";

interface MyServicesCardProps {
  service: MyService;
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  onDuplicate?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
}

export function MyServicesCard({
  service,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
}: MyServicesCardProps) {
  const statusInfo = statusConfig[service.status];

  const handleCardClick = () => {
    if (onView) {
      onView(service.id);
    }
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden p-0 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 h-full">
        {/* Header: Status, Category, and Upgrades */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusInfo.color}>
              <span className="mr-1">{statusInfo.icon}</span>
              {statusInfo.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              {service.category}
            </Badge>
            {service.upgrades.length > 0 && (
              <>
                {service.upgrades.slice(0, 2).map((upgrade) => (
                  <Badge
                    key={upgrade}
                    variant="outline"
                    className="text-xs"
                  >
                    {upgrade.toUpperCase()}
                  </Badge>
                ))}
                {service.upgrades.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{service.upgrades.length - 2}
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem onClick={() => onView?.(service.id)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Service
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(service.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate?.(service.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(service.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Service Name */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 mb-3">
          {service.serviceName}
        </h3>

        {/* Description */}
        <p className="ttext-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
          {service.skills.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              +{service.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {service.projectType === "fixed" ? "Budget Range" : "Hourly Rate"}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {service.projectType === "fixed"
                ? `${formatCurrency(service.budget.min)} - ${formatCurrency(
                    service.budget.max
                  )}`
                : `${formatCurrency(service.budget.hourlyRate || 0)}/hr`}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span>{service.views}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>{service.inquiries}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(service.updatedAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
