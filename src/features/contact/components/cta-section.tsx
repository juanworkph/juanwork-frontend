import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Ready to Get Started?
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Connect
              </span>{' '}
              and Build Something Amazing
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              Don&apos;t just find work—find your calling. Join the global community of freelancers, 
              clients, and remote workers who are already building their dream careers with JuanWork.
            </p>
          </div>
          
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Live Chat</div>
                <div className="text-sm text-muted-foreground">Get instant support</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
              <div className="p-3 rounded-xl bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Phone Support</div>
                <div className="text-sm text-muted-foreground">Call us directly</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
              <div className="p-3 rounded-xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Email Support</div>
                <div className="text-sm text-muted-foreground">Send us a message</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              <Link href="#contact-form">
                Send Message Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/help">Visit Help Center</Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-6">Trusted by professionals from leading companies</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-sm font-medium">Google</div>
              <div className="text-sm font-medium">Microsoft</div>
              <div className="text-sm font-medium">Amazon</div>
              <div className="text-sm font-medium">Netflix</div>
              <div className="text-sm font-medium">Spotify</div>
              <div className="text-sm font-medium">+500 more</div>
            </div>
          </div>
          
          {/* Final stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2min</div>
              <div className="text-sm text-muted-foreground">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
