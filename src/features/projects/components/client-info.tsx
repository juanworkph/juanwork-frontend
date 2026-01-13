import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, CheckCircle } from "lucide-react";
import {
  ClientInfo as ClientInfoType,
  formatMemberSince,
} from "../schema/project-detail-data";

interface ClientInfoProps {
  client: ClientInfoType;
}

/**
 * ClientInfo Component
 * 
 * Displays client information including avatar, name, location,
 * verified badge, and member since date.
 * 
 * Requirements:
 * - 2.1: Display client avatar, name, location
 * - 2.2: Display verified badge if applicable
 * - 2.3: Display member since date
 */
export const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Client Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Avatar and Name */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback className="bg-[#F45A0B]/10 text-[#F45A0B] text-lg font-semibold">
              {getInitials(client.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {client.name}
              </h3>
              {client.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Client Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{client.location}</span>
        </div>

        {/* Member Since */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Member since {formatMemberSince(client.memberSince)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
