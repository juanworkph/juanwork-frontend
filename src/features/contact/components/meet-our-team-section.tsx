import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Linkedin,
  Twitter,
  Mail,
  Users,
  Award,
  Heart,
  Star,
  Globe,
  Briefcase,
  Zap,
  MessageCircle,
  Headphones
} from 'lucide-react';

export function MeetOurTeamSection() {
  const teamMembers = [
    {
      name: 'Klen Bancud',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in tech, passionate about democratizing remote work opportunities worldwide.',
      image: '/images/team/sarah-johnson.jpg',
      skills: ['Leadership', 'Strategy', 'Innovation'],
      experience: '15+ years',
      location: 'Manila, Philippines',
      linkedin: '#',
      twitter: '#',
      email: 'klen@juanwork.ph'
    },
    {
      name: 'Marlon',
      role: 'COO',
      bio: 'Operations expert ensuring smooth platform operations and user experience optimization.',
      image: '/images/team/sarah-johnson.jpg',
      skills: ['Operations', 'Management', 'Strategy'],
      experience: '12+ years',
      location: 'Manila, Philippines',
      linkedin: '#',
      twitter: '#',
      email: 'marlon@juanwork.ph'
    },
    {
      name: 'Lester Leal',
      role: 'Tech Lead',
      bio: 'Technical architect building scalable solutions that power millions of connections across the globe.',
      image: '/images/team/sarah-johnson.jpg',
      skills: ['Full-Stack', 'DevOps', 'Security'],
      experience: '14+ years',
      location: 'Manila, Philippines',
      linkedin: '#',
      twitter: '#',
      email: 'lester.leal@juanwork.ph'
    },
    {
      name: 'Jonathan Violeta',
      role: 'Software Engineer',
      bio: 'Full-stack developer creating innovative solutions for the remote work ecosystem.',
      image: '/images/team/sarah-johnson.jpg',
      skills: ['Frontend', 'Backend', 'Mobile'],
      experience: '8+ years',
      location: 'Manila, Philippines',
      linkedin: '#',
      twitter: '#',
      email: 'jonathan.violeta@juanwork.ph'
    },
  ];

  const teamStats = [
    { label: 'Support Team', value: '20+', icon: Headphones },
    { label: 'Countries', value: '15+', icon: Globe },
    { label: 'Years Combined', value: '200+', icon: Award },
    { label: 'Languages', value: '12+', icon: Zap }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Users className="h-4 w-4" />
            Meet Our Team
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Support Team
            </span>{' '}
            Behind JuanWork
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Meet the dedicated professionals who are committed to your success. 
            Our diverse, global support team brings together decades of experience 
            and a shared passion for helping you achieve your goals.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {teamStats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="relative p-6">
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{member.experience}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{member.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Link
                      href={member.linkedin}
                      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                    <Link
                      href={member.twitter}
                      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
            <Heart className="h-4 w-4" />
            Ready to connect with our team?
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Get in Touch Today</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team is here to help you succeed. Whether you&apos;re a freelancer looking for opportunities 
              or a client seeking talent, we&apos;re ready to support your journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#contact-form">Send Message</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/help">Visit Help Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
