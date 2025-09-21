import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Globe, 
  Clock,
  CheckCircle,
  Star,
  Target,
  Heart,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

export function WhyChooseUsSection() {
  const strengths = [
    {
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance with dedicated support agents ready to help you succeed.',
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      badge: 'Always Available',
      benefits: [
        'Live chat support',
        'Video call assistance',
        'Email support',
        'Phone support'
      ],
      stats: 'Average response time: 2 minutes'
    },
    {
      title: 'Expert Guidance',
      description: 'Get personalized advice from industry experts who understand your unique needs and challenges.',
      icon: <Users className="h-8 w-8 text-primary" />,
      badge: 'Expert Team',
      benefits: [
        'Industry specialists',
        'Personalized consultations',
        'Best practice guidance',
        'Success strategies'
      ],
      stats: '95% customer satisfaction'
    },
    {
      title: 'Global Reach',
      description: 'Connect with opportunities and talent from over 150 countries with our worldwide network.',
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: 'Worldwide',
      benefits: [
        '150+ countries',
        '50+ languages',
        'Cultural expertise',
        'Time zone support'
      ],
      stats: '150+ countries, 50+ languages'
    },
    {
      title: 'Proven Results',
      description: 'Track record of successful outcomes with measurable results and client satisfaction.',
      icon: <Award className="h-8 w-8 text-primary" />,
      badge: 'Results Driven',
      benefits: [
        '98% success rate',
        'Client testimonials',
        'Case studies',
        'ROI tracking'
      ],
      stats: '98% success rate, 4.9/5 rating'
    },
    {
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensuring your data and communications are always protected.',
      icon: <Shield className="h-8 w-8 text-primary" />,
      badge: 'Enterprise Grade',
      benefits: [
        'End-to-end encryption',
        'GDPR compliance',
        'Secure payments',
        'Data protection'
      ],
      stats: '99.9% uptime guarantee'
    },
    {
      title: 'Fast Response',
      description: 'Lightning-fast response times ensuring you get the help you need when you need it.',
      icon: <Zap className="h-8 w-8 text-primary" />,
      badge: 'Lightning Fast',
      benefits: [
        'Instant responses',
        'Real-time support',
        'Quick resolutions',
        'Efficient processes'
      ],
      stats: 'Average resolution time: 15 minutes'
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
              Support Experience
            </span>{' '}
            You Deserve
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            We&apos;re not just another platform—we&apos;re your dedicated partner in success. 
            Our comprehensive support system ensures you have everything you need to thrive 
            in the global marketplace.
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
