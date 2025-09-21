import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Award,
  Target,
  Heart
} from 'lucide-react';

export function AboutUsSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Heart className="h-4 w-4" />
                About JuanWork
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Building the Future of{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Remote Work
                </span>
              </h1>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
                <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to global talent and opportunities, creating a world where anyone can work with anyone, anywhere, at any time.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A future where geographical boundaries don&apos;t limit career opportunities, and the best talent can work with the most innovative companies worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
