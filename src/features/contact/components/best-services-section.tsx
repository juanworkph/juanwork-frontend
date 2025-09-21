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
  Heart,
  MessageCircle
} from 'lucide-react';

export function BestServicesSection() {
  const services = [
    {
      title: 'Freelancer Support',
      description: 'Comprehensive support for freelancers to build successful careers and find the right opportunities.',
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        'Career guidance',
        'Profile optimization',
        'Skill development',
        'Client matching',
        'Payment protection',
        'Success coaching'
      ],
      pricing: 'Free support',
      stats: '5,000+ freelancers helped',
      href: '/freelancer/support'
    },
    {
      title: 'Client Services',
      description: 'Dedicated support for businesses to find, hire, and manage remote talent effectively.',
      icon: <Users className="h-8 w-8 text-primary" />,
      badge: 'Enterprise',
      badgeColor: 'bg-green-500',
      features: [
        'Talent sourcing',
        'Project management',
        'Quality assurance',
        'Team building',
        'Success tracking',
        'Dedicated support'
      ],
      pricing: 'Starting at $99/month',
      stats: '2,000+ companies served',
      href: '/client/support'
    },
    {
      title: 'Remote Work Solutions',
      description: 'Specialized support for remote workers seeking flexible opportunities and career growth.',
      icon: <Laptop className="h-8 w-8 text-primary" />,
      badge: 'Remote First',
      badgeColor: 'bg-purple-500',
      features: [
        'Remote job matching',
        'Work-life balance',
        'Productivity tools',
        'Skill assessment',
        'Career development',
        'Community support'
      ],
      pricing: 'Free access',
      stats: '3,000+ remote workers',
      href: '/workstation/support'
    },
    {
      title: 'Technical Support',
      description: 'Expert technical assistance for platform issues, integrations, and troubleshooting.',
      icon: <Shield className="h-8 w-8 text-primary" />,
      badge: 'Expert Team',
      badgeColor: 'bg-red-500',
      features: [
        'Platform troubleshooting',
        'API integration',
        'Security assistance',
        'Performance optimization',
        'Bug resolution',
        'Feature guidance'
      ],
      pricing: 'Included in all plans',
      stats: '99.9% uptime support',
      href: '/support/technical'
    },
    {
      title: 'Business Consulting',
      description: 'Strategic consulting services to help you optimize your remote work operations.',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      badge: 'Premium',
      badgeColor: 'bg-yellow-500',
      features: [
        'Strategy development',
        'Process optimization',
        'Team scaling',
        'Performance analysis',
        'Best practices',
        'ROI improvement'
      ],
      pricing: 'Custom pricing',
      stats: '95% improvement rate',
      href: '/consulting'
    },
    {
      title: 'Community Support',
      description: 'Join our vibrant community of professionals for networking, learning, and collaboration.',
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: 'Community',
      badgeColor: 'bg-cyan-500',
      features: [
        'Networking events',
        'Skill sharing',
        'Mentorship programs',
        'Industry insights',
        'Collaboration tools',
        'Success stories'
      ],
      pricing: 'Free community access',
      stats: '10,000+ active members',
      href: '/community'
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
              Support Services
            </span>{' '}
            for Every Need
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From individual freelancers to enterprise teams, we provide tailored support solutions 
            that help you succeed in the remote work economy. Get the assistance you need, when you need it.
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
                    Get Support
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
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">2min</div>
              <div className="text-sm text-muted-foreground">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
