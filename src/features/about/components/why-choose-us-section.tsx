import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Award, 
  Globe, 
  Clock,
  CheckCircle,
  Star,
  Target,
  TrendingUp
} from 'lucide-react';

export function WhyChooseUsSection() {
  const strengths = [
    {
      title: 'Unmatched Security',
      description: 'Bank-level security with end-to-end encryption, secure payment processing, and comprehensive data protection.',
      icon: <Shield className="h-8 w-8 text-primary" />,
      badge: 'Enterprise Grade',
      benefits: [
        '256-bit SSL encryption',
        'PCI DSS compliant payments',
        'GDPR compliant data handling',
        'Regular security audits'
      ],
      stats: '99.9% uptime guarantee'
    },
    {
      title: 'Lightning Fast Matching',
      description: 'Our AI-powered algorithm matches the right talent with the right projects in seconds, not days.',
      icon: <Zap className="h-8 w-8 text-primary" />,
      badge: 'AI Powered',
      benefits: [
        'Machine learning algorithms',
        'Real-time skill assessment',
        'Behavioral pattern analysis',
        'Predictive matching'
      ],
      stats: 'Average match time: 2.3 minutes'
    },
    {
      title: 'Global Talent Pool',
      description: 'Access to over 100,000 verified professionals from 150+ countries across all industries and skill levels.',
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: 'Worldwide',
      benefits: [
        '150+ countries represented',
        '50+ languages supported',
        '24/7 time zone coverage',
        'Cultural diversity focus'
      ],
      stats: '150+ countries, 50+ languages'
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous vetting process ensures only top-tier talent joins our platform, maintaining the highest standards.',
      icon: <Award className="h-8 w-8 text-primary" />,
      badge: 'Verified',
      benefits: [
        'Multi-stage verification',
        'Portfolio assessment',
        'Reference checks',
        'Skill testing'
      ],
      stats: 'Only 15% of applicants accepted'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support with dedicated success managers for enterprise clients.',
      icon: <Clock className="h-8 w-8 text-primary" />,
      badge: 'Always Available',
      benefits: [
        'Live chat support',
        'Video call assistance',
        'Dedicated account managers',
        'Priority support queue'
      ],
      stats: 'Average response time: 2 minutes'
    },
    {
      title: 'Proven Results',
      description: 'Track record of successful projects with measurable outcomes and client satisfaction.',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      badge: 'Results Driven',
      benefits: [
        '98% project success rate',
        '95% client retention',
        '4.9/5 average rating',
        'ROI tracking tools'
      ],
      stats: '98% success rate, 4.9/5 rating'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Competitive Edge
            </span>{' '}
            You Need
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            We&apos;re not just another freelance platform. We&apos;re the comprehensive solution that combines cutting-edge technology, 
            global reach, and human expertise to deliver unmatched results for both freelancers and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {strength.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {strength.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {strength.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {strength.description}
                </p>
                
                <div className="space-y-2">
                  {strength.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-sm font-medium text-primary">{strength.stats}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
            <Target className="h-4 w-4" />
            Ready to experience the difference?
          </div>
        </div>
      </div>
    </section>
  );
}
