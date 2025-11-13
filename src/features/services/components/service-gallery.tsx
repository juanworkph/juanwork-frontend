"use client";

import React, { memo } from "react";
import Image from "next/image";

interface ServiceGalleryProps {
  thumbnail: string;
  gallery?: string[];
  serviceName: string;
  onImageClick: (index: number) => void;
}

export const ServiceGallery = memo(({
  thumbnail,
  gallery = [],
  serviceName,
  onImageClick,
}: ServiceGalleryProps) => {
  // Combine thumbnail with gallery images for unified display
  const allImages = [thumbnail, ...gallery];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Main Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        <button
          onClick={() => onImageClick(0)}
          className="relative w-full h-full group cursor-pointer"
          aria-label={`View full size image of ${serviceName}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onImageClick(0);
            }
          }}
        >
          <Image
            src={thumbnail}
            alt={`${serviceName} - Main image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
            priority
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-12 h-12 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Gallery Grid - Only show if there are additional images */}
      {gallery.length > 0 && (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageClick(index + 1)}
                className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 group cursor-pointer"
                aria-label={`View gallery image ${index + 1} of ${serviceName}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onImageClick(index + 1);
                  }
                }}
              >
                <Image
                  src={image}
                  alt={`${serviceName} - Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 15vw"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-8 h-8 text-white drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Image count indicator */}
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {allImages.length} {allImages.length === 1 ? "image" : "images"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

ServiceGallery.displayName = "ServiceGallery";
