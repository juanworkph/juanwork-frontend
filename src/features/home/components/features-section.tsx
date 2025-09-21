import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Award, Globe } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Find Work',
      description: 'Browse thousands of jobs and find opportunities that match your skills and interests.',
      icon: <Briefcase className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Hire Talent',
      description: 'Connect with skilled professionals from around the world for your projects.',
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Quality Work',
      description: 'Our platform ensures high-quality deliverables through our verification process.',
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Global Reach',
      description: 'Access a worldwide network of clients and freelancers from over 100 countries.',
      icon: <Globe className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Why Choose JuanWork
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Our platform offers everything you need to succeed in the freelance marketplace.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
