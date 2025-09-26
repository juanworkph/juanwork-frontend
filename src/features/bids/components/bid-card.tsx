import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Bid, BidStatus } from '../schema/bids-data';
import { formatCurrency, getTimeLeft, getStatusColor } from '../schema/bids-data';
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
  Star
} from 'lucide-react';

interface BidCardProps {
  bid: Bid;
  onWithdraw?: (id: string) => void;
  onPin?: (id: string, isPinned: boolean) => void;
}

export function BidCard({ bid, onWithdraw, onPin }: BidCardProps) {
  // Get status icon based on bid status
  const getStatusIcon = (status: BidStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'withdrawn':
        return <ArrowLeft className="h-4 w-4" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Format bid amount based on bid type
  const formattedAmount = bid.bidType === 'fixed' 
    ? formatCurrency(bid.amount)
    : `${formatCurrency(bid.amount)}/hr`;

  // Format client budget based on budget type
  const formattedBudget = bid.project.budget.type === 'fixed'
    ? `${formatCurrency(bid.project.budget.min)} - ${formatCurrency(bid.project.budget.max)}`
    : `${formatCurrency(bid.project.budget.min)} - ${formatCurrency(bid.project.budget.max)}/hr`;

  // Calculate time left until deadline
  const timeLeft = bid.expiresAt ? getTimeLeft(bid.expiresAt) : 'No deadline';

  // Format bid date
  const bidDate = new Date(bid.bidDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Check if bid can be withdrawn (only pending bids)
  const canWithdraw = bid.status === 'pending' && onWithdraw;

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
              <Badge variant="outline" className="border-amber-300 text-amber-600 dark:text-amber-400 px-3 py-1">
                <Pin className="h-3 w-3 mr-1.5 fill-amber-500" />
                Pinned
              </Badge>
            )}
            
            {bid.project.featured && (
              <Badge variant="outline" className="border-blue-300 text-blue-600 dark:text-blue-400 px-3 py-1">
                <Star className="h-3 w-3 mr-1.5 fill-blue-500" />
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Bid on {bidDate}</span>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-medium text-xl">
              <Link href={bid.project.projectUrl} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                {bid.project.title}
              </Link>
            </h3>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2.5 py-1">
                {bid.project.category}
              </Badge>
              
              {bid.project.experience && (
                <Badge variant="outline" className="text-xs capitalize px-2.5 py-1">
                  {bid.project.experience} level
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
            {bid.project.description}
          </p>
          
          {/* Client Info */}
          <div className="flex items-center gap-3 mt-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
              <Image
                src={bid.client.avatar || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop"}
                alt={bid.client.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
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
          
          {/* Bid Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">My Bid</p>
              <p className="text-base font-semibold flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
                {formattedAmount}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Client Budget</p>
              <p className="text-base font-semibold">{formattedBudget}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bidders</p>
              <p className="text-base font-semibold flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                {bid.bidderCount}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time Left</p>
              <p className="text-base font-semibold flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                {timeLeft}
              </p>
            </div>
          </div>
          
          {/* Client Interaction */}
          <div className="flex flex-wrap items-center gap-5 mt-5 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              {bid.clientViewed ? (
                <>
                  <Eye className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Viewed {bid.clientViewedAt && new Date(bid.clientViewedAt).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <>
                  <EyeOff className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Not viewed yet</span>
                </>
              )}
            </div>
            
            {bid.clientMessages && bid.clientMessages > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {bid.clientMessages} message{bid.clientMessages > 1 ? 's' : ''}
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
              <Pin className={`h-4 w-4 mr-2 ${bid.isPinned ? 'fill-amber-500' : ''}`} />
              {bid.isPinned ? 'Unpin' : 'Pin'}
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
            <Button variant="outline" size="sm" className="text-sm px-4 py-2 h-auto">
              <FileText className="h-4 w-4 mr-2" />
              {bid.attachments.length} File{bid.attachments.length > 1 ? 's' : ''}
            </Button>
          )}
          
          <Link href={bid.project.projectUrl} passHref>
            <Button size="sm" className="text-sm gap-2 px-4 py-2 h-auto">
              View Project
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 