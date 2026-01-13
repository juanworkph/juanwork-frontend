"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, ImageIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  type: "thumbnail" | "gallery";
  maxUrls?: number;
  value: string | string[];
  onChange: (urls: string | string[]) => void;
  error?: string;
  placeholder?: string;
  label?: string;
}

// Image preview component with loading and error states
const ImagePreview: React.FC<{
  url: string;
  onRemove?: () => void;
  showRemove?: boolean;
}> = ({ url, onRemove, showRemove = true }) => {
  const [imageState, setImageState] = useState<"loading" | "success" | "error">("loading");

  return (
    <Card className="relative overflow-hidden p-0 border w-full">
      <div className="relative aspect-video w-full bg-muted">
        {imageState === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-6 sm:size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {imageState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="size-6 sm:size-8 text-muted-foreground" />
            <p className="text-xs text-center text-muted-foreground">
              Failed to load image
            </p>
          </div>
        )}

        {imageState !== "error" && (
          <Image
            src={url}
            alt="Preview"
            fill
            className={cn(
              "object-cover transition-opacity",
              imageState === "loading" ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setImageState("success")}
            onError={() => setImageState("error")}
            unoptimized // Since we're using external URLs
          />
        )}

        {showRemove && onRemove && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 size-8 shadow-lg z-10"
            onClick={onRemove}
            aria-label="Remove image"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* URL display */}
      <div className="p-2 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground truncate" title={url}>
          {url}
        </p>
      </div>
    </Card>
  );
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  type,
  maxUrls = 5,
  value,
  onChange,
  error,
  placeholder = "Enter image URL (e.g., https://example.com/image.jpg)",
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Placeholder image suggestions
  const placeholderSuggestions = [
    {
      category: "Web Development",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      description: "Laptop with code",
    },
    {
      category: "Mobile App",
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      description: "Mobile phone mockup",
    },
    {
      category: "UI/UX Design",
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Design workspace",
    },
    {
      category: "E-commerce",
      url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      description: "Shopping cart",
    },
    {
      category: "API Development",
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      description: "Code on screen",
    },
    {
      category: "DevOps",
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
      description: "Server infrastructure",
    },
  ];

  // Normalize value to always work with arrays internally
  const urls = Array.isArray(value) ? value : value ? [value] : [];

  // URL validation function
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    
    try {
      const urlObj = new URL(url);
      // Check if it's http or https and has a valid image extension
      return (
        (urlObj.protocol === "http:" || urlObj.protocol === "https:") &&
        /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(urlObj.pathname)
      );
    } catch {
      return false;
    }
  };

  // Handle adding a URL
  const handleAddUrl = () => {
    const trimmedUrl = inputValue.trim();
    
    if (!trimmedUrl) {
      setValidationError("Please enter a URL");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setValidationError(
        "Please enter a valid image URL (must end with .jpg, .jpeg, .png, .gif, .webp, or .svg)"
      );
      return;
    }

    if (urls.includes(trimmedUrl)) {
      setValidationError("This URL has already been added");
      return;
    }

    if (type === "gallery" && urls.length >= maxUrls) {
      setValidationError(`Maximum ${maxUrls} images allowed`);
      return;
    }

    // Clear validation error
    setValidationError("");
    setInputValue("");

    // Update parent component
    if (type === "thumbnail") {
      onChange(trimmedUrl);
    } else {
      onChange([...urls, trimmedUrl]);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUrl();
    }
  };

  // Handle using a placeholder suggestion
  const handleUsePlaceholder = (url: string) => {
    setInputValue(url);
    setValidationError("");
    setShowSuggestions(false);
    
    // For thumbnail, automatically add it
    if (type === "thumbnail") {
      onChange(url);
      setInputValue("");
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}

      {/* URL Input Section */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="url"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={`Enter ${type} image URL`}
            aria-invalid={!!(validationError || error)}
            className="flex-1"
          />
          {type === "gallery" && (
            <Button
              type="button"
              onClick={handleAddUrl}
              disabled={!inputValue.trim() || urls.length >= maxUrls}
              size="default"
              aria-label="Add image URL"
            >
              <Plus className="size-4" />
              Add
            </Button>
          )}
        </div>

        {/* Validation Error */}
        {(validationError || error) && (
          <p className="text-sm text-destructive" role="alert">
            {validationError || error}
          </p>
        )}

        {/* Gallery URL count */}
        {type === "gallery" && urls.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {urls.length} / {maxUrls} images added
          </p>
        )}
      </div>

      {/* Image Previews Section */}
      {urls.length > 0 && (
        <div className="space-y-3">
          {type === "thumbnail" ? (
            // Single thumbnail preview - constrained width with responsive sizing
            <div className="w-full max-w-sm mx-auto">
              <ImagePreview
                url={urls[0]}
                onRemove={() => onChange("")}
                showRemove={true}
              />
            </div>
          ) : (
            // Gallery grid preview
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {urls.map((url, index) => (
                <ImagePreview
                  key={`${url}-${index}`}
                  url={url}
                  onRemove={() => {
                    const newUrls = urls.filter((_, i) => i !== index);
                    onChange(newUrls);
                  }}
                  showRemove={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Placeholder Suggestions Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Need a placeholder image?
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            aria-label="Toggle placeholder suggestions"
          >
            {showSuggestions ? "Hide" : "Show"} Suggestions
          </Button>
        </div>

        {showSuggestions && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/30">
            {placeholderSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleUsePlaceholder(suggestion.url)}
                className="group relative overflow-hidden rounded-lg border bg-background hover:border-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Use ${suggestion.category} placeholder`}
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={suggestion.url}
                    alt={suggestion.description}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      Use This
                    </span>
                  </div>
                </div>
                <div className="p-2 border-t">
                  <p className="text-xs font-medium truncate">{suggestion.category}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {suggestion.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
