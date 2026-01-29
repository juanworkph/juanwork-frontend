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
  Timer,
  Shield,
  History,
  ChevronRight,
  FileCheck,
  Layers,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  MyService,
  statusConfig,
  formatDate,
} from "../schema/my-services-data";
import { formatCurrency } from "../schema/discover-services-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailLayout } from "@/features/projects/components/project-detail-layout";
import { ServiceProposalsTab } from "./service-proposals-tab";

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
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
              {statusInfo.label}
            </span>
            <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 uppercase tracking-wider shadow-sm">
              {service.category.name}
            </span>
            {service.upgrades.map((upgrade) => (
              <span
                key={upgrade.id}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider",
                  upgrade.slug === "featured"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    : upgrade.slug === "urgent"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
                )}
              >
                {upgrade.name}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {service.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Created: {formatDate(service.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <History className="h-4 w-4" />
              Updated: {formatDate(service.updatedAt)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={onDuplicate}
            className="flex items-center gap-2 px-4 py-2 border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 sm:h-10"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            onClick={onEdit}
            className="px-6 py-2 border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 h-9 sm:h-10"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            className="px-6 py-2 bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 border-none h-9 sm:h-10"
          >
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
        <Alert className="border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
          <AlertCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <AlertDescription className="text-indigo-600 dark:text-indigo-400">
            This service is saved as a draft. Complete and submit it to make it
            visible to clients.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="line" className="w-full">
          <TabsTrigger value="overview" variant="line">
            Overview
          </TabsTrigger>
          <TabsTrigger value="proposals" variant="line" className="gap-2">
            Proposals{" "}
            <span className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] border border-zinc-200 dark:border-zinc-800">
              {service.proposalsCount}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <TabsContent value="overview" className="mt-0 space-y-8">
              <div className="space-y-8">
                {/* Service Parameters */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Service Parameters
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Timer className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Delivery Time
                      </p>
                      <p className="text-sm font-semibold">
                        {service.deliveryDays} Days
                      </p>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Shield className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Expertise
                      </p>
                      <p className="text-sm font-semibold capitalize">
                        {service.experienceLevel} Level
                      </p>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                      <Layers className="h-5 w-5 text-primary mb-3" />
                      <p className="text-[10px] uppercase text-zinc-400 font-bold mb-1">
                        Category
                      </p>
                      <p className="text-sm font-semibold">
                        {service.category.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Description */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Service Description
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                    {service.description}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Promoted Features */}
                {service.upgrades.length > 0 && (
                  <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                      <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                      Promoted Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.upgrades.map((upgrade) => (
                        <div
                          key={upgrade.id}
                          className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                            {upgrade.slug === "featured" && (
                              <Sparkles className="h-6 w-6 text-amber-500" />
                            )}
                            {upgrade.slug === "urgent" && (
                              <Timer className="h-6 w-6 text-rose-500" />
                            )}
                            {upgrade.slug === "nda" && (
                              <FileCheck className="h-6 w-6 text-blue-500" />
                            )}
                            {!["featured", "urgent", "nda"].includes(
                              upgrade.slug,
                            ) && <Sparkles className="h-6 w-6 text-zinc-400" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1 uppercase tracking-tight">
                              {upgrade.name}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {getUpgradeDescription(upgrade.slug)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>{" "}
                    Attachments
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-primary/50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                          <Layers className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">
                            Technical_Specs.pdf
                          </p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5 font-bold">
                            1.2 MB • PDF
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 group-hover:text-primary"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="proposals" className="mt-6">
              <ServiceProposalsTab />
            </TabsContent>
          </div>

          {/* Right Column - Persistent Sidebar */}
          <div className="space-y-8">
            {/* INSIGHTS */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-[#F45A0B] rounded-full"></span>
                INSIGHTS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Eye className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                        Views
                      </p>
                      <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {service.views.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                        Proposals
                      </p>
                      <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {service.proposalsCount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <span className="w-1 h-3 bg-[#F45A0B] rounded-full"></span>
                    PRICING
                  </h2>
                </div>

                <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    TYPE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                    {service.paymentType === "fixed"
                      ? "FIXED RATE"
                      : "HOURLY RATE"}
                  </span>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mb-6 text-center">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2">
                    EST. INVESTMENT
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">
                      {formatCurrency(service.budgetMin, service.currency)}
                    </span>
                    <span className="text-xs text-zinc-400 uppercase font-medium">
                      TO
                    </span>
                    <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">
                      {formatCurrency(service.budgetMax, service.currency)}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-xs group">
                  Manage Price{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
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
