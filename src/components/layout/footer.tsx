"use client";

import React from "react";
import Link from "next/link";
import { Share2, Mail, Globe } from "lucide-react";

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "Find Work", href: "/freelancer/find-work" },
      { name: "Hire Talent", href: "/client/post-job" },
      { name: "Service Packages", href: "/services" },
      { name: "Enterprise", href: "/enterprise" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Trust & Safety", href: "/safety" },
      { name: "Payments", href: "/payments" },
      { name: "Contact Us", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-extrabold font-display">
                  J
                </span>
              </div>
              <span className="text-xl font-bold text-foreground font-display">
                Juan<span className="text-primary">Work</span>
              </span>
            </div>

            <p className="text-muted-foreground max-w-sm leading-relaxed font-sans">
              JuanWork is the Philippines' leading localized freelancing
              platform, connecting world-class Filipino creatives and
              professionals with businesses around the globe.
            </p>

            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                href="#"
              >
                <Share2 className="text-xl h-5 w-5" />
              </a>
              <a
                className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                href="#"
              >
                <Mail className="text-xl h-5 w-5" />
              </a>
              <a
                className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                href="#"
              >
                <Globe className="text-xl h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h5 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest font-display">
              Platform
            </h5>
            <ul className="space-y-4 text-muted-foreground text-sm font-semibold font-sans">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h5 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest font-display">
              Company
            </h5>
            <ul className="space-y-4 text-muted-foreground text-sm font-semibold font-sans">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h5 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest font-display">
              Support
            </h5>
            <ul className="space-y-4 text-muted-foreground text-sm font-semibold font-sans">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <p>© 2026 JuanWork Philippines. All rights reserved.</p>
          <div className="flex gap-8">
            <Link
              className="hover:text-foreground transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              href="/cookies"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
