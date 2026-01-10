/**
 * MyServiceCard Component
 * 
 * Displays a service card with all relevant information including:
 * - Status badge with color coding
 * - Category and upgrade badges
 * - Service name and description
 * - Skills tags
 * - Budget fee (min-max range)
 * - Experience level
 * - Views and proposals count
 * - Payment type
 * - Action dropdown menu (View, Edit, Duplicate, Delete, Pause/Activate)
 * 
 * Requirements: 2.1-2.7, 6.1-6.8, 12.1-12.6, 13.1-13.5
 */

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
  Layers,
  Pause,
  Play,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  MyService,
  statusConfig,
  experienceLevelConfig,
  formatBudget,
  formatNumber,
  canPauseService,
  canActivateService,
} from "../schema/my-services-data";

/**
 * Props interface for MyServiceCard component
 */
interface MyServiceCardProps {
  service: MyService;
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  onDuplicate?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
  onPause?: (serviceId: string) => void;
  onActivate?: (serviceId: string) => void;
}

/**
 * MyServiceCard Component
 * 
 * Displays a comprehensive service card with all service information
 * and action menu for managing the service.
 * 
 * Optimized with React.memo to prevent unnecessary re-renders - Requirement 11.2
 */
export const MyServiceCard = React.memo<MyServiceCardProps>(({
  service,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onPause,
  onActivate,
}) => {
  // Get status configuration for badge display
  const statusInfo = statusConfig[service.status];
  
  // Get experience level configuration for badge display
  const experienceInfo = experienceLevelConfig[service.experienceLevel];

  // Handle card click to view service details
  const handleCardClick = () => {
    if (onView) {
      onView(service.id);
    }
  };

  // Check if service can be paused or activated
  const showPauseAction = canPauseService(service);
  const showActivateAction = canActivateService(service);

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleCardClick}
      role="article"
      aria-label={`Service: ${service.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header: Status, Category, and Upgrades */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Badge - Requirements 2.5, 12.1-12.6, 11.3 */}
            <Badge className={statusInfo.color} aria-label={`Status: ${statusInfo.label}`}>
              <span className="mr-1" aria-hidden="true">{statusInfo.icon}</span>
              {statusInfo.label}
            </Badge>
            
            {/* Category Badge - Requirements 2.7, 11.3 */}
            <Badge variant="secondary" className="text-xs" aria-label={`Category: ${service.category.name}`}>
              <Layers className="h-3 w-3 mr-1" aria-hidden="true" />
              {service.category.name}
            </Badge>
            
            {/* Upgrade Badges - Requirements 2.6, 11.3 */}
            {service.upgrades.length > 0 && (
              <>
                {service.upgrades.slice(0, 2).map((upgrade) => (
                  <Badge
                    key={upgrade.id}
                    variant="outline"
                    className="text-xs"
                    aria-label={`Upgrade: ${upgrade.name}`}
                  >
                    {upgrade.name.toUpperCase()}
                  </Badge>
                ))}
                {service.upgrades.length > 2 && (
                  <Badge variant="secondary" className="text-xs" aria-label={`${service.upgrades.length - 2} more upgrades`}>
                    +{service.upgrades.length - 2}
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Actions Dropdown - Requirements 6.1-6.8, 11.3 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Actions for ${service.name}`}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem onClick={() => onView?.(service.id)} aria-label="View service details">
                <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(service.id)} aria-label="Edit service">
                <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate?.(service.id)} aria-label="Duplicate service">
                <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                Duplicate
              </DropdownMenuItem>
              
              {/* Conditional Pause/Activate Actions - Requirements 6.7, 6.8, 11.3 */}
              {(showPauseAction || showActivateAction) && (
                <>
                  <DropdownMenuSeparator />
                  {showPauseAction && (
                    <DropdownMenuItem onClick={() => onPause?.(service.id)} aria-label="Pause service">
                      <Pause className="h-4 w-4 mr-2" aria-hidden="true" />
                      Pause
                    </DropdownMenuItem>
                  )}
                  {showActivateAction && (
                    <DropdownMenuItem onClick={() => onActivate?.(service.id)} aria-label="Activate service">
                      <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                      Activate
                    </DropdownMenuItem>
                  )}
                </>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(service.id)}
                className="text-red-600 dark:text-red-400"
                aria-label="Delete service"
              >
                <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Service Name - Requirements 2.1 */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 mb-2">
          {service.name}
        </h3>

        {/* Description - Requirements 2.1 */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Skills - Requirements 2.7 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.skills.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {skill.name}
            </span>
          ))}
          {service.skills.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              +{service.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Service Details Grid - Requirements 2.1-2.4, 13.1-13.5 */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
          {/* Budget Fee - Requirements 2.4 */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Budget Fee
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {formatBudget(service)}
              </p>
            </div>
          </div>

          {/* Experience Level - Requirements 2.1 */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Experience
              </p>
              <Badge className={`${experienceInfo.color} text-xs font-semibold mt-1`}>
                {experienceInfo.label}
              </Badge>
            </div>
          </div>

          {/* Delivery Days */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Delivery
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {service.deliveryDays} {service.deliveryDays === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Payment Type - Requirements 2.3 */}
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-orange-500 dark:text-orange-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Payment Type
              </p>
              <Badge variant="secondary" className="text-xs font-semibold mt-1">
                {service.paymentType === "fixed" ? "Fixed" : "Hourly"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Footer: Views and Proposals - Requirements 2.2, 13.1-13.2, 11.3 */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-label={`${formatNumber(service.views)} views`}>
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">{formatNumber(service.views)} views</span>
            </div>
            <div className="flex items-center gap-1" aria-label={`${formatNumber(service.proposalsCount)} proposals`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">{formatNumber(service.proposalsCount)} proposals</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// Add display name for debugging
MyServiceCard.displayName = "MyServiceCard";
