import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CheckCircle,
  Bookmark,
  Clock,
  MapPin,
  Award,
  ShoppingCart,
  RefreshCw,
  Package,
} from "lucide-react";
import {
  DiscoverService,
  formatCurrency,
  getDeliveryTimeLabel,
  getPricingTypeLabel,
} from "../schema";

interface ServiceDiscoveryCardProps {
  service: DiscoverService;
}

export function ServiceDiscoveryCard({ service }: ServiceDiscoveryCardProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getPriceDisplay = () => {
    if (service.pricing.type === "hourly") {
      return `${formatCurrency(service.pricing.hourlyRate || 0)}/hr`;
    } else if (service.pricing.type === "package") {
      return `${formatCurrency(service.pricing.starting)}`;
    } else {
      return formatCurrency(service.pricing.starting);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden p-0">
      <CardContent className="p-6 h-full">
        {/* Header: Category, Badges and Bookmark */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {service.isTopRated && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 text-xs">
                <Award className="h-3 w-3 mr-1 fill-white" />
                Top Rated
              </Badge>
            )}
            {service.isFeatured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              <Package className="h-3 w-3 mr-1" />
              {service.category}
            </Badge>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            }`}
          >
            <Bookmark
              className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Service Title */}
        <Link href={`/client/services/${service.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {service.serviceName}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {service.skills.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
              +{service.skills.length - 5} more
            </span>
          )}
        </div>

        {/* Provider Info with Image */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-4">
          <Image
            src={
              service.provider.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt={service.provider.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-white dark:border-gray-700"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {service.provider.name}
              </span>
              {service.provider.verified && (
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{service.provider.country}</span>
              <span>•</span>
              <Badge
                variant="secondary"
                className="text-xs h-4 px-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 capitalize"
              >
                {service.provider.level}
              </Badge>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {service.rating} ({service.reviewsCount})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ShoppingCart className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {service.totalOrders}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Delivery
              </p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">
                {getDeliveryTimeLabel(service.deliveryTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-4 w-4 text-green-500 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Revisions
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {service.revisions}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Type */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Package className="h-3 w-3" />
          <span>{getPricingTypeLabel(service.pricing.type)}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              Starting at
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {getPriceDisplay()}
            </p>
          </div>
          <Button
            className="bg-[#F45A0B] hover:bg-[#F45A0B]/80"
            onClick={() => router.push(`/client/services/${service.id}`)}
          >
            View Service
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
