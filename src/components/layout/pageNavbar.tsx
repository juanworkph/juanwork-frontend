"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  pageNavigationWhereUserRole,
  type PageNavItem,
} from "@/config/page-navigation";

export function PageNavbar() {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  // Get navigation items based on current role
  // Default to freelancer if role is guest or admin
  const navigationItems =
    currentRole === "freelancer" || currentRole === "client"
      ? pageNavigationWhereUserRole(currentRole)
      : pageNavigationWhereUserRole("freelancer");

  const isActive = (item: PageNavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="h-16 w-full">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side - Navigation Items */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap relative",
                  isActive(item)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.name}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 lg:h-5 lg:w-5 p-0 text-xs bg-red-500 text-white"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}

          {/* More items dropdown for mobile */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" className="gap-1 px-2">
              <span className="text-xs">More</span>
            </Button>
          </div>

          {/* Remaining items for desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(4).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap relative",
                    isActive(item)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 p-0 text-xs bg-red-500 text-white"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side - Search and Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search - Hidden on mobile */}
          {/* <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, clients..."
              className="w-48 lg:w-64 pl-10 pr-4 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}

          {/* Quick Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* <Button size="sm" variant="outline" className="gap-1 lg:gap-2 px-2 lg:px-3">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </Button> */}

            <Button
              size="sm"
              variant="outline"
              className="gap-1 lg:gap-2 px-2 lg:px-3 hidden sm:flex"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden lg:inline">Schedule</span>
            </Button>

            <Button size="sm" className="gap-1 lg:gap-2 px-2 lg:px-3">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
