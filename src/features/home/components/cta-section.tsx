import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles,
  Users,
  Briefcase,
  Star
} from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Join thousands of successful professionals
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Ready to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Your Career?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              Join over 10,000 professionals who have already discovered their perfect opportunities on JuanWork. 
              Start your journey today and unlock unlimited possibilities.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">10,000+ Users</div>
                <div className="text-sm text-muted-foreground">Active community</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">5,000+ Projects</div>
                <div className="text-sm text-muted-foreground">Completed successfully</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">98% Success Rate</div>
                <div className="text-sm text-muted-foreground">Client satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group text-lg px-8 py-6">
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals from</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-sm font-medium">Google</div>
              <div className="text-sm font-medium">Microsoft</div>
              <div className="text-sm font-medium">Amazon</div>
              <div className="text-sm font-medium">Netflix</div>
              <div className="text-sm font-medium">Spotify</div>
              <div className="text-sm font-medium">+500 more</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
