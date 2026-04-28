import React from "react";
import Image from "next/image";
import {
  CheckCircle,
  Star,
  MapPin,
  Briefcase,
  UserCheck,
  Clock,
  CreditCard,
  User,
} from "lucide-react";
import { ExtendedClientInfo } from "../schema/projects-data";
import { formatTimeAgo } from "@/features/findwork/utils/findwork";

interface SingleViewClientCardProps {
  client: ExtendedClientInfo;
}

const SingleViewClientCard: React.FC<SingleViewClientCardProps> = ({
  client,
}: SingleViewClientCardProps) => {
  // Render star rating
  const renderStarRating = () => {
    const rating = client.rating || 0;
    const reviewCount = client.reviewCount || 0;

    return (
      <div className="flex items-center gap-1 mb-6">
        <div className="flex text-amber-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`text-[16px] ${
                star <= Math.floor(rating)
                  ? "fill-current"
                  : star - rating <= 0.5
                    ? "fill-current/50"
                    : "text-muted"
              }`} // Basic approximation of star filling
              fill={star <= Math.floor(rating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-foreground ml-1">
          {rating.toFixed(1)}
        </span>
        <span className="text-[10px] text-muted-foreground ml-1">
          ({reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1 h-4 bg-primary rounded-full"></span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
          About the Client
        </h3>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          {client.avatar ? (
            <Image
              src={client.avatar}
              alt={client.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="text-3xl text-muted-foreground" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-foreground">
              {client.name}
            </p>
            {client.verified && (
              <CheckCircle className="text-blue-500 w-4 h-4 fill-blue-500/10" />
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
            <MapPin className="w-3 h-3" /> {client.country}
          </div>
        </div>
      </div>

      {renderStarRating()}

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Total Projects</span>
          <span className="font-semibold text-foreground">
            {client.totalProjects}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Total Hires</span>
          <span className="font-semibold text-foreground">
            {client.totalHires}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Response Rate</span>
          <span className="font-semibold text-green-500">
            {client.responseRate}%
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Last Active</span>
          <span className="font-semibold text-foreground">
            {client.lastActive ? formatTimeAgo(client.lastActive) : "N/A"}
          </span>
        </div>
      </div>

      {client.paymentVerified && (
        <div className="mt-6 p-3 bg-green-500/5 border border-green-500/10 rounded-lg flex items-center gap-2">
          <CheckCircle className="text-green-500 w-4 h-4 fill-green-500/10" />
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
            Payment Verified
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleViewClientCard;
