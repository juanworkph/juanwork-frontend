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
  Pin,
  FileText,
  Star,
  TrendingDown,
  MapPin,
  Layers,
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
          bid.project.budget.max,
        )}`
      : `${formatCurrency(bid.project.budget.min)} - ${formatCurrency(
          bid.project.budget.max,
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

  // Format bid date - consistent between server and client
  const formatBidDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const bidDate = formatBidDate(bid.bidDate);

  // Check if bid can be withdrawn (only pending bids for freelancers)
  const canWithdraw = bid.status === "pending" && onWithdraw && !isClient;

  return (
    <Card className="bid-card overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200 py-0">
      <CardContent className="flex-1 p-4">
        {/* Header with date and status */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>{bid.project.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{bidDate}</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(bid.status)} text-xs`}>
            <span className="flex items-center gap-1">
              {getStatusIcon(bid.status)}
              {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
            </span>
          </Badge>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {bid.project.experience && (
            <Badge variant="outline" className="text-xs capitalize">
              {bid.project.experience}
            </Badge>
          )}
          {bid.isPinned && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
              <Pin className="h-3 w-3 mr-1 fill-amber-600" />
              Pinned
            </Badge>
          )}
          {bid.project.featured && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0 text-xs">
              <Star className="h-3 w-3 mr-1 fill-blue-600" />
              Featured
            </Badge>
          )}
        </div>

        {/* Project Title */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold line-clamp-2 mb-[10px]">
            <Link
              href={bid.project.projectUrl}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
            >
              {bid.project.title}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {bid.project.description}
          </p>

          {/* Client/Company info with avatar - Hidden for clients */}
          {!isClient && (
            <div className="flex items-center gap-2">
              <Image
                src={
                  bid.client.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                }
                alt={bid.client.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {bid.client.name}
                  </p>
                  {bid.client.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {bid.client.country && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {bid.client.country}
                      </span>
                    </div>
                  )}
                  {bid.client.rating && (
                    <div className="flex items-center gap-1">
                      <span className="mx-1">•</span>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {bid.client.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Grid - Role specific */}
          <div className="grid grid-cols-2 gap-3 mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            {/* Slot 1: Top-left */}
            <div className="flex items-center gap-2">
              <DollarSign
                className={`h-4 w-4 ${isClient ? "text-gray-500" : "text-green-600"}`}
              />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  {isClient ? "My Budget" : "My Bid"}
                </p>
                <p className="text-sm font-bold truncate">
                  {isClient ? formattedBudget : formattedAmount}
                </p>
              </div>
            </div>

            {/* Slot 2: Top-right */}
            <div className="flex items-center gap-2">
              {isClient ? (
                <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              ) : (
                <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  {isClient ? "Bidders" : "Client Budget"}
                </p>
                <p className="text-sm font-bold truncate">
                  {isClient ? `${bid.bidderCount} total` : formattedBudget}
                </p>
              </div>
            </div>

            {/* Slot 3: Bottom-left */}
            <div className="flex items-center gap-2">
              {isClient ? (
                <TrendingDown className="h-4 w-4 text-primary" />
              ) : (
                <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              )}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  {isClient ? "Lowest Bid" : "Bidders"}
                </p>
                <p
                  className={`text-sm font-bold truncate ${isClient ? "text-primary" : ""}`}
                >
                  {isClient
                    ? bid.lowestBidAmount
                      ? formatCurrency(bid.lowestBidAmount)
                      : "No bids"
                    : bid.bidderCount}
                </p>
              </div>
            </div>

            {/* Slot 4: Bottom-right */}
            <div className="flex items-center gap-2">
              <Clock
                className={`h-4 w-4 ${bid.expiresAt && new Date(bid.expiresAt).getTime() - new Date().getTime() < 4 * 24 * 60 * 60 * 1000 ? "text-red-500" : "text-amber-500"}`}
              />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  Time Left
                </p>
                <p
                  className={`text-sm font-bold truncate ${bid.expiresAt && new Date(bid.expiresAt).getTime() - new Date().getTime() < 4 * 24 * 60 * 60 * 1000 ? "text-red-500" : ""}`}
                >
                  {timeLeft}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between w-full pt-4">
          {/* Left side: Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5" title={isClient ? "Views" : "View Status"}>
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="font-medium">
                {isClient ? "0 views" : (bid.clientViewed ? "Viewed" : "Not viewed")}
              </span>
            </div>
            <div className="flex items-center gap-1.5" title="Messages">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span className="font-medium">
                {isClient ? "0 messages" : `${bid.clientMessages || 0} msgs`}
              </span>
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-2">
            {canWithdraw && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => onWithdraw(bid.id)}
              >
                Withdraw
              </Button>
            )}

            {onPin && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 w-8 p-0"
                onClick={() => onPin(bid.id, !bid.isPinned)}
              >
                <Pin
                  className={`h-3.5 w-3.5 ${bid.isPinned ? "fill-amber-500 text-amber-500" : ""}`}
                />
              </Button>
            )}

            <Link href={bid.project.projectUrl} passHref>
              <Button size="sm" className="gap-1 text-xs h-8 px-4 font-semibold">
                <span>View</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
