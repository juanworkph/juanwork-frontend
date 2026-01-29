import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleViewLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  serviceName?: string;
  onSelectIndex?: (index: number) => void;
}

export const SingleViewLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  serviceName = "Service",
  onSelectIndex,
}: SingleViewLightboxProps) => {
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
    [isOpen, onClose, onNext, onPrevious],
  );

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md animate-in fade-in duration-300 flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 md:p-6 relative z-20">
        <div className="flex flex-col">
          <h3 className="text-white font-medium text-lg leading-tight truncate max-w-[200px] md:max-w-md">
            {serviceName}
          </h3>
          <p className="text-zinc-500 text-xs mt-0.5">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10 shadow-xl"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-20 overflow-hidden">
        {/* Navigation Buttons - Large & Glassmorphic */}
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={cn(
            "absolute left-4 md:left-8 z-30 p-4 rounded-full bg-white/5 disabled:opacity-0 disabled:pointer-events-none hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-md shadow-2xl",
            !hasPrevious && "opacity-0",
          )}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "absolute right-4 md:right-8 z-30 p-4 rounded-full bg-white/5 disabled:opacity-0 disabled:pointer-events-none hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-md shadow-2xl",
            !hasNext && "opacity-0",
          )}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Image */}
        <div className="relative w-full h-full max-w-7xl max-h-[75vh] animate-in zoom-in-95 duration-500 ease-out">
          <Image
            src={images[currentIndex]}
            alt={`${serviceName} - View ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Bottom Thumbnail Navigation */}
      <div className="p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-4xl mx-auto flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex?.(idx)}
              className={cn(
                "relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 ring-2",
                currentIndex === idx
                  ? "ring-orange-500 scale-110 z-10 opacity-100 shadow-[0_0_20px_rgba(244,90,11,0.3)]"
                  : "ring-white/5 opacity-40 hover:opacity-100 ring-transparent",
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
        <p className="text-zinc-600 text-[10px] text-center mt-4 tracking-widest uppercase font-semibold">
          Photography Portfolio • JuanWork Premium
        </p>
      </div>
    </div>
  );
};
