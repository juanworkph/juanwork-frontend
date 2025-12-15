import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  MapPin,
  CheckCircle,
  Building2,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Award,
  Send,
} from "lucide-react";
import {
  Review,
  formatDate,
  getRatingColor,
  getRatingBgColor,
} from "../schema";

interface ReviewCardProps {
  review: Review;
  onRespond?: (reviewId: string, message: string) => void;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewCard({ review, onRespond, onHelpful }: ReviewCardProps) {
  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmitResponse = () => {
    if (responseMessage.trim() && onRespond) {
      onRespond(review.id, responseMessage);
      setResponseMessage("");
      setIsResponding(false);
    }
  };

  const averageRating = review.ratings.overall;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        {/* Header with Client Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <Image
                src={
                  review.client.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt={review.client.name}
                width={56}
                height={56}
                className="rounded-full border-2 border-white dark:border-gray-700 shadow-md"
              />
              {review.client.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {review.client.name}
                </h3>
                {review.isFeatured && (
                  <Badge
                    variant="outline"
                    className="border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  >
                    <Award className="h-3 w-3 mr-1 fill-yellow-500" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                {review.client.company && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{review.client.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{review.client.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Rating Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${getRatingBgColor(
              averageRating
            )}`}
          >
            <Star className={`h-5 w-5 fill-yellow-500 text-yellow-500`} />
            <span
              className={`text-lg font-bold ${getRatingColor(averageRating)}`}
            >
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Project
              </p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                {review.project.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Category
              </p>
              <Badge variant="secondary" className="text-xs">
                {review.project.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Detailed Ratings Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {[
            { label: "Communication", value: review.ratings.communication },
            { label: "Quality", value: review.ratings.quality },
            { label: "Expertise", value: review.ratings.expertise },
            { label: "Professional", value: review.ratings.professionalism },
            { label: "Deadlines", value: review.ratings.deadlines },
            { label: "Overall", value: review.ratings.overall },
          ].map((rating, index) => (
            <div
              key={index}
              className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star
                  className={`h-3.5 w-3.5 fill-yellow-500 text-yellow-500`}
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {rating.value.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {rating.label}
              </p>
            </div>
          ))}
        </div>

        {/* Review Message */}
        <div className="mb-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              "{review.message}"
            </p>
          </div>
        </div>

        {/* Freelancer Response */}
        {review.freelancerResponse && (
          <div className="mb-4 ml-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Your Response
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {formatDate(review.freelancerResponse.respondedAt)}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {review.freelancerResponse.message}
            </p>
          </div>
        )}

        {/* Response Form */}
        {!review.freelancerResponse && isResponding && (
          <div className="mb-4 ml-8">
            <div className="space-y-3">
              <Textarea
                placeholder="Write your response to this review..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsResponding(false);
                    setResponseMessage("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitResponse}
                  disabled={!responseMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-3 w-3 mr-1" />
                  Submit Response
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {review.wasHelpful !== undefined && (
              <button
                onClick={() => onHelpful && onHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{review.wasHelpful} found helpful</span>
              </button>
            )}

            {review.isPublic ? (
              <Badge
                variant="outline"
                className="border-green-300 text-green-700 dark:text-green-400 text-xs"
              >
                Public
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-gray-300 text-gray-700 dark:text-gray-400 text-xs"
              >
                Private
              </Badge>
            )}
          </div>

          {!review.freelancerResponse && !isResponding && onRespond && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
              onClick={() => setIsResponding(true)}
            >
              <MessageSquare className="h-3 w-3" />
              Respond
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
