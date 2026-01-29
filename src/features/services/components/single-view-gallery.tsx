import { memo } from "react";
import Image from "next/image";
import { Maximize2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleViewGalleryProps {
  thumbnail: string;
  gallery?: string[];
  serviceName: string;
  onImageClick: (index: number) => void;
  className?: string;
}

export const SingleViewGallery = memo(
  ({
    thumbnail,
    gallery = [],
    serviceName,
    onImageClick,
    className,
  }: SingleViewGalleryProps) => {
    // Combine thumbnail with gallery images for unified display
    const allImages = [thumbnail, ...(gallery || [])].filter(Boolean);
    const displayGallery = gallery?.slice(0, 3) || [];
    const remainingCount = (gallery?.length || 0) - 3;

    return (
      <div className={cn("space-y-4", className)}>
        {/* Main Thumbnail Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <button
            onClick={() => onImageClick(0)}
            className="relative w-full h-full group cursor-pointer"
            aria-label={`View full size image of ${serviceName}`}
          >
            <Image
              src={thumbnail}
              alt={`${serviceName} - Main image`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
              priority
            />

            {/* Enhanced Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
                  <Maximize2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Badge indicator */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm pointer-events-none">
              Featured Image
            </div>
          </button>
        </div>

        {/* Gallery Grid - More premium thumbnails layout */}
        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {displayGallery.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageClick(index + 1)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 group cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700/50 shadow-sm transition-all duration-300 hover:shadow-md"
                aria-label={`View gallery image ${index + 1} of ${serviceName}`}
              >
                <Image
                  src={image}
                  alt={`${serviceName} - Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 15vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Remainder / View All Button if more than 3 gallery images */}
            {remainingCount > 0 ? (
              <button
                onClick={() => onImageClick(4)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900 group cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700/50 shadow-sm"
              >
                <Image
                  src={gallery[3]}
                  alt="More images"
                  fill
                  className="object-cover opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                  <span className="text-lg font-bold">+{remainingCount}</span>
                  <span className="text-[10px] uppercase tracking-wider font-medium opacity-80">
                    View More
                  </span>
                </div>
              </button>
            ) : gallery.length === 4 ? (
              <button
                onClick={() => onImageClick(4)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 group cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700/50 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <Image
                  src={gallery[3]}
                  alt={`${serviceName} - Gallery image 4`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 15vw"
                  loading="lazy"
                />
              </button>
            ) : null}
          </div>
        )}
      </div>
    );
  },
);

SingleViewGallery.displayName = "SingleViewGallery";
