"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SingleViewHeaderProps {
  projectName: string
  category: string
  projectId: string
}

export const SingleViewHeader = ({
  projectName,
  category,
}: SingleViewHeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.push("/freelancer/findwork")
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* Back Button */}
        <div className="mb-2 sm:mb-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white -ml-2 h-8 sm:h-9 text-xs sm:text-sm"
            aria-label="Go back to find work"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb navigation" className="flex items-center flex-wrap">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm" role="list">
            {/* Home */}
            <li className="flex items-center" role="listitem">
              <Link
                href="/"
                className="flex items-center gap-1 sm:gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Navigate to home page"
              >
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true" role="presentation">
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Find Work */}
            <li className="flex items-center" role="listitem">
              <Link
                href="/freelancer/findwork"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Navigate to find work page"
              >
                <span className="hidden sm:inline">Find Work</span>
                <span className="sm:hidden">Projects</span>
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true" role="presentation">
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Category */}
            <li className="flex items-center" role="listitem">
              <Link
                href={`/freelancer/findwork?category=${encodeURIComponent(category)}`}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors max-w-[100px] sm:max-w-[150px] truncate"
                aria-label={`Navigate to ${category} category`}
                title={category}
              >
                {category}
              </Link>
            </li>

            {/* Separator */}
            <li aria-hidden="true" role="presentation">
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
            </li>

            {/* Current Project */}
            <li className="flex items-center" role="listitem">
              <span
                className="text-gray-900 dark:text-white font-medium max-w-[150px] sm:max-w-[250px] md:max-w-[350px] truncate"
                aria-current="page"
                title={projectName}
              >
                {projectName}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
