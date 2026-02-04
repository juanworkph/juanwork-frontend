"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Linkedin,
  Github,
  Mail,
  Palette,
  Camera,
  MessageSquare,
  Facebook,
  Layers,
  PlayCircle,
  X,
  ShieldCheck,
  Terminal,
  Info,
  Lock,
  Save,
  Dribbble,
  Briefcase,
} from "lucide-react";
import { SocialLinks } from "../schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

  // Visibility toggle state - for demo purposes, we'll initialize based on if value exists
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => {
    const initialVisibility: Record<string, boolean> = {};
    Object.keys(initialSocialLinks).forEach((key) => {
      initialVisibility[key] = !!initialSocialLinks[key as keyof SocialLinks];
    });
    return initialVisibility;
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(socialLinks);
    setIsSaving(false);
    toast.success("Social links saved successfully!");
  };

  const handleInputChange = (key: keyof SocialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [key]: value }));
    // Auto-enable visibility if a value is typed and it was disabled
    if (value && !visibility[key]) {
      setVisibility((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleToggleVisibility = (key: string) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const socialPlatforms = useMemo(
    () => [
      {
        id: "website",
        label: "Website",
        icon: Globe,
        inputLabel: "URL Address",
        placeholder: "https://yourwebsite.com",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-600 dark:text-blue-400",
      },
      {
        id: "github",
        label: "GitHub",
        icon: Terminal,
        inputLabel: "Profile Link",
        placeholder: "https://github.com/username",
        bgColor: "bg-slate-900 dark:bg-slate-800",
        iconColor: "text-white",
      },
      {
        id: "google",
        label: "Google",
        icon: Mail,
        inputLabel: "Email Address",
        placeholder: "username@gmail.com",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        iconColor: "text-red-500",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: Linkedin,
        inputLabel: "LinkedIn Profile",
        placeholder: "https://linkedin.com/in/username",
        bgColor: "bg-blue-600 dark:bg-blue-700",
        iconColor: "text-white",
      },
      {
        id: "behance",
        label: "Behance",
        icon: Palette,
        inputLabel: "Portfolio Link",
        placeholder: "https://behance.net/username",
        bgColor: "bg-blue-500 dark:bg-blue-600",
        iconColor: "text-white",
      },
      {
        id: "dribbble",
        label: "Dribbble",
        icon: Dribbble,
        inputLabel: "Username / Link",
        placeholder: "https://dribbble.com/username",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        iconColor: "text-pink-500",
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: Camera,
        inputLabel: "Username",
        placeholder: "@username",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-600",
      },
      {
        id: "discord",
        label: "Discord",
        icon: MessageSquare,
        inputLabel: "Discord Tag",
        placeholder: "Username#0000",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        iconColor: "text-indigo-600",
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: Facebook,
        inputLabel: "Profile / Page Link",
        placeholder: "https://facebook.com/username",
        bgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-700 dark:text-blue-400",
      },
      {
        id: "stackoverflow",
        label: "Stack Overflow",
        icon: Layers,
        inputLabel: "Profile Link",
        placeholder: "https://stackoverflow.com/users/id",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        iconColor: "text-orange-700",
      },
      {
        id: "youtube",
        label: "YouTube",
        icon: PlayCircle,
        inputLabel: "Channel Link",
        placeholder: "https://youtube.com/@channel",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        iconColor: "text-red-700",
      },
      {
        id: "twitter",
        label: "Twitter / X",
        icon: X,
        inputLabel: "Username",
        placeholder: "@username",
        bgColor: "bg-slate-200 dark:bg-slate-700",
        iconColor: "text-slate-900 dark:text-slate-100",
      },
    ],
    [],
  );

  const connectedCount = Object.values(socialLinks).filter((v) => !!v).length;
  const totalCount = socialPlatforms.length;
  const progressValue = (connectedCount / totalCount) * 100;

  return (
    <div className="space-y-10 pb-10 animate-in fade-in duration-500">
      {/* Hero Header Section */}
      <div className="bg-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-border shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Social Links
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Manage your online presence and verification status. Connected
              accounts help establish trust and increase your profile visibility
              by up to 40%.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-[1.25rem] md:rounded-[1.5rem] text-white flex flex-col justify-center w-full lg:w-auto lg:min-w-[280px] shadow-xl shadow-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                Profile Completion
              </span>
              <span className="text-xl font-black">
                {connectedCount} of {totalCount}
              </span>
            </div>
            <Progress
              value={progressValue}
              className="h-2 bg-white/20 mb-2"
              // Adding custom color to progress bar via indicator
            />
            <p className="text-[10px] font-medium opacity-80 italic">
              Connect {totalCount - connectedCount} more to get the "Verified
              Expert" badge
            </p>
          </div>
        </div>
      </div>

      {/* Social Platforms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {socialPlatforms.map((platform) => {
          const key = platform.id as keyof SocialLinks;
          const value = socialLinks[key] || "";
          const isConnected = !!value;
          const isEnabled = visibility[platform.id] ?? false;
          const Icon = platform.icon;

          return (
            <div
              key={platform.id}
              className="bg-card border border-border p-5 rounded-3xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2.5 rounded-2xl transition-transform group-hover:scale-110",
                      platform.bgColor,
                    )}
                  >
                    <Icon className={cn("h-6 w-6", platform.iconColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      {platform.label}
                    </h4>
                    {isConnected ? (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase tracking-tight">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">
                        Not Connected
                      </span>
                    )}
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => handleToggleVisibility(platform.id)}
                  aria-label={`Toggle visibility for ${platform.label}`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={platform.id}
                  className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight ml-1"
                >
                  {platform.inputLabel}
                </label>
                <Input
                  id={platform.id}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={platform.placeholder}
                  className="h-10 bg-muted/30 border-border rounded-xl text-xs font-medium focus:ring-primary focus:border-transparent transition-all px-4"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-10 border-t border-border mt-10 gap-4">
        <div className="hidden md:flex items-center gap-2 text-muted-foreground">
          <Info className="h-4 w-4" />
          <p className="text-xs font-medium">
            Changes will be visible on your public profile immediately after
            saving.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex-1 md:flex-none h-11 px-6 rounded-xl font-bold text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSocialLinks(initialSocialLinks)}
          >
            Discard Changes
          </Button>
          <Button
            className="flex-1 md:flex-none h-11 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-[0.98]"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
