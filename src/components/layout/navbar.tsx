"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { navigationConfig, NavItem } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Briefcase, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  Info, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  BarChart, 
  Plus,
  LayoutDashboard
} from 'lucide-react';

// Map of icon names to their components
const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="size-5" />,
  dashboard: <LayoutDashboard className="size-5" />,
  search: <Search className="size-5" />,
  briefcase: <Briefcase className="size-5" />,
  file: <FileText className="size-5" />,
  users: <Users className="size-5" />,
  messages: <MessageSquare className="size-5" />,
  settings: <Settings className="size-5" />,
  info: <Info className="size-5" />,
  login: <LogIn className="size-5" />,
  "user-plus": <UserPlus className="size-5" />,
  chart: <BarChart className="size-5" />,
  plus: <Plus className="size-5" />,
  projects: <FileText className="size-5" />,
};

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default to public_client if no user is logged in
  const role = user?.role || 'public_client';
  const navItems = navigationConfig[role][0]?.items || [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-bold text-lg text-primary-foreground">J</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">JuanWork</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavbarItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>

        {/* User Menu (Desktop) */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-muted-foreground"
            >
              <LogIn className="size-4 mr-2" />
              Logout
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top-5 duration-300">
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <MobileNavItem 
                key={item.href} 
                item={item} 
                pathname={pathname} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
            ))}
            {user && (
              <div className="pt-4 border-t mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-muted-foreground w-full justify-start"
                >
                  <LogIn className="size-4 mr-2" />
                  Logout
                </Button>
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
  
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {item.icon && iconMap[item.icon]}
      <span className={item.icon ? "ml-2" : ""}>{item.title}</span>
      {isActive && (
        <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary" />
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
  
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center py-2 text-sm font-medium transition-colors rounded-md px-2",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {item.icon && iconMap[item.icon]}
      <span className="ml-2">{item.title}</span>
    </Link>
  );
}
