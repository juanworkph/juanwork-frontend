import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Proposal, ProposalStatus } from "../schema/proposals-data";
import {
  formatCurrency,
  getTimeLeft,
  getStatusColor,
} from "../schema/proposals-data";
import { useAuth } from "@/contexts/auth-context";
import {
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Pin,
  Zap,
  DollarSign,
  Layers,
  MessageSquare,
} from "lucide-react";

interface ProposalCardProps {
  proposal: Proposal;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onWithdraw?: (id: string) => void;
}

export function ProposalCard({
  proposal,
  onAccept,
  onDecline,
  onWithdraw,
}: ProposalCardProps) {
  const { currentRole } = useAuth();
  const isClient = currentRole === "client";

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "declined":
        return <XCircle className="h-4 w-4" />;
      case "withdrawn":
        return <ArrowLeft className="h-4 w-4" />;
      case "expired":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formattedAmount =
    proposal.proposalType === "fixed"
      ? formatCurrency(proposal.proposedAmount)
      : `${formatCurrency(proposal.proposedAmount)}/hr`;

  const formattedBudget =
    proposal.project.budget.type === "fixed"
      ? `${formatCurrency(proposal.project.budget.min)}-${formatCurrency(
          proposal.project.budget.max
        )}`
      : `${formatCurrency(proposal.project.budget.min)}-${formatCurrency(
          proposal.project.budget.max
        )}/hr`;

  const timeLeft = proposal.expiresAt
    ? getTimeLeft(proposal.expiresAt)
    : "No deadline";

  // Freelancers can accept/decline client proposals
  const canAcceptDecline =
    proposal.status === "pending" && !isClient && (onAccept || onDecline);
  // Freelancers can withdraw their proposals (not clients)
  const canWithdraw = proposal.status === "pending" && !isClient && onWithdraw;

  // Format submitted date - consistent between server and client
  const formatSubmittedDate = (dateString: string) => {
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
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const submittedDate = formatSubmittedDate(proposal.submittedAt);

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200 py-0">
      <CardContent className="flex-1 p-4">
        {/* Header with date, category and status */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>{proposal.project.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{submittedDate}</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(proposal.status)} text-xs`}>
            <span className="flex items-center gap-1">
              {getStatusIcon(proposal.status)}
              {proposal.status.charAt(0).toUpperCase() +
                proposal.status.slice(1)}
            </span>
          </Badge>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {proposal.isPinned && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">
              <Pin className="h-3 w-3 mr-1 fill-amber-600" />
              Pinned
            </Badge>
          )}
          {proposal.isUrgent && (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0 text-xs">
              <Zap className="h-3 w-3 mr-1 fill-red-600" />
              Urgent
            </Badge>
          )}
          {proposal.project.featured && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0 text-xs">
              <Star className="h-3 w-3 mr-1 fill-blue-600" />
              Featured
            </Badge>
          )}
        </div>

        {/* Project Title and Description */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg line-clamp-2 mb-[10px]">
            <Link
              href={proposal.project.projectUrl}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
            >
              {proposal.project.title}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {proposal.project.description}
          </p>

          {/* Client/Company info with avatar */}
          {!isClient ? (
            <div className="flex items-center gap-2">
              <Image
                src={
                  proposal.client.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                }
                alt={proposal.client.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {proposal.client.name}
                  </p>
                  {proposal.client.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {proposal.client.country && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {proposal.client.country}
                      </span>
                    </div>
                  )}
                  {proposal.client.rating && (
                    <div className="flex items-center gap-1">
                      <span className="mx-1">•</span>
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {proposal.client.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Your Company"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Your Company
                  </p>
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  To: {proposal.client.name}
                </p>
              </div>
            </div>
          )}

          {/* Proposal Details - Compact Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isClient ? "Bid" : "My Proposal"}
                </p>
                <p className="text-sm font-semibold">{formattedAmount}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Budget
                </p>
                <p className="text-sm font-semibold">{formattedBudget}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Time Left
                </p>
                <p className="text-sm font-semibold">{timeLeft}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Delivery
                </p>
                <p className="text-sm font-semibold">
                  {proposal.deliveryTime}d
                </p>
              </div>
            </div>
          </div>

          {/* Engagement indicators */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            {proposal.clientViewed ? (
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                <span>Viewed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <EyeOff className="h-3.5 w-3.5" />
                <span>Not viewed</span>
              </div>
            )}

            {proposal.clientMessages && proposal.clientMessages > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <span>{proposal.clientMessages} msg</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between w-full gap-2">
          <div className="flex gap-2">
            {canWithdraw && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => onWithdraw(proposal.id)}
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Withdraw
              </Button>
            )}

            {canAcceptDecline && onDecline && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => onDecline(proposal.id)}
              >
                <XCircle className="h-3 w-3 mr-1" />
                Decline
              </Button>
            )}

            {canAcceptDecline && onAccept && (
              <Button
                size="sm"
                className="text-xs h-8 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                onClick={() => onAccept(proposal.id)}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Accept
              </Button>
            )}
          </div>

          <Link href={proposal.project.projectUrl} passHref>
            <Button size="sm" className="gap-1 text-xs h-8">
              <span>View</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
