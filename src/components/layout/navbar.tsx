"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Search, Menu, X, ChevronDown, Bell, MessageCircle } from 'lucide-react';
import { navigationWhereRole, NavItem } from '@/config/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getFilteredMenuSections, getMobileMenuSections, getSignOutItem } from '@/config/user-menu';
import { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem as UIDropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { currentRole, user, isAuthenticated, logout } = useAuth();
  const signOutItem = getSignOutItem();
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme for more accurate theme detection
  const logoSrc = mounted && resolvedTheme === 'dark' ? '/images/logo white.png' : '/images/logo black.png';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search query:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Get navigation items based on current role
  const navItems = navigationWhereRole(currentRole);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-32 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded" />
          </div>
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 bg-muted/30 rounded-full px-2 py-1">
              <div className="h-8 w-20 bg-muted/50 rounded-full animate-pulse" />
              <div className="h-8 w-16 bg-muted/50 rounded-full animate-pulse" />
              <div className="h-8 w-24 bg-muted/50 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted/50 rounded animate-pulse" />
            <div className="h-8 w-24 bg-muted/50 rounded animate-pulse" />
            <div className="h-8 w-20 bg-muted/50 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <div className="h-8 w-8 bg-muted/50 rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-8 w-32 transition-transform duration-200 group-hover:scale-105">
              <Image
                src={logoSrc}
                alt="JuanWork Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="transition-opacity duration-200"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1 bg-muted/30 rounded-full px-2 py-1">
            {navItems.common.map((item, index) => (
              <NavbarItem 
                key={item.href === "javascript:void(0)" ? `${item.label}-${index}` : item.href} 
                item={item} 
                pathname={pathname} 
              />
            ))}
          </div>
        </nav>

        {/* Search, Theme Toggle, and Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <Input
              type="search"
              placeholder="Search Keywords"
              className="w-[200px] pr-8 transition-all duration-200 focus:w-[250px] bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </button>
          </form>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Feature buttons for authenticated users */}
                {navItems.feature?.map((item, index) => (
                  <Button
                    key={item.href === "javascript:void(0)" ? `${item.label}-feature-${index}` : item.href}
                    variant={item.variant || "default"}
                    size="sm"
                    asChild
                    className={cn(
                      "transition-colors duration-200",
                      item.variant === "ghost" && "hover:bg-muted/50"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}

                {/* Notification Icon */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-muted/50 transition-colors duration-200"
                  asChild
                >
                  <Link href="/notifications">
                    <Bell className="h-4 w-4" />
                    {/* Notification badge - you can add logic to show/hide based on unread count */}
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </Button>

                {/* Message Icon */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-muted/50 transition-colors duration-200"
                  asChild
                >
                  <Link href="/messages">
                    <MessageCircle className="h-4 w-4" />
                    {/* Message badge - you can add logic to show/hide based on unread count */}
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                      2
                    </span>
                  </Link>
                </Button>

                <UserAvatarDropdown user={user} onLogout={logout} />
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                {navItems.feature?.map((item, index) => (
                  <Button
                    key={item.href === "javascript:void(0)" ? `${item.label}-feature-${index}` : item.href}
                    variant={item.variant || "default"}
                    size="sm"
                    asChild
                    className={cn(
                      "transition-colors duration-200",
                      item.variant === "ghost" && "hover:bg-muted/50"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          {isAuthenticated && (
            <div className="flex items-center gap-1">
              {/* Mobile Notification Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 hover:bg-muted/50 transition-colors duration-200"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                    3
                  </span>
                </Link>
              </Button>

              {/* Mobile Message Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 hover:bg-muted/50 transition-colors duration-200"
                asChild
              >
                <Link href="/messages">
                  <MessageCircle className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                    2
                  </span>
                </Link>
              </Button>

              <UserAvatarDropdown user={user} onLogout={logout} />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-foreground hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="relative">
              <Menu className={`size-5 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`size-5 absolute inset-0 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-5 duration-300">
          <div className="py-6 space-y-6 px-4 md:px-6 max-w-7xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search Keywords"
                className="w-full pr-8 bg-background/50 border-border/50 focus:border-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>

            <div className="space-y-1">
              {navItems.common.map((item, index) => (
                <div
                  key={item.href === "javascript:void(0)" ? `${item.label}-${index}` : item.href}
                  className="animate-in fade-in-0 slide-in-from-left-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <MobileNavItem
                    item={item}
                    pathname={pathname}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              ))}
            </div>

            {isAuthenticated ? (
              <div className="pt-4 border-t border-border/40 mt-6">
                <div className="p-3 bg-muted/30 rounded-lg mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  {user?.role === 'freelancer' && user?.balance !== undefined && (
                    <div className="flex items-center justify-between pt-2 border-t border-border/40">
                      <span className="text-xs text-muted-foreground">Balance</span>
                      <span className="text-sm font-semibold text-green-600">
                        ${user.balance.toFixed(2)} USD
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {/* Dynamic Mobile Menu Sections */}
                  {getMobileMenuSections(user?.role || 'guest').map((section) => (
                    <div key={section.id} className="space-y-1">
                      {section.label && (
                        <h4 className="text-xs font-medium text-muted-foreground px-3 py-1">
                          {section.label}
                        </h4>
                      )}
                      {section.items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                          >
                            <IconComponent className="h-4 w-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  ))}

                  {/* Sign Out */}
                  <div className="pt-2 border-t border-border/40">
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-2 px-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left"
                    >
                      {signOutItem && <signOutItem.icon className="h-4 w-4" />}
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-border/40 mt-6 flex flex-col gap-3">
                {navItems.feature?.map((item, index) => (
                  <Button
                    key={item.href === "javascript:void(0)" ? `${item.label}-mobile-feature-${index}` : item.href}
                    variant={item.variant || (index === 0 ? "outline" : "default")}
                    className="w-full justify-center transition-all duration-200"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavbarItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href;

  // Handle dropdown menu items
  if (item.isDropdown && item.dropdownMenu) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 relative group",
            isActive
              ? "text-primary bg-primary/10 shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm",
            item.disabled && "pointer-events-none opacity-50"
          )}>
            <span className="relative z-10">{item.label}</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          {item.dropdownMenu.map((dropdownItem) => (
            <UIDropdownMenuItem key={dropdownItem.href} asChild>
              <Link href={dropdownItem.href}>{dropdownItem.label}</Link>
            </UIDropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Regular menu item
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 relative group",
        isActive
          ? "text-primary bg-primary/10 shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      <span className="relative z-10">{item.label}</span>
      {isActive && (
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-in fade-in-0 duration-200" />
      )}
      {!isActive && (
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/50 rounded-full transition-all duration-200" />
      )}
    </Link>
  );
}

function MobileNavItem({
  item,
  pathname,
  onClick
}: {
  item: NavItem;
  pathname: string;
  onClick: () => void;
}) {
  const isActive = pathname === item.href;

  // Handle dropdown menu items
  if (item.isDropdown && item.dropdownMenu) {
    return (
      <div className="space-y-1">
        <div className={cn(
          "flex items-center py-3 px-4 text-sm font-medium transition-all duration-200 rounded-lg",
          "text-primary bg-primary/5 shadow-sm"
        )}>
          <span className="relative z-10">{item.label}</span>
        </div>
        <div className="pl-4 space-y-1 border-l border-border/40 ml-4">
          {item.dropdownMenu.map((dropdownItem) => (
            <Link
              key={dropdownItem.href}
              href={dropdownItem.href}
              onClick={onClick}
              className={cn(
                "flex items-center py-2 px-4 text-sm transition-all duration-200 rounded-lg",
                pathname === dropdownItem.href
                  ? "text-primary bg-primary/10 shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Regular menu item
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center py-3 px-4 text-sm font-medium transition-all duration-200 rounded-lg group relative",
        isActive
          ? "text-primary bg-primary/10 shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      <span className="relative z-10">{item.label}</span>
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
      )}
      {!isActive && (
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/50 rounded-lg transition-all duration-200" />
      )}
    </Link>
  );
}

// User Avatar Dropdown Component
function UserAvatarDropdown({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const menuSections = getFilteredMenuSections(user?.role || 'guest');
  const signOutItem = getSignOutItem();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-muted/50 transition-colors duration-200"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            {user?.role === 'freelancer' && user?.balance !== undefined && (
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Current Balance</span>
                  <span className="text-sm font-semibold text-green-600">
                    ${user.balance.toFixed(2)} USD
                  </span>
                </div>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Dynamic Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id}>
            {section.label && (
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                {section.label}
              </DropdownMenuLabel>
            )}
            {section.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <UIDropdownMenuItem
                  key={item.id}
                  asChild={item.href !== '#'}
                  onClick={item.href === '#' ? onLogout : undefined}
                  className={item.className}
                >
                  {item.href === '#' ? (
                    <span className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )}
                </UIDropdownMenuItem>
              );
            })}
            {section.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
