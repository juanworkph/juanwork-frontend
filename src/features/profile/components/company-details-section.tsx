import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Calendar,
  Globe,
  Edit,
  ExternalLink,
} from "lucide-react";
import { CompanyDetails } from "../schema";

interface CompanyDetailsSectionProps {
  companyDetails: CompanyDetails;
  isOwnProfile?: boolean;
}

export function CompanyDetailsSection({
  companyDetails,
  isOwnProfile = false,
}: CompanyDetailsSectionProps) {
  return (
    <Card className="shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Company Details
            </CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company Logo and Name */}
        <div className="flex items-center gap-4">
          {companyDetails.logo ? (
            <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src={companyDetails.logo}
                alt={companyDetails.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {companyDetails.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {companyDetails.industry}
            </p>
          </div>
        </div>

        {/* Company Description */}
        <div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            {companyDetails.description}
          </p>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Size */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Users className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Company Size
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {companyDetails.size}
              </p>
            </div>
          </div>

          {/* Founded Year */}
          {companyDetails.founded && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Founded
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {companyDetails.founded}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Website Link */}
        {companyDetails.website && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(companyDetails.website, "_blank")}
            >
              <Globe className="h-4 w-4" />
              Visit Company Website
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
