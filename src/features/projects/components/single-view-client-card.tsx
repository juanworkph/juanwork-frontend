"use client"

import React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CheckCircle,
  Star,
  MapPin,
  Briefcase,
  UserCheck,
  Clock,
  CreditCard,
} from "lucide-react"
import { ExtendedClientInfo } from "../schema/projects-data"
import { formatTimeAgo } from "@/features/findwork/schema/findwork-data"

interface SingleViewClientCardProps {
  client: ExtendedClientInfo
}

const SingleViewClientCard: React.FC<SingleViewClientCardProps> = ({
  client,
}) => {
  // Format member since date
  const formatMemberSince = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  // Render star rating
  const renderStarRating = () => {
    const rating = client.rating || 0
    const reviewCount = client.reviewCount || 0

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
        {reviewCount > 0 && (
          <span className="text-sm text-muted-foreground">
            ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
          </span>
        )}
      </div>
    )
  }

  // Get country flag emoji from country code
  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">About the Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        {/* Client Avatar and Name */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-full border">
            {client.avatar ? (
              <Image
                src={client.avatar}
                alt={client.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 48px, 64px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <UserCheck className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{client.name}</h3>
              {client.verified && (
                <CheckCircle
                  className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0"
                  aria-label="Verified client"
                />
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="mr-0.5 sm:mr-1">{getCountryFlag(client.countryCode)}</span>
              <span className="truncate">{client.country}</span>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div>{renderStarRating()}</div>

        {/* Client Statistics - Condensed on mobile */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Total Projects</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {client.totalProjects || 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <UserCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Total Hires</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {client.totalHires}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Response Time</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {client.responseTime || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Response Rate</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {client.responseRate}%
            </span>
          </div>
        </div>

        {/* Last Active and Member Since */}
        <div className="space-y-1.5 sm:space-y-2 border-t pt-3 sm:pt-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Last Active</span>
            <span className="font-medium text-foreground">
              {client.lastActive
                ? formatTimeAgo(client.lastActive)
                : "Unknown"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Member Since</span>
            <span className="font-medium text-foreground">
              {formatMemberSince(client.memberSince)}
            </span>
          </div>
        </div>

        {/* Payment Verification Status */}
        {client.paymentVerified && (
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-green-200 bg-green-50 p-2.5 sm:p-3 dark:border-green-900/30 dark:bg-green-900/10">
            <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400">
              Payment Verified
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SingleViewClientCard
