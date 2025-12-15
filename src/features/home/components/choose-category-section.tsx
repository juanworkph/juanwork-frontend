import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  User, 
  Building2, 
  Laptop, 
  ArrowRight,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';

export function ChooseCategorySection() {
  const categories = [
    {
      title: 'I&apos;m a Freelancer',
      description: 'Find amazing projects and build your freelance career with top clients worldwide.',
      icon: <User className="h-8 w-8 text-primary" />,
      href: '/freelancer',
      features: [
        'Browse thousands of projects',
        'Set your own rates',
        'Work with global clients',
        'Build your portfolio'
      ],
      stats: 'Join 5,000+ freelancers',
      buttonText: 'Start Freelancing',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      title: 'I&apos;m a Client',
      description: 'Hire talented professionals for your projects and grow your business with expert help.',
      icon: <Building2 className="h-8 w-8 text-primary" />,
      href: '/client',
      features: [
        'Access global talent pool',
        'Post projects easily',
        'Secure payment system',
        'Quality guaranteed'
      ],
      stats: 'Join 2,000+ companies',
      buttonText: 'Start Hiring',
      gradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      title: 'I&apos;m a Remote Worker',
      description: 'Find remote job opportunities and work from anywhere in the world with flexible schedules.',
      icon: <Laptop className="h-8 w-8 text-primary" />,
      href: '/workstation',
      features: [
        'Remote job opportunities',
        'Flexible work schedules',
        'Global team collaboration',
        'Work-life balance'
      ],
      stats: 'Join 3,000+ remote workers',
      buttonText: 'Find Remote Jobs',
      gradient: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  return (
    <section className="py-20">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Users className="h-4 w-4" />
            Choose Your Path
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How Do You Want to{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Whether you&apos;re looking for work, hiring talent, or seeking remote opportunities, we have the perfect path for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{category.stats}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {category.description}
                </p>
                
                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full group/btn">
                  <Link href={category.href}>
                    {category.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
