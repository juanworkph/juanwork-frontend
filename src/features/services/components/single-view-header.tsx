"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SingleViewHeaderProps {
  serviceName: string;
  category: string;
}

export const SingleViewHeader = ({
  serviceName,
  category,
}: SingleViewHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* Back Button - Mobile and Desktop */}
        <div className="mb-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white -ml-2"
            aria-label="Go back to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap">
          <ol className="flex items-center gap-2 text-sm">
            {/* Home */}
            <li className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Go to home page"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Discover Services */}
            <li className="flex items-center">
              <Link
                href="/client/hire-talent/discover-services"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Go to discover services page"
              >
                <span className="hidden sm:inline">Discover Services</span>
                <span className="sm:hidden">Services</span>
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Category */}
            <li className="flex items-center">
              <Link
                href={`/client/hire-talent/discover-services?category=${encodeURIComponent(category)}`}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors max-w-[150px] sm:max-w-none truncate"
                aria-label={`Go to ${category} category`}
              >
                {category}
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Current Service */}
            <li className="flex items-center">
              <span
                className="text-gray-900 dark:text-white font-medium max-w-[200px] sm:max-w-[300px] md:max-w-[400px] truncate"
                aria-current="page"
              >
                {serviceName}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
