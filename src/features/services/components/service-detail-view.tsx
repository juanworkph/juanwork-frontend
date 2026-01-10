import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Trash2,
  Copy,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign,
  Clock,
  Tag,
  Sparkles,
  Share2,
  Download,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import {
  MyService,
  statusConfig,
  formatDate,
} from "../schema/my-services-data";
import { formatCurrency } from "../schema/discover-services-data";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ServiceDetailViewProps {
  service: MyService;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
}

export function ServiceDetailView({
  service,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
}: ServiceDetailViewProps) {
  const statusInfo = statusConfig[service.status];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge className={statusInfo.color}>
              <span className="mr-1">{statusInfo.icon}</span>
              {statusInfo.label}
            </Badge>
            {service.upgrades.length > 0 && (
              <div className="flex gap-1">
                {service.upgrades.map((upgrade) => (
                  <Badge
                    key={upgrade}
                    variant="secondary"
                    className="text-xs bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                  >
                    {upgrade.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {service.serviceName}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(service.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatDate(service.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={onDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="border-[#F45A0B] text-[#F45A0B] hover:bg-[#F45A0B]/10"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Alert for Pending or Declined */}
      {service.status === "pending" && (
        <Alert className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            Your service is currently under review. This usually takes 24-48
            hours. You'll be notified once it's approved.
          </AlertDescription>
        </Alert>
      )}

      {service.status === "declined" && (
        <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            Your service was declined. Please review our guidelines and make
            necessary changes before resubmitting.
          </AlertDescription>
        </Alert>
      )}

      {service.status === "draft" && (
        <Alert className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10">
          <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <AlertDescription className="text-gray-800 dark:text-gray-200">
            This service is saved as a draft. Complete and submit it to make it
            visible to clients.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thumbnail */}
          {service.thumbnail && (
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="relative h-96 w-full overflow-hidden rounded-lg">
                  <Image
                    src={service.thumbnail}
                    alt={service.serviceName}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B]">
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {service.description}
              </p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Upgrades */}
          {service.upgrades.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Service Upgrades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {service.upgrades.map((upgrade) => (
                    <div
                      key={upgrade}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F45A0B]/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white uppercase">
                          {upgrade}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getUpgradeDescription(upgrade)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B]">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Views
                  </span>
                </div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {service.views}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Inquiries
                  </span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {service.inquiries}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Project Type
                </p>
                <Badge variant="outline" className="text-sm capitalize">
                  {service.projectType === "fixed"
                    ? "Fixed Price"
                    : "Hourly Rate"}
                </Badge>
              </div>

              <Separator />

              {service.projectType === "fixed" ? (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Budget Range
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Minimum
                      </span>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(service.budget.min)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Maximum
                      </span>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(service.budget.max)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Hourly Rate
                  </p>
                  <p className="text-3xl font-bold text-[#F45A0B]">
                    {formatCurrency(service.budget.hourlyRate || 0)}
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      /hr
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B]">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant="outline"
                className="text-sm px-3 py-1.5 border-[#F45A0B]/20 text-[#F45A0B]"
              >
                {service.category}
              </Badge>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={onShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Preview as Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper function to get upgrade descriptions
function getUpgradeDescription(upgrade: string): string {
  const descriptions: Record<string, string> = {
    recruiter:
      "Featured by expert recruiters who recommend your service to clients",
    nda: "Non-disclosure Agreement for confidentiality assurance",
    "ip-agreement": "Intellectual Property rights transfer guarantee",
    featured: "Premium placement in Featured Services section",
    urgent: "Priority listing showing immediate availability",
    private: "Exclusive visibility to registered clients only",
    sealed: "Private details until direct client contact",
  };
  return descriptions[upgrade] || "Premium service upgrade";
}
