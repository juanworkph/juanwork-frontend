"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Briefcase,
  Palette,
  Save,
  ExternalLink,
} from "lucide-react";
import { SocialLinks } from "../schema";
import { toast } from "sonner";

interface SocialTabProps {
  socialLinks: SocialLinks;
  onSave: (socialLinks: SocialLinks) => void;
}

export function SocialTab({
  socialLinks: initialSocialLinks,
  onSave,
}: SocialTabProps) {
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(socialLinks);
    setIsSaving(false);
    toast.success("Social links saved successfully!");
  };

  const socialPlatforms = [
    {
      id: "website",
      label: "Personal Website",
      icon: Globe,
      placeholder: "https://yourwebsite.com",
      color: "text-gray-600 dark:text-gray-400",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: Briefcase,
      placeholder: "https://yourportfolio.com",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/yourusername",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      placeholder: "https://github.com/yourusername",
      color: "text-gray-900 dark:text-gray-100",
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: Twitter,
      placeholder: "https://twitter.com/yourusername",
      color: "text-sky-500 dark:text-sky-400",
    },
    {
      id: "behance",
      label: "Behance",
      icon: Palette,
      placeholder: "https://behance.net/yourusername",
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      id: "dribbble",
      label: "Dribbble",
      icon: Palette,
      placeholder: "https://dribbble.com/yourusername",
      color: "text-pink-500 dark:text-pink-400",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      placeholder: "https://facebook.com/yourusername",
      color: "text-blue-700 dark:text-blue-500",
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/yourusername",
      color: "text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Social Links Form and Preview - 2 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Links Form */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Connect your social profiles to showcase your work and increase
              your visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              const key = platform.id as keyof SocialLinks;
              const value = socialLinks[key] || "";

              return (
                <div key={platform.id} className="space-y-2">
                  <Label
                    htmlFor={platform.id}
                    className="flex items-center gap-2"
                  >
                    <Icon className={`h-4 w-4 ${platform.color}`} />
                    {platform.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={platform.id}
                      type="url"
                      value={value}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          [key]: e.target.value,
                        })
                      }
                      placeholder={platform.placeholder}
                      className="pr-10"
                    />
                    {value && (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
          <CardHeader>
            <CardTitle className="text-base">Profile Preview</CardTitle>
            <CardDescription>
              How your social links will appear on your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                const key = platform.id as keyof SocialLinks;
                const value = socialLinks[key];

                if (!value) return null;

                return (
                  <a
                    key={platform.id}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className={`h-4 w-4 ${platform.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {platform.label}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </a>
                );
              })}
              {Object.values(socialLinks).every((v) => !v) && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No social links added yet. Add some links above to see them
                  here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
