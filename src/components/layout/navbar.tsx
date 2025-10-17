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
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { navigationWhereRole, NavItem } from '@/config/navigation';
import { useAuth } from '@/contexts/auth-context';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem as UIDropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { currentRole } = useAuth();
  
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-8 w-32 transition-transform duration-200 group-hover:scale-105">
              {mounted ? (
                <Image
                  src={logoSrc}
                  alt="JuanWork Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="transition-opacity duration-200"
                />
              ) : (
                <div className="h-8 w-32 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded" />
              )}
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
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
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
