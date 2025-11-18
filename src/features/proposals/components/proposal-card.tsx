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

  return (
    <Card className="group py-0 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
      <CardContent className="p-6 h-full">
        {/* Header with Status and Special Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 mb-2">
              {proposal.isPinned && (
                <Badge
                  variant="outline"
                  className="border-amber-300 text-amber-600 dark:text-amber-400 text-xs px-2 py-1"
                >
                  <Pin className="h-3 w-3 mr-1 fill-amber-500" />
                  Pinned
                </Badge>
              )}

              {proposal.isUrgent && (
                <Badge
                  variant="outline"
                  className="border-red-300 text-red-600 dark:text-red-400 text-xs px-2 py-1"
                >
                  <Zap className="h-3 w-3 mr-1 fill-red-500" />
                  Urgent
                </Badge>
              )}

              {proposal.project.featured && (
                <Badge
                  variant="outline"
                  className="border-blue-300 text-blue-600 dark:text-blue-400 text-xs px-2 py-1"
                >
                  <Star className="h-3 w-3 mr-1 fill-blue-500" />
                  Featured
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {proposal.project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {proposal.project.description}
            </p>
          </div>

          <Badge
            className={`ml-2 flex-shrink-0 ${getStatusColor(
              proposal.status
            )} border`}
          >
            <span className="flex items-center gap-1.5 text-xs font-medium">
              {getStatusIcon(proposal.status)}
              {proposal.status.charAt(0).toUpperCase() +
                proposal.status.slice(1)}
            </span>
          </Badge>
        </div>

        {/* Company/Freelancer Info */}
        {isClient ? (
          // Client view: Show "Your Company" + Freelancer info
          <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <Image
              src="/images/logo.png"
              alt="Your Company"
              width={40}
              height={40}
              className="rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Your Company
                </span>
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Proposal to: {proposal.client.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {proposal.clientViewed ? (
                <>
                  <Eye className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Viewed
                  </span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Pending
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          // Freelancer view: Show client info
          <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
              <Image
                src={
                  proposal.client.avatar ||
                  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop"
                }
                alt={proposal.client.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {proposal.client.name}
                </span>
                {proposal.client.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{proposal.client.country}</span>

                {proposal.client.rating && (
                  <>
                    <span className="mx-1">•</span>
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                    <span>{proposal.client.rating}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {proposal.clientViewed ? (
                <>
                  <Eye className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Viewed
                  </span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Pending
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Key Info Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
              {isClient ? "Freelancer Bid" : "My Proposal"}
            </p>
            <p className="font-bold text-sm text-gray-900 dark:text-white">
              {formattedAmount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {proposal.proposalType === "fixed"
                ? "Fixed Price"
                : "Hourly Rate"}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
              {isClient ? "My Budget" : "Client Budget"}
            </p>
            <p className="font-bold text-sm text-gray-900 dark:text-white">
              {formattedBudget}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {proposal.project.budget.type === "fixed"
                ? "Fixed Budget"
                : "Hourly Budget"}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
              Time Left
            </p>
            <p className="font-bold text-sm text-gray-900 dark:text-white">
              {timeLeft}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {proposal.deliveryTime} days delivery
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/20 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-medium">{proposal.project.category}</span>
            {proposal.clientMessages && proposal.clientMessages > 0 && (
              <>
                <span className="mx-1">•</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {proposal.clientMessages} message
                  {proposal.clientMessages > 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Link href={proposal.project.projectUrl} passHref>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 px-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </Link>

            {canWithdraw && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 transition-colors"
                onClick={() => onWithdraw(proposal.id)}
              >
                Withdraw
              </Button>
            )}

            {canAcceptDecline && (
              <>
                {onDecline && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 transition-colors"
                    onClick={() => onDecline(proposal.id)}
                  >
                    Decline
                  </Button>
                )}

                {onAccept && (
                  <Button
                    size="sm"
                    className="text-xs h-8 px-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 shadow-sm hover:shadow transition-all"
                    onClick={() => onAccept(proposal.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
