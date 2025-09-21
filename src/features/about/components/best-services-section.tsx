import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  Laptop, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Award,
  Clock,
  TrendingUp,
  Heart
} from 'lucide-react';

export function BestServicesSection() {
  const services = [
    {
      title: 'Freelancer Platform',
      description: 'Comprehensive platform for freelancers to showcase skills, find projects, and build successful careers.',
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        'Professional profile builder',
        'Portfolio showcase',
        'Skill verification',
        'Client reviews system',
        'Payment protection',
        'Project management tools'
      ],
      pricing: 'Free to join',
      stats: '5,000+ active freelancers',
      href: '/freelancer'
    },
    {
      title: 'Client Services',
      description: 'End-to-end solutions for businesses to find, hire, and manage remote talent efficiently.',
      icon: <Users className="h-8 w-8 text-primary" />,
      badge: 'Enterprise',
      badgeColor: 'bg-green-500',
      features: [
        'Talent sourcing',
        'Project posting',
        'Team management',
        'Quality assurance',
        'Escrow payments',
        'Dedicated support'
      ],
      pricing: 'Starting at $99/month',
      stats: '2,000+ companies',
      href: '/client'
    },
    {
      title: 'Remote Work Solutions',
      description: 'Specialized services for remote workers seeking flexible opportunities and career growth.',
      icon: <Laptop className="h-8 w-8 text-primary" />,
      badge: 'Remote First',
      badgeColor: 'bg-purple-500',
      features: [
        'Remote job board',
        'Flexible scheduling',
        'Global opportunities',
        'Time zone coordination',
        'Cultural training',
        'Career development'
      ],
      pricing: 'Free access',
      stats: '3,000+ remote workers',
      href: '/workstation'
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security solutions ensuring data protection and regulatory compliance.',
      icon: <Shield className="h-8 w-8 text-primary" />,
      badge: 'Enterprise Grade',
      badgeColor: 'bg-red-500',
      features: [
        'End-to-end encryption',
        'GDPR compliance',
        'SOC 2 certification',
        'Regular audits',
        'Data backup',
        'Access controls'
      ],
      pricing: 'Included in all plans',
      stats: '99.9% uptime',
      href: '/security'
    },
    {
      title: 'AI-Powered Matching',
      description: 'Advanced machine learning algorithms that connect the right talent with the right projects.',
      icon: <Zap className="h-8 w-8 text-primary" />,
      badge: 'AI Powered',
      badgeColor: 'bg-yellow-500',
      features: [
        'Smart matching algorithm',
        'Skill assessment',
        'Behavioral analysis',
        'Predictive modeling',
        'Real-time updates',
        'Performance tracking'
      ],
      pricing: 'Included in platform',
      stats: '95% match accuracy',
      href: '/ai-matching'
    },
    {
      title: 'Global Marketplace',
      description: 'Worldwide network connecting talent and opportunities across borders and time zones.',
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: 'Worldwide',
      badgeColor: 'bg-cyan-500',
      features: [
        '150+ countries',
        '50+ languages',
        'Currency conversion',
        'Cultural adaptation',
        'Legal compliance',
        'Tax assistance'
      ],
      pricing: 'No additional fees',
      stats: '150+ countries',
      href: '/global'
    }
  ];

  return (
    <section className="py-20">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Award className="h-4 w-4" />
            Best Services
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Solutions
            </span>{' '}
            for Every Need
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From individual freelancers to enterprise teams, we provide tailored solutions that scale with your business 
            and grow with your ambitions. Discover the perfect service for your unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <Badge className={`${service.badgeColor} text-white`}>
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="text-sm font-medium">{service.pricing}</div>
                      <div className="text-xs text-muted-foreground">{service.stats}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button asChild className="w-full group/btn">
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
            <Heart className="h-4 w-4" />
            All services include 24/7 support and regular updates
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Free</div>
              <div className="text-sm text-muted-foreground">Setup & Training</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
