"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { publicNavItems } from '../schema/navbar-items';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Search, Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const logoSrc = theme === 'dark' ? '/images/logo white.png' : '/images/logo black.png';

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-32">
              <Image 
                src={logoSrc} 
                alt="JuanWork Logo" 
                fill 
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1">
            {publicNavItems.map((item) => (
              <NavbarItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>

        {/* Search, Theme Toggle, and Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search Keywords"
              className="w-[200px] pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </form>
          
          <ModeToggle />
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
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
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top-5 duration-300">
          <div className="py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search Keywords"
                className="w-full pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
            
            <div className="space-y-2">
              {publicNavItems.map((item) => (
                <MobileNavItem 
                  key={item.href} 
                  item={item} 
                  pathname={pathname} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                />
              ))}
            </div>
            
            <div className="pt-4 border-t mt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button className="w-full justify-center" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavbarItem({ item, pathname }: { item: { title: string; href: string; disabled?: boolean }; pathname: string }) {
  const isActive = pathname === item.href;
  
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      <span>{item.title}</span>
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
  item: { title: string; href: string; disabled?: boolean }; 
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
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      <span>{item.title}</span>
    </Link>
  );
}
