"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  ExternalLink,
  Github,
  FileText,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  PortfolioProject,
  statusConfig,
  formatDate,
  formatCurrency,
} from "../schema/portfolio-data";

interface PortfolioProjectDetailProps {
  project: PortfolioProject;
  onEdit: () => void;
  onDelete: () => void;
  onFeatureToggle: () => void;
  onBack: () => void;
}

export const PortfolioProjectDetail: React.FC<
  PortfolioProjectDetailProps
> = ({ project, onEdit, onDelete, onFeatureToggle, onBack }) => {
  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine thumbnail and gallery images for lightbox
  const allImages = [project.images.thumbnail, ...project.images.gallery];

  const handleOpenLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Detail Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Badge className={statusConfig[project.status].color}>
              {statusConfig[project.status].icon}{" "}
              {statusConfig[project.status].label}
            </Badge>
            {project.featured && (
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onFeatureToggle}
            className="gap-2"
          >
            <Star
              className={`h-4 w-4 ${project.featured ? "fill-current" : ""}`}
            />
            {project.featured ? "Unfeature" : "Feature"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Separator />

      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative w-full h-[400px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => handleOpenLightbox(0)}
        >
          <Image
            src={project.images.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full p-3">
                <ExternalLink className="h-6 w-6 text-gray-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {project.images.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.images.gallery.map((image, index) => (
              <div
                key={index}
                className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleOpenLightbox(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full p-12">
              <Image
                src={allImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <p className="text-white text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About This Project */}
          <Card>
            <CardHeader>
              <CardTitle>About This Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Technologies & Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technologies & Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.technologies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {project.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {project.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Details */}
          {(project.projectDetails.challenge ||
            project.projectDetails.solution ||
            project.projectDetails.results.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {project.projectDetails.challenge && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-orange-500" />
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Challenge
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {project.projectDetails.challenge}
                    </p>
                  </div>
                )}

                {project.projectDetails.solution && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Solution
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {project.projectDetails.solution}
                    </p>
                  </div>
                )}

                {project.projectDetails.results.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Results
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {project.projectDetails.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Project Links */}
          {(project.links.live ||
            project.links.github ||
            project.links.demo ||
            project.links.casestudy) && (
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.links.live && (
                    <Button
                      variant="outline"
                      className="gap-2 justify-start"
                      asChild
                    >
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Project
                      </a>
                    </Button>
                  )}

                  {project.links.github && (
                    <Button
                      variant="outline"
                      className="gap-2 justify-start"
                      asChild
                    >
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    </Button>
                  )}

                  {project.links.demo && (
                    <Button
                      variant="outline"
                      className="gap-2 justify-start"
                      asChild
                    >
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}

                  {project.links.casestudy && (
                    <Button
                      variant="outline"
                      className="gap-2 justify-start"
                      asChild
                    >
                      <a
                        href={project.links.casestudy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Case Study
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Right Column (1/3) */}
        <div className="space-y-6">
          {/* Client Information */}
          {(project.client.name ||
            project.client.industry ||
            project.client.location ||
            project.client.testimonial) && (
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.client.name && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Client
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {project.client.name}
                      </p>
                    </div>
                  </div>
                )}

                {project.client.industry && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Industry
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {project.client.industry}
                      </p>
                    </div>
                  </div>
                )}

                {project.client.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {project.client.location}
                      </p>
                    </div>
                  </div>
                )}

                {project.client.testimonial && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Client Testimonial
                      </p>
                      {renderStars(project.client.testimonial.rating)}
                    </div>
                    <blockquote className="text-sm text-gray-700 dark:text-gray-300 italic border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                      "{project.client.testimonial.text}"
                    </blockquote>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Start Date
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatDate(project.timeline.startDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    End Date
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {project.timeline.endDate
                      ? formatDate(project.timeline.endDate)
                      : "Ongoing"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Duration
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {project.timeline.duration}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Metrics */}
          {(project.metrics.budget ||
            project.metrics.teamSize ||
            project.metrics.deliveryTime) && (
            <Card>
              <CardHeader>
                <CardTitle>Project Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.metrics.budget > 0 && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Budget
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(project.metrics.budget)}
                      </p>
                    </div>
                  </div>
                )}

                {project.metrics.teamSize > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Team Size
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {project.metrics.teamSize}{" "}
                        {project.metrics.teamSize === 1 ? "person" : "people"}
                      </p>
                    </div>
                  </div>
                )}

                {project.metrics.deliveryTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery Time
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {project.metrics.deliveryTime}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
