import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  Shield, 
  Clock, 
  Globe, 
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';

export function WhatWeOfferSection() {
  const features = [
    {
      title: 'Smart Job Matching',
      description: 'AI-powered algorithms match you with the perfect opportunities based on your skills, experience, and preferences.',
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      badge: 'Popular',
      benefits: ['Personalized recommendations', 'Skill-based matching', 'Real-time updates']
    },
    {
      title: 'Talent Discovery',
      description: 'Find and connect with top-tier freelancers from around the world. Our platform makes talent discovery effortless.',
      icon: <Users className="h-8 w-8 text-primary" />,
      badge: 'New',
      benefits: ['Global talent pool', 'Verified profiles', 'Portfolio showcase']
    },
    {
      title: 'Secure Payments',
      description: 'Built-in escrow system ensures secure transactions. Get paid on time, every time, with our protected payment system.',
      icon: <Shield className="h-8 w-8 text-primary" />,
      badge: 'Secure',
      benefits: ['Escrow protection', 'Multiple payment methods', 'Dispute resolution']
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you succeed. Our team is always here when you need assistance.',
      icon: <Clock className="h-8 w-8 text-primary" />,
      badge: 'Always On',
      benefits: ['Live chat support', 'Email assistance', 'Video calls']
    },
    {
      title: 'Global Reach',
      description: 'Access opportunities and talent from over 100 countries. Break geographical barriers and work globally.',
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: 'Worldwide',
      benefits: ['Multi-language support', 'Currency conversion', 'Time zone coordination']
    },
    {
      title: 'Growth Analytics',
      description: 'Track your progress with detailed analytics and insights. Make data-driven decisions to grow your business.',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      badge: 'Insights',
      benefits: ['Performance metrics', 'Earnings tracking', 'Growth recommendations']
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star className="h-4 w-4" />
            What We Offer
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our comprehensive platform provides all the tools and features you need to thrive in the modern freelance economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
