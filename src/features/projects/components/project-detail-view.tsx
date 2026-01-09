import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  TrendingUp,
  Users,
  FileCheck,
  XCircle,
  CheckCircle2,
  Layers,
} from "lucide-react";
import {
  MyProject,
  projectStatusConfig,
  formatDate,
  formatCurrency,
  getDeliveryDaysLabel,
  getExperienceLevelLabel,
  getBudgetDisplay,
} from "../schema/my-projects-data";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProjectDetailViewProps {
  project: MyProject;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
}

export function ProjectDetailView({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
}: ProjectDetailViewProps) {
  const statusInfo = projectStatusConfig[project.status];

  const budgetDisplay = getBudgetDisplay(project);

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
            <Badge variant="secondary" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              {project.category.name}
            </Badge>
            {project.upgrades.length > 0 && (
              <div className="flex gap-1">
                {project.upgrades.map((upgrade) => (
                  <Badge
                    key={upgrade.id}
                    variant="secondary"
                    className="text-xs bg-[#F45A0B]/10 text-[#F45A0B] border-[#F45A0B]/20"
                  >
                    {upgrade.name.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatDate(project.updatedAt)}</span>
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

      {/* Status Alerts */}
      {project.status === "active" && (
        <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Your project is active and receiving bids from freelancers.
            Review bids and hire the best talent for your project.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "completed" && (
        <Alert className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
          <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <AlertDescription className="text-purple-800 dark:text-purple-200">
            This project has been completed successfully! Don't forget to leave
            a review for the freelancer(s) you worked with.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "cancelled" && (
        <Alert className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10">
          <XCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <AlertDescription className="text-gray-800 dark:text-gray-200">
            This project has been cancelled. It is no longer accepting bids
            from freelancers.
          </AlertDescription>
        </Alert>
      )}

      {project.status === "draft" && (
        <Alert className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            This project is saved as a draft. Complete and publish it to start
            receiving bids from freelancers.
          </AlertDescription>
        </Alert>
      )}

      {project.biddersCount > 0 && (
        <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <span className="font-semibold">
              {project.biddersCount} freelancer
              {project.biddersCount > 1 ? "s" : ""}
            </span>{" "}
            have bid on this project. Review bids and hire the best talent.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bids">
            Bids ({project.biddersCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B]">
                    Project Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Required Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Project Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Delivery Days
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {getDeliveryDaysLabel(project.deliveryDays)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Experience Level
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {getExperienceLevelLabel(project.experienceLevel)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Payment Type
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">
                        {project.paymentType === "fixed"
                          ? "Fixed Price"
                          : "Hourly Rate"}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Category
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {project.category.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Upgrades */}
              {project.upgrades.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Project Upgrades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.upgrades.map((upgrade) => (
                        <div
                          key={upgrade.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#F45A0B]/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-5 w-5 text-[#F45A0B]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white uppercase">
                              {upgrade.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {getUpgradeDescription(upgrade.slug)}
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
                  <CardTitle className="text-[#F45A0B]">
                    Project Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Bids
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {project.biddersCount}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Payment Type
                    </p>
                    <Badge variant="outline" className="text-sm capitalize">
                      {project.paymentType === "fixed"
                        ? "Fixed Price"
                        : "Hourly Rate"}
                    </Badge>
                  </div>

                  <Separator />

                  {project.paymentType === "fixed" ? (
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
                            {formatCurrency(project.budgetMin, project.currency)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Maximum
                          </span>
                          <span className="font-semibold text-lg text-gray-900 dark:text-white">
                            {formatCurrency(project.budgetMax, project.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
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
                            {formatCurrency(project.budgetMin, project.currency)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Maximum
                          </span>
                          <span className="font-semibold text-lg text-gray-900 dark:text-white">
                            {formatCurrency(project.budgetMax, project.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Project Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B] flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Delivery Days
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {getDeliveryDaysLabel(project.deliveryDays)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Experience Required
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {getExperienceLevelLabel(project.experienceLevel)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#F45A0B]">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={onShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview as Freelancer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#F45A0B]">
                Bids Received ({project.biddersCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.biddersCount === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4 w-fit mx-auto">
                    <MessageCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No bids yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Freelancers will start submitting bids soon. You'll be
                    notified when you receive new bids.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                      You have {project.biddersCount} bid
                      {project.biddersCount > 1 ? "s" : ""} for this project.
                      Review each bid carefully and hire the best
                      freelancer(s) for your needs. You can view detailed
                      bids in the{" "}
                      <span className="font-semibold">Bids</span> section.
                    </AlertDescription>
                  </Alert>
                  <div className="flex justify-center pt-4">
                    <Button
                      className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      View All Bids
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to get upgrade descriptions
function getUpgradeDescription(upgrade: string): string {
  const descriptions: Record<string, string> = {
    featured:
      "Premium placement in Featured Projects section for maximum visibility",
    urgent: "Priority listing showing immediate hiring need",
    nda: "Non-disclosure Agreement requirement for confidentiality",
    sealed: "Private budget details until freelancer selection",
    "ip-agreement": "Intellectual Property rights transfer included",
  };
  return descriptions[upgrade] || "Premium project upgrade";
}
