import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bid, BidStatus } from "../schema/bids-data";
import {
  formatCurrency,
  getTimeLeft,
  getStatusColor,
} from "../schema/bids-data";
import { useAuth } from "@/contexts/auth-context";
import {
  Clock,
  Calendar,
  Users,
  MessageSquare,
  ExternalLink,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Pin,
  FileText,
  Star,
  TrendingDown,
} from "lucide-react";

interface BidCardProps {
  bid: Bid;
  onWithdraw?: (id: string) => void;
  onPin?: (id: string, isPinned: boolean) => void;
  allBids?: Bid[];
}

export function BidCard({ bid, onWithdraw, onPin, allBids }: BidCardProps) {
  const { currentRole } = useAuth();
  const isClient = currentRole === "client";

  // Get status icon based on bid status
  const getStatusIcon = (status: BidStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "withdrawn":
        return <ArrowLeft className="h-4 w-4" />;
      case "expired":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Format bid amount based on bid type
  const formattedAmount =
    bid.bidType === "fixed"
      ? formatCurrency(bid.amount)
      : `${formatCurrency(bid.amount)}/hr`;

  // Format client budget based on budget type
  const formattedBudget =
    bid.project.budget.type === "fixed"
      ? `${formatCurrency(bid.project.budget.min)} - ${formatCurrency(
          bid.project.budget.max
        )}`
      : `${formatCurrency(bid.project.budget.min)} - ${formatCurrency(
          bid.project.budget.max
        )}/hr`;

  // Calculate minimum bid from all bids for this project (client view only)
  const projectBids = allBids?.filter((b) => b.projectId === bid.projectId) || [
    bid,
  ];
  const minBidAmount = Math.min(...projectBids.map((b) => b.amount));
  const formattedMinBid =
    bid.bidType === "fixed"
      ? formatCurrency(minBidAmount)
      : `${formatCurrency(minBidAmount)}/hr`;

  // Calculate time left until deadline
  const timeLeft = bid.expiresAt ? getTimeLeft(bid.expiresAt) : "No deadline";

  // Format bid date
  const bidDate = new Date(bid.bidDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Check if bid can be withdrawn (only pending bids for freelancers)
  const canWithdraw = bid.status === "pending" && onWithdraw && !isClient;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 py-0 border-gray-200 dark:border-gray-700">
      <CardContent className="p-0">
        {/* Bid Header */}
        <div className="flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Badge className={`px-3 py-1.5 ${getStatusColor(bid.status)}`}>
              <span className="flex items-center gap-1.5 text-sm">
                {getStatusIcon(bid.status)}
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
            </Badge>

            {bid.isPinned && (
              <Badge
                variant="outline"
                className="border-amber-300 text-amber-600 dark:text-amber-400 px-3 py-1"
              >
                <Pin className="h-3 w-3 mr-1.5 fill-amber-500" />
                Pinned
              </Badge>
            )}

            {bid.project.featured && (
              <Badge
                variant="outline"
                className="border-blue-300 text-blue-600 dark:text-blue-400 px-3 py-1"
              >
                <Star className="h-3 w-3 mr-1.5 fill-blue-500" />
                Featured
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              {isClient ? `Bid received ${bidDate}` : `Bid on ${bidDate}`}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-medium text-xl">
              <Link
                href={bid.project.projectUrl}
                className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
              >
                {bid.project.title}
              </Link>
            </h3>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2.5 py-1">
                {bid.project.category}
              </Badge>

              {bid.project.experience && (
                <Badge
                  variant="outline"
                  className="text-xs capitalize px-2.5 py-1"
                >
                  {bid.project.experience} level
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
            {bid.project.description}
          </p>

          {/* Freelancer/Company Info */}
          {isClient ? (
            // Client view: Show "Your Company"
            <div className="flex items-center gap-3 mt-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="/images/logo.png"
                alt="Your Company"
                width={40}
                height={40}
                className="rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">Your Company</span>
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span>Project Owner</span>
                </div>
              </div>
            </div>
          ) : (
            // Freelancer view: Show client info
            <div className="flex items-center gap-3 mt-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                <Image
                  src={
                    bid.client.avatar ||
                    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop"
                  }
                  alt={bid.client.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{bid.client.name}</span>
                  {bid.client.verified && (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  {bid.client.rating && (
                    <>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{bid.client.rating}</span>
                      <span className="mx-1.5">•</span>
                    </>
                  )}
                  {bid.client.country && <span>{bid.client.country}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Bid Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {/* My Bid (Freelancer only) */}
            {!isClient && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  My Bid
                </p>
                <p className="text-base font-semibold flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
                  {formattedAmount}
                </p>
              </div>
            )}

            {/* Minimum Bid (Client) or Client Budget (Freelancer) */}
            {isClient ? (
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">
                  Minimum Bid
                </p>
                <p className="text-base font-bold flex items-center gap-1.5 text-green-900 dark:text-green-300">
                  <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                  {formattedMinBid}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Client Budget
                </p>
                <p className="text-base font-semibold">{formattedBudget}</p>
              </div>
            )}

            {/* My Budget (Client) or Bidders (Freelancer) */}
            {isClient ? (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 shadow-sm">
                <p className="text-xs text-purple-700 dark:text-purple-400 mb-1 font-medium">
                  My Budget
                </p>
                <p className="text-base font-bold text-purple-900 dark:text-purple-300">
                  {formattedBudget}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Bidders
                </p>
                <p className="text-base font-semibold flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  {bid.bidderCount}
                </p>
              </div>
            )}

            {/* Total Bidders (Client) or Time Left (Both) */}
            {isClient ? (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 shadow-sm">
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-1 font-medium">
                  Total Bidders
                </p>
                <p className="text-base font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                  <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  {bid.bidderCount}
                </p>
              </div>
            ) : null}

            {/* Time Left (Both Client and Freelancer) */}
            <div
              className={`p-4 rounded-lg border shadow-sm ${
                isClient
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
              }`}
            >
              <p
                className={`text-xs mb-1 font-medium ${
                  isClient
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Time Left
              </p>
              <p
                className={`text-base font-bold flex items-center gap-1.5 ${
                  isClient ? "text-blue-900 dark:text-blue-300" : ""
                }`}
              >
                <Clock
                  className={`h-4 w-4 ${
                    isClient
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-amber-500 dark:text-amber-400"
                  }`}
                />
                {timeLeft}
              </p>
            </div>
          </div>

          {/* Delivery Time */}
          {bid.deliveryTime && (
            <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Delivery:</span>{" "}
                {bid.deliveryTime}
              </span>
            </div>
          )}

          {/* Engagement Status */}
          <div className="flex flex-wrap items-center gap-5 mt-5 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              {bid.clientViewed ? (
                <>
                  <Eye className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {isClient ? "You viewed" : "Viewed by client"}
                    {bid.clientViewedAt &&
                      ` ${new Date(bid.clientViewedAt).toLocaleDateString()}`}
                  </span>
                </>
              ) : (
                <>
                  <EyeOff className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Not viewed yet
                  </span>
                </>
              )}
            </div>

            {bid.clientMessages && bid.clientMessages > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {bid.clientMessages} message
                  {bid.clientMessages > 1 ? "s" : ""} exchanged
                </span>
              </div>
            )}

            {bid.proposedMilestones && bid.proposedMilestones.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {bid.proposedMilestones.length} milestone
                  {bid.proposedMilestones.length > 1 ? "s" : ""} proposed
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex gap-3">
          {onPin && (
            <Button
              variant="outline"
              size="sm"
              className="text-sm px-4 py-2 h-auto"
              onClick={() => onPin(bid.id, !bid.isPinned)}
            >
              <Pin
                className={`h-4 w-4 mr-2 ${
                  bid.isPinned ? "fill-amber-500" : ""
                }`}
              />
              {bid.isPinned ? "Unpin" : "Pin"}
            </Button>
          )}

          {canWithdraw && (
            <Button
              variant="outline"
              size="sm"
              className="text-sm px-4 py-2 h-auto text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => onWithdraw(bid.id)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          {bid.attachments && bid.attachments.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="text-sm px-4 py-2 h-auto"
            >
              <FileText className="h-4 w-4 mr-2" />
              {bid.attachments.length} File
              {bid.attachments.length > 1 ? "s" : ""}
            </Button>
          )}

          <Link href={bid.project.projectUrl} passHref>
            <Button size="sm" className="text-sm gap-2 px-4 py-2 h-auto">
              View {isClient ? "Details" : "Project"}
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
