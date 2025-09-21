import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  ArrowRight, 
  Clock, 
  Target,
  Zap,
  TrendingUp,
  Shield,
  CheckCircle,
  Star
} from 'lucide-react';

export function FeatureCardsSection() {
  const featureCards = [
    {
      title: 'Post Jobs',
      subtitle: 'Quick and easy way to advertise',
      description: 'Reach thousands of qualified freelancers instantly. Post your project and get proposals from the best talent in just minutes.',
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        'Post in under 2 minutes',
        'Get proposals within hours',
        'AI-powered talent matching',
        'Secure payment protection'
      ],
      stats: {
        label: 'Average time to hire',
        value: '24 hours'
      },
      primaryButton: {
        text: 'Post A Job',
        href: '/client/post-job'
      },
      secondaryButton: {
        text: 'Learn More',
        href: '/about#posting-jobs'
      }
    },
    {
      title: 'Talented Candidates',
      subtitle: 'Get discovered by companies looking to hire remotely',
      description: 'Showcase your skills and get discovered by top companies. Build your professional presence and land your dream remote job.',
      icon: <Users className="h-12 w-12 text-primary" />,
      gradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
      badge: 'New Feature',
      badgeColor: 'bg-purple-500',
      features: [
        'Professional profile builder',
        'Skill-based matching',
        'Portfolio showcase',
        'Direct client connections'
      ],
      stats: {
        label: 'Success rate',
        value: '95%'
      },
      primaryButton: {
        text: 'Get Listed',
        href: '/freelancer/profile'
      },
      secondaryButton: {
        text: 'Learn More',
        href: '/about#getting-listed'
      }
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Target className="h-4 w-4" />
            Get Started Today
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Make It Happen?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose your path and start your journey with JuanWork today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featureCards.map((card, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background/80 backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardHeader className="relative pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <Badge className={`${card.badgeColor} text-white`}>
                    {card.badge}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground font-medium">
                    {card.subtitle}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {card.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {card.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="text-2xl font-bold text-primary">{card.stats.value}</div>
                    <div className="text-sm text-muted-foreground">{card.stats.label}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button asChild className="flex-1 group/btn">
                    <Link href={card.primaryButton.href}>
                      {card.primaryButton.text}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={card.secondaryButton.href}>
                      {card.secondaryButton.text}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
