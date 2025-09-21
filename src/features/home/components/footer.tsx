import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  ArrowRight,
  Heart,
  Shield,
  Award,
  Users,
  Briefcase,
  Globe,
  Clock
} from 'lucide-react';

export function Footer() {
  const footerLinks = {
    platform: [
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'For Freelancers', href: '/freelancer' },
      { name: 'For Clients', href: '/client' },
      { name: 'Remote Jobs', href: '/workstation' },
      { name: 'Success Stories', href: '/success-stories' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community', href: '/community' },
      { name: 'Guidelines', href: '/guidelines' },
      { name: 'Safety', href: '/safety' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Accessibility', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'GitHub', href: '#', icon: Github }
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                    <span className="font-bold text-lg text-primary-foreground">J</span>
                  </div>
                  <span className="font-bold text-xl">JuanWork</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  The ultimate platform connecting talented freelancers with innovative companies worldwide. 
                  Build your future, one project at a time.
                </p>
              </div>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="font-semibold">Stay Updated</h3>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1"
                  />
                  <Button size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get the latest opportunities and tips delivered to your inbox.
                </p>
              </div>
            </div>
            
            {/* Platform links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="py-8 border-t border-border/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="py-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                © 2024 JuanWork. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>for the global workforce</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
