"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  serviceName?: string;
}

export const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  serviceName = "Service",
}: ImageLightboxProps) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        default:
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious]
  );

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // Don't render if not open
  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Backdrop - Click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close lightbox"
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col">
        {/* Header with close button and counter */}
        <div className="relative z-10 flex items-center justify-between p-4 md:p-6">
          {/* Image Counter */}
          <div className="text-white text-sm md:text-base font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
            tabIndex={0}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Image Display Area */}
        <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 pb-4">
          {/* Previous Button */}
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              aria-label="Previous image"
              tabIndex={0}
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] animate-in zoom-in-95 duration-300">
            <Image
              src={currentImage}
              alt={`${serviceName} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={90}
            />
          </div>

          {/* Next Button */}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              aria-label="Next image"
              tabIndex={0}
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation Hints (Desktop only) */}
        <div className="hidden md:block relative z-10 text-center pb-6">
          <p className="text-white/60 text-sm">
            Use arrow keys to navigate • Press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};
