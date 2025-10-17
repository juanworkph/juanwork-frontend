"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Star, 
  Calendar, 
  CheckCircle, 
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

export function UserSidebar() {
  // Mock user data - in real app, this would come from auth context or API
  const user = {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/images/logo.png", // placeholder
    location: "San Francisco, CA",
    joinDate: "Jan 2023",
    isVerified: true,
    profileCompleteness: 85,
    rating: 4.9,
    totalReviews: 127,
    completedProjects: 45,
    experience: "3+ years",
    skills: ["React", "Node.js", "TypeScript", "UI/UX"],
    socialLinks: {
      github: "https://github.com/alexrodriguez",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      twitter: "https://twitter.com/alexrodriguez"
    },
    stats: {
      totalEarnings: 125000,
      responseTime: "< 1 hour",
      successRate: 98
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="p-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AR</span>
                </div>
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.location}</span>
                </div>
              </div>

              {/* Verification Badge */}
              {user.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Professional
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Completeness */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completeness</span>
                <span className="text-sm text-muted-foreground">{user.profileCompleteness}%</span>
              </div>
              <Progress value={user.profileCompleteness} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Complete your profile to get more project invitations
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rating & Reviews */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating & Reviews</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(user.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({user.totalReviews} reviews)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="text-sm">Completed Projects</span>
                </div>
                <span className="text-sm font-medium">{user.completedProjects}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Experience</span>
                </div>
                <span className="text-sm font-medium">{user.experience}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm">Total Earnings</span>
                </div>
                <span className="text-sm font-medium">${user.stats.totalEarnings.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Response Time</span>
                </div>
                <span className="text-sm font-medium">{user.stats.responseTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">Success Rate</span>
                </div>
                <span className="text-sm font-medium">{user.stats.successRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Connect</h3>
            <div className="space-y-2">
              <Link 
                href={user.socialLinks.github} 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </Link>
              
              <Link 
                href={user.socialLinks.linkedin} 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </Link>
              
              <Link 
                href={user.socialLinks.twitter} 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="text-sm">Twitter</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member Since */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Member since {user.joinDate}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
