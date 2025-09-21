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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <span className="font-bold text-lg text-primary-foreground">J</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block transition-colors duration-200 group-hover:text-primary">JuanWork</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1 bg-muted/30 rounded-full px-2 py-1">
            {navItems.map((item) => (
              <NavbarItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>

        {/* User Menu (Desktop) */}
        {user && (
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted/30 rounded-full px-3 py-1">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{user.name.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
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
          <div className="py-6 space-y-4 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div 
                  key={item.href}
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
            {user && (
              <div className="pt-4 border-t border-border/40 mt-6">
                <div className="flex items-center gap-3 bg-muted/30 rounded-lg px-4 py-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200 mt-3"
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
        "flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 relative group",
        isActive
          ? "text-primary bg-primary/10 shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm"
      )}
    >
      {item.icon && <span className="mr-2">{iconMap[item.icon]}</span>}
      <span className="relative z-10">{item.title}</span>
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
  
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center py-3 px-4 text-sm font-medium transition-all duration-200 rounded-lg group relative",
        isActive
          ? "text-primary bg-primary/10 shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {item.icon && <span className="mr-2">{iconMap[item.icon]}</span>}
      <span className="relative z-10">{item.title}</span>
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
      )}
      {!isActive && (
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/50 rounded-lg transition-all duration-200" />
      )}
    </Link>
  );
}
