"use client";

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react"
import {
  SingleViewHeader,
  SingleViewInfoPanel,
  SingleViewClientCard,
  SingleViewBiddingForm,
  SingleViewSimilarProjects,
} from "@/features/projects/components"
import { getProjectDetailsById, getExistingBid } from "@/features/projects/schema"
import type { BidFormData, Bid } from "@/features/projects/schema"
import type { ProjectDetails } from "@/features/projects/schema"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

// Skeleton loader component that maintains layout structure
const ProjectDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Header Skeleton */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-6 sm:h-8 w-3/4" />
                <div className="flex gap-1.5 sm:gap-2">
                  <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
                  <Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Info Panel Skeleton */}
          <Card>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-3/4" />
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Skeleton className="h-16 sm:h-20 w-full" />
                <Skeleton className="h-16 sm:h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Client Card Skeleton */}
          <Card>
            <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                <div className="space-y-1.5 sm:space-y-2 flex-1">
                  <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                  <Skeleton className="h-2.5 sm:h-3 w-20 sm:w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bidding Form Skeleton */}
          <Card>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Skeleton className="h-9 sm:h-10 w-full" />
              <Skeleton className="h-9 sm:h-10 w-full" />
              <Skeleton className="h-24 sm:h-32 w-full" />
              <Skeleton className="h-9 sm:h-10 w-full" />
            </CardContent>
          </Card>

          {/* Similar Projects Skeleton */}
          <Card>
            <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
              <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
              <Skeleton className="h-16 sm:h-20 w-full" />
              <Skeleton className="h-16 sm:h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Error component for 404 and network errors
const ProjectDetailsError = ({
  error,
  onRetry,
  onBackToFindWork,
}: {
  error: "not-found" | "network"
  onRetry?: () => void
  onBackToFindWork: () => void
}) => {
  const isNotFound = error === "not-found"

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
      <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] space-y-4 sm:space-y-6 px-4">
        <Alert variant="destructive" className="max-w-2xl w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">{isNotFound ? "Project Not Found" : "Network Error"}</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            {isNotFound
              ? "The project you're looking for doesn't exist or may have been removed."
              : "Unable to load project details. Please check your connection and try again."}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={onBackToFindWork} className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="ml-2">Back to Find Work</span>
          </Button>
          {!isNotFound && onRetry && (
            <Button onClick={onRetry} className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">Retry</Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Error boundary wrapper component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<"not-found" | "network" | null>(null)
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [existingBid, setExistingBid] = useState<Bid | undefined>(undefined)

  // Fetch project data
  const fetchProjectData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate network delay for realistic loading state
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get comprehensive mock data using the new data fetching function
      const projectData = getProjectDetailsById(unwrappedParams.projectId)

      if (!projectData) {
        setError("not-found")
        setProject(null)
        setExistingBid(undefined)
      } else {
        setProject(projectData)
        // Check if user has already submitted a bid for this project
        const bid = getExistingBid(unwrappedParams.projectId)
        setExistingBid(bid)
      }
    } catch (err) {
      console.error("Error fetching project:", err)
      setError("network")
      setProject(null)
      setExistingBid(undefined)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on mount and when projectId changes
  useEffect(() => {
    fetchProjectData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unwrappedParams.projectId])

  // Handle bid submission
  const handleBidSubmit = async (bidData: BidFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Bid submitted:", bidData)
      // In a real app, this would make an API call
    } catch (err) {
      console.error("Error submitting bid:", err)
      throw err
    }
  }

  // Handle navigation back to find work
  const handleBackToFindWork = () => {
    router.push("/freelancer/findwork")
  }

  // Handle retry for network errors
  const handleRetry = () => {
    fetchProjectData()
  }

  // Show loading state
  if (isLoading) {
    return <ProjectDetailsSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <ProjectDetailsError
        error={error}
        onRetry={error === "network" ? handleRetry : undefined}
        onBackToFindWork={handleBackToFindWork}
      />
    )
  }

  // This should not happen due to error handling above, but TypeScript needs it
  if (!project) {
    return (
      <ProjectDetailsError error="not-found" onBackToFindWork={handleBackToFindWork} />
    )
  }

  // Render main content with error boundary
  return (
    <ErrorBoundary
      fallback={
        <ProjectDetailsError error="network" onBackToFindWork={handleBackToFindWork} />
      }
    >
      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl">
          {/* Back Button */}
          <div className="mb-2 sm:mb-3">
            <Button
              variant="ghost"
              onClick={handleBackToFindWork}
              className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white -ml-2 h-8 sm:h-9 text-xs sm:text-sm"
              aria-label="Go back to find work"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              {/* Home */}
              <li className="flex items-center">
                <Link
                  href="/"
                  className="flex items-center gap-1 sm:gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Go to home page"
                >
                  <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </li>

              {/* Separator */}
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
              </li>

              {/* Find Work */}
              <li className="flex items-center">
                <Link
                  href="/freelancer/findwork"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Go to find work page"
                >
                  <span className="hidden sm:inline">Find Work</span>
                  <span className="sm:hidden">Projects</span>
                </Link>
              </li>

              {/* Separator */}
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
              </li>

              {/* Category */}
              <li className="flex items-center">
                <Link
                  href={`/freelancer/findwork?category=${encodeURIComponent(project.category)}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors max-w-[100px] sm:max-w-[150px] truncate"
                  aria-label={`Go to ${project.category} category`}
                >
                  {project.category}
                </Link>
              </li>

              {/* Separator */}
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-600" />
              </li>

              {/* Current Project */}
              <li className="flex items-center">
                <span
                  className="text-gray-900 dark:text-white font-medium max-w-[150px] sm:max-w-[250px] md:max-w-[350px] truncate"
                  aria-current="page"
                >
                  {project.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <SingleViewHeader project={project} />
            <SingleViewInfoPanel project={project} />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-4 sm:space-y-6">
            {project.clientDetails && (
              <SingleViewClientCard client={project.clientDetails} />
            )}
            <SingleViewBiddingForm 
              project={project} 
              existingBid={existingBid}
              onSubmit={handleBidSubmit} 
            />
            <SingleViewSimilarProjects
              currentProjectId={project.id}
              category={project.category}
              skills={project.skills}
              maxProjects={5}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
