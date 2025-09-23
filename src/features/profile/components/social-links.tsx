import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  Edit,
  Plus,
  ExternalLink,
  Share2
} from 'lucide-react';
import { SocialLinks as SocialLinksType } from '../schema/profile-data';

interface SocialLinksProps {
  socialLinks: SocialLinksType;
  isOwnProfile?: boolean;
}

export function SocialLinks({ socialLinks, isOwnProfile = false }: SocialLinksProps) {
  const socialPlatforms = [
    {
      name: 'GitHub',
      icon: Github,
      url: socialLinks.github,
      color: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      description: 'View code repositories and contributions'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: socialLinks.linkedin,
      color: 'hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-900/30 dark:hover:text-blue-100',
      description: 'Professional network and experience'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: socialLinks.twitter,
      color: 'hover:bg-sky-100 hover:text-sky-900 dark:hover:bg-sky-900/30 dark:hover:text-sky-100',
      description: 'Latest thoughts and industry insights'
    },
    {
      name: 'Behance',
      icon: Globe, // Using Globe as placeholder for Behance
      url: socialLinks.behance,
      color: 'hover:bg-purple-100 hover:text-purple-900 dark:hover:bg-purple-900/30 dark:hover:text-purple-100',
      description: 'Creative portfolio and design work'
    },
    {
      name: 'Dribbble',
      icon: Globe, // Using Globe as placeholder for Dribbble
      url: socialLinks.dribbble,
      color: 'hover:bg-pink-100 hover:text-pink-900 dark:hover:bg-pink-900/30 dark:hover:text-pink-100',
      description: 'Design shots and creative inspiration'
    },
    {
      name: 'Portfolio',
      icon: Globe,
      url: socialLinks.portfolio,
      color: 'hover:bg-green-100 hover:text-green-900 dark:hover:bg-green-900/30 dark:hover:text-green-100',
      description: 'Personal website and portfolio'
    }
  ];

  const availableLinks = socialPlatforms.filter(platform => platform.url);
  const hasAnyLinks = availableLinks.length > 0;

  if (!hasAnyLinks && !isOwnProfile) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
              <Share2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <CardTitle className="text-xl font-semibold">Social Links</CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Links
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {hasAnyLinks ? (
          <div className="space-y-6">
            {/* Social Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableLinks.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${platform.color} hover:shadow-md hover:scale-[1.02]`}
                  >
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors">
                      <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-current">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {platform.description}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-current opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>

            {/* Add More Links (for own profile) */}
            {isOwnProfile && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Social Link
                </Button>
              </div>
            )}

            {/* Social Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {availableLinks.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connected Platforms
                </p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {socialLinks.github ? '✓' : '–'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Code Portfolio
                </p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {socialLinks.portfolio ? '✓' : '–'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Personal Website
                </p>
              </div>
            </div>

            {/* Professional Presence */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Share2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-1">
                    Strong Online Presence
                  </h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    Connected across {availableLinks.length} platform{availableLinks.length !== 1 ? 's' : ''} to showcase work and maintain professional visibility.
                    {socialLinks.github && socialLinks.linkedin && ' Active on both technical and professional networks.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : isOwnProfile ? (
          // Empty state for own profile
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto">
              <Share2 className="h-8 w-8 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Connect Your Social Profiles
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Showcase your professional presence by connecting your social media profiles, portfolio, and code repositories.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                Portfolio
              </Button>
            </div>
            <Button className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Add Social Links
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
} 